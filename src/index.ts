import { useRoute, useRouter } from "vue-router";
import { CurrentRServerKey, GlobalRServerKey, EmptyPin } from "./initParams";
import Server, { createRxFunc } from "./RouterPin";
import { MessageSource, RoutePin, RouterPin, ServerRoute, ServerRouter } from "./type";
import { inject, ShallowRef } from "vue";

/**
 * 
 * @returns 当前路由派发
 */
function useRoutePin(): RoutePin {
  const currentServe: ShallowRef<ServerRoute> = inject(CurrentRServerKey) as ShallowRef<ServerRoute>;
  if (!currentServe) {
    return EmptyPin
  }
  return createRxFunc(currentServe.value, useRoute())
}
/**
 * 
 * @returns 全局派发
 */
function useRouterPin(): RouterPin {
  const currentServe: ServerRouter = inject(GlobalRServerKey) as ServerRouter;
  if (!currentServe) {
    return EmptyPin
  }
  return createRxFunc(currentServe, useRouter());
}

function dispatchEvent(type: string, data: any, isAsync?: boolean, target?: MessageSource): Promise<any> {
  return Server.dispatch(type, data, isAsync, target);
}

export {
  Server as VueRouterPin,
  useRoutePin,
  useRouterPin,
  dispatchEvent,
}