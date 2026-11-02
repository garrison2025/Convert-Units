/**
 * Pre-deployment SEO QA; tests the HTML a crawler receives without running JS.
 * Audits real page content, factual links, policy, structured data consistency.
 * This is not a Google indexation, SERP, or Lighthouse score.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {numericHeading,numericTitle,numericDescription} from '../src/seo-meta.mjs';
import {units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const pairList=JSON.parse(fs.readFileSync(path.join(root,'src/data/pairs.json'),'utf8'));
const seeds=JSON.parse(fs.readFileSync(path.join(root,'src/data/seeds.json'),'utf8'));
const policy=JSON.parse(fs.readFileSync(path.join(root,'src/data/numeric-seo-policy.json'),'utf8'));
const info=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8'));
const pilot=new Set(policy.pilotIndexUrls);
const errors=[], warnings=[];
const verifiedHtmlRoutes=new Set();
const read=(route)=>fs.readFileSync(path.join(dist,route.replace(/^\/+/,''),'index.html'),'utf8');
const meta=(html,name)=>html.match(new RegExp('<meta\\s+name="'+name+'"\\s+content="([^"]*)"','i'))?.[1]||'';
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const getTitle=html=>decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'');
const indexedSeed=s=>info.numericIndexMode==='all'||pilot.has(s.url);

const pairByUrl=new Map(pairList.map(p=>[p.url,p]));
const seedByUrl=new Map(seeds.map(s=>[s.url,s]));
const schemaStats={webPages:0,breadcrumbs:0,webApplications:0,webSites:0,
 softwareRichResultEligibility:"not claimed: Google software app rich results require authentic review or aggregateRating in addition to the app name and offer price"};
function expectedBreadcrumbRoutes(route){
 if(route==='/')return [];
 const pair=pairByUrl.get(route);
 const seed=seedByUrl.get(route);
 if(pair){
  // Exact dimension of the source unit is the directory breadcrumb.
  return ['/', '/category/'+units[pair.from].dimension+'/',route];
 }
 if(seed){
  const parent=pairList.find(p=>p.slug===seed.slug);
  if(!parent){errors.push(route+': missing parent for breadcrumb schema');return [];}
  return ['/', '/category/'+units[parent.from].dimension+'/',parent.url,route];
 }
 return ['/',route];
}


function checkMarkup(route,expectedApp=false){
 verifiedHtmlRoutes.add(route);
 const html=read(route);
 const jsonBlocks=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(x=>{
  try{return JSON.parse(x[1]);}catch(e){errors.push(route+': invalid JSON-LD: '+e.message);return null;}
 }).filter(Boolean);
 const isNumeric=seeds.some(s=>s.url===route);
 const excluded=info.mode!=='production'||route==='/404/'||(isNumeric&&!indexedSeed(seeds.find(s=>s.url===route)));
 if(excluded){
  if(!meta(html,'robots').includes('noindex'))errors.push(route+': excluded route missing noindex');
  if(jsonBlocks.length)errors.push(route+': excluded route has index-focused JSON-LD');
 }else{
  if(!meta(html,'robots').includes('index,follow'))errors.push(route+': indexable route robots mismatch');
  const page=jsonBlocks.find(x=>x['@type']==='WebPage');
  if(!page||page.url!==new URL(route,info.site).href)errors.push(route+': WebPage schema or URL incorrect');
  if(page){
   schemaStats.webPages++;
   if(page['@context']!=='https://schema.org'||page.name!==getTitle(html)||page.description!==decode(meta(html,'description')))
    errors.push(route+': WebPage schema title/description does not match visible meta data');
  }
  const headCanonical=html.match(/<link rel="canonical" href="([^"]+)"/g)||[];
  if(headCanonical.length!==1)errors.push(route+': expected exactly one self-referencing canonical link');
  const expectedUrl=new URL(route,info.site).href;
  if(!headCanonical[0]?.includes('href="'+expectedUrl+'"'))errors.push(route+': canonical link differs from WebPage URL');
  for(const [property,expected] of [['og:title',getTitle(html)],['og:description',decode(meta(html,'description'))],['og:url',expectedUrl]]){
   const found=html.match(new RegExp('<meta property="'+property+'" content="([^"]*)"', 'i'))?.[1];
   if(decode(found||'')!==expected)errors.push(route+': '+property+' disagrees with page metadata');
  }
  const routeChain=expectedBreadcrumbRoutes(route);
  const breadcrumbs=jsonBlocks.filter(x=>x['@type']==='BreadcrumbList');
  if(route==='/'){
   if(breadcrumbs.length)errors.push(route+': homepage should not use redundant BreadcrumbList');
  }else{
   if(breadcrumbs.length!==1)errors.push(route+': expected one BreadcrumbList');
   else{
    schemaStats.breadcrumbs++;
    const items=breadcrumbs[0].itemListElement||[];
    const values=items.map(i=>i.item);
    const expected=routeChain.map(u=>new URL(u,info.site).href);
    if(JSON.stringify(values)!==JSON.stringify(expected))
     errors.push(route+': BreadcrumbList URLs disagree with actual category and tool hierarchy');
    if(items.length!==expected.length||items.some((x,i)=>x.position!==i+1||!x.name))
     errors.push(route+': BreadcrumbList missing sequential position or label');
    const breadcrumbNav=html.match(/<nav class="crumb" aria-label="Breadcrumb">([\s\S]*?)<\/nav>/i)?.[1]||'';
    if(!breadcrumbNav)errors.push(route+': visible breadcrumb navigation missing');
    for(const ancestor of routeChain.slice(0,-1)){
     if(!breadcrumbNav.includes('href="'+ancestor+'"'))
      errors.push(route+': JSON-LD breadcrumb ancestor missing from visible navigation: '+ancestor);
    }
   }
  }
  const sites=jsonBlocks.filter(x=>x['@type']==='WebSite');
  if(route==='/'){
   if(sites.length!==1||sites[0].url!==expectedUrl||sites[0].name!=='ExactUnit')
    errors.push(route+': home WebSite schema missing or inaccurate');
   else schemaStats.webSites++;
  }else if(sites.length)errors.push(route+': homepage WebSite schema leaked onto an inner page');
  if(expectedApp){
   const app=jsonBlocks.find(x=>x['@type']==='WebApplication');
   if(!app||app.applicationCategory!=='UtilitiesApplication'||app.offers?.price!=='0')errors.push(route+': honest free WebApplication schema absent');
   else{
    schemaStats.webApplications++;
    if(app.url!==expectedUrl||app.name!==getTitle(html)||app['@context']!=='https://schema.org')
     errors.push(route+': WebApplication schema URL/name inconsistent with actual page');
   }
  }
  if(jsonBlocks.some(x=>x.aggregateRating||x.review))errors.push(route+': fabricated review/ratings schema prohibited');
 }
 return html;
}
for(const pair of pairList){
 const html=checkMarkup(pair.url,true);
 const oneResult=convert(1,pair.from,pair.to);
 const shortAnswer='1 '+units[pair.from].symbol+' '+displayRelation(oneResult,formatNumber(oneResult,9))+' '+formatNumber(oneResult,9)+' '+units[pair.to].symbol;
 if(!html.includes('class="pair-key-fact"')||!html.includes(shortAnswer))
  errors.push(pair.url+': first-screen source-calculated 1-unit direct answer missing or inaccurate');
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
 'For knots (speed)', 'for kilonewtons (force)', 'is rejected rather than guessed',
 'The export preserves original spreadsheet columns',
 'row-specific units',
 'everything runs locally'
])if(!batchHtml.includes(feature))errors.push('/batch-converter/: stated feature or interface missing: '+feature);
const appSource=fs.readFileSync(path.join(root,'src/assets/app.mjs'),'utf8');
if(!/convertBatchToCsv\(table,from\.value,to\.value,\{/.test(appSource))
 errors.push('Browser script must use tested source-preserving batch conversion, not a second CSV implementation.');
if(!appSource.includes("[data-batch-example]"))errors.push('Visible mixed-unit CSV example is not wired in the browser.');

checkMarkup('/universal-converter/',true);
// Inspect every built HTML file, including /about/, /privacy/, /terms/,
// /methodology/ and the 404 page. Previously the content audit silently
// omitted these routes even though they were included in the release build.
function inspectRemaining(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);
  if(entry.isDirectory())inspectRemaining(file);
  else if(entry.name==='index.html'){
   const rel=path.relative(dist,path.dirname(file)).replaceAll(path.sep,'/');
   const route=rel?'/'+rel+'/':'/';
   if(!verifiedHtmlRoutes.has(route))checkMarkup(route,false);
  }
 }
}
inspectRemaining(dist);
if(verifiedHtmlRoutes.size!==157)errors.push('Expected full 157-route HTML schema coverage; got '+verifiedHtmlRoutes.size);
const result={
 status:errors.length?'failed':'passed',
 disclaimer:'Server-rendered HTML correctness only; Google indexation, SERP ranking and Core Web Vitals remain unverified.',
 mode:info.mode, pairPages:pairList.length,categoryPages:16,numericPages:seeds.length,
 numericEligibleForIndex:seeds.filter(indexedSeed).length,
 checkedHtmlRoutes:verifiedHtmlRoutes.size,
 schemaStats,
 errors,warnings
};
fs.writeFileSync(path.join(dist,'seo-content-audit.json'),JSON.stringify(result,null,2));
console.log('SEO CONTENT AUDIT:',result.status,verifiedHtmlRoutes.size,'HTML routes;',pairList.length,'pairs, 16 categories,',seeds.length,'numeric results;',errors.length,'errors');
if(errors.length){console.error(errors.slice(0,15).join('\n'));process.exitCode=1;}
