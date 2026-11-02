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
