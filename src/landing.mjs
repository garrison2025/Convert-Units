import {units,convert,formatNumber,formula,displayRelation} from './assets/engine.mjs';

const notes={"mass":["Mass versus force","Pounds (lb) and kilograms are mass units. Pound-force (lbf) measures force instead."],"length":["International definitions","One international foot is exactly 0.3048 meter and one inch is exactly 0.0254 meter."],"volume":["US volume units","US fluid ounces are units of volume, not weight; imperial fluid ounces and gallons differ from US units."],"temperature":["Temperature offsets","Celsius and Fahrenheit require both a scale factor and an offset. Temperature differences use another formula."],"pressure":["Pressure reference","Bar, psi and pascal describe force per area. Check gauge versus absolute readings in engineering contexts."],"torque":["Torque versus force","Foot-pound-force represents a moment of force; it is different from pound mass and from energy."],"time":["Fixed duration units","Seconds, minutes and hours have fixed relationships; the number of days in calendar months varies."],"speed":["Speed units","Converting between km/h and mph changes only the unit, not the physical speed."],"area":["Squared dimensions","A square foot is an area unit; square unit factors are the squares of length factors."],"force":["Newton and pound-force","Both newton and pound-force measure force. Kilogram and pound mass do not measure force."],"storage":["Binary and decimal units","A GB is 1,000,000,000 bytes whereas a GiB is 1,073,741,824 bytes."],"density":["Density links mass and volume","Converting a mass to a volume requires the density of the material."],"power":["Power conventions","Power measures energy transferred per unit time. Horsepower conventions can vary."],"acceleration":["Acceleration dimensions","Acceleration is speed change per time; units include m/s² and ft/s²."],"fuel":["Reciprocal fuel economy","MPG and liters per 100 km are reciprocal measures. A zero input cannot be inverted."],"flow":["Flow rate","Volume flow measures volume per unit time; mass flow also requires density."]};

