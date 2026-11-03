/**
 * Deterministic editorial QA of all 38 built direction pages, not a Google score.
 * Stores a private report outside dist/ after the public/private asset boundary.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {engineeringReference,conventionComparison} from '../src/seo-guides.mjs';
import {directionMetaDescription,directionSeoTitle} from '../src/seo-meta.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const pairs=JSON.parse(fs.readFileSync(path.join(root,'src/data/pairs.json'),'utf8'));
const seeds=JSON.parse(fs.readFileSync(path.join(root,'src/data/seeds.json'),'utf8'));
const policy=JSON.parse(fs.readFileSync(path.join(root,'src/data/numeric-seo-policy.json'),'utf8'));
const build=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8'));
const openNumeric=new Set(build.mode==='production'
 ? build.numericPublishedUrls||[]
 : build.numericIndexMode==='all'?seeds.map(s=>s.url):policy.pilotIndexUrls);
const results=[],errors=[],titles=new Set(),descriptions=new Set(),referenceHeadings=new Set();
const unescape=x=>String(x).replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const page=url=>fs.readFileSync(path.join(dist,url.replace(/^\//,''),'index.html'),'utf8');
if(pairs.length!==38||seeds.length!==92||policy.pilotIndexUrls.length!==15||
   seeds.length-policy.pilotIndexUrls.length!==77)errors.push('SEO route/pilot inventory changed');
for(const pair of pairs){
 const html=page(pair.url),from=units[pair.from],to=units[pair.to],issue=[];
 const title=unescape(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]||'');
 const h1=unescape((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'').replace(/<[^>]*>/g,''));
 const description=unescape(html.match(/<meta name="description" content="([^"]*)"/i)?.[1]||'');
 if(title!==directionSeoTitle(pair)+' | ConvertUnits.cc')issue.push('title differs from the source-curated direction and unit symbols');
 if(h1!==pair.title)issue.push('H1 is not the exact descriptive direction title');
 if(description!==directionMetaDescription(pair))issue.push('meta description is stale or not source-calculated');
 if(titles.has(title))issue.push('duplicate title');titles.add(title);
 if(descriptions.has(description))issue.push('duplicate description');descriptions.add(description);
 if(!html.includes('class="pair-key-fact"'))issue.push('missing first-screen answer');
 const conversion=convert(1,pair.from,pair.to),shown=formatNumber(conversion,9);
 if(!html.includes('1 '+from.symbol+' '+displayRelation(conversion,shown)+' '+shown+' '+to.symbol))
  issue.push('source-derived one-unit answer missing');
 if(!html.includes('data-converter')||!html.includes('data-value')||
    !html.includes('data-output-number')||!html.includes('data-load-value'))
  issue.push('working tool or usable reference table missing');
 if(!html.includes('class="card conversion-guide"'))issue.push('calculation verification guidance missing');
 if(!html.includes('/methodology/'))issue.push('conversion source/method link missing');
 const specificTitle='<h2>Specific '+from.symbol+' values</h2>';
 const specific=html.includes(specificTitle);
 const linkedNumeric=seeds.filter(seed=>seed.slug===pair.slug&&openNumeric.has(seed.url));
 if(specific!==(linkedNumeric.length>0))issue.push('Empty or hidden incorrectly: specific numeric results section');
 if(specific){
  for(const seed of linkedNumeric)
   if(!html.includes('href="'+seed.url+'"'))
    issue.push('Missing eligible numeric link '+seed.url);
 }
 const desiredConvention=conventionComparison(pair);
 const hasConvention=html.includes('data-standards-comparison');
 if(desiredConvention){
  if(!html.includes(desiredConvention))issue.push('Missing or incorrect source-specific standard comparison');
 }else if(hasConvention)issue.push('Irrelevant measurement standard comparison leaked onto this direction');
 const powerCompare=html.includes('data-horsepower-conventions');
 if(pair.slug==='kw-to-hp'){
  if(!powerCompare||!html.includes('mechanical horsepower (hp(I)) only')||
   !html.includes('Electric horsepower, hp(E)')||
   !html.includes('Metric horsepower, hp(M)')||
   !html.includes('Boiler horsepower, hp(S)'))
   issue.push('Power page lacks source-supported hp definitions and mechanical-only scope');
 }else if(powerCompare)issue.push('Horsepower conventions leaked onto unrelated conversion');
 const reverse=pairs.find(p=>p.from===pair.to&&p.to===pair.from);
 if(reverse&&!html.includes('href="'+reverse.url+'"'))issue.push('reverse direction is not a crawlable link');
 const dimension=from.dimension,reference=engineeringReference(pair);
 const relevant=['length','speed','torque'].includes(dimension);
 let heading='';
 if(relevant){
  if(!reference||!html.includes(reference)||!reference.includes('data-engineering-source="'+pair.from+'"'))
   issue.push('engineering table does not align with input direction');
  heading=reference.match(/<h2>(.*?)<\/h2>/)?.[1]||'';
  referenceHeadings.add(heading);
 }else if(html.includes('data-engineering-reference=')){
  issue.push('irrelevant dimension got engineering table');
 }
 if(['m-to-ft','ft-to-m'].includes(pair.slug)&&
    html.includes('Fractional inches to metric lengths'))issue.push('misleading fractional-inch reference on feet/meter direction');
 if(pair.slug==='nm-to-ft-lbf'&&html.includes('100 foot-pound-force in other torque units'))
  issue.push('torque reverse page uses wrong reference source');
 if(pair.slug==='kmh-to-mph'&&html.includes('60 mph across four speed units'))
  issue.push('road speed reference uses opposite direction');
 const row={url:pair.url,title,dimension,visibleNumericLinks:linkedNumeric.length,hasConventionComparison:hasConvention,powerConventionReference:powerCompare,referenceHeading:heading||null,primaryAnswerValid:!issue.includes('source-derived one-unit answer missing'),reverseUrl:reverse?.url??null,issues:issue};
 results.push(row);
 for(const finding of issue)errors.push(pair.url+': '+finding);
}
// Keep homepage direct navigation aligned with the verified V32 keyword
// evidence without pretending numeric long-tail volume is generic demand.
const home=page('/');
const featuredBlock=home.split('<div class="grid popular-grid">')[1]?.split('</section><section class="section">')[0]||'';
const featuredUrls=[...featuredBlock.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(x=>x[1]);
const expectedFeatured=['kg-to-lbs','lbs-to-kg','ft-lbf-to-nm','celsius-to-fahrenheit','minutes-to-hours','ml-to-us-fl-oz']
 .map(slug=>pairs.find(p=>p.slug===slug)?.url);
if(expectedFeatured.some(x=>!x)||JSON.stringify(featuredUrls)!==JSON.stringify(expectedFeatured))
 errors.push('Homepage featured tool cards must align with the six selected existing routes, once each, without new URLs');

const engineeringCount=results.filter(x=>x.referenceHeading).length;
if(engineeringCount!==9)errors.push('Expected precisely nine length/speed/torque reference tables; got '+engineeringCount);
if(referenceHeadings.size!==8)errors.push('Expected eight distinct relevant reference headings, with only the two inch-source directions intentionally sharing one: '+referenceHeadings.size);
const report={
 status:errors.length?'failed':'passed',
 scope:'38 genuine directional pages; preview source HTML; not real Google rankings or GSC',
 checked:results.length,uniqueTitles:titles.size,uniqueDescriptions:descriptions.size,
 engineeringPages:engineeringCount,distinctEngineeringHeadings:referenceHeadings.size,horsepowerStandardPages:results.filter(r=>r.powerConventionReference).length,standardConventionPages:results.filter(r=>r.hasConventionComparison).length,visibleNumericResultSections:results.filter(r=>r.visibleNumericLinks>0).length,
 unchangedNumericInventory:{all:seeds.length,conditionalIndex:policy.pilotIndexUrls.length,noindex:seeds.length-policy.pilotIndexUrls.length},
 failures:errors,results
};
const qa=path.join(root,'qa-reports');
fs.mkdirSync(qa,{recursive:true});
fs.writeFileSync(path.join(qa,'core-page-quality-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log('CORE PAGE QUALITY AUDIT:',report.status,'pages',report.checked,'unique titles',report.uniqueTitles,
 'unique descriptions',report.uniqueDescriptions,'engineering source tables',report.engineeringPages,
 'unique engineering reference headings',report.distinctEngineeringHeadings,'errors',errors.length);
if(errors.length){console.error(errors.slice(0,20).join('\n'));process.exitCode=1;}
