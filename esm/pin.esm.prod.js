!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("vue-router"),require("rxjs"),require("rxjs/operators"),require("vue")):"function"==typeof define&&define.amd?define(["vue-router","rxjs","rxjs/operators","vue"],r):"object"==typeof exports?exports.Pin=r(require("vue-router"),require("rxjs"),require("rxjs/operators"),require("vue")):e.Pin=r(e["vue-router"],e.rxjs,e["rxjs/operators"],e.vue)}(self,((e,r,t,o)=>(()=>{"use strict";var n={832:e=>{e.exports=r},597:e=>{e.exports=t},748:e=>{e.exports=o},557:r=>{r.exports=e}},s={};function u(e){var r=s[e];if(void 0!==r)return r.exports;var t=s[e]={exports:{}};return n[e](t,t.exports,u),t.exports}u.d=(e,r)=>{for(var t in r)u.o(r,t)&&!u.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},u.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),u.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var c={};return(()=>{u.r(c),u.d(c,{VueRouterPin:()=>g,dispatchEvent:()=>q,useRoutePin:()=>w,useRouterPin:()=>R});var e=u(557),r=u(832);function t(){}const o="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,n=e=>o?Symbol.for("[r-server]: "+e):"[r-server]: "+e,s=n("event-init"),i=n("GlobalRServerKey"),l=n("CurrentRServerKey"),a=new Map,p={type:s,data:null,reject:t,resolve:t,source:void 0},f={id:"",channelCenter:new r.BehaviorSubject(p),errorChanel:new r.Subject,children:[],clearSubs:[]},v={id:i,router:void 0,children:[],channelCenter:new r.BehaviorSubject(p),errorChanel:new r.Subject,clearSubs:[]},h=()=>{console.error("please install vue-router-pin")},b={on:h,onBehavior:h,once:h,onError:h,dispatch:h,dispatchAsync:h};var d=u(597),y=u(748);const x=e=>{var t={};const{fullPath:o}=e,s=n(o),u=a.get(s);return u?t=u:(t.id=n(e.fullPath),t.route=e,t.children=[],t.clearSubs=[],t.channelCenter=new r.BehaviorSubject(p)),t},j=(e,r)=>r instanceof RegExp?"string"==typeof e.type&&r.test(e.type):e.type===r,S=(0,y.shallowRef)(f);function m(e,r){r.unsubscribe();const t=e.clearSubs.indexOf(r);t>-1&&(e.clearSubs=e.clearSubs.splice(t,1))}function C(e,t,o=!1){const{channelCenter:n,id:s,errorChanel:u}=e,c=s===i;if(!1===o)return n.next(t),void(c&&e.children.forEach((e=>e.channelCenter.next(t))));const{resolve:l,reject:a}=t,p=(0,r.from)(new Promise(((e,r)=>{n.next({...t,resolve:e,reject:r})}))),f=e.children.map((e=>(0,r.from)(new Promise(((r,o)=>{e.channelCenter.next({...t,resolve:r,reject:o})})))));(0,r.zip)(p,...f).pipe((0,d.takeLast)(1)).subscribe({next:e=>l(e),complete:()=>{},error:e=>{a(e),u.next(e)}})}const P=(e,r)=>{const t=v.router,o=r=>{if(0==!!r)return e;if(e.id!==i)return e;const{fullPath:o}=t.resolve(r),s=n(o);return a.get(s)||e};return{dispatch:(e,t,n)=>{C(o(n),{type:e,data:t,source:r,resolve:()=>{},reject:()=>{}})},dispatchAsync:(e,t,n)=>new Promise(((s,u)=>{C(o(n),{type:e,data:t,source:r,resolve:e=>s(e),reject:e=>u(e)},!0)})),on:(r,t)=>function(e,r,t){const{channelCenter:o,errorChanel:n}=e,u=o.pipe((0,d.filter)((e=>j(e,r)||e.type===s)),(0,d.bufferCount)(2,1),(0,d.map)((e=>e[1]))).subscribe({complete:()=>m(e,u),next:e=>t&&t(e),error:e=>n.next(e)});return e.clearSubs.push(u),{close:()=>m(e,u)}}(e,r,t),onBehavior:(r,t)=>function(e,r,t){const{channelCenter:o,errorChanel:n}=e,u=o.pipe((0,d.filter)((e=>j(e,r)&&e.type!==s))).subscribe({complete:()=>m(e,u),next:e=>t&&t(e),error:e=>n.next(e)});return e.clearSubs.push(u),{close:()=>m(e,u)}}(e,r,t),once:(r,t)=>function(e,r,t){const{channelCenter:o,errorChanel:n}=e,u=o.pipe((0,d.filter)((e=>j(e,r)||e.type===s)),(0,d.bufferCount)(2,1),(0,d.map)((e=>e[1])),(0,d.take)(1)).subscribe({complete:()=>m(e,u),next:e=>t&&t(e),error:e=>n.next(e)});return e.clearSubs.push(u),{close:()=>m(e,u)}}(e,r,t),onError:r=>{!function(e,r){const{errorChanel:t}=e,o=t.subscribe({complete:()=>{m(e,o)},next:e=>{r&&r(e)}});e.clearSubs.push(o)}(e,r)}}},g={install(t){var o;(o=t.config.globalProperties.$router).beforeEach(((e,r)=>{const t=x(e);a.has(t.id)||v.children.push(t),a.set(t.id,t),S.value=t})),o.afterEach(((e,r)=>{S.value=x(e)})),v.channelCenter=new r.BehaviorSubject(p),v.router=o,a.set(v.id,v),S.value=v,t.provide(i,v),t.provide(l,S),t.config.globalProperties.$rs=(r,t)=>{C(S.value,{type:r,data:t,source:(0,e.useRoute)(),resolve:()=>{},reject:()=>{}})}},dispatch:(e,r,...o)=>{let s,u,c=!1;if(2===(o=o.filter((e=>1==!!e))).length?(c=o[0],s=o[1]):1===o.length&&("boolean"==typeof o[0]?(c=o[0],s=void 0):(s=o[0],c=!1)),0==!!s&&(u=v),s===v.router)u=v;else{const e=v.router,{fullPath:r}=e.resolve(s),t=n(r);u=a.get(t)}return new Promise(((o,n)=>{C(u,{type:e,data:r,source:void 0,resolve:c?o:t,reject:c?n:t},!!c),c||o(null)}))}};function w(){const r=(0,y.inject)(l);return r?P(r.value,(0,e.useRoute)()):b}function R(){const r=(0,y.inject)(i);return r?P(r,(0,e.useRouter)()):b}function q(e,r,t,o){return g.dispatch(e,r,t,o)}})(),c})()));