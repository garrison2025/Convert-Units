/**
 * Real Chrome Lighthouse *lab* measurements for representative pages.
 *
 * This is NOT Core Web Vitals field data: CrUX 28-day p75 INP/LCP/CLS is
 * only available when sufficient real Chrome users visit the public origin.
 * Never label Lighthouse TBT as INP, or local LCP as a real-user percentile.
 * The measured pages are from the local static build, avoiding deployment
 * timing/noindex complications and paid API dependencies.
 */
import fs from 'node:fs';
import http from 'node:http';
import {gzipSync} from 'node:zlib';
import path from 'node:path';
import {spawn,spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const out=path.join(root,'qa-lighthouse');
const chrome=process.env.CHROME_BIN||
  ['google-chrome','chromium','chromium-browser'].find(cmd=>spawnSync('which',[cmd]).status===0);
if(!chrome)throw Error('A Chrome/Chromium executable is mandatory for actual browser performance measurements.');
if(!fs.existsSync(path.join(dist,'index.html')))throw Error('Run npm run build before Lighthouse.');
fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
const cases=[
 {id:'homepage-mobile',url:'/',formFactor:'mobile'},
 {id:'converter-mobile',url:'/convert/lbs-to-kg/',formFactor:'mobile'},
 {id:'category-mobile',url:'/category/mass/',formFactor:'mobile'},
 {id:'homepage-desktop',url:'/',formFactor:'desktop'}
];
const contentTypes={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8',
 '.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
const server=http.createServer((req,res)=>{
 try{
  const request=new URL(req.url,'http://127.0.0.1');
  if(request.pathname.includes('\0'))throw Error('Invalid path');
  const relative=decodeURIComponent(request.pathname).replace(/^\/+/,'');
  let local=path.resolve(dist,relative);
  if(!local.startsWith(dist+path.sep)&&local!==dist)throw Error('Out-of-root path');
  if(!relative||relative.endsWith('/'))local=path.join(local,'index.html');
  if(!fs.existsSync(local)||!fs.statSync(local).isFile()){res.writeHead(404).end('Not found');return;}
  const type=contentTypes[path.extname(local)]||'application/octet-stream';
  const body=fs.readFileSync(local);
  // Cloudflare automatically compresses eligible text responses. Our original
  // localhost server did not: Lighthouse incorrectly proposed "Enable text
  // compression" as if this were a production defect. Model text gzip on the
  // test origin so that lab opportunities focus on real page behavior.
  const compressed=/\bgzip\b/i.test(req.headers['accept-encoding']||'')&&
   /^(?:text\/|application\/(?:json|javascript))/.test(type);
  res.writeHead(200,{
   'Content-Type':type,'Cache-Control':'no-store',
   'Vary':'Accept-Encoding',...(compressed?{'Content-Encoding':'gzip'}:{})
  });
  res.end(compressed?gzipSync(body):body);
 }catch{
  res.writeHead(400).end('Invalid route');
 }
});
const start=()=>new Promise((resolve,reject)=>{
 server.once('error',reject);
 server.listen(0,'127.0.0.1',resolve);
});
function invoke(args){
 return new Promise((resolve,reject)=>{
  const command=process.platform==='win32'?'npx.cmd':'npx';
  const child=spawn(command,args,{cwd:root,env:{...process.env,CHROME_PATH:chrome},
   stdio:['ignore','pipe','pipe']});
  let log='';
  const timeout=setTimeout(()=>child.kill('SIGKILL'),100000);
  child.stdout.on('data',b=>{log=(log+b.toString()).slice(-16000);});
  child.stderr.on('data',b=>{log=(log+b.toString()).slice(-16000);});
  child.once('error',e=>{clearTimeout(timeout);reject(e);});
  child.once('close',code=>{
   clearTimeout(timeout);
   if(code!==0)reject(Error('Lighthouse failed ('+code+'): '+log.slice(-2800)));
   else resolve(log);
  });
 });
}
const num=(report,key)=>typeof report.audits?.[key]?.numericValue==='number'?
 report.audits[key].numericValue:null;
const result=[];
try{
 await start();
 const origin='http://127.0.0.1:'+server.address().port;
 for(const c of cases){
  const destination=path.join(out,c.id+'.json');
  const cli=['--yes','lighthouse@12.8.2',origin+c.url,
   '--only-categories=performance','--output=json','--output-path='+destination,
   '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage',
   '--max-wait-for-load=15000','--quiet'];
  if(c.formFactor==='desktop')cli.push('--preset=desktop');
  await invoke(cli);
  if(!fs.existsSync(destination))throw Error('Lighthouse report missing: '+c.id);
  const report=JSON.parse(fs.readFileSync(destination,'utf8'));
  if(!report.lighthouseVersion||!report.audits||report.runtimeError)
   throw Error('Invalid Lighthouse benchmark '+c.id+': '+JSON.stringify(report.runtimeError));
  if(!report.finalUrl?.startsWith(origin+c.url))throw Error('Unexpected Lighthouse destination '+report.finalUrl);
  const item={
   id:c.id,route:c.url,formFactor:c.formFactor,chromeVersion:report.environment?.hostUserAgent||null,
   lighthouseVersion:report.lighthouseVersion,
   performanceScore:typeof report.categories?.performance?.score==='number'?
    Math.round(report.categories.performance.score*100):null,
   labLcpMs:num(report,'largest-contentful-paint'),
   labFcpMs:num(report,'first-contentful-paint'),
   labCls:num(report,'cumulative-layout-shift'),
   labTbtMs:num(report,'total-blocking-time'),
   labSpeedIndexMs:num(report,'speed-index'),
   labTtiMs:num(report,'interactive'),
   opportunities:Object.values(report.audits||{}).filter(a=>
    a.details?.type==='opportunity'&&Number(a.details?.overallSavingsMs||0)>150)
    .map(a=>({title:a.title,potentialSavingsMs:Math.round(a.details.overallSavingsMs)}))
    .sort((a,b)=>b.potentialSavingsMs-a.potentialSavingsMs).slice(0,8),
   reportFile:c.id+'.json'
  };
  if(item.labLcpMs===null||item.labCls===null||item.labTbtMs===null||
      item.performanceScore===null)throw Error('Missing lab measurements in '+c.id);
  result.push(item);
  console.log('LIGHTHOUSE LAB:',JSON.stringify(item));
 }
 const summary={
  observedAt:new Date().toISOString(),measurement:'Chrome Lighthouse lab, controlled emulated device/network',
  isCruxFieldData:false,fieldDataStatus:'NOT_MEASURED',fieldLcpP75:null,fieldInpP75:null,fieldClsP75:null,
  caution:'Local lab results are not real-user Core Web Vitals, and Total Blocking Time is not INP. Scores vary by hardware and CPU. Local text files use gzip when requested, reflecting compression but not actual Cloudflare CDN latency.',
  thresholdsContext:{goodLcpMs:2500,goodClsBelow:0.1,goodInpMs:200,
   note:'Google thresholds refer to real-user p75; compare lab results as diagnostic observations only.'},
  lighthouseVersion:result[0]?.lighthouseVersion,caseCount:result.length,results:result
 };
 fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify(summary,null,2)+'\n');
 console.log('LIGHTHOUSE LAB SUMMARY:',JSON.stringify(summary));
}finally{
 await new Promise(resolve=>server.close(resolve));
}
