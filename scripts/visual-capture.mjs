/**
 * Dependency-free Chromium screenshots of local static output.
 * Outputs are CI artifacts only; nothing is added to dist or production.
 * Mobile captures use a fixed-width iframe to avoid Chrome window minimum widths.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const out=path.join(root,'qa-snapshots');
const chrome=process.env.CHROME_BIN||
 ['google-chrome','chromium','chromium-browser'].find(cmd=>spawnSync('which',[cmd]).status===0);
if(!chrome)throw new Error('A real Chrome/Chromium binary is required for visual QA.');
if(!fs.existsSync(path.join(dist,'index.html')))throw new Error('Run npm run build before visual QA.');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});

const shots=[
 {file:'home-desktop.png',route:'/',width:1440,height:950},
 {file:'home-mobile-375.png',route:'/',mobile:375,width:1250,height:1000},
 {file:'home-mobile-320.png',route:'/',mobile:320,width:1250,height:1000},
 {file:'converter-desktop.png',route:'/convert/lbs-to-kg/',width:1440,height:950},
 {file:'converter-mobile-375.png',route:'/convert/lbs-to-kg/',mobile:375,width:1250,height:1000},
 {file:'numeric-mobile-375.png',route:'/convert/lbs-to-kg/149/',mobile:375,width:1250,height:1000},
 {file:'batch-desktop.png',route:'/batch-converter/',width:1440,height:950},
 {file:'batch-mobile-375.png',route:'/batch-converter/',mobile:375,width:1250,height:1000}
];
const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 if(url.pathname==='/__visual_mobile'){
  const width=Number(url.searchParams.get('width'));
  const route=url.searchParams.get('route');
  if(![320,375].includes(width)||!shots.some(x=>x.route===route)){res.writeHead(400).end();return;}
  res.setHeader('Content-Type','text/html; charset=utf-8');
  res.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Local visual QA — not deployed</title><style>*{box-sizing:border-box}body{margin:0;background:#e2e7f0;font-family:system-ui,sans-serif}.frame{width:max-content;margin:20px auto;background:#fff;border:7px solid #1b2331;border-radius:27px;overflow:hidden;box-shadow:0 16px 50px #111a3138}iframe{display:block;border:0;background:white}</style></head><body><div class="frame"><iframe title="Mobile site at '+width+' pixels" src="'+route+'" width="'+width+'" height="870"></iframe></div></body></html>');
  return;
 }
 const relative=decodeURIComponent(url.pathname).slice(1);
 const target=path.resolve(dist,!relative||relative.endsWith('/')?path.join(relative,'index.html'):relative);
 if(!target.startsWith(dist+path.sep)||!fs.existsSync(target)||!fs.statSync(target).isFile()){res.writeHead(404).end('Not found');return;}
 const ext=path.extname(target);
 res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.mjs':'text/javascript','.svg':'image/svg+xml'})[ext]||'application/octet-stream');
 res.end(fs.readFileSync(target));
});
await new Promise((resolve,reject)=>server.listen(0,'127.0.0.1',error=>error?reject(error):resolve()));
const origin='http://127.0.0.1:'+server.address().port;
async function capture(shot){
 const filename=path.join(out,shot.file);
 const url=shot.mobile?origin+'/__visual_mobile?width='+shot.mobile+'&route='+encodeURIComponent(shot.route):origin+shot.route;
 const args=['--headless','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
  '--disable-extensions','--disable-background-networking','--no-first-run',
  '--hide-scrollbars','--force-device-scale-factor=1','--window-size='+shot.width+','+shot.height,
  '--virtual-time-budget=3000','--screenshot='+filename,url];
 const result=await new Promise((resolve,reject)=>{
  const child=spawn(chrome,args,{stdio:['ignore','pipe','pipe']});
  let errors='';
  const timeout=setTimeout(()=>child.kill('SIGKILL'),25000);
  child.stderr.on('data',data=>errors+=data.toString().slice(-1800));
  child.on('error',err=>{clearTimeout(timeout);reject(err)});
  child.on('close',code=>{clearTimeout(timeout);code===0?resolve(true):reject(new Error('Chrome screenshot failed '+shot.file+' exit '+code+' '+errors.slice(-600)));});
 });
 const png=fs.readFileSync(filename);
 if(png.length<5000||png.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw new Error('Invalid browser PNG: '+shot.file);
 const width=png.readUInt32BE(16),height=png.readUInt32BE(20);
 if(width<shot.width-30||height<shot.height-30)throw new Error('Unexpected screenshot geometry '+shot.file+': '+width+'×'+height);
 return {file:shot.file,route:shot.route,iframeWidth:shot.mobile||null,pngWidth:width,pngHeight:height,bytes:png.length};
}
try{
 const report=[];
 for(const shot of shots){const result=await capture(shot);report.push(result);console.log('VISUAL QA SCREENSHOT:',result.file,result.pngWidth+'x'+result.pngHeight,result.bytes+' bytes');}
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify({scope:'Local static build only (not live Cloudflare verification)',commit:process.env.GITHUB_SHA||null,shots:report},null,2));
}finally{
 await new Promise(resolve=>server.close(resolve));
}
