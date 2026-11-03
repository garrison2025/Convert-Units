/**
 * Human-readable search headlines for numeric conversions.
 * Search-volume research informs which query to serve, but the SERP text must
 * accurately describe the page, rather than copy malformed keyword spacing.
 */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';

export function numericHeading(seed,pair){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Incompatible SEO units');
 return seed.valueText+' '+from.name.toLowerCase()+' to '+to.name.toLowerCase();
}
export function numericTitle(seed,pair){
 const from=units[pair.from],to=units[pair.to];
 const result=formatNumber(convert(seed.value,pair.from,pair.to),6);
 return seed.valueText+' '+from.symbol+' to '+to.symbol+' '+displayRelation(convert(seed.value,pair.from,pair.to),result)+' '+result+' '+to.symbol;
}
export function numericDescription(seed,pair){
 const from=units[pair.from],to=units[pair.to];
 const result=formatNumber(convert(seed.value,pair.from,pair.to),9);
 return numericHeading(seed,pair)+': '+seed.valueText+' '+from.symbol+' '+displayRelation(convert(seed.value,pair.from,pair.to),result)+' '+result+' '+to.symbol+
  '. Verify the formula, adjust precision and compare nearby values in the free calculator.';
}

/**
 * Search snippet for one actual directional tool. Never use '=' for a number
 * rounded to fewer decimal places than the underlying conversion yields.
 * Generic query volume is not asserted by this descriptive page metadata.
 */
export function directionMetaDescription(pair){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Incompatible SEO units');
 const raw=convert(1,pair.from,pair.to);
 const rendered=formatNumber(raw,9);
 const relation=displayRelation(raw,rendered);
 const alias=pair.slug==='lbs-to-kg'?' (lbs to kg)':pair.slug==='kg-to-lbs'?' (kg to lbs)':'';
 return pair.title+alias+': 1 '+from.symbol+' '+relation+' '+rendered+' '+to.symbol+
  '. Enter any value, check the formula and use the reference table or local batch converter.';
}

/**
 * Curated, concise titles for the nine directions with redundant long
 * title text. Search engines have no fixed character limit: shorten only
 * where a symbol and its full unit name otherwise repeat unnecessarily.
 * This does not rewrite H1 text, create routes or infer keyword volume.
 */
const conciseTitles=Object.freeze({
 'ml-to-us-fl-oz':'Milliliters to US Fluid Ounces (mL to fl oz)',
 'us-fl-oz-to-ml':'US Fluid Ounces to Milliliters (fl oz to mL)',
 'us-tbsp-to-us-tsp':'US Tablespoons to Teaspoons (tbsp to tsp)',
 'ft-lbf-to-nm':'Foot-Pounds to Newton-Meters (ft·lbf to N·m)',
 'nm-to-ft-lbf':'Newton-Meters to Foot-Pounds (N·m to ft·lbf)',
 'kmh-to-mph':'Kilometers per Hour to MPH (km/h to mph)',
 'mph-to-kmh':'MPH to Kilometers per Hour (mph to km/h)',
 'm2-to-ft2':'Square Meters to Square Feet (m² to ft²)',
 'mpg-us-to-l-100km':'US MPG to L/100 km Converter'
});
const massTitles=Object.freeze({
 'lbs-to-kg':'Pounds to Kilograms Converter (lbs to kg)',
 'kg-to-lbs':'Kilograms to Pounds Converter (kg to lbs)'
});
// The user's competitor dataset supports common *numbered* lbs/kg query phrasing.
// Generic unnumbered phrase Volume and KD remain unverified.
export const conciseDirectionTitleSlugs=Object.freeze(Object.keys(conciseTitles));
export function directionSeoTitle(pair){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Incompatible SEO units');
 return massTitles[pair.slug]||conciseTitles[pair.slug]||pair.title+' Converter ('+from.symbol+' to '+to.symbol+')';
}
