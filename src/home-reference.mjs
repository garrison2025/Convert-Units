/**
 * Factual homepage references: curated mainstream units, calculated from the
 * same engine as the interactive converters. Not keyword-page proliferation.
 * Always mark rounded outputs as approximate.
 */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';

export const homeReferenceSeeds=Object.freeze([
 Object.freeze({slug:'lbs-to-kg',value:1}),
 Object.freeze({slug:'kg-to-lbs',value:1}),
 Object.freeze({slug:'in-to-cm',value:1}),
 Object.freeze({slug:'us-fl-oz-to-ml',value:1}),
 Object.freeze({slug:'us-gal-to-l',value:1}),
 Object.freeze({slug:'celsius-to-fahrenheit',value:0}),
 Object.freeze({slug:'minutes-to-hours',value:60})
]);

export function homeReferenceFacts(pairs){
 const facts=homeReferenceSeeds.map(({slug,value})=>{
  const pair=pairs.find(p=>p.slug===slug);
  if(!pair)throw new Error('Missing homepage reference direction: '+slug);
  const from=units[pair.from],to=units[pair.to];
  if(!from||!to||from.dimension!==to.dimension)throw new Error('Invalid homepage reference: '+slug);
  const raw=convert(value,pair.from,pair.to);
  const output=formatNumber(raw,9);
  return {slug,url:pair.url,value,from:from.symbol,to:to.symbol,output,relation:displayRelation(raw,output),title:pair.title};
 });
 if(new Set(facts.map(f=>f.url)).size!==facts.length)throw new Error('Duplicate homepage reference URLs');
 return facts;
}
