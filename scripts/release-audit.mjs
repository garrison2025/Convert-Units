import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {convert, formatNumber, units} from '../src/assets/engine.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const pairs=JSON.parse(fs.readFileSync(path.join(root,'src/data/pairs.json'),'utf8'));
const seeds=JSON.parse(fs.readFileSync(path.join(root,'src/data/seeds.json'),'utf8'));
const numericPolicy=JSON.parse(fs.readFileSync(path.join(root,'src/data/numeric-seo-policy.json'),'utf8'));
const pilot=new Set(numericPolicy.pilotIndexUrls);
const info=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8'));
const failures=[], warnings=[];
const fail=(message)=>failures.push(message);
const eligibleValuePages=seeds.filter(s=>!unindexableNumeric.has(s.url));
const byDirection=new Map();
for(const seed of eligibleValuePages){
 const count=(byDirection.get(seed.slug)||0)+1;
 byDirection.set(seed.slug,count);
 if(info.numericIndexMode==='curated'&&count>1)fail('Curated SEO index collision: more than one numeric value for '+seed.slug);
}
if(info.numericIndexMode==='curated'&&numericPolicy.strategy==='one-numeric-value-per-direction-launch'&&eligibleValuePages.length!==15)
 fail('Curated SEO pilot should contain exactly 15 selected numeric pages, got '+eligibleValuePages.length);

const normalize=(p)=>p==='/'?'/':p.endsWith('/')?p:p+'/';
const walk=(dir)=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  const full=path.join(dir,e.name);
  return e.isDirectory()?walk(full):[full];
});
const htmlFiles=walk(dist).filter(f=>path.basename(f)==='index.html');
const pages=new Map(htmlFiles.map(f=>{
  const rel=path.relative(dist,path.dirname(f)).replaceAll(path.sep,'/');
  return [rel?'/'+rel+'/':'/',fs.readFileSync(f,'utf8')];
}));
const allRoutes=new Set(pages.keys());
const unindexableNumeric=new Set(seeds.filter(s=>info.numericIndexMode!=='all'&&!pilot.has(s.url)).map(s=>s.url));
const canonicalRoutes=new Set([...allRoutes].filter(p=>p!=='/404/'&&!unindexableNumeric.has(p)));
const titleSeen=new Map(), descriptionSeen=new Map(), inbound=new Map([...allRoutes].map(r=>[r,0]));
const seedPaths=new Set(seeds.map(s=>s.url));
const bundledStyle=path.join(dist,'assets','styles.css');
if(!fs.existsSync(bundledStyle)||fs.statSync(bundledStyle).size<10000)fail('Required combined CSS is absent or unexpectedly small');

