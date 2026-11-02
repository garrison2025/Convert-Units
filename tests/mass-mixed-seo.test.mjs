import test from 'node:test';
import assert from 'node:assert/strict';
import {kgAndWholeGrams,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';

test('kilograms + whole grams are rounded from the unrounded mass result',()=>{
 assert.deepEqual(kgAndWholeGrams(convert(149,'lbs','kg')),
   {kilograms:67,grams:585,label:'67 kg 585 g'});
 assert.equal(kgAndWholeGrams(convert(1,'lbs','kg')).label,'0 kg 454 g');
 assert.equal(kgAndWholeGrams(convert(150,'lbs','kg')).label,'68 kg 39 g');
 assert.equal(kgAndWholeGrams(1.9998).label,'2 kg 0 g','remainder must carry to whole kilogram');
 assert.equal(kgAndWholeGrams(0).label,'0 kg 0 g');
 assert.equal(kgAndWholeGrams(999.9999).label,'1,000 kg 0 g');
 for(const bad of [-1,Infinity,NaN])assert.throws(()=>kgAndWholeGrams(bad),RangeError);
});
test('the copy relation uses precise output against its chosen display rounding',()=>{
 const exact=convert(1,'lbs','kg');
 assert.equal(formatNumber(exact,9),'0.45359237');
 assert.equal(displayRelation(exact,formatNumber(exact,9)),'=');
 const displayed=formatNumber(convert(150,'lbs','kg'),2);
 assert.equal(displayed,'68.04');
 assert.equal(displayRelation(convert(150,'lbs','kg'),displayed),'≈');
});
