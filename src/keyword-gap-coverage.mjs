/**
 * Selected keyword-intent examples from the owner's 600-row Semrush competitor
 * export. These are static *examples on existing pages*, not new URLs.
 * Search volume, ranking and competitor URLs are recorded in the research gate,
 * not falsely presented as this site's traffic.
 */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';
const E=x=>String(x??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const examples=Object.freeze({
 'lbs-to-kg':{row:6,keyword:'24 pounds to kg',from:'lbs',to:'kg',value:24,
  note:'The competitor export linked this query to a 0.24-pound result, not 24 pounds. This example uses the requested 24 lb; it does not assert a matching ranking URL.'},
 'kg-to-lbs':{row:5,keyword:'3.7 kilos to pounds',from:'kg',to:'lbs',value:3.7,
  note:'The observed competitor result URL used a pound unit. The worked example explicitly uses kilograms and does not inherit the competitor URL as numerical proof.'},
 'm-to-ft':{row:8,keyword:'1.85m to feet',from:'m',to:'ft',value:1.85,
  note:'The observed competitor URL contained 1.852 m, a different input. The result below is computed from exactly 1.85 m; decimal feet differ from feet-and-inches notation.'},
 'oz-to-g':{row:26,keyword:'3.5oz to grams',from:'oz',to:'g',value:3.5,
  note:'An ounce here is a mass ounce (avoirdupois), not a US fluid ounce (volume). The recorded keyword had relatively high difficulty; it is not being described as low-competition.'},
 'bar-to-psi':{row:2,keyword:'2.35 bar',from:'bar',to:'psi',value:2.35,
  note:'The original keyword does not specify a target unit. The result below selects psi explicitly; the linked universal converter also supports kPa, hPa and conventional mmHg.'},
 'us-fl-oz-to-ml':{row:14,keyword:'how much is a fluid ounce',from:'us-fl-oz',to:'ml',value:1,
  note:'This example defines one US liquid fluid ounce. A UK imperial fluid ounce and an ounce of mass have different meanings.'},
 'gb-to-mb':{row:53,keyword:'how many gigabits are in a gigabyte',from:'gb',to:'gbit',value:1,
  note:'This is a decimal unit-definition query, not a specific ranked numeric URL. B means bytes and b means bits; 1 GB = 8 Gb, whereas GiB uses binary prefixes.'},
 'ml-to-us-fl-oz':{row:80,keyword:'225ml to oz',from:'ml',to:'us-fl-oz',value:225,
  note:'The original keyword omits whether oz means mass or fluid volume. Here it explicitly means US fluid ounces of liquid volume, not mass ounces.'}
});
export function keywordExampleDetails(slug){const e=examples[slug];if(!e)return null;
 const a=units[e.from],b=units[e.to];if(!a||!b||a.dimension!==b.dimension)throw new Error('Unsupported keyword example '+slug);
 const result=convert(e.value,e.from,e.to),shown=formatNumber(result,9);
 const href='/universal-converter/?from='+encodeURIComponent(e.from)+'&to='+encodeURIComponent(e.to)+'&value='+encodeURIComponent(e.value);
 return {...e,answer:formatNumber(e.value,6)+' '+a.symbol+' '+displayRelation(result,shown)+' '+shown+' '+b.symbol,href};
}
export function keywordExampleHtml(pair){
 const e=keywordExampleDetails(pair.slug);if(!e)return '';
 if(e.from!==pair.from&&pair.slug!=='gb-to-mb')throw new Error('Keyword example on wrong direction');
 return '<section class="card keyword-example" data-keyword-example="'+E(pair.slug)+'">'+
 '<h2>Check a specific conversion question</h2>'+
 '<p><strong>'+E(e.keyword)+'</strong>: '+E(e.answer)+'.</p>'+
 '<p>'+E(e.note)+'</p>'+
 '<p><a href="'+E(e.href)+'">Open this value in the universal converter</a> · <a href="/methodology/">Check definitions and precision</a>.</p>'+
 '</section>';
}
export function keywordExampleSlugs(){return Object.keys(examples);}
