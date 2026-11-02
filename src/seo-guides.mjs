/**
 * Explain real conversion caveats and verifiable numeric cross-checks.
 * Not SEO filler: content is based on the actual dimension and its units.
 * No invented medical advice, use cases, rankings or author credentials.
 */
import {units,dimensions,convert,formatNumber,formula,displayRelation} from './assets/engine.mjs';

const esc=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

const context={
 mass:{
  title:'Mass is not force',
  advice:'Pounds (lb) and kilograms (kg) measure mass. Pound-force (lbf), by contrast, measures force; a mass-to-force calculation requires an acceleration such as gravity. Never interchange lb and lbf labels.',
  check:'One international avoirdupois pound is defined as exactly 0.45359237 kilogram. Smaller displayed decimal counts are rounding choices, not new physical definitions.'
 },
 length:{
  title:'International foot and inch definitions',
  advice:'The international inch is exactly 0.0254 meter and the international foot is exactly 0.3048 meter. For construction plans or survey data, verify which foot standard the source uses.',
  check:'Length measurements are one-dimensional. Do not reuse a length factor for square feet or cubic feet: those units require squared or cubed factors.'
 },
 volume:{
  title:'US customary versus imperial volume',
  advice:'A US fluid ounce measures volume, not the mass ounce. A US gallon is 3.785411784 liters; an imperial gallon is 4.54609 liters. Recipes and container labels must identify which convention is intended.',
  check:'A US cup is 1/16 of a US liquid gallon, while a US tablespoon is one-half US fluid ounce. Volume cannot be converted to mass without a material density.'
 },
 temperature:{
  title:'Temperature scales include offsets',
  advice:'Absolute temperatures in Celsius, Fahrenheit and kelvin need an offset as well as a scale factor. A change of one Celsius degree is a change of 1.8 Fahrenheit degrees, but 1 °C is not 1.8 °F as an absolute temperature.',
  check:'Negative Celsius or Fahrenheit values can be valid, but temperatures below absolute zero are not. The conversion engine validates the physical lower bound.'
 },
 pressure:{
  title:'Pressure versus force',
  advice:'Pressure describes force over area. PSI, kPa, bar and standard atmosphere are pressure units, not mass or force units. When working with tires or instruments, distinguish gauge pressure from absolute pressure.',
  check:'A standard atmosphere is 101,325 pascals and one bar is 100,000 pascals by definition. A unit conversion does not determine whether the measurement is gauge or absolute.'
 },
 torque:{
  title:'Torque is a moment, not a weight',
  advice:'Torque is force multiplied by a perpendicular lever-arm distance. Foot-pound-force (ft·lbf) is commonly written “foot-pounds” but must not be confused with pounds of mass.',
  check:'Both newton-meters and foot-pound-force represent torque. The calculator changes units only; it cannot determine a recommended tightening torque for a particular part.'
 },
 time:{
  title:'Decimal duration versus clock-style duration',
  advice:'One minute is 60 seconds and one hour is 60 minutes. A result such as 1.5 hours is one hour and 30 minutes, not one hour and 50 minutes.',
  check:'The site treats days as exactly 86,400 seconds. Calendar months, leap seconds and local time zones are separate from fixed elapsed durations.'
 },
 speed:{
  title:'Speed is distance divided by time',
  advice:'Miles per hour, kilometers per hour, knots and meters per second express the same physical speed using different distance and time units. A nautical mile is 1,852 meters.',
  check:'Converting speed does not change the velocity or account for wind, direction, speedometer error or the conditions of a measurement.'
 },
 area:{
  title:'Square-unit factors differ from linear factors',
  advice:'Square meters and square feet are areas. To convert square feet to square meters, use the square of the international foot-to-meter factor, not the factor for one foot.',
  check:'One square foot is exactly 0.09290304 square meters. The calculator does not derive an area from perimeter without additional shape measurements.'
 },
 force:{
  title:'Newton and pound-force',
  advice:'A newton measures force. Pound-force (lbf) is also a force unit; the pound (lb) used for mass is not interchangeable without a gravitational acceleration assumption.',
  check:'Check whether source drawings or specifications describe force, load, torque or mass before using the result.'
 },
 storage:{
  title:'Decimal prefixes versus binary prefixes',
  advice:'One GB (gigabyte) is 1,000,000,000 bytes, while one GiB (gibibyte) is 1,073,741,824 bytes. Many operating systems report binary quantities with different labels.',
  check:'Do not assume GB and GiB are the same unit. A conversion of storage size does not estimate file compression or filesystem overhead.'
 },
 density:{
  title:'Density connects mass and volume',
  advice:'Density equals mass divided by volume. kg/m³ and g/cm³ both measure density; a kilogram by itself cannot be converted to milliliters without knowing the material and its density.',
  check:'One g/cm³ is exactly 1,000 kg/m³. Material densities can depend on composition, pressure and temperature.'
 },
 power:{
  title:'Mechanical horsepower conventions',
  advice:'Power describes work done per unit time. The horsepower convention matters: this calculator uses mechanical horsepower, not metric horsepower or electrical efficiency assumptions.',
  check:'One mechanical horsepower is about 745.6998716 watts. Conversion of rated power does not measure actual power consumption or performance.'
 },
 acceleration:{
  title:'Acceleration is not speed',
  advice:'Acceleration is the rate at which speed changes over time. Meters per second squared and feet per second squared are different from speed units such as meters per second.',
  check:'Use the exact international foot definition of 0.3048 meter when comparing ft/s² with m/s².'
 },
 fuel:{
  title:'Fuel efficiency and consumption are reciprocals',
  advice:'US miles per gallon expresses distance per volume; liters per 100 kilometers expresses volume per distance. The relationship is reciprocal, so you cannot convert with one fixed multiplier.',
  check:'Zero and negative fuel-economy inputs do not yield a finite reciprocal conversion. Imperial MPG is different from US MPG.'
 },
 flow:{
  title:'Volumetric flow versus mass flow',
  advice:'Liters per minute and cubic meters per hour express how much volume moves over time. To convert a volume flow to mass flow, the material density must be known.',
  check:'One cubic meter contains 1,000 liters and one hour contains 60 minutes. Therefore 1 L/min is 0.06 m³/h.'
 }
};
const sourceUrl='https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9';

export function categoryExplanation(dim){
 const item=context[dim];
 if(!item)throw new RangeError('Unknown measurement category: '+dim);
 return '<section class="card measurement-guide" aria-label="Measurement category guidance">'+
  '<h2>Understanding '+esc(dimensions[dim].label.toLowerCase())+'</h2>'+
  '<h3>'+esc(item.title)+'</h3>'+
  '<p>'+esc(item.advice)+'</p>'+
  '<h3>How to verify a conversion</h3><p>'+esc(item.check)+'</p>'+
  '<p class="hint">Source definitions: <a href="'+sourceUrl+'" rel="noopener noreferrer">NIST Guide to the SI</a>. See <a href="/methodology/">our conversion methodology</a> for calculation and rounding details.</p></section>';
}
export function directionExplanation(pair,allPairs){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Unknown or incompatible conversion pair');
 const item=context[from.dimension];
 const one=convert(1,pair.from,pair.to);
 const ten=convert(10,pair.from,pair.to);
 const reverse=allPairs.find(p=>p.from===pair.to&&p.to===pair.from);
 const pretty=number=>esc(formatNumber(number,9));
 // One step, no rounded intermediate result. This calculator's browser code
 // and the SEO's server-prerendered answer use the same tested engine.
 return '<section class="card conversion-guide" aria-label="Conversion formula and verification">'+
   '<h2>Verify '+esc(from.symbol)+' to '+esc(to.symbol)+'</h2>'+
   '<p>Using the stated definitions, <strong>1 '+esc(from.symbol)+' '+displayRelation(one,formatNumber(one,9))+' '+pretty(one)+' '+esc(to.symbol)+
   '</strong> and <strong>10 '+esc(from.symbol)+' '+displayRelation(ten,formatNumber(ten,9))+' '+pretty(ten)+' '+esc(to.symbol)+'</strong>. '+
   'The live converter accepts your own value; the table provides additional check points.</p>'+
   '<h3>Conversion method</h3><p>'+esc(formula(pair.from,pair.to))+'</p>'+
   '<h3>'+esc(item.title)+'</h3><p>'+esc(item.advice)+'</p>'+
   '<p>'+esc(item.check)+'</p>'+
   (reverse?'<p>Need the other direction? <a href="'+esc(reverse.url)+'">Convert '+esc(to.symbol)+' to '+esc(from.symbol)+'</a>.</p>':'')+
   '<p class="hint">Reference: <a href="'+sourceUrl+'" rel="noopener noreferrer">NIST conversion factors</a>. Calculation and display rounding are separate. <a href="/methodology/">See how we calculate</a>.</p>'+
   '</section>';
}
