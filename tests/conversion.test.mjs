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

test('reciprocal roundtrips for every configured direction and representative scale',()=>{
  for(const p of pairs){
    for(const value of [0.01,1,137.25,1e8]){
      const original=p.from==='mpg-us'?Math.max(value,0.01):value;
      const converted=convert(original,p.from,p.to);
      const reversed=convert(converted,p.to,p.from);
      eq(reversed,original,1e-8);
      assert.ok(Number.isFinite(converted),p.slug+' : '+value);
    }
  }
});
test('absolute zero offsets and invalid negative thermodynamic temperatures',()=>{
  eq(convert(0,'kelvin','fahrenheit'),-459.67,1e-9);
  eq(convert(-459.67,'fahrenheit','kelvin'),0,1e-9);
  assert.throws(()=>convert(-1,'kelvin','celsius'),/absolute zero/);
  assert.throws(()=>convert(-459.68,'fahrenheit','celsius'),/absolute zero/);
});
test('storage, cooking, area, flow and density do not mix up physical definitions',()=>{
  eq(convert(1,'gb','mb'),1000);
  eq(convert(1,'gib','mib'),1024);
  eq(convert(1,'us-tbsp','us-tsp'),3);
  eq(convert(1,'us-cup','ml'),236.5882365);
  eq(convert(1,'m2','ft2'),10.76391041670972);
  eq(convert(1,'l-min','m3-h'),0.06);
  eq(convert(1,'g-cm3','kg-m3'),1000);
  assert.throws(()=>convert(1,'oz','us-fl-oz'),/same physical dimension/);
  assert.throws(()=>convert(1,'nm','mm'),/same physical dimension/);
});
test('numeric input safety, malformed values and scientific notation',()=>{
  for(const value of ['', '   ', 'not-a-number', 'NaN','Infinity','1,200',null,undefined,1e19]){
    assert.throws(()=>convert(value,'kg','lbs'),/valid number/);
  }
  eq(convert('1e-3','kg','g'),1);
  eq(convert(-10,'celsius','fahrenheit'),14);
  assert.throws(()=>convert(0,'l-100km','mpg-us'),/greater than zero/);
  assert.throws(()=>convert(-0.0001,'mpg-us','l-100km'),/greater than zero/);
  assert.match(formatNumber(1e-12,9),/e-12/);
  assert.match(formatNumber(1e20,9),/e\+20/);
});
test('seed values can be recalculated without NaN, infinity, or roundtripping drift',()=>{
  for(const s of seeds){
    const p=pairs.find(x=>x.slug===s.slug)||(s.slug==='seconds-to-hours'?{from:'seconds',to:'hours'}:null);
    assert.ok(p, s.url);
    const v=convert(s.value,p.from,p.to);
    assert.ok(Number.isFinite(v),s.url);
    const backward=convert(v,p.to,p.from);
    eq(backward,s.value,1e-8);
  }
});
