/**
 * Google SEO signals on the actual owner-confirmed apex, not a simulated URL.
 * Read-only, no Search Console submission, indexing approval or Cloudflare writes.
 * Keep stale/temporarily unreachable deployments distinct from passing builds.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const origin='https://convertunits.cc';
const mirror='https://convert-units-bwa.pages.dev';
const routes=['/','/convert/lbs-to-kg/','/convert/kg-to-lbs/240/','/category/mass/','/contact/','/privacy/','/robots.txt','/sitemap.xml','/build-info.json'];
const out=path.join(root,'qa-google-seo');
fs.mkdirSync(out,{recursive:true});

async function get(host,route){
  const url=host+route;
  try{
    const response=await fetch(url,{signal:AbortSignal.timeout(12500),headers:{'User-Agent':'ConvertUnits.cc-Google-SEO-Audit/1.0'}});
    const body=(await response.text()).slice(0,180000);
    return {url,finalUrl:response.url,status:response.status,contentType:response.headers.get('content-type'),
      robotsHeader:response.headers.get('x-robots-tag')||'',body};
  }catch(e){return {url,status:null,error:e?.message||String(e),body:'',robotsHeader:''};}
}
const [main,preview]=await Promise.all([
  Promise.all(routes.map(r=>get(origin,r))),
  get(mirror,'/')
]);
const byRoute=new Map(routes.map((r,i)=>[r,main[i]]));
const issues=[],observations=[];
const fetchFail=main.filter(x=>x.status!==200);
for(const x of fetchFail)issues.push('HTTP unavailable '+x.url+': '+(x.error||x.status));
const infoJson=byRoute.get('/build-info.json');
let info=null;
try{if(infoJson?.status===200)info=JSON.parse(infoJson.body);}catch{issues.push('Invalid live build-info.json');}
const isNoindex=x=>/<meta\\s+name="robots"\\s+content="[^"]*noindex/i.test(x?.body||'')||/(?:^|,)\\s*noindex\\b/i.test(x?.robotsHeader||'');
const canonicalOf=x=>x?.body?.match(/<link\\s+rel="canonical"\\s+href="([^"]+)"/i)?.[1]||null;
const locs=[...(byRoute.get('/sitemap.xml')?.body||'').matchAll(/<loc>([^<]+)<\\/loc>/g)].map(m=>m[1]);
if(info){
  observations.push('mode='+info.mode,'site='+String(info.site),'indexable='+info.indexablePages);
  if(info.mode==='preview'){
    if(info.site!==null||info.indexablePages!==0)issues.push('Preview build has publication metadata');
    for(const route of ['/','/convert/lbs-to-kg/','/category/mass/','/convert/kg-to-lbs/240/']){
      const x=byRoute.get(route);
      if(x?.status===200&&(!isNoindex(x)||canonicalOf(x)))issues.push('Preview index leak: '+route);
    }
    if(locs.length)issues.push('Preview sitemap unexpectedly lists '+locs.length+' URLs');
    observations.push('Preview is intentionally not eligible for Google indexing');
  }else if(info.mode==='production'){
    if(info.site!==origin)issues.push('Production canonical origin mismatch: '+info.site);
    for(const route of ['/','/convert/lbs-to-kg/','/category/mass/']){
      const x=byRoute.get(route);
      if(x?.status===200&&(isNoindex(x)||canonicalOf(x)!==origin+route))issues.push('Production canonical or robots mismatch: '+route);
      if(!locs.includes(origin+route))issues.push('Production sitemap misses '+route);
    }
    const held=byRoute.get('/convert/kg-to-lbs/240/');
    if(held?.status===200&&!info.numericPublishedUrls?.includes('/convert/kg-to-lbs/240/')&&!isNoindex(held))
      issues.push('Unapproved numeric URL exposed to index: /convert/kg-to-lbs/240/');
    if(locs.some(u=>!u.startsWith(origin+'/')||u.includes('.pages.dev')))issues.push('Off-host sitemap loc');
    observations.push('Production release detected; inspect real Google Search Console separately');
  }else issues.push('Unexpected build mode: '+info.mode);
}
for(const route of ['/','/contact/','/privacy/']){
 const x=byRoute.get(route);
 if(x?.status===200&&!x.body.includes('ConvertUnits.cc'))issues.push('Live brand missing: '+route);
}
if(byRoute.get('/contact/')?.status===200&&!byRoute.get('/contact/').body.includes('mailto:contact@convertunits.cc'))
 issues.push('Official contact link absent from live contact page');
if(preview.status===200&&!isNoindex(preview))
 issues.push('Cloudflare pages.dev mirror missing noindex protection');
const result={date:new Date().toISOString(),origin,mirror:preview.url,mode:info?.mode||'unknown',
  buildCommit:info?.buildCommit||null,site:info?.site||null,sitemapUrls:locs.length,
  sampledRoutes:main.map(({url,status,robotsHeader,error})=>({url,status,robotsHeader,error})),
  pagesMirror:{status:preview.status,robotsHeader:preview.robotsHeader,noindex:isNoindex(preview),error:preview.error},
  status:issues.length?'REVIEW_REQUIRED':'PASS',issues,observations,
  caveat:'Observes public HTTP responses, not Googlebot, rankings, Search Console or owner indexing approval.'};
fs.writeFileSync(path.join(out,'official-domain-audit.json'),JSON.stringify(result,null,2));
console.log('OFFICIAL GOOGLE SEO LIVE AUDIT:',JSON.stringify({status:result.status,mode:result.mode,commit:result.buildCommit,sitemapUrls:locs.length,issues}));
