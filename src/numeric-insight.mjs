/**
 * Source-backed, value-specific sanity checks for exactly the 15 original
 * numeric pilot candidates. These are calculated displays, not fabricated
 * use cases, traffic metrics, search claims, or indexing approvals.
 *
 * Each card helps a reader verify a specific input through other compatible
 * units. It is deliberately absent from the 77 held numeric pages.
 */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';

const specs=Object.freeze({
 '/convert/kg-to-lbs/240/':{
  outputs:[['lbs','International pounds'],['oz','Mass ounces'],['g','Grams']],
  note:'Mass ounces and pounds are avoirdupois mass units; pound-force measures force, not mass.'
 },
 '/convert/lbs-to-kg/126/':{
  outputs:[['kg','Kilograms'],['g','Grams'],['oz','Mass ounces']],
  note:'One international avoirdupois pound is exactly 0.45359237 kilograms. Decimal places in these results describe display rounding.'
 },
 '/convert/ft-lbf-to-nm/400/':{
  outputs:[['nm','Newton-meters of torque'],['in-lbf','Inch-pound-force'],['kgf-m','Kilogram-force meters']],
  note:'This is a torque comparison. It is not a tightening specification and does not turn pound-force into pound mass.'
 },
 '/convert/celsius-to-fahrenheit/37.9/':{
  outputs:[['fahrenheit','Absolute Fahrenheit'],['kelvin','Absolute Kelvin']],
  note:'Celsius-to-Fahrenheit absolute temperatures require an offset. An equal-sized temperature change is calculated differently.',
  extra:'temperature-delta'
 },
 '/convert/minutes-to-hours/10000/':{
  outputs:[['hours','Decimal hours'],['days','Decimal 24-hour days'],['seconds','Seconds']],
  note:'Decimal hours are not the same notation as hours and minutes. This is an elapsed duration, not a clock time.',
  extra:'duration-components'
 },
 '/convert/milliseconds-to-minutes/3600000/':{
  outputs:[['minutes','Minutes'],['hours','Hours'],['seconds','Seconds']],
  note:'Milliseconds use 1,000 units per second. Minutes and hours use 60-based elapsed time, not decimal clock notation.',
  extra:'duration-components'
 },
 '/convert/kpa-to-atm/50/':{
  outputs:[['atm','Standard atmospheres'],['bar','Bar'],['pa','Pascals']],
  note:'These are pressure unit equivalents only. Whether a source specification means absolute or gauge pressure must be checked separately.'
 },
 '/convert/in-to-cm/17.7/':{
  outputs:[['cm','Centimeters'],['mm','Millimeters'],['ft','Decimal feet']],
  note:'17.7 inches means a decimal inch measurement, not 17 feet 7 inches; the feet value here is decimal, not a feet-and-inches reading.'
 },
 '/convert/seconds-to-minutes/6000/':{
  outputs:[['minutes','Decimal minutes'],['hours','Decimal hours'],['days','Decimal days']],
  note:'A 100-minute duration is 1 hour 40 minutes, not 1.40 hours.',
  extra:'duration-components'
 },
 '/convert/kpa-to-psi/108/':{
  outputs:[['psi','Pounds-force per square inch'],['bar','Bar'],['atm','Standard atmospheres']],
  note:'psi is a pressure, not a force or a mass. Gauge versus absolute pressure is not inferred from a value alone.'
 },
 '/convert/milliseconds-to-seconds/60000/':{
  outputs:[['seconds','Seconds'],['minutes','Minutes'],['hours','Hours']],
  note:'60,000 milliseconds equals 60 seconds and exactly 1 minute; no time zone or calendar convention is involved.',
  extra:'duration-components'
 },
 '/convert/ml-to-us-fl-oz/355/':{
  outputs:[['us-fl-oz','US fluid ounces'],['imp-fl-oz','UK imperial fluid ounces'],['us-cup','US customary cups']],
  note:'US and UK fluid ounces have different volume definitions. Neither is the ounce used for mass.'
 },
 '/convert/kmh-to-mph/330/':{
  outputs:[['mph','Statute miles per hour'],['knot','Knots (nautical miles per hour)'],['m-s','Meters per second']],
  note:'mph uses the international statute mile; a knot uses an international nautical mile. Both are speeds, not distances.'
 },
 '/convert/seconds-to-hours/14400/':{
  outputs:[['hours','Hours'],['minutes','Minutes'],['days','Decimal days']],
  note:'14,400 seconds is an elapsed four-hour interval, not a wall-clock timestamp.',
  extra:'duration-components'
 },
 '/convert/m-to-ft/8849/':{
  outputs:[['ft','Decimal feet'],['mi','International miles'],['in','Inches']],
  note:'Decimal feet should not be read as feet-and-inches notation. Use the separate mixed-units readout if that display is required.'
 }
});
export const numericInsightUrls=Object.freeze(Object.keys(specs));
const escape=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

function additionalCheck(seed,pair,spec){
 if(spec.extra==='temperature-delta'){
  // An interval is not the absolute Celsius/Fahrenheit conversion.
  const delta=convert(seed.value,pair.from,'fahrenheit')-convert(0,pair.from,'fahrenheit');
  return '<p class="numeric-insight-extra"><strong>Absolute vs. change:</strong> a change of '+
   escape(seed.valueText)+' °C corresponds to a change of '+
   escape(formatNumber(delta,6))+' °F, without the +32 absolute-temperature offset.</p>';
 }
 if(spec.extra==='duration-components'){
  const total=convert(seed.value,pair.from,'seconds');
  if(!Number.isSafeInteger(total)||total<0)return '';
  const day=Math.floor(total/86400);
  const hour=Math.floor(total%86400/3600);
  const min=Math.floor(total%3600/60);
  const sec=total%60;
  const bits=[];
  if(day)bits.push(day+' day'+(day===1?'':'s'));
  if(hour)bits.push(hour+' hour'+(hour===1?'':'s'));
  if(min)bits.push(min+' minute'+(min===1?'':'s'));
  if(sec||!bits.length)bits.push(sec+' second'+(sec===1?'':'s'));
  return '<p class="numeric-insight-extra"><strong>Whole-unit duration:</strong> '+
    escape(bits.join(', '))+'. This is a duration breakdown, not a time of day.</p>';
 }
 return '';
}
export function numericInsight(seed,pair){
 const spec=specs[seed.url];
 if(!spec)return '';
 if(seed.slug!==pair.slug||!Number.isFinite(seed.value)||!units[pair.from]||!units[pair.to])
  throw new RangeError('Invalid numeric insight source');
 const from=units[pair.from],to=units[pair.to];
 const items=spec.outputs.map(([target,label])=>{
  if(units[target]?.dimension!==from.dimension)throw new RangeError('Incompatible numeric insight target: '+target);
  const raw=convert(seed.value,pair.from,target),value=formatNumber(raw,9);
  return '<div class="numeric-insight-value"><dt>'+escape(label)+'</dt><dd>'+
   escape(displayRelation(raw,value))+' '+escape(value)+' <small>'+escape(units[target].symbol)+'</small></dd></div>';
 }).join('');
 return '<section class="numeric-intent-check" data-numeric-intent-check="'+escape(seed.url)+'" aria-label="Cross-check this conversion">'+
  '<div class="numeric-insight-head"><span>VERIFY THIS INPUT</span><h2>Cross-check '+escape(seed.valueText)+' '+escape(from.symbol)+'</h2>'+
  '<p>Independent representations of the same quantity, calculated directly from the original value.</p></div>'+
  '<dl class="numeric-insight-grid">'+items+'</dl>'+
  additionalCheck(seed,pair,spec)+
  '<p class="numeric-insight-note">'+escape(spec.note)+' These displays do not imply greater source-measurement accuracy.</p>'+
  '<p class="numeric-insight-parent">For any other amount, use the <a href="'+escape(pair.url)+'">'+
   escape(from.symbol)+' to '+escape(to.symbol)+' live converter</a>.</p></section>';
}
