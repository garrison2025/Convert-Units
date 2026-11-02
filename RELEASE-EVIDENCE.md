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

