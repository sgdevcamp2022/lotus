"use strict";(self.webpackChunkloatus_web=self.webpackChunkloatus_web||[]).push([[773],{6773:(e,t,n)=>{n.r(t),n.d(t,{default:()=>y});var o,a=n(7294),s=n(977),r=n(9250),i=n(9655),l=n(8678),c=n(1817),u=n(3757),d=n(3564),m=n(5678),f=n(7648);function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},p.apply(this,arguments)}const g=(o={key:"@utils/token",initial:""},function(e){return function(e,t){var n=e.key,o=e.initial,s=e.persistor,r=(0,u.kY)().cache,i=(0,u.ZP)(n,(function(){return Promise.resolve(null==s?void 0:s.onGet(n)).then((function(e){var t,a;return null!=(t=null!=e?e:null==(a=r.get(n))?void 0:a.data)?t:o}))}),p({fallbackData:o,revalidateOnFocus:!1,revalidateOnReconnect:!1,refreshWhenHidden:!1,refreshWhenOffline:!1},t)),l=i.data,c=i.mutate,d=(0,a.useCallback)((function(e,t){return c((function(){var t=function(e){return null==s?void 0:s.onSet(n,e)};if("function"!=typeof e)return t(e),e;var o=e;return Promise.resolve(o(l)).then((function(e){return t(e),e}))}),t)}),[n,l,null==s?void 0:s.onSet]);return[l,d,i]}(p({},o,{initial:null!=e?e:o.initial}),undefined)});function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,a,s,r,i=[],l=!0,c=!1;try{if(s=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;l=!1}else for(;!(l=(o=s.call(n)).done)&&(i.push(o.value),i.length!==t);l=!0);}catch(e){c=!0,a=e}finally{try{if(!l&&null!=n.return&&(r=n.return(),Object(r)!==r))return}finally{if(c)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}const y=function(){var e=h((0,l.Z)(""),3),t=e[0],n=e[1],o=e[2],p=h((0,l.Z)(""),3),v=p[0],y=p[2],E=h((0,l.Z)(""),3),T=E[0],b=E[2],C=h((0,l.Z)(""),3),I=C[0],_=C[1],O=C[2],L=h((0,a.useState)(!1),2),w=L[0],N=L[1],R=h((0,a.useState)(!1),2),k=R[0],A=R[1],x=h(g(),1)[0],P=(0,u.ZP)(x?[process.env.REACT_APP_DB_HOST+"/auth/my",x]:null,d.Z),M=P.data,S=(P.error,P.mutate),D=(0,a.useCallback)((function(e){N(e.target.value===T),y(e.target.value)}),[T]),$=(0,a.useCallback)((function(e){N(e.target.value===v),b(e.target.value)}),[v]),B=(0,a.useCallback)((function(e){e.preventDefault(),t&&v&&w&&I&&c.Z.post(process.env.REACT_APP_DB_HOST+"/user/signup",{email:t,nickname:I,password:v}).then((function(e){200===e.data.code?(m.Am.success(e.data.message,{position:"top-right"}),A(!0),o(""),y(""),b(""),O(""),S()):m.Am.error(e.data.message,{position:"top-right"})})).catch((function(e){console.dir(e),m.Am.error("오류가 발생했습니다.\n기술팀에 문의해 주세요!",{position:"top-right"}),A(!1)}))}),[t,v,T,I]);return M?a.createElement(r.Fg,{to:"/mainpage",replace:!0}):a.createElement(s.fC,null,a.createElement(s.h4,null,a.createElement("div",{className:"left-col"}),a.createElement("div",{className:"center-col"},a.createElement("h1",{style:{textAlign:"center",fontFamily:"Noto Sans KR, sans-serif"}},"LOATUS")),a.createElement("div",{className:"right-col"})),a.createElement(s.T3,null,a.createElement(s.yG,null,"회원가입",k&&"을 성공했습니다!"),k?a.createElement("div",null,a.createElement("h4",null,"지금 바로 로그인해 보세요"),a.createElement(s.zx,null,a.createElement(i.rU,{to:"/login"},"로그인 하러 가기"))):a.createElement(s.cL,null,a.createElement(f.Z,{onSubmit:B},a.createElement(f.Z.Label,{id:"email-label"},"이메일"),a.createElement(s.II,{required:!0,placeholder:"name@email.com",type:"email",value:t,onChange:n}),a.createElement(f.Z.Label,{id:"password-label"},"비밀번호"),a.createElement(s.II,{required:!0,type:"password",value:v,onChange:D}),a.createElement(f.Z.Label,{id:"password-check-label"},"비밀번호 확인"),a.createElement(s.II,{required:!0,type:"password",value:T,onChange:$}),a.createElement(f.Z.Label,{id:"nickname-label"},"닉네임"),a.createElement(s.II,{required:!0,type:"text",value:I,onChange:_}),a.createElement(s.zx,{type:"submit"},"회원가입"),v&&!w&&"비밀번호가 다릅니다!"),a.createElement(s.Lb,null,a.createElement(s.Hr,null),a.createElement("div",{style:{padding:"0 20px"}},"또는"),a.createElement(s.Hr,null)),a.createElement(s.zx,null,"네이버로 계속"),a.createElement(s.zx,null,"카카오로 계속"),"이미 Loatus 계정이 있으신가요?",a.createElement(i.rU,{to:"/login"},"로그인하러 가기"))),a.createElement(m.Ix,null))}},5678:(e,t,n)=>{n.d(t,{Am:()=>M,Ix:()=>_});var o=n(7294),a=n(6010);const s=e=>"number"==typeof e&&!isNaN(e),r=e=>"string"==typeof e,i=e=>"function"==typeof e,l=e=>r(e)||i(e)?e:null,c=e=>(0,o.isValidElement)(e)||r(e)||i(e)||s(e);function u(e){let{enter:t,exit:n,appendPosition:a=!1,collapse:s=!0,collapseDuration:r=300}=e;return function(e){let{children:i,position:l,preventExitTransition:c,done:u,nodeRef:d,isIn:m}=e;const f=a?`${t}--${l}`:t,p=a?`${n}--${l}`:n,g=(0,o.useRef)(0);return(0,o.useLayoutEffect)((()=>{const e=d.current,t=f.split(" "),n=o=>{o.target===d.current&&(e.dispatchEvent(new Event("d")),e.removeEventListener("animationend",n),e.removeEventListener("animationcancel",n),0===g.current&&"animationcancel"!==o.type&&e.classList.remove(...t))};e.classList.add(...t),e.addEventListener("animationend",n),e.addEventListener("animationcancel",n)}),[]),(0,o.useEffect)((()=>{const e=d.current,t=()=>{e.removeEventListener("animationend",t),s?function(e,t,n){void 0===n&&(n=300);const{scrollHeight:o,style:a}=e;requestAnimationFrame((()=>{a.minHeight="initial",a.height=o+"px",a.transition=`all ${n}ms`,requestAnimationFrame((()=>{a.height="0",a.padding="0",a.margin="0",setTimeout(t,n)}))}))}(e,u,r):u()};m||(c?t():(g.current=1,e.className+=` ${p}`,e.addEventListener("animationend",t)))}),[m]),o.createElement(o.Fragment,null,i)}}function d(e,t){return{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}}const m={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const n=this.list.get(e).filter((e=>e!==t));return this.list.set(e,n),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach((t=>{const n=setTimeout((()=>{t(...[].slice.call(arguments,1))}),0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(n)}))}},f=e=>{let{theme:t,type:n,...a}=e;return o.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:"colored"===t?"currentColor":`var(--toastify-icon-color-${n})`,...a})},p={info:function(e){return o.createElement(f,{...e},o.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return o.createElement(f,{...e},o.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return o.createElement(f,{...e},o.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return o.createElement(f,{...e},o.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return o.createElement("div",{className:"Toastify__spinner"})}};function g(e){const[,t]=(0,o.useReducer)((e=>e+1),0),[n,a]=(0,o.useState)([]),u=(0,o.useRef)(null),f=(0,o.useRef)(new Map).current,g=e=>-1!==n.indexOf(e),h=(0,o.useRef)({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:g,getToast:e=>f.get(e)}).current;function v(e){let{containerId:t}=e;const{limit:n}=h.props;!n||t&&h.containerId!==t||(h.count-=h.queue.length,h.queue=[])}function y(e){a((t=>null==e?[]:t.filter((t=>t!==e))))}function E(){const{toastContent:e,toastProps:t,staleId:n}=h.queue.shift();b(e,t,n)}function T(e,n){let{delay:a,staleId:g,...v}=n;if(!c(e)||function(e){return!u.current||h.props.enableMultiContainer&&e.containerId!==h.props.containerId||f.has(e.toastId)&&null==e.updateId}(v))return;const{toastId:T,updateId:C,data:I}=v,{props:_}=h,O=()=>y(T),L=null==C;L&&h.count++;const w={..._,style:_.toastStyle,key:h.toastKey++,...v,toastId:T,updateId:C,data:I,closeToast:O,isIn:!1,className:l(v.className||_.toastClassName),bodyClassName:l(v.bodyClassName||_.bodyClassName),progressClassName:l(v.progressClassName||_.progressClassName),autoClose:!v.isLoading&&(N=v.autoClose,R=_.autoClose,!1===N||s(N)&&N>0?N:R),deleteToast(){const e=d(f.get(T),"removed");f.delete(T),m.emit(4,e);const n=h.queue.length;if(h.count=null==T?h.count-h.displayedToast:h.count-1,h.count<0&&(h.count=0),n>0){const e=null==T?h.props.limit:1;if(1===n||1===e)h.displayedToast++,E();else{const t=e>n?n:e;h.displayedToast=t;for(let e=0;e<t;e++)E()}}else t()}};var N,R;w.iconOut=function(e){let{theme:t,type:n,isLoading:a,icon:l}=e,c=null;const u={theme:t,type:n};return!1===l||(i(l)?c=l(u):(0,o.isValidElement)(l)?c=(0,o.cloneElement)(l,u):r(l)||s(l)?c=l:a?c=p.spinner():(e=>e in p)(n)&&(c=p[n](u))),c}(w),i(v.onOpen)&&(w.onOpen=v.onOpen),i(v.onClose)&&(w.onClose=v.onClose),w.closeButton=_.closeButton,!1===v.closeButton||c(v.closeButton)?w.closeButton=v.closeButton:!0===v.closeButton&&(w.closeButton=!c(_.closeButton)||_.closeButton);let k=e;(0,o.isValidElement)(e)&&!r(e.type)?k=(0,o.cloneElement)(e,{closeToast:O,toastProps:w,data:I}):i(e)&&(k=e({closeToast:O,toastProps:w,data:I})),_.limit&&_.limit>0&&h.count>_.limit&&L?h.queue.push({toastContent:k,toastProps:w,staleId:g}):s(a)?setTimeout((()=>{b(k,w,g)}),a):b(k,w,g)}function b(e,t,n){const{toastId:o}=t;n&&f.delete(n);const s={content:e,props:t};f.set(o,s),a((e=>[...e,o].filter((e=>e!==n)))),m.emit(4,d(s,null==s.props.updateId?"added":"updated"))}return(0,o.useEffect)((()=>(h.containerId=e.containerId,m.cancelEmit(3).on(0,T).on(1,(e=>u.current&&y(e))).on(5,v).emit(2,h),()=>{f.clear(),m.emit(3,h)})),[]),(0,o.useEffect)((()=>{h.props=e,h.isToastActive=g,h.displayedToast=n.length})),{getToastToRender:function(t){const n=new Map,o=Array.from(f.values());return e.newestOnTop&&o.reverse(),o.forEach((e=>{const{position:t}=e.props;n.has(t)||n.set(t,[]),n.get(t).push(e)})),Array.from(n,(e=>t(e[0],e[1])))},containerRef:u,isToastActive:g}}function h(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function v(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function y(e){const[t,n]=(0,o.useState)(!1),[a,s]=(0,o.useState)(!1),r=(0,o.useRef)(null),l=(0,o.useRef)({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,c=(0,o.useRef)(e),{autoClose:u,pauseOnHover:d,closeToast:m,onClick:f,closeOnClick:p}=e;function g(t){if(e.draggable){"touchstart"===t.nativeEvent.type&&t.nativeEvent.preventDefault(),l.didMove=!1,document.addEventListener("mousemove",b),document.addEventListener("mouseup",C),document.addEventListener("touchmove",b),document.addEventListener("touchend",C);const n=r.current;l.canCloseOnClick=!0,l.canDrag=!0,l.boundingRect=n.getBoundingClientRect(),n.style.transition="",l.x=h(t.nativeEvent),l.y=v(t.nativeEvent),"x"===e.draggableDirection?(l.start=l.x,l.removalDistance=n.offsetWidth*(e.draggablePercent/100)):(l.start=l.y,l.removalDistance=n.offsetHeight*(80===e.draggablePercent?1.5*e.draggablePercent:e.draggablePercent/100))}}function y(t){if(l.boundingRect){const{top:n,bottom:o,left:a,right:s}=l.boundingRect;"touchend"!==t.nativeEvent.type&&e.pauseOnHover&&l.x>=a&&l.x<=s&&l.y>=n&&l.y<=o?T():E()}}function E(){n(!0)}function T(){n(!1)}function b(n){const o=r.current;l.canDrag&&o&&(l.didMove=!0,t&&T(),l.x=h(n),l.y=v(n),l.delta="x"===e.draggableDirection?l.x-l.start:l.y-l.start,l.start!==l.x&&(l.canCloseOnClick=!1),o.style.transform=`translate${e.draggableDirection}(${l.delta}px)`,o.style.opacity=""+(1-Math.abs(l.delta/l.removalDistance)))}function C(){document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",C),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",C);const t=r.current;if(l.canDrag&&l.didMove&&t){if(l.canDrag=!1,Math.abs(l.delta)>l.removalDistance)return s(!0),void e.closeToast();t.style.transition="transform 0.2s, opacity 0.2s",t.style.transform=`translate${e.draggableDirection}(0)`,t.style.opacity="1"}}(0,o.useEffect)((()=>{c.current=e})),(0,o.useEffect)((()=>(r.current&&r.current.addEventListener("d",E,{once:!0}),i(e.onOpen)&&e.onOpen((0,o.isValidElement)(e.children)&&e.children.props),()=>{const e=c.current;i(e.onClose)&&e.onClose((0,o.isValidElement)(e.children)&&e.children.props)})),[]),(0,o.useEffect)((()=>(e.pauseOnFocusLoss&&(document.hasFocus()||T(),window.addEventListener("focus",E),window.addEventListener("blur",T)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",E),window.removeEventListener("blur",T))})),[e.pauseOnFocusLoss]);const I={onMouseDown:g,onTouchStart:g,onMouseUp:y,onTouchEnd:y};return u&&d&&(I.onMouseEnter=T,I.onMouseLeave=E),p&&(I.onClick=e=>{f&&f(e),l.canCloseOnClick&&m()}),{playToast:E,pauseToast:T,isRunning:t,preventExitTransition:a,toastRef:r,eventHandlers:I}}function E(e){let{closeToast:t,theme:n,ariaLabel:a="close"}=e;return o.createElement("button",{className:`Toastify__close-button Toastify__close-button--${n}`,type:"button",onClick:e=>{e.stopPropagation(),t(e)},"aria-label":a},o.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},o.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function T(e){let{delay:t,isRunning:n,closeToast:s,type:r="default",hide:l,className:c,style:u,controlledProgress:d,progress:m,rtl:f,isIn:p,theme:g}=e;const h=l||d&&0===m,v={...u,animationDuration:`${t}ms`,animationPlayState:n?"running":"paused",opacity:h?0:1};d&&(v.transform=`scaleX(${m})`);const y=(0,a.Z)("Toastify__progress-bar",d?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${g}`,`Toastify__progress-bar--${r}`,{"Toastify__progress-bar--rtl":f}),E=i(c)?c({rtl:f,type:r,defaultClassName:y}):(0,a.Z)(y,c);return o.createElement("div",{role:"progressbar","aria-hidden":h?"true":"false","aria-label":"notification timer",className:E,style:v,[d&&m>=1?"onTransitionEnd":"onAnimationEnd"]:d&&m<1?null:()=>{p&&s()}})}const b=e=>{const{isRunning:t,preventExitTransition:n,toastRef:s,eventHandlers:r}=y(e),{closeButton:l,children:c,autoClose:u,onClick:d,type:m,hideProgressBar:f,closeToast:p,transition:g,position:h,className:v,style:b,bodyClassName:C,bodyStyle:I,progressClassName:_,progressStyle:O,updateId:L,role:w,progress:N,rtl:R,toastId:k,deleteToast:A,isIn:x,isLoading:P,iconOut:M,closeOnClick:S,theme:D}=e,$=(0,a.Z)("Toastify__toast",`Toastify__toast-theme--${D}`,`Toastify__toast--${m}`,{"Toastify__toast--rtl":R},{"Toastify__toast--close-on-click":S}),B=i(v)?v({rtl:R,position:h,type:m,defaultClassName:$}):(0,a.Z)($,v),z=!!N||!u,Z={closeToast:p,type:m,theme:D};let F=null;return!1===l||(F=i(l)?l(Z):(0,o.isValidElement)(l)?(0,o.cloneElement)(l,Z):E(Z)),o.createElement(g,{isIn:x,done:A,position:h,preventExitTransition:n,nodeRef:s},o.createElement("div",{id:k,onClick:d,className:B,...r,style:b,ref:s},o.createElement("div",{...x&&{role:w},className:i(C)?C({type:m}):(0,a.Z)("Toastify__toast-body",C),style:I},null!=M&&o.createElement("div",{className:(0,a.Z)("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!P})},M),o.createElement("div",null,c)),F,o.createElement(T,{...L&&!z?{key:`pb-${L}`}:{},rtl:R,theme:D,delay:u,isRunning:t,isIn:x,closeToast:p,hide:f,type:m,style:O,className:_,controlledProgress:z,progress:N||0})))},C=function(e,t){return void 0===t&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},I=u(C("bounce",!0)),_=(u(C("slide",!0)),u(C("zoom")),u(C("flip")),(0,o.forwardRef)(((e,t)=>{const{getToastToRender:n,containerRef:s,isToastActive:r}=g(e),{className:c,style:u,rtl:d,containerId:m}=e;function f(e){const t=(0,a.Z)("Toastify__toast-container",`Toastify__toast-container--${e}`,{"Toastify__toast-container--rtl":d});return i(c)?c({position:e,rtl:d,defaultClassName:t}):(0,a.Z)(t,l(c))}return(0,o.useEffect)((()=>{t&&(t.current=s.current)}),[]),o.createElement("div",{ref:s,className:"Toastify",id:m},n(((e,t)=>{const n=t.length?{...u}:{...u,pointerEvents:"none"};return o.createElement("div",{className:f(e),style:n,key:`container-${e}`},t.map(((e,n)=>{let{content:a,props:s}=e;return o.createElement(b,{...s,isIn:r(s.toastId),style:{...s.style,"--nth":n+1,"--len":t.length},key:`toast-${s.key}`},a)})))})))})));_.displayName="ToastContainer",_.defaultProps={position:"top-right",transition:I,autoClose:5e3,closeButton:E,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let O,L=new Map,w=[],N=1;function R(){return""+N++}function k(e){return e&&(r(e.toastId)||s(e.toastId))?e.toastId:R()}function A(e,t){return L.size>0?m.emit(0,e,t):w.push({content:e,options:t}),t.toastId}function x(e,t){return{...t,type:t&&t.type||e,toastId:k(t)}}function P(e){return(t,n)=>A(t,x(e,n))}function M(e,t){return A(e,x("default",t))}M.loading=(e,t)=>A(e,x("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),M.promise=function(e,t,n){let o,{pending:a,error:s,success:l}=t;a&&(o=r(a)?M.loading(a,n):M.loading(a.render,{...n,...a}));const c={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null,delay:100},u=(e,t,a)=>{if(null==t)return void M.dismiss(o);const s={type:e,...c,...n,data:a},i=r(t)?{render:t}:t;return o?M.update(o,{...s,...i}):M(i.render,{...s,...i}),a},d=i(e)?e():e;return d.then((e=>u("success",l,e))).catch((e=>u("error",s,e))),d},M.success=P("success"),M.info=P("info"),M.error=P("error"),M.warning=P("warning"),M.warn=M.warning,M.dark=(e,t)=>A(e,x("default",{theme:"dark",...t})),M.dismiss=e=>{L.size>0?m.emit(1,e):w=w.filter((t=>null!=e&&t.options.toastId!==e))},M.clearWaitingQueue=function(e){return void 0===e&&(e={}),m.emit(5,e)},M.isActive=e=>{let t=!1;return L.forEach((n=>{n.isToastActive&&n.isToastActive(e)&&(t=!0)})),t},M.update=function(e,t){void 0===t&&(t={}),setTimeout((()=>{const n=function(e,t){let{containerId:n}=t;const o=L.get(n||O);return o&&o.getToast(e)}(e,t);if(n){const{props:o,content:a}=n,s={...o,...t,toastId:t.toastId||e,updateId:R()};s.toastId!==e&&(s.staleId=e);const r=s.render||a;delete s.render,A(r,s)}}),0)},M.done=e=>{M.update(e,{progress:1})},M.onChange=e=>(m.on(4,e),()=>{m.off(4,e)}),M.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},M.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},m.on(2,(e=>{O=e.containerId||e,L.set(O,e),w.forEach((e=>{m.emit(0,e.content,e.options)})),w=[]})).on(3,(e=>{L.delete(e.containerId||e),0===L.size&&m.off(0).off(1).off(5)}))}}]);