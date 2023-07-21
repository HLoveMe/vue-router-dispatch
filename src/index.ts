import { useRoute, useRouter } from "vue-router";
import { CurrentRServerKey, GlobalRServerKey, EmptyPin } from "./utils";
import Server, { createRxFunc } from "./RouterPin";
import {
  MessageSource,
  RoutePin,
  RouterPin,
  ServerRoute,
  ServerRouter,
} from "./type";
import {
  getCurrentInstance,
  getCurrentScope,
  inject,
  onScopeDispose,
  ShallowRef,
} from "vue";

/**
 *
 * @returns 当前路由派发
 */
function useRoutePin(): RoutePin {
  if (!getCurrentInstance()) {
    throw new Error(
      "getCurrentInstance() returned null. useRoutePin() must be called at the top of a setup function"
    );
  }
  const currentServe: ShallowRef<ServerRoute> = inject(
    CurrentRServerKey
  ) as ShallowRef<ServerRoute>;
  if (!currentServe) {
    return EmptyPin;
  }
  const pin = createRxFunc(currentServe.value, useRoute());
  getCurrentScope() &&
    onScopeDispose(() => {
      pin.subscription.close();
    });
  return pin;
}
/**
 *
 * @returns 全局派发
 */
function useRouterPin(): RouterPin {
  if (!getCurrentInstance()) {
    throw new Error(
      "getCurrentInstance() returned null. useRouterPin() must be called at the top of a setup function"
    );
  }
  const currentServe: ServerRouter = inject(GlobalRServerKey) as ServerRouter;
  if (!currentServe) {
    return EmptyPin;
  }
  const pin = createRxFunc(currentServe, useRouter());
  getCurrentScope() &&
    onScopeDispose(() => {
      pin.subscription.close();
    });
  return pin;
}

function dispatchEvent(
  type: string,
  data: any,
  isAsync?: boolean,
  target?: MessageSource
): Promise<any> {
  return Server.dispatch(type, data, isAsync, target);
}

export { Server as VueRouterPin, useRoutePin, useRouterPin, dispatchEvent };
