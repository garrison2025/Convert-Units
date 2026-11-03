/**
 * Explain real conversion caveats and verifiable numeric cross-checks.
 * Not SEO filler: content is based on the actual dimension and its units.
 * No invented medical advice, use cases, rankings or author credentials.
 */
import {units,dimensions,convert,formatNumber,formula,displayRelation,feetInchesReadout} from './assets/engine.mjs';

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
  advice:'A US fluid ounce measures volume, not the mass ounce. A US gallon is 3.785411784 liters; an imperial gallon is 4.54609 liters. Recipes and container labels must identify which convention is intended. Cubic millimeters (mm³) and milliliters (mL) are both volume: 1 mL = exactly 1,000 mm³.',
  check:'A US cup is 1/16 of a US liquid gallon, while a US tablespoon is one-half US fluid ounce. Volume cannot be converted to mass without a material density.'
 },
 temperature:{
  title:'Temperature scales include offsets',
  advice:'Absolute temperatures in Celsius, Fahrenheit and kelvin need an offset as well as a scale factor. A change of one Celsius degree is a change of 1.8 Fahrenheit degrees, but 1 °C is not 1.8 °F as an absolute temperature.',
  check:'Negative Celsius or Fahrenheit values can be valid, but temperatures below absolute zero are not. The conversion engine validates the physical lower bound.'
 },
 pressure:{
  title:'Pressure versus force',
  advice:'Pressure describes force over area. PSI, kPa, hPa, conventional mmHg, bar and standard atmosphere are pressure units, not mass or force units. One bar is exactly 1,000 hPa. The mmHg-to-Pa factor used here is an approximate published conventional reference; it must not be confused with a torr definition. Distinguish gauge pressure from absolute pressure.',
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
  check:'Case matters: 1 GB is exactly 8 Gb, because a byte contains 8 bits. GB and Gb are different from GiB and Gi(b), and the same label should not be silently interpreted as the other. Converting size does not predict download time or compression.'
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
  '<p class="hint">For category-specific factors, conventions and original sources see <a href="/methodology/#verified-conversion-facts">verified conversion examples</a>. For general SI conversion tables see <a href="'+sourceUrl+'" rel="noopener noreferrer">NIST Guide to the SI</a>.</p></section>';
}

/**
 * Source-computed practical cross-checks on existing length, speed and torque
 * direction pages. Fixed references do not change the live user's input and
 * never create additional numerical SEO URLs.
 */
