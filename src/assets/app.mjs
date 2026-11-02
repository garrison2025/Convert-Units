import {units,convert,formatNumber,formula,dimensionUnits,validateValue,parseBatchTable,convertBatchToCsv,displayRelation,kgAndWholeGrams,elapsedDurationReadout,fluidOunceComparison,pressureFourUnitComparison,kgToPoundsOunces,temperatureThreeScaleReadout,feetInchesReadout,torqueFourUnitComparison} from './engine.mjs';
const el=(s,root=document)=>root.querySelector(s);
const all=(s,root=document)=>[...root.querySelectorAll(s)];
const fmt=(x,d=6)=>formatNumber(x,d);
function options(dimension,active){return dimensionUnits(dimension).map(u=>`<option value="${u.id}" ${u.id===active?'selected':''}>${u.symbol}</option>`).join('');}
function download(filename,text,type='text/csv;charset=utf-8'){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);}
function initConverter(root){const from=el('[data-from]',root),to=el('[data-to]',root),input=el('[data-value]',root),output=el('[data-output]',root),explain=el('[data-explain]',root),error=el('[data-error]',root),precision=el('[data-precision]',root),detail=el('[data-raw]',root),multi=el('[data-multi-results]',root),actionStatus=el('[data-action-status]',root),directionLabel=el('[data-direction-label]',root),outputNumber=el('[data-output-number]',root),outputUnit=el('[data-output-unit]',root),mixedKg=el('[data-mixed-kg]',root),mixedKgResult=el('[data-mixed-kg-result]',root),elapsed=el('[data-elapsed-duration]',root),elapsedClock=el('[data-elapsed-clock]',root),elapsedWords=el('[data-elapsed-words]',root),elapsedNote=el('[data-elapsed-note]',root),fluidPanel=el('[data-fluid-oz-compare]',root),fluidUS=el('[data-fluid-us]',root),fluidUK=el('[data-fluid-uk]',root),pressurePanel=el('[data-pressure-summary]',root),pressureUnits=el('[data-pressure-units]',root),imperialMass=el('[data-lb-oz-readout]',root),imperialMassValue=el('[data-lb-oz-result]',root),temperaturePanel=el('[data-temperature-triple]',root),temperatureValues=el('[data-temperature-values]',root),feetPanel=el('[data-feet-inches]',root),feetDecimal=el('[data-feet-decimal]',root),feetFraction=el('[data-feet-fraction]',root),torquePanel=el('[data-torque-summary]',root),torqueUnits=el('[data-torque-units]',root);if(!from||!to||!input)return;
let last=0;let initialFrom=from.value, initialTo=to.value;const initialValue=input.value;
const setUnits=(dimension,newFrom,newTo)=>{if(from.dataset.lock==='true')return;from.innerHTML=options(dimension,newFrom);to.innerHTML=options(dimension,newTo);};
function calculate(){if(actionStatus)actionStatus.textContent='';if(directionLabel)directionLabel.textContent=units[from.value].name+' → '+units[to.value].name;try{const n=validateValue(input.value),result=convert(n,from.value,to.value);last=result;const decimals=Number(precision?.value??6);if(outputNumber&&outputUnit){outputNumber.textContent=fmt(result,decimals);outputUnit.textContent=units[to.value].symbol;}else output.textContent=fmt(result,decimals)+' '+units[to.value].symbol;output.setAttribute('aria-label',`Result: ${fmt(result,decimals)} ${units[to.value].name}`);if(detail){const precise=fmt(result,Math.max(decimals,9));const relation=displayRelation(result,precise);detail.textContent=`${n} ${units[from.value].symbol} ${relation==='='?'equals':'is approximately'} ${precise} ${units[to.value].symbol}`;}
if(mixedKg){const active=from.value==='lbs'&&to.value==='kg'&&result>=0;
 mixedKg.hidden=!active;if(active&&mixedKgResult)mixedKgResult.textContent='≈ '+kgAndWholeGrams(result).label;}
if(imperialMass){
 const mixed=from.value==='kg'&&to.value==='lbs'?kgToPoundsOunces(n):null;
 imperialMass.hidden=!mixed;
 if(mixed&&imperialMassValue)imperialMassValue.textContent=mixed.relation+' '+mixed.label;
}
if(feetPanel){
 const mixed=feetInchesReadout(n,from.value);
 feetPanel.hidden=!mixed;
 if(mixed){feetDecimal.textContent=mixed.decimalRelation+' '+mixed.decimal;feetFraction.textContent=mixed.fractionalRelation+' '+mixed.fractional;}
}
if(elapsed){
 const duration=elapsedDurationReadout(n,from.value);
 elapsed.hidden=!duration;
 if(duration){
  if(elapsedClock)elapsedClock.textContent=(duration.approximate?'≈ ':'')+duration.clock;
  if(elapsedWords)elapsedWords.textContent=duration.parts;
  if(elapsedNote)elapsedNote.textContent=duration.approximate?'Rounded to the nearest millisecond':'Not a time of day';
 }
}if(fluidPanel){
 const comparison=fluidOunceComparison(n,from.value);
 fluidPanel.hidden=!comparison;
 if(comparison){
  if(fluidUS)fluidUS.textContent=comparison.us.relation+' '+comparison.us.shown+' US fl oz';
  if(fluidUK)fluidUK.textContent=comparison.uk.relation+' '+comparison.uk.shown+' UK fl oz';
 }
}if(pressurePanel){
 const rows=pressureFourUnitComparison(n,from.value);
 pressurePanel.hidden=!rows;
 if(rows&&pressureUnits){
  for(const v of rows){
   const item=el('[data-pressure-unit="'+v.unit+'"]',pressureUnits);
   if(item)item.textContent=v.relation+' '+v.shown+' '+v.symbol;
  }
 }
}if(torquePanel){
 const rows=torqueFourUnitComparison(n,from.value);
 torquePanel.hidden=!rows;
 if(rows&&torqueUnits)for(const v of rows){
  const item=el('[data-torque-unit="'+v.unit+'"]',torqueUnits);
  if(item)item.textContent=v.relation+' '+v.shown+' '+v.symbol;
 }
}if(temperaturePanel){
 const rows=temperatureThreeScaleReadout(n,from.value);
 temperaturePanel.hidden=!rows;
 if(rows&&temperatureValues){
  for(const v of rows){
   const element=el('[data-temperature-unit="'+v.unit+'"]',temperatureValues);
   if(element)element.textContent=v.relation+' '+v.shown+' '+v.symbol;
  }
 }
}if(explain)explain.textContent=formula(from.value,to.value);if(multi){const alternatives=dimensionUnits(units[from.value].dimension).filter(u=>u.id!==from.value).slice(0,5);multi.innerHTML=alternatives.map(u=>{let shown='Out of range';try{shown=fmt(convert(n,from.value,u.id),decimals)+' '+u.symbol;}catch{}return '<tr><th scope="row">'+u.name+' ('+u.symbol+')</th><td>'+shown+'</td></tr>';}).join('');}error.textContent='';}catch(e){if(outputNumber&&outputUnit){outputNumber.textContent='—';outputUnit.textContent='';}else output.textContent='—';if(detail)detail.textContent='Enter a valid number to see the result.';if(mixedKg)mixedKg.hidden=true;if(imperialMass)imperialMass.hidden=true;if(feetPanel)feetPanel.hidden=true;if(elapsed)elapsed.hidden=true;if(fluidPanel)fluidPanel.hidden=true;if(pressurePanel)pressurePanel.hidden=true;if(torquePanel)torquePanel.hidden=true;if(temperaturePanel)temperaturePanel.hidden=true;error.textContent=e.message;if(multi)multi.textContent='';last=NaN;}}
all('[data-preset]',root).forEach(btn=>btn.addEventListener('click',()=>{input.value=btn.dataset.preset;calculate();input.focus();}));
all('[data-swap]',root).forEach(btn=>btn.addEventListener('click',()=>{const f=from.value;from.value=to.value;to.value=f;calculate();}));
from.addEventListener('change',()=>{const u=units[from.value],v=units[to.value];if(u.dimension!==v.dimension){const choices=dimensionUnits(u.dimension);to.innerHTML=options(u.dimension,choices.find(x=>x.id!==from.value)?.id??from.value);}else{to.innerHTML=options(u.dimension,to.value);}calculate();});
to.addEventListener('change',calculate);input.addEventListener('input',calculate);precision?.addEventListener('change',calculate);
all('[data-copy-feet-inches]',root).forEach(btn=>btn.addEventListener('click',async()=>{
 if(!feetPanel||feetPanel.hidden)return;
 const mixed=feetInchesReadout(input.value,from.value);
 if(!mixed)return;
 const text='Decimal feet + inches: '+mixed.decimalRelation+' '+mixed.decimal+'\n'+
  'Nearest 1/16 inch: '+mixed.fractionalRelation+' '+mixed.fractional+
  '\nFractional inches are rounded; retain the original value for calculations.';
 try{await navigator.clipboard.writeText(text);
  if(actionStatus)actionStatus.textContent='Feet and inches copied.';
 }catch{if(actionStatus)actionStatus.textContent='Clipboard unavailable; select the displayed results.';}
}));
all('[data-copy-temperature]',root).forEach(btn=>btn.addEventListener('click',async()=>{
 if(!temperaturePanel||temperaturePanel.hidden)return;
 const rows=temperatureThreeScaleReadout(input.value,from.value);
 if(!rows)return;
 const text='Absolute temperature: '+input.value+' '+units[from.value].symbol+'\n'+
  rows.map(v=>v.symbol+': '+v.relation+' '+v.shown).join('\n')+
  '\nTemperature differences do not use the +32 offset.';
 try{await navigator.clipboard.writeText(text);
  if(actionStatus)actionStatus.textContent='All three temperature values copied.';
 }catch{if(actionStatus)actionStatus.textContent='Clipboard unavailable; select the temperature values manually.';}
}));
all('[data-copy-torque]',root).forEach(btn=>btn.addEventListener('click',async()=>{
 if(!torquePanel||torquePanel.hidden)return;
 const rows=torqueFourUnitComparison(input.value,from.value);
 if(!rows)return;
 const text='Torque unit conversion: '+input.value+' '+units[from.value].symbol+'\n'+
  rows.map(v=>v.symbol+': '+v.relation+' '+v.shown).join('\n')+
  '\nTorque values only; follow manufacturer tightening specifications.';
 try{await navigator.clipboard.writeText(text);
  if(actionStatus)actionStatus.textContent='All four torque values copied.';
 }catch{if(actionStatus)actionStatus.textContent='Clipboard unavailable; select the torque values manually.';}
}));
all('[data-copy-pressure]',root).forEach(btn=>btn.addEventListener('click',async()=>{
 if(!pressurePanel||pressurePanel.hidden||!pressureUnits)return;
 const result=pressureFourUnitComparison(input.value,from.value);
 if(!result)return;
 const source=input.value+' '+units[from.value].symbol;
 const text='Pressure unit conversion: '+source+'\n'+
  result.map(v=>v.symbol+': '+v.relation+' '+v.shown).join('\n')+
  '\nReference unchanged (gauge / absolute / pressure difference).';
 try{await navigator.clipboard.writeText(text);
  if(actionStatus)actionStatus.textContent='All four pressure values copied.';
 }catch{if(actionStatus)actionStatus.textContent='Clipboard unavailable; select the four pressure values manually.';}
}));
all('[data-copy-elapsed]',root).forEach(btn=>btn.addEventListener('click',async()=>{
 if(!elapsed||elapsed.hidden||!elapsedClock)return;
 const text=elapsedClock.textContent.trim();
 try{await navigator.clipboard.writeText(text);
  if(actionStatus)actionStatus.textContent='Elapsed duration '+text+' copied.';
 }catch{if(actionStatus)actionStatus.textContent='Clipboard unavailable; select the elapsed duration manually.';}
}));
all('[data-copy]',root).forEach(btn=>btn.addEventListener('click',async()=>{if(!Number.isFinite(last))return;const decimals=Number(precision?.value??6);const shown=fmt(last,decimals);const relation=displayRelation(last,shown);const text=`${input.value} ${units[from.value].symbol} ${relation} ${shown} ${units[to.value].symbol}`;try{await navigator.clipboard.writeText(text);btn.textContent='✓ Copied';if(actionStatus)actionStatus.textContent='Full conversion copied to clipboard.';setTimeout(()=>btn.textContent='Copy result',1700);}catch(e){btn.textContent='Copy unavailable';}}));
all('[data-copy-number]',root).forEach(btn=>btn.addEventListener('click',async()=>{if(!Number.isFinite(last))return;const decimals=Number(precision?.value??6);const text=fmt(last,decimals);try{await navigator.clipboard.writeText(text);btn.textContent='✓ Copied';if(actionStatus)actionStatus.textContent='Number '+text+' copied without units.';setTimeout(()=>btn.textContent='Copy number',1700);}catch(e){btn.textContent='Copy unavailable';if(actionStatus)actionStatus.textContent='Clipboard unavailable; select the answer manually.';}}));
all('[data-share]',root).forEach(btn=>btn.addEventListener('click',async()=>{const url=new URL('/universal-converter/',location.origin);url.searchParams.set('from',from.value);url.searchParams.set('to',to.value);url.searchParams.set('value',input.value);try{await navigator.clipboard.writeText(url.toString());btn.textContent='✓ Link copied';if(actionStatus)actionStatus.textContent='Share link copied to clipboard.';setTimeout(()=>btn.textContent='Share link',1800);}catch(e){btn.textContent='Copy unavailable';}}));
all('[data-print-converter]',root).forEach(btn=>btn.addEventListener('click',()=>window.print()));
all('[data-reset]',root).forEach(btn=>btn.addEventListener('click',()=>{input.value=initialValue;if(root.id==='universal'){const dimension=el('[data-dimension]',root);const originalDim=units[initialFrom].dimension;if(dimension)dimension.value=originalDim;setUnits(originalDim,initialFrom,initialTo);}from.value=initialFrom;to.value=initialTo;calculate();}));
if(root.id==='universal'){const dimSelect=el('[data-dimension]',root);dimSelect?.addEventListener('change',()=>{const arr=dimensionUnits(dimSelect.value);setUnits(dimSelect.value,arr[0].id,arr[1]?.id??arr[0].id);calculate();});}
// Unit-name/abbreviation finder: native selects remain accessible and are not mutated while typing.
if(root.id==='universal'){
 const finder=el('[data-unit-find]',root),results=el('[data-unit-results]',root),status=el('[data-unit-status]',root),dimension=el('[data-dimension]',root);
 const aliases={lbs:'pound pounds lb lbs',kg:'kilogram kilograms kilo kilos kgs',oz:'ounce ounces',g:'gram grams',ft:'feet foot',in:'inch inches',m:'meter meters metre metres',cm:'centimeter centimeters centimetre centimetres',ml:'milliliter milliliters millilitre millilitres',l:'liter liters litre litres',celsius:'centigrade',fahrenheit:'fahrenheit',kmh:'kph kmh',ms2:'acceleration meters per second squared',nm:'newton meter'};
 const clear=()=>{finder.value='';results.replaceChildren();results.hidden=true;status.textContent='Search within the selected measurement category.';};
 finder?.addEventListener('input',()=>{
  const term=finder.value.trim().toLowerCase();
  results.replaceChildren();
  if(!term){clear();return;}
  const found=dimensionUnits(dimension.value).filter(u=>([u.id,u.name,u.symbol,aliases[u.id]||''].join(' ').toLowerCase().includes(term))).slice(0,6);
  for(const u of found){
   const row=document.createElement('div');row.className='unit-suggestion';
   const name=document.createElement('span');name.textContent=u.name+' ('+u.symbol+')';row.append(name);
   for(const side of ['from','to']){
    const button=document.createElement('button');button.type='button';button.dataset.useUnit=u.id;button.dataset.side=side;button.textContent=side==='from'?'Use as From':'Use as To';button.setAttribute('aria-label','Use '+u.name+' as '+(side==='from'?'source':'target')+' unit');row.append(button);
   }
   results.append(row);
  }
  results.hidden=!found.length;
  status.textContent=found.length?'Choose a matching unit as From or To.':'No matching units in this category.';
 });
 finder?.addEventListener('keydown',event=>{if(event.key==='Escape')clear();});
 results?.addEventListener('click',event=>{
  const button=event.target.closest('[data-use-unit]');if(!button)return;
  const id=button.dataset.useUnit;if(units[id]?.dimension!==dimension.value)return;
  (button.dataset.side==='to'?to:from).value=id;calculate();clear();
 });
 dimension?.addEventListener('change',clear);
}
const q=new URLSearchParams(location.search);if(root.id==='universal'&&units[q.get('from')]&&units[q.get('to')]&&units[q.get('from')].dimension===units[q.get('to')].dimension){const f=q.get('from'),t=q.get('to');const choose=el('[data-dimension]',root);if(choose)choose.value=units[f].dimension;setUnits(units[f].dimension,f,t);}if(q.has('value')){const v=q.get('value');if(v&&v.length<60)input.value=v;}
calculate();}
all('[data-converter]').forEach(initConverter);

