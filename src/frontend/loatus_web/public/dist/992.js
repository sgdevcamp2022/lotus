/*! For license information please see 992.js.LICENSE.txt */
"use strict";(self.webpackChunkloatus_web=self.webpackChunkloatus_web||[]).push([[992],{2543:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(3757),o=r(3564),a=r(1817);const i=function(t,e){return(0,n.ZP)(t&&localStorage.getItem("accessToken")?[t,localStorage.getItem("accessToken")]:null,o.Z,{onErrorRetry:function(t,r,n,o,i){i.retryCount<3&&a.Z.post(process.env.REACT_APP_DB_HOST+"/auth/reissue",{},{withCredentials:!0,headers:{Authorization:"Bearer ".concat(localStorage.getItem("accessToken")),refreshToken:e}}).then((function(t){localStorage.setItem("accessToken",t.data.data)})).catch((function(t){return t}))}})}},943:(t,e,r)=>{r.d(e,{Z:()=>o});var n=r(1817);const o=function(t){var e=n.Z.create();return e.interceptors.response.use((function(t){return t}),(function(e){n.Z.post(process.env.REACT_APP_DB_HOST+"/auth/reissue",{},{withCredentials:!0,headers:{Authorization:"Bearer ".concat(localStorage.getItem("accessToken")),refreshToken:t}}).then((function(t){localStorage.setItem("accessToken",t.data.data)})).catch((function(t){return t}))})),e}},5992:(t,e,r)=>{r.r(e),r.d(e,{default:()=>S});var n=r(7294),o=r(1817),a=r(8678),i=r(9655),c=r(9250),u=r(977),l=r(6645),s=r(4051),f=r(7648),h=r(6089),p=r(9062),m=r(5678),d=r(2543),v=r(943),y=r(7109),g=r(6182),E=r.n(g);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function b(){b=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",i=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var a=e&&e.prototype instanceof h?e:h,i=Object.create(a.prototype),c=new T(o||[]);return n(i,"_invoke",{value:k(t,r,c)}),i}function s(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var f={};function h(){}function p(){}function m(){}var d={};u(d,a,(function(){return this}));var v=Object.getPrototypeOf,y=v&&v(v(C([])));y&&y!==e&&r.call(y,a)&&(d=y);var g=m.prototype=h.prototype=Object.create(d);function E(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function A(t,e){function o(n,a,i,c){var u=s(t[n],t,a);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==w(f)&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){o("next",t,i,c)}),(function(t){o("throw",t,i,c)})):e.resolve(f).then((function(t){l.value=t,i(l)}),(function(t){return o("throw",t,i,c)}))}c(u.arg)}var a;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function k(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return{value:void 0,done:!0}}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=_(i,r);if(c){if(c===f)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=s(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===f)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function _(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,_(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=s(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var a=o.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function C(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return p.prototype=m,n(g,"constructor",{value:m,configurable:!0}),n(m,"constructor",{value:p,configurable:!0}),p.displayName=u(m,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===p||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,u(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},E(A.prototype),u(A.prototype,i,(function(){return this})),t.AsyncIterator=A,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new A(l(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(g),u(g,c,"Generator"),u(g,a,(function(){return this})),u(g,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=C,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,f):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:C(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function A(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function k(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){A(a,n,o,i,c,"next",t)}function c(t){A(a,n,o,i,c,"throw",t)}i(void 0)}))}}function _(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,l=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(l)throw o}}return c}}(t,e)||function(t,e){if(t){if("string"==typeof t)return x(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?x(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}const S=function(){var t=_((0,l.Z)(["refreshToken"]),2),e=t[0],r=(t[1],localStorage.getItem("accessToken")),g=(0,d.Z)("/auth/my",e.refreshToken),w=g.data,A=(g.error,g.mutate,_((0,i.lr)(),2)),x=(A[0],A[1],_((0,a.Z)(""),3)),S=x[0],T=x[1],C=(x[2],_((0,n.useState)(),2)),P=C[0],Z=C[1],L=_((0,n.useState)(),2),O=L[0],I=L[1],B=_((0,n.useState)(),2),j=B[0],z=B[1],D=_((0,n.useState)(0),2),N=D[0],R=D[1];console.log(O),console.log(O&&O[0]),(0,n.useEffect)((function(){o.Z.post(process.env.REACT_APP_DB_HOST+"/user/load/maincharacter",{},{headers:{Authorization:"Bearer "+r}}).then((function(t){Z(t.data.data)})).catch((function(t){m.Am.error(t.message,{position:"top-right"})}))}),[]),(0,n.useEffect)((function(){o.Z.post(process.env.REACT_APP_DB_HOST+"/friend/list",{toUserId:"1"},{headers:{Authorization:"Bearer "+r}}).then((function(t){I(t.data.data)})).catch((function(t){m.Am.error(t.message,{position:"top-right"})}))}),[]),(0,n.useEffect)((function(){o.Z.post(process.env.REACT_APP_DB_HOST+"/friend/request/list",{toUserId:"1"},{headers:{Authorization:"Bearer "+r}}).then((function(t){z(t.data.data)})).catch((function(t){m.Am.error(t.message,{position:"top-right"})}))}),[]);var H=(0,n.useCallback)(function(){var t=k(b().mark((function t(n){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,(0,v.Z)(e.refreshToken).post(process.env.REACT_APP_DB_HOST+"/user/update/nickname",{nickname:S},{withCredentials:!0,headers:{Authorization:"Bearer "+r}}).then((function(t){200===t.data.code?m.Am.success("닉네임 변경이 성공했습니다.",{position:"top-right"}):m.Am.error("닉네임 변경이 실패했습니다.",{position:"top-right"})})).catch((function(t){m.Am.error("닉네임 변경이 실패했습니다.",{position:"top-right"})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[S]),G=(0,n.useCallback)(function(){var t=k(b().mark((function t(n){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,(0,v.Z)(e.refreshToken).post(process.env.REACT_APP_DB_HOST+"/user/delete",{},{withCredentials:!0,headers:{Authorization:"Bearer "+r}}).then((function(t){200===t.data.code?m.Am.success("회원탈퇴가 성공했습니다.",{position:"top-right"}):m.Am.error("회원탈퇴가 실패했습니다.",{position:"top-right"})})).catch((function(t){m.Am.error("회원탈퇴가 실패했습니다.",{position:"top-right"})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[]),F=(0,n.useCallback)(function(){var t=k(b().mark((function t(n){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,(0,v.Z)(e.refreshToken).post(process.env.REACT_APP_DB_HOST+"/friend/delete",{toUserId:N},{withCredentials:!0,headers:{Authorization:"Bearer "+r}}).then((function(t){200===t.data.code?m.Am.success("친구삭제가 성공했습니다.",{position:"top-right"}):m.Am.error("친구삭제가 실패했습니다.",{position:"top-right"})})).catch((function(t){m.Am.error("친구삭제가 실패했습니다.",{position:"top-right"})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[N]),U=(0,n.useCallback)(function(){var t=k(b().mark((function t(n){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,(0,v.Z)(e.refreshToken).post(process.env.REACT_APP_DB_HOST+"/friend/accept",{toUserId:N},{withCredentials:!0,headers:{Authorization:"Bearer "+r}}).then((function(t){200===t.data.code?m.Am.success("친구수락이 성공했습니다.",{position:"top-right"}):m.Am.error("친구수락이 실패했습니다.",{position:"top-right"})})).catch((function(t){m.Am.error("친구수락이 실패했습니다.",{position:"top-right"})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[N]),W=(0,n.useCallback)(function(){var t=k(b().mark((function t(n){return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.next=3,(0,v.Z)(e.refreshToken).post(process.env.REACT_APP_DB_HOST+"/friend/refuse",{toUserId:N},{withCredentials:!0,headers:{Authorization:"Bearer "+r}}).then((function(t){200===t.data.code?m.Am.success("친구거절이 성공했습니다.",{position:"top-right"}):m.Am.error("친구거절이 실패했습니다.",{position:"top-right"})})).catch((function(t){m.Am.error("친구거절이 실패했습니다.",{position:"top-right"})}));case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),[N]);return w?n.createElement(u.fC,null,n.createElement(h.Z,{maxWidth:!1},n.createElement(s.Z,null,n.createElement("table",null,n.createElement("tr",null,n.createElement("td",null,"프로필 사진"),n.createElement("td",null,n.createElement(y.Z,{alt:(null==w?void 0:w.characterName)||(null==w?void 0:w.nickname),src:(null==w?void 0:w.profileImage)||E().url(w.email,{s:"25",d:"retro"})}))),n.createElement("tr",null,n.createElement("td",null,"캐릭터명"),n.createElement("td",null,null==P?void 0:P.CharacterName)),n.createElement("tr",null,n.createElement("td",null,"아이템 레벨"),n.createElement("td",null,null==P?void 0:P.ItemAvgLevel)),n.createElement("tr",null,n.createElement("td",null,"클래스"),n.createElement("td",null,null==P?void 0:P.CharacterClassName)),n.createElement("tr",null,n.createElement("td",null,"서버명"),n.createElement("td",null,null==P?void 0:P.ServerName)),n.createElement("tr",null,n.createElement("td",null,"닉네임"),n.createElement("td",null,null==w?void 0:w.nickname))),n.createElement(f.Z,{onSubmit:H},n.createElement(u.II,{placeholder:"닉네임",type:"input",value:S,onChange:T}),n.createElement(u.zx,{type:"submit"},"변경")),n.createElement(f.Z,{onSubmit:G},n.createElement(u.zx,{type:"submit"},"회원탈퇴")))),n.createElement(h.Z,{maxWidth:!1},n.createElement("table",null,n.createElement("tr",null,n.createElement("th",null,"친구 목록"),n.createElement("th",null),n.createElement("th",null)),O?O.map((function(t,e){return n.createElement("tr",null,n.createElement("td",null,t.nickname),n.createElement("td",null,t.characterName),n.createElement("td",null,n.createElement(f.Z,{onSubmit:F},n.createElement(u.zx,{type:"submit",onClick:function(){return R(t.userId)}},"삭제"))),n.createElement("td",null,n.createElement(f.Z,null,n.createElement(u.zx,{type:"submit"},"채팅"))))})):n.createElement("tr",null,n.createElement("td",{colSpan:1},n.createElement(p.Z,null)))),n.createElement("table",null,n.createElement("tr",null,n.createElement("th",null,"친구요청 목록"),n.createElement("th",null),n.createElement("th",null),n.createElement("th",null)),j?j.map((function(t,e){return n.createElement("tr",null,n.createElement("td",null,t.nickname,"(",t.characterName,")"),n.createElement("td",null,n.createElement(f.Z,{onSubmit:U},n.createElement(u.zx,{type:"submit",onClick:function(){return R(t.userId)}},"수락"))),n.createElement("td",null,n.createElement(f.Z,{onSubmit:W},n.createElement(u.zx,{type:"submit",onClick:function(){return R(t.userId)}},"거절"))),n.createElement("td",null))})):n.createElement("tr",null,n.createElement("td",{colSpan:1},n.createElement(p.Z,null)))))):n.createElement(c.Fg,{to:"/login"})}}}]);