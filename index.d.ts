import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { Plugin } from "vue";
import { Router, RouteLocationNormalized, RouteLocationRaw } from "vue-router";
type Merge<T> = Pick<T, keyof T>;
export type MessageSource = RouteLocationNormalized | Router;

export type EventName = string | RegExp;

export type EventMap = { [key: string]: EventCallBack };

export interface EventInfo {
  type: string | symbol;
  data: any;
  source?: MessageSource;
}

export interface AsyncEvent extends EventInfo {
  resolve: (data: any) => void;
  reject: (error: Error) => void;
}

export interface AsyncEventResult {
  eventSource: EventInfo;
  result: any;
}

// [当前,子1P]
export type AsyncEventResultCollection = Array<Array<AsyncEventResult>>;
export interface PinServer {
  dispatch(
    type: string,
    data: any,
    isAsync?: boolean,
    target?: MessageSource
  ): Promise<any>;
  dispatch(type: string, data: any, isAsync?: boolean): void;
  dispatch(type: string, data: any, target?: MessageSource): Promise<any>;
}
export interface ServerBase {
  id: string | symbol;
  channelCenter: BehaviorSubject<AsyncEvent>;
  errorChanel: Subject<Error>;
  clearSubs: Array<Subscription>;
  children: Array<ServerBase>;
  super?: ServerBase;
}

export type ServerRoute = Merge<
  ServerBase & {
    route?: RouteLocationNormalized;
  }
>;

export type ServerRouter = Merge<ServerBase & { router?: Router }>;

export type EventCallBack = (event: AsyncEvent) => void;

export type Clear = { close(): void };

export type DispatchSubscription = {
  _finalizers: Array<Clear>;
  close: () => void;
};

export type BasePin = {
  subscription: DispatchSubscription;
  on(type: EventName, callback: EventCallBack): Clear;
  onEvent(map: EventMap): Clear;
  onBehavior(type: EventName, callback: EventCallBack): Clear; // 容许接受上一个消息
  once(type: EventName, callback: EventCallBack): Clear;
  onError(callback: (error: Error) => void): Clear;
};

export type RoutePin = Merge<
  BasePin & {
    dispatch(type: string, data: any): void;
    // 所有事件都返回
    dispatchAsync(type: string, data: any): Promise<AsyncEventResultCollection>;
  }
>;

export type RouterPin = Merge<
  BasePin & {
    dispatch(type: string, data: any): void;
    dispatchAsync(
      type: string,
      data: any,
      route?: RouteLocationRaw
    ): Promise<AsyncEventResultCollection>;
  }
>;

/**
 *
 * @returns 当前路由派发
 */
export function useRoutePin(): RoutePin;
/**
 *
 * @returns 全局路由下派发
 */
export function useRouterPin(): RouterPin;

/**
 * 全局派发事件
 */
export function dispatchEvent(type: string, data: any): any;
export function dispatchEvent<Async extends boolean>(
  type: string,
  data: any,
  isAsync?: Async
): Async extends true ? Promise<AsyncEventResultCollection> : void;
export function dispatchEvent(
  type: string,
  data: any,
  target?: MessageSource
): void;
export function dispatchEvent<Async extends boolean>(
  type: string,
  data: any,
  isAsync?: Async,
  target?: MessageSource
): Async extends true ? Promise<AsyncEventResultCollection> : void;

export const VueRouterPin: Plugin;
