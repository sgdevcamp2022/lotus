"use strict";(self.webpackChunkloatus_web=self.webpackChunkloatus_web||[]).push([[934],{7934:(e,t,r)=>{r.r(t),r.d(t,{default:()=>z});var n=r(7294),a=r(3757),o=r(3564),l=r(9250),i=r(2658),c=r(1420),u=r(6867),s=r(6914),m=r(5725),f=r(4680),p=r(6446),h=r(6723),d=r(270),y=r(7720),b=r(576),g=r(417),Z=r(7109),E=r(9334),v=r(1508),k=r(6307),A=r(2440),w=r(2463),x=r(8678),S=r(1817),j=r(6645),C=r(7562),O=r(5678),I=r(8753);function T(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o,l,i=[],c=!0,u=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=o.call(r)).done)&&(i.push(n.value),i.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(u)throw a}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const z=function(){var e=(0,l.s0)(),t=(0,l.UO)(),r=localStorage.getItem("accessToken"),_=(0,a.ZP)(["http://k8s-default-lotuseks-7a795447b1-1658253416.ap-northeast-2.elb.amazonaws.com"+"/post/".concat(t.id),r],o.Z),z=_.data,P=(_.error,_.mutate),B=T((0,j.Z)(["refreshToken"]),1)[0],F=(0,C.Z)("http://k8s-default-lotuseks-7a795447b1-1658253416.ap-northeast-2.elb.amazonaws.com/auth/my",B.refreshToken),U=F.data,M=(F.error,F.mutate,T((0,x.Z)(""),3)),R=M[0],W=M[1],$=M[2],D=(0,n.useCallback)((function(e){e.preventDefault(),R?U?S.Z.post("http://k8s-default-lotuseks-7a795447b1-1658253416.ap-northeast-2.elb.amazonaws.com/post/comment/",{post:t.id,text:R},{headers:{Authorization:"Bearer ".concat(r)}}).then((function(e){P(),$("")})).catch((function(e){O.Am.error(e.message,{position:"top-right"})})):O.Am.error("로그인 후에 이용할 수 있습니다.",{position:"top-right"}):O.Am.error("빈 댓글을 등록할 수 없습니다.",{position:"top-right"})}),[R,t,U,r]),K=(0,n.useCallback)((function(){U?S.Z.get("http://k8s-default-lotuseks-7a795447b1-1658253416.ap-northeast-2.elb.amazonaws.com"+"/post/like/".concat(t.id),{headers:{Authorization:"Bearer ".concat(r)}}).then((function(e){P()})).catch((function(e){O.Am.error(e.message,{position:"top-right"})})):O.Am.error("로그인 후에 이용할 수 있습니다.",{position:"top-right"})}),[U,r,t]);return z?n.createElement(n.Fragment,null,n.createElement(v.Z,{width:1e3},n.createElement(i.Z,{variant:"h2",component:"h2",fontFamily:"Noto Sans KR, sans-serif"},z&&z[0].fields.title,n.createElement(c.Z,{badgeContent:z&&z[0].fields.like.length,color:"success"},n.createElement(u.Z,{onClick:K},n.createElement(w.Z,null)))),n.createElement(s.Z,{onClick:function(){return e(-1)}},"뒤로가기")),n.createElement(m.ZP,{container:!0,marginTop:"30px"},n.createElement(m.ZP,{xs:4,item:!0},z[0].fields.author),n.createElement(m.ZP,{xs:8,item:!0,textAlign:"right"},n.createElement(I.Z,{date:z[0].fields.published_date}))),n.createElement(f.Z,{elevation:3,sx:{height:"350px",marginTop:"20px",padding:"30px",marginBottom:"20px"}},n.createElement(v.Z,null,z&&z[0].fields.content)),n.createElement("div",null,n.createElement("form",{onSubmit:D},n.createElement(p.Z,{fullWidth:!0,variant:"filled"},n.createElement(h.Z,{fullWidth:!0,endAdornment:n.createElement(d.Z,{position:"end"},n.createElement(u.Z,{type:"submit"},n.createElement(k.Z,null))),value:R,onChange:W})))),n.createElement(y.Z,null),n.createElement(A.Z,{sx:{width:"100%",bgcolor:"background.paper"}},"string"!=typeof z[0].fields.comments&&z[0].fields.comments.map((function(e,t){return n.createElement(b.ZP,{alignItems:"flex-start",key:t},n.createElement(g.Z,null,n.createElement(Z.Z,{alt:"Remy Sharp",src:"/static/images/avatar/1.jpg"})),n.createElement(E.Z,{primary:e.cur_user_comment,secondary:n.createElement(n.Fragment,null,n.createElement(i.Z,{sx:{display:"inline"},component:"span",variant:"body2",color:"text.primary"},e.cur_user_nickname))}))})))):null}},8678:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(7294);function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}const o=function(e){var t,r,o=(t=(0,n.useState)(e),r=2,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o,l,i=[],c=!0,u=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(n=o.call(r)).done)&&(i.push(n.value),i.length!==t);c=!0);}catch(e){u=!0,a=e}finally{try{if(!c&&null!=r.return&&(l=r.return(),Object(l)!==l))return}finally{if(u)throw a}}return i}}(t,r)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=o[0],i=o[1];return[l,(0,n.useCallback)((function(e){i(e.target.value)}),[i]),i]}}}]);