export function engineeringReference(pair){
 const dim=units[pair.from]?.dimension;
 const numeric=(n,id)=>esc(formatNumber(n,6))+' '+esc(units[id].symbol);
 const value=(source,from,to)=>numeric(convert(source,from,to),to);
 const table=(heading,subtitle,columns,rows,footnote)=>
  '<section class="card engineering-reference" data-engineering-reference="'+dim+'" data-engineering-source="'+esc(pair.from)+'">'+
  '<h2>'+esc(heading)+'</h2><p>'+esc(subtitle)+'</p>'+
  '<div class="reference-scroll"><table class="number-table reference-table"><thead><tr>'+
  columns.map(x=>'<th scope="col">'+esc(x)+'</th>').join('')+
  '</tr></thead><tbody>'+rows.map(cells=>'<tr>'+cells.map((x,i)=>i===0?'<th scope="row">'+x+'</th>':'<td>'+x+'</td>').join('')+'</tr>').join('')+
  '</tbody></table></div><p class="hint">'+esc(footnote)+'</p></section>';
 if(dim==='length'){
  if(pair.from==='m'){
   const meters=[0.5,1,1.75,2,3];
   return table('Meters to feet and fractional inches',
    'One metric measurement shown as decimal feet and as whole feet plus inches; choose the representation you actually need.',
    ['Meters','Decimal feet','Feet and inches (nearest 1/16 in)'],
    meters.map(n=>{const mix=feetInchesReadout(n,'m');return [numeric(n,'m'),value(n,'m','ft'),esc(mix.fractionalRelation+' '+mix.fractional)];}),
    '1 international foot = exactly 0.3048 m. Mixed feet/inches are rounded to the nearest 1/16 inch for display, not measurement accuracy.');
  }
  if(pair.from==='ft'){
   const feet=[1,3,5.5,6,10];
   return table('Feet to meters and centimeters',
    'Decimal feet are not a feet-and-inches notation. For example, 5.5 ft means 5 ft 6 in.',
    ['Decimal feet','Meters','Centimeters'],
    feet.map(n=>[numeric(n,'ft'),value(n,'ft','m'),value(n,'ft','cm')]),
    '1 international foot = exactly 0.3048 m; a fractional foot must be multiplied by 12 to find its inches.');
  }
  if(pair.from==='cm'){
   const centimeters=[1,2.54,5,10,30];
   return table('Centimeters to decimal and fractional inches',
    'The decimal-inch value and the nearest 1/16-inch ruler mark are different display formats.',
    ['Centimeters','Decimal inches','Nearest 1/16 inch'],
    centimeters.map(n=>{const mix=feetInchesReadout(n,'cm');return [numeric(n,'cm'),value(n,'cm','in'),esc(mix.fractionalRelation+' '+mix.fractional)];}),
    '1 international inch = exactly 2.54 cm. Fractional ruler marks are rounded for reading; use decimal inches for subsequent calculations.');
  }
  const fractions=[['1/16',1/16],['1/8',1/8],['1/4',1/4],['1/2',1/2],['1',1]];
  return table('Fractional inches to metric lengths',
   'Inch ruler marks are exact fractions, not decimal-looking measurements.',
   ['Inches on a ruler','Millimeters','Centimeters'],
   fractions.map(([fraction,n])=>[esc(fraction)+' in',value(n,'in','mm'),value(n,'in','cm')]),
   'One international inch is exactly 25.4 mm. A fraction such as 1/8 inch is 0.125 inch, not 0.8 inch.');
 }
 if(dim==='speed'){
  const from=pair.from,n=from==='kmh'?100:60;
  return table(from==='kmh'?'100 km/h across four speed units':'60 mph across four speed units',
   'One value is converted from the source unit of this page into the alternative road, SI and nautical units.',
   ['Source speed',from==='kmh'?'mph':'km/h','m/s','Knots'],
   [[numeric(n,from),value(n,from,from==='kmh'?'mph':'kmh'),value(n,from,'m-s'),value(n,from,'knot')]],
   'One international statute mile = 1,609.344 m; one nautical mile = 1,852 m. Equivalents are not safety or legal-speed advice.');
 }
 if(dim==='torque'){
  const from=pair.from,n=100;
  return table(from==='nm'?'100 newton-meters in other torque units':'100 foot-pound-force in other torque units',
   'The source torque is expressed in three additional units without rounding intermediate calculations.',
   ['Source torque',from==='nm'?'Foot-pound-force':'Newton-meters','Inch-pound-force','Kilogram-force meters'],
   [[numeric(n,from),value(n,from,from==='nm'?'ft-lbf':'nm'),value(n,from,'in-lbf'),value(n,from,'kgf-m')]],
   'A foot-pound-force is exactly 12 inch-pound-force. This is torque, not energy or pound mass. Use the manufacturer specification for tightening.');
 }
 return '';
}

/**
 * Mechanical, electric, metric and boiler horsepower are different standards.
 * These read-only comparisons do not change the live calculator's mechanical-hp unit.
 * Conventions and names checked against the actual Inch Calculator kW-to-hp page.
 */
