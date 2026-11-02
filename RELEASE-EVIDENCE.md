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
- Latest verified passing code CI: https://github.com/garrison2025/Convert-Units/actions/runs/41366205618 (commit `3a5f621e0cbdd0ff486080ae335f8edebab2c9a2`).
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
