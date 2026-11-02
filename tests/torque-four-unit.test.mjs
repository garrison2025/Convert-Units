import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {convert,torqueFourUnitComparison} from '../src/assets/engine.mjs';

test('400 ft·lbf is consistently expressed in four torque units',()=>{
 const rows=torqueFourUnitComparison(400,'ft-lbf');
 assert.deepEqual(rows.map(r=>r.unit),['nm','ft-lbf','in-lbf','kgf-m']);
 const by=Object.fromEntries(rows.map(r=>[r.unit,r]));
 assert.equal(by.nm.shown,'542.327179');
 assert.equal(by.nm.relation,'≈');
 assert.equal(by['ft-lbf'].shown,'400');
 assert.equal(by['ft-lbf'].relation,'=');
 assert.equal(by['in-lbf'].shown,'4,800');
 assert.equal(by['in-lbf'].relation,'=');
 for(const row of rows){
  const expected=convert(400,'ft-lbf',row.unit);
  assert.ok(Math.abs(Number(row.shown.replaceAll(',',''))-expected)<0.000001, row.unit+' output must derive from source');
 }
});
test('zero, signs and exact 12 inch-pound ratio are supported',()=>{
 const inch=torqueFourUnitComparison(12,'in-lbf');
 assert.equal(inch.find(r=>r.unit==='ft-lbf').shown,'1');
 assert.equal(inch.find(r=>r.unit==='nm').shown,'1.355818');
 const zero=torqueFourUnitComparison(0,'nm');
 assert.ok(zero.every(r=>r.shown==='0'&&r.relation==='='));
 const negative=torqueFourUnitComparison(-2,'nm');
 assert.equal(negative.find(r=>r.unit==='nm').shown,'-2');
 assert.ok(negative.find(r=>r.unit==='ft-lbf').shown.startsWith('-'));
 const kgf=torqueFourUnitComparison(1,'kgf-m');
 assert.equal(kgf.find(r=>r.unit==='nm').shown,'9.80665');
});
test('invalid inputs or unrelated categories never produce torque values',()=>{
 for(const x of ['', 'not-a-number', '0x10', Infinity, 1e30])assert.equal(torqueFourUnitComparison(x,'nm'),null);
 assert.equal(torqueFourUnitComparison(1,'kg'),null);
 assert.equal(torqueFourUnitComparison(1,'not-a-unit'),null);
});
test('fixed keyword inventory, numeric pilot and noindex policy remain unchanged',()=>{
 const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
 const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
 const index=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));
 assert.equal(pairs.length,38);
 assert.equal(seeds.length,92);
 assert.equal(index.pilotIndexUrls.length,15);
 assert.equal(seeds.length-index.pilotIndexUrls.length,77);
 assert.ok(seeds.some(s=>s.url==='/convert/ft-lbf-to-nm/400/'));
 assert.equal(pairs.filter(p=>['ft-lbf-to-nm','nm-to-ft-lbf'].includes(p.slug)).length,2);
});
