import{_ as V}from"./http-a024b3f6.js";import{g as S,l as B}from"./index-4014a4c1.js";import{s as C}from"./index-83de5650.js";import{_ as N,h as U,A as j,r as p,j as R,k as F,e as l,o as s,c as a,d as n,w as r,a as t,u as h,t as g,m as T,F as f,i as u,b as A,f as D,B as E,C as M}from"./index-811e683d.js";const v=c=>(E("data-v-775b6224"),c=c(),M(),c),$={class:"h-screen w-screen bg-sh-gray pt-12 pb-16 px-4"},q={class:"bg-gradient mt-4 rounded-md shadow-md"},z={key:0,class:"flex items-center px-4 py-2"},G={class:"flex-1 py-4 ml-4 text-sm text-white flex flex-col justify-around"},H={key:1,class:"text-white text-xl flex justify-center py-8"},J=v(()=>t("span",{class:"text-2xl mx-2"},"/",-1)),K=v(()=>t("span",{class:"tracking-widest"},"登出",-1)),O=[K],P={__name:"UserView",setup(c){const x=U(),_=j(),o=p({}),i=R(()=>_.getters.isLogin),w=p([{title:"地址管理",path:"/address"},{title:"我的订单",path:"/order"}]);F(()=>{i.value&&S().then(e=>{o.value=e}).catch(e=>{console.log(e.message)})});function y(){C("登出中...",e=>{B().then(()=>{localStorage.removeItem("token"),_.commit("logout"),e.message="登出成功，跳转中...",setTimeout(()=>{e.close(),o.value={},x.push("/user")},400)})})}return(e,Q)=>{const k=l("van-image"),d=l("RouterLink"),b=l("van-cell"),L=l("van-cell-group");return s(),a(f,null,[n(V,null,{title:r(()=>[u("个人中心")]),_:1}),t("main",$,[t("div",q,[h(i)?(s(),a("section",z,[n(k,{class:"border-2",round:"",width:"3rem",height:"3rem",src:o.value.avatar_url},null,8,["src"]),t("div",G,[t("p",null,"昵称："+g(o.value.name),1),t("p",null,"邮箱："+g(o.value.email),1)])])):(s(),a("section",H,[n(d,{to:"/register"},{default:r(()=>[u("注册")]),_:1}),J,n(d,{to:"/login"},{default:r(()=>[u("登录")]),_:1})]))]),n(L,{class:"rounded-md overflow-hidden shadow-md my-4"},{default:r(()=>[(s(!0),a(f,null,A(w.value,(m,I)=>(s(),D(b,{key:I,title:m.title,to:m.path,"is-link":""},null,8,["title","to"]))),128))]),_:1}),h(i)?(s(),a("button",{key:0,class:"text-white bg-red-500 w-full py-3 rounded-md shadow-md active:opacity-90",type:"button",onClick:y},O)):T("",!0)])],64)}}},ee=N(P,[["__scopeId","data-v-775b6224"]]);export{ee as default};
