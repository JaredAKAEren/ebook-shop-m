import{_ as V}from"./http-a024b3f6.js";import{a as k}from"./index-4014a4c1.js";import{s as y}from"./index-83de5650.js";import{_ as I,h as B,D as L,A as S,r as i,e as n,o as R,c as q,d as o,w as r,a as e,i as _,F as C,B as D,C as N}from"./index-811e683d.js";const d=l=>(D("data-v-31075d49"),l=l(),N(),l),F={class:"h-screen pt-12 bg-sh-gray"},M={class:"bg-white rounded-lg mx-4 p-4 mt-8 shadow-sm"},T=d(()=>e("h4",{class:"w-full text-center text-2xl font-bold tracking-wide"},"eBook ID",-1)),U={class:"text-base text-justify px-4 mt-2"},j=d(()=>e("strong",null,"eBook",-1)),A=d(()=>e("span",{class:"text-blue-600"},"创建你的 eBook ID",-1)),E={class:"shadow-sm rounded-lg overflow-hidden"},$=d(()=>e("div",{class:"mt-8"},[e("button",{type:"submit",class:"text-white w-full py-3 rounded-md bg-gradient shadow-md active:opacity-90"},[e("span",{class:"tracking-widest text-base"},"登录")])],-1)),z={__name:"LoginView",setup(l){const p=B(),g=L(),h=S(),s=i({email:"",password:""}),f=i("请填写邮箱"),v=i("请填写密码");function w(){y("登录中...",c=>{k(s.value).then(t=>{t&&(localStorage.setItem("token",t.access_token),h.commit("login",!0),c.message="登录成功，跳转中...",setTimeout(()=>{c.close();let a=g.query.redirect;p.replace({path:a==="/"||a===void 0?"/user":a})},400))}).catch(t=>{})})}return(c,t)=>{const a=n("RouterLink"),m=n("van-field"),x=n("van-cell-group"),b=n("van-form");return R(),q(C,null,[o(V,null,{title:r(()=>[_("登录")]),_:1}),e("main",F,[e("header",M,[T,e("p",U,[_(" 管理你的 "),j,_(" 账户。 没有账户？ "),o(a,{to:"/register"},{default:r(()=>[A]),_:1})])]),o(b,{class:"pt-6 mx-4",onSubmit:w},{default:r(()=>[e("div",E,[o(x,null,{default:r(()=>[o(m,{modelValue:s.value.email,"onUpdate:modelValue":t[0]||(t[0]=u=>s.value.email=u),type:"email",name:"邮箱",label:"邮箱",placeholder:"邮箱",rules:[{required:!0,message:f.value}]},null,8,["modelValue","rules"]),o(m,{modelValue:s.value.password,"onUpdate:modelValue":t[1]||(t[1]=u=>s.value.password=u),type:"password",name:"密码",label:"密码",placeholder:"密码",rules:[{required:!0,message:v.value}]},null,8,["modelValue","rules"])]),_:1})]),$]),_:1})])],64)}}},O=I(z,[["__scopeId","data-v-31075d49"]]);export{O as default};