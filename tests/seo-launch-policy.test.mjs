import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveSitePublication} from '../src/seo-launch-policy.mjs';

test('SEO site-url setting alone never makes an unverified domain indexable',()=>{
 for(const siteUrl of ['','https://convert-units-bwa.pages.dev','https://example.org','https://qa.example.test']){
  const result=resolveSitePublication({siteUrl});
  assert.equal(result.isProduction,false,siteUrl);
  assert.equal(result.site,null,siteUrl);
 }
});
test('manual host-bound approval is required to release public canonical and sitemap',()=>{
 const x=resolveSitePublication({
  siteUrl:'https://example.org/',
  approvedHost:'example.org',
  approval:'I_APPROVE_PUBLIC_INDEXING',
  pagesBranch:'main'
 });
 assert.equal(x.isProduction,true);
 assert.equal(x.site,'https://example.org');
 assert.equal(x.reason,'approved-custom-domain');
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://example.org',approvedHost:'another.example.org',approval:'I_APPROVE_PUBLIC_INDEXING'
 }),/exactly match/);
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://example.org',approvedHost:'example.org',approval:'sure'
 }),/exact I_APPROVE_PUBLIC_INDEXING/);
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://example.org',approvedHost:'example.org'
 }),/needs explicit/);
});
test('Cloudflare pages.dev and any branch preview stay noindex even when environment leaks approval',()=>{
 const approved={approvedHost:'example.org',approval:'I_APPROVE_PUBLIC_INDEXING'};
 assert.equal(resolveSitePublication({...approved,siteUrl:'https://example.org',pagesBranch:'staging'}).isProduction,false);
 assert.equal(resolveSitePublication({...approved,siteUrl:'https://example.org',pagesBranch:'feature/foo'}).isProduction,false);
 assert.equal(resolveSitePublication({...approved,siteUrl:'https://example.org',pagesBranch:'main'}).isProduction,true);
 for(const host of ['https://project.pages.dev','https://branch.project.pages.dev']){
  assert.equal(resolveSitePublication({siteUrl:host}).isProduction,false);
  assert.throws(()=>resolveSitePublication({siteUrl:host,approval:'I_APPROVE_PUBLIC_INDEXING'}),/real HTTPS custom domain/);
 }
});
test('invalid URL and accidental tokens fail closed without publishing incorrect canonicals',()=>{
 for(const siteUrl of [
  'http://example.org','https://example.org/path','https://example.org?preview=1',
  'https://example.org/#test','https://foo:pass@example.org','https://example.org:8080'
 ]){
  assert.throws(()=>resolveSitePublication({siteUrl}),/SITE_URL/);
 }
 assert.throws(()=>resolveSitePublication({
  siteUrl:'https://qa.example.test',approval:'I_APPROVE_PUBLIC_INDEXING'
 }),/exactly match/);
});
