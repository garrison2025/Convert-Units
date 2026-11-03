/**
 * Functional long-tail coverage within the EXISTING category hubs.
 * Links are parameterized interactive calculators; they do not create
 * additional indexable static landing pages.
 */
import {convert,units,formatNumber,displayRelation} from './assets/engine.mjs';
const E=x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const cases=Object.freeze({
 pressure:{heading:'hPa to mmHg: conventional pressure comparison',value:802,from:'hpa',to:'mmhg',
  rule:'1 hPa = exactly 100 Pa. For conventional mmHg this calculator adopts the NIST table factor of approximately 133.3224 Pa per mmHg. These are measurement-unit changes, not conversions from gauge pressure to absolute pressure. The torr is a different convention.',
  source:'https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8',
  label:'NIST Guide to the SI, Appendix B.8'},
 volume:{heading:'Cubic millimeters to milliliters',value:390,from:'mm3',to:'ml',
  rule:'Exactly 1,000 mm³ make 1 mL (one cubic centimeter). Unlike US versus imperial liquid measures, this is an SI metric-volume definition.',
  source:'https://www.nist.gov/pml/owm/si-units-volume',label:'NIST SI Units — Volume'},
 storage:{heading:'GB to Gb: bytes versus bits',value:1,from:'gb',to:'gbit',
  rule:'Exactly 8 bits make one byte: 1 decimal gigabyte (GB) = 8 decimal gigabits (Gb). GB, Gb and GiB have different meanings; network data rates such as Gb/s also include time and are not file sizes.',
  source:'https://webstore.iec.ch/en/publication/87379',label:'IEC 80000-13 standard overview'}
});
export function extendedUnitDetails(dim){
 const x=cases[dim];if(!x)return null;
 const raw=convert(x.value,x.from,x.to),shown=formatNumber(raw,9);
 return {...x,answer:formatNumber(x.value,6)+' '+units[x.from].symbol+' '+displayRelation(raw,shown)+' '+shown+' '+units[x.to].symbol,
  href:'/universal-converter/?from='+encodeURIComponent(x.from)+'&to='+encodeURIComponent(x.to)+'&value='+x.value};
}
export function extendedUnitHtml(dim){
 if(dim==='density')return '<section class="card extended-unit" data-extended-unit="density">'+
  '<h2>Can milliliters be converted to milligrams?</h2>'+
  '<p><strong>Not from a volume alone.</strong> Milliliters (mL) measure volume and milligrams (mg) measure mass. You must know the substance density and its units: mass (mg) = volume (mL) × density (mg/mL).</p>'+
  '<p><strong>Illustration, not a universal water assumption:</strong> For a hypothetical material specified as 1,000 mg/mL, exactly 2 mL would contain 2,000 mg. Other materials give different results; the calculator does not guess a density.</p>'+
  '<p class="hint"><a href="/methodology/">Read methodology and unit limitations</a>. Do not use generic volume-to-mass conversion for medical doses.</p></section>';
 const x=extendedUnitDetails(dim);if(!x)return '';
 return '<section class="card extended-unit" data-extended-unit="'+E(dim)+'">'+
  '<h2>'+E(x.heading)+'</h2><p><strong>Worked result:</strong> '+E(x.answer)+'.</p>'+
  '<p>'+E(x.rule)+'</p>'+
  '<p><a href="'+E(x.href)+'">Try this conversion</a> · <a href="'+E(x.source)+'" rel="noopener noreferrer" target="_blank">'+E(x.label)+'</a>. The reference describes conventions, not independent certification of this site.</p>'+
  '</section>';
}
export function extendedUnitDimensions(){return [...Object.keys(cases),'density'];}
