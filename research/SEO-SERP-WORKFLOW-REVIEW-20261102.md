# Google SEO: numeric-answer SERP and independent CSV-workflow assessment

Research date: **2026-11-02**. This is a public web-search competitor **page-level sample**, **not** a fixed-US-location Google desktop/mobile top-10 audit. Public search result coverage can vary by region, time, personalization and search provider; no competitor positions, current GSC clicks or site earnings are invented. Historical numbers in our repository are Semrush *competitor estimates*, not traffic to ExactUnit.

## Competitors observed

| Search user intent | Publicly observed page | Relevant features / user value | Implication for ExactUnit |
|---|---|---|---|
| `149 lbs to kg` | https://coolconversion.com/weight/149-pound-to-kilogram | Prerendered value, factor, nearby chart, related mass units, reverse conversion, contextual explanation | Adding another formula/chart is not an original competitive advantage |
| `240 kg to lbs` | https://coolconversion.com/weight/240-kg-to-pound | Compound stones/pounds, adjustable significant figures, factor and reverse calculation | Our existing compound display and precision tools are useful but not demonstrably differentiated |
| `37.9 celsius to fahrenheit` | https://www.celsiusfahrenheit.co/37.9 | Correct 100.22°F, step-by-step result, nearby values, long conversion table | This is an immediate-answer search; avoid fabricating medical recommendations or unsupported health interpretations |
| `400 pound feet to nm` | https://toea.com/pound-feet-to-newton-meters | Tool covering 400 ft·lb and formula references; easy copy and browser-local computation | The general torque tool may serve this intent; numeric page uniqueness needs real SERP verification |
| `batch unit converter` | https://unitly.tooleek.com/en/batch-converter | Spreadsheet columns, local conversions, copy/download CSV, decimal-separator controls, 200 numbers (as displayed) | Independent batch workflow interest exists, but page ranking and demand volume remain unverified |
| `batch converter csv` | https://convematik.com/batch-converter | 100 rows, per-row `value,from,to` and extra-column preservation, row error handling | Differentiation is about real CSV processing workflow, not the superficial number of converter pages |

## What was built this iteration

We implemented a user-visible enhancement to `/batch-converter/`, a relatively distinct user task versus single-value queries:

- Parse comma-, semicolon- and tab-delimited source tables using the tested local parser.
- Keep all successfully parsed **original source columns and their headings**, and append namespaced fields for `ExactUnit line`, `ExactUnit result`, `ExactUnit from`, `ExactUnit to`, and `ExactUnit status`.
- Preserve original source cells even when the measurement is invalid; report the source line number instead of silently omitting the record.
- Export numerical results as ungrouped machine-readable decimals (e.g. `-1200`, not `"-1,200"` or a text-prefixed CSV formula). User-provided source cells continue to use CSV formula-injection protection.
- Keep a single source/target unit pair per batch. **Per-row mixed units and support for multiline quoted CSV records are not claimed.** No uploads, paid APIs, database or server are introduced.
- Update visible title, description and guide to communicate what the tool actually does. Add math, header, invalid-row, CSV/TSV and browser regression tests and an SEO content audit gate.

This increases real main-content functionality on a dedicated workflow page, rather than inventing new template-only answer pages.

## Official Google guidance and index decision

Google's [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) explicitly recognizes built-in tools and calculators as potential **main content**. It evaluates accuracy, usefulness and original effort, not a minimum word count.

Google's [Canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) distinguishes redirects, canonical links and sitemap signals. **Noindex is not a consolidation tool** for duplicate signals. Our 77 suppressed numeric URLs are deliberately excluded from search; they are not being claimed as rel=canonical duplicates consolidated into the 15 selected value pages.

We retained the existing **15 selected numeric pages / 77 suppressed numeric pages** policy and **79 production sitemap candidates**. The content remains similar between each selected numeric URL and its corresponding parent tool; public searches alone cannot show whether Google will choose both as independently valuable pages. We did **not** expand or blindly change this index list based on incomplete public search results.

## Next research gate

Before increasing indexing or committing to a custom domain, obtain an explicitly **US-location/device** SERP sample for high-priority queries, including numeric/parent pairs and the `batch unit converter` task. Record the observed organic landing URL, Google conversion features/AI overview, page type, domain diversity and screenshot evidence with exact date/region. Only Search Console after launch can verify the website's own impressions, indexing and organic clicks. A successful GitHub CI run is evidence of implementation correctness, **not** proof of organic ranking or revenue.
