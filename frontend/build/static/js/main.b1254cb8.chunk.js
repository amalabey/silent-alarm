(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{120:function(e,t,n){},140:function(e,t,n){},148:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(13),i=n.n(r),s=(n(120),n(74)),j=n.n(s),l=n(91),o=n(15),b=n(68),d=n.n(b),u=n(65),O=n(52),x=n(179),h=n(195),m=(n(140),n(17)),f=n(192),p=n(98),v=n(186),g=n(96),y=n.n(g),w=n(185),k=n(187),C=n(188),D=n(190),S=n(191),A=n(97),B=n.n(A),F=n(189),P=n(94),I=n.n(P),M=n(95),N=n.n(M),T=n(75),E=n.n(T),H=n(93),J=n.n(H),L=n(196),K=n(183),q=n(184),z=n(69),G=n(12);var Q=function(){var e=Object(a.useState)(null),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(new Date),i=Object(o.a)(r,2),s=i[0],b=i[1],g="/api/v1/alarms",A=function(){var e=Object(l.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get(g);case 2:t=e.sent,c(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(e){switch(e){case 0:return Object(G.jsx)(E.a,{});case 1:return Object(G.jsx)(J.a,{});case 2:return Object(G.jsx)(I.a,{});case 3:return Object(G.jsx)(N.a,{});default:return Object(G.jsx)(E.a,{})}};return Object(a.useEffect)((function(){A()}),[]),Object(G.jsxs)("div",{className:"App",children:[Object(G.jsx)(K.a,{position:"static",children:Object(G.jsx)(q.a,{children:Object(G.jsx)(z.a,{children:"Silent Alarm"})})}),Object(G.jsxs)(w.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"center",children:[Object(G.jsxs)(w.a,{item:!0,xs:12,children:[Object(G.jsx)(m.a,{utils:p.a,children:Object(G.jsx)(f.a,{className:"timePicker",margin:"normal",id:"time-picker",label:"Alarm Time",value:s,onChange:function(e){b(e)},KeyboardButtonProps:{"aria-label":"change time"}})}),Object(G.jsx)("div",{className:"addAlarmBtn",children:Object(G.jsx)(v.a,{color:"primary","aria-label":"add an alarm",onClick:function(){var e=new Date,t=Object(u.a)(Object(O.a)(s,e)?Object(x.a)(s,{days:1}):s,"yyyy-MM-dd HH:mm");d.a.post(g,{alarmtime:t}).then((function(){A()}))},children:Object(G.jsx)(y.a,{})})})]}),Object(G.jsx)(w.a,{item:!0,xs:12,children:Object(G.jsx)(k.a,{children:n&&n.map((function(e,t){var n=new Date(e.time),a=null!==e.tag?e.tag:Object(u.a)(n,"h:mm a"),c=Object(h.a)(n,new Date);new Date;return Object(G.jsxs)(C.a,{children:[Object(G.jsx)(F.a,{children:Object(G.jsx)(L.a,{children:P(e.state)})}),Object(G.jsx)(D.a,{primary:a,secondary:c}),Object(G.jsx)(S.a,{children:Object(G.jsx)(v.a,{edge:"end","aria-label":"delete",onClick:function(){return t=e.id,void d.a.delete("".concat(g,"/").concat(t)).then((function(){A()}));var t},children:Object(G.jsx)(B.a,{})})})]})}))})})]})]})},R=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,198)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};i.a.render(Object(G.jsx)(c.a.StrictMode,{children:Object(G.jsx)(Q,{})}),document.getElementById("root")),R()}},[[148,1,2]]]);
//# sourceMappingURL=main.b1254cb8.chunk.js.map