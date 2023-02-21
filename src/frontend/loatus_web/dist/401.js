"use strict";(self.webpackChunkloatus_web=self.webpackChunkloatus_web||[]).push([[401],{238:(r,n,o)=>{o.d(n,{Z:()=>a});var t=o(7462),e=o(8442);function a(r,n,o){return void 0===r||(0,e.Z)(r)?n:(0,t.Z)({},n,{ownerState:(0,t.Z)({},n.ownerState,o)})}},8442:(r,n,o)=>{o.d(n,{Z:()=>t});const t=function(r){return"string"==typeof r}},1276:(r,n,o)=>{function t(r,n){return"function"==typeof r?r(n):r}o.d(n,{Z:()=>t})},4261:(r,n,o)=>{o.d(n,{Z:()=>g});var t=o(7462),e=o(3366),a=o(67),i=o(238),l=o(6010);function s(r){if(void 0===r)return{};const n={};return Object.keys(r).filter((n=>!(n.match(/^on[A-Z]/)&&"function"==typeof r[n]))).forEach((o=>{n[o]=r[o]})),n}var c=o(1276);const u=["elementType","externalSlotProps","ownerState"];function g(r){var n;const{elementType:o,externalSlotProps:g,ownerState:d}=r,v=(0,e.Z)(r,u),f=(0,c.Z)(g,d),{props:h,internalRef:m}=function(r){const{getSlotProps:n,additionalProps:o,externalSlotProps:e,externalForwardedProps:a,className:i}=r;if(!n){const r=(0,l.Z)(null==a?void 0:a.className,null==e?void 0:e.className,i,null==o?void 0:o.className),n=(0,t.Z)({},null==o?void 0:o.style,null==a?void 0:a.style,null==e?void 0:e.style),s=(0,t.Z)({},o,a,e);return r.length>0&&(s.className=r),Object.keys(n).length>0&&(s.style=n),{props:s,internalRef:void 0}}const c=function(r,n=[]){if(void 0===r)return{};const o={};return Object.keys(r).filter((o=>o.match(/^on[A-Z]/)&&"function"==typeof r[o]&&!n.includes(o))).forEach((n=>{o[n]=r[n]})),o}((0,t.Z)({},a,e)),u=s(e),g=s(a),d=n(c),v=(0,l.Z)(null==d?void 0:d.className,null==o?void 0:o.className,i,null==a?void 0:a.className,null==e?void 0:e.className),f=(0,t.Z)({},null==d?void 0:d.style,null==o?void 0:o.style,null==a?void 0:a.style,null==e?void 0:e.style),h=(0,t.Z)({},d,o,g,u);return v.length>0&&(h.className=v),Object.keys(f).length>0&&(h.style=f),{props:h,internalRef:d.ref}}((0,t.Z)({},v,{externalSlotProps:f})),p=(0,a.Z)(m,null==f?void 0:f.ref,null==(n=r.additionalProps)?void 0:n.ref);return(0,i.Z)(o,(0,t.Z)({},h,{ref:p}),d)}},1420:(r,n,o)=>{o.d(n,{Z:()=>C});var t=o(3366),e=o(7462),a=o(7294),i=o(6010);const l=r=>{const n=a.useRef({});return a.useEffect((()=>{n.current=r})),n.current};var s=o(4780),c=o(1588),u=o(4867);function g(r){return(0,u.Z)("MuiBadge",r)}(0,c.Z)("MuiBadge",["root","badge","invisible"]);var d=o(4261),v=o(5893);const f=["badgeContent","component","children","invisible","max","slotProps","slots","showZero"],h=a.forwardRef((function(r,n){const{component:o,children:a,max:i=99,slotProps:c={},slots:u={},showZero:h=!1}=r,m=(0,t.Z)(r,f),{badgeContent:p,max:b,displayValue:Z,invisible:O}=function(r){const{badgeContent:n,invisible:o=!1,max:t=99,showZero:e=!1}=r,a=l({badgeContent:n,max:t});let i=o;!1!==o||0!==n||e||(i=!0);const{badgeContent:s,max:c=t}=i?a:r;return{badgeContent:s,invisible:i,max:c,displayValue:s&&Number(s)>c?`${c}+`:s}}((0,e.Z)({},r,{max:i})),y=(0,e.Z)({},r,{badgeContent:p,invisible:O,max:b,showZero:h}),w=(r=>{const{invisible:n}=r,o={root:["root"],badge:["badge",n&&"invisible"]};return(0,s.Z)(o,g,void 0)})(y),x=o||u.root||"span",S=(0,d.Z)({elementType:x,externalSlotProps:c.root,externalForwardedProps:m,additionalProps:{ref:n},ownerState:y,className:w.root}),R=u.badge||"span",C=(0,d.Z)({elementType:R,externalSlotProps:c.badge,ownerState:y,className:w.badge});return(0,v.jsxs)(x,(0,e.Z)({},S,{children:[a,(0,v.jsx)(R,(0,e.Z)({},C,{children:Z}))]}))}));var m=o(948),p=o(1657),b=o(8442);const Z=r=>!r||!(0,b.Z)(r);var O=o(8216);function y(r){return(0,u.Z)("MuiBadge",r)}const w=(0,c.Z)("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]),x=["anchorOrigin","className","component","components","componentsProps","overlap","color","invisible","max","badgeContent","slots","slotProps","showZero","variant"],S=(0,m.ZP)("span",{name:"MuiBadge",slot:"Root",overridesResolver:(r,n)=>n.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),R=(0,m.ZP)("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(r,n)=>{const{ownerState:o}=r;return[n.badge,n[o.variant],n[`anchorOrigin${(0,O.Z)(o.anchorOrigin.vertical)}${(0,O.Z)(o.anchorOrigin.horizontal)}${(0,O.Z)(o.overlap)}`],"default"!==o.color&&n[`color${(0,O.Z)(o.color)}`],o.invisible&&n.invisible]}})((({theme:r,ownerState:n})=>(0,e.Z)({display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:r.typography.fontFamily,fontWeight:r.typography.fontWeightMedium,fontSize:r.typography.pxToRem(12),minWidth:20,lineHeight:1,padding:"0 6px",height:20,borderRadius:10,zIndex:1,transition:r.transitions.create("transform",{easing:r.transitions.easing.easeInOut,duration:r.transitions.duration.enteringScreen})},"default"!==n.color&&{backgroundColor:(r.vars||r).palette[n.color].main,color:(r.vars||r).palette[n.color].contrastText},"dot"===n.variant&&{borderRadius:4,height:8,minWidth:8,padding:0},"top"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${w.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${w.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},"top"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${w.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"rectangular"===n.overlap&&{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${w.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},"top"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${w.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"right"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${w.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}},"top"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${w.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}},"bottom"===n.anchorOrigin.vertical&&"left"===n.anchorOrigin.horizontal&&"circular"===n.overlap&&{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${w.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}},n.invisible&&{transition:r.transitions.create("transform",{easing:r.transitions.easing.easeInOut,duration:r.transitions.duration.leavingScreen})}))),C=a.forwardRef((function(r,n){var o,a,c,u,g,d;const f=(0,p.Z)({props:r,name:"MuiBadge"}),{anchorOrigin:m={vertical:"top",horizontal:"right"},className:b,component:w="span",components:C={},componentsProps:P={},overlap:$="rectangular",color:N="default",invisible:z=!1,max:B,badgeContent:T,slots:k,slotProps:M,showZero:L=!1,variant:j="standard"}=f,E=(0,t.Z)(f,x),W=l({anchorOrigin:m,color:N,overlap:$,variant:j});let A=z;!1===z&&(0===T&&!L||null==T&&"dot"!==j)&&(A=!0);const{color:I=N,overlap:F=$,anchorOrigin:V=m,variant:_=j}=A?W:f,D=(r=>{const{color:n,anchorOrigin:o,invisible:t,overlap:e,variant:a,classes:i={}}=r,l={root:["root"],badge:["badge",a,t&&"invisible",`anchorOrigin${(0,O.Z)(o.vertical)}${(0,O.Z)(o.horizontal)}`,`anchorOrigin${(0,O.Z)(o.vertical)}${(0,O.Z)(o.horizontal)}${(0,O.Z)(e)}`,`overlap${(0,O.Z)(e)}`,"default"!==n&&`color${(0,O.Z)(n)}`]};return(0,s.Z)(l,y,i)})((0,e.Z)({},f,{anchorOrigin:V,invisible:A,color:I,overlap:F,variant:_}));let H;"dot"!==_&&(H=T&&Number(T)>B?`${B}+`:T);const q=null!=(o=null!=(a=null==k?void 0:k.root)?a:C.Root)?o:S,G=null!=(c=null!=(u=null==k?void 0:k.badge)?u:C.Badge)?c:R,J=null!=(g=null==M?void 0:M.root)?g:P.root,K=null!=(d=null==M?void 0:M.badge)?d:P.badge;return(0,v.jsx)(h,(0,e.Z)({invisible:z,badgeContent:H,showZero:L,max:B},E,{slots:{root:q,badge:G},className:(0,i.Z)(null==J?void 0:J.className,D.root,b),slotProps:{root:(0,e.Z)({},J,Z(q)&&{as:w,ownerState:(0,e.Z)({},null==J?void 0:J.ownerState,{anchorOrigin:V,color:I,overlap:F,variant:_})}),badge:(0,e.Z)({},K,{className:(0,i.Z)(D.badge,null==K?void 0:K.className)},Z(G)&&{ownerState:(0,e.Z)({},null==K?void 0:K.ownerState,{anchorOrigin:V,color:I,overlap:F,variant:_})})},ref:n}))}))},6645:(r,n,o)=>{o.d(n,{Z:()=>a});var t=o(7294),e=o(3748);function a(r){var n=(0,t.useContext)(e.ZP);if(!n)throw new Error("Missing <CookiesProvider>");var o=n.getAll(),a=(0,t.useState)(o),i=a[0],l=a[1],s=(0,t.useRef)(i);return"undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement&&(0,t.useLayoutEffect)((function(){function o(){var o=n.getAll();(function(r,n,o){if(!r)return!0;for(var t=0,e=r;t<e.length;t++){var a=e[t];if(n[a]!==o[a])return!0}return!1})(r||null,o,s.current)&&l(o),s.current=o}return n.addChangeListener(o),function(){n.removeChangeListener(o)}}),[n]),[i,(0,t.useMemo)((function(){return n.set.bind(n)}),[n]),(0,t.useMemo)((function(){return n.remove.bind(n)}),[n])]}}}]);