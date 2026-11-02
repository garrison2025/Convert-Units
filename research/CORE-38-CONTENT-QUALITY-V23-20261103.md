# V23 — 38 directional pages: real content relevance and source-calculated references

**Research and code inspection date:** November 3, 2026. **Site:** ExactUnit / GitHub `garrison2025/Convert-Units`. **Release state:** `pages.dev` preview with all URLs noindex; official domain not yet purchased/approved for launch.

## What was audited, and what the evidence does **not** show

The 38 directional pages are the existing `src/data/pairs.json` records, alongside 92 numeric pages, 16 category pages and site utilities (157 total static HTML routes). Historical Semrush exported data are estimates about competitor pages only. ExactUnit still has **no confirmed Google indexing, ranking, organic-click trend, or advertising revenue**, and a GitHub CI pass does not change that.

Current Google Search Central documentation:
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) emphasizes helpful page-specific explanations and avoiding mass-produced content without added visitor value.
- [Search Essentials](https://developers.google.com/search/docs/essentials) notes descriptive main headings, understandable terms and crawlable internal links.
- [Title link best practices](https://developers.google.com/search/docs/appearance/title-link) recommends concise, distinct, descriptive title text without exaggerated claims.

These are editorial guidelines and **not** evidence that any particular change increases rankings.

## Concrete problem found in the generator

The existing `engineeringReference(pair)` selected one fixed chart solely by broad physical dimension:
- All five length tool pages had **the same fractional-inch → mm/cm chart**. On `/convert/m-to-ft/` or `/convert/ft-to-m/`, this chart did not directly answer the requested meter/foot direction.
- Both speed pages showed **60 mph → other units**, even for `/convert/kmh-to-mph/`.
- Both torque pages showed **100 ft·lbf → other units**, even for the `/convert/nm-to-ft-lbf/` source.

This is an independently reproducible mismatch between source unit and table content. It is not necessarily a proven Google duplicate-content penalty. Existing calculators, primary answers, full formulas, safety notes and real numeric table examples already exist; therefore adding more generic text is unnecessary.

## V23 precisely scoped changes

Nine existing source-direction static charts become:
1. `m-to-ft`: 0.5, 1, 1.75, 2, 3 meters → decimal feet and nearest 1/16 inch in mixed feet/inches.
2. `ft-to-m`: 1, 3, 5.5, 6, 10 decimal feet → meters and centimeters, with an explicit decimal feet vs feet+inches note.
3. `cm-to-in`: 1, 2.54, 5, 10, 30 cm → decimal inches and fractional 1/16-inch ruler readings.
4. `in-to-cm` and `in-to-mm`: retain exact 1/16, 1/8, 1/4, 1/2 and one-inch ruler examples, because inch fractions are actually relevant to each source direction.
5. `kmh-to-mph`: source 100 km/h → mph, meters/s and knots.
6. `mph-to-kmh`: source 60 mph → km/h, meters/s and knots.
7. `ft-lbf-to-nm`: source 100 ft·lbf → N·m, in·lbf and kgf·m.
8. `nm-to-ft-lbf`: source 100 N·m → ft·lbf, in·lbf and kgf·m.

All values derive from the existing exact-factor engine; no hardcoded results are written as mathematical facts. One reference table per eligible tool; elsewhere no irrelevant table. The live calculator and V19/V20/V21 four-unit panels are retained, not duplicated or replaced. No CSS, browser-side JS, API, server, database, subscription or new route is introduced.

## Added full-inventory quality gate

`scripts/core-page-quality-audit.mjs` inspects **all 38 built directional HTML pages** for:
- distinct, source-appropriate title, H1 and meta descriptions;
- precise source-computed one-unit answer, working visible calculator, formula/methodology and interactive reference table;
- existing same-dimension reverse links where available;
- all nine source-correct engineering references, without nonengineering leakage;
- specifically prohibited old irrelevant reference content on meter, foot, km/h and N·m pages.

It writes a route-by-route JSON checklist **only to `qa-reports/core-page-quality-audit.json`**, outside deployed `dist`, after the normal privacy segregation step. This is static-site QA, not live Googlebot or independent manual editorial assessment. Node regression and Chrome tests cover math, source alignment, mobile rendering and retained user interaction. The preexisting SEO content audit, crawl audit and production-launch guard remain in place.

## Immutable boundaries

- 157 HTML URLs, 38 directional tools, 16 categories, 92 numeric pages.
- 15 previously approved *conditional* numeric index candidates / 77 numeric noindex pages: `src/data/numeric-seo-policy.json` untouched.
- All `pages.dev` previews remain `noindex`; no canonical or public sitemap until explicit domain-host-bound approval.
- Combined CSS+JS gzip budget stays 32,768 bytes, because changes only affect prerendered HTML and Node tooling.
- Production custom domain last. Actual indexing and keyword performance would still need Google Search Console evidence.
