(()=>{"use strict";const t=class{static assert(t,e){console.assert(t,e)}static log(t){console.log(t)}static logError(t){console.error(t)}};class e{static clamp(t,e,s){return t<e?e:t>s?s:t}static sign(t){return t>0?1:t<0?-1:0}static randomRange(t,e){return Math.random()*(e-t)+t}static randomRangeInt(t,s){return Math.round(e.randomRange(t,s))+t}static randomIntBag(t,e,s){const i=Array.from({length:e-t},((e,s)=>s+t)),n=[];for(;n.length<s&&i.length>0;){const t=Math.floor(Math.random()*i.length);n.push(i[t]),i.splice(t,1)}return n}}e.rad2Deg=180/Math.PI,e.deg2Rad=Math.PI/180;const s=e;class i{static left(){return new i(-1,0,0)}static right(){return new i(1,0,0)}static up(){return new i(0,1,0)}static down(){return new i(0,-1,0)}static zero(){return new i(0,0,0)}static one(){return new i(1,1,1)}static randomUnit(){return new i(s.randomRange(-1,1),s.randomRange(-1,1)).normalized()}static distance(t,e){return t.subtract(e).length()}constructor(t,e,s=0){this.x=t,this.y=e,this.z=s}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}normalized(){const t=this.length();return 0!==t?new i(this.x/t,this.y/t,0):new i(0,0,0)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t){const e=this.y*t.z-this.z*t.y,s=this.z*t.x-this.x*t.z,n=this.x*t.y-this.y*t.x;return new i(e,s,n)}angle(t){const e=this.dot(t),s=this.length()*t.length();return Math.acos(e/s)*(180/Math.PI)}add(t){return new i(this.x+t.x,this.y+t.y,this.z+t.z)}subtract(t){return new i(this.x-t.x,this.y-t.y,this.z-t.z)}multiply(t){return new i(this.x*t,this.y*t,this.z*t)}multiplyComp(t){return new i(this.x*t.x,this.y*t.y,this.z*t.z)}xx(){return new i(this.x,this.x,this.z)}yy(){return new i(this.y,this.y,this.z)}xy(){return new i(this.x,this.y,this.z)}yx(){return new i(this.y,this.x,this.z)}}const n=i;class r{constructor(t=1,e=1,s=1,i=1){this.r=t,this.g=e,this.b=s,this.a=i}toString(){function t(t){return Math.round(255*t)}return`rgba(${t(this.r)}, ${t(this.g)}, ${t(this.b)}, ${this.a})`}static black(){return new r(0,0,0,0)}static white(){return new r(1,1,1,1)}static red(){return new r(1,0,0,1)}static green(){return new r(0,1,0,1)}static blue(){return new r(0,0,1,1)}static yellow(){return new r(1,1,0,1)}static cyan(){return new r(0,1,1,1)}static magenta(){return new r(1,0,1,1)}static grey(){return new r(.5,.5,.5,1)}static clear(){return new r(1,1,1,0)}}const a=r;class o{static zero(){return new o(0,0,0,0,0,0,0,0,0)}static identity(){return new o(1,0,0,0,1,0,0,0,1)}static translate(t,e){const s=o.identity();return s.values[0][2]=t,s.values[1][2]=e,s}static rotate(t){const e=o.identity(),i=Math.cos(t*s.deg2Rad),n=Math.sin(t*s.deg2Rad);return e.values[0][0]=i,e.values[0][1]=-n,e.values[1][0]=n,e.values[1][1]=i,e}static scale(t,e){const s=o.identity();return s.values[0][0]=t,s.values[1][1]=e,s}constructor(t=0,e=0,s=0,i=0,n=0,r=0,a=0,o=0,h=0){this.values=[],this.values=[[t,e,s],[i,n,r],[a,o,h]]}determinant(){const t=this.values[0][0],e=this.values[0][1],s=this.values[0][2],i=this.values[1][0],n=this.values[1][1],r=this.values[1][2],a=this.values[2][0],o=this.values[2][1],h=this.values[2][2];return t*(n*h-r*o)-e*(i*h-r*a)+s*(i*o-n*a)}inverse(){const t=this.determinant();if(0===t)throw new Error("Matrix is not invertible.");const e=new o,s=1/t;return e.values[0][0]=(this.values[1][1]*this.values[2][2]-this.values[1][2]*this.values[2][1])*s,e.values[0][1]=(this.values[0][2]*this.values[2][1]-this.values[0][1]*this.values[2][2])*s,e.values[0][2]=(this.values[0][1]*this.values[1][2]-this.values[0][2]*this.values[1][1])*s,e.values[1][0]=(this.values[1][2]*this.values[2][0]-this.values[1][0]*this.values[2][2])*s,e.values[1][1]=(this.values[0][0]*this.values[2][2]-this.values[0][2]*this.values[2][0])*s,e.values[1][2]=(this.values[0][2]*this.values[1][0]-this.values[0][0]*this.values[1][2])*s,e.values[2][0]=(this.values[1][0]*this.values[2][1]-this.values[1][1]*this.values[2][0])*s,e.values[2][1]=(this.values[0][1]*this.values[2][0]-this.values[0][0]*this.values[2][1])*s,e.values[2][2]=(this.values[0][0]*this.values[1][1]-this.values[0][1]*this.values[1][0])*s,e}transpose(){const t=new o;for(let e=0;e<3;e++)for(let s=0;s<3;s++)t.values[e][s]=this.values[s][e];return t}multiplyMatrix(t){const e=new o,s=this.values,i=t.values,n=e.values,r=s[0][0],a=s[0][1],h=s[0][2],l=s[1][0],c=s[1][1],d=s[1][2],u=s[2][0],_=s[2][1],m=s[2][2],p=i[0][0],w=i[0][1],C=i[0][2],T=i[1][0],g=i[1][1],f=i[1][2],v=i[2][0],S=i[2][1],x=i[2][2];return n[0][0]=r*p+a*T+h*v,n[0][1]=r*w+a*g+h*S,n[0][2]=r*C+a*f+h*x,n[1][0]=l*p+c*T+d*v,n[1][1]=l*w+c*g+d*S,n[1][2]=l*C+c*f+d*x,n[2][0]=u*p+_*T+m*v,n[2][1]=u*w+_*g+m*S,n[2][2]=u*C+_*f+m*x,e}matrixMultiplyComponentWise(t){const e=new o;for(let s=0;s<3;s++)for(let i=0;i<3;i++)e.values[s][i]=this.values[s][i]*t.values[s][i];return e}multiplyVector(t){return new n(this.values[0][0]*t.x+this.values[0][1]*t.y+this.values[0][2]*t.z,this.values[1][0]*t.x+this.values[1][1]*t.y+this.values[1][2]*t.z,this.values[2][0]*t.x+this.values[2][1]*t.y+this.values[2][2]*t.z)}}const h=o;class l{static _init(t){l._canvasContext=t;const e=h.translate(l.canvasSize.x/2,l.canvasSize.y/2),s=h.scale(1,-1);this._worldToCameraMatrix=e.multiplyMatrix(s)}static _draw(){l._canvasContext.clearRect(0,0,l.canvasSize.x,l.canvasSize.y),l._canvasContext.fillStyle="white",l._canvasContext.fillRect(0,0,l.canvasSize.x,l.canvasSize.y),this._renderers=this._renderers.sort(((t,e)=>t.drawOrder>e.drawOrder?1:-1));for(const t of this._renderers){const e=t._localToWorldMatrix().multiplyMatrix(h.scale(1,-1)),s=l._worldToCameraMatrix.multiplyMatrix(e);l._canvasContext.setTransform(s.values[0][0],s.values[1][0],s.values[0][1],s.values[1][1],s.values[0][2],s.values[1][2]),t._draw(),l._canvasContext.resetTransform()}}static _registerRenderer(t){this._renderers.push(t)}}l._renderers=[],l.canvasSize=new n(400,600),l.backgroundColor=a.white();const c=l;class d{static _init(){document.addEventListener("mousedown",(t=>{d._isMouseClickedLastFrame=!0}),!1),document.addEventListener("keyup",(t=>{d._lastKeyUpKey=t.key}),!1),document.addEventListener("keydown",(t=>{d._lastKeyDownKey=t.key}),!1),document.onmousemove=t=>{t&&(d._lastMousePosition=new n(t.clientX,t.clientY,1))}}static _handleInput(){for(let t=0;t<this._mouseInteractables.length;t++)this._mouseInteractables[t].owner.isActive&&(this._mouseInteractables[t]._click(d.getMousePosition()),this._mouseInteractables[t]._hover(d.getMousePosition()))}static _resetInput(){d._isMouseClickedLastFrame=!1,d._lastKeyUpKey="",d._lastKeyDownKey=""}static registerMouseInteractable(t){this._mouseInteractables.push(t)}static getKeyDown(t){return d._lastKeyDownKey==t}static getKeyUp(t){return d._lastKeyUpKey==t}static getMouseDown(){return d._isMouseClickedLastFrame}static getMousePosition(){return this._lastMousePosition?c._worldToCameraMatrix.inverse().multiplyVector(this._lastMousePosition):n.zero()}}d._mouseInteractables=[],d._isMouseClickedLastFrame=!1;const u=d;var _;!function(t){t[t.TRANSFORM=0]="TRANSFORM",t[t.RENDERER=1]="RENDERER",t[t.RECTANGLE_COLLIDER=2]="RECTANGLE_COLLIDER",t[t.CIRCLE_COLLIDER=3]="CIRCLE_COLLIDER",t[t.BUTTON=4]="BUTTON",t[t.TEXT=5]="TEXT"}(_||(_={}));const m=_,p=class{constructor(t){this._componentRequirements=[],this.owner=t}};class w{constructor(){this._eventCallbacks=[]}subscribe(t){this._eventCallbacks.push(t)}unsubscribe(){}invoke(){for(const t of this._eventCallbacks)t()}}class C{constructor(){this._eventCallbacks=[]}subscribe(t){this._eventCallbacks.push(t)}unsubscribe(){}invoke(t){for(const e of this._eventCallbacks)e(t)}}const T=class extends p{constructor(t){super(t),this._componentRequirements=[m.TRANSFORM],this._currentFrameCollidingColliders=[],this._lastFrameCollidingColliders=[],this.collisionStarted=new C,this.collisionHappening=new C,this.collisionEnded=new C,x._registerCollider(this),this._ownerTransform=t.getComponent(m.TRANSFORM)}_getWorldPosition(){return this._ownerTransform.position.add(this.offset)}_addCollidingCollider(t){this._currentFrameCollidingColliders.push(t),-1===this._lastFrameCollidingColliders.findIndex((e=>e===t))?this.collisionStarted.invoke(t):this.collisionHappening.invoke(t)}_confirmCollidingColliders(){for(const t of this._lastFrameCollidingColliders)-1===this._currentFrameCollidingColliders.findIndex((e=>e===t))&&this.collisionEnded.invoke(t);this._lastFrameCollidingColliders=this._currentFrameCollidingColliders}},g=class{constructor(t,e){this.center=t,this.size=e}isPointInside(t){return t.x>=this.center.x-this.size.x/2&&t.x<=this.center.x+this.size.x/2&&t.y>=this.center.y-this.size.y/2&&t.y<=this.center.y+this.size.y/2}},f=class extends T{constructor(t,e=n.one(),s=n.zero()){super(t),this.type=m.RECTANGLE_COLLIDER,this.size=e,this.offset=s}AABB(){const t=this._ownerTransform.position;return new g(t.add(this.offset),this.size)}},v=class extends T{constructor(t,e=1,s=n.zero()){super(t),this.type=m.RECTANGLE_COLLIDER,this.size=e,this.offset=s}AABB(){const t=this._ownerTransform.position;return new g(t.add(this.offset),n.one().multiply(2))}};class S{static _registerCollider(t){this._colliders.push(t)}static _handlePhysics(){for(let t=0;t<this._colliders.length;t++)for(let e=t+1;e<this._colliders.length;e++)if(this._colliders[t].owner.isActive)if(this._colliders[t]instanceof f){const s=this._colliders[t];if(this._colliders[e]instanceof f){const t=this._colliders[e],i=s._getWorldPosition(),n=t._getWorldPosition(),r=s.size,a=t.size;Math.abs(i.subtract(n).x)<r.x/2+a.x/2&&Math.abs(i.subtract(n).y)<r.y/2+a.y/2&&S._broadcastCollision(s,t)}else this._colliders[e]instanceof v&&this._colliders[e]}else if(this._colliders[t]instanceof v){const s=this._colliders[t];if(this._colliders[e]instanceof f)this._colliders[e];else if(this._colliders[e]instanceof v){const t=this._colliders[e],i=s._getWorldPosition(),r=t._getWorldPosition(),a=s.size,o=t.size;n.distance(i,r)>a+o&&S._broadcastCollision(s,t)}}}static _broadcastCollision(t,e){t._addCollidingCollider(e),e._addCollidingCollider(t)}}S._colliders=[];const x=S;class R{static _init(){R._startTime=Date.now()}static time(){return Date.now()/1e3}static timeSinceGameStart(){return(Date.now()-R._startTime)/1e3}static deltaTime(){return(Date.now()-R._lastFrameTime)/1e3}}const E=R;var I;!function(t){t[t.LINEAR=0]="LINEAR",t[t.IN_SINE=1]="IN_SINE",t[t.OUT_SINE=2]="OUT_SINE",t[t.IN_OUT_SINE=3]="IN_OUT_SINE",t[t.IN_CUBIC=4]="IN_CUBIC",t[t.OUT_CUBIC=5]="OUT_CUBIC",t[t.IN_OUT_CUBIC=6]="IN_OUT_CUBIC",t[t.IN_QUINT=7]="IN_QUINT",t[t.OUT_QUINT=8]="OUT_QUINT",t[t.IN_OUT_QUINT=9]="IN_OUT_QUINT",t[t.IN_CIRC=10]="IN_CIRC",t[t.OUT_CIRC=11]="OUT_CIRC",t[t.IN_OUT_CIRC=12]="IN_OUT_CIRC",t[t.IN_ELASTIC=13]="IN_ELASTIC",t[t.OUT_ELASTIC=14]="OUT_ELASTIC",t[t.IN_OUT_ELASTIC=15]="IN_OUT_ELASTIC",t[t.IN_QUAD=16]="IN_QUAD",t[t.OUT_QUAD=17]="OUT_QUAD",t[t.IN_OUT_QUAD=18]="IN_OUT_QUAD",t[t.IN_QUART=19]="IN_QUART",t[t.OUT_QUART=20]="OUT_QUART",t[t.IN_OUT_QUART=21]="IN_OUT_QUART",t[t.IN_EXPO=22]="IN_EXPO",t[t.OUT_EXPO=23]="OUT_EXPO",t[t.IN_OUT_EXPO=24]="IN_OUT_EXPO",t[t.IN_BACK=25]="IN_BACK",t[t.OUT_BACK=26]="OUT_BACK",t[t.IN_OUT_BACK=27]="IN_OUT_BACK"}(I||(I={}));const b=I,N=Math.pow,O=Math.sqrt,y=Math.sin,M=Math.cos,A=Math.PI,U=1.70158,L=1.525*U,D=U+1,k=2*A/3,P=2*A/4.5,z={[b.LINEAR]:t=>t,[b.IN_QUAD]:function(t){return t*t},[b.OUT_QUAD]:function(t){return 1-(1-t)*(1-t)},[b.IN_OUT_QUAD]:function(t){return t<.5?2*t*t:1-N(-2*t+2,2)/2},[b.IN_CUBIC]:function(t){return t*t*t},[b.OUT_CUBIC]:function(t){return 1-N(1-t,3)},[b.IN_OUT_CUBIC]:function(t){return t<.5?4*t*t*t:1-N(-2*t+2,3)/2},[b.IN_QUART]:function(t){return t*t*t*t},[b.OUT_QUART]:function(t){return 1-N(1-t,4)},[b.IN_OUT_QUART]:function(t){return t<.5?8*t*t*t*t:1-N(-2*t+2,4)/2},[b.IN_QUINT]:function(t){return t*t*t*t*t},[b.OUT_QUINT]:function(t){return 1-N(1-t,5)},[b.IN_OUT_QUINT]:function(t){return t<.5?16*t*t*t*t*t:1-N(-2*t+2,5)/2},[b.IN_SINE]:function(t){return 1-M(t*A/2)},[b.OUT_SINE]:function(t){return y(t*A/2)},[b.IN_OUT_SINE]:function(t){return-(M(A*t)-1)/2},[b.IN_EXPO]:function(t){return 0===t?0:N(2,10*t-10)},[b.OUT_EXPO]:function(t){return 1===t?1:1-N(2,-10*t)},[b.IN_OUT_EXPO]:function(t){return 0===t?0:1===t?1:t<.5?N(2,20*t-10)/2:(2-N(2,-20*t+10))/2},[b.IN_CIRC]:function(t){return 1-O(1-N(t,2))},[b.OUT_CIRC]:function(t){return O(1-N(t-1,2))},[b.IN_OUT_CIRC]:function(t){return t<.5?(1-O(1-N(2*t,2)))/2:(O(1-N(-2*t+2,2))+1)/2},[b.IN_BACK]:function(t){return D*t*t*t-U*t*t},[b.OUT_BACK]:function(t){return 1+D*N(t-1,3)+U*N(t-1,2)},[b.IN_OUT_BACK]:function(t){return t<.5?N(2*t,2)*(7.189819*t-L)/2:(N(2*t-2,2)*((L+1)*(2*t-2)+L)+2)/2},[b.IN_ELASTIC]:function(t){return 0===t?0:1===t?1:-N(2,10*t-10)*y((10*t-10.75)*k)},[b.OUT_ELASTIC]:function(t){return 0===t?0:1===t?1:N(2,-10*t)*y((10*t-.75)*k)+1},[b.IN_OUT_ELASTIC]:function(t){return 0===t?0:1===t?1:t<.5?-N(2,20*t-10)*y((20*t-11.125)*P)/2:N(2,-20*t+10)*y((20*t-11.125)*P)/2+1}};class B{static _registerTween(t){this._tweens.push(t)}static _unregisterTween(t){B._tweens=B._tweens.filter((e=>e!=t))}static _handleTween(){const t=[];for(const e of B._tweens){if(e._isStarted||e._start(),e._startTime+e._delay<E.timeSinceGameStart()){const t=(E.timeSinceGameStart()-e._startTime)/e._duration,s=z[e._ease](t);e.evaluate(s)}e._startTime+e._duration<E.timeSinceGameStart()&&(t.push(e),e._end())}B._tweens=B._tweens.filter((e=>!t.includes(e)))}}B._tweens=[];const F=B;class H{static init(e){t.assert(!H._isInitialized,"Game is already initialized."),E._init(),u._init(),c._init(e),H._lastFrameTimestamp=Date.now(),window.requestAnimationFrame(H._gameLoop)}static _gameLoop(){const t=Date.now();E._lastFrameTime=H._lastFrameTimestamp,u._handleInput(),x._handlePhysics(),H._update(),F._handleTween(),c._draw(),H._lastFrameTimestamp=t,u._resetInput(),window.requestAnimationFrame(H._gameLoop)}static _update(){for(let t=0;t<this._nodes.length;t++)null===this._nodes[t].parentNode&&this._nodes[t].isActive&&this._nodes[t]._executeUpdate()}static _registerNode(t){H._nodes.push(t)}static _unregisterNode(t){H._nodes=H._nodes.filter((t=>t!=t))}}H._isInitialized=!1,H._nodes=[],H._lastFrameTimestamp=-1;const W=H,V=class{constructor(t,e,s){this._isStarted=!1,this.tweenStarted=new w,this.tweenEnded=new w,this._duration=t,this._delay=e,this._ease=s,F._registerTween(this)}_start(){this._isStarted=!0,this._startTime=E.timeSinceGameStart(),this.tweenStarted.invoke()}_end(){F._unregisterTween(this),this.evaluate(1),this.tweenEnded.invoke()}chain(t){return F._unregisterTween(t),this.tweenEnded.subscribe(t._start),t.tweenStarted.subscribe((()=>F._registerTween(t))),t}},X=class extends V{constructor(t,e,s,i,n){super(s,i,n),this.evaluate=t,this._retrieveStartValue=e,this._start=this._start.bind(this)}_start(){this._startValue=this._retrieveStartValue(),super._start()}},G=class extends p{constructor(t,e=n.zero(),s=0,i=n.one()){super(t),this.type=m.TRANSFORM,this._componentRequirements=[],this.position=e,this.rotation=s,this.scale=i}_localToWorldMatrix(){const t=h.translate(this.position.x,this.position.y),e=h.rotate(this.rotation),s=h.scale(this.scale.x,this.scale.y);return t.multiplyMatrix(e).multiplyMatrix(s)}tweenPosition(t,e,s,i,n){const r=new X((e=>{n&&t.add(r._startValue),this.position=t.subtract(r._startValue).multiply(e).add(r._startValue)}),(()=>this.position),e,s,i);return r}tweenPositionX(t,e,s,i,n){const r=new X((e=>{n&&(t+=r._startValue),this.position.x=(t-r._startValue)*e+r._startValue}),(()=>this.position.x),e,s,i);return r}tweenPositionY(t,e,s,i,n){const r=new X((e=>{n&&(t+=r._startValue),this.position.y=(t-r._startValue)*e+r._startValue}),(()=>this.position.y),e,s,i);return r}tweenScale(t,e,s,i,n){const r=new X((e=>{n&&t.add(r._startValue),this.scale=t.subtract(r._startValue).multiply(e).add(r._startValue)}),(()=>this.scale),e,s,i);return r}},Q=class extends p{constructor(t){super(t),this.type=m.RENDERER,this._componentRequirements=[m.TRANSFORM],this.drawOrder=0,this.ownerTransform=t.getComponent(m.TRANSFORM),c._registerRenderer(this)}_localToWorldMatrix(){return this.ownerTransform._localToWorldMatrix()}setDrawable(t){this.drawable=t}_draw(){this.owner.isVisible&&this.drawable._draw()}};class K extends Q{get rect(){let t=this.owner.getComponent(m.TRANSFORM);return new g(t.position,this.elementSize)}constructor(t){super(t),this._componentRequirements=[m.TRANSFORM],this.anchor=j.MID_CENTER,this.pivot=j.MID_CENTER}_draw(){if(!this.owner.isVisible)return;let t=n.zero();switch(this.pivot){case j.TOP_LEFT:t=new n(0,0);break;case j.TOP_CENTER:t=new n(-.5,0);break;case j.TOP_RIGHT:t=new n(-1,0);break;case j.MID_LEFT:t=new n(0,-.5);break;case j.MID_CENTER:t=new n(-.5,-.5);break;case j.MID_RIGHT:t=new n(-1,-.5);break;case j.BOTTOM_LEFT:t=new n(0,-1);break;case j.BOTTOM_CENTER:t=new n(-.5,-1);break;case j.BOTTOM_RIGHT:t=new n(-1,-1)}this.drawable.offSet=this.elementSize.multiplyComp(t),this.drawable._draw()}}var j;!function(t){t[t.TOP_LEFT=0]="TOP_LEFT",t[t.TOP_CENTER=1]="TOP_CENTER",t[t.TOP_RIGHT=2]="TOP_RIGHT",t[t.MID_LEFT=3]="MID_LEFT",t[t.MID_CENTER=4]="MID_CENTER",t[t.MID_RIGHT=5]="MID_RIGHT",t[t.BOTTOM_LEFT=6]="BOTTOM_LEFT",t[t.BOTTOM_CENTER=7]="BOTTOM_CENTER",t[t.BOTTOM_RIGHT=8]="BOTTOM_RIGHT"}(j||(j={}));const Y=class extends K{constructor(t){super(t),this.clicked=new w,this.hovered=new w,u.registerMouseInteractable(this)}_click(t){this.rect.isPointInside(t)&&u.getMouseDown()&&this.clicked.invoke()}_hover(t){this.rect.isPointInside(t)&&this.hovered.invoke()}},$=class extends K{constructor(t){super(t)}setDrawable(t){super.setDrawable(t);const e=c._canvasContext.measureText(t.text);e.fontBoundingBoxAscent,e.fontBoundingBoxDescent,e.actualBoundingBoxAscent,e.actualBoundingBoxDescent,this.elementSize=n.zero()}},q=class{constructor(t){this.isActive=!0,this.isVisible=!0,this.parentNode=null,this.childNodes=[],this.components=[],this.name=t,W._registerNode(this),this.init()}init(){}start(){}update(){}destroy(){}_executeStart(){this.start();for(let t=0;t<this.childNodes.length;t++)this.childNodes[t]._executeStart()}_executeUpdate(){if(this.isActive){this.update();for(let t=0;t<this.childNodes.length;t++)this.childNodes[t]._executeUpdate()}}getComponent(e){const s=this.components.filter((t=>t.type===e));return 0===s.length&&t.logError(`Component of type ${e} not found on actor ${this.name}`),s[0]}addComponent(e){const s=this.components.findIndex((t=>t.type===e));if(-1!==s)return t.logError(`Component of type ${e} already exists on actor ${this.name}.`),this.components[s];let i;switch(e){case m.TRANSFORM:i=new G(this);break;case m.RENDERER:i=new Q(this);break;case m.RECTANGLE_COLLIDER:i=new f(this);break;case m.CIRCLE_COLLIDER:i=new v(this);break;case m.BUTTON:i=new Y(this);break;case m.TEXT:i=new $(this)}for(const e of i._componentRequirements)if(-1==this.components.findIndex((t=>t.type==e)))return void t.logError(`Component of type ${i} requires component of type ${e}.`);return this.components.push(i),i}removeComponent(t){}setChild(t){this.childNodes.includes(t)||(this.childNodes.push(t),t.parentNode=this)}removeChild(t){this.childNodes.includes(t)&&(this.childNodes=this.childNodes.filter((e=>e!==t)),t.parentNode=null)}setParent(t){t.setChild(this)}removeParent(){null!==this.parentNode&&this.parentNode.removeChild(this)}},J=class{constructor(t=""){this.maxWidth=100,this.maxHeight=100,this.flipX=!1,this.flipY=!1,this.scale=n.one(),this.setImage(t)}_draw(){c._canvasContext.scale(this.scale.x*(this.flipX?-1:1),this.scale.y*(this.flipY?-1:1)),c._canvasContext.drawImage(this._image,-this._image.width/2,-this._image.height/2)}setImage(t){this._image=new Image,this._image.src=t}};var Z;!function(t){t[t.WELCOME=0]="WELCOME",t[t.PLAY=1]="PLAY",t[t.RESULT=2]="RESULT"}(Z||(Z={}));const tt=Z,et=class{constructor(t,e){this.color=e,this.size=t}_draw(){c._canvasContext.fillStyle=this.color.toString(),c._canvasContext.beginPath(),c._canvasContext.arc(0,0,this.size,0,2*Math.PI),c._canvasContext.fill()}},st=class extends q{constructor(t,e){super(t),this.transform=this.addComponent(m.TRANSFORM),this.transform.tweenScale(n.zero(),.2,0,b.IN_EXPO,!1),this.transform.position=new n(e.x,e.y);let s=new et(8,new a(.93,.2,.38));this.renderer=this.addComponent(m.RENDERER),this.renderer.setDrawable(s),this.renderer.drawOrder=0}},it=class extends q{constructor(){super(...arguments),this.isLocked=!0,this.isAlive=!0,this.lastJumpTime=0,this.isMovingRight=!0,this.moveSpeed=200,this.jumpCurveXCoeff=2.7,this.jumpCurveYCoeff=100,this.jumpSpriteTimeout=.4,this.jumpSpriteTimer=.4,this.trailDotSpawnTimeout=.1,this.trailDotSpawnTimer=.1}init(){this.transform=this.addComponent(m.TRANSFORM),this.transform.position=new n(50,100),this.lastJumpTime=E.timeSinceGameStart(),this.lastJumpPosY=this.transform.position.y,this.collider=this.addComponent(m.RECTANGLE_COLLIDER),this.collider.size=new n(15,15),this.collider.collisionStarted.subscribe(this.handleCollisionStart.bind(this));let t=new J("./assets/kenney/Characters/character_0000.png");this.renderer=this.addComponent(m.RENDERER),this.renderer.setDrawable(t),this.renderer.drawOrder=5,this.touchedLeftWall=new w,this.touchedRightWall=new w,this.touchedLeftWall.subscribe(this.turnRight.bind(this)),this.touchedRightWall.subscribe(this.turnLeft.bind(this)),this.touchedLeftWall.subscribe(this.wallTouchedHandler.bind(this)),this.touchedRightWall.subscribe(this.wallTouchedHandler.bind(this)),this.touchedLeftWall.subscribe((()=>this.scoreChanged.invoke(Tt.currentScore))),this.touchedRightWall.subscribe((()=>this.scoreChanged.invoke(Tt.currentScore))),this.jumpSprite=new J("assets/Jump.png"),this.jumpSprite.scale=n.one().multiply(.1),this.glideSprite=new J("assets/Glide.png"),this.glideSprite.scale=n.one().multiply(.1),this.scoreChanged=new C,this.turnRight(),Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t===tt.WELCOME?(this.isLocked=!0,this.transform.position.x=0):t===tt.PLAY?(this.isAlive=!0,this.isLocked=!1,this.jump()):tt.RESULT}update(){if(this.isLocked)return void this.playIdleAnimation();this.move(),(u.getKeyDown(" ")||u.getMouseDown())&&this.jump();let t=E.timeSinceGameStart()-this.lastJumpTime;this.transform.position.y=this.jumpYFunction(t),this.jumpSpriteTimer-=E.deltaTime(),this.jumpSpriteTimer<0&&this.renderer.setDrawable(this.glideSprite),this.trailDotSpawnTimer-=E.deltaTime(),this.trailDotSpawnTimer<0&&(new st("Dot",this.transform.position).start(),this.trailDotSpawnTimer=this.trailDotSpawnTimeout)}move(){this.isMovingRight?this.transform.position.x+=E.deltaTime()*this.moveSpeed:this.transform.position.x-=E.deltaTime()*this.moveSpeed}turnLeft(){this.isMovingRight=!1,this.jumpSprite.flipX=!1,this.glideSprite.flipX=!1}turnRight(){this.isMovingRight=!0,this.jumpSprite.flipX=!0,this.glideSprite.flipX=!0}jump(){this.isAlive&&(this.renderer.setDrawable(this.jumpSprite),this.lastJumpTime=E.timeSinceGameStart(),this.lastJumpPosY=this.transform.position.y,this.jumpSpriteTimer=this.jumpSpriteTimeout)}jumpYFunction(t){let e=t*this.jumpCurveXCoeff;return(1-Math.pow(e-1,2))*this.jumpCurveYCoeff+this.lastJumpPosY}handleCollisionStart(t){"Wall"===t.owner.name?this.isMovingRight?this.touchedRightWall.invoke():this.touchedLeftWall.invoke():"Spike"===t.owner.name&&(this.isAlive=!1,Tt.changeState(tt.RESULT))}wallTouchedHandler(){this.isAlive&&Tt.currentScore++}playIdleAnimation(){Math.round(E.timeSinceGameStart())%2==0?this.renderer.setDrawable(this.glideSprite):this.renderer.setDrawable(this.jumpSprite),this.transform.position.y=20*Math.sin(E.timeSinceGameStart())}},nt=class{constructor(t,e){this.color=e,this.size=t,this.offSet=new n(-this.size.x/2,-this.size.y/2)}_draw(){c._canvasContext.fillStyle=this.color.toString(),c._canvasContext.fillRect(this.offSet.x,this.offSet.y,this.size.x,this.size.y)}},rt=class{constructor(t,e=a.black()){this.text=t,this.color=e}_draw(){c._canvasContext.font=this.font,c._canvasContext.textAlign="center",c._canvasContext.textBaseline="middle",c._canvasContext.fillStyle=this.color.toString(),c._canvasContext.fillText(this.text,this.offSet.x,this.offSet.y);const t=c._canvasContext.measureText(this.text),e=(t.fontBoundingBoxAscent,t.fontBoundingBoxDescent,t.actualBoundingBoxAscent+t.actualBoundingBoxDescent);new n(t.width,e)}},at=class extends q{init(){this.transform=this.addComponent(m.TRANSFORM),this.transform.position=new n(0,-100);let t=new nt(new n(200,100),a.white());this.button=this.addComponent(m.BUTTON),this.button.elementSize=new n(200,100),this.button.setDrawable(t),this.button.pivot=j.MID_CENTER;let e=new rt("Play",a.grey());e.font="30px open sans",this.text=this.addComponent(m.TEXT),this.text.setDrawable(e),this.button.clicked.subscribe(this.changeToPlayState.bind(this)),Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t==tt.WELCOME?(this.isVisible=!0,this.isActive=!0):(this.isVisible=!1,this.isActive=!1)}changeToPlayState(){Tt.changeState(tt.PLAY)}},ot=class extends q{constructor(t){super(t),this.spikes=[],this.transform=this.addComponent(m.TRANSFORM),this.collider=this.addComponent(m.RECTANGLE_COLLIDER)}},ht=class extends q{init(){this.transform=this.addComponent(m.TRANSFORM),this.collider=this.addComponent(m.RECTANGLE_COLLIDER),this.collider.size=new n(50,50);let t=new class{constructor(t){this.color=t}_draw(){c._canvasContext.fillStyle=this.color.toString(),c._canvasContext.beginPath();for(let t=0;t<this._points.length;t++)c._canvasContext.lineTo(this._points[t].x,this._points[t].y);c._canvasContext.fill()}setPoints(t){this._points=t}}(a.grey());t.setPoints([new n(25,0),new n(0,25),new n(-25,0),new n(0,-25)]),this.renderer=this.addComponent(m.RENDERER),this.renderer.setDrawable(t),this.renderer.drawOrder=100}start(){this.showingPosX=200*s.sign(this.transform.position.x),this.hidingPosX=250*s.sign(this.transform.position.x)}show(){this.transform.tweenPositionX(this.showingPosX,.2,0,b.LINEAR,!1)}hide(){this.transform.tweenPositionX(this.hidingPosX,.2,0,b.LINEAR,!1)}},lt=class extends ot{constructor(t){super(t),Tt.gameStateChanged.subscribe(this.stateChangedHandler.bind(this))}stateChangedHandler(t){t===tt.WELCOME&&this.hideSpike()}start(){this.collider.size=new n(100,600);for(let t=-200;t<=200;t+=50){let e=new ht("Spike");e.setParent(this),e.transform.position=new n(this.transform.position.x,t),e.start(),this.spikes.push(e)}}showSpike(){let t=this.difficultyFunction(Tt.currentScore),e=s.randomIntBag(0,this.spikes.length,t);for(let t=0;t<e.length;t++)this.spikes[e[t]].show()}hideSpike(){for(let t=0;t<this.spikes.length;t++)this.spikes[t].hide()}difficultyFunction(t){return Math.floor(Math.log(t+2)/Math.log(1.6))}},ct=class extends ot{constructor(t){super(t),this.renderer=this.addComponent(m.RENDERER),this.renderer.drawOrder=100}start(){this.collider.size=new n(400,100);for(let t=-200;t<=200;t+=50){let e=new ht("Spike");e.setParent(this);let i=t,r=250*s.sign(this.transform.position.y);e.transform.position=new n(i,r),e.start(),this.spikes.push(e)}let t=new nt(new n(400,100),a.grey());this.renderer.setDrawable(t)}},dt=class extends q{constructor(t){super(t),this.transform=this.addComponent(m.TRANSFORM),this.textContent=new rt("00",a.white()),this.textContent.font="100px Courier New",this.text=this.addComponent(m.TEXT),this.text.setDrawable(this.textContent),this.text.pivot=j.MID_CENTER,this.text.drawOrder=-1,Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t===tt.PLAY?(this.textContent.text="0",this.isVisible=!0,this.isActive=!0):(this.isVisible=!1,this.isActive=!1)}changeScore(t){this.textContent.text=t.toString()}},ut=class extends q{constructor(t){super(t),this.transform=this.addComponent(m.TRANSFORM);let e=new et(100,new a(.9,.9,.9));this.renderer=this.addComponent(m.RENDERER),this.renderer.setDrawable(e),this.renderer.drawOrder=-2,Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t==tt.PLAY?(this.isVisible=!0,this.isActive=!0):(this.isVisible=!1,this.isActive=!1)}},_t=class extends q{constructor(t){super(t),this.transform=this.addComponent(m.TRANSFORM);let e=new nt(new n(400,150),new a(.5,.5,.5,.5));this.renderer=this.addComponent(m.RENDERER),this.renderer.setDrawable(e),this.renderer.drawOrder=1,Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t===tt.RESULT?(this.isActive=!0,this.isVisible=!0):(this.isActive=!1,this.isVisible=!1)}},mt=class extends q{constructor(t){super(t),this.transform=this.addComponent(m.TRANSFORM),this.transform.position=new n(0,30),this.textContent=new rt("",a.white()),this.textContent.font="30px open sans",this.text=this.addComponent(m.TEXT),this.text.setDrawable(this.textContent),this.text.pivot=j.MID_CENTER,this.text.drawOrder=10,Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t==tt.RESULT?(this.isVisible=!0,this.isActive=!0,this.textContent.text=`Current score: ${Tt.currentScore}`):(this.isVisible=!1,this.isActive=!1)}},pt=class extends q{constructor(t){super(t),this.transform=this.addComponent(m.TRANSFORM),this.transform.position=new n(0,-30),this.textContent=new rt("00",a.white()),this.textContent.font="30px open sans",this.text=this.addComponent(m.TEXT),this.text.setDrawable(this.textContent),this.text.pivot=j.MID_CENTER,this.text.drawOrder=10,Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t==tt.RESULT?(this.isVisible=!0,this.isActive=!0,this.textContent.text=`High score: ${Tt.highScore}`):(this.isVisible=!1,this.isActive=!1)}},wt=class extends q{init(){this.transform=this.addComponent(m.TRANSFORM),this.transform.position=new n(0,-150);let t=new nt(new n(200,100),a.white());this.button=this.addComponent(m.BUTTON),this.button.elementSize=new n(200,100),this.button.setDrawable(t),this.button.pivot=j.MID_CENTER;let e=new rt("Retry",a.grey());e.font="30px open sans",this.text=this.addComponent(m.TEXT),this.text.setDrawable(e),this.button.clicked.subscribe(this.changeToPlayState.bind(this)),Tt.gameStateChanged.subscribe(this.gameStateChangedHandler.bind(this))}gameStateChangedHandler(t){t==tt.RESULT?(this.isVisible=!0,this.isActive=!0):(this.isVisible=!1,this.isActive=!1)}changeToPlayState(){Tt.changeState(tt.WELCOME)}};class Ct extends W{static changeState(t){Ct.gameState=t,Ct.gameStateChanged.invoke(t)}static stateChangeHandler(t){t===tt.WELCOME?Ct.currentScore=0:t===tt.PLAY||t===tt.RESULT&&Ct.highScore<Ct.currentScore&&(Ct.highScore=Ct.currentScore)}static init(t){super.init(t),Ct.gameStateChanged.subscribe(Ct.stateChangeHandler.bind(Ct));let e=new it("Main Bird");e.start();let s=new lt("Wall");s.transform.position=new n(-250,0),s.start();let i=new lt("Wall");i.transform.position=new n(250,0),i.start(),e.touchedLeftWall.subscribe((()=>{s.hideSpike(),i.showSpike()})),e.touchedRightWall.subscribe((()=>{i.hideSpike(),s.showSpike()}));let r=new ct("Top Wall");r.transform.position=new n(0,300),r.start();let a=new ct("Bottom Wall");a.transform.position=new n(0,-300),a.start(),new ut("Score Background").start();let o=new dt("Score Text");e.scoreChanged.subscribe(o.changeScore.bind(o)),o.start(),new at("Play Button").start(),new _t("Result Background").start(),new mt("Result Score").start(),new pt("High Score").start(),new wt("Retry Button").start(),Ct.changeState(tt.WELCOME)}}Ct.currentScore=0,Ct.highScore=0,Ct.gameState=tt.WELCOME,Ct.gameStateChanged=new C;const Tt=Ct;new class{constructor(){console.log("Game created");let t=document.getElementById("game"),e=document.createElement("canvas");e.id="canvas",e.width=400,e.height=600,null==t||t.appendChild(e),Tt.init(e.getContext("2d"))}}})();