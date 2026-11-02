import test from 'node:test';import assert from 'node:assert/strict';
import fs from 'node:fs';
import{convert,formatNumber,formula,dimensions,units,validateValue,parseBatchFirstCell,parseBatchLines,parseBatchTable,convertBatchToCsv,escapeCsvCell}from'../src/assets/engine.mjs';
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url)));const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url)));
const eq=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(b)),`${a} != ${b}`);
test('approved full scope',()=>{assert.equal(pairs.length,38);assert.equal(seeds.length,92);assert.equal(new Set(seeds.map(s=>s.url)).size,92);assert.equal(new Set(pairs.map(p=>p.url)).size,38);});
test('mass exact factors',()=>{eq(convert(1,'lbs','kg'),0.45359237,1e-14);eq(convert(240,'kg','lbs'),529.109429243706,1e-9);eq(convert(149,'lbs','kg'),67.58526313,1e-10);eq(convert(1,'oz','g'),28.349523125,1e-12);});
test('length and liquid US/imperial',()=>{eq(convert(1,'ft','m'),.3048);eq(convert(1,'in','cm'),2.54);eq(convert(1,'us-gal','l'),3.785411784);eq(convert(1,'us-fl-oz','ml'),29.5735295625);eq(convert(1,'imp-gal','l'),4.54609);});
test('temperature and absolute zero',()=>{eq(convert(0,'celsius','fahrenheit'),32);eq(convert(100,'celsius','fahrenheit'),212);eq(convert(-40,'celsius','fahrenheit'),-40);eq(convert(273.15,'kelvin','celsius'),0);assert.throws(()=>convert(-274,'celsius','fahrenheit'),/absolute zero/);});
test('pressure, torque, time, speed and force',()=>{eq(convert(1,'bar','kpa'),100);eq(convert(1,'ft-lbf','nm'),1.3558179483314004);eq(convert(3600000,'milliseconds','minutes'),60);eq(convert(10000,'minutes','hours'),166.6666666667);eq(convert(1,'mph','kmh'),1.609344);eq(convert(1,'kn','lbf'),224.80894387096);});
test('fuel reciprocal and impossible inputs',()=>{eq(convert(30,'mpg-us','l-100km'),235.214583/30,1e-6);eq(convert(convert(30,'mpg-us','l-100km'),'l-100km','mpg-us'),30);assert.throws(()=>convert(0,'mpg-us','l-100km'),/greater than zero/);assert.throws(()=>convert(-1,'l-100km','mpg-us'),/greater than zero/);});
test('dimension guard and invalid values',()=>{assert.throws(()=>convert(1,'kg','ml'),/same physical dimension/);assert.throws(()=>convert('bad','kg','lbs'),/valid number/);assert.throws(()=>convert(1e22,'kg','lbs'),/valid number/);});
test('all paired routes use correct dimension',()=>{for(const p of pairs){assert.equal(units[p.from].dimension,units[p.to].dimension,p.slug);assert.ok(Number.isFinite(convert(1,p.from,p.to)),p.slug);}});
test('all approved result URLs are accurate and map to defined tools',()=>{for(const s of seeds){const p=pairs.find(p=>p.slug===s.slug);assert.ok(p,s.url);assert.equal(s.url,`/convert/${s.slug}/${s.valueText}/`);assert.ok(Number.isFinite(convert(s.value,p.from,p.to)),s.url);}});
test('reasonable formatting',()=>{assert.equal(formatNumber(12.3456,2),'12.35');assert.equal(formatNumber(0,6),'0');});

test('production input and CSV safeguards',()=>{
 assert.throws(()=>convert('  ','lbs','kg'),/valid number/);
 assert.throws(()=>convert('\n','kg','lbs'),/valid number/);
 assert.match(formatNumber(1e20,4),/e\+20/);
 assert.equal(parseBatchFirstCell('149,unused'),'149');
 assert.equal(parseBatchFirstCell('"1,200",note'),'1200');
 assert.equal(parseBatchFirstCell('\uFEFFvalue,result'),'value');
 assert.equal(parseBatchFirstCell('-14.5'),'-14.5');
 assert.throws(()=>parseBatchFirstCell('"not closed,3'),/Malformed/);
});

