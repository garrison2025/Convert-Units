import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';
import{convert,formatNumber,dimensions,units,parseBatchFirstCell}from'../src/assets/engine.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url)));const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url)));
const eq=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
test('approved full scope',()=>{assert.equal(pairs.length,37);assert.equal(seeds.length,92);assert.equal(new Set(seeds.map(s=>s.url)).size,92);assert.equal(new Set(pairs.map(p=>p.url)).size,37);});
test('mass exact factors',()=>{eq(convert(1,'lbs','kg'),0.45359237,1e-14);eq(convert(240,'kg','lbs'),529.109429243706,1e-9);eq(convert(149,'lbs','kg'),67.58526313,1e-10);eq(convert(1,'oz','g'),28.349523125,1e-12);});
test('length and liquid US/imperial',()=>{eq(convert(1,'ft','m'),.3048);eq(convert(1,'in','cm'),2.54);eq(convert(1,'us-gal','l'),3.785411784);eq(convert(1,'us-fl-oz','ml'),29.5735295625);eq(convert(1,'imp-gal','l'),4.54609);});
test('temperature and absolute zero',()=>{eq(convert(0,'celsius','fahrenheit'),32);eq(convert(100,'celsius','fahrenheit'),212);eq(convert(-40,'celsius','fahrenheit'),-40);eq(convert(273.15,'kelvin','celsius'),0);assert.throws(()=>convert(-274,'celsius','fahrenheit'),/absolute zero/);});
test('pressure, torque, time, speed and force',()=>{eq(convert(1,'bar','kpa'),100);eq(convert(1,'ft-lbf','nm'),1.3558179483314004);eq(convert(3600000,'milliseconds','minutes'),60);eq(convert(10000,'minutes','hours'),166.6666666667);eq(convert(1,'mph','kmh'),1.609344);eq(convert(1,'kn','lbf'),224.80894387096);});
test('fuel reciprocal and impossible inputs',()=>{eq(convert(30,'mpg-us','l-100km'),235.214583/30,1e-6);eq(convert(convert(30,'mpg-us','l-100km'),'l-100km','mpg-us'),30);assert.throws(()=>convert(0,'mpg-us','l-100km'),/greater than zero/);assert.throws(()=>convert(-1,'l-100km','mpg-us'),/greater than zero/);});
test('dimension guard and invalid values',()=>{assert.throws(()=>convert(1,'kg','ml'),/same physical dimension/);assert.throws(()=>convert('bad','kg','lbs'),/valid number/);assert.throws(()=>convert(1e22,'kg','lbs'),/valid number/);});
test('all paired routes use correct dimension',()=>{for(const p of pairs){assert.equal(units[p.from].dimension,units[p.to].dimension,p.slug);assert.ok(Number.isFinite(convert(1,p.from,p.to)),p.slug);}});
test('all approved result URLs are accurate and map to defined tools',()=>{for(const s of seeds){const p=pairs.find(p=>p.slug===s.slug)||(s.slug==='seconds-to-hours'?{from:'seconds',to:'hours'}:null);assert.ok(p,s.url);assert.equal(s.url,`/convert/${s.slug}/${s.valueText}/`);assert.ok(Number.isFinite(convert(s.value,p.from,p.to)),s.url);}});
test('reasonable formatting',()=>{assert.equal(formatNumber(12.3456,2),'12.35');assert.equal(formatNumber(0,6),'0');});

test('production input and CSV safeguards',()=>{
 assert.throws(()=>convert('  ','lbs','kg'),/valid number/);
 assert.throws(()=>convert('\n','kg','lbs'),/valid number/);
 assert.match(formatNumber(1e20,4),/e\+20/);
 assert.equal(parseBatchFirstCell('149,unused'),'149');
 assert.equal(parseBatchFirstCell('"1,200",note'),'1200');
 assert.equal(parseBatchFirstCell('\uFEFFvalue,result'),'value');
 assert.equal(parseBatchFirstCell('-14.5'),'-14.5');
 assert.throws(()=>parseBatchFirstCell('"not closed,3'),/Malformed/);
});
