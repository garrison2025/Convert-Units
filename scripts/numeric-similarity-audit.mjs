/**
 * Read-only structural similarity review for all 92 static numeric pages.
 * A diagnostic of repeated editorial structure, NOT a Google similarity score,
 * an indexing verdict, or a reason to automatically add noindex/canonical.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {units,convert,formatNumber,dimensionUnits} from '../src/assets/engine.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const seeds=JSON.parse(fs.readFileSync(path.join(root,'src/data/seeds.json'),'utf8'));
const pairs=JSON.parse(fs.readFileSync(path.join(root,'src/data/pairs.json'),'utf8'));
const info=JSON.parse(fs.readFileSync(path.join(dist,'build-info.json'),'utf8'));
const pairBySlug=new Map(pairs.map(p=>[p.slug,p]));
const byDirection=new Map();
const actualPublished=new Set(info.mode==='production'?(info.numericPublishedUrls||[]):[]);
if(seeds.length!==92||pairBySlug.size!==38)throw Error('Unexpected seed or direction count.');
if(info.mode==='production'&&actualPublished.size!==info.numericIndexablePages)
 throw Error('Publication inventory mismatch in similarity audit.');

function textOnly(html) {
 return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
  .replace(/<[^>]+>/g,' ')
  .replace(/&nbsp;|&#160;/gi,' ')
  .replace(/&amp;/gi,'&').replace(/&quot;/gi,'"')
  .replace(/&#39;|&apos;/gi,"'").replace(/\s+/g,' ').trim();
}
function normalizeParagraph(html) {
 return textOnly(html).toLowerCase()
  .replace(/[+-]?\d+(?:[.,]\d+)*(?:e[+-]?\d+)?/gi,'#')
  .replace(/\s+/g,' ').trim();
}
function matches(html,tag) {
 const out=[],re=new RegExp('<'+tag+'\\b[^>]*>([\\s\\S]*?)<\\/'+tag+'>','gi');
 for(const m of html.matchAll(re))out.push(m[1]);
 return out;
}
const entries=seeds.map(seed=>{
 const pair=pairBySlug.get(seed.slug);
 if(!pair)throw Error('Missing direction for '+seed.url);
 const file=path.join(dist,seed.url.replace(/^\/+/,''),'index.html');
 const html=fs.readFileSync(file,'utf8');
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
 if(!main)throw Error('Missing SSR main for '+seed.url);
 const paragraphs=[...new Set(matches(main,'p').map(normalizeParagraph).filter(t=>t.length>=35))];
 const headings=[...new Set([...matches(main,'h2'),...matches(main,'h3')]
  .map(normalizeParagraph).filter(Boolean))];
 const hasCrossCheck=main.includes('data-numeric-intent-check="'+seed.url+'"');
 const hasSourceScenario=main.includes('data-source-rounding-scenario="'+seed.url+'"');
 if(!hasSourceScenario)throw Error('Missing source rounding scenario '+seed.url);
 const alternatives=dimensionUnits(units[pair.from].dimension)
  .filter(u=>u.id!==pair.from&&u.id!==pair.to).slice(0,4);
 const table=main.match(/<h2>Same value in other units<\/h2>[\s\S]*?<\/table>/i)?.[0]||'';
 for(const unit of alternatives){
  const expected=formatNumber(convert(seed.value,pair.from,unit.id),6);
  if(!table.includes(expected+' '+unit.symbol))
   throw Error('Missing correctly formatted alternate result for '+seed.url+' => '+unit.id+': '+expected);
 }
 const row={url:seed.url,direction:seed.slug,sourceQuery:seed.keyword,
  indexEligibleOnThisBuild:actualPublished.has(seed.url),hasValueSpecificCrossCheck:hasCrossCheck,
  hasSourceScenario,
  paragraphCount:paragraphs.length,headingCount:headings.length,paragraphs,headings};
 if(!byDirection.has(seed.slug))byDirection.set(seed.slug,[]);
 byDirection.get(seed.slug).push(row);
 return row;
});
for(const group of byDirection.values()){
 const reuse=new Map();
 for(const row of group)for(const p of row.paragraphs)
  reuse.set(p,(reuse.get(p)||0)+1);
 for(const row of group){
  row.sameDirectionPages=group.length;
  row.reusedParagraphsWithinDirection=row.paragraphs.filter(p=>reuse.get(p)>1).length;
  row.reusedParagraphShare=row.paragraphCount?
   Number((row.reusedParagraphsWithinDirection/row.paragraphCount).toFixed(3)):0;
  row.repeatedHeadingCount=row.headings.filter(h=>
   group.some(other=>other!==row&&other.headings.includes(h))).length;
 }
}
const fields=['url','direction','sourceQuery','indexEligibleOnThisBuild',
 'sameDirectionPages','hasValueSpecificCrossCheck','hasSourceScenario','paragraphCount',
 'reusedParagraphsWithinDirection','reusedParagraphShare','headingCount','repeatedHeadingCount'];
const quote=x=>'"'+String(x??'').replaceAll('"','""')+'"';
fs.writeFileSync(path.join(dist,'numeric-similarity-audit.csv'),
 [fields.join(','),...entries.map(r=>fields.map(f=>quote(r[f])).join(','))].join('\r\n')+'\r\n');
const summary={
 generatedAt:new Date().toISOString(),releaseMode:info.mode,allPages:entries.length,
 eligiblePages:entries.filter(x=>x.indexEligibleOnThisBuild).length,
 sameDirectionClusters:[...byDirection.values()].filter(x=>x.length>1).length,
 largestSameDirectionCluster:Math.max(...[...byDirection.values()].map(x=>x.length)),
 pagesWithValueSpecificCrossCheck:entries.filter(x=>x.hasValueSpecificCrossCheck).length,
 pagesWithSourceScenarios:entries.filter(x=>x.hasSourceScenario).length,
 pagesWithoutValueSpecificCrossCheck:entries.filter(x=>!x.hasValueSpecificCrossCheck).length,
 notes:[
 'Template paragraph overlap is a site-internal lexical diagnostic, not a Google duplicate-content score.',
 'Distinct numeric results and tools may satisfy distinct queries despite shared template text.',
 'Search Console crawling, Google-selected canonicals and actual impressions cannot be inferred from this report.',
 'No index, canonical, sitemap or robots policies were changed by this audit.'
 ],
 topRepeatedExamples:entries.filter(r=>r.sameDirectionPages>1)
  .sort((a,b)=>b.reusedParagraphShare-a.reusedParagraphShare||a.url.localeCompare(b.url))
  .slice(0,12).map(r=>Object.fromEntries(fields.map(f=>[f,r[f]])))
};
fs.writeFileSync(path.join(dist,'numeric-similarity-audit.json'),JSON.stringify(summary,null,2)+'\n');
console.log('NUMERIC TEMPLATE REVIEW:',JSON.stringify({pages:summary.allPages,
 published:summary.eligiblePages,crossChecks:summary.pagesWithValueSpecificCrossCheck,
 sourceScenarios:summary.pagesWithSourceScenarios,
 repeatedDirectionClusters:summary.sameDirectionClusters,
 note:'Evidence for editorial review only; no Google penalty or noindex decision inferred.'}));
