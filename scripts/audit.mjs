import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const root=new URL('../dist/',import.meta.url);const build=JSON.parse(fs.readFileSync(new URL('build-info.json',root)));
const indexPolicy=JSON.parse(fs.readFileSync(new URL('../src/data/numeric-seo-policy.json',import.meta.url)));
const pairs=JSON.parse(fs.readFileSync(new URL('../src/data/pairs.json',import.meta.url)));const seeds=JSON.parse(fs.readFileSync(new URL('../src/data/seeds.json',import.meta.url)));
function content(url){const f=new URL(url.slice(1)+'index.html',root);assert.ok(fs.existsSync(f),'Missing '+f);return fs.readFileSync(f,'utf8');}
const published=build.mode==='production'?new Set(build.numericPublishedUrls||[]):new Set(build.numericIndexMode==='all'?seeds.map(s=>s.url):indexPolicy.pilotIndexUrls);
const excluded=new Set(seeds.filter(x=>!published.has(x.url)).map(x=>x.url));
let count=0;const routes=['/',...pairs.map(p=>p.url),...seeds.map(s=>s.url),'/all-converters/','/universal-converter/','/batch-converter/', '/methodology/','/privacy/','/about/','/contact/','/terms/'];
assert.ok(['preview','production'].includes(build.mode),'Build mode must be explicit');
if(build.mode==='production') {
 assert.ok(build.site.startsWith('https://'),'Canonical origin must be HTTPS');
 assert.ok(!new URL(build.site).hostname.endsWith('.pages.dev'),'Production canonical cannot be a pages.dev host');
} else assert.equal(build.site,null,'Preview must not claim a production domain');
const seen=new Set();for(const url of routes){if(seen.has(url))throw Error('duplicate '+url);seen.add(url);const html=content(url);assert.match(html,/<title>.+<\/title>/);assert.match(html,/<h1[\s>]/);if(build.mode==='production'&&!excluded.has(url))assert.ok(html.includes(`rel="canonical" href="${new URL(url,build.site).toString()}"`),'Wrong canonical on '+url);else if(build.mode==='production'){assert.ok(html.includes('content="noindex,follow"'),url+': expected noindex');assert.ok(!html.includes('rel="canonical"'),url+': excluded page must not claim canonical');}else{assert.ok(!html.includes('rel="canonical"'),'Preview must not publish canonical: '+url);assert.ok(html.includes('content="noindex,follow"'),'Preview page missing noindex: '+url);}assert.ok(html.includes('name="description"'));if(build.mode==='production'&&!excluded.has(url))assert.ok(html.includes('application/ld+json'));
 if(build.mode==='production'&&excluded.has(url))assert.ok(!html.includes('application/ld+json'),'Excluded numeric page should not claim indexable structured data');assert.ok(html.includes('data-converter')||['/all-converters/','/batch-converter/','/methodology/','/privacy/','/about/','/contact/','/terms/'].includes(url)||url==='/');if(url.startsWith('/convert/')&&url.split('/').filter(Boolean).length===3){assert.match(html,/CONVERSION RESULT/);assert.match(html,/data-copy-answer/);assert.match(html,/data-load-value/);}count++;}
assert.ok(fs.existsSync(new URL('assets/styles.css',root)),'Missing consolidated CSS');for(const fragment of ['.inner-page','.multi-unit-panel','@media print'])assert.ok(fs.readFileSync(new URL('assets/styles.css',root),'utf8').includes(fragment),'Missing CSS fragment: '+fragment);assert.equal(pairs.length,38);assert.equal(seeds.length,92);const xml=fs.readFileSync(new URL('sitemap.xml',root),'utf8');assert.ok(xml.includes('<urlset'));assert.ok(!xml.includes('https://convert-units.pages.dev'),'Sitemap contains obsolete domain');
const robots=fs.readFileSync(new URL('robots.txt',root),'utf8');if(build.mode==='production'){
 assert.ok(robots.includes(`Sitemap: ${build.site}/sitemap.xml`),'robots.txt sitemap origin mismatch');
 for(const url of routes.filter(x=>!excluded.has(x))){const can=new URL(url,build.site).toString();assert.ok(xml.includes(can.replaceAll('&','&amp;')),url+' missing sitemap');}
 for(const url of excluded)assert.ok(!xml.includes(new URL(url,build.site).toString()),url+' excluded URL appears in sitemap');
}else{
 assert.ok(!robots.includes('Sitemap:'),'Preview should not publish sitemap URL');
 assert.equal(build.indexablePages,0,'Preview pages must not be indexable');
 assert.ok(fs.readFileSync(new URL('_headers',root),'utf8').includes('X-Robots-Tag: noindex'),'Preview missing noindex response header');
}
const headers=fs.readFileSync(new URL('_headers',root),'utf8');
for(const hostRule of ['https://:project.pages.dev/*','https://:version.:project.pages.dev/*'])assert.ok(headers.includes(hostRule+'\n  X-Robots-Tag: noindex'),'Preview host indexing guard missing: '+hostRule);
assert.equal((xml.match(/<loc>/g)||[]).length,build.indexablePages);
assert.ok(fs.existsSync(new URL('404.html',root)));console.log('AUDIT PASS:',count,'routes checked; indexable:',build.indexablePages);
