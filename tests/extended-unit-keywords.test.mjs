import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,dimensions,convert,resolveUnitLabel,convertBatchToCsv,parseBatchTable} from '../src/assets/engine.mjs';
import {keywordExampleHtml,keywordExampleSlugs,keywordExampleDetails} from '../src/keyword-gap-coverage.mjs';
import {extendedUnitHtml,extendedUnitDetails,extendedUnitDimensions} from '../src/category-extended-units.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const rows=fs.readFileSync(new URL('../research/semrush-us-600.tsv',import.meta.url),'utf8').trim().split(/\r?\n/);
const relative=(a,b)=>Math.abs(a-b)<=Math.max(1,Math.abs(b))*1e-11;
test('three added unit pairs use correct factors, round trip and preserve dimensional safety',()=>{
 assert.ok(relative(convert(802,'hpa','mmhg'),802*100/133.3224));
 assert.equal(convert(1,'hpa','pa'),100);
 assert.equal(convert(1,'bar','hpa'),1000);
 assert.ok(relative(convert(760,'mmhg','hpa'),760*133.3224/100));
 assert.equal(convert(1000,'mm3','ml'),1);
 assert.equal(convert(390,'mm3','ml'),0.39);
 assert.equal(convert(1,'ml','mm3'),1000);
 assert.equal(convert(1,'gb','gbit'),8);
 assert.equal(convert(1,'gbit','gb'),0.125);
 assert.equal(convert(1,'gbit','mb'),125);
 assert.equal(resolveUnitLabel('GB'),'gb');
 assert.equal(resolveUnitLabel('Gb'),'gbit');
 assert.equal(resolveUnitLabel('hPa'),'hpa');
 assert.equal(resolveUnitLabel('mmHg'),'mmhg');
 assert.equal(resolveUnitLabel('mm³'),'mm3');
 assert.throws(()=>resolveUnitLabel('gB'),/Ambiguous unit/);
 assert.throws(()=>convert(1,'mm3','mg'),/same physical dimension/);
 for(const [a,b,x] of [['hpa','mmhg',802],['mm3','ml',390],['gb','gbit',1]]){
  const back=convert(convert(x,a,b),b,a);
  assert.ok(relative(back,x),a+' inverse');
 }
 assert.equal(Object.keys(dimensions).length,16);
 assert.equal(pairs.length,38);
 assert.equal(seeds.length,92);
});
test('new unit pairs work in local mixed-unit CSV; Gb stays separate from GB',()=>{
 const table=parseBatchTable('amount,from,to\n1,GB,Gb\n8,Gb,GB\n390,mm³,mL\n1000,hPa,bar',{delimiter:'comma',column:1,maxRows:10});
 const out=convertBatchToCsv(table,'gb','gbit',{fromColumn:2,toColumn:3});
 assert.equal(out.rows.length,4);
 assert.equal(out.rows.filter(x=>x.status==='OK').length,4);
 assert.ok(out.csv.includes('GB'));
});
test('source-documented keyword examples map to real original competitor rows and existing converter tools',()=>{
 assert.equal(keywordExampleSlugs().length,8);
 for(const slug of keywordExampleSlugs()){
  const pair=pairs.find(x=>x.slug===slug),x=keywordExampleDetails(slug);
  assert.ok(pair,slug);
  const original=rows[x.row-1].split('\t');
  assert.equal(original[0].toLowerCase(),x.keyword.toLowerCase(),slug+' input dataset changed');
  assert.match(original[10],/^https:\/\/convert-units\.info\//,slug);
  const html=keywordExampleHtml(pair);
  assert.ok(html.includes('data-keyword-example="'+slug+'"'));
  assert.ok(html.includes(x.answer));
  assert.ok(html.includes(x.href.replaceAll('&','&amp;')));
  assert.ok(html.includes('universal converter'));
  assert.ok(!html.includes('Search volume'));
  assert.ok(!html.includes('ranked #'));
 }
 const mismatch=['lbs-to-kg','kg-to-lbs','m-to-ft'];
 for(const x of mismatch)assert.match(keywordExampleHtml(pairs.find(p=>p.slug===x)),/competitor|observed/i);
});
test('extended existing categories expose real new units, sources and limitations without new pages',()=>{
 assert.deepEqual(extendedUnitDimensions().sort(),['pressure','volume','storage','density'].sort());
 for(const dim of ['pressure','volume','storage']){
  const x=extendedUnitDetails(dim),html=extendedUnitHtml(dim);
  assert.ok(html.includes('data-extended-unit="'+dim+'"'));
  assert.ok(html.includes(x.answer),dim);
  assert.ok(html.includes(x.source),dim);
  assert.ok(html.includes('Try this conversion'),dim);
  assert.equal(units[x.from].dimension,dim);
  assert.equal(units[x.to].dimension,dim);
 }
 const dense=extendedUnitHtml('density');
 assert.ok(dense.includes('density (mg/mL)'));
 assert.ok(dense.includes('2,000 mg'));
 assert.ok(dense.includes('Not from a volume alone'));
 assert.equal(extendedUnitHtml('mass'),'');
});
