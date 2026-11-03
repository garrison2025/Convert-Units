import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {relatedNumericAnswers,relatedNumericAnswersHtml} from '../src/seo-related-values.mjs';
import {units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const bySlug=new Map(pairs.map(x=>[x.slug,x]));

test('92 published numerical pages can link only to real same-direction siblings',()=>{
 for(const seed of seeds){
  const pair=bySlug.get(seed.slug);
  assert.ok(pair,'every numeric source must belong to an actual converter');
  const candidates=seeds.filter(x=>x.slug===seed.slug&&x.url!==seed.url);
  const actual=relatedNumericAnswers(seed,pair,seeds);
  assert.equal(actual.length,Math.min(4,candidates.length),seed.url);
  assert.equal(new Set(actual.map(x=>x.url)).size,actual.length);
  assert.ok(actual.every(x=>x.url!==seed.url&&x.slug===seed.slug),'no self links or mixed units');
  const expected=candidates.sort((a,b)=>Math.abs(a.value-seed.value)-Math.abs(b.value-seed.value)||
    a.value-b.value||a.url.localeCompare(b.url)).slice(0,4);
  assert.deepEqual(actual.map(x=>x.url),expected.map(x=>x.url),'nearest conversions must be deterministic');
  for(const item of actual){
    const target=seeds.find(x=>x.url===item.url);
    const raw=convert(target.value,pair.from,pair.to);
    assert.equal(item.output,formatNumber(raw,6));
    assert.equal(item.relation,displayRelation(raw,item.output));
    assert.equal(item.from,units[pair.from].symbol);
    assert.equal(item.to,units[pair.to].symbol);
  }
  const html=relatedNumericAnswersHtml(seed,pair,seeds);
  if(actual.length){
    assert.ok(html.includes('Other values in this conversion'));
    assert.equal((html.match(/class="chip"/g)||[]).length,actual.length);
    for(const a of actual)assert.ok(html.includes('href="'+a.url+'"'));
  }else assert.equal(html,'');
 }
});

test('links are bounded and cannot invent a number, route, or search volume',()=>{
 const seed=seeds.find(s=>s.slug==='lbs-to-kg');
 const pair=bySlug.get(seed.slug);
 assert.throws(()=>relatedNumericAnswers(seed,pair,seeds,9),/limit/);
 assert.throws(()=>relatedNumericAnswers(seed,{...pair,slug:'kg-to-lbs'},seeds),/match/);
 const html=relatedNumericAnswersHtml(seed,pair,seeds);
 assert.ok(!/volumeUS|monthly searches|KD|rankings|semrush/i.test(html));
});
