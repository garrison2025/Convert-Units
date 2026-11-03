/**
 * Googlebot-like static-link discovery audit, independent of JavaScript.
 * Crawl depth is measured from homepage using real <a href> anchors in HTML.
 * This does not simulate or claim real Googlebot activity/indexation.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {escapeCsvCell} from '../src/assets/engine.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const build=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8'));
const seeds=JSON.parse(fs.readFileSync(path.join(root,'src/data/seeds.json'),'utf8'));
const pairs=JSON.parse(fs.readFileSync(path.join(root,'src/data/pairs.json'),'utf8'));
const policy=JSON.parse(fs.readFileSync(path.join(root,'src/data/numeric-seo-policy.json'),'utf8'));
const pilot=new Set(policy.pilotIndexUrls);
const failures=[],warnings=[];
const edges=new Map(),allRoutes=new Set();
function walk(dir){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);
  if(entry.isDirectory())walk(file);
  else if(entry.name==='index.html'){
   const rel=path.relative(dist,path.dirname(file)).replaceAll(path.sep,'/');
   const route=rel?'/'+rel+'/':'/';
   allRoutes.add(route);
   edges.set(route,[]);
   const html=fs.readFileSync(file,'utf8');
   for(const match of html.matchAll(/<a\b[^>]*?\bhref="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)){
    const raw=match[1].replaceAll('&amp;','&');
    if(raw.startsWith('#')||/^(?:mailto:|tel:)/.test(raw))continue;
    let href;try{href=new URL(raw,'https://local.test'+route);}catch{continue;}
    if(href.origin!=='https://local.test')continue;
    const target=href.pathname.endsWith('/')?href.pathname:href.pathname+'/';
    edges.get(route).push({target,label:match[2].replace(/<[^>]+>/g,'').replace(/&(?:amp|nbsp|gt|lt);/g,' ').trim()});
   }
  }
 }
}
walk(dist);
const indexableNumeric=new Set(seeds.filter(s=>build.mode==='production'?(build.numericPublishedUrls||[]).includes(s.url):build.numericIndexMode==='all'||pilot.has(s.url)).map(s=>s.url));
const indexable=new Set([...allRoutes].filter(route=>route!=='/404/'&&(route.split('/').filter(Boolean).length!==3||indexableNumeric.has(route))));
const distances=new Map([['/',0]]),queue=['/'];
for(let i=0;i<queue.length;i++){
 const route=queue[i];
 for(const {target} of edges.get(route)||[]){
  if(!allRoutes.has(target)||distances.has(target))continue;
  distances.set(target,distances.get(route)+1);
  queue.push(target);
 }
}
const prospectiveMissing=[...indexable].filter(route=>!distances.has(route));
if(prospectiveMissing.length)failures.push('Unreachable eligible static pages: '+prospectiveMissing.join(', '));
const depthEntries=[...indexable].map(route=>({route,depth:distances.get(route)??null})).sort((a,b)=>b.depth-a.depth);
const tooDeep=depthEntries.filter(({depth})=>depth!==null&&depth>3);
if(tooDeep.length)failures.push('Index-eligible pages more than 3 static-link clicks from home: '+tooDeep.map(x=>x.route+'='+x.depth).join(', '));
const pairBySlug=new Map(pairs.map(p=>[p.slug,p]));
for(const seed of seeds.filter(s=>indexableNumeric.has(s.url))){
 const pair=pairBySlug.get(seed.slug);
 if(!pair)failures.push('Missing parent for '+seed.url);
 else if(!(edges.get(pair.url)||[]).some(e=>e.target===seed.url))failures.push('Eligible numeric result lacks a crawlable parent-tool link: '+seed.url);
}
const linkedNoindex=[];
for(const route of indexable){
 for(const edge of edges.get(route)||[]){
  if(allRoutes.has(edge.target)&&!indexable.has(edge.target))linkedNoindex.push({from:route,to:edge.target});
  if(allRoutes.has(edge.target)&&!edge.label)warnings.push('Empty crawlable anchor on '+route+' linking to '+edge.target);
 }
}
if(linkedNoindex.length)warnings.push(linkedNoindex.length+' links from eligible pages to deliberately noindex routes. Investigate navigation consistency.');
const report={status:failures.length?'fail':'pass',buildMode:build.mode,
 note:'Local static HTML graph. This is not a measurement of crawling, indexing, search rank or link equity.',
 totalHtmlPages:allRoutes.size,eligibleForFutureIndex:indexable.size,
 eligibleNumericPages:indexableNumeric.size,maxStaticLinkDepth:Math.max(...depthEntries.map(x=>x.depth??0)),
 deepest:depthEntries.slice(0,12),orphanEligiblePages:prospectiveMissing,linkedNoindex:linkedNoindex.slice(0,25),
 failures,warnings:warnings.slice(0,50)};

const inventoryFields=['route','pageType','sourceKeyword','title','h1','metaDescription',
 'robots','canonical','prospectiveIndexable','depthFromHome','inboundStaticLinks','outboundStaticLinks'];
const sourceByUrl=new Map(seeds.map(seed=>[seed.url,seed]));
const incoming=new Map([...allRoutes].map(route=>[route,0]));
for(const list of edges.values())for(const link of list)if(incoming.has(link.target))incoming.set(link.target,incoming.get(link.target)+1);
const inventory=[...allRoutes].sort().map(route=>{
 const html=fs.readFileSync(path.join(dist,route.replace(/^\/+/,''),'index.html'),'utf8');
 const extract=regex=>regex.exec(html)?.[1]||'';
 const clean=x=>x.replace(/<[^>]*>/g,'').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").trim();
 const seed=sourceByUrl.get(route);
 const type=seed?'numeric':pairs.some(p=>p.url===route)?'direction':route.startsWith('/category/')?'category':route==='/404/'?'404':'site';
 return {route,pageType:type,sourceKeyword:seed?.keyword||'',
  title:clean(extract(/<title>([\s\S]*?)<\/title>/i)),
  h1:clean(extract(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)),
  metaDescription:clean(extract(/<meta name="description" content="([^"]*)"/i)),
  robots:extract(/<meta name="robots" content="([^"]*)"/i),
  canonical:extract(/<link rel="canonical" href="([^"]*)"/i),
  prospectiveIndexable:indexable.has(route)?'yes':'no',
  depthFromHome:distances.get(route)??'unreachable',
  inboundStaticLinks:incoming.get(route)??0,
  outboundStaticLinks:(edges.get(route)||[]).length
 };
});
fs.writeFileSync(path.join(dist,'seo-url-inventory.csv'),[
 inventoryFields.join(','),
 ...inventory.map(row=>inventoryFields.map(key=>escapeCsvCell(row[key])).join(','))
].join('\r\n'));

fs.writeFileSync(path.join(dist,'seo-crawl-audit.json'),JSON.stringify(report,null,2));
console.log('SEO CRAWL AUDIT:',report.status,'eligible:',report.eligibleForFutureIndex,
 'max depth:',report.maxStaticLinkDepth,'orphans:',prospectiveMissing.length,
 'indexable-to-noindex links:',linkedNoindex.length);
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
