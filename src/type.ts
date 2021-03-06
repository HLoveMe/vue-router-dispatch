import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { Plugin } from "vue";
import {
  Router,
  RouteLocationNormalized,
  RouteLocationRaw,
} from "vue-router";

export type MessageSource = RouteLocationNormalized | Router
export interface EventInfo {
  type: string | symbol,
  data: any,
  source?: MessageSource,
}

export interface AsyncEvent extends EventInfo {
  resolve: (data: any) => void
  reject: (error: Error) => void
}
export type PinServer = {
  dispatch: (type: string, data: any, isAsync?: boolean, target?: MessageSource) => Promise<any>
} & Plugin

export interface ServerBase {
  id: string | symbol,
  channelCenter: BehaviorSubject<AsyncEvent>,
  errorChanel: Subject<Error>,
  clearSubs: Array<Subscription>,
  children: Array<ServerBase>,
  super?: ServerBase,
}

export type ServerRoute = ServerBase & {
  route?: RouteLocationNormalized
}

export type ServerRouter = ServerBase & { router?: Router }

export type EventCallBack = (event: AsyncEvent) => void

export type Clear = { close(): void }

export type BasePin = {
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