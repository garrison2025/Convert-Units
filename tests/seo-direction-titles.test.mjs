import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units} from '../src/assets/engine.mjs';
import {directionSeoTitle,conciseDirectionTitleSlugs,directionMetaDescription} from '../src/seo-meta.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const curated=new Set(conciseDirectionTitleSlugs);

test('38 directional SEO title strings are unique and exactly nine redundant long titles are shortened',()=>{
 assert.equal(pairs.length,38);
 assert.equal(curated.size,9);
 const actual=new Set();
 for(const p of pairs){
  const title=directionSeoTitle(p)+' | ExactUnit';
  const legacy=p.title+' Converter ('+units[p.from].symbol+' to '+units[p.to].symbol+') | ExactUnit';
  assert.ok(title&&p.title&&title.startsWith(p.title.split(' ')[0]),'missing core direction: '+p.slug);
  assert.ok(title.includes(' | ExactUnit'),'brand separator missing');
  assert.ok(!actual.has(title),'duplicate tool title: '+title);
  actual.add(title);
  if(curated.has(p.slug)){
   assert.ok(legacy.length>60,'must only shorten demonstrably repetitive titles: '+p.slug);
   assert.ok(title.length<legacy.length,'curated title must be shorter: '+p.slug);
   assert.ok(title.length<=60,'curated title should be concise: '+p.slug);
  }else assert.equal(title,legacy,'other metadata must retain the original precise keyword and symbols');
  const desc=directionMetaDescription(p);
  assert.ok(desc.includes(p.title),'meta description still identifies the source/target units: '+p.slug);
 }
 assert.equal(actual.size,38);
});
test('short titles retain the important pair and standard distinctions',()=>{
 const bySlug=slug=>directionSeoTitle(pairs.find(x=>x.slug===slug));
 assert.match(bySlug('ml-to-us-fl-oz'),/US Fluid Ounces.*fl oz/);
 assert.match(bySlug('us-fl-oz-to-ml'),/US Fluid Ounces.*mL/);
 assert.match(bySlug('ft-lbf-to-nm'),/Foot-Pounds.*N·m/);
 assert.match(bySlug('nm-to-ft-lbf'),/Newton-Meters.*ft·lbf/);
 assert.match(bySlug('us-tbsp-to-us-tsp'),/US Tablespoons.*tsp/);
 assert.match(bySlug('mpg-us-to-l-100km'),/US MPG to L\/100 km/);
});
