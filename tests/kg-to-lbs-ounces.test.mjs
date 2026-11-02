import test from 'node:test';
import assert from 'node:assert/strict';
import {convert,kgToPoundsOunces,formatNumber,displayRelation} from '../src/assets/engine.mjs';
test('mass-ounces rounding is computed directly from kg and reflects source precision',()=>{
 assert.deepEqual(kgToPoundsOunces(54),
  {pounds:119,ounces:0.8,relation:'≈',label:'119 lb 0.8 oz'});
 assert.deepEqual(kgToPoundsOunces(2.5),
  {pounds:5,ounces:8.2,relation:'≈',label:'5 lb 8.2 oz'});
 assert.equal(kgToPoundsOunces(240).label,'529 lb 1.8 oz');
 assert.equal(kgToPoundsOunces(0).label,'0 lb 0 oz');
 assert.equal(kgToPoundsOunces(0).relation,'=');
 const exactKg=convert(1,'lbs','kg');
 assert.equal(kgToPoundsOunces(exactKg).label,'1 lb 0 oz');
 assert.equal(kgToPoundsOunces(exactKg).relation,'=');
});
test('whole-ounce carry never displays 16 oz or fractional tail beyond one tenth',()=>{
 const nearlyTwoPoundsKg=convert(1.9999,'lbs','kg');
 assert.deepEqual(kgToPoundsOunces(nearlyTwoPoundsKg),{
  pounds:2,ounces:0,relation:'≈',label:'2 lb 0 oz'});
 const closeToSixteenOuncesKg=convert(1.999,'lbs','kg');
 assert.equal(kgToPoundsOunces(closeToSixteenOuncesKg).label,'2 lb 0 oz');
 assert.equal(kgToPoundsOunces(convert(1.5,'lbs','kg')).label,'1 lb 8 oz');
 assert.ok(!kgToPoundsOunces(54).label.includes('000000'));
});
test('mass presentation rejects impossible, negative or unsafe precision values',()=>{
 for(const v of [-1,-0.0001,NaN,Infinity,1.01e12])assert.equal(kgToPoundsOunces(v),null);
 const tiny=kgToPoundsOunces(0.00001);
 assert.equal(tiny.label,'0 lb 0 oz');
 assert.equal(tiny.relation,'≈','too-small nonzero mass must not appear exact');
});
