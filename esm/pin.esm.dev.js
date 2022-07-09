(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("rxjs"), require("rxjs/operators"), require("vue"), require("vue-router"));
	else if(typeof define === 'function' && define.amd)
		define(["rxjs", "rxjs/operators", "vue", "vue-router"], factory);
	else if(typeof exports === 'object')
		exports["Pin"] = factory(require("rxjs"), require("rxjs/operators"), require("vue"), require("vue-router"));
	else
		root["Pin"] = factory(root["rxjs"], root["rxjs/operators"], root["vue"], root["vue-router"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_rxjs__, __WEBPACK_EXTERNAL_MODULE_rxjs_operators__, __WEBPACK_EXTERNAL_MODULE_vue__, __WEBPACK_EXTERNAL_MODULE_vue_router__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/RouterPin.ts":
/*!**************************!*\
  !*** ./src/RouterPin.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.createRxFunc = void 0;
var rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
var vue_router_1 = __webpack_require__(/*! vue-router */ "vue-router");
var initParams_1 = __webpack_require__(/*! ./initParams */ "./src/initParams.ts");
var vue_1 = __webpack_require__(/*! vue */ "vue");
var getCurrentServer = function (current) {
    var result = {};
    var fullPath = current.fullPath;
    var id = (0, initParams_1.PolySymbol)(fullPath);
    var server = initParams_1.ServerMap.get(id);
    if (server) {
        result = server;
    }
    else {
        result.id = (0, initParams_1.PolySymbol)(current.fullPath);
        result.route = current;
        result.children = [];
        result.clearSubs = [];
        result.channelCenter = new rxjs_1.BehaviorSubject(initParams_1.initEvent);
    }
    return result;
};
var isEventType = function (event, type) {
    if (type instanceof RegExp) {
        if (typeof event.type !== 'string')
            return false;
        return type.test(event.type);
    }
    else {
        return event.type === type;
    }
};
var currentServer = (0, vue_1.shallowRef)(initParams_1.SHALL_CURRENT);
function removeSub(tran, sub) {
    sub && sub.unsubscribe();
    var index = tran.clearSubs.indexOf(sub);
    index > -1 && (tran.clearSubs.splice(index, 1));
}
function dispatch(tran, event, isAsync) {
    if (isAsync === void 0) { isAsync = false; }
    var channelCenter = tran.channelCenter, id = tran.id, errorChanel = tran.errorChanel;
    var isRoot = id === initParams_1.GlobalRServerKey;
    if (isAsync === false) {
        channelCenter.next(event);
        isRoot && tran.children.forEach(function (child) { return child.channelCenter.next(event); });
        return;
    }
    ;
    var resolve = event.resolve, reject = event.reject;
    var root = (0, rxjs_1.from)(new Promise(function (resolve, reject) {
        channelCenter.next(__assign(__assign({}, event), { resolve: resolve, reject: reject }));
    }));
    var operators = tran
        .children
        .map(function ($1) { return (0, rxjs_1.from)(new Promise(function (resolve, reject) {
        $1.channelCenter.next(__assign(__assign({}, event), { resolve: resolve, reject: reject }));
    })); });
    rxjs_1.zip.apply(void 0, __spreadArray([root], operators, false)).pipe((0, operators_1.takeLast)(1)).subscribe({
        next: function (promises) { return resolve(promises); },
        complete: function () { },
        error: function (error) {
            reject(error);
            errorChanel.next(error);
        }
    });
}
function on(tran, type, callback) {
    var channelCenter = tran.channelCenter, errorChanel = tran.errorChanel;
    var sub = channelCenter
        .pipe((0, operators_1.filter)(function (event) { return isEventType(event, type) || event.type === initParams_1.initEventKey; }), (0, operators_1.bufferCount)(2, 1), (0, operators_1.map)(function (events) { return events[1]; }))
        .subscribe({
        complete: function () { return removeSub(tran, sub); },
        next: function (event) { return callback && callback(event); },
        error: function (error) { return errorChanel.next(error); }
    });
    tran.clearSubs.push(sub);
    return { close: function () { return removeSub(tran, sub); } };
}
function once(tran, type, callback) {
    var channelCenter = tran.channelCenter, errorChanel = tran.errorChanel;
    var sub = channelCenter
        .pipe((0, operators_1.filter)(function (event) { return isEventType(event, type) || event.type === initParams_1.initEventKey; }), (0, operators_1.bufferCount)(2, 1), (0, operators_1.map)(function (events) { return events[1]; }), (0, operators_1.take)(1))
        .subscribe({
        complete: function () { return removeSub(tran, sub); },
        next: function (event) { return callback && callback(event); },
        error: function (error) { return errorChanel.next(error); }
    });
    tran.clearSubs.push(sub);
    return { close: function () { return removeSub(tran, sub); } };
}
function onBehavior(tran, type, callback) {
    var channelCenter = tran.channelCenter, errorChanel = tran.errorChanel;
    var sub = channelCenter
        .pipe((0, operators_1.filter)(function (event) { return isEventType(event, type) && event.type !== initParams_1.initEventKey; }))
        .subscribe({
        complete: function () { return removeSub(tran, sub); },
        next: function (event) { return callback && callback(event); },
        error: function (error) { return errorChanel.next(error); }
    });
    tran.clearSubs.push(sub);
    return { close: function () { return removeSub(tran, sub); } };
}
function onError(tran, callback) {
    var errorChanel = tran.errorChanel;
    var sub = errorChanel
        .subscribe({
        complete: function () {
            removeSub(tran, sub);
        },
        next: function (error) {
            callback && callback(error);
        }
    });
    tran.clearSubs.push(sub);
    return { close: function () { return removeSub(tran, sub); } };
}
var createRxFunc = function (pin, source) {
    var router = initParams_1.Global_Serve.router;
    // 只有router 可以指定在哪个pin触发
    var getDispatchPin = function (route) {
        if (!!route === false)
            return pin;
        var isRoot = pin.id === initParams_1.GlobalRServerKey;
        if (!isRoot)
            return pin;
        var fullPath = router.resolve(route).fullPath;
        var id = (0, initParams_1.PolySymbol)(fullPath);
        var target = initParams_1.ServerMap.get(id);
        return target || pin;
    };
    return {
        dispatch: function (type, data, route) {
            dispatch(getDispatchPin(route), {
                type: type,
                data: data,
                source: source,
                resolve: function () { },
                reject: function () { }
            });
        },
        dispatchAsync: function (type, data, route) {
            return new Promise(function (resolve, reject) {
                dispatch(getDispatchPin(route), {
                    type: type,
                    data: data,
                    source: source,
                    resolve: function (data) { return resolve(data); },
                    reject: function (error) { return reject(error); }
                }, true);
            });
        },
        on: function (type, callback) {
            return on(pin, type, callback);
        },
        onBehavior: function (type, callback) {
            return onBehavior(pin, type, callback);
        },
        once: function (type, callback) {
            return once(pin, type, callback);
        },
        onError: function (callback) {
            return onError(pin, callback);
        }
    };
};
exports.createRxFunc = createRxFunc;
function createPinServer() {
    var init = function (router) {
        router.beforeEach(function (to, from) {
            var serve = getCurrentServer(to);
            if (!initParams_1.ServerMap.has(serve.id))
                initParams_1.Global_Serve.children.push(serve);
            initParams_1.ServerMap.set(serve.id, serve);
            currentServer.value = serve;
        });
        router.afterEach(function (to, from) {
            currentServer.value = getCurrentServer(to);
        });
        initParams_1.Global_Serve.channelCenter = new rxjs_1.BehaviorSubject(initParams_1.initEvent);
        initParams_1.Global_Serve.router = router;
        initParams_1.ServerMap.set(initParams_1.Global_Serve.id, initParams_1.Global_Serve);
        currentServer.value = initParams_1.Global_Serve;
    };
    var Server = {
        install: function (app) {
            init(app.config.globalProperties.$router);
            app.provide(initParams_1.GlobalRServerKey, initParams_1.Global_Serve);
            app.provide(initParams_1.CurrentRServerKey, currentServer);
            app.config.globalProperties.$rs = function (type, data) {
                dispatch(currentServer.value, {
                    type: type,
                    data: data,
                    source: (0, vue_router_1.useRoute)(),
                    resolve: function () { },
                    reject: function () { }
                });
            };
        },
        dispatch: function (type, data) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var isAsync = false;
            var target = undefined;
            args = args.filter(function ($1) { return $1 !== undefined; });
            if (args.length === 2) {
                isAsync = args[0];
                target = args[1];
            }
            else if (args.length === 1) {
                if (typeof args[0] === 'boolean') {
                    isAsync = args[0];
                    target = undefined;
                }
                else {
                    target = args[0];
                    isAsync = false;
                }
            }
            else {
                target = undefined;
                isAsync = false;
            }
            var pin = undefined;
            if (!!target === false)
                pin = initParams_1.Global_Serve;
            else {
                var router = initParams_1.Global_Serve.router;
                var fullPath = router.resolve(target).fullPath;
                var id = (0, initParams_1.PolySymbol)(fullPath);
                pin = initParams_1.ServerMap.get(id);
            }
            return new Promise(function (resolve, reject) {
                dispatch(pin, {
                    type: type,
                    data: data,
                    source: undefined,
                    resolve: isAsync ? resolve : initParams_1.noop,
                    reject: isAsync ? reject : initParams_1.noop
                }, !!isAsync);
                if (!isAsync)
                    resolve(null);
            });
        }
    };
    return Server;
}
var Server = createPinServer();
exports["default"] = Server;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.dispatchEvent = exports.useRouterPin = exports.useRoutePin = exports.VueRouterPin = void 0;
var vue_router_1 = __webpack_require__(/*! vue-router */ "vue-router");
var initParams_1 = __webpack_require__(/*! ./initParams */ "./src/initParams.ts");
var RouterPin_1 = __importStar(__webpack_require__(/*! ./RouterPin */ "./src/RouterPin.ts"));
exports.VueRouterPin = RouterPin_1["default"];
var vue_1 = __webpack_require__(/*! vue */ "vue");
/**
 *
 * @returns 当前路由派发
 */
