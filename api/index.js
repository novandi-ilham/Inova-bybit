import crypto from 'crypto';

const BASE = process.env.BYBIT_BASE_URL || 'https://api.bybit.id';
const KEY = process.env.BYBIT_API_KEY || '';
const SECRET = process.env.BYBIT_API_SECRET || '';
const RECV_WINDOW = String(process.env.BYBIT_RECV_WINDOW || '5000');
const ACCOUNT_TYPE = process.env.BYBIT_ACCOUNT_TYPE || 'UNIFIED';
const MAX_RISK_PCT = Math.min(1, Math.max(0.1, Number(process.env.MAX_RISK_PCT || 1)));
const TRADING_TOKEN = process.env.TRADING_TOKEN || '';
const MAX_NOTIONAL_USDT = Math.max(1, Number(process.env.MAX_NOTIONAL_USDT || 250));
const ALLOW_LIVE = String(process.env.ALLOW_LIVE_TRADING || 'false').toLowerCase() === 'true';
const ALLOW_TESTNET = String(process.env.ALLOW_TESTNET_TRADING || 'false').toLowerCase() === 'true';
const ALLOW_DEMO = String(process.env.ALLOW_DEMO_TRADING || 'false').toLowerCase() === 'true';
const IS_TESTNET = BASE.includes('testnet');
const IS_DEMO = BASE.includes('api-demo.bybit.com');

function sign(payload, ts) { return crypto.createHmac('sha256', SECRET).update(`${ts}${KEY}${RECV_WINDOW}${payload}`).digest('hex'); }
function qsSorted(params={}) { return new URLSearchParams(Object.entries(params).filter(([,v])=>v!==undefined&&v!==null).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>[k,String(v)])).toString(); }
async function bybit(path,{method='GET',params={},body=null,signed=false}={}) {
  const q=method==='GET'?qsSorted(params):''; const bodyText=method==='GET'?'':JSON.stringify(body||{}); const ts=String(Date.now());
  const headers={'Content-Type':'application/json','Accept':'application/json','User-Agent':'IlhamNovandi-Bybit-Client/1.0'};
  if(signed){if(!KEY||!SECRET)throw new Error('Bybit API credentials belum dikonfigurasi di server.');headers['X-BAPI-API-KEY']=KEY;headers['X-BAPI-TIMESTAMP']=ts;headers['X-BAPI-RECV-WINDOW']=RECV_WINDOW;headers['X-BAPI-SIGN']=sign(method==='GET'?q:bodyText,ts);headers['X-BAPI-SIGN-TYPE']='2';}
  const hosts=signed?[BASE]:[...new Set([BASE,'https://api.bybit.com','https://api.bytick.com'])]; let last;
  for(const host of hosts){
    const started=Date.now();
    try{
      const ac=new AbortController(),timer=setTimeout(()=>ac.abort(),4000); let r;
      try{r=await fetch(host+path+(q?`?${q}`:''),{method,headers,body:method==='GET'?undefined:bodyText,signal:ac.signal,cache:'no-store',redirect:'error'})}finally{clearTimeout(timer)}
      const text=await r.text();let d;try{d=JSON.parse(text)}catch{d={raw:text.slice(0,300)}}
      if(!r.ok || Number(d?.retCode)!==0){
        const detail=`Bybit upstream HTTP ${r.status} host=${host} path=${path} latency=${Date.now()-started}ms${d?.retCode!==undefined?' retCode='+d.retCode:''} message=${String(d?.retMsg||d?.raw||r.statusText||'upstream rejected request').slice(0,180)}`;
        const e=new Error(detail);e.upstream=true;e.status=r.status;e.host=host;e.retCode=d?.retCode;e.body=String(d?.retMsg||d?.raw||'').slice(0,300);throw e;
      }
      return d;
    }catch(e){
      last=e;console.error('Bybit host failed:',host,String(e?.message||e));
      // HTTP 403 commonly means IP throttling or access restrictions. Repeating
      // the same request through another official Bybit hostname usually adds load.
      if(e?.status===400 || e?.status===401 || (e?.status===403 && /rate.?limit|too frequent|access too frequent|ip limit/i.test(String(e?.body||e?.message||'')))) break;
    }
  }
  throw last||new Error('Bybit market unavailable');
}
async function readBody(req){if(req.body&&typeof req.body==='object')return req.body;return await new Promise((resolve,reject)=>{let raw='';req.on('data',c=>{raw+=c;if(raw.length>100000)reject(new Error('body too large'))});req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{})}catch(e){reject(e)}});req.on('error',reject)})}
function headers(res){res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0');res.setHeader('Pragma','no-cache');res.setHeader('Expires','0');res.setHeader('Vary','*');res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Headers','Content-Type,X-Trading-Token');res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS');res.setHeader('Content-Type','application/json; charset=utf-8')}
function requireTrade(req){if(IS_DEMO){if(!ALLOW_DEMO)throw new Error('Bybit Demo trading disabled. Set ALLOW_DEMO_TRADING=true.');return}if(IS_TESTNET){if(!ALLOW_TESTNET)throw new Error('Bybit Testnet trading disabled.')}else{if(!ALLOW_LIVE)throw new Error('Live trading disabled. Aktifkan ALLOW_LIVE_TRADING=true setelah paper/testnet tervalidasi.');if(!TRADING_TOKEN)throw new Error('TRADING_TOKEN belum dikonfigurasi; live order endpoint dikunci.');if(req.headers['x-trading-token']!==TRADING_TOKEN)throw new Error('Unauthorized trading request.')}}
function validateOrder(x){const symbol=String(x.symbol||'').toUpperCase(),side=String(x.side||'').toUpperCase(),qty=Number(x.quantity),type=String(x.type||'Market');if(!/^[A-Z0-9]{5,20}$/.test(symbol)||!['BUY','SELL'].includes(side)||!Number.isFinite(qty)||qty<=0||!['Market','Limit'].includes(type))throw new Error('symbol, side, quantity, atau order type tidak valid.');return {symbol,side,qty,type}}
async function enforceNotionalCap(symbol,qty,price){let px=Number(price);if(!(px>0)){const ticker=await bybit('/v5/market/tickers',{params:{category:'linear',symbol}});px=Number(ticker?.result?.list?.[0]?.lastPrice||0)}if(!(px>0)||!Number.isFinite(px))throw new Error('Harga market tidak tersedia; order ditolak demi keamanan.');const notional=qty*px;if(!Number.isFinite(notional)||notional>MAX_NOTIONAL_USDT)throw new Error(`Nominal order ${notional.toFixed(2)} USDT melebihi hard cap ${MAX_NOTIONAL_USDT} USDT.`);return px}
function category(){return 'linear'}

