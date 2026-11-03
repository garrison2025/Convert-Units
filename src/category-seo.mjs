/**
 * Google-friendly category summaries and genuinely useful numerical examples.
 * - Each summary is factual and describes the unique measurement category.
 * - Examples use the shared tested engine, not invented "popular" query data.
 * - Only existing canonical directional tool URLs are linked.
 */
import {units,dimensions,convert,formatNumber,displayRelation} from './assets/engine.mjs';
const html=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

const descriptions={
 mass:'Convert pounds, kilograms, ounces and grams with defined mass factors. Check answers, rounding and why pound mass differs from pound-force.',
 length:'Convert meters, feet, centimeters and inches using international length definitions. Compare example results, formulas and precision.',
 volume:'Convert milliliters, US fluid ounces, liters and US gallons. Check US versus imperial measures and find a matching calculator.',
 temperature:'Convert Celsius and Fahrenheit with the correct offset formula. Verify actual temperatures, not temperature differences, using free tools.',
 pressure:'Convert bar, psi, kilopascals and standard atmospheres. Compare worked examples and distinguish pressure units from force.',
 torque:'Convert foot-pound-force to newton-meters and back. Check torque unit definitions without confusing force, mass or energy.',
 time:'Convert milliseconds, seconds, minutes and hours. Check elapsed durations, decimal hours and clock-style time equivalents.',
 speed:'Convert kilometers per hour and miles per hour. Compare both directions and keep the underlying physical speed unchanged.',
 area:'Convert square meters to square feet with squared length factors. Check area units without confusing them with linear length.',
 force:'Convert kilonewtons to pound-force. Check force unit definitions and avoid confusing pound-force with pound mass.',
 storage:'Convert gigabytes to megabytes and compare decimal versus binary storage conventions. Verify the units before copying results.',
 density:'Convert kg/m³ to g/cm³ using defined mass and volume units. Remember that mass-to-volume conversions also need material density.',
 power:'Convert kilowatts to mechanical horsepower. Check the horsepower convention and distinguish rated power from energy use.',
 acceleration:'Convert m/s² to ft/s² using the international foot definition. Keep acceleration separate from speed measurements.',
 fuel:'Convert US miles per gallon to liters per 100 km with the reciprocal formula. Understand why zero cannot be inverted.',
 flow:'Convert liters per minute to cubic meters per hour. Compare volume-flow units without assuming the material density.'
};
const referenceValue={temperature:20,time:60,speed:100,fuel:30};
export function categoryMetaDescription(dim){
 if(!Object.hasOwn(descriptions,dim))throw new RangeError('Unknown category SEO summary: '+dim);
 return descriptions[dim];
}
export function categoryConversionExamples(dim,allPairs){
 if(!dimensions[dim])throw new RangeError('Unknown category examples: '+dim);
 const candidates=allPairs.filter(p=>
   units[p.from]?.dimension===dim&&units[p.to]?.dimension===dim);
 const seen=new Set(),selected=[];
 for(const pair of candidates){
  const signature=[pair.from,pair.to].sort().join(':');
  if(seen.has(signature))continue;
  seen.add(signature);selected.push(pair);
  if(selected.length===3)break;
 }
 if(!selected.length)throw new RangeError('No functional conversion pairs in category '+dim);
 const rows=selected.map(pair=>{
  const n=referenceValue[dim]??1;
  const raw=convert(n,pair.from,pair.to);
  const displayed=formatNumber(raw,9);
  const relation=displayRelation(raw,displayed);
  const answer=String(n)+' '+units[pair.from].symbol+' '+relation+' '+
   displayed+' '+units[pair.to].symbol;
  return '<li><a href="'+html(pair.url)+'">'+html(pair.title)+'</a>'+
   '<strong>'+html(answer)+'</strong></li>';
 }).join('');
 return '<section class="card category-conversion-examples" aria-label="Worked conversion examples">'+
  '<h2>Example '+html(dimensions[dim].label.toLowerCase())+' conversions</h2>'+
  '<p>Start with a calculated reference value, then open the tool to enter your own measurement. Results marked ≈ are rounded for display.</p>'+
  '<ul>'+rows+'</ul></section>';
}


