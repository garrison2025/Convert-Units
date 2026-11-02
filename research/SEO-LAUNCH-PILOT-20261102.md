# Convert-Units — SEO launch gate and keyword-led pilot

Updated 2026-11-02. Repository: `garrison2025/Convert-Units`. Official domain **not purchased**.

## Grounded decision

- All **38 dedicated calculators** are indexable in a confirmed production-domain build (37 V2 planned + the missing `seconds-to-hours` parent to an already approved numeric page).
- All **92 source-backed numeric results** remain generated and usable. Exactly **26** are in the first production sitemap; **66** default to `noindex,follow`, have no self-canonical tag and are omitted from the sitemap.
- This is a **conservative experimental indexing configuration**, not a claim that Google has evaluated or approved any page. An editorial decision and real US SERP verification are still required before a domain launch.
- `NUMERIC_INDEX_MODE=curated` is the default. `NUMERIC_INDEX_MODE=all` exists only for a consciously approved later experiment. It should not be enabled simply to increase indexed URL count.
- The temporary `*.pages.dev` deployment remains `noindex`; host-specific `_headers` rules also protect Pages aliases and preview subdomains when the official domain becomes active.

## Pilot logic

The policy is an **explicit, reviewable allowlist**, not an unbounded URL-generation rule. Within the two highest-duplication mass clusters, four pages per direction were selected using the original competitor estimated traffic ordering. Within four-value clusters, the top two were selected; the two-value and singleton directions were retained. Results: **8 mass pages, 18 other numeric pages, 26 in total**.

The selection prioritizes observable third-party search evidence and reduces near-identical mass pages from 70 candidates to 8 in the initial sitemap. **It does not establish incremental clicks, zero-click probability, ranking difficulty, or AdSense approval**. Change the list only after individual SERP and intent review.

## Initial selected keywords — source evidence

All volume, KD, position and estimated traffic below are **Semrush historical competitor US observations**, not ExactUnit traffic and not independent current Google SERP measurements.

| Original query | US search volume (estimate) | KD | Competitor rank | Competitor traffic estimate |
|---|---:|---:|---:|---:|
| [240 kg to lbs](/convert/kg-to-lbs/240/) | 8,100 | 16 | 2 | 526 |
| [126 pounds in kg](/convert/lbs-to-kg/126/) | 5,400 | 20 | 5 | 162 |
| [149 lbs to kg](/convert/lbs-to-kg/149/) | 5,400 | 13 | 6 | 129 |
| [400 pound feet to nm](/convert/ft-lbf-to-nm/400/) | 480 | 29 | 1 | 119 |
| [117 pounds to kg](/convert/lbs-to-kg/117/) | 2,400 | 19 | 4 | 84 |
| [37.9 celsius to fahrenheit](/convert/celsius-to-fahrenheit/37.9/) | 5,400 | 27 | 10 | 70 |
| [140 lb to kg](/convert/lbs-to-kg/140/) | 9,900 | 30 | 11 | 69 |
| [10000 minutes to hours](/convert/minutes-to-hours/10000/) | 2,400 | 21 | 9 | 52 |
| [56.9 kg to lbs](/convert/kg-to-lbs/56.9/) | 1,000 | 13 | 5 | 30 |
| [51.9 kg to lbs](/convert/kg-to-lbs/51.9/) | 880 | 15 | 5 | 26 |
| [950 kg to lbs](/convert/kg-to-lbs/950/) | 590 | 14 | 3 | 25 |
| [3600000ms to min](/convert/milliseconds-to-minutes/3600000/) | 390 | 23 | 2 | 25 |
| [50kpa to atm](/convert/kpa-to-atm/50/) | 1,900 | 12 | 10 | 24 |
| [17.7 inches to cm](/convert/in-to-cm/17.7/) | 880 | 23 | 6 | 21 |
| [6000 seconds to minutes](/convert/seconds-to-minutes/6000/) | 880 | 20 | 7 | 21 |
| [36.6 celsius to f](/convert/celsius-to-fahrenheit/36.6/) | 6,600 | 21 | 18 | 19 |
| [108 kpa to psi](/convert/kpa-to-psi/108/) | 1,000 | 29 | 9 | 19 |
| [60000 ms to seconds](/convert/milliseconds-to-seconds/60000/) | 880 | 24 | 8 | 19 |
| [30000 milliseconds to seconds](/convert/milliseconds-to-seconds/30000/) | 590 | 25 | 5 | 17 |
| [355 ml to fluid ounces](/convert/ml-to-us-fl-oz/355/) | 720 | 20 | 6 | 17 |
| [300000 milliseconds to minutes](/convert/milliseconds-to-minutes/300000/) | 480 | 21 | 5 | 16 |
| [330kmh to mph](/convert/kmh-to-mph/330/) | 1,000 | 21 | 10 | 13 |
| [6000 minutes to hours](/convert/minutes-to-hours/6000/) | 1,000 | 23 | 10 | 13 |
| [14400 seconds to hours](/convert/seconds-to-hours/14400/) | 1,000 | 19 | 10 | 13 |
| [8849 meters to feet](/convert/m-to-ft/8849/) | 260 | 13 | 3 | 11 |
| [14400 seconds to minutes](/convert/seconds-to-minutes/14400/) | 390 | 19 | 6 | 9 |