test('reciprocal roundtrips for every configured direction and representative scale',()=>{
  for(const p of pairs){
    for(const value of [0.01,1,137.25,1e8]){
      const original=p.from==='mpg-us'?Math.max(value,0.01):value;
      const converted=convert(original,p.from,p.to);
      const reversed=convert(converted,p.to,p.from);
      eq(reversed,original,1e-8);
      assert.ok(Number.isFinite(converted),p.slug+' : '+value);
    }
  }
});
test('absolute zero offsets and invalid negative thermodynamic temperatures',()=>{
  eq(convert(0,'kelvin','fahrenheit'),-459.67,1e-9);
  eq(convert(-459.67,'fahrenheit','kelvin'),0,1e-9);
  assert.throws(()=>convert(-1,'kelvin','celsius'),/absolute zero/);
  assert.throws(()=>convert(-459.68,'fahrenheit','celsius'),/absolute zero/);
});
test('storage, cooking, area, flow and density do not mix up physical definitions',()=>{
  eq(convert(1,'gb','mb'),1000);
  eq(convert(1,'gib','mib'),1024);
  eq(convert(1,'us-tbsp','us-tsp'),3);
  eq(convert(1,'us-cup','ml'),236.5882365);
  eq(convert(1,'m2','ft2'),10.76391041670972);
  eq(convert(1,'l-min','m3-h'),0.06);
  eq(convert(1,'g-cm3','kg-m3'),1000);
  assert.throws(()=>convert(1,'oz','us-fl-oz'),/same physical dimension/);
  assert.throws(()=>convert(1,'nm','mm'),/same physical dimension/);
});
test('numeric input safety, malformed values and scientific notation',()=>{
  for(const value of ['', '   ', 'not-a-number', 'NaN','Infinity','1,200','0x10','0b101','0o10','1_000','1e','1.2.3',true,[],null,undefined,1e19]){
    assert.throws(()=>convert(value,'kg','lbs'),/valid number/);
  }
  eq(convert('1e-3','kg','g'),1);
  eq(convert(-10,'celsius','fahrenheit'),14);
  assert.throws(()=>convert(0,'l-100km','mpg-us'),/greater than zero/);
  assert.throws(()=>convert(-0.0001,'mpg-us','l-100km'),/greater than zero/);
  assert.match(formatNumber(1e-12,9),/e-12/);
  assert.match(formatNumber(1e20,9),/e\+20/);
});
test('seed values can be recalculated without NaN, infinity, or roundtripping drift',()=>{
  for(const s of seeds){
    const p=pairs.find(x=>x.slug===s.slug);
    assert.ok(p, s.url);
    const v=convert(s.value,p.from,p.to);
    assert.ok(Number.isFinite(v),s.url);
    const backward=convert(v,p.to,p.from);
    eq(backward,s.value,1e-8);
  }
});

test('displayed formulas distinguish exact division from rounded factors',()=>{
  assert.equal(formula('seconds','hours'),'Divide s by 3,600 to get hr.');
  assert.equal(formula('minutes','hours'),'Divide min by 60 to get hr.');
  assert.equal(formula('lbs','kg'),'Multiply lb by 0.45359237 to get kg.');
  assert.match(formula('ft-lbf','nm'),/approximately/);
});


test('numeric inputs accept decimal/scientific notation but reject JavaScript coercion',()=>{
 for(const [literal,expected] of [['.5',0.5],['1.',1],['-0.5',-0.5],['+2.5e+2',250],['1e-6',1e-6],[' 12.30 ',12.3]])eq(validateValue(literal),expected,1e-12);
 for(const invalid of ['0x10','0b11','0o11','1_000','1,000','--2','1e','+','.',true,false,[],{},'0 Infinity']){
  assert.throws(()=>validateValue(invalid),/valid number/,String(invalid));
 }
});

test('malformed first CSV row is processed as an error row, never a batch crash',()=>{
 assert.deepEqual(parseBatchLines('value,result\n149\n126'),['149','126']);
 assert.deepEqual(parseBatchLines('"not closed,3\n149'),['"not closed,3','149']);
 assert.deepEqual(parseBatchLines('input\n'),[]);
 assert.deepEqual(parseBatchLines('   '),[]);
 assert.deepEqual(parseBatchLines('\uFEFFvalue,result\r\n149\r\n126'),['149','126']);
 assert.throws(()=>parseBatchLines('1\n2\n3',2),/Maximum 2 data rows/);
});


test('nonzero microscopic inputs are rejected rather than rounded down to zero',()=>{
 for(const x of ['1e-400','-1e-400','0.0001e-999']){
  assert.throws(()=>convert(x,'kg','g'),/below supported numerical precision/);
 }
 assert.equal(convert('0e-400','kg','g'),0);
});


