/* V9 Canvas Chart Engine — deterministic OHLC renderer, no external chart CDN. */
class CanvasChart {
  constructor(host){
    this.host=host; host.innerHTML='';
    this.canvas=document.createElement('canvas'); this.canvas.className='chart'; host.appendChild(this.canvas);
    this.ctx=this.canvas.getContext('2d'); this.candles=[]; this.ema=[]; this.markers=[]; this.position=null; this.srLevels=null; this.brain=null; this.setup=null; this.offset=0; this.visible=50; this.drag=false; this.lastX=0; this.pointers=new Map(); this.lastPinchDistance=0; this.lastTap=0; this.panStartOffset=0;
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
  setBrain(x){this.brain=x&&typeof x==='object'?x:null;this.render()}
  setSetup(x){this.setup=x&&typeof x==='object'?x:null;this.render()}
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
  range(){
    const W=this.host.clientWidth,H=this.host.clientHeight,n=this.candles.length;
    const vis=Math.min(n,this.visible||110),end=n-this.offset,start=Math.max(0,end-vis),cs=this.candles.slice(start,end);
    let hi=Math.max(...cs.map(c=>Number(c.high))),lo=Math.min(...cs.map(c=>Number(c.low)));
    // Price scale is anchored to the visible candle range. A distant TP/SL/entry
    // must never squash the candles into a thin band when a position is opened.
    const span=Math.max(hi-lo,Math.abs(hi)*0.00001,1e-8),nearLo=lo-span*.35,nearHi=hi+span*.35;
    if(this.position){
      for(const raw of [this.position.entry,this.position.sl,this.position.tp]){
        const v=Number(raw);
        // Include position levels only when reasonably close to the visible market.
        if(Number.isFinite(v)&&v>0&&v>=nearLo&&v<=nearHi){hi=Math.max(hi,v);lo=Math.min(lo,v)}
      }
    }
    const pad=(hi-lo)*.08||Math.abs(hi)*.0001||1;
    return {W,H,start,end,cs,hi:hi+pad,lo:lo-pad,vis};
  }
  px(i,r){return 48+(i-r.start+.5)*(r.W-88)/r.vis}
  py(v,r){return 8+(r.hi-v)/(r.hi-r.lo)*(r.H-34)}
  line(x1,y1,x2,y2,stroke,w=1,dash=[]){const c=this.ctx;c.beginPath();c.setLineDash(dash);c.strokeStyle=stroke;c.lineWidth=w;c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();c.setLineDash([])}
  text(t,x,y,fill='#9aa9bc',size=10,align='left'){const c=this.ctx;c.fillStyle=fill;c.font=`${size}px system-ui`;c.textAlign=align;c.fillText(t,x,y)}
  render(){const c=this.ctx,W=this.host.clientWidth,H=this.host.clientHeight;if(!W||!H)return;c.clearRect(0,0,W,H);c.fillStyle='rgba(5,10,16,.98)';c.fillRect(0,0,W,H);if(!this.candles.length){this.text('Menunggu candle Bybit Futures…',W/2,H/2,'#7f90a6',13,'center');return}const r=this.range(),cw=Math.max(2,(W-88)/r.vis*.62);for(let g=0;g<=5;g++){const y=8+g*(H-34)/5;this.line(48,y,W-40,y,'#132030');const v=r.hi-g*(r.hi-r.lo)/5;this.text(this.fmt(v),W-6,y+3,'#7f90a6',10,'right')}for(let i=0;i<r.cs.length;i++){const idx=r.start+i,q=r.cs[i],x=this.px(idx,r),yo=this.py(q.open,r),yc=this.py(q.close,r),yh=this.py(q.high,r),yl=this.py(q.low,r);const up=q.close>=q.open;this.line(x,yh,x,yl,up?'#19d59a':'#ff5c72',1);c.fillStyle=up?'#19d59a':'#ff5c72';c.fillRect(x-cw/2,Math.min(yo,yc),cw,Math.max(1,Math.abs(yc-yo)));if(this.ema.length){const ei=idx-(this.candles.length-this.ema.length);if(ei>0&&ei<this.ema.length){const prev=this.ema[ei-1];this.line(this.px(idx-1,r),this.py(prev,r),x,this.py(this.ema[ei],r),'#f4c44f',2)}}}
    if(this.srLevels){
      const atr=Number(this.brain?.atr)||Math.max((r.hi-r.lo)*.025,1e-8);
      // Highlight approximate supply/demand POI bands around nearest confirmed levels.
      for(const [v,label,col] of [[this.srLevels.resistance,'SUPPLY / POI','#ff5c72'],[this.srLevels.support,'DEMAND / POI','#19d59a']]){
        const price=Number(v); if(!Number.isFinite(price)||price<=0)continue;
        const half=Math.max(atr*.16,price*.00015),y1=this.py(price+half,r),y2=this.py(price-half,r);
        if(Math.max(y1,y2)>=8&&Math.min(y1,y2)<=H-28){c.fillStyle=col+'20';c.fillRect(48,Math.max(8,Math.min(y1,y2)),W-88,Math.max(2,Math.min(H-28,Math.max(y1,y2))-Math.max(8,Math.min(y1,y2))));this.line(48,this.py(price,r),W-40,this.py(price,r),col+'aa',1,[5,4]);this.text(`${label} ${this.fmt(price)}`,W-45,Math.max(18,Math.min(H-30,this.py(price,r)-4)),col,9,'right');}
      }
      for(const [v,label,col] of [[this.srLevels.resistance,'R','#ffb65c'],[this.srLevels.support,'S','#4de1ff']])if(Number.isFinite(Number(v))&&Number(v)>0){const y=this.py(Number(v),r);this.line(48,y,W-40,y,col+'55',1,[5,5]);}
    }
    // H/L marks: visible-range extreme plus latest confirmed local swing points.
    const visible=r.cs;
    if(visible.length){
      let hiIdx=0,loIdx=0;
      for(let i=1;i<visible.length;i++){if(+visible[i].high>+visible[hiIdx].high)hiIdx=i;if(+visible[i].low<+visible[loIdx].low)loIdx=i;}
      const h=visible[hiIdx],l=visible[loIdx],hx=this.px(r.start+hiIdx,r),hy=this.py(+h.high,r),lx=this.px(r.start+loIdx,r),ly=this.py(+l.low,r);
      this.text('H',hx,Math.max(28,hy-9),'#ffb65c',12,'center');
      this.text('L',lx,Math.min(H-38,ly+16),'#4de1ff',12,'center');
      // Mark recent swing pivots to make higher-high/higher-low and lower-high/lower-low easier to read.
      for(let i=1;i<visible.length-1;i++){
        const q=visible[i],pr=visible[i-1],nx=visible[i+1],x=this.px(r.start+i,r);
        if(+q.high>=+pr.high&&+q.high>+nx.high)this.text('H',x,Math.max(27,this.py(+q.high,r)-7),'#ffb65c',9,'center');
        if(+q.low<=+pr.low&&+q.low<+nx.low)this.text('L',x,Math.min(H-35,this.py(+q.low,r)+13),'#4de1ff',9,'center');
      }
      // Trend line connects the two latest swing lows in rising structure or highs in falling structure.
      const pivH=[],pivL=[];
      for(let i=1;i<visible.length-1;i++){const q=visible[i],pr=visible[i-1],nx=visible[i+1];if(+q.high>=+pr.high&&+q.high>+nx.high)pivH.push({i,v:+q.high});if(+q.low<=+pr.low&&+q.low<+nx.low)pivL.push({i,v:+q.low});}
      const rising=pivL.length>=2&&pivL.at(-1).v>=pivL.at(-2).v,falling=pivH.length>=2&&pivH.at(-1).v<=pivH.at(-2).v;
      const pivots=rising?pivL:falling?pivH:(pivL.length>=2?pivL:pivH);
      if(pivots.length>=2){const a=pivots.at(-2),b=pivots.at(-1);this.line(this.px(r.start+a.i,r),this.py(a.v,r),this.px(r.start+b.i,r),this.py(b.v,r),rising?'#19d59a99':falling?'#ff5c7299':'#f4c44f88',2,[4,3]);this.text(rising?'TREND ↑':falling?'TREND ↓':'TREND',this.px(r.start+b.i,r),Math.max(25,Math.min(H-35,this.py(b.v,r)+(rising?18:-10))),rising?'#19d59a':falling?'#ff5c72':'#f4c44f',9,'center');}
    }
    if(this.position){for(const [v,col,label] of [[+this.position.entry,this.position.side==='BUY'?'#19d59a':'#ff5c72',this.position.side==='BUY'?'AUTO BUY':'AUTO SELL'],[+this.position.sl,'#ff5c72','SL'],[+this.position.tp,'#4de1ff','TP']])if(Number.isFinite(v)){const y=this.py(v,r);this.line(48,y,W-40,y,col,1,[7,5]);this.text(`${label} ${this.fmt(v)}`,W-45,y-4,col,9,'right')}}
    for(const m of this.markers){const idx=this.candles.findIndex(q=>q.time===Number(m.time));if(idx<r.start||idx>=r.end)continue;const q=this.candles[idx],x=this.px(idx,r),y=this.py(m.position==='aboveBar'?q.high:q.low,r)+(m.position==='aboveBar'?-14:14);this.text(m.shape==='arrowDown'?'▼':'▲',x,y,m.color||'#fff',13,'center');this.text(m.text||'',x,y+(m.position==='aboveBar'?-12:12),m.color||'#fff',8,'center')}
    this.text(symbol||'',52,16,'#dfe8f2',11,'left');this.text('BYBIT LINEAR · CANVAS',W-45,16,'#7f90a6',10,'right');
    if(this.brain){const b=this.brain,dir=b.direction||'NEUTRAL',col=dir==='LONG'?'#19d59a':dir==='SHORT'?'#ff5c72':'#f4c44f';const label=`BRAIN ${dir} · ${b.structure||'BUILDING'} · ${b.event||'NO BREAK'}`;c.fillStyle='rgba(5,10,16,.88)';c.fillRect(54,24,Math.min(W-110,Math.max(180,label.length*6.1)),18);this.text(label,60,37,col,10,'left');
      const last=this.candles.at(-1);if(last&&b.event&&b.event!=='NONE'){const bullish=/↑|LOW/.test(b.event),col2=bullish?'#19d59a':'#ff5c72',yy=this.py(bullish?last.low:last.high,r)+(bullish?18:-18);this.text(b.event,this.px(this.candles.length-1,r),Math.max(52,Math.min(H-30,yy)),col2,10,'center');}
    }
    if(this.setup&&['BUY','SELL'].includes(this.setup.side)){
      const z=this.setup,valid=z.valid!==false,col=z.side==='BUY'?'#19d59a':'#ff5c72';
      const levels=[[Number(z.entry),col,`${z.side} ENTRY`],[Number(z.sl),'#ff5c72','SL'],[Number(z.tp),'#4de1ff','TARGET']];
      for(const [v,color,label] of levels){if(!Number.isFinite(v)||v<=0)continue;const y=this.py(v,r);if(y<8||y>H-26)continue;this.line(48,y,W-40,color,1,label==='SL'?[3,4]:[7,4]);this.text(`${label} ${this.fmt(v)}`,W-45,Math.max(18,y-4),color,9,'right');}
      const banner=`SETUP ${z.side} · ${valid?'TERKONFIRMASI':'MENUNGGU KONFIRMASI'} · SCORE ${Math.round(Number(z.score)||0)}`;c.fillStyle='rgba(5,10,16,.9)';c.fillRect(54,45,Math.min(W-110,Math.max(205,banner.length*5.8)),18);this.text(banner,60,58,valid?col:'#f4c44f',9,'left');
    }
    const last=this.candles.at(-1);if(last)this.text(this.fmt(last.close),W-45,this.py(last.close,r)-5,last.close>=last.open?'#19d59a':'#ff5c72',10,'right');
  }
  fmt(v){const n=Number(v);if(!Number.isFinite(n))return '—';return n>=1000?n.toLocaleString('en-US',{maximumFractionDigits:2}):n.toLocaleString('en-US',{maximumFractionDigits:8})}
  handleClick(){/* reserved for future native drawing tools */}
}
