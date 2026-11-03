
/**
 * Human-readable conversion standard and provenance index.
 * Exactly one engine-computed example per existing measurement category.
 * Notes describe the convention selected by our tools; references are standards
 * background, NOT claims that a standards body tested this website.
 * No invented Google/AI indexing or ranking claims, no new SEO routes.
 */
import {units,dimensions,convert,formatNumber,displayRelation} from './assets/engine.mjs';

const entries=Object.freeze([
  {
    "dimension": "mass",
    "slug": "lbs-to-kg",
    "value": 1,
    "note": "An international avoirdupois pound is a mass unit (lb); pound-force (lbf) is a different quantity.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "length",
    "slug": "in-to-cm",
    "value": 1,
    "note": "The international inch is defined as exactly 2.54 centimeters; do not substitute a rounded ruler reading.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "volume",
    "slug": "us-gal-to-l",
    "value": 1,
    "note": "This is a US liquid gallon, not a UK imperial gallon. Fluid ounces are units of volume, not mass.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "temperature",
    "slug": "celsius-to-fahrenheit",
    "value": 0,
    "note": "Temperature needs an offset: °F = (°C × 9/5) + 32, not a simple multiplication.",
    "sourceLabel": "BIPM SI Brochure",
    "sourceUrl": "https://www.bipm.org/en/publications/si-brochure"
  },
  {
    "dimension": "pressure",
    "slug": "kpa-to-atm",
    "value": 101.325,
    "note": "A standard atmosphere is 101.325 kPa by definition. This changes units, not gauge pressure to absolute pressure.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "torque",
    "slug": "ft-lbf-to-nm",
    "value": 1,
    "note": "Foot-pound-force measures torque, not pound mass; the output is not a manufacturer's tightening specification.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "time",
    "slug": "minutes-to-hours",
    "value": 60,
    "note": "A decimal duration of 1.5 hours is one hour and 30 minutes, not one hour and 50 minutes.",
    "sourceLabel": "BIPM SI Brochure",
    "sourceUrl": "https://www.bipm.org/en/publications/si-brochure"
  },
  {
    "dimension": "speed",
    "slug": "mph-to-kmh",
    "value": 60,
    "note": "International statute miles differ from nautical miles; converting speed does not determine travel time.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "area",
    "slug": "m2-to-ft2",
    "value": 1,
    "note": "Area factors are squared length factors; 1 square foot is 0.09290304 square meters.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "force",
    "slug": "kn-to-lbf",
    "value": 1,
    "note": "The symbol lbf means pound-force, not the lb unit of mass; no gravitational acceleration is assumed.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "storage",
    "slug": "gb-to-mb",
    "value": 1,
    "note": "The calculator uses decimal GB and MB (powers of 1000). Binary GiB and MiB use powers of 1024.",
    "sourceLabel": "IEC 80000-13 overview",
    "sourceUrl": "https://webstore.iec.ch/en/publication/87379"
  },
  {
    "dimension": "density",
    "slug": "kg-m3-to-g-cm3",
    "value": 1000,
    "note": "Density relates mass and volume. A material's volume cannot be inferred from its mass without density.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "power",
    "slug": "kw-to-hp",
    "value": 1,
    "note": "This calculator uses mechanical horsepower; metric and electrical horsepower have other factors.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "acceleration",
    "slug": "ms2-to-fts2",
    "value": 1,
    "note": "The foot here is the international foot, exactly 0.3048 m; acceleration is not itself a force.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "fuel",
    "slug": "mpg-us-to-l-100km",
    "value": 30,
    "note": "US miles per gallon and liters per 100 km are reciprocals, not a constant multiplier; zero is not a valid finite conversion.",
    "sourceLabel": "NIST SI conversion factors",
    "sourceUrl": "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9"
  },
  {
    "dimension": "flow",
    "slug": "l-min-to-m3-h",
    "value": 1,
    "note": "Volumetric flow measures volume per time; converting it does not tell you the total volume without a duration.",
    "sourceLabel": "BIPM SI Brochure",
    "sourceUrl": "https://www.bipm.org/en/publications/si-brochure"
  }
]);

const esc=x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;')
 .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

