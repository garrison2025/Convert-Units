# V50 — Approved long-tail functionality without mass-generated SEO pages (2026-11-04)

## Scope of this implementation

### Missing conversion functionality — now in the existing universal converter

| Historical query | Source export row / Volume US / KD | Engineering implementation | Validated reference |
| --- | --- | --- | --- |
| `hpa to mmhg` | rows 45, 322 / 320 / 4 | `hpa` 100 Pa (exact); `mmhg` conventional reference factor **133.3224 Pa per mmHg (rounded reference)**; two-way, browser and mixed-unit CSV | [NIST SP 811 B.8](https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8). This is **not an exact equivalence for a measured mercury column**, nor the Torr convention. |
| `cubic mm to ml` | rows 107, 201 / 320 / 11 | `mm3` cubic millimeters: 1 mm³ = 0.001 mL (exact), two-way, browser and CSV | [NIST SI Units Volume](https://www.nist.gov/pml/owm/si-units-volume) |
| `how many gigabits are in a gigabyte` | row 53 (also other occurrences) / 480 / 30 | `gbit` for Gb: 1 GB = 8 Gb, 1 Gb = 125 MB; `GB` and `Gb` distinct case-sensitive symbols | [IEC 80000-13 public overview](https://webstore.iec.ch/en/publication/87379) |

The existing 16 physical categories and 38 primary directional tools remain unchanged. The unit selector in universal calculator and browser-local CSV can now handle each direction. Relevant pressure, volume, and storage category hubs show a readable definition, computed numerical example, direct input-preserving link and authoritative URL.

### Query-intent coverage on EXISTING converter pages

Only approved original 600-row competitor observations are used. The examples appear as helpful explanations in existing tool pages rather than additional indexable numeric URLs.

| Existing page | Query and export row | Interpretation |
| --- | --- | --- |
| `lbs-to-kg` | `24 pounds to kg`, row 6 (US Vol 1,900, KD 8) | **Competitor source URL contains 0.24**, not 24; calculated 24 lb on this site, not false SERP proof |
| `kg-to-lbs` | `3.7 kilos to pounds`, row 5 (2,900, KD 23) | Original ranking URL has pound source (unit mismatch); calculation uses 3.7 kg |
| `m-to-ft` | `1.85m to feet`, row 8 (3,600, KD 13) | Source URL is **1.852 meters**, not 1.85; calculate exact user input |
| `oz-to-g` | `3.5oz to grams`, row 26 (2,400, KD 50) | Competitor URL is 3.5 mass ounce; not a low-KD keyword |
| `bar-to-psi` | `2.35 bar`, row 2 (2,400, KD 20) | General pressure query, not a unique target-unit URL |
| `us-fl-oz-to-ml` | `how much is a fluid ounce`, row 14 (1,300, KD 43) | Answer one **US** fluid ounce; differentiate UK volume and mass ounce |
| `gb-to-mb` | `how many gigabits are in a gigabyte`, row 53 (480, KD 30) | Distinguish bytes versus bits as a specific definition rather than a fabricated numeric landing page |
| `ml-to-us-fl-oz` | `225ml to oz`, row 80 (390, KD 26) | Need explicit US fluid-ounce interpretation, not weight ounces |

Category `density` now includes a concise **conditional** conversion explanation: volume in mL cannot be converted to mg without the material density in mg/mL. An illustrative known density is clearly identified as hypothetical; no universal prescription/drug assumption.

### Indexing and cost guarantees

- **No new indexable conversion URL.** Owner-approved **156** canonical URLs and all **92** source-reviewed numerical result pages remain intact.
- **No blanket noindex**: the existing public apex indexing policy remains owner-authorized; preview Pages.dev still blocked.
- **No keyword cannibalization by introducing more similar pound-value articles.** Fifty-five previously unbuilt distinct pound/kg values remain unbuilt.
- **No fake Semrush metrics**: historical Volume/KD are from the competitor export; no claims about this site's own impressions, Google AI citation or rank.
- **No paid API, external conversion service, database, cron, or third-party JS.**
- Static HTML for sourced question sections remains crawlable even without JavaScript.
- Unit-source caveat: NIST's conventional mmHg decimal factor is rounded; do not present it as an exact SI definition. Compare existing code and tests before adjusting the mathematical convention.

### Reproducibility

`tests/extended-unit-keywords.test.mjs` checks numeric inverse conversion, bit/byte case distinctions, original sample row matches, source URLs and HTML output. The existing build's content audit independently ensures all new evidence sections are emitted to the expected static URLs.