function useRoutePin() {
    var currentServe = (0, vue_1.inject)(initParams_1.CurrentRServerKey);
    if (!currentServe) {
        return initParams_1.EmptyPin;
    }
    return (0, RouterPin_1.createRxFunc)(currentServe.value, (0, vue_router_1.useRoute)());
}
exports.useRoutePin = useRoutePin;
/**
 *
 * @returns 全局派发
 */
function useRouterPin() {
    var currentServe = (0, vue_1.inject)(initParams_1.GlobalRServerKey);
    if (!currentServe) {
        return initParams_1.EmptyPin;
    }
    return (0, RouterPin_1.createRxFunc)(currentServe, (0, vue_router_1.useRouter)());
}
exports.useRouterPin = useRouterPin;
function dispatchEvent(type, data, isAsync, target) {
    return RouterPin_1["default"].dispatch(type, data, isAsync, target);
}
exports.dispatchEvent = dispatchEvent;


/***/ }),

/***/ "./src/initParams.ts":
/*!***************************!*\
  !*** ./src/initParams.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


exports.__esModule = true;
exports.EmptyPin = exports.noop = exports.PolySymbol = exports.initEventKey = exports.initEvent = exports.ServerMap = exports.Global_Serve = exports.SHALL_CURRENT = exports.CurrentRServerKey = exports.GlobalRServerKey = void 0;
var rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
function noop() { }
exports.noop = noop;
;
var hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var PolySymbol = function (name) {
    // vr = vue router
    return hasSymbol
        ? Symbol["for"]('[r-server]: ' + name)
        : ('[r-server]: ') + name;
};
exports.PolySymbol = PolySymbol;
var initEventKey = PolySymbol('event-init');
exports.initEventKey = initEventKey;
var GlobalRServerKey = PolySymbol('GlobalRServerKey');
exports.GlobalRServerKey = GlobalRServerKey;
var CurrentRServerKey = PolySymbol('CurrentRServerKey');
exports.CurrentRServerKey = CurrentRServerKey;
var ServerMap = new Map();
exports.ServerMap = ServerMap;
var initEvent = { type: initEventKey, data: null, reject: noop, resolve: noop, source: undefined };
exports.initEvent = initEvent;
var SHALL_CURRENT = {
    id: '',
    channelCenter: new rxjs_1.BehaviorSubject(initEvent),
    errorChanel: new rxjs_1.Subject(),
    children: [],
    clearSubs: []
};
exports.SHALL_CURRENT = SHALL_CURRENT;
var Global_Serve = {
    id: GlobalRServerKey,
    router: undefined,
    children: [],
    channelCenter: new rxjs_1.BehaviorSubject(initEvent),
    errorChanel: new rxjs_1.Subject(),
    clearSubs: []
};
exports.Global_Serve = Global_Serve;
var emptyRunNoop = function () {
    console.error('please install vue-router-pin');
    return;
};
var EmptyPin = {
    on: emptyRunNoop,
    onBehavior: emptyRunNoop,
    once: emptyRunNoop,
    onError: emptyRunNoop,
    dispatch: emptyRunNoop,
    dispatchAsync: emptyRunNoop
};
exports.EmptyPin = EmptyPin;


/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs__;

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_operators__;

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "vue" ***!
  \**********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;

/***/ }),

/***/ "vue-router":
/*!*****************************!*\
  !*** external "vue-router" ***!
  \*****************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_vue_router__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=pin.esm.dev.js.map