Selected rows total: **26**. All rows' `rank` fields are positive in source. A separate original source row for `1.8 kilograms in pounds` had competitor rank 0 and is *not* in the pilot.

Source of truth for URL inclusion: `src/data/numeric-seo-policy.json`; raw keyword records: `src/data/seeds.json` and `research/semrush-us-600.tsv`; full 92-row export from each build: `dist/keyword-evidence-review.csv`.

## Technical SEO release gates

1. In preview mode, every HTML page reports `noindex`, no canonical/OG URL, and an empty sitemap.
2. In a synthetic official-domain build, eligible pages report `index,follow` and self-canonical absolute HTTPS URLs; 66 excluded numeric pages report `noindex,follow` without a self-canonical.
3. Sitemap includes only those canonical URLs eligible for search, not preview hosts, the 404 page, non-selected numeric pages, or URL-filter permutations.
4. Each numeric result's title and H1 use its original supported keyword and contain the correct pre-rendered conversion answer, while the direction tool retains its own informational intent.
5. The once-missing `/convert/seconds-to-hours/` parent is linked to and from `/convert/seconds-to-hours/14400/`, with valid breadcrumb hierarchy.
6. Both `https://:project.pages.dev/*` and `https://:version.:project.pages.dev/*` emit an `X-Robots-Tag: noindex` via Cloudflare Pages `_headers`, including after a custom-domain deployment.
7. Structured data uses only real `WebSite`, `WebPage`, `BreadcrumbList` and free `WebApplication` facts. No invented reviews, ratings or FAQ rich-result claims.
8. `npm run check` and the existing Chromium smoke suite must pass before release. The built quality reports are uploaded to CI artifacts; passing tests **never** guarantee indexing or traffic.

## External evidence still required

Before publishing and submitting a sitemap, manually check desktop + mobile Google US top ten for a sample spanning high-demand pounds/kg values, temperature, units requiring US/Imperial distinctions and time/batch intent. Record Google instant-answer placement, result-domain diversity, target page type and Google-selected canonical after release. For the larger risk cluster, prioritize `240 kg to lbs`, `126 pounds in kg`, `149 lbs to kg`, `117 pounds to kg`, `37.9 celsius to fahrenheit`, `14400 seconds to hours` and the independent phrase `batch unit converter CSV` (the last phrase is **not verified by the existing dataset**, so it is a research query only).

After custom-domain launch, observe GSC impressions, US clicks, query → URL pairs, CTR, indexation exclusions and Google-chosen canonical at days 30/60/90, then decide which of the initial 26 numeric URLs to retain or consolidate. Ad revenue depends on observed pageviews and Page RPM, not competitor keyword volume.

Google official references:
- Canonicals: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Sitemap URL inclusion: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Quality and scaled content: https://developers.google.com/search/docs/essentials/spam-policies
- Titles: https://developers.google.com/search/docs/appearance/title-link
- Cloudflare Pages host-specific robots headers: https://developers.cloudflare.com/pages/configuration/headers/
- Google Search Console indexing: https://support.google.com/webmasters/answer/7440203

## Similarity result after the pilot — still unresolved

Verified by GitHub Actions run 41372934999: across all 92 numeric pages the token-normalized similarity alert remains **1,646/1,646** comparable same-direction pairs, while among the **26 index-eligible pilot numeric pages**, it flags **17/17** comparable same-direction pairs at the 0.95 threshold. The metric normalizes numeric values and is sensitive to shared templates; it is not Google's own duplicate-content measure. Nevertheless, these results are a material editorial risk. Reducing sitemap volume does **not** itself create independently useful content. Leave the pilot conservative until real US SERP and content usefulness review; consolidate page groups when a pair-tool page sufficiently satisfies the same search intent. Do not invent unique prose merely to lower similarity.

## Adjacent information-intent opportunities found in the same 600-row source

The competitor keyword appendix also includes terms for which a direct numeric answer without more context would be misleading. These are **research leads, not approved landing pages or verified organic traffic for ExactUnit**:

| Observed competitor query | US volume estimate | KD | Competitor traffic estimate | User problem |
|---|---:|---:|---:|---|
| how to convert ml to mg | 210 | 2 | 27 | A volume-to-mass calculation requires the material's density |
| how many ml in kilogram | 480 | 27 | 63 | Different materials yield different volumes for the same mass |
| gram and milliliter conversion | 480 | 33 | 63 | A conditional mass/volume conversion needs density |
| hpa to mmhg | 320 | 4 | 42 | A direct pressure conversion with possible immediate-answer competition |

These values come from the original competitor TSV (one observed row per example); they are not forecasts or US Google top-ten verification. The first three queries suggest one coherent, density-aware information need rather than three independently justified SEO pages. **Do not publish a generic `kg to mL` or `mL to mg` numerical answer without a density input.** If future US SERP research confirms sufficiently independent click intent, a density-aware calculator and a well-sourced explanation may provide more value than another mass number page. No extra tool was added in this optimization pass.
