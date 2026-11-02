import test from 'node:test';
import assert from 'node:assert/strict';
import {convert,temperatureThreeScaleReadout,units} from '../src/assets/engine.mjs';
const find=(rows,id)=>rows.find(x=>x.unit===id);
test('36.6 °C and 37.9 °C results are accurate without binary float phantom rounding',()=>{
 const a=temperatureThreeScaleReadout(36.6,'celsius');
 const b=temperatureThreeScaleReadout(37.9,'celsius');
 assert.deepEqual(a.map(x=>x.unit),['celsius','fahrenheit','kelvin']);
 assert.deepEqual(a.map(x=>x.shown),['36.6','97.88','309.75']);
 assert.deepEqual(b.map(x=>x.shown),['37.9','100.22','311.05']);
 assert.ok(a.every(x=>x.relation==='='));
 assert.ok(b.every(x=>x.relation==='='));
 assert.equal(find(b,'kelvin').symbol,'K');
});
test('scale validation and source identity stay correct on reverse Fahrenheit and Kelvin inputs',()=>{
 const f=temperatureThreeScaleReadout(32,'fahrenheit');
 assert.deepEqual(f.map(x=>x.shown),['0','32','273.15']);
 assert.equal(find(f,'fahrenheit').relation,'=');
 const c=temperatureThreeScaleReadout(-40,'celsius');
 assert.equal(find(c,'fahrenheit').shown,'-40');
 assert.equal(find(c,'kelvin').shown,'233.15');
 const k=temperatureThreeScaleReadout(0,'kelvin');
 assert.deepEqual(k.map(x=>x.shown),['-273.15','-459.67','0']);
 assert.ok(k.every(x=>x.relation==='='));
 assert.equal(units.kelvin.dimension,'temperature');
});
test('temperature changes are not absolute readings: +32 is NOT applied to differences',()=>{
 const c0=convert(20,'celsius','fahrenheit');
 const c1=convert(21,'celsius','fahrenheit');
 assert.ok(Math.abs((c1-c0)-1.8)<1e-12);
 assert.equal(convert(0,'celsius','fahrenheit'),32,'zero absolute Celsius differs from zero Fahrenheit');
 assert.equal(temperatureThreeScaleReadout(-273.16,'celsius'),null);
 assert.equal(temperatureThreeScaleReadout(-1,'kelvin'),null);
 assert.equal(temperatureThreeScaleReadout(-459.68,'fahrenheit'),null);
 for(const [n,id] of [[NaN,'celsius'],[Infinity,'fahrenheit'],[1,'lbs'],[1,'unknown']])
  assert.equal(temperatureThreeScaleReadout(n,id),null);
 const fractional=temperatureThreeScaleReadout(0.123456789,'celsius');
 assert.equal(find(fractional,'celsius').relation,'≈','real rounding to six decimals must be marked approximate');
});
