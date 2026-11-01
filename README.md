# ExactUnit — free unit converter

Production-ready, zero-dependency static website created for the [Convert-Units](https://github.com/garrison2025/Convert-Units) project according to the user-approved V2.0 build plan.

## Delivered

- **37** direction-specific calculators and **one universal converter** spanning **16** measurement categories.
- **92** accurately prerendered numeric SEO results, one canonical URL per approved search intent.
- **154** SEO-ready static pages in total (indexable only once the confirmed custom domain is configured) (homepage, categories, tools, approved numeric pages, batch converter, and policy/methodology pages).
- Batch converter: on-device multi-line calculations, up to 500 numbers, local CSV/TXT file selection, CSV download and print.
- No account, database, backend, cron, third-party APIs, external fonts, or mandatory cookie scripts.
- Pure ECMAScript modules, vanilla CSS/JS and Node's native test runner; no dependency installation.
- Keyword evidence: `research/semrush-us-600.tsv` (original 600 rows), `research/KEYWORDS-600.xlsx` (planning workbook), and `research/SEO-PLAN-V2.md`.

## Local build and tests

Requires Node 20+.

```sh
npm run check
```

The command runs conversion tests, static builds, and crawlable HTML audits. Site is generated in `dist/`. For local preview, serve `dist/` with any static HTTP server (do not open `index.html` via `file://` because ECMAScript modules require HTTP).

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

**Official domain mode:** Once your domain is connected, set Cloudflare Pages `SITE_URL` to its final HTTPS origin and redeploy. Canonical tags, sitemap, robots.txt and 154 indexable URLs will automatically use that domain. Remove any previously configured incorrect `SITE_URL`. Verify the production domain resolves; redirect or disable the duplicate Pages subdomain where supported.

Do not submit the temporary Pages subdomain or its preview sitemap to Google Search Console.

Cloudflare Pages will serve route folders' `index.html` on clean URLs. `robots.txt`, `sitemap.xml`, `_headers`, and `404.html` are generated at build time. The `dist/` folder is output only, not checked into source.

## Important boundaries

This source build and its automated tests have been verified locally. They do not prove a production Cloudflare deployment, a connected domain, Google indexing, AdSense approval, organic traffic, or ad revenue.

Publishing many similar numeric pages is not itself proof of usefulness. Keep user value and accuracy as the primary requirements. Keyword Volume/KD/rank are estimates of the competitor's October 31, 2026 results, **not forecasts** for this website. SEO canonical destinations are controlled by the curated 92-page seed list.

## Internal layout

- `src/assets/engine.mjs`: deterministic units and numerical conversions
- `src/assets/app.mjs`: interactive and CSV functionality
- `src/assets/site.css`: design system, responsive layouts, reduced-motion support
- `src/data/pairs.json`: 37 verified tool routes
- `src/data/seeds.json`: 92 approved numeric pages and keyword evidence
- `scripts/build.mjs`: build HTML, metadata, canonical, sitemap, robots, legal pages
- `scripts/audit.mjs`: static SEO integrity audit
- `tests/conversion.test.mjs`: precision, dimensions, and page mapping tests
- `research/*`: full V2 plan and all uploaded keyword research data

This project is an independent implementation, not a copy of the competitor's site content or proprietary design.
