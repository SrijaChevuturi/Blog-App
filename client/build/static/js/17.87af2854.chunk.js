"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[17],{17:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var s=a(858),r=a(3),l=a(154),c=a(43),n=a(216),o=a(579);const i=function(){let{register:e,handleSubmit:t}=(0,s.mN)(),{currentUser:a}=(0,r.d4)((e=>e.userAuthorLoginReducer)),[i,d]=(0,c.useState)(""),m=(0,n.Zp)(),h=localStorage.getItem("token");const u=l.A.create({headers:{Authorization:"Bearer ".concat(h)}});return(0,o.jsx)("div",{className:"container",children:(0,o.jsx)("div",{className:"row justify-content-center mt-5 mb-5",children:(0,o.jsx)("div",{className:"col-lg-8 col-md-8 col-sm-10",children:(0,o.jsx)("div",{className:"card shadow",children:(0,o.jsxs)("div",{className:"form-container card-body",children:[(0,o.jsx)("div",{className:"card-title text-center border-bottom border-dark",children:(0,o.jsx)("h2",{className:"p-3",children:"Write an Article"})}),(0,o.jsxs)("form",{onSubmit:t((async e=>{e.dateOfCreation=new Date,e.dateOfModification=new Date,e.articleId=Date.now(),e.username=a.username,e.comments=[],e.status=!0;let t=await u.post("http://localhost:4000/author-api/article",e);console.log(t),"New article created"===t.data.message?m("/author-profile/articles-by-author/".concat(a.username)):d(t.data.message)})),children:[(0,o.jsxs)("div",{className:"mb-4",children:[(0,o.jsx)("label",{htmlFor:"title",className:"form-label",children:"Title"}),(0,o.jsx)("input",{type:"text",className:"form-control",id:"title",...e("title",{required:!0})})]}),(0,o.jsxs)("div",{className:"mb-4",children:[(0,o.jsx)("label",{htmlFor:"category",className:"form-label",children:"Select a category"}),(0,o.jsxs)("select",{...e("category",{required:!0}),id:"category",className:"form-select",children:[(0,o.jsx)("option",{value:"",children:"Select category"}),(0,o.jsx)("option",{value:"programming",children:"Programming"}),(0,o.jsx)("option",{value:"AI&ML",children:"AI&ML"}),(0,o.jsx)("option",{value:"database",children:"Database"})]})]}),(0,o.jsxs)("div",{className:"mb-4",children:[(0,o.jsx)("label",{htmlFor:"content",className:"form-label",children:"Content"}),(0,o.jsx)("textarea",{...e("content",{require:!0}),className:"form-control",id:"content",rows:"10"})]}),(0,o.jsx)("div",{className:"text-end",children:(0,o.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Post"})})]})]})})})})})}}}]);
//# sourceMappingURL=17.87af2854.chunk.js.map