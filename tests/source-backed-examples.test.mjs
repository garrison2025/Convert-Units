import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {sourceBackedExamples} from '../src/source-backed-examples.mjs';
import {intentAnswers} from '../src/search-intent.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const pair=slug=>pairs.find(p=>p.slug===slug);

test('source-backed tables use existing 92 verified numeric seeds in at most 5 rows per core tool',()=>{
 assert.equal(pairs.length,38);
 assert.equal(seeds.length,92);
 const covered=new Set(seeds.map(s=>s.slug));
 assert.equal(covered.size,15);
 let withExamples=0;
 for(const p of pairs){
  const html=sourceBackedExamples(p,seeds);
  if(!covered.has(p.slug)){
   assert.equal(html,'','no unsourced examples on '+p.slug);
   continue;
  }
  withExamples++;
  assert.match(html,new RegExp('data-source-backed-examples="'+p.slug+'"'));
  const rows=html.match(/<tr><th scope="row">/g)||[];
  const expected=Math.min(5,new Set(seeds.filter(s=>s.slug===p.slug).map(s=>s.value)).size);
  assert.equal(rows.length,expected,p.slug+' must not duplicate numeric inputs');
  assert.match(html,/aria-label="Worked unit conversion examples"/);
  assert.ok(!html.includes('Semrush'),'No competitor SEO metrics in public page content');
  assert.ok(!html.includes('href="/convert/'+p.slug+'/'),'No links added to noindex numerical pages');
 }
 assert.equal(withExamples,15);
});

test('source-backed examples calculate the real 240 kg and 126 lb results',()=>{
 for(const [slug,keyword] of [['kg-to-lbs','240 kg to lbs'],['lbs-to-kg','126 pounds in kg']]){
  const p=pair(slug),s=seeds.find(x=>x.keyword===keyword);
  assert.ok(s,'The seed must already be in the approved V2 plan');
  const expected=convert(s.value,p.from,p.to);
  const shown=formatNumber(expected,9);
  const relation=displayRelation(expected,shown);
  const html=sourceBackedExamples(p,seeds);
  assert.ok(html.includes('<th scope="row">'+s.valueText+' '+units[p.from].symbol+'</th>'));
  assert.ok(html.includes('<td>'+relation+' '+shown+' '+units[p.to].symbol+'</td>'));
 }
});

test('new generic direction FAQs distinguish force/mass and mechanical/metric horsepower',()=>{
 const kn=intentAnswers(pair('kn-to-lbf'),pairs);
 const hp=intentAnswers(pair('kw-to-hp'),pairs);
 assert.match(kn,/pound-force/);
 assert.match(kn,/unit of force/);
 assert.match(hp,/mechanical horsepower/);
 assert.match(hp,/different defined factors/);
 assert.match(kn,/href="\/universal-converter\/"/);
 assert.match(hp,/href="\/universal-converter\/"/);
 assert.match(kn,/href="\/methodology\/"/);
 assert.match(hp,/href="\/methodology\/"/);
});
