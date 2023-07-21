import { BehaviorSubject, from, Observable, Subscription, zip } from "rxjs";
import { filter, takeLast, take, bufferCount, map } from "rxjs/operators";
import {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
  useRoute,
} from "vue-router";
import {
  initEvent,
  PolySymbol,
  ServerMap,
  SHALL_CURRENT,
  GlobalRServerKey,
  initEventKey,
  Global_Serve,
  CurrentRServerKey,
  noop,
  getUUID,
} from "./utils";
import {
  AsyncEvent,
  EventCallBack,
  ServerBase,
  ServerRoute,
  MessageSource,
  PinServer,
  DispatchSubscription,
  EventName,
  EventMap,
  Clear,
  EventInfo,
  AsyncEventResult,
} from "./type";
import { shallowRef, App } from "vue";

const getCurrentServer = (current: RouteLocationNormalized) => {
  var result: ServerRoute = {} as ServerRoute;
  const { fullPath } = current;
  const id = PolySymbol(fullPath);
  const server = ServerMap.get(id);
  if (server) {
    result = server as ServerRoute;
  } else {
    result.id = PolySymbol(current.fullPath);
    result.route = current;
    result.children = [];
    result.clearSubs = [];
    result._events = new Map();
    result.channelCenter = new BehaviorSubject<AsyncEvent>(initEvent);
  }
  return result;
};
const isEventType = (event: AsyncEvent, type: EventName): boolean => {
  if (type instanceof RegExp) {
    if (typeof event.type !== "string") return false;
    return type.test(event.type as string);
  } else {
    return event.type === type;
  }
};
const currentServer = shallowRef(SHALL_CURRENT);

function removeSub(tran: ServerBase, sub: Subscription) {
  sub && sub.unsubscribe();
  const index = tran.clearSubs.indexOf(sub);
  index > -1 && tran.clearSubs.splice(index, 1);
}

function setPinEventMap(
  tran: ServerBase,
  type: EventName,
  callback: EventCallBack
) {
  const { _events } = tran;
  const key = `${type}`;
  const events = _events.get(key) || [];
  const tag = { call: callback, uuid: getUUID() };
  events.push(tag);
  _events.set(key, events);
  return tag;
}

function removePinEvents(
  tran: ServerBase,
  type: EventName,
  callback: EventCallBack,
  uuid: string
) {
  const key = `${type}`;
  const events = tran._events.get(key);
  if (events) {
    //uuid 暂时无效
    const index = events.findIndex(
      ($1) => $1.call === callback || $1.uuid === uuid
    );
    events.splice(index, 1);
  }
}

function dispatch(
  tran: ServerBase,
  event: AsyncEvent,
  isAsync: boolean = false
) {
  const { channelCenter, id, errorChanel } = tran;
  const isRoot = id === GlobalRServerKey;
  if (isAsync === false) {
    channelCenter.next(event);
    isRoot && tran.children.forEach((child) => child.channelCenter.next(event));
    return;
  }
  const { resolve, reject } = event;
  const baseEvent = {
    type: event.type,
    data: event.data,
    source: event.source,
  } as EventInfo;
  const handleAsyncEventResult = (
    serve: ServerBase,
    event: AsyncEvent,
    channel: BehaviorSubject<AsyncEvent>
  ): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      const results: AsyncEventResult[] = [];
      channel.next({
        ...event,
        resolve: (result: any) => {
          results.push({ eventSource: baseEvent, result } as AsyncEventResult);
          results.length === serve._events.get(event.type)?.length &&
            resolve(results);
        },
        reject,
      });
    });
  };
  const root = from(handleAsyncEventResult(tran, event, channelCenter));
  const operators: Observable<any>[] = tran.children.map(($1) =>
    from(handleAsyncEventResult($1, event, $1.channelCenter))
  );
  zip(root, ...operators)
    .pipe(takeLast(1))
    .subscribe({
      next: (promises: Array<any>) => resolve(promises),
      complete: () => { },
      error: (error: Error) => {
        reject(error);
        errorChanel.next(error);
      },
    });
}