export default async function handler(req,res){
 headers(res);if(req.method==='OPTIONS')return res.status(204).end();
 try{
  const url=new URL(req.url,'https://vercel.local');const requestedRoute=url.searchParams.get('__route');const path=requestedRoute&&requestedRoute.startsWith('/api/')?requestedRoute:url.pathname;
  if(path==='/api/health'&&req.method==='GET')return res.status(200).json({ok:true,exchange:'BYBIT',category:'linear',mode:IS_DEMO?'bybit-demo':ALLOW_LIVE&&!IS_TESTNET?'live-enabled':'paper/testnet',testnet:IS_TESTNET,demo:IS_DEMO,maxRiskPct:MAX_RISK_PCT,maxNotionalUSDT:MAX_NOTIONAL_USDT,tradingEndpointLocked:IS_DEMO?!ALLOW_DEMO:(IS_TESTNET?!ALLOW_TESTNET:(!ALLOW_LIVE||!TRADING_TOKEN)),time:Date.now()});
  if(path==='/api/market/time'&&req.method==='GET')return res.status(200).json(await bybit('/v5/market/time'));
  if(path==='/api/market/ticker'&&req.method==='GET')return res.status(200).json(await bybit('/v5/market/tickers',{params:{category:category()}}));
  if(path==='/api/market/klines'&&req.method==='GET'){const symbol=String(url.searchParams.get('symbol')||'').toUpperCase();const limit=Math.min(150,Math.max(2,Number(url.searchParams.get('limit'))||150));const interval=String(url.searchParams.get('interval')||'15');if(!/^(1|3|5|15|30|60|120|240|360|720|D|W|M)$/.test(interval))return res.status(400).json({error:'interval invalid'});if(!/^[A-Z0-9]{5,20}$/.test(symbol))return res.status(400).json({error:'symbol invalid'});return res.status(200).json(await bybit('/v5/market/kline',{params:{category:category(),symbol,interval,limit}}));}
  if(path==='/api/market/orderbook'&&req.method==='GET'){const symbol=String(url.searchParams.get('symbol')||'').toUpperCase();const limit=Math.min(50,Math.max(1,Number(url.searchParams.get('limit'))||10));if(!/^[A-Z0-9]{5,20}$/.test(symbol))return res.status(400).json({error:'symbol invalid'});return res.status(200).json(await bybit('/v5/market/orderbook',{params:{category:category(),symbol,limit}}));}
  if(path==='/api/market/recent-trade'&&req.method==='GET'){const symbol=String(url.searchParams.get('symbol')||'').toUpperCase();const limit=Math.min(60,Math.max(1,Number(url.searchParams.get('limit'))||20));if(!/^[A-Z0-9]{5,20}$/.test(symbol))return res.status(400).json({error:'symbol invalid'});return res.status(200).json(await bybit('/v5/market/recent-trade',{params:{category:category(),symbol,limit}}));}
  if(path==='/api/market/diagnostic'&&req.method==='GET'){
    const started=Date.now(); const checks={time:false,ticker:false,kline:false}; const errors={}; let serverTime=null;
    // Parallel checks avoid serially spending the serverless function timeout on
    // three market requests. Each upstream attempt is capped at four seconds.
    const results=await Promise.allSettled([
      bybit('/v5/market/time'),
      bybit('/v5/market/tickers',{params:{category:'linear',symbol:'BTCUSDT'}}),
      bybit('/v5/market/kline',{params:{category:'linear',symbol:'BTCUSDT',interval:'5',limit:2}})
    ]);
    if(results[0].status==='fulfilled'){const d=results[0].value;checks.time=Number(d?.retCode)===0;serverTime=Number(d?.result?.timeSecond||0)*1000;if(!checks.time)errors.time=d?.retMsg||'Invalid time response'}else errors.time=String(results[0].reason?.message||results[0].reason);
    if(results[1].status==='fulfilled'){const d=results[1].value;checks.ticker=Number(d?.retCode)===0&&Array.isArray(d?.result?.list)&&d.result.list.some(x=>x.symbol==='BTCUSDT'&&Number(x.lastPrice)>0);if(!checks.ticker)errors.ticker=d?.retMsg||'Ticker missing/invalid'}else errors.ticker=String(results[1].reason?.message||results[1].reason);
    if(results[2].status==='fulfilled'){const d=results[2].value,rows=d?.result?.list;checks.kline=Number(d?.retCode)===0&&Array.isArray(rows)&&rows.length>0&&rows.every(k=>k.length>=5&&[k[0],k[1],k[2],k[3],k[4]].every(v=>Number.isFinite(Number(v))&&Number(v)>0));if(!checks.kline)errors.kline=d?.retMsg||'Kline missing/invalid'}else errors.kline=String(results[2].reason?.message||results[2].reason);
    const ok=Object.values(checks).every(Boolean);return res.status(ok?200:502).json({ok,exchange:'BYBIT',source:'VERCEL_SERVER',checks,errors,serverTime,latencyMs:Date.now()-started,diagnosis:Object.values(errors).some(x=>String(x).includes('HTTP 403'))?'BYBIT_HTTP_403: periksa pembatasan wilayah/IP atau rate limit; tunggu jika terkena limit, dan jangan mengulang permintaan terus-menerus.':null});
  }
  if(path==='/api/market/realtime'&&req.method==='GET'){const symbol=String(url.searchParams.get('symbol')||'').toUpperCase();if(!/^[A-Z0-9]{5,20}$/.test(symbol))return res.status(400).json({error:'symbol invalid'});const started=Date.now();const d=await bybit('/v5/market/kline',{params:{category:'linear',symbol,interval:'15',limit:2}});const kline=d?.result?.list?.[0];if(!kline)throw new Error('Bybit realtime kline kosong');return res.status(200).json({ok:true,source:'BYBIT_LINEAR',symbol,interval:'15m',serverTime:Number(d?.time)||Date.now(),receivedAt:Date.now(),latencyMs:Date.now()-started,kline})}
  if(path==='/api/account'&&req.method==='GET'){if(!KEY||!SECRET)return res.status(200).json({connected:false,reason:'Bybit API key not configured'});const [w,p]=await Promise.all([bybit('/v5/account/wallet-balance',{params:{accountType:ACCOUNT_TYPE,coin:'USDT'},signed:true}),bybit('/v5/position/list',{params:{category:'linear',settleCoin:'USDT',limit:200},signed:true})]);const wb=w?.result?.list?.[0]||{};const coin=wb?.coin?.[0]||{};const positions=(p?.result?.list||[]).filter(x=>Number(x.size)!==0);return res.status(200).json({connected:true,baseUrl:BASE,demo:IS_DEMO,account:{walletBalance:wb.totalWalletBalance||coin.walletBalance||'0',availableBalance:wb.totalAvailableBalance||coin.availableToWithdraw||coin.walletBalance||'0',unrealizedProfit:wb.totalPerpUPL||'0'},assets:wb.coin||[],positions})}
  if(path==='/api/closed-pnl'&&req.method==='GET'){if(!KEY||!SECRET)return res.status(200).json({list:[]});const params={category:'linear',limit:Math.min(100,Math.max(1,Number(url.searchParams.get('limit'))||100))};if(url.searchParams.get('symbol'))params.symbol=String(url.searchParams.get('symbol')).toUpperCase();const d=await bybit('/v5/position/closed-pnl',{params,signed:true});return res.status(200).json({list:d?.result?.list||[],nextPageCursor:d?.result?.nextPageCursor||''})}
  if(path==='/api/exchange-info'&&req.method==='GET')return res.status(200).json(await bybit('/v5/market/instruments-info',{params:{category:'linear',symbol:String(url.searchParams.get('symbol')||'BTCUSDT').toUpperCase()}}));
  if(path==='/api/order'&&req.method==='POST'){requireTrade(req);const x=await readBody(req);const v=validateOrder(x);if(!x.reduceOnly)await enforceNotionalCap(v.symbol,v.qty,v.type==='Limit'?x.price:0);if(v.type==='Limit'&&!(Number(x.price)>0))return res.status(400).json({error:'Limit order wajib memiliki harga positif.'});const body={category:'linear',symbol:v.symbol,side:v.side,orderType:v.type,qty:String(v.qty),...(x.reduceOnly?{reduceOnly:true}:{}),...(v.type==='Limit'?{price:String(x.price)}:{})};return res.status(200).json(await bybit('/v5/order/create',{method:'POST',body,signed:true}))}
  if(path==='/api/bracket-order'&&req.method==='POST'){requireTrade(req);const x=await readBody(req);const symbol=String(x.symbol||'').toUpperCase(),side=String(x.side||'').toUpperCase(),qty=Number(x.quantity),sl=Number(x.stopPrice),tp=Number(x.takeProfitPrice);if(!/^[A-Z0-9]{5,20}$/.test(symbol)||!['BUY','SELL'].includes(side)||!Number.isFinite(qty)||qty<=0||!(sl>0)||!(tp>0))return res.status(400).json({error:'symbol, side, quantity, stopPrice, takeProfitPrice tidak valid.'});await enforceNotionalCap(symbol,qty,0);const entry=await bybit('/v5/order/create',{method:'POST',body:{category:'linear',symbol,side,orderType:'Market',qty:String(qty),takeProfit:String(tp),stopLoss:String(sl),tpslMode:'Full',tpTriggerBy:'MarkPrice',slTriggerBy:'MarkPrice'},signed:true});return res.status(200).json({entry})}
  if(path==='/api/close'&&req.method==='POST'){requireTrade(req);const x=await readBody(req);const symbol=String(x.symbol||'').toUpperCase(),side=String(x.side||'').toUpperCase(),qty=Number(x.quantity);if(!/^[A-Z0-9]{5,20}$/.test(symbol)||!['BUY','SELL'].includes(side)||!Number.isFinite(qty)||qty<=0)return res.status(400).json({error:'symbol, quantity, side tidak valid.'});return res.status(200).json(await bybit('/v5/order/create',{method:'POST',body:{category:'linear',symbol,side,orderType:'Market',qty:String(qty),reduceOnly:true},signed:true}))}
  return res.status(404).json({error:'Not found'});
 }catch(error){console.error(error);const status=error?.upstream?502:500;return res.status(status).json({error:error.message||'Internal server error',code:error?.upstream?'BYBIT_UPSTREAM_ERROR':'SERVER_ERROR',exchange:error?.upstream?'BYBIT':undefined,upstreamStatus:error?.status,host:error?.host,retCode:error?.retCode})}
}
