import { useRoute, useRouter } from "vue-router";
import { CurrentRServerKey, GlobalRServerKey } from "./initParams";
import Server, { createRxFunc } from "./RouterPin";
import { MessageSource, RoutePin, RouterPin, ServerRoute, ServerRouter } from "./type";
import { inject } from "vue";

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