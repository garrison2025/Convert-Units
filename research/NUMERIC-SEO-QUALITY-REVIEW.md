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
