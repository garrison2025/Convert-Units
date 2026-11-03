/**
 * Final pre-domain SEO/editorial evidence gate. No indexing, DNS, GSC, ads,
 * invented generic keyword metrics or network operations.
 * All output stays outside the public dist/ tree.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {numericInsight,numericInsightUrls} from '../src/numeric-insight.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const load=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const pairs=load('src/data/pairs.json'),seeds=load('src/data/seeds.json');
const policy=load('src/data/numeric-seo-policy.json');
const decisions=load('research/NUMERIC-PRELAUNCH-DECISIONS-V36-20261103.json');
const build=load('dist/build-info.json');
const errors=[];
const bySeed=new Map(seeds.map(s=>[s.url,s])),byPair=new Map(pairs.map(p=>[p.slug,p]));
const candidate=new Set(policy.pilotIndexUrls),approved=build.numericPublishedUrls||[];
const page=url=>fs.readFileSync(path.join(root,'dist',url.replace(/^\//,''),'index.html'),'utf8');
function parseLine(line){
 const cells=[];let value='',inside=false;
 for(let i=0;i<line.length;i++){
  const ch=line[i];
  if(ch==='"'){
   if(inside&&line[i+1]==='"'){value+='"';i++;}else inside=!inside;
  }else if(ch===','&&!inside){cells.push(value);value='';}
  else value+=ch;
 }
 if(inside)throw Error('Unclosed quoted CSV field');
 cells.push(value);return cells;
}
const matrixLines=fs.readFileSync(path.join(root,'research/SEO-38-DIRECTION-RESEARCH-MATRIX-V32-20261103.csv'),'utf8').trim().split(/\r?\n/);
const columns=parseLine(matrixLines[0]);
const matrix=matrixLines.slice(1).map(line=>Object.fromEntries(parseLine(line).map((v,i)=>[columns[i],v])));
const matrixBySlug=new Map(matrix.map(x=>[x.canonical_direction,x]));
if(pairs.length!==38||seeds.length!==92||candidate.size!==15||numericInsightUrls.length!==15||
 matrix.length!==38||matrixBySlug.size!==38)
 errors.push('Source keyword, tool, candidate or audit cardinality changed');
if(decisions.candidateNumericUrls!==15||decisions.deliberatelyNoindexNumericUrls!==77||
 decisions.currentlyApprovedPublicNumericUrls!==0||decisions.reviewedCandidateDecisions.length!==15)
 errors.push('Pre-domain editorial decisions out of sync with fixed release boundary');
const rows=[];
for(const p of pairs){
 const x=matrixBySlug.get(p.slug);
 if(!x||x.existing_tool_url!==p.url)errors.push('Missing real source-backed 38-tool row: '+p.slug);
 else{
  const matching=seeds.filter(s=>s.slug===p.slug);
  const strict=Number(x.strict_source_rows)||0;
  if(Number(x.existing_92_seed_page_count)!==matching.length)
   errors.push(p.slug+': raw Semrush seed page count does not match V32 audited matrix');
  if(strict===0&&(x.best_keyword_us_volume||x.best_keyword_kd||x.best_keyword_estimated_competitor_visits))
   errors.push(p.slug+': fabricated strictly vetted keyword metrics on unsupported direction');
  if(strict>0&&(!x.best_strict_keyword_by_competitor_est_traffic||!x.best_keyword_us_volume||!x.best_keyword_kd))
   errors.push(p.slug+': missing actual historical strict keyword evidence');
 }
}
if(matrix.filter(x=>Number(x.strict_source_rows)>0).length!==15)
 errors.push('Expected exactly 15 directions with strictly audited numeric ranking evidence');
const reviewed=new Set(),report=[];
for(const item of decisions.reviewedCandidateDecisions){
 const s=bySeed.get(item.url);
 const p=s&&byPair.get(s.slug);
 if(!s||!p||reviewed.has(item.url)||!candidate.has(item.url)||
    item.parentUrl!==p.url||item.sourceKeyword!==s.keyword)
  errors.push(item.url+': candidate editorial decision not anchored in source seed/parent');
 reviewed.add(item.url);
 if(item.historicalCompetitorUSVolume!==s.volumeUS||
    item.historicalCompetitorKD!==s.kd||
    item.historicalCompetitorEstimatedVisits!==s.trafficEstimate)
  errors.push(item.url+': incorrectly copied historical competitor keyword metrics');
 if(item.uniqueCompetitiveValueVerified!==false||
    item.independentGoogleUSRankVerified!==false||
    item.productionIndexApproved!==false)
  errors.push(item.url+': unverified SEO claims or premature public approval');
 if(!['PREFER_PARENT_HOLD_NUMERIC_INDEX','HOLD_UNIQUE_COMPETITIVE_VALUE_NOT_PROVEN'].includes(item.editorialDisposition))
  errors.push(item.url+': unrecognized editorial hold classification');
 const h=page(item.url),expected=numericInsight(s,p);
 if(!expected||!h.includes(expected))
  errors.push(item.url+': individualized, value-computed cross-check missing');
 if(build.mode==='preview'&& !/<meta name="robots" content="noindex,follow">/.test(h))
  errors.push(item.url+': preview unexpectedly indexable');
 report.push({url:item.url,sourceQuery:item.sourceKeyword,ownerMetricsVerified:false,
  competitorVolume:item.historicalCompetitorUSVolume,competitorKD:item.historicalCompetitorKD,
  competitorEstimatedVisits:item.historicalCompetitorEstimatedVisits,
  competitorSourceType:item.competitorEvidenceType,
  editorialDecision:item.editorialDisposition,independentUniqueValueVerified:false,
  actuallyPublishedAsIndexable:approved.includes(item.url)});
}
for(const s of seeds){
 if(candidate.has(s.url))continue;
 const h=page(s.url);
 if(h.includes('data-numeric-intent-check'))errors.push(s.url+': unreviewed held numeric page received a curated insight card');
 if(build.mode==='preview'&&!h.includes('noindex,follow'))errors.push(s.url+': preview held numeric page is indexable');
}
if(reviewed.size!==15||report.filter(x=>x.editorialDecision==='PREFER_PARENT_HOLD_NUMERIC_INDEX').length!==6)
 errors.push('Expected six explicit prefer-parent holds and nine unique-value holds across 15 candidates');
const result={status:errors.length?'failed':'passed',scope:'pre-domain verified source and rendered static HTML, not current Google SERPs or traffic',
  buildCommit:build.buildCommit||null,buildMode:build.mode,configuredPublicationApproved:build.publicationApproved,
  totalRoutes:157,coreTools:38,numericPages:92,candidateNumericPages:15,numericHeldAtInitialLaunch:77,
  distinctCoreKeywordMetricsVerified:0,strictNumericSourceDirections:15,notStrictlyNumericSupportedDirections:23,
  editorialPreferParentHolds:6,editorialDistinctiveValueUnprovenHolds:9,
  activePreviewIndexablePages:build.mode==='preview'?build.indexablePages:null,
  warning:'The source file is historic competitor Semrush data; it is not generic-keyword volume, verified Google rank, GSC traffic, or proof that any numeric page deserves indexing.',
  errors,rows:report};
const out=path.join(root,'qa-reports');
fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'seo-prelaunch-editorial-v36.json'),JSON.stringify(result,null,2)+'\n');
const escape=x=>'"'+String(x??'').replaceAll('"','""')+'"';
fs.writeFileSync(path.join(out,'seo-prelaunch-editorial-v36.csv'),[
 ['URL','Historic competitor keyword','Historic US volume','Historic KD','Historic estimated competitor visits','Competitor type','Editorial decision','Actually indexable'].map(escape).join(','),
 ...report.map(x=>[x.url,x.sourceQuery,x.competitorVolume,x.competitorKD,x.competitorEstimatedVisits,x.competitorSourceType,x.editorialDecision,x.actuallyPublishedAsIndexable?'YES':'NO'].map(escape).join(','))
].join('\n')+'\n');
console.log('SEO PRELAUNCH V36:',JSON.stringify({status:result.status,coreTools:38,keywordsStrict:15,keywordsWithoutStrict:23,candidates:15,preferParent:6,otherHolds:9,errors:errors.length}));
if(errors.length){console.error(errors.slice(0,20).join('\n'));process.exitCode=1;}
