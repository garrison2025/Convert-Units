# ExactUnit / Convert-Units — release quality evidence
Updated: 2026-11-02

## Acceptance scope (V2)
- [x] 37/37 approved directional tools in `src/data/pairs.json`; no duplicate URLs.
- [x] 92/92 approved static numeric SEO queries in `src/data/seeds.json`; no duplicate URLs.
- [x] All 129 approved /convert/ URLs occur in the checked-in V2 plan (cross-checked 2026-11-02).
- [x] 16 unit categories with a shared deterministic conversion engine.
- [x] Static pages include result, formula, references, related links, and interactive controls; precomputed numeric answers remain visible without JS.
- [x] Browser-only bulk conversion / local CSV and download; no pay-per-call API or backend.
- [x] Live same-value equivalents table for every calculator; source is rendered at build time and updates after interactive changes.
- [x] Native print controls for calculator tables and batch results; printer CSS hides nonessential navigation.
- [x] Resetting the universal converter restores original category and original units.
- [x] Changing batch inputs / units clears obsolete conversion output until recalculation.
- [x] Required /accessibility/ page and footer link.

## Automated build-time quality gates
- GitHub Actions workflow: `.github/workflows/ci.yml`.
- `npm run check` executes the Node unit test suite, static build, cross-link/metadata audit, deep audit, and release audit. The CI workflow additionally builds with `SITE_URL=https://qa.example.test` to verify custom-domain canonical/og:url/sitemap paths.
- `scripts/release-audit.mjs` verifies required routes, internal inbound links and orphans, unique titles/descriptions, canonical and sitemap, all 92 prerendered answer copies, and the live equivalent/print affordances.
- Earlier passing baseline CI: https://github.com/garrison2025/Convert-Units/actions/runs/41366205618. Newest verification is documented below.
- Report outputs in built `dist/`: `quality-report.json`, `release-audit-report.json`, `build-info.json`.
- The comparison signal for same-direction near-identical numeric pages remains **editorial review only**, not a claim of compliance or AdSense eligibility.

## Not yet externally verified — do not announce final production sign-off
- [ ] Official custom domain bound; `SITE_URL` set to that HTTPS origin; live status codes, canonical, redirects and sitemap checked via external HTTP.
- [ ] Public mobile and desktop interactive test, keyboard/screen reader walkthrough, 320px overflow and Lighthouse mobile performance measurement.
- [ ] User search intent/editorial value of highly similar number pages reviewed; passing syntax/links/formulas does not itself ensure organic indexing.
- [ ] Exact native unit-alias search in the individual unit selectors: current interface uses native selects plus 37-tool text search, not a full alias-search combobox.
- [ ] GSC property and sitemap submission, crawl/index data review.
- [ ] Real AdSense approval, publisher ID, updated policy / consent configuration when enabling third-party ads.

## Technical-stack difference
The current implementation uses dependency-free Node ESM static generation and vanilla client JS/CSS, **not** the Astro+TypeScript preference noted in the V2 specification. It satisfies the static/browser-only and zero-paid-API runtime constraint, but should not be described as an Astro project.

## Boundaries
Cloudflare's generated `*.pages.dev` name is a temporary preview, **not** the production URL. Without a valid custom-domain SITE_URL, the build emits noindex, no production canonical and an empty sitemap. Automated CI passing is not proof of production uptime, AdSense acceptance, rankings, traffic, or revenue.

## 2026-11-02 additional pre-domain static audit

Scope: **source code, unit data, test suite and generated-page audits only**. The official domain has not been purchased. No live-domain, real browser, Google indexing, Core Web Vitals or AdSense test is claimed.

### Fixes completed in this review
- Strictly parse decimal and scientific numeric input; reject JS numeric coercions such as hex, booleans and objects, and reject underflow of nonzero values to false zero.
- Keep batch conversion alive when the first CSV row is malformed; isolate malformed rows for per-row reporting.
- Default mass batch conversion to **lbs → kg**, consistent with the site's main audience.
- On extreme input, an unrepresentable alternate unit no longer erases the primary conversion result.
- Search the converter directory and homepage using real unit abbreviations/aliases (e.g. lbs, kg, pounds, kilos); the universal converter has a keyboard-accessible alias finder for From/To.
- Consolidate five layered CSS source files into one production HTTP stylesheet (`/assets/styles.css`), preserving CSS cascade order.
- Export CSV with formula-injection guards, including malicious text starting with spreadsheet formula characters; preserve valid negative numbers.
- Production `npm run build` now runs the numerical unit tests **before** the static generation and audit steps. Cloudflare deployment must fail if tests fail.
- Extend release audit to verify the stylesheet and universal/directory search controls. Add tests for CSV header parsing, strict decimal inputs, scientific underflow and CSV formula protections.

