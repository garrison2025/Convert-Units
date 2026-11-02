/**
 * Concise, verifiable pair-level quick answers for directional tool pages.
 * All displayed values derive from the same tested conversion engine.
 * Values are approximate whenever fixed display precision truncates a result.
 */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';

const escape=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
export function directionalQuickAnswer(pair){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Invalid conversion direction');
 const result=convert(1,pair.from,pair.to);
 const formatted=formatNumber(result,9);
 const relation=displayRelation(result,formatted);
 const answer='1 '+from.symbol+' '+relation+' '+formatted+' '+to.symbol;
 return '<div class="pair-key-fact" aria-label="Direct conversion answer">'+
  '<span class="pair-key-kicker">QUICK CONVERSION</span>'+
  '<strong>'+escape(answer)+'</strong>'+
  '<a href="#live-converter">Calculate another value <span aria-hidden="true">↗</span></a>'+
  '</div>';
}
