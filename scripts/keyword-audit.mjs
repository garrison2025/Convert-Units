/**
 * Offline, evidence-only release inventory. No estimates are invented.
 * All keyword metrics belong to the observed COMPETITOR, never this website.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {units,escapeCsvCell} from '../src/assets/engine.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const plan=fs.readFileSync(path.join(root,'research/SEO-PLAN-V2.md'),'utf8');
const seeds=JSON.parse(fs.readFileSync(path.join(root,'src/data/seeds.json'),'utf8'));
const pairs=JSON.parse(fs.readFileSync(path.join(root,'src/data/pairs.json'),'utf8'));
const failures=[];
if(seeds.length!==92||pairs.length!==38)failures.push('Approved V2 inventory differs from 92 numeric / 38 pair pages');
const urls=new Set(),keywords=new Set();
const bySlug=new Map();
for(const item of seeds){
 if(urls.has(item.url))failures.push('Duplicate numeric route '+item.url);
 urls.add(item.url);
 if(!plan.includes(item.url))failures.push('URL absent from approved V2 plan: '+item.url);
 if(!item.keyword||!String(item.keyword).trim())failures.push('Missing source keyword for '+item.url);
 const uniqueKey=item.keyword.toLowerCase().trim();
 if(keywords.has(uniqueKey))failures.push('Repeated source keyword: '+item.keyword);
 keywords.add(uniqueKey);
 for(const field of ['volumeUS','kd','rank','trafficEstimate']){
  if(!Number.isFinite(item[field])||item[field]<0)failures.push('Missing or invalid competitor '+field+' for '+item.url);
 }
 if(item.kd>100||item.rank<0)failures.push('Invalid competitor KD/rank for '+item.url);
 if(!/^\/[a-z0-9./-]+$/.test(item.competitorURL||''))failures.push('Missing competitor URL path for '+item.url);
 if(!Number.isFinite(item.value)||!item.valueText)failures.push('Missing verified numeric input for '+item.url);
 const pair=pairs.find(p=>p.slug===item.slug)||
   (item.slug==='seconds-to-hours'?{from:'seconds',to:'hours'}:null);
 if(!pair)failures.push('Unmapped keyword converter '+item.url);
 const cluster=bySlug.get(item.slug)||[];
 cluster.push(item);
 bySlug.set(item.slug,cluster);
}
const reviewed=seeds.map(item=>{
 const peerCount=(bySlug.get(item.slug)||[]).length;
 const u=pairs.find(p=>p.slug===item.slug)||
   (item.slug==='seconds-to-hours'?{from:'seconds',to:'hours'}:null);
 return {
  route:item.url,keyword:item.keyword,unitDirection:item.slug,
  sourceUnit:u?units[u.from].symbol:null,targetUnit:u?units[u.to].symbol:null,
  originalNumericValue:item.value,competitorSearchVolumeUS:item.volumeUS,
  competitorKeywordDifficulty:item.kd,competitorObservedRank:item.rank>0?item.rank:null,
  competitorRankSourceValue:item.rank,competitorRankEvidence:item.rank===0?'source reports rank 0; no valid position confirmed':'source ranking estimate',
  competitorTrafficEstimate:item.trafficEstimate,competitorLandingPath:item.competitorURL,
  sameDirectionPageCount:peerCount,
  editorialRisk:peerCount>=10?'high duplication cluster':peerCount>=2?'similar intent cluster':'single value in direction',
  indexDecision:'unreviewed — do not infer index eligibility',
  source:'approved V2 Semrush competitor keyword dataset'
 };
}).sort((a,b)=>b.competitorSearchVolumeUS-a.competitorSearchVolumeUS||b.competitorTrafficEstimate-a.competitorTrafficEstimate);
const groups=[...bySlug].map(([slug,items])=>({
 slug,pageCount:items.length,
 comparablePairs:items.length*(items.length-1)/2,
 maxObservedCompetitorVolumeUS:Math.max(...items.map(x=>x.volumeUS)),
 highestObservedCompetitorTrafficEstimate:Math.max(...items.map(x=>x.trafficEstimate)),
 risk:items.length>=10?'high duplication cluster':items.length>=2?'similar intent cluster':'single numeric page'
})).sort((a,b)=>b.pageCount-a.pageCount);
const sourceAnomalies=reviewed.filter(x=>x.competitorRankSourceValue===0).map(x=>({route:x.route,keyword:x.keyword,reason:'Source rank=0 cannot be interpreted as an actual organic search position.'}));
const report={
 sourceAnomalies,
 note:'Volume, KD, rank and traffic estimate originate from competitor Semrush results; no metrics are from ExactUnit. Index decisions remain open; this audit never adds/removes indexable pages.',
 date:'2026-11-02',numericPages:seeds.length,verifiedSourceRoutes:urls.size,
 groups,records:reviewed,failures
};
fs.writeFileSync(path.join(dist,'keyword-evidence-review.json'),JSON.stringify(report,null,2));
const fields=['route','keyword','unitDirection','originalNumericValue','competitorSearchVolumeUS',
 'competitorKeywordDifficulty','competitorObservedRank','competitorRankSourceValue','competitorRankEvidence','competitorTrafficEstimate',
 'competitorLandingPath','sameDirectionPageCount','editorialRisk','indexDecision'];
const csv=[fields.join(','),...reviewed.map(row=>fields.map(key=>escapeCsvCell(row[key])).join(','))].join('\r\n');
fs.writeFileSync(path.join(dist,'keyword-evidence-review.csv'),csv);
console.log('KEYWORD AUDIT:',seeds.length,'real keyword records,',groups.length,'direction groups;',
 failures.length,'errors,',groups.filter(g=>g.pageCount>=10).length,'high-duplication groups');
if(failures.length){console.error(failures.slice(0,25).join('\n'));process.exitCode=1;}
