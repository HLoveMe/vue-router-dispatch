/*
 * @Author: zihao.zhu@united-imaging.com 
 * @Date: 2022-03-30 18:03:18 
 * @Last Modified by: zihao.zhu
 * @Last Modified time: 2022-06-13 16:41:32
 * @desc : 事件派发器 - 根据路由信息创建一个派发器
 */

import { BehaviorSubject, Subject, Subscription, Observable, from, zip } from "rxjs";
import { filter, takeLast, take, bufferCount, map } from 'rxjs/operators';
import { Plugin, shallowRef, App, inject, Ref } from "vue";
import {
  Router,
  RouteLocationNormalized,
  RouteLocationRaw,
  useRouter,
  useRoute,
} from "vue-router";

type MessageSource = RouteLocationNormalized | Router
export interface EventInfo {
  type: string | symbol,
  data: any,
  source?: MessageSource,
}

export interface AsyncEvent extends EventInfo {
  resolve: (data: any) => void
  reject: (error: Error) => void
}
type PinServer = {
  dispatch: (type: string, data: any, isAsync?: boolean, target?: MessageSource) => Promise<any>
} & Plugin

interface ServerBase {
  id: string | symbol,
  channelCenter: BehaviorSubject<AsyncEvent>,
  errorChanel: Subject<Error>,
  clearSubs: Array<Subscription>,
  children: Array<ServerBase>,
  super?: ServerBase,
}
type ServerRoute = ServerBase & {
  route?: RouteLocationNormalized
}
type ServerRouter = ServerBase & { router?: Router }
type EventCallBack = (event: AsyncEvent) => void
export type Clear = { close(): void }
type BasePin = {
  on(type: string | RegExp, callback: EventCallBack): Clear,
  onBehavior(type: string | RegExp, callback: EventCallBack): Clear;// 容许接受上一个消息
  once(type: string | RegExp, callback: EventCallBack): Clear,
  onError(callback: (error: Error) => void): void,
}
export type RoutePin = BasePin & {
  dispatch(type: string, data: any): void,
  dispatchAsync(type: string, data: any): Promise<any>,
}
export type RouterPin = BasePin & {
  dispatch(type: string, data: any): void,
  dispatchAsync(type: string, data: any, route?: RouteLocationRaw): Promise<any>,
}

/////////////
function noop() { };
const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) =>
  // vr = vue router
  hasSymbol
    ? Symbol.for('[r-server]: ' + name)
    : ('[r-server]: ') + name;
/////////////////////////////
const initEventKey = PolySymbol('event-init');
const GlobalRServerKey = PolySymbol('GlobalRServerKey');
const CurrentRServerKey = PolySymbol('CurrentRServerKey');
const ServerMap = new Map<string | symbol, ServerBase>();

const initEvent: AsyncEvent = { type: initEventKey, data: null, reject: noop, resolve: noop, source: undefined }

const SHALL_CURRENT: ServerBase = {
  id: '',
  channelCenter: new BehaviorSubject<AsyncEvent>(initEvent),
  errorChanel: new Subject(),
  children: [],
  clearSubs: [],
};
const Global_Serve: ServerRouter = {
  id: GlobalRServerKey,
  router: undefined,
  children: [],
  channelCenter: new BehaviorSubject<AsyncEvent>(initEvent),
  errorChanel: new Subject(),
  clearSubs: [],
}

const getCurrentServer = (current: RouteLocationNormalized) => {
  var result: ServerRoute = {} as ServerRoute;
  const { fullPath } = current;
  const id = PolySymbol(fullPath)
  const server = ServerMap.get(id);
  if (server) {
    result = server as ServerRoute;
  } else {
    result.id = PolySymbol(current.fullPath);
    result.route = current;
    result.children = [];
    result.clearSubs = [];
    result.channelCenter = new BehaviorSubject<AsyncEvent>(initEvent);
  }
  return result;
}
const isEventType = (event: AsyncEvent, type: string | RegExp): boolean => {
  if (type instanceof RegExp) {
    if (typeof event.type !== 'string') return false
    return type.test(event.type as string);
  } else {
    return event.type === type;
  }
};
const currentServer = shallowRef(SHALL_CURRENT);

function removeSub(tran: ServerBase, sub: Subscription) {
  sub.unsubscribe();
  const index = tran.clearSubs.indexOf(sub);
  index > -1 && (tran.clearSubs = tran.clearSubs.splice(index, 1));
}

function dispatch(tran: ServerBase, event: AsyncEvent, isAsync: boolean = false) {
  const { channelCenter, id, errorChanel } = tran;
  const isRoot = id === GlobalRServerKey;
  if (isAsync === false) {
    channelCenter.next(event);
    isRoot && tran.children.forEach(child => child.channelCenter.next(event))
    return
  };
  const { resolve, reject } = event;
  const root = from(
    new Promise<any>(
      (resolve, reject) => {
        channelCenter.next({
          ...event,
          resolve,
          reject,
        });
      }));
  const operators: Observable<any>[] = tran
    .children
    .map(
      $1 => from(
        new Promise((resolve, reject) => {
          $1.channelCenter.next({
            ...event,
            resolve,
            reject,
          })
        })));
  zip(
    root,
    ...operators
  ).pipe(
    takeLast(1),
  ).subscribe({
    next: (promises: Array<any>) => resolve(promises),
    complete: () => { },
    error: (error: Error) => {
      reject(error);
      errorChanel.next(error);
    }
  })
}


function on(tran: ServerBase, type: string | RegExp, callback: EventCallBack) {
  const { channelCenter, errorChanel } = tran;
  const sub = channelCenter
    .pipe(
      filter((event: AsyncEvent) => isEventType(event, type) || event.type === initEventKey),
      bufferCount(2, 1),
      map(events => events[1]),
    )
    .subscribe({
      complete: () => removeSub(tran, sub),
      next: event => callback && callback(event),
      error: (error: Error) => errorChanel.next(error)
    })
  tran.clearSubs.push(sub);
  return { close: () => removeSub(tran, sub) }
}