function on(tran: ServerBase, type: EventName, callback: EventCallBack) {
  const { channelCenter, errorChanel } = tran;
  const { uuid } = setPinEventMap(tran, type, callback);
  const sub: Subscription = channelCenter
    .pipe(
      filter(
        (event: AsyncEvent) =>
          isEventType(event, type) || event.type === initEventKey
      ),
      bufferCount(2, 1),
      map((events) => events[1])
    )
    .subscribe({
      complete: () => removeSub(tran, sub),
      next: (event) => callback && callback(event),
      error: (error: Error) => errorChanel.next(error),
    });
  tran.clearSubs.push(sub);
  return {
    close: () => {
      removeSub(tran, sub);
      removePinEvents(tran, type, callback, uuid);
    },
  };
}

function onEvent(tran: ServerBase, map: EventMap) {
  const keys = Object.keys(map);
  const closes: Clear[] = [];
  keys.forEach((key) => {
    const callback = map[key];
    if (typeof callback === "function") {
      const close = on(tran, key, callback);
      closes.push(close);
    }
  });
  return {
    close: () => {
      closes.forEach(($1) => typeof $1.close === "function" && $1.close());
      closes.length = 0;
    },
  };
}

function once(tran: ServerBase, type: EventName, callback: EventCallBack) {
  const { channelCenter, errorChanel } = tran;
  const { uuid } = setPinEventMap(tran, type, callback);
  const sub: Subscription = channelCenter
    .pipe(
      filter(
        (event: AsyncEvent) =>
          isEventType(event, type) || event.type === initEventKey
      ),
      bufferCount(2, 1),
      map((events) => events[1]),
      take(1)
    )
    .subscribe({
      complete: () => removeSub(tran, sub),
      next: (event) => callback && callback(event),
      error: (error: Error) => errorChanel.next(error),
    });
  tran.clearSubs.push(sub);
  return {
    close: () => {
      removeSub(tran, sub);
      removePinEvents(tran, type, callback, uuid);
    },
  };
}
function onBehavior(
  tran: ServerBase,
  type: EventName,
  callback: EventCallBack
) {
  const { channelCenter, errorChanel } = tran;
  const { uuid } = setPinEventMap(tran, type, callback);
  const sub: Subscription = channelCenter
    .pipe(
      filter((event) => isEventType(event, type) && event.type !== initEventKey)
    )
    .subscribe({
      complete: () => removeSub(tran, sub),
      next: (event) => callback && callback(event),
      error: (error: Error) => errorChanel.next(error),
    });
  tran.clearSubs.push(sub);
  return {
    close: () => {
      removeSub(tran, sub);
      removePinEvents(tran, type, callback, uuid);
    },
  };
}
function onError(tran: ServerBase, callback: Function) {
  const { errorChanel } = tran;
  const sub = errorChanel.subscribe({
    complete: () => {
      removeSub(tran, sub);
    },
    next: (error) => {
      callback && callback(error);
    },
  });
  tran.clearSubs.push(sub);
  return { close: () => removeSub(tran, sub) };
}

