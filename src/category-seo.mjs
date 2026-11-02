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
