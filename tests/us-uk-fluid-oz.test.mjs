import test from 'node:test';
import assert from 'node:assert/strict';
import {convert,fluidOunceComparison,units,displayRelation,formatNumber} from '../src/assets/engine.mjs';
test('US fluid ounce and UK imperial fluid ounce factors are deliberately different',()=>{
 assert.equal(convert(1,'us-fl-oz','ml'),29.5735295625);
 assert.equal(convert(1,'imp-fl-oz','ml'),28.4130625);
 assert.ok(units['imp-fl-oz'].name.startsWith('UK'));
 assert.equal(units['imp-fl-oz'].dimension,'volume');
 assert.ok(convert(1,'imp-fl-oz','us-fl-oz')<1);
});
test('real 355 mL values are correctly distinguished at four decimals',()=>{
 const compared=fluidOunceComparison(355,'ml');
 assert.deepEqual(compared,{us:{shown:'12.004',relation:'≈'},uk:{shown:'12.4943',relation:'≈'}});
 const reverse=fluidOunceComparison(12,'us-fl-oz');
 assert.equal(reverse.us.shown,'12');
 assert.equal(reverse.us.relation,'=');
 assert.equal(reverse.uk.shown,formatNumber(convert(12,'us-fl-oz','imp-fl-oz'),4));
 assert.equal(reverse.uk.relation,displayRelation(convert(12,'us-fl-oz','imp-fl-oz'),reverse.uk.shown));
 assert.equal(fluidOunceComparison(0,'ml').uk.shown,'0');
});
test('source volume validation prevents misleading comparisons',()=>{
 for(const [value,unit] of [[-1,'ml'],[NaN,'ml'],[Infinity,'ml'],[2,'kg'],[2,'fake']])
  assert.equal(fluidOunceComparison(value,unit),null);
});
