import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {numericHeading,numericTitle,numericDescription} from '../src/seo-meta.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const pairFor=slug=>pairs.find(p=>p.slug===slug);

test('all approved numbers get readable, factual and unique SEO headings and titles',()=>{
 const titles=new Set();
 for(const seed of seeds){
  const pair=pairFor(seed.slug);
  const heading=numericHeading(seed,pair), title=numericTitle(seed,pair),desc=numericDescription(seed,pair);
  assert.ok(heading.includes(seed.valueText),seed.url);
  assert.ok(heading.includes(' to '),seed.url);
  assert.ok(title.includes(' = '),seed.url);
  assert.ok(desc.startsWith(heading),seed.url);
  assert.match(desc,/Verify the formula/);
  assert.ok(desc.includes(' ≈ '),'Rounded results must not be presented as mathematically exact');
  assert.ok(!titles.has(title),'SEO title collisions: '+title);
  titles.add(title);
 }
 assert.equal(titles.size,92);
});
test('fix malformed spacing and abbreviated raw Semrush search phrases',()=>{
 const kpa=seeds.find(s=>s.keyword==='50kpa to atm');
 assert.equal(numericHeading(kpa,pairFor(kpa.slug)),'50 kilopascals to standard atmospheres');
 assert.match(numericTitle(kpa,pairFor(kpa.slug)),/^50 kPa to atm = /);
 const speed=seeds.find(s=>s.keyword==='330kmh to mph');
 assert.match(numericHeading(speed,pairFor(speed.slug)),/^330 kilometers per hour to miles per hour$/);
 const time=seeds.find(s=>s.keyword==='3600000ms to min');
 assert.equal(numericHeading(time,pairFor(time.slug)),'3600000 milliseconds to minutes');
 const mass=seeds.find(s=>s.keyword==='149 lbs to kg');
 assert.equal(numericHeading(mass,pairFor(mass.slug)),'149 pounds to kilograms');
 assert.match(numericTitle(mass,pairFor(mass.slug)),/67\.58526313 kg$/);
});
