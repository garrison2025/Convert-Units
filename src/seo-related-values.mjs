/**
 * Related existing numeric results, ordered by the distance of the value.
 * This is a navigation aid and factual cross-check, not keyword stuffing.
 * No routes are generated here: only links to the verified seeds registry.
 */
import {units,convert,formatNumber,displayRelation} from './assets/engine.mjs';

const escapeHtml=s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;')
  .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');

export function relatedNumericAnswers(seed, pair, seeds, limit=4) {
  if(!seed||!pair||!Array.isArray(seeds)||!Number.isInteger(limit)||limit<1||limit>8)
    throw new TypeError('Expected an existing numeric seed, direction, and limit between 1 and 8');
  if(seed.slug!==pair.slug||!units[pair.from]||!units[pair.to])
    throw new RangeError('Numeric seed and converter direction do not match');
  const origin=Number(seed.value);
  if(!Number.isFinite(origin))throw new RangeError('Non-finite seed');
  const direction=seeds.filter(s=>s.slug===seed.slug && s.url!==seed.url && Number.isFinite(Number(s.value)));
  direction.sort((a,b)=>Math.abs(a.value-origin)-Math.abs(b.value-origin)||
    Number(a.value)-Number(b.value)||a.url.localeCompare(b.url));
  const linked=direction.slice(0,limit).map(s=>{
    const raw=convert(Number(s.value),pair.from,pair.to);
    const output=formatNumber(raw,6);
    return {url:s.url,slug:s.slug,valueText:s.valueText,from:units[pair.from].symbol,
      to:units[pair.to].symbol,output,relation:displayRelation(raw,output)};
  });
  if(new Set(linked.map(x=>x.url)).size!==linked.length)
    throw new Error('Duplicate related result routes');
  return linked;
}

export function relatedNumericAnswersHtml(seed,pair,seeds) {
  const nearby=relatedNumericAnswers(seed,pair,seeds);
  if(!nearby.length)return '';
  const text=nearby.map(x=>'<a class="chip" href="'+escapeHtml(x.url)+'">'+
    escapeHtml(x.valueText)+' '+escapeHtml(x.from)+' '+
    escapeHtml(x.relation)+' '+escapeHtml(x.output)+' '+
    escapeHtml(x.to)+'</a>').join('');
  return '<section class="numeric-neighbors" aria-labelledby="numeric-neighbors-heading">'+
    '<h2 id="numeric-neighbors-heading">Other values in this conversion</h2>'+
    '<p>Explore nearby published measurements using the same units and independently calculated results.</p>'+
    '<div class="chiplist">'+text+'</div></section>';
}
