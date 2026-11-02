import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {units,convert,formatNumber,dimensionUnits} from '../src/assets/engine.mjs';
import {engineeringReference,directionExplanation} from '../src/seo-guides.mjs';

const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url),'utf8'));
const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
const policy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));
const pair=slug=>pairs.find(p=>p.slug===slug);
const near=(actual,want)=>assert.ok(Math.abs(actual-want)<=1e-9*Math.max(1,Math.abs(want)),actual+' should equal '+want);

test('torque adds genuine inch-pound and kilogram-force-meter units without mass/energy confusion',()=>{
 assert.equal(units['in-lbf'].dimension,'torque');
 assert.equal(units['kgf-m'].dimension,'torque');
 assert.equal(units.lbs.dimension,'mass');
 near(convert(100,'ft-lbf','in-lbf'),1200);
 near(convert(400,'ft-lbf','nm'),542.3271793325602);
 near(convert(100,'ft-lbf','kgf-m'),13.8254954376);
 near(convert(100,'nm','ft-lbf'),73.7562149277);
 near(convert(1,'in-lbf','nm'),1.3558179483314004/12);
 assert.equal(dimensionUnits('torque').length,4);
 assert.throws(()=>convert(5,'lbs','in-lbf'),/same physical dimension/);
});

test('length ruler reference uses international-inch exact fractions',()=>{
 const html=engineeringReference(pair('in-to-cm'));
 assert.match(html,/data-engineering-reference="length"/);
 assert.match(html,/1\/16 in/);
 assert.match(html,/1\.5875 mm/);
 assert.match(html,/2\.54 cm/);
 near(convert(17.7,'in','cm'),44.958);
 assert.match(directionExplanation(pair('m-to-ft'),pairs),/Fractional inches to metric lengths/);
});

test('speed engineering reference covers road, nautical and SI without Mach assumptions',()=>{
 const html=directionExplanation(pair('kmh-to-mph'),pairs);
 assert.match(html,/data-engineering-reference="speed"/);
 assert.match(html,/60 mph/);
 assert.match(html,/96\.56064 km\/h/);
 assert.match(html,/26\.8224 m\/s/);
 assert.match(html,/Knots/);
 near(convert(330,'kmh','mph'),205.05249343832044);
});

test('torque engineering reference is a cross-check, not a tightening recommendation',()=>{
 const html=directionExplanation(pair('ft-lbf-to-nm'),pairs);
 assert.match(html,/data-engineering-reference="torque"/);
 assert.match(html,/100 ft·lbf/);
 assert.match(html,/1,200 in·lbf/);
 assert.match(html,/kgf·m/);
 assert.match(html,/manufacturer specification/);
 assert.equal(formatNumber(convert(100,'ft-lbf','nm'),6),'135.581795');
});

test('other categories are unaffected and URL/index policy is exactly the existing pilot',()=>{
 assert.equal(engineeringReference(pair('lbs-to-kg')),'');
 assert.doesNotMatch(directionExplanation(pair('kpa-to-psi'),pairs),/data-engineering-reference=/);
 assert.equal(pairs.length,38);
 assert.equal(seeds.length,92);
 assert.equal(policy.pilotIndexUrls.length,15);
 assert.equal(seeds.length-policy.pilotIndexUrls.length,77);
 for(const slug of ['in-to-cm','kmh-to-mph','ft-lbf-to-nm'])
  assert.ok(policy.pilotIndexUrls.some(url=>url.startsWith('/convert/'+slug+'/')));
});
