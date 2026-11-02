# V19 — Competitive core intent and usable feet/inches display (2026-11-02)

## Evidence and limitations
Current public web search shows that generic `meters to feet` pages commonly offer **decimal feet plus feet-and-inches**, not merely a one-line unit factor. The query `8849 meters to feet` in the user's October 31 competitor Semrush export was US monthly Volume estimate **260**, KD **13**, observed competitor position **3**, estimated competitor keyword visits **11**. These are historical **convert-units.info** records, not current verified generic `meters to feet` demand and not ExactUnit's GSC data.

External verified examples:
- [Inch Calculator: Meters to Feet and Inches](https://www.inchcalculator.com/convert/meter-to-foot/): decimal feet, feet-and-inches and a common-value chart, including fractional inches; established competitor.
- [CalculatorSoup: Meters to Feet](https://www.calculatorsoup.com/calculators/conversions/meters-to-feet.php): choose fractions from whole inches to 1/64-inch, reduced fractions; strong feature coverage.
- [ToolNeko: Meters to Feet](https://toolneko.com/en/tools/meters-to-feet/): dual reading including 1/8-inch precision and signed display error.
- [Inch Calculator: ft-lbf to N·m](https://www.inchcalculator.com/convert/foot-pound-to-newton-meter/), [ThousandTools torque](https://www.thousandtools.com/unit-converters/torque/pound-foot-to-newton-meter/) and [UnitConverters.Tools speed](https://www.unitconverters.tools/kmh-to-mph/): basic formulas/tables and relevant alternate units are already covered. Further speculative numeric pages have little obvious incremental value.
- [NIST international versus survey foot](https://www.nist.gov/pml/us-surveyfoot): 1 international ft = exactly 0.3048 m; the deprecated US survey foot is not automatically interchangeable with the international foot for legacy land-survey records.

The above is real public competitor content and standards evidence, **not a neutral Google US rank survey**. Generic direction-keyword Volume, KD and the site's own keyword clicks remain unverified. Before deciding on new canonical tool routes or additional indexable pages, obtain a genuine Semrush/Ahrefs organic-keyword export linked to actual ranking URLs and, following domain launch, GSC performance data.

## V19 change: no new SEO routes
Improve the **existing** `/convert/m-to-ft/`, `/convert/ft-to-m/` and pre-approved `/convert/m-to-ft/8849/` numeric page, while keeping the V18 engineering reference and the same 38 tools, 92 numeric pages and 157 routes.

- Server-render a second helpful measurement format after the primary result and copy actions. Show **feet + decimal inches to 0.01 in** and **feet + reduced fractional inches to the nearest 1/16 in**. Show `≈` where rounding occurs, `=` only for numerical equality.
- Live update for new measurements, input units and swapped direction; hide stale result on invalid input and constrain extreme values, preserving the primary calculator. Add a copy action including the rounding warning. Support negatives as signed lengths rather than physically impossible positive values.
- Carry at a 12-inch boundary, reduce fractional representations, and derive results from one exact international-foot conversion without rounding intermediate measurements. Show source link to NIST and no invented accuracy certification.
- Retain core result as the primary visual and avoid new pages, subscriptions, APIs, network requests, or a custom domain.
- Preserve source-code maintainability: remove developer-only JSDoc blocks **from copied browser JS delivery artifacts** while keeping documented source, to stay under the original strict **32768-byte combined CSS+JS gzip** budget.

## QA requirements and non-claims
New Node regression tests cover 1.75m, 1m, 0.3048m, 0, 1/8ft, rounding carry, signed lengths and rejected values; static SEO audit verifies exact SSR values and no unrelated-tool leak. Real Chromium exercises direct pages and the existing numeric route, swap, copy, invalid input and mobile overflow. Live Cloudflare deploy audit checks deployed commit SHA, real V19 HTML content, full-site `noindex` and private QA artifact protection.

Do **not** read a green CI, local Lighthouse score or online Pages.dev HTML as actual Google indexation, GSC ranking, organic growth or conversion income. The preview host is never the official domain.

## Unchanged production gates
- 15 numeric pages remain conditional index candidates; 77 numeric routes remain `noindex`. No numeric route selection modification.
- All 157 existing routes stay fixed; `pages.dev` has noindex and no canonical/sitemap, even on main.
- Official domain, three-variable host-bound SEO approval, Google Search Console and AdSense setup remain deferred.
