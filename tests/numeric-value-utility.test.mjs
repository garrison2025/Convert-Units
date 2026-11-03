import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {sourceRoundingScenario,sourceRoundingScenarioHtml} from '../src/numeric-value-utility.mjs';
import {convert,formatNumber} from '../src/assets/engine.mjs';
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const bySlug=new Map(pairs.map(p=>[p.slug,p]));
function find(slug,v){const s=seeds.find(x=>x.slug===slug&&x.valueText===v);assert.ok(s);return [s,bySlug.get(slug)];}
test('all 92 source-backed pages have conditional, distinct calculated results',()=>{
 assert.equal(seeds.length,92);
 const keys=new Set();
 for(const seed of seeds){
  const pair=bySlug.get(seed.slug),s=sourceRoundingScenario(seed,pair);
  assert.ok(s.below<seed.value&&s.above>seed.value,seed.url);
  assert.ok(s.lower<=s.central&&s.central<=s.upper,seed.url);
  assert.equal(s.central,convert(seed.value,pair.from,pair.to));
  const h=sourceRoundingScenarioHtml(seed,pair);
  assert.ok(h.includes('data-source-rounding-scenario="'+seed.url+'"'));
  for(const x of [s.central,s.lower,s.upper])assert.ok(h.includes(formatNumber(x,9)),seed.url);
  assert.ok(h.includes('conditional rounding example'));
  assert.ok(!/Semrush|rankings|search volume|href=/.test(h));
  const key=seed.slug+' '+seed.value+' '+s.lower+' '+s.upper;
  assert.ok(!keys.has(key));keys.add(key);
 }
 assert.equal(keys.size,92);
});
test('126 lb to kg source interval stays at whole 57 kg',()=>{
 const [seed,pair]=find('lbs-to-kg','126'),s=sourceRoundingScenario(seed,pair);
 assert.deepEqual([s.step,s.below,s.above,s.roundedLower,s.roundedUpper],[1,125.5,126.5,57,57]);
 assert.equal(s.lower,convert(125.5,'lbs','kg'));
});
test('149 lb to kg source interval can change whole target unit',()=>{
 const [seed,pair]=find('lbs-to-kg','149'),s=sourceRoundingScenario(seed,pair);
 assert.deepEqual([s.below,s.above,s.roundedLower,s.roundedUpper],[148.5,149.5,67,68]);
 assert.match(sourceRoundingScenarioHtml(seed,pair),/67 or 68 kg/);
});
test('133.8 lb uses tenths and does not assume pounds-scale precision',()=>{
 const [seed,pair]=find('lbs-to-kg','133.8'),s=sourceRoundingScenario(seed,pair);
 assert.deepEqual([s.step,s.below,s.above],[0.1,133.75,133.85]);
 assert.match(sourceRoundingScenarioHtml(seed,pair),/nearest <strong>0.1 lb<\/strong>/);
});
test('37.9 C uses affine temperature conversion not a simple multiplication',()=>{
 const [seed,pair]=find('celsius-to-fahrenheit','37.9'),s=sourceRoundingScenario(seed,pair);
 assert.deepEqual([s.below,s.above],[37.85,37.95]);
 assert.ok(Math.abs(s.lower-100.13)<1e-10);
 assert.ok(Math.abs(s.upper-100.31)<1e-10);
});
test('60,000 milliseconds rounding is explicitly a what-if',()=>{
 const [seed,pair]=find('milliseconds-to-seconds','60000'),s=sourceRoundingScenario(seed,pair);
 assert.deepEqual([s.step,s.below,s.above],[1,59999.5,60000.5]);
 assert.ok(Math.abs(s.lower-59.9995)<1e-10);
 assert.match(sourceRoundingScenarioHtml(seed,pair),/trailing zeros/);
});
test('malformed or mismatched sources cannot publish an inaccurate interval',()=>{
 const [seed,pair]=find('lbs-to-kg','149');
 assert.throws(()=>sourceRoundingScenario(seed,{...pair,slug:'kg-to-lbs'}));
 assert.throws(()=>sourceRoundingScenario({...seed,valueText:'149lb'},pair));
 assert.throws(()=>sourceRoundingScenario({...seed,valueText:'150'},pair));
});