export const createRxFunc = (pin: ServerBase, source: MessageSource) => {
  const router = Global_Serve.router;
  // 只有router 可以指定在哪个pin触发
  const getDispatchPin = (route?: RouteLocationRaw): ServerBase => {
    if (!!route === false) return pin;
    const isRoot = pin.id === GlobalRServerKey;
    if (!isRoot) return pin;
    const { fullPath } = (router as Router).resolve(route as RouteLocationRaw);
    const id = PolySymbol(fullPath);
    const target = ServerMap.get(id);
    return target || pin;
  };
  const subscription = {
    _finalizers: [],
    close: () => {
      subscription._finalizers.forEach(
        ($1) => typeof $1?.close === "function" && $1?.close()
      );
      subscription._finalizers.length = 0;
    },
  } as DispatchSubscription;
  return {
    subscription,
    dispatch: (type: string, data: any, route?: RouteLocationRaw) => {
      dispatch(getDispatchPin(route), {
        type,
        data,
        source,
        resolve: () => { },
        reject: () => { },
      });
    },
    dispatchAsync: (
      type: string,
      data: any,
      route?: RouteLocationRaw
    ): Promise<any[]> => {
      return new Promise((resolve, reject) => {
        dispatch(
          getDispatchPin(route),
          {
            type,
            data,
            source,
            resolve: (data: any) => resolve(data),
            reject: (error: Error) => reject(error),
          },
          true
        );
      });
    },
    on: (type: string, callback: EventCallBack) => {
      const close = on(pin, type, callback);
      subscription._finalizers.push(close);
      return close;
    },
    onBehavior: (type: string, callback: EventCallBack) => {
      const close = onBehavior(pin, type, callback);
      subscription._finalizers.push(close);
      return close;
    },
    once: (type: string, callback: EventCallBack) => {
      const close = once(pin, type, callback);
      subscription._finalizers.push(close);
      return close;
    },
    onError: (callback: Function) => {
      const close = onError(pin, callback);
      subscription._finalizers.push(close);
      return close;
    },
    onEvent: (map: EventMap) => {
      const close = onEvent(pin, map);
      subscription._finalizers.push(close);
      return close;
    },
  };
};

function createPinServer(): PinServer {
  const init = (router: Router) => {
    router.beforeEach(
      (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        const serve: ServerBase = getCurrentServer(to);
        if (!ServerMap.has(serve.id)) Global_Serve.children.push(serve);
        ServerMap.set(serve.id, serve);
        currentServer.value = serve;
      }
    );
    router.afterEach(
      (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        currentServer.value = getCurrentServer(to);
      }
    );

    Global_Serve.channelCenter = new BehaviorSubject<AsyncEvent>(initEvent);
    Global_Serve.router = router;
    ServerMap.set(Global_Serve.id, Global_Serve);
    currentServer.value = Global_Serve;
  };
  const Server = {
    install(app: App) {
      if (!app.config.globalProperties.$router) {
        throw new Error(
          "Pinserver should install after Vue-router"
        );
      }
      init(app.config.globalProperties.$router);
      app.provide(GlobalRServerKey, Global_Serve);
      app.provide(CurrentRServerKey, currentServer);
      app.config.globalProperties.$rs = (type: string, data: any) => {
        dispatch(currentServer.value, {
          type,
          data,
          source: useRoute(),
          resolve: () => { },
          reject: () => { },
        });
      };
    },
    dispatch: (type: string, data: any, ...args: any[]) => {
      let isAsync: boolean = false;
      let target: RouteLocationRaw | undefined = undefined;
      args = args.filter(($1) => $1 !== undefined);
      if (args.length === 2) {
        isAsync = args[0] as boolean;
        target = args[1] as RouteLocationRaw;
      } else if (args.length === 1) {
        if (typeof args[0] === "boolean") {
          isAsync = args[0] as boolean;
          target = undefined;
        } else {
          target = args[0] as RouteLocationRaw;
          isAsync = false;
        }
      } else {
        target = undefined;
        isAsync = false;
      }
      let pin: ServerBase | undefined = undefined;
      if (!!target === false) pin = Global_Serve;
      else {
        const router = Global_Serve.router;
        const { fullPath } = (router as Router).resolve(
          target as RouteLocationRaw
        );
        const id = PolySymbol(fullPath);
        pin = ServerMap.get(id);
      }

      return new Promise((resolve, reject) => {
        dispatch(
          pin as ServerBase,
          {
            type: type,
            data: data,
            source: undefined,
            resolve: isAsync ? resolve : noop,
            reject: isAsync ? reject : noop,
          },
          !!isAsync
        );
        if (!isAsync) resolve(null);
      });
    },
  };
  return Server;
}

const Server: PinServer = createPinServer();

export default Server;
