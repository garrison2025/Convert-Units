import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {directionalQuickAnswer} from '../src/seo-answer.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
test('all 38 direction pages give a calculated and escaped direct answer, not a fabricated factor',()=>{
 assert.equal(pairs.length,38);
 for(const pair of pairs){
  const html=directionalQuickAnswer(pair);
  const output=convert(1,pair.from,pair.to);
  const format=formatNumber(output,9);
  const expected='1 '+units[pair.from].symbol+' '+displayRelation(output,format)+' '+format+' '+units[pair.to].symbol;
  assert.ok(html.includes(expected),pair.slug+' expected '+expected);
  assert.match(html,/pair-key-fact/);
  assert.match(html,/href="#live-converter"/);
  assert.ok(!html.includes('undefined')&&!html.includes('NaN'),pair.slug);
 }
});
test('rounded and exact direct answers use mathematically honest relationship symbols',()=>{
 const kgToLb=pairs.find(p=>p.slug==='kg-to-lbs');
 const lbsToKg=pairs.find(p=>p.slug==='lbs-to-kg');
 assert.match(directionalQuickAnswer(kgToLb),/1 kg ≈ /);
 assert.match(directionalQuickAnswer(lbsToKg),/1 lb = 0\.45359237 kg/);
 const cToF=pairs.find(p=>p.slug==='celsius-to-fahrenheit');
 assert.match(directionalQuickAnswer(cToF),/1 °C = 33\.8 °F/);
});