export function standardsReferenceFacts(pairs){
 if(!Array.isArray(pairs))throw new TypeError('Need the real conversion pair registry');
 const facts=entries.map(e=>{
  const pair=pairs.find(p=>p.slug===e.slug);
  if(!pair)throw new RangeError('Missing actual reference converter: '+e.slug);
  const from=units[pair.from],to=units[pair.to];
  if(!from||!to||from.dimension!==e.dimension||to.dimension!==e.dimension)
   throw new RangeError('Reference dimension mismatch: '+e.slug);
  const result=convert(e.value,pair.from,pair.to);
  const shown=formatNumber(result,9);
  const relation=displayRelation(result,shown);
  if(!['=','≈'].includes(relation))throw new Error('Invalid displayed relation');
  return {...e,url:pair.url,from:from.symbol,to:to.symbol,shown,relation,
   title:pair.title,dimensionTitle:dimensions[e.dimension].label};
 });
 if(facts.length!==Object.keys(dimensions).length ||
    new Set(facts.map(x=>x.dimension)).size!==facts.length ||
    new Set(facts.map(x=>x.url)).size!==facts.length)
  throw new Error('The 16 source-backed measurement groups must remain unique');
 return facts;
}
export function standardsReferenceHtml(pairs){
 const facts=standardsReferenceFacts(pairs);
 const rows=facts.map(f=>'<tr data-standard-dimension="'+esc(f.dimension)+'"><th scope="row">'+
  esc(f.dimensionTitle)+'</th><td><a href="'+esc(f.url)+'">'+esc(f.value)+' '+
  esc(f.from)+' '+esc(f.relation)+' '+esc(f.shown)+' '+esc(f.to)+'</a></td><td>'+
  esc(f.note)+'</td><td><a href="'+esc(f.sourceUrl)+
  '" target="_blank" rel="noopener noreferrer">'+esc(f.sourceLabel)+'</a></td></tr>').join('');
 const us=convert(1,'us-fl-oz','ml'),uk=convert(1,'imp-fl-oz','ml');
 const usText=formatNumber(us,9),ukText=formatNumber(uk,9);
 const binary=convert(1,'gib','mib');
 return '<section id="verified-conversion-facts" class="standards-facts" aria-labelledby="verified-conversion-heading">'+
  '<h2 id="verified-conversion-heading">Checkable conversion facts across 16 measurement types</h2>'+
  '<p>Every value below is calculated by the same deterministic engine used in the live converters, not transcribed from a keyword list. The linked standards describe the underlying definitions and conventions; they have not certified or audited ConvertUnits.cc. An equals sign means the displayed decimal matches the computed result at the chosen precision; it is not a claim of independent calibration.</p>'+
  '<div class="reference-scroll"><table class="number-table reference-table"><caption>Selected reference values, unit conventions, limits, and external definitions</caption><thead><tr><th scope="col">Measurement</th><th scope="col">Calculated example</th><th scope="col">Definition or limitation</th><th scope="col">External reference</th></tr></thead><tbody>'+
  rows+'</tbody></table></div>'+
  '<h2 id="unit-conventions">Do not mix unit conventions</h2>'+
  '<p><strong>US versus UK fluid ounces:</strong> 1 US fl oz '+esc(displayRelation(us,usText))+' '+
   esc(usText)+' mL; 1 UK imperial fl oz '+esc(displayRelation(uk,ukText))+' '+esc(ukText)+
   ' mL. These are different volume standards; neither is the mass ounce. Use the <a href="/convert/ml-to-us-fl-oz/">US fluid-ounce converter</a> only for the US convention.</p>'+
  '<p><strong>Decimal versus binary storage:</strong> 1 GB = 1,000 MB; 1 GiB = '+
   esc(formatNumber(binary,0))+' MiB. The <a href="/convert/gb-to-mb/">GB to MB tool</a> uses decimal prefixes. See the <a href="'+
   esc(entries.find(e=>e.dimension==='storage').sourceUrl)+
   '" rel="noopener noreferrer" target="_blank">IEC binary-prefix standard overview</a> for naming conventions.</p>'+
  '<p><strong>Mass versus force:</strong> lb is pound mass, whereas lbf is pound-force. They cannot be interchanged by a bare unit conversion. See <a href="/category/mass/">mass</a> and <a href="/category/force/">force</a> tools for compatible units.</p>'+
  '<p><strong>Display precision:</strong> An approximate symbol (≈) identifies a rounded decimal result; the actual conversion retains its underlying factor. Measurement tolerance, survey conventions, regulatory rounding, and manufacturer requirements must be assessed independently.</p>'+
  '<p class="hint">For further details, see <a href="https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors" rel="noopener noreferrer" target="_blank">NIST Guide to the SI</a> and the <a href="https://www.bipm.org/en/publications/si-brochure" rel="noopener noreferrer" target="_blank">BIPM SI Brochure</a>. These external references provide definitions, not third-party certification of our software.</p>'+
  '</section>';
}
