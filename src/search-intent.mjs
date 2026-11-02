/**
 * Curated answers to actual unit-conversion user questions on existing pages.
 * This is deliberately NOT a template for mass-producing new SEO URLs or FAQs.
 * The numerical statements are calculated from the same exact-factor engine.
 * No FAQPage structured data is emitted.
 */
import {units,convert,formatNumber,displayRelation,feetInchesReadout} from './assets/engine.mjs';
const E=x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
function fact(value,from,to,digits=6){
 const answer=convert(value,from,to),shown=formatNumber(answer,digits);
 return formatNumber(value,6)+' '+units[from].symbol+' '+displayRelation(answer,shown)+' '+shown+' '+units[to].symbol;
}
const contexts={
 'in-to-cm':{
  questions:[
   ['What is 17.7 inches in centimeters?',()=>fact(17.7,'in','cm')+'. The inch-to-centimeter factor is exact; a reported measurement can still have limited precision.'],
   ['Should the 2.54 cm-per-inch factor be rounded?',()=> 'No. One international inch is defined as exactly 2.54 centimeters. Round only the displayed result to suit your measurement.']
  ],
  next:'in-to-mm',nextLabel:'convert inches to millimeters'
 },
 'cm-to-in':{
  questions:[
   ['How many centimeters make exactly one inch?',()=>fact(2.54,'cm','in')+'. The international inch definition is exact.'],
   ['Is 2.5 centimeters exactly one inch?',()=> 'No. '+fact(2.5,'cm','in',6)+'. A rounded ruler reading is not the same as the exact 2.54 cm definition.']
  ],
  next:'in-to-cm',nextLabel:'convert inches back to centimeters'
 },
 'in-to-mm':{
  questions:[
   ['How many millimeters is one sixteenth of an inch?',()=>fact(1/16,'in','mm',7).replace('0.0625 in','1/16 in')+'. A sixteenth is a fraction, not a decimal digit.'],
   ['Is 1/16 inch the same as 0.16 inch?',()=> 'No. '+fact(0.16,'in','mm',6)+'; by comparison 1/16 in is 1.5875 mm. Read fractional ruler marks as divisions, not decimal hundredths.']
  ],
  next:'in-to-cm',nextLabel:'convert inches to centimeters'
 },
 'm-to-ft':{
  questions:[
   ['How do I read 1.75 meters in feet and inches?',()=>{
    const r=feetInchesReadout(1.75,'m');
    return '1.75 m is '+r.decimalRelation+' '+r.decimal+' or '+r.fractionalRelation+' '+r.fractional+' (nearest 1/16 inch). Both mixed formats are rounded displays.';
   }],
   ['Is a decimal foot value the same as feet and inches?',()=> 'No. For example, 5.5 ft is 5 ft 6 in, not 5 ft 5 in. Multiply the fractional part of a foot by 12 to find the inches.']
  ],
  next:'ft-to-m',nextLabel:'convert feet back to meters'
 },
 'ft-to-m':{
  questions:[
   ['How many meters are six international feet?',()=>fact(6,'ft','m')+'. The international foot is exactly 0.3048 m.'],
   ['Does 6 ft 2 in mean 6.2 decimal feet?',()=> 'No. 6 ft 2 in means 6 + 2/12 feet, which is '+formatNumber(convert(6+2/12,'ft','m'),6)+' m. 6.2 decimal feet is '+formatNumber(convert(6.2,'ft','m'),6)+' m.']
  ],
  next:'m-to-ft',nextLabel:'convert meters back to feet'
 },
 'kmh-to-mph':{
  questions:[
   ['What is 100 kilometers per hour in mph?',()=>fact(100,'kmh','mph',6)+'. The result uses the international mile, exactly 1,609.344 meters.'],
   ['Are mph and knots the same kind of mile per hour?',()=> 'No. A knot means one nautical mile per hour, while mph uses an international statute mile. '+fact(1,'knot','kmh',6)+'.']
  ],
  next:'mph-to-kmh',nextLabel:'convert mph back to km/h'
 },
 'mph-to-kmh':{
  questions:[
   ['What is 60 mph in kilometers per hour?',()=>fact(60,'mph','kmh',6)+'. This is also 26.8224 meters per second.'],
   ['Does a speed conversion calculate travel time or stopping distance?',()=> 'No. A speed in another unit is the same speed; travel time also needs a distance, and stopping distance depends on further conditions not measured here.']
  ],
  next:'kmh-to-mph',nextLabel:'convert km/h back to mph'
 },
 'ft-lbf-to-nm':{
  questions:[
   ['What is 400 foot-pound-force in newton-meters?',()=>fact(400,'ft-lbf','nm',6)+'. The original quantity is torque, measured as a force acting through a lever arm.'],
   ['Are foot-pound-force and inch-pound-force interchangeable numbers?',()=> 'No. '+fact(1,'ft-lbf','in-lbf',6)+'. For a torque-wrench instruction, always use the specified unit and the manufacturer’s tightening value.']
  ],
  next:'nm-to-ft-lbf',nextLabel:'convert newton-meters back to foot-pound-force'
 },
 'nm-to-ft-lbf':{
  questions:[
   ['What is 100 newton-meters in foot-pound-force?',()=>fact(100,'nm','ft-lbf',6)+'. The display is rounded; calculations retain the original conversion factor.'],
   ['Is converting torque the same as choosing a tightening specification?',()=> 'No. The calculator can restate a torque value in different units, but it cannot establish the torque required for a bolt, fastener or assembly.']
  ],
  next:'ft-lbf-to-nm',nextLabel:'convert foot-pound-force back to newton-meters'
 }
};
export const intentSlugs=Object.freeze(Object.keys(contexts));

export function intentAnswers(pair,allPairs){
 const item=contexts[pair.slug];
 if(!item)return '';
 const next=allPairs.find(p=>p.slug===item.next);
 if(!next||units[next.from]?.dimension!==units[pair.from]?.dimension)
  throw new RangeError('Contextual link is missing or not in the same dimension: '+pair.slug);
 const title=units[pair.from].name.toLowerCase()+' to '+units[pair.to].name.toLowerCase();
 return '<section class="card intent-answers" data-intent-answers="'+E(pair.slug)+'" aria-label="Practical conversion questions">'+
  '<h2>Practical questions: '+E(title)+'</h2>'+
  item.questions.map(([question,makeAnswer])=>'<h3>'+E(question)+'</h3><p>'+E(makeAnswer())+'</p>').join('')+
  '<p class="hint">Need a different measurement direction? <a href="'+E(next.url)+'">'+E(item.nextLabel)+'</a>. <a href="/methodology/">Check definitions and rounding</a>.</p>'+
  '</section>';
}
