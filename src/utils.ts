import { BehaviorSubject, Subject } from "rxjs";
import {
  AsyncEvent,
  RoutePin,
  RouterPin,
  ServerBase,
  ServerRouter,
} from "./type";

function noop() {}

function getUUID() {
  return `${new Date().getTime()}_${Math.random()}`;
}

const hasSymbol =
  typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";

const PolySymbol = (name: string) =>
  // vr = vue router
  hasSymbol ? Symbol.for("[r-server]: " + name) : "[r-server]: " + name;

const initEventKey = PolySymbol("event-init");

const GlobalRServerKey = PolySymbol("GlobalRServerKey");

const CurrentRServerKey = PolySymbol("CurrentRServerKey");

const ServerMap = new Map<string | symbol, ServerBase>();

const initEvent: AsyncEvent = {
  type: initEventKey,
  data: null,
  reject: noop,
  resolve: noop,
  source: undefined,
};

const SHALL_CURRENT: ServerBase = {
  id: "",
  channelCenter: new BehaviorSubject<AsyncEvent>(initEvent),
  errorChanel: new Subject(),
  children: [],
  clearSubs: [],
  _events: new Map(),
};

const Global_Serve: ServerRouter = {
  id: GlobalRServerKey,
  router: undefined,
  children: [],
  channelCenter: new BehaviorSubject<AsyncEvent>(initEvent),
  errorChanel: new Subject(),
  clearSubs: [],
  _events: new Map(),
};

const emptyRunNoop = (): any => {
  console.error("please install vue-router-pin");
  return;
};
const EmptyPin: RoutePin & RouterPin = {
  subscription: { _finalizers: [], close: () => {} },
  on: emptyRunNoop,
  onBehavior: emptyRunNoop,
  once: emptyRunNoop,
  onError: emptyRunNoop,
  dispatch: emptyRunNoop,
  dispatchAsync: emptyRunNoop,
  onEvent: emptyRunNoop,
};

export {
  GlobalRServerKey,
  CurrentRServerKey,
  SHALL_CURRENT,
  Global_Serve,
  ServerMap,
  initEvent,
  initEventKey,
  PolySymbol,
  noop,
  EmptyPin,
  getUUID
};
