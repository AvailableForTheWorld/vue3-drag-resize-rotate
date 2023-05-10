(function(e,u){typeof exports=="object"&&typeof module<"u"?module.exports=u(require("vue")):typeof define=="function"&&define.amd?define(["vue"],u):(e=typeof globalThis<"u"?globalThis:e||self,e["vue3-drag-resize-rotate"]=u(e.Vue))})(this,function(e){"use strict";var Te=Object.defineProperty;var Ne=(e,u,h)=>u in e?Te(e,u,{enumerable:!0,configurable:!0,writable:!0,value:h}):e[u]=h;var se=(e,u,h)=>(Ne(e,typeof u!="symbol"?u+"":u,h),h);class u{constructor(a,c){se(this,"x");se(this,"y");if(typeof a!="number"||typeof c!="number")throw new Error("Must provide numeric parameters");this.x=a,this.y=c}static zero(){return new u(0,0)}add(a){return new u(this.x+a.x,this.y+a.y)}sub(a){return new u(this.x-a.x,this.y-a.y)}neg(){return new u(-this.x,-this.y)}mul(a){if(typeof a=="number")return new u(this.x*a,this.y*a);if(a instanceof u)return this.x*a.x+this.y*a.y;throw new Error("Parameter should be a number or a vector")}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}unit(){let a=this.norm();return new u(this.x/a,this.y/a)}rotate(a){return new u(this.x*Math.cos(a)-this.y*Math.sin(a),this.x*Math.sin(a)+this.y*Math.cos(a))}angle(){return Math.atan2(this.y,this.x)}static _equals(a,c,U=Number.EPSILON){return Math.abs(a-c)<U}equals(a,c=Number.EPSILON){return a instanceof u?u._equals(this.x,a.x,c)&&u._equals(this.y,a.y,c):!1}clone(){return new u(this.x,this.y)}static rad(a){return a*Math.PI/180}static deg(a){return a*180/Math.PI}}const h=8,ie=20,ce={y:{t:"top",m:"marginTop",b:"bottom"},x:{l:"left",m:"marginLeft",r:"right"}};let de=(P=21)=>crypto.getRandomValues(new Uint8Array(P)).reduce((a,c)=>(c&=63,c<36?a+=c.toString(36):c<62?a+=(c-26).toString(36).toUpperCase():c>62?a+="-":a+="_",a),"");const we=["onMousedown"],be={key:0,class:"ro-stick-handle"},O=e.defineComponent({__name:"drr",props:{x:{default:0},y:{default:0},width:{default:0},height:{default:0},angle:{default:0},selected:{type:Boolean,default:!1},selectable:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},resizable:{type:Boolean,default:!0},rotatable:{type:Boolean,default:!0},hasActiveContent:{type:Boolean,default:!1},aspectRatio:{type:Boolean,default:!1},dragHandle:{default:""},dragCancel:{default:""},outerBound:{default:null},innerBound:{default:null},onDrag:null,onResize:null},emits:["select","deselect","clicked","drag","resize","rotate","rotate-start","rotate-stop","drag-start","drag-stop","resize-start","resize-stop","change","content-active"],setup(P,{emit:a}){const c=P,{x:U,y:ve,width:C,height:k,angle:j,selected:fe,selectable:F,draggable:Ee,resizable:G,rotatable:he,hasActiveContent:Ye,aspectRatio:W,dragHandle:J,dragCancel:ye,outerBound:s,innerBound:i,onDrag:Q,onResize:V}=e.toRefs(c),Y=e.ref(fe.value),ee=e.ref(!1),g=e.ref(U.value),p=e.ref(ve.value),z=e.ref((C==null?void 0:C.value)||0),L=e.ref((k==null?void 0:k.value)||0),y=e.ref(j==null?void 0:j.value),R=e.ref(!1),_=e.ref(!1),te=e.ref(!1),ae=e.ref(!1),le=e.ref(!1),D=e.ref([]),n=e.ref({mouseX:0,mouseY:0,curX:0,curY:0,x:0,y:0,width:0,height:0,rotation:0}),ue=e.ref(!1),ne=e.ref(!1),re=e.ref(!1),f=()=>({x:g.value,y:p.value,width:z.value,height:L.value,angle:y.value}),xe=t=>{g.value=t.x,p.value=t.y,z.value=t.width,L.value=t.height,y.value=t.angle},q=e.ref(f()),Me=e.computed(()=>{const t=[];return G.value&&t.push("tl","tr","br","bl"),he.value&&t.push("ro"),t}),Xe=e.computed(()=>({active:Y.value,selectable:F.value,dragging:_.value,contentActive:ee.value})),Se=e.computed(()=>({left:g.value-z.value/2+"px",top:p.value-L.value/2+"px",width:z.value+"px",height:L.value+"px",transform:"rotate("+y.value+"deg)"})),Be=()=>{F.value&&a("content-active")},ke=e.computed(()=>t=>{const r={width:`${h}px`,height:`${h}px`};return t=="ro"?(r.top=`${-h/2-ie}px`,r.marginLeft=`${-h/2+1}px`):(r[ce.y[t[0]]]=`${-h/2}px`,r[ce.x[t[1]]]=`${-h/2}px`),r}),ze=t=>{ee.value=t,Y.value=!t},Le=t=>{const r=n.value,o=new u(t.pageX-r.mouseX,t.pageY-r.mouseY);if(D.value.includes("ro")){let x=new u(0,-k.value/2-ie);const M=u.rad(r.rotation);x=x.rotate(M);const m=x.add(o);ue.value||(a("rotate-start",q.value),ue.value=!0),y.value=u.deg(m.angle())+90,le.value=!0,a("rotate",f())}else{const x=D.value.includes("r")?1:-1,M=D.value.includes("b")?1:-1,m=u.rad(n.value.rotation);let l;if(W.value){let E=new u(x*n.value.width/2,M*n.value.height/2);E=E.rotate(m).unit(),l=E.mul(E.mul(o))}else l=o;let w=l.rotate(-m),A=n.value.curX+l.x/2,X=n.value.curY+l.y/2,S=n.value.width+x*w.x,B=n.value.height+M*w.y,b=A-S/2,H=X-B/2,K=A+S/2,Z=X+B/2;if(s.value&&y.value===0){let E=s.value.x-s.value.width/2,T=s.value.y-s.value.height/2,N=s.value.x+s.value.width/2,$=s.value.y+s.value.height/2,d=0,v=0;b<E&&(d=E-b),K>N&&(d=N-K),H<T&&(v=T-H),Z>$&&(v=$-Z),(d!=0||v!=0)&&(W.value?d/l.x<v/l.y?(l.y+=d*l.y/l.x,l.x+=d):(l.x+=v*l.x/l.y,l.y+=v):(l.x+=d,l.y+=v))}if(i.value&&y.value===0){let E=i.value.x-i.value.width/2,T=i.value.y-i.value.height/2,N=i.value.x+i.value.width/2,$=i.value.y+i.value.height/2,d=0,v=0;b>E&&(d=E-b),K<N&&(d=N-K),H>T&&(v=T-H),Z<$&&(v=$-Z),(d!=0||v!=0)&&(W.value?d/l.x<v/l.y?(l.y+=d*l.y/l.x,l.x+=d):(l.x+=v*l.x/l.y,l.y+=v):(l.x+=d,l.y+=v))}g.value=n.value.curX+l.x/2,p.value=n.value.curY+l.y/2,w=l.rotate(-m),z.value=n.value.width+x*w.x,L.value=n.value.height+M*w.y,V&&V.value&&xe(V.value(f())),ne.value||(a("resize-start",q.value),ne.value=!0),ae.value=!0,a("resize",f())}},Ae=t=>{const r={mouseX:t.pageX,mouseY:t.pageY},o={x:r.mouseX-n.value.mouseX,y:r.mouseY-n.value.mouseY};let x=n.value.curX+o.x,M=n.value.curY+o.y,m=x-C.value/2,l=M-k.value/2,w=x+C.value/2,A=M+k.value/2;if(s.value&&y.value===0){let X=s.value.x-s.value.width/2,S=s.value.y-s.value.height/2,B=s.value.x+s.value.width/2,b=s.value.y+s.value.height/2;m<X&&(o.x-=m-X),w>B&&(o.x-=w-B),l<S&&(o.y-=l-S),A>b&&(o.y-=A-b)}if(i.value&&y.value===0){let X=i.value.x-i.value.width/2,S=i.value.y-i.value.height/2,B=i.value.x+i.value.width/2,b=i.value.y+i.value.height/2;m>X&&(o.x-=m-X),w<B&&(o.x-=w-B),l>S&&(o.y-=l-S),A<b&&(o.y-=A-b)}g.value=n.value.curX+o.x,p.value=n.value.curY+o.y,Q&&Q.value&&xe(Q.value(f())),re.value||(a("drag-start",q),re.value=!0),te.value=!0,a("drag",f())},Ce=()=>{R.value=!1,n.value={mouseX:0,mouseY:0,x:0,y:0,width:0,height:0,curX:g.value,curY:p.value,rotation:y.value},ae.value&&(a("resize-stop",f()),a("change",f())),le.value&&(a("rotate-stop",f()),a("change",f()))},_e=(t,r)=>{!G.value||!Y.value||(ne.value=!1,ue.value=!1,q.value=f(),R.value=!0,ae.value=!1,le.value=!1,n.value={mouseX:r.pageX,mouseY:r.pageY,x:t.x,y:t.y,width:z.value,height:L.value,curX:g.value,curY:p.value,rotation:y.value},D.value=t)},De=()=>{_.value=!1,n.value={mouseX:0,mouseY:0,x:0,y:0,width:0,height:0,curX:g.value,curY:p.value,rotation:y.value},te.value&&(a("drag-stop",f()),a("change",f()))},ge=t=>{I()&&(t.stopPropagation(),R.value&&Le(t),_.value&&Ae(t))},oe=()=>{R.value&&Ce(),_.value&&De()},Ie=()=>{a("deselect"),Y.value=!1},pe=()=>{Ie()},Pe=t=>{if(ee.value||!F.value)return;t.preventDefault(),t.stopPropagation();const r=t.target;Y.value=!0,!(t.button&&t.button!==0)&&(a("clicked",t),!(!Ee.value||!Y.value)&&(J.value&&(r.getAttribute("data-drag-handle")!=="true"||r.getAttribute("data-drag-cancel")===null)||(_.value=!0,te.value=!1,re.value=!1,q.value=f(),n.value.mouseX=t.pageX,n.value.mouseY=t.pageY,n.value.curX=g.value,n.value.curY=p.value)))},me=()=>{oe()},I=()=>R.value||_.value,Re=()=>{document.addEventListener("mousemove",ge),document.addEventListener("mouseup",oe),document.addEventListener("mousedown",pe),document.addEventListener("mouseleave",me)},qe=()=>{document.removeEventListener("mousemove",ge),document.removeEventListener("mouseup",oe),document.removeEventListener("mousedown",pe),document.removeEventListener("mouseleave",me)};return e.onMounted(()=>{if(Re(),J.value){const t=document.querySelectorAll(J.value);t&&t.forEach(r=>{r.setAttribute("data-drag-handle",de())})}if(ye.value){const t=document.querySelectorAll(ye.value);t&&t.forEach(r=>{r.setAttribute("data-drag-cancel",de())})}}),e.onBeforeUnmount(()=>{qe()}),e.watch(Y,t=>{a(t?"select":"deselect")}),e.watch(fe,t=>{Y.value=t}),e.watch(Ye,t=>{ze(t)}),e.watch(U,t=>{I()||(g.value=t)}),e.watch(ve,t=>{I()||(p.value=t)}),e.watch(C,t=>{I()||(D.value=["m","r"],z.value=t)}),e.watch(k,t=>{I()||(D.value=["b","m"],L.value=t)}),e.watch(j,t=>{I()||(y.value=t)}),(t,r)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["drr",e.unref(Xe)]),style:e.normalizeStyle(e.unref(Se)),onDblclick:Be,onMousedown:Pe},[e.renderSlot(t.$slots,"default"),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(Me),o=>(e.openBlock(),e.createElementBlock("div",{key:o,class:e.normalizeClass(["drr-stick",["drr-stick-"+o,e.unref(G)?"":"not-resizable"]]),style:e.normalizeStyle(e.unref(ke)(o)),onMousedown:e.withModifiers(x=>_e(o,x),["stop","prevent"])},null,46,we))),128)),e.unref(he)?(e.openBlock(),e.createElementBlock("div",be)):e.createCommentVNode("",!0)],38))}}),$e="";return O.install=P=>{P.component(O.__name,O)},O});
