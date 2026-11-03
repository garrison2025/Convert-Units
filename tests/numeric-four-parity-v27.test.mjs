import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {convert,units,formatNumber} from '../src/assets/engine.mjs';

const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const focus=read('research/NUMERIC-FOUR-INTENT-COMPETITOR-PARITY-V27-20261103.json');
const previous=read('research/SEO-15-SERP-EVIDENCE-20261102.json').items;
const pilot=new Set(read('src/data/numeric-seo-policy.json').pilotIndexUrls);
const seeds=read('src/data/seeds.json');
const pairs=read('src/data/pairs.json');

test('V27 contains four actual, unique V26-prioritized numeric queries with at least two verified competitor sources',()=>{
 assert.equal(focus.items.length,4);
 assert.equal(new Set(focus.items.map(x=>x.url)).size,4);
 assert.equal(focus.independentUSGoogleRankVerified,false);
 assert.equal(focus.googleSearchConsoleClicksVerified,false);
 assert.deepEqual(focus.items.map(x=>x.query),[
  '355 ml to fluid ounces','330kmh to mph','37.9 celsius to fahrenheit','8849 meters to feet'
 ]);
 for(const item of focus.items){
  assert.ok(pilot.has(item.url),item.url+' not one of original 15');
  const old=previous.find(x=>x.url===item.url),seed=seeds.find(x=>x.url===item.url);
  assert.ok(old&&seed);
  assert.equal(seed.keyword,item.query);
  assert.equal(seed.value,item.value);
  const pair=pairs.find(p=>p.slug===seed.slug);
  assert.equal(item.from,pair.from);
  assert.equal(item.to,pair.to);
  assert.equal(units[item.from].dimension,units[item.to].dimension);
  assert.ok(Number.isFinite(convert(item.value,item.from,item.to)));
  assert.equal(item.recommendedHandling,'PREFER_PARENT_CONVERTER__NUMERIC_HOLD');
  assert.ok(item.actualFeatureGap.length>55);
  assert.ok(item.siteMarkers.length>=2);
  assert.ok(item.sources.length>=2);
  assert.equal(new Set(item.sources.map(x=>new URL(x.url).hostname)).size,item.sources.length,
   'Multiple competitor observations must not be counted as independent if same website');
  const original=item.sources.find(x=>x.type==='original-value-specific-competitor');
  assert.ok(original);
  assert.equal(new URL(original.url).hostname,new URL(old.competitorUrl).hostname);
  for(const row of item.sources){
   assert.match(row.url,/^https:\/\//);
   assert.ok(row.verifiedObservation.length>35);
  }
 }
});
test('rounding and exact conversion output are distinct from search ranking and medical advice',()=>{
 const temp=focus.items.find(x=>x.from==='celsius');
 assert.equal(formatNumber(convert(temp.value,'celsius','fahrenheit'),6),'100.22');
 assert.match(temp.actualFeatureGap,/measurement method/);
 const speed=focus.items.find(x=>x.from==='kmh');
 assert.equal(formatNumber(convert(speed.value,'kmh','mph'),6),'205.052493');
 const feet=focus.items.find(x=>x.from==='m');
 assert.equal(formatNumber(convert(feet.value,'m','ft'),6),'29,032.152231');
 const volume=focus.items.find(x=>x.from==='ml');
 assert.equal(formatNumber(convert(volume.value,'ml','us-fl-oz'),6),'12.003978');
});
test('four competitors feature-parity findings are editorial holds, not production indexing approvals',()=>{
 const policy=read('src/data/numeric-seo-policy.json');
 assert.equal(policy.pilotIndexUrls.length,15);
 assert.equal(seeds.length,92);
 assert.equal(seeds.length-policy.pilotIndexUrls.length,77);
 assert.equal(policy.manualDecisionRequiredBeforeLaunch,true);
 assert.ok(focus.items.every(x=>x.recommendedHandling.endsWith('NUMERIC_HOLD')));
});
