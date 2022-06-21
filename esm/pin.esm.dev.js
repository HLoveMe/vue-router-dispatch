(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue-router"), require("rxjs"), require("rxjs/operators"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue-router", "rxjs", "rxjs/operators", "vue"], factory);
	else if(typeof exports === 'object')
		exports["Pin"] = factory(require("vue-router"), require("rxjs"), require("rxjs/operators"), require("vue"));
	else
		root["Pin"] = factory(root["vue-router"], root["rxjs"], root["rxjs/operators"], root["vue"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_vue_router__, __WEBPACK_EXTERNAL_MODULE_rxjs__, __WEBPACK_EXTERNAL_MODULE_rxjs_operators__, __WEBPACK_EXTERNAL_MODULE_vue__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/RouterPin.ts":
/*!**************************!*\
  !*** ./src/RouterPin.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRxFunc": () => (/* binding */ createRxFunc),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ "vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _initParams__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initParams */ "./src/initParams.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_4__);





const getCurrentServer = (current) => {
    var result = {};
    const { fullPath } = current;
    const id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
    const server = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
    if (server) {
        result = server;
    }
    else {
        result.id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(current.fullPath);
        result.route = current;
        result.children = [];
        result.clearSubs = [];
        result.channelCenter = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(_initParams__WEBPACK_IMPORTED_MODULE_3__.initEvent);
    }
    return result;
};
const isEventType = (event, type) => {
    if (type instanceof RegExp) {
        if (typeof event.type !== 'string')
            return false;
        return type.test(event.type);
    }
    else {
        return event.type === type;
    }
};
const currentServer = (0,vue__WEBPACK_IMPORTED_MODULE_4__.shallowRef)(_initParams__WEBPACK_IMPORTED_MODULE_3__.SHALL_CURRENT);
function removeSub(tran, sub) {
    sub.unsubscribe();
    const index = tran.clearSubs.indexOf(sub);
    index > -1 && (tran.clearSubs = tran.clearSubs.splice(index, 1));
}
function dispatch(tran, event, isAsync = false) {
    const { channelCenter, id, errorChanel } = tran;
    const isRoot = id === _initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey;
    if (isAsync === false) {
        channelCenter.next(event);
        isRoot && tran.children.forEach(child => child.channelCenter.next(event));
        return;
    }
    ;
    const { resolve, reject } = event;
    const root = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.from)(new Promise((resolve, reject) => {
        channelCenter.next({
            ...event,
            resolve,
            reject,
        });
    }));
    const operators = tran
        .children
        .map($1 => (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.from)(new Promise((resolve, reject) => {
        $1.channelCenter.next({
            ...event,
            resolve,
            reject,
        });
    })));
    (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.zip)(root, ...operators).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.takeLast)(1)).subscribe({
        next: (promises) => resolve(promises),
        complete: () => { },
        error: (error) => {
            reject(error);
            errorChanel.next(error);
        }
    });
}
function on(tran, type, callback) {
    const { channelCenter, errorChanel } = tran;
    const sub = channelCenter
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)((event) => isEventType(event, type) || event.type === _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.bufferCount)(2, 1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(events => events[1]))
        .subscribe({
        complete: () => removeSub(tran, sub),
        next: event => callback && callback(event),
        error: (error) => errorChanel.next(error)
    });
    tran.clearSubs.push(sub);
    return { close: () => removeSub(tran, sub) };
}
function once(tran, type, callback) {
    const { channelCenter, errorChanel } = tran;
    const sub = channelCenter
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)((event) => isEventType(event, type) || event.type === _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.bufferCount)(2, 1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(events => events[1]), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1))
        .subscribe({
        complete: () => removeSub(tran, sub),
        next: event => callback && callback(event),
        error: (error) => errorChanel.next(error)
    });
    tran.clearSubs.push(sub);
    return { close: () => removeSub(tran, sub) };
}
function onBehavior(tran, type, callback) {
    const { channelCenter, errorChanel } = tran;
    const sub = channelCenter
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(event => isEventType(event, type) && event.type !== _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey))
        .subscribe({
        complete: () => removeSub(tran, sub),
        next: event => callback && callback(event),
        error: (error) => errorChanel.next(error)
    });
    tran.clearSubs.push(sub);
    return { close: () => removeSub(tran, sub) };
}
function onError(tran, callback) {
    const { errorChanel } = tran;
    const sub = errorChanel
        .subscribe({
        complete: () => {
            removeSub(tran, sub);
        },
        next: error => {
            callback && callback(error);
        },
    });
    tran.clearSubs.push(sub);
}
const createRxFunc = (pin, source) => {
    const router = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router;
    // 只有router 可以指定在哪个pin触发
    const getDispatchPin = (route) => {
        if (!!route === false)
            return pin;
        const isRoot = pin.id === _initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey;
        if (!isRoot)
            return pin;
        const { fullPath } = router.resolve(route);
        const id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
        const target = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
        return target || pin;
    };
    return {
        dispatch: (type, data, route) => {
            dispatch(getDispatchPin(route), {
                type,
                data,
                source,
                resolve: () => { },
                reject: () => { },
            });
        },
        dispatchAsync: (type, data, route) => {
            return new Promise((resolve, reject) => {
                dispatch(getDispatchPin(route), {
                    type,
                    data,
                    source,
                    resolve: (data) => resolve(data),
                    reject: (error) => reject(error),
                }, true);
            });
        },
        on: (type, callback) => {
            return on(pin, type, callback);
        },
        onBehavior: (type, callback) => {
            return onBehavior(pin, type, callback);
        },
        once: (type, callback) => {
            return once(pin, type, callback);
        },
        onError: (callback) => {
            onError(pin, callback);
        }
    };
};
function createPinServer() {
    const init = (router) => {
        router.beforeEach((to, from) => {
            const serve = getCurrentServer(to);
            if (!_initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.has(serve.id))
                _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.children.push(serve);
            _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.set(serve.id, serve);
            currentServer.value = serve;
        });
        router.afterEach((to, from) => {
            currentServer.value = getCurrentServer(to);
        });
        _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.channelCenter = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(_initParams__WEBPACK_IMPORTED_MODULE_3__.initEvent);
        _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router = router;
        _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.set(_initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.id, _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve);
        currentServer.value = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve;
    };
    const Server = {
        install(app) {
            init(app.config.globalProperties.$router);
            app.provide(_initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey, _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve);
            app.provide(_initParams__WEBPACK_IMPORTED_MODULE_3__.CurrentRServerKey, currentServer);
            app.config.globalProperties.$rs = (type, data) => {
                dispatch(currentServer.value, {
                    type,
                    data,
                    source: (0,vue_router__WEBPACK_IMPORTED_MODULE_2__.useRoute)(),
                    resolve: () => { },
                    reject: () => { },
                });
            };
        },
        dispatch: (type, data, ...args) => {
            let isAsync = false;
            let target = undefined;
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
            let pin = undefined;
            if (!!target === false)
                pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve;
            if (target === _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router)
                pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve;
            else {
                const router = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router;
                const { fullPath } = router.resolve(target);
                const id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
                pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
            }
            return new Promise((resolve, reject) => {
                dispatch(pin, {
                    type: type,
                    data: data,
                    source: undefined,
                    resolve: isAsync ? resolve : _initParams__WEBPACK_IMPORTED_MODULE_3__.noop,
                    reject: isAsync ? reject : _initParams__WEBPACK_IMPORTED_MODULE_3__.noop,
                }, !!isAsync);
                if (!isAsync)
                    resolve(null);
            });
        }
    };
    return Server;
}
const Server = createPinServer();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Server);