### Findings that are not yet fully resolved
1. **Editorial uniqueness:** 70 weight-value landing pages necessarily share a large fraction of their explanation and layout. Each has a real on-page answer and interactive tool, but automated similarity warnings cannot certify Google Search/AdSense quality. Do not invent filler paragraphs just to lower similarity or generate additional numeric SEO pages.
2. **Actual UX/performance:** responsive behavior at 320px, keyboard/assistive technology, CSV downloads on mobile, actual printer output and Lighthouse measurements require real browser tests after the user chooses to do them.
3. **Official origin:** configure the user's future custom HTTPS domain as `SITE_URL`; verify live canonical URLs, response codes, robots and sitemap only then. Cloudflare-generated preview hostname remains `noindex`.
4. **Paid advertising:** no automatic ad scripts, analytics, paid APIs or storage were introduced. A real AdSense publisher account and any necessary consent configuration remain the owner's separate setup.
5. **Technology choice:** the implemented site remains zero-dependency Node static generation and vanilla JS, not Astro + TypeScript. Migrating frameworks is not justified solely to match the plan when behavior, cost and testing requirements are met.

### Evidence
- Reproducible local command: `npm run check`, which now runs tests and the complete build-time audit.
- CI on main builds both preview and synthetic official-domain modes; check the latest workflow at https://github.com/garrison2025/Convert-Units/actions .
- Scripts: `scripts/audit.mjs`, `scripts/deep-audit.mjs`, `scripts/release-audit.mjs`. Reports are emitted under `dist/`.

## 2026-11-02 — completed local optimization pass (no domain needed)

- Implemented independent, testable CSV/TSV/semicolon input parser with user-selected input columns 1–20, original line numbers, invalid-row preservation, optional recognized headers and support for quoted thousands values. Browser input and export use the pure calculation engine; data stays local.
- Added 92 static value-specific rounding comparisons at up to 2, 4, 6 and 9 decimal places; explicitly distinguish display rounding from input measurement accuracy.
- Improved keyboard and navigation behavior: Up/Down suggestions, Escape/outside-close mobile menu and reliable hidden filtered cards.
- Made the CI performance gate mandatory: 70 KiB raw CSS, 55 KiB raw JS, 32 KiB locally gzip-compressed CSS+JS, 90 KiB largest HTML page and 65 KiB homepage HTML. Report: `dist/performance-budget-report.json`. This is not actual Lighthouse, CLS, LCP or INP testing.
- Example verified production-mode static budgets from run 41368546320: 48,091 bytes CSS; 29,645 bytes JS; 22,265 bytes combined individual gzip; homepage HTML 28,422 bytes; 0 failures. Some sizes may change after subsequent commits.
- New tests cover CSV/TSV parsing, source row and error handling, 92 rounding tables and browser-module import wiring. Preview and synthetic-production builds retain all expected pages, canonical and noindex distinctions.
- **SEO outstanding risk:** 1,646 / 1,646 comparable same-direction numeric page pairs were above the 0.95 normalized-token similarity threshold (build run 41368965006). The similarity report now includes per-direction clusters. See `research/NUMERIC-SEO-QUALITY-REVIEW.md`. This is an editorial warning, not proof of a Google penalty or a completed content audit.
- Real-browser UX, mobile overflow, Core Web Vitals, custom domain, real GSC and AdSense reviews remain intentionally unverified until appropriate testing is possible. User has not bought the official domain. Do not infer an official site address from the temporary Cloudflare `pages.dev` preview.



## 2026-11-02 — responsive browser and keyword evidence pass

