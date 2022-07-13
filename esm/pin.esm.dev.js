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
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "rxjs");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-router */ "vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _initParams__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./initParams */ "./src/initParams.ts");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_4__);






var getCurrentServer = function (current) {
    var result = {};
    var fullPath = current.fullPath;
    var id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
    var server = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
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
var currentServer = (0,vue__WEBPACK_IMPORTED_MODULE_4__.shallowRef)(_initParams__WEBPACK_IMPORTED_MODULE_3__.SHALL_CURRENT);
function removeSub(tran, sub) {
    sub && sub.unsubscribe();
    var index = tran.clearSubs.indexOf(sub);
    index > -1 && (tran.clearSubs.splice(index, 1));
}
function dispatch(tran, event, isAsync) {
    if (isAsync === void 0) { isAsync = false; }
    var channelCenter = tran.channelCenter, id = tran.id, errorChanel = tran.errorChanel;
    var isRoot = id === _initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey;
    if (isAsync === false) {
        channelCenter.next(event);
        isRoot && tran.children.forEach(function (child) { return child.channelCenter.next(event); });
        return;
    }
    ;
    var resolve = event.resolve, reject = event.reject;
    var root = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.from)(new Promise(function (resolve, reject) {
        channelCenter.next((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, event), { resolve: resolve, reject: reject }));
    }));
    var operators = tran
        .children
        .map(function ($1) { return (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.from)(new Promise(function (resolve, reject) {
        $1.channelCenter.next((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__assign)({}, event), { resolve: resolve, reject: reject }));
    })); });
    rxjs__WEBPACK_IMPORTED_MODULE_0__.zip.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__spreadArray)([root], operators, false)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.takeLast)(1)).subscribe({
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
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(function (event) { return isEventType(event, type) || event.type === _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.bufferCount)(2, 1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(function (events) { return events[1]; }))
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
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(function (event) { return isEventType(event, type) || event.type === _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.bufferCount)(2, 1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(function (events) { return events[1]; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.take)(1))
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
        .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.filter)(function (event) { return isEventType(event, type) && event.type !== _initParams__WEBPACK_IMPORTED_MODULE_3__.initEventKey; }))
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
        },
    });
    tran.clearSubs.push(sub);
    return { close: function () { return removeSub(tran, sub); } };
}
var createRxFunc = function (pin, source) {
    var router = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router;
    // 只有router 可以指定在哪个pin触发
    var getDispatchPin = function (route) {
        if (!!route === false)
            return pin;
        var isRoot = pin.id === _initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey;
        if (!isRoot)
            return pin;
        var fullPath = router.resolve(route).fullPath;
        var id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
        var target = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
        return target || pin;
    };
    return {
        dispatch: function (type, data, route) {
            dispatch(getDispatchPin(route), {
                type: type,
                data: data,
                source: source,
                resolve: function () { },
                reject: function () { },
            });
        },
        dispatchAsync: function (type, data, route) {
            return new Promise(function (resolve, reject) {
                dispatch(getDispatchPin(route), {
                    type: type,
                    data: data,
                    source: source,
                    resolve: function (data) { return resolve(data); },
                    reject: function (error) { return reject(error); },
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
function createPinServer() {
    var init = function (router) {
        router.beforeEach(function (to, from) {
            var serve = getCurrentServer(to);
            if (!_initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.has(serve.id))
                _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.children.push(serve);
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
        install: function (app) {
            init(app.config.globalProperties.$router);
            app.provide(_initParams__WEBPACK_IMPORTED_MODULE_3__.GlobalRServerKey, _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve);
            app.provide(_initParams__WEBPACK_IMPORTED_MODULE_3__.CurrentRServerKey, currentServer);
            app.config.globalProperties.$rs = function (type, data) {
                dispatch(currentServer.value, {
                    type: type,
                    data: data,
                    source: (0,vue_router__WEBPACK_IMPORTED_MODULE_2__.useRoute)(),
                    resolve: function () { },
                    reject: function () { },
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
                pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve;
            else {
                var router = _initParams__WEBPACK_IMPORTED_MODULE_3__.Global_Serve.router;
                var fullPath = router.resolve(target).fullPath;
                var id = (0,_initParams__WEBPACK_IMPORTED_MODULE_3__.PolySymbol)(fullPath);
                pin = _initParams__WEBPACK_IMPORTED_MODULE_3__.ServerMap.get(id);
            }
            return new Promise(function (resolve, reject) {
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
var Server = createPinServer();
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
var hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var PolySymbol = function (name) {
    // vr = vue router
    return hasSymbol
        ? Symbol.for('[r-server]: ' + name)
        : ('[r-server]: ') + name;
};
var initEventKey = PolySymbol('event-init');
var GlobalRServerKey = PolySymbol('GlobalRServerKey');
var CurrentRServerKey = PolySymbol('CurrentRServerKey');
var ServerMap = new Map();
var initEvent = { type: initEventKey, data: null, reject: noop, resolve: noop, source: undefined };
var SHALL_CURRENT = {
    id: '',
    channelCenter: new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initEvent),
    errorChanel: new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(),
    children: [],
    clearSubs: [],
};
var Global_Serve = {
    id: GlobalRServerKey,
    router: undefined,
    children: [],
    channelCenter: new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(initEvent),
    errorChanel: new rxjs__WEBPACK_IMPORTED_MODULE_0__.Subject(),
    clearSubs: [],
};
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
    dispatchAsync: emptyRunNoop,
};



/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldIn": () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArray": () => (/* binding */ __spreadArray),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__values": () => (/* binding */ __values)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}


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
//# sourceMappingURL=pin.esm.dev.js.map