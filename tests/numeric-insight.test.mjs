import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,convert,formatNumber,displayRelation} from '../src/assets/engine.mjs';
import {numericInsight,numericInsightUrls} from '../src/numeric-insight.mjs';

const read=p=>JSON.parse(fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'));
const pairs=read('src/data/pairs.json'),seeds=read('src/data/seeds.json'),policy=read('src/data/numeric-seo-policy.json');
const bySlug=new Map(pairs.map(p=>[p.slug,p]));
test('exact 15 vetted URL checks and 77 held numeric pages; no new URL or index decision',()=>{
 assert.equal(pairs.length,38);assert.equal(seeds.length,92);
 assert.equal(policy.pilotIndexUrls.length,15);
 assert.deepEqual([...numericInsightUrls].sort(),[...policy.pilotIndexUrls].sort());
 let supported=0;
 for(const seed of seeds){
  const result=numericInsight(seed,bySlug.get(seed.slug));
  const eligible=policy.pilotIndexUrls.includes(seed.url);
  if(!eligible){assert.equal(result,'','no decorative paragraphs on held value pages: '+seed.url);continue;}
  supported++;
  assert.ok(result.includes('data-numeric-intent-check="'+seed.url+'"'),seed.url);
  assert.ok(result.includes('Cross-check '+seed.valueText+' '+units[bySlug.get(seed.slug).from].symbol),seed.url);
  const hits=[...result.matchAll(/class="numeric-insight-value"/g)].length;
  assert.equal(hits,seed.slug==='celsius-to-fahrenheit'?2:3,'related unit display count '+seed.url);
  assert.ok(result.includes('href="'+bySlug.get(seed.slug).url+'"'),'parent link '+seed.url);
  assert.ok(!/href="\/convert\/[^"]+\/\d+(?:\.\d+)?\/"/.test(result),'no numeric long-tail page links');
  assert.ok(!/Volume|monthly visits|indexed|rank #|AdSense/.test(result),'no invented SEO or ad claims');
 }
 assert.equal(supported,15);
});
test('value-specific arithmetic and real convention distinctions are derived from the unit engine',()=>{
 const check=slug=>{const seed=seeds.find(s=>s.slug===slug&&policy.pilotIndexUrls.includes(s.url));return numericInsight(seed,bySlug.get(slug));};
 const kg=check('kg-to-lbs');
 assert.ok(kg.includes(formatNumber(convert(240,'kg','lbs'),9)),'240 kg to pounds');
 assert.ok(kg.includes('8,465.750867899'),'mass ounces are not liquid ounces');
 const torque=check('ft-lbf-to-nm');
 assert.ok(torque.includes('4,800')&&torque.includes('in·lbf'),'400 ft-lbf maps to 4800 inch-lbf');
 const temperature=check('celsius-to-fahrenheit');
 assert.ok(temperature.includes('100.22')&&temperature.includes('311.05')&&temperature.includes('68.22 °F'),'temperature offset is separated from interval');
 const duration=check('minutes-to-hours');
 assert.ok(duration.includes('6 days, 22 hours, 40 minutes'),'10000 min is 6d 22h 40m');
 assert.ok(check('milliseconds-to-minutes').includes('1 hour'),'3.6 million ms is one hour');
 const fluid=check('ml-to-us-fl-oz');
 assert.ok(fluid.includes('UK imperial fluid ounces')&&fluid.includes('US fluid ounces'),'355mL in both incompatible fluid ounce standards');
 assert.ok(check('kmh-to-mph').includes('Knots (nautical miles per hour)'),'statute vs nautical speed');
 const pressure=check('kpa-to-psi');
 assert.ok(pressure.includes('Gauge versus absolute pressure'),'gauge assumption explicitly prohibited');
});
