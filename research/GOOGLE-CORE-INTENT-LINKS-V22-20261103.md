# V22 — Core conversion intent, contextual navigation and static content quality
Date: 2026-11-03 (Singapore). **Do not interpret this report as verified Google rank, indexation or search visits.**

## Actual repo findings

V21 main (SHA `3d58bd5488ffb9bc1246a1ee7b643ba69d19a2c3`) generates 157 static pages from 38 directional pairs, 16 categories and 92 numeric values. The documented release policy conditionally indexes 15 chosen numeric URLs **only after** official-domain approval and keeps 77 noindex. Every Pages.dev page remains noindex.

The existing directional-page sidebar used `pairs.filter(same dimension).slice(0,6)`. The input JSON preserves an arbitrary editor order rather than relationship ranking. For example the real `/convert/in-to-cm/` page listed `m-to-ft` and `ft-to-m` *before* the directly useful `cm-to-in`. Existing numeric pages already had a better ranked-related-links helper, but the main directional sidebar did not reuse it. This is an actual source-level and UX defect, not an inferred SEO benefit.

The V18–V21 pages already contain a quick answer, true conversion formula, source links, reference tables, accurate live calculator and supporting measurement notes. Do not pad every page with generic definitions or mass-produce FAQ schema. A small, finite set of distinct practical questions was missing from nine high-use length, speed and torque direction pages.

## Verified external examples and guidance (not traffic estimates)

- [Google Search Central — link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): semantic HTML `<a href>`, descriptive, natural anchors, relevant contextual internal links and accessible discoverability. Google explicitly says there is no magical ideal number of links.
- [Google Search Central — sitelinks](https://developers.google.com/search/docs/appearance/sitelinks): logical structures, compact page titles/headings, concise relevant internal anchors; avoid unnecessary repetitions.
- [RapidTables inches to cm](https://www.rapidtables.com/convert/length/inch-to-cm.html): a real inch-to-centimeter competitor includes exact factor, decimal/fractional examples and user-facing questions plus a reference table.
- [Inch Calculator km/h to mph](https://www.inchcalculator.com/convert/kilometer-per-hour-to-mile-per-hour/): established real directional competitor with example, speed formula and table; merely adding another generic conversion table offers little incremental user value.
- Technical unit definitions remain grounded in the exact factors in `src/assets/engine.mjs` and the NIST sources already linked in existing guides.

These are verified **public-page and documentation facts**, not Semrush/Ahrefs US rank, Volume, KD or traffic for generic phrases. Do not invent keyword metrics. The historical user-supplied competitor rows for `17.7 inches to cm`, `330kmh to mph` and `400 pound feet to nm` remain competitor-only estimates, not ExactUnit Google Search Console growth.

## V22 implementation (no new routes)

1. Use a shared `rankedRelatedDirections` function for both the **real directional tool sidebar** and existing numeric-page related-tool links. Prioritize exact reverse route, then same input, same output and remaining same-dimension routes. Include real direction URLs only, not noindex numeric paths. Keep the same natural English anchor text and existing CSS.
2. A **finite, manual editorial list of nine existing pages** receives two short, distinct, meaningful user questions each, with answers based on the same engine: `in-to-cm`, `cm-to-in`, `in-to-mm`, `m-to-ft`, `ft-to-m`, `kmh-to-mph`, `mph-to-kmh`, `ft-lbf-to-nm`, `nm-to-ft-lbf`. Covers exact inch factor, fractional inch, decimal versus mixed feet, statute versus nautical mile, and torque versus manufacturer's torque specification.
3. Add exactly **one relevant contextual direction link** plus methodology on each curated section; all nine targets exist and share the correct physical dimension. Retain quick answer as first-screen priority and keep primary calculation at the top. No unsupported testimonials or fabricated search figures.
4. No mass-generated FAQPage structured data. The content is crawlable native HTML without browser JS. No extra front-end JavaScript, CSS, third-party dependency, paid API or network requests.

## QA gates

Source tests enforce 18 engine-derived answers, nine curated routes, reverse-first navigation, real link targets, non-curated exclusions and exact 38/92/15/77 policy. Static SEO checks the *actual rendered HTML* on each directional page, validates the first sidebar destination and rejects templates leaking to unrelated pages. Real Chromium scenarios cover inches to cm, mixed feet/inches, speed, torque, unchanged mass tool and mobile viewport. Cloudflare Actions read-only probe verifies current main SHA, HTML evidence on inch, meter, speed and torque pages, and universal preview noindex.

Budget: 157 static pages unchanged; combined CSS+JS gzip remains limited to 32,768 bytes. All live website `pages.dev` routes remain noindex and have no production canonical/sitemap. Official domain and GSC remain deferred.

**Value conclusion:** navigation clarity and factual content coverage are now testable, but we make **no** claims of ranking improvements or traffic until an approved public domain has Google Search Console impressions/clicks.
