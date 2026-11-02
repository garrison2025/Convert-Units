/**
 * Human-readable search headlines for numeric conversions.
 * Search-volume research informs which query to serve, but the SERP text must
 * accurately describe the page, rather than copy malformed keyword spacing.
 */
import {units,convert,formatNumber} from './assets/engine.mjs';

export function numericHeading(seed,pair){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Incompatible SEO units');
 return seed.valueText+' '+from.name.toLowerCase()+' to '+to.name.toLowerCase();
}
export function numericTitle(seed,pair){
 const from=units[pair.from],to=units[pair.to];
 const result=formatNumber(convert(seed.value,pair.from,pair.to),9);
 return seed.valueText+' '+from.symbol+' to '+to.symbol+' = '+result+' '+to.symbol;
}
export function numericDescription(seed,pair){
 const from=units[pair.from],to=units[pair.to];
 const result=formatNumber(convert(seed.value,pair.from,pair.to),9);
 return numericHeading(seed,pair)+': '+seed.valueText+' '+from.symbol+' ≈ '+result+' '+to.symbol+
  '. Verify the formula, adjust precision and compare nearby values in the free calculator.';
}
