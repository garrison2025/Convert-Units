# V21 — Four-unit live speed equivalence, not new SEO pages
Date: 2026-11-03 (Singapore). Status: feature proposed for CI and direct preview verification.

## Competitor-first evidence
- [Omni Calculator, Speed Conversion](https://www.omnicalculator.com/conversion/speed-converter): its real live multi-unit converter supports km/h, mph, knots, m/s, ft/s and multiple scientific units, with simultaneous outputs. The primary **competitive gap** in ExactUnit was live, directly visible multi-unit results; V18 only added a *fixed 60 mph static reference*.
- [Inch Calculator, km/h to mph](https://www.inchcalculator.com/convert/kilometer-per-hour-to-mile-per-hour/): a calculator, directional formula and substantial km/h ↔ mph reference table. Copying a similar static chart would not be distinctive.
- [ToolNeko, KPH to MPH](https://toolneko.com/en/tools/kph-to-mph/): exact statute mile definition, live converter, pasted directional units and static chart. Autodetection is a separate feature not implemented by V21.
- [Unit Converters, kmh to mph](https://www.unitconverters.tools/kmh-to-mph/): a live calculator, directional instructions and numeric table.
- NIST [Guide to SI, Chapter 5](https://www.nist.gov/pml/special-publication-811/nist-guide-si-chapter-5-units-outside-si): 1 international nautical mile = exactly 1852 m; 1 knot = (1852/3600) m/s.
- NIST [International vs survey foot](https://www.nist.gov/pml/us-surveyfoot/revised-unit-conversion-factors): 1 international statute mile = exactly 1609.344 m. Exact factors are implemented already by the conversion engine.

## Keywords and uncertainty
The previously user-provided 2026-10 competitor organic-keyword export has a row for **`330kmh to mph`**, estimated US monthly volume **1,000**, KD **21**, estimated competitor position **10**, estimated competitor keyword visits **13**, competitor URL `/speed/kilometer-hour/330`. These historical figures apply to `convert-units.info`, **not** ExactUnit and **not** a verified current `kmh to mph` generic-keyword rank or volume. External public-page presence alone does not establish a ranking for these URLs, and fresh Semrush/Ahrefs organic search ranking export is required before adding new tool URLs. ExactUnit has no confirmed Google Search Console clicks or indexation yet.

## V21 implementation
On existing `/convert/kmh-to-mph/`, `/convert/mph-to-kmh/` and `/convert/kmh-to-mph/330/` show a separate, visible, source-prerendered set of values for the **same input speed** in:
- kilometers per hour (km/h);
- miles per hour (mph);
- meters per second (m/s);
- knots (kn).

Changes to input, output unit or swap update from the original input with six-place rounding; relation symbols `=` for sufficiently exact values and `≈` for rounded ones. A button copies all four values plus a notice that legal speed limits, travel time and stopping distance are **not** calculated. Positive input is speed magnitude; a negative input is interpreted as a **signed velocity component**, not as a physically negative speed magnitude. Avoid implied speed or driving recommendations. Panel disappears on invalid source, without stale values.

No extra CSS, API, paywall, subscription, dependency, canonical URL, indexable page or new numeric route. Existing shared layout and exact conversion engine are reused.

## QA and launch safety
Maintain 38 tools, 92 existing numeric pages, 15 conditionally indexable candidate pages and 77 noindex, and all 157 HTML paths. Current `pages.dev` previews remain **all noindex**, without a live production canonical or populated sitemap, regardless of `SITE_URL`. Keep combined CSS+JS gzip under 32,768 bytes. Test 60 mph = 96.56064 km/h = 26.8224 m/s; 1 knot = 1.852 km/h; 330 km/h ≈ 205.052493 mph; 70 mph = 112.65408 km/h; input swapping, 0, signed numbers, invalid input, mobile layout, full source-derived SSR, browser copy, and actual Cloudflare deployed SHA.

CI Lighthouse is a **lab proxy**, not field Core Web Vitals or Google ranking. Live preview verification must check the deployed HTML and preserve noindex before calling the change delivered. The official domain remains deferred.
