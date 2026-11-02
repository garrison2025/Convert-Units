import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {speedFourUnitComparison,convert} from '../src/assets/engine.mjs';
const find=(rows,id)=>rows.find(r=>r.unit===id);

test('four speeds come from the exact 1609.344m mile and 1852m nautical mile',()=>{
 const rows=speedFourUnitComparison(60,'mph');
 assert.deepEqual(rows.map(x=>x.unit),['kmh','mph','m-s','knot']);
 assert.equal(find(rows,'kmh').shown,'96.56064');
 assert.equal(find(rows,'mph').shown,'60');
 assert.equal(find(rows,'mph').relation,'=');
 assert.equal(find(rows,'m-s').shown,'26.8224');
 for(const r of rows){
  const actual=Number(r.shown.replaceAll(',',''));
  assert.ok(Math.abs(actual-convert(60,'mph',r.unit))<=0.000001,r.unit);
 }
 assert.ok(Math.abs(convert(1,'knot','kmh')-1.852)<1e-12);
 assert.ok(Math.abs(convert(1,'mph','m-s')-0.44704)<1e-12);
});
test('330kmh seed, reverse mph, signed and zero readings',()=>{
 const rows=speedFourUnitComparison(330,'kmh');
 assert.equal(find(rows,'kmh').shown,'330');
 assert.equal(find(rows,'mph').shown,'205.052493');
 assert.equal(find(rows,'mph').relation,'≈');
 assert.equal(find(speedFourUnitComparison(70,'mph'),'kmh').shown,'112.65408');
 assert.ok(speedFourUnitComparison(0,'kmh').every(r=>r.shown==='0'&&r.relation==='='));
 const neg=speedFourUnitComparison(-100,'kmh');
 assert.equal(find(neg,'kmh').shown,'-100');
 assert.ok(find(neg,'mph').shown.startsWith('-'));
});
test('invalid, over-bound, unrelated category and unknown units do not produce misleading readings',()=>{
 for(const x of ['', '0x10', 'not-a-speed', Number.POSITIVE_INFINITY, 1e19])
  assert.equal(speedFourUnitComparison(x,'kmh'),null);
 assert.equal(speedFourUnitComparison(1,'kg'),null);
 assert.equal(speedFourUnitComparison(1,'unknown-unit'),null);
});
test('unchanged directional tools and numerical index pilot',()=>{
 const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
 const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
 const policy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));
 assert.equal(pairs.length,38);
 assert.equal(pairs.filter(p=>['kmh-to-mph','mph-to-kmh'].includes(p.slug)).length,2);
 assert.equal(seeds.length,92);
 assert.equal(policy.pilotIndexUrls.length,15);
 assert.equal(seeds.length-policy.pilotIndexUrls.length,77);
 assert.ok(seeds.some(s=>s.url==='/convert/kmh-to-mph/330/'));
});
