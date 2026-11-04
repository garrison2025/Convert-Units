# Audit fixes — verification evidence

Date: 2026-11-04 (Asia/Shanghai). Baseline: `62087cff23c358e21707371a8ba2dc08a59877e9`.
Scope: approved audit repairs to the existing ConvertUnits.cc site. Operate surfaces retain the same layout, routes, headings, navigation and calculation definitions; privacy and secondary-text presentation are updated to observed behavior.

## Changes

- Generated HTML uses content-fingerprinted CSS and browser entry filenames. The entry imports the corresponding fingerprinted engine. Stable aliases remain only for compatibility with existing diagnostic URLs. Release checks validate the actual file hashes, aliases and module dependency.
- Build delivery normalizes LF across Windows/Linux and strips standalone source comments without adding a dependency. Source explanations remain in the repository. Original performance budgets are unchanged.
- Numeric source-interval controls update the displayed increment, lower/upper explanation, table and conclusion together. The helper text distinguishes hypothetical centered intervals from established measurement precision.
- Invalid input clears the accessible result, associates the error with the input and disables both result-copy actions. Valid input restores copying.
- Secondary labels use the existing muted design token. No layout redesign or new product flow.
- Privacy discloses the observed Cloudflare Web Analytics deployment and warns that shared URLs contain values; conversion itself remains browser-local. No new analytics or advertising scripts were added.
- New CSV appended headings use `ConvertUnits.cc`; imported user columns remain intact. README documents the compatibility change.
- Same-unit conversions preserve tiny inputs after physical validation; conversion underflow reports a precision error instead of a false zero.
- Retired internal-report redirect targets are reserved absent paths rather than a 200-status error document. Internal reports remain outside deployment output.

## Executed checks

| Check | Result | Evidence / boundary |
|---|---|---|
| Node22 preview `npm run check` | PASS | 163 tests, zero failures; full static build, content/crawl/release/budget audits |
| Node22 production-config `npm run check` | PASS | 156 index-eligible URLs, all92 numeric URLs, zero orphan pages, maximum2 hops |
| Delivered module syntax | PASS | `node --check dist/assets/app.mjs` and `engine.mjs` |
| Existing real-Chromium smoke suite | PASS | 94 scenarios; extended invalid→valid and source-interval checks |
| Interactive local browser | PASS | 138.8lb page, increment1lb: narrative and table both138.3–139.3lb; empty input exposes `No conversion result`, disables copying |
| Homepage mobile Lighthouse12.8.2 | PASS | performance100 / accessibility100 / best-practices100; local emulated LCP1.31s, CLS0, TBT0 |
| Converter mobile Lighthouse12.8.2 | PASS | performance100 / accessibility100 / best-practices100; local emulated LCP1.21s |
| Preview noindex | PASS | Local Lighthouse SEO63 is expected for intentional preview noindex/no production canonical; not a production SEO regression |
| Production metadata preservation | PASS | Separate generated-HTML comparison against the156-page audit baseline; see accompanying validation report |
| Live production behavior after these changes | NOT RUN | Changes are on a review branch; no merge or production deployment performed |
| CrUX/GSC/indexing/revenue | NOT RUN | No account/field outcome claims |
| Real device/screen reader/paper printer | NOT RUN | Chromium automation and accessibility-tree review are narrower evidence |

## Performance budget

Delivered current-resource totals: CSS71,453bytes; JS54,104bytes; combined gzip30,827bytes. Existing limits remain71,680 /56,320 /32,768bytes. The stable aliases are not additional requests in the generated page's dependency graph.

## Protected behavior and release limits

All38 directional converters,16 categories,92 numeric URLs and156 approved production index URLs remain. No keyword research expansion, sitemap reduction, canonical consolidation, noindex expansion, paid API, database or runtime dependency. Old dated README entries are historical; the current configuration section governs deployment operations.

The baseline audit observed Cloudflare's injected performance beacon in a real browser; local preview does not reproduce platform injection. Its continued production behavior and the final404 response for retired paths require post-deployment checks. Local Lighthouse is not live-user Core Web Vitals and TBT is not INP.

Rollback: revert this repair commit, rebuild and verify production metadata. Do not remove the owner's existing indexing approval or alter keyword ownership as part of rollback. Legacy CSV appended column names change intentionally and are disclosed; import pipelines selecting those headers need adjustment.
