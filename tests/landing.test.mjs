import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {convert,formatNumber,units} from '../src/assets/engine.mjs';
import {precisionComparison,calculationDetails,answerBanner} from '../src/landing.mjs';

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
