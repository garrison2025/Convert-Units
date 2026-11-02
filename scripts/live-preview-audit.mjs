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
const paths=['/','/batch-converter/','/convert/lbs-to-kg/','/convert/kg-to-lbs/','/convert/kg-to-lbs/240/','/convert/seconds-to-hours/14400/','/category/mass/','/category/temperature/','/convert/minutes-to-hours/','/convert/seconds-to-hours/','/convert/ml-to-us-fl-oz/','/convert/ml-to-us-fl-oz/355/','/convert/kpa-to-atm/','/convert/kpa-to-atm/50/','/convert/kpa-to-psi/108/','/convert/celsius-to-fahrenheit/','/convert/celsius-to-fahrenheit/37.9/','/convert/celsius-to-fahrenheit/36.6/','/convert/m-to-ft/','/convert/ft-to-m/','/convert/m-to-ft/8849/','/convert/ft-lbf-to-nm/','/convert/nm-to-ft-lbf/','/convert/ft-lbf-to-nm/400/','/convert/kmh-to-mph/','/convert/mph-to-kmh/','/convert/kmh-to-mph/330/','/convert/in-to-cm/','/convert/cm-to-in/','/convert/in-to-mm/','/assets/styles.css','/assets/app.mjs','/build-info.json',...privateReports];
async function probe(route){
 const url=site+route;
 try{
  const started=Date.now();
  const r=await fetch(url,{signal:AbortSignal.timeout(15000),redirect:privateReports.includes(route)?'manual':'follow',headers:{'User-Agent':'ExactUnit-ReadOnly-QA/1.0','Accept-Encoding':'gzip, br'}});
  const body=(await r.text()).slice(0,800000);
  const destination=new URL(r.url);
  const record={route,url:r.url,status:r.status,ok:r.ok,redirectLocation:r.headers.get('location'),
    bytes:Buffer.byteLength(body),contentType:r.headers.get('content-type'),contentEncoding:r.headers.get('content-encoding'),
    cacheControl:r.headers.get('cache-control'),elapsedMs:Date.now()-started,
    xRobotsTag:r.headers.get('x-robots-tag'),body};
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
const massCategory=get('/category/mass/'),temperatureCategory=get('/category/temperature/');
const minuteTool=get('/convert/minutes-to-hours/'),secondTool=get('/convert/seconds-to-hours/');
const fluidTool=get('/convert/ml-to-us-fl-oz/'),fluid355=get('/convert/ml-to-us-fl-oz/355/');
const pressureTool=get('/convert/kpa-to-atm/'),pressure50=get('/convert/kpa-to-atm/50/'),pressure108=get('/convert/kpa-to-psi/108/');
const celsiusTool=get('/convert/celsius-to-fahrenheit/'),celsius37=get('/convert/celsius-to-fahrenheit/37.9/'),celsius36=get('/convert/celsius-to-fahrenheit/36.6/');
const metricFeet=get('/convert/m-to-ft/'),reverseFeet=get('/convert/ft-to-m/'),metric8849=get('/convert/m-to-ft/8849/');
const torqueTool=get('/convert/ft-lbf-to-nm/'),torqueReverse=get('/convert/nm-to-ft-lbf/'),torque400=get('/convert/ft-lbf-to-nm/400/');
const speedTool=get('/convert/kmh-to-mph/'),speedReverse=get('/convert/mph-to-kmh/'),speed330=get('/convert/kmh-to-mph/330/');
const inchCm=get('/convert/in-to-cm/'),cmIn=get('/convert/cm-to-in/'),inchMm=get('/convert/in-to-mm/');
const deployment=get('/build-info.json');
const allReachable=[home,batch,tool,reverseTool,numeric,exactTime,massCategory,temperatureCategory,minuteTool,secondTool,fluidTool,fluid355,pressureTool,pressure50,pressure108,celsiusTool,celsius37,celsius36,metricFeet,reverseFeet,metric8849,torqueTool,torqueReverse,torque400,speedTool,speedReverse,speed330,inchCm,cmIn,inchMm].every(c=>c.ok&&!c.error);
function protectsPreview(c){
 return /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(c.body)||
  /(?:^|,)\s*noindex\b/i.test(c.xRobotsTag||'');
}
const noindexSafe=allReachable&&[home,batch,tool,reverseTool,numeric,exactTime,massCategory,temperatureCategory,minuteTool,secondTool,fluidTool,fluid355,pressureTool,pressure50,pressure108,celsiusTool,celsius37,celsius36,metricFeet,reverseFeet,metric8849,torqueTool,torqueReverse,torque400,speedTool,speedReverse,speed330,inchCm,cmIn,inchMm].every(protectsPreview);
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
const hasV10SEO=allReachable&&
 home.body.includes('<h1>Unit converter.<br>')&&
 massCategory.body.includes('class="card category-conversion-examples"')&&
 massCategory.body.includes('1 lb = 0.45359237 kg')&&
 massCategory.body.includes('Convert pounds, kilograms, ounces and grams')&&
 temperatureCategory.body.includes('20 °C = 68 °F');
const hasV12SEO=allReachable&&
 home.body.includes('data-mixed-kg-result')&&
 home.body.includes('≈ 67 kg 585 g')&&
 tool.body.includes('data-mixed-kg-result')&&
 tool.body.includes('Rounded to the nearest gram');
const hasV13TimeSEO=allReachable&&
 minuteTool.body.includes('data-elapsed-duration')&&
 minuteTool.body.includes('0:05:00')&&
 minuteTool.body.includes('data-copy-elapsed')&&
 secondTool.body.includes('data-elapsed-duration')&&
 secondTool.body.includes('0:00:05')&&
 !tool.body.includes('data-elapsed-duration');
const hasV14Ounces=allReachable&&
 fluidTool.body.includes('data-fluid-oz-compare')&&
 fluidTool.body.includes('US and UK fluid ounces are different')&&
 fluid355.body.includes('data-fluid-oz-compare')&&
 fluid355.body.includes('≈ 12.004 US fl oz')&&
 fluid355.body.includes('≈ 12.4943 UK fl oz')&&
 !tool.body.includes('data-fluid-oz-compare');
const hasV16MixedPounds=allReachable&&
 reverseTool.body.includes('data-lb-oz-readout')&&
 reverseTool.body.includes('whole pounds + ounces')&&
 numeric.body.includes('data-lb-oz-result')&&
 numeric.body.includes('≈ 529 lb 1.8 oz')&&
 !tool.body.includes('data-lb-oz-readout');
const hasV15Pressure=allReachable&&
 pressureTool.body.includes('data-pressure-summary')&&
 pressureTool.body.includes('Gauge vs absolute: these are unit changes only.')&&
 pressure50.body.includes('data-copy-pressure')&&
 pressure50.body.includes('= 0.5 bar')&&
 pressure50.body.includes('≈ 0.493462 atm')&&
 pressure50.body.includes('≈ 7.251887 psi')&&
 pressure108.body.includes('≈ 15.664076 psi')&&
 !tool.body.includes('data-pressure-summary');
const hasV17Temperature=allReachable&&
 celsiusTool.body.includes('data-temperature-triple')&&
 celsiusTool.body.includes('Temperature differences use a different rule:')&&
 celsius37.body.includes('data-copy-temperature')&&
 celsius37.body.includes('= 100.22 °F')&&
 celsius37.body.includes('= 311.05 K')&&
 celsius36.body.includes('= 97.88 °F')&&
 celsius36.body.includes('= 309.75 K')&&
 !tool.body.includes('data-temperature-triple');
const hasV19MixedFeet=allReachable&&metricFeet.body.includes('data-feet-inches')&&
 metricFeet.body.includes('data-copy-feet-inches')&&reverseFeet.body.includes('data-feet-inches')&&
 metric8849.body.includes('data-feet-fraction')&&metric8849.body.includes('fraction rounded to nearest 1/16 in')&&
 !tool.body.includes('data-feet-inches');
const hasV20FourUnitTorque=allReachable&&
 torqueTool.body.includes('data-torque-summary')&&torqueTool.body.includes('data-copy-torque')&&
 torqueReverse.body.includes('data-torque-summary')&&torque400.body.includes('data-torque-unit="in-lbf"')&&
 torque400.body.includes('= 4,800 in·lbf')&&torque400.body.includes('≈ 542.327179 N·m')&&
 torque400.body.includes('not manufacturer tightening specifications')&&
 !tool.body.includes('data-torque-summary');
const hasV21FourUnitSpeed=allReachable&&
 speedTool.body.includes('data-speed-summary')&&speedTool.body.includes('data-copy-speed')&&
 speedReverse.body.includes('data-speed-summary')&&
 speed330.body.includes('data-speed-unit="mph"')&&
 speed330.body.includes('≈ 205.052493 mph')&&
 speed330.body.includes('signed velocity component')&&
 !tool.body.includes('data-speed-summary');
const hasV22IntentLinks=allReachable&&
 inchCm.body.includes('data-intent-answers="in-to-cm"')&&
 inchCm.body.includes('17.7 in = 44.958 cm')&&
 inchCm.body.includes('href="/convert/in-to-mm/"')&&
 cmIn.body.includes('data-intent-answers="cm-to-in"')&&
 inchMm.body.includes('data-intent-answers="in-to-mm"')&&
 metricFeet.body.includes('data-intent-answers="m-to-ft"')&&
 speedTool.body.includes('data-intent-answers="kmh-to-mph"')&&
 torqueTool.body.includes('data-intent-answers="ft-lbf-to-nm"')&&
 !tool.body.includes('data-intent-answers=');
let buildInfo=null;
if(deployment.ok){try{buildInfo=JSON.parse(deployment.body);}catch{}}
const deployedSha=/^[a-f0-9]{40}$/i.test(buildInfo?.buildCommit||'')?buildInfo.buildCommit.toLowerCase():null;
let revision='not checked';
if(expectedSha)revision=!deployedSha?'missing remote commit marker':deployedSha===expectedSha?'matches main commit':'different from main commit';
const assetStatuses=checks.filter(x=>x.route.startsWith('/assets/')).map(x=>({route:x.route,ok:x.ok,status:x.status,contentEncoding:x.contentEncoding,cacheControl:x.cacheControl}));
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
else if(!hasV6||!hasV8SEO||!hasV9SEO||!hasV10SEO||!hasV12SEO||!hasV13TimeSEO||!hasV14Ounces||!hasV15Pressure||!hasV16MixedPounds||!hasV17Temperature||!hasV19MixedFeet||!hasV20FourUnitTorque||!hasV21FourUnitSpeed||!hasV22IntentLinks)status='VERIFIED_PREVIOUS_VERSION';
else if(qaReportExposure.length)status='WARNING_PUBLIC_QA_REPORT_EXPOSURE';
else if(!qaReportsNotPublic)status='WARNING_PRIVATE_QA_PATH_NOT_BLOCKED';
else if(!assetStatuses.every(c=>c.ok))status='WARNING_MISSING_ASSET';
else status=expectedSha?'VERIFIED_MAIN_COMMIT':'VERIFIED_CONTENT';
const report={
 source:'Public Cloudflare Pages preview checked over HTTPS from GitHub Actions; NOT official production domain',
 checkedAt:new Date().toISOString(),site,status,expectedSha,deployedSha,revision,
 codeChecks:{htmlReachable:allReachable,previewNoindexSafe:noindexSafe,hasV5Features:hasV5,hasV6Features:hasV6,hasV8SEOFeatures:hasV8SEO,hasV9SEOFeatures:hasV9SEO,hasV10SEOFeatures:hasV10SEO,hasV12SEOFeatures:hasV12SEO,hasV13TimeSEOFeatures:hasV13TimeSEO,hasV14OuncesFeatures:hasV14Ounces,hasV15PressureFeatures:hasV15Pressure,hasV16MixedPoundsFeatures:hasV16MixedPounds,hasV17TemperatureFeatures:hasV17Temperature,hasV19MixedFeetFeatures:hasV19MixedFeet,hasV20FourUnitTorqueFeatures:hasV20FourUnitTorque,hasV21FourUnitSpeedFeatures:hasV21FourUnitSpeed,hasV22IntentLinksFeatures:hasV22IntentLinks,assetStatuses,qaReportExposure,qaReportsNotPublic},
 buildInfo:buildInfo?{mode:buildInfo.mode,publicationApproved:buildInfo.publicationApproved,tools:buildInfo.tools,numericalPages:buildInfo.numericalPages,indexablePages:buildInfo.indexablePages,buildCommit:buildInfo.buildCommit??null,builtAt:buildInfo.builtAt}:null,
 responses:checks.map(({route,url,status,ok,bytes,contentType,contentEncoding,cacheControl,elapsedMs,xRobotsTag,error,redirectLocation})=>({route,url,status,ok,bytes,contentType,contentEncoding,cacheControl,elapsedMs,xRobotsTag,error,redirectLocation}))
};
fs.writeFileSync(path.join(out,'preview-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log('CLOUDFLARE PREVIEW AUDIT:',JSON.stringify({status,expectedSha,deployedSha,codeChecks:report.codeChecks,responses:report.responses},null,2));
if(status.startsWith('WARNING')||status.startsWith('INCONCLUSIVE')||status==='PENDING_CLOUDFLARE_DEPLOYMENT'||status==='VERIFIED_PREVIOUS_VERSION'||status==='VERIFIED_PREVIEW_VERSION_UNKNOWN'){
 console.log('::warning::Cloudflare preview verification: '+status+'. Read qa-live-preview/preview-audit.json for observed facts.');
}
// Purposefully exit 0: Cloudflare deploy lag or network unreachability must not
// masquerade as a source-build regression. The report never claims success in these cases.