/** A category is a decision guide, not a copied version of any one tool page. */
const choiceGuides=Object.freeze({
 mass:{heading:'Choose a mass unit, not a force unit',
  guidance:'For a scale reading in pounds, use the pounds-to-kilograms tool. For small measured quantities in mass ounces, choose ounces to grams. Neither choice converts lb into pound-force.',
  slugs:['lbs-to-kg','oz-to-g']},
 length:{heading:'Select a length representation',
  guidance:'Use inches to centimeters for ruler readings, or meters to feet for decimal metric measurements. Fractional ruler inches are different from decimal feet, and area requires squared units.',
  slugs:['in-to-cm','m-to-ft']},
 volume:{heading:'Identify US or imperial volume before converting',
  guidance:'Milliliters to US fluid ounces uses the US liquid volume convention; US gallons to liters is another liquid-volume calculation. Do not substitute a mass-ounce conversion or a UK gallon.',
  slugs:['ml-to-us-fl-oz','us-gal-to-l']},
 temperature:{heading:'Convert absolute temperatures with offsets',
  guidance:'Celsius to Fahrenheit and the reverse transform absolute temperatures. A 10-degree difference is not the same as an absolute temperature of 10 degrees on either scale.',
  slugs:['celsius-to-fahrenheit','fahrenheit-to-celsius']},
 pressure:{heading:'Choose the displayed pressure unit',
  guidance:'Kilopascals to psi is useful when the source is in kPa; bar to psi is a separate conversion. A unit change does not change gauge pressure into absolute pressure.',
  slugs:['kpa-to-psi','bar-to-psi']},
 torque:{heading:'Match the torque notation on the specification',
  guidance:'Foot-pound-force and newton-meters are torque units. Use the direction corresponding to the source label; neither tool determines the correct tightening specification for equipment.',
  slugs:['ft-lbf-to-nm','nm-to-ft-lbf']},
 time:{heading:'Decimal durations are not clock times',
  guidance:'Minutes to hours yields decimal hours; milliseconds to seconds handles much shorter elapsed intervals. Use duration values, not calendar timestamps or wall-clock time zones.',
  slugs:['minutes-to-hours','milliseconds-to-seconds']},
 speed:{heading:'Preserve physical speed while changing its unit',
  guidance:'Use km/h to mph when the source is metric, or mph to km/h for the reverse. A unit conversion does not adjust for a speedometer, wind or direction.',
  slugs:['kmh-to-mph','mph-to-kmh']},
 area:{heading:'Area conversion uses squared factors',
  guidance:'Square meters to square feet converts area directly. A result in feet instead of square feet is a different physical dimension and cannot describe the same area.',
  slugs:['m2-to-ft2']},
 force:{heading:'Force is not weight expressed in pounds',
  guidance:'Kilonewtons to pound-force is a force conversion. If the source is a mass measurement in lb or kg instead, choose the mass category.',
  slugs:['kn-to-lbf']},
 storage:{heading:'Check decimal versus binary storage units',
  guidance:'Gigabytes to megabytes uses decimal prefixes (1000). Operating systems sometimes use binary GiB/MiB; always read the original unit label.',
  slugs:['gb-to-mb']},
 density:{heading:'Convert density, not mass into volume',
  guidance:'kg/m³ to g/cm³ changes density units. Knowing only kilograms does not determine liters without a material density.',
  slugs:['kg-m3-to-g-cm3']},
 power:{heading:'Specify the horsepower convention',
  guidance:'Kilowatts to horsepower here uses mechanical horsepower. Electric, metric and boiler horsepower are separate definitions and can change the result.',
  slugs:['kw-to-hp']},
 acceleration:{heading:'Use acceleration units, not speed',
  guidance:'m/s² to ft/s² compares accelerations. An m/s speed measurement is a different physical quantity; converting it requires a speed tool.',
  slugs:['ms2-to-fts2']},
 fuel:{heading:'Fuel economy and consumption are inverse quantities',
  guidance:'US mpg to L/100 km is a reciprocal calculation, not a fixed multiplier. It uses US rather than imperial gallons and requires a positive input.',
  slugs:['mpg-us-to-l-100km']},
 flow:{heading:'Volumetric flow differs from total volume',
  guidance:'L/min to m³/h converts volume per time. Without an elapsed duration it does not determine the total liters that passed, and it is not mass flow.',
  slugs:['l-min-to-m3-h']}
});
export function categoryDecisionHtml(dim,allPairs){
 const data=choiceGuides[dim];if(!data)throw new RangeError('Unknown category decision guide: '+dim);
 const links=data.slugs.map(slug=>{
  const pair=allPairs.find(p=>p.slug===slug&&units[p.from]?.dimension===dim);
  if(!pair)throw new RangeError('Missing category-specific tool: '+slug);
  return '<li><a href="'+html(pair.url)+'">'+html(pair.title)+'</a></li>';
 }).join('');
 return '<section class="card category-decision" data-category-decision="'+html(dim)+'">'+
  '<h2>'+html(data.heading)+'</h2><p>'+html(data.guidance)+'</p>'+
  '<p><strong>Open the matching tool:</strong></p><ul>'+links+'</ul>'+
  '<p class="hint">Definitions and unit-convention boundaries are documented in '+
  '<a href="/methodology/#verified-conversion-facts">the source reference index</a>.</p>'+
  '</section>';
}
export function categoryDecisionDimensions(){return Object.keys(choiceGuides);}
