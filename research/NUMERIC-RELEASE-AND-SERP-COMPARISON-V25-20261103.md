# V25 — Numeric search-intent comparison and explicit per-URL public indexing approval

**Date:** 2026-11-03. **Current site:** https://convert-units-bwa.pages.dev/ is a Cloudflare-generated **preview**, not the intended official domain. **No Google ranking or GSC-click claim.**

## Verified side-by-side competitive evidence

The 15-value candidate shortlist remains a historical competitor-keyword research inventory. In the original Nov 2 audit, 13 competitor URLs had a value-specific landing page, while two were generic tools **with the target number covered in the main page**:

| Exact historic keyword and competitor dataset | Competitor's actually observed behavior (Nov 3) | ExactUnit already offers | SEO implication |
|---|---|---|---|
| `400 pound feet to nm` — US Vol 480, KD 29, rival estimated rank 1, estimated rival visits 119 | [0-60calc lb-ft to Nm](https://0-60calc.com/lb-ft-to-nm/) has a normal converter, a dedicated 400 lb-ft preset and a 400-row table returning about 542.3 Nm, plus formula | Dedicated 400 page with N·m, ft·lbf, in·lbf and kgf·m answers; browser-based copy, exact factor, rounding comparisons | **HOLD**: ordinary converter already satisfies the numeric query; our additional four-unit output is functionality, **not verified unique search value** |
| `108 kpa to psi` — US Vol 1,000, KD 29, rival estimated rank 9, estimated rival visits 19 | [kpatopsi.com](https://kpatopsi.com/) homepage has bidirectional converter plus a separate 108 kPa example giving about 15.66 psi, and formula | Dedicated 108 page with computed answer, pressure multi-unit readout, local conversion and precision checks | **HOLD**: generic homepage covers the same exact value; standalone numeric Google intent **not verified** |

These two competitor websites were read for their *visible functionality*, not verified for **current US organic ranking**. The Volume/KD/rank/visits values above are the **historical competitor Semrush estimates**, not ExactUnit statistics. The competitors sometimes round the underlying factors to six decimals; ExactUnit's source engine retains a longer numerical conversion factor. That does not by itself show SEO differentiation.

**Neither numeric page is deleted.** They continue to work on the preview. Both remain in the same immutable 15-candidate dataset, awaiting actual search-intent evidence and editorial approval. The other 13 also remain pending comparative verification. The underlying 77 other numeric pages remain excluded from public indexation.

Review source: `research/NUMERIC-GENERIC-COMPETITOR-SIDEBYSIDE-V25-20261103.json`.
Official policy context: [Google scaled-content guidance](https://developers.google.com/search/docs/essentials/spam-policies), concerning substantial added user value rather than whether code generates a page.

## Source-level release bug repaired

In previous versions `manualDecisionRequiredBeforeLaunch: true` was only a *statement*, while `numericIndexable(url) = pilot.has(url)` immediately switched all 15 candidate pages to indexable when `SEO_INDEX_APPROVED` was set for a verified public domain. This silently approved numbers despite the 15/15 evidence gap.

V25 separates permissions:

1. Domain approval `SITE_URL` + `SEO_PUBLIC_HOST` + `SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING` permits **main/core direction and category pages** on the user-owned official domain.
2. The **numeric pages remain generated and functional but noindex** unless an individual URL is on a per-URL approved list with an independent matching hostname and token. Mere domain approval means **0** numeric pages indexable by default.
3. For each numeric URL already on the frozen 15-candidate list, only after human comparative SERP/editorial review, set these *additional* variables:
   - `SEO_NUMERIC_PUBLIC_HOST=yourdomain.example` — must equal official `SITE_URL` host exactly.
   - `SEO_NUMERIC_INDEX_APPROVED=I_APPROVE_SELECTED_NUMERIC_URLS`
   - `SEO_NUMERIC_APPROVED_URLS=/convert/in-to-cm/17.7/,/convert/kmh-to-mph/330/` — **example of syntax, NOT a recommendation or approval for either query**.
4. One unrecognized URL, duplicate URL, blank item, wrong host or partial token fails the build. The full-indexing `NUMERIC_INDEX_MODE=all` path is rejected for public production: the **77 excluded pages can never be made indexable through it**. Preview/branch builds keep universal noindex even if hosting service inherits environment settings.
5. The 15-candidate/77-excluded policy JSON remains untouched, with all 157 static page URLs unchanged. Parent category/tool HTML links are updated to point only toward numerical URLs that have been cleared for public indexing; the standalone numeric page remains usable by its direct link when not approved.

This is a technical release safety guard, **not proof of competitive value or SEO opportunity**. The new public-domain configuration still requires the user's explicit real purchase/launch decision. **No real domain has been purchased, connected, or indexed.**

## CI acceptance tests

- Preview: 157 HTML routes all noindex, no populated sitemap, no canonical, 15 functional numeric candidate pages in live Cloudflare read-only probes.
- Synthesized production without numeric-specific release variables: core route index eligibility is allowed, 92 numeric pages are noindex; 15 are still **candidate URLs**, not automatically released.
- Synthesized production with an explicit example list of 2 real candidate URLs: only those 2 index, all remaining 90 numeric pages noindex, 77 excluded always blocked.
- All static content/metadata, generated numeric answer and link audits, 58+ existing real Chrome interactions and mobile screenshots, Lighthouse lab, 32,768-byte combined gzip budget. Private evidence CSV/JSON only inside GitHub CI archived QA artifacts.
- No paid APIs, accounts, services, backend database or new pages. Preview stays noindex.

## Next remaining research

For the **four same-dimension high-text-overlap pairs** from V24, use the updated `numeric-pilot-readiness-v24.json` private report and PR CI log; high n-gram overlap is a sorting heuristic, not Google's duplicate content decision. For the remaining 13 value-specific competitor pages, current US Google SERP and actual value added still require review: do **not** use historical competitor rank as proof of current rankings. At formal domain launch, publish core tools first and grant numeric URL indexing only when individually justified.
