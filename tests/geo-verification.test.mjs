import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,dimensions,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {geoVerificationFacts,geoVerificationHtml,geoProvenanceDimensions} from '../src/geo-verification.mjs';
import {categoryDecisionHtml,categoryDecisionDimensions} from '../src/category-seo.mjs';
import {llmsDirectory} from '../src/llms-directory.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
test('38 real converter directions have source-linked, reproducible results and scope',()=>{
 assert.equal(pairs.length,38);
 assert.deepEqual(geoProvenanceDimensions().sort(),Object.keys(dimensions).sort());
 for(const pair of pairs){
  const f=geoVerificationFacts(pair),markup=geoVerificationHtml(pair);
  const output=convert(f.n,pair.from,pair.to),shown=formatNumber(output,9);
  assert.equal(f.shown,shown,pair.slug);
  assert.equal(f.relation,displayRelation(output,shown),pair.slug);
  assert.equal(f.dim,units[pair.from].dimension,pair.slug);
  assert.ok(markup.includes('data-geo-verification="'+pair.slug+'"'),pair.slug);
  assert.ok(markup.includes(esc(f.rule)),pair.slug);
  assert.ok(markup.includes(f.sourceUrl)&&
   /^https:\/\/(www\.nist\.gov|www\.bipm\.org|webstore\.iec\.ch)\//.test(f.sourceUrl),pair.slug);
  assert.ok(markup.includes('has not tested or certified this website'),pair.slug);
  assert.ok(markup.includes('Use the right convention'),pair.slug);
  if(f.dim==='temperature'||f.dim==='fuel')assert.equal(f.proof.length,0,pair.slug);
  else {
    assert.equal(f.proof.length,2,pair.slug);
    assert.ok(markup.includes('Trace the units'),pair.slug);
  }
 }
});
test('16 categorization decisions are distinct, actionable and link to real tool directions',()=>{
 assert.deepEqual(categoryDecisionDimensions().sort(),Object.keys(dimensions).sort());
 const headings=new Set();
 for(const dim of Object.keys(dimensions)){
  const s=categoryDecisionHtml(dim,pairs);
  assert.ok(s.includes('data-category-decision="'+dim+'"'));
  const heading=s.match(/<h2>([^<]+)<\/h2>/)?.[1];assert.ok(heading&&!headings.has(heading));
  headings.add(heading);
  const routes=[...s.matchAll(/<li><a href="([^"]+)">/g)].map(x=>x[1]);
  assert.ok(routes.length>=1&&routes.length<=2,dim);
  for(const route of routes)assert.ok(pairs.some(p=>p.url===route&&units[p.from].dimension===dim),dim+': '+route);
  assert.ok(!s.includes('Accurate calculations, no guesswork'));
 }
});
test('llms index is generated strictly from 38 tools and 16 categories',()=>{
 const md=llmsDirectory(pairs,Object.keys(dimensions).map(id=>({id})));
 assert.equal((md.match(/https:\/\/convertunits\.cc\/convert\//g)||[]).length,38);
 assert.equal((md.match(/https:\/\/convertunits\.cc\/category\//g)||[]).length,16);
 assert.ok(md.includes('/methodology/#verified-conversion-facts'));
 assert.ok(md.includes('/sitemap.xml'));
 assert.ok(!md.includes('.pages.dev'));
 assert.throws(()=>llmsDirectory(pairs.slice(1),Object.keys(dimensions).map(id=>({id}))),/38 tools/);
});