- Pure Chromium smoke tests run in GitHub Actions against a localhost server, with no official domain or paid API. The injected test script is never written to deployable `dist/`.
- **10 / 10 real Chromium scenarios passed**: homepage calculation and suggestions; selectable-column CSV with a malformed row; universal temperature and reset; numeric result and linked table; absolute-zero and reciprocal-fuel invalid input; four page families at effective 320 / 375 / 768 CSS-pixel widths.
- A genuine **57 px horizontal overflow at 320 px** on `/convert/lbs-to-kg/149/` was found and corrected by changing the mobile tool grid to `minmax(0,1fr)` and ensuring scrolling tables do not force the entire page wider. All responsive checks subsequently passed.
- **33 / 33 Node tests passed** in the latest verified build; includes CSV decimal-comma ambiguity fail-closed behavior, source-specific CSV line errors, real mass/time practical equivalents and formula edge cases.
- CSV auto-detection now explicitly rejects ambiguous numeric comma input such as `1,5` rather than silently treating it as two columns. Files with known CSV separators can use the explicit delimiter control. Recognized CSV headers also enforce consistent column counts. Decimal-comma localization is not claimed to be implemented.
- The 92 numeric pages now provide real compound UK mass equivalents where relevant and clock-style elapsed-duration representations for time pages; numerical formulas come from the shared conversion engine. This is practical functionality, not a claim that these pages no longer share near-identical templates.
- Each build validates 92 source-backed numeric keywords and outputs `dist/keyword-evidence-review.csv` plus `dist/keyword-evidence-review.json`, grouped across 15 direction families, with competitor-only US volume, KD, competitor landing URL, ranking and traffic estimates. **One original record, `1.8 kilograms in pounds`, has source rank 0 and is marked unverified rather than treated as a real organic search position.**
- GitHub Actions archives the source review CSV/JSON and SEO/performance audit JSON for 7 days as `exactunit-quality-reports`. This does not change indexing behavior or site runtime costs.
- Verified latest passing CI: https://github.com/garrison2025/Convert-Units/actions/runs/41370958165 (commit `987c78b940e1e68150accd4f6b5b19b5c5d5dc38`); GitHub artifact ID `13109445317`.
- **Still pending:** editorial decision for highly similar numeric pages (1,646 / 1,646 same-direction comparable pairs flagged), real device/browser diversity beyond CI, measured Core Web Vitals and official custom-domain / AdSense / GSC status. The Cloudflare preview remains `noindex`.

## 2026-11-02 — SEO structural pass (supersedes earlier indexability assumptions)

- Repaired one previously missing parent tool for the V2 source-backed numeric keyword `14400 seconds to hours`; 38 separate pair tools now exist (37 original + 1 repaired parent), while numeric seed count remains 92.
- Added `src/data/numeric-seo-policy.json`: 26 explicitly selected first-launch indexable numeric pages, with 66 other functional numeric pages set to production `noindex,follow` and omitted from the sitemap. All preview deployments stay noindex. Optional `NUMERIC_INDEX_MODE=all` must not be used without an explicit editorial decision.
- Production-mode sitemap contains **90 canonical URLs** (38 pairs + 26 pilot numeric + 16 categories + 10 other pages); static build produces 157 HTML routes including the noindex 404 page.
- Titles and H1s on numeric pages now use the original observed keyword phrasing without keyword stuffing; informational pair pages retain their own topic-focused titles. A real `WebSite` entity and free `WebApplication` markup have been added without fabricated ratings/reviews, and only to indexable pages.
- Added Pages host-specific `X-Robots-Tag: noindex` rules for `https://:project.pages.dev/*` and `https://:version.:project.pages.dev/*`, so a future official production domain does not leave an indexable `pages.dev` mirror.
- Structured data, canonical, noindex and sitemap audits were updated to verify the index policy on both preview and synthetic-production builds. Research and launch checklist: `research/SEO-LAUNCH-PILOT-20261102.md`.
- This is a technical SEO and pilot-risk reduction pass, **not evidence of ranking improvement, organic search clicks or Google approval**. 26 pages remain internally similar and require editorial/usefulness review, US SERP verification and eventual GSC measurement. The historical V2 37-tool plan remains preserved as source evidence.

- Latest SEO pilot duplicate-content diagnostic: **17/17** comparable indexable numeric page pairs still meet the >=0.95 normalized-token overlap threshold; total source pages: **1,646/1,646** comparable pairs. This is a quality-review warning, not a Google judgment or ranking prediction. Verified CI: https://github.com/garrison2025/Convert-Units/actions/runs/41372934999.

## 2026-11-02 — Google SEO content and credibility pass

