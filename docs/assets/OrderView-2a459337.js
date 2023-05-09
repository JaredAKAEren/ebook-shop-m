import{_ as $}from"./http-a024b3f6.js";import{h as j,e as g,o as i,c as d,b as w,a as t,t as p,d as f,F as m,i as L,r,j as A,k as N,w as y,f as O,u as F}from"./index-811e683d.js";import{g as b}from"./index-534a1249.js";const R={class:"bg-gray-200 flex items-center py-2 px-4 mb-2 rounded-md text-sm text-gray-800"},U={class:"flex-1"},Y={class:"flex mb-2"},q=t("span",null,"订单号：",-1),E={class:"flex"},M=t("span",null,"创建时间：",-1),S={class:"px-4"},z=["src","alt"],G={class:"flex-1 flex flex-col justify-around ml-1"},H={class:"text-sm"},I={class:"text-sm text-red-500 font-bold"},J={class:"flex flex-col justify-around"},K={class:"text-xs text-end text-gray-500"},P=t("small",{class:"text-xs mr-px"},"x",-1),Q={__name:"OrderList",props:{orderList:{type:Array,default:[]}},setup(D){const _=j();function u(a){_.push({path:"/order-detail",query:{id:a}})}return(a,o)=>{const h=g("van-icon");return i(!0),d(m,null,w(D.orderList,(l,c)=>(i(),d("div",{class:"mb-4",key:c},[t("section",R,[t("div",U,[t("div",Y,[q,t("p",null,p(l.order_no),1)]),t("div",E,[M,t("p",null,p(l.created_at),1)])]),t("div",null,[f(h,{class:"text-lg text-gray-500 font-bold self-center",name:"arrow",onClick:n=>u(l.id)},null,8,["onClick"])])]),t("section",S,[(i(!0),d(m,null,w(l.orderDetails.data,(n,x)=>(i(),d("div",{class:"w-full inline-flex px-4 mb-2 py-1 rounded-md bg-white",key:x},[t("img",{class:"w-1/5 py-1 bg-white rounded-md",src:n.goods.cover_url,alt:n.goods.description},null,8,z),t("div",G,[t("h3",H,p(n.goods.title),1),t("p",I,"￥"+p(n.goods.price),1)]),t("div",J,[t("p",K,[P,L(p(n.num),1)])])]))),128))])]))),128)}}},W={class:"h-screen w-full pt-12 bg-sh-gray inline-flex flex-col"},te={__name:"OrderView",setup(D){const _=r(0),u=r([{name:"全部",tag:"all",status:""},{name:"待付款",tag:"payYet",status:1},{name:"已付款",tag:"payDone",status:2},{name:"待收货",tag:"delivering",status:3},{name:"已完成",tag:"signAfter",status:4},{name:"过期",tag:"pastDue",status:5}]),a=r({all:{data:[],page:1,total:1},payYet:{data:[],page:1,total:1},payDone:{data:[],page:1,total:1},delivering:{data:[],page:1,total:1},signAfter:{data:[],page:1,total:1},pastDue:{data:[],page:1,total:1}}),o=r("all"),h=A(()=>a.value[o.value].data),l=r(!1),c=r(!1);N(()=>{b().then(e=>{n("all",e)}).catch(e=>{console.log(e.message)})});function n(e,s){if(s.data.length===0){l.value=!1,c.value=!0;return}a.value[e].page=s.meta.pagination.current_page,a.value[e].total=s.meta.pagination.total_pages,a.value[e].page>1?a.value[e].data=a.value[e].data.concat(s.data):a.value[e].data=s.data}function x(e){l.value=!1,c.value=!1,o.value=u.value[e].tag,a.value[o.value].data.length===0&&b(u.value[e].status).then(s=>{n(o.value,s)}).catch(s=>{console.log(s.message)})}function k(){setTimeout(()=>{if(a.value[o.value].page>=a.value[o.value].total){c.value=!0,l.value=!1;return}b(u.value[_.value].status,a.value[o.value].page+1).then(e=>{n(o.value,e),l.value=!1}).catch(e=>{console.log(e.message)})},400)}return(e,s)=>{const C=g("van-tab"),B=g("van-tabs"),T=g("van-list");return i(),d(m,null,[f($,null,{title:y(()=>[L("订单管理")]),_:1}),t("main",W,[f(B,{active:_.value,"onUpdate:active":s[0]||(s[0]=v=>_.value=v),onChange:x},{default:y(()=>[(i(!0),d(m,null,w(u.value,(v,V)=>(i(),O(C,{key:V,title:v.name},null,8,["title"]))),128))]),_:1},8,["active"]),f(T,{class:"p-2 flex-1 overflow-y-scroll",loading:l.value,"onUpdate:loading":s[1]||(s[1]=v=>l.value=v),finished:c.value,"finished-text":"没有更多了","immediate-check":!1,offset:0,onLoad:k},{default:y(()=>[f(Q,{"order-list":F(h)},null,8,["order-list"])]),_:1},8,["loading","finished"])])],64)}}};export{te as default};