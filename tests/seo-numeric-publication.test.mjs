import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolveNumericPilotPublication} from '../src/seo-numeric-publication.mjs';

const policy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url),'utf8'));
const pilotUrls=policy.pilotIndexUrls;
const host='https://qa.example.test';
const params={isProduction:true,site:host,mode:'curated',pilotUrls};

test('custom-domain indexing alone indexes NONE of the fifteen unreviewed numeric candidates',()=>{
 const r=resolveNumericPilotPublication(params);
 assert.deepEqual(r.publishedUrls,[]);
 assert.equal(r.reason,'numeric-review-not-approved');
 assert.equal(pilotUrls.length,15);
});
test('real host-bound explicit approval is limited to exact permitted pilot URLs',()=>{
 const approvedUrls=pilotUrls.slice(0,2).join(',');
 const r=resolveNumericPilotPublication({...params,approvedHost:'qa.example.test',
 approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedUrls});
 assert.deepEqual(r.publishedUrls,pilotUrls.slice(0,2));
 assert.equal(r.reason,'explicit-per-url-numeric-approval');
});
test('unknown, 77 unapproved, duplicated and malformed approval values fail closed',()=>{
 const known=pilotUrls[0];
 for(const input of [
  {...params,approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedHost:'qa.example.test',approvedUrls:'/convert/unknown/100/'},
  {...params,approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedHost:'wrong.test',approvedUrls:known},
  {...params,approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedHost:'qa.example.test',approvedUrls:known+','+known},
  {...params,approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedHost:'qa.example.test',approvedUrls:known+','},
  {...params,approval:'yes',approvedHost:'qa.example.test',approvedUrls:known},
  {...params,approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedHost:'qa.example.test',approvedUrls:''},
  {...params,approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedHost:'qa.example.test',approvedUrls:known+'?query=1'}
 ])assert.throws(()=>resolveNumericPilotPublication(input),RangeError);
 const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url),'utf8'));
 const excluded=seeds.find(x=>!pilotUrls.includes(x.url)).url;
 assert.throws(()=>resolveNumericPilotPublication({...params,approval:'I_APPROVE_SELECTED_NUMERIC_URLS',
  approvedHost:'qa.example.test',approvedUrls:excluded}),/Unreviewed/);
});
test('preview and branch builds suppress even inherited numeric release approval',()=>{
 for(const input of [
  {...params,isProduction:false,approvedHost:'qa.example.test',approval:'I_APPROVE_SELECTED_NUMERIC_URLS',approvedUrls:pilotUrls[0]},
  {...params,isProduction:false,mode:'all',approval:'bad',approvedUrls:'/convert/unknown/'}
 ])assert.deepEqual(resolveNumericPilotPublication(input).publishedUrls,[]);
});
test('production must never activate all 92 numeric pages even with old all-mode confirmation',()=>{
 assert.throws(()=>resolveNumericPilotPublication({...params,mode:'all'}),/forbidden on production/);
});