- Public search spot-check documented in `research/GOOGLE-SEO-SERP-SPOTCHECK-20261102.md`. Public search results contain established per-value calculator pages for 149 lb → kg and 240 kg → lb, as well as mature bulk/spreadsheet workflows. This is **not** a Google US desktop/mobile top-10 ranking audit.
- Added `src/seo-guides.mjs`: real, specific dimension definitions, caveats and source links for all **16 category pages**, plus tested 1-unit and 10-unit numerical cross-checks, conversion formula and reverse conversion links for all **38 directional pages**. No invented author, review, endorsement or speculative numeric scenarios.
- Improved batch landing page H1, document description, explicit CSV input example, selected-column handling explanation, decimal-comma ambiguity protection, error rows, local privacy and limitations (one unit pair per batch; original supplementary source columns not preserved).
- Changed directional page titles/descriptions to clear query-intent titles and real one-unit results; fixed a stale 37-tools directory description to 38.
- About and methodology now explain how results and programmatic pages are generated, public code/test evidence and the difference between automated QA and independent measurement certification.
- New `scripts/seo-content-audit.mjs` checks all 38 pair pages, 16 category pages, 92 numeric pages, honest JSON-LD and indexability in **both preview and synthetic production builds**; CI archives `dist/seo-content-audit.json` with keyword and release reports.
- Expanded real Chromium responsive tests to also cover a category page and directional converter at 320/375/768px; this checks overflow, **not** real mobile network Core Web Vitals.
- Verified GitHub Actions run: https://github.com/garrison2025/Convert-Units/actions/runs/41374327814 — **40/40 Node tests**, **12/12 local Chromium browser scenarios**, static SEO content audit **0 errors**, deep static audit **157 HTML routes / 0 technical errors / 50 editorial warnings**, production simulation **90 index-eligible URLs**; three local CSS+JS assets total approximately **23.1 KiB individually gzip compressed**.
- The 26 selected numeric pages still include highly templated result pages: earlier release check found **17/17** same-direction pilot pairs above normalized 0.95 token similarity. This has not been solved merely by better parent/category content. Google's actual indexing or ranking remains unverified; no domain has been bought and the preview stays noindex.


## 2026-11-02 — Google SEO metadata and crawl discovery corrections

- Updated all 92 numeric pages to present readable, semantically clear H1 labels based on real unit names instead of copying the raw Semrush text, some of which is awkwardly compressed (e.g. `50kpa to atm`, `330kmh to mph`). Programmatic title tags now give the actual unit conversion and precomputed result; descriptions use approximate language for the displayed rounded value. Original third-party keyword data remain unchanged.
- Built `scripts/seo-crawl-audit.mjs`, which traces Googlebot-readable `<a href>` links from the homepage and checks the index pilot's max navigation depth and eligibility. It identified the otherwise valid **universal converter as an orphan**. Global navigation and directory links now lead to it.
- The verified static graph has **90 future index-eligible routes, maximum two ordinary link clicks from home, no orphan pages and no links from candidate indexable pages to the 66 excluded numeric pages**. This is a local HTML audit, not evidence of real Googlebot crawl activity.
- Added `src/seo-index-policy.mjs` to enforce an explicit manual second confirmation before toggling from 26 index-eligible numeric pages to all 92. Test coverage includes both permitted and rejected mode settings.
- Generated `dist/seo-url-inventory.csv` for all **157 HTML routes**. The report contains actual title, H1, snippet, robots, canonical, source keyword where present, index plan, crawl depth and static inbound/outbound link count. It is archived with the other CI quality artifacts.
- Continued to keep temporary Cloudflare Pages builds globally `noindex`. A simulated official HTTPS-domain production build still generates a **90-URL canonical sitemap**, with 66 numeric pages suppressed from search.
- Latest verified CI: https://github.com/garrison2025/Convert-Units/actions/runs/41375738861: **43/43 Node tests**, **12/12 real Chromium smoke scenarios**, **157 HTML routes / 0 static technical errors / 67 editorial review warnings**, **90 production index candidates**, **0 crawl-audit errors**, **maximum 2 link clicks**, **0 indexable-to-noindex links**. The increased normalized-template warnings are not a real-Google duplication assessment and are not resolved by title changes.
- Still unverified: Google US device-specific SERPs, official-domain indexing, actual GSC impressions/clicks and AdSense revenue. Current numeric pages share templates, including the original 26-page pilot; no algorithmic title rewrite or static audit proves improved ranking.


