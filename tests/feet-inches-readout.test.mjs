import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {feetInchesReadout,convert} from '../src/assets/engine.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const indexPolicy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));

test('decimal and sixteenth-inch readouts are computed from unrounded international-foot factor',()=>{
 const result=feetInchesReadout(1.75,'m');
 assert.equal(result.decimal,'5 ft 8.90 in');
 assert.equal(result.fractional,'5 ft 8 7/8 in');
 assert.equal(result.decimalRelation,'≈');
 assert.equal(result.fractionalRelation,'≈');
 const one=feetInchesReadout(1,'m');
 assert.equal(one.decimal,'3 ft 3.37 in');
 assert.equal(one.fractional,'3 ft 3 3/8 in');
 assert.equal(feetInchesReadout(0.3048,'m').fractional,'1 ft 0 in');
 assert.equal(feetInchesReadout(1,'ft').fractional,'1 ft 0 in');
 assert.equal(feetInchesReadout(0.03175,'m').fractional,'0 ft 1 1/4 in');
});
test('carries correctly at twelve inches and reduces exact fractions',()=>{
 const meters=convert(11.997,'in','m');
 const r=feetInchesReadout(meters,'m');
 assert.equal(r.decimal,'1 ft 0.00 in');
 assert.equal(r.fractional,'1 ft 0 in');
 assert.equal(feetInchesReadout(1/8,'ft').fractional,'0 ft 1 1/2 in');
 assert.equal(feetInchesReadout(0,'m').fractionalRelation,'=');
 assert.equal(feetInchesReadout(1,'ft').decimalRelation,'=');
});
test('signed values and invalid/out-of-range values never show corrupted lengths',()=>{
 assert.equal(feetInchesReadout(-1.75,'m').fractional,'−5 ft 8 7/8 in');
 assert.equal(feetInchesReadout(-1.75,'m').decimal,'−5 ft 8.90 in');
 assert.equal(feetInchesReadout('bad','m'),null);
 assert.equal(feetInchesReadout(Infinity,'m'),null);
 assert.equal(feetInchesReadout(1e12,'m'),null);
 assert.equal(feetInchesReadout(5,'kg'),null);
});
test('new display does not produce numeric routes or alter index rules',()=>{
 assert.equal(pairs.length,38);
 assert.equal(seeds.length,92);
 assert.equal(indexPolicy.pilotIndexUrls.length,15);
 assert.equal(seeds.length-indexPolicy.pilotIndexUrls.length,77);
 assert.ok(indexPolicy.pilotIndexUrls.includes('/convert/m-to-ft/8849/'));
 assert.equal(pairs.filter(p=>['m-to-ft','ft-to-m'].includes(p.slug)).length,2);
});
