# Google SEO: structured-data consistency and mathematical accuracy audit

Date: 2026-11-02. Applies to the existing Convert-Units / ExactUnit project. This is a **local preview plus synthetic production build** audit, not a real Googlebot crawl of an official domain or proof of rich-result eligibility.

## Grounded Google guidance

1. [Canonical URL selection](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): self-referencing canonical links are a strong preference signal; XML sitemap inclusion is weaker; Google still selects its canonical. A `noindex` tag is not a replacement for duplicate-content canonical consolidation.
2. [BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb): provide the actual page hierarchy as ordered `ListItem` elements with valid URLs and labels. At least two list items are required for breadcrumb rich-result eligibility.
3. [General structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies): JSON-LD must represent real visible page content and cannot invent facts or fake user reviews.
4. [Software-app structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app): Google requires `name`, `offers.price` **and authentic `review` or `aggregateRating`** for software-app rich-result eligibility. Our tools legitimately provide free `WebApplication` descriptive markup but **do not have review or rating evidence**, so we **do not claim eligibility** for a Google software-app rich result. Do not add fictitious rating values.
5. [Helpful people-first main content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): interactive calculators are main content; formulas and displayed results must not mislead users.

## Actual fixes

- `scripts/seo-content-audit.mjs` now checks **all 157 HTML routes**, including information/policy pages and `/404/`. Earlier iterations covered 149 by explicit route families and omitted the remaining pages from this specific schema review.
- For all future-indexable production pages, verify exactly one self-referencing canonical, `WebPage` URL/title/description matching the real head metadata, and matching Open Graph URL/title/description.
- Check every non-home page `BreadcrumbList` against its **actual** category → tool → value-page chain, with sequential positions, URLs, labels and ancestor links visible in the HTML breadcrumbs.
- Validate one `WebSite` on the homepage only; verify legitimate free `WebApplication` markup on 38 direction calculators plus the universal and batch tools without inventing ratings.
- Ensure preview pages and deliberately noindexed numeric pages have no index-focused structured data or self-canonical. The 404 page remains noindexed.
- `src/assets/engine.mjs` provides `displayRelation()`: a displayed 9-decimal approximation is labeled `≈`, while a value that matches the numeric calculation at the displayed precision can use `=`. This is now shared by the prerendered numeric answer banner, copied result, tool-page unit examples, SEO titles/meta descriptions and release audit.
- Numeric page eyebrow updated from an overbroad “EXACT RESULT” claim to “CALCULATED RESULT”. Regression tests cover rounded 240 kg → lb and matching 149 lb → kg displays.

## Verified result

GitHub Actions [run 41382672864](https://github.com/garrison2025/Convert-Units/actions/runs/41382672864) passed **56 Node tests**, **15 real Chromium smoke scenarios**, **157/157 HTML routes** in static SEO content audit, **0 technical errors**, and **63 editorial review warnings** in deep QA. The production simulation still exposes only **79 future index candidates** (38 directional converters, 16 category pages, 10 other content/tool routes, and 15 selected value URLs); **77 other value URLs remain `noindex`** and are omitted from the sitemap. Maximum eligible click depth is two and eligible orphans are zero.

The `seo-content-audit.json` artifact additionally lists structured-data checks and explicitly says that software-app rich-result eligibility is **not claimed**. Passing this audit does **not** verify Search Console indexing, real field Core Web Vitals, Google selection of a canonical, rankings, clicks or revenue.

## Next genuine evidence gate

Acquire a real official HTTPS custom domain **only when the user chooses to launch**; then verify HTTP response statuses, response `X-Robots-Tag` headers on both official and `*.pages.dev` domains, page-source canonical/JSON-LD, sitemap and Google Search Console URL Inspection. Do not assume the preview is production. Once live, inspect actual Google-selected canonicals and impressions for the 15 value pages before expanding numerical index eligibility.
