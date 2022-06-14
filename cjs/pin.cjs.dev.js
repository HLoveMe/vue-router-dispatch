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

/***/ "./dist/RouterPin.js":
/*!***************************!*\
  !*** ./dist/RouterPin.js ***!
  \***************************/
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
/* harmony import */ var _initParams__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initParams */ "./dist/initParams.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_4__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var getCurrentServer = function getCurrentServer(current) {
  var result = {};
  var fullPath = current.fullPath;
  var id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
  var server = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);

  if (server) {
    result = server;
  } else {
    result.id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(current.fullPath);
    result.route = current;
    result.children = [];
    result.clearSubs = [];
    result.channelCenter = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(_initParams__WEBPACK_IMPORTED_MODULE_3__.initEvent);
  }

  return result;
};

var isEventType = function isEventType(event, type) {
  if (type instanceof RegExp) {
    if (typeof event.type !== 'string') return false;
    return type.test(event.type);
  } else {
    return event.type === type;
  }
};

var currentServer = (0,vue__WEBPACK_IMPORTED_MODULE_4__.shallowRef)(_initParams__WEBPACK_IMPORTED_MODULE_3__.SHALL_CURRENT);

function removeSub(tran, sub) {
  sub.unsubscribe();
  var index = tran.clearSubs.indexOf(sub);
  index > -1 && (tran.clearSubs = tran.clearSubs.splice(index, 1));
}

function _dispatch(tran, event) {
  var isAsync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var channelCenter = tran.channelCenter,
      id = tran.id,
      errorChanel = tran.errorChanel;
  var isRoot = id === _initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey;

  if (isAsync === false) {
    channelCenter.next(event);
    isRoot && tran.children.forEach(function (child) {
      return child.channelCenter.next(event);
    });
    return;
  }

  ;
  var resolve = event.resolve,
      reject = event.reject;
  var root = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.from)(new Promise(function (resolve, reject) {
    channelCenter.next(_objectSpread(_objectSpread({}, event), {}, {
      resolve: resolve,
      reject: reject
    }));
  }));
  var operators = tran.children.map(function ($1) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.from)(new Promise(function (resolve, reject) {
      $1.channelCenter.next(_objectSpread(_objectSpread({}, event), {}, {
        resolve: resolve,
        reject: reject
      }));
    }));
  });
  rxjs__WEBPACK_IMPORTED_MODULE_0__.zip.apply(void 0, [root].concat(_toConsumableArray(operators))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.takeLast)(1)).subscribe({
    next: function next(promises) {
      return resolve(promises);
    },
    complete: function complete() {},
    error: function error(_error) {
      reject(_error);
      errorChanel.next(_error);
    }
  });
}

