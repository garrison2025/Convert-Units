# Google SEO — competitor landing-page spot-check (2026-11-02)

**Scope:** Current public web-search results for a handful of sample phrases and the approved Semrush competitor dataset in this repository. This is **not** a fixed-location (US), device-specific, signed-out Google top-10 SERP audit. The public engine results below do not establish positions, total traffic, CTR, zero-click rate or page RPM. The 26-URL numeric index pilot stays provisional.

## Observed competing pages

| User intent | Publicly found examples | Supported observation | Honest implication for ExactUnit |
|---|---|---|---|
| `149 lbs to kg` exact answer | https://calculat.io/en/weight/lbs-to-kg/149 ; https://freeunitconvert.com/en/weight/lb-to-kg/149/ ; https://www.urwatools.com/lbs-to-kg/149 | Competing pages already render the correct result, formula and nearby conversion table | A template with formula + numeric table alone is not a strong differentiation claim |
| `240 kg to lbs` exact answer | https://calculat.io/en/weight/kg-to-lbs/240 ; https://multicalculators.com/converters/weight/kg-to-lbs/ | 240 kg conversion and detailed numeric tables exist | Better calculation accuracy, compound units and usability are helpful but organic visibility is unverified |
| `batch unit converter` | https://unitly.tooleek.com/en/batch-converter ; https://universalunitconverter.net/tools/batch/ | Existing browser-local competitors offer spreadsheet-column workflows, at least one offers mixed row-specific units, and one openly limits rows to 200 | ExactUnit's 1,000-row limit alone is not enough to establish a defensible non-brand keyword opportunity; retain honest scope/limitations |
| `how to convert ml to mg` | https://calculator.academy/ml-to-mg-calculator/ ; https://coolconversion.com/chemistry/ml-to-mg/ | Dedicated competitors ask for substance density and/or labeled concentration to produce valid mass from volume | A fixed-factor converter would be scientifically unsound; treat this as a separate research candidate, not three instant SEO pages |

## Google-owned guidance checked

- [Creating helpful people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): Google explicitly treats useful interactive calculators as main content, emphasizes factual accuracy and user benefit, and has no preferred word count.
- [Canonical URL guidelines](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): consolidated duplicates should generally use suitable rel=canonical or redirects; `noindex` is not recommended merely to coerce canonical selection. Existing excluded numeric pages are intentionally suppressed from search, not claimed as signal-consolidating duplicates.
- [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/): host-specific `X-Robots-Tag: noindex` is supported for `*.pages.dev` and preview subdomains.
- [Google software app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app): free application price and utilities category can be described with factual software markup; markup does **not** guarantee rich results.

## How this changed the actual product

1. Added specific, verifiable measurement notes and numerical checks to every **38 direction-level calculator**, and source-linked measurement explanations to all **16 categories**; do not generate fabricated contexts or fake authors.
2. Added a static SEO HTML content audit to CI (in addition to existing link/canonical/sitemap, performance, numerical and real Chromium checks).
3. Improved the batch page's input instructions and stated limitations so users can assess whether its CSV workflow will meet their needs.
4. Kept the **26 numeric / 66 suppressed** launch index policy; source evidence cannot establish that all 92 short-answer queries deserve independent Google listings.
5. Did not launch a speculative mass-to-volume or concentration tool, buy a domain, or claim any AdSense/GSC success.

## Specific next evidence gates

When ready for a genuine Google US SERP audit, record for selected phrases: `country=US`, device type, date, instant-answer/AI-overview position, top-ten **actual** landing page URLs, brand diversity, whether tools or articles rank, and repeat after 7/30 days. Target at least `149 lbs to kg`, `240 kg to lbs`, `400 pound feet to nm`, `14400 seconds to hours`, `how to convert ml to mg` and independent `batch unit converter` variants. Search Console, not Semrush competitor estimates, must later provide ExactUnit's own query impressions, clicks, CTR and index coverage.

Do not claim a ranking improvement based only on source edits, lighthouse budgets, JSON-LD or passing CI. Published URL decisions remain in `src/data/numeric-seo-policy.json`.
