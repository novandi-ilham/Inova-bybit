/* V9 Canvas Chart Engine — deterministic OHLC renderer, no external chart CDN. */
class CanvasChart {
  constructor(host){
    this.host=host; host.innerHTML='';
    this.canvas=document.createElement('canvas'); this.canvas.className='chart'; host.appendChild(this.canvas);
    this.ctx=this.canvas.getContext('2d'); this.candles=[]; this.ema=[]; this.markers=[]; this.position=null; this.srLevels=null; this.offset=0; this.visible=50; this.drag=false; this.lastX=0; this.pointers=new Map(); this.lastPinchDistance=0; this.lastTap=0; this.panStartOffset=0;
    this.series={setData:d=>{this.setCandles(d.map(x=>({...x,volume:0})))},update:d=>{this.updateCandle(d)},createPriceLine:o=>{const x={...o};this.positionLines??=[];this.positionLines.push(x);this.render();return x},removePriceLine:x=>{this.positionLines=(this.positionLines||[]).filter(y=>y!==x);this.render()},setMarkers:m=>{this.setMarkers(m)}};
    this.emaSeries={setData:d=>{this.ema=d.map(x=>x.value);this.render()},update:d=>{this.ema[this.candles.length-1]=d.value;this.render()}};
    this.resizeObserver=new ResizeObserver(()=>this.resize()); this.resizeObserver.observe(host); this.resize();
    this.canvas.addEventListener('wheel',e=>{e.preventDefault();const dir=e.deltaY>0?1:-1;this.zoom(dir,e.clientX)}, {passive:false});
    this.canvas.addEventListener('pointerdown',e=>{
      this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      this.canvas.setPointerCapture?.(e.pointerId);
      if(this.pointers.size===1){this.drag=true;this.lastX=e.clientX;this.panStartOffset=this.offset;}
      if(this.pointers.size===2){this.drag=false;this.lastPinchDistance=this.distance();}
    });
    this.canvas.addEventListener('pointermove',e=>{
      if(!this.pointers.has(e.pointerId))return;
      this.pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(this.pointers.size>=2){
        const d=this.distance();
        if(this.lastPinchDistance>0 && d>0){
          const factor=this.lastPinchDistance/d;
          this.zoomByFactor(factor,this.centerX());
        }
        this.lastPinchDistance=d;
        return;
      }
      if(!this.drag)return;
      const dx=e.clientX-this.lastX;
      this.lastX=e.clientX;
      this.offset-=dx/Math.max(2,(this.host.clientWidth-88)/Math.max(30,this.visible));
      this.clamp();this.render();
    });
    const end=e=>{
      const wasSingle=this.pointers.size===1;
      this.pointers.delete(e.pointerId);
      try{this.canvas.releasePointerCapture?.(e.pointerId)}catch{}
      if(this.pointers.size<2)this.lastPinchDistance=0;
      if(this.pointers.size===0){
        this.drag=false;
        const now=Date.now();
        if(wasSingle && now-this.lastTap<280){this.fitContent();}
        this.lastTap=now;
      }
    };
    this.canvas.addEventListener('pointerup',end);
    this.canvas.addEventListener('pointercancel',end);
    this.canvas.addEventListener('pointerleave',()=>{if(this.pointers.size===0)this.drag=false});
  }
  resize(){const r=this.host.getBoundingClientRect(),d=devicePixelRatio||1;this.canvas.width=Math.max(1,Math.floor(r.width*d));this.canvas.height=Math.max(1,Math.floor(r.height*d));this.canvas.style.width=r.width+'px';this.canvas.style.height=r.height+'px';this.ctx.setTransform(d,0,0,d,0,0);this.render()}
  setCandles(c){this.candles=c.slice(-150);this.clamp();this.render()}
  updateCandle(c){let i=this.candles.findIndex(x=>x.time===c.time); if(i<0)this.candles.push(c);else this.candles[i]={...this.candles[i],...c};this.candles=this.candles.slice(-150);this.clamp();this.render()}
  setEMA(v){this.ema=v.slice(-this.candles.length);this.render()}
  setMarkers(m){this.markers=Array.isArray(m)?m.slice(-50):[];this.render()}
  setPosition(p){this.position=p;this.render()}
  setSR(x){this.srLevels=x;this.render()}
  fitContent(){this.visible=Math.min(50,Math.max(30,this.candles.length));this.offset=0;this.clamp();this.render()}
  clamp(){const maxOffset=Math.max(0,this.candles.length-Math.max(30,Math.min(170,this.visible||90)));this.offset=Math.max(0,Math.min(this.offset,maxOffset))}
  distance(){const a=[...this.pointers.values()];if(a.length<2)return 0;return Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)}
  centerX(){const a=[...this.pointers.values()];if(!a.length)return this.host.clientWidth/2;return a.reduce((n,p)=>n+p.x,0)/a.length}
  zoom(dir,anchorX=this.host.clientWidth/2){this.zoomByFactor(dir>0?1.10:0.90,anchorX)}
  zoomByFactor(factor,anchorX=this.host.clientWidth/2){
    const old=Math.max(30,Math.min(170,this.visible||90));
    const next=Math.max(30,Math.min(170,old*factor));
    if(Math.abs(next-old)<0.05)return;
    const W=this.host.clientWidth;
    const plotW=Math.max(1,W-88);
    const rel=Math.max(0,Math.min(1,(anchorX-48)/plotW));
    const n=this.candles.length;
    const end=n-this.offset;
    const start=Math.max(0,end-old);
    const anchorIndex=start+rel*old;
    this.visible=next;
    const newStart=anchorIndex-rel*next;
    this.offset=n-(newStart+next);
    this.clamp();this.render();
  }
  range(){const W=this.host.clientWidth,H=this.host.clientHeight,n=this.candles.length;const vis=Math.min(n,this.visible||110),end=n-this.offset,start=Math.max(0,end-vis),cs=this.candles.slice(start,end);let hi=Math.max(...cs.map(c=>c.high)),lo=Math.min(...cs.map(c=>c.low)); if(this.position){hi=Math.max(hi,+this.position.tp||hi,+this.position.entry||hi,+this.position.sl||hi);lo=Math.min(lo,+this.position.tp||lo,+this.position.entry||lo,+this.position.sl||lo)}const pad=(hi-lo)*.08||1;return {W,H,start,end,cs,hi:hi+pad,lo:lo-pad,vis}}
  px(i,r){return 48+(i-r.start+.5)*(r.W-88)/r.vis}
  py(v,r){return 8+(r.hi-v)/(r.hi-r.lo)*(r.H-34)}
  line(x1,y1,x2,y2,stroke,w=1,dash=[]){const c=this.ctx;c.beginPath();c.setLineDash(dash);c.strokeStyle=stroke;c.lineWidth=w;c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([])}
  text(t,x,y,fill='#9aa9bc',size=10,align='left'){const c=this.ctx;c.fillStyle=fill;c.font=`${size}px system-ui`;c.textAlign=align;c.fillText(t,x,y)}
  render(){const c=this.ctx,W=this.host.clientWidth,H=this.host.clientHeight;if(!W||!H)return;c.clearRect(0,0,W,H);c.fillStyle='rgba(5,10,16,.98)';c.fillRect(0,0,W,H);if(!this.candles.length){this.text('Menunggu candle Bybit Futures…',W/2,H/2,'#7f90a6',13,'center');return}const r=this.range(),cw=Math.max(2,(W-88)/r.vis*.62);for(let g=0;g<=5;g++){const y=8+g*(H-34)/5;this.line(48,y,W-40,y,'#132030');const v=r.hi-g*(r.hi-r.lo)/5;this.text(this.fmt(v),W-6,y+3,'#7f90a6',10,'right')}for(let i=0;i<r.cs.length;i++){const idx=r.start+i,q=r.cs[i],x=this.px(idx,r),yo=this.py(q.open,r),yc=this.py(q.close,r),yh=this.py(q.high,r),yl=this.py(q.low,r);const up=q.close>=q.open;this.line(x,yh,x,yl,up?'#19d59a':'#ff5c72',1);c.fillStyle=up?'#19d59a':'#ff5c72';c.fillRect(x-cw/2,Math.min(yo,yc),cw,Math.max(1,Math.abs(yc-yo)));if(this.ema.length){const ei=idx-(this.candles.length-this.ema.length);if(ei>0&&ei<this.ema.length){const prev=this.ema[ei-1];this.line(this.px(idx-1,r),this.py(prev,r),x,this.py(this.ema[ei],r),'#f4c44f',2)}}}
    if(this.srLevels){for(const v of [this.srLevels.support,this.srLevels.resistance])if(Number.isFinite(v)){const y=this.py(v,r);this.line(48,y,W-40,y,'#4de1ff77',1,[5,5]);this.text(this.fmt(v),W-45,y-3,'#4de1ff',9,'right')}}
    if(this.position){for(const [v,col,label] of [[+this.position.entry,this.position.side==='BUY'?'#19d59a':'#ff5c72',this.position.side==='BUY'?'AUTO BUY':'AUTO SELL'],[+this.position.sl,'#ff5c72','SL'],[+this.position.tp,'#4de1ff','TP']])if(Number.isFinite(v)){const y=this.py(v,r);this.line(48,y,W-40,y,col,1,[7,5]);this.text(`${label} ${this.fmt(v)}`,W-45,y-4,col,9,'right')}}
    for(const m of this.markers){const idx=this.candles.findIndex(q=>q.time===Number(m.time));if(idx<r.start||idx>=r.end)continue;const q=this.candles[idx],x=this.px(idx,r),y=this.py(m.position==='aboveBar'?q.high:q.low,r)+(m.position==='aboveBar'?-14:14);this.text(m.shape==='arrowDown'?'▼':'▲',x,y,m.color||'#fff',13,'center');this.text(m.text||'',x,y+(m.position==='aboveBar'?-12:12),m.color||'#fff',8,'center')}
    this.text(symbol||'',52,16,'#dfe8f2',11,'left');this.text('15M · BYBIT LINEAR · CANVAS',W-45,16,'#7f90a6',10,'right');
    const last=this.candles.at(-1);if(last)this.text(this.fmt(last.close),W-45,this.py(last.close,r)-5,last.close>=last.open?'#19d59a':'#ff5c72',10,'right');
  }
  fmt(v){const n=Number(v);if(!Number.isFinite(n))return '—';return n>=1000?n.toLocaleString('en-US',{maximumFractionDigits:2}):n.toLocaleString('en-US',{maximumFractionDigits:8})}
  handleClick(){/* reserved for future native drawing tools */}
}
