# V18 — Verified length, speed and torque directions (2026-11-02)

## Decision and fixed scope
Improve the **existing** 5 length, 2 speed and 2 torque canonical calculators. Do **not** generate numeric-page variants, purchase a domain, unlock the preview host, enable Google indexing, change the 15 numeric index candidates or change the 77 noindex numbers. Keep all user-entered conversion values on-device and maintain the 32 KiB combined compressed JS/CSS gate.

## Historical keyword evidence (not traffic to ExactUnit)
Evidence source: the user-provided 2026-10-31 Semrush US competitor export, `research/semrush-us-600.tsv`. These metrics apply to **convert-units.info**, not this site's GSC, and are not independently refreshed US Google organic metrics.

| Existing intent / route | Competitor US volume estimate | KD | Competitor ranking | Estimated keyword traffic to competitor | Context |
| --- | ---: | ---: | ---: | ---: | --- |
| `17.7 inches to cm` · `/convert/in-to-cm/17.7/` | 880 | 23 | 6 | 21 | 17.7 in = 44.958 cm, direct exact intent |
| `8849 meters to feet` · `/convert/m-to-ft/8849/` | 260 | 13 | 3 | 11 | Meters/feet direction |
| `330kmh to mph` · `/convert/kmh-to-mph/330/` | 1,000 | 21 | 10 | 13 | High-speed km/h→mph |
| `400 pound feet to nm` · `/convert/ft-lbf-to-nm/400/` | 480 | 29 | 1 | 119 | Torque, not pound-mass |

Do not sum search volume for aliases or infer anything about actual Google clicks, AdSense RPM or new domain ranking. Generic canonical direction keyword US volumes and KD remain **unverified**. Four examples above already belong to the 15 reviewed numeric pilot candidates; this work does not change their index permissions.

## Independently visible public competitor functions (checked November 2, 2026)
- Length: [InchesCm — 17.7 inches](https://inchescm.com/convert-17.7-inches-to-cm) provides a calculated answer, nearby values and a fraction-free table; [Urwa Tools — 17.7](https://www.urwatools.com/inches-to-cm/17.7) also offers same-value multiple units. A different unit-context explanation is useful, but generic nearby numerical tables are not a differentiator.
- Speed: [UUTOOLS speed converter](https://www.uutools.net/en/unit-converters/speed-converter) presents km/h, mph, m/s and knots together, and [Convert-Top 330 km/h](https://convert-top.com/velocity-speed/kilometers-per-hour/km-h-to-mph/330/) provides the direct 330 result. Cross-unit results already exist in the ExactUnit all-units table; more numeric URLs would duplicate rather than deepen the product.
- Torque: [ThousandTools pound-foot to N·m](https://www.thousandtools.com/unit-converters/torque/pound-foot-to-newton-meter/), [TireSizeDB torque converter](https://tiresizedb.com/tools/torque-converter/) and [Quaestio converter](https://quaestio.app/en/units/torque/pound-feet-to-newton-meters/) display **in-lbf** and **kgf-m** equivalents, which were missing from the ExactUnit unit picker.
- Google content guidance: [Google Search Central people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) emphasizes actual primary content usefulness; a large count of same-template numeric result URLs is not automatically beneficial.

**Caveat:** These are observed public web pages, not an exhaustive US-localized neutral SERP and not evidence of their current Semrush traffic or ExactUnit positions.

## Implemented into existing 9 canonical direction pages
1. **Length (5 directions):** crawlable fractional ruler-inch table of 1/16, 1/8, 1/4, 1/2 and 1 international inch in mm and cm, calculated directly with the same exact inch coefficient. Examples show how a fraction differs from its decimal-looking label. No numeric routes.
2. **Speed (2 directions):** single worked **60 mph** cross-unit reference, km/h, m/s and kn from the existing deterministic engine; no Mach-as-constant because Mach requires a speed-of-sound condition. The existing converter and interactive five-unit table remain primary.
3. **Torque (2 directions):** add `in-lbf` and `kgf-m` as **real convertible units** (factor one-twelfth ft·lbf and 9.80665 N·m respectively) to the existing browser/live tool and batch/unit search; the visible multi-unit table now gives the alternative torque outputs live. An independently pre-rendered 100 ft·lbf reference compares N·m, in·lbf and kgf·m. Mark this as units only, not a tightening recommendation.

The new static table sections reuse existing CSS, and the conversion unit factors are shared with the browser and build: no new server, paid API, animation, indexed route or separate calculation function.

## Tests / release gates
- Added `tests/engineering-reference.test.mjs`: exact inch and defined torque checks; 4 torque units and dimension separation; 3 crawlable reference types; original 38 directions, 92 numeric pages, 15 pilot + 77 noindex unchanged.
- Strengthened `scripts/seo-content-audit.mjs` to reject missing or irrelevant engineering reference tables, including exact 1/16 in, 60 mph, and 100 ft·lbf examples.
- Existing `npm run build`, 157-route crawl/SEO gate, Chrome smoke, Lighthouse, compression budgets, synthetic-production/preview policy, and live Cloudflare commit-SHA gate must still pass before merging.
- `*.pages.dev` stays in full-site `noindex` preview mode with no canonical or sitemap. No actual GSC indexing, keyword ranking, click growth, actual-user CWV or ad revenue has been measured.

## Outstanding evidence before a future real domain
Collect independent US SERP observations for **generic tool-direction** keywords, together with actual US keyword Volume, KD and competing pages; decide whether extending a **tool** benefits users, not whether a new numeric URL can be manufactured. Once a real domain is eventually launched under the separate 3-variable explicit approval gate, use GSC query/page data to evaluate 15 candidates, rather than assuming performance from a passing CI.
