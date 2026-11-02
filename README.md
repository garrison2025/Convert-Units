# ExactUnit — free unit converter

Production-ready, zero-dependency static website created for the [Convert-Units](https://github.com/garrison2025/Convert-Units) project according to the user-approved V2.0 build plan.

## Delivered

- **38** direction-specific calculators and **one universal converter** spanning **16** measurement categories.
- **92** accurately prerendered numeric SEO results, one canonical URL per approved search intent.
- **156** public static page routes in total (38 tools plus 92 numeric pages, 16 categories and site pages; 90 are initial production-indexable candidates under the curated policy) (homepage, categories, tools, approved numeric pages, batch converter, and policy/methodology pages).
- Batch converter: on-device calculations for up to 1,000 rows, 1–20 selectable value columns, CSV/TSV/semicolon delimiter detection, per-line errors, local CSV/TXT files, sanitized CSV export and print.
- No account, database, backend, cron, third-party APIs, external fonts, or mandatory cookie scripts.
- Pure ECMAScript modules, vanilla CSS/JS and Node's native test runner; no dependency installation.
- Keyword evidence: `research/semrush-us-600.tsv` (original 600 rows), `research/KEYWORDS-600.xlsx` (planning workbook), and `research/SEO-PLAN-V2.md`.

## Local build and tests

Requires Node 20+.

```sh
npm run check
```

The command runs conversion and batch CSV tests, static builds, link crawling, metadata uniqueness and numeric-page similarity reviews, plus a dependency-free resource-size budget gate. Site is generated in `dist/`. For local preview, serve `dist/` with any static HTTP server (do not open `index.html` via `file://` because ECMAScript modules require HTTP).

The site also includes an accessibility statement and runs preview plus synthetic-production SEO checks in CI. Numeric-page similarity warnings require editorial review; a passing build is not AdSense approval.

## Cloudflare Pages (Git integration)

- GitHub repository: `garrison2025/Convert-Units`
- Production branch: `main`
- Framework preset: `None`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22`
- **Build variable `SITE_URL`: configure only after binding the official custom domain** (the exact `https://` origin, no trailing slash). Do not use Cloudflare's automatic `*.pages.dev` hostname as the production domain.
- Optional `ADSENSE_PUBLISHER_ID`: a valid `pub-` followed by 16 digits, after approved AdSense setup. Ads scripts are deliberately NOT auto-enabled; publisher must configure consent management, real ad units and privacy disclosures independently.

**Temporary preview mode:** When `SITE_URL` is missing or points to `*.pages.dev`, the website remains fully functional but automatically emits `noindex`, omits canonical and OG URLs, and generates an empty sitemap. It does not treat Cloudflare's generated hostname as the official site. `robots.txt` allows crawling so search engines can read the `noindex` directive.

**Official domain mode:** Once your domain is connected, set Cloudflare Pages `SITE_URL` to its final HTTPS origin and redeploy. Canonical tags, sitemap, robots.txt and 90 curated indexable URLs will automatically use that domain. Remove any previously configured incorrect `SITE_URL`. Verify the production domain resolves; redirect or disable the duplicate Pages subdomain where supported.

Do not submit the temporary Pages subdomain or its preview sitemap to Google Search Console.

Cloudflare Pages will serve route folders' `index.html` on clean URLs. `robots.txt`, `sitemap.xml`, `_headers`, and `404.html` are generated at build time. The `dist/` folder is output only, not checked into source.

## Important boundaries

This source build and its automated tests have been verified locally. They do not prove a production Cloudflare deployment, a connected domain, Google indexing, AdSense approval, organic traffic, or ad revenue.

Publishing many similar numeric pages is not itself proof of usefulness. Keep user value and accuracy as the primary requirements. Keyword Volume/KD/rank are estimates of the competitor's October 31, 2026 results, **not forecasts** for this website. SEO canonical destinations are controlled by the curated 92-page seed list.

## Internal layout

- `src/assets/engine.mjs`: deterministic units and numerical conversions
- `src/assets/app.mjs`: interactive and CSV functionality
- `src/assets/site.css`: design system, responsive layouts, reduced-motion support
- `src/data/pairs.json`: 38 verified tool routes
- `src/data/seeds.json`: 92 approved numeric pages and keyword evidence
- `scripts/build.mjs`: build HTML, metadata, canonical, sitemap, robots, legal pages
- `scripts/audit.mjs`: static SEO integrity audit
- `scripts/release-audit.mjs`: all-page link graph, orphan, numeric result and canonical audit; JSON report in `dist/release-audit-report.json`\n- `scripts/deep-audit.mjs`: generated HTML link crawl and content similarity warnings; report at `dist/quality-report.json`
- `tests/conversion.test.mjs`: precision, dimensions, and page mapping tests
- `research/*`: full V2 plan and all uploaded keyword research data

This project is an independent implementation, not a copy of the competitor's site content or proprietary design.

## Content and performance quality gates (pre-domain)

- A passing build is not a guarantee of Google indexing, AdSense eligibility, visual accessibility, or Core Web Vitals.
- `npm run audit:performance` measures static CSS, JS and HTML asset sizes and writes `dist/performance-budget-report.json`; its gzip figures are local estimates, not measured production transfer sizes.
- The 92 approved numeric pages include a useful pre-rendered result, interactive calculator, reference comparisons and display-precision table; their high template similarity still requires editorial review. See [`research/NUMERIC-SEO-QUALITY-REVIEW.md`](research/NUMERIC-SEO-QUALITY-REVIEW.md).
- In preview mode all pages remain `noindex`. Do **not** buy or connect a domain solely to clear CI checks; genuine real-browser checks can be run when an official domain is available.

## Local real-browser and evidence audits

The main-branch GitHub Actions workflow automatically builds the site, checks 33 Node tests, then launches local headless Chromium. The smoke suite checks real calculator inputs and errors, CSV parsing, reset, suggested tools, numeric reference interactions, and responsive horizontal overflow at 320, 375 and 768 CSS pixels. No custom domain is required for these checks. To run the browser smoke suite manually on a machine with Chrome installed, first run `npm run build`, then `node scripts/browser-smoke.mjs`.

Every CI run also produces the offline `dist/keyword-evidence-review.csv` and `dist/keyword-evidence-review.json` files from the approved V2 dataset. The GitHub Actions run has a 7-day `exactunit-quality-reports` download containing these files plus the build SEO/performance reports. A raw competitor rank of 0 is explicitly tagged as unverified. Do not mistake competitor estimates for this site's traffic or assume 92 similar pages are automatically useful/indexable.

Browser smoke checks are not measurements of live Cloudflare performance, Lighthouse scores, accessibility certification or Google indexing. The temporary `*.pages.dev` preview remains noindexed until a real domain is chosen.

## Curated search-index launch (before purchasing a domain)

The approved V2 research contains 37 originally planned tools and 92 keyword-specific results. A missing parent tool for the already-approved `seconds-to-hours/14400/` query has been added, so there are now **38 tools**. Source demand should not be confused with traffic to this site.

By default `NUMERIC_INDEX_MODE=curated`: all 92 numeric pages remain available, but only the **26 URLs explicitly listed in** `src/data/numeric-seo-policy.json` are eligible for `index,follow` and inclusion in production sitemap. The remaining 66 have `noindex,follow`, no self-canonical tag and no sitemap entry. This is a conservative pilot to reduce same-template exposure, **not a guarantee that selected pages will rank**. Do not set `NUMERIC_INDEX_MODE=all` without reviewing source intent, duplication and post-launch data. Preview builds remain globally noindexed regardless of this flag.

Google's source guidance on [canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies) informed the technical policy. A unique numeric result is not necessarily an independently valuable page. Once an official domain is purchased, set `SITE_URL` to its HTTPS origin, check GSC index coverage and Search Performance by query/page, and revisit the pilot whitelist based on real clicks and usefulness.

Detailed source-backed SEO pilot, 26 selected keywords, indexing rules and real-world validation checklist: [`research/SEO-LAUNCH-PILOT-20261102.md`](research/SEO-LAUNCH-PILOT-20261102.md).

After binding a real domain, configure a Cloudflare Bulk Redirect from the default `*.pages.dev` production host to the official domain when practical. Until then the generated `_headers` blocks indexing on both Pages project aliases and preview hosts, including during synthetic-production builds. Cloudflare reference: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

## Google SEO content quality (2026-11-02)

Every **38** directional calculator page has a static, source-linked explanation of its measurement caveats, conversion factors, reverse direction when available and independently computed one- and ten-unit checks. All **16** category pages have a substantive measurement definition and verification note. The batch converter page documents the actual CSV workflow, ambiguity protection and current limitations. About and Methodology disclose how results are generated, tested and verified, without invented certification.

The zero-dependency `scripts/seo-content-audit.mjs` runs automatically on both preview and synthetic production builds and validates static HTML, expected content, original keyword phrasing, numeric answers and JSON-LD. The CI artifacts contain `seo-content-audit.json`. For reproducible external evidence and the *limitations* of public web search, see [competitor landing page spot-check](research/GOOGLE-SEO-SERP-SPOTCHECK-20261102.md).

No live Google US rankings, Googlebot indexing, GSC clicks, AdSense revenue or actual field Core Web Vitals are claimed. The 26 numeric pilot still needs individual usefulness review and source-confirmed search demand. Cloudflare preview remains `noindex` until an official domain has been configured.