const extract=(html,regex)=>regex.exec(html)?.[1]??'';
const plain=(html)=>html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:[a-z]+|#\d+);/gi,' ').replace(/\s+/g,' ').trim();
assert.equal(pairs.length,38);
assert.equal(seeds.length,92);
if(info.mode==='production'&&info.indexablePages!==canonicalRoutes.size)fail('Indexable page count differs from curated sitemap candidates');
if(allRoutes.size!==pairs.length+seeds.length+27)fail('Unexpected static route count; verify 16 categories, 38 directions, 92 numeric pages and information pages');
for(const [route,html] of pages){
  const title=extract(html,/<title>([\s\S]*?)<\/title>/i);
  const desc=extract(html,/<meta name="description" content="([^"]*)"/i);
  const h1=extract(html,/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/i);
  if(!title||!desc||!h1)fail(route+': missing title, description or H1');
  if(route!=='/404/'){
    if(titleSeen.has(title))fail(route+': duplicate title with '+titleSeen.get(title));
    if(descriptionSeen.has(desc))fail(route+': duplicate description with '+descriptionSeen.get(desc));
    titleSeen.set(title,route);descriptionSeen.set(desc,route);
  }
  const robots=extract(html,/<meta name="robots" content="([^"]*)"/i);
  const canon=extract(html,/<link rel="canonical" href="([^"]*)"/i);
  const og=extract(html,/<meta property="og:url" content="([^"]*)"/i);
  if(info.mode==='production'){
    const expected=new URL(route,info.site).toString();
    if(route==='/404/'||unindexableNumeric.has(route)){
      if(!robots.includes('noindex'))fail(route+': excluded page is indexable');
      if(canon||og)fail(route+': excluded page has canonical or og:url');
    }else{
      if(!robots.includes('index,follow'))fail(route+': missing index,follow');
      if(canon!==expected||og!==expected)fail(route+': wrong canonical / og:url');
    }
  }else{
    if(!robots.includes('noindex'))fail(route+': preview missing noindex');
    if(canon||og)fail(route+': preview published canonical/og URL');
  }
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for(const match of html.matchAll(/<a\b[^>]*?\bhref="([^"]+)"/gi)){
    const href=match[1].replaceAll('&amp;','&');
    if(/^(mailto:|tel:)/i.test(href))continue;
    let url;
    try{url=new URL(href,'https://internal.invalid'+route);}catch{fail(route+': invalid href '+href);continue;}
    if(url.protocol==='javascript:'){fail(route+': javascript href');continue;}
    if(url.hostname!=='internal.invalid')continue;
    if(!url.pathname||url.pathname==='/')url.pathname='/';
    const target=normalize(url.pathname);
    if(!allRoutes.has(target)){
      const local=path.join(dist,url.pathname.replace(/^\//,''));
      if(!fs.existsSync(local))fail(route+': broken internal href '+href);
    }else{
      inbound.set(target,(inbound.get(target)||0)+1);
      if(url.hash&&target===route&&!ids.has(decodeURIComponent(url.hash.slice(1))))fail(route+': missing fragment '+href);
    }
  }
  for(const match of html.matchAll(/<(?:script|link)\b[^>]*?(?:src|href)="(\/assets\/[^"]+)"/gi)){
    if(!fs.existsSync(path.join(dist,match[1].slice(1))))fail(route+': missing asset '+match[1]);
  }
  if(!html.includes('<link rel="stylesheet" href="/assets/styles.css">'))fail(route+': missing optimized single CSS bundle');
  if(route==='/universal-converter/'&&(!html.includes('data-unit-find')||!html.includes('data-unit-results')))fail('Universal converter missing alias search');
  if(route==='/all-converters/'&&!html.includes('data-search='))fail('Converter directory missing alias search data');
  if(route==='/batch-converter/'&&(!html.includes('data-batch-column')||!html.includes('data-batch-delimiter')))fail('Batch converter missing selected-column or delimiter controls');
  if(html.includes('data-converter')&&!html.includes('data-print-converter'))fail(route+': converter missing print-table control');
  if(html.includes('data-converter')&&!html.includes('data-multi-results'))fail(route+': live converter missing same-value multi-unit table');
  if(html.includes('data-multi-results')&&!html.includes('Other unit equivalents'))fail(route+': multi-unit comparison is not labeled');
  if(seedPaths.has(route)){
    const s=seeds.find(s=>s.url===route);
    const pair=pairs.find(p=>p.slug===s.slug)||(s.slug==='seconds-to-hours'?{from:'seconds',to:'hours'}:null);
    if(!pair){fail(route+': no conversion pair');continue;}
    const expected=formatNumber(convert(s.value,pair.from,pair.to),9);
    const expectedAnswer=s.valueText+' '+units[pair.from].symbol+' = '+expected+' '+units[pair.to].symbol;
    const visible=plain(extract(html,/<main id="main">([\s\S]*?)<\/main>/i));
    if(!visible.includes(expected)||!visible.includes(s.valueText))fail(route+': prerendered numerical result missing');
    if(!html.includes('data-copy-answer')||!html.includes('data-load-value'))fail(route+': missing value interaction');
    if(!html.includes('data-precision-table')||!html.includes('Do not mistake the number of shown decimals'))fail(route+': missing useful precision reference');
    if(Object.values(units).filter(u=>u.dimension===units[pair.from].dimension).length>2 && !html.includes('Same value in other units'))fail(route+': other compatible unit equivalents missing');
    if(!html.includes('data-answer="'+expectedAnswer.replaceAll('&','&amp;')+'"'))fail(route+': copy answer mismatches computation');
    if(!title.includes(s.valueText)||!h1.includes(s.valueText))fail(route+': SEO metadata mismatches URL value');
  }
}
for(const route of canonicalRoutes)if(route!=='/'&&(inbound.get(route)||0)===0)fail('Orphan indexable page with no inbound links: '+route);
const expected=new Set(['/',...pairs.map(x=>x.url),...seeds.map(x=>x.url),
...Object.values(units).map(u=>'/category/'+u.dimension+'/'),
'/all-converters/','/universal-converter/','/batch-converter/','/methodology/','/about/','/privacy/','/terms/','/contact/','/accessibility/']);
for(const route of expected)if(!allRoutes.has(route))fail('Required page not generated: '+route);
for(const route of allRoutes)if(route!=='/404/'&&!expected.has(route))warnings.push('Unplanned extra page: '+route);
const hostHeaders=fs.readFileSync(path.join(dist,'_headers'),'utf8');
for(const hostRule of ['https://:project.pages.dev/*','https://:version.:project.pages.dev/*'])if(!hostHeaders.includes(hostRule+'\n  X-Robots-Tag: noindex'))fail('Pages mirror noindex rule missing: '+hostRule);
const sitemap=fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8');
const locs=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1].replaceAll('&amp;','&'));
if(info.mode==='production'){
  if(!info.site||new URL(info.site).hostname.endsWith('.pages.dev'))fail('Production must use a custom origin');
  if(locs.length!==canonicalRoutes.size)fail('Sitemap loc count mismatch');
  if(new Set(locs).size!==locs.length)fail('Sitemap has duplicate loc entries');
  for(const route of canonicalRoutes)if(!locs.includes(new URL(route,info.site).toString()))fail('Sitemap missing '+route);
  if(!fs.readFileSync(path.join(dist,'robots.txt'),'utf8').includes('Sitemap: '+info.site+'/sitemap.xml'))fail('Production robots sitemap mismatch');
}else{
  if(locs.length)fail('Preview sitemap must not include indexable routes');
  if(!fs.readFileSync(path.join(dist,'_headers'),'utf8').includes('X-Robots-Tag: noindex'))fail('Preview missing noindex response header');
}
// Similarity detection is a REVIEW signal. Different numerical answers may still provide utility.
// Never mechanically invent prose merely to lower similarity.
const numericBodies=seeds.map(s=>{
  const text=plain(extract(pages.get(s.url)||'',/<main id="main">([\s\S]*?)<\/main>/i))
    .toLowerCase().replace(/[-+]?(?:\d[\d,.]*)(?:e[-+]?\d+)?/g,'#').replace(/\s+/g,' ');
  return {slug:s.slug,url:s.url,tokens:new Set(text.match(/[a-z°/]+/g)||[])};
});
const clusters=new Map(seeds.map(s=>s.slug).filter((slug,i,arr)=>arr.indexOf(slug)===i).map(slug=>[slug,{slug,numberPages:seeds.filter(s=>s.slug===slug).length,comparedPairs:0,highSimilarityPairs:0}]));
let highSimilarity=0,comparable=0,pilotHighSimilarity=0,pilotComparable=0;
for(let i=0;i<numericBodies.length;i++)for(let j=i+1;j<numericBodies.length;j++){
  const a=numericBodies[i],b=numericBodies[j];
  if(a.slug!==b.slug)continue;
  comparable++;
  const bothPilot=canonicalRoutes.has(a.url)&&canonicalRoutes.has(b.url);
  if(bothPilot)pilotComparable++;
  clusters.get(a.slug).comparedPairs++;
  const common=[...a.tokens].filter(x=>b.tokens.has(x)).length;
  const score=common/(a.tokens.size+b.tokens.size-common||1);
  if(score>=0.95){highSimilarity++;if(bothPilot)pilotHighSimilarity++;clusters.get(a.slug).highSimilarityPairs++;}
}
if(highSimilarity)warnings.push('Content review across all 92 numeric pages: '+highSimilarity+'/'+comparable+' same-direction page pairs are >=0.95 similar.');
if(pilotHighSimilarity)warnings.push('Production indexable numeric pilot review: '+pilotHighSimilarity+'/'+pilotComparable+' comparable page pairs are >=0.95 similar; this is not a quality approval.');
const report={mode:info.mode,site:info.site,htmlPages:pages.size,indexableExpected:canonicalRoutes.size,linksChecked:true,seedResultsChecked:seeds.length,highSimilarityPairs:highSimilarity,similarityPairsCompared:comparable,pilotHighSimilarityPairs:pilotHighSimilarity,pilotSimilarityPairsCompared:pilotComparable,similarityClusters:[...clusters.values()].sort((a,b)=>b.highSimilarityPairs-a.highSimilarityPairs),numericIndexMode:info.numericIndexMode,indexableNumericPages:seeds.length-unindexableNumeric.size,selectedNumericDirections:[...byDirection.keys()].sort(),numericSameDirectionIndexCollisions:[...byDirection].filter(([,count])=>count>1).map(([slug,count])=>({slug,count})),excludedNumericPages:[...unindexableNumeric],failures,warnings,checkedAt:new Date().toISOString()};
fs.writeFileSync(path.join(dist,'release-audit-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(failures.length)process.exitCode=1;