/***/ }),

/***/ "./src/initParams.ts":
/*!***************************!*\
  !*** ./src/initParams.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CurrentRServerKey": () => (/* binding */ CurrentRServerKey),
/* harmony export */   "EmptyPin": () => (/* binding */ EmptyPin),
/* harmony export */   "GlobalRServerKey": () => (/* binding */ GlobalRServerKey),
/* harmony export */   "Global_Serve": () => (/* binding */ Global_Serve),
/* harmony export */   "PolySymbol": () => (/* binding */ PolySymbol),
/* harmony export */   "SHALL_CURRENT": () => (/* binding */ SHALL_CURRENT),
/* harmony export */   "ServerMap": () => (/* binding */ ServerMap),
/* harmony export */   "initEvent": () => (/* binding */ initEvent),
/* harmony export */   "initEventKey": () => (/* binding */ initEventKey),
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);

function noop() { }
;
const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
const PolySymbol = (name) => 
// vr = vue router
hasSymbol
    ? Symbol.for('[r-server]: ' + name)
    : ('[r-server]: ') + name;
const initEventKey = PolySymbol('event-init');
const GlobalRServerKey = PolySymbol('GlobalRServerKey');
const CurrentRServerKey = PolySymbol('CurrentRServerKey');
const ServerMap = new Map();
const initEvent = { type: initEventKey, data: null, reject: noop, resolve: noop, source: undefined };
const SHALL_CURRENT = {
    id: '',
    channelCenter: new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initEvent),
    errorChanel: new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(),
    children: [],
    clearSubs: [],
};
const Global_Serve = {
    id: GlobalRServerKey,
    router: undefined,
    children: [],
    channelCenter: new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initEvent),
    errorChanel: new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(),
    clearSubs: [],
};
const emptyRunNoop = () => {
    console.error('please install vue-router-pin');
    return;
};
const EmptyPin = {
    on: emptyRunNoop,
    onBehavior: emptyRunNoop,
    once: emptyRunNoop,
    onError: emptyRunNoop,
    dispatch: emptyRunNoop,
    dispatchAsync: emptyRunNoop,
};



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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VueRouterPin": () => (/* reexport safe */ _RouterPin__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "dispatchEvent": () => (/* binding */ dispatchEvent),
/* harmony export */   "useRoutePin": () => (/* binding */ useRoutePin),
/* harmony export */   "useRouterPin": () => (/* binding */ useRouterPin)
/* harmony export */ });
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-router */ "vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _initParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initParams */ "./src/initParams.ts");
/* harmony import */ var _RouterPin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RouterPin */ "./src/RouterPin.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_3__);




