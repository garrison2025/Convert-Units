/**
 * Per-tool, source-traceable conversion evidence.
 * Official references explain unit definitions. They do not certify this app.
 * All worked numbers derive from the same tested conversion engine.
 */
import {units,dimensions,convert,formula,formatNumber,displayRelation} from './assets/engine.mjs';

const NIST='https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9';
const BIPM='https://www.bipm.org/en/publications/si-brochure';
const IEC='https://webstore.iec.ch/en/publication/87379';
const escape=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;')
 .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

const provenance=Object.freeze({
 mass:{base:'kg',name:'kg',source:NIST,label:'NIST SP 811, conversion factors',limit:'Pounds here are avoirdupois mass; pound-force is not mass.'},
 length:{base:'m',name:'m',source:NIST,label:'NIST SP 811, length definitions',limit:'International inches and feet are used; historic survey-foot measurements require their own convention.'},
 volume:{base:'l',name:'L',source:NIST,label:'NIST SP 811, volume factors',limit:'US liquid gallons, cups, teaspoons and fluid ounces are not UK imperial volume measures or mass ounces.'},
 temperature:{base:null,name:'K',source:'https://www.nist.gov/pml/owm/si-units-temperature',label:'NIST SI Units — Temperature (exact conversion)',limit:'Absolute temperatures include an offset. Temperature differences use a different formula.'},
 pressure:{base:'pa',name:'Pa',source:NIST,label:'NIST SP 811, pressure factors',limit:'Gauge pressure and absolute pressure require a separate reference-point choice; converting units does not change that reference.'},
 torque:{base:'nm',name:'N·m',source:NIST,label:'NIST SP 811, moment of force',limit:'Foot-pound-force is torque, not pound mass. This tool does not supply a manufacturer tightening requirement.'},
 time:{base:'seconds',name:'s',source:BIPM,label:'BIPM SI Brochure (SI time units)',limit:'Elapsed 24-hour days are fixed durations, not calendar dates or local civil time.'},
 speed:{base:'m-s',name:'m/s',source:NIST,label:'NIST SP 811, speed factors',limit:'International statute miles differ from nautical miles. No wind or measurement calibration is inferred.'},
 area:{base:'m2',name:'m²',source:NIST,label:'NIST SP 811, area factors',limit:'Area uses squared length factors; a linear foot-to-meter factor cannot be used directly.'},
 force:{base:'newton',name:'N',source:NIST,label:'NIST SP 811, force factors',limit:'Pound-force (lbf) is force and must not be confused with pound-mass (lb).'},
 storage:{base:null,name:'byte',source:IEC,label:'IEC 80000-13:2025 overview',limit:'GB and MB use decimal powers of 1000, while GiB and MiB use binary powers of 1024. The linked public page describes the standard, not its paid full text.'},
 density:{base:'kg-m3',name:'kg/m³',source:NIST,label:'NIST SP 811, density factors',limit:'Density and mass are different quantities. A density is required to infer volume from mass.'},
 power:{base:null,name:'W',source:NIST,label:'NIST SP 811, power factors',limit:'Horsepower here is mechanical horsepower; electric, metric and boiler horsepower are different conventions.'},
 acceleration:{base:'ms2',name:'m/s²',source:NIST,label:'NIST SP 811, acceleration factors',limit:'Acceleration is a change of velocity per unit time, not a speed.'},
 fuel:{base:null,name:'',source:NIST,label:'NIST SP 811, US volume and length factors',limit:'US mpg and L/100 km are reciprocal. The calculation does not use imperial gallons or assume driving conditions.'},
 flow:{base:'l-min',name:'L/min',source:BIPM,label:'BIPM SI Brochure (length and time units)',limit:'Volumetric flow is not mass flow unless density is known.'}
});
const exampleValue=Object.freeze({
 mass:10,length:12,volume:16,temperature:100,pressure:100,torque:100,time:60,
 speed:60,area:10,force:10,storage:10,density:1000,power:5,
 acceleration:9.80665,fuel:30,flow:60
});
export function geoVerificationFacts(pair){
 const from=units[pair?.from],to=units[pair?.to];
 if(!from||!to||from.dimension!==to.dimension||!Object.hasOwn(provenance,from.dimension))
  throw new RangeError('GEO reference direction is unknown or incompatible');
 const source=provenance[from.dimension],dim=from.dimension;
 const n=dim==='temperature'?(pair.from==='fahrenheit'?212:100):
  dim==='fuel'?(pair.from==='mpg-us'?30:8):exampleValue[dim];
 const output=convert(n,pair.from,pair.to);
 const formatted=formatNumber(output,9),relation=displayRelation(output,formatted);
 const proof=source.base||dim==='storage'||dim==='power'
  ?[pair.from,pair.to].map(id=>{
    const u=units[id],raw=source.base?convert(1,id,source.base):u.factor;
    const shown=formatNumber(raw,12);
    return {name:u.symbol,relation:displayRelation(raw,shown),value:shown,base:source.name};
   }):[];
 return {slug:pair.slug,dim,n,from:from.symbol,to:to.symbol,shown:formatted,relation,
  rule:formula(pair.from,pair.to),proof,sourceUrl:source.source,
  sourceLabel:source.label,limit:source.limit};
}
export function geoVerificationHtml(pair){
 const f=geoVerificationFacts(pair);
 const derived=f.proof.length
  ?'<p><strong>Trace the units:</strong> '+f.proof.map(x=>'1 '+escape(x.name)+' '+
    escape(x.relation)+' '+escape(x.value)+' '+escape(x.base)).join('; ')+
    '. These reference quantities explain the factors used in the conversion.</p>'
  :f.dim==='temperature'
    ?'<p><strong>Trace the rule:</strong> °C and kelvin differ by 273.15; °F = (°C × 9/5) + 32. Absolute temperature requires an offset.</p>'
    :'<p><strong>Trace the rule:</strong> 1 US liquid gallon = 3.785411784 L and 1 international mile = 1.609344 km. The two fuel-economy expressions are reciprocal.</p>';
 return '<section class="card geo-verification" data-geo-verification="'+escape(f.slug)+'" aria-label="Verify the conversion and definitions">'+
  '<h2>Verify the '+escape(f.from)+' to '+escape(f.to)+' result</h2>'+
  '<p><strong>Worked check:</strong> '+escape(formatNumber(f.n,6))+' '+escape(f.from)+
  ' '+escape(f.relation)+' '+escape(f.shown)+' '+escape(f.to)+
  '. Calculated directly using the same definitions as the live converter.</p>'+
  '<p><strong>Calculation rule:</strong> '+escape(f.rule)+'</p>'+derived+
  '<p><strong>Use the right convention:</strong> '+escape(f.limit)+'</p>'+
  '<p class="hint"><strong>Primary reference:</strong> <a href="'+escape(f.sourceUrl)+
  '" rel="noopener noreferrer" target="_blank">'+escape(f.sourceLabel)+'</a>. '+
  'The reference documents unit definitions or factors; it has not tested or certified this website. '+
  '<a href="/methodology/#verified-conversion-facts">See the methodology and source index</a>.</p>'+
  '</section>';
}
export function geoProvenanceDimensions(){return Object.keys(provenance);}