test('exported CSV escapes spreadsheet formulas but preserves real negative numbers',()=>{
 assert.equal(escapeCsvCell('-12.5'),'-12.5');
 assert.equal(escapeCsvCell('-1e-3'),'-1e-3');
 assert.equal(escapeCsvCell('=1+1'),"'=1+1");
 assert.equal(escapeCsvCell('  =1+1'),"'  =1+1");
 assert.equal(escapeCsvCell('@SUM(1,1)'),"\"'@SUM(1,1)\"");
 assert.equal(escapeCsvCell('-SUM(1,1)'),"\"'-SUM(1,1)\"");
 assert.equal(escapeCsvCell('"1,200"'),'"\"\"1,200\"\""');
});


test('real CSV and spreadsheet batches: selected column, quoted thousands and source line numbers',()=>{
 const c=parseBatchTable('name,value,notes\nshirt,"1,200",item\nbag,149,item',{column:2});
 assert.equal(c.delimiter,'comma');
 assert.equal(c.headerSkipped,true);
 assert.deepEqual(c.rows.map(r=>({line:r.line,value:r.value,error:r.error})),[
  {line:2,value:'1200',error:null},{line:3,value:'149',error:null}
 ]);
 eq(convert(c.rows[0].value,'lbs','kg'),544.310844);
 const t=parseBatchTable('name\tvalue\napple\t2.5\npear\t-1.2',{column:2});
 assert.equal(t.delimiter,'tab');assert.deepEqual(t.rows.map(r=>r.value),['2.5','-1.2']);
 const semi=parseBatchTable('key;number;note\nx;48.5;ok',{column:2});
 assert.equal(semi.delimiter,'semicolon');assert.equal(semi.rows[0].value,'48.5');
});

test('batch parser retains errors on individual rows without dropping subsequent valid values',()=>{
 const d=parseBatchTable('Value,Note\n10,ok\n"bad,quote\n25,ok',{delimiter:'comma'});
 assert.equal(d.headerSkipped,true);
 assert.equal(d.rows.length,3);
 assert.equal(d.rows[0].value,'10');
 assert.match(d.rows[1].error,/Unclosed/);
 assert.equal(d.rows[2].value,'25');
 assert.deepEqual(d.rows.map(r=>r.line),[2,3,4]);
 const missing=parseBatchTable('1\n2,3',{column:2,delimiter:'comma'});
 assert.match(missing.rows[0].error,/Column 2 is missing/);
 assert.equal(missing.rows[1].value,'3');
});

test('auto delimiter does not truncate standalone thousands-grouped measurements',()=>{
 const a=parseBatchTable('1,200\n2,500');
 assert.equal(a.delimiter,'lines');
 assert.deepEqual(a.rows.map(r=>r.value),['1200','2500']);
 const q=parseBatchTable('"1,200"\n"3,400"');
 assert.deepEqual(q.rows.map(r=>r.value),['1200','3400']);
});

test('batch limits, header and tabular input validation',()=>{
 assert.deepEqual(parseBatchTable(''),{rows:[],delimiter:'lines',headerSkipped:false,headerCells:null});
 assert.throws(()=>parseBatchTable('3',{column:21}),/Choose an input column/);
 assert.throws(()=>parseBatchTable('3',{column:0}),/Choose an input column/);
 assert.throws(()=>parseBatchTable('3',{delimiter:'pipe'}),/Unknown file delimiter/);
 assert.throws(()=>parseBatchTable('3\n4\n5',{maxRows:2}),/Maximum 2/);
 const valid=parseBatchTable('Value\n0\n-12.5');
 assert.equal(valid.rows.length,2);
});

