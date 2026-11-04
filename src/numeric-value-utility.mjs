/** Pre-render source-rounding sensitivity without inferring instrument precision. */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function sourceRoundingScenario(seed,pair){
 if(!seed||!pair||seed.slug!==pair.slug||!units[pair.from]||!units[pair.to]||
   units[pair.from].dimension!==units[pair.to].dimension)
  throw new RangeError('Source and direction must be compatible');
 const raw=String(seed.valueText??'');
 if(!/^\d+(?:\.\d+)?$/.test(raw))throw new RangeError('Invalid decimal-source value');
 const value=Number(raw);
 if(!Number.isFinite(value)||value!==seed.value)throw new RangeError('Source value and URL disagree');
 const decimals=raw.includes('.')?raw.split('.')[1].length:0;
 if(decimals>9)throw new RangeError('Too many source digits');
 const step=10**-decimals, half=step/2;
 // Remove noise in source endpoints without changing the published exact input.
 const below=Number((value-half).toPrecision(15));
 const above=Number((value+half).toPrecision(15));
 if(below<0)throw new RangeError('Hypothetical source range below zero');
 const central=convert(value,pair.from,pair.to);
 const a=convert(below,pair.from,pair.to),b=convert(above,pair.from,pair.to);
 const lower=Math.min(a,b),upper=Math.max(a,b);
 return {value,decimals,step,below,above,central,lower,upper,
   roundedLower:Math.round(lower),roundedUpper:Math.round(upper),
   stable:Math.round(lower)===Math.round(upper)};
}
export function sourceRoundingScenarioHtml(seed,pair){
 const s=sourceRoundingScenario(seed,pair),from=units[pair.from],to=units[pair.to];
 const fmtSource=x=>formatNumber(x,Math.max(3,s.decimals+2)),fmtOut=x=>formatNumber(x,9);
 const rel=x=>esc(displayRelation(x,fmtOut(x)));
 const step=esc(formatNumber(s.step,s.decimals));
 const row=(label,n,result)=>'<tr><th scope="row">'+label+'</th><td>'+esc(fmtSource(n))+' '+
  esc(from.symbol)+'</td><td>'+rel(result)+' '+esc(fmtOut(result))+' '+esc(to.symbol)+'</td></tr>';

 const stepChoices=[0.01,0.1,1,10,100,1000].filter(x=>x/2<=s.value);
 const selectOptions=stepChoices.map(x=>'<option value="'+x+'"'+(x===s.step?' selected':'')+'>Nearest '+
  esc(formatNumber(x,2))+' '+esc(from.symbol)+'</option>').join('');
 const controls='<div data-round-controls hidden><label class="input-head" for="source-step-'+
  seed.id+'">Change the hypothetical source rounding increment</label>'+
  '<select class="select" id="source-step-'+seed.id+'" data-source-step>'+
  selectOptions+'</select><p class="hint">Changing the increment explores a centered interval of half that increment on either side of the stated value; it does not assert that this value was rounded to that increment.</p></div>';
 const comparison=s.stable
  ?'Both boundaries round to '+esc(formatNumber(s.roundedLower,0))+' '+esc(to.symbol)+
    ' when reported to the nearest whole target unit.'
  :'The two boundaries round to different whole-unit target answers ('+
    esc(formatNumber(s.roundedLower,0))+' or '+esc(formatNumber(s.roundedUpper,0))+
    ' '+esc(to.symbol)+'). Retain decimals if that difference matters.';
 return '<section class="source-rounding-scenario" data-source-from="'+esc(pair.from)+
  '" data-source-to="'+esc(pair.to)+'" data-source-value="'+esc(seed.valueText)+
  '" data-source-rounding-scenario="'+esc(seed.url)+
  '" data-whole-result-stable="'+(s.stable?'yes':'no')+'">'+
  '<h2>If '+esc(seed.valueText)+' '+esc(from.symbol)+' was rounded at the source</h2>'+
  '<p class="reference-caption">The stated input converts to '+rel(s.central)+' <strong>'+
   esc(fmtOut(s.central))+' '+esc(to.symbol)+'</strong>. If the source reading had first been '+
   'rounded to the nearest <strong data-source-step-text>'+step+' '+esc(from.symbol)+'</strong>, its underlying value '+
   'could be roughly between <span data-source-lower>'+esc(fmtSource(s.below))+'</span> and <span data-source-upper>'+esc(fmtSource(s.above))+'</span>'+
   ' '+esc(from.symbol)+'. Here is how that hypothetical range converts:</p>'+
  '<div class="reference-scroll"><table class="number-table reference-table"><thead>'+
   '<tr><th>Scenario</th><th>Source reading</th><th>Converted result</th></tr></thead><tbody>'+
   row('Lower boundary',s.below,s.lower)+row('Stated value',s.value,s.central)+
   row('Upper boundary',s.above,s.upper)+'</tbody></table></div>'+
  '<p class="reference-caption" data-source-comparison aria-live="polite">'+comparison+'</p>'+controls+
  '<p class="hint">This is a conditional rounding example, not an estimate of measurement '+
   'uncertainty. Displayed digits, especially trailing zeros, do not establish instrument '+
   'accuracy. If the original input is exact, the stated result is the applicable conversion.</p>'+
  '</section>';
}
