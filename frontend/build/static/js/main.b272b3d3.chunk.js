(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{116:function(e,t,n){},136:function(e,t,n){},144:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(12),i=n.n(r),s=(n(116),n(71)),l=n.n(s),o=n(88),j=n(15),d=n(65),u=n.n(d),b=n(62),m=n(48),O=n(171),f=n(185),h=(n(136),n(17)),p=n(181),x=n(92),g=n(176),v=n(90),y=n.n(v),w=n(172),k=n(177),C=n(178),D=n(179),A=n(180),B=n(91),F=n.n(B),N=n(14);var P=function(){var e=Object(a.useState)(null),t=Object(j.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(new Date),i=Object(j.a)(r,2),s=i[0],d=i[1],v="/api/v1/alarms",B=function(){var e=Object(o.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.get(v);case 2:t=e.sent,c(t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){B()}),[]),Object(N.jsx)("div",{className:"App",children:Object(N.jsxs)(w.a,{container:!0,direction:"row",justifyContent:"center",alignItems:"center",children:[Object(N.jsxs)(w.a,{item:!0,xs:12,children:[Object(N.jsx)(h.a,{utils:x.a,children:Object(N.jsx)(p.a,{className:"timePicker",margin:"normal",id:"time-picker",label:"Alarm Time",value:s,onChange:function(e){d(e)},KeyboardButtonProps:{"aria-label":"change time"}})}),Object(N.jsx)("div",{className:"addAlarmBtn",children:Object(N.jsx)(g.a,{color:"primary","aria-label":"add an alarm",onClick:function(){var e=new Date,t=Object(b.a)(Object(m.a)(s,e)?Object(O.a)(s,{days:1}):s,"yyyy-MM-dd HH:mm");u.a.post(v,{alarmtime:t}).then((function(){B()}))},children:Object(N.jsx)(y.a,{})})})]}),Object(N.jsx)(w.a,{item:!0,xs:12,children:Object(N.jsx)(k.a,{children:n&&n.map((function(e,t){var n=new Date(e.time),a=null!==e.tag?e.tag:Object(b.a)(n,"h:mm a"),c=Object(f.a)(n,new Date),r=n<new Date?"pastAlarm":"upcomingAlarm";return Object(N.jsxs)(C.a,{className:r,children:[Object(N.jsx)(D.a,{primary:a,secondary:c}),Object(N.jsx)(A.a,{children:Object(N.jsx)(g.a,{edge:"end","aria-label":"delete",onClick:function(){return t=e.id,void u.a.delete("".concat(v,"/").concat(t)).then((function(){B()}));var t},children:Object(N.jsx)(F.a,{})})})]})}))})})]})})},S=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,186)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),r(e),i(e)}))};i.a.render(Object(N.jsx)(c.a.StrictMode,{children:Object(N.jsx)(P,{})}),document.getElementById("root")),S()}},[[144,1,2]]]);
//# sourceMappingURL=main.b272b3d3.chunk.js.map