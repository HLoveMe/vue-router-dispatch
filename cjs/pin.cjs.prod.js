!function(r,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("vue-router"),require("rxjs"),require("vue")):"function"==typeof define&&define.amd?define(["vue-router","rxjs","vue"],e):"object"==typeof exports?exports.Pin=e(require("vue-router"),require("rxjs"),require("vue")):r.Pin=e(r["vue-router"],r.rxjs,r.vue)}(self,((r,e,t)=>(()=>{"use strict";var n={832:r=>{r.exports=e},748:r=>{r.exports=t},557:e=>{e.exports=r}},o={};function i(r){var e=o[r];if(void 0!==e)return e.exports;var t=o[r]={exports:{}};return n[r](t,t.exports,i),t.exports}i.d=(r,e)=>{for(var t in e)i.o(e,t)&&!i.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:e[t]})},i.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),i.r=r=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})};var u={};return(()=>{i.r(u),i.d(u,{dispatchEvent:()=>br,useRoutePin:()=>vr,useRouterPin:()=>yr});var r=i(557),e=i(832);function t(){}var n="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,o=r=>n?Symbol.for("[r-server]: "+r):"[r-server]: "+r,c=o("event-init"),a=o("GlobalRServerKey"),l=o("CurrentRServerKey"),s=new Map,f={type:c,data:null,reject:t,resolve:t,source:void 0},p={id:"",channelCenter:new e.BehaviorSubject(f),errorChanel:new e.Subject,children:[],clearSubs:[]},h={id:a,router:void 0,children:[],channelCenter:new e.BehaviorSubject(f),errorChanel:new e.Subject,clearSubs:[]},v=function(r,e){return v=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t])},v(r,e)};function y(r,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function t(){this.constructor=r}v(r,e),r.prototype=null===e?Object.create(e):(t.prototype=e.prototype,new t)}function b(r){var e="function"==typeof Symbol&&Symbol.iterator,t=e&&r[e],n=0;if(t)return t.call(r);if(r&&"number"==typeof r.length)return{next:function(){return r&&n>=r.length&&(r=void 0),{value:r&&r[n++],done:!r}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function d(r,e){var t="function"==typeof Symbol&&r[Symbol.iterator];if(!t)return r;var n,o,i=t.call(r),u=[];try{for(;(void 0===e||e-- >0)&&!(n=i.next()).done;)u.push(n.value)}catch(r){o={error:r}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return u}function m(r,e,t){if(t||2===arguments.length)for(var n,o=0,i=e.length;o<i;o++)!n&&o in e||(n||(n=Array.prototype.slice.call(e,0,o)),n[o]=e[o]);return r.concat(n||Array.prototype.slice.call(e))}function x(r){return"function"==typeof r}Object.create,Object.create;var w,g=((w=function(r){return function(e){r(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(r,e){return e+1+") "+r.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e}}((function(r){Error.call(r),r.stack=(new Error).stack}))).prototype=Object.create(Error.prototype),w.prototype.constructor=w,w);function j(r,e){if(r){var t=r.indexOf(e);0<=t&&r.splice(t,1)}}var _=function(){function r(r){this.initialTeardown=r,this.closed=!1,this._parentage=null,this._finalizers=null}return r.prototype.unsubscribe=function(){var r,e,t,n,o;if(!this.closed){this.closed=!0;var i=this._parentage;if(i)if(this._parentage=null,Array.isArray(i))try{for(var u=b(i),c=u.next();!c.done;c=u.next())c.value.remove(this)}catch(e){r={error:e}}finally{try{c&&!c.done&&(e=u.return)&&e.call(u)}finally{if(r)throw r.error}}else i.remove(this);var a=this.initialTeardown;if(x(a))try{a()}catch(r){o=r instanceof g?r.errors:[r]}var l=this._finalizers;if(l){this._finalizers=null;try{for(var s=b(l),f=s.next();!f.done;f=s.next()){var p=f.value;try{O(p)}catch(r){o=null!=o?o:[],r instanceof g?o=m(m([],d(o)),d(r.errors)):o.push(r)}}}catch(r){t={error:r}}finally{try{f&&!f.done&&(n=s.return)&&n.call(s)}finally{if(t)throw t.error}}}if(o)throw new g(o)}},r.prototype.add=function(e){var t;if(e&&e!==this)if(this.closed)O(e);else{if(e instanceof r){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=null!==(t=this._finalizers)&&void 0!==t?t:[]).push(e)}},r.prototype._hasParent=function(r){var e=this._parentage;return e===r||Array.isArray(e)&&e.includes(r)},r.prototype._addParent=function(r){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(r),e):e?[e,r]:r},r.prototype._removeParent=function(r){var e=this._parentage;e===r?this._parentage=null:Array.isArray(e)&&j(e,r)},r.prototype.remove=function(e){var t=this._finalizers;t&&j(t,e),e instanceof r&&e._removeParent(this)},r.EMPTY=((e=new r).closed=!0,e),r;var e}();function S(r){return r instanceof _||r&&"closed"in r&&x(r.remove)&&x(r.add)&&x(r.unsubscribe)}function O(r){x(r)?r():r.unsubscribe()}_.EMPTY;var P=null,T=null,C=void 0,E=!1,A=!1,z={setTimeout:function(r,e){for(var t=[],n=2;n<arguments.length;n++)t[n-2]=arguments[n];var o=z.delegate;return(null==o?void 0:o.setTimeout)?o.setTimeout.apply(o,m([r,e],d(t))):setTimeout.apply(void 0,m([r,e],d(t)))},clearTimeout:function(r){var e=z.delegate;return((null==e?void 0:e.clearTimeout)||clearTimeout)(r)},delegate:void 0};function R(){}var q=k("C",void 0,void 0);function k(r,e,t){return{kind:r,value:e,error:t}}var B=null,M=function(r){function e(e){var t=r.call(this)||this;return t.isStopped=!1,e?(t.destination=e,S(e)&&e.add(t)):t.destination=G,t}return y(e,r),e.create=function(r,e,t){return new K(r,e,t)},e.prototype.next=function(r){this.isStopped?$(function(r){return k("N",r,void 0)}(r),this):this._next(r)},e.prototype.error=function(r){this.isStopped?$(k("E",void 0,r),this):(this.isStopped=!0,this._error(r))},e.prototype.complete=function(){this.isStopped?$(q,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,r.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(r){this.destination.next(r)},e.prototype._error=function(r){try{this.destination.error(r)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(_),U=Function.prototype.bind;function D(r,e){return U.call(r,e)}var F=function(){function r(r){this.partialObserver=r}return r.prototype.next=function(r){var e=this.partialObserver;if(e.next)try{e.next(r)}catch(r){Y(r)}},r.prototype.error=function(r){var e=this.partialObserver;if(e.error)try{e.error(r)}catch(r){Y(r)}else Y(r)},r.prototype.complete=function(){var r=this.partialObserver;if(r.complete)try{r.complete()}catch(r){Y(r)}},r}(),K=function(r){function e(e,t,n){var o,i,u=r.call(this)||this;return x(e)||!e?o={next:null!=e?e:void 0,error:null!=t?t:void 0,complete:null!=n?n:void 0}:u&&A?((i=Object.create(e)).unsubscribe=function(){return u.unsubscribe()},o={next:e.next&&D(e.next,i),error:e.error&&D(e.error,i),complete:e.complete&&D(e.complete,i)}):o=e,u.destination=new F(o),u}return y(e,r),e}(M);function Y(r){var e;E?(e=r,E&&B&&(B.errorThrown=!0,B.error=e)):function(r){z.setTimeout((function(){if(!P)throw r;P(r)}))}(r)}function $(r,e){var t=T;t&&z.setTimeout((function(){return t(r,e)}))}var G={closed:!0,next:R,error:function(r){throw r},complete:R},N="function"==typeof Symbol&&Symbol.observable||"@@observable";function H(r){return r}function I(r){return 0===r.length?H:1===r.length?r[0]:function(e){return r.reduce((function(r,e){return e(r)}),e)}}var J=function(){function r(r){r&&(this._subscribe=r)}return r.prototype.lift=function(e){var t=new r;return t.source=this,t.operator=e,t},r.prototype.subscribe=function(r,e,t){var n,o=this,i=(n=r)&&n instanceof M||function(r){return r&&x(r.next)&&x(r.error)&&x(r.complete)}(n)&&S(n)?r:new K(r,e,t);return function(r){if(E){var e=!B;if(e&&(B={errorThrown:!1,error:null}),r(),e){var t=B,n=t.errorThrown,o=t.error;if(B=null,n)throw o}}else r()}((function(){var r=o,e=r.operator,t=r.source;i.add(e?e.call(i,t):t?o._subscribe(i):o._trySubscribe(i))})),i},r.prototype._trySubscribe=function(r){try{return this._subscribe(r)}catch(e){r.error(e)}},r.prototype.forEach=function(r,e){var t=this;return new(e=L(e))((function(e,n){var o=new K({next:function(e){try{r(e)}catch(r){n(r),o.unsubscribe()}},error:n,complete:e});t.subscribe(o)}))},r.prototype._subscribe=function(r){var e;return null===(e=this.source)||void 0===e?void 0:e.subscribe(r)},r.prototype[N]=function(){return this},r.prototype.pipe=function(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return I(r)(this)},r.prototype.toPromise=function(r){var e=this;return new(r=L(r))((function(r,t){var n;e.subscribe((function(r){return n=r}),(function(r){return t(r)}),(function(){return r(n)}))}))},r.create=function(e){return new r(e)},r}();function L(r){var e;return null!==(e=null!=r?r:C)&&void 0!==e?e:Promise}var Q=new J((function(r){return r.complete()}));function V(r){return function(e){if(function(r){return x(null==r?void 0:r.lift)}(e))return e.lift((function(e){try{return r(e,this)}catch(r){this.error(r)}}));throw new TypeError("Unable to lift unknown Observable type")}}function W(r,e,t,n,o){return new X(r,e,t,n,o)}var X=function(r){function e(e,t,n,o,i,u){var c=r.call(this,e)||this;return c.onFinalize=i,c.shouldUnsubscribe=u,c._next=t?function(r){try{t(r)}catch(r){e.error(r)}}:r.prototype._next,c._error=o?function(r){try{o(r)}catch(r){e.error(r)}finally{this.unsubscribe()}}:r.prototype._error,c._complete=n?function(){try{n()}catch(r){e.error(r)}finally{this.unsubscribe()}}:r.prototype._complete,c}return y(e,r),e.prototype.unsubscribe=function(){var e;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var t=this.closed;r.prototype.unsubscribe.call(this),!t&&(null===(e=this.onFinalize)||void 0===e||e.call(this))}},e}(M);function Z(r){return r<=0?function(){return Q}:V((function(e,t){var n=[];e.subscribe(W(t,(function(e){n.push(e),r<n.length&&n.shift()}),(function(){var r,e;try{for(var o=b(n),i=o.next();!i.done;i=o.next()){var u=i.value;t.next(u)}}catch(e){r={error:e}}finally{try{i&&!i.done&&(e=o.return)&&e.call(o)}finally{if(r)throw r.error}}t.complete()}),void 0,(function(){n=null})))}))}function rr(r,e){return V((function(t,n){var o=0;t.subscribe(W(n,(function(t){return r.call(e,t,o++)&&n.next(t)})))}))}function er(r,e){return void 0===e&&(e=null),e=null!=e?e:r,V((function(t,n){var o=[],i=0;t.subscribe(W(n,(function(t){var u,c,a,l,s=null;i++%e==0&&o.push([]);try{for(var f=b(o),p=f.next();!p.done;p=f.next())(y=p.value).push(t),r<=y.length&&(s=null!=s?s:[]).push(y)}catch(r){u={error:r}}finally{try{p&&!p.done&&(c=f.return)&&c.call(f)}finally{if(u)throw u.error}}if(s)try{for(var h=b(s),v=h.next();!v.done;v=h.next()){var y=v.value;j(o,y),n.next(y)}}catch(r){a={error:r}}finally{try{v&&!v.done&&(l=h.return)&&l.call(h)}finally{if(a)throw a.error}}}),(function(){var r,e;try{for(var t=b(o),i=t.next();!i.done;i=t.next()){var u=i.value;n.next(u)}}catch(e){r={error:e}}finally{try{i&&!i.done&&(e=t.return)&&e.call(t)}finally{if(r)throw r.error}}n.complete()}),void 0,(function(){o=null})))}))}function tr(r,e){return V((function(t,n){var o=0;t.subscribe(W(n,(function(t){n.next(r.call(e,t,o++))})))}))}var nr=i(748);function or(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.push.apply(t,n)}return t}function ir(r){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?or(Object(t),!0).forEach((function(e){ur(r,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):or(Object(t)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(t,e))}))}return r}function ur(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var cr=r=>{var t={},{fullPath:n}=r,i=o(n),u=s.get(i);return u?t=u:(t.id=o(r.fullPath),t.route=r,t.children=[],t.clearSubs=[],t.channelCenter=new e.BehaviorSubject(f)),t},ar=(r,e)=>e instanceof RegExp?"string"==typeof r.type&&e.test(r.type):r.type===e,lr=(0,nr.shallowRef)(p);function sr(r,e){e.unsubscribe();var t=r.clearSubs.indexOf(e);t>-1&&(r.clearSubs=r.clearSubs.splice(t,1))}function fr(r,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],{channelCenter:o,id:i,errorChanel:u}=r,c=i===a;if(!1===n)return o.next(t),void(c&&r.children.forEach((r=>r.channelCenter.next(t))));var{resolve:l,reject:s}=t,f=(0,e.from)(new Promise(((r,e)=>{o.next(ir(ir({},t),{},{resolve:r,reject:e}))}))),p=r.children.map((r=>(0,e.from)(new Promise(((e,n)=>{r.channelCenter.next(ir(ir({},t),{},{resolve:e,reject:n}))})))));(0,e.zip)(f,...p).pipe(Z(1)).subscribe({next:r=>l(r),complete:()=>{},error:r=>{s(r),u.next(r)}})}var pr=(r,e)=>{var t=h.router,n=e=>{if(0==!!e)return r;if(r.id!==a)return r;var{fullPath:n}=t.resolve(e),i=o(n);return s.get(i)||r};return{dispatch:(r,t,o)=>{fr(n(o),{type:r,data:t,source:e,resolve:()=>{},reject:()=>{}})},dispatchAsync:(r,t,o)=>new Promise(((i,u)=>{fr(n(o),{type:r,data:t,source:e,resolve:r=>i(r),reject:r=>u(r)},!0)})),on:(e,t)=>function(r,e,t){var{channelCenter:n,errorChanel:o}=r,i=n.pipe(rr((r=>ar(r,e)||r.type===c)),er(2,1),tr((r=>r[1]))).subscribe({complete:()=>sr(r,i),next:r=>t&&t(r),error:r=>o.next(r)});return r.clearSubs.push(i),{close:()=>sr(r,i)}}(r,e,t),onBehavior:(e,t)=>function(r,e,t){var{channelCenter:n,errorChanel:o}=r,i=n.pipe(rr((r=>ar(r,e)&&r.type!==c))).subscribe({complete:()=>sr(r,i),next:r=>t&&t(r),error:r=>o.next(r)});return r.clearSubs.push(i),{close:()=>sr(r,i)}}(r,e,t),once:(e,t)=>function(r,e,t){var{channelCenter:n,errorChanel:o}=r,i=n.pipe(rr((r=>ar(r,e)||r.type===c)),er(2,1),tr((r=>r[1])),V((function(r,e){var t=0;r.subscribe(W(e,(function(r){++t<=1&&(e.next(r),1<=t&&e.complete())})))}))).subscribe({complete:()=>sr(r,i),next:r=>t&&t(r),error:r=>o.next(r)});return r.clearSubs.push(i),{close:()=>sr(r,i)}}(r,e,t),onError:e=>{!function(r,e){var{errorChanel:t}=r,n=t.subscribe({complete:()=>{sr(r,n)},next:r=>{e&&e(r)}});r.clearSubs.push(n)}(r,e)}}};const hr={install(t){var n;(n=t.config.globalProperties.$router).beforeEach(((r,e)=>{var t=cr(r);s.has(t.id)||h.children.push(t),s.set(t.id,t),lr.value=t})),n.afterEach(((r,e)=>{lr.value=cr(r)})),h.channelCenter=new e.BehaviorSubject(f),h.router=n,s.set(h.id,h),lr.value=h,t.provide(a,h),t.provide(l,lr),t.config.globalProperties.$rs=(e,t)=>{fr(lr.value,{type:e,data:t,source:(0,r.useRoute)(),resolve:()=>{},reject:()=>{}})}},dispatch:(r,e,n,i)=>{var u=void 0;if(0==!!i&&(u=h),i===h.router)u=h;else{var c=h.router,{fullPath:a}=c.resolve(i),l=o(a);u=s.get(l)}return new Promise(((o,i)=>{fr(u,{type:r,data:e,source:void 0,resolve:n?o:t,reject:n?i:t},!!n),n||o(null)}))}};function vr(){var e=(0,nr.inject)(l);return pr(e,(0,r.useRoute)())}function yr(){var e=(0,nr.inject)(a);return pr(e,(0,r.useRouter)())}function br(r,e,t,n){return hr.dispatch(r,e,t,n)}})(),u})()));
//# sourceMappingURL=pin.cjs.prod.js.map