function once(tran: ServerBase, type: string | RegExp, callback: EventCallBack) {
  const { channelCenter, errorChanel } = tran;
  const sub = channelCenter
    .pipe(
      filter((event: AsyncEvent) => isEventType(event, type) || event.type === initEventKey),
      bufferCount(2, 1),
      map(events => events[1]),
      take(1),
    )
    .subscribe({
      complete: () => removeSub(tran, sub),
      next: event => callback && callback(event),
      error: (error: Error) => errorChanel.next(error)
    })
  tran.clearSubs.push(sub);
  return { close: () => removeSub(tran, sub) }
}
function onBehavior(tran: ServerBase, type: string | RegExp, callback: EventCallBack) {
  const { channelCenter, errorChanel } = tran;
  const sub = channelCenter
    .pipe(
      filter(event => isEventType(event, type) && event.type !== initEventKey),
    )
    .subscribe({
      complete: () => removeSub(tran, sub),
      next: event => callback && callback(event),
      error: (error: Error) => errorChanel.next(error)
    })
  tran.clearSubs.push(sub);
  return { close: () => removeSub(tran, sub) }
}
function onError(tran: ServerBase, callback: Function) {
  const { errorChanel } = tran;
  const sub = errorChanel
    .subscribe({
      complete: () => {
        removeSub(tran, sub);
      },
      next: error => {
        callback && callback(error);
      },
    })
  tran.clearSubs.push(sub);
}

const createRxFunc = (pin: ServerBase, source: MessageSource) => {
  const router = Global_Serve.router;
  // 只有router 可以指定在哪个pin触发
  const getDispatchPin = (route?: RouteLocationRaw): ServerBase => {
    if (!!route === false) return pin
    const isRoot = pin.id === GlobalRServerKey;
    if (!isRoot) return pin;
    const { fullPath } = (router as Router).resolve(route as RouteLocationRaw)
    const id = PolySymbol(fullPath)
    const target = ServerMap.get(id);
    return target || pin;
  }
  return {
    dispatch: (type: string, data: any, route?: RouteLocationRaw) => {
      dispatch(getDispatchPin(route), {
        type,
        data,
        source,
        resolve: () => { },
        reject: () => { },
      })
    },
    dispatchAsync: (type: string, data: any, route?: RouteLocationRaw) => {
      return new Promise((resolve, reject) => {
        dispatch(getDispatchPin(route), {
          type,
          data,
          source,
          resolve: (data: any) => resolve(data),
          reject: (error: Error) => reject(error),
        }, true)
      })
    },
    on: (type: string, callback: EventCallBack) => {
      return on(pin, type, callback);
    },
    onBehavior: (type: string, callback: EventCallBack) => {
      return onBehavior(pin, type, callback);
    },
    once: (type: string, callback: EventCallBack) => {
      return once(pin, type, callback);
    },
    onError: (callback: Function) => {
      onError(pin, callback);
    }
  }
}

function createPinServer(): PinServer {
  const init = (router: Router) => {
    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const serve: ServerBase = getCurrentServer(to);
      if (!ServerMap.has(serve.id)) Global_Serve.children.push(serve);
      ServerMap.set(serve.id, serve);
      currentServer.value = serve;
    })
    router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      currentServer.value = getCurrentServer(to)
    })

    Global_Serve.channelCenter = new BehaviorSubject<AsyncEvent>(initEvent);
    Global_Serve.router = router;
    ServerMap.set(Global_Serve.id, Global_Serve);
    currentServer.value = Global_Serve;
  }
  const Server = {
    install(app: App) {
      init(app.config.globalProperties.$router)
      app.provide(GlobalRServerKey, Global_Serve);
      app.provide(CurrentRServerKey, currentServer);
      app.config.globalProperties.$rs = (type: string, data: any) => {
        dispatch(currentServer.value, {
          type,
          data,
          source: useRoute(),
          resolve: () => { },
          reject: () => { },
        })
      }
    },
    dispatch: (type: string, data: any, isAsync?: boolean, target?: MessageSource) => {
      let pin: ServerBase | undefined = undefined
      if (!!target === false) pin = Global_Serve;
      if (target === Global_Serve.router) pin = Global_Serve;
      else {
        const router = Global_Serve.router;
        const { fullPath } = (router as Router).resolve(target as RouteLocationRaw)
        const id = PolySymbol(fullPath)
        pin = ServerMap.get(id);
      }
      return new Promise((resolve, reject) => {
        dispatch(pin as ServerBase, {
          type: type,
          data: data,
          source: undefined,
          resolve: isAsync ? resolve : noop,
          reject: isAsync ? reject : noop,
        }, !!isAsync)
        if (!isAsync) resolve(null)
      })
    }
  }
  return Server
}

const Server: PinServer = createPinServer();

export default Server;

/**
 * 
 * @returns 当前路由派发
 */
function useRoutePin(): RoutePin {
  const currentServe: ServerRoute = inject(CurrentRServerKey) as ServerRoute;
  return createRxFunc(currentServe, useRoute())
}
/**
 * 
 * @returns 全局派发
 */
function useRouterPin(): RouterPin {
  const currentServe: ServerRouter = inject(GlobalRServerKey) as ServerRouter;
  return createRxFunc(currentServe, useRouter());
}

function dispatchEvent(type: string, data: any, isAsync?: boolean, target?: MessageSource): Promise<any> {
  return Server.dispatch(type, data, isAsync, target);
}

export {
  useRoutePin,
  useRouterPin,
  dispatchEvent,
}