// Printing must expose native <details> content: a folded comparison table
// otherwise disappears from browser print output. Restore the prior UI state.
const printableDetails=all('.multi-unit-panel');
window.addEventListener('beforeprint',()=>{
 for(const section of printableDetails){
  if(!section.open){section.open=true;section.dataset.printWasClosed='true';}
 }
});
window.addEventListener('afterprint',()=>{
 for(const section of printableDetails){
  if(section.dataset.printWasClosed==='true'){
   section.open=false;delete section.dataset.printWasClosed;
  }
 }
});

// Static tables can update the calculator directly; no extra indexed URLs are generated.
document.addEventListener('click', async event => {
  const row=event.target.closest('[data-load-value]');
  if(row){
    const tool=el('[data-converter]'),value=tool&&el('[data-value]',tool);
    if(value){
      value.value=row.dataset.loadValue;
      value.dispatchEvent(new Event('input',{bubbles:true}));
      tool.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
      value.focus({preventScroll:true});
    }
    return;
  }
  const copy=event.target.closest('[data-copy-answer]');
  if(copy){
    try{
      await navigator.clipboard.writeText(copy.dataset.answer);
      const previous=copy.textContent;
      copy.textContent='✓ Copied';
      setTimeout(()=>copy.textContent=previous,1700);
    }catch{copy.textContent='Copy unavailable';}
  }
});

const menu=el('[data-menu]'),siteNav=el('[data-nav]');
function setMenuOpen(open){if(!menu||!siteNav)return;siteNav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));}
menu?.addEventListener('click',()=>setMenuOpen(!siteNav?.classList.contains('open')));
siteNav?.addEventListener('click',event=>{if(event.target.closest('a'))setMenuOpen(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&siteNav?.classList.contains('open')){setMenuOpen(false);menu.focus();}});
document.addEventListener('pointerdown',event=>{if(siteNav?.classList.contains('open')&&!siteNav.contains(event.target)&&!menu.contains(event.target))setMenuOpen(false);});
// The homepage search is a direct tool finder; keyboard and pointer users have the same links.
const homeInput=el('[data-home-find]'),homeSuggestions=el('[data-suggestions]');
if(homeInput&&homeSuggestions){const candidates=all('[data-quick-item]',homeSuggestions),empty=el('[data-suggest-empty]',homeSuggestions);let hits=[];
  function close(){homeSuggestions.hidden=true;homeInput.setAttribute('aria-expanded','false');}
  function update(){const q=homeInput.value.trim().toLowerCase();if(!q){close();return;}const tokens=q.split(/\s+/).filter(Boolean);hits=candidates.filter(a=>tokens.every(w=>a.dataset.search.includes(w))).slice(0,6);for(const link of candidates)link.hidden=!hits.includes(link);if(empty)empty.hidden=hits.length>0;homeSuggestions.hidden=false;homeInput.setAttribute('aria-expanded','true');}
  homeInput.addEventListener('input',update);
  homeInput.addEventListener('focus',update);
  homeInput.addEventListener('keydown',e=>{if(e.key==='Escape'){close();}if(e.key==='ArrowDown'&&hits.length){e.preventDefault();hits[0].focus();}});
  homeSuggestions.addEventListener('keydown',e=>{
    if(e.key==='Escape'){close();homeInput.focus();return;}
    if((e.key==='ArrowDown'||e.key==='ArrowUp')&&hits.length){
      const position=hits.indexOf(document.activeElement);
      if(position<0)return;
      e.preventDefault();
      const next=position+(e.key==='ArrowDown'?1:-1);
      if(next<0){homeInput.focus();return;}
      hits[next%hits.length].focus();
    }
  });
  document.addEventListener('pointerdown',e=>{if(!homeSuggestions.contains(e.target)&&e.target!==homeInput)close();});
}
const search=el('[data-filter]');if(search){const requested=new URLSearchParams(location.search).get('q');if(requested&&requested.length<=80)search.value=requested;const targets=all('[data-filter-item]');search.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();const tokens=q.split(/\s+/).filter(Boolean);let n=0;for(const node of targets){const text=(node.dataset.search||node.textContent).toLowerCase();const ok=tokens.every(token=>text.includes(token));node.hidden=!ok;if(ok)n++;}const status=el('[data-filter-status]');if(status)status.textContent=`Showing ${n} matching tools`;const empty=el('[data-filter-empty]');if(empty)empty.hidden=n!==0;});el('[data-clear-filter]')?.addEventListener('click',()=>{search.value='';search.dispatchEvent(new Event('input'));search.focus();});if(search.value)search.dispatchEvent(new Event('input'));}
const batch=el('[data-batch]');if(batch){const dimension=el('[data-batch-dimension]'),from=el('[data-batch-from]'),to=el('[data-batch-to]'),values=el('[data-batch-input]'),column=el('[data-batch-column]'),separator=el('[data-batch-delimiter]'),rowFromColumn=el('[data-batch-from-column]'),rowToColumn=el('[data-batch-to-column]'),out=el('[data-batch-result]'),status=el('[data-batch-status]');let csv='';
function changeDim(){const d=dimension.value;const arr=dimensionUnits(d);from.innerHTML=options(d,d==='mass'?'lbs':arr[0].id);to.innerHTML=options(d,d==='mass'?'kg':arr[1]?.id??arr[0].id);}
from.addEventListener('change',()=>{if(units[from.value].dimension!==units[to.value].dimension){to.innerHTML=options(units[from.value].dimension,dimensionUnits(units[from.value].dimension).find(x=>x.id!==from.value)?.id??from.value);}});
dimension.addEventListener('change',changeDim);changeDim();
function process(){
 let table,batchResult;
 try{
  table=parseBatchTable(values.value,{column:Number(column.value),delimiter:separator.value});
  if(!table.rows.length){csv='';out.value='';status.textContent='Enter at least one numeric data row.';return;}
  const fromText=rowFromColumn.value.trim(),toText=rowToColumn.value.trim();
  batchResult=convertBatchToCsv(table,from.value,to.value,{
   fromColumn:fromText?Number(fromText):null,
   toColumn:toText?Number(toText):null
  });
 }catch(e){csv='';out.value='';status.textContent=e.message;return;}
 csv=batchResult.csv;
 out.value=batchResult.rows.map(row=>'Line '+row.line+': '+row.input+' '+row.from+' → '+(row.result?row.result+' '+row.to:'Error: '+row.status)).join('\n');
 const skipped=table.headerSkipped?' Original column headings preserved.':'';
 const invalid=batchResult.invalid.length?' Invalid rows: '+batchResult.invalid.slice(0,12).join(', ')+(batchResult.invalid.length>12?'…':'')+'.':'';
 status.textContent='Converted '+batchResult.converted+' of '+table.rows.length+' rows ('+table.delimiter+' input). Preserved '+batchResult.preservedColumns+' input column'+(batchResult.preservedColumns===1?'':'s')+'.'+(rowFromColumn.value||rowToColumn.value?' Used each row’s source/target units.':' Applied the selected unit pair.')+skipped+invalid+' All calculations stayed in your browser.';
}
el('[data-batch-example]')?.addEventListener('click',()=>{
 values.value=[
  'label,value,from,to',
  'parcel,149,lb,kg',
  'travel,330,km/h,mph',
  'weather,37.9,°C,°F',
  'elapsed,60000,ms,s'
 ].join('\n');
 column.value='2';separator.value='comma';
 rowFromColumn.value='3';rowToColumn.value='4';
 process();
});
for(const field of [dimension,from,to,values,column,separator,rowFromColumn,rowToColumn])field.addEventListener('input',()=>{csv='';out.value='';status.textContent='Values or units changed. Click Convert values to refresh the results.';});
el('[data-batch-file]')?.addEventListener('change',async ev=>{const file=ev.target.files?.[0];if(!file)return;if(file.size>1024*1024){status.textContent='Choose a CSV or TXT file smaller than 1 MB.';return;}try{values.value=await file.text();csv='';out.value='';status.textContent=`Loaded ${file.name} locally. Choose units and click Convert values.`;}catch{status.textContent='Could not read that local file.';}});
el('[data-process]')?.addEventListener('click',process);el('[data-download]')?.addEventListener('click',()=>{if(!csv)process();if(csv)download('unit-conversions.csv',csv);});el('[data-print]')?.addEventListener('click',()=>window.print());process();}
