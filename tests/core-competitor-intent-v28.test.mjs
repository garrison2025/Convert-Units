import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,convert,formatNumber} from '../src/assets/engine.mjs';
import {horsepowerConventionsReference,directionExplanation} from '../src/seo-guides.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const policy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));
const pair=s=>pairs.find(p=>p.slug===s);

test('source-specific horsepower reference shows four distinct standards without modifying live mechanical hp',()=>{
 const power=pair('kw-to-hp'),html=horsepowerConventionsReference(power);
 assert.match(html,/data-horsepower-conventions/);
 assert.match(html,/This converter uses mechanical horsepower \(hp\(I\)\) only/);
 const conventions=[
  ['Mechanical horsepower, hp(I)',units.hp.factor,'1.341022'],
  ['Electric horsepower, hp(E)',746,'1.340483'],
  ['Metric horsepower, hp(M)',735.49875,'1.359622'],
  ['Boiler horsepower, hp(S)',9809.5,'0.101942']
 ];
 for(const [name,watts,oneKw] of conventions){
  assert.ok(html.includes(name));
  assert.equal(formatNumber(1000/watts,6),oneKw);
  assert.ok(html.includes(oneKw+' hp'));
 }
 assert.equal(formatNumber(convert(1,'kw','hp'),6),'1.341022');
 assert.ok(html.includes('Live converter'));
 assert.ok(html.includes('For comparison only'));
 assert.match(html,/inchcalculator\.com\/convert\/kilowatt-to-horsepower/);
 assert.ok(directionExplanation(power,pairs).includes(html));
});
test('hp comparison is absent from other 37 directional tools, including non-power units',()=>{
 for(const p of pairs.filter(p=>p.slug!=='kw-to-hp')){
  assert.equal(horsepowerConventionsReference(p),'',p.slug);
  assert.ok(!directionExplanation(p,pairs).includes('data-horsepower-conventions'),p.slug);
 }
});
test('relevant numeric candidates and SEO release inventory remain unchanged',()=>{
 assert.equal(pairs.length,38);
 assert.equal(seeds.length,92);
 assert.equal(policy.pilotIndexUrls.length,15);
 assert.equal(seeds.length-policy.pilotIndexUrls.length,77);
 assert.equal(seeds.filter(s=>s.slug==='kw-to-hp').length,0,'Do not invent keywords or numeric SEO pages for horsepower');
});
