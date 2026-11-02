import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const dist=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const htmlFiles=[];
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(e.name==='index.html')htmlFiles.push(f);}}
walk(dist);
const routes=new Map();
for(const file of htmlFiles){const relative=path.relative(dist,path.dirname(file)).replaceAll(path.sep,'/');const url='/'+(relative?relative+'/':'');assert.ok(!routes.has(url),'Duplicate route '+url);routes.set(url,fs.readFileSync(file,'utf8'));}
const errors=[],warnings=[],titles=new Map(),descriptions=new Map(),h1s=new Map(),fingerprints=new Map();
const attributes=(html,name)=>[...html.matchAll(new RegExp('\\b'+name+'\\s*=\\s*["\\x27]([^"\\x27]*)["\\x27]','gi'))].map(x=>x[1].replaceAll('&amp;','&'));
const clean=(html)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<(?:header|footer|nav)\b[^>]*>[\s\S]*?<\/(?:header|footer|nav)>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|amp|lt|gt|quot);/g,' ').replace(/\s+/g,' ').trim();
const build=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8'));
const policy=JSON.parse(fs.readFileSync(path.resolve(dist,'../src/data/numeric-seo-policy.json'),'utf8'));
const excluded=new Set(build.numericIndexMode==='all'?[]:JSON.parse(fs.readFileSync(path.resolve(dist,'../src/data/seeds.json'),'utf8')).filter(x=>!policy.pilotIndexUrls.includes(x.url)).map(x=>x.url));
for(const [route,html] of routes){
 const title=html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
 const desc=html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
 const h1=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g,'').trim();
 for(const [label,value,map] of [['title',title,titles],['description',desc,descriptions],['h1',h1,h1s]]){
  if(!value) errors.push(route+': missing '+label);
  else if(map.has(value) && route!='/404/') warnings.push('Repeated '+label+': '+route+' and '+map.get(value));
  else map.set(value,route);
 }
 if(build.mode==='production' && route!='/404/' && !excluded.has(route)){
  const canonical=html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1];
  if(canonical!==new URL(route,build.site).href)errors.push(route+': inconsistent canonical');
 }
 if(build.mode==='production'&&excluded.has(route)){
  if(!html.includes('content="noindex,follow"')||html.includes('rel="canonical"'))errors.push(route+': numeric pilot exclusion leaks indexability');
 }
 for(const href of attributes(html,'href')){
  if(href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('tel:')||href.startsWith('javascript:'))continue;
  let target;
  try{target=new URL(href,build.site||'https://preview.example').pathname;}catch{errors.push(route+': invalid href '+href);continue;}
  if(/^https?:\/\//i.test(href) && new URL(href).origin!==(build.site||'https://preview.example'))continue;
  if(target.endsWith('/')){if(!routes.has(target))errors.push(route+': broken internal link '+href);}
  else if(!fs.existsSync(path.join(dist,target.replace(/^\//,''))) && !routes.has(target+'/'))errors.push(route+': missing asset or route '+href);
 }
 const body=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'';
 const normalized=clean(body).replace(/\b[-+]?\d+(?:[.,]\d+)?(?:e[-+]?\d+)?\b/gi,'#');
 if(route.startsWith('/convert/') && normalized.length<180)warnings.push(route+': limited main content');
 if(route.startsWith('/convert/') && route.split('/').filter(Boolean).length===3){
  const sig=normalized.slice(0,5000);
  if(fingerprints.has(sig))warnings.push('Numeric template near-identical after removing numbers: '+fingerprints.get(sig)+' and '+route);
  else fingerprints.set(sig,route);
 }
}
const report={buildMode:build.mode,routeCount:routes.size,linkAudit:'all href attributes across all generated HTML pages',errors,warnings:warnings.slice(0,150),warningCount:warnings.length,reviewNote:'Warnings are editorial review signals, not a guarantee of AdSense approval; numeric page similarity needs human review.'};
fs.writeFileSync(path.join(dist,'quality-report.json'),JSON.stringify(report,null,2));
console.log('DEEP AUDIT:',routes.size,'routes;',errors.length,'errors;',warnings.length,'review warnings');
if(errors.length){console.error(errors.slice(0,35).join('\n'));process.exitCode=1;}
