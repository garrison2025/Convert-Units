/**
 * Read-only public Cloudflare Pages deployment probe.
 * - Runs from GitHub Actions, where normal external HTTPS may be available.
 * - Records unreachable sites as INCONCLUSIVE, not as successful deployments.
 * - Does not change DNS, hosting settings, SEO approval or third-party accounts.
 * - The expected SHA check is meaningful only on a main-branch push and may
 *   initially be stale while Cloudflare's independent build is still running.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'qa-live-preview');
const site='https://convert-units-bwa.pages.dev';
const expectedSha=/^[a-f0-9]{40}$/i.test(process.env.EXPECTED_MAIN_SHA||'')?
 process.env.EXPECTED_MAIN_SHA.toLowerCase():null;
fs.mkdirSync(out,{recursive:true});

const checks=[];
const privateReports=['/keyword-evidence-review.csv','/seo-editorial-review.csv','/quality-report.json'];
const paths=['/','/batch-converter/','/convert/lbs-to-kg/','/convert/kg-to-lbs/','/convert/kg-to-lbs/240/','/convert/seconds-to-hours/14400/','/assets/styles.css','/assets/app.mjs','/build-info.json',...privateReports];
async function probe(route){
 const url=site+route;
 try{
  const r=await fetch(url,{signal:AbortSignal.timeout(15000),redirect:privateReports.includes(route)?'manual':'follow',headers:{'User-Agent':'ExactUnit-ReadOnly-QA/1.0'}});
  const body=(await r.text()).slice(0,800000);
  const destination=new URL(r.url);
  const record={route,url:r.url,status:r.status,ok:r.ok,redirectLocation:r.headers.get('location'),bytes:Buffer.byteLength(body),contentType:r.headers.get('content-type'),xRobotsTag:r.headers.get('x-robots-tag'),body};
  if(destination.hostname!=='convert-units-bwa.pages.dev')record.error='Unexpected external redirect host; verification is invalid';
  checks.push(record);
  return record;
 }catch(e){
  const record={route,url,status:null,ok:false,error:e?.message||String(e),body:''};
  checks.push(record);
  return record;
 }
}
for(const route of paths)await probe(route);
const get=route=>checks.find(c=>c.route===route);
const home=get('/'),batch=get('/batch-converter/'),tool=get('/convert/lbs-to-kg/');
const reverseTool=get('/convert/kg-to-lbs/'),numeric=get('/convert/kg-to-lbs/240/'),exactTime=get('/convert/seconds-to-hours/14400/');
const deployment=get('/build-info.json');
const allReachable=[home,batch,tool,reverseTool,numeric,exactTime].every(c=>c.ok&&!c.error);
function protectsPreview(c){
 return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(c.body)||
  /(?:^|,)\s*noindex\b/i.test(c.xRobotsTag||'');
}
const noindexSafe=allReachable&&[home,batch,tool,reverseTool,numeric,exactTime].every(protectsPreview);
const hasV5=allReachable&&home.body.includes('data-output-number')&&
 home.body.includes('data-copy-number')&&batch.body.includes('data-batch-advanced')&&
 batch.body.includes('data-batch-input');
const hasV6=allReachable&&home.body.includes('class="wrap home-page"')&&
 home.body.includes('Fast, precise unit conversions with clear formulas.');
const hasV8SEO=allReachable&&
 reverseTool.body.includes('Kilograms to Pounds: 1 kg ≈ 2.204622622 lb')&&
 numeric.body.includes('class="mini-card related-direction-links"')&&
 numeric.body.includes('href="/convert/lbs-to-kg/"');
const hasV9SEO=allReachable&&numeric.body.includes('data-roundtrip-check')&&
 numeric.body.includes('529.11 lb')&&
 !exactTime.body.includes('data-roundtrip-check');
let buildInfo=null;
if(deployment.ok){try{buildInfo=JSON.parse(deployment.body);}catch{}}
const deployedSha=/^[a-f0-9]{40}$/i.test(buildInfo?.buildCommit||'')?buildInfo.buildCommit.toLowerCase():null;
let revision='not checked';
if(expectedSha)revision=!deployedSha?'missing remote commit marker':deployedSha===expectedSha?'matches main commit':'different from main commit';
const assetStatuses=checks.filter(x=>x.route.startsWith('/assets/')).map(x=>({route:x.route,ok:x.ok,status:x.status}));
function isBlockedRetiredReport(c){
 if(!c||c.error)return false;
 if(c.status===403||c.status===404||c.status===410)return true;
 if([301,302,303,307,308].includes(c.status)&&c.redirectLocation){
  try{return new URL(c.redirectLocation,c.url).pathname==='/404/';}catch{return false;}
 }
 return false;
}
const qaReportsNotPublic=privateReports.every(route=>isBlockedRetiredReport(get(route)));
const qaReportExposure=privateReports.filter(route=>{
 const c=get(route);
 return c?.ok&&!isBlockedRetiredReport(c)&&
  /^(text\/csv|application\/(?:json|octet-stream))\b/i.test(c.contentType||'');
});
let status;
if(!allReachable)status='INCONCLUSIVE_UNREACHABLE';
else if(!noindexSafe)status='WARNING_PREVIEW_INDEXABILITY';
else if(!hasV5)status='WARNING_STALE_OR_DIFFERENT_BUILD';
else if(expectedSha&&deployedSha&&deployedSha!==expectedSha)status='PENDING_CLOUDFLARE_DEPLOYMENT';
else if(expectedSha&&!deployedSha)status='VERIFIED_PREVIEW_VERSION_UNKNOWN';
else if(!hasV6||!hasV8SEO||!hasV9SEO)status='VERIFIED_PREVIOUS_VERSION';
else if(qaReportExposure.length)status='WARNING_PUBLIC_QA_REPORT_EXPOSURE';
else if(!qaReportsNotPublic)status='WARNING_PRIVATE_QA_PATH_NOT_BLOCKED';
else if(!assetStatuses.every(c=>c.ok))status='WARNING_MISSING_ASSET';
else status=expectedSha?'VERIFIED_MAIN_COMMIT':'VERIFIED_CONTENT';
const report={
 source:'Public Cloudflare Pages preview checked over HTTPS from GitHub Actions; NOT official production domain',
 checkedAt:new Date().toISOString(),site,status,expectedSha,deployedSha,revision,
 codeChecks:{htmlReachable:allReachable,previewNoindexSafe:noindexSafe,hasV5Features:hasV5,hasV6Features:hasV6,hasV8SEOFeatures:hasV8SEO,hasV9SEOFeatures:hasV9SEO,assetStatuses,qaReportExposure,qaReportsNotPublic},
 buildInfo:buildInfo?{mode:buildInfo.mode,publicationApproved:buildInfo.publicationApproved,tools:buildInfo.tools,numericalPages:buildInfo.numericalPages,indexablePages:buildInfo.indexablePages,buildCommit:buildInfo.buildCommit??null,builtAt:buildInfo.builtAt}:null,
 responses:checks.map(({route,url,status,ok,bytes,contentType,xRobotsTag,error,redirectLocation})=>({route,url,status,ok,bytes,contentType,xRobotsTag,error,redirectLocation}))
};
fs.writeFileSync(path.join(out,'preview-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log('CLOUDFLARE PREVIEW AUDIT:',JSON.stringify({status,expectedSha,deployedSha,codeChecks:report.codeChecks,responses:report.responses},null,2));
if(status.startsWith('WARNING')||status.startsWith('INCONCLUSIVE')||status==='PENDING_CLOUDFLARE_DEPLOYMENT'||status==='VERIFIED_PREVIOUS_VERSION'||status==='VERIFIED_PREVIEW_VERSION_UNKNOWN'){
 console.log('::warning::Cloudflare preview verification: '+status+'. Read qa-live-preview/preview-audit.json for observed facts.');
}
// Purposefully exit 0: Cloudflare deploy lag or network unreachability must not
// masquerade as a source-build regression. The report never claims success in these cases.
