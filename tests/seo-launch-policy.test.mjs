import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveSitePublication} from '../src/seo-launch-policy.mjs';

test('SEO site-url setting alone never makes an unverified domain indexable',()=>{
 for(const siteUrl of ['','https://convert-units-bwa.pages.dev','https://convertunits.cc','https://qa.example.test']){
  const result=resolveSitePublication({siteUrl});
  assert.equal(result.isProduction,false,siteUrl);
  assert.equal(result.site,null,siteUrl);
 }
});
test('manual host-bound approval is required to release public canonical and sitemap',()=>{
 const x=resolveSitePublication({
  siteUrl:'https://convertunits.cc/',
  approvedHost:'convertunits.cc',
  approval:'I_APPROVE_PUBLIC_INDEXING',
  pagesBranch:'main'
 });
 assert.equal(x.isProduction,true);
 assert.equal(x.site,'https://convertunits.cc');
 assert.throws(()=>resolveSitePublication({siteUrl:'https://www.convertunits.cc',approvedHost:'www.convertunits.cc',approval:'I_APPROVE_PUBLIC_INDEXING'}),/official convertunits.cc apex/);
 assert.throws(()=>resolveSitePublication({siteUrl:'https://qa.example.test',approvedHost:'qa.example.test',approval:'I_APPROVE_PUBLIC_INDEXING'}),/official convertunits.cc apex/);
 assert.equal(x.reason,'approved-custom-domain');
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://convertunits.cc',approvedHost:'www.convertunits.cc',approval:'I_APPROVE_PUBLIC_INDEXING'
 }),/exactly match/);
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://convertunits.cc',approvedHost:'convertunits.cc',approval:'sure'
 }),/exact I_APPROVE_PUBLIC_INDEXING/);
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://convertunits.cc',approvedHost:'convertunits.cc'
 }),/needs explicit/);
});
test('Cloudflare pages.dev and any branch preview stay noindex even when environment leaks approval',()=>{
 const approved={approvedHost:'convertunits.cc',approval:'I_APPROVE_PUBLIC_INDEXING'};
 assert.equal(resolveSitePublication({...approved,siteUrl:'https://convertunits.cc',pagesBranch:'staging'}).isProduction,false);
 assert.equal(resolveSitePublication({...approved,siteUrl:'https://convertunits.cc',pagesBranch:'feature/foo'}).isProduction,false);
 assert.equal(resolveSitePublication({...approved,siteUrl:'https://convertunits.cc',pagesBranch:'main'}).isProduction,true);
 for(const host of ['https://project.pages.dev','https://branch.project.pages.dev']){
  assert.equal(resolveSitePublication({siteUrl:host}).isProduction,false);
  assert.throws(()=>resolveSitePublication({siteUrl:host,approval:'I_APPROVE_PUBLIC_INDEXING'}),/real HTTPS custom domain/);
 }
});
test('invalid URL and accidental tokens fail closed without publishing incorrect canonicals',()=>{
 for(const siteUrl of [
  'http://example.org','https://convertunits.cc/path','https://convertunits.cc?preview=1',
  'https://convertunits.cc/#test','https://foo:pass@example.org','https://convertunits.cc:8080'
 ]){
  assert.throws(()=>resolveSitePublication({siteUrl}),/SITE_URL/);
 }
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://convertunits.cc',approval:'I_APPROVE_PUBLIC_INDEXING'
 }),/exactly match/);
});
