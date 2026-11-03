import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const load=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const pilot=load('src/data/numeric-seo-policy.json').pilotIndexUrls;
const old=load('research/SEO-15-SERP-EVIDENCE-20261102.json');
const generic=load('research/NUMERIC-GENERIC-COMPETITOR-SIDEBYSIDE-V25-20261103.json').entries;
const exact=load('research/NUMERIC-EXACT-COMPETITOR-SIDEBYSIDE-V26-20261103.json').entries;
const seeds=load('src/data/seeds.json');
test('13 exact-value and 2 generic-tool competitor reviews cover precisely the 15 original pilot candidates',()=>{
 assert.equal(pilot.length,15);
 assert.equal(seeds.length,92);
 assert.equal(exact.length,13);
 assert.equal(generic.length,2);
 const combined=[...exact,...generic];
 assert.deepEqual(combined.map(e=>e.url).sort(),[...pilot].sort());
 assert.equal(new Set(combined.map(e=>e.url)).size,15);
 for(const e of exact){
  const oldEvidence=old.items.find(x=>x.url===e.url);
  const seed=seeds.find(x=>x.url===e.url);
  assert.ok(oldEvidence&&seed);
  assert.equal(oldEvidence.observedPageType,'exact-value-page');
  assert.equal(oldEvidence.query,seed.keyword);
  assert.equal(e.uniqueValueVerified,false);
  assert.equal(e.rankingVerified,false);
  assert.equal(e.independentDemandVerified,false);
  assert.equal(e.recommendation,'HOLD_UNTIL_VALUE_AND_US_SERP_VERIFIED');
  assert.ok(e.competitorFeatures.length>=2);
  assert.ok(e.siteFeatureMarkers.length>=1);
 }
});
test('source provenance is explicit: 8 readable original URLs, 4 indexed excerpts, 1 replacement',()=>{
 const methods={};
 for(const x of exact)methods[x.inspectionMethod]=(methods[x.inspectionMethod]||0)+1;
 assert.deepEqual(methods,{
  direct_retrieved_page_text:8,search_indexed_page_excerpt:4,replacement_competitor_search_excerpt:1
 });
 for(const e of exact){
  if(e.inspectionMethod==='replacement_competitor_search_excerpt'){
   assert.equal(e.url,'/convert/kmh-to-mph/330/');
   assert.equal(e.observedUrl,'https://www.kmhtomphconverter.com/330-kmh-to-mph/');
   assert.notEqual(e.observedUrl,old.items.find(x=>x.url===e.url).competitorUrl);
  }else assert.equal(e.observedUrl,null);
 }
});
test('the numerical pilot is NOT an SEO index approval and preserves 15/77',()=>{
 const cfg=load('src/data/numeric-seo-policy.json');
 assert.equal(cfg.manualDecisionRequiredBeforeLaunch,true);
 assert.equal(cfg.pilotIndexUrls.length,15);
 assert.equal(seeds.length-cfg.pilotIndexUrls.length,77);
 for(const x of exact)assert.ok(x.remainingGap.length>20);
});
