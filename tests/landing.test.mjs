import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {convert,formatNumber,units,displayRelation} from '../src/assets/engine.mjs';
import {precisionComparison,calculationDetails,answerBanner,practicalEquivalents,roundTripPrecisionNote} from '../src/landing.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));

test('every approved numeric result has a safe four-row precision comparison',()=>{
 for(const s of seeds){
  const p=pairs.find(p=>p.slug===s.slug)||
     (s.slug==='seconds-to-hours'?{slug:s.slug,from:'seconds',to:'hours'}:null);
  assert.ok(p,s.url);
  const html=precisionComparison(p,s.value);
  assert.match(html,/data-precision-table/);
  for(const precision of [2,4,6,9]){
   assert.ok(html.includes(precision+' decimal places'),s.url);
   const result=formatNumber(convert(s.value,p.from,p.to),precision);
   assert.ok(html.includes(result),s.url+' / '+precision);
  }
  assert.ok(html.includes(units[p.to].symbol),s.url);
  assert.ok(html.includes('unrounded'),s.url);
 }
});
test('zero and thermal conversions do not turn rounding instructions into false accuracy claims',()=>{
 for(const p of [{from:'celsius',to:'fahrenheit'},{from:'kg',to:'lbs'},{from:'seconds',to:'hours'}]){
  const html=precisionComparison(p,0);
  assert.ok(!html.includes('NaN')&&!html.includes('Infinity'));
  assert.match(html,/Do not mistake/);
 }
});
test('value and direct answer are escaped on prerendered pages',()=>{
 const p=pairs.find(p=>p.slug==='lbs-to-kg');
 const banner=answerBanner(p,'149','67.58526313');
 assert.match(banner,/CONVERSION RESULT/);
 assert.match(calculationDetails(p,'149','67.58526313'),/67\.58526313/);
 assert.ok(!banner.includes('onclick='));
});


test('value-specific mass equivalence uses exact 14 lb per stone and 3-digit remainder',()=>{
 const mass={from:'lbs',to:'kg'};
 assert.match(practicalEquivalents(mass,149),/10 st 9 lb/);
 assert.match(practicalEquivalents(mass,14),/1 st 0 lb/);
 assert.match(practicalEquivalents(mass,140),/10 st 0 lb/);
 assert.match(practicalEquivalents({from:'kg',to:'lbs'},6.35029318),/1 st 0 lb/);
 assert.equal(practicalEquivalents(mass,-1),'');
 assert.match(practicalEquivalents(mass,1),/not a health or body-composition assessment/);
});

test('clock-style time equivalents correctly distinguish durations from times of day',()=>{
 assert.match(practicalEquivalents({from:'seconds',to:'minutes'},14400),/4:00:00/);
 assert.match(practicalEquivalents({from:'milliseconds',to:'seconds'},30000),/0:00:30/);
 assert.match(practicalEquivalents({from:'minutes',to:'hours'},10000),/166:40:00/);
 assert.equal(practicalEquivalents({from:'seconds',to:'minutes'},1.25),'');
 assert.match(practicalEquivalents({from:'seconds',to:'hours'},0),/0:00:00/);
});


test('server-rendered conversion answers do not present rounded decimals as exact equality',()=>{
 const kgToLb=pairs.find(x=>x.slug==='kg-to-lbs');
 const result=formatNumber(convert(240,'kg','lbs'),9);
 assert.equal(displayRelation(convert(240,'kg','lbs'),result),'≈');
 const html=answerBanner(kgToLb,'240',result);
 assert.match(html,/240 kg ≈ /);
 assert.match(html,/is approximately/);
 assert.match(html,/data-answer="240 kg ≈ /);
 const lbsToKg=pairs.find(x=>x.slug==='lbs-to-kg');
 const exact=formatNumber(convert(149,'lbs','kg'),9);
 assert.equal(displayRelation(convert(149,'lbs','kg'),exact),'=');
 assert.match(answerBanner(lbsToKg,'149',exact),/149 lb = 67\.58526313 kg/);
 assert.equal(displayRelation(60,'60'),'=');
 assert.throws(()=>displayRelation(NaN,'0'),/finite/);
});

test('pilot numeric answers explain only consequential two-decimal round-trip loss',()=>{
 const kgToLbs=pairs.find(x=>x.slug==='kg-to-lbs');
 const loss=roundTripPrecisionNote(kgToLbs,240);
 assert.match(loss,/data-roundtrip-check/);
 assert.match(loss,/What two-decimal rounding changes/);
 assert.match(loss,/529\.11 lb/);
 assert.match(loss,/difference of about/);
 assert.ok(!loss.includes('NaN')&&!loss.includes('Infinity'));
 const minToHours=pairs.find(x=>x.slug==='minutes-to-hours');
 const duration=roundTripPrecisionNote(minToHours,10000);
 assert.match(duration,/166\.67 hr/);
 assert.match(duration,/10,000\.2 min/);
 assert.match(duration,/0\.2 min/);
 const meterToFeet=pairs.find(x=>x.slug==='m-to-ft');
 assert.match(roundTripPrecisionNote(meterToFeet,8849),/29,032\.15 ft/,'grouping commas must not break numeric parsing');
 const secondsToHours=pairs.find(x=>x.slug==='seconds-to-hours');
 assert.equal(roundTripPrecisionNote(secondsToHours,14400),'','exact 4 hours must not be padded with a redundant warning');
 const msToSeconds=pairs.find(x=>x.slug==='milliseconds-to-seconds');
 assert.equal(roundTripPrecisionNote(msToSeconds,60000),'','exact 60 seconds should not claim invented error');
 const cToF=pairs.find(x=>x.slug==='celsius-to-fahrenheit');
 assert.equal(roundTripPrecisionNote(cToF,37.9),'','37.9 Celsius converts to 100.22 F without two-decimal loss');
 const policy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));
 const pilot=new Set(policy.pilotIndexUrls);
 const panels=seeds.filter(s=>pilot.has(s.url)).map(s=>{
  const pair=pairs.find(p=>p.slug===s.slug);
  return roundTripPrecisionNote(pair,s.value);
 }).filter(Boolean);
 assert.ok(panels.length>=6&&panels.length<=12,'show the panel only where the specific value actually loses precision');
 for(const html of panels){
  assert.ok(!html.includes('NaN')&&!html.includes('Infinity'));
  assert.match(html,/does not estimate the accuracy of the original measurement/);
 }
});
