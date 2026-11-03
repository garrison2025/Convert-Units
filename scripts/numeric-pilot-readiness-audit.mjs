/**
 * Read-only evidence/release-readiness review for the fixed 15 numeric candidates.
 * It audits rendered HTML and local research evidence, NEVER asserts Google rankings.
 * Output belongs in private qa-reports; never in public dist/.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {numericTitle,numericHeading,numericDescription} from '../src/seo-meta.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const fromJson=relative=>JSON.parse(fs.readFileSync(path.join(root,relative),'utf8'));
const pairs=fromJson('src/data/pairs.json');
const seeds=fromJson('src/data/seeds.json');
const policy=fromJson('src/data/numeric-seo-policy.json');
const evidence=fromJson('research/SEO-15-SERP-EVIDENCE-20261102.json');
const directReviews=fromJson('research/NUMERIC-GENERIC-COMPETITOR-SIDEBYSIDE-V25-20261103.json');
const build=fromJson('dist/build-info.json');
const selected=new Set(policy.pilotIndexUrls),published=new Set(build.numericPublishedUrls||[]);
const errors=[];
const decode=s=>String(s??'').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'");
const html=url=>fs.readFileSync(path.join(root,'dist',url.replace(/^\/+/,''),'index.html'),'utf8');
const getTitle=x=>decode(x.match(/<title>([\s\S]*?)<\/title>/i)?.[1]);
const getH1=x=>decode(x.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]*>/g,''));
const getMeta=x=>decode(x.match(/<meta name="description" content="([^"]*)"/i)?.[1]);
const getRobots=x=>x.match(/<meta name="robots" content="([^"]*)"/i)?.[1]||'';
const tokens=x=>x
 .replace(/<(script|style|nav|header|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,' ')
 .replace(/<[^>]*>/g,' ')
 .replace(/&(?:amp|quot|nbsp|gt|lt|#39);/gi,' ')
 .replace(/\b[-+]?\d+(?:[.,]\d+)?\b/g,'#')
 .toLowerCase().replace(/[^a-z#]+/g,' ').split(/\s+/).filter(Boolean);
const trigramSet=x=>{
 const words=tokens(x);
 return new Set(words.slice(0,-2).map((w,i)=>w+' '+words[i+1]+' '+words[i+2]));
};
function similarity(a,b){
 const A=trigramSet(a),B=trigramSet(b);
 if(!A.size||!B.size)return 0;
 let intersection=0;for(const x of A)if(B.has(x))intersection++;
 return Math.round(1000*intersection/(A.size+B.size-intersection))/1000;
}
const reviewByUrl=new Map((evidence.items||[]).map(x=>[x.url,x]));
const genericByUrl=new Map(directReviews.entries.map(x=>[x.url,x]));
if(genericByUrl.size!==2||directReviews.entries.length!==2)errors.push('Expected two verified generic competitor examples.');
const byPair=new Map(pairs.map(p=>[p.slug,p]));
if(pairs.length!==38||seeds.length!==92||selected.size!==15||
   seeds.length-selected.size!==77||evidence.items?.length!==15)
 errors.push('Published inventory or evidence count unexpectedly changed.');
const rows=[];
for(const url of policy.pilotIndexUrls){
 const seed=seeds.find(s=>s.url===url),ev=reviewByUrl.get(url);
 if(!seed||!ev){errors.push('Missing numeric candidate or source-backed research '+url);continue;}
 const pair=byPair.get(seed.slug);
 if(!pair){errors.push('Unmapped direction for '+url);continue;}
 const numericHtml=html(url),parentHtml=html(pair.url),value=convert(seed.value,pair.from,pair.to);
 const rounded=formatNumber(value,9);
 const expression=seed.valueText+' '+units[pair.from].symbol+' '+displayRelation(value,rounded)+' '+rounded+' '+units[pair.to].symbol;
 const checks={
  titleMatchesAnswer:getTitle(numericHtml)===numericTitle(seed,pair)+' | ExactUnit',
  headingMatchesQuery:getH1(numericHtml)===numericHeading(seed,pair),
  snippetMatchesCalculation:getMeta(numericHtml)===numericDescription(seed,pair),
  originalValueAndAnswerVisible:numericHtml.includes('class="direct-answer"')&&numericHtml.includes(expression),
  formulaStepsPresent:numericHtml.includes('<h2>Calculation steps</h2>')&&numericHtml.includes('class="calc-steps"'),
  interactiveCalculatorPresent:numericHtml.includes('data-converter')&&numericHtml.includes('data-value')&&numericHtml.includes('data-output'),
  valueSpecificNearbyTable:numericHtml.includes('<h2>Nearby values</h2>')&&numericHtml.includes('data-load-value="'+seed.valueText+'"'),
  alternateUnitEquivalents:numericHtml.includes('<h2>Same value in other units</h2>'),
  roundingTransparency:numericHtml.includes('data-precision-table'),
  contextualParentLink:numericHtml.includes('href="'+pair.url+'"'),
  selectedNumericLinkedFromParent:parentHtml.includes('href="'+url+'"')===(build.mode==='preview'||published.has(url)),
  previewNeverIndexable:build.mode!=='preview'||getRobots(numericHtml).includes('noindex'),
  approvedProductionCandidate:build.mode!=='production'||(published.has(url)?getRobots(numericHtml).includes('index,follow'):getRobots(numericHtml).includes('noindex')),
  competitorEvidenceMapped:ev.query===seed.keyword&&ev.competitorUrl.startsWith('https://'),
  competitorDataExplicitlyUnverified:ev.rankingProven===false&&ev.independentSearchDemandProven===false&&ev.siteVsCompetitorUniqueValueProven===false
 };
 for(const [key,ok] of Object.entries(checks))if(!ok)errors.push(url+': '+key);
 const comparison=genericByUrl.get(url)||null;
 if(ev.observedPageType!=='exact-value-page'){
  if(!comparison||comparison.competitorUrl!==ev.competitorUrl||
    comparison.query!==seed.keyword||comparison.uniqueValueVerified!==false||
    comparison.independentDemandVerified!==false||comparison.independentCompetitorRankingVerified!==false)
   errors.push(url+': missing verified generic competitor feature comparison');
  if(pair.slug==='ft-lbf-to-nm'&&
     (!numericHtml.includes('data-torque-summary')||!numericHtml.includes('data-copy-torque')))
   errors.push(url+': side-by-side torque features are absent in actual rendered HTML');
  if(pair.slug==='kpa-to-psi'&&
     (!numericHtml.includes('data-pressure-summary')||!numericHtml.includes('data-copy-pressure')))
   errors.push(url+': side-by-side pressure features are absent in actual rendered HTML');
 }
 const risks=[];
 if(ev.observedPageType!=='exact-value-page')risks.push('competitor observation is a general tool/example, not an exact-value page');
 if(!ev.independentSearchDemandProven)risks.push('independent US Google organic demand unverified');
 if(!ev.siteVsCompetitorUniqueValueProven)risks.push('incremental utility versus actual competitors unverified');
 if(!ev.rankingProven)risks.push('organic ranking/position not independently verified');
 rows.push({
  url,query:seed.keyword,parent:pair.url,dimension:units[pair.from].dimension,
  historicalCompetitor:{source:'user-supplied Semrush export (not ExactUnit GSC)',volumeUS:seed.volumeUS,kd:seed.kd,rank:seed.rank,estimatedTraffic:seed.trafficEstimate,landingPath:seed.competitorURL},
  observedCompetitor:{url:ev.competitorUrl,pageType:ev.observedPageType,visibleFunction:ev.observedFunction,reviewedOn:evidence.reviewedOn},
  verifiedHeadToHead:comparison?{rivalCapabilities:comparison.observedCompetitorCapabilities,siteCapabilities:comparison.siteCurrentCapabilities,conclusion:comparison.comparison,indexRecommendation:comparison.launchIndexDisposition}:null,
  checks,sourceContentSimilarityToParent:similarity(numericHtml,parentHtml),
  keyEvidenceGaps:risks,
  editorialRecommendation:ev.observedPageType==='exact-value-page'?
   'HOLD_FOR_COMPARATIVE_DIFFERENTIATION_EVIDENCE':'PREFER_EXISTING_DIRECTION_TOOL_UNTIL_NUMERIC_INTENT_VERIFIED',
  currentReleasePolicy:'candidate after explicit official-domain approval only; preview always noindex'
 });
}
if(rows.length!==15||new Set(rows.map(r=>r.parent)).size!==15)
 errors.push('Expected one and only one evidence-backed pilot per direction.');
const cohort=[];
for(let i=0;i<rows.length;i++){
 for(let j=i+1;j<rows.length;j++){
  const A=rows[i],B=rows[j];
  if(A.dimension!==B.dimension)continue;
  const ratio=similarity(html(A.url),html(B.url));
  if(ratio>=0.65)cohort.push({a:A.url,b:B.url,sharedDimension:A.dimension,trigramJaccard:ratio});
 }
}
cohort.sort((a,b)=>b.trigramJaccard-a.trigramJaccard);
const audit={
 status:errors.length?'failed':'passed',checkedAt:new Date().toISOString(),
 method:'Local HTML/keyword evidence checks, numeric source calculations and a heuristic word-trigram text overlap (NOT Google duplicate content judgement).',
 searchOutcome:'No US Google position, incremental competitive value, GSC impression or advertising revenue was verified by these project documents.',
 previewIndexability:build.mode==='preview'?'all 157 URLs remain noindex':'synthetic production: only independently approved candidates may be indexed',
 pagesChecked:rows.length,observedExactValueCompetitorPages:rows.filter(r=>r.observedCompetitor.pageType==='exact-value-page').length,
 observedGenericOnlyCompetitorPages:rows.filter(r=>r.observedCompetitor.pageType!=='exact-value-page').length,
 conditionalCandidates:selected.size,excludedNumericPages:seeds.length-selected.size,
 comparisonRequiredBeforePublicNumericIndex:rows.filter(r=>r.keyEvidenceGaps.length).length,
 similarSameDimensionPilotPairsAt065:cohort,
 errors,rows
};
const qa=path.join(root,'qa-reports');
fs.mkdirSync(qa,{recursive:true});
fs.writeFileSync(path.join(qa,'numeric-pilot-readiness-v24.json'),JSON.stringify(audit,null,2)+'\n');
const escapeCsv=x=>'"'+String(x??'').replaceAll('"','""')+'"';
const table=[['URL','Query','Competitor US volume (historic)','KD (historic)','Competitor position (historic)','Competitor estimated keyword visits (historic)','Observed public competitor page type','Rendered utility checks','Similarity to parent (trigram Jaccard)','Editorial recommendation','Independent Google ranking validated','Competitive unique value validated'],
 ...rows.map(row=>[
 row.url,row.query,row.historicalCompetitor.volumeUS,row.historicalCompetitor.kd,row.historicalCompetitor.rank,row.historicalCompetitor.estimatedTraffic,
 row.observedCompetitor.pageType,Object.values(row.checks).filter(Boolean).length+'/'+Object.keys(row.checks).length,
 row.sourceContentSimilarityToParent,row.editorialRecommendation,'No','No'
 ])].map(c=>c.map(escapeCsv).join(',')).join('\n')+'\n';
fs.writeFileSync(path.join(qa,'numeric-pilot-readiness-v24.csv'),table);
console.log('NUMERIC PILOT READINESS AUDIT:',JSON.stringify({
 status:audit.status,pagesChecked:audit.pagesChecked,
 exactValueCompetitors:audit.observedExactValueCompetitorPages,
 genericOnlyCompetitors:audit.observedGenericOnlyCompetitorPages,
 candidatesStillNeedingDifferentiationEvidence:audit.comparisonRequiredBeforePublicNumericIndex,
 strongSameDimensionTextOverlapPairs:cohort.length,
 overlappingPairs:cohort.map(x=>[x.a,x.b,x.trigramJaccard]),
 errors:errors.length
}));
if(errors.length){console.error(errors.slice(0,15).join('\n'));process.exitCode=1;}
