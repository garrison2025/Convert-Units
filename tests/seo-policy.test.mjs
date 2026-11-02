import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=path=>JSON.parse(fs.readFileSync(new URL(path,import.meta.url),'utf8'));
const pairs=read('../src/data/pairs.json');
const seeds=read('../src/data/seeds.json');
const policy=read('../src/data/numeric-seo-policy.json');

test('the 14400 seconds-to-hours query has a matching standalone parent tool',()=>{
 const p=pairs.find(p=>p.slug==='seconds-to-hours');
 const s=seeds.find(s=>s.slug==='seconds-to-hours');
 assert.ok(p);assert.ok(s);
 assert.equal(p.url,'/convert/seconds-to-hours/');
 assert.equal(s.url,'/convert/seconds-to-hours/14400/');
 assert.ok(pairs.some(x=>x.slug==='minutes-to-hours'));
});
test('all 92 numeric queries are tied to a functioning pair, and no value URLs overlap tool routes',()=>{
 const routes=new Set(pairs.map(p=>p.url));
 for(const s of seeds){
  assert.ok(pairs.some(p=>p.slug===s.slug),s.url+' has no pair');
  assert.ok(!routes.has(s.url));
 }
 assert.equal(routes.size,38);
});
test('curated pilot has 26 approved URLs, no duplicates, and no unverified rank zero',()=>{
 const urls=policy.pilotIndexUrls;
 assert.equal(urls.length,26);
 assert.equal(new Set(urls).size,urls.length);
 assert.equal(policy.manualDecisionRequiredBeforeLaunch,true);
 for(const url of urls){
  const seed=seeds.find(s=>s.url===url);
  assert.ok(seed,'Selected route must originate from approved keywords: '+url);
  assert.ok(seed.rank>0,'Missing ranking evidence '+url);
  assert.ok(seed.volumeUS>0&&seed.trafficEstimate>=0,'No original source demand '+url);
 }
 assert.equal(seeds.length-urls.length,66);
 assert.ok(!urls.includes('/convert/kg-to-lbs/1.8/'),'Source rank zero is unverified');
});
test('top mass clusters are capped rather than mechanically indexing every number',()=>{
 for(const [slug,total] of [['lbs-to-kg',56],['kg-to-lbs',14]]){
  const all=seeds.filter(s=>s.slug===slug);
  const chosen=all.filter(s=>policy.pilotIndexUrls.includes(s.url));
  assert.equal(all.length,total);
  assert.equal(chosen.length,4);
 }
});
