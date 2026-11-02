import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {dimensions,units,convert,formatNumber} from '../src/assets/engine.mjs';
import {categoryExplanation,directionExplanation} from '../src/seo-guides.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));

test('all 16 measurement categories have substantive, factual and linked guidance',()=>{
 assert.equal(Object.keys(dimensions).length,16);
 for(const dimension of Object.keys(dimensions)){
  const text=categoryExplanation(dimension);
  assert.ok(text.length>450,dimension+' explanation is too short');
  assert.match(text,/How to verify a conversion/);
  assert.match(text,/nist\.gov/);
  assert.match(text,/\/methodology\//);
  assert.match(text,/class="card measurement-guide"/);
 }
 assert.throws(()=>categoryExplanation('unknown'),/Unknown/);
});

test('all 38 conversions have a direct number check, formula and dimension-specific caution',()=>{
 assert.equal(pairs.length,38);
 for(const p of pairs){
  const html=directionExplanation(p,pairs);
  const result=formatNumber(convert(1,p.from,p.to),9);
  assert.ok(html.includes('1 '+units[p.from].symbol),p.slug);
  assert.ok(html.includes(result),p.slug);
  assert.ok(html.includes(units[p.to].symbol),p.slug);
  assert.match(html,/Conversion method/);
  assert.match(html,/NIST conversion factors/);
  assert.match(html,/See how we calculate/);
  assert.ok(!html.includes('undefined'),p.slug);
  assert.ok(html.length>650,p.slug+' guidance unexpectedly short');
  const reverse=pairs.find(x=>x.from===p.to&&x.to===p.from);
  if(reverse)assert.ok(html.includes(reverse.url),p.slug+' lacks reverse link');
 }
});

test('clarify non-linear temperature and reciprocal fuel caveats',()=>{
 const temperature=directionExplanation(pairs.find(p=>p.slug==='celsius-to-fahrenheit'),pairs);
 assert.match(temperature,/offset/);
 assert.match(temperature,/absolute zero/);
 const fuel=directionExplanation(pairs.find(p=>p.slug==='mpg-us-to-l-100km'),pairs);
 assert.match(fuel,/reciprocal/);
 assert.match(fuel,/Zero and negative/);
 const density=categoryExplanation('density');
 assert.match(density,/cannot be converted to milliliters without knowing/);
 const storage=categoryExplanation('storage');
 assert.match(storage,/1,073,741,824/);
});