const esc=function esc(x){return String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');};

export function measurementNote(dim){const n=notes[dim]??["Measurement note","Use compatible units only."];return `<aside class="measurement-note"><span>MEASUREMENT NOTE</span><h3>${esc(n[0])}</h3><p>${esc(n[1])}</p><a href="/methodology/">Definitions and sources ↗</a></aside>`;};

export function answerBanner(p,valueText,result){const from=units[p.from],to=units[p.to],relation=displayRelation(convert(valueText,p.from,p.to),result),answer=`${valueText} ${from.symbol} ${relation} ${result} ${to.symbol}`;return `<section class="direct-answer" aria-label="Conversion answer"><div><span class="answer-eyebrow">CONVERSION RESULT</span><p>${esc(valueText)} ${esc(from.symbol)} ${relation==='='?'equals':'is approximately'}</p><strong>${esc(result)} <small>${esc(to.symbol)}</small></strong><span class="answer-equation">${esc(answer)}</span></div><div class="answer-actions"><button type="button" data-copy-answer data-answer="${esc(answer)}">Copy answer</button><a href="#live-converter">Change value ↓</a></div></section>`;};

export function referenceValues(p,current=null){const dim=units[p.from].dimension;const vs=current===null?(dim==='fuel'?[10,20,30,40,50]:dim==='temperature'?[-40,0,20,37,100]:[1,2,5,10,25,50,100]):[current-2,current-1,current,current+1,current+2].filter(v=>Number.isFinite(v)&&(dim==='temperature'||v>=0)).map(v=>Math.round(v*1e6)/1e6);const rows=[...new Set(vs)].filter(v=>{try{return Number.isFinite(convert(v,p.from,p.to));}catch{return false;}}).map(v=>`<tr><td><button class="table-load" type="button" data-load-value="${esc(v)}">${esc(formatNumber(v,6))} ${esc(units[p.from].symbol)} ↗</button></td><td>${esc(formatNumber(convert(v,p.from,p.to),7))} ${esc(units[p.to].symbol)}</td></tr>`).join('');return `<p class="reference-caption">Choose a value below to try it in the live converter.</p><div class="reference-scroll"><table class="number-table reference-table"><thead><tr><th>${esc(units[p.from].name)}</th><th>${esc(units[p.to].name)}</th></tr></thead><tbody>${rows}</tbody></table></div>`;};

export function calculationDetails(p,v,result){return `<ol class="calc-steps"><li>Start with <strong>${esc(v)} ${esc(units[p.from].symbol)}</strong>.</li><li>${esc(formula(p.from,p.to))}</li><li>Result: <strong>${esc(result)} ${esc(units[p.to].symbol)}</strong>. Adjust decimal precision in the calculator.</li></ol>`;};

/**
 * A useful precision reference on approved numeric landing pages.
 * This reuses a single unrounded calculation; the display format changes only.
 * The table makes no claim about the precision of the original measurement.
 */
export function precisionComparison(pair,value){
 const target=convert(value,pair.from,pair.to);
 const sourceUnit=units[pair.from],targetUnit=units[pair.to];
 const rows=[2,4,6,9].map(d=>'<tr><th scope="row">Up to '+d+' decimal places</th><td>'+esc(formatNumber(target,d))+' '+esc(targetUnit.symbol)+'</td></tr>').join('');
 return '<h2>How precise should this result be?</h2>'+
  '<p class="reference-caption">These are different display roundings of the same calculation for '+
  esc(formatNumber(value,9))+' '+esc(sourceUnit.symbol)+'. Do not mistake the number of shown decimals for the measurement’s accuracy.</p>'+
  '<div class="reference-scroll"><table class="number-table reference-table" data-precision-table>'+
  '<thead><tr><th scope="col">Display precision</th><th scope="col">Result</th></tr></thead>'+
  '<tbody>'+rows+'</tbody></table></div>'+
  '<p class="hint">For further calculations, use the unrounded internal value from the live converter rather than a copied rounded number.</p>';
}


/**
 * Value-specific utility, without fictional use cases or SEO paraphrasing.
 * UK mass compound notation and clock-like duration representation are
 * derived directly from the shared conversion engine.
 */
export function practicalEquivalents(pair,value){
 const dimension=units[pair.from].dimension;
 const n=Number(value);
 if(!Number.isFinite(n)||n<0)return '';
 if(dimension==='mass'){
  const pounds=convert(n,pair.from,'lbs');
  if(!Number.isFinite(pounds)||pounds>1e12)return '';
  const stones=Math.floor(pounds/14);
  // Round only the displayed remainder, with a carry if it reaches 14.
  let remainder=Math.round((pounds-stones*14)*1000)/1000;
  const carried=remainder>=14?1:0;
  if(carried)remainder=0;
  const label=esc(formatNumber(n,6))+' '+esc(units[pair.from].symbol);
  return '<section class="practical-equivalence"><h2>UK stones and pounds</h2>'+
   '<p class="reference-caption">For the same mass, '+label+' is approximately '+
   '<strong>'+esc(stones+carried)+' st '+esc(formatNumber(remainder,3))+' lb</strong>. '+
   'One stone equals exactly 14 international avoirdupois pounds. '+
   'This is a different way to display the same quantity, not a health or body-composition assessment.</p></section>';
 }
 if(dimension==='time'){
  const seconds=convert(n,pair.from,'seconds');
  if(!Number.isSafeInteger(seconds)||seconds>Number.MAX_SAFE_INTEGER)return '';
  const hours=Math.floor(seconds/3600);
  const minutes=Math.floor(seconds%3600/60);
  const remaining=seconds%60;
  const pad=x=>String(x).padStart(2,'0');
  return '<section class="practical-equivalence"><h2>Clock-style duration</h2>'+
   '<p class="reference-caption">'+esc(formatNumber(n,6))+' '+esc(units[pair.from].symbol)+
   ' is <strong>'+esc(hours+':'+pad(minutes)+':'+pad(remaining))+
   '</strong> (hours:minutes:seconds). This is an elapsed duration, not a time of day.</p></section>';
 }
 return '';
}

/**
 * Show a value-specific consequence of copying rounded decimal output, not an
 * unsupported claim about measurement accuracy. Only displayed when the loss
 * can be distinguished from IEEE-754 arithmetic noise for this input.
 *
 * This is only used on the curated 15 numeric indexing candidates. It adds
 * useful arithmetic without generating additional numeric SEO URLs.
 */
export function roundTripPrecisionNote(pair,value){
 const n=Number(value);
 if(!Number.isFinite(n))return '';
 const target=convert(n,pair.from,pair.to);
 if(!Number.isFinite(target))return '';
 const rounded=Number(formatNumber(target,2).replaceAll(',',''));
 if(!Number.isFinite(rounded))return '';
 const restored=convert(rounded,pair.to,pair.from);
 if(!Number.isFinite(restored))return '';
 const delta=Math.abs(restored-n);
 if(delta<=1e-12*Math.max(1,Math.abs(n)))return '';
 const first=units[pair.from],second=units[pair.to];
 return '<section class="roundtrip-panel" data-roundtrip-check>'+
  '<h2>What two-decimal rounding changes</h2>'+
  '<p>Rounding '+esc(formatNumber(n,9))+' '+esc(first.symbol)+' to '+
  '<strong>'+esc(formatNumber(rounded,2))+' '+esc(second.symbol)+'</strong> and converting that rounded answer back gives '+
  '<strong>'+esc(formatNumber(restored,9))+' '+esc(first.symbol)+'</strong> — a difference of about '+
  '<strong>'+esc(formatNumber(delta,9))+' '+esc(first.symbol)+'</strong> versus the input.</p>'+
  '<p class="hint">This shows the effect of rounding the displayed result; it does not estimate the accuracy of the original measurement. Retain more digits for later calculations.</p>'+
  '</section>';
}
