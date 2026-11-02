/**
 * Pre-deployment SEO QA; tests the HTML a crawler receives without running JS.
 * Audits real page content, factual links, policy, structured data consistency.
 * This is not a Google indexation, SERP, or Lighthouse score.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {numericHeading,numericTitle,numericDescription} from '../src/seo-meta.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const pairList=JSON.parse(fs.readFileSync(path.join(root,'src/data/pairs.json'),'utf8'));
const seeds=JSON.parse(fs.readFileSync(path.join(root,'src/data/seeds.json'),'utf8'));
const policy=JSON.parse(fs.readFileSync(path.join(root,'src/data/numeric-seo-policy.json'),'utf8'));
const info=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8'));
const pilot=new Set(policy.pilotIndexUrls);
const errors=[], warnings=[];
const read=(route)=>fs.readFileSync(path.join(dist,route.replace(/^\/+/,''),'index.html'),'utf8');
const meta=(html,name)=>html.match(new RegExp('<meta\\s+name="'+name+'"\\s+content="([^"]*)"','i'))?.[1]||'';
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const getTitle=html=>decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'');
const indexedSeed=s=>info.numericIndexMode==='all'||pilot.has(s.url);

function checkMarkup(route,expectedApp=false){
 const html=read(route);
 const jsonBlocks=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>{
  try{return JSON.parse(x[1]);}catch(e){errors.push(route+': invalid JSON-LD: '+e.message);return null;}
 }).filter(Boolean);
 const isNumeric=seeds.some(s=>s.url===route);
 const excluded=info.mode!=='production'||(isNumeric&&!indexedSeed(seeds.find(s=>s.url===route)));
 if(excluded){
  if(!meta(html,'robots').includes('noindex'))errors.push(route+': excluded route missing noindex');
  if(jsonBlocks.length)errors.push(route+': excluded route has index-focused JSON-LD');
 }else{
  if(!meta(html,'robots').includes('index,follow'))errors.push(route+': indexable route robots mismatch');
  const page=jsonBlocks.find(x=>x['@type']==='WebPage');
  if(!page||page.url!==new URL(route,info.site).href)errors.push(route+': WebPage schema or URL incorrect');
  if(expectedApp){
   const app=jsonBlocks.find(x=>x['@type']==='WebApplication');
   if(!app||app.applicationCategory!=='UtilitiesApplication'||app.offers?.price!=='0')errors.push(route+': honest free WebApplication schema absent');
  }
  if(jsonBlocks.some(x=>x.aggregateRating||x.review))errors.push(route+': fabricated review/ratings schema prohibited');
 }
 return html;
}
for(const pair of pairList){
 const html=checkMarkup(pair.url,true);
 if(!html.includes('class="card conversion-guide"'))errors.push(pair.url+': source-linked conversion guidance missing');
 if(!html.includes('NIST conversion factors'))errors.push(pair.url+': methodology reference missing');
 if(!html.includes('Quick reference table'))errors.push(pair.url+': numeric check table missing');
 if(!html.includes('href="/methodology/"'))errors.push(pair.url+': source method path missing');
}
for(const dim of ['mass','length','volume','temperature','pressure','torque','time','speed','area','force','storage','density','power','acceleration','fuel','flow']){
 const route='/category/'+dim+'/';
 const html=checkMarkup(route,false);
 if(!html.includes('class="card measurement-guide"'))errors.push(route+': category-specific measurement explanation missing');
 if(!html.includes('How to verify a conversion'))errors.push(route+': category-specific verification missing');
 if(!html.includes('nist.gov'))errors.push(route+': NIST source link missing');
}
for(const seed of seeds){
 const html=checkMarkup(seed.url,false);
 const title=getTitle(html);
 const h1=decode(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]*>/g,'')||'');
 const pair=pairList.find(p=>p.slug===seed.slug);
 if(!pair){errors.push(seed.url+': parent pair is missing');continue;}
 if(title!==numericTitle(seed,pair)+' | ExactUnit')errors.push(seed.url+': title does not match natural, calculated query intent');
 if(h1!==numericHeading(seed,pair))errors.push(seed.url+': H1 does not name actual measurement and units');
 const desc=meta(html,'description');
 if(desc!==numericDescription(seed,pair))errors.push(seed.url+': descriptive snippet is inconsistent with the numeric answer');
 if(!html.includes('data-precision-table'))errors.push(seed.url+': useful rounding comparison missing');
 if(!html.includes('CONVERSION RESULT'))errors.push(seed.url+': answer-first content missing');
 if(info.mode==='production'&&!indexedSeed(seed)&&/<link rel="canonical"/i.test(html))errors.push(seed.url+': excluded numeric page has canonical');
}
checkMarkup('/',false);
const batchHtml=checkMarkup('/batch-converter/',true);
for(const feature of [
 'Batch unit converter for CSV and spreadsheets',
 'data-batch-column','data-batch-delimiter','data-batch-file',
 'data-batch-from-column','data-batch-to-column','data-batch-example',
 'The export preserves original spreadsheet columns',
 'row-specific units',
 'everything runs locally'
])if(!batchHtml.includes(feature))errors.push('/batch-converter/: stated feature or interface missing: '+feature);
const appSource=fs.readFileSync(path.join(root,'src/assets/app.mjs'),'utf8');
if(!/convertBatchToCsv\(table,from\.value,to\.value,\{/.test(appSource))
 errors.push('Browser script must use tested source-preserving batch conversion, not a second CSV implementation.');
if(!appSource.includes("[data-batch-example]"))errors.push('Visible mixed-unit CSV example is not wired in the browser.');

checkMarkup('/universal-converter/',true);
const result={
 status:errors.length?'failed':'passed',
 disclaimer:'Server-rendered HTML correctness only; Google indexation, SERP ranking and Core Web Vitals remain unverified.',
 mode:info.mode, pairPages:pairList.length,categoryPages:16,numericPages:seeds.length,
 numericEligibleForIndex:seeds.filter(indexedSeed).length,
 errors,warnings
};
fs.writeFileSync(path.join(dist,'seo-content-audit.json'),JSON.stringify(result,null,2));
console.log('SEO CONTENT AUDIT:',result.status,pairList.length,'pairs, 16 categories,',seeds.length,'numeric results;',errors.length,'errors');
if(errors.length){console.error(errors.slice(0,15).join('\n'));process.exitCode=1;}
