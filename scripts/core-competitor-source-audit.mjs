/**
 * Build-time offline audit: source evidence is saved from actual public webpage
 * observations and must not be confused with Google ranking/keyword estimates.
 * Source websites are not fetched during CI; no paid API or runtime dependency.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {convert,units,formatNumber} from '../src/assets/engine.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const pairs=load('src/data/pairs.json'),previous=load('research/CORE-8-COMPETITOR-INTENT-V28-20261103.json');
const fresh=load('research/CORE-30-COMPETITOR-INTENT-V29-20261103.json');
const build=load('dist/build-info.json'),seeds=load('src/data/seeds.json'),pilot=load('src/data/numeric-seo-policy.json');
const old=new Set(previous.items.map(x=>x.slug)),news=new Map(fresh.items.map(x=>[x.slug,x])),issues=[],checks=[];
const current=path=>fs.readFileSync(root+'/dist'+path+'index.html','utf8');
if(pairs.length!==38||seeds.length!==92||pilot.pilotIndexUrls.length!==15)
 issues.push('Source inventory changed');
if(previous.items.length!==8||old.size!==8||fresh.items.length!==30||news.size!==30)
 issues.push('Expected eight previously reviewed pages plus 30 new distinct tool comparators.');
for(const p of pairs){
 const prev=old.has(p.slug),review=prev?previous.items.find(x=>x.slug===p.slug):news.get(p.slug);
 if(!review){issues.push('Unreviewed core conversion '+p.slug);continue;}
 const html=current(p.url),problems=[];
 if(!prev){
  if(review.url!==p.url||review.from!==p.from||review.to!==p.to)
   problems.push('Comparison does not match actual source direction');
  if(!/^https:\/\//.test(review.comparisonSource||''))
   problems.push('Missing verifiable public comparator URL');
  if(!review.observedFunction||review.observedFunction.length<45||!review.siteGap||review.siteGap.length<45)
   problems.push('Observed rival functions or evidence limitations missing');
  for(const field of ['verifiedKeywordUSVolume','verifiedKeywordKD','verifiedGoogleUSPosition','exactUnitGscClicks'])
   if(review[field]!==null)problems.push('Unsupported SEO value must remain explicit null: '+field);
  if(!['KEEP_EXISTING_TOOL','FIX_STANDARD_DISAMBIGUATION'].includes(review.decision))
   problems.push('Unknown editorial decision');
 }
 const raw=convert(1,p.from,p.to),answer=formatNumber(raw,9);
 if(!html.includes('data-converter')||!html.includes('data-output-number'))
  problems.push('Existing live calculator missing from actual built page');
 if(!html.includes('1 '+units[p.from].symbol+' ')||!html.includes(answer+' '+units[p.to].symbol))
  problems.push('Computed source-direction answer absent');
 const shouldStandards=['us-cup-to-ml','us-tbsp-to-us-tsp','gb-to-mb'].includes(p.slug);
 if(html.includes('data-standards-comparison')!==shouldStandards)
  problems.push('Standards comparison missing or wrongly injected');
 if(shouldStandards&&!html.includes('data-standards-comparison="'+p.slug+'"'))
  problems.push('Standard comparison mixed with unrelated direction');
 if(build.mode==='preview'&&!html.includes('noindex,follow'))
  problems.push('Cloudflare preview indexing guard failed');
 checks.push({slug:p.slug,url:p.url,reviewVersion:prev?'V28':'V29',comparatorUrl:prev?review.source:review.comparisonSource,exactOneUnitAnswer:answer,
  editorialDecision:prev?review.decision:review.decision,sourceEvidenceType:prev?'public competitor product/reference webpage':review.sourceEvidenceLevel,
  searchMarketVolumeVerified:false,sourceFeatureGapKnown:!prev&&shouldStandards,problems});
 for(const x of problems)issues.push(p.slug+': '+x);
}
const split={previousReview:checks.filter(x=>x.reviewVersion==='V28').length,newReview:checks.filter(x=>x.reviewVersion==='V29').length};
if(split.previousReview!==8||split.newReview!==30||checks.length!==38)
 issues.push('All 38 actual routes must be checked exactly once against direct comparator sources');
const report={
 checkedAt:new Date().toISOString(),status:issues.length?'failed':'passed',
 scope:'38 core directional HTML routes and 38 external comparator source records; sources read from previously saved public research, NOT a live US Google SERP query.',
 warnings:['No independently verified current US keyword Volume, KD, rank, traffic, or ExactUnit GSC clicks for any of these 38 generic phrases.','Most competitor pages already have functional calculators and reference tables. Three standard-definition ambiguities received concrete source-backed static HTML fixes.'],
 previousCount:split.previousReview,newCount:split.newReview,
 qualityIssues:issues,sourceSpecificFixes:['us-cup-to-ml','us-tbsp-to-us-tsp','gb-to-mb'],checks};
fs.mkdirSync(path.join(root,'qa-reports'),{recursive:true});
fs.writeFileSync(path.join(root,'qa-reports/core-38-competitor-coverage-v29.json'),JSON.stringify(report,null,2)+'\n');
console.log('CORE 38 COMPETITOR COVERAGE:',JSON.stringify({status:report.status,previous:split.previousReview,new:split.newReview,all:checks.length,sourceSpecificFixes:report.sourceSpecificFixes.length,issues:issues.length}));
if(issues.length){console.error(issues.slice(0,20).join('\n'));process.exitCode=1;}
