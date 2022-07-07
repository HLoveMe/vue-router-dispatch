import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Plugin } from 'vue';
import { Router, RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
type Merge<T> = Pick<T, keyof T>;
export type MessageSource = RouteLocationNormalized | Router;
export interface EventInfo {
  type: string | symbol;
  data: any;
  source?: MessageSource;
}

export interface AsyncEvent extends EventInfo {
  resolve: (data: any) => void;
  reject: (error: Error) => void;
}

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

export type BasePin = {
  on(type: string | RegExp, callback: EventCallBack): Clear;
  onBehavior(type: string | RegExp, callback: EventCallBack): Clear; // 容许接受上一个消息
  once(type: string | RegExp, callback: EventCallBack): Clear;
  onError(callback: (error: Error) => void): void;
};

export type RoutePin = Merge<
  BasePin & {
    dispatch(type: string, data: any): void;
    dispatchAsync(type: string, data: any): Promise<any>;
  }
>;

export type RouterPin = Merge<
  BasePin & {
    dispatch(type: string, data: any): void;
    dispatchAsync(
      type: string,
      data: any,
      route?: RouteLocationRaw
    ): Promise<any>;
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
export function dispatchEvent(type: string, data: any): Promise<any>;
export function dispatchEvent(
  type: string,
  data: any,
  isAsync?: boolean
): Promise<any>;
export function dispatchEvent(
  type: string,
  data: any,
  target?: MessageSource
): Promise<any>;
export function dispatchEvent(
  type: string,
  data: any,
  isAsync?: boolean,
  target?: MessageSource
): Promise<any>;

export const VueRouterPin: Plugin;
