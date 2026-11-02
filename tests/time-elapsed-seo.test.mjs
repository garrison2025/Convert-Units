import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {elapsedDurationReadout,units} from '../src/assets/engine.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const timePairs=pairs.filter(p=>units[p.from].dimension==='time');
test('all five existing time direction tools render elapsed durations without 24-hour wrapping',()=>{
 assert.equal(timePairs.length,5);
 for(const pair of timePairs){
  const value=pair.from==='milliseconds'?3600000:pair.from==='seconds'?14400:10000;
  const answer=elapsedDurationReadout(value,pair.from);
  assert.ok(answer,pair.slug);
  assert.ok(/^\d+:\d\d:\d\d(?:\.\d{3})?$/.test(answer.clock),pair.slug);
  assert.ok(!answer.approximate,pair.slug+' integer duration should be exact');
 }
 assert.deepEqual(elapsedDurationReadout(10000,'minutes'),{
  clock:'166:40:00',parts:'166 h 40 min',approximate:false});
 assert.equal(elapsedDurationReadout(14400,'seconds').clock,'4:00:00');
 assert.equal(elapsedDurationReadout(90000,'seconds').clock,'25:00:00');
 assert.equal(elapsedDurationReadout(3600000,'milliseconds').clock,'1:00:00');
 assert.equal(elapsedDurationReadout(3725,'seconds').clock,'1:02:05');
});
test('non-integer time inputs preserve useful milliseconds and label rounding honestly',()=>{
 assert.equal(elapsedDurationReadout(90.5,'minutes').clock,'1:30:30');
 assert.equal(elapsedDurationReadout(1.25,'seconds').clock,'0:00:01.250');
 assert.equal(elapsedDurationReadout(1001,'milliseconds').clock,'0:00:01.001');
 const fraction=elapsedDurationReadout(2.4,'milliseconds');
 assert.equal(fraction.clock,'0:00:00.002');
 assert.equal(fraction.approximate,true);
 assert.equal(elapsedDurationReadout(1,'milliseconds').approximate,false);
 assert.equal(elapsedDurationReadout(0,'minutes').clock,'0:00:00');
});
test('unsafe, invalid, unrelated and unrepresentable inputs never manufacture a clock reading',()=>{
 for(const [value,unit] of [[-1,'minutes'],[NaN,'minutes'],[Infinity,'seconds'],[1,'lbs'],
  [0.1,'milliseconds'],[Number.MAX_SAFE_INTEGER,'seconds']]){
  assert.equal(elapsedDurationReadout(value,unit),null,String(value)+' '+unit);
 }
});
