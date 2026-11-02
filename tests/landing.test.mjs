import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {convert,formatNumber,units} from '../src/assets/engine.mjs';
import {precisionComparison,calculationDetails,answerBanner,practicalEquivalents} from '../src/landing.mjs';

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
