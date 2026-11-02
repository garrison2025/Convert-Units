# Numeric SEO pages — content quality and indexability review

Updated: 2026-11-02. Applies to the V2 approved 92 numeric query URLs, not to new/generated query parameters.

## What the code actually provides

Each page contains a correct pre-rendered answer (no JavaScript required for the initial result), a calculation formula, an interactive calculator, nearby input table, related conversions, equivalent compatible units, rounding comparisons at 2/4/6/9 decimal places, and links to methodology and direction-level tools. These are concrete user features, **not** evidence of Google indexability.

## Duplicate-template exposure

The current normalized-token similarity audit (numbers replaced before comparing) reported **1,646 of 1,646 comparable same-direction pairs** above its 0.95 similarity threshold. The audit is sensitive to shared navigation and calculator labels; it is a quality warning, not a Google penalty diagnosis. Its per-direction summary is written to `dist/release-audit-report.json` on every build.

Approved numeric URLs by direction:

| Direction | Number of numeric pages | Editorial attention |
|---|---:|---|
| lbs-to-kg | 56 | Highest priority; heavily repeated value-intent pages |
| kg-to-lbs | 14 | Highest priority; same mass conversion cluster |
| milliseconds-to-minutes | 4 | Check independent search intent |
| milliseconds-to-seconds | 4 | Check independent search intent |
| celsius-to-fahrenheit | 2 | Confirm source precision is not mistaken for sensor accuracy |
| minutes-to-hours | 2 | Clarify decimal hours versus hours/minutes |
| seconds-to-minutes | 2 | Clarify decimal minutes |
| Other one-value directions | 8 | Verify unit semantics and evidence-backed demand |
| **Total** | **92** | **Do not equate generated URLs with verified content quality** |

The current 92 approved static pages remain in the build and were **not** automatically set to `noindex`. This preserves the approved V2 scope while making editorial risk explicit. Pages on `*.pages.dev` remain `noindex` regardless.

## Editorial release decision

- Review the 70 mass value pages first as one cluster, not 70 fake independent articles. The exact answer is the primary intent; check whether each additional URL genuinely helps a reader beyond a live main converter.
- Verify every number is supported by the original keyword research rather than invented search-volume estimates.
- Keep factual calculations, unit definitions, domain-specific caveats, comparisons and meaningful interaction. Never invent medical, engineering, personal-body-weight or commercial scenarios simply to disguise duplication.
- If a value page has no independent utility or verified intent beyond an existing pair page, consider consolidation and appropriate indexability **before official-domain publishing**, instead of automatically producing more prose.
- Search engine eligibility and AdSense approval cannot be inferred from the test suite or Jaccard similarities alone.

## Source of policy guidance

Google Search Central's spam policy states that scaling pages primarily to manipulate rankings without helping users can be scaled content abuse:
https://developers.google.com/search/docs/essentials/spam-policies

Google's people-first content guidance:
https://developers.google.com/search/docs/fundamentals/creating-helpful-content

This document does not claim a Google audit, manual indexation test, or verified organic traffic.

## Evidence review output (2026-11-02)

Each build exports `dist/keyword-evidence-review.csv` and `dist/keyword-evidence-review.json` for all 92 approved numeric routes. The report retains the observed **competitor** Semrush US keyword volume, difficulty, recorded ranking, estimated visits, keyword, and observed competitor landing path. None of these metrics measures ExactUnit traffic or proves an individual page should be indexed.

The source keyword `1.8 kilograms in pounds` has a raw competitor rank value of **0**. A zero ranking is not a valid organic position. The report preserves the raw 0 and represents the observed rank as **unverified**, not as rank #0 or rank #1.

The audit reports 15 directional clusters, with the `lbs-to-kg` (56 pages) and `kg-to-lbs` (14 pages) groups requiring highest-priority editorial scrutiny. All approved pages stay present and functional; the program does not autonomously change their indexing status or invent prose to disguise duplication.

Before purchasing a domain, use the downloadable review CSV to mark **keep, consolidate or noindex-review** for each page based on search intent, evidence and distinct user utility. Do not automatically index every number simply because a competitor ranked for its keyword. The preview is globally noindexed until a confirmed custom-domain build.
