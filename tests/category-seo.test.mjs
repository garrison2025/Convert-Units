import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,dimensions,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {categoryMetaDescription,categoryConversionExamples} from '../src/category-seo.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
test('all 16 indexable category pages have accurate unique and readable descriptions',()=>{
 const descriptions=new Set();
 assert.equal(Object.keys(dimensions).length,16);
 for(const dim of Object.keys(dimensions)){
  const desc=categoryMetaDescription(dim);
  assert.ok(desc.length>=75&&desc.length<=190,dim+': description length '+desc.length);
  assert.ok(!descriptions.has(desc),'repeated category boilerplate: '+dim);
  assert.ok(!/SEO|high.volume|best.rated|most.popular|guaranteed/i.test(desc),dim);
  descriptions.add(desc);
 }
 assert.equal(descriptions.size,16);
 assert.throws(()=>categoryMetaDescription('unknown'),/Unknown/);
});
test('16 category pages give genuine static numeric examples linking only to valid canonical converter tools',()=>{
 let total=0;
 for(const dim of Object.keys(dimensions)){
  const markup=categoryConversionExamples(dim,pairs);
  assert.match(markup,/class="card category-conversion-examples"/);
  assert.match(markup,/Results marked ≈ are rounded for display/);
  const matches=[...markup.matchAll(/<li><a href="([^"]+)">([^<]+)<\/a><strong>([^<]+)<\/strong><\/li>/g)];
  assert.ok(matches.length>=1&&matches.length<=3,dim+' missing or excessive examples');
  const usedDirections=new Set();
  for(const m of matches){
   total++;
   const pair=pairs.find(p=>p.url===m[1]);
   assert.ok(pair,dim+': referenced a non-existent or numeric-noindex URL '+m[1]);
   assert.equal(units[pair.from].dimension,dim);
   assert.equal(units[pair.to].dimension,dim);
   assert.equal(m[2].replaceAll('&amp;','&'),pair.title);
   const n={temperature:20,time:60,speed:100,fuel:30}[dim]??1;
   const result=convert(n,pair.from,pair.to);
   const shown=formatNumber(result,9);
   const expected=n+' '+units[pair.from].symbol+' '+
     displayRelation(result,shown)+' '+shown+' '+units[pair.to].symbol;
   assert.equal(m[3],expected,dim+' formula result drift');
   const key=[pair.from,pair.to].sort().join(':');
   assert.ok(!usedDirections.has(key),dim+': reverse pairs should not waste examples');
   usedDirections.add(key);
  }
 }
 assert.ok(total>=25,'expect meaningful variety across all measurement categories');
 const mass=categoryConversionExamples('mass',pairs);
 assert.match(mass,/1 lb = 0\.45359237 kg/);
 const temp=categoryConversionExamples('temperature',pairs);
 assert.match(temp,/20 °C = 68 °F/);
 const time=categoryConversionExamples('time',pairs);
 assert.match(time,/60 min = 1 hr/);
 assert.throws(()=>categoryConversionExamples('not-real',pairs),/Unknown/);
});
