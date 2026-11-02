/**
 * Never ship research exports, historical competitor keyword metrics or
 * internal QA reports with the public Cloudflare Pages static directory.
 *
 * All audits run before this step. CI archives qa-reports as an Actions artifact.
 * Public build-info.json contains only the deliberately public build stamp.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const qa=path.join(root,'qa-reports');
const reportNames=[
 'quality-report.json','release-audit-report.json',
 'performance-budget-report.json','keyword-evidence-review.json',
 'keyword-evidence-review.csv','seo-editorial-review.json',
 'seo-editorial-review.csv','seo-source-landing-review.csv',
 'seo-content-audit.json','seo-crawl-audit.json','seo-url-inventory.csv'
];
if(!fs.existsSync(path.join(dist,'index.html')))throw Error('No complete public build in dist.');
// Validate the full audit first so a partial build cannot masquerade as a
// clean release merely because an expected report never ran.
for(const name of reportNames){
 const file=path.join(dist,name);
 if(!fs.existsSync(file)||!fs.statSync(file).isFile()||fs.statSync(file).size===0)
  throw Error('Required internal QA report missing or empty: '+name);
}
fs.rmSync(qa,{recursive:true,force:true});
fs.mkdirSync(qa,{recursive:true});
for(const name of reportNames)fs.renameSync(path.join(dist,name),path.join(qa,name));
const exposed=fs.readdirSync(dist).filter(name=>
 name.endsWith('.csv')||
 (name.endsWith('.json')&&name!=='build-info.json')||
 /audit|evidence|review|report/i.test(name));
if(exposed.length)throw Error('Sensitive internal QA files remain in deployment output: '+exposed.join(', '));
if(!fs.existsSync(path.join(dist,'sitemap.xml'))||
 !fs.existsSync(path.join(dist,'robots.txt'))||
 !fs.existsSync(path.join(dist,'build-info.json')))
 throw Error('Required public SEO metadata was incorrectly removed.');
console.log('PUBLIC ASSET BOUNDARY: moved '+reportNames.length+
 ' internal audit reports out of dist and into qa-reports; 0 review files exposed.');