function _on(tran, type, callback) {
  var channelCenter = tran.channelCenter,
      errorChanel = tran.errorChanel;
  var sub = channelCenter.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(function (event) {
    return isEventType(event, type) || event.type === _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey;
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.bufferCount)(2, 1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(function (events) {
    return events[1];
  })).subscribe({
    complete: function complete() {
      return removeSub(tran, sub);
    },
    next: function next(event) {
      return callback && callback(event);
    },
    error: function error(_error2) {
      return errorChanel.next(_error2);
    }
  });
  tran.clearSubs.push(sub);
  return {
    close: function close() {
      return removeSub(tran, sub);
    }
  };
}

function _once(tran, type, callback) {
  var channelCenter = tran.channelCenter,
      errorChanel = tran.errorChanel;
  var sub = channelCenter.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(function (event) {
    return isEventType(event, type) || event.type === _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey;
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.bufferCount)(2, 1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(function (events) {
    return events[1];
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1)).subscribe({
    complete: function complete() {
      return removeSub(tran, sub);
    },
    next: function next(event) {
      return callback && callback(event);
    },
    error: function error(_error3) {
      return errorChanel.next(_error3);
    }
  });
  tran.clearSubs.push(sub);
  return {
    close: function close() {
      return removeSub(tran, sub);
    }
  };
}

function _onBehavior(tran, type, callback) {
  var channelCenter = tran.channelCenter,
      errorChanel = tran.errorChanel;
  var sub = channelCenter.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(function (event) {
    return isEventType(event, type) && event.type !== _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey;
  })).subscribe({
    complete: function complete() {
      return removeSub(tran, sub);
    },
    next: function next(event) {
      return callback && callback(event);
    },
    error: function error(_error4) {
      return errorChanel.next(_error4);
    }
  });
  tran.clearSubs.push(sub);
  return {
    close: function close() {
      return removeSub(tran, sub);
    }
  };
}

function _onError(tran, callback) {
  var errorChanel = tran.errorChanel;
  var sub = errorChanel.subscribe({
    complete: function complete() {
      removeSub(tran, sub);
    },
    next: function next(error) {
      callback && callback(error);
    }
  });
  tran.clearSubs.push(sub);
}

var createRxFunc = function createRxFunc(pin, source) {
  var router = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router; // 只有router 可以指定在哪个pin触发

  var getDispatchPin = function getDispatchPin(route) {
    if (!!route === false) return pin;
    var isRoot = pin.id === _initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey;
    if (!isRoot) return pin;

    var _router$resolve = router.resolve(route),
        fullPath = _router$resolve.fullPath;

    var id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
    var target = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
    return target || pin;
  };

  return {
    dispatch: function dispatch(type, data, route) {
      _dispatch(getDispatchPin(route), {
        type: type,
        data: data,
        source: source,
        resolve: function resolve() {},
        reject: function reject() {}
      });
    },
    dispatchAsync: function dispatchAsync(type, data, route) {
      return new Promise(function (_resolve, _reject) {
        _dispatch(getDispatchPin(route), {
          type: type,
          data: data,
          source: source,
          resolve: function resolve(data) {
            return _resolve(data);
          },
          reject: function reject(error) {
            return _reject(error);
          }
        }, true);
      });
    },
    on: function on(type, callback) {
      return _on(pin, type, callback);
    },
    onBehavior: function onBehavior(type, callback) {
      return _onBehavior(pin, type, callback);
    },
    once: function once(type, callback) {
      return _once(pin, type, callback);
    },
    onError: function onError(callback) {
      _onError(pin, callback);
    }
  };
};

function createPinServer() {
  var init = function init(router) {
    router.beforeEach(function (to, from) {
      var serve = getCurrentServer(to);
      if (!_initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.has(serve.id)) _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.children.push(serve);
      _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.set(serve.id, serve);
      currentServer.value = serve;
    });
    router.afterEach(function (to, from) {
      currentServer.value = getCurrentServer(to);
    });
    _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.channelCenter = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(_initParams__WEBPACK_IMPORTED_MODULE_3__.initEvent);
    _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router = router;
    _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.set(_initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.id, _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve);
    currentServer.value = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve;
  };

  var Server = {
    install: function install(app) {
      init(app.config.globalProperties.$router);
      app.provide(_initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey, _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve);
      app.provide(_initParams__WEBPACK_IMPORTED_MODULE_3__.CurrentRServerKey, currentServer);

      app.config.globalProperties.$rs = function (type, data) {
        _dispatch(currentServer.value, {
          type: type,
          data: data,
          source: (0,vue_router__WEBPACK_IMPORTED_MODULE_2__.useRoute)(),
          resolve: function resolve() {},
          reject: function reject() {}
        });
      };
    },
    dispatch: function dispatch(type, data) {
      var isAsync = false;
      var target = undefined;

      if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 2) {
        isAsync = arguments.length <= 2 ? undefined : arguments[2];
        target = arguments.length <= 3 ? undefined : arguments[3];
      } else if ((arguments.length <= 2 ? 0 : arguments.length - 2) === 1) {
        if (typeof (arguments.length <= 2 ? undefined : arguments[2]) === 'boolean') {
          isAsync = arguments.length <= 2 ? undefined : arguments[2];
          target = undefined;
        } else {
          target = arguments.length <= 2 ? undefined : arguments[2];
          isAsync = false;
        }
      }

      var pin = undefined;
      if (!!target === false) pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve;
      if (target === _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router) pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve;else {
        var router = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router;

        var _router$resolve2 = router.resolve(target),
            fullPath = _router$resolve2.fullPath;

        var id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
        pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
      }
      return new Promise(function (resolve, reject) {
        _dispatch(pin, {
          type: type,
          data: data,
          source: undefined,
          resolve: isAsync ? resolve : _initParams__WEBPACK_IMPORTED_MODULE_3__.noop,
          reject: isAsync ? reject : _initParams__WEBPACK_IMPORTED_MODULE_3__.noop
        }, !!isAsync);

        if (!isAsync) resolve(null);
      });
    }
  };
  return Server;
}

var Server = createPinServer();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Server);

/***/ }),

/***/ "./dist/initParams.js":
/*!****************************!*\
  !*** ./dist/initParams.js ***!
  \****************************/
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
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }



function noop() {}

;
var hasSymbol = typeof Symbol === 'function' && _typeof(Symbol.toStringTag) === 'symbol';

var PolySymbol = function PolySymbol(name) {
  return (// vr = vue router
    hasSymbol ? Symbol["for"]('[r-server]: ' + name) : '[r-server]: ' + name
  );
};

var initEventKey = PolySymbol('event-init');
var GlobalRServerKey = PolySymbol('GlobalRServerKey');
var CurrentRServerKey = PolySymbol('CurrentRServerKey');
var ServerMap = new Map();
var initEvent = {
  type: initEventKey,
  data: null,
  reject: noop,
  resolve: noop,
  source: undefined
};
var SHALL_CURRENT = {
  id: '',
  channelCenter: new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initEvent),
  errorChanel: new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(),
  children: [],
  clearSubs: []
};
var Global_Serve = {
  id: GlobalRServerKey,
  router: undefined,
  children: [],
  channelCenter: new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initEvent),
  errorChanel: new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(),
  clearSubs: []
};

var emptyRunNoop = function emptyRunNoop() {
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
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VueRouterPin": () => (/* reexport safe */ _RouterPin__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "dispatchEvent": () => (/* binding */ dispatchEvent),
/* harmony export */   "useRoutePin": () => (/* binding */ useRoutePin),
/* harmony export */   "useRouterPin": () => (/* binding */ useRouterPin)
/* harmony export */ });
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-router */ "vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _initParams__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initParams */ "./dist/initParams.js");
/* harmony import */ var _RouterPin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RouterPin */ "./dist/RouterPin.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_3__);




/**
 *
 * @returns 当前路由派发
 */

function useRoutePin() {
  var currentServe = (0,vue__WEBPACK_IMPORTED_MODULE_3__.inject)(_initParams__WEBPACK_IMPORTED_MODULE_1__.CurrentRServerKey);

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
  var currentServe = (0,vue__WEBPACK_IMPORTED_MODULE_3__.inject)(_initParams__WEBPACK_IMPORTED_MODULE_1__.GlobalRServerKey);

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
//# sourceMappingURL=pin.cjs.dev.js.map