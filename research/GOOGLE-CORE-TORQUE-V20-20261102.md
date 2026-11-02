# V20 — Torque four-unit live conversions, existing URLs only

**Evidence date:** 2026-11-02. Scope: US English search audience. **Actual ExactUnit GSC visibility remains unknown** because the official domain is not launched.

## Competitor-first analysis
- [Inch Calculator, foot-pounds to N·m](https://www.inchcalculator.com/convert/foot-pound-to-newton-meter/): both calculator and conversion reference table, commonly used input aliases `lb-ft` / `ft-lb`; mentions the critical difference between torque and energy.
- [Inch Calculator, torque](https://www.inchcalculator.com/convert/torque/): selectable converter and 3-unit equivalence table (N·m, inch-pounds, foot-pounds).
- [Inch Calculator, inch-pounds to N·m](https://www.inchcalculator.com/convert/inch-pound-to-newton-meter/): the `in-lbf` user intent is distinct from `ft-lbf`; no new SEO landing page was authorized here.
- [NIST Guide to SI, Appendix B.8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8): formal foot-pound-force and pound-force-inch conversions.
- [NIST Guide to SI, Appendix B.9](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b9): other torque factors and exact standard gravity for kilogram-force.

Historical **competitor** Semrush export previously provided to the project includes the exact keyword `400 pound feet to nm`: estimated US volume **480**, KD **29**, convert-units.info rank **1**, estimated competitor traffic **119**. This is a single historic competitor keyword row, not verified monthly volume or search ranking for `ft lbs to nm`, `torque converter`, or the ExactUnit website. No prediction of organic visits or advertising revenue is warranted.

## Actual enhancement, not another copy of a static table
V18 already added `in-lbf` and `kgf-m` to the actual engine and a single *static* 100 ft·lbf engineering reference. V20 closes the practical usability gap: on the existing `/convert/ft-lbf-to-nm/`, `/convert/nm-to-ft-lbf/` and `/convert/ft-lbf-to-nm/400/`, generate a server-rendered, immediately visible live panel giving the same input in:
1. newton-meter N·m;
2. foot-pound-force ft·lbf;
3. inch-pound-force in·lbf;
4. kilogram-force-meter kgf·m.

Input, swapping direction and changing the selected output unit update the reference results from the original input. Six-digit display rounding is labeled `≈`; values equivalent within floating-point precision are labeled `=`. The original primary result and formula remain intact. Allow signed values (for directional torque) but never infer an appropriate bolt-tightening torque. The copy button includes the original value, all four conversions and a manufacturer-specification caveat.

This is a pure deterministic calculation. No account, external API, dependency, cost, new page or numerical keyword URL was introduced. Existing shared CSS styles keep this panel responsive without expanding styles.css.

## Verification criteria
- Node tests for 400 ft·lbf, 12 in·lbf = 1 ft·lbf, kgf·m factor, signed/zero/invalid readings and immutable URL inventory.
- SSR audit for true engine-derived figures and source warning; no torque panel on mass pages.
- Chrome smoke: live, swap, clipboard, invalid input, responsive tool; actual 400 numeric page stays noindex on preview.
- Strict compressed static-asset budget (32 KiB CSS+JS), audit of 157 routes, 38 tools, 92 numeric pages.
- Exact deployed Cloudflare SHA versus main, V20 four-unit content, `noindex` on inspected preview pages, private QA reports not exposed.

**Index gates unchanged:** 15 numeric pages remain *conditionally* indexable only after official-domain approval; 77 remain noindex in approved-production mode. On Pages.dev every page is noindex, canonical and populated sitemap remain withheld. Google indexing, ranking and clicks have not been demonstrated.

## Next evidence gate
Obtain fresh Semrush/Ahrefs **organic ranking URLs and nonbrand keywords** for these identified competitors before commissioning any new torque direction pages; for speed, follow the same approach rather than inventing keyword volume or expanding numeric pages.
