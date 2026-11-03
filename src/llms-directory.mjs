/** Registry-driven public LLM directory; informational, not a ranking protocol. */
import {units,dimensions} from './assets/engine.mjs';
const ORIGIN='https://convertunits.cc';
export function llmsDirectory(pairs,categoryList){
 if(!Array.isArray(pairs)||pairs.length!==38||!Array.isArray(categoryList)||categoryList.length!==16)
  throw new RangeError('llms directory must match the 38 tools and 16 real categories');
 if(new Set(pairs.map(p=>p.url)).size!==38)throw new Error('Duplicate conversion direction in LLM directory');
 const seen=new Set();
 const sections=categoryList.map(d=>{
  if(!dimensions[d.id]||seen.has(d.id))throw new Error('Invalid category in directory');
  seen.add(d.id);
  const lines=pairs.filter(p=>units[p.from]?.dimension===d.id).map(p=>
   '- ['+p.title+']('+ORIGIN+p.url+')');
  if(!lines.length)throw new Error('Category without real converter: '+d.id);
  return '### '+dimensions[d.id].label+'\n- [Category guidance]('+ORIGIN+'/category/'+d.id+'/)\n'+lines.join('\n');
 });
 return '# ConvertUnits.cc — Unit Conversions\n\n'+
  '> A public directory of free, browser-based conversion tools. All linked converters show computed answers and unit conventions.\n\n'+
  '## Start and verify\n'+
  '- [All converters]('+ORIGIN+'/all-converters/)\n'+
  '- [Conversion definitions and primary references]('+ORIGIN+'/methodology/#verified-conversion-facts)\n'+
  '- [Calculation methodology and limitations]('+ORIGIN+'/methodology/)\n'+
  '- [Universal converter]('+ORIGIN+'/universal-converter/)\n'+
  '- [Batch CSV converter]('+ORIGIN+'/batch-converter/)\n'+
  '- [About and public source code]('+ORIGIN+'/about/)\n'+
  '- [Contact and corrections]('+ORIGIN+'/contact/)\n\n'+
  '## Conversion tools by measurement category\n\n'+sections.join('\n\n')+'\n\n'+
  '## Interpretation and scope\n'+
  '- The site computes each conversion locally in the browser; standalone answers and examples are pre-rendered in HTML.\n'+
  '- A displayed approximate sign means rounding, not an inexact unit definition.\n'+
  '- US and imperial liquid-volume units differ; lb mass and lbf force differ; temperature requires an offset.\n'+
  '- The methodology cites public NIST/BIPM/IEC reference pages. These institutions have not certified this site.\n'+
  '- The public XML sitemap lists the original 92 specific-value answer pages without duplicating them here: '+ORIGIN+'/sitemap.xml\n'+
  '- This directory is optional navigation, not an AI citation, endorsement, or ranking guarantee.\n';
}
