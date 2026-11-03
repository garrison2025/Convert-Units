import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=x=>JSON.parse(fs.readFileSync(new URL('../'+x,import.meta.url),'utf8'));
const policy=read('src/data/numeric-seo-policy.json');
const seeds=read('src/data/seeds.json');
const pairs=read('src/data/pairs.json');
const observed=read('research/SEO-15-SERP-EVIDENCE-20261102.json');

test('all 15 numeric index candidates map exactly to source-backed competitor observations',()=>{
 const selected=new Set(policy.pilotIndexUrls);
 assert.equal(selected.size,15);
 assert.equal(seeds.length,92);
 assert.equal(seeds.length-selected.size,77);
 assert.equal(pairs.length,38);
 assert.equal(observed.items.length,15);
 assert.equal(new Set(observed.items.map(x=>x.url)).size,15);
 for(const item of observed.items){
  assert.ok(selected.has(item.url),item.url);
  const seed=seeds.find(x=>x.url===item.url);
  assert.ok(seed);
  assert.equal(item.query,seed.keyword);
  assert.ok(item.competitorUrl.startsWith('https://'));
  assert.ok(['exact-value-page','generic-tool-example','generic-tool-table'].includes(item.observedPageType));
  assert.equal(item.rankingProven,false,'do not invent US organic rank verification');
  assert.equal(item.independentSearchDemandProven,false,'do not claim distinct verified demand');
  assert.equal(item.siteVsCompetitorUniqueValueProven,false,'do not assert relative value without side by side evidence');
 }
});
test('two generic competitor observations cannot independently validate a numeric URL',()=>{
 const generic=observed.items.filter(x=>x.observedPageType!=='exact-value-page');
 assert.deepEqual(generic.map(x=>x.url).sort(),[
  '/convert/ft-lbf-to-nm/400/','/convert/kpa-to-psi/108/'
 ]);
 assert.equal(observed.items.filter(x=>x.observedPageType==='exact-value-page').length,13);
});
test('one conditional numeric candidate per direction; no implicit release authorization',()=>{
 const selected=new Set(policy.pilotIndexUrls),bySlug=new Map();
 for(const seed of seeds.filter(x=>selected.has(x.url))){
  assert.ok(pairs.some(p=>p.slug===seed.slug));
  assert.ok(!bySlug.has(seed.slug),seed.slug+' has multiple index candidates');
  bySlug.set(seed.slug,seed);
 }
 assert.equal(bySlug.size,15);
 assert.equal(policy.manualDecisionRequiredBeforeLaunch,true);
});
