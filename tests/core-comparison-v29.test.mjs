import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,convert,formatNumber} from '../src/assets/engine.mjs';
import {conventionComparison,directionExplanation} from '../src/seo-guides.mjs';

const read=x=>JSON.parse(fs.readFileSync(new URL('../'+x,import.meta.url),'utf8'));
const pairs=read('src/data/pairs.json'),seeds=read('src/data/seeds.json');
const old=read('research/CORE-8-COMPETITOR-INTENT-V28-20261103.json').items;
const newEvidence=read('research/CORE-30-COMPETITOR-INTENT-V29-20261103.json');
const pair=slug=>pairs.find(x=>x.slug===slug);

test('38 genuine core tools map bijectively to 8+30 distinct public competitor pages',()=>{
 const newer=newEvidence.items;
 assert.equal(old.length,8);assert.equal(newer.length,30);assert.equal(pairs.length,38);
 assert.deepEqual([...old,...newer].map(x=>x.slug).sort(),pairs.map(x=>x.slug).sort());
 assert.equal(new Set([...old,...newer].map(x=>x.slug)).size,38);
 assert.deepEqual(newEvidence.scopeCounts,{alreadyReviewedInV28:8,reviewedInV29:30,total:38});
 for(const item of newer){
  const p=pair(item.slug);
  assert.ok(p);
  assert.equal(item.url,p.url);
  assert.equal(item.from,p.from);assert.equal(item.to,p.to);
  assert.equal(item.verifiedKeywordUSVolume,null);
  assert.equal(item.verifiedKeywordKD,null);
  assert.equal(item.verifiedGoogleUSPosition,null);
  assert.equal(item.exactUnitGscClicks,null);
  assert.ok(item.comparisonSource.startsWith('https://'));
  assert.ok(item.observedFunction.length>45);
  assert.ok(item.siteGap.length>45);
  assert.ok(Number.isFinite(convert(1,p.from,p.to)),p.slug);
  assert.ok(['KEEP_EXISTING_TOOL','FIX_STANDARD_DISAMBIGUATION'].includes(item.decision));
 }
 assert.equal(newer.filter(x=>x.decision==='FIX_STANDARD_DISAMBIGUATION').length,3);
});
test('customary US cup is 236.5882365 mL, unlike FDA nutrition 240 mL and metric 250 mL',()=>{
 const html=conventionComparison(pair('us-cup-to-ml'));
 assert.match(html,/data-standards-comparison="us-cup-to-ml"/);
 assert.match(html,/This calculator uses the US customary measuring cup/);
 for(const text of ['236.5882365','473.176473','240','480','250','500'])
  assert.ok(html.includes(text),text);
 assert.equal(formatNumber(convert(1,'us-cup','ml'),7),'236.5882365');
 assert.match(html,/fda\.gov\/regulatory-information/);
 assert.ok(directionExplanation(pair('us-cup-to-ml'),pairs).includes(html));
});
test('US customary spoon, nutrition-label spoon and Australian spoon never change the live US 3-tsp rule',()=>{
 const html=conventionComparison(pair('us-tbsp-to-us-tsp'));
 assert.match(html,/data-standards-comparison="us-tbsp-to-us-tsp"/);
 for(const value of ['14.786764781','4.928921594','15','20','3','4'])
  assert.ok(html.includes(value),value);
 assert.match(html,/Australian tablespoon/);
 assert.match(html,/FDA nutrition-label tbsp/);
 assert.equal(convert(1,'us-tbsp','us-tsp'),3);
 assert.equal(formatNumber(convert(1,'us-tbsp','ml'),9),'14.786764781');
});
test('GB-to-MB is decimal 1000 while GiB/MiB is binary 1024 and bytes differ',()=>{
 const html=conventionComparison(pair('gb-to-mb'));
 assert.match(html,/data-standards-comparison="gb-to-mb"/);
 assert.match(html,/This calculator converts decimal gigabytes to decimal megabytes/);
 assert.match(html,/1,000 MB/);
 assert.match(html,/1,024 MiB/);
 assert.match(html,/1,000,000,000 bytes/);
 assert.match(html,/1,073,741,824 bytes/);
 assert.equal(convert(1,'gb','mb'),1000);
 assert.equal(convert(1,'gib','mib'),1024);
 assert.equal(units.gb.factor,1e9);
 assert.equal(units.gib.factor,1073741824);
});
test('no unrelated direction carries extra cooking or binary standard text',()=>{
 const modified=new Set(['us-cup-to-ml','us-tbsp-to-us-tsp','gb-to-mb']);
 for(const p of pairs){
  const html=conventionComparison(p);
  assert.equal(Boolean(html),modified.has(p.slug),p.slug);
  if(html)assert.ok(directionExplanation(p,pairs).includes(html));
 }
 assert.equal(seeds.length,92);
 assert.equal(read('src/data/numeric-seo-policy.json').pilotIndexUrls.length,15);
});
