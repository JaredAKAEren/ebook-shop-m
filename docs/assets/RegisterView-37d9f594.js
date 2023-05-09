import{_ as B}from"./http-a024b3f6.js";import{r as I}from"./index-4014a4c1.js";import{s as z}from"./index-83de5650.js";import{_ as A,h as P,r as n,e as m,o as S,c as Z,d as a,w as i,a as l,i as c,F as q,B as E,C as M}from"./index-811e683d.js";const u=d=>(E("data-v-17a6e12c"),d=d(),M(),d),U={class:"h-screen pt-12 bg-sh-gray"},C={class:"bg-white rounded-lg mx-4 p-4 mt-8 shadow-sm"},L=u(()=>l("h4",{class:"w-full text-center text-2xl font-bold tracking-wide"},"创建你的 eBook ID",-1)),N={class:"text-base text-justify px-4 mt-2"},$=u(()=>l("strong",null,"eBook",-1)),D=u(()=>l("strong",null,"eBook",-1)),F=u(()=>l("span",{class:"text-blue-600"},"在此登录",-1)),T={class:"shadow-sm rounded-lg overflow-hidden"},j=u(()=>l("div",{class:"mt-8"},[l("button",{type:"submit",class:"text-white w-full py-3 rounded-md bg-gradient shadow-md active:opacity-90"},[l("span",{class:"tracking-widest text-base"},"注册")])],-1)),G={__name:"RegisterView",setup(d){const w=P(),s=n({username:"",password:"",comfirmPwd:"",email:""}),p=n({null:"请填写用户名",vld:"4-16位字母、数字、下划线、短横线"}),_=n({null:"请填写密码",vld:"8-16位包含小写和大写字母以及数字"}),v=n({null:"请再次填写密码",vld:"两次密码不一致"}),g=n({null:"请填写邮箱",vld:"邮箱格式不正确"}),f=/^[a-zA-Z0-9_-]{4,16}$/,h=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/,x=t=>t===s.value.password,V=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;function b(){z("注册中...",t=>{I(s.value).then(e=>{e===""&&(t.message="注册成功，跳转中...",setTimeout(()=>{t.close(),w.push("/login")},400))}).catch(e=>{})})}return(t,e)=>{const y=m("RouterLink"),r=m("van-field"),R=m("van-cell-group"),k=m("van-form");return S(),Z(q,null,[a(B,null,{title:i(()=>[c("创建账户")]),_:1}),l("main",U,[l("header",C,[L,l("p",N,[c(" 只需一个 "),$,c(" ID，即可访问 "),D,c(" 的所有内容。已有账户？ "),a(y,{to:"/login"},{default:i(()=>[F]),_:1})])]),a(k,{class:"pt-6 mx-4",onSubmit:b},{default:i(()=>[l("div",T,[a(R,null,{default:i(()=>[a(r,{modelValue:s.value.username,"onUpdate:modelValue":e[0]||(e[0]=o=>s.value.username=o),name:"用户名",label:"用户名",placeholder:"用户名",rules:[{required:!0,message:p.value.null},{pattern:f,message:p.value.vld}]},null,8,["modelValue","rules"]),a(r,{modelValue:s.value.password,"onUpdate:modelValue":e[1]||(e[1]=o=>s.value.password=o),type:"password",name:"密码",label:"密码",placeholder:"密码",rules:[{required:!0,message:_.value.null},{pattern:h,message:_.value.vld}]},null,8,["modelValue","rules"]),a(r,{modelValue:s.value.comfirmPwd,"onUpdate:modelValue":e[2]||(e[2]=o=>s.value.comfirmPwd=o),type:"password",name:"确认密码",label:"确认密码",placeholder:"确认密码",rules:[{required:!0,message:v.value.null},{validator:x,message:v.value.vld}]},null,8,["modelValue","rules"]),a(r,{modelValue:s.value.email,"onUpdate:modelValue":e[3]||(e[3]=o=>s.value.email=o),type:"email",name:"邮箱",label:"邮箱",placeholder:"邮箱",rules:[{required:!0,message:g.value.null},{pattern:V,message:g.value.vld}]},null,8,["modelValue","rules"])]),_:1})]),j]),_:1})])],64)}}},Q=A(G,[["__scopeId","data-v-17a6e12c"]]);export{Q as default};