## 2026-11-02 — active Google SEO launch policy V3 (supersedes historical 26-page pilot)

- Google official canonical documentation makes clear that **duplicate or very similar content may be clustered**, and rel=canonical/sitemap signals do not guarantee Google's selection. Noindex was used to deliberately exclude pages from search, **not** as an artificial means of consolidating canonical signals. Source: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Reduced the numeric index pilot from **26 to 15 URLs**, representing one keyword-backed page per conversion direction. All **92** numeric HTML results remain generated and usable. The other **77** are deliberately `noindex,follow` on a future official-domain build and omitted from the production sitemap.
- Default production sitemap now has **79** index-eligible canonical URLs (38 directional + 16 category + 10 other + 15 numeric), while the preview remains wholly noindexed. The former 26/66/90 figures in earlier dated sections of this report document a past experimental policy and are not the active setting.
- Of the former 26 candidates, 11 were held back. Both the 15 selected and 11 newly deferred query lists and their historical competitor Semrush metrics are documented in `research/SEO-PILOT-V3-20261102.md`; these are **not** site traffic forecasts.
- CI now asserts that the curated production index policy cannot expose two numeric answer pages for the same direction. Normalized token similarity across *all 92 generated result pages* remains an editorial warning: absence of same-direction pairs within the 15-page pilot is not proof of unique value relative to direction-level parent pages.
- `dist/keyword-evidence-review.csv` and JSON now distinguish per-page **technical index eligibility** from **unverified editorial/real-Google indexation**. Never interpret selected as actually indexed by Google.
- One `kg → lbs` representative (240 kg to lbs), one `lbs → kg` representative (126 pounds in kg), and one per 13 remaining value-query directions are selected. This is reversible after real Google US SERP review and future GSC click evidence. No purchased custom domain, paid API or running expense was added.
- Main source of truth: `src/data/numeric-seo-policy.json` version 2 and the active [V3 policy report](research/SEO-PILOT-V3-20261102.md).


## 2026-11-02 — batch workflow SERP/value improvement

- Public competitor research reviewed existing value-answer pages (CoolConversion, dedicated Celsius/Fahrenheit results, torque calculators) and independent batch CSV pages (Unitly, Convematik). Public results show substantial existing functionality; these are not fixed-US Google SERP position checks, user clicks or keyword volume evidence. Research: `research/SEO-SERP-WORKFLOW-REVIEW-20261102.md`.
- Improved the actual main functionality of `/batch-converter/`: source CSV/TSV/semicolon columns and recognized headings are preserved; `ExactUnit line/result/from/to/status` fields are appended. Malformed data rows remain in the export, with their source line and validation message, while other valid rows still convert.
- Fixed a real data-integrity issue: the previous display formatter introduced thousands commas into exported results; negative grouped numbers could receive spreadsheet-formula protection and become text. CSV conversion output now strips display-only grouping and exports numeric strings, including negative numbers, suitable for downstream spreadsheet arithmetic. Original user-provided source strings are still sanitized for CSV injection.
- Production and preview SEO content audits now check that the batch page truthfully describes the actual preservation feature and that its browser script invokes the tested shared CSV engine. Added Node tests for source header preservation, quoted delimiters, TSV, malformed rows, formula injection safety and negative numeric exports, plus a real Chromium status check.
- The **active numeric index policy remains 15 representative results and 77 suppressed numeric URLs** (79 simulated production sitemap URLs); temporary Pages preview remains `noindex`. This is a genuine workflow improvement, **not evidence of ranking or AdSense acceptance**.
- Existing limitation: single source/target unit pair per batch; no arbitrary quoted multiline records or per-row differing unit pairs are promised. Do not claim feature parity with all competitor tools.

## 2026-11-02 — parent-child SEO similarity audit

