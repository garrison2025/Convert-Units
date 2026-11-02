import test from 'node:test';
import assert from 'node:assert/strict';
import {units,convert,formatNumber,displayRelation,pressureFourUnitComparison} from '../src/assets/engine.mjs';

test('all four pressure units stay on the same defined physical reference',()=>{
 const rows=pressureFourUnitComparison(50,'kpa');
 assert.deepEqual(rows.map(x=>x.unit),['kpa','psi','bar','atm']);
 assert.equal(rows.find(x=>x.unit==='kpa').relation,'=');
 assert.equal(rows.find(x=>x.unit==='kpa').shown,'50');
 assert.equal(rows.find(x=>x.unit==='bar').shown,'0.5');
 assert.equal(rows.find(x=>x.unit==='bar').relation,'=');
 assert.equal(rows.find(x=>x.unit==='atm').shown,'0.493462');
 assert.equal(rows.find(x=>x.unit==='atm').relation,'≈');
 assert.equal(rows.find(x=>x.unit==='psi').shown,'7.251887');
 assert.equal(rows.find(x=>x.unit==='psi').relation,'≈');
 assert.equal(convert(101.325,'kpa','atm'),1);
 assert.equal(convert(1,'bar','kpa'),100);
 assert.equal(units.atm.factor,101325);
});
test('108kPa to psi has source-calculated six-place results and roundtrip identity',()=>{
 const rows=pressureFourUnitComparison(108,'kpa');
 for(const item of rows){
  assert.equal(item.symbol,units[item.unit].symbol);
  const raw=item.unit==='kpa'?108:convert(108,'kpa',item.unit);
  assert.equal(item.shown,formatNumber(raw,6));
  assert.equal(item.relation,displayRelation(raw,item.shown));
 }
 assert.equal(rows.find(x=>x.unit==='psi').shown,'15.664076');
 const fromPsi=pressureFourUnitComparison(42,'psi');
 assert.equal(fromPsi.find(x=>x.unit==='psi').relation,'=');
 assert.equal(fromPsi.find(x=>x.unit==='psi').shown,'42');
 const fromBar=pressureFourUnitComparison(1,'bar');
 assert.equal(fromBar.find(x=>x.unit==='bar').relation,'=');
 const fromAtm=pressureFourUnitComparison(1,'atm');
 assert.equal(fromAtm.find(x=>x.unit==='atm').relation,'=');
});
test('do not silently add atmospheric pressure to gauge values or reject signed differences',()=>{
 const zero=pressureFourUnitComparison(0,'kpa');
 assert.ok(zero.every(x=>x.shown==='0'&&x.relation==='='));
 const signed=pressureFourUnitComparison(-50,'kpa');
 assert.equal(signed.find(x=>x.unit==='kpa').shown,'-50');
 assert.equal(signed.find(x=>x.unit==='atm').shown,'-0.493462');
 for(const [v,id] of [[NaN,'kpa'],[Infinity,'psi'],[1,'lbs'],[1,'made-up']])
  assert.equal(pressureFourUnitComparison(v,id),null);
});