test('browser entry script imports the same tested CSV batch implementation it invokes',()=>{
 const source=fs.readFileSync(new URL('../src/assets/app.mjs',import.meta.url),'utf8');
 assert.match(source,/import\s*\{[^}]*parseBatchTable[^}]*\}\s*from\s*['"]\.\/engine\.mjs['"]/);
 assert.match(source,/parseBatchTable\(values\.value/);
 assert.match(source,/data-batch-column/);
 assert.match(source,/data-batch-delimiter/);
});


test('auto CSV does not silently truncate decimal-comma values',()=>{
 for(const input of ['1,5\n2,5','Value\n1,5\n2,5','12,34\n56,78']){
  assert.throws(()=>parseBatchTable(input),/Ambiguous comma-separated numbers/);
 }
 const explicit=parseBatchTable('1,5\n2,5',{delimiter:'comma',column:2});
 assert.deepEqual(explicit.rows.map(r=>r.value),['5','5']);
 const thousand=parseBatchTable('1,200\n2,500');
 assert.deepEqual(thousand.rows.map(r=>r.value),['1200','2500']);
});
test('CSV with a recognized value header rejects ragged rows rather than mis-converting truncated cells',()=>{
 const tab=parseBatchTable('name,value,note\nshirt,149,ok\nbag,1,5\nhat,126,ok',{column:2,delimiter:'comma'});
 assert.equal(tab.headerSkipped,true);
 assert.equal(tab.rows[0].value,'149');
 assert.equal(tab.rows[1].value,'1'); // The file has three valid CSV columns; column 2 is explicitly selected.
 assert.equal(tab.rows[2].value,'126');
 const ragged=parseBatchTable('name,value\nshirt,149,unexpected\ncap,126',{column:2,delimiter:'comma'});
 assert.match(ragged.rows[0].error,/Expected 2 CSV columns, found 3/);
 assert.equal(ragged.rows[1].value,'126');
});


test('spreadsheet CSV export preserves original columns, headers, quoted commas and real results',()=>{
 const table=parseBatchTable('item,value,notes\nshirt,"1,200","red, heavy"\nbag,149,ok',{column:2});
 assert.equal(table.headerSkipped,true);
 assert.deepEqual(table.headerCells,['item','value','notes']);
 const result=convertBatchToCsv(table,'lbs','kg');
 assert.equal(result.converted,2);
 assert.deepEqual(result.invalid,[]);
 assert.equal(result.preservedColumns,3);
 assert.equal(result.headerPreserved,true);
 const lines=result.csv.split('\r\n');
 assert.equal(lines.length,3);
 assert.equal(lines[0],'item,value,notes,ExactUnit line,ExactUnit result,ExactUnit from,ExactUnit to,ExactUnit status');
 assert.match(lines[1],/^shirt,"1,200","red, heavy",2,544\.310844,lb,kg,OK$/);
 assert.match(lines[2],/^bag,149,ok,3,67\.58526313,lb,kg,OK$/);
});

test('CSV export keeps malformed input rows and continues converting subsequent valid rows',()=>{
 const table=parseBatchTable('name,value,note\nshirt,149,ok\nbag,not-a-number,=HYPERLINK()\ncap,126,ok\ntruncated,125',{column:2,delimiter:'comma'});
 assert.equal(table.headerSkipped,true);
 const result=convertBatchToCsv(table,'lbs','kg');
 assert.equal(result.converted,2);
 assert.deepEqual(result.invalid,[3,5]);
 const lines=result.csv.split('\r\n');
 assert.match(lines[1],/^shirt,149,ok,2,67\.58526313,lb,kg,OK$/);
 assert.ok(lines[2].includes("'=HYPERLINK()"),'Formula-like user cells must be escaped when exporting');
 assert.ok(lines[2].includes('not-a-number'),'The source value must survive failed conversion');
 assert.ok(lines[4].startsWith('truncated,125,,5,'));
 assert.ok(lines[4].includes('Expected 3 CSV columns'));
});

test('CSV output retains TSV source columns and names missing headings for headerless inputs',()=>{
 const tab=parseBatchTable('sku\tvalue\tref\nx\t2.5\tAB\nz\t-1.2\tCD',{column:2,delimiter:'tab'});
 const converted=convertBatchToCsv(tab,'kg','g');
 assert.equal(converted.preservedColumns,3);
 assert.match(converted.csv,/sku,value,ref,ExactUnit line/);
 assert.match(converted.csv,/x,2\.5,AB,2,2500,kg,g,OK/);
 assert.match(converted.csv,/z,-1\.2,CD,3,-1200,kg,g,OK/);
 assert.ok(!converted.csv.includes('\"-1,200\"'),'Negative output must remain a spreadsheet number, not grouped display text');
 const plain=convertBatchToCsv(parseBatchTable('149\n126'),'lbs','kg');
 assert.equal(plain.preservedColumns,1);
 assert.match(plain.csv,/^Column 1,ExactUnit line,ExactUnit result/);
 assert.match(plain.csv,/149,1,67\.58526313,lb,kg,OK/);
 assert.throws(()=>convertBatchToCsv(tab,'lbs','seconds'),/compatible units/);
});
