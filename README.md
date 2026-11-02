# ExactUnit — free unit converter

Production-ready, zero-dependency static website created for the [Convert-Units](https://github.com/garrison2025/Convert-Units) project according to the user-approved V2.0 build plan.

## Delivered

- **38** direction-specific calculators and **one universal converter** spanning **16** measurement categories.
- **92** accurately prerendered numeric results, of which **15** are conditional official-domain index candidates and **77** remain `noindex`.
- **157** generated static page routes in total (38 tools plus 92 numeric pages, 16 categories and site pages; 79 are initial production-indexable candidates under the curated policy) (homepage, categories, tools, approved numeric pages, batch converter, and policy/methodology pages).
- Batch converter: on-device calculations for up to 1,000 rows, 1–20 selectable value columns, CSV/TSV/semicolon delimiter detection, per-line errors, local CSV/TXT files, **original input columns and recognized headers preserved in CSV export**, numeric machine-readable output, sanitized source cells and print. One fixed unit pair per batch or mixed source/target units specified by individual CSV columns.
- No account, database, backend, cron, third-party APIs, external fonts, or mandatory cookie scripts.
- Pure ECMAScript modules, vanilla CSS/JS and Node's native test runner; no dependency installation.
- Keyword evidence: `research/semrush-us-600.tsv` (original 600 rows), `research/KEYWORDS-600.xlsx` (planning workbook), and `research/SEO-PLAN-V2.md`.

## Local build and tests

Requires Node 20+.

```sh
npm run check
```

The command runs conversion and batch CSV tests, static builds, link crawling, metadata uniqueness and numeric-page similarity reviews, plus a dependency-free resource-size budget gate. Only public site assets are generated into `dist/`; internal SEO audit CSV/JSON reports are moved into `qa-reports/` and uploaded to GitHub Actions artifacts. For local preview, serve `dist/` with any static HTTP server (do not open `index.html` via `file://` because ECMAScript modules require HTTP).

The site also includes an accessibility statement and runs preview plus synthetic-production SEO checks in CI. Numeric-page similarity warnings require editorial review; a passing build is not AdSense approval.

## Cloudflare Pages (Git integration)

- GitHub repository: `garrison2025/Convert-Units`
- Production branch: `main`
- Framework preset: `None`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22`
- **Build variable `SITE_URL`**: once a real custom domain is bound to Cloudflare Pages, enter its bare HTTPS origin. **SITE_URL alone never activates indexing.** Do not enter `*.pages.dev` as the official domain.
- Optional `ADSENSE_PUBLISHER_ID`: a valid `pub-` followed by 16 digits, after approved AdSense setup. Ads scripts are deliberately NOT auto-enabled; publisher must configure consent management, real ad units and privacy disclosures independently.

**Temporary preview mode:** If `SITE_URL` is absent, points to `*.pages.dev`, has not been explicitly approved for indexing, or Cloudflare builds a non-`main` branch, the site still works but emits `noindex`, omits canonical and OG URLs, and has an empty sitemap. The generated `robots.txt` lets crawlers see `noindex`.

**Official domain mode:** Only after connecting and verifying a genuine custom domain, set all three Cloudflare Pages **production** variables: `SITE_URL=https://your-real-domain.example`, `SEO_PUBLIC_HOST=your-real-domain.example` (exact matching hostname), and `SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING`. Only this explicit, host-bound approval on `main` activates canonicals, the 79-URL sitemap and indexable robots meta. An unapproved `SITE_URL` alone remains noindexed. Partial or mismatched approvals fail the build rather than exposing wrong canonicals. Then verify live headers and GSC, and use Cloudflare Bulk Redirects where appropriate to avoid duplicate Pages aliases.

Do not submit the temporary Pages subdomain or its preview sitemap to Google Search Console.

Cloudflare Pages will serve route folders' `index.html` on clean URLs. `robots.txt`, `sitemap.xml`, `_headers`, and `404.html` are generated at build time. The `dist/` folder is output only, not checked into source. Do not copy the nonpublic `qa-reports/` directory into Cloudflare's deployment output.

## Important boundaries

This source build and its automated tests have been verified locally. They do not prove a production Cloudflare deployment, a connected domain, Google indexing, AdSense approval, organic traffic, or ad revenue.

Publishing many similar numeric pages is not itself proof of usefulness. Keep user value and accuracy as the primary requirements. Keyword Volume/KD/rank are estimates of the competitor's October 31, 2026 results, **not forecasts** for this website. SEO canonical and sitemap eligibility are controlled by the conservative 15/77 numeric indexing policy, separate from the 92 approved functional numeric routes.

## Internal layout

- `src/assets/engine.mjs`: deterministic units and numerical conversions
- `src/assets/app.mjs`: interactive and CSV functionality
- `src/assets/site.css`: design system, responsive layouts, reduced-motion support
- `src/data/pairs.json`: 38 verified tool routes
- `src/data/seeds.json`: 92 approved numeric pages and keyword evidence
- `scripts/build.mjs`: build HTML, metadata, canonical, sitemap, robots, legal pages
- `scripts/audit.mjs`: static SEO integrity audit
- `scripts/release-audit.mjs`: all-page link graph, orphan, numeric result and canonical audit; JSON report retained privately in `qa-reports/release-audit-report.json` after `npm run build`\n- `scripts/deep-audit.mjs`: generated HTML link crawl and content similarity warnings; report retained privately at `qa-reports/quality-report.json` after `npm run build`
- `tests/conversion.test.mjs`: precision, dimensions, and page mapping tests
- `research/*`: full V2 plan and all uploaded keyword research data

This project is an independent implementation, not a copy of the competitor's site content or proprietary design.

## Content and performance quality gates (pre-domain)

- A passing build is not a guarantee of Google indexing, AdSense eligibility, visual accessibility, or Core Web Vitals.
- `npm run audit:performance` measures static CSS, JS and HTML asset sizes and writes `dist/performance-budget-report.json` when run standalone; `npm run build` archives it at `qa-reports/performance-budget-report.json`; its gzip figures are local estimates, not measured production transfer sizes.
- The 92 approved numeric pages include a useful pre-rendered result, interactive calculator, reference comparisons and display-precision table; their high template similarity still requires editorial review. See [`research/NUMERIC-SEO-QUALITY-REVIEW.md`](research/NUMERIC-SEO-QUALITY-REVIEW.md).
- In preview mode all pages remain `noindex`. Do **not** buy or connect a domain solely to clear CI checks; genuine real-browser checks can be run when an official domain is available.

## Local real-browser and evidence audits

The main-branch GitHub Actions workflow automatically builds the site, checks 33 Node tests, then launches local headless Chromium. The smoke suite checks real calculator inputs and errors, CSV parsing, reset, suggested tools, numeric reference interactions, and responsive horizontal overflow at 320, 375 and 768 CSS pixels. No custom domain is required for these checks. To run the browser smoke suite manually on a machine with Chrome installed, first run `npm run build`, then `node scripts/browser-smoke.mjs`.

Every CI run also produces the offline `dist/keyword-evidence-review.csv` and `dist/keyword-evidence-review.json` files from the approved V2 dataset. The GitHub Actions run has a 7-day `exactunit-quality-reports` download containing these files plus the build SEO/performance reports. A raw competitor rank of 0 is explicitly tagged as unverified. Do not mistake competitor estimates for this site's traffic or assume 92 similar pages are automatically useful/indexable.

Browser smoke checks are not measurements of live Cloudflare performance, Lighthouse scores, accessibility certification or Google indexing. The temporary `*.pages.dev` preview remains noindexed until a real domain is chosen.

## Curated search-index launch (before purchasing a domain)

The approved V2 research contains 37 originally planned tools and 92 keyword-specific results. A missing parent tool for the already-approved `seconds-to-hours/14400/` query has been added, so there are now **38 tools**. Source demand should not be confused with traffic to this site.

By default `NUMERIC_INDEX_MODE=curated`: all 92 numeric pages remain available, but only the **15 URLs explicitly listed in** `src/data/numeric-seo-policy.json` are eligible for `index,follow` and inclusion in production sitemap. The remaining 77 have `noindex,follow`, no self-canonical tag and no sitemap entry. This is a conservative pilot to reduce same-template exposure, **not a guarantee that selected pages will rank**. Do not set `NUMERIC_INDEX_MODE=all` without reviewing source intent, duplication and post-launch data. Preview builds remain globally noindexed regardless of this flag.

Google's source guidance on [canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies) informed the technical policy. A unique numeric result is not necessarily an independently valuable page. Once a genuine custom domain is connected and explicitly approved with the three-variable launch gate, check GSC index coverage and Search Performance by query/page, and revisit the pilot based on real clicks and usefulness.

**Current source-backed index policy:** [`research/SEO-PILOT-V3-20261102.md`](research/SEO-PILOT-V3-20261102.md) (15 values, 77 suppressed). The earlier 26-value experiment is retained only as historical decision context.

After binding a real domain, configure a Cloudflare Bulk Redirect from the default `*.pages.dev` production host to the official domain when practical. Until then the generated `_headers` blocks indexing on both Pages project aliases and preview hosts, including during synthetic-production builds. Cloudflare reference: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

## Google SEO content quality (2026-11-02)

Every **38** directional calculator page has a static, source-linked explanation of its measurement caveats, conversion factors, reverse direction when available and independently computed one- and ten-unit checks. All **16** category pages have a substantive measurement definition and verification note. The batch converter page documents the actual CSV workflow, ambiguity protection and current limitations. About and Methodology disclose how results are generated, tested and verified, without invented certification.

The zero-dependency `scripts/seo-content-audit.mjs` runs automatically on both preview and synthetic production builds and validates static HTML, expected content, original keyword phrasing, numeric answers and JSON-LD. The CI artifacts contain `seo-content-audit.json`. For reproducible external evidence and the *limitations* of public web search, see [competitor landing page spot-check](research/GOOGLE-SEO-SERP-SPOTCHECK-20261102.md).

No live Google US rankings, Googlebot indexing, GSC clicks, AdSense revenue or actual field Core Web Vitals are claimed. The 15 numeric pilot still needs individual usefulness review and source-confirmed search demand. Cloudflare preview remains `noindex` until an official domain has been configured.

## Crawl depth, search titles and safe indexing

The `scripts/seo-crawl-audit.mjs` gate tests actual static links, 3-click reachability from the homepage and inbound parent links to all 15 selected values. It exports `dist/seo-crawl-audit.json` and `dist/seo-url-inventory.csv` listing each page's title, H1, description, robots, canonical, click depth and proposed index status in GitHub Actions artifacts.

Source keywords remain unchanged in research data; human-readable SEO page titles and snippet copy come from `src/seo-meta.mjs`. Enabling `NUMERIC_INDEX_MODE=all` now also requires `NUMERIC_INDEX_CONFIRMATION=REVIEWED_ALL_92` after editorial review. This is only a safety mechanism, not a Google quality guarantee.

## 2026-11-02 V3 — one indexed numeric answer per direction

The active policy now selects only **15 representative numeric answers**, one per conversion direction, using original competitor keyword evidence and not invented traffic forecasts. The other **77** numeric answers remain functional but are not part of the future production sitemap. Total eligible production URLs under the default policy: **79**. Automated review prevents two values in the same direction from being indexed in the curated mode. See [active V3 SEO rollout document](research/SEO-PILOT-V3-20261102.md) for all 15 examples and the 11 formerly selected values now excluded. The 26/66/90 figures in earlier dated reports describe the previous experiment, not the active release configuration.

## CSV batch workflow and Google SEO research

The real batch converter at `/batch-converter/` keeps source columns, labels and valid/invalid lines when exporting, adds namespaced result, source unit, target unit and row status fields, and exports ungrouped numeric results for reuse in Excel/Google Sheets. Uploaded CSV/TXT files and pasted rows stay inside the browser; no account or API is needed. Delimiters are comma, tab or semicolon, with optional manual selection; use either one selected pair for the whole batch **or** choose separate source/target unit columns for each row. Supported per-row labels include exact unit IDs and symbols such as `lb`, `kg`, `°C`, `°F`, `ms` and `s`; incompatible pairs produce explicit row errors. A runnable mixed-unit sample is built into the page. Arbitrary decimal-comma parsing is not currently supported; properly quoted CSV and TSV fields may contain embedded line breaks. Error rows retain their source values and line numbers.

See [the public competitor SERP and batch-workflow review](research/SEO-SERP-WORKFLOW-REVIEW-20261102.md). This is a **source-based public-page spot-check**, not a fixed-region Google US top-ten audit or verified search demand forecast. The 15 indexable numeric candidates / 77 suppressed numeric URLs and 79 production-sitemap candidates are **unchanged** by this feature release.

## CSV unit-label safety and keyword evidence (2026-11-02)

Mixed-row batches now reject ambiguous physical unit tokens instead of selecting the first internal ID. Specifically, `kn` overlaps the **knot** speed symbol and the legacy internal ID for **kilonewtons** (force). Write `knot` when the source is speed or the case-sensitive SI symbol `kN` for kilonewtons. An ambiguous or unknown unit generates a row-level error while other rows continue converting. The exported failed row retains the exact raw label; it is **not** silently rewritten as a different unit. Automated tests check every currently declared ID, symbol and name for silent collisions, plus a real Chromium mixed-CSV scenario.

The public [batch search and competitor evidence report](research/SEO-SERP-WORKFLOW-REVIEW-20261102.md) lists discoverable competitor tools but **does not** establish actual natural-ranking keywords, volume, KD, or organic visits for ExactUnit's CSV feature. The existing 600-keyword source export has no `batch`, `csv`, `spreadsheet` or `bulk` entries, so growth claims based on these sources would be unsupported. Default index policy stays **79 future production candidates**, including 15 distinct representative numeric answer pages; `*.pages.dev` preview remains `noindex`.

## Google structured data and numeric accuracy (2026-11-02)

The static `scripts/seo-content-audit.mjs` checks **all 157 generated HTML routes** for HTML/JSON-LD consistency. In the synthetic official-domain build, every index-candidate page must match canonical URL, WebPage name and description, Open Graph metadata, and actual visible breadcrumb hierarchy. The home page has a truthful WebSite schema, and the 40 dedicated/universal/batch tools have accurate free WebApplication markup. No user ratings or reviews are fabricated; **Google software-app rich-result eligibility is not claimed** because Google lists real review/rating data among its requirements.

Numeric HTML answers, copy text and SEO descriptions now use a meaningful `≈` for rounded results and `=` only when the display agrees with the calculated value; no invented claim of absolute measurement precision. The historical current policy remains **79 candidate index URLs** including 15 numeric values, while 77 additional value routes are available but excluded from indexing. For full scope, limitations and source links see [structured-data and mathematical-accuracy QA](research/GOOGLE-STRUCTURED-DATA-QA-20261102.md).

## Cloudflare release gate and preview-host protection (2026-11-02)

**Safe by default:** A plausible `SITE_URL` is not enough to permit public indexing. Only `SITE_URL`, an identical `SEO_PUBLIC_HOST`, and `SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING` together allow an indexable build. This is a human approval switch, **not** a credential or proof of domain ownership.

On Cloudflare Pages, `CF_PAGES_BRANCH` controls a further safety gate: branches other than `main` are forcibly noindexed even if variables are inherited. The two official Pages hostname-specific `_headers` rules continue to add `X-Robots-Tag: noindex` on generated previews. Configure a verified custom domain first; then enter approval variables in the **production** environment, not preview.

GitHub Actions continues testing synthetic `https://qa.example.test` with explicit test-only approval. This is not a deployed real domain. Unit tests check incomplete, invalid and mismatched approval, as well as non-main branch previews. Real indexing, DNS verification and GSC visibility cannot be demonstrated by local CI.

Official docs: https://developers.cloudflare.com/pages/configuration/headers/ ; https://developers.cloudflare.com/pages/configuration/build-configuration/ ; https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/ ; https://developers.google.com/search/docs/crawling-indexing/block-indexing.

## Current SEO evidence and public deployment hygiene (2026-11-02)

- `scripts/seo-editorial-gate.mjs` reconciles all 92 numeric query records with the original 600-row **competitor** Semrush export and emits a 130-page review table. It distinguishes unverified generic-converter demand from numeric observations; no ExactUnit traffic claim.
- The numeric indexing policy remains **15 pilot / 77 noindex**; see `research/SEO-EDITORIAL-DECISIONS-V4-20261102.md`. Generic query Volume for **23** of 38 directions is not established by the approved numeric evidence.
- `scripts/segregate-qa-reports.mjs` requires 11 QA files, removes them from the publicly deployed `dist/` directory, and blocks accidental research CSV/internal audit JSON exposure. GitHub Actions archives `qa-reports/` instead.
- The public Cloudflare probe checks that internal audit exports return **404** and independently verifies the deployed commit SHA and preview noindex. A stale live deployment can temporarily show prior behavior; do not claim success until the live SHA matches the main branch.
