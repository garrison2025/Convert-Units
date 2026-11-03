import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {homeReferenceFacts,homeReferenceSeeds} from '../src/home-reference.mjs';
import {units,convert} from '../src/assets/engine.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));

test('homepage reference facts use seven real, distinct, linked conversion tools',()=>{
 const facts=homeReferenceFacts(pairs);
 assert.equal(facts.length,7);
 assert.equal(homeReferenceSeeds.length,7);
 assert.equal(new Set(facts.map(x=>x.slug)).size,7);
 for(const item of facts){
  const pair=pairs.find(x=>x.slug===item.slug);
  assert.ok(pair,'unsupported home slug');
  assert.equal(item.url,pair.url);
  assert.equal(item.from,units[pair.from].symbol);
  assert.equal(item.to,units[pair.to].symbol);
  const raw=convert(item.value,pair.from,pair.to);
  const rendered=Number(item.output.replaceAll(',',''));
  assert.ok(Number.isFinite(rendered));
  assert.ok(Math.abs(raw-rendered)<=.000000001*Math.max(1,Math.abs(raw)));
  assert.ok(['=','≈'].includes(item.relation));
 }
});
test('homepage table retains actual standard-based quantities and honest rounding',()=>{
 const facts=Object.fromEntries(homeReferenceFacts(pairs).map(x=>[x.slug,x]));
 assert.equal(facts['lbs-to-kg'].output,'0.45359237');
 assert.equal(facts['lbs-to-kg'].relation,'=');
 assert.equal(facts['in-to-cm'].output,'2.54');
 assert.equal(facts['us-gal-to-l'].output,'3.785411784');
 assert.equal(facts['celsius-to-fahrenheit'].output,'32');
 assert.equal(facts['minutes-to-hours'].output,'1');
 assert.equal(facts['kg-to-lbs'].relation,'≈');
 assert.equal(facts['us-fl-oz-to-ml'].relation,'≈');
});
