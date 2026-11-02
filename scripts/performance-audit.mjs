/**
 * Dependency-free transfer-size and static-asset release gate.
 * This is a build-time budget, not a browser Lighthouse / Core Web Vitals claim.
 */
import fs from 'node:fs';
import path from 'node:path';
import {gzipSync} from 'node:zlib';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const limits={
  combinedCSSBytes:70*1024,
  combinedJSBytes:55*1024,
  combinedGzipBytes:32*1024,
  largestHTMLBytes:90*1024,
  homepageHTMLBytes:65*1024
};
const failures=[];
const resources=['assets/styles.css','assets/app.mjs','assets/engine.mjs'];
const fileSize=(file)=>fs.statSync(path.join(dist,file)).size;
const bundleBytes=resources.map(file=>({file,bytes:fileSize(file),gzipBytes:gzipSync(fs.readFileSync(path.join(dist,file))).length}));
const cssBytes=bundleBytes.filter(x=>x.file.endsWith('.css')).reduce((sum,x)=>sum+x.bytes,0);
const jsBytes=bundleBytes.filter(x=>x.file.endsWith('.mjs')).reduce((sum,x)=>sum+x.bytes,0);
const compressed=bundleBytes.reduce((sum,x)=>sum+x.gzipBytes,0);
const htmlFiles=[];
function visit(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const full=path.join(dir,entry.name);
  if(entry.isDirectory())visit(full);
  else if(entry.name==='index.html')htmlFiles.push(full);
 }
}
visit(dist);
const htmlSizes=htmlFiles.map(file=>{
 const buffer=fs.readFileSync(file);
 const rel=path.relative(dist,file).replaceAll(path.sep,'/');
 const route='/'+rel.replace(/index\.html$/,'');
 const html=buffer.toString('utf8');
 // Prevent accidental introduction of third-party runtime scripts or trackers.
 if(/<script[^>]+src\s*=\s*["']https?:\/\//i.test(html))failures.push(route+': external runtime script introduced');
 if(!html.includes('href="/assets/styles.css"'))failures.push(route+': consolidated stylesheet missing');
 return {route,bytes:buffer.length};
}).sort((a,b)=>b.bytes-a.bytes);
const largest=htmlSizes[0];
const home=htmlSizes.find(x=>x.route==='/');
if(cssBytes>limits.combinedCSSBytes)failures.push('CSS exceeds '+limits.combinedCSSBytes+' bytes');
if(jsBytes>limits.combinedJSBytes)failures.push('JavaScript exceeds '+limits.combinedJSBytes+' bytes');
if(compressed>limits.combinedGzipBytes)failures.push('Combined asset gzip budget exceeded');
if(largest.bytes>limits.largestHTMLBytes)failures.push('Largest HTML route exceeds budget: '+largest.route);
if(!home||home.bytes>limits.homepageHTMLBytes)failures.push('Homepage HTML budget exceeded');
const report={mode:JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8')).mode,
  note:'Static source resource budgets only. Cloudflare compression, network delivery, LCP, CLS and INP need real browser measurements.',
  htmlPages:htmlSizes.length,limits,resources:bundleBytes,combinedCSSBytes:cssBytes,
  combinedJSBytes:jsBytes,combinedGzipBytes:compressed,largestHTML:largest,homepageHTML:home,
  failures};
fs.writeFileSync(path.join(dist,'performance-budget-report.json'),JSON.stringify(report,null,2));
console.log('PERF BUDGET:',JSON.stringify(report));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
