/**
 * Source-based, deterministic SEO editorial inventory.
 *
 * Every recorded metric belongs to the observed competitor Semrush export,
 * never this website. Numeric source keywords DO NOT prove the corresponding
 * generic converter query has a measured demand or a separate SERP intent.
 * No recommendation silently changes page indexability.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {escapeCsvCell,units} from '../src/assets/engine.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const readJson=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const pairs=readJson('src/data/pairs.json');
const seeds=readJson('src/data/seeds.json');
const policy=readJson('src/data/numeric-seo-policy.json');
const selected=new Set(policy.pilotIndexUrls);
// The 15-value pilot is historical. Report the ACTUAL current build publication policy
// rather than incorrectly classifying the 77 other values as permanently noindex.
const publication=readJson('dist/build-info.json');
const published=new Set(publication.mode==='production'?(publication.numericPublishedUrls||[]):[]);
if(publication.mode==='production' && published.size!==publication.numericIndexablePages)
 throw new Error('Published numeric URLs disagree with build-info.json.');
const currentSerpReview=readJson('research/SEO-15-SERP-EVIDENCE-20261102.json');
const serpReviews=currentSerpReview.items||[];
const out=path.join(root,'dist');
const failures=[];
if(pairs.length!==38||seeds.length!==92)failures.push('Expected verified 38 converter and 92 numeric routes.');
if(selected.size!==15)failures.push('Editorial inventory must agree with the conservative 15-value pilot.');
if(selected.size!==policy.pilotIndexUrls.length)failures.push('Duplicate selected numeric URL in policy.');
if(serpReviews.length!==15||new Set(serpReviews.map(x=>x.url)).size!==15)
 failures.push('Public SERP competitor review must cover 15 distinct approved numeric URLs.');
for(const entry of serpReviews){
 const seed=seeds.find(x=>x.url===entry.url);
 if(!seed||!selected.has(entry.url)||entry.query!==seed.keyword)
  failures.push('SERP observation does not map to one approved numeric query: '+entry.url);
 if(!['exact-value-page','generic-tool-table','generic-tool-example'].includes(entry.observedPageType))
  failures.push('Unknown SERP competitor page type: '+entry.url);
 let candidate=null;try{candidate=new URL(entry.competitorUrl);}catch{}
 if(candidate?.protocol!=='https:'||!candidate?.hostname||!entry.observedFunction)
  failures.push('Missing verifiable competitor page and observed feature for '+entry.url);
 if(entry.rankingProven!==false||entry.siteVsCompetitorUniqueValueProven!==false)
  failures.push('Unaudited Google ranking/competitive advantage cannot be asserted for '+entry.url);
}
const seedUrls=new Set(seeds.map(x=>x.url));
const bySlug=new Map();
for(const s of seeds){
 if(!seedUrls.has(s.url)||!pairs.some(x=>x.slug===s.slug))failures.push('Unmapped numeric route '+s.url);
 if(!bySlug.has(s.slug))bySlug.set(s.slug,[]);
 bySlug.get(s.slug).push(s);
}
for(const url of selected)if(!seedUrls.has(url))failures.push('Unknown pilot URL: '+url);
for(const [slug,values] of bySlug){
 if(values.filter(x=>selected.has(x.url)).length>1)failures.push('More than one index candidate in direction: '+slug);
}
const keywordRows=fs.readFileSync(path.join(root,'research/semrush-us-600.tsv'),'utf8')
 .split(/\r?\n/).filter(Boolean).map((line,index)=>{
  const cells=line.split('\t');
  if(cells.length<12)failures.push('Unparseable Semrush row '+(index+1));
  return {line:index+1,keyword:(cells[0]||'').trim(),rank:Number(cells[2]),
   traffic:Number(cells[5]),volume:Number(cells[7]),kd:Number(cells[8]),sourceUrl:cells[10]||''};
 });
if(keywordRows.length<500)failures.push('Original 600-row competitor dataset unexpectedly truncated.');
const keywordSources=new Map();
for(const x of keywordRows){
 const key=x.keyword.toLowerCase();
 const candidates=keywordSources.get(key)||[];
 candidates.push(x);keywordSources.set(key,candidates);
}
const valueRows=seeds.map(s=>{
 const p=pairs.find(x=>x.slug===s.slug);
 const inPilot=selected.has(s.url);
 const sourceMatch=(keywordSources.get(s.keyword.toLowerCase())||[]).some(x=>
  x.volume===s.volumeUS&&x.kd===s.kd&&x.traffic===s.trafficEstimate);
 if(!sourceMatch)failures.push('Seed competitor evidence cannot be reconciled with original keyword/volume/KD/traffic: '+s.url);
 return {
  route:s.url,pageType:'numeric-answer',
  targetQuery:s.keyword,queryBasis:'approved Semrush competitor numeric keyword',
  originalCompetitorKeyword:s.keyword,competitorUSVolume:s.volumeUS,competitorKD:s.kd,
  competitorRank:s.rank>0?s.rank:'unverified (source rank 0)',
  competitorTrafficEstimate:s.trafficEstimate,competitorLandingPath:s.competitorURL,
  direction:s.slug,sourceUnit:units[p.from].symbol,targetUnit:units[p.to].symbol,
  siblingNumericPages:(bySlug.get(s.slug)||[]).length,
  launchIndexPolicy:published.has(s.url)?'PUBLIC_INDEX_ELIGIBLE__OWNER_APPROVED':
    publication.mode!=='production'?'PREVIEW_NOINDEX':'NOT_PUBLISHED_IN_THIS_BUILD',
  editorialDisposition:published.has(s.url)?'PUBLIC_INDEX_ELIGIBLE__INTENT_UNVERIFIED':
    inPilot?'HISTORICAL_PILOT__NOT_PUBLISHED':'NOT_PUBLISHED',
  editorialReason:published.has(s.url)?
    'Owner-approved numeric release; independent search intent and Google canonical selection are not proven':
    'This build does not publish the numeric URL; historical pilot selection is not a live indexing directive',
  sourceReconciliation:sourceMatch?'exact competitor keyword+volume+KD+traffic':'NOT_RECONCILED',
  searchIntentVerified:false
 };
});
const pairRows=pairs.map(p=>{
 const values=bySlug.get(p.slug)||[];
 const top=[...values].sort((a,b)=>b.trafficEstimate-a.trafficEstimate||a.kd-b.kd)[0]||null;
 return {
  route:p.url,pageType:'direction-converter',targetQuery:p.title+' converter',
  queryBasis:'descriptive tool title; generic query metrics NOT verified',
  originalCompetitorKeyword:top?.keyword||'',competitorUSVolume:'',
  competitorKD:'',competitorRank:'',competitorTrafficEstimate:'',
  competitorLandingPath:top?.competitorURL||'',
  direction:p.slug,sourceUnit:units[p.from].symbol,targetUnit:units[p.to].symbol,
  siblingNumericPages:values.length,
  launchIndexPolicy:'indexable only after explicit official-domain approval',
  editorialDisposition:values.length?'GENERIC_DEMAND_UNVERIFIED__NUMERIC_EVIDENCE_EXISTS':'GENERIC_DEMAND_UNVERIFIED__NO_APPROVED_NUMERIC_EVIDENCE',
  editorialReason:values.length?
   'Numeric-intent queries exist in competitor evidence but do not establish measured demand for this generic converter title':
   'No source-backed approved numeric query in this directional cluster; no claim of zero search demand',
  sourceReconciliation:values.length?'mapped via approved numeric seed direction':'no approved numeric seed for this direction',
  searchIntentVerified:false
 };
});
const inventory=[...pairRows,...valueRows];
if(inventory.length!==130)failures.push('SEO route inventory must include exactly 130 converter+numeric entries.');
const fields=['route','pageType','targetQuery','queryBasis','originalCompetitorKeyword','competitorUSVolume',
 'competitorKD','competitorRank','competitorTrafficEstimate','competitorLandingPath','direction',
 'sourceUnit','targetUnit','siblingNumericPages','launchIndexPolicy','editorialDisposition',
 'editorialReason','sourceReconciliation','searchIntentVerified'];
const writeCsv=(filename,rows,columns)=>{
 fs.writeFileSync(path.join(out,filename),[columns.join(','),
  ...rows.map(r=>columns.map(k=>escapeCsvCell(r[k]??'')).join(','))].join('\r\n')+'\r\n');
};
writeCsv('seo-editorial-review.csv',inventory,fields);
// A keyword may rank against a URL whose numeric path is not the searched
// value. Surface it for REVIEW, never reuse that landing path as proof that a
// candidate route exactly matches that query.
const sourcePathDisagreements=keywordRows.flatMap(r=>{
 const leading=r.keyword.match(/^\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))(?=[^\d.]|$)/);
 let pathname='';try{pathname=new URL(r.sourceUrl).pathname;}catch{return [];}
 const trailing=pathname.match(/\/(-?\d+(?:\.\d+)?)\/?$/);
 if(!leading||!trailing)return [];
 const searched=Number(leading[1]),landing=Number(trailing[1]);
 if(!Number.isFinite(searched)||!Number.isFinite(landing)||
    Math.abs(searched-landing)<=1e-9*Math.max(1,Math.abs(searched)))return [];
 return {sourceRow:r.line,keyword:r.keyword,queryLeadingNumber:searched,
  competitorLandingValue:landing,competitorLandingURL:r.sourceUrl,
  note:'Observed mismatch only; not proof of incorrect Semrush data or search intent. Do not generate numeric URL from this mapping.'};
});
// Forbid a future seed selection from silently using one of the raw rows whose
// queried numeric value differs from the competitor's ranking landing path.
const divergentKeywordSet=new Set(sourcePathDisagreements.map(x=>x.keyword.toLowerCase()));
const taintedNumericSeeds=seeds.filter(s=>divergentKeywordSet.has(s.keyword.toLowerCase()));
if(taintedNumericSeeds.length)failures.push('Approved numeric seeds coincide with ambiguous competitor landing numbers: '+taintedNumericSeeds.map(x=>x.url).join(', '));
writeCsv('seo-source-landing-review.csv',sourcePathDisagreements,
 ['sourceRow','keyword','queryLeadingNumber','competitorLandingValue','competitorLandingURL','note']);
const totalNumericSupportedDirections=pairRows.filter(p=>p.siblingNumericPages>0).length;
const report={
 date:new Date().toISOString().slice(0,10),
 publicationMode:publication.mode,actualPublicNumericUrls:published.size,
 actualUnpublishedNumericUrls:seeds.length-published.size,
 historicalPilotCandidates:selected.size,
 source:'600-row competitor Semrush TSV and 92 previously approved numeric seeds',
 sourceRows:keywordRows.length,
 ownerTrafficClaim:'NONE; all competitor metric fields are third-party observations, not ExactUnit visits or forecasts',
 mainConverterPages:pairRows.length,numericPages:valueRows.length,
 numericPilotCandidates:selected.size,
 numericNoindex:seeds.length-published.size,
 converterDirectionsWithApprovedNumericEvidence:totalNumericSupportedDirections,
 converterDirectionsWithoutApprovedNumericEvidence:pairRows.length-totalNumericSupportedDirections,
 pilotSameDirectionPairs:0,
 numericSourceReconciled:valueRows.filter(x=>x.sourceReconciliation.startsWith('exact')).length,
 serpCompetitorReviews:serpReviews.length,
 serpExactValuePageObservations:serpReviews.filter(x=>x.observedPageType==='exact-value-page').length,
 serpGenericToolOrTableObservations:serpReviews.filter(x=>x.observedPageType!=='exact-value-page').length,
 serpUSGoogleRankVerified:false,
 rawCompetitorLandingNumberMismatches:sourcePathDisagreements.length,
 approvedSeedsOverlappingRawLandingMismatches:taintedNumericSeeds.length,
 note:'Reports CURRENT build index eligibility from build-info.json. The 15-value policy is historical fallback only. Generic query demand, Google canonical choice and search performance remain unverified. The report does not alter URLs or index directives.',
 failures
};
fs.writeFileSync(path.join(out,'seo-editorial-review.json'),JSON.stringify(report,null,2)+'\n');
console.log('SEO EDITORIAL GATE:',JSON.stringify(report));
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}
