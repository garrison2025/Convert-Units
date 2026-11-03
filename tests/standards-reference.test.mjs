import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {dimensions,units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {standardsReferenceFacts,standardsReferenceHtml} from '../src/standards-reference.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));

test('all 16 measurement categories have unique, truthful and source-linked examples',()=>{
 const facts=standardsReferenceFacts(pairs);
 assert.equal(facts.length,16);
 assert.deepEqual([...facts.map(f=>f.dimension)].sort(),Object.keys(dimensions).sort());
 assert.equal(new Set(facts.map(f=>f.url)).size,16);
 for(const f of facts){
  const pair=pairs.find(p=>p.slug===f.slug);
  assert.ok(pair,'source example must target an existing tool: '+f.slug);
  assert.equal(pair.url,f.url);
  assert.equal(units[pair.from].dimension,f.dimension);
  assert.equal(units[pair.to].dimension,f.dimension);
  const n=convert(f.value,pair.from,pair.to);
  assert.equal(f.shown,formatNumber(n,9));
  assert.equal(f.relation,displayRelation(n,f.shown));
  assert.ok(['NIST SI conversion factors','BIPM SI Brochure','IEC 80000-13 overview'].includes(f.sourceLabel));
  assert.match(f.sourceUrl,/^https:\/\/(?:www\.nist\.gov|www\.bipm\.org|webstore\.iec\.ch)\//);
  assert.ok(f.note.length>=40);
 }
});

test('selected metrology, temperature, US volume, time and storage reference values match engine',()=>{
 const bySlug=Object.fromEntries(standardsReferenceFacts(pairs).map(f=>[f.slug,f]));
 for(const [slug,expected] of [
  ['lbs-to-kg','0.45359237'],['in-to-cm','2.54'],
  ['us-gal-to-l','3.785411784'],['celsius-to-fahrenheit','32'],
  ['kpa-to-atm','1'],['minutes-to-hours','1'],
  ['gb-to-mb','1,000'],['kg-m3-to-g-cm3','1'],['l-min-to-m3-h','0.06']
 ]){
  assert.equal(bySlug[slug].shown,expected,slug);
  assert.equal(bySlug[slug].relation,'=',slug);
 }
 assert.equal(bySlug['mpg-us-to-l-100km'].relation,'≈');
 assert.equal(bySlug['kw-to-hp'].relation,'≈');
});

test('methodology HTML provides readable sources and caveats, no unsupported AI markup',()=>{
 const html=standardsReferenceHtml(pairs);
 assert.match(html,/<section id="verified-conversion-facts" /);
 assert.match(html,/<h2 id="verified-conversion-heading">Checkable conversion facts/);
 assert.equal((html.match(/data-standard-dimension="/g)||[]).length,16);
 assert.match(html,/<th scope="col">External reference<\/th>/);
 assert.match(html,/US versus UK fluid ounces/);
 assert.match(html,/Decimal versus binary storage/);
 assert.match(html,/Mass versus force/);
 assert.match(html,/not third-party certification of our software/);
 assert.ok(!html.includes('FAQPage')&&!html.includes('AggregateRating')&&!html.includes('llms.txt'));
 assert.ok(!html.includes('guarantees AI citations'));
});