/**
 *
 * @returns 当前路由派发
 */
function useRoutePin() {
    const currentServe = (0,vue__WEBPACK_IMPORTED_MODULE_3__.inject)(_initParams__WEBPACK_IMPORTED_MODULE_1__.CurrentRServerKey);
    if (!currentServe) {
        return _initParams__WEBPACK_IMPORTED_MODULE_1__.EmptyPin;
    }
    return (0,_RouterPin__WEBPACK_IMPORTED_MODULE_2__.createRxFunc)(currentServe.value, (0,vue_router__WEBPACK_IMPORTED_MODULE_0__.useRoute)());
}
/**
 *
 * @returns 全局派发
 */
function useRouterPin() {
    const currentServe = (0,vue__WEBPACK_IMPORTED_MODULE_3__.inject)(_initParams__WEBPACK_IMPORTED_MODULE_1__.GlobalRServerKey);
    if (!currentServe) {
        return _initParams__WEBPACK_IMPORTED_MODULE_1__.EmptyPin;
    }
    return (0,_RouterPin__WEBPACK_IMPORTED_MODULE_2__.createRxFunc)(currentServe, (0,vue_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)());
}
function dispatchEvent(type, data, isAsync, target) {
    return _RouterPin__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch(type, data, isAsync, target);
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=pin.esm.dev.js.map