export function horsepowerConventionsReference(pair){
 if(pair.slug!=='kw-to-hp')return '';
 if(units[pair.from]?.dimension!=='power'||pair.from!=='kw'||pair.to!=='hp')
  throw new RangeError('Mechanical horsepower reference must only appear on kW-to-hp');
 const standards=[
  ['Mechanical horsepower, hp(I)',units.hp.factor,'Live converter'],
  ['Electric horsepower, hp(E)',746,'For comparison only'],
  ['Metric horsepower, hp(M)',735.49875,'For comparison only'],
  ['Boiler horsepower, hp(S)',9809.5,'For comparison only']
 ];
 const values=standards.map(([name,w,scope])=>'<tr><th scope="row">'+esc(name)+'</th>'+
  [1,5].map(k=>'<td>'+esc(formatNumber(k*1000/w,6))+' hp</td>').join('')+
  '<td>'+esc(scope)+'</td></tr>').join('');
 return '<section class="card" data-horsepower-conventions aria-label="Horsepower standards comparison">'+
  '<h2>Which horsepower standard?</h2>'+
  '<p><strong>This converter uses mechanical horsepower (hp(I)) only.</strong> Other horsepower definitions produce different numerical answers for the same kilowatts. Confirm the convention on the source label before comparing ratings.</p>'+
  '<div class="reference-scroll"><table class="number-table reference-table"><thead><tr>'+
  '<th scope="col">Horsepower convention</th><th scope="col">1 kW in hp</th><th scope="col">5 kW in hp</th><th scope="col">Converter support</th></tr></thead>'+
  '<tbody>'+values+'</tbody></table></div>'+
  '<p class="hint">Mechanical hp uses approximately 745.699871582 W per hp; electric hp uses 746 W, metric hp uses 735.49875 W and boiler hp uses 9,809.5 W per hp by the conventions shown. Display results are rounded. <a href="https://www.inchcalculator.com/convert/kilowatt-to-horsepower/" rel="noopener noreferrer">Compare horsepower definitions</a>.</p>'+
  '</section>';
}

/**
 * Unit labels can be context-sensitive even when all math in the converter is correct.
 * These *static* conventions do NOT change live unit definitions. Public regulatory
 * references and definitions are cited; do not claim medical or dietary advice.
 */
export function conventionComparison(pair){
 const slug=pair.slug;
 if(!['us-cup-to-ml','us-tbsp-to-us-tsp','gb-to-mb'].includes(slug))return '';
 const row=cells=>'<tr><th scope="row">'+esc(cells[0])+'</th>'+cells.slice(1).map(t=>'<td>'+esc(t)+'</td>').join('')+'</tr>';
 const table=(heading,lead,headers,rows,note,links)=>
  '<section class="card standards-comparison" data-standards-comparison="'+esc(slug)+'">'+
  '<h2>'+esc(heading)+'</h2><p>'+lead+'</p>'+
  '<div class="reference-scroll"><table class="number-table reference-table"><thead><tr>'+
  headers.map(x=>'<th scope="col">'+esc(x)+'</th>').join('')+
  '</tr></thead><tbody>'+rows.map(row).join('')+'</tbody></table></div>'+
  '<p class="hint">'+note+' '+links+'</p></section>';
 if(slug==='us-cup-to-ml'){
  const cup=convert(1,'us-cup','ml');
  return table('Which cup does your source mean?',
   '<strong>This calculator uses the US customary measuring cup (8 US fl oz).</strong> A US Nutrition Facts label uses a different 240 mL labeling convention, while metric cups are commonly 250 mL.',
   ['Convention','1 cup in mL','2 cups in mL','Where used'],
   [
    ['US customary measuring cup',formatNumber(cup,7),formatNumber(2*cup,7),'This live converter'],
    ['US nutrition labeling cup','240','480','FDA serving-size labels'],
    ['Metric cup','250','500','Metric cooking measures']
   ],
   'These conventions are not interchangeable when precise volume matters. A volume does not determine the mass of an ingredient.',
   '<a href="https://www.unitconverters.net/volume/cups-to-ml.htm" rel="noopener noreferrer">US customary cup definition</a> · <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-guidelines-determining-metric-equivalents-household-measures" rel="noopener noreferrer">FDA nutrition-label measures</a>.');
 }
 if(slug==='us-tbsp-to-us-tsp'){
  const tbsp=convert(1,'us-tbsp','ml'),tsp=convert(1,'us-tsp','ml');
  return table('US tablespoons, nutrition labels, and Australian tablespoons',
   '<strong>This converter uses US customary tablespoons and teaspoons: 1 US tbsp = 3 US tsp.</strong> Kitchen recipes and US nutrition labels can use slightly different milliliter sizes.',
   ['Convention','1 tablespoon in mL','Teaspoons per tablespoon','Important distinction'],
   [
    ['US customary tbsp',formatNumber(tbsp,9),'3','This live converter; 1 US tsp ≈ '+formatNumber(tsp,9)+' mL'],
    ['US nutrition-label tbsp','15','3','FDA label: 1 teaspoon = 5 mL'],
    ['Australian tablespoon','20','4','With 5 mL metric teaspoons']
   ],
   'Do not silently replace US customary tablespoons with metric or Australian spoons. A tablespoon is volume, not ingredient mass.',
   '<a href="https://www.unitconverters.net/volume/tablespoon-us-to-teaspoon-us.htm" rel="noopener noreferrer">US spoon definitions</a> · <a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/guidance-industry-guidelines-determining-metric-equivalents-household-measures" rel="noopener noreferrer">FDA food-label standards</a>.');
 }
 const binary=convert(1,'gib','mib');
 return table('Decimal GB is not binary GiB',
  '<strong>This calculator converts decimal gigabytes to decimal megabytes: 1 GB = 1,000 MB.</strong> Some software uses binary counting, which should be labeled GiB and MiB. These quantities have different byte counts.',
  ['Standard','1 source unit','Target size','Byte count of source'],
  [
   ['Decimal (SI)','1 GB','1,000 MB',formatNumber(convert(1,'gb','mb')*units.mb.factor,0)+' bytes'],
   ['Binary (IEC)','1 GiB',formatNumber(binary,0)+' MiB',formatNumber(units.gib.factor,0)+' bytes']
  ],
  'GB/MB use powers of 10; GiB/MiB use powers of 2. Comparing a number of GB with the same number of GiB compares different byte sizes.',
  '<a href="https://csrc.nist.gov/glossary/term/gibi_byte" rel="noopener noreferrer">NIST gibibyte definition</a> · <a href="https://www.unitconverters.net/data-storage-converter.html" rel="noopener noreferrer">Storage unit comparison</a>.');
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
   '</section>'+engineeringReference(pair)+horsepowerConventionsReference(pair)+conventionComparison(pair);
}

/**
 * Helpful, crawlable routes for someone exploring an exact numeric answer.
 * Only links to existing directional tools; excludes numeric sibling URLs
 * (which remain conservatively noindex by default). Prioritizes the reverse
 * pair, then other choices sharing an input or output unit.
 */
/** Relevant existing directions first, never numerical noindex URLs. */
export function rankedRelatedDirections(pair,allPairs,limit=6){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Invalid related direction');
 const rank=x=>x.from===pair.to&&x.to===pair.from?0:
  x.from===pair.from?1:x.to===pair.to?2:
  x.from===pair.to||x.to===pair.from?3:4;
 return allPairs.filter(x=>x.slug!==pair.slug&&
  units[x.from]?.dimension===from.dimension&&units[x.to]?.dimension===from.dimension)
  .sort((a,b)=>rank(a)-rank(b)||a.slug.localeCompare(b.slug)).slice(0,limit);
}

export function relatedDirectionLinks(pair,allPairs){
 const from=units[pair.from],to=units[pair.to];
 if(!from||!to||from.dimension!==to.dimension)throw new RangeError('Invalid related direction');
 const choices=rankedRelatedDirections(pair,allPairs,4);
 return '<section class="mini-card related-direction-links" aria-label="Related unit conversion tools">'+
   '<h3>Other conversions in '+esc(dimensions[from.dimension].label.toLowerCase())+'</h3>'+
   '<p>Use a different direction or unit with a complete interactive calculator.</p>'+
   '<div class="chiplist">'+
   choices.map(x=>'<a class="chip" href="'+esc(x.url)+'">'+
    esc(units[x.from].name)+' to '+esc(units[x.to].name)+'</a>').join('')+
   '</div><a class="related-directory" href="/category/'+esc(from.dimension)+'/">All '+
   esc(dimensions[from.dimension].label.toLowerCase())+' conversions</a></section>';
}
