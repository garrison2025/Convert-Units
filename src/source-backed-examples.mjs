/**
 * Show a small, source-backed set of worked numerical answers on EXISTING tool pages.
 * Seeds are the 92 values already reconciled with the user's V2 Semrush rows.
 * No new pages, indexing decisions, search-volume claims, or outgoing numeric links.
 * Priority is only for choosing useful illustrative values within each direction.
 */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';

const E=value=>String(value??'').replaceAll('&','&amp;').replaceAll('<','&lt;')
 .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

export function sourceBackedExamples(pair,seeds,limit=5){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Invalid unit direction');
 if(!Array.isArray(seeds))throw new TypeError('Curated numerical evidence must be an array');
 const safeLimit=Math.max(0,Math.min(5,Math.floor(Number(limit)||0)));
 if(!safeLimit)return '';
 const candidates=seeds.filter(s=>s.slug===pair.slug&&Number.isFinite(s.value)&&
  typeof s.valueText==='string'&&s.valueText.trim()&&Number.isFinite(s.trafficEstimate))
  .sort((a,b)=>b.trafficEstimate-a.trafficEstimate||b.volumeUS-a.volumeUS||
    a.value-b.value);
 const chosen=[],seen=new Set();
 for(const seed of candidates){
  const key=String(seed.value);
  if(seen.has(key))continue;
  seen.add(key);chosen.push(seed);
  if(chosen.length===safeLimit)break;
 }
 if(!chosen.length)return '';
 const rows=chosen.map(s=>{
  const answer=convert(s.value,pair.from,pair.to);
  const formatted=formatNumber(answer,9);
  const relation=displayRelation(answer,formatted);
  return '<tr><th scope="row">'+E(s.valueText)+' '+E(from.symbol)+'</th>'+
   '<td>'+E(relation)+' '+E(formatted)+' '+E(to.symbol)+'</td></tr>';
 }).join('');
 return '<section class="card source-backed-examples" data-source-backed-examples="'+E(pair.slug)+'"'+
  ' aria-label="Worked unit conversion examples">'+
  '<h2>Worked '+E(from.name.toLowerCase())+' to '+E(to.name.toLowerCase())+' examples</h2>'+
  '<p>Check these calculated examples, or enter a different number in the live converter.'+
  ' Displayed decimals may be rounded; the calculation uses the underlying unit definition.</p>'+
  '<div class="reference-scroll"><table class="number-table reference-table">'+
  '<thead><tr><th scope="col">Original value</th><th scope="col">Converted result</th></tr></thead>'+
  '<tbody>'+rows+'</tbody></table></div></section>';
}
