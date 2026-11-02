import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {intentAnswers,intentSlugs} from '../src/search-intent.mjs';
import {rankedRelatedDirections} from '../src/seo-guides.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const policy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));
const bySlug=slug=>pairs.find(p=>p.slug===slug);

test('only nine editorially selected direction pages get practical answers',()=>{
 assert.equal(intentSlugs.length,9);
 assert.equal(new Set(intentSlugs).size,9);
 for(const p of pairs){
  const html=intentAnswers(p,pairs);
  if(intentSlugs.includes(p.slug)){
   assert.match(html,/class="card intent-answers"/);
   assert.match(html,/<h2>Practical questions:/);
   assert.equal([...html.matchAll(/<h3>/g)].length,2,p.slug);
   assert.equal([...html.matchAll(/<a href="\/convert\//g)].length,1,p.slug);
   assert.ok(!html.includes('application/ld+json'),'no invented FAQ structured data');
  }else assert.equal(html,'',p.slug);
 }
});
test('practical answers are derived from the unit engine with true units',()=>{
 const inch=intentAnswers(bySlug('in-to-cm'),pairs);
 assert.ok(inch.includes('17.7 in = 44.958 cm'));
 const frac=intentAnswers(bySlug('in-to-mm'),pairs);
 assert.ok(frac.includes('1/16 in = 1.5875 mm'));
 const sixfeet=intentAnswers(bySlug('ft-to-m'),pairs);
 assert.ok(sixfeet.includes('6 ft = 1.8288 m'));
 assert.ok(sixfeet.includes('1.8796 m'));
 assert.ok(sixfeet.includes('1.88976 m'));
 const meter=intentAnswers(bySlug('m-to-ft'),pairs);
 assert.ok(meter.includes('5 ft 8.90 in'));
 assert.ok(meter.includes('5 ft 8 7/8 in'));
 const speed=intentAnswers(bySlug('mph-to-kmh'),pairs);
 assert.ok(speed.includes('60 mph = 96.56064 km/h'));
 const torque=intentAnswers(bySlug('ft-lbf-to-nm'),pairs);
 assert.ok(torque.includes('400 ft·lbf ≈ 542.327179 N·m'));
});
test('reverse directions rank first, followed by shared source, not input JSON order',()=>{
 const list=rankedRelatedDirections(bySlug('in-to-cm'),pairs).map(x=>x.slug);
 assert.equal(list[0],'cm-to-in');
 assert.equal(list[1],'in-to-mm');
 assert.equal(rankedRelatedDirections(bySlug('cm-to-in'),pairs)[0].slug,'in-to-cm');
 assert.equal(rankedRelatedDirections(bySlug('m-to-ft'),pairs)[0].slug,'ft-to-m');
 assert.equal(rankedRelatedDirections(bySlug('kmh-to-mph'),pairs)[0].slug,'mph-to-kmh');
 assert.equal(rankedRelatedDirections(bySlug('ft-lbf-to-nm'),pairs)[0].slug,'nm-to-ft-lbf');
 assert.ok(rankedRelatedDirections(bySlug('lbs-to-kg'),pairs).every(p=>p.url.startsWith('/convert/')));
 assert.ok(rankedRelatedDirections(bySlug('lbs-to-kg'),pairs).every(p=>p.url.split('/').filter(Boolean).length===2),'no numeric URL');
});
test('fixed URL inventory and conservative 15/77 numerical index boundaries',()=>{
 assert.equal(pairs.length,38);
 assert.equal(seeds.length,92);
 assert.equal(policy.pilotIndexUrls.length,15);
 assert.equal(seeds.length-policy.pilotIndexUrls.length,77);
 for(const slug of intentSlugs)assert.ok(bySlug(slug));
});
