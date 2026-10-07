import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'public');
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8',
  '.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8',
  '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp',
  '.svg':'image/svg+xml','.ico':'image/x-icon','.webmanifest':'application/manifest+json'
};
http.createServer((req,res)=>{
  let u;
  try{u=new URL(req.url,`http://${req.headers.host||'localhost'}`)}catch{res.writeHead(400);return res.end('Bad request')}
  if(u.pathname.startsWith('/api/')){
    res.writeHead(404,{'Content-Type':'application/json'});return res.end(JSON.stringify({error:'Use Vercel API routes for /api/*'}));
  }
  let rel=u.pathname==='/'?'index.html':u.pathname.replace(/^\/+/,'');
  let file=path.join(publicDir,rel);
  if(!file.startsWith(publicDir)) {res.writeHead(403);return res.end('Forbidden')}
  if(!fs.existsSync(file)||fs.statSync(file).isDirectory()) file=path.join(publicDir,'index.html');
  const ext=path.extname(file).toLowerCase();
  res.writeHead(200,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':'no-store'});
  fs.createReadStream(file).pipe(res);
}).listen(port,()=>console.log(`BYBIT Futures Command Center · http://localhost:${port}`));
