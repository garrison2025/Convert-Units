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

test('inch ruler source reference preserves exact international fractions',()=>{
 const inch=engineeringReference(pair('in-to-cm'));
 const mm=engineeringReference(pair('in-to-mm'));
 for(const html of [inch,mm]){
  assert.match(html,/data-engineering-reference="length"/);
  assert.match(html,/data-engineering-source="in"/);
  assert.match(html,/1\/16 in/);
  assert.match(html,/1\.5875 mm/);
  assert.match(html,/2\.54 cm/);
 }
 near(convert(17.7,'in','cm'),44.958);
});

test('metric and imperial length references actually follow page source unit',()=>{
 const meters=engineeringReference(pair('m-to-ft'));
 assert.match(meters,/data-engineering-source="m"/);
 assert.match(meters,/Meters to feet and fractional inches/);
 assert.match(meters,/1\.75 m/);
 assert.match(meters,/5 ft 8 7\/8 in/);
 assert.doesNotMatch(meters,/Fractional inches to metric lengths/);
 const feet=engineeringReference(pair('ft-to-m'));
 assert.match(feet,/data-engineering-source="ft"/);
 assert.match(feet,/Feet to meters and centimeters/);
 assert.match(feet,/5\.5 ft/);
 assert.match(feet,/1\.6764 m/);
 const cm=engineeringReference(pair('cm-to-in'));
 assert.match(cm,/data-engineering-source="cm"/);
 assert.match(cm,/Centimeters to decimal and fractional inches/);
 assert.match(cm,/2\.54 cm/);
 assert.match(cm,/1 in/);
 assert.notEqual(meters,feet);
 assert.notEqual(feet,cm);
});

test('speed engineering reference follows km/h versus mph page direction',()=>{
 const metric=engineeringReference(pair('kmh-to-mph'));
 assert.match(metric,/data-engineering-source="kmh"/);
 assert.match(metric,/100 km\/h across four speed units/);
 assert.match(metric,/62\.137119 mph/);
 const imperial=engineeringReference(pair('mph-to-kmh'));
 assert.match(imperial,/data-engineering-source="mph"/);
 assert.match(imperial,/60 mph across four speed units/);
 assert.match(imperial,/96\.56064 km\/h/);
 assert.match(imperial,/26\.8224 m\/s/);
 assert.match(imperial,/Knots/);
 assert.notEqual(metric,imperial);
 near(convert(330,'kmh','mph'),205.05249343832044);
});

test('torque references use the right source and never imply tightening specifications',()=>{
 const imperial=engineeringReference(pair('ft-lbf-to-nm'));
 assert.match(imperial,/data-engineering-reference="torque"/);
 assert.match(imperial,/100 foot-pound-force in other torque units/);
 assert.match(imperial,/1,200 in·lbf/);
 assert.match(imperial,/manufacturer specification/);
 const metric=engineeringReference(pair('nm-to-ft-lbf'));
 assert.match(metric,/data-engineering-source="nm"/);
 assert.match(metric,/100 newton-meters in other torque units/);
 assert.match(metric,/73\.756215 ft·lbf/);
 assert.match(metric,/manufacturer specification/);
 assert.notEqual(metric,imperial);
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