The active index strategy is unchanged: 15 numeric candidates and 77 noindex numeric routes. Newly added `parentChildOverlap` reporting compares each selected value page with its parent calculator, not merely with other numeric values. The first local normalized-token Jaccard measurements range **0.3687–0.3965**, with all 15 compared. The metric describes our HTML body token overlap only; Google does not publish or use this threshold as an index eligibility test. See [CI run 41377830896](https://github.com/garrison2025/Convert-Units/actions/runs/41377830896). Source-preserving CSV workflow and accurate numerical output are documented in the section above.

## 2026-11-02 — mixed-unit CSV workflow extension

- Introduced optional per-row input CSV unit columns. Users may leave both blank for a fixed pair or explicitly select *two different* one-based columns (1–20) holding source and target labels. Exact known IDs/symbols are resolved locally. Each row validates its physical dimension, rather than silently falling back to the page's default pair.
- A mixed sample is provided in the batch page: `label,value,from,to` followed by four rows across mass, speed, temperature and elapsed time. It fills the correct column selectors and calculates instantly.
- The source CSV columns and headings are retained in the download; the appended result, actual per-row source/target symbols and error/status fields are machine readable. Incompatible, missing or unknown units cause individual errors while other rows continue processing. Invalid unit labels are not misleadingly reported as the default units.
- Regression tests cover all these cases, and a local headless Chromium scenario checks the visible sample, mixed dimensions, error handling and partial-selector validation.
- No additional SEO pages, paid services, remote API, database or forced domain purchase. Existing canonical/index policy remains **79 future production URL candidates / 15 selected numeric / 77 suppressed numeric**, with the temporary Pages preview `noindex`.
- Limitation: CSV quoting is supported within a physical record, but **quoted fields containing embedded newlines are not yet supported**. Unit names must match supported IDs or exact symbols, and the batch cap remains 1,000 data rows. This release supersedes earlier notes saying per-row differing unit pairs were unsupported.

## 2026-11-02 — CSV quoted-newline and search-evidence correction

- Repaired the batch CSV/TSV parser so properly **quoted fields containing embedded newlines** are treated as one logical record. The input file's **physical starting line** is retained for each record and errors; the original multiline note survives export as a safely re-quoted field. Unclosed quotes fall back to individual physical-line error records to avoid swallowing otherwise valid measurements.
- Added pure parser regression cases for multiline comma CSV, tab TSV, doubled quotes, mixed per-row source/target units, the 1,000-logical-row limit and malformed quote recovery. Real Chromium regression now checks that two rows separated by three physical lines convert correctly. No new dependencies, APIs or backend components.
- The original competitor keyword evidence `research/semrush-us-600.tsv` contains **600 rows and zero matching entries for `batch`, `CSV`, `spreadsheet` or `bulk`**. This does not prove these queries have no demand; it means the supplied competitor data cannot validate a separate batch SEO opportunity. A full U.S. Google SERP/top-ten and new competitor organic-keyword export is still needed before making a traffic or commercial claim.
- Previous paragraphs saying quoted multiline cells are unsupported are historical and superseded by this section. Current product and its batch page explicitly support multiline quoted cells; unquoted multiline data or arbitrary decimal-comma inference are not promised.

## 2026-11-02 — unit-label ambiguity safety pass and competitor evidence audit

- A real collision was discovered in the source unit list: the token `kn` is the public symbol for **knots (speed)** but also the internal ID of **kilonewtons (force)**. The old bulk-CSV unit parser used ID-first resolution and could silently change the physical dimension. All 61 declared unit IDs and symbols were checked for same-text collisions; `kn` was the cross-unit overlap.
- Updated `resolveUnitLabel` to evaluate exact IDs, symbols and names together, then case-insensitive matches; a token belonging to multiple physical units fails with an explicit error instead of picking one. Exact `knot` and `kN` remain supported and distinguishable. Mixed CSV imports preserve the raw original ambiguous label in the error output, instead of silently printing the force symbol `kN`.
- Added numerical/unit-alias tests including all defined IDs, symbols and names; a Chromium mixed-batch scenario verifies the `kn` error and successful knot/kilonewton conversions. A visible page note and SEO HTML content test protect the explanation. Nothing is uploaded.
- Rechecked public batch-converter competitors at `convematik.com/batch-converter`, `unitly.tooleek.com/en/batch-converter`, and `universalunitconverter.net/tools/batch/`. Their existence and disclosed feature sets are **not** evidence of Semrush organic keyword rankings, Google US top-ten positions, search volume, clicks or monetization. The supplied 600-row competitor keyword export still contains no matching batch/CSV/bulk/spreadsheet rows, so further SEO expansion requires relevant domain ranking exports.
- CI release test passed in [run 41381182428](https://github.com/garrison2025/Convert-Units/actions/runs/41381182428): **55 Node tests**, **15 real Chromium scenarios**, **157 static HTML routes**, **0 technical deep-audit errors**, **65 editorial review warnings**, **79 future production index candidates**, **15 numeric pilot values**, **77 suppressed numeric values**, **0 eligible orphans**, **max two internal-link clicks**.
- No new pages were added to the index plan, no custom domain was bought, and no paid API or backend service was introduced. Preview `*.pages.dev` remains `noindex` and no evidence of actual Google indexing or organic traffic is claimed.


## 2026-11-02 — Google schema and displayed-answer accuracy

- Reviewed official Google BreadcrumbList, canonical, general structured-data policies and software-app rich-result requirements. Existing WebApplication entries accurately describe free browser tools, but **without authentic user ratings/reviews they are not claimed as eligible for software-app rich results**. Never fabricate reviews.
- Enhanced `scripts/seo-content-audit.mjs` from 149 explicitly inspected routes to **all 157 static HTML routes**; 404 must remain noindexed. Every future production-indexable page has its own canonical checked against WebPage JSON-LD and Open Graph metadata; breadcrumbs must follow actual category/tool/numeric page hierarchy and match visible navigation links.
- Fixed an accuracy issue in 9-decimal result templates: rounded values now show `≈` in direct-answer banners, copied answers, generated SEO titles/snippets and conversion examples; genuinely matching displayed numbers may show `=`. “EXACT RESULT” wording was replaced with “CALCULATED RESULT”. The math display symbol is shared and regression-tested.
- Verified [run 41382672864](https://github.com/garrison2025/Convert-Units/actions/runs/41382672864): **56/56 Node tests**, **15/15 Chromium tests**, **157/157 SEO audited HTML pages**, **0 static technical errors**, **63 editorial-content review warnings**. Index policy unchanged: **79 candidate index URLs, 15 selected numeric answers, 77 withheld numeric answers**. Preview continues `noindex`.
- Detailed Google-source-backed report: [`research/GOOGLE-STRUCTURED-DATA-QA-20261102.md`](research/GOOGLE-STRUCTURED-DATA-QA-20261102.md). These are technical and editorial QA results; ranking, indexing, Google-selected canonical and revenue remain unverified.

## 2026-11-02 — explicit public-index launch guard (CI 41384642960)

- Reviewed [Cloudflare Pages response-header patterns](https://developers.cloudflare.com/pages/configuration/headers/), [Cloudflare build variables](https://developers.cloudflare.com/pages/configuration/build-configuration/), [alias-domain Bulk Redirects](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/), and [Google noindex requirements](https://developers.google.com/search/docs/crawling-indexing/block-indexing). Our host-based Pages preview noindex `_headers` rules conform to Cloudflare's published examples.
- Corrected the unsafe build condition: previously a plausible non-`pages.dev` `SITE_URL` enabled public indexing, canonicals and a sitemap automatically, without explicit confirmation of domain connection or launch intent. The site now **fails closed**. `SITE_URL` alone builds a fully functional globally noindexed preview with an empty sitemap.
- Explicit public opt-in now requires three matching production build environment variables: `SITE_URL=https://verified-domain`, `SEO_PUBLIC_HOST=verified-domain`, and `SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING`. A mismatch, invalid token or incomplete approval fails the build. The extra launch switch is not a replacement for independently verifying DNS/domain ownership.
- Cloudflare `CF_PAGES_BRANCH` values other than `main` force preview/noindex mode even if full approval variables are inherited. `*.pages.dev` hostnames cannot be approved for indexing; the existing Cloudflare `X-Robots-Tag: noindex` rules remain.
- Added four policy regression tests and a **real CI unapproved-custom-origin integration gate**, which verifies `build-info.json` stays in preview mode, homepage robots is `noindex`, canonical is absent, sitemap contains no URLs and `_headers` has global `noindex` response rules. The subsequent synthetic approved production build verifies the original 79-URL sitemap and canonical/structured-data policy.
- [GitHub Actions run 41384642960](https://github.com/garrison2025/Convert-Units/actions/runs/41384642960) is green: **60/60 Node tests**, **15/15 Chromium smoke tests**, **157 static routes / 0 technical errors / 63 editorial warnings**, **79 index candidates in approved synthetic production**, **0 candidate orphans** and **maximum internal click depth 2**. QA artifacts were uploaded.
- No official domain is connected or approved by this work. No live Googlebot indexing, Search Console traffic, field Core Web Vitals or Cloudflare deployment headers have been verified; keep preview noindex until user-approved launch. No paid API, worker or database introduced.
