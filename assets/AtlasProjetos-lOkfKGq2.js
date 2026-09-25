import{j as M,r as ae,a as Pc,b as Pl,d as Dl,e as Ll,L as Ba,f as Nl,g as Dc,h as Lc,i as Nc,k as Ic,l as Uc,m as Fc,n as Oc,o as Bc,p as zc,q as Gc}from"./index-9Nux_fgc.js";import{d as Il,n as kc,s as Fn,a as co,b as Vc,c as ea,e as ta,y as Hc,p as uo,t as Wc,f as Xc,g as qc,h as jc,S as Ul,m as Fl,L as Yc,F as Ol,i as Ui,j as Kc,r as Zc,k as za,l as Bl,o as ho,q as $c,u as Jc,v as Qc,w as fo,x as eu,B as tu,z as nu,A as na,C as iu,D as su,P as Si,E as au,M as ru,G as ou,H as lu,I as cu}from"./AtlasAderencia-DK7bJEIq.js";import{N as Ga,F as uu,c as Gn,m as du,M as hu,a as ka,b as fu}from"./NomesComLogo-DRyvICoN.js";import{u as pu,a as mu,b as gu,l as _u,c as zr,L as xu,d as vu}from"./useMidia-Dk6B0ZNj.js";import{c as zl,P as Mu,L as Su}from"./ProducaoItem-Dn-JSTs1.js";import{R as Eu,q as bu,r as yu,e as Tu,s as Au,t as Ru,u as wu,v as Cu,w as Pu,x as Du,y as Lu,z as Nu,A as Iu,B as Uu,C as Fu,D as Ou}from"./formato-vMM4TuEo.js";import{l as Bu,p as zu}from"./ponte-DCo-LyhC.js";import"./DicaToque-BpZBkGJ3.js";const ss=n=>()=>n;function Va(n,{sourceEvent:e,subject:t,target:i,identifier:s,active:a,x:r,y:o,dx:c,dy:l,dispatch:h}){Object.defineProperties(this,{type:{value:n,enumerable:!0,configurable:!0},sourceEvent:{value:e,enumerable:!0,configurable:!0},subject:{value:t,enumerable:!0,configurable:!0},target:{value:i,enumerable:!0,configurable:!0},identifier:{value:s,enumerable:!0,configurable:!0},active:{value:a,enumerable:!0,configurable:!0},x:{value:r,enumerable:!0,configurable:!0},y:{value:o,enumerable:!0,configurable:!0},dx:{value:c,enumerable:!0,configurable:!0},dy:{value:l,enumerable:!0,configurable:!0},_:{value:h}})}Va.prototype.on=function(){var n=this._.on.apply(this._,arguments);return n===this._?this:n};function Gu(n){return!n.ctrlKey&&!n.button}function ku(){return this.parentNode}function Vu(n,e){return e??{x:n.x,y:n.y}}function Hu(){return navigator.maxTouchPoints||"ontouchstart"in this}function Wu(){var n=Gu,e=ku,t=Vu,i=Hu,s={},a=Il("start","drag","end"),r=0,o,c,l,h,m=0;function u(v){v.on("mousedown.drag",g).filter(i).on("touchstart.drag",p).on("touchmove.drag",d,kc).on("touchend.drag touchcancel.drag",b).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function g(v,R){if(!(h||!n.call(this,v,R))){var T=A(this,e.call(this,v,R),v,R,"mouse");T&&(Fn(v.view).on("mousemove.drag",_,co).on("mouseup.drag",S,co),Vc(v.view),ea(v),l=!1,o=v.clientX,c=v.clientY,T("start",v))}}function _(v){if(ta(v),!l){var R=v.clientX-o,T=v.clientY-c;l=R*R+T*T>m}s.mouse("drag",v)}function S(v){Fn(v.view).on("mousemove.drag mouseup.drag",null),Hc(v.view,l),ta(v),s.mouse("end",v)}function p(v,R){if(n.call(this,v,R)){var T=v.changedTouches,C=e.call(this,v,R),x=T.length,y,L;for(y=0;y<x;++y)(L=A(this,C,v,R,T[y].identifier,T[y]))&&(ea(v),L("start",v,T[y]))}}function d(v){var R=v.changedTouches,T=R.length,C,x;for(C=0;C<T;++C)(x=s[R[C].identifier])&&(ta(v),x("drag",v,R[C]))}function b(v){var R=v.changedTouches,T=R.length,C,x;for(h&&clearTimeout(h),h=setTimeout(function(){h=null},500),C=0;C<T;++C)(x=s[R[C].identifier])&&(ea(v),x("end",v,R[C]))}function A(v,R,T,C,x,y){var L=a.copy(),D=uo(y||T,R),N,k,V;if((V=t.call(v,new Va("beforestart",{sourceEvent:T,target:u,identifier:x,active:r,x:D[0],y:D[1],dx:0,dy:0,dispatch:L}),C))!=null)return N=V.x-D[0]||0,k=V.y-D[1]||0,function F(q,X,Q){var ne=D,fe;switch(q){case"start":s[x]=F,fe=r++;break;case"end":delete s[x],--r;case"drag":D=uo(Q||X,R),fe=r;break}L.call(q,v,new Va(q,{sourceEvent:X,subject:V,target:u,identifier:x,active:fe,x:D[0]+N,y:D[1]+k,dx:D[0]-ne[0],dy:D[1]-ne[1],dispatch:L}),C)}}return u.filter=function(v){return arguments.length?(n=typeof v=="function"?v:ss(!!v),u):n},u.container=function(v){return arguments.length?(e=typeof v=="function"?v:ss(v),u):e},u.subject=function(v){return arguments.length?(t=typeof v=="function"?v:ss(v),u):t},u.touchable=function(v){return arguments.length?(i=typeof v=="function"?v:ss(!!v),u):i},u.on=function(){var v=a.on.apply(a,arguments);return v===a?u:v},u.clickDistance=function(v){return arguments.length?(m=(v=+v)*v,u):Math.sqrt(m)},u}function Xu(n){const e=+this._x.call(null,n),t=+this._y.call(null,n);return Gl(this.cover(e,t),e,t,n)}function Gl(n,e,t,i){if(isNaN(e)||isNaN(t))return n;var s,a=n._root,r={data:i},o=n._x0,c=n._y0,l=n._x1,h=n._y1,m,u,g,_,S,p,d,b;if(!a)return n._root=r,n;for(;a.length;)if((S=e>=(m=(o+l)/2))?o=m:l=m,(p=t>=(u=(c+h)/2))?c=u:h=u,s=a,!(a=a[d=p<<1|S]))return s[d]=r,n;if(g=+n._x.call(null,a.data),_=+n._y.call(null,a.data),e===g&&t===_)return r.next=a,s?s[d]=r:n._root=r,n;do s=s?s[d]=new Array(4):n._root=new Array(4),(S=e>=(m=(o+l)/2))?o=m:l=m,(p=t>=(u=(c+h)/2))?c=u:h=u;while((d=p<<1|S)===(b=(_>=u)<<1|g>=m));return s[b]=a,s[d]=r,n}function qu(n){var e,t,i=n.length,s,a,r=new Array(i),o=new Array(i),c=1/0,l=1/0,h=-1/0,m=-1/0;for(t=0;t<i;++t)isNaN(s=+this._x.call(null,e=n[t]))||isNaN(a=+this._y.call(null,e))||(r[t]=s,o[t]=a,s<c&&(c=s),s>h&&(h=s),a<l&&(l=a),a>m&&(m=a));if(c>h||l>m)return this;for(this.cover(c,l).cover(h,m),t=0;t<i;++t)Gl(this,r[t],o[t],n[t]);return this}function ju(n,e){if(isNaN(n=+n)||isNaN(e=+e))return this;var t=this._x0,i=this._y0,s=this._x1,a=this._y1;if(isNaN(t))s=(t=Math.floor(n))+1,a=(i=Math.floor(e))+1;else{for(var r=s-t||1,o=this._root,c,l;t>n||n>=s||i>e||e>=a;)switch(l=(e<i)<<1|n<t,c=new Array(4),c[l]=o,o=c,r*=2,l){case 0:s=t+r,a=i+r;break;case 1:t=s-r,a=i+r;break;case 2:s=t+r,i=a-r;break;case 3:t=s-r,i=a-r;break}this._root&&this._root.length&&(this._root=o)}return this._x0=t,this._y0=i,this._x1=s,this._y1=a,this}function Yu(){var n=[];return this.visit(function(e){if(!e.length)do n.push(e.data);while(e=e.next)}),n}function Ku(n){return arguments.length?this.cover(+n[0][0],+n[0][1]).cover(+n[1][0],+n[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function Ct(n,e,t,i,s){this.node=n,this.x0=e,this.y0=t,this.x1=i,this.y1=s}function Zu(n,e,t){var i,s=this._x0,a=this._y0,r,o,c,l,h=this._x1,m=this._y1,u=[],g=this._root,_,S;for(g&&u.push(new Ct(g,s,a,h,m)),t==null?t=1/0:(s=n-t,a=e-t,h=n+t,m=e+t,t*=t);_=u.pop();)if(!(!(g=_.node)||(r=_.x0)>h||(o=_.y0)>m||(c=_.x1)<s||(l=_.y1)<a))if(g.length){var p=(r+c)/2,d=(o+l)/2;u.push(new Ct(g[3],p,d,c,l),new Ct(g[2],r,d,p,l),new Ct(g[1],p,o,c,d),new Ct(g[0],r,o,p,d)),(S=(e>=d)<<1|n>=p)&&(_=u[u.length-1],u[u.length-1]=u[u.length-1-S],u[u.length-1-S]=_)}else{var b=n-+this._x.call(null,g.data),A=e-+this._y.call(null,g.data),v=b*b+A*A;if(v<t){var R=Math.sqrt(t=v);s=n-R,a=e-R,h=n+R,m=e+R,i=g.data}}return i}function $u(n){if(isNaN(h=+this._x.call(null,n))||isNaN(m=+this._y.call(null,n)))return this;var e,t=this._root,i,s,a,r=this._x0,o=this._y0,c=this._x1,l=this._y1,h,m,u,g,_,S,p,d;if(!t)return this;if(t.length)for(;;){if((_=h>=(u=(r+c)/2))?r=u:c=u,(S=m>=(g=(o+l)/2))?o=g:l=g,e=t,!(t=t[p=S<<1|_]))return this;if(!t.length)break;(e[p+1&3]||e[p+2&3]||e[p+3&3])&&(i=e,d=p)}for(;t.data!==n;)if(s=t,!(t=t.next))return this;return(a=t.next)&&delete t.next,s?(a?s.next=a:delete s.next,this):e?(a?e[p]=a:delete e[p],(t=e[0]||e[1]||e[2]||e[3])&&t===(e[3]||e[2]||e[1]||e[0])&&!t.length&&(i?i[d]=t:this._root=t),this):(this._root=a,this)}function Ju(n){for(var e=0,t=n.length;e<t;++e)this.remove(n[e]);return this}function Qu(){return this._root}function ed(){var n=0;return this.visit(function(e){if(!e.length)do++n;while(e=e.next)}),n}function td(n){var e=[],t,i=this._root,s,a,r,o,c;for(i&&e.push(new Ct(i,this._x0,this._y0,this._x1,this._y1));t=e.pop();)if(!n(i=t.node,a=t.x0,r=t.y0,o=t.x1,c=t.y1)&&i.length){var l=(a+o)/2,h=(r+c)/2;(s=i[3])&&e.push(new Ct(s,l,h,o,c)),(s=i[2])&&e.push(new Ct(s,a,h,l,c)),(s=i[1])&&e.push(new Ct(s,l,r,o,h)),(s=i[0])&&e.push(new Ct(s,a,r,l,h))}return this}function nd(n){var e=[],t=[],i;for(this._root&&e.push(new Ct(this._root,this._x0,this._y0,this._x1,this._y1));i=e.pop();){var s=i.node;if(s.length){var a,r=i.x0,o=i.y0,c=i.x1,l=i.y1,h=(r+c)/2,m=(o+l)/2;(a=s[0])&&e.push(new Ct(a,r,o,h,m)),(a=s[1])&&e.push(new Ct(a,h,o,c,m)),(a=s[2])&&e.push(new Ct(a,r,m,h,l)),(a=s[3])&&e.push(new Ct(a,h,m,c,l))}t.push(i)}for(;i=t.pop();)n(i.node,i.x0,i.y0,i.x1,i.y1);return this}function id(n){return n[0]}function sd(n){return arguments.length?(this._x=n,this):this._x}function ad(n){return n[1]}function rd(n){return arguments.length?(this._y=n,this):this._y}function kl(n,e,t){var i=new Gr(e??id,t??ad,NaN,NaN,NaN,NaN);return n==null?i:i.addAll(n)}function Gr(n,e,t,i,s,a){this._x=n,this._y=e,this._x0=t,this._y0=i,this._x1=s,this._y1=a,this._root=void 0}function po(n){for(var e={data:n.data},t=e;n=n.next;)t=t.next={data:n.data};return e}var Dt=kl.prototype=Gr.prototype;Dt.copy=function(){var n=new Gr(this._x,this._y,this._x0,this._y0,this._x1,this._y1),e=this._root,t,i;if(!e)return n;if(!e.length)return n._root=po(e),n;for(t=[{source:e,target:n._root=new Array(4)}];e=t.pop();)for(var s=0;s<4;++s)(i=e.source[s])&&(i.length?t.push({source:i,target:e.target[s]=new Array(4)}):e.target[s]=po(i));return n};Dt.add=Xu;Dt.addAll=qu;Dt.cover=ju;Dt.data=Yu;Dt.extent=Ku;Dt.find=Zu;Dt.remove=$u;Dt.removeAll=Ju;Dt.root=Qu;Dt.size=ed;Dt.visit=td;Dt.visitAfter=nd;Dt.x=sd;Dt.y=rd;function sn(n){return function(){return n}}function mo(n){return(n()-.5)*1e-6}function od(n){return n.x+n.vx}function ld(n){return n.y+n.vy}function Vl(n){var e,t,i,s=1,a=1;typeof n!="function"&&(n=sn(n==null?1:+n));function r(){for(var l,h=e.length,m,u,g,_,S,p,d=0;d<a;++d)for(m=kl(e,od,ld).visitAfter(o),l=0;l<h;++l)u=e[l],S=t[u.index],p=S*S,g=u.x+u.vx,_=u.y+u.vy,m.visit(b);function b(A,v,R,T,C){var x=A.data,y=A.r,L=S+y;if(x){if(x.index>u.index){var D=g-x.x-x.vx,N=_-x.y-x.vy,k=D*D+N*N;k<L*L&&(D===0&&(D=mo(i),k+=D*D),N===0&&(N=mo(i),k+=N*N),k=(L-(k=Math.sqrt(k)))/k*s,u.vx+=(D*=k)*(L=(y*=y)/(p+y)),u.vy+=(N*=k)*L,x.vx-=D*(L=1-L),x.vy-=N*L)}return}return v>g+L||T<g-L||R>_+L||C<_-L}}function o(l){if(l.data)return l.r=t[l.data.index];for(var h=l.r=0;h<4;++h)l[h]&&l[h].r>l.r&&(l.r=l[h].r)}function c(){if(e){var l,h=e.length,m;for(t=new Array(h),l=0;l<h;++l)m=e[l],t[m.index]=+n(m,l,e)}}return r.initialize=function(l,h){e=l,i=h,c()},r.iterations=function(l){return arguments.length?(a=+l,r):a},r.strength=function(l){return arguments.length?(s=+l,r):s},r.radius=function(l){return arguments.length?(n=typeof l=="function"?l:sn(+l),c(),r):n},r}const cd=1664525,ud=1013904223,go=4294967296;function dd(){let n=1;return()=>(n=(cd*n+ud)%go)/go}var hd=10,fd=Math.PI*(3-Math.sqrt(5));function Hl(n){var e,t=1,i=.001,s=1-Math.pow(i,1/300),a=0,r=.6,o=new Map,c=Wc(m),l=Il("tick","end"),h=dd();n==null&&(n=[]);function m(){u(),l.call("tick",e),t<i&&(c.stop(),l.call("end",e))}function u(S){var p,d=n.length,b;S===void 0&&(S=1);for(var A=0;A<S;++A)for(t+=(a-t)*s,o.forEach(function(v){v(t)}),p=0;p<d;++p)b=n[p],b.fx==null?b.x+=b.vx*=r:(b.x=b.fx,b.vx=0),b.fy==null?b.y+=b.vy*=r:(b.y=b.fy,b.vy=0);return e}function g(){for(var S=0,p=n.length,d;S<p;++S){if(d=n[S],d.index=S,d.fx!=null&&(d.x=d.fx),d.fy!=null&&(d.y=d.fy),isNaN(d.x)||isNaN(d.y)){var b=hd*Math.sqrt(.5+S),A=S*fd;d.x=b*Math.cos(A),d.y=b*Math.sin(A)}(isNaN(d.vx)||isNaN(d.vy))&&(d.vx=d.vy=0)}}function _(S){return S.initialize&&S.initialize(n,h),S}return g(),e={tick:u,restart:function(){return c.restart(m),e},stop:function(){return c.stop(),e},nodes:function(S){return arguments.length?(n=S,g(),o.forEach(_),e):n},alpha:function(S){return arguments.length?(t=+S,e):t},alphaMin:function(S){return arguments.length?(i=+S,e):i},alphaDecay:function(S){return arguments.length?(s=+S,e):+s},alphaTarget:function(S){return arguments.length?(a=+S,e):a},velocityDecay:function(S){return arguments.length?(r=1-S,e):1-r},randomSource:function(S){return arguments.length?(h=S,o.forEach(_),e):h},force:function(S,p){return arguments.length>1?(p==null?o.delete(S):o.set(S,_(p)),e):o.get(S)},find:function(S,p,d){var b=0,A=n.length,v,R,T,C,x;for(d==null?d=1/0:d*=d,b=0;b<A;++b)C=n[b],v=S-C.x,R=p-C.y,T=v*v+R*R,T<d&&(x=C,d=T);return x},on:function(S,p){return arguments.length>1?(l.on(S,p),e):l.on(S)}}}function Ha(n){var e=sn(.1),t,i,s;typeof n!="function"&&(n=sn(n==null?0:+n));function a(o){for(var c=0,l=t.length,h;c<l;++c)h=t[c],h.vx+=(s[c]-h.x)*i[c]*o}function r(){if(t){var o,c=t.length;for(i=new Array(c),s=new Array(c),o=0;o<c;++o)i[o]=isNaN(s[o]=+n(t[o],o,t))?0:+e(t[o],o,t)}}return a.initialize=function(o){t=o,r()},a.strength=function(o){return arguments.length?(e=typeof o=="function"?o:sn(+o),r(),a):e},a.x=function(o){return arguments.length?(n=typeof o=="function"?o:sn(+o),r(),a):n},a}function Wa(n){var e=sn(.1),t,i,s;typeof n!="function"&&(n=sn(n==null?0:+n));function a(o){for(var c=0,l=t.length,h;c<l;++c)h=t[c],h.vy+=(s[c]-h.y)*i[c]*o}function r(){if(t){var o,c=t.length;for(i=new Array(c),s=new Array(c),o=0;o<c;++o)i[o]=isNaN(s[o]=+n(t[o],o,t))?0:+e(t[o],o,t)}}return a.initialize=function(o){t=o,r()},a.strength=function(o){return arguments.length?(e=typeof o=="function"?o:sn(+o),r(),a):e},a.y=function(o){return arguments.length?(n=typeof o=="function"?o:sn(+o),r(),a):n},a}const pd=420,md=230;function Wl(n,e){const t=n+14+pd>window.innerWidth,i=e+14+md>window.innerHeight;return{left:t?n-14:n+14,top:i?e-14:e+14,transform:`translate(${t?"-100%":"0"}, ${i?"-100%":"0"})`}}function gd({x:n,y:e,p:t,tema:i,ficha:s}){const a=s?Xc(s):null,o=[s?qc(s.situacao):null,a,`${t.n_producoes} produções`,s?`${s.n_membros} membros`:null].filter(Boolean).join(" · "),c=s?jc(s):[];return M.jsxs("div",{className:"atlas-tooltip atlas-tooltip-ficha",style:Wl(n,e),children:[M.jsx("strong",{children:t.nome??"(sem título)"}),M.jsxs("div",{className:"atlas-tooltip-nota",children:[M.jsx(Ul,{sigla:t.sigla}),o?` · ${o}`:""]}),(s==null?void 0:s.resumo)&&M.jsx("div",{className:"atlas-tooltip-resumo",children:s.resumo}),s&&(s.responsaveis.length>0||c.length>0)&&M.jsxs("div",{className:"atlas-tooltip-nota",children:[s.responsaveis.length>0&&M.jsx(Ga,{rotulo:"Responsável",nomes:s.responsaveis,sigla:t.sigla}),s.responsaveis.length>0&&c.length>0&&" · ",c.length>0&&M.jsxs(M.Fragment,{children:["Fomento: ",c.join(", ")]})]}),M.jsxs("div",{className:"atlas-tooltip-nota",children:[i,t.subarea?` · ${t.subarea}`:""]}),M.jsx("div",{className:"atlas-tooltip-dica",children:"clique para fixar e ler a descrição completa"})]})}function _d({x:n,y:e,pr:t,marca:i,destaques:s,projetoNome:a,responsaveis:r,sigla:o}){const c=t.autores.map(l=>l.nome);return M.jsxs("div",{className:"atlas-tooltip atlas-tooltip-ficha",style:Wl(n,e),children:[M.jsxs("strong",{children:[i,t.nome??"sem título registrado"]}),M.jsxs("div",{className:"atlas-tooltip-nota",children:[o&&M.jsxs(M.Fragment,{children:[M.jsx(Ul,{sigla:o})," · "]}),Eu[t.classe]??t.classe," · ",t.tipo," · ",t.subtipo,t.ano?` · ${t.ano}`:""]}),c.length>0&&M.jsx("div",{className:"atlas-tooltip-nota",children:M.jsx(Ga,{rotulo:"Autoria",nomes:c,sigla:o,max:4})}),s.map(l=>M.jsxs("div",{className:"atlas-tooltip-resumo",children:[M.jsxs("span",{className:"atlas-tooltip-nota",children:[l.rotulo,": "]}),l.valor]},l.rotulo)),a&&M.jsxs("div",{className:"atlas-tooltip-projeto",children:[M.jsx("span",{className:"atlas-tooltip-nota",children:"Projeto: "}),a,r.length>0&&M.jsxs("span",{className:"atlas-tooltip-nota",children:[" · ",M.jsx(Ga,{rotulo:"Responsável",nomes:r,sigla:o})]})]}),M.jsx("div",{className:"atlas-tooltip-dica",children:"clique para fixar este cartão"})]})}const ia=384;let _o=20;function as(n,e,t){return Math.max(e,Math.min(t,n))}function Xl({ancora:n,larguraArea:e,titulo:t,acoes:i,ariaLabel:s,onFechar:a,children:r}){const o=ae.useRef(null),c=ae.useRef(null),[l,h]=ae.useState(()=>++_o),[m,u]=ae.useState(()=>n==="canto"?{left:Math.max(4,e-ia-8),top:8}:{left:n.x+16+ia<=e?n.x+16:Math.max(4,n.x-16-ia),top:Math.max(4,n.y-24)});ae.useLayoutEffect(()=>{const p=o.current,d=p==null?void 0:p.offsetParent;!p||!d||u(b=>({left:as(b.left,0,Math.max(0,d.scrollWidth-p.offsetWidth)),top:as(b.top,0,Math.max(0,d.clientHeight-p.offsetHeight))}))},[]);function g(p){if(p.target.closest("button, a"))return;const d=o.current;if(!d)return;p.currentTarget.setPointerCapture(p.pointerId);const b=d.getBoundingClientRect();c.current={dx:p.clientX-b.left,dy:p.clientY-b.top}}function _(p){const d=o.current,b=d==null?void 0:d.offsetParent;if(!c.current||!d||!b)return;const A=b.getBoundingClientRect();u({left:as(p.clientX-A.left+b.scrollLeft-c.current.dx,0,Math.max(0,b.scrollWidth-d.offsetWidth)),top:as(p.clientY-A.top-c.current.dy,0,Math.max(0,b.clientHeight-d.offsetHeight))})}function S(p){var d,b;c.current=null,(b=(d=p.currentTarget).hasPointerCapture)!=null&&b.call(d,p.pointerId)&&p.currentTarget.releasePointerCapture(p.pointerId)}return M.jsxs("div",{ref:o,className:"atlas-cartao",style:{left:m.left,top:m.top,zIndex:l},role:"dialog","aria-label":s,onPointerDown:()=>h(++_o),children:[M.jsxs("div",{className:"atlas-cartao-cab",onPointerDown:g,onPointerMove:_,onPointerUp:S,onPointerCancel:S,title:"Arraste para mover",children:[M.jsxs("div",{className:"atlas-cartao-barra",children:[M.jsx("span",{className:"atlas-cartao-alca","aria-hidden":"true",children:"⠿"}),M.jsx("div",{className:"atlas-cartao-acoes",children:i}),M.jsx("button",{type:"button",className:"atlas-cartao-fechar",onClick:a,"aria-label":"Fechar",children:"✕"})]}),M.jsx("div",{className:"atlas-cartao-titulo",children:t})]}),r]})}function xd({projeto:n,tema:e,ficha:t,descricao:i,ancora:s,onProducoes:a,onFechar:r,larguraArea:o}){return M.jsxs(Xl,{ancora:s,larguraArea:o,ariaLabel:`Projeto: ${n.nome??""}`,titulo:M.jsx("strong",{children:n.nome??"(sem título)"}),onFechar:r,acoes:M.jsxs("button",{type:"button",className:"atlas-icone-acao destaque",onClick:a,title:`Ver as ${n.n_producoes} produções deste projeto no mapa e na lista`,"aria-label":`Ver as ${n.n_producoes} produções deste projeto`,children:[M.jsx(Pc,{}),M.jsx("span",{className:"atlas-icone-n",children:n.n_producoes})]}),children:[M.jsx("div",{className:"atlas-tooltip-nota",children:Fl(n,t)}),M.jsxs("div",{className:"atlas-cartao-corpo",tabIndex:0,"aria-label":"Descrição do projeto",children:[i??(t==null?void 0:t.resumo)??"Carregando…",!i&&(t==null?void 0:t.resumo)&&M.jsx("span",{className:"atlas-tooltip-nota",children:" (carregando a descrição completa…)"})]}),M.jsx(Yc,{projeto:n,tema:e,ficha:t})]})}function vd({pr:n,marca:e,destaques:t,links:i,projeto:s,tema:a,ficha:r,descricao:o,ancora:c,larguraArea:l,detalheAberto:h,onDetalhe:m,onFechar:u}){return M.jsx(Xl,{ancora:c,larguraArea:l,ariaLabel:`Produção: ${n.nome??""}`,titulo:M.jsxs("strong",{children:[e,n.nome??"sem título registrado"]}),onFechar:u,acoes:M.jsxs(M.Fragment,{children:[n.link&&M.jsx("a",{className:"atlas-icone-acao",href:n.link,target:"_blank",rel:"noreferrer",title:"Abrir a página desta produção na Plataforma Sucupira","aria-label":"Abrir na Plataforma Sucupira",children:M.jsx(Pl,{})}),M.jsx("button",{type:"button",className:`atlas-icone-acao${h?" ativo":""}`,onClick:m,"aria-pressed":h,title:h?"Detalhe completo aberto no painel (clique para fechar)":"Ver o detalhe completo, no painel","aria-label":"Detalhe completo da produção",children:M.jsx(Dl,{})}),i.map(g=>M.jsx("a",{className:"atlas-icone-acao",href:g.url,target:"_blank",rel:"noreferrer",title:`${g.rotulo}: ${g.url}`,"aria-label":`${g.rotulo} (abre em outra aba)`,children:M.jsx(Ll,{})},g.url)),M.jsx(Ba,{className:"atlas-icone-acao",to:`/mapa-de-producoes?producao=${n.id_producao}`,title:"Ver esta produção no Mapa de produções","aria-label":"Ver esta produção no Mapa de produções",children:M.jsx(Nl,{})})]}),children:M.jsx(Ol,{pr:n,destaques:t,projeto:s,tema:a,ficha:r,descricao:o})})}const Xa=3.6,ql=Xa*uu,sa=150,Md=2*ql+.6,xo=Md/1.75,Sd=2.399963229728653,vo=2,Mo=2.2,qa=22;function Ed(n,e){if(e<=sa)return new Map(n);const t=new Map;for(const[s,a]of n)t.set(s,Math.max(1,Math.floor(a*sa/e)));let i=[...t.values()].reduce((s,a)=>s+a,0);for(;i>sa;){const s=[...t.entries()].sort((a,r)=>r[1]-a[1])[0];t.set(s[0],s[1]-1),i-=1}return t}function jl(n,e,t,i,s){const a=new Map;n.forEach((V,F)=>{const q=a.get(V);q?q.push(F):a.set(V,[F])});const r=Ed(new Map([...a].map(([V,F])=>[V,F.length])),n.length),c=[...a.keys()].sort((V,F)=>e(V)-e(F)||V.localeCompare(F)).map(V=>{const F=(a.get(V)??[]).slice(0,r.get(V)??0);return{g:V,mantidas:F,rb:xo*Math.sqrt(F.length+.5)+ql+.6}}),l=n.length-c.reduce((V,F)=>V+F.mantidas.length,0);if(c.length===0)return{satelites:[],rotulos:[],extX:s,extY:s,omitidas:0};const h=c.length,m=(V,F,q)=>2*Math.asin(Math.min(1,(c[V].rb+c[F].rb+vo)/(2*q))),u=V=>{let F=0;for(let q=0;q<h;q++)F+=m(q,(q+1)%h,V);return F},g=Math.max(...c.map(V=>V.rb));let _=s+Mo+g,S=_;if(h>1&&u(_)>2*Math.PI){let V=_*4;for(;u(V)>2*Math.PI;)V*=2;for(let F=0;F<40;F++){const q=(_+V)/2;u(q)>2*Math.PI?_=q:V=q}S=V}const p=h>1?2*Math.PI/u(S):1,d=[];let b=-Math.PI/2;c.forEach((V,F)=>{d.push(b),h>1&&(b+=m(F,(F+1)%h,S)*p)});const A=c.map(()=>NaN),v=c.map((V,F)=>d[F]),R=[],T=c.map((V,F)=>F).sort((V,F)=>c[F].rb-c[V].rb),C=50*Math.PI/180,x=2.5*Math.PI/180,y=.35;for(const V of T){const F=s+Mo+c[V].rb;let q={custo:1/0,d:S,a:d[V]};for(let X=-C;X<=C+1e-9;X+=x){const Q=d[V]+X,ne=Math.cos(Q),fe=Math.sin(Q),le=[];for(const Ge of R){const Ne=A[Ge]*Math.cos(v[Ge]),$=A[Ge]*Math.sin(v[Ge]),ie=c[V].rb+c[Ge].rb+vo,re=ne*Ne+fe*$,Re=re*re-(Ne*Ne+$*$)+ie*ie;Re>0&&le.push([re-Math.sqrt(Re),re+Math.sqrt(Re)])}le.sort((Ge,Ne)=>Ge[0]-Ne[0]);let xe=F;for(const[Ge,Ne]of le)xe>Ge&&xe<Ne&&(xe=Ne);const Pe=xe+y*xe*Math.abs(X);Pe<q.custo&&(q={custo:Pe,d:xe,a:Q})}A[V]=q.d,v[V]=q.a,R.push(V)}const L=[],D=[];let N=s,k=s;return c.forEach((V,F)=>{var $,ie;const q=v[F],X=t+A[F]*Math.cos(q),Q=i+A[F]*Math.sin(q);V.mantidas.forEach((re,Re)=>{const Ue=xo*Math.sqrt(Re+.5),we=Re*Sd+q;L.push({i:re,x:X+Ue*Math.cos(we),y:Q+Ue*Math.sin(we)})});const ne=Math.cos(q),fe=Math.sin(q),le=A[F]+V.rb+1.5;D.push({grupo:V.g,n:(($=a.get(V.g))==null?void 0:$.length)??0,mostradas:V.mantidas.length,x:t+le*ne,y:i+le*fe,ancora:ne>.35?"start":ne<-.35?"end":"middle"});const xe=Math.max(Math.min(((ie=V.g.split("||")[1])==null?void 0:ie.length)??12,qa),8)*1.95,Pe=Math.abs(le*ne),Ge=Math.abs(le*fe),Ne=ne>.35||ne<-.35?Pe+xe:Pe+xe/2;N=Math.max(N,Math.abs(X-t)+V.rb,Ne),k=Math.max(k,Math.abs(Q-i)+V.rb,Ge+6)}),{satelites:L,rotulos:D,extX:N,extY:k,omitidas:l}}function bd(n,e){const t=Array.from({length:Math.max(1,n)},(s,a)=>`g||${"x".repeat(14)}${a%4}`),i=jl(t,s=>s.length,0,0,e);return{x:i.extX,y:i.extY}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const kr="185",bi={ROTATE:0,DOLLY:1,PAN:2},Ei={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},yd=0,So=1,Td=2,Ps=1,Ad=2,Wi=3,kn=0,It=1,Mn=2,En=0,yi=1,Eo=2,bo=3,yo=4,Rd=5,Kn=100,wd=101,Cd=102,Pd=103,Dd=104,Ld=200,Nd=201,Id=202,Ud=203,ja=204,Ya=205,Fd=206,Od=207,Bd=208,zd=209,Gd=210,kd=211,Vd=212,Hd=213,Wd=214,Ka=0,Za=1,$a=2,Ri=3,Ja=4,Qa=5,er=6,tr=7,Yl=0,Xd=1,qd=2,on=0,Kl=1,Zl=2,$l=3,Jl=4,Ql=5,ec=6,tc=7,nc=300,Qn=301,wi=302,aa=303,ra=304,Ws=306,nr=1e3,Sn=1001,ir=1002,bt=1003,jd=1004,rs=1005,Rt=1006,oa=1007,$n=1008,Xt=1009,ic=1010,sc=1011,qi=1012,Vr=1013,un=1014,an=1015,yn=1016,Hr=1017,Wr=1018,ji=1020,ac=35902,rc=35899,oc=1021,lc=1022,$t=1023,Tn=1026,Jn=1027,cc=1028,Xr=1029,ei=1030,qr=1031,jr=1033,Ds=33776,Ls=33777,Ns=33778,Is=33779,sr=35840,ar=35841,rr=35842,or=35843,lr=36196,cr=37492,ur=37496,dr=37488,hr=37489,Os=37490,fr=37491,pr=37808,mr=37809,gr=37810,_r=37811,xr=37812,vr=37813,Mr=37814,Sr=37815,Er=37816,br=37817,yr=37818,Tr=37819,Ar=37820,Rr=37821,wr=36492,Cr=36494,Pr=36495,Dr=36283,Lr=36284,Bs=36285,Nr=36286,Yd=3200,To=0,Kd=1,Bn="",Ht="srgb",zs="srgb-linear",Gs="linear",et="srgb",ri=7680,Ao=519,Zd=512,$d=513,Jd=514,Yr=515,Qd=516,eh=517,Kr=518,th=519,Ro=35044,wo="300 es",rn=2e3,ks=2001;function nh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Vs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ih(){const n=Vs("canvas");return n.style.display="block",n}const Co={};function Po(...n){const e="THREE."+n.shift();console.log(e,...n)}function uc(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Oe(...n){n=uc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Ke(...n){n=uc(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ti(...n){const e=n.join(" ");e in Co||(Co[e]=!0,Oe(...n))}function sh(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const ah={[Ka]:Za,[$a]:er,[Ja]:tr,[Ri]:Qa,[Za]:Ka,[er]:$a,[tr]:Ja,[Qa]:Ri};class Hn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Us=Math.PI/180,Ir=180/Math.PI;function Yi(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function rh(n,e){return(n%e+e)%e}function la(n,e,t){return(1-t)*n+t*e}function Fi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Lt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const oh={DEG2RAD:Us},io=class io{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*s+e.x,this.y=a*s+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};io.prototype.isVector2=!0;let ze=io;class Vn{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,r,o){let c=i[s+0],l=i[s+1],h=i[s+2],m=i[s+3],u=a[r+0],g=a[r+1],_=a[r+2],S=a[r+3];if(m!==S||c!==u||l!==g||h!==_){let p=c*u+l*g+h*_+m*S;p<0&&(u=-u,g=-g,_=-_,S=-S,p=-p);let d=1-o;if(p<.9995){const b=Math.acos(p),A=Math.sin(b);d=Math.sin(d*b)/A,o=Math.sin(o*b)/A,c=c*d+u*o,l=l*d+g*o,h=h*d+_*o,m=m*d+S*o}else{c=c*d+u*o,l=l*d+g*o,h=h*d+_*o,m=m*d+S*o;const b=1/Math.sqrt(c*c+l*l+h*h+m*m);c*=b,l*=b,h*=b,m*=b}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=m}static multiplyQuaternionsFlat(e,t,i,s,a,r){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],m=a[r],u=a[r+1],g=a[r+2],_=a[r+3];return e[t]=o*_+h*m+c*g-l*u,e[t+1]=c*_+h*u+l*m-o*g,e[t+2]=l*_+h*g+o*u-c*m,e[t+3]=h*_-o*m-c*u-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),m=o(a/2),u=c(i/2),g=c(s/2),_=c(a/2);switch(r){case"XYZ":this._x=u*h*m+l*g*_,this._y=l*g*m-u*h*_,this._z=l*h*_+u*g*m,this._w=l*h*m-u*g*_;break;case"YXZ":this._x=u*h*m+l*g*_,this._y=l*g*m-u*h*_,this._z=l*h*_-u*g*m,this._w=l*h*m+u*g*_;break;case"ZXY":this._x=u*h*m-l*g*_,this._y=l*g*m+u*h*_,this._z=l*h*_+u*g*m,this._w=l*h*m-u*g*_;break;case"ZYX":this._x=u*h*m-l*g*_,this._y=l*g*m+u*h*_,this._z=l*h*_-u*g*m,this._w=l*h*m+u*g*_;break;case"YZX":this._x=u*h*m+l*g*_,this._y=l*g*m+u*h*_,this._z=l*h*_-u*g*m,this._w=l*h*m-u*g*_;break;case"XZY":this._x=u*h*m-l*g*_,this._y=l*g*m-u*h*_,this._z=l*h*_+u*g*m,this._w=l*h*m+u*g*_;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],r=t[1],o=t[5],c=t[9],l=t[2],h=t[6],m=t[10],u=i+o+m;if(u>0){const g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(h-c)*g,this._y=(a-l)*g,this._z=(r-s)*g}else if(i>o&&i>m){const g=2*Math.sqrt(1+i-o-m);this._w=(h-c)/g,this._x=.25*g,this._y=(s+r)/g,this._z=(a+l)/g}else if(o>m){const g=2*Math.sqrt(1+o-i-m);this._w=(a-l)/g,this._x=(s+r)/g,this._y=.25*g,this._z=(c+h)/g}else{const g=2*Math.sqrt(1+m-i-o);this._w=(r-s)/g,this._x=(a+l)/g,this._y=(c+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,r=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+r*o+s*l-a*c,this._y=s*h+r*c+a*o-i*l,this._z=a*h+r*l+i*c-s*o,this._w=r*h-i*o-s*c-a*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,a=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+a*t,this._w=this._w*c+r*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+s*t,this._z=this._z*c+a*t,this._w=this._w*c+r*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const so=class so{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Do.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Do.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,r=e.y,o=e.z,c=e.w,l=2*(r*s-o*i),h=2*(o*t-a*s),m=2*(a*i-r*t);return this.x=t+c*l+r*m-o*h,this.y=i+c*h+o*l-a*m,this.z=s+c*m+a*h-r*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,r=t.x,o=t.y,c=t.z;return this.x=s*c-a*o,this.y=a*r-i*c,this.z=i*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ca.copy(this).projectOnVector(e),this.sub(ca)}reflect(e){return this.sub(ca.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};so.prototype.isVector3=!0;let W=so;const ca=new W,Do=new Vn,ao=class ao{constructor(e,t,i,s,a,r,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,c,l)}set(e,t,i,s,a,r,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=a,h[5]=c,h[6]=i,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[3],c=i[6],l=i[1],h=i[4],m=i[7],u=i[2],g=i[5],_=i[8],S=s[0],p=s[3],d=s[6],b=s[1],A=s[4],v=s[7],R=s[2],T=s[5],C=s[8];return a[0]=r*S+o*b+c*R,a[3]=r*p+o*A+c*T,a[6]=r*d+o*v+c*C,a[1]=l*S+h*b+m*R,a[4]=l*p+h*A+m*T,a[7]=l*d+h*v+m*C,a[2]=u*S+g*b+_*R,a[5]=u*p+g*A+_*T,a[8]=u*d+g*v+_*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*r*h-t*o*l-i*a*h+i*o*c+s*a*l-s*r*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8],m=h*r-o*l,u=o*c-h*a,g=l*a-r*c,_=t*m+i*u+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=m*S,e[1]=(s*l-h*i)*S,e[2]=(o*i-s*r)*S,e[3]=u*S,e[4]=(h*t-s*c)*S,e[5]=(s*a-o*t)*S,e[6]=g*S,e[7]=(i*c-l*t)*S,e[8]=(r*t-i*a)*S,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,r,o){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*r+l*o)+r+e,-s*l,s*c,-s*(-l*r+c*o)+o+t,0,0,1),this}scale(e,t){return Ti("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ua.makeScale(e,t)),this}rotate(e){return Ti("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ua.makeRotation(-e)),this}translate(e,t){return Ti("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ua.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ao.prototype.isMatrix3=!0;let Be=ao;const ua=new Be,Lo=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),No=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lh(){const n={enabled:!0,workingColorSpace:zs,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===et&&(s.r=bn(s.r),s.g=bn(s.g),s.b=bn(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===et&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bn?Gs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Ti("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Ti("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[zs]:{primaries:e,whitePoint:i,transfer:Gs,toXYZ:Lo,fromXYZ:No,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:i,transfer:et,toXYZ:Lo,fromXYZ:No,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),n}const je=lh();function bn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ai(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let oi;class ch{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{oi===void 0&&(oi=Vs("canvas")),oi.width=e.width,oi.height=e.height;const s=oi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=oi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Vs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=bn(a[r]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(bn(t[i]/255)*255):t[i]=bn(t[i]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let uh=0;class Zr{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:uh++}),this.uuid=Yi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(da(s[r].image)):a.push(da(s[r]))}else a=da(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function da(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ch.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let dh=0;const ha=new W;class Pt extends Hn{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,i=Sn,s=Sn,a=Rt,r=$n,o=$t,c=Xt,l=Pt.DEFAULT_ANISOTROPY,h=Bn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=Yi(),this.name="",this.source=new Zr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ha).x}get height(){return this.source.getSize(ha).y}get depth(){return this.source.getSize(ha).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==nc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nr:e.x=e.x-Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case ir:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nr:e.y=e.y-Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case ir:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null;Pt.DEFAULT_MAPPING=nc;Pt.DEFAULT_ANISOTROPY=1;const ro=class ro{constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const c=e.elements,l=c[0],h=c[4],m=c[8],u=c[1],g=c[5],_=c[9],S=c[2],p=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(m-S)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(m+S)<.1&&Math.abs(_+p)<.1&&Math.abs(l+g+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(l+1)/2,v=(g+1)/2,R=(d+1)/2,T=(h+u)/4,C=(m+S)/4,x=(_+p)/4;return A>v&&A>R?A<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(A),s=T/i,a=C/i):v>R?v<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(v),i=T/s,a=x/s):R<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(R),i=C/a,s=x/a),this.set(i,s,a,t),this}let b=Math.sqrt((p-_)*(p-_)+(m-S)*(m-S)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(p-_)/b,this.y=(m-S)/b,this.z=(u-h)/b,this.w=Math.acos((l+g+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ro.prototype.isVector4=!0;let ft=ro;class hh extends Hn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},a=new Pt(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Zr(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ln extends hh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class dc extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class fh extends Pt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=bt,this.minFilter=bt,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Hs=class Hs{constructor(e,t,i,s,a,r,o,c,l,h,m,u,g,_,S,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,c,l,h,m,u,g,_,S,p)}set(e,t,i,s,a,r,o,c,l,h,m,u,g,_,S,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=a,d[5]=r,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=m,d[14]=u,d[3]=g,d[7]=_,d[11]=S,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Hs().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/li.setFromMatrixColumn(e,0).length(),a=1/li.setFromMatrixColumn(e,1).length(),r=1/li.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(a),m=Math.sin(a);if(e.order==="XYZ"){const u=r*h,g=r*m,_=o*h,S=o*m;t[0]=c*h,t[4]=-c*m,t[8]=l,t[1]=g+_*l,t[5]=u-S*l,t[9]=-o*c,t[2]=S-u*l,t[6]=_+g*l,t[10]=r*c}else if(e.order==="YXZ"){const u=c*h,g=c*m,_=l*h,S=l*m;t[0]=u+S*o,t[4]=_*o-g,t[8]=r*l,t[1]=r*m,t[5]=r*h,t[9]=-o,t[2]=g*o-_,t[6]=S+u*o,t[10]=r*c}else if(e.order==="ZXY"){const u=c*h,g=c*m,_=l*h,S=l*m;t[0]=u-S*o,t[4]=-r*m,t[8]=_+g*o,t[1]=g+_*o,t[5]=r*h,t[9]=S-u*o,t[2]=-r*l,t[6]=o,t[10]=r*c}else if(e.order==="ZYX"){const u=r*h,g=r*m,_=o*h,S=o*m;t[0]=c*h,t[4]=_*l-g,t[8]=u*l+S,t[1]=c*m,t[5]=S*l+u,t[9]=g*l-_,t[2]=-l,t[6]=o*c,t[10]=r*c}else if(e.order==="YZX"){const u=r*c,g=r*l,_=o*c,S=o*l;t[0]=c*h,t[4]=S-u*m,t[8]=_*m+g,t[1]=m,t[5]=r*h,t[9]=-o*h,t[2]=-l*h,t[6]=g*m+_,t[10]=u-S*m}else if(e.order==="XZY"){const u=r*c,g=r*l,_=o*c,S=o*l;t[0]=c*h,t[4]=-m,t[8]=l*h,t[1]=u*m+S,t[5]=r*h,t[9]=g*m-_,t[2]=_*m-g,t[6]=o*h,t[10]=S*m+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ph,e,mh)}lookAt(e,t,i){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Pn.crossVectors(i,Ot),Pn.lengthSq()===0&&(Math.abs(i.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Pn.crossVectors(i,Ot)),Pn.normalize(),os.crossVectors(Ot,Pn),s[0]=Pn.x,s[4]=os.x,s[8]=Ot.x,s[1]=Pn.y,s[5]=os.y,s[9]=Ot.y,s[2]=Pn.z,s[6]=os.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[4],c=i[8],l=i[12],h=i[1],m=i[5],u=i[9],g=i[13],_=i[2],S=i[6],p=i[10],d=i[14],b=i[3],A=i[7],v=i[11],R=i[15],T=s[0],C=s[4],x=s[8],y=s[12],L=s[1],D=s[5],N=s[9],k=s[13],V=s[2],F=s[6],q=s[10],X=s[14],Q=s[3],ne=s[7],fe=s[11],le=s[15];return a[0]=r*T+o*L+c*V+l*Q,a[4]=r*C+o*D+c*F+l*ne,a[8]=r*x+o*N+c*q+l*fe,a[12]=r*y+o*k+c*X+l*le,a[1]=h*T+m*L+u*V+g*Q,a[5]=h*C+m*D+u*F+g*ne,a[9]=h*x+m*N+u*q+g*fe,a[13]=h*y+m*k+u*X+g*le,a[2]=_*T+S*L+p*V+d*Q,a[6]=_*C+S*D+p*F+d*ne,a[10]=_*x+S*N+p*q+d*fe,a[14]=_*y+S*k+p*X+d*le,a[3]=b*T+A*L+v*V+R*Q,a[7]=b*C+A*D+v*F+R*ne,a[11]=b*x+A*N+v*q+R*fe,a[15]=b*y+A*k+v*X+R*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],r=e[1],o=e[5],c=e[9],l=e[13],h=e[2],m=e[6],u=e[10],g=e[14],_=e[3],S=e[7],p=e[11],d=e[15],b=c*g-l*u,A=o*g-l*m,v=o*u-c*m,R=r*g-l*h,T=r*u-c*h,C=r*m-o*h;return t*(S*b-p*A+d*v)-i*(_*b-p*R+d*T)+s*(_*A-S*R+d*C)-a*(_*v-S*T+p*C)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[1],r=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(r*h-o*l)-i*(a*h-o*c)+s*(a*l-r*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],c=e[6],l=e[7],h=e[8],m=e[9],u=e[10],g=e[11],_=e[12],S=e[13],p=e[14],d=e[15],b=t*o-i*r,A=t*c-s*r,v=t*l-a*r,R=i*c-s*o,T=i*l-a*o,C=s*l-a*c,x=h*S-m*_,y=h*p-u*_,L=h*d-g*_,D=m*p-u*S,N=m*d-g*S,k=u*d-g*p,V=b*k-A*N+v*D+R*L-T*y+C*x;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/V;return e[0]=(o*k-c*N+l*D)*F,e[1]=(s*N-i*k-a*D)*F,e[2]=(S*C-p*T+d*R)*F,e[3]=(u*T-m*C-g*R)*F,e[4]=(c*L-r*k-l*y)*F,e[5]=(t*k-s*L+a*y)*F,e[6]=(p*v-_*C-d*A)*F,e[7]=(h*C-u*v+g*A)*F,e[8]=(r*N-o*L+l*x)*F,e[9]=(i*L-t*N-a*x)*F,e[10]=(_*T-S*v+d*b)*F,e[11]=(m*v-h*T-g*b)*F,e[12]=(o*y-r*D-c*x)*F,e[13]=(t*D-i*y+s*x)*F,e[14]=(S*A-_*R-p*b)*F,e[15]=(h*R-m*A+u*b)*F,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,r=e.x,o=e.y,c=e.z,l=a*r,h=a*o;return this.set(l*r+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*r,0,l*c-s*o,h*c+s*r,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,r){return this.set(1,i,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,r=t._y,o=t._z,c=t._w,l=a+a,h=r+r,m=o+o,u=a*l,g=a*h,_=a*m,S=r*h,p=r*m,d=o*m,b=c*l,A=c*h,v=c*m,R=i.x,T=i.y,C=i.z;return s[0]=(1-(S+d))*R,s[1]=(g+v)*R,s[2]=(_-A)*R,s[3]=0,s[4]=(g-v)*T,s[5]=(1-(u+d))*T,s[6]=(p+b)*T,s[7]=0,s[8]=(_+A)*C,s[9]=(p-b)*C,s[10]=(1-(u+S))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let r=li.set(s[0],s[1],s[2]).length();const o=li.set(s[4],s[5],s[6]).length(),c=li.set(s[8],s[9],s[10]).length();a<0&&(r=-r),jt.copy(this);const l=1/r,h=1/o,m=1/c;return jt.elements[0]*=l,jt.elements[1]*=l,jt.elements[2]*=l,jt.elements[4]*=h,jt.elements[5]*=h,jt.elements[6]*=h,jt.elements[8]*=m,jt.elements[9]*=m,jt.elements[10]*=m,t.setFromRotationMatrix(jt),i.x=r,i.y=o,i.z=c,this}makePerspective(e,t,i,s,a,r,o=rn,c=!1){const l=this.elements,h=2*a/(t-e),m=2*a/(i-s),u=(t+e)/(t-e),g=(i+s)/(i-s);let _,S;if(c)_=a/(r-a),S=r*a/(r-a);else if(o===rn)_=-(r+a)/(r-a),S=-2*r*a/(r-a);else if(o===ks)_=-r/(r-a),S=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=m,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,a,r,o=rn,c=!1){const l=this.elements,h=2/(t-e),m=2/(i-s),u=-(t+e)/(t-e),g=-(i+s)/(i-s);let _,S;if(c)_=1/(r-a),S=r/(r-a);else if(o===rn)_=-2/(r-a),S=-(r+a)/(r-a);else if(o===ks)_=-1/(r-a),S=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=m,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Hs.prototype.isMatrix4=!0;let gt=Hs;const li=new W,jt=new gt,ph=new W(0,0,0),mh=new W(1,1,1),Pn=new W,os=new W,Ot=new W,Io=new gt,Uo=new Vn;class ti{constructor(e=0,t=0,i=0,s=ti.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],c=s[1],l=s[5],h=s[9],m=s[2],u=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-m,a),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-m,g),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Xe(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(u,g),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-m,a)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-Xe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,g),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Io.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Io,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Uo.setFromEuler(this),this.setFromQuaternion(Uo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ti.DEFAULT_ORDER="XYZ";class $r{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let gh=0;const Fo=new W,ci=new Vn,mn=new gt,ls=new W,Oi=new W,_h=new W,xh=new Vn,Oo=new W(1,0,0),Bo=new W(0,1,0),zo=new W(0,0,1),Go={type:"added"},vh={type:"removed"},ui={type:"childadded",child:null},fa={type:"childremoved",child:null};class Ut extends Hn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gh++}),this.uuid=Yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new W,t=new ti,i=new Vn,s=new W(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new gt},normalMatrix:{value:new Be}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $r,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.multiply(ci),this}rotateOnWorldAxis(e,t){return ci.setFromAxisAngle(e,t),this.quaternion.premultiply(ci),this}rotateX(e){return this.rotateOnAxis(Oo,e)}rotateY(e){return this.rotateOnAxis(Bo,e)}rotateZ(e){return this.rotateOnAxis(zo,e)}translateOnAxis(e,t){return Fo.copy(e).applyQuaternion(this.quaternion),this.position.add(Fo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Oo,e)}translateY(e){return this.translateOnAxis(Bo,e)}translateZ(e){return this.translateOnAxis(zo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ls.copy(e):ls.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Oi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(Oi,ls,this.up):mn.lookAt(ls,Oi,this.up),this.quaternion.setFromRotationMatrix(mn),s&&(mn.extractRotation(s.matrixWorld),ci.setFromRotationMatrix(mn),this.quaternion.premultiply(ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Go),ui.child=e,this.dispatchEvent(ui),ui.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vh),fa.child=e,this.dispatchEvent(fa),fa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Go),ui.child=e,this.dispatchEvent(ui),ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,e,_h),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Oi,xh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*s,a[13]+=i-a[1]*t-a[5]*i-a[9]*s,a[14]+=s-a[2]*t-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const m=c[l];a(e.shapes,m)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(a(e.animations,c))}}if(t){const o=r(e.geometries),c=r(e.materials),l=r(e.textures),h=r(e.images),m=r(e.shapes),u=r(e.skeletons),g=r(e.animations),_=r(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),m.length>0&&(i.shapes=m),u.length>0&&(i.skeletons=u),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function r(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Ut.DEFAULT_UP=new W(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class cs extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mh={type:"move"};class pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new cs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new cs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new cs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,r=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){r=!0;for(const S of e.hand.values()){const p=t.getJointPose(S,i),d=this._getHandJoint(l,S);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],m=l.joints["thumb-tip"],u=h.position.distanceTo(m.position),g=.02,_=.005;l.inputState.pinching&&u>g+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=g-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mh)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new cs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const hc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},us={h:0,s:0,l:0};function ma(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Je{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=je.workingColorSpace){if(e=rh(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=ma(r,a,e+1/3),this.g=ma(r,a,e),this.b=ma(r,a,e-1/3)}return je.colorSpaceToWorking(this,s),this}setStyle(e,t=Ht){function i(a){a!==void 0&&parseFloat(a)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){const i=hc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bn(e.r),this.g=bn(e.g),this.b=bn(e.b),this}copyLinearToSRGB(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return je.workingToColorSpace(At.copy(this),e),Math.round(Xe(At.r*255,0,255))*65536+Math.round(Xe(At.g*255,0,255))*256+Math.round(Xe(At.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.workingToColorSpace(At.copy(this),t);const i=At.r,s=At.g,a=At.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let c,l;const h=(o+r)/2;if(o===r)c=0,l=0;else{const m=r-o;switch(l=h<=.5?m/(r+o):m/(2-r-o),r){case i:c=(s-a)/m+(s<a?6:0);break;case s:c=(a-i)/m+2;break;case a:c=(i-s)/m+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.workingToColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=Ht){je.workingToColorSpace(At.copy(this),e);const t=At.r,i=At.g,s=At.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(us);const i=la(Dn.h,us.h,t),s=la(Dn.s,us.s,t),a=la(Dn.l,us.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Je;Je.NAMES=hc;class Sh extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Yt=new W,gn=new W,ga=new W,_n=new W,di=new W,hi=new W,ko=new W,_a=new W,xa=new W,va=new W,Ma=new ft,Sa=new ft,Ea=new ft;class Zt{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Yt.subVectors(e,t),s.cross(Yt);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){Yt.subVectors(s,t),gn.subVectors(i,t),ga.subVectors(e,t);const r=Yt.dot(Yt),o=Yt.dot(gn),c=Yt.dot(ga),l=gn.dot(gn),h=gn.dot(ga),m=r*l-o*o;if(m===0)return a.set(0,0,0),null;const u=1/m,g=(l*c-o*h)*u,_=(r*h-o*c)*u;return a.set(1-g-_,_,g)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,_n)===null?!1:_n.x>=0&&_n.y>=0&&_n.x+_n.y<=1}static getInterpolation(e,t,i,s,a,r,o,c){return this.getBarycoord(e,t,i,s,_n)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,_n.x),c.addScaledVector(r,_n.y),c.addScaledVector(o,_n.z),c)}static getInterpolatedAttribute(e,t,i,s,a,r){return Ma.setScalar(0),Sa.setScalar(0),Ea.setScalar(0),Ma.fromBufferAttribute(e,t),Sa.fromBufferAttribute(e,i),Ea.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(Ma,a.x),r.addScaledVector(Sa,a.y),r.addScaledVector(Ea,a.z),r}static isFrontFacing(e,t,i,s){return Yt.subVectors(i,t),gn.subVectors(e,t),Yt.cross(gn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),Yt.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return Zt.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return Zt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let r,o;di.subVectors(s,i),hi.subVectors(a,i),_a.subVectors(e,i);const c=di.dot(_a),l=hi.dot(_a);if(c<=0&&l<=0)return t.copy(i);xa.subVectors(e,s);const h=di.dot(xa),m=hi.dot(xa);if(h>=0&&m<=h)return t.copy(s);const u=c*m-h*l;if(u<=0&&c>=0&&h<=0)return r=c/(c-h),t.copy(i).addScaledVector(di,r);va.subVectors(e,a);const g=di.dot(va),_=hi.dot(va);if(_>=0&&g<=_)return t.copy(a);const S=g*l-c*_;if(S<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector(hi,o);const p=h*_-g*m;if(p<=0&&m-h>=0&&g-_>=0)return ko.subVectors(a,s),o=(m-h)/(m-h+(g-_)),t.copy(s).addScaledVector(ko,o);const d=1/(p+S+u);return r=S*d,o=u*d,t.copy(i).addScaledVector(di,r).addScaledVector(hi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ki{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Kt):Kt.fromBufferAttribute(a,r),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ds.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ds.copy(i.boundingBox)),ds.applyMatrix4(e.matrixWorld),this.union(ds)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Bi),hs.subVectors(this.max,Bi),fi.subVectors(e.a,Bi),pi.subVectors(e.b,Bi),mi.subVectors(e.c,Bi),Ln.subVectors(pi,fi),Nn.subVectors(mi,pi),Xn.subVectors(fi,mi);let t=[0,-Ln.z,Ln.y,0,-Nn.z,Nn.y,0,-Xn.z,Xn.y,Ln.z,0,-Ln.x,Nn.z,0,-Nn.x,Xn.z,0,-Xn.x,-Ln.y,Ln.x,0,-Nn.y,Nn.x,0,-Xn.y,Xn.x,0];return!ba(t,fi,pi,mi,hs)||(t=[1,0,0,0,1,0,0,0,1],!ba(t,fi,pi,mi,hs))?!1:(fs.crossVectors(Ln,Nn),t=[fs.x,fs.y,fs.z],ba(t,fi,pi,mi,hs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xn=[new W,new W,new W,new W,new W,new W,new W,new W],Kt=new W,ds=new Ki,fi=new W,pi=new W,mi=new W,Ln=new W,Nn=new W,Xn=new W,Bi=new W,hs=new W,fs=new W,qn=new W;function ba(n,e,t,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){qn.fromArray(n,a);const o=s.x*Math.abs(qn.x)+s.y*Math.abs(qn.y)+s.z*Math.abs(qn.z),c=e.dot(qn),l=t.dot(qn),h=i.dot(qn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const xt=new W,ps=new ze;let Eh=0;class cn extends Hn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Eh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ro,this.updateRanges=[],this.gpuType=an,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ps.fromBufferAttribute(this,t),ps.applyMatrix3(e),this.setXY(t,ps.x,ps.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Fi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Lt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),i=Lt(i,this.array),s=Lt(s,this.array),a=Lt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ro&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class fc extends cn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class pc extends cn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class qt extends cn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const bh=new Ki,zi=new W,ya=new W;class Jr{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):bh.setFromPoints(e).getCenter(i);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zi.subVectors(e,this.center);const t=zi.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(zi,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ya.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zi.copy(e.center).add(ya)),this.expandByPoint(zi.copy(e.center).sub(ya))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let yh=0;const Vt=new gt,Ta=new Ut,gi=new W,Bt=new Ki,Gi=new Ki,Et=new W;class fn extends Hn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yh++}),this.uuid=Yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nh(e)?pc:fc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Be().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,i){return Vt.makeTranslation(e,t,i),this.applyMatrix4(Vt),this}scale(e,t,i){return Vt.makeScale(e,t,i),this.applyMatrix4(Vt),this}lookAt(e){return Ta.lookAt(e),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gi).negate(),this.translate(gi.x,gi.y,gi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new qt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];Bt.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Gi.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(Bt.min,Gi.min),Bt.expandByPoint(Et),Et.addVectors(Bt.max,Gi.max),Bt.expandByPoint(Et)):(Bt.expandByPoint(Gi.min),Bt.expandByPoint(Gi.max))}Bt.getCenter(i);let s=0;for(let a=0,r=e.count;a<r;a++)Et.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Et));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Et.fromBufferAttribute(o,l),c&&(gi.fromBufferAttribute(e,l),Et.add(gi)),s=Math.max(s,i.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new cn(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new W,c[x]=new W;const l=new W,h=new W,m=new W,u=new ze,g=new ze,_=new ze,S=new W,p=new W;function d(x,y,L){l.fromBufferAttribute(i,x),h.fromBufferAttribute(i,y),m.fromBufferAttribute(i,L),u.fromBufferAttribute(a,x),g.fromBufferAttribute(a,y),_.fromBufferAttribute(a,L),h.sub(l),m.sub(l),g.sub(u),_.sub(u);const D=1/(g.x*_.y-_.x*g.y);isFinite(D)&&(S.copy(h).multiplyScalar(_.y).addScaledVector(m,-g.y).multiplyScalar(D),p.copy(m).multiplyScalar(g.x).addScaledVector(h,-_.x).multiplyScalar(D),o[x].add(S),o[y].add(S),o[L].add(S),c[x].add(p),c[y].add(p),c[L].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let x=0,y=b.length;x<y;++x){const L=b[x],D=L.start,N=L.count;for(let k=D,V=D+N;k<V;k+=3)d(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const A=new W,v=new W,R=new W,T=new W;function C(x){R.fromBufferAttribute(s,x),T.copy(R);const y=o[x];A.copy(y),A.sub(R.multiplyScalar(R.dot(y))).normalize(),v.crossVectors(T,y);const D=v.dot(c[x])<0?-1:1;r.setXYZW(x,A.x,A.y,A.z,D)}for(let x=0,y=b.length;x<y;++x){const L=b[x],D=L.start,N=L.count;for(let k=D,V=D+N;k<V;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new cn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,g=i.count;u<g;u++)i.setXYZ(u,0,0,0);const s=new W,a=new W,r=new W,o=new W,c=new W,l=new W,h=new W,m=new W;if(e)for(let u=0,g=e.count;u<g;u+=3){const _=e.getX(u+0),S=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,S),r.fromBufferAttribute(t,p),h.subVectors(r,a),m.subVectors(s,a),h.cross(m),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,g=t.count;u<g;u+=3)s.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),h.subVectors(r,a),m.subVectors(s,a),h.cross(m),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,m=o.normalized,u=new l.constructor(c.length*h);let g=0,_=0;for(let S=0,p=c.length;S<p;S++){o.isInterleavedBufferAttribute?g=c[S]*o.data.stride+o.offset:g=c[S]*h;for(let d=0;d<h;d++)u[_++]=l[g++]}return new cn(u,h,m)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new fn,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let h=0,m=l.length;h<m;h++){const u=l[h],g=e(u,i);c.push(g)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,c=r.length;o<c;o++){const l=r[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let m=0,u=l.length;m<u;m++){const g=l[m];h.push(g.toJSON(e.data))}h.length>0&&(s[c]=h,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const a=e.morphAttributes;for(const l in a){const h=[],m=a[l];for(let u=0,g=m.length;u<g;u++)h.push(m[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let l=0,h=r.length;l<h;l++){const m=r[l];this.addGroup(m.start,m.count,m.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Th=0;class Xs extends Hn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=Yi(),this.name="",this.type="Material",this.blending=yi,this.side=kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ja,this.blendDst=Ya,this.blendEquation=Kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ao,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ri,this.stencilZFail=ri,this.stencilZPass=ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==yi&&(i.blending=this.blending),this.side!==kn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ja&&(i.blendSrc=this.blendSrc),this.blendDst!==Ya&&(i.blendDst=this.blendDst),this.blendEquation!==Kn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ri&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ao&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ri&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ri&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ri&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const c=a[o];delete c.metadata,r.push(c)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Je().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const vn=new W,Aa=new W,ms=new W,In=new W,Ra=new W,gs=new W,wa=new W;class Qr{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Aa.copy(e).add(t).multiplyScalar(.5),ms.copy(t).sub(e).normalize(),In.copy(this.origin).sub(Aa);const a=e.distanceTo(t)*.5,r=-this.direction.dot(ms),o=In.dot(this.direction),c=-In.dot(ms),l=In.lengthSq(),h=Math.abs(1-r*r);let m,u,g,_;if(h>0)if(m=r*c-o,u=r*o-c,_=a*h,m>=0)if(u>=-_)if(u<=_){const S=1/h;m*=S,u*=S,g=m*(m+r*u+2*o)+u*(r*m+u+2*c)+l}else u=a,m=Math.max(0,-(r*u+o)),g=-m*m+u*(u+2*c)+l;else u=-a,m=Math.max(0,-(r*u+o)),g=-m*m+u*(u+2*c)+l;else u<=-_?(m=Math.max(0,-(-r*a+o)),u=m>0?-a:Math.min(Math.max(-a,-c),a),g=-m*m+u*(u+2*c)+l):u<=_?(m=0,u=Math.min(Math.max(-a,-c),a),g=u*(u+2*c)+l):(m=Math.max(0,-(r*a+o)),u=m>0?a:Math.min(Math.max(-a,-c),a),g=-m*m+u*(u+2*c)+l);else u=r>0?-a:a,m=Math.max(0,-(r*u+o)),g=-m*m+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(Aa).addScaledVector(ms,u),g}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const i=vn.dot(this.direction),s=vn.dot(vn)-i*i,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,c=i+r;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,r,o,c;const l=1/this.direction.x,h=1/this.direction.y,m=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(a=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(a=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),m>=0?(o=(e.min.z-u.z)*m,c=(e.max.z-u.z)*m):(o=(e.max.z-u.z)*m,c=(e.min.z-u.z)*m),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,i,s,a){Ra.subVectors(t,e),gs.subVectors(i,e),wa.crossVectors(Ra,gs);let r=this.direction.dot(wa),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;In.subVectors(this.origin,e);const c=o*this.direction.dot(gs.crossVectors(In,gs));if(c<0)return null;const l=o*this.direction.dot(Ra.cross(In));if(l<0||c+l>r)return null;const h=-o*In.dot(wa);return h<0?null:this.at(h/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class eo extends Xs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=Yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vo=new gt,jn=new Qr,_s=new Jr,Ho=new W,xs=new W,vs=new W,Ms=new W,Ca=new W,Ss=new W,Wo=new W,Es=new W;class dn extends Ut{constructor(e=new fn,t=new eo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){Ss.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const h=o[c],m=a[c];h!==0&&(Ca.fromBufferAttribute(m,e),r?Ss.addScaledVector(Ca,h):Ss.addScaledVector(Ca.sub(t),h))}t.add(Ss)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_s.copy(i.boundingSphere),_s.applyMatrix4(a),jn.copy(e.ray).recast(e.near),!(_s.containsPoint(jn.origin)===!1&&(jn.intersectSphere(_s,Ho)===null||jn.origin.distanceToSquared(Ho)>(e.far-e.near)**2))&&(Vo.copy(a).invert(),jn.copy(e.ray).applyMatrix4(Vo),!(i.boundingBox!==null&&jn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,jn)))}_computeIntersections(e,t,i){let s;const a=this.geometry,r=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,m=a.attributes.normal,u=a.groups,g=a.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,S=u.length;_<S;_++){const p=u[_],d=r[p.materialIndex],b=Math.max(p.start,g.start),A=Math.min(o.count,Math.min(p.start+p.count,g.start+g.count));for(let v=b,R=A;v<R;v+=3){const T=o.getX(v),C=o.getX(v+1),x=o.getX(v+2);s=bs(this,d,e,i,l,h,m,T,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),S=Math.min(o.count,g.start+g.count);for(let p=_,d=S;p<d;p+=3){const b=o.getX(p),A=o.getX(p+1),v=o.getX(p+2);s=bs(this,r,e,i,l,h,m,b,A,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(r))for(let _=0,S=u.length;_<S;_++){const p=u[_],d=r[p.materialIndex],b=Math.max(p.start,g.start),A=Math.min(c.count,Math.min(p.start+p.count,g.start+g.count));for(let v=b,R=A;v<R;v+=3){const T=v,C=v+1,x=v+2;s=bs(this,d,e,i,l,h,m,T,C,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),S=Math.min(c.count,g.start+g.count);for(let p=_,d=S;p<d;p+=3){const b=p,A=p+1,v=p+2;s=bs(this,r,e,i,l,h,m,b,A,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function Ah(n,e,t,i,s,a,r,o){let c;if(e.side===It?c=i.intersectTriangle(r,a,s,!0,o):c=i.intersectTriangle(s,a,r,e.side===kn,o),c===null)return null;Es.copy(o),Es.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Es);return l<t.near||l>t.far?null:{distance:l,point:Es.clone(),object:n}}function bs(n,e,t,i,s,a,r,o,c,l){n.getVertexPosition(o,xs),n.getVertexPosition(c,vs),n.getVertexPosition(l,Ms);const h=Ah(n,e,t,i,xs,vs,Ms,Wo);if(h){const m=new W;Zt.getBarycoord(Wo,xs,vs,Ms,m),s&&(h.uv=Zt.getInterpolatedAttribute(s,o,c,l,m,new ze)),a&&(h.uv1=Zt.getInterpolatedAttribute(a,o,c,l,m,new ze)),r&&(h.normal=Zt.getInterpolatedAttribute(r,o,c,l,m,new W),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new W,materialIndex:0};Zt.getNormal(xs,vs,Ms,u.normal),h.face=u,h.barycoord=m}return h}class Rh extends Pt{constructor(e=null,t=1,i=1,s,a,r,o,c,l=bt,h=bt,m,u){super(null,r,o,c,l,h,s,a,m,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Pa=new W,wh=new W,Ch=new Be;class On{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Pa.subVectors(i,t).cross(wh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Pa),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(s,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ch.getNormalMatrix(e),s=this.coplanarPoint(Pa).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yn=new Jr,Ph=new ze(.5,.5),ys=new W;class mc{constructor(e=new On,t=new On,i=new On,s=new On,a=new On,r=new On){this.planes=[e,t,i,s,a,r]}set(e,t,i,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=rn,i=!1){const s=this.planes,a=e.elements,r=a[0],o=a[1],c=a[2],l=a[3],h=a[4],m=a[5],u=a[6],g=a[7],_=a[8],S=a[9],p=a[10],d=a[11],b=a[12],A=a[13],v=a[14],R=a[15];if(s[0].setComponents(l-r,g-h,d-_,R-b).normalize(),s[1].setComponents(l+r,g+h,d+_,R+b).normalize(),s[2].setComponents(l+o,g+m,d+S,R+A).normalize(),s[3].setComponents(l-o,g-m,d-S,R-A).normalize(),i)s[4].setComponents(c,u,p,v).normalize(),s[5].setComponents(l-c,g-u,d-p,R-v).normalize();else if(s[4].setComponents(l-c,g-u,d-p,R-v).normalize(),t===rn)s[5].setComponents(l+c,g+u,d+p,R+v).normalize();else if(t===ks)s[5].setComponents(c,u,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){Yn.center.set(0,0,0);const t=Ph.distanceTo(e.center);return Yn.radius=.7071067811865476+t,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ys.x=s.normal.x>0?e.max.x:e.min.x,ys.y=s.normal.y>0?e.max.y:e.min.y,ys.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ys)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gc extends Pt{constructor(e=[],t=Qn,i,s,a,r,o,c,l,h){super(e,t,i,s,a,r,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ci extends Pt{constructor(e,t,i=un,s,a,r,o=bt,c=bt,l,h=Tn,m=1){if(h!==Tn&&h!==Jn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:m};super(u,s,a,r,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Dh extends Ci{constructor(e,t=un,i=Qn,s,a,r=bt,o=bt,c,l=Tn){const h={width:e,height:e,depth:1},m=[h,h,h,h,h,h];super(e,e,t,i,s,a,r,o,c,l),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class _c extends Pt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Zi extends fn{constructor(e=1,t=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const c=[],l=[],h=[],m=[];let u=0,g=0;_("z","y","x",-1,-1,i,t,e,r,a,0),_("z","y","x",1,-1,i,t,-e,r,a,1),_("x","z","y",1,1,e,i,t,s,r,2),_("x","z","y",1,-1,e,i,-t,s,r,3),_("x","y","z",1,-1,e,t,i,s,a,4),_("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(c),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(m,2));function _(S,p,d,b,A,v,R,T,C,x,y){const L=v/C,D=R/x,N=v/2,k=R/2,V=T/2,F=C+1,q=x+1;let X=0,Q=0;const ne=new W;for(let fe=0;fe<q;fe++){const le=fe*D-k;for(let xe=0;xe<F;xe++){const Pe=xe*L-N;ne[S]=Pe*b,ne[p]=le*A,ne[d]=V,l.push(ne.x,ne.y,ne.z),ne[S]=0,ne[p]=0,ne[d]=T>0?1:-1,h.push(ne.x,ne.y,ne.z),m.push(xe/C),m.push(1-fe/x),X+=1}}for(let fe=0;fe<x;fe++)for(let le=0;le<C;le++){const xe=u+le+F*fe,Pe=u+le+F*(fe+1),Ge=u+(le+1)+F*(fe+1),Ne=u+(le+1)+F*fe;c.push(xe,Pe,Ne),c.push(Pe,Ge,Ne),Q+=6}o.addGroup(g,Q,y),g+=Q,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class qs extends fn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,m=e/o,u=t/c,g=[],_=[],S=[],p=[];for(let d=0;d<h;d++){const b=d*u-r;for(let A=0;A<l;A++){const v=A*m-a;_.push(v,-b,0),S.push(0,0,1),p.push(A/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<o;b++){const A=b+l*d,v=b+l*(d+1),R=b+1+l*(d+1),T=b+1+l*d;g.push(A,v,T),g.push(v,R,T)}this.setIndex(g),this.setAttribute("position",new qt(_,3)),this.setAttribute("normal",new qt(S,3)),this.setAttribute("uv",new qt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qs(e.width,e.height,e.widthSegments,e.heightSegments)}}class to extends fn{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(r+o,Math.PI);let l=0;const h=[],m=new W,u=new W,g=[],_=[],S=[],p=[];for(let d=0;d<=i;d++){const b=[],A=d/i,v=r+A*o,R=e*Math.cos(v),T=Math.sqrt(e*e-R*R);let C=0;d===0&&r===0?C=.5/t:d===i&&c===Math.PI&&(C=-.5/t);for(let x=0;x<=t;x++){const y=x/t,L=s+y*a;m.x=-T*Math.cos(L),m.y=R,m.z=T*Math.sin(L),_.push(m.x,m.y,m.z),u.copy(m).normalize(),S.push(u.x,u.y,u.z),p.push(y+C,1-A),b.push(l++)}h.push(b)}for(let d=0;d<i;d++)for(let b=0;b<t;b++){const A=h[d][b+1],v=h[d][b],R=h[d+1][b],T=h[d+1][b+1];(d!==0||r>0)&&g.push(A,v,T),(d!==i-1||c<Math.PI)&&g.push(v,R,T)}this.setIndex(g),this.setAttribute("position",new qt(_,3)),this.setAttribute("normal",new qt(S,3)),this.setAttribute("uv",new qt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new to(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Pi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(Xo(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Xo(s[0])){const a=[];for(let r=0,o=s.length;r<o;r++)a[r]=s[r].clone();e[t][i]=a}else e[t][i]=s.slice();else e[t][i]=s}}return e}function wt(n){const e={};for(let t=0;t<n.length;t++){const i=Pi(n[t]);for(const s in i)e[s]=i[s]}return e}function Xo(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Lh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function xc(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const Nh={clone:Pi,merge:wt};var Ih=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Uh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hn extends Xs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ih,this.fragmentShader=Uh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Pi(e.uniforms),this.uniformsGroups=Lh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Je().setHex(s.value);break;case"v2":this.uniforms[i].value=new ze().fromArray(s.value);break;case"v3":this.uniforms[i].value=new W().fromArray(s.value);break;case"v4":this.uniforms[i].value=new ft().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Be().fromArray(s.value);break;case"m4":this.uniforms[i].value=new gt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Fh extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Oh extends Xs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Bh extends Xs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class zh extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Ts=new W,As=new Vn,Qt=new W;class vc extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=rn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ts,As,Qt),Qt.x===1&&Qt.y===1&&Qt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ts,As,Qt.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ts,As,Qt),Qt.x===1&&Qt.y===1&&Qt.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ts,As,Qt.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Un=new W,qo=new ze,jo=new ze;class Wt extends vc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ir*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Us*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ir*2*Math.atan(Math.tan(Us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Un.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Un.x,Un.y).multiplyScalar(-e/Un.z),Un.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Un.x,Un.y).multiplyScalar(-e/Un.z)}getViewSize(e,t){return this.getViewBounds(e,qo,jo),t.subVectors(jo,qo)}setViewOffset(e,t,i,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Us*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;a+=r.offsetX*s/c,t-=r.offsetY*i/l,s*=r.width/c,i*=r.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Mc extends vc{constructor(e=-1,t=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,r=a+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Gh extends zh{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const _i=-90,xi=1;class kh extends Ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(_i,xi,e,t);s.layers=this.layers,this.add(s);const a=new Wt(_i,xi,e,t);a.layers=this.layers,this.add(a);const r=new Wt(_i,xi,e,t);r.layers=this.layers,this.add(r);const o=new Wt(_i,xi,e,t);o.layers=this.layers,this.add(o);const c=new Wt(_i,xi,e,t);c.layers=this.layers,this.add(c);const l=new Wt(_i,xi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,r,o,c]=t;for(const l of t)this.remove(l);if(e===rn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ks)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,c,l,h]=this.children,m=e.getRenderTarget(),u=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(m,u,g),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Vh extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Yo=new gt;class Hh{constructor(e,t,i=0,s=1/0){this.ray=new Qr(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new $r,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yo),this}intersectObject(e,t=!0,i=[]){return Ur(e,this,i,t),i.sort(Ko),i}intersectObjects(e,t=!0,i=[]){for(let s=0,a=e.length;s<a;s++)Ur(e[s],this,i,t);return i.sort(Ko),i}}function Ko(n,e){return n.distance-e.distance}function Ur(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const a=n.children;for(let r=0,o=a.length;r<o;r++)Ur(a[r],e,t,!0)}}class Zo{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const oo=class oo{constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=s,this}};oo.prototype.isMatrix2=!0;let $o=oo;class Wh extends Hn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Oe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Jo(n,e,t,i){const s=Xh(i);switch(t){case oc:return n*e;case cc:return n*e/s.components*s.byteLength;case Xr:return n*e/s.components*s.byteLength;case ei:return n*e*2/s.components*s.byteLength;case qr:return n*e*2/s.components*s.byteLength;case lc:return n*e*3/s.components*s.byteLength;case $t:return n*e*4/s.components*s.byteLength;case jr:return n*e*4/s.components*s.byteLength;case Ds:case Ls:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ns:case Is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ar:case or:return Math.max(n,16)*Math.max(e,8)/4;case sr:case rr:return Math.max(n,8)*Math.max(e,8)/2;case lr:case cr:case dr:case hr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ur:case Os:case fr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case mr:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case gr:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case _r:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case xr:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case vr:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Mr:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Sr:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Er:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case br:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case yr:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Tr:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ar:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Rr:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case wr:case Cr:case Pr:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Dr:case Lr:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Bs:case Nr:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xh(n){switch(n){case Xt:case ic:return{byteLength:1,components:1};case qi:case sc:case yn:return{byteLength:2,components:1};case Hr:case Wr:return{byteLength:2,components:4};case un:case Vr:case an:return{byteLength:4,components:1};case ac:case rc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:kr}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=kr);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Sc(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function qh(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,m=l.byteLength,u=n.createBuffer();n.bindBuffer(c,u),n.bufferData(c,l,h),o.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:m}}function i(o,c,l){const h=c.array,m=c.updateRanges;if(n.bindBuffer(l,o),m.length===0)n.bufferSubData(l,0,h);else{m.sort((g,_)=>g.start-_.start);let u=0;for(let g=1;g<m.length;g++){const _=m[u],S=m[g];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++u,m[u]=S)}m.length=u+1;for(let g=0,_=m.length;g<_;g++){const S=m[g];n.bufferSubData(l,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function r(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:a,update:r}}var jh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$h=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,nf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,af=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,of=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,gf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,_f=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,vf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Mf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ef=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,If=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ff=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Of=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Gf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,kf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Kf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,$f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ep=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ip=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ap=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,op=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,up=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,_p=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Mp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ep=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,yp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ap=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Np=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Up=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Op=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$p=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,em=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,im=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,om=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_m=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Em=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ym=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Am=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:jh,alphahash_pars_fragment:Yh,alphamap_fragment:Kh,alphamap_pars_fragment:Zh,alphatest_fragment:$h,alphatest_pars_fragment:Jh,aomap_fragment:Qh,aomap_pars_fragment:ef,batching_pars_vertex:tf,batching_vertex:nf,begin_vertex:sf,beginnormal_vertex:af,bsdfs:rf,iridescence_fragment:of,bumpmap_pars_fragment:lf,clipping_planes_fragment:cf,clipping_planes_pars_fragment:uf,clipping_planes_pars_vertex:df,clipping_planes_vertex:hf,color_fragment:ff,color_pars_fragment:pf,color_pars_vertex:mf,color_vertex:gf,common:_f,cube_uv_reflection_fragment:xf,defaultnormal_vertex:vf,displacementmap_pars_vertex:Mf,displacementmap_vertex:Sf,emissivemap_fragment:Ef,emissivemap_pars_fragment:bf,colorspace_fragment:yf,colorspace_pars_fragment:Tf,envmap_fragment:Af,envmap_common_pars_fragment:Rf,envmap_pars_fragment:wf,envmap_pars_vertex:Cf,envmap_physical_pars_fragment:Gf,envmap_vertex:Pf,fog_vertex:Df,fog_pars_vertex:Lf,fog_fragment:Nf,fog_pars_fragment:If,gradientmap_pars_fragment:Uf,lightmap_pars_fragment:Ff,lights_lambert_fragment:Of,lights_lambert_pars_fragment:Bf,lights_pars_begin:zf,lights_toon_fragment:kf,lights_toon_pars_fragment:Vf,lights_phong_fragment:Hf,lights_phong_pars_fragment:Wf,lights_physical_fragment:Xf,lights_physical_pars_fragment:qf,lights_fragment_begin:jf,lights_fragment_maps:Yf,lights_fragment_end:Kf,lightprobes_pars_fragment:Zf,logdepthbuf_fragment:$f,logdepthbuf_pars_fragment:Jf,logdepthbuf_pars_vertex:Qf,logdepthbuf_vertex:ep,map_fragment:tp,map_pars_fragment:np,map_particle_fragment:ip,map_particle_pars_fragment:sp,metalnessmap_fragment:ap,metalnessmap_pars_fragment:rp,morphinstance_vertex:op,morphcolor_vertex:lp,morphnormal_vertex:cp,morphtarget_pars_vertex:up,morphtarget_vertex:dp,normal_fragment_begin:hp,normal_fragment_maps:fp,normal_pars_fragment:pp,normal_pars_vertex:mp,normal_vertex:gp,normalmap_pars_fragment:_p,clearcoat_normal_fragment_begin:xp,clearcoat_normal_fragment_maps:vp,clearcoat_pars_fragment:Mp,iridescence_pars_fragment:Sp,opaque_fragment:Ep,packing:bp,premultiplied_alpha_fragment:yp,project_vertex:Tp,dithering_fragment:Ap,dithering_pars_fragment:Rp,roughnessmap_fragment:wp,roughnessmap_pars_fragment:Cp,shadowmap_pars_fragment:Pp,shadowmap_pars_vertex:Dp,shadowmap_vertex:Lp,shadowmask_pars_fragment:Np,skinbase_vertex:Ip,skinning_pars_vertex:Up,skinning_vertex:Fp,skinnormal_vertex:Op,specularmap_fragment:Bp,specularmap_pars_fragment:zp,tonemapping_fragment:Gp,tonemapping_pars_fragment:kp,transmission_fragment:Vp,transmission_pars_fragment:Hp,uv_pars_fragment:Wp,uv_pars_vertex:Xp,uv_vertex:qp,worldpos_vertex:jp,background_vert:Yp,background_frag:Kp,backgroundCube_vert:Zp,backgroundCube_frag:$p,cube_vert:Jp,cube_frag:Qp,depth_vert:em,depth_frag:tm,distance_vert:nm,distance_frag:im,equirect_vert:sm,equirect_frag:am,linedashed_vert:rm,linedashed_frag:om,meshbasic_vert:lm,meshbasic_frag:cm,meshlambert_vert:um,meshlambert_frag:dm,meshmatcap_vert:hm,meshmatcap_frag:fm,meshnormal_vert:pm,meshnormal_frag:mm,meshphong_vert:gm,meshphong_frag:_m,meshphysical_vert:xm,meshphysical_frag:vm,meshtoon_vert:Mm,meshtoon_frag:Sm,points_vert:Em,points_frag:bm,shadow_vert:ym,shadow_frag:Tm,sprite_vert:Am,sprite_frag:Rm},Se={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},tn={basic:{uniforms:wt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:wt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:wt([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:wt([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:wt([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:wt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:wt([Se.points,Se.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:wt([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:wt([Se.common,Se.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:wt([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:wt([Se.sprite,Se.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:wt([Se.common,Se.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:wt([Se.lights,Se.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};tn.physical={uniforms:wt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Rs={r:0,b:0,g:0},wm=new gt,Ec=new Be;Ec.set(-1,0,0,0,1,0,0,0,1);function Cm(n,e,t,i,s,a){const r=new Je(0);let o=s===!0?0:1,c,l,h=null,m=0,u=null;function g(b){let A=b.isScene===!0?b.background:null;if(A&&A.isTexture){const v=b.backgroundBlurriness>0;A=e.get(A,v)}return A}function _(b){let A=!1;const v=g(b);v===null?p(r,o):v&&v.isColor&&(p(v,1),A=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(b,A){const v=g(A);v&&(v.isCubeTexture||v.mapping===Ws)?(l===void 0&&(l=new dn(new Zi(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:Pi(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(wm.makeRotationFromEuler(A.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Ec),l.material.toneMapped=je.getTransfer(v.colorSpace)!==et,(h!==v||m!==v.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=v,m=v.version,u=n.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new dn(new qs(2,2),new hn({name:"BackgroundMaterial",uniforms:Pi(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=je.getTransfer(v.colorSpace)!==et,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||m!==v.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=v,m=v.version,u=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,A){b.getRGB(Rs,xc(n)),t.buffers.color.setClear(Rs.r,Rs.g,Rs.b,A,a)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return r},setClearColor:function(b,A=1){r.set(b),o=A,p(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,p(r,o)},render:_,addToRenderList:S,dispose:d}}function Pm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let a=s,r=!1;function o(D,N,k,V,F){let q=!1;const X=m(D,V,k,N);a!==X&&(a=X,l(a.object)),q=g(D,V,k,F),q&&_(D,V,k,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(q||r)&&(r=!1,v(D,N,k,V),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return n.createVertexArray()}function l(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function m(D,N,k,V){const F=V.wireframe===!0;let q=i[N.id];q===void 0&&(q={},i[N.id]=q);const X=D.isInstancedMesh===!0?D.id:0;let Q=q[X];Q===void 0&&(Q={},q[X]=Q);let ne=Q[k.id];ne===void 0&&(ne={},Q[k.id]=ne);let fe=ne[F];return fe===void 0&&(fe=u(c()),ne[F]=fe),fe}function u(D){const N=[],k=[],V=[];for(let F=0;F<t;F++)N[F]=0,k[F]=0,V[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:k,attributeDivisors:V,object:D,attributes:{},index:null}}function g(D,N,k,V){const F=a.attributes,q=N.attributes;let X=0;const Q=k.getAttributes();for(const ne in Q)if(Q[ne].location>=0){const le=F[ne];let xe=q[ne];if(xe===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(xe=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(xe=D.instanceColor)),le===void 0||le.attribute!==xe||xe&&le.data!==xe.data)return!0;X++}return a.attributesNum!==X||a.index!==V}function _(D,N,k,V){const F={},q=N.attributes;let X=0;const Q=k.getAttributes();for(const ne in Q)if(Q[ne].location>=0){let le=q[ne];le===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(le=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(le=D.instanceColor));const xe={};xe.attribute=le,le&&le.data&&(xe.data=le.data),F[ne]=xe,X++}a.attributes=F,a.attributesNum=X,a.index=V}function S(){const D=a.newAttributes;for(let N=0,k=D.length;N<k;N++)D[N]=0}function p(D){d(D,0)}function d(D,N){const k=a.newAttributes,V=a.enabledAttributes,F=a.attributeDivisors;k[D]=1,V[D]===0&&(n.enableVertexAttribArray(D),V[D]=1),F[D]!==N&&(n.vertexAttribDivisor(D,N),F[D]=N)}function b(){const D=a.newAttributes,N=a.enabledAttributes;for(let k=0,V=N.length;k<V;k++)N[k]!==D[k]&&(n.disableVertexAttribArray(k),N[k]=0)}function A(D,N,k,V,F,q,X){X===!0?n.vertexAttribIPointer(D,N,k,F,q):n.vertexAttribPointer(D,N,k,V,F,q)}function v(D,N,k,V){S();const F=V.attributes,q=k.getAttributes(),X=N.defaultAttributeValues;for(const Q in q){const ne=q[Q];if(ne.location>=0){let fe=F[Q];if(fe===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(fe=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(fe=D.instanceColor)),fe!==void 0){const le=fe.normalized,xe=fe.itemSize,Pe=e.get(fe);if(Pe===void 0)continue;const Ge=Pe.buffer,Ne=Pe.type,$=Pe.bytesPerElement,ie=Ne===n.INT||Ne===n.UNSIGNED_INT||fe.gpuType===Vr;if(fe.isInterleavedBufferAttribute){const re=fe.data,Re=re.stride,Ue=fe.offset;if(re.isInstancedInterleavedBuffer){for(let we=0;we<ne.locationSize;we++)d(ne.location+we,re.meshPerAttribute);D.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let we=0;we<ne.locationSize;we++)p(ne.location+we);n.bindBuffer(n.ARRAY_BUFFER,Ge);for(let we=0;we<ne.locationSize;we++)A(ne.location+we,xe/ne.locationSize,Ne,le,Re*$,(Ue+xe/ne.locationSize*we)*$,ie)}else{if(fe.isInstancedBufferAttribute){for(let re=0;re<ne.locationSize;re++)d(ne.location+re,fe.meshPerAttribute);D.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let re=0;re<ne.locationSize;re++)p(ne.location+re);n.bindBuffer(n.ARRAY_BUFFER,Ge);for(let re=0;re<ne.locationSize;re++)A(ne.location+re,xe/ne.locationSize,Ne,le,xe*$,xe/ne.locationSize*re*$,ie)}}else if(X!==void 0){const le=X[Q];if(le!==void 0)switch(le.length){case 2:n.vertexAttrib2fv(ne.location,le);break;case 3:n.vertexAttrib3fv(ne.location,le);break;case 4:n.vertexAttrib4fv(ne.location,le);break;default:n.vertexAttrib1fv(ne.location,le)}}}}b()}function R(){y();for(const D in i){const N=i[D];for(const k in N){const V=N[k];for(const F in V){const q=V[F];for(const X in q)h(q[X].object),delete q[X];delete V[F]}}delete i[D]}}function T(D){if(i[D.id]===void 0)return;const N=i[D.id];for(const k in N){const V=N[k];for(const F in V){const q=V[F];for(const X in q)h(q[X].object),delete q[X];delete V[F]}}delete i[D.id]}function C(D){for(const N in i){const k=i[N];for(const V in k){const F=k[V];if(F[D.id]===void 0)continue;const q=F[D.id];for(const X in q)h(q[X].object),delete q[X];delete F[D.id]}}}function x(D){for(const N in i){const k=i[N],V=D.isInstancedMesh===!0?D.id:0,F=k[V];if(F!==void 0){for(const q in F){const X=F[q];for(const Q in X)h(X[Q].object),delete X[Q];delete F[q]}delete k[V],Object.keys(k).length===0&&delete i[N]}}}function y(){L(),r=!0,a!==s&&(a=s,l(a.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:y,resetDefaultState:L,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:C,initAttributes:S,enableAttribute:p,disableUnusedAttributes:b}}function Dm(n,e,t){let i;function s(c){i=c}function a(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function r(c,l,h){h!==0&&(n.drawArraysInstanced(i,c,l,h),t.update(l,i,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,h);let u=0;for(let g=0;g<h;g++)u+=l[g];t.update(u,i,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function Lm(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(C){return!(C!==$t&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const x=C===yn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Xt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==an&&!x)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Oe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const m=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),b=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:m,reversedDepthBuffer:u,maxTextures:g,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:v,maxSamples:R,samples:T}}function Nm(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new On,o=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(m,u){const g=m.length!==0||u||i!==0||s;return s=u,i=m.length,g},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(m,u){t=h(m,u,0)},this.setState=function(m,u,g){const _=m.clippingPlanes,S=m.clipIntersection,p=m.clipShadows,d=n.get(m);if(!s||_===null||_.length===0||a&&!p)a?h(null):l();else{const b=a?0:i,A=b*4;let v=d.clippingState||null;c.value=v,v=h(_,u,A,g);for(let R=0;R!==A;++R)v[R]=t[R];d.clippingState=v,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(m,u,g,_){const S=m!==null?m.length:0;let p=null;if(S!==0){if(p=c.value,_!==!0||p===null){const d=g+S*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<d)&&(p=new Float32Array(d));for(let A=0,v=g;A!==S;++A,v+=4)r.copy(m[A]).applyMatrix4(b,o),r.normal.toArray(p,v),p[v+3]=r.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}const zn=4,Qo=[.125,.215,.35,.446,.526,.582],Zn=20,Im=256,ki=new Mc,el=new Je;let Da=null,La=0,Na=0,Ia=!1;const Um=new W;class tl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,a={}){const{size:r=256,position:o=Um}=a;Da=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Da,La,Na),this._renderer.xr.enabled=Ia,e.scissorTest=!1,vi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qn||e.mapping===wi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Da=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Na=this._renderer.getActiveMipmapLevel(),Ia=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:yn,format:$t,colorSpace:zs,depthBuffer:!1},s=nl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nl(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Fm(a)),this._blurMaterial=Bm(a,e,t),this._ggxMaterial=Om(a,e,t)}return s}_compileMaterial(e){const t=new dn(new fn,e);this._renderer.compile(t,ki)}_sceneToCubeUV(e,t,i,s,a){const c=new Wt(90,1,t,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],m=this._renderer,u=m.autoClear,g=m.toneMapping;m.getClearColor(el),m.toneMapping=on,m.autoClear=!1,m.state.buffers.depth.getReversed()&&(m.setRenderTarget(s),m.clearDepth(),m.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new dn(new Zi,new eo({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,p=S.material;let d=!1;const b=e.background;b?b.isColor&&(p.color.copy(b),e.background=null,d=!0):(p.color.copy(el),d=!0);for(let A=0;A<6;A++){const v=A%3;v===0?(c.up.set(0,l[A],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+h[A],a.y,a.z)):v===1?(c.up.set(0,0,l[A]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+h[A],a.z)):(c.up.set(0,l[A],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+h[A]));const R=this._cubeSize;vi(s,v*R,A>2?R:0,R,R),m.setRenderTarget(s),d&&m.render(S,c),m.render(e,c)}m.toneMapping=g,m.autoClear=u,e.background=b}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Qn||e.mapping===wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=il());const a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;vi(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(r,ki)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const c=r.uniforms,l=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),m=Math.sqrt(l*l-h*h),u=0+l*1.25,g=m*u,{_lodMax:_}=this,S=this._sizeLods[i],p=3*S*(i>_-zn?i-_+zn:0),d=4*(this._cubeSize-S);c.envMap.value=e.texture,c.roughness.value=g,c.mipInt.value=_-t,vi(a,p,d,3*S,2*S),s.setRenderTarget(a),s.render(o,ki),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=_-i,vi(e,p,d,3*S,2*S),s.setRenderTarget(e),s.render(o,ki)}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Ke("blur direction must be either latitudinal or longitudinal!");const h=3,m=this._lodMeshes[s];m.material=l;const u=l.uniforms,g=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*g):2*Math.PI/(2*Zn-1),S=a/_,p=isFinite(a)?1+Math.floor(h*S):Zn;p>Zn&&Oe(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Zn}`);const d=[];let b=0;for(let C=0;C<Zn;++C){const x=C/S,y=Math.exp(-x*x/2);d.push(y),C===0?b+=y:C<p&&(b+=2*y)}for(let C=0;C<d.length;C++)d[C]=d[C]/b;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=d,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:A}=this;u.dTheta.value=_,u.mipInt.value=A-i;const v=this._sizeLods[s],R=3*v*(s>A-zn?s-A+zn:0),T=4*(this._cubeSize-v);vi(t,R,T,3*v,2*v),c.setRenderTarget(t),c.render(m,ki)}}function Fm(n){const e=[],t=[],i=[];let s=n;const a=n-zn+1+Qo.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);e.push(o);let c=1/o;r>n-zn?c=Qo[r-n+zn-1]:r===0&&(c=0),t.push(c);const l=1/(o-2),h=-l,m=1+l,u=[h,h,m,h,m,m,h,h,m,m,h,m],g=6,_=6,S=3,p=2,d=1,b=new Float32Array(S*_*g),A=new Float32Array(p*_*g),v=new Float32Array(d*_*g);for(let T=0;T<g;T++){const C=T%3*2/3-1,x=T>2?0:-1,y=[C,x,0,C+2/3,x,0,C+2/3,x+1,0,C,x,0,C+2/3,x+1,0,C,x+1,0];b.set(y,S*_*T),A.set(u,p*_*T);const L=[T,T,T,T,T,T];v.set(L,d*_*T)}const R=new fn;R.setAttribute("position",new cn(b,S)),R.setAttribute("uv",new cn(A,p)),R.setAttribute("faceIndex",new cn(v,d)),i.push(new dn(R,null)),s>zn&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function nl(n,e,t){const i=new ln(n,e,t);return i.texture.mapping=Ws,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function vi(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Om(n,e,t){return new hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Im,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function Bm(n,e,t){const i=new Float32Array(Zn),s=new W(0,1,0);return new hn({name:"SphericalGaussianBlur",defines:{n:Zn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function il(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function sl(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:En,depthTest:!1,depthWrite:!1})}function js(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class bc extends ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new gc(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Zi(5,5,5),a=new hn({name:"CubemapFromEquirect",uniforms:Pi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:It,blending:En});a.uniforms.tEquirect.value=t;const r=new dn(s,a),o=t.minFilter;return t.minFilter===$n&&(t.minFilter=Rt),new kh(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}function zm(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,g=!1){return u==null?null:g?r(u):a(u)}function a(u){if(u&&u.isTexture){const g=u.mapping;if(g===aa||g===ra)if(e.has(u)){const _=e.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const S=new bc(_.height);return S.fromEquirectangularTexture(n,u),e.set(u,S),u.addEventListener("dispose",l),o(S.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const g=u.mapping,_=g===aa||g===ra,S=g===Qn||g===wi;if(_||S){let p=t.get(u);const d=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new tl(n)),p=_?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const b=u.image;return _&&b&&b.height>0||S&&b&&c(b)?(i===null&&(i=new tl(n)),p=_?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,g){return g===aa?u.mapping=Qn:g===ra&&(u.mapping=wi),u}function c(u){let g=0;const _=6;for(let S=0;S<_;S++)u[S]!==void 0&&g++;return g===_}function l(u){const g=u.target;g.removeEventListener("dispose",l);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function h(u){const g=u.target;g.removeEventListener("dispose",h);const _=t.get(g);_!==void 0&&(t.delete(g),_.dispose())}function m(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:m}}function Gm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ti("WebGLRenderer: "+i+" extension not supported."),s}}}function km(n,e,t,i){const s={},a=new WeakMap;function r(m){const u=m.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",r),delete s[u.id];const g=a.get(u);g&&(e.remove(g),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(m,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,t.memory.geometries++),u}function c(m){const u=m.attributes;for(const g in u)e.update(u[g],n.ARRAY_BUFFER)}function l(m){const u=[],g=m.index,_=m.attributes.position;let S=0;if(_===void 0)return;if(g!==null){const b=g.array;S=g.version;for(let A=0,v=b.length;A<v;A+=3){const R=b[A+0],T=b[A+1],C=b[A+2];u.push(R,T,T,C,C,R)}}else{const b=_.array;S=_.version;for(let A=0,v=b.length/3-1;A<v;A+=3){const R=A+0,T=A+1,C=A+2;u.push(R,T,T,C,C,R)}}const p=new(_.count>=65535?pc:fc)(u,1);p.version=S;const d=a.get(m);d&&e.remove(d),a.set(m,p)}function h(m){const u=a.get(m);if(u){const g=m.index;g!==null&&u.version<g.version&&l(m)}else l(m);return a.get(m)}return{get:o,update:c,getWireframeAttribute:h}}function Vm(n,e,t){let i;function s(m){i=m}let a,r;function o(m){a=m.type,r=m.bytesPerElement}function c(m,u){n.drawElements(i,u,a,m*r),t.update(u,i,1)}function l(m,u,g){g!==0&&(n.drawElementsInstanced(i,u,a,m*r,g),t.update(u,i,g))}function h(m,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,m,0,g);let S=0;for(let p=0;p<g;p++)S+=u[p];t.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Hm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:Ke("WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Wm(n,e,t){const i=new WeakMap,s=new ft;function a(r,o,c){const l=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==m){let y=function(){C.dispose(),i.delete(o),o.removeEventListener("dispose",y)};u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,S=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let A=0;g===!0&&(A=1),_===!0&&(A=2),S===!0&&(A=3);let v=o.attributes.position.count*A,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const T=new Float32Array(v*R*4*m),C=new dc(T,v,R,m);C.type=an,C.needsUpdate=!0;const x=A*4;for(let L=0;L<m;L++){const D=p[L],N=d[L],k=b[L],V=v*R*4*L;for(let F=0;F<D.count;F++){const q=F*x;g===!0&&(s.fromBufferAttribute(D,F),T[V+q+0]=s.x,T[V+q+1]=s.y,T[V+q+2]=s.z,T[V+q+3]=0),_===!0&&(s.fromBufferAttribute(N,F),T[V+q+4]=s.x,T[V+q+5]=s.y,T[V+q+6]=s.z,T[V+q+7]=0),S===!0&&(s.fromBufferAttribute(k,F),T[V+q+8]=s.x,T[V+q+9]=s.y,T[V+q+10]=s.z,T[V+q+11]=k.itemSize===4?s.w:1)}}u={count:m,texture:C,size:new ze(v,R)},i.set(o,u),o.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let g=0;for(let S=0;S<l.length;S++)g+=l[S];const _=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:a}}function Xm(n,e,t,i,s){let a=new WeakMap;function r(l){const h=s.render.frame,m=l.geometry,u=e.get(l,m);if(a.get(u)!==h&&(e.update(u),a.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),a.get(l)!==h&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,h))),l.isSkinnedMesh){const g=l.skeleton;a.get(g)!==h&&(g.update(),a.set(g,h))}return u}function o(){a=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:r,dispose:o}}const qm={[Kl]:"LINEAR_TONE_MAPPING",[Zl]:"REINHARD_TONE_MAPPING",[$l]:"CINEON_TONE_MAPPING",[Jl]:"ACES_FILMIC_TONE_MAPPING",[ec]:"AGX_TONE_MAPPING",[tc]:"NEUTRAL_TONE_MAPPING",[Ql]:"CUSTOM_TONE_MAPPING"};function jm(n,e,t,i,s,a){const r=new ln(e,t,{type:n,depthBuffer:s,stencilBuffer:a,samples:i?4:0,depthTexture:s?new Ci(e,t):void 0}),o=new ln(e,t,{type:yn,depthBuffer:!1,stencilBuffer:!1}),c=new fn;c.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new qt([0,2,0,0,2,0],2));const l=new Fh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new dn(c,l),m=new Mc(-1,1,1,-1,0,1);let u=null,g=null,_=!1,S,p=null,d=[],b=!1;this.setSize=function(A,v){r.setSize(A,v),o.setSize(A,v);for(let R=0;R<d.length;R++){const T=d[R];T.setSize&&T.setSize(A,v)}},this.setEffects=function(A){d=A,b=d.length>0&&d[0].isRenderPass===!0;const v=r.width,R=r.height;for(let T=0;T<d.length;T++){const C=d[T];C.setSize&&C.setSize(v,R)}},this.begin=function(A,v){if(_||A.toneMapping===on&&d.length===0)return!1;if(p=v,v!==null){const R=v.width,T=v.height;(r.width!==R||r.height!==T)&&this.setSize(R,T)}return b===!1&&A.setRenderTarget(r),S=A.toneMapping,A.toneMapping=on,!0},this.hasRenderPass=function(){return b},this.end=function(A,v){A.toneMapping=S,_=!0;let R=r,T=o;for(let C=0;C<d.length;C++){const x=d[C];if(x.enabled!==!1&&(x.render(A,T,R,v),x.needsSwap!==!1)){const y=R;R=T,T=y}}if(u!==A.outputColorSpace||g!==A.toneMapping){u=A.outputColorSpace,g=A.toneMapping,l.defines={},je.getTransfer(u)===et&&(l.defines.SRGB_TRANSFER="");const C=qm[g];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=R.texture,A.setRenderTarget(p),A.render(h,m),p=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),c.dispose(),l.dispose()}}const yc=new Pt,Fr=new Ci(1,1),Tc=new dc,Ac=new fh,Rc=new gc,al=[],rl=[],ol=new Float32Array(16),ll=new Float32Array(9),cl=new Float32Array(4);function Di(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=al[s];if(a===void 0&&(a=new Float32Array(s),al[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function Mt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function St(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ys(n,e){let t=rl[e];t===void 0&&(t=new Int32Array(e),rl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ym(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2fv(this.addr,e),St(t,e)}}function Zm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;n.uniform3fv(this.addr,e),St(t,e)}}function $m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4fv(this.addr,e),St(t,e)}}function Jm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;cl.set(i),n.uniformMatrix2fv(this.addr,!1,cl),St(t,i)}}function Qm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;ll.set(i),n.uniformMatrix3fv(this.addr,!1,ll),St(t,i)}}function eg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Mt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,i))return;ol.set(i),n.uniformMatrix4fv(this.addr,!1,ol),St(t,i)}}function tg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function ng(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2iv(this.addr,e),St(t,e)}}function ig(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3iv(this.addr,e),St(t,e)}}function sg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4iv(this.addr,e),St(t,e)}}function ag(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;n.uniform2uiv(this.addr,e),St(t,e)}}function og(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;n.uniform3uiv(this.addr,e),St(t,e)}}function lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;n.uniform4uiv(this.addr,e),St(t,e)}}function cg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(Fr.compareFunction=t.isReversedDepthBuffer()?Kr:Yr,a=Fr):a=yc,t.setTexture2D(e||a,s)}function ug(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Ac,s)}function dg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Rc,s)}function hg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Tc,s)}function fg(n){switch(n){case 5126:return Ym;case 35664:return Km;case 35665:return Zm;case 35666:return $m;case 35674:return Jm;case 35675:return Qm;case 35676:return eg;case 5124:case 35670:return tg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return sg;case 5125:return ag;case 36294:return rg;case 36295:return og;case 36296:return lg;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return ug;case 35680:case 36300:case 36308:case 36293:return dg;case 36289:case 36303:case 36311:case 36292:return hg}}function pg(n,e){n.uniform1fv(this.addr,e)}function mg(n,e){const t=Di(e,this.size,2);n.uniform2fv(this.addr,t)}function gg(n,e){const t=Di(e,this.size,3);n.uniform3fv(this.addr,t)}function _g(n,e){const t=Di(e,this.size,4);n.uniform4fv(this.addr,t)}function xg(n,e){const t=Di(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vg(n,e){const t=Di(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Mg(n,e){const t=Di(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Sg(n,e){n.uniform1iv(this.addr,e)}function Eg(n,e){n.uniform2iv(this.addr,e)}function bg(n,e){n.uniform3iv(this.addr,e)}function yg(n,e){n.uniform4iv(this.addr,e)}function Tg(n,e){n.uniform1uiv(this.addr,e)}function Ag(n,e){n.uniform2uiv(this.addr,e)}function Rg(n,e){n.uniform3uiv(this.addr,e)}function wg(n,e){n.uniform4uiv(this.addr,e)}function Cg(n,e,t){const i=this.cache,s=e.length,a=Ys(t,s);Mt(i,a)||(n.uniform1iv(this.addr,a),St(i,a));let r;this.type===n.SAMPLER_2D_SHADOW?r=Fr:r=yc;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||r,a[o])}function Pg(n,e,t){const i=this.cache,s=e.length,a=Ys(t,s);Mt(i,a)||(n.uniform1iv(this.addr,a),St(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||Ac,a[r])}function Dg(n,e,t){const i=this.cache,s=e.length,a=Ys(t,s);Mt(i,a)||(n.uniform1iv(this.addr,a),St(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Rc,a[r])}function Lg(n,e,t){const i=this.cache,s=e.length,a=Ys(t,s);Mt(i,a)||(n.uniform1iv(this.addr,a),St(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Tc,a[r])}function Ng(n){switch(n){case 5126:return pg;case 35664:return mg;case 35665:return gg;case 35666:return _g;case 35674:return xg;case 35675:return vg;case 35676:return Mg;case 5124:case 35670:return Sg;case 35667:case 35671:return Eg;case 35668:case 35672:return bg;case 35669:case 35673:return yg;case 5125:return Tg;case 36294:return Ag;case 36295:return Rg;case 36296:return wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Cg;case 35679:case 36299:case 36307:return Pg;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Lg}}class Ig{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=fg(t.type)}}class Ug{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ng(t.type)}}class Fg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const Ua=/(\w+)(\])?(\[|\.)?/g;function ul(n,e){n.seq.push(e),n.map[e.id]=e}function Og(n,e,t){const i=n.name,s=i.length;for(Ua.lastIndex=0;;){const a=Ua.exec(i),r=Ua.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&r+2===s){ul(t,l===void 0?new Ig(o,n,e):new Ug(o,n,e));break}else{let m=t.map[o];m===void 0&&(m=new Fg(o),ul(t,m)),t=m}}}class Fs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(t,r),c=e.getUniformLocation(t,o.name);Og(o,c,this)}const s=[],a=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function dl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Bg=37297;let zg=0;function Gg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const hl=new Be;function kg(n){je._getMatrix(hl,je.workingColorSpace,n);const e=`mat3( ${hl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case Gs:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function fl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+Gg(n.getShaderSource(e),o)}else return a}function Vg(n,e){const t=kg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Hg={[Kl]:"Linear",[Zl]:"Reinhard",[$l]:"Cineon",[Jl]:"ACESFilmic",[ec]:"AgX",[tc]:"Neutral",[Ql]:"Custom"};function Wg(n,e){const t=Hg[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ws=new W;function Xg(){je.getLuminanceCoefficients(ws);const n=ws.x.toFixed(4),e=ws.y.toFixed(4),t=ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xi).join(`
`)}function jg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Yg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Xi(n){return n!==""}function pl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ml(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Kg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Or(n){return n.replace(Kg,$g)}const Zg=new Map;function $g(n,e){let t=Ve[e];if(t===void 0){const i=Zg.get(e);if(i!==void 0)t=Ve[i],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Or(t)}const Jg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gl(n){return n.replace(Jg,Qg)}function Qg(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function _l(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const e_={[Ps]:"SHADOWMAP_TYPE_PCF",[Wi]:"SHADOWMAP_TYPE_VSM"};function t_(n){return e_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const n_={[Qn]:"ENVMAP_TYPE_CUBE",[wi]:"ENVMAP_TYPE_CUBE",[Ws]:"ENVMAP_TYPE_CUBE_UV"};function i_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":n_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const s_={[wi]:"ENVMAP_MODE_REFRACTION"};function a_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":s_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const r_={[Yl]:"ENVMAP_BLENDING_MULTIPLY",[Xd]:"ENVMAP_BLENDING_MIX",[qd]:"ENVMAP_BLENDING_ADD"};function o_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":r_[n.combine]||"ENVMAP_BLENDING_NONE"}function l_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function c_(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const c=t_(t),l=i_(t),h=a_(t),m=o_(t),u=l_(t),g=qg(t),_=jg(a),S=s.createProgram();let p,d,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Xi).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Xi).join(`
`),d.length>0&&(d+=`
`)):(p=[_l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xi).join(`
`),d=[_l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+m:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==on?"#define TONE_MAPPING":"",t.toneMapping!==on?Ve.tonemapping_pars_fragment:"",t.toneMapping!==on?Wg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Vg("linearToOutputTexel",t.outputColorSpace),Xg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Xi).join(`
`)),r=Or(r),r=pl(r,t),r=ml(r,t),o=Or(o),o=pl(o,t),o=ml(o,t),r=gl(r),o=gl(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===wo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===wo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const A=b+p+r,v=b+d+o,R=dl(s,s.VERTEX_SHADER,A),T=dl(s,s.FRAGMENT_SHADER,v);s.attachShader(S,R),s.attachShader(S,T),t.index0AttributeName!==void 0?s.bindAttribLocation(S,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function C(D){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(S)||"",k=s.getShaderInfoLog(R)||"",V=s.getShaderInfoLog(T)||"",F=N.trim(),q=k.trim(),X=V.trim();let Q=!0,ne=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,R,T);else{const fe=fl(s,R,"vertex"),le=fl(s,T,"fragment");Ke("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+F+`
`+fe+`
`+le)}else F!==""?Oe("WebGLProgram: Program Info Log:",F):(q===""||X==="")&&(ne=!1);ne&&(D.diagnostics={runnable:Q,programLog:F,vertexShader:{log:q,prefix:p},fragmentShader:{log:X,prefix:d}})}s.deleteShader(R),s.deleteShader(T),x=new Fs(s,S),y=Yg(s,S)}let x;this.getUniforms=function(){return x===void 0&&C(this),x};let y;this.getAttributes=function(){return y===void 0&&C(this),y};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(S,Bg)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zg++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=R,this.fragmentShader=T,this}let u_=0;class d_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new h_(e),t.set(e,i)),i}}class h_{constructor(e){this.id=u_++,this.code=e,this.usedTimes=0}}function f_(n){return n===ei||n===Os||n===Bs}function p_(n,e,t,i,s,a){const r=new $r,o=new d_,c=new Set,l=[],h=new Map,m=i.logarithmicDepthBuffer;let u=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function S(x,y,L,D,N,k){const V=D.fog,F=N.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,Q=e.get(x.envMap||q,X),ne=Q&&Q.mapping===Ws?Q.image.height:null,fe=g[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Oe("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const le=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,xe=le!==void 0?le.length:0;let Pe=0;F.morphAttributes.position!==void 0&&(Pe=1),F.morphAttributes.normal!==void 0&&(Pe=2),F.morphAttributes.color!==void 0&&(Pe=3);let Ge,Ne,$,ie;if(fe){const Ce=tn[fe];Ge=Ce.vertexShader,Ne=Ce.fragmentShader}else{Ge=x.vertexShader,Ne=x.fragmentShader;const Ce=o.getVertexShaderStage(x),nt=o.getFragmentShaderStage(x);o.update(x,Ce,nt),$=Ce.id,ie=nt.id}const re=n.getRenderTarget(),Re=n.state.buffers.depth.getReversed(),Ue=N.isInstancedMesh===!0,we=N.isBatchedMesh===!0,$e=!!x.map,Ie=!!x.matcap,qe=!!Q,He=!!x.aoMap,We=!!x.lightMap,rt=!!x.bumpMap&&x.wireframe===!1,lt=!!x.normalMap,ut=!!x.displacementMap,pt=!!x.emissiveMap,tt=!!x.metalnessMap,dt=!!x.roughnessMap,O=x.anisotropy>0,_t=x.clearcoat>0,ke=x.dispersion>0,w=x.iridescence>0,f=x.sheen>0,P=x.transmission>0,U=O&&!!x.anisotropyMap,z=_t&&!!x.clearcoatMap,J=_t&&!!x.clearcoatNormalMap,oe=_t&&!!x.clearcoatRoughnessMap,G=w&&!!x.iridescenceMap,K=w&&!!x.iridescenceThicknessMap,pe=f&&!!x.sheenColorMap,ue=f&&!!x.sheenRoughnessMap,he=!!x.specularMap,ce=!!x.specularColorMap,ye=!!x.specularIntensityMap,me=P&&!!x.transmissionMap,Fe=P&&!!x.thicknessMap,I=!!x.gradientMap,ge=!!x.alphaMap,ee=x.alphaTest>0,_e=!!x.alphaHash,ve=!!x.extensions;let se=on;x.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(se=n.toneMapping);const De={shaderID:fe,shaderType:x.type,shaderName:x.name,vertexShader:Ge,fragmentShader:Ne,defines:x.defines,customVertexShaderID:$,customFragmentShaderID:ie,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:we,batchingColor:we&&N._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&N.instanceColor!==null,instancingMorph:Ue&&N.morphTexture!==null,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:je.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:$e,matcap:Ie,envMap:qe,envMapMode:qe&&Q.mapping,envMapCubeUVHeight:ne,aoMap:He,lightMap:We,bumpMap:rt,normalMap:lt,displacementMap:ut,emissiveMap:pt,normalMapObjectSpace:lt&&x.normalMapType===Kd,normalMapTangentSpace:lt&&x.normalMapType===To,packedNormalMap:lt&&x.normalMapType===To&&f_(x.normalMap.format),metalnessMap:tt,roughnessMap:dt,anisotropy:O,anisotropyMap:U,clearcoat:_t,clearcoatMap:z,clearcoatNormalMap:J,clearcoatRoughnessMap:oe,dispersion:ke,iridescence:w,iridescenceMap:G,iridescenceThicknessMap:K,sheen:f,sheenColorMap:pe,sheenRoughnessMap:ue,specularMap:he,specularColorMap:ce,specularIntensityMap:ye,transmission:P,transmissionMap:me,thicknessMap:Fe,gradientMap:I,opaque:x.transparent===!1&&x.blending===yi&&x.alphaToCoverage===!1,alphaMap:ge,alphaTest:ee,alphaHash:_e,combine:x.combine,mapUv:$e&&_(x.map.channel),aoMapUv:He&&_(x.aoMap.channel),lightMapUv:We&&_(x.lightMap.channel),bumpMapUv:rt&&_(x.bumpMap.channel),normalMapUv:lt&&_(x.normalMap.channel),displacementMapUv:ut&&_(x.displacementMap.channel),emissiveMapUv:pt&&_(x.emissiveMap.channel),metalnessMapUv:tt&&_(x.metalnessMap.channel),roughnessMapUv:dt&&_(x.roughnessMap.channel),anisotropyMapUv:U&&_(x.anisotropyMap.channel),clearcoatMapUv:z&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:J&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:G&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:K&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:ue&&_(x.sheenRoughnessMap.channel),specularMapUv:he&&_(x.specularMap.channel),specularColorMapUv:ce&&_(x.specularColorMap.channel),specularIntensityMapUv:ye&&_(x.specularIntensityMap.channel),transmissionMapUv:me&&_(x.transmissionMap.channel),thicknessMapUv:Fe&&_(x.thicknessMap.channel),alphaMapUv:ge&&_(x.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(lt||O),vertexNormals:!!F.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!F.attributes.uv&&($e||ge),fog:!!V,useFog:x.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||F.attributes.normal===void 0&&lt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:Re,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:Pe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:se,decodeVideoTexture:$e&&x.map.isVideoTexture===!0&&je.getTransfer(x.map.colorSpace)===et,decodeVideoTextureEmissive:pt&&x.emissiveMap.isVideoTexture===!0&&je.getTransfer(x.emissiveMap.colorSpace)===et,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Mn,flipSided:x.side===It,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ve&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&x.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const L in x.defines)y.push(L),y.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(d(y,x),b(y,x),y.push(n.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function d(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function b(x,y){r.disableAll(),y.instancing&&r.enable(0),y.instancingColor&&r.enable(1),y.instancingMorph&&r.enable(2),y.matcap&&r.enable(3),y.envMap&&r.enable(4),y.normalMapObjectSpace&&r.enable(5),y.normalMapTangentSpace&&r.enable(6),y.clearcoat&&r.enable(7),y.iridescence&&r.enable(8),y.alphaTest&&r.enable(9),y.vertexColors&&r.enable(10),y.vertexAlphas&&r.enable(11),y.vertexUv1s&&r.enable(12),y.vertexUv2s&&r.enable(13),y.vertexUv3s&&r.enable(14),y.vertexTangents&&r.enable(15),y.anisotropy&&r.enable(16),y.alphaHash&&r.enable(17),y.batching&&r.enable(18),y.dispersion&&r.enable(19),y.batchingColor&&r.enable(20),y.gradientMap&&r.enable(21),y.packedNormalMap&&r.enable(22),y.vertexNormals&&r.enable(23),x.push(r.mask),r.disableAll(),y.fog&&r.enable(0),y.useFog&&r.enable(1),y.flatShading&&r.enable(2),y.logarithmicDepthBuffer&&r.enable(3),y.reversedDepthBuffer&&r.enable(4),y.skinning&&r.enable(5),y.morphTargets&&r.enable(6),y.morphNormals&&r.enable(7),y.morphColors&&r.enable(8),y.premultipliedAlpha&&r.enable(9),y.shadowMapEnabled&&r.enable(10),y.doubleSided&&r.enable(11),y.flipSided&&r.enable(12),y.useDepthPacking&&r.enable(13),y.dithering&&r.enable(14),y.transmission&&r.enable(15),y.sheen&&r.enable(16),y.opaque&&r.enable(17),y.pointsUvs&&r.enable(18),y.decodeVideoTexture&&r.enable(19),y.decodeVideoTextureEmissive&&r.enable(20),y.alphaToCoverage&&r.enable(21),y.numLightProbeGrids>0&&r.enable(22),y.hasPositionAttribute&&r.enable(23),x.push(r.mask)}function A(x){const y=g[x.type];let L;if(y){const D=tn[y];L=Nh.clone(D.uniforms)}else L=x.uniforms;return L}function v(x,y){let L=h.get(y);return L!==void 0?++L.usedTimes:(L=new c_(n,y,x,s),l.push(L),h.set(y,L)),L}function R(x){if(--x.usedTimes===0){const y=l.indexOf(x);l[y]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function C(){o.dispose()}return{getParameters:S,getProgramCacheKey:p,getUniforms:A,acquireProgram:v,releaseProgram:R,releaseShaderCache:T,programs:l,dispose:C}}function m_(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,c){n.get(r)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function g_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function xl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function vl(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(u){let g=0;return u.isInstancedMesh&&(g+=2),u.isSkinnedMesh&&(g+=1),g}function o(u,g,_,S,p,d){let b=n[e];return b===void 0?(b={id:u.id,object:u,geometry:g,material:_,materialVariant:r(u),groupOrder:S,renderOrder:u.renderOrder,z:p,group:d},n[e]=b):(b.id=u.id,b.object=u,b.geometry=g,b.material=_,b.materialVariant=r(u),b.groupOrder=S,b.renderOrder=u.renderOrder,b.z=p,b.group=d),e++,b}function c(u,g,_,S,p,d){const b=o(u,g,_,S,p,d);_.transmission>0?i.push(b):_.transparent===!0?s.push(b):t.push(b)}function l(u,g,_,S,p,d){const b=o(u,g,_,S,p,d);_.transmission>0?i.unshift(b):_.transparent===!0?s.unshift(b):t.unshift(b)}function h(u,g,_){t.length>1&&t.sort(u||g_),i.length>1&&i.sort(g||xl),s.length>1&&s.sort(g||xl),_&&(t.reverse(),i.reverse(),s.reverse())}function m(){for(let u=e,g=n.length;u<g;u++){const _=n[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:c,unshift:l,finish:m,sort:h}}function __(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new vl,n.set(i,[r])):s>=a.length?(r=new vl,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function x_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new Je};break;case"SpotLight":t={position:new W,direction:new W,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function v_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let M_=0;function S_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function E_(n){const e=new x_,t=v_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new W);const s=new W,a=new gt,r=new gt;function o(l){let h=0,m=0,u=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let g=0,_=0,S=0,p=0,d=0,b=0,A=0,v=0,R=0,T=0,C=0;l.sort(S_);for(let y=0,L=l.length;y<L;y++){const D=l[y],N=D.color,k=D.intensity,V=D.distance;let F=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ei?F=D.shadow.map.texture:F=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=N.r*k,m+=N.g*k,u+=N.b*k;else if(D.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(D.sh.coefficients[q],k);C++}else if(D.isDirectionalLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const X=D.shadow,Q=t.get(D);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,i.directionalShadow[g]=Q,i.directionalShadowMap[g]=F,i.directionalShadowMatrix[g]=D.shadow.matrix,b++}i.directional[g]=q,g++}else if(D.isSpotLight){const q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(N).multiplyScalar(k),q.distance=V,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,i.spot[S]=q;const X=D.shadow;if(D.map&&(i.spotLightMap[R]=D.map,R++,X.updateMatrices(D),D.castShadow&&T++),i.spotLightMatrix[S]=X.matrix,D.castShadow){const Q=t.get(D);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,i.spotShadow[S]=Q,i.spotShadowMap[S]=F,v++}S++}else if(D.isRectAreaLight){const q=e.get(D);q.color.copy(N).multiplyScalar(k),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),i.rectArea[p]=q,p++}else if(D.isPointLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const X=D.shadow,Q=t.get(D);Q.shadowIntensity=X.intensity,Q.shadowBias=X.bias,Q.shadowNormalBias=X.normalBias,Q.shadowRadius=X.radius,Q.shadowMapSize=X.mapSize,Q.shadowCameraNear=X.camera.near,Q.shadowCameraFar=X.camera.far,i.pointShadow[_]=Q,i.pointShadowMap[_]=F,i.pointShadowMatrix[_]=D.shadow.matrix,A++}i.point[_]=q,_++}else if(D.isHemisphereLight){const q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(k),q.groundColor.copy(D.groundColor).multiplyScalar(k),i.hemi[d]=q,d++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=m,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==g||x.pointLength!==_||x.spotLength!==S||x.rectAreaLength!==p||x.hemiLength!==d||x.numDirectionalShadows!==b||x.numPointShadows!==A||x.numSpotShadows!==v||x.numSpotMaps!==R||x.numLightProbes!==C)&&(i.directional.length=g,i.spot.length=S,i.rectArea.length=p,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=v+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,x.directionalLength=g,x.pointLength=_,x.spotLength=S,x.rectAreaLength=p,x.hemiLength=d,x.numDirectionalShadows=b,x.numPointShadows=A,x.numSpotShadows=v,x.numSpotMaps=R,x.numLightProbes=C,i.version=M_++)}function c(l,h){let m=0,u=0,g=0,_=0,S=0;const p=h.matrixWorldInverse;for(let d=0,b=l.length;d<b;d++){const A=l[d];if(A.isDirectionalLight){const v=i.directional[m];v.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),m++}else if(A.isSpotLight){const v=i.spot[g];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(p),g++}else if(A.isRectAreaLight){const v=i.rectArea[_];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(p),r.identity(),a.copy(A.matrixWorld),a.premultiply(p),r.extractRotation(a),v.halfWidth.set(A.width*.5,0,0),v.halfHeight.set(0,A.height*.5,0),v.halfWidth.applyMatrix4(r),v.halfHeight.applyMatrix4(r),_++}else if(A.isPointLight){const v=i.point[u];v.position.setFromMatrixPosition(A.matrixWorld),v.position.applyMatrix4(p),u++}else if(A.isHemisphereLight){const v=i.hemi[S];v.direction.setFromMatrixPosition(A.matrixWorld),v.direction.transformDirection(p),S++}}}return{setup:o,setupView:c,state:i}}function Ml(n){const e=new E_(n),t=[],i=[],s=[];function a(u){m.camera=u,t.length=0,i.length=0,s.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function c(u){s.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const m={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:m,setupLights:l,setupLightsView:h,pushLight:r,pushShadow:o,pushLightProbeGrid:c}}function b_(n){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new Ml(n),e.set(s,[o])):a>=r.length?(o=new Ml(n),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const y_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,A_=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],R_=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Sl=new gt,Vi=new W,Fa=new W;function w_(n,e,t){let i=new mc;const s=new ze,a=new ze,r=new ft,o=new Oh,c=new Bh,l={},h=t.maxTextureSize,m={[kn]:It,[It]:kn,[Mn]:Mn},u=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:y_,fragmentShader:T_}),g=u.clone();g.defines.HORIZONTAL_PASS=1;const _=new fn;_.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new dn(_,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ps;let d=this.type;this.render=function(T,C,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;this.type===Ad&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Ps);const y=n.getRenderTarget(),L=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),N=n.state;N.setBlending(En),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const k=d!==this.type;k&&C.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(F=>F.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,F=T.length;V<F;V++){const q=T[V],X=q.shadow;if(X===void 0){Oe("WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const Q=X.getFrameExtents();s.multiply(Q),a.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/Q.x),s.x=a.x*Q.x,X.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/Q.y),s.y=a.y*Q.y,X.mapSize.y=a.y));const ne=n.state.buffers.depth.getReversed();if(X.camera._reversedDepth=ne,X.map===null||k===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Wi){if(q.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new ln(s.x,s.y,{format:ei,type:yn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),X.map.texture.name=q.name+".shadowMap",X.map.depthTexture=new Ci(s.x,s.y,an),X.map.depthTexture.name=q.name+".shadowMapDepth",X.map.depthTexture.format=Tn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=bt,X.map.depthTexture.magFilter=bt}else q.isPointLight?(X.map=new bc(s.x),X.map.depthTexture=new Dh(s.x,un)):(X.map=new ln(s.x,s.y),X.map.depthTexture=new Ci(s.x,s.y,un)),X.map.depthTexture.name=q.name+".shadowMap",X.map.depthTexture.format=Tn,this.type===Ps?(X.map.depthTexture.compareFunction=ne?Kr:Yr,X.map.depthTexture.minFilter=Rt,X.map.depthTexture.magFilter=Rt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=bt,X.map.depthTexture.magFilter=bt);X.camera.updateProjectionMatrix()}const fe=X.map.isWebGLCubeRenderTarget?6:1;for(let le=0;le<fe;le++){if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,le),n.clear();else{le===0&&(n.setRenderTarget(X.map),n.clear());const xe=X.getViewport(le);r.set(a.x*xe.x,a.y*xe.y,a.x*xe.z,a.y*xe.w),N.viewport(r)}if(q.isPointLight){const xe=X.camera,Pe=X.matrix,Ge=q.distance||xe.far;Ge!==xe.far&&(xe.far=Ge,xe.updateProjectionMatrix()),Vi.setFromMatrixPosition(q.matrixWorld),xe.position.copy(Vi),Fa.copy(xe.position),Fa.add(A_[le]),xe.up.copy(R_[le]),xe.lookAt(Fa),xe.updateMatrixWorld(),Pe.makeTranslation(-Vi.x,-Vi.y,-Vi.z),Sl.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Sl,xe.coordinateSystem,xe.reversedDepth)}else X.updateMatrices(q);i=X.getFrustum(),v(C,x,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===Wi&&b(X,x),X.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(y,L,D)};function b(T,C){const x=e.update(S);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,g.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,g.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ln(s.x,s.y,{format:ei,type:yn})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(C,null,x,u,S,null),g.uniforms.shadow_pass.value=T.mapPass.texture,g.uniforms.resolution.value=T.mapSize,g.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(C,null,x,g,S,null)}function A(T,C,x,y){let L=null;const D=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)L=D;else if(L=x.isPointLight===!0?c:o,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const N=L.uuid,k=C.uuid;let V=l[N];V===void 0&&(V={},l[N]=V);let F=V[k];F===void 0&&(F=L.clone(),V[k]=F,C.addEventListener("dispose",R)),L=F}if(L.visible=C.visible,L.wireframe=C.wireframe,y===Wi?L.side=C.shadowSide!==null?C.shadowSide:C.side:L.side=C.shadowSide!==null?C.shadowSide:m[C.side],L.alphaMap=C.alphaMap,L.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,L.map=C.map,L.clipShadows=C.clipShadows,L.clippingPlanes=C.clippingPlanes,L.clipIntersection=C.clipIntersection,L.displacementMap=C.displacementMap,L.displacementScale=C.displacementScale,L.displacementBias=C.displacementBias,L.wireframeLinewidth=C.wireframeLinewidth,L.linewidth=C.linewidth,x.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const N=n.properties.get(L);N.light=x}return L}function v(T,C,x,y,L){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===Wi)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const k=e.update(T),V=T.material;if(Array.isArray(V)){const F=k.groups;for(let q=0,X=F.length;q<X;q++){const Q=F[q],ne=V[Q.materialIndex];if(ne&&ne.visible){const fe=A(T,ne,y,L);T.onBeforeShadow(n,T,C,x,k,fe,Q),n.renderBufferDirect(x,null,k,fe,T,Q),T.onAfterShadow(n,T,C,x,k,fe,Q)}}}else if(V.visible){const F=A(T,V,y,L);T.onBeforeShadow(n,T,C,x,k,F,null),n.renderBufferDirect(x,null,k,F,T,null),T.onAfterShadow(n,T,C,x,k,F,null)}}const N=T.children;for(let k=0,V=N.length;k<V;k++)v(N[k],C,x,y,L)}function R(T){T.target.removeEventListener("dispose",R);for(const x in l){const y=l[x],L=T.target.uuid;L in y&&(y[L].dispose(),delete y[L])}}}function C_(n,e){function t(){let I=!1;const ge=new ft;let ee=null;const _e=new ft(0,0,0,0);return{setMask:function(ve){ee!==ve&&!I&&(n.colorMask(ve,ve,ve,ve),ee=ve)},setLocked:function(ve){I=ve},setClear:function(ve,se,De,Ce,nt){nt===!0&&(ve*=Ce,se*=Ce,De*=Ce),ge.set(ve,se,De,Ce),_e.equals(ge)===!1&&(n.clearColor(ve,se,De,Ce),_e.copy(ge))},reset:function(){I=!1,ee=null,_e.set(-1,0,0,0)}}}function i(){let I=!1,ge=!1,ee=null,_e=null,ve=null;return{setReversed:function(se){if(ge!==se){const De=e.get("EXT_clip_control");se?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ge=se;const Ce=ve;ve=null,this.setClear(Ce)}},getReversed:function(){return ge},setTest:function(se){se?re(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(se){ee!==se&&!I&&(n.depthMask(se),ee=se)},setFunc:function(se){if(ge&&(se=ah[se]),_e!==se){switch(se){case Ka:n.depthFunc(n.NEVER);break;case Za:n.depthFunc(n.ALWAYS);break;case $a:n.depthFunc(n.LESS);break;case Ri:n.depthFunc(n.LEQUAL);break;case Ja:n.depthFunc(n.EQUAL);break;case Qa:n.depthFunc(n.GEQUAL);break;case er:n.depthFunc(n.GREATER);break;case tr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=se}},setLocked:function(se){I=se},setClear:function(se){ve!==se&&(ve=se,ge&&(se=1-se),n.clearDepth(se))},reset:function(){I=!1,ee=null,_e=null,ve=null,ge=!1}}}function s(){let I=!1,ge=null,ee=null,_e=null,ve=null,se=null,De=null,Ce=null,nt=null;return{setTest:function(Qe){I||(Qe?re(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(Qe){ge!==Qe&&!I&&(n.stencilMask(Qe),ge=Qe)},setFunc:function(Qe,zt,Gt){(ee!==Qe||_e!==zt||ve!==Gt)&&(n.stencilFunc(Qe,zt,Gt),ee=Qe,_e=zt,ve=Gt)},setOp:function(Qe,zt,Gt){(se!==Qe||De!==zt||Ce!==Gt)&&(n.stencilOp(Qe,zt,Gt),se=Qe,De=zt,Ce=Gt)},setLocked:function(Qe){I=Qe},setClear:function(Qe){nt!==Qe&&(n.clearStencil(Qe),nt=Qe)},reset:function(){I=!1,ge=null,ee=null,_e=null,ve=null,se=null,De=null,Ce=null,nt=null}}}const a=new t,r=new i,o=new s,c=new WeakMap,l=new WeakMap;let h={},m={},u={},g=new WeakMap,_=[],S=null,p=!1,d=null,b=null,A=null,v=null,R=null,T=null,C=null,x=new Je(0,0,0),y=0,L=!1,D=null,N=null,k=null,V=null,F=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Q=0;const ne=n.getParameter(n.VERSION);ne.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(ne)[1]),X=Q>=1):ne.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),X=Q>=2);let fe=null,le={};const xe=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),Ge=new ft().fromArray(xe),Ne=new ft().fromArray(Pe);function $(I,ge,ee,_e){const ve=new Uint8Array(4),se=n.createTexture();n.bindTexture(I,se),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let De=0;De<ee;De++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,ve):n.texImage2D(ge+De,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ve);return se}const ie={};ie[n.TEXTURE_2D]=$(n.TEXTURE_2D,n.TEXTURE_2D,1),ie[n.TEXTURE_CUBE_MAP]=$(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[n.TEXTURE_2D_ARRAY]=$(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ie[n.TEXTURE_3D]=$(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),re(n.DEPTH_TEST),r.setFunc(Ri),rt(!1),lt(So),re(n.CULL_FACE),He(En);function re(I){h[I]!==!0&&(n.enable(I),h[I]=!0)}function Re(I){h[I]!==!1&&(n.disable(I),h[I]=!1)}function Ue(I,ge){return u[I]!==ge?(n.bindFramebuffer(I,ge),u[I]=ge,I===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ge),I===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function we(I,ge){let ee=_,_e=!1;if(I){ee=g.get(ge),ee===void 0&&(ee=[],g.set(ge,ee));const ve=I.textures;if(ee.length!==ve.length||ee[0]!==n.COLOR_ATTACHMENT0){for(let se=0,De=ve.length;se<De;se++)ee[se]=n.COLOR_ATTACHMENT0+se;ee.length=ve.length,_e=!0}}else ee[0]!==n.BACK&&(ee[0]=n.BACK,_e=!0);_e&&n.drawBuffers(ee)}function $e(I){return S!==I?(n.useProgram(I),S=I,!0):!1}const Ie={[Kn]:n.FUNC_ADD,[wd]:n.FUNC_SUBTRACT,[Cd]:n.FUNC_REVERSE_SUBTRACT};Ie[Pd]=n.MIN,Ie[Dd]=n.MAX;const qe={[Ld]:n.ZERO,[Nd]:n.ONE,[Id]:n.SRC_COLOR,[ja]:n.SRC_ALPHA,[Gd]:n.SRC_ALPHA_SATURATE,[Bd]:n.DST_COLOR,[Fd]:n.DST_ALPHA,[Ud]:n.ONE_MINUS_SRC_COLOR,[Ya]:n.ONE_MINUS_SRC_ALPHA,[zd]:n.ONE_MINUS_DST_COLOR,[Od]:n.ONE_MINUS_DST_ALPHA,[kd]:n.CONSTANT_COLOR,[Vd]:n.ONE_MINUS_CONSTANT_COLOR,[Hd]:n.CONSTANT_ALPHA,[Wd]:n.ONE_MINUS_CONSTANT_ALPHA};function He(I,ge,ee,_e,ve,se,De,Ce,nt,Qe){if(I===En){p===!0&&(Re(n.BLEND),p=!1);return}if(p===!1&&(re(n.BLEND),p=!0),I!==Rd){if(I!==d||Qe!==L){if((b!==Kn||R!==Kn)&&(n.blendEquation(n.FUNC_ADD),b=Kn,R=Kn),Qe)switch(I){case yi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Eo:n.blendFunc(n.ONE,n.ONE);break;case bo:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case yo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Ke("WebGLState: Invalid blending: ",I);break}else switch(I){case yi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Eo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case bo:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yo:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",I);break}A=null,v=null,T=null,C=null,x.set(0,0,0),y=0,d=I,L=Qe}return}ve=ve||ge,se=se||ee,De=De||_e,(ge!==b||ve!==R)&&(n.blendEquationSeparate(Ie[ge],Ie[ve]),b=ge,R=ve),(ee!==A||_e!==v||se!==T||De!==C)&&(n.blendFuncSeparate(qe[ee],qe[_e],qe[se],qe[De]),A=ee,v=_e,T=se,C=De),(Ce.equals(x)===!1||nt!==y)&&(n.blendColor(Ce.r,Ce.g,Ce.b,nt),x.copy(Ce),y=nt),d=I,L=!1}function We(I,ge){I.side===Mn?Re(n.CULL_FACE):re(n.CULL_FACE);let ee=I.side===It;ge&&(ee=!ee),rt(ee),I.blending===yi&&I.transparent===!1?He(En):He(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),r.setFunc(I.depthFunc),r.setTest(I.depthTest),r.setMask(I.depthWrite),a.setMask(I.colorWrite);const _e=I.stencilWrite;o.setTest(_e),_e&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),pt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function rt(I){D!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),D=I)}function lt(I){I!==yd?(re(n.CULL_FACE),I!==N&&(I===So?n.cullFace(n.BACK):I===Td?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),N=I}function ut(I){I!==k&&(X&&n.lineWidth(I),k=I)}function pt(I,ge,ee){I?(re(n.POLYGON_OFFSET_FILL),(V!==ge||F!==ee)&&(V=ge,F=ee,r.getReversed()&&(ge=-ge),n.polygonOffset(ge,ee))):Re(n.POLYGON_OFFSET_FILL)}function tt(I){I?re(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function dt(I){I===void 0&&(I=n.TEXTURE0+q-1),fe!==I&&(n.activeTexture(I),fe=I)}function O(I,ge,ee){ee===void 0&&(fe===null?ee=n.TEXTURE0+q-1:ee=fe);let _e=le[ee];_e===void 0&&(_e={type:void 0,texture:void 0},le[ee]=_e),(_e.type!==I||_e.texture!==ge)&&(fe!==ee&&(n.activeTexture(ee),fe=ee),n.bindTexture(I,ge||ie[I]),_e.type=I,_e.texture=ge)}function _t(){const I=le[fe];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ke(){try{n.compressedTexImage2D(...arguments)}catch(I){Ke("WebGLState:",I)}}function w(){try{n.compressedTexImage3D(...arguments)}catch(I){Ke("WebGLState:",I)}}function f(){try{n.texSubImage2D(...arguments)}catch(I){Ke("WebGLState:",I)}}function P(){try{n.texSubImage3D(...arguments)}catch(I){Ke("WebGLState:",I)}}function U(){try{n.compressedTexSubImage2D(...arguments)}catch(I){Ke("WebGLState:",I)}}function z(){try{n.compressedTexSubImage3D(...arguments)}catch(I){Ke("WebGLState:",I)}}function J(){try{n.texStorage2D(...arguments)}catch(I){Ke("WebGLState:",I)}}function oe(){try{n.texStorage3D(...arguments)}catch(I){Ke("WebGLState:",I)}}function G(){try{n.texImage2D(...arguments)}catch(I){Ke("WebGLState:",I)}}function K(){try{n.texImage3D(...arguments)}catch(I){Ke("WebGLState:",I)}}function pe(I){return m[I]!==void 0?m[I]:n.getParameter(I)}function ue(I,ge){m[I]!==ge&&(n.pixelStorei(I,ge),m[I]=ge)}function he(I){Ge.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),Ge.copy(I))}function ce(I){Ne.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Ne.copy(I))}function ye(I,ge){let ee=l.get(ge);ee===void 0&&(ee=new WeakMap,l.set(ge,ee));let _e=ee.get(I);_e===void 0&&(_e=n.getUniformBlockIndex(ge,I.name),ee.set(I,_e))}function me(I,ge){const _e=l.get(ge).get(I);c.get(ge)!==_e&&(n.uniformBlockBinding(ge,_e,I.__bindingPointIndex),c.set(ge,_e))}function Fe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},m={},fe=null,le={},u={},g=new WeakMap,_=[],S=null,p=!1,d=null,b=null,A=null,v=null,R=null,T=null,C=null,x=new Je(0,0,0),y=0,L=!1,D=null,N=null,k=null,V=null,F=null,Ge.set(0,0,n.canvas.width,n.canvas.height),Ne.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:re,disable:Re,bindFramebuffer:Ue,drawBuffers:we,useProgram:$e,setBlending:He,setMaterial:We,setFlipSided:rt,setCullFace:lt,setLineWidth:ut,setPolygonOffset:pt,setScissorTest:tt,activeTexture:dt,bindTexture:O,unbindTexture:_t,compressedTexImage2D:ke,compressedTexImage3D:w,texImage2D:G,texImage3D:K,pixelStorei:ue,getParameter:pe,updateUBOMapping:ye,uniformBlockBinding:me,texStorage2D:J,texStorage3D:oe,texSubImage2D:f,texSubImage3D:P,compressedTexSubImage2D:U,compressedTexSubImage3D:z,scissor:he,viewport:ce,reset:Fe}}function P_(n,e,t,i,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap,m=new Set;let u;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(w,f){return _?new OffscreenCanvas(w,f):Vs("canvas")}function p(w,f,P){let U=1;const z=ke(w);if((z.width>P||z.height>P)&&(U=P/Math.max(z.width,z.height)),U<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const J=Math.floor(U*z.width),oe=Math.floor(U*z.height);u===void 0&&(u=S(J,oe));const G=f?S(J,oe):u;return G.width=J,G.height=oe,G.getContext("2d").drawImage(w,0,0,J,oe),Oe("WebGLRenderer: Texture has been resized from ("+z.width+"x"+z.height+") to ("+J+"x"+oe+")."),G}else return"data"in w&&Oe("WebGLRenderer: Image in DataTexture is too big ("+z.width+"x"+z.height+")."),w;return w}function d(w){return w.generateMipmaps}function b(w){n.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(w,f,P,U,z,J=!1){if(w!==null){if(n[w]!==void 0)return n[w];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let oe;U&&(oe=e.get("EXT_texture_norm16"),oe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let G=f;if(f===n.RED&&(P===n.FLOAT&&(G=n.R32F),P===n.HALF_FLOAT&&(G=n.R16F),P===n.UNSIGNED_BYTE&&(G=n.R8),P===n.UNSIGNED_SHORT&&oe&&(G=oe.R16_EXT),P===n.SHORT&&oe&&(G=oe.R16_SNORM_EXT)),f===n.RED_INTEGER&&(P===n.UNSIGNED_BYTE&&(G=n.R8UI),P===n.UNSIGNED_SHORT&&(G=n.R16UI),P===n.UNSIGNED_INT&&(G=n.R32UI),P===n.BYTE&&(G=n.R8I),P===n.SHORT&&(G=n.R16I),P===n.INT&&(G=n.R32I)),f===n.RG&&(P===n.FLOAT&&(G=n.RG32F),P===n.HALF_FLOAT&&(G=n.RG16F),P===n.UNSIGNED_BYTE&&(G=n.RG8),P===n.UNSIGNED_SHORT&&oe&&(G=oe.RG16_EXT),P===n.SHORT&&oe&&(G=oe.RG16_SNORM_EXT)),f===n.RG_INTEGER&&(P===n.UNSIGNED_BYTE&&(G=n.RG8UI),P===n.UNSIGNED_SHORT&&(G=n.RG16UI),P===n.UNSIGNED_INT&&(G=n.RG32UI),P===n.BYTE&&(G=n.RG8I),P===n.SHORT&&(G=n.RG16I),P===n.INT&&(G=n.RG32I)),f===n.RGB_INTEGER&&(P===n.UNSIGNED_BYTE&&(G=n.RGB8UI),P===n.UNSIGNED_SHORT&&(G=n.RGB16UI),P===n.UNSIGNED_INT&&(G=n.RGB32UI),P===n.BYTE&&(G=n.RGB8I),P===n.SHORT&&(G=n.RGB16I),P===n.INT&&(G=n.RGB32I)),f===n.RGBA_INTEGER&&(P===n.UNSIGNED_BYTE&&(G=n.RGBA8UI),P===n.UNSIGNED_SHORT&&(G=n.RGBA16UI),P===n.UNSIGNED_INT&&(G=n.RGBA32UI),P===n.BYTE&&(G=n.RGBA8I),P===n.SHORT&&(G=n.RGBA16I),P===n.INT&&(G=n.RGBA32I)),f===n.RGB&&(P===n.UNSIGNED_SHORT&&oe&&(G=oe.RGB16_EXT),P===n.SHORT&&oe&&(G=oe.RGB16_SNORM_EXT),P===n.UNSIGNED_INT_5_9_9_9_REV&&(G=n.RGB9_E5),P===n.UNSIGNED_INT_10F_11F_11F_REV&&(G=n.R11F_G11F_B10F)),f===n.RGBA){const K=J?Gs:je.getTransfer(z);P===n.FLOAT&&(G=n.RGBA32F),P===n.HALF_FLOAT&&(G=n.RGBA16F),P===n.UNSIGNED_BYTE&&(G=K===et?n.SRGB8_ALPHA8:n.RGBA8),P===n.UNSIGNED_SHORT&&oe&&(G=oe.RGBA16_EXT),P===n.SHORT&&oe&&(G=oe.RGBA16_SNORM_EXT),P===n.UNSIGNED_SHORT_4_4_4_4&&(G=n.RGBA4),P===n.UNSIGNED_SHORT_5_5_5_1&&(G=n.RGB5_A1)}return(G===n.R16F||G===n.R32F||G===n.RG16F||G===n.RG32F||G===n.RGBA16F||G===n.RGBA32F)&&e.get("EXT_color_buffer_float"),G}function R(w,f){let P;return w?f===null||f===un||f===ji?P=n.DEPTH24_STENCIL8:f===an?P=n.DEPTH32F_STENCIL8:f===qi&&(P=n.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):f===null||f===un||f===ji?P=n.DEPTH_COMPONENT24:f===an?P=n.DEPTH_COMPONENT32F:f===qi&&(P=n.DEPTH_COMPONENT16),P}function T(w,f){return d(w)===!0||w.isFramebufferTexture&&w.minFilter!==bt&&w.minFilter!==Rt?Math.log2(Math.max(f.width,f.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?f.mipmaps.length:1}function C(w){const f=w.target;f.removeEventListener("dispose",C),y(f),f.isVideoTexture&&h.delete(f),f.isHTMLTexture&&m.delete(f)}function x(w){const f=w.target;f.removeEventListener("dispose",x),D(f)}function y(w){const f=i.get(w);if(f.__webglInit===void 0)return;const P=w.source,U=g.get(P);if(U){const z=U[f.__cacheKey];z.usedTimes--,z.usedTimes===0&&L(w),Object.keys(U).length===0&&g.delete(P)}i.remove(w)}function L(w){const f=i.get(w);n.deleteTexture(f.__webglTexture);const P=w.source,U=g.get(P);delete U[f.__cacheKey],r.memory.textures--}function D(w){const f=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(f.__webglFramebuffer[U]))for(let z=0;z<f.__webglFramebuffer[U].length;z++)n.deleteFramebuffer(f.__webglFramebuffer[U][z]);else n.deleteFramebuffer(f.__webglFramebuffer[U]);f.__webglDepthbuffer&&n.deleteRenderbuffer(f.__webglDepthbuffer[U])}else{if(Array.isArray(f.__webglFramebuffer))for(let U=0;U<f.__webglFramebuffer.length;U++)n.deleteFramebuffer(f.__webglFramebuffer[U]);else n.deleteFramebuffer(f.__webglFramebuffer);if(f.__webglDepthbuffer&&n.deleteRenderbuffer(f.__webglDepthbuffer),f.__webglMultisampledFramebuffer&&n.deleteFramebuffer(f.__webglMultisampledFramebuffer),f.__webglColorRenderbuffer)for(let U=0;U<f.__webglColorRenderbuffer.length;U++)f.__webglColorRenderbuffer[U]&&n.deleteRenderbuffer(f.__webglColorRenderbuffer[U]);f.__webglDepthRenderbuffer&&n.deleteRenderbuffer(f.__webglDepthRenderbuffer)}const P=w.textures;for(let U=0,z=P.length;U<z;U++){const J=i.get(P[U]);J.__webglTexture&&(n.deleteTexture(J.__webglTexture),r.memory.textures--),i.remove(P[U])}i.remove(w)}let N=0;function k(){N=0}function V(){return N}function F(w){N=w}function q(){const w=N;return w>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),N+=1,w}function X(w){const f=[];return f.push(w.wrapS),f.push(w.wrapT),f.push(w.wrapR||0),f.push(w.magFilter),f.push(w.minFilter),f.push(w.anisotropy),f.push(w.internalFormat),f.push(w.format),f.push(w.type),f.push(w.generateMipmaps),f.push(w.premultiplyAlpha),f.push(w.flipY),f.push(w.unpackAlignment),f.push(w.colorSpace),f.join()}function Q(w,f){const P=i.get(w);if(w.isVideoTexture&&O(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&P.__version!==w.version){const U=w.image;if(U===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{Re(P,w,f);return}}else w.isExternalTexture&&(P.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,P.__webglTexture,n.TEXTURE0+f)}function ne(w,f){const P=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&P.__version!==w.version){Re(P,w,f);return}else w.isExternalTexture&&(P.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,P.__webglTexture,n.TEXTURE0+f)}function fe(w,f){const P=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&P.__version!==w.version){Re(P,w,f);return}t.bindTexture(n.TEXTURE_3D,P.__webglTexture,n.TEXTURE0+f)}function le(w,f){const P=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&P.__version!==w.version){Ue(P,w,f);return}t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+f)}const xe={[nr]:n.REPEAT,[Sn]:n.CLAMP_TO_EDGE,[ir]:n.MIRRORED_REPEAT},Pe={[bt]:n.NEAREST,[jd]:n.NEAREST_MIPMAP_NEAREST,[rs]:n.NEAREST_MIPMAP_LINEAR,[Rt]:n.LINEAR,[oa]:n.LINEAR_MIPMAP_NEAREST,[$n]:n.LINEAR_MIPMAP_LINEAR},Ge={[Zd]:n.NEVER,[th]:n.ALWAYS,[$d]:n.LESS,[Yr]:n.LEQUAL,[Jd]:n.EQUAL,[Kr]:n.GEQUAL,[Qd]:n.GREATER,[eh]:n.NOTEQUAL};function Ne(w,f){if(f.type===an&&e.has("OES_texture_float_linear")===!1&&(f.magFilter===Rt||f.magFilter===oa||f.magFilter===rs||f.magFilter===$n||f.minFilter===Rt||f.minFilter===oa||f.minFilter===rs||f.minFilter===$n)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,xe[f.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,xe[f.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,xe[f.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,Pe[f.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,Pe[f.minFilter]),f.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,Ge[f.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(f.magFilter===bt||f.minFilter!==rs&&f.minFilter!==$n||f.type===an&&e.has("OES_texture_float_linear")===!1)return;if(f.anisotropy>1||i.get(f).__currentAnisotropy){const P=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,P.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(f.anisotropy,s.getMaxAnisotropy())),i.get(f).__currentAnisotropy=f.anisotropy}}}function $(w,f){let P=!1;w.__webglInit===void 0&&(w.__webglInit=!0,f.addEventListener("dispose",C));const U=f.source;let z=g.get(U);z===void 0&&(z={},g.set(U,z));const J=X(f);if(J!==w.__cacheKey){z[J]===void 0&&(z[J]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,P=!0),z[J].usedTimes++;const oe=z[w.__cacheKey];oe!==void 0&&(z[w.__cacheKey].usedTimes--,oe.usedTimes===0&&L(f)),w.__cacheKey=J,w.__webglTexture=z[J].texture}return P}function ie(w,f,P){return Math.floor(Math.floor(w/P)/f)}function re(w,f,P,U){const J=w.updateRanges;if(J.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,f.width,f.height,P,U,f.data);else{J.sort((ue,he)=>ue.start-he.start);let oe=0;for(let ue=1;ue<J.length;ue++){const he=J[oe],ce=J[ue],ye=he.start+he.count,me=ie(ce.start,f.width,4),Fe=ie(he.start,f.width,4);ce.start<=ye+1&&me===Fe&&ie(ce.start+ce.count-1,f.width,4)===me?he.count=Math.max(he.count,ce.start+ce.count-he.start):(++oe,J[oe]=ce)}J.length=oe+1;const G=t.getParameter(n.UNPACK_ROW_LENGTH),K=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,f.width);for(let ue=0,he=J.length;ue<he;ue++){const ce=J[ue],ye=Math.floor(ce.start/4),me=Math.ceil(ce.count/4),Fe=ye%f.width,I=Math.floor(ye/f.width),ge=me,ee=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,Fe,I,ge,ee,P,U,f.data)}w.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,G),t.pixelStorei(n.UNPACK_SKIP_PIXELS,K),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function Re(w,f,P){let U=n.TEXTURE_2D;(f.isDataArrayTexture||f.isCompressedArrayTexture)&&(U=n.TEXTURE_2D_ARRAY),f.isData3DTexture&&(U=n.TEXTURE_3D);const z=$(w,f),J=f.source;t.bindTexture(U,w.__webglTexture,n.TEXTURE0+P);const oe=i.get(J);if(J.version!==oe.__version||z===!0){if(t.activeTexture(n.TEXTURE0+P),(typeof ImageBitmap<"u"&&f.image instanceof ImageBitmap)===!1){const ee=je.getPrimaries(je.workingColorSpace),_e=f.colorSpace===Bn?null:je.getPrimaries(f.colorSpace),ve=f.colorSpace===Bn||ee===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,f.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}t.pixelStorei(n.UNPACK_ALIGNMENT,f.unpackAlignment);let K=p(f.image,!1,s.maxTextureSize);K=_t(f,K);const pe=a.convert(f.format,f.colorSpace),ue=a.convert(f.type);let he=v(f.internalFormat,pe,ue,f.normalized,f.colorSpace,f.isVideoTexture);Ne(U,f);let ce;const ye=f.mipmaps,me=f.isVideoTexture!==!0,Fe=oe.__version===void 0||z===!0,I=J.dataReady,ge=T(f,K);if(f.isDepthTexture)he=R(f.format===Jn,f.type),Fe&&(me?t.texStorage2D(n.TEXTURE_2D,1,he,K.width,K.height):t.texImage2D(n.TEXTURE_2D,0,he,K.width,K.height,0,pe,ue,null));else if(f.isDataTexture)if(ye.length>0){me&&Fe&&t.texStorage2D(n.TEXTURE_2D,ge,he,ye[0].width,ye[0].height);for(let ee=0,_e=ye.length;ee<_e;ee++)ce=ye[ee],me?I&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,pe,ue,ce.data):t.texImage2D(n.TEXTURE_2D,ee,he,ce.width,ce.height,0,pe,ue,ce.data);f.generateMipmaps=!1}else me?(Fe&&t.texStorage2D(n.TEXTURE_2D,ge,he,K.width,K.height),I&&re(f,K,pe,ue)):t.texImage2D(n.TEXTURE_2D,0,he,K.width,K.height,0,pe,ue,K.data);else if(f.isCompressedTexture)if(f.isCompressedArrayTexture){me&&Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,he,ye[0].width,ye[0].height,K.depth);for(let ee=0,_e=ye.length;ee<_e;ee++)if(ce=ye[ee],f.format!==$t)if(pe!==null)if(me){if(I)if(f.layerUpdates.size>0){const ve=Jo(ce.width,ce.height,f.format,f.type);for(const se of f.layerUpdates){const De=ce.data.subarray(se*ve/ce.data.BYTES_PER_ELEMENT,(se+1)*ve/ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,se,ce.width,ce.height,1,pe,De)}f.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,K.depth,pe,ce.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,he,ce.width,ce.height,K.depth,0,ce.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else me?I&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,ce.width,ce.height,K.depth,pe,ue,ce.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,he,ce.width,ce.height,K.depth,0,pe,ue,ce.data)}else{me&&Fe&&t.texStorage2D(n.TEXTURE_2D,ge,he,ye[0].width,ye[0].height);for(let ee=0,_e=ye.length;ee<_e;ee++)ce=ye[ee],f.format!==$t?pe!==null?me?I&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,pe,ce.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,he,ce.width,ce.height,0,ce.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):me?I&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,ce.width,ce.height,pe,ue,ce.data):t.texImage2D(n.TEXTURE_2D,ee,he,ce.width,ce.height,0,pe,ue,ce.data)}else if(f.isDataArrayTexture)if(me){if(Fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,he,K.width,K.height,K.depth),I)if(f.layerUpdates.size>0){const ee=Jo(K.width,K.height,f.format,f.type);for(const _e of f.layerUpdates){const ve=K.data.subarray(_e*ee/K.data.BYTES_PER_ELEMENT,(_e+1)*ee/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,K.width,K.height,1,pe,ue,ve)}f.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,pe,ue,K.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,he,K.width,K.height,K.depth,0,pe,ue,K.data);else if(f.isData3DTexture)me?(Fe&&t.texStorage3D(n.TEXTURE_3D,ge,he,K.width,K.height,K.depth),I&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,pe,ue,K.data)):t.texImage3D(n.TEXTURE_3D,0,he,K.width,K.height,K.depth,0,pe,ue,K.data);else if(f.isFramebufferTexture){if(Fe)if(me)t.texStorage2D(n.TEXTURE_2D,ge,he,K.width,K.height);else{let ee=K.width,_e=K.height;for(let ve=0;ve<ge;ve++)t.texImage2D(n.TEXTURE_2D,ve,he,ee,_e,0,pe,ue,null),ee>>=1,_e>>=1}}else if(f.isHTMLTexture){if("texElementImage2D"in n){const ee=n.canvas;if(ee.hasAttribute("layoutsubtree")||ee.setAttribute("layoutsubtree","true"),K.parentNode!==ee){ee.appendChild(K),m.add(f),ee.onpaint=_e=>{const ve=_e.changedElements;for(const se of m)ve.includes(se.image)&&(se.needsUpdate=!0)},ee.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,K);else{const ve=n.RGBA,se=n.RGBA,De=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ve,se,De,K)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ye.length>0){if(me&&Fe){const ee=ke(ye[0]);t.texStorage2D(n.TEXTURE_2D,ge,he,ee.width,ee.height)}for(let ee=0,_e=ye.length;ee<_e;ee++)ce=ye[ee],me?I&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,pe,ue,ce):t.texImage2D(n.TEXTURE_2D,ee,he,pe,ue,ce);f.generateMipmaps=!1}else if(me){if(Fe){const ee=ke(K);t.texStorage2D(n.TEXTURE_2D,ge,he,ee.width,ee.height)}I&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,ue,K)}else t.texImage2D(n.TEXTURE_2D,0,he,pe,ue,K);d(f)&&b(U),oe.__version=J.version,f.onUpdate&&f.onUpdate(f)}w.__version=f.version}function Ue(w,f,P){if(f.image.length!==6)return;const U=$(w,f),z=f.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+P);const J=i.get(z);if(z.version!==J.__version||U===!0){t.activeTexture(n.TEXTURE0+P);const oe=je.getPrimaries(je.workingColorSpace),G=f.colorSpace===Bn?null:je.getPrimaries(f.colorSpace),K=f.colorSpace===Bn||oe===G?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,f.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,f.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,f.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const pe=f.isCompressedTexture||f.image[0].isCompressedTexture,ue=f.image[0]&&f.image[0].isDataTexture,he=[];for(let se=0;se<6;se++)!pe&&!ue?he[se]=p(f.image[se],!0,s.maxCubemapSize):he[se]=ue?f.image[se].image:f.image[se],he[se]=_t(f,he[se]);const ce=he[0],ye=a.convert(f.format,f.colorSpace),me=a.convert(f.type),Fe=v(f.internalFormat,ye,me,f.normalized,f.colorSpace),I=f.isVideoTexture!==!0,ge=J.__version===void 0||U===!0,ee=z.dataReady;let _e=T(f,ce);Ne(n.TEXTURE_CUBE_MAP,f);let ve;if(pe){I&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Fe,ce.width,ce.height);for(let se=0;se<6;se++){ve=he[se].mipmaps;for(let De=0;De<ve.length;De++){const Ce=ve[De];f.format!==$t?ye!==null?I?ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,0,0,Ce.width,Ce.height,ye,Ce.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,Fe,Ce.width,Ce.height,0,Ce.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,0,0,Ce.width,Ce.height,ye,me,Ce.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De,Fe,Ce.width,Ce.height,0,ye,me,Ce.data)}}}else{if(ve=f.mipmaps,I&&ge){ve.length>0&&_e++;const se=ke(he[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Fe,se.width,se.height)}for(let se=0;se<6;se++)if(ue){I?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,he[se].width,he[se].height,ye,me,he[se].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Fe,he[se].width,he[se].height,0,ye,me,he[se].data);for(let De=0;De<ve.length;De++){const nt=ve[De].image[se].image;I?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,0,0,nt.width,nt.height,ye,me,nt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,Fe,nt.width,nt.height,0,ye,me,nt.data)}}else{I?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,ye,me,he[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Fe,ye,me,he[se]);for(let De=0;De<ve.length;De++){const Ce=ve[De];I?ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,0,0,ye,me,Ce.image[se]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+se,De+1,Fe,ye,me,Ce.image[se])}}}d(f)&&b(n.TEXTURE_CUBE_MAP),J.__version=z.version,f.onUpdate&&f.onUpdate(f)}w.__version=f.version}function we(w,f,P,U,z,J){const oe=a.convert(P.format,P.colorSpace),G=a.convert(P.type),K=v(P.internalFormat,oe,G,P.normalized,P.colorSpace),pe=i.get(f),ue=i.get(P);if(ue.__renderTarget=f,!pe.__hasExternalTextures){const he=Math.max(1,f.width>>J),ce=Math.max(1,f.height>>J);z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?t.texImage3D(z,J,K,he,ce,f.depth,0,oe,G,null):t.texImage2D(z,J,K,he,ce,0,oe,G,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),dt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,U,z,ue.__webglTexture,0,tt(f)):(z===n.TEXTURE_2D||z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,U,z,ue.__webglTexture,J),t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(w,f,P){if(n.bindRenderbuffer(n.RENDERBUFFER,w),f.depthBuffer){const U=f.depthTexture,z=U&&U.isDepthTexture?U.type:null,J=R(f.stencilBuffer,z),oe=f.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;dt(f)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,tt(f),J,f.width,f.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,tt(f),J,f.width,f.height):n.renderbufferStorage(n.RENDERBUFFER,J,f.width,f.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,w)}else{const U=f.textures;for(let z=0;z<U.length;z++){const J=U[z],oe=a.convert(J.format,J.colorSpace),G=a.convert(J.type),K=v(J.internalFormat,oe,G,J.normalized,J.colorSpace);dt(f)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,tt(f),K,f.width,f.height):P?n.renderbufferStorageMultisample(n.RENDERBUFFER,tt(f),K,f.width,f.height):n.renderbufferStorage(n.RENDERBUFFER,K,f.width,f.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ie(w,f,P){const U=f.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(f.depthTexture&&f.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const z=i.get(f.depthTexture);if(z.__renderTarget=f,(!z.__webglTexture||f.depthTexture.image.width!==f.width||f.depthTexture.image.height!==f.height)&&(f.depthTexture.image.width=f.width,f.depthTexture.image.height=f.height,f.depthTexture.needsUpdate=!0),U){if(z.__webglInit===void 0&&(z.__webglInit=!0,f.depthTexture.addEventListener("dispose",C)),z.__webglTexture===void 0){z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),Ne(n.TEXTURE_CUBE_MAP,f.depthTexture);const pe=a.convert(f.depthTexture.format),ue=a.convert(f.depthTexture.type);let he;f.depthTexture.format===Tn?he=n.DEPTH_COMPONENT24:f.depthTexture.format===Jn&&(he=n.DEPTH24_STENCIL8);for(let ce=0;ce<6;ce++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,he,f.width,f.height,0,pe,ue,null)}}else Q(f.depthTexture,0);const J=z.__webglTexture,oe=tt(f),G=U?n.TEXTURE_CUBE_MAP_POSITIVE_X+P:n.TEXTURE_2D,K=f.depthTexture.format===Jn?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(f.depthTexture.format===Tn)dt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,G,J,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,K,G,J,0);else if(f.depthTexture.format===Jn)dt(f)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,G,J,0,oe):n.framebufferTexture2D(n.FRAMEBUFFER,K,G,J,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qe(w){const f=i.get(w),P=w.isWebGLCubeRenderTarget===!0;if(f.__boundDepthTexture!==w.depthTexture){const U=w.depthTexture;if(f.__depthDisposeCallback&&f.__depthDisposeCallback(),U){const z=()=>{delete f.__boundDepthTexture,delete f.__depthDisposeCallback,U.removeEventListener("dispose",z)};U.addEventListener("dispose",z),f.__depthDisposeCallback=z}f.__boundDepthTexture=U}if(w.depthTexture&&!f.__autoAllocateDepthBuffer)if(P)for(let U=0;U<6;U++)Ie(f.__webglFramebuffer[U],w,U);else{const U=w.texture.mipmaps;U&&U.length>0?Ie(f.__webglFramebuffer[0],w,0):Ie(f.__webglFramebuffer,w,0)}else if(P){f.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer[U]),f.__webglDepthbuffer[U]===void 0)f.__webglDepthbuffer[U]=n.createRenderbuffer(),$e(f.__webglDepthbuffer[U],w,!1);else{const z=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=f.__webglDepthbuffer[U];n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,J)}}else{const U=w.texture.mipmaps;if(U&&U.length>0?t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,f.__webglFramebuffer),f.__webglDepthbuffer===void 0)f.__webglDepthbuffer=n.createRenderbuffer(),$e(f.__webglDepthbuffer,w,!1);else{const z=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,J=f.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,J),n.framebufferRenderbuffer(n.FRAMEBUFFER,z,n.RENDERBUFFER,J)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function He(w,f,P){const U=i.get(w);f!==void 0&&we(U.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),P!==void 0&&qe(w)}function We(w){const f=w.texture,P=i.get(w),U=i.get(f);w.addEventListener("dispose",x);const z=w.textures,J=w.isWebGLCubeRenderTarget===!0,oe=z.length>1;if(oe||(U.__webglTexture===void 0&&(U.__webglTexture=n.createTexture()),U.__version=f.version,r.memory.textures++),J){P.__webglFramebuffer=[];for(let G=0;G<6;G++)if(f.mipmaps&&f.mipmaps.length>0){P.__webglFramebuffer[G]=[];for(let K=0;K<f.mipmaps.length;K++)P.__webglFramebuffer[G][K]=n.createFramebuffer()}else P.__webglFramebuffer[G]=n.createFramebuffer()}else{if(f.mipmaps&&f.mipmaps.length>0){P.__webglFramebuffer=[];for(let G=0;G<f.mipmaps.length;G++)P.__webglFramebuffer[G]=n.createFramebuffer()}else P.__webglFramebuffer=n.createFramebuffer();if(oe)for(let G=0,K=z.length;G<K;G++){const pe=i.get(z[G]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),r.memory.textures++)}if(w.samples>0&&dt(w)===!1){P.__webglMultisampledFramebuffer=n.createFramebuffer(),P.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,P.__webglMultisampledFramebuffer);for(let G=0;G<z.length;G++){const K=z[G];P.__webglColorRenderbuffer[G]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,P.__webglColorRenderbuffer[G]);const pe=a.convert(K.format,K.colorSpace),ue=a.convert(K.type),he=v(K.internalFormat,pe,ue,K.normalized,K.colorSpace,w.isXRRenderTarget===!0),ce=tt(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,he,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+G,n.RENDERBUFFER,P.__webglColorRenderbuffer[G])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(P.__webglDepthRenderbuffer=n.createRenderbuffer(),$e(P.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(J){t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture),Ne(n.TEXTURE_CUBE_MAP,f);for(let G=0;G<6;G++)if(f.mipmaps&&f.mipmaps.length>0)for(let K=0;K<f.mipmaps.length;K++)we(P.__webglFramebuffer[G][K],w,f,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+G,K);else we(P.__webglFramebuffer[G],w,f,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+G,0);d(f)&&b(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let G=0,K=z.length;G<K;G++){const pe=z[G],ue=i.get(pe);let he=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(he=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(he,ue.__webglTexture),Ne(he,pe),we(P.__webglFramebuffer,w,pe,n.COLOR_ATTACHMENT0+G,he,0),d(pe)&&b(he)}t.unbindTexture()}else{let G=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(G=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(G,U.__webglTexture),Ne(G,f),f.mipmaps&&f.mipmaps.length>0)for(let K=0;K<f.mipmaps.length;K++)we(P.__webglFramebuffer[K],w,f,n.COLOR_ATTACHMENT0,G,K);else we(P.__webglFramebuffer,w,f,n.COLOR_ATTACHMENT0,G,0);d(f)&&b(G),t.unbindTexture()}w.depthBuffer&&qe(w)}function rt(w){const f=w.textures;for(let P=0,U=f.length;P<U;P++){const z=f[P];if(d(z)){const J=A(w),oe=i.get(z).__webglTexture;t.bindTexture(J,oe),b(J),t.unbindTexture()}}}const lt=[],ut=[];function pt(w){if(w.samples>0){if(dt(w)===!1){const f=w.textures,P=w.width,U=w.height;let z=n.COLOR_BUFFER_BIT;const J=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(w),G=f.length>1;if(G)for(let pe=0;pe<f.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);const K=w.texture.mipmaps;K&&K.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let pe=0;pe<f.length;pe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(z|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(z|=n.STENCIL_BUFFER_BIT)),G){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const ue=i.get(f[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,P,U,0,0,P,U,z,n.NEAREST),c===!0&&(lt.length=0,ut.length=0,lt.push(n.COLOR_ATTACHMENT0+pe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(lt.push(J),ut.push(J),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ut)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),G)for(let pe=0;pe<f.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,oe.__webglColorRenderbuffer[pe]);const ue=i.get(f[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const f=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[f])}}}function tt(w){return Math.min(s.maxSamples,w.samples)}function dt(w){const f=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&f.__useRenderToTexture!==!1}function O(w){const f=r.render.frame;h.get(w)!==f&&(h.set(w,f),w.update())}function _t(w,f){const P=w.colorSpace,U=w.format,z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||P!==zs&&P!==Bn&&(je.getTransfer(P)===et?(U!==$t||z!==Xt)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",P)),f}function ke(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=q,this.resetTextureUnits=k,this.getTextureUnits=V,this.setTextureUnits=F,this.setTexture2D=Q,this.setTexture2DArray=ne,this.setTexture3D=fe,this.setTextureCube=le,this.rebindTextures=He,this.setupRenderTarget=We,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=pt,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=we,this.useMultisampledRTT=dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function D_(n,e){function t(i,s=Bn){let a;const r=je.getTransfer(s);if(i===Xt)return n.UNSIGNED_BYTE;if(i===Hr)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wr)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ac)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===rc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===ic)return n.BYTE;if(i===sc)return n.SHORT;if(i===qi)return n.UNSIGNED_SHORT;if(i===Vr)return n.INT;if(i===un)return n.UNSIGNED_INT;if(i===an)return n.FLOAT;if(i===yn)return n.HALF_FLOAT;if(i===oc)return n.ALPHA;if(i===lc)return n.RGB;if(i===$t)return n.RGBA;if(i===Tn)return n.DEPTH_COMPONENT;if(i===Jn)return n.DEPTH_STENCIL;if(i===cc)return n.RED;if(i===Xr)return n.RED_INTEGER;if(i===ei)return n.RG;if(i===qr)return n.RG_INTEGER;if(i===jr)return n.RGBA_INTEGER;if(i===Ds||i===Ls||i===Ns||i===Is)if(r===et)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Ds)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ls)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ns)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Is)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Ds)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ls)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ns)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Is)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sr||i===ar||i===rr||i===or)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===sr)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ar)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rr)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===or)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lr||i===cr||i===ur||i===dr||i===hr||i===Os||i===fr)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===lr||i===cr)return r===et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===ur)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===dr)return a.COMPRESSED_R11_EAC;if(i===hr)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Os)return a.COMPRESSED_RG11_EAC;if(i===fr)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===pr||i===mr||i===gr||i===_r||i===xr||i===vr||i===Mr||i===Sr||i===Er||i===br||i===yr||i===Tr||i===Ar||i===Rr)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===pr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_r)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===xr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Mr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Er)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===br)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===yr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ar)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Rr)return r===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===wr||i===Cr||i===Pr)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===wr)return r===et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Cr)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pr)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dr||i===Lr||i===Bs||i===Nr)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Dr)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Lr)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bs)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Nr)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ji?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const L_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,N_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class I_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new _c(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new hn({vertexShader:L_,fragmentShader:N_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dn(new qs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class U_ extends Hn{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",c=1,l=null,h=null,m=null,u=null,g=null,_=null;const S=typeof XRWebGLBinding<"u",p=new I_,d={},b=t.getContextAttributes();let A=null,v=null;const R=[],T=[],C=new ze;let x=null;const y=new Wt;y.viewport=new ft;const L=new Wt;L.viewport=new ft;const D=[y,L],N=new Vh;let k=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ie=R[$];return ie===void 0&&(ie=new pa,R[$]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function($){let ie=R[$];return ie===void 0&&(ie=new pa,R[$]=ie),ie.getGripSpace()},this.getHand=function($){let ie=R[$];return ie===void 0&&(ie=new pa,R[$]=ie),ie.getHandSpace()};function F($){const ie=T.indexOf($.inputSource);if(ie===-1)return;const re=R[ie];re!==void 0&&(re.update($.inputSource,$.frame,l||r),re.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",X);for(let $=0;$<R.length;$++){const ie=T[$];ie!==null&&(T[$]=null,R[$].disconnect(ie))}k=null,V=null,p.reset();for(const $ in d)delete d[$];e.setRenderTarget(A),g=null,u=null,m=null,s=null,v=null,Ne.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){a=$,i.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:g},this.getBinding=function(){return m===null&&S&&(m=new XRWebGLBinding(s,t)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",q),s.addEventListener("inputsourceschange",X),b.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(C),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Re=null,Ue=null;b.depth&&(Ue=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=b.stencil?Jn:Tn,Re=b.stencil?ji:un);const we={colorFormat:t.RGBA8,depthFormat:Ue,scaleFactor:a};m=this.getBinding(),u=m.createProjectionLayer(we),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new ln(u.textureWidth,u.textureHeight,{format:$t,type:Xt,depthTexture:new Ci(u.textureWidth,u.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const re={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:a};g=new XRWebGLLayer(s,t,re),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),v=new ln(g.framebufferWidth,g.framebufferHeight,{format:$t,type:Xt,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await s.requestReferenceSpace(o),Ne.setContext(s),Ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function X($){for(let ie=0;ie<$.removed.length;ie++){const re=$.removed[ie],Re=T.indexOf(re);Re>=0&&(T[Re]=null,R[Re].disconnect(re))}for(let ie=0;ie<$.added.length;ie++){const re=$.added[ie];let Re=T.indexOf(re);if(Re===-1){for(let we=0;we<R.length;we++)if(we>=T.length){T.push(re),Re=we;break}else if(T[we]===null){T[we]=re,Re=we;break}if(Re===-1)break}const Ue=R[Re];Ue&&Ue.connect(re)}}const Q=new W,ne=new W;function fe($,ie,re){Q.setFromMatrixPosition(ie.matrixWorld),ne.setFromMatrixPosition(re.matrixWorld);const Re=Q.distanceTo(ne),Ue=ie.projectionMatrix.elements,we=re.projectionMatrix.elements,$e=Ue[14]/(Ue[10]-1),Ie=Ue[14]/(Ue[10]+1),qe=(Ue[9]+1)/Ue[5],He=(Ue[9]-1)/Ue[5],We=(Ue[8]-1)/Ue[0],rt=(we[8]+1)/we[0],lt=$e*We,ut=$e*rt,pt=Re/(-We+rt),tt=pt*-We;if(ie.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(tt),$.translateZ(pt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ue[10]===-1)$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const dt=$e+pt,O=Ie+pt,_t=lt-tt,ke=ut+(Re-tt),w=qe*Ie/O*dt,f=He*Ie/O*dt;$.projectionMatrix.makePerspective(_t,ke,w,f,dt,O),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function le($,ie){ie===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ie.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ie=$.near,re=$.far;p.texture!==null&&(p.depthNear>0&&(ie=p.depthNear),p.depthFar>0&&(re=p.depthFar)),N.near=L.near=y.near=ie,N.far=L.far=y.far=re,(k!==N.near||V!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),k=N.near,V=N.far),N.layers.mask=$.layers.mask|6,y.layers.mask=N.layers.mask&-5,L.layers.mask=N.layers.mask&-3;const Re=$.parent,Ue=N.cameras;le(N,Re);for(let we=0;we<Ue.length;we++)le(Ue[we],Re);Ue.length===2?fe(N,y,L):N.projectionMatrix.copy(y.projectionMatrix),xe($,N,Re)};function xe($,ie,re){re===null?$.matrix.copy(ie.matrixWorld):($.matrix.copy(re.matrixWorld),$.matrix.invert(),$.matrix.multiply(ie.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ie.projectionMatrix),$.projectionMatrixInverse.copy(ie.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ir*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&g===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(N)},this.getCameraTexture=function($){return d[$]};let Pe=null;function Ge($,ie){if(h=ie.getViewerPose(l||r),_=ie,h!==null){const re=h.views;g!==null&&(e.setRenderTargetFramebuffer(v,g.framebuffer),e.setRenderTarget(v));let Re=!1;re.length!==N.cameras.length&&(N.cameras.length=0,Re=!0);for(let Ie=0;Ie<re.length;Ie++){const qe=re[Ie];let He=null;if(g!==null)He=g.getViewport(qe);else{const rt=m.getViewSubImage(u,qe);He=rt.viewport,Ie===0&&(e.setRenderTargetTextures(v,rt.colorTexture,rt.depthStencilTexture),e.setRenderTarget(v))}let We=D[Ie];We===void 0&&(We=new Wt,We.layers.enable(Ie),We.viewport=new ft,D[Ie]=We),We.matrix.fromArray(qe.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(qe.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(He.x,He.y,He.width,He.height),Ie===0&&(N.matrix.copy(We.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Re===!0&&N.cameras.push(We)}const Ue=s.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){m=i.getBinding();const Ie=m.getDepthInformation(re[0]);Ie&&Ie.isValid&&Ie.texture&&p.init(Ie,s.renderState)}if(Ue&&Ue.includes("camera-access")&&S){e.state.unbindTexture(),m=i.getBinding();for(let Ie=0;Ie<re.length;Ie++){const qe=re[Ie].camera;if(qe){let He=d[qe];He||(He=new _c,d[qe]=He);const We=m.getCameraImage(qe);He.sourceTexture=We}}}}for(let re=0;re<R.length;re++){const Re=T[re],Ue=R[re];Re!==null&&Ue!==void 0&&Ue.update(Re,ie,l||r)}Pe&&Pe($,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),_=null}const Ne=new Sc;Ne.setAnimationLoop(Ge),this.setAnimationLoop=function($){Pe=$},this.dispose=function(){}}}const F_=new gt,wc=new Be;wc.set(-1,0,0,0,1,0,0,0,1);function O_(n,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,xc(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,b,A,v){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?a(p,d):d.isMeshLambertMaterial?(a(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(a(p,d),m(p,d)):d.isMeshPhongMaterial?(a(p,d),h(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(a(p,d),u(p,d),d.isMeshPhysicalMaterial&&g(p,d,v)):d.isMeshMatcapMaterial?(a(p,d),_(p,d)):d.isMeshDepthMaterial?a(p,d):d.isMeshDistanceMaterial?(a(p,d),S(p,d)):d.isMeshNormalMaterial?a(p,d):d.isLineBasicMaterial?(r(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,b,A):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function a(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===It&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===It&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const b=e.get(d),A=b.envMap,v=b.envMapRotation;A&&(p.envMap.value=A,p.envMapRotation.value.setFromMatrix4(F_.makeRotationFromEuler(v)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(wc),p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function r(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,b,A){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*b,p.scale.value=A*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function m(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function u(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function g(p,d,b){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===It&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,d){d.matcap&&(p.matcap.value=d.matcap)}function S(p,d){const b=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function B_(n,e,t,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,R){const T=R.program;i.uniformBlockBinding(v,T)}function l(v,R){let T=s[v.id];T===void 0&&(p(v),T=h(v),s[v.id]=T,v.addEventListener("dispose",b));const C=R.program;i.updateUBOMapping(v,C);const x=e.render.frame;a[v.id]!==x&&(u(v),a[v.id]=x)}function h(v){const R=m();v.__bindingPointIndex=R;const T=n.createBuffer(),C=v.__size,x=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,C,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,T),T}function m(){for(let v=0;v<o;v++)if(r.indexOf(v)===-1)return r.push(v),v;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const R=s[v.id],T=v.uniforms,C=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let x=0,y=T.length;x<y;x++){const L=T[x];if(Array.isArray(L))for(let D=0,N=L.length;D<N;D++)g(L[D],x,D,C);else g(L,x,0,C)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(v,R,T,C){if(S(v,R,T,C)===!0){const x=v.__offset,y=v.value;if(Array.isArray(y)){let L=0;for(let D=0;D<y.length;D++){const N=y[D],k=d(N);_(N,v.__data,L),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(L+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(y,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,v.__data)}}function _(v,R,T){typeof v=="number"||typeof v=="boolean"?R[0]=v:v.isMatrix3?(R[0]=v.elements[0],R[1]=v.elements[1],R[2]=v.elements[2],R[3]=0,R[4]=v.elements[3],R[5]=v.elements[4],R[6]=v.elements[5],R[7]=0,R[8]=v.elements[6],R[9]=v.elements[7],R[10]=v.elements[8],R[11]=0):ArrayBuffer.isView(v)?R.set(new v.constructor(v.buffer,v.byteOffset,R.length)):v.toArray(R,T)}function S(v,R,T,C){const x=v.value,y=R+"_"+T;if(C[y]===void 0)return typeof x=="number"||typeof x=="boolean"?C[y]=x:ArrayBuffer.isView(x)?C[y]=x.slice():C[y]=x.clone(),!0;{const L=C[y];if(typeof x=="number"||typeof x=="boolean"){if(L!==x)return C[y]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(L.equals(x)===!1)return L.copy(x),!0}}return!1}function p(v){const R=v.uniforms;let T=0;const C=16;for(let y=0,L=R.length;y<L;y++){const D=Array.isArray(R[y])?R[y]:[R[y]];for(let N=0,k=D.length;N<k;N++){const V=D[N],F=Array.isArray(V.value)?V.value:[V.value];for(let q=0,X=F.length;q<X;q++){const Q=F[q],ne=d(Q),fe=T%C,le=fe%ne.boundary,xe=fe+le;T+=le,xe!==0&&C-xe<ne.storage&&(T+=C-xe),V.__data=new Float32Array(ne.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=T,T+=ne.storage}}}const x=T%C;return x>0&&(T+=C-x),v.__size=T,v.__cache={},this}function d(v){const R={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(R.boundary=4,R.storage=4):v.isVector2?(R.boundary=8,R.storage=8):v.isVector3||v.isColor?(R.boundary=16,R.storage=12):v.isVector4?(R.boundary=16,R.storage=16):v.isMatrix3?(R.boundary=48,R.storage=48):v.isMatrix4?(R.boundary=64,R.storage=64):v.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(R.boundary=16,R.storage=v.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",v),R}function b(v){const R=v.target;R.removeEventListener("dispose",b);const T=r.indexOf(R.__bindingPointIndex);r.splice(T,1),n.deleteBuffer(s[R.id]),delete s[R.id],delete a[R.id]}function A(){for(const v in s)n.deleteBuffer(s[v]);r=[],s={},a={}}return{bind:c,update:l,dispose:A}}const z_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let en=null;function G_(){return en===null&&(en=new Rh(z_,16,16,ei,yn),en.name="DFG_LUT",en.minFilter=Rt,en.magFilter=Rt,en.wrapS=Sn,en.wrapT=Sn,en.generateMipmaps=!1,en.needsUpdate=!0),en}class k_{constructor(e={}){const{canvas:t=ih(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:u=!1,outputBufferType:g=Xt}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=r;const S=g,p=new Set([jr,qr,Xr]),d=new Set([Xt,un,qi,ji,Hr,Wr]),b=new Uint32Array(4),A=new Int32Array(4),v=new W;let R=null,T=null;const C=[],x=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=on,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let D=!1,N=null,k=null,V=null,F=null;this._outputColorSpace=Ht;let q=0,X=0,Q=null,ne=-1,fe=null;const le=new ft,xe=new ft;let Pe=null;const Ge=new Je(0);let Ne=0,$=t.width,ie=t.height,re=1,Re=null,Ue=null;const we=new ft(0,0,$,ie),$e=new ft(0,0,$,ie);let Ie=!1;const qe=new mc;let He=!1,We=!1;const rt=new gt,lt=new W,ut=new ft,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function dt(){return Q===null?re:1}let O=i;function _t(E,B){return t.getContext(E,B)}try{const E={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:m};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${kr}`),t.addEventListener("webglcontextlost",nt,!1),t.addEventListener("webglcontextrestored",Qe,!1),t.addEventListener("webglcontextcreationerror",zt,!1),O===null){const B="webgl2";if(O=_t(B,E),O===null)throw _t(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw Ke("WebGLRenderer: "+E.message),E}let ke,w,f,P,U,z,J,oe,G,K,pe,ue,he,ce,ye,me,Fe,I,ge,ee,_e,ve,se;function De(){ke=new Gm(O),ke.init(),_e=new D_(O,ke),w=new Lm(O,ke,e,_e),f=new C_(O,ke),w.reversedDepthBuffer&&u&&f.buffers.depth.setReversed(!0),k=O.createFramebuffer(),V=O.createFramebuffer(),F=O.createFramebuffer(),P=new Hm(O),U=new m_,z=new P_(O,ke,f,U,w,_e,P),J=new zm(L),oe=new qh(O),ve=new Pm(O,oe),G=new km(O,oe,P,ve),K=new Xm(O,G,oe,ve,P),I=new Wm(O,w,z),ye=new Nm(U),pe=new p_(L,J,ke,w,ve,ye),ue=new O_(L,U),he=new __,ce=new b_(ke),Fe=new Cm(L,J,f,K,_,c),me=new w_(L,K,w),se=new B_(O,P,w,f),ge=new Dm(O,ke,P),ee=new Vm(O,ke,P),P.programs=pe.programs,L.capabilities=w,L.extensions=ke,L.properties=U,L.renderLists=he,L.shadowMap=me,L.state=f,L.info=P}De(),S!==Xt&&(y=new jm(S,t.width,t.height,o,s,a));const Ce=new U_(L,O);this.xr=Ce,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=ke.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ke.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(E){E!==void 0&&(re=E,this.setSize($,ie,!1))},this.getSize=function(E){return E.set($,ie)},this.setSize=function(E,B,Z=!0){if(Ce.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,ie=B,t.width=Math.floor(E*re),t.height=Math.floor(B*re),Z===!0&&(t.style.width=E+"px",t.style.height=B+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,E,B)},this.getDrawingBufferSize=function(E){return E.set($*re,ie*re).floor()},this.setDrawingBufferSize=function(E,B,Z){$=E,ie=B,re=Z,t.width=Math.floor(E*Z),t.height=Math.floor(B*Z),this.setViewport(0,0,E,B)},this.setEffects=function(E){if(S===Xt){Ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let B=0;B<E.length;B++)if(E[B].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(le)},this.getViewport=function(E){return E.copy(we)},this.setViewport=function(E,B,Z,j){E.isVector4?we.set(E.x,E.y,E.z,E.w):we.set(E,B,Z,j),f.viewport(le.copy(we).multiplyScalar(re).round())},this.getScissor=function(E){return E.copy($e)},this.setScissor=function(E,B,Z,j){E.isVector4?$e.set(E.x,E.y,E.z,E.w):$e.set(E,B,Z,j),f.scissor(xe.copy($e).multiplyScalar(re).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(E){f.setScissorTest(Ie=E)},this.setOpaqueSort=function(E){Re=E},this.setTransparentSort=function(E){Ue=E},this.getClearColor=function(E){return E.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(E=!0,B=!0,Z=!0){let j=0;if(E){let Y=!1;if(Q!==null){const Me=Q.texture.format;Y=p.has(Me)}if(Y){const Me=Q.texture.type,be=d.has(Me),H=Fe.getClearColor(),te=Fe.getClearAlpha(),de=H.r,Le=H.g,Te=H.b;be?(b[0]=de,b[1]=Le,b[2]=Te,b[3]=te,O.clearBufferuiv(O.COLOR,0,b)):(A[0]=de,A[1]=Le,A[2]=Te,A[3]=te,O.clearBufferiv(O.COLOR,0,A))}else j|=O.COLOR_BUFFER_BIT}B&&(j|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(j|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&O.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),N=E},this.dispose=function(){t.removeEventListener("webglcontextlost",nt,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",zt,!1),Fe.dispose(),he.dispose(),ce.dispose(),U.dispose(),J.dispose(),K.dispose(),ve.dispose(),se.dispose(),pe.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",Ji),Ce.removeEventListener("sessionend",Wn),pn.stop()};function nt(E){E.preventDefault(),Po("WebGLRenderer: Context Lost."),D=!0}function Qe(){Po("WebGLRenderer: Context Restored."),D=!1;const E=P.autoReset,B=me.enabled,Z=me.autoUpdate,j=me.needsUpdate,Y=me.type;De(),P.autoReset=E,me.enabled=B,me.autoUpdate=Z,me.needsUpdate=j,me.type=Y}function zt(E){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Gt(E){const B=E.target;B.removeEventListener("dispose",Gt),An(B)}function An(E){Ks(E),U.remove(E)}function Ks(E){const B=U.get(E).programs;B!==void 0&&(B.forEach(function(Z){pe.releaseProgram(Z)}),E.isShaderMaterial&&pe.releaseShaderCache(E))}this.renderBufferDirect=function(E,B,Z,j,Y,Me){B===null&&(B=pt);const be=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,H=$s(E,B,Z,j,Y);f.setMaterial(j,be);let te=Z.index,de=1;if(j.wireframe===!0){if(te=G.getWireframeAttribute(Z),te===void 0)return;de=2}const Le=Z.drawRange,Te=Z.attributes.position;let Ee=Le.start*de,Ye=(Le.start+Le.count)*de;Me!==null&&(Ee=Math.max(Ee,Me.start*de),Ye=Math.min(Ye,(Me.start+Me.count)*de)),te!==null?(Ee=Math.max(Ee,0),Ye=Math.min(Ye,te.count)):Te!=null&&(Ee=Math.max(Ee,0),Ye=Math.min(Ye,Te.count));const ct=Ye-Ee;if(ct<0||ct===1/0)return;ve.setup(Y,j,H,Z,te);let ht,st=ge;if(te!==null&&(ht=oe.get(te),st=ee,st.setIndex(ht)),Y.isMesh)j.wireframe===!0?(f.setLineWidth(j.wireframeLinewidth*dt()),st.setMode(O.LINES)):st.setMode(O.TRIANGLES);else if(Y.isLine){let yt=j.linewidth;yt===void 0&&(yt=1),f.setLineWidth(yt*dt()),Y.isLineSegments?st.setMode(O.LINES):Y.isLineLoop?st.setMode(O.LINE_LOOP):st.setMode(O.LINE_STRIP)}else Y.isPoints?st.setMode(O.POINTS):Y.isSprite&&st.setMode(O.TRIANGLES);if(Y.isBatchedMesh)if(ke.get("WEBGL_multi_draw"))st.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const yt=Y._multiDrawStarts,Ae=Y._multiDrawCounts,Ft=Y._multiDrawCount,Ze=te?oe.get(te).bytesPerElement:1,kt=U.get(j).currentProgram.getUniforms();for(let Jt=0;Jt<Ft;Jt++)kt.setValue(O,"_gl_DrawID",Jt),st.render(yt[Jt]/Ze,Ae[Jt])}else if(Y.isInstancedMesh)st.renderInstances(Ee,ct,Y.count);else if(Z.isInstancedBufferGeometry){const yt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ae=Math.min(Z.instanceCount,yt);st.renderInstances(Ee,ct,Ae)}else st.render(Ee,ct)};function Li(E,B,Z){E.transparent===!0&&E.side===Mn&&E.forceSinglePass===!1?(E.side=It,E.needsUpdate=!0,ii(E,B,Z),E.side=kn,E.needsUpdate=!0,ii(E,B,Z),E.side=Mn):ii(E,B,Z)}this.compile=function(E,B,Z=null){Z===null&&(Z=E),T=ce.get(Z),T.init(B),x.push(T),Z.traverseVisible(function(Y){Y.isLight&&Y.layers.test(B.layers)&&(T.pushLight(Y),Y.castShadow&&T.pushShadow(Y))}),E!==Z&&E.traverseVisible(function(Y){Y.isLight&&Y.layers.test(B.layers)&&(T.pushLight(Y),Y.castShadow&&T.pushShadow(Y))}),T.setupLights();const j=new Set;return E.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Me=Y.material;if(Me)if(Array.isArray(Me))for(let be=0;be<Me.length;be++){const H=Me[be];Li(H,Z,Y),j.add(H)}else Li(Me,Z,Y),j.add(Me)}),T=x.pop(),j},this.compileAsync=function(E,B,Z=null){const j=this.compile(E,B,Z);return new Promise(Y=>{function Me(){if(j.forEach(function(be){U.get(be).currentProgram.isReady()&&j.delete(be)}),j.size===0){Y(E);return}setTimeout(Me,10)}ke.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Ni=null;function $i(E){Ni&&Ni(E)}function Ji(){pn.stop()}function Wn(){pn.start()}const pn=new Sc;pn.setAnimationLoop($i),typeof self<"u"&&pn.setContext(self),this.setAnimationLoop=function(E){Ni=E,Ce.setAnimationLoop(E),E===null?pn.stop():pn.start()},Ce.addEventListener("sessionstart",Ji),Ce.addEventListener("sessionend",Wn),this.render=function(E,B){if(B!==void 0&&B.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;N!==null&&N.renderStart(E,B);const Z=Ce.enabled===!0&&Ce.isPresenting===!0,j=y!==null&&(Q===null||Z)&&y.begin(L,Q);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(B),B=Ce.getCamera()),E.isScene===!0&&E.onBeforeRender(L,E,B,Q),T=ce.get(E,x.length),T.init(B),T.state.textureUnits=z.getTextureUnits(),x.push(T),rt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),qe.setFromProjectionMatrix(rt,rn,B.reversedDepth),We=this.localClippingEnabled,He=ye.init(this.clippingPlanes,We),R=he.get(E,C.length),R.init(),C.push(R),Ce.enabled===!0&&Ce.isPresenting===!0){const be=L.xr.getDepthSensingMesh();be!==null&&Ii(be,B,-1/0,L.sortObjects)}Ii(E,B,0,L.sortObjects),R.finish(),L.sortObjects===!0&&R.sort(Re,Ue,B.reversedDepth),tt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,tt&&Fe.addToRenderList(R,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),He===!0&&ye.beginShadows();const Y=T.state.shadowsArray;if(me.render(Y,E,B),He===!0&&ye.endShadows(),(j&&y.hasRenderPass())===!1){const be=R.opaque,H=R.transmissive;if(T.setupLights(),B.isArrayCamera){const te=B.cameras;if(H.length>0)for(let de=0,Le=te.length;de<Le;de++){const Te=te[de];es(be,H,E,Te)}tt&&Fe.render(E);for(let de=0,Le=te.length;de<Le;de++){const Te=te[de];Qi(R,E,Te,Te.viewport)}}else H.length>0&&es(be,H,E,B),tt&&Fe.render(E),Qi(R,E,B)}Q!==null&&X===0&&(z.updateMultisampleRenderTarget(Q),z.updateRenderTargetMipmap(Q)),j&&y.end(L),E.isScene===!0&&E.onAfterRender(L,E,B),ve.resetDefaultState(),ne=-1,fe=null,x.pop(),x.length>0?(T=x[x.length-1],z.setTextureUnits(T.state.textureUnits),He===!0&&ye.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,C.pop(),C.length>0?R=C[C.length-1]:R=null,N!==null&&N.renderEnd()};function Ii(E,B,Z,j){if(E.visible===!1)return;if(E.layers.test(B.layers)){if(E.isGroup)Z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(B);else if(E.isLightProbeGrid)T.pushLightProbeGrid(E);else if(E.isLight)T.pushLight(E),E.castShadow&&T.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||qe.intersectsSprite(E)){j&&ut.setFromMatrixPosition(E.matrixWorld).applyMatrix4(rt);const be=K.update(E),H=E.material;H.visible&&R.push(E,be,H,Z,ut.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||qe.intersectsObject(E))){const be=K.update(E),H=E.material;if(j&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ut.copy(E.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),ut.copy(be.boundingSphere.center)),ut.applyMatrix4(E.matrixWorld).applyMatrix4(rt)),Array.isArray(H)){const te=be.groups;for(let de=0,Le=te.length;de<Le;de++){const Te=te[de],Ee=H[Te.materialIndex];Ee&&Ee.visible&&R.push(E,be,Ee,Z,ut.z,Te)}}else H.visible&&R.push(E,be,H,Z,ut.z,null)}}const Me=E.children;for(let be=0,H=Me.length;be<H;be++)Ii(Me[be],B,Z,j)}function Qi(E,B,Z,j){const{opaque:Y,transmissive:Me,transparent:be}=E;T.setupLightsView(Z),He===!0&&ye.setGlobalState(L.clippingPlanes,Z),j&&f.viewport(le.copy(j)),Y.length>0&&ni(Y,B,Z),Me.length>0&&ni(Me,B,Z),be.length>0&&ni(be,B,Z),f.buffers.depth.setTest(!0),f.buffers.depth.setMask(!0),f.buffers.color.setMask(!0),f.setPolygonOffset(!1)}function es(E,B,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[j.id]===void 0){const Ee=ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[j.id]=new ln(1,1,{generateMipmaps:!0,type:Ee?yn:Xt,minFilter:$n,samples:Math.max(4,w.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace})}const Me=T.state.transmissionRenderTarget[j.id],be=j.viewport||le;Me.setSize(be.z*L.transmissionResolutionScale,be.w*L.transmissionResolutionScale);const H=L.getRenderTarget(),te=L.getActiveCubeFace(),de=L.getActiveMipmapLevel();L.setRenderTarget(Me),L.getClearColor(Ge),Ne=L.getClearAlpha(),Ne<1&&L.setClearColor(16777215,.5),L.clear(),tt&&Fe.render(Z);const Le=L.toneMapping;L.toneMapping=on;const Te=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),T.setupLightsView(j),He===!0&&ye.setGlobalState(L.clippingPlanes,j),ni(E,Z,j),z.updateMultisampleRenderTarget(Me),z.updateRenderTargetMipmap(Me),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let Ye=0,ct=B.length;Ye<ct;Ye++){const ht=B[Ye],{object:st,geometry:yt,material:Ae,group:Ft}=ht;if(Ae.side===Mn&&st.layers.test(j.layers)){const Ze=Ae.side;Ae.side=It,Ae.needsUpdate=!0,ts(st,Z,j,yt,Ae,Ft),Ae.side=Ze,Ae.needsUpdate=!0,Ee=!0}}Ee===!0&&(z.updateMultisampleRenderTarget(Me),z.updateRenderTargetMipmap(Me))}L.setRenderTarget(H,te,de),L.setClearColor(Ge,Ne),Te!==void 0&&(j.viewport=Te),L.toneMapping=Le}function ni(E,B,Z){const j=B.isScene===!0?B.overrideMaterial:null;for(let Y=0,Me=E.length;Y<Me;Y++){const be=E[Y],{object:H,geometry:te,group:de}=be;let Le=be.material;Le.allowOverride===!0&&j!==null&&(Le=j),H.layers.test(Z.layers)&&ts(H,B,Z,te,Le,de)}}function ts(E,B,Z,j,Y,Me){E.onBeforeRender(L,B,Z,j,Y,Me),E.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Y.onBeforeRender(L,B,Z,j,E,Me),Y.transparent===!0&&Y.side===Mn&&Y.forceSinglePass===!1?(Y.side=It,Y.needsUpdate=!0,L.renderBufferDirect(Z,B,j,Y,E,Me),Y.side=kn,Y.needsUpdate=!0,L.renderBufferDirect(Z,B,j,Y,E,Me),Y.side=Mn):L.renderBufferDirect(Z,B,j,Y,E,Me),E.onAfterRender(L,B,Z,j,Y,Me)}function ii(E,B,Z){B.isScene!==!0&&(B=pt);const j=U.get(E),Y=T.state.lights,Me=T.state.shadowsArray,be=Y.state.version,H=pe.getParameters(E,Y.state,Me,B,Z,T.state.lightProbeGridArray),te=pe.getProgramCacheKey(H);let de=j.programs;j.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?B.environment:null,j.fog=B.fog;const Le=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;j.envMap=J.get(E.envMap||j.environment,Le),j.envMapRotation=j.environment!==null&&E.envMap===null?B.environmentRotation:E.envMapRotation,de===void 0&&(E.addEventListener("dispose",Gt),de=new Map,j.programs=de);let Te=de.get(te);if(Te!==void 0){if(j.currentProgram===Te&&j.lightsStateVersion===be)return is(E,H),Te}else H.uniforms=pe.getUniforms(E),N!==null&&E.isNodeMaterial&&N.build(E,Z,H),E.onBeforeCompile(H,L),Te=pe.acquireProgram(H,te),de.set(te,Te),j.uniforms=H.uniforms;const Ee=j.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ee.clippingPlanes=ye.uniform),is(E,H),j.needsLights=Qs(E),j.lightsStateVersion=be,j.needsLights&&(Ee.ambientLightColor.value=Y.state.ambient,Ee.lightProbe.value=Y.state.probe,Ee.directionalLights.value=Y.state.directional,Ee.directionalLightShadows.value=Y.state.directionalShadow,Ee.spotLights.value=Y.state.spot,Ee.spotLightShadows.value=Y.state.spotShadow,Ee.rectAreaLights.value=Y.state.rectArea,Ee.ltc_1.value=Y.state.rectAreaLTC1,Ee.ltc_2.value=Y.state.rectAreaLTC2,Ee.pointLights.value=Y.state.point,Ee.pointLightShadows.value=Y.state.pointShadow,Ee.hemisphereLights.value=Y.state.hemi,Ee.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ee.spotLightMatrix.value=Y.state.spotLightMatrix,Ee.spotLightMap.value=Y.state.spotLightMap,Ee.pointShadowMatrix.value=Y.state.pointShadowMatrix),j.lightProbeGrid=T.state.lightProbeGridArray.length>0,j.currentProgram=Te,j.uniformsList=null,Te}function ns(E){if(E.uniformsList===null){const B=E.currentProgram.getUniforms();E.uniformsList=Fs.seqWithValue(B.seq,E.uniforms)}return E.uniformsList}function is(E,B){const Z=U.get(E);Z.outputColorSpace=B.outputColorSpace,Z.batching=B.batching,Z.batchingColor=B.batchingColor,Z.instancing=B.instancing,Z.instancingColor=B.instancingColor,Z.instancingMorph=B.instancingMorph,Z.skinning=B.skinning,Z.morphTargets=B.morphTargets,Z.morphNormals=B.morphNormals,Z.morphColors=B.morphColors,Z.morphTargetsCount=B.morphTargetsCount,Z.numClippingPlanes=B.numClippingPlanes,Z.numIntersection=B.numClipIntersection,Z.vertexAlphas=B.vertexAlphas,Z.vertexTangents=B.vertexTangents,Z.toneMapping=B.toneMapping}function Zs(E,B){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;v.setFromMatrixPosition(B.matrixWorld);for(let Z=0,j=E.length;Z<j;Z++){const Y=E[Z];if(Y.texture!==null&&Y.boundingBox.containsPoint(v))return Y}return null}function $s(E,B,Z,j,Y){B.isScene!==!0&&(B=pt),z.resetTextureUnits();const Me=B.fog,be=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?B.environment:null,H=Q===null?L.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:je.workingColorSpace,te=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,de=J.get(j.envMap||be,te),Le=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Te=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ee=!!Z.morphAttributes.position,Ye=!!Z.morphAttributes.normal,ct=!!Z.morphAttributes.color;let ht=on;j.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(ht=L.toneMapping);const st=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,yt=st!==void 0?st.length:0,Ae=U.get(j),Ft=T.state.lights;if(He===!0&&(We===!0||E!==fe)){const ot=E===fe&&j.id===ne;ye.setState(j,E,ot)}let Ze=!1;j.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Ft.state.version||Ae.outputColorSpace!==H||Y.isBatchedMesh&&Ae.batching===!1||!Y.isBatchedMesh&&Ae.batching===!0||Y.isBatchedMesh&&Ae.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Ae.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Ae.instancing===!1||!Y.isInstancedMesh&&Ae.instancing===!0||Y.isSkinnedMesh&&Ae.skinning===!1||!Y.isSkinnedMesh&&Ae.skinning===!0||Y.isInstancedMesh&&Ae.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ae.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ae.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ae.instancingMorph===!1&&Y.morphTexture!==null||Ae.envMap!==de||j.fog===!0&&Ae.fog!==Me||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==ye.numPlanes||Ae.numIntersection!==ye.numIntersection)||Ae.vertexAlphas!==Le||Ae.vertexTangents!==Te||Ae.morphTargets!==Ee||Ae.morphNormals!==Ye||Ae.morphColors!==ct||Ae.toneMapping!==ht||Ae.morphTargetsCount!==yt||!!Ae.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,Ae.__version=j.version);let kt=Ae.currentProgram;Ze===!0&&(kt=ii(j,B,Y),N&&j.isNodeMaterial&&N.onUpdateProgram(j,kt,Ae));let Jt=!1,Rn=!1,si=!1;const at=kt.getUniforms(),mt=Ae.uniforms;if(f.useProgram(kt.program)&&(Jt=!0,Rn=!0,si=!0),j.id!==ne&&(ne=j.id,Rn=!0),Ae.needsLights){const ot=Zs(T.state.lightProbeGridArray,Y);Ae.lightProbeGrid!==ot&&(Ae.lightProbeGrid=ot,Rn=!0)}if(Jt||fe!==E){f.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),at.setValue(O,"projectionMatrix",E.projectionMatrix),at.setValue(O,"viewMatrix",E.matrixWorldInverse);const Cn=at.map.cameraPosition;Cn!==void 0&&Cn.setValue(O,lt.setFromMatrixPosition(E.matrixWorld)),w.logarithmicDepthBuffer&&at.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&at.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),fe!==E&&(fe=E,Rn=!0,si=!0)}if(Ae.needsLights&&(Ft.state.directionalShadowMap.length>0&&at.setValue(O,"directionalShadowMap",Ft.state.directionalShadowMap,z),Ft.state.spotShadowMap.length>0&&at.setValue(O,"spotShadowMap",Ft.state.spotShadowMap,z),Ft.state.pointShadowMap.length>0&&at.setValue(O,"pointShadowMap",Ft.state.pointShadowMap,z)),Y.isSkinnedMesh){at.setOptional(O,Y,"bindMatrix"),at.setOptional(O,Y,"bindMatrixInverse");const ot=Y.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),at.setValue(O,"boneTexture",ot.boneTexture,z))}Y.isBatchedMesh&&(at.setOptional(O,Y,"batchingTexture"),at.setValue(O,"batchingTexture",Y._matricesTexture,z),at.setOptional(O,Y,"batchingIdTexture"),at.setValue(O,"batchingIdTexture",Y._indirectTexture,z),at.setOptional(O,Y,"batchingColorTexture"),Y._colorsTexture!==null&&at.setValue(O,"batchingColorTexture",Y._colorsTexture,z));const wn=Z.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&I.update(Y,Z,kt),(Rn||Ae.receiveShadow!==Y.receiveShadow)&&(Ae.receiveShadow=Y.receiveShadow,at.setValue(O,"receiveShadow",Y.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&B.environment!==null&&(mt.envMapIntensity.value=B.environmentIntensity),mt.dfgLUT!==void 0&&(mt.dfgLUT.value=G_()),Rn){if(at.setValue(O,"toneMappingExposure",L.toneMappingExposure),Ae.needsLights&&Js(mt,si),Me&&j.fog===!0&&ue.refreshFogUniforms(mt,Me),ue.refreshMaterialUniforms(mt,j,re,ie,T.state.transmissionRenderTarget[E.id]),Ae.needsLights&&Ae.lightProbeGrid){const ot=Ae.lightProbeGrid;mt.probesSH.value=ot.texture,mt.probesMin.value.copy(ot.boundingBox.min),mt.probesMax.value.copy(ot.boundingBox.max),mt.probesResolution.value.copy(ot.resolution)}Fs.upload(O,ns(Ae),mt,z)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Fs.upload(O,ns(Ae),mt,z),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&at.setValue(O,"center",Y.center),at.setValue(O,"modelViewMatrix",Y.modelViewMatrix),at.setValue(O,"normalMatrix",Y.normalMatrix),at.setValue(O,"modelMatrix",Y.matrixWorld),j.uniformsGroups!==void 0){const ot=j.uniformsGroups;for(let Cn=0,ai=ot.length;Cn<ai;Cn++){const lo=ot[Cn];se.update(lo,kt),se.bind(lo,kt)}}return kt}function Js(E,B){E.ambientLightColor.needsUpdate=B,E.lightProbe.needsUpdate=B,E.directionalLights.needsUpdate=B,E.directionalLightShadows.needsUpdate=B,E.pointLights.needsUpdate=B,E.pointLightShadows.needsUpdate=B,E.spotLights.needsUpdate=B,E.spotLightShadows.needsUpdate=B,E.rectAreaLights.needsUpdate=B,E.hemisphereLights.needsUpdate=B}function Qs(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(E,B,Z){const j=U.get(E);j.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),U.get(E.texture).__webglTexture=B,U.get(E.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:Z,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,B){const Z=U.get(E);Z.__webglFramebuffer=B,Z.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(E,B=0,Z=0){Q=E,q=B,X=Z;let j=null,Y=!1,Me=!1;if(E){const H=U.get(E);if(H.__useDefaultFramebuffer!==void 0){f.bindFramebuffer(O.FRAMEBUFFER,H.__webglFramebuffer),le.copy(E.viewport),xe.copy(E.scissor),Pe=E.scissorTest,f.viewport(le),f.scissor(xe),f.setScissorTest(Pe),ne=-1;return}else if(H.__webglFramebuffer===void 0)z.setupRenderTarget(E);else if(H.__hasExternalTextures)z.rebindTextures(E,U.get(E.texture).__webglTexture,U.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Le=E.depthTexture;if(H.__boundDepthTexture!==Le){if(Le!==null&&U.has(Le)&&(E.width!==Le.image.width||E.height!==Le.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(E)}}const te=E.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(Me=!0);const de=U.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(de[B])?j=de[B][Z]:j=de[B],Y=!0):E.samples>0&&z.useMultisampledRTT(E)===!1?j=U.get(E).__webglMultisampledFramebuffer:Array.isArray(de)?j=de[Z]:j=de,le.copy(E.viewport),xe.copy(E.scissor),Pe=E.scissorTest}else le.copy(we).multiplyScalar(re).floor(),xe.copy($e).multiplyScalar(re).floor(),Pe=Ie;if(Z!==0&&(j=k),f.bindFramebuffer(O.FRAMEBUFFER,j)&&f.drawBuffers(E,j),f.viewport(le),f.scissor(xe),f.setScissorTest(Pe),Y){const H=U.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+B,H.__webglTexture,Z)}else if(Me){const H=B;for(let te=0;te<E.textures.length;te++){const de=U.get(E.textures[te]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+te,de.__webglTexture,Z,H)}}else if(E!==null&&Z!==0){const H=U.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,H.__webglTexture,Z)}ne=-1},this.readRenderTargetPixels=function(E,B,Z,j,Y,Me,be,H=0){if(!(E&&E.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let te=U.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&be!==void 0&&(te=te[be]),te){f.bindFramebuffer(O.FRAMEBUFFER,te);try{const de=E.textures[H],Le=de.format,Te=de.type;if(E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+H),!w.textureFormatReadable(Le)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!w.textureTypeReadable(Te)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=E.width-j&&Z>=0&&Z<=E.height-Y&&O.readPixels(B,Z,j,Y,_e.convert(Le),_e.convert(Te),Me)}finally{const de=Q!==null?U.get(Q).__webglFramebuffer:null;f.bindFramebuffer(O.FRAMEBUFFER,de)}}},this.readRenderTargetPixelsAsync=async function(E,B,Z,j,Y,Me,be,H=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let te=U.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&be!==void 0&&(te=te[be]),te)if(B>=0&&B<=E.width-j&&Z>=0&&Z<=E.height-Y){f.bindFramebuffer(O.FRAMEBUFFER,te);const de=E.textures[H],Le=de.format,Te=de.type;if(E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+H),!w.textureFormatReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!w.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ee=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Ee),O.bufferData(O.PIXEL_PACK_BUFFER,Me.byteLength,O.STREAM_READ),O.readPixels(B,Z,j,Y,_e.convert(Le),_e.convert(Te),0);const Ye=Q!==null?U.get(Q).__webglFramebuffer:null;f.bindFramebuffer(O.FRAMEBUFFER,Ye);const ct=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await sh(O,ct,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Ee),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Me),O.deleteBuffer(Ee),O.deleteSync(ct),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,B=null,Z=0){const j=Math.pow(2,-Z),Y=Math.floor(E.image.width*j),Me=Math.floor(E.image.height*j),be=B!==null?B.x:0,H=B!==null?B.y:0;z.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,Z,0,0,be,H,Y,Me),f.unbindTexture()},this.copyTextureToTexture=function(E,B,Z=null,j=null,Y=0,Me=0){let be,H,te,de,Le,Te,Ee,Ye,ct;const ht=E.isCompressedTexture?E.mipmaps[Me]:E.image;if(Z!==null)be=Z.max.x-Z.min.x,H=Z.max.y-Z.min.y,te=Z.isBox3?Z.max.z-Z.min.z:1,de=Z.min.x,Le=Z.min.y,Te=Z.isBox3?Z.min.z:0;else{const mt=Math.pow(2,-Y);be=Math.floor(ht.width*mt),H=Math.floor(ht.height*mt),E.isDataArrayTexture?te=ht.depth:E.isData3DTexture?te=Math.floor(ht.depth*mt):te=1,de=0,Le=0,Te=0}j!==null?(Ee=j.x,Ye=j.y,ct=j.z):(Ee=0,Ye=0,ct=0);const st=_e.convert(B.format),yt=_e.convert(B.type);let Ae;B.isData3DTexture?(z.setTexture3D(B,0),Ae=O.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(z.setTexture2DArray(B,0),Ae=O.TEXTURE_2D_ARRAY):(z.setTexture2D(B,0),Ae=O.TEXTURE_2D),f.activeTexture(O.TEXTURE0),f.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,B.flipY),f.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),f.pixelStorei(O.UNPACK_ALIGNMENT,B.unpackAlignment);const Ft=f.getParameter(O.UNPACK_ROW_LENGTH),Ze=f.getParameter(O.UNPACK_IMAGE_HEIGHT),kt=f.getParameter(O.UNPACK_SKIP_PIXELS),Jt=f.getParameter(O.UNPACK_SKIP_ROWS),Rn=f.getParameter(O.UNPACK_SKIP_IMAGES);f.pixelStorei(O.UNPACK_ROW_LENGTH,ht.width),f.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ht.height),f.pixelStorei(O.UNPACK_SKIP_PIXELS,de),f.pixelStorei(O.UNPACK_SKIP_ROWS,Le),f.pixelStorei(O.UNPACK_SKIP_IMAGES,Te);const si=E.isDataArrayTexture||E.isData3DTexture,at=B.isDataArrayTexture||B.isData3DTexture;if(E.isDepthTexture){const mt=U.get(E),wn=U.get(B),ot=U.get(mt.__renderTarget),Cn=U.get(wn.__renderTarget);f.bindFramebuffer(O.READ_FRAMEBUFFER,ot.__webglFramebuffer),f.bindFramebuffer(O.DRAW_FRAMEBUFFER,Cn.__webglFramebuffer);for(let ai=0;ai<te;ai++)si&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,U.get(E).__webglTexture,Y,Te+ai),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,U.get(B).__webglTexture,Me,ct+ai)),O.blitFramebuffer(de,Le,be,H,Ee,Ye,be,H,O.DEPTH_BUFFER_BIT,O.NEAREST);f.bindFramebuffer(O.READ_FRAMEBUFFER,null),f.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(Y!==0||E.isRenderTargetTexture||U.has(E)){const mt=U.get(E),wn=U.get(B);f.bindFramebuffer(O.READ_FRAMEBUFFER,V),f.bindFramebuffer(O.DRAW_FRAMEBUFFER,F);for(let ot=0;ot<te;ot++)si?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,mt.__webglTexture,Y,Te+ot):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,mt.__webglTexture,Y),at?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,wn.__webglTexture,Me,ct+ot):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,wn.__webglTexture,Me),Y!==0?O.blitFramebuffer(de,Le,be,H,Ee,Ye,be,H,O.COLOR_BUFFER_BIT,O.NEAREST):at?O.copyTexSubImage3D(Ae,Me,Ee,Ye,ct+ot,de,Le,be,H):O.copyTexSubImage2D(Ae,Me,Ee,Ye,de,Le,be,H);f.bindFramebuffer(O.READ_FRAMEBUFFER,null),f.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else at?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(Ae,Me,Ee,Ye,ct,be,H,te,st,yt,ht.data):B.isCompressedArrayTexture?O.compressedTexSubImage3D(Ae,Me,Ee,Ye,ct,be,H,te,st,ht.data):O.texSubImage3D(Ae,Me,Ee,Ye,ct,be,H,te,st,yt,ht):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Me,Ee,Ye,be,H,st,yt,ht.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Me,Ee,Ye,ht.width,ht.height,st,ht.data):O.texSubImage2D(O.TEXTURE_2D,Me,Ee,Ye,be,H,st,yt,ht);f.pixelStorei(O.UNPACK_ROW_LENGTH,Ft),f.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ze),f.pixelStorei(O.UNPACK_SKIP_PIXELS,kt),f.pixelStorei(O.UNPACK_SKIP_ROWS,Jt),f.pixelStorei(O.UNPACK_SKIP_IMAGES,Rn),Me===0&&B.generateMipmaps&&O.generateMipmap(Ae),f.unbindTexture()},this.initRenderTarget=function(E){U.get(E).__webglFramebuffer===void 0&&z.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?z.setTextureCube(E,0):E.isData3DTexture?z.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?z.setTexture2DArray(E,0):z.setTexture2D(E,0),f.unbindTexture()},this.resetState=function(){q=0,X=0,Q=null,f.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}const El={type:"change"},no={type:"start"},Cc={type:"end"},Cs=new Qr,bl=new On,V_=Math.cos(70*oh.DEG2RAD),vt=new W,Nt=2*Math.PI,it={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Oa=1e-6;class H_ extends Wh{constructor(e,t=null){super(e,t),this.state=it.NONE,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:bi.ROTATE,MIDDLE:bi.DOLLY,RIGHT:bi.PAN},this.touches={ONE:Ei.ROTATE,TWO:Ei.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new Vn,this._lastTargetPosition=new W,this._quat=new Vn().setFromUnitVectors(e.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zo,this._sphericalDelta=new Zo,this._scale=1,this._panOffset=new W,this._rotateStart=new ze,this._rotateEnd=new ze,this._rotateDelta=new ze,this._panStart=new ze,this._panEnd=new ze,this._panDelta=new ze,this._dollyStart=new ze,this._dollyEnd=new ze,this._dollyDelta=new ze,this._dollyDirection=new W,this._mouse=new ze,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=X_.bind(this),this._onPointerDown=W_.bind(this),this._onPointerUp=q_.bind(this),this._onContextMenu=Q_.bind(this),this._onMouseWheel=K_.bind(this),this._onKeyDown=Z_.bind(this),this._onTouchStart=$_.bind(this),this._onTouchMove=J_.bind(this),this._onMouseDown=j_.bind(this),this._onMouseMove=Y_.bind(this),this._interceptControlDown=ex.bind(this),this._interceptControlUp=tx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(El),this.update(),this.state=it.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;vt.copy(t).sub(this.target),vt.applyQuaternion(this._quat),this._spherical.setFromVector3(vt),this.autoRotate&&this.state===it.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Nt:i>Math.PI&&(i-=Nt),s<-Math.PI?s+=Nt:s>Math.PI&&(s-=Nt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(vt.setFromSpherical(this._spherical),vt.applyQuaternion(this._quatInverse),t.copy(this.target).add(vt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=vt.length();r=this._clampDistance(o*this._scale);const c=o-r;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),a=!!c}else if(this.object.isOrthographicCamera){const o=new W(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=c!==this.object.zoom;const l=new W(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),r=vt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Cs.origin.copy(this.object.position),Cs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cs.direction))<V_?this.object.lookAt(this.target):(bl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cs.intersectPlane(bl,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Oa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Oa||this._lastTargetPosition.distanceToSquared(this.target)>Oa?(this.dispatchEvent(El),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Nt/60*this.autoRotateSpeed*e:Nt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){vt.setFromMatrixColumn(t,0),vt.multiplyScalar(-e),this._panOffset.add(vt)}_panUp(e,t){this.screenSpacePanning===!0?vt.setFromMatrixColumn(t,1):(vt.setFromMatrixColumn(t,0),vt.crossVectors(this.object.up,vt)),vt.multiplyScalar(e),this._panOffset.add(vt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;vt.copy(s).sub(this.target);let a=vt.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,a=t-i.top,r=i.width,o=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Nt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Nt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Nt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Nt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Nt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Nt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),a=.5*(e.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Nt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Nt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ze,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function W_(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function X_(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function q_(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Cc),this.state=it.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function j_(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case bi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=it.DOLLY;break;case bi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=it.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=it.ROTATE}break;case bi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=it.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=it.PAN}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(no)}function Y_(n){switch(this.state){case it.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case it.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case it.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function K_(n){this.enabled===!1||this.enableZoom===!1||this.state!==it.NONE||(n.preventDefault(),this.dispatchEvent(no),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Cc))}function Z_(n){this.enabled!==!1&&this._handleKeyDown(n)}function $_(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ei.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=it.TOUCH_ROTATE;break;case Ei.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=it.TOUCH_PAN;break;default:this.state=it.NONE}break;case 2:switch(this.touches.TWO){case Ei.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=it.TOUCH_DOLLY_PAN;break;case Ei.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=it.TOUCH_DOLLY_ROTATE;break;default:this.state=it.NONE}break;default:this.state=it.NONE}this.state!==it.NONE&&this.dispatchEvent(no)}function J_(n){switch(this._trackPointer(n),this.state){case it.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case it.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case it.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case it.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=it.NONE}}function Q_(n){this.enabled!==!1&&n.preventDefault()}function ex(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function tx(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yl(n){return Math.min(Math.max(.09+Math.sqrt(n)*.028,.09),.32)}function Tl(n){const e=Gn(n);return/^#/.test(e)?e:10066329}const nx=13684944,ix=1.35,sx=1.3;function ax({projetos:n,destacadoDe:e,algumFiltroAtivo:t,projetoAbertoId:i,largura:s,altura:a,onSelecionar:r,onHover:o,onHoverFim:c}){const l=ae.useRef(null),h=ae.useRef(null),m=ae.useRef({largura:s,altura:a});return m.current={largura:s,altura:a},ae.useEffect(()=>{const u=l.current;if(!u)return;const{largura:g,altura:_}=m.current,S=new Sh,p=new Wt(50,g/_,.1,100);p.position.set(0,0,13*sx);const d=new k_({antialias:!0,alpha:!0});d.setSize(g,_),d.setPixelRatio(Math.min(window.devicePixelRatio,2)),u.appendChild(d.domElement);const b=new H_(p,d.domElement);b.enableDamping=!0,b.dampingFactor=.08,b.minDistance=3,b.maxDistance=60,S.add(new Gh(16777215,1));const A=new to(1,12,10),v={scene:S,camera:p,renderer:d,controls:b,raycaster:new Hh,meshes:new Map,geometria:A};h.current=v;let R=!0;function T(){R&&(b.update(),d.render(S,p),requestAnimationFrame(T))}return T(),()=>{R=!1,b.dispose();for(const C of v.meshes.values())C.material.dispose();A.dispose(),d.dispose(),u.removeChild(d.domElement),h.current=null}},[]),ae.useEffect(()=>{const u=h.current;u&&(u.camera.aspect=s/a,u.camera.updateProjectionMatrix(),u.renderer.setSize(s,a))},[s,a]),ae.useEffect(()=>{const u=h.current;if(!u||n.length===0)return;for(const d of u.meshes.values())u.scene.remove(d),d.material.dispose();u.meshes.clear();const g=["x3d","y3d","z3d"].map(d=>{const b=n.map(A=>A[d]);return[Math.min(...b),Math.max(...b)]}),_=g.map(([d,b])=>(d+b)/2),S=Math.max(...g.map(([d,b])=>b-d),1e-6),p=10*ix/S;for(const d of n){const b=new eo({color:Tl(d.sigla),transparent:!0}),A=new dn(u.geometria,b);A.position.set((d.x3d-_[0])*p,(d.y3d-_[1])*p,(d.z3d-_[2])*p);const v=yl(d.n_producoes);A.scale.setScalar(v),A.userData.id=d.id,u.scene.add(A),u.meshes.set(d.id,A)}},[n]),ae.useEffect(()=>{const u=h.current;if(u)for(const g of n){const _=u.meshes.get(g.id);if(!_)continue;const S=t&&!e(g),p=_.material;p.color.set(S?nx:Tl(g.sigla)),p.opacity=S?.2:.9;const d=g.id===i;_.scale.setScalar(yl(g.n_producoes)*(d?1.7:1))}}),ae.useEffect(()=>{const u=h.current,g=l.current;if(!u||!g)return;function _(A){const v=g.getBoundingClientRect(),R=new ze((A.clientX-v.left)/v.width*2-1,-((A.clientY-v.top)/v.height)*2+1);u.raycaster.setFromCamera(R,u.camera);const T=u.raycaster.intersectObjects([...u.meshes.values()]);if(T.length===0)return null;const C=T[0].object.userData.id;return n.find(x=>x.id===C)??null}let S=!1;function p(){S=!1}function d(A){A.buttons!==0&&(S=!0);const v=_(A);v?o(v,A.clientX,A.clientY):c()}function b(A){if(S)return;const v=_(A);v&&r(v,A.detail)}return g.addEventListener("pointerdown",p),g.addEventListener("mousemove",d),g.addEventListener("click",b),()=>{g.removeEventListener("pointerdown",p),g.removeEventListener("mousemove",d),g.removeEventListener("click",b)}},[n,o,c,r]),M.jsx("div",{ref:l,style:{width:s,height:a,touchAction:"none"}})}const rx={top:24,right:24,bottom:36,left:24},ox={top:12,right:12,bottom:20,left:12};function lx(n,e){const t=n<=640?ox:rx,i=Math.max(1,n-t.left-t.right),s=Math.max(1,e-t.top-t.bottom),a=nn(Math.min(i,s)/600,.5,1);return{W:n,H:e,iw:i,ih:s,M:t,fatorEscala:a}}function nn(n,e,t){return Math.max(e,Math.min(t,n))}function Hi(n,e=1){const t=nn(2.5+Math.sqrt(n)*1.1,2.5,9);return e===1?t:Math.max(1.3,t*e)}const cx=7,ux=22;function dx(n,e){n.x!==void 0&&(n.x=nn(n.x,e.M.left+n.r,e.W-e.M.right-n.r)),n.y!==void 0&&(n.y=nn(n.y,e.M.top+n.r,e.H-e.M.bottom-n.r))}const hx=-15*Math.PI/180,Al=Math.cos(hx);function fx(n,e){let t=1/0,i=-1/0,s=1/0,a=-1/0;for(const{lon:m,lat:u}of n)t=Math.min(t,m),i=Math.max(i,m),s=Math.min(s,u),a=Math.max(a,u);const r=(i-t)*Al||1,o=a-s||1,c=Math.min(e.iw/r,e.ih/o),l=(e.iw-r*c)/2,h=(e.ih-o*c)/2;return{x:m=>e.M.left+l+(m-t)*Al*c,y:m=>e.M.top+h+(a-m)*c}}function px(n,e){const t=fx(n.map(a=>({lon:a.lon,lat:a.lat})),e),i=n.map(a=>{const r=t.x(a.lon),o=t.y(a.lat);return{chave:a.chave,alvoX:r,alvoY:o,r:(Math.sqrt(a.n)*3.4+10)*e.fatorEscala,x:r,y:o}}),s=Hl(i).force("x",Ha(a=>a.alvoX).strength(.35)).force("y",Wa(a=>a.alvoY).strength(.35)).force("collide",Vl(a=>a.r)).stop();for(let a=0;a<300;a++)s.tick();return new Map(i.map(a=>[a.chave,{x:a.x??a.alvoX,y:a.y??a.alvoY}]))}function mx(n,e,t){const i=new Map(n.filter(a=>a.lat!==null&&a.lon!==null).map(a=>[a.sigla,a])),s=new Map;for(const a of e){const r=i.get(a.sigla);if(!r)continue;const o=t==="uf"?r.uf:r.regiao,c=s.get(o)??{n:0,somaLat:0,somaLon:0,contagem:0};c.n+=a.n,c.somaLat+=r.lat,c.somaLon+=r.lon,c.contagem+=1,s.set(o,c)}return[...s.entries()].map(([a,r])=>({chave:a,n:r.n,lat:r.somaLat/r.contagem,lon:r.somaLon/r.contagem}))}const gx="var(--color-border)",_x="#b9b7ae",xx=ae.forwardRef(function({dados:e,programas:t,organizarPor:i,dimensao:s,agruparLocalidade:a,destacadoDe:r,intensidadeDe:o,algumFiltroAtivo:c,projetoAberto:l,producoesVisiveis:h,producaoSel:m,filtroProd:u,esquema:g,fichas:_,descricoes:S,detalhes:p,temaPorCluster:d,onSelecionarProjeto:b,onAlternarProjeto:A,onSelecionarProducao:v,onToqueFundo:R},T){var _t,ke,w;const C=pu(),[x,y]=mu(),L=Math.max(320,y.largura||760),D=Math.max(240,y.altura||680),N=ae.useMemo(()=>lx(L,D),[L,D]),[k,V]=ae.useState(null),[F,q]=ae.useState(Ui),[X,Q]=ae.useState(null),[ne,fe]=ae.useState(null),[le,xe]=ae.useState(null),[Pe,Ge]=ae.useState(null),Ne=ae.useRef(null),$=ae.useRef(null),ie=ae.useRef(null),re=ae.useRef(!1),Re=ae.useRef(!1),Ue=ae.useRef(null),we=ae.useRef(null),$e=ae.useRef(new Map);ae.useEffect(()=>{const f=$.current;if(!f)return;const P=Kc().scaleExtent([1,14]).translateExtent([[0,0],[N.W,N.H]]).filter(U=>{var J,oe;const z=U;return z.type==="dblclick"&&((oe=(J=z.target)==null?void 0:J.closest)!=null&&oe.call(J,"[data-alvo-projeto]"))?!1:(!z.ctrlKey||z.type==="wheel")&&!z.button}).on("zoom",U=>q(U.transform));return Fn(f).call(P),ie.current=P,()=>{Fn(f).on(".zoom",null),ie.current=null}},[e,k!==null,N]),ae.useEffect(()=>{const f=e.projetos.map(me=>me.x),P=e.projetos.map(me=>me.y),U=Math.min(...f),z=Math.max(...f),J=Math.min(...P),oe=Math.max(...P),G=Math.min(N.iw/(z-U||1),N.ih/(oe-J||1)),K=(N.iw-(z-U)*G)/2,pe=(N.ih-(oe-J)*G)/2,ue=me=>N.M.left+K+(me-U)*G,he=me=>N.M.top+pe+(oe-me)*G,ce=e.projetos.map(me=>{const Fe=ue(me.x),I=he(me.y);return{id:me.id,sigla:me.sigla,r:Hi(me.n_producoes,N.fatorEscala),temaX:Fe,temaY:I,alvoX:Fe,alvoY:I,x:Fe,y:I}});$e.current=new Map(ce.map(me=>[me.id,me])),V(new Map(ce.map(me=>[me.id,{x:me.x,y:me.y}])));const ye=Hl(ce).force("x",Ha(me=>me.alvoX).strength(.2)).force("y",Wa(me=>me.alvoY).strength(.2)).force("collide",Vl(me=>me.r+Math.max(.3,.8*N.fatorEscala))).alpha(.9).on("tick",()=>{for(const me of ye.nodes())dx(me,N);V(new Map(ye.nodes().map(me=>[me.id,{x:me.x??me.alvoX,y:me.y??me.alvoY}])))});return we.current=ye,()=>{ye.stop(),we.current=null}},[e,N]),ae.useEffect(()=>{if(!(!k||!we.current)){if(i==="tema")for(const f of $e.current.values())f.alvoX=f.temaX,f.alvoY=f.temaY,f.x=f.temaX,f.y=f.temaY;else{let f=function(G){if(a==="instituicao")return G.sigla;const K=P.get(G.sigla);return K?a==="uf"?K.uf:K.regiao:""};if(!t)return;const P=new Map(t.map(G=>[G.sigla,G])),U=new Map;for(const G of e.projetos)U.set(G.sigla,(U.get(G.sigla)??0)+1);const z=[...U.entries()].map(([G,K])=>({sigla:G,n:K})),J=a==="instituicao"?z.flatMap(G=>{const K=P.get(G.sigla);return K&&K.lat!==null&&K.lon!==null?[{chave:G.sigla,n:G.n,lat:K.lat,lon:K.lon}]:[]}):mx(t,z,a),oe=px(J,N);for(const G of $e.current.values()){const K=oe.get(f(G)),pe=nn((K==null?void 0:K.x)??N.W/2,N.M.left+G.r,N.W-N.M.right-G.r),ue=nn((K==null?void 0:K.y)??N.H/2,N.M.top+G.r,N.H-N.M.bottom-G.r);G.alvoX=pe,G.alvoY=ue,G.x=pe,G.y=ue}}we.current.force("x",Ha(f=>f.alvoX).strength(.2)).force("y",Wa(f=>f.alvoY).strength(.2)).alpha(1).restart()}},[i,a,k!==null,t,N]);const Ie=ae.useMemo(()=>{if(!l||!h||!k)return null;const f=k.get(l.id);return f?jl(h.map(P=>g.chaves(P).subtipo),g.ordemSubtipo,f.x,f.y,Hi(l.n_producoes,N.fatorEscala)):null},[l,h,k,g,N.fatorEscala]);function qe(f,P,U,z){document.hidden?Fn(f).call(P.transform,U):Fn(f).transition().duration(z).call(P.transform,U)}function He(f,P){const U=$.current,z=ie.current,J=k==null?void 0:k.get(f.id);if(!U||!z||!J)return;const oe=P??bd((h==null?void 0:h.length)??f.n_producoes,Hi(f.n_producoes,N.fatorEscala)),G=nn(Math.min((N.W/2-14)/oe.x,(N.H/2-14)/oe.y),1.6,8);Re.current=!0,qe(U,z,Ui.translate(N.W/2-G*J.x,N.H/2-G*J.y).scale(G),650)}function We(){const f=$.current,P=ie.current;!f||!P||!Re.current||(Re.current=!1,qe(f,P,Ui,450))}ae.useImperativeHandle(T,()=>({focarProjeto:He,reenquadrar(){var U;for(const z of $e.current.values())z.x=z.alvoX,z.y=z.alvoY;(U=we.current)==null||U.alpha(.9).restart();const f=$.current,P=ie.current;f&&P&&(Re.current=!1,qe(f,P,Ui,450))},zoomPor(f){const P=$.current,U=ie.current;!P||!U||Fn(P).transition().duration(220).call(U.scaleBy,f)},focarRegiao(f){const P=$.current,U=ie.current;if(!P||!U||!k)return;const z=[...k.values()];if(z.length===0)return;const J=Math.max(Math.max(...z.map(I=>I.x))-Math.min(...z.map(I=>I.x)),Math.max(...z.map(I=>I.y))-Math.min(...z.map(I=>I.y))),oe=[...f].flatMap(([I,ge])=>{const ee=k.get(I);return ee?[{x:ee.x,y:ee.y,w:ge}]:[]}),G=Zc(oe,J);if(G.length===0)return;const K=Math.min(...G.map(I=>I.x)),pe=Math.max(...G.map(I=>I.x)),ue=Math.min(...G.map(I=>I.y)),he=Math.max(...G.map(I=>I.y)),ce=40,ye=nn(Math.min((N.W-2*ce)/Math.max(pe-K,1),(N.H-2*ce)/Math.max(he-ue,1)),1.3,3),me=(K+pe)/2,Fe=(ue+he)/2;Re.current=!0,qe(P,U,Ui.translate(N.W/2-ye*me,N.H/2-ye*Fe).scale(ye),700)}}),[k,N,h]);const rt=Ie==null?void 0:Ie.extX,lt=Ie==null?void 0:Ie.extY;ae.useEffect(()=>{l&&rt!==void 0&&lt!==void 0&&Re.current&&He(l,{x:rt,y:lt})},[l==null?void 0:l.id,rt,lt]),ae.useEffect(()=>{l?He(l):We()},[l==null?void 0:l.id]);function ut(f,P,U){var J;if((l==null?void 0:l.id)===f.id){A(f);return}if((le==null?void 0:le.p.id)===f.id){xe(null);return}const z=(J=Ne.current)==null?void 0:J.getBoundingClientRect();xe({p:f,ancora:z&&P!==void 0&&U!==void 0?{x:P-z.left,y:U-z.top}:"canto"}),Q(null)}function pt(f,P,U){var J;if((Pe==null?void 0:Pe.pr.id_producao)===f.id_producao){Ge(null);return}const z=(J=Ne.current)==null?void 0:J.getBoundingClientRect();Ge({pr:f,ancora:z?{x:P-z.left,y:U-z.top}:"canto"}),fe(null)}function tt(f,P){!f||C||Fn(f).call(Wu().on("start",U=>{var J;U.sourceEvent.stopPropagation(),re.current=!1,(J=we.current)==null||J.alphaTarget(.35).restart();const z=$e.current.get(P);z&&(z.fx=z.x,z.fy=z.y)}).on("drag",U=>{re.current=!0;const z=$e.current.get(P);z&&(z.fx=nn(U.x,N.M.left+z.r,N.W-N.M.right-z.r),z.fy=nn(U.y,N.M.top+z.r,N.H-N.M.bottom-z.r))}).on("end",()=>{var z;(z=we.current)==null||z.alphaTarget(0);const U=$e.current.get(P);U&&(U.fx=null,U.fy=null)}))}function dt(f){const P=Ue.current;if(Ue.current=null,C){if(P&&Math.hypot(f.clientX-P.x,f.clientY-P.y)>10)return;const U=$.current;if(!U||!k)return;const z=U.getBoundingClientRect(),[J,oe]=F.invert([f.clientX-z.left,f.clientY-z.top]),G=ux/F.k;let K=null;if(Ie&&h)for(const ue of Ie.satelites){const he=h[ue.i];if(!he)continue;const ce=Math.hypot(ue.x-J,ue.y-oe);ce<=G&&(K===null||ce<K.d)&&(K={d:ce,tipo:"producao",id:he.id_producao})}for(const ue of e.projetos){const he=k.get(ue.id);if(!he)continue;const ce=Math.hypot(he.x-J,he.y-oe);ce<=G&&(K===null||ce<K.d)&&(K={d:ce,tipo:"projeto",id:ue.id})}const pe=K;if(pe===null)R();else if(pe.tipo==="producao")v(pe.id);else{const ue=e.projetos.find(he=>he.id===pe.id);ue&&A(ue)}return}f.target===f.currentTarget&&le&&!l&&xe(null)}if(k===null)return M.jsx("div",{className:"atlas-canvas",ref:x,children:M.jsx("div",{className:"loading",children:"Carregando o mapa…"})});const O=M.jsxs("div",{ref:Ne,className:"atlas-area",children:[s==="3d"?M.jsx(ax,{projetos:e.projetos,destacadoDe:r,algumFiltroAtivo:c,projetoAbertoId:(l==null?void 0:l.id)??null,largura:L,altura:D,onSelecionar:(f,P)=>C?A(f):P>=2?b(f):ut(f),onHover:(f,P,U)=>Q({p:f,x:P,y:U}),onHoverFim:()=>Q(null)}):M.jsx("svg",{ref:$,width:L,height:D,role:"img","aria-label":"Atlas de projetos, posição por semelhança temática ou por localidade, cor por instituição",style:{touchAction:"none",display:"block",userSelect:"none"},onPointerDown:f=>{C&&(Ue.current={x:f.clientX,y:f.clientY})},onClick:dt,children:M.jsxs("g",{transform:`translate(${F.x},${F.y}) scale(${F.k})`,children:[e.projetos.map(f=>{const P=c&&!r(f),U=P?null:(o==null?void 0:o(f))??null,z=P?gx:U!==null?du(Gn(f.sigla),_x,.75*(1-U)):Gn(f.sigla),J=k.get(f.id);if(!J)return null;const oe=(l==null?void 0:l.id)===f.id;return M.jsxs("g",{children:[M.jsx("circle",{cx:J.x,cy:J.y,r:Hi(f.n_producoes,N.fatorEscala),fill:z,opacity:P?.15:l&&!oe?.3:U!==null?.4+.5*U:.85,stroke:oe?"var(--color-text)":"none",strokeWidth:oe?2:0}),!P&&!C&&M.jsx("circle",{ref:G=>tt(G,f.id),cx:J.x,cy:J.y,r:cx,fill:"transparent",onMouseEnter:G=>Q({p:f,x:G.clientX,y:G.clientY}),onMouseMove:G=>Q({p:f,x:G.clientX,y:G.clientY}),onMouseLeave:()=>Q(null),"data-alvo-projeto":"",onClick:G=>{if(re.current){re.current=!1;return}if(G.detail>=2){b(f);return}ut(f,G.clientX,G.clientY)},style:{cursor:"grab"}}),oe&&M.jsx(vx,{sigla:f.sigla,x:J.x,y:J.y,r:Hi(f.n_producoes,N.fatorEscala)})]},f.id)}),Ie&&h&&Ie.rotulos.map(f=>{const P=g.rotuloSubtipo(f.grupo);return M.jsxs("text",{x:f.x,y:f.y,textAnchor:f.ancora,dominantBaseline:"central",style:{fontSize:3.4,fontWeight:700,fill:P.cor,stroke:"var(--color-surface)",strokeWidth:1.1,paintOrder:"stroke",pointerEvents:"none"},children:[M.jsx("tspan",{x:f.x,dy:"-0.6em",children:P.rotulo.length>qa?`${P.rotulo.slice(0,qa-1).trimEnd()}…`:P.rotulo}),M.jsx("tspan",{x:f.x,dy:"1.2em",children:f.mostradas<f.n?`${f.mostradas} de ${f.n}`:f.n})]},`rot-${f.grupo}`)}),Ie&&h&&Ie.satelites.map(f=>{const P=h[f.i],U=m===P.id_producao||(Pe==null?void 0:Pe.pr.id_producao)===P.id_producao,z=!zl(g,P,u);return M.jsx("g",{opacity:z?.16:1,children:M.jsx(hu,{marca:g.marca(P),cx:f.x,cy:f.y,r:U?Xa*1.35:Xa,anel:l?Gn(l.sigla):void 0,realce:U,onMouseEnter:C?void 0:J=>fe({pr:P,x:J.clientX,y:J.clientY}),onMouseMove:C?void 0:J=>fe({pr:P,x:J.clientX,y:J.clientY}),onMouseLeave:C?void 0:()=>fe(null),onClick:C?void 0:J=>pt(P,J.clientX,J.clientY)})},P.id_producao)})]})}),X&&X.p.id!==(le==null?void 0:le.p.id)&&!C&&M.jsx(gd,{x:X.x,y:X.y,p:X.p,tema:d.get(X.p.cluster)??"—",ficha:(_==null?void 0:_[X.p.id])??null}),ne&&ne.pr.id_producao!==(Pe==null?void 0:Pe.pr.id_producao)&&!C&&M.jsx(_d,{x:ne.x,y:ne.y,pr:ne.pr,marca:M.jsx(ka,{marca:g.marca(ne.pr),sigla:l==null?void 0:l.sigla}),destaques:za(p[(l==null?void 0:l.sigla)??""],ne.pr.id_producao),projetoNome:(l==null?void 0:l.nome)??null,responsaveis:l?((_t=_==null?void 0:_[l.id])==null?void 0:_t.responsaveis)??[]:[],sigla:l==null?void 0:l.sigla}),Pe&&l&&M.jsx(vd,{pr:Pe.pr,marca:M.jsx(ka,{marca:g.marca(Pe.pr),sigla:l.sigla}),destaques:za(p[l.sigla],Pe.pr.id_producao,4,260),links:Bl(p[l.sigla],Pe.pr.id_producao),projeto:l,tema:d.get(l.cluster)??"—",ficha:(_==null?void 0:_[l.id])??null,descricao:(S==null?void 0:S[l.id])??null,ancora:Pe.ancora,larguraArea:((ke=Ne.current)==null?void 0:ke.clientWidth)??L,detalheAberto:m===Pe.pr.id_producao,onDetalhe:()=>v(m===Pe.pr.id_producao?null:Pe.pr.id_producao),onFechar:()=>Ge(null)},Pe.pr.id_producao),le&&!l&&M.jsx(xd,{projeto:le.p,tema:d.get(le.p.cluster)??"—",ficha:(_==null?void 0:_[le.p.id])??null,descricao:(S==null?void 0:S[le.p.id])??null,ancora:le.ancora,onProducoes:()=>b(le.p),onFechar:()=>xe(null),larguraArea:((w=Ne.current)==null?void 0:w.clientWidth)??L})]});return M.jsx("div",{className:"atlas-canvas",ref:x,children:O})});function vx({sigla:n,x:e,y:t,r:i}){const s=gu(n),a=_u((s==null?void 0:s.sigla_ies)??n),[r,o]=ae.useState(null),c=i*.8;if(r===a)return M.jsx("text",{x:e,y:t,textAnchor:"middle",dominantBaseline:"central",textLength:i*1.7,lengthAdjust:"spacingAndGlyphs",style:{fontSize:i*.95,fontWeight:700,fill:"#fff",pointerEvents:"none"},children:n});const l=c*1.4;return M.jsxs("g",{style:{pointerEvents:"none"},children:[M.jsx("circle",{cx:e,cy:t,r:c,fill:"#fff"}),M.jsx("image",{href:a,x:e-l/2,y:t-l/2,width:l,height:l,preserveAspectRatio:"xMidYMid meet",onError:()=>o(a)})]})}const Mx={anppom:"Subárea — 1º nível (ANPPOM)",hdbscan:"Cluster (HDBSCAN)",topicos:"Tópico (LDA)",coautoria:"Comunidade (rede)"},Sx={anppom:"Subáreas",hdbscan:"Clusters (HDBSCAN)",topicos:"Tópicos (LDA)",coautoria:"Comunidades (rede de colaboração)"},Ex={anppom:"Área (ANPPOM)",hdbscan:"Cluster",topicos:"Tópico",coautoria:"Comunidade"},bx={anppom:"Subáreas temáticas (2º nível)",hdbscan:"Palavras-chave (TF-IDF)",topicos:"Termos do tópico",coautoria:"Palavras-chave (TF-IDF, calculada depois)"},Br={anppom:"ANPPOM (leitura)",hdbscan:"HDBSCAN (não supervisionado)",topicos:"Tópicos (LDA)",coautoria:"Coautoria (rede)"},yx={anppom:"subárea escolhida pela leitura do resumo",hdbscan:"grupos pelo texto, sem lista de áreas",topicos:"palavras que aparecem juntas",coautoria:"pessoas em comum, não o texto"},Tx={hdbscan:Du,topicos:Pu,coautoria:Cu};function Mi(n,e,t){return n!==null&&e.includes(n)?n:t}const Ax=["anppom","hdbscan","topicos","coautoria"],Rx=["tema","localidade"],wx=["2d","3d"],Cx=["regiao","uf","instituicao"],Px=["aderencia","discreto"],Dx=30,Lx=["filtros","metodo","sobre","camadas","legenda"];function Nx(){const[n,e]=Dc(),t=Mi(n.get("metodo"),Ax,"anppom"),i=Mi(n.get("camada"),Rx,"tema"),s=Mi(n.get("dim"),wx,"2d"),a=Mi(n.get("agrupar"),Cx,"instituicao"),r=Mi(n.get("peso"),Px,"aderencia"),o=Mi(n.get("painel"),Lx,"filtros"),c=n.has("painel"),l=n.get("projeto"),h=ae.useMemo(()=>Bu(n.get("ponte")),[]),[m,u]=ae.useState(null),g=n.get("producao"),_=ae.useCallback((H,te)=>{e(de=>{const Le=new URLSearchParams(de);for(const[Te,Ee]of Object.entries(H))Ee===null?Le.delete(Te):Le.set(Te,Ee);return Le},{replace:te})},[e]),[S,p]=ae.useState(null),[d,b]=ae.useState({}),[A,v]=ae.useState(!1),[R,T]=ae.useState(null),[C,x]=ae.useState(null),[y,L]=ae.useState("subarea"),[D,N]=ae.useState(null),[k,V]=ae.useState(Dx),[F,q]=ae.useState(()=>new Set),[X,Q]=ae.useState(()=>new Set),[ne,fe]=ae.useState(()=>new Set(h??[])),[le,xe]=ae.useState(h?"entre":"ou"),[Pe,Ge]=ae.useState(()=>new Set),[Ne,$]=ae.useState("ou"),[ie,re]=ae.useState(null),[Re,Ue]=ae.useState(null),[we,$e]=ae.useState(!1),[Ie,qe]=ae.useState(null),[He,We]=ae.useState(null),[rt,lt]=ae.useState(null),[ut,pt]=ae.useState(null),[tt,dt]=ae.useState({}),[O,_t]=ae.useState(()=>new Set),[ke,w]=ae.useState(null),[f,P]=ae.useState(!1),[U,z]=ae.useState(null),[J,oe]=ae.useState(!1),[G,K]=ae.useState(null),ue=(t==="anppom"?S:d[t]??null)??S;ae.useEffect(()=>{bu().then(p).catch(H=>x(String(H))),yu().then(re).catch(()=>{}),Tu().then(T).catch(()=>{}),Au().then(lt).catch(()=>{}),Ru().then(pt).catch(()=>{}),wu().then(N).catch(()=>{})},[]),ae.useEffect(()=>{t==="anppom"||d[t]||A||(v(!0),Tx[t]().then(H=>b(te=>({...te,[t]:H}))).catch(H=>x(String(H))).finally(()=>v(!1)))},[t,d,A]);const he=ae.useCallback(H=>{tt[H.sigla]||Lu(H.sigla).then(te=>dt(de=>({...de,[H.sigla]:te}))).catch(()=>{}),!Re&&!we&&($e(!0),Nu().then(Ue).catch(()=>Ue({})).finally(()=>$e(!1))),Ie||Iu().then(qe).catch(()=>qe({})),He||Uu().then(We).catch(()=>We({}))},[tt,Re,we,Ie,He]),ce=ae.useCallback(H=>{K(null),he(H),_({projeto:H.id,producao:null,painel:null},!1)},[he,_]),ye=ae.useCallback(()=>{K(null),_({projeto:null,producao:null,painel:null},!0)},[_]),me=ae.useCallback(H=>{_({producao:H},H===null)},[_]),Fe=ae.useCallback(H=>{_({painel:H,projeto:null,producao:null},!1)},[_]),I=ae.useCallback(()=>{_({painel:null,projeto:null,producao:null},!0)},[_]),ge=ae.useMemo(()=>ue?[...ue.clusters].sort((H,te)=>te.n_projetos-H.n_projetos):[],[ue]),ee=ge.filter(H=>F.has(H.cluster)),_e=k,ve=ae.useMemo(()=>D?new Map(D.projetos.map(H=>[H.id,H.a])):null,[D]),se=ae.useMemo(()=>D&&S?new Map(S.clusters.map(H=>[H.cluster,D.areas.indexOf(H.tema??"")])):null,[D,S]),De=t==="anppom"&&ve!==null&&se!==null,Ce=De&&r==="aderencia",nt=ae.useCallback(H=>{if(!Ce||F.size===0||!ve||!se)return null;const te=ve.get(H.id);if(!te)return 0;let de=0;for(const Le of F){const Te=se.get(Le);Te!==void 0&&Te>=0&&(de=Math.max(de,te[Te]))}return de},[Ce,F,ve,se]),Qe=le!=="ou"&&ne.size>=2;ae.useEffect(()=>{Qe&&!m&&Fu().then(u).catch(()=>{})},[Qe,m]),ae.useEffect(()=>{n.has("ponte")&&_({ponte:null},!0)},[]);const zt=ae.useCallback(()=>{ke||f||(P(!0),Ou().then(H=>{const te=new Map;for(let de=0;de<H.n;de++){const Le=H.projeto[de];if(Le<0)continue;const Te=H.projetos[Le];let Ee=te.get(Te);Ee||te.set(Te,Ee=new Set),Ee.add(ho(H.tipos[H.tipo[de]],H.subtipos[H.subtipo[de]]))}w(te)}).catch(()=>w(new Map)).finally(()=>P(!1)))},[ke,f]),Gt=ae.useMemo(()=>{if(!ke)return null;const H=new Map,te=new Map;for(const de of ke.values()){const Le=new Set;for(const Te of de){Le.add(Te.slice(0,Te.indexOf(" / ")));const Ee=H.get(Te);if(Ee)Ee.n++;else{const Ye=Te.indexOf(" / "),ct=Te.slice(0,Ye),ht=Te.slice(Ye+3);H.set(Te,{tipo:ct,subtipo:ht,n:1})}}for(const Te of Le)te.set(Te,(te.get(Te)??0)+1)}return $c(H,te)},[ke]),An=ae.useMemo(()=>ie?Jc(Pe,ie.vinculos):0,[ie,Pe]),Ks=ae.useMemo(()=>ie?Qc(Object.values(ie.por_projeto).map(H=>H.reduce((te,de)=>te|de,0)),ie.vinculos):null,[ie]),Li=ae.useCallback(H=>{if(!zu(H.sigla,(m==null?void 0:m.por_projeto[H.id])??0,ne,le,(m==null?void 0:m.siglas)??null))return!1;if(F.size>0){const te=nt(H);if(te!==null?te<_e:!F.has(H.cluster))return!1}if(X.size>0&&(!H.subarea||!X.has(H.subarea))||An!==0&&!((ie==null?void 0:ie.por_projeto[H.id])??[]).some(te=>fo(te,An,Ne))||U&&!U.pontos.has(H.id))return!1;if(O.size>0&&ke){const te=ke.get(H.id);if(!te||![...O].some(de=>te.has(de)))return!1}return!0},[U,O,ke,ne,F,X,nt,_e,An,Ne,ie,le,m]),Ni=ae.useCallback(H=>{const te=nt(H);if(te===null||te<_e)return null;const de=100-_e;return de>0?Math.max(0,Math.min(1,(te-_e)/de)):1},[nt,_e]),$i=ne.size>0||F.size>0||X.size>0||Pe.size>0||O.size>0||U!==null,Ji=ue&&$i?ue.projetos.filter(Li).length:(ue==null?void 0:ue.projetos.length)??0;function Wn(H,te){const de=new Set(H);return de.has(te)?de.delete(te):de.add(te),de}function pn(H){fe(te=>Wn(te,H))}function Ii(H){q(te=>{const de=Wn(te,H);if(te.has(H)&&!de.has(H)){const Le=ge.find(Te=>Te.cluster===H);if(Le){const Te=new Set(Le.subareas);Q(Ee=>{const Ye=new Set([...Ee].filter(ct=>!Te.has(ct)));return Ye.size===Ee.size?Ee:Ye})}}return de})}function Qi(H){Q(te=>Wn(te,H))}function es(H){Ge(te=>Wn(te,H))}function ni(){Ge(new Set),$("ou"),xe("ou"),fe(new Set),q(new Set),Q(new Set),_t(new Set),z(null)}function ts(H){q(new Set),Q(new Set),K(null),_({metodo:H==="anppom"?null:H,projeto:null,producao:null},!0)}function ii(H){_({peso:H==="aderencia"?null:H},!0)}function ns(H){_({camada:H==="tema"?null:H},!0)}function is(H){_(H==="3d"?{dim:"3d",camada:null}:{dim:null,camada:i==="tema"?null:i},!0)}function Zs(H){_({agrupar:H==="instituicao"?null:H},!0)}const $s=ae.useMemo(()=>{if(!ue)return[];const H=new Map;for(const te of ue.projetos)H.set(te.sigla,(H.get(te.sigla)??0)+1);return[...H.entries()].map(([te,de])=>({sigla:te,n:de})).sort((te,de)=>de.n-te.n)},[ue]),Js=ae.useMemo(()=>ue?[...new Set(ue.projetos.map(H=>H.sigla))].sort():[],[ue]),Qs=ae.useMemo(()=>new Map(ge.map(H=>[H.cluster,H.tema])),[ge]),E=ae.useMemo(()=>fu(ut),[ut]),B=ae.useMemo(()=>!l||!ue?null:ue.projetos.find(H=>H.id===l)??null,[l,ue]);ae.useEffect(()=>{B&&he(B)},[B==null?void 0:B.id]);const Z=B?(Re==null?void 0:Re[B.id])??null:null,j=ae.useMemo(()=>{if(!Z)return Z;const H=(ie==null?void 0:ie.vinculos)??null;return Z.filter(te=>{if(J&&te.classe!=="nucleo"||O.size>0&&!O.has(ho(te.tipo,te.subtipo)))return!1;if(An===0||!H)return!0;let de=0;for(const Le of te.autores){const Te=Le.vinculo!==null?H.indexOf(Le.vinculo):-1;Te>=0&&(de|=1<<Te)}return fo(de,An,Ne)})},[Z,J,O,An,Ne,ie]),Y=g,Me=ae.useCallback(H=>{(B==null?void 0:B.id)===H.id?ye():ce(H)},[B,ye,ce]),be=B?"ficha":c?o:null;return{error:C,dados:ue,atlasCarregado:ue!==null,programas:R,fichas:rt,esquema:E,detalhes:tt,carregandoAlternativo:A,membrosPorProjeto:Ie,descricoesPorProjeto:He,carregandoProducoes:we,metodo:t,organizarPor:i,dimensao:s,agruparLocalidade:a,modo:y,setModo:L,mudarMetodo:ts,modoPeso:r,mudarModoPeso:ii,pesoDisponivel:De,pesoAtivo:Ce,aderencia:D,alcance:k,setAlcance:V,limiarAlcance:_e,pesoDe:nt,intensidadeDe:Ni,mudarOrganizarPor:ns,mudarDimensao:is,mudarAgrupar:Zs,instituicoes:$s,siglasOrdenadasAlfabeto:Js,clustersOrdenados:ge,temasAtivos:ee,temaPorCluster:Qs,siglasSel:ne,modoInstituicao:le,setModoInstituicao:xe,limparInstituicoes:()=>{fe(new Set),xe("ou")},vinculosSel:Pe,modoVinculo:Ne,setModoVinculo:$,vinculos:(ie==null?void 0:ie.vinculos)??null,contagensVinculo:Ks,alternarVinculo:es,tipoSubSel:O,setTipoSubSel:_t,gruposTipo:Gt,carregarTipos:zt,temaSel:U,setTemaSel:z,temasSel:F,subareas2Sel:X,alternarSigla:pn,alternarTema:Ii,alternarSubarea2:Qi,limparFiltros:ni,algumFiltroAtivo:$i,contagemFiltrada:Ji,destacadoDe:Li,projetoAberto:B,producoesAbertas:Z,producoesVisiveis:j,producaoSel:Y,selecionarProjeto:ce,alternarProjeto:Me,fecharProjeto:ye,selecionarProducao:me,apenasNucleo:J,setApenasNucleo:oe,filtroProd:G,setFiltroProd:K,painel:be,abrirPainel:Fe,fecharPainel:I}}function Rl(n){return n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}const Ix=6,Ux={anppom:"ANPPOM",hdbscan:"HDBSCAN",topicos:"Tópicos",coautoria:"Coautoria"},Fx={anppom:"Cada projeto foi lido (título e resumo) e colocado numa das 9 subáreas: as 8 da ANPPOM e Musicoterapia. Numa amostra conferida pelo autor, a subárea está certa ou numa fronteira que se defende na grande maioria dos casos.",hdbscan:'Sem lista de áreas: o computador junta os projetos cujos resumos dizem coisas parecidas. Quem não se parece com nenhum grupo fica em "sem cluster", e isso também é informação.',topicos:'O computador procura grupos de palavras que costumam aparecer juntas nos resumos (os "tópicos") e mostra, para cada projeto, o tópico que mais pesa nele.',coautoria:"O texto não conta: projetos com alguém em comum ficam ligados, e os grupos são as comunidades dessa rede. A posição mostra quem trabalha com quem."};function Ox({metodo:n,carregando:e,onMetodo:t}){return M.jsxs("div",{className:"atlas-metodo-conteudo",children:[M.jsx("div",{className:"atlas-metodo-lista",role:"radiogroup","aria-label":"Método de clusterização",children:Object.keys(Br).map(i=>M.jsxs("button",{type:"button",role:"radio","aria-checked":n===i,className:`atlas-metodo-opcao${n===i?" ativo":""}`,onClick:()=>t(i),children:[M.jsx("span",{className:"atlas-metodo-nome",children:Br[i]}),M.jsx("span",{className:"atlas-metodo-selo",children:yx[i]})]},i))}),e&&M.jsx("p",{className:"atlas-tooltip-nota",children:"carregando…"}),M.jsx("p",{className:"atlas-metodo-explica",children:Fx[n]})]})}function Bx({projetos:n,fichas:e,metodo:t,qtdFiltros:i,aberto:s,comPopover:a,filtros:r,metodos:o,onEscolher:c,onAlternar:l,onFecharPopover:h,temaAtivo:m,onTema:u,onLimparTema:g}){const[_,S]=ae.useState(""),[p,d]=ae.useState(eu),b=ae.useRef(null);zr(b,a&&s!==null,h);const A=ae.useMemo(()=>{var T;const v=Rl(_.trim());if(v.length<2)return[];const R=[];for(const C of n)if([C.nome??"",C.sigla,...((T=e==null?void 0:e[C.id])==null?void 0:T.responsaveis)??[]].map(Rl).some(y=>y.includes(v))&&R.push(C),R.length>=Ix)break;return R},[_,n,e]);return M.jsxs("div",{className:"atlas-topo",ref:b,children:[M.jsxs("div",{className:`atlas-topo-barra atlas-flutua${s?" aberto":""}`,children:[M.jsx(tu,{qual:"projetos",modo:p,onModo:d,valor:_,onValor:S,rotuloTexto:"Buscar projeto, pessoa ou instituição",dicaTexto:"Título do projeto, responsável ou instituição",temaAtivo:m,onTema:u,onLimparTema:g,resultadosTexto:M.jsxs(M.Fragment,{children:[A.length>0&&M.jsx("ul",{className:"atlas-busca-lista",children:A.map(v=>M.jsx("li",{children:M.jsxs("button",{type:"button",onClick:()=>{c(v),S("")},children:[M.jsx("span",{className:"legenda-marca",style:{background:Gn(v.sigla)}}),M.jsx("span",{className:"atlas-busca-titulo",children:v.nome??"(sem título)"}),M.jsxs("span",{className:"atlas-busca-meta",children:[v.sigla,v.ano?` · ${v.ano}`:""]})]})},v.id))}),_.trim().length>=2&&A.length===0&&M.jsx("p",{className:"atlas-busca-vazio",children:"Nada encontrado por título, instituição ou responsável."})]})}),M.jsxs("button",{type:"button",className:`atlas-topo-botao${i>0?" com-filtro":""}${s==="filtros"?" ativo":""}`,"aria-expanded":s==="filtros","aria-haspopup":"dialog","aria-label":i>0?`Filtros (${i} ativos)`:"Filtros",onClick:()=>l("filtros"),children:[M.jsx(Lc,{}),M.jsx("span",{className:"atlas-topo-rotulo",children:"Filtros"}),i>0&&M.jsx("span",{className:"atlas-topo-contador",children:i})]}),M.jsxs("button",{type:"button",className:`atlas-topo-botao${s==="metodo"?" ativo":""}`,"aria-expanded":s==="metodo","aria-haspopup":"dialog","aria-label":`Método de clusterização: ${Br[t]}`,onClick:()=>l("metodo"),children:[M.jsx(Nc,{}),M.jsx("span",{className:"atlas-topo-rotulo",children:Ux[t]})]})]}),a&&s==="filtros"&&M.jsx("div",{className:"flutuante-painel",role:"dialog","aria-label":"Filtrar pontos do mapa",children:r}),a&&s==="metodo"&&M.jsxs("div",{className:"flutuante-painel",role:"dialog","aria-label":"Método de clusterização",children:[M.jsxs("header",{className:"flutuante-cab",children:[M.jsx("strong",{children:"Método de clusterização"}),M.jsx("button",{type:"button",className:"painel-fechar",onClick:h,"aria-label":"Fechar",children:"✕"})]}),o]})]})}function zx({organizarPor:n,dimensao:e,agruparLocalidade:t,onOrganizar:i,onDimensao:s,onAgrupar:a}){return M.jsxs("div",{className:"atlas-camadas-conteudo",children:[M.jsxs("div",{className:"atlas-camada-grupo",children:[M.jsx("span",{className:"atlas-camada-rotulo",id:"rot-camada",children:"Posição dos pontos"}),M.jsxs("div",{className:"segmented",role:"group","aria-labelledby":"rot-camada",children:[M.jsx("button",{type:"button",className:n==="tema"?"ativo":"","aria-pressed":n==="tema",onClick:()=>i("tema"),children:"Tema"}),M.jsx("button",{type:"button",className:n==="localidade"?"ativo":"","aria-pressed":n==="localidade",disabled:e==="3d",onClick:()=>i("localidade"),children:"Localidade"})]}),e==="3d"&&M.jsx("span",{className:"chart-nota",style:{margin:0},children:"Localidade só existe em 2D — a geografia em 3D ainda não foi feita (ver o plano)."})]}),n==="localidade"&&e==="2d"&&M.jsxs("div",{className:"atlas-camada-grupo",children:[M.jsx("span",{className:"atlas-camada-rotulo",id:"rot-agrupar",children:"Agrupar geografia por"}),M.jsx("div",{className:"segmented",role:"group","aria-labelledby":"rot-agrupar",children:["regiao","uf","instituicao"].map(r=>M.jsx("button",{type:"button",className:t===r?"ativo":"","aria-pressed":t===r,onClick:()=>a(r),children:r==="regiao"?"Região":r==="uf"?"UF":"Instituição"},r))})]}),M.jsxs("div",{className:"atlas-camada-grupo",children:[M.jsx("span",{className:"atlas-camada-rotulo",id:"rot-dim",children:"Dimensão"}),M.jsxs("div",{className:"segmented",role:"group","aria-labelledby":"rot-dim",children:[M.jsx("button",{type:"button",className:e==="2d"?"ativo":"","aria-pressed":e==="2d",onClick:()=>s("2d"),children:"2D"}),M.jsx("button",{type:"button",className:e==="3d"?"ativo":"","aria-pressed":e==="3d",disabled:n==="localidade",onClick:()=>s("3d"),children:"3D"})]}),n==="localidade"&&M.jsx("span",{className:"chart-nota",style:{margin:0},children:"3D só existe com a posição por Tema — a geografia em 3D ainda não existe. Volte a Tema para usar o 3D."})]})]})}function Gx({aberto:n,comPopover:e,conteudo:t,onAlternar:i,onFecharPopover:s,onZoom:a,onReenquadrar:r,onSobre:o}){const c=ae.useRef(null);return zr(c,e&&n,s),M.jsxs("div",{className:"atlas-lateral",ref:c,children:[M.jsxs("div",{className:`atlas-lateral-pilha atlas-flutua${n?" aberto":""}`,role:"toolbar","aria-label":"Controles do mapa","aria-orientation":"vertical",children:[M.jsx("button",{type:"button",className:`atlas-icone-botao${n?" ativo":""}`,"aria-expanded":n,"aria-haspopup":"dialog","aria-label":"Camadas do mapa",title:"Camadas: posição dos pontos e dimensão",onClick:i,children:M.jsx(Ic,{})}),M.jsx("button",{type:"button",className:"atlas-icone-botao so-desktop","aria-label":"Aproximar",title:"Aproximar",onClick:()=>a(1.5),children:M.jsx(Uc,{})}),M.jsx("button",{type:"button",className:"atlas-icone-botao so-desktop","aria-label":"Afastar",title:"Afastar",onClick:()=>a(1/1.5),children:M.jsx(Fc,{})}),M.jsx("button",{type:"button",className:"atlas-icone-botao","aria-label":"Reenquadrar tudo",title:"Reenquadrar tudo",onClick:r,children:M.jsx(Oc,{})}),M.jsx("a",{className:"atlas-icone-botao",href:"#atlas-tabelas","aria-label":"Ver as tabelas abaixo do mapa",title:"Ver as tabelas abaixo do mapa",children:M.jsx(Bc,{})}),M.jsx("button",{type:"button",className:"atlas-icone-botao","aria-label":"Sobre este mapa",title:"Sobre este mapa",onClick:o,children:M.jsx(zc,{})})]}),e&&n&&M.jsxs("div",{className:"flutuante-painel",role:"dialog","aria-label":"Camadas do mapa",children:[M.jsxs("header",{className:"flutuante-cab",children:[M.jsx("strong",{children:"Camadas"}),M.jsx("button",{type:"button",className:"painel-fechar",onClick:s,"aria-label":"Fechar",children:"✕"})]}),t]})]})}function kx({metodo:n,instituicoes:e,clustersOrdenados:t,temasAtivos:i,siglasSel:s,modoInstituicao:a,onModoInstituicao:r,temasSel:o,subareas2Sel:c,vinculos:l,vinculosSel:h,modoVinculo:m,onModoVinculo:u,contagensVinculo:g,onVinculo:_,algumFiltroAtivo:S,modoPeso:p,pesoDisponivel:d,onModoPeso:b,aderencia:A,alcance:v,onAlcance:R,contagem:T,total:C,onSigla:x,onTema:y,onSubarea2:L,onLimpar:D,filtroTipo:N}){return M.jsxs("div",{className:"atlas-filtros",children:[S&&M.jsx("div",{className:"atlas-filtros-contagem",children:M.jsx("button",{type:"button",className:"chip",onClick:D,children:"Limpar filtros"})}),M.jsxs("details",{open:!0,className:"atlas-sidebar-secao",children:[M.jsxs("summary",{children:["Instituição",s.size>0?` (${s.size})`:""]}),M.jsx(nu,{modo:a,onModo:r,qtdMarcadas:s.size,unidade:"projetos"}),M.jsx(na,{itens:e.map(({sigla:k,n:V})=>({chave:k,marcado:s.has(k),no:M.jsxs("label",{className:"atlas-checkbox",children:[M.jsx("input",{type:"checkbox",checked:s.has(k),onChange:()=>x(k)}),M.jsx("span",{className:"legenda-marca",style:{background:Gn(k)}}),k," (",V,")"]})}))})]}),l&&M.jsx(iu,{vinculos:l,sel:h,contagens:g,unidade:"projetos",modo:m,onModo:u,onAlternar:_}),N,M.jsxs("details",{open:!0,className:"atlas-sidebar-secao",children:[M.jsxs("summary",{children:[Mx[n],o.size>0?` (${o.size})`:""]}),n==="anppom"&&M.jsxs("div",{className:"atlas-filtros-peso",children:[M.jsxs("div",{className:"segmented",role:"group","aria-label":"Como as subáreas marcadas pintam o mapa",children:[M.jsx("button",{type:"button",className:p==="discreto"?"ativo":"","aria-pressed":p==="discreto",onClick:()=>b("discreto"),children:"Discretas"}),M.jsx("button",{type:"button",className:p==="aderencia"?"ativo":"","aria-pressed":p==="aderencia",disabled:!d,onClick:()=>b("aderencia"),children:"Por aderência"})]}),M.jsx("span",{className:"chart-nota",style:{margin:0},children:p==="aderencia"&&d?o.size>0?"Os pontos acendem conforme o quanto o texto do projeto pertence às subáreas marcadas.":"Marque uma ou mais subáreas: os pontos acendem conforme o quanto o texto do projeto pertence a elas.":"Discretas: o projeto está ou não na subárea. Por aderência: o quanto ele pertence."}),p==="aderencia"&&d&&A&&o.size>0&&M.jsx(su,{nomes:t.filter(k=>o.has(k.cluster)).map(k=>k.tema),aderencia:A,alcance:v,onAlcance:R,contagem:T,total:C})]}),M.jsx(na,{itens:t.map(k=>({chave:k.cluster,marcado:o.has(k.cluster),no:M.jsxs("label",{className:"atlas-checkbox",children:[M.jsx("input",{type:"checkbox",checked:o.has(k.cluster),onChange:()=>y(k.cluster)}),k.tema," (",k.n_projetos,")"]})}))})]}),n==="anppom"&&M.jsxs("details",{className:"atlas-sidebar-secao",children:[M.jsxs("summary",{children:["Subárea — 2º nível",c.size>0?` (${c.size})`:""]}),i.length===0?M.jsx("p",{className:"chart-nota",style:{margin:"0.5rem 0"},children:"Marque uma subárea de 1º nível pra ver as de 2º nível."}):i.map(k=>M.jsxs("div",{className:"atlas-sidebar-subgrupo",children:[M.jsx("div",{className:"atlas-sidebar-subgrupo-titulo",children:k.tema}),M.jsx(na,{itens:k.subareas.map(V=>({chave:V,marcado:c.has(V),no:M.jsxs("label",{className:"atlas-checkbox",children:[M.jsx("input",{type:"checkbox",checked:c.has(V),onChange:()=>L(V)}),V]})}))})]},k.cluster))]})]})}function Vx({projeto:n,producoes:e,membros:t,descricao:i,carregando:s,producaoSel:a,onProducao:r,esquema:o,filtro:c,totalGeral:l}){return M.jsxs("div",{className:"atlas-painel-conteudo",children:[i&&M.jsxs("div",{className:"atlas-painel-descricao",children:[M.jsx("strong",{children:"Descrição"}),M.jsx("p",{children:i})]}),t&&t.length>0&&M.jsxs("div",{className:"atlas-painel-membros",children:[M.jsxs("strong",{children:["Membros (",t.length,")"]}),M.jsx("ul",{className:"atlas-painel-lista",children:t.map((h,m)=>M.jsxs("li",{children:[h.principal?M.jsxs("span",{className:"nomes-com-logo-pessoa",children:[M.jsx(xu,{sigla:n.sigla,tamanho:"sm"}),M.jsx("strong",{children:h.nome})]}):h.nome,M.jsxs("span",{className:"atlas-tooltip-nota",children:[" ","— ",h.papel??"papel não informado",h.principal?" · responsável":""]})]},m))})]}),M.jsxs("div",{className:"atlas-painel-producoes",children:[M.jsxs("strong",{children:["Produções",e?l!==void 0&&l!==e.length?` (${e.length} de ${l})`:` (${e.length})`:""]}),s&&M.jsx("p",{className:"chart-nota",children:"Carregando produções…"}),!s&&e&&e.length===0&&M.jsx("p",{className:"chart-nota",children:"Nenhuma produção vinculada a este projeto nesta base."}),!s&&e&&e.length>0&&M.jsx("ul",{className:"atlas-painel-lista",children:e.map(h=>M.jsx(Mu,{p:h,sigla:n.sigla,marca:M.jsx(ka,{marca:o.marca(h),sigla:n.sigla}),apagado:!zl(o,h,c),aberta:a===h.id_producao,destaque:a===h.id_producao,onAlternar:()=>r(a===h.id_producao?null:h.id_producao)},h.id_producao))})]})]})}function Hx({aberto:n,projeto:e,tema:t,ficha:i,detalhes:s,descricao:a,membros:r,producoes:o,producoesAbertas:c,carregando:l,producaoSel:h,esquema:m,filtro:u,apenasNucleo:g,onApenasNucleo:_,onSelecionarProducao:S,onFechar:p,aderencia:d,limiarAlcance:b}){var C;if(!n||!e)return null;const A=h&&o?o.find(x=>x.id_producao===h)??null:null,v=(i==null?void 0:i[e.id])??null,R=s[e.sigla],T=M.jsxs(M.Fragment,{children:[M.jsx("strong",{children:e.nome??"(sem título)"}),M.jsx("div",{className:"atlas-tooltip-nota",children:Fl(e,v)}),M.jsxs("div",{className:"atlas-tooltip-nota",children:[t,e.subarea?` · ${e.subarea}`:""]})]});return M.jsx(Si,{aberto:!0,ariaLabel:`Projeto: ${e.nome??""}`,titulo:A?M.jsx("strong",{children:A.nome??"sem título registrado"}):T,onFechar:p,onVoltar:A?()=>S(null):void 0,rotuloVoltar:"Produções",acoes:A?M.jsxs(M.Fragment,{children:[A.link&&M.jsx("a",{className:"atlas-icone-acao",href:A.link,target:"_blank",rel:"noreferrer",title:"Abrir a página desta produção na Plataforma Sucupira","aria-label":"Abrir na Plataforma Sucupira",children:M.jsx(Pl,{})}),Bl(R,A.id_producao).map(x=>M.jsx("a",{className:"atlas-icone-acao",href:x.url,target:"_blank",rel:"noreferrer",title:`${x.rotulo}: ${x.url}`,"aria-label":`${x.rotulo} (abre em outra aba)`,children:M.jsx(Ll,{})},x.url)),M.jsx(Ba,{className:"atlas-icone-acao",to:`/mapa-de-producoes?producao=${A.id_producao}`,title:"Ver esta produção no Mapa de produções","aria-label":"Ver esta produção no Mapa de produções",children:M.jsx(Nl,{})}),M.jsx("button",{type:"button",className:"atlas-icone-acao",onClick:()=>S(null),title:"Voltar ao projeto, com a produção destacada na lista","aria-label":"Voltar ao projeto",children:M.jsx(Dl,{})})]}):c?M.jsxs("div",{className:"atlas-foco-modo",role:"group","aria-label":"Quais produções mostrar",children:[M.jsxs("button",{type:"button",className:`chip${g?"":" ativo"}`,"aria-pressed":!g,onClick:()=>_(!1),children:["Todas (",c.length,")"]}),M.jsxs("button",{type:"button",className:`chip${g?" ativo":""}`,"aria-pressed":g,onClick:()=>_(!0),children:["Só núcleo (",c.filter(x=>x.classe==="nucleo").length,")"]})]}):void 0,children:A?M.jsx(Ol,{pr:A,destaques:za(R,A.id_producao,6,300),projeto:e,tema:t,ficha:v,descricao:(a==null?void 0:a[e.id])??null}):M.jsxs(M.Fragment,{children:[d&&M.jsx(au,{aderencia:d,a:((C=d.projetos.find(x=>x.id===e.id))==null?void 0:C.a)??[],limiar:b}),M.jsx(Vx,{projeto:e,producoes:o,membros:(r==null?void 0:r[e.id])??null,descricao:(a==null?void 0:a[e.id])??null,carregando:l,producaoSel:h,onProducao:S,esquema:m,filtro:u,totalGeral:c==null?void 0:c.length}),M.jsx(Ba,{className:"chip mapa-prod-link",to:`/mapa-de-producoes?projeto=${e.id}`,children:"Ver as produções no Mapa de produções →"})]})})}function Wx({viewBox:n,preserveAspectRatio:e="xMidYMid meet",larguraMinima:t,rotulo:i,className:s,children:a}){return M.jsx("svg",{viewBox:n,preserveAspectRatio:e,className:s,style:{display:"block",width:"100%",height:"auto"},role:i?"img":void 0,"aria-label":i,"aria-hidden":i?void 0:!0,focusable:"false","data-largura-minima":t,children:a})}function Xx(n,e,t=11){return t*n/e}const wl=340,Cl=300;function qx(){const n=Xx(wl,Cl,11),e=44,t=58,i=24;return M.jsxs(Wx,{viewBox:`0 0 ${wl} 116`,larguraMinima:Cl,rotulo:"Anatomia da marca de produção",children:[M.jsx("circle",{cx:e,cy:t,r:i*1.25,fill:"none",stroke:"var(--color-accent)",strokeWidth:4}),M.jsx("circle",{cx:e,cy:t,r:i,fill:"var(--serie-4)",stroke:"var(--color-accent)",strokeWidth:5}),M.jsx("text",{x:e,y:t+1,textAnchor:"middle",dominantBaseline:"central",fontSize:i*.9,fill:"var(--color-text)",children:"?"}),M.jsxs("g",{fontSize:n,fill:"var(--color-text-muted)",children:[M.jsx("line",{x1:e+30,y1:t-20,x2:112,y2:12,stroke:"var(--color-border)",strokeWidth:1}),M.jsx("text",{x:116,y:16,children:"anel = instituição"}),M.jsx("line",{x1:e+25,y1:t-8,x2:112,y2:40,stroke:"var(--color-border)",strokeWidth:1}),M.jsx("text",{x:116,y:44,children:"borda = tipo"}),M.jsx("line",{x1:e+25,y1:t+6,x2:112,y2:68,stroke:"var(--color-border)",strokeWidth:1}),M.jsx("text",{x:116,y:72,children:"miolo = família do subtipo"}),M.jsx("line",{x1:e+8,y1:t+26,x2:112,y2:96,stroke:"var(--color-border)",strokeWidth:1}),M.jsx("text",{x:116,y:100,children:"ícone = subtipo exato"})]})]})}function jx({siglas:n,producoes:e,esquema:t,filtro:i,onFiltro:s}){return M.jsxs("div",{className:"atlas-legenda-corpo",children:[M.jsxs("p",{className:"atlas-legenda-minima",children:["círculo = um projeto (tamanho = nº de produções) · ",M.jsx("strong",{children:"cor = instituição"})," · anel da marca = instituição · borda = tipo"]}),M.jsx(qx,{}),M.jsx("div",{className:"legenda",children:n.map(a=>M.jsxs("span",{className:"legenda-item",children:[M.jsx("span",{className:"legenda-marca",style:{background:Gn(a)}}),a]},a))}),e&&e.length>0&&M.jsx(Su,{esquema:t,producoes:e,filtro:i,onFiltro:s})]})}function Yx({aberta:n,comPopover:e,filtroAtivo:t,onAlternar:i,onFechar:s,conteudo:a}){const r=ae.useRef(null);return zr(r,e&&n,s),M.jsxs("div",{className:"atlas-legenda",ref:r,children:[e&&n&&M.jsxs("div",{className:"flutuante-painel",role:"dialog","aria-label":"Chave do mapa",children:[M.jsxs("header",{className:"flutuante-cab",children:[M.jsx("strong",{children:"Chave do mapa"}),M.jsx("button",{type:"button",className:"painel-fechar",onClick:s,"aria-label":"Fechar",children:"✕"})]}),a]}),M.jsxs("button",{type:"button",className:`atlas-legenda-botao atlas-flutua${n?" aberto ativo":""}`,"aria-expanded":n,"aria-haspopup":"dialog",onClick:i,children:[M.jsx(Gc,{}),M.jsx("span",{children:"Legenda"}),t&&M.jsx("span",{className:"atlas-legenda-ponto",role:"img","aria-label":"filtro de produções ativo"})]})]})}function Kx({metodo:n,dimensao:e,organizarPor:t,avisoRotulo:i,totalProjetos:s,totalProgramas:a,aderencia:r}){return M.jsxs("div",{className:"atlas-sobre",children:[M.jsxs("p",{children:[s," projetos de pesquisa dos ",a," programas, um ponto por projeto. Os pontos podem ser organizados por ",M.jsx("strong",{children:"assunto"})," (projetos parecidos ficam perto) ou por ",M.jsx("strong",{children:"lugar"}),' (onde fica o programa). As subáreas são 9: as 8 oficiais da ANPPOM (2025) e Musicoterapia, destacada de "Demais Subáreas e Interfaces" por ser um campo grande e distinto.']}),M.jsx("h3",{children:"Como os pontos foram classificados"}),M.jsxs("p",{children:[n==="anppom"?M.jsxs(M.Fragment,{children:[M.jsx("strong",{children:"A subárea de cada projeto foi escolhida pela leitura do título e do resumo, não por contagem de palavras."})," ",i," A leitura foi feita por um modelo de linguagem, e o autor conferiu uma amostra: os erros que sobram são, quase sempre, projetos de fronteira (um estudo de prática historicamente informada pode ser Performance ou Musicologia). Uma tentativa anterior, só por semelhança de vocabulário, confundia Performance com Composição e foi abandonada."]}):M.jsxs(M.Fragment,{children:[M.jsx("strong",{children:"Este método não usa as subáreas da ANPPOM."})," ",i]})," ","O título de cada projeto é público, qualquer que seja o tamanho do cluster, e o painel do projeto mostra a descrição, os membros e as produções com a autoria (transparência total, decisão registrada no PLANO). Cada ponto identifica programa, ano, tema, título e nº de produções."]}),r&&M.jsxs(M.Fragment,{children:[M.jsx("h3",{children:"Aderência × grupos discretos"}),M.jsxs("p",{children:["Por padrão, marcar uma subárea em Filtros mostra o ",M.jsx("strong",{children:"quanto"})," o texto de cada projeto pertence a ela — não só quem está no grupo. O matiz continua sendo a instituição, e a aderência vira saturação e opacidade. O controle de ",M.jsx("em",{children:"alcance"}),', no mesmo painel, decide até onde ir: do só o principal aos vínculos fracos. A ficha do projeto mostra o perfil completo (as 9 áreas). Em Filtros, "Discretas" volta ao modo antigo, em que o projeto está ou não no grupo (',M.jsx("code",{children:"?peso=discreto"})," na URL)."]}),M.jsxs("p",{children:[M.jsx("strong",{children:"Aderência não é probabilidade."})," É o grau, na escala de A (muito alto) a I (sem relevância) que o autor usou para julgar ",r.validacao.casos," projetos às cegas, previsto para os demais por um modelo pequeno que combina o rótulo por leitura (o grupo principal) com a similaridade entre o resumo e descrições de cada área (as áreas relacionadas). Validado deixando um caso de fora por vez, nesses"," ",r.validacao.casos," casos: o grupo principal acerta em"," ",Math.round(r.validacao.principal*100),"%",r.validacao.principal_defensavel!=null&&M.jsxs(M.Fragment,{children:[" ","(",Math.round(r.validacao.principal_defensavel*100),"% contando como acerto os casos de fronteira, em que o autor considerou as duas áreas defensáveis)"]})," ","e a separação entre áreas relevantes e irrelevantes em"," ",Math.round(r.validacao.relevante_irrelevante*100),"% dos pares. Com tão poucos casos a margem é de uns 10 pontos, e o modelo ",M.jsx("strong",{children:"não distingue graus intermediários"}),': o que ele diz bem é "relevante ou não". Os julgamentos continuam sendo ampliados. Disponível no método ANPPOM.']})]}),M.jsx("h3",{children:"Como ler a posição"}),M.jsxs("p",{children:[n==="coautoria"?M.jsxs(M.Fragment,{children:["No modo Tema, a posição vem da própria rede de pessoas: projetos ligados por gente em comum se atraem, e os demais se afastam (um desenho de rede por forças). Perto quer dizer ",M.jsx("strong",{children:"perto na rede"}),", não assunto parecido. Um projeto sem ninguém em comum com outro fica numa margem à parte: não porque o tema seja diferente, mas porque não tem vizinho na rede."]}):M.jsxs(M.Fragment,{children:["No modo Tema, a posição vem do ",M.jsx("strong",{children:"sentido do resumo"}),", em dois passos. Primeiro, um modelo de linguagem transforma cada resumo numa lista de números que resume o que ele diz (um ",M.jsx("em",{children:"embedding"}),", do modelo multilíngue"," ",M.jsx("code",{children:"paraphrase-multilingual-MiniLM-L12-v2"}),"): resumos que dizem coisas parecidas geram listas parecidas. Depois, como essas listas têm centenas de números, um método chamado ",M.jsx("strong",{children:"UMAP"})," as achata em duas dimensões, tentando manter perto o que estava perto. Por isso: ",M.jsx("strong",{children:"proximidade quer dizer assunto parecido"}),'; os eixos não têm significado, e a distância exata entre dois pontos longe um do outro também não. Quando o resumo é vazio ou quase (um ponto, "Sem descrição"), vale o título.']})," ","No modo Localidade a posição já não é UMAP nem rede: é a geografia real, desamontoada só o suficiente para não sobrepor — em 3 níveis encadeados (Região/UF/Instituição, no menu Camadas), do centroide mais agregado ao mais fino, sempre a partir da coordenada real da sede de cada programa."]}),M.jsxs("p",{children:[M.jsx("strong",{children:"Busca por tema."})," O ícone à esquerda da lupa escolhe o tipo de busca. No modo"," ",M.jsx("strong",{children:"Tema"})," (o padrão), escolha um dos termos sugeridos: o mapa vai até a região onde estão os projetos mais próximos dele, no mesmo espaço de ",M.jsx("em",{children:"embeddings"}),' de onde saem as posições, e acende esses projetos. Os termos são as palavras e expressões que aparecem nos títulos e resumos, e a proximidade foi calculada antes, com o mesmo modelo: por isso a busca vai pelo sentido, e "guitarra" também encontra violão. Uma palavra solta pode ter mais de um sentido ("regência", "choro"), e aí o resultado erra mais; duas palavras podem ser somadas ("violão + improvisação"). O modo ',M.jsx("strong",{children:"Texto"})," procura o que está escrito: título, responsável ou instituição."]}),M.jsxs("p",{children:["O tamanho do ponto é sempre nº de produções no quadriênio, e a cor é sempre a instituição.",e==="3d"&&M.jsxs(M.Fragment,{children:[" ",M.jsx("strong",{children:"Em 3D"}),' a posição vem de uma redução independente da 2D (mesmo método, terceira dimensão própria) — não é a mesma nuvem "com profundidade", é outra projeção. Arraste para girar, roda do mouse dá zoom.']})]}),M.jsx("h3",{children:"A cor e a marca"}),M.jsxs("p",{children:[M.jsx("strong",{children:"A cor é sempre por instituição"})," — tirada do logo de cada uma, não de uma paleta arbitrária, e ajustada para que as cores fiquem distinguíveis. Com tantas instituições, cores vizinhas ainda podem ficar parecidas para quem tem daltonismo: por isso a legenda nomeia cada uma, clicar isola, e cada marca de produção leva um ",M.jsx("strong",{children:"anel externo"})," na cor do programa dela. Nunca confie só na cor."]}),M.jsxs("p",{children:["As marcas de produção (as bolinhas ao redor do projeto aberto) têm três camadas: a"," ",M.jsx("strong",{children:"borda"})," é o tipo (bibliográfica, artístico-cultural, técnica); o"," ",M.jsx("strong",{children:"miolo"})," agrupa o subtipo por família; o ",M.jsx("strong",{children:"ícone"})," identifica o subtipo exato. Tudo vem de ",M.jsx("code",{children:"esquema_producao.json"})," — a cor agrupa, o ícone é que identifica."]}),M.jsx("h3",{children:"Como mexer"}),M.jsxs("p",{children:["Roda do mouse e pinça dão zoom; arrastar o fundo move o mapa.",t==="localidade"&&" A posição geográfica é desamontoada por força — arrastar um ponto move só ele, e o resto se reacomoda."," ","Passe o mouse sobre um ponto para ver o título, o resumo, o responsável e o fomento;"," ",M.jsx("strong",{children:"clicar"})," no ponto fixa o cartão do projeto (dá para rolar e ler a descrição inteira) e o ícone de ",M.jsx("em",{children:"produções"})," abre a lista no painel. No celular, o toque abre a folha da ficha: arraste a alça para subir, toque no fundo do mapa para fechar. Esc ou o botão voltar do sistema também fecham."]})]})}const Zx={anppom:"Subáreas",hdbscan:"Clusters",topicos:"Tópicos",coautoria:"Comunidades"};function r0(){var x;const n=Nx(),e=ae.useRef(null),t=vu(),[i,s]=ae.useState(null),[a,r]=ae.useState(!1),o=ae.useCallback(()=>s(null),[]),c=ae.useCallback(()=>r(!1),[]);if(n.error)return M.jsxs("div",{className:"error",children:["Erro ao carregar dados: ",n.error]});if(!n.dados)return M.jsx("div",{className:"loading",children:"Carregando…"});if(n.dados.projetos.length===0)return M.jsx(ru,{oque:"Mapa de projetos"});const l=n.dados,h=((x=n.programas)==null?void 0:x.length)??n.siglasOrdenadasAlfabeto.length,m=n.siglasSel.size+n.temasSel.size+n.subareas2Sel.size+n.vinculosSel.size+n.tipoSubSel.size,u=y=>t?n.painel===y:y==="legenda"?a:i===y,g=y=>{t?n.painel===y?n.fecharPainel():n.abrirPainel(y):y==="legenda"?r(L=>!L):s(L=>L===y?null:y)},_=()=>{s(null),n.abrirPainel("sobre")},S=y=>{s(null),n.selecionarProjeto(y)},p=y=>{var N;const L=new Set((l==null?void 0:l.projetos.map(k=>k.id))??[]),D=new Map([...cu(y.temas,y.termos)].filter(([k])=>L.has(k)));s(null),n.projetoAberto&&n.fecharProjeto(),n.setTemaSel({rotulo:y.rotulo,pontos:D}),(N=e.current)==null||N.focarRegiao(D)},d=n.painel!==null&&(t||n.painel==="ficha"||n.painel==="sobre"),b=M.jsx(zx,{organizarPor:n.organizarPor,dimensao:n.dimensao,agruparLocalidade:n.agruparLocalidade,onOrganizar:n.mudarOrganizarPor,onDimensao:n.mudarDimensao,onAgrupar:n.mudarAgrupar}),A=M.jsx(Ox,{metodo:n.metodo,carregando:n.carregandoAlternativo,onMetodo:n.mudarMetodo}),v=n.algumFiltroAtivo?`${n.contagemFiltrada} de ${l.projetos.length} projetos`:`${l.projetos.length} projetos · ${h} programas`,R=M.jsx(kx,{metodo:n.metodo,instituicoes:n.instituicoes,clustersOrdenados:n.clustersOrdenados,temasAtivos:n.temasAtivos,siglasSel:n.siglasSel,modoInstituicao:n.modoInstituicao,onModoInstituicao:n.setModoInstituicao,temasSel:n.temasSel,subareas2Sel:n.subareas2Sel,vinculos:n.vinculos,vinculosSel:n.vinculosSel,modoVinculo:n.modoVinculo,onModoVinculo:n.setModoVinculo,contagensVinculo:n.contagensVinculo,onVinculo:n.alternarVinculo,algumFiltroAtivo:n.algumFiltroAtivo,modoPeso:n.modoPeso,pesoDisponivel:n.pesoDisponivel,onModoPeso:n.mudarModoPeso,aderencia:n.aderencia,alcance:n.alcance,onAlcance:n.setAlcance,contagem:n.contagemFiltrada,total:l.projetos.length,onSigla:n.alternarSigla,onTema:n.alternarTema,onSubarea2:n.alternarSubarea2,onLimpar:n.limparFiltros,filtroTipo:M.jsx(ou,{grupos:n.gruposTipo,sel:n.tipoSubSel,onSel:n.setTipoSubSel,onAbrir:n.carregarTipos,unidade:"projetos com ao menos uma produção do par",corTipo:y=>n.esquema.marca({classe:"",tipo:y,subtipo:""}).borda,nota:"Entra o projeto com ao menos uma produção dos tipos marcados; aberto, ele mostra só essas."})}),T=M.jsx(jx,{siglas:n.siglasOrdenadasAlfabeto,producoes:n.producoesVisiveis,esquema:n.esquema,filtro:n.filtroProd,onFiltro:n.setFiltroProd}),C=u("filtros")?"filtros":u("metodo")?"metodo":null;return M.jsxs("div",{className:"atlas-rota",children:[M.jsxs("div",{className:`atlas-mapa${d?" com-painel":""}`,children:[M.jsx(xx,{ref:e,dados:l,programas:n.programas,organizarPor:n.organizarPor,dimensao:n.dimensao,agruparLocalidade:n.agruparLocalidade,destacadoDe:n.destacadoDe,intensidadeDe:n.intensidadeDe,algumFiltroAtivo:n.algumFiltroAtivo,projetoAberto:n.projetoAberto,producoesVisiveis:n.producoesVisiveis,producaoSel:n.producaoSel,filtroProd:n.filtroProd,esquema:n.esquema,fichas:n.fichas,descricoes:n.descricoesPorProjeto,detalhes:n.detalhes,temaPorCluster:n.temaPorCluster,onSelecionarProjeto:n.selecionarProjeto,onAlternarProjeto:n.alternarProjeto,onSelecionarProducao:n.selecionarProducao,onToqueFundo:n.fecharPainel}),n.modoInstituicao!=="ou"&&n.siglasSel.size>=2&&M.jsx(lu,{siglas:[...n.siglasSel].sort(),unidade:"projetos",onLimpar:n.limparInstituicoes}),M.jsx(Bx,{projetos:l.projetos,fichas:n.fichas,metodo:n.metodo,qtdFiltros:m,aberto:C,comPopover:!t,filtros:M.jsxs(M.Fragment,{children:[M.jsxs("header",{className:"flutuante-cab",children:[M.jsxs("div",{children:[M.jsx("strong",{children:"Filtrar pontos do mapa"}),M.jsx("div",{className:"atlas-tooltip-nota",children:v})]}),M.jsx("button",{type:"button",className:"painel-fechar",onClick:o,"aria-label":"Fechar",children:"✕"})]}),R]}),metodos:A,onEscolher:S,onAlternar:g,onFecharPopover:o,temaAtivo:n.temaSel?{rotulo:n.temaSel.rotulo,n:n.temaSel.pontos.size}:null,onTema:p,onLimparTema:()=>{var y;n.setTemaSel(null),(y=e.current)==null||y.reenquadrar()}}),M.jsx(Gx,{aberto:u("camadas"),comPopover:!t,conteudo:b,onAlternar:()=>g("camadas"),onFecharPopover:o,onZoom:y=>{var L;return(L=e.current)==null?void 0:L.zoomPor(y)},onReenquadrar:()=>{var y;return(y=e.current)==null?void 0:y.reenquadrar()},onSobre:_}),M.jsx(Yx,{aberta:u("legenda"),comPopover:!t,filtroAtivo:n.filtroProd!==null,onAlternar:()=>g("legenda"),onFechar:c,conteudo:T}),M.jsx(Hx,{aberto:n.painel==="ficha",projeto:n.projetoAberto,tema:n.projetoAberto?n.temaPorCluster.get(n.projetoAberto.cluster)??"—":"",ficha:n.fichas,detalhes:n.detalhes,descricao:n.descricoesPorProjeto,membros:n.membrosPorProjeto,producoes:n.producoesVisiveis,producoesAbertas:n.producoesAbertas,carregando:n.carregandoProducoes,producaoSel:n.producaoSel,esquema:n.esquema,filtro:n.filtroProd,apenasNucleo:n.apenasNucleo,onApenasNucleo:n.setApenasNucleo,onSelecionarProducao:n.selecionarProducao,onFechar:n.fecharPainel,aderencia:n.aderencia,limiarAlcance:n.pesoAtivo?n.limiarAlcance:101}),t&&M.jsxs(M.Fragment,{children:[M.jsx(Si,{aberto:n.painel==="filtros",ariaLabel:"Filtrar pontos do mapa",titulo:M.jsxs(M.Fragment,{children:[M.jsx("strong",{children:"Filtrar pontos do mapa"}),M.jsx("div",{className:"atlas-tooltip-nota",children:v})]}),onFechar:n.fecharPainel,alturaInicial:"meia",children:R}),M.jsx(Si,{aberto:n.painel==="metodo",ariaLabel:"Método de clusterização",titulo:M.jsx("strong",{children:"Método de clusterização"}),onFechar:n.fecharPainel,alturaInicial:"meia",children:A}),M.jsx(Si,{aberto:n.painel==="camadas",ariaLabel:"Camadas do mapa",titulo:M.jsx("strong",{children:"Camadas"}),onFechar:n.fecharPainel,alturaInicial:"meia",children:b}),M.jsx(Si,{aberto:n.painel==="legenda",ariaLabel:"Chave do mapa",titulo:M.jsx("strong",{children:"Chave do mapa"}),onFechar:n.fecharPainel,alturaInicial:"meia",children:T})]}),M.jsx(Si,{aberto:n.painel==="sobre",ariaLabel:"Sobre este mapa",titulo:M.jsx("strong",{children:"Sobre este mapa"}),onFechar:n.fecharPainel,alturaInicial:"cheia",children:M.jsx(Kx,{metodo:n.metodo,dimensao:n.dimensao,organizarPor:n.organizarPor,avisoRotulo:l.aviso_rotulo,totalProjetos:l.projetos.length,totalProgramas:h,aderencia:n.aderencia})})]}),M.jsxs("section",{className:"atlas-tabelas",id:"atlas-tabelas",children:[M.jsx("div",{className:"atlas-tabelas-cab",children:M.jsxs("div",{className:"segmented",role:"group","aria-label":"Tabela de referência",children:[M.jsx("button",{type:"button",className:n.modo==="subarea"?"ativo":"","aria-pressed":n.modo==="subarea",onClick:()=>n.setModo("subarea"),children:Zx[n.metodo]}),M.jsx("button",{type:"button",className:n.modo==="instituicao"?"ativo":"","aria-pressed":n.modo==="instituicao",onClick:()=>n.setModo("instituicao"),children:"Instituições"})]})}),n.modo==="subarea"?M.jsxs(M.Fragment,{children:[M.jsx("h2",{children:Sx[n.metodo]}),M.jsx("div",{className:"tabela-rolavel",children:M.jsxs("table",{className:"tabela-dados",children:[M.jsx("thead",{children:M.jsxs("tr",{children:[M.jsx("th",{children:Ex[n.metodo]}),M.jsx("th",{className:"num",children:"Projetos"}),M.jsx("th",{children:bx[n.metodo]})]})}),M.jsx("tbody",{children:n.clustersOrdenados.map(y=>M.jsx($x,{c:y},y.cluster))})]})})]}):M.jsxs(M.Fragment,{children:[M.jsx("h2",{children:"Instituições"}),M.jsx("div",{className:"tabela-rolavel",children:M.jsxs("table",{className:"tabela-dados",children:[M.jsx("thead",{children:M.jsxs("tr",{children:[M.jsx("th",{children:"Instituição"}),M.jsx("th",{className:"num",children:"Projetos"})]})}),M.jsx("tbody",{children:n.instituicoes.map(({sigla:y,n:L})=>M.jsxs("tr",{children:[M.jsxs("td",{className:"forte",children:[M.jsx("span",{className:"legenda-marca",style:{background:Gn(y)}})," ",y]}),M.jsx("td",{className:"num",children:L})]},y))})]})})]})]})]})}function $x({c:n}){return M.jsxs("tr",{children:[M.jsx("td",{className:"forte",children:n.tema}),M.jsx("td",{className:"num",children:n.n_projetos}),M.jsx("td",{children:n.subareas.join(", ")})]})}export{r0 as default};
