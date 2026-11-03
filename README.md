# ConvertUnits.cc — free unit converter

Production-ready, zero-dependency static website created for the [Convert-Units](https://github.com/garrison2025/Convert-Units) project according to the user-approved V2.0 build plan.

## V50 unbuilt keyword coverage & missing free units (2026-11-04)

Three previously absent conversion choices (hPa ↔ conventional mmHg, mm³ ↔ mL, GB ↔ Gb) are now supported by the existing universal converter and browser-local CSV. Eight research-backed, computed keyword examples are rendered on existing tool directions; pressure, volume and storage hubs show direct conversion links and primary-source references, while density explains why mL ↔ mg requires a material-specific density. Source mismatch and target ambiguity remain explicit. All existing 38 tools, 16 categories, 92 numeric answer pages and 156 indexable official URLs remain unchanged. No paid API or new low-value SEO routes. See `research/V50-LONGTAIL-UNIT-GAPS-20261104.md` and regression tests.

## V49 verifiable GEO and directory-led outreach (2026-11-03)

38 existing direction converters now expose reproducible source/target factor traces and standards links. All 16 category hubs provide distinct tool-choice guidance rather than a repeated generic CTA, and the optional `llms.txt` is generated from the live converter and category registries. See `research/V49-GEO-VERIFICATION-REPORT.md`. Legitimate external citation opportunities and disqualifications are documented in `research/V49-THIRD-PARTY-CITATION-OUTREACH.md`; **no third-party placement is falsely claimed**.

## V45 code-level SEO integrity (2026-11-03)

Owner-approved search indexation remains fully enabled for **156 genuine site pages**, including **92 numeric answer pages**. Nothing in this release reintroduces `noindex` on these official apex routes.

- **Numeric answer internal linking:** `src/seo-related-values.mjs` finds up to four closest *existing* values in the same conversion direction. Its HTML links show answers computed by the site's own engine, not keyword volume guesses. No extra generated pages, 404 targets, paid API, client-side JS or stylesheet changes. Existing responsive chip styles are reused.
- **Tested for all 92 seeds:** `tests/seo-related-values.test.mjs` checks deterministic neighbor selection, unit direction, unique actual URLs, conversion precision and round-off symbols. The static SEO audit verifies the emitted answer text and links in each crawlable HTML page.
- **Consistent semantic JSON-LD graph:** 38 dedicated converters plus universal and batch tools identify the actual WebApplication by stable `#application` IDs, linking to their `WebPage` (`#webpage`) and the public WebSite (`/#website`). All WebPage entities explicitly use `inLanguage: en`. No fictitious `FAQPage`, testimonials, authorship or review stars. The SEO audit cross-checks the linked IDs, exact canonical, and visible meta fields.
- **Cross-platform previews:** `og:locale=en_US`, `twitter:card=summary`, and factual Twitter title/description fields now match each page's unique HTML metadata. No fake image assets, engagement metrics or promises of SEO benefit. The audit rejects divergence.
- **Unchanged search safety:** `https://convertunits.cc/sitemap.xml` lists 156 canonical apex pages, all 92 numeric pages are `index,follow`; only 404 and duplicate Pages mirror/preview hosts remain excluded.
- **Do not fake sitemap dates:** Google ignores fabricated `<lastmod>` updates, so the site intentionally does not stamp every URL with the build date. Add per-page dates only when reliable content-edit history exists. For search performance, use verified Search Console data, not lab SEO-score claims.

## V44 official Google search launch — complete (2026-11-03)

**Current and authoritative.** Supersedes the older V41–V43 preparation and tentative numeric-review instructions below, which are retained only as development history.

- **Owner's latest explicit instruction:** open ALL valid pages of the purchased `convertunits.cc` website to search indexing. Source approval: `src/data/official-domain-launch.json` (`ownerApprovedPublicIndex: true`, `numericIndexApproval: true`).
- **Actually deployed:** `https://convertunits.cc/build-info.json` shows `mode=production`, `site=https://convertunits.cc`, `indexablePages=156`, `numericIndexablePages=92`. The 38 converter tools, 16 category pages, 92 numerical result pages and 10 other valid pages share the same official origin.
- **All 156 real pages:** `<meta name="robots" content="index,follow">`, correct per-page self-canonical, matching `og:url`, and URL placement in `https://convertunits.cc/sitemap.xml`. `robots.txt` includes `Allow: /` and a pointer to the official sitemap. The site is HTML-rendered at build time, not dependent on client-side execution for the content/metadata.
- **404 excluded by design:** A missing page must keep HTTP 404, and its fallback page has `noindex`. This is not holding back any genuine content URL.
- **Only duplicate hosts remain protected:** `convert-units-bwa.pages.dev` and preview branch URLs are not separate websites to index. Their `X-Robots-Tag: noindex` host-specific Cloudflare Pages response-header rule avoids sending duplicate URL signals to Google. The primary apex domain is freely indexable. An optional stronger solution is a 301 Bulk Redirect from Pages.dev to apex per [Cloudflare documentation](https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/).
- **Live Schema:** HTML contains truthful WebPage, WebSite, Organization (name/site/contact), BreadcrumbList and eligible WebApplication JSON-LD from the actual site identity. No invented individual author, review score, fake AI citations or claim of Google rich result entitlement.
- **Optional LLM directory:** `https://convertunits.cc/llms.txt` is available, but **Google does not require or officially use this file for AI Overviews/AI Mode rankings**.
- **Validation:** GitHub Actions repeats a production-origin rehearsal (all 156 URLs, 92 numeric pages), 404 exclusion, preview protection, 157 static HTML checks, real Chromium tests and Lighthouse lab performance checks. Live `scripts/official-domain-seo-audit.mjs` separately checks the deployed apex.
- **Google indexing still not guaranteed:** 156 URLs are technically eligible for discovery/indexing, not 156 Google-indexed pages. Add the verified `convertunits.cc` Domain property in [Google Search Console](https://search.google.com/search-console), submit `https://convertunits.cc/sitemap.xml`, and inspect Coverage/Pages and individual example URLs after Google crawls.
- **No secret or paid integrations:** no external AI API, no automated ads, no requirement to revisit old numeric approval controls, and no user email delivery test.


## Official domain and contact — confirmed 2026-11-03

- **Official apex:** [https://convertunits.cc](https://convertunits.cc). Owner confirmed purchase and Cloudflare zone connection; verified the hostname already serves the existing Cloudflare Pages project and shares its `build-info.json` commit with `convert-units-bwa.pages.dev`.
- **Brand:** `ConvertUnits.cc` (formerly the temporary `ExactUnit` developer label). Brand text, titles, Open Graph and future WebSite structured data are generated from the new identity.
- **Contact:** `contact@convertunits.cc`, linked in the footer, contact and privacy pages. Public DNS resolves Cloudflare email-routing MX and SPF records. **MX records do not prove the specific inbox destination or outbound email works**; manually test a real incoming message and reply.
- **WWW:** `www.convertunits.cc` was not resolving in a public DNS check at the time of verification. The canonical hostname choice is the apex `https://convertunits.cc`. Add a DNS-proxied www alias and a permanent 301 redirect preserving paths and queries if a www variant is desired.
- **Search release is NOT implied:** the domain is visible but remained `noindex,follow` at the 2026-11-03 verification. Domain purchase or adding `SITE_URL=https://convertunits.cc` alone **never** turns on Google indexing.
- **Cloudflare Pages configuration when ready:** under the *existing* Pages project `convert-units-bwa`, set `SITE_URL=https://convertunits.cc` (Production environment) to record the official origin. Only after the owner's **separate, explicit** approval of search launch, additionally set `SEO_PUBLIC_HOST=convertunits.cc` and `SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING`. Do not set those two approval variables until authorized. The independent numeric URL release gate remains in force (77 held pages plus 15 candidates requiring specific review/approval).
- Do not create a second Pages project, change app code to use paid APIs, or auto-enable AdSense/GSC. Historical sections below were written before the domain was purchased and are retained as a development record.



## V43 GEO / AI-grounding improvement (2026-11-03)

This release improves factual retrieval and ordinary human usability for generative search systems. It **does not** pretend that a special file, schema markup or an invented score guarantees AI citations.

- **Primary-source-backed conversions:** `src/standards-reference.mjs` renders a 16-category standards table into the EXISTING `/methodology/#verified-conversion-facts` page. Each reference is calculated from `src/assets/engine.mjs`; it includes a real converter link, a unit-convention note, and a link to the NIST / BIPM / IEC definition resource. NIST publishes abbreviated printed factors for some units; the website distinguishes displayed rounded results from the defining factor.
- **Useful distinctions:** U.S. vs U.K. fluid-ounce sizes, mass lb vs force lbf, decimal GB vs binary GiB, absolute temperature offsets, SI rounding and measurement tolerance. The method page explicitly states that standards sources **have not independently audited or certified the website**.
- **Crawlable HTML:** all 38 directional tools and 16 measurement category pages link directly to the same standards reference fragment. No JavaScript is needed to read facts or follow the links. The existing SEO release gate still governs canonical URLs and indexation.
- **Quality gates:** `tests/standards-reference.test.mjs` checks 16 distinct real directions, calculation values, primary sources and disambiguation. `scripts/seo-content-audit.mjs` tests server-rendered link/source consistency. Headless Chromium checks visible source rows, safe external references and responsive widths of 320–1024 px; visual QA captures deep-linked desktop and mobile standard tables.
- **What this does not do:** no unproven `llms.txt` visibility claims, `FAQPage` rich-result spam, fictitious authors, fake reviews, AI-only thin pages, paid AI/API integrations, extra SEO routes or expanded numeric indexing approval.
- **Crucial release boundary:** Live `https://convertunits.cc` remains `noindex` until separately approved in the existing Cloudflare Pages production environment. Google says a supporting AI Overviews / AI Mode link must first be indexable and eligible for a normal Google Search snippet; a passing technical audit does **not** guarantee citations.
- References: [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features), [Google's guide to optimizing for generative AI](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), and [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

## V42: evidence-based homepage and pounds/kg SEO (2026-11-03)

- **Seven helpful homepage references** are rendered into the initial static HTML from `src/home-reference.mjs` using the same tested conversion engine as the live calculator. Each row identifies the starting quantity, answer, exact (`=`) or displayed approximate (`≈`) relationship, and a working internal link to its matching tool. The table covers pounds/kilograms, inches/centimeters, US volume, Celsius and time. No new URLs, made-up keywords, traffic claims or third-party API.
- **Clear factual differentiation:** the table explains that US fluid ounces are a volume measure, unlike mass ounces, and that Celsius conversion has an offset; links users to authoritative unit-definition references through the existing methodology page.
- **Two already-supported weight directions** have natural search-language aliases in their SEO titles and meta descriptions: `Pounds to Kilograms Converter (lbs to kg)` and `Kilograms to Pounds Converter (kg to lbs)`. Both explain why `lb` and informal plural `lbs` occur. This reflects the user-provided Semrush **numbered** query examples and their search phrasing; it does **not** assign those numeric volumes or KD values to generic unnumbered phrases.
- **Automated verification:** `tests/home-reference.test.mjs` checks every computed answer, exactness/rounding indicator and target route; SEO title tests protect other directions, while `scripts/seo-content-audit.mjs` enforces crawlable links, server-rendered fact rows, methodology references and proper weight notation.
- **Release control:** official apex is `https://convertunits.cc`, but production search indexing is still gated by the owner's explicit approval variables; 92 numeric pages are still individually withheld. Google indexing, rankings, CTR and traffic cannot be inferred from CI success.

## V41 Google SEO: actual-domain rehearsal and publication checklist (2026-11-03)

The live apex `https://convertunits.cc` is connected to the existing Cloudflare Pages project and currently resolves in **preview / noindex** mode. Its ownership and hosting are not in doubt; Google's permission to index is a **separate decision**.

Completed in code:
- The publication gate in `src/seo-launch-policy.mjs` now accepts public SEO approval **only** for `convertunits.cc` (not `www`, `qa.example.test`, typo hosts or any `pages.dev` mirror). Branch previews never publish.
- GitHub CI performs a real-apex **local-only** production rehearsal. With controlled test variables, it builds 64 canonical/indexable site and tool URLs, excludes all 92 numeric pages pending independent specific approval, and verifies the sitemap and internal crawl links. This rehearsal is not deployed as the site's production build.
- Homepage `WebSite` JSON-LD includes `name: ConvertUnits.cc` and honest `alternateName: ConvertUnits` when publication is allowed. Do not fabricate reviews or add FAQ rich-result markup for a generic utility site.
- `scripts/official-domain-seo-audit.mjs` now observes the real apex, its live `robots.txt`, `sitemap.xml`, the contact page, approved core tools, withheld numeric URL and the Pages mirror. The resulting read-only audit artifact distinguishes live noindex mode from locally rehearsed production.

**When the owner authorizes public search indexing**, configure **Production** environment variables under the existing Cloudflare Pages project (`convert-units-bwa` → Settings → Variables and Secrets). Exact values:
```dotenv
SITE_URL=https://convertunits.cc
SEO_PUBLIC_HOST=convertunits.cc
SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING
```
Do not add `SEO_NUMERIC_PUBLIC_HOST`, `SEO_NUMERIC_INDEX_APPROVED`, or `SEO_NUMERIC_APPROVED_URLS` without additional URL-specific approval. Do not enable advertising as a side effect. Trigger a new production deployment, then check:
1. `https://convertunits.cc/build-info.json` reports `mode=production`, `site=https://convertunits.cc`, `indexablePages=64`, and `numericIndexablePages=0`.
2. The homepage and core converter pages return `index,follow` and self-referencing canonical links on `https://convertunits.cc`; all 92 numeric pages remain `noindex` until separately approved.
3. `https://convertunits.cc/sitemap.xml` lists 64 real apex canonical URLs, no `pages.dev` URLs or withheld numbers. `robots.txt` advertises that sitemap.
4. The `convert-units-bwa.pages.dev` mirror remains protected by a **response-header** `X-Robots-Tag: noindex`. A Pages alias shares the same HTML, so this host-scoped header is essential.
5. Add `www.convertunits.cc` in Cloudflare only as an alias and configure a permanent apex redirect preserving path/query, rather than serving two independent canonical sites.

After those checks, add **Domain property** `convertunits.cc` in [Google Search Console](https://search.google.com/search-console) using its specific DNS TXT verification record, then submit `https://convertunits.cc/sitemap.xml` and inspect homepage plus the two mass-direction URLs. The owner must obtain the TXT verification token in GSC; none is included or invented by the app. Indexing and rankings are ultimately determined by Google, not by passing these technical checks.

Official technical references:
- [Google canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google sitemap requirements](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google site names](https://developers.google.com/search/docs/appearance/site-names)
- [Cloudflare Pages host-specific X-Robots-Tag](https://developers.cloudflare.com/pages/configuration/headers/)

## Delivered

- **38** direction-specific calculators and **one universal converter** spanning **16** measurement categories.
- **92** accurately prerendered numeric results, of which **15** are conditional official-domain index candidates and **77** remain `noindex`.
- **157** generated static page routes in total (38 tools plus 92 numeric pages, 16 categories and site pages; 79 are initial production-indexable candidates under the curated policy) (homepage, categories, tools, approved numeric pages, batch converter, and policy/methodology pages).
- Batch converter: on-device calculations for up to 1,000 rows, 1–20 selectable value columns, CSV/TSV/semicolon delimiter detection, per-line errors, local CSV/TXT files, **original input columns and recognized headers preserved in CSV export**, numeric machine-readable output, sanitized source cells and print. One fixed unit pair per batch or mixed source/target units specified by individual CSV columns.
- No account, database, backend, cron, third-party APIs, external fonts, or mandatory cookie scripts.
- Pure ECMAScript modules, vanilla CSS/JS and Node's native test runner; no dependency installation.
- Keyword evidence: `research/semrush-us-600.tsv` (original 600 rows), `research/KEYWORDS-600.xlsx` (planning workbook), and `research/SEO-PLAN-V2.md`.

### V36 closed-loop pre-domain quality pass (2026-11-03)

- **Actual code, not expansion:** exactly 15 existing source-backed numeric candidates now display category-appropriate, engine-calculated multi-unit checks. Examples: `240 kg` in pounds/ounces/grams; `400 ft·lbf` in N·m/in·lbf/kgf·m; `37.9 °C` as absolute F/K plus separately derived temperature *interval*; `10,000 minutes` as days/hours/minutes; `355 mL` distinguishes US and UK fluid ounces. The other **77** numeric pages remain useful but do not receive invented keyword-focused content. `src/numeric-insight.mjs` uses no API and creates no routes.
- **Editorial decisions are explicit, not a release approval:** `research/NUMERIC-PRELAUNCH-DECISIONS-V36-20261103.json` records 15 source queries, 6 cases where independent competitor feature parity favors the existing parent direction tool, and 9 more that still lack independently proven unique value. All are held until a later explicit release; the preview remains sitewide `noindex`.
- **38 keyword directions fully source reconciled:** `scripts/prelaunch-editorial-audit.mjs` checks V32's original 38-row matrix against real 92 seeds and 15 strict evidenced directions. It *never* calls historical numeric keyword Volume/KD the generic tool's Volume/KD. Detailed editorial decisions and caveats: [V36 review](research/SEO-PRELAUNCH-V36-FINAL-REVIEW-20261103.md).
- **UI and QA:** desktop/phone insight cards, high-contrast unit values and 320/375px responsive checks; `tests/numeric-insight.test.mjs`, the static SEO audit, new prelaunch audit, and Chrome smoke scenarios prevent missing/incorrect content, unsuitable numeric links, route proliferation, and unsafe indexing. Each `npm run build` produces private reports only in `qa-reports/`.
- **Deliberately not done at user request:** ads/AdSense, real domain purchase/connection, GSC/real ranking checks, or any opening of indexing. No GitHub/CDN configuration changes.

### V35 source-backed title and homepage navigation pass (2026-11-03)

- Preserves **38** source-accurate directional tools and their H1 headings. On **nine** verbose titles only, eliminates repeated unit wording while retaining direction, unit symbols and the `ExactUnit` suffix. This is editorial concision, **not** a claim that Google imposes a 60-character title limit. Source: `src/seo-meta.mjs`; guard: `tests/seo-direction-titles.test.mjs`.
- Homepage's six existing tool cards now link to `kg-to-lbs`, `lbs-to-kg`, `ft-lbf-to-nm`, `celsius-to-fahrenheit`, `minutes-to-hours`, and `ml-to-us-fl-oz`. The first five are supported by relatively strong **specific numeric keyword** competitor observations in existing V32 evidence; the sixth adds an important US fluid-volume direction. Do **not** represent their numeric query volumes as generic converter volumes.
- `scripts/core-page-quality-audit.mjs` asserts title metadata and all six intended homepage links. Search metadata descriptions, 38 H1s, 157 URLs, 92 numeric pages, conditional 15/77 numeric index policy, domain deferral and preview `noindex` remain unchanged.

### V33 on-page SEO (2026-11-03)

- **Implemented in existing tool pages:** `src/source-backed-examples.mjs` renders up to five exact-engine worked answers on 15 of the 38 main converter routes, using the 92 already reviewed US Semrush numeric seed inputs. The other 23 tools retain their own purpose-built explanations without unsourced examples.
- Two source-specific unit-standard Q&A blocks now explain **mechanical hp versus metric/electrical horsepower** on `/convert/kw-to-hp/`, and **pound-force versus mass pounds** on `/convert/kn-to-lbf/`.
- New Node tests: `tests/source-backed-examples.test.mjs`; `scripts/seo-content-audit.mjs` checks generated page examples in static HTML. Full report: `research/SEO-ONPAGE-IMPLEMENTATION-V33-20261103.md`.
- Existing 157 routes, zero-dependency architecture, 92 numeric pages, 15 conditional numeric pilots, deferred official domain and fail-closed Cloudflare preview `noindex` are unchanged. Live preview deployment must still be checked separately.

### Current US SEO research — V32 (2026-11-03)

- **Use the supplied Semrush data; no new export or subscription required:** `research/SEO-38-DIRECTION-PRIORITY-V32-20261103.md` is the latest SEO research entrypoint.
- Full row-level traceability: `research/SEMRUSH-162-STRICT-ROWS-BY-DIRECTION-V32-20261103.csv` maps all **162** V2 strictly validated ranking rows to **15** existing directions, **147** deduplicated numeric intents, **92** source-reconciled built numeric pages and **15** conditional numeric pilot URLs.
- Page-level research: `research/SEO-38-DIRECTION-RESEARCH-MATRIX-V32-20261103.csv` covers **38/38** directional tools. Some nonstrict historical queries help describe generic directional demand, but their old V2 rejection reasons remain intact for numeric-page SEO.
- **No deployment/index policy change:** the `*.pages.dev` preview remains `noindex`, the official domain is deferred, and the host-bound launch gates are untouched. Historical Semrush competitor estimates are not this website's traffic.


## Local build and tests

Requires Node 20+.

```sh
npm run check
```

The command runs conversion and batch CSV tests, static builds, link crawling, metadata uniqueness and numeric-page similarity reviews, plus a dependency-free resource-size budget gate. Only public site assets are generated into `dist/`; internal SEO audit CSV/JSON reports are moved into `qa-reports/` and uploaded to GitHub Actions artifacts. For local preview, serve `dist/` with any static HTTP server (do not open `index.html` via `file://` because ECMAScript modules require HTTP).

The site also includes an accessibility statement and runs preview plus synthetic-production SEO checks in CI. Numeric-page similarity warnings require editorial review; a passing build is not AdSense approval.

## Cloudflare Pages (Git integration)

- GitHub repository: `garrison2025/Convert-Units`
- Production branch: `main`
- Framework preset: `None`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22`
- **Build variable `SITE_URL`**: once a real custom domain is bound to Cloudflare Pages, enter its bare HTTPS origin. **SITE_URL alone never activates indexing.** Do not enter `*.pages.dev` as the official domain.
- Optional `ADSENSE_PUBLISHER_ID`: a valid `pub-` followed by 16 digits, after approved AdSense setup. Ads scripts are deliberately NOT auto-enabled; publisher must configure consent management, real ad units and privacy disclosures independently.

**Temporary preview mode:** If `SITE_URL` is absent, points to `*.pages.dev`, has not been explicitly approved for indexing, or Cloudflare builds a non-`main` branch, the site still works but emits `noindex`, omits canonical and OG URLs, and has an empty sitemap. The generated `robots.txt` lets crawlers see `noindex`.

**Official domain mode:** Only after connecting and verifying a genuine custom domain, set all three Cloudflare Pages **production** variables: `SITE_URL=https://your-real-domain.example`, `SEO_PUBLIC_HOST=your-real-domain.example` (exact matching hostname), and `SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING`. Only this explicit, host-bound approval on `main` activates canonicals, the 79-URL sitemap and indexable robots meta. An unapproved `SITE_URL` alone remains noindexed. Partial or mismatched approvals fail the build rather than exposing wrong canonicals. Then verify live headers and GSC, and use Cloudflare Bulk Redirects where appropriate to avoid duplicate Pages aliases.

Do not submit the temporary Pages subdomain or its preview sitemap to Google Search Console.

Cloudflare Pages will serve route folders' `index.html` on clean URLs. `robots.txt`, `sitemap.xml`, `_headers`, and `404.html` are generated at build time. The `dist/` folder is output only, not checked into source. Do not copy the nonpublic `qa-reports/` directory into Cloudflare's deployment output.

## Important boundaries

This source build and its automated tests have been verified locally. They do not prove a production Cloudflare deployment, a connected domain, Google indexing, AdSense approval, organic traffic, or ad revenue.

Publishing many similar numeric pages is not itself proof of usefulness. Keep user value and accuracy as the primary requirements. Keyword Volume/KD/rank are estimates of the competitor's October 31, 2026 results, **not forecasts** for this website. SEO canonical and sitemap eligibility are controlled by the conservative 15/77 numeric indexing policy, separate from the 92 approved functional numeric routes.

## Internal layout

- `src/assets/engine.mjs`: deterministic units and numerical conversions
- `src/assets/app.mjs`: interactive and CSV functionality
- `src/assets/site.css`: design system, responsive layouts, reduced-motion support
- `src/data/pairs.json`: 38 verified tool routes
- `src/data/seeds.json`: 92 approved numeric pages and keyword evidence
- `scripts/build.mjs`: build HTML, metadata, canonical, sitemap, robots, legal pages
- `scripts/audit.mjs`: static SEO integrity audit
- `scripts/release-audit.mjs`: all-page link graph, orphan, numeric result and canonical audit; JSON report retained privately in `qa-reports/release-audit-report.json` after `npm run build`\n- `scripts/deep-audit.mjs`: generated HTML link crawl and content similarity warnings; report retained privately at `qa-reports/quality-report.json` after `npm run build`
- `tests/conversion.test.mjs`: precision, dimensions, and page mapping tests
- `research/*`: full V2 plan and all uploaded keyword research data

This project is an independent implementation, not a copy of the competitor's site content or proprietary design.

## Content and performance quality gates (pre-domain)

- A passing build is not a guarantee of Google indexing, AdSense eligibility, visual accessibility, or Core Web Vitals.
- `npm run audit:performance` measures static CSS, JS and HTML asset sizes and writes `dist/performance-budget-report.json` when run standalone; `npm run build` archives it at `qa-reports/performance-budget-report.json`; its gzip figures are local estimates, not measured production transfer sizes.
- The 92 approved numeric pages include a useful pre-rendered result, interactive calculator, reference comparisons and display-precision table; their high template similarity still requires editorial review. See [`research/NUMERIC-SEO-QUALITY-REVIEW.md`](research/NUMERIC-SEO-QUALITY-REVIEW.md).
- In preview mode all pages remain `noindex`. Do **not** buy or connect a domain solely to clear CI checks; genuine real-browser checks can be run when an official domain is available.

## Local real-browser and evidence audits

The main-branch GitHub Actions workflow automatically builds the site, checks 33 Node tests, then launches local headless Chromium. The smoke suite checks real calculator inputs and errors, CSV parsing, reset, suggested tools, numeric reference interactions, and responsive horizontal overflow at 320, 375 and 768 CSS pixels. No custom domain is required for these checks. To run the browser smoke suite manually on a machine with Chrome installed, first run `npm run build`, then `node scripts/browser-smoke.mjs`.

Every CI run also produces the offline `dist/keyword-evidence-review.csv` and `dist/keyword-evidence-review.json` files from the approved V2 dataset. The GitHub Actions run has a 7-day `exactunit-quality-reports` download containing these files plus the build SEO/performance reports. A raw competitor rank of 0 is explicitly tagged as unverified. Do not mistake competitor estimates for this site's traffic or assume 92 similar pages are automatically useful/indexable.

Browser smoke checks are not measurements of live Cloudflare performance, Lighthouse scores, accessibility certification or Google indexing. The temporary `*.pages.dev` preview remains noindexed until a real domain is chosen.

## Curated search-index launch (before purchasing a domain)

The approved V2 research contains 37 originally planned tools and 92 keyword-specific results. A missing parent tool for the already-approved `seconds-to-hours/14400/` query has been added, so there are now **38 tools**. Source demand should not be confused with traffic to this site.

By default `NUMERIC_INDEX_MODE=curated`: all 92 numeric pages remain available, but only the **15 URLs explicitly listed in** `src/data/numeric-seo-policy.json` are eligible for `index,follow` and inclusion in production sitemap. The remaining 77 have `noindex,follow`, no self-canonical tag and no sitemap entry. This is a conservative pilot to reduce same-template exposure, **not a guarantee that selected pages will rank**. Do not set `NUMERIC_INDEX_MODE=all` without reviewing source intent, duplication and post-launch data. Preview builds remain globally noindexed regardless of this flag.

Google's source guidance on [canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and [scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies) informed the technical policy. A unique numeric result is not necessarily an independently valuable page. Once a genuine custom domain is connected and explicitly approved with the three-variable launch gate, check GSC index coverage and Search Performance by query/page, and revisit the pilot based on real clicks and usefulness.

**Current source-backed index policy:** [`research/SEO-PILOT-V3-20261102.md`](research/SEO-PILOT-V3-20261102.md) (15 values, 77 suppressed). The earlier 26-value experiment is retained only as historical decision context.

After binding a real domain, configure a Cloudflare Bulk Redirect from the default `*.pages.dev` production host to the official domain when practical. Until then the generated `_headers` blocks indexing on both Pages project aliases and preview hosts, including during synthetic-production builds. Cloudflare reference: https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/

## Google SEO content quality (2026-11-02)

Every **38** directional calculator page has a static, source-linked explanation of its measurement caveats, conversion factors, reverse direction when available and independently computed one- and ten-unit checks. All **16** category pages have a substantive measurement definition and verification note. The batch converter page documents the actual CSV workflow, ambiguity protection and current limitations. About and Methodology disclose how results are generated, tested and verified, without invented certification.

The zero-dependency `scripts/seo-content-audit.mjs` runs automatically on both preview and synthetic production builds and validates static HTML, expected content, original keyword phrasing, numeric answers and JSON-LD. The CI artifacts contain `seo-content-audit.json`. For reproducible external evidence and the *limitations* of public web search, see [competitor landing page spot-check](research/GOOGLE-SEO-SERP-SPOTCHECK-20261102.md).

No live Google US rankings, Googlebot indexing, GSC clicks, AdSense revenue or actual field Core Web Vitals are claimed. The 15 numeric pilot still needs individual usefulness review and source-confirmed search demand. Cloudflare preview remains `noindex` until an official domain has been configured.

## Crawl depth, search titles and safe indexing

The `scripts/seo-crawl-audit.mjs` gate tests actual static links, 3-click reachability from the homepage and inbound parent links to all 15 selected values. It exports `dist/seo-crawl-audit.json` and `dist/seo-url-inventory.csv` listing each page's title, H1, description, robots, canonical, click depth and proposed index status in GitHub Actions artifacts.

Source keywords remain unchanged in research data; human-readable SEO page titles and snippet copy come from `src/seo-meta.mjs`. Enabling `NUMERIC_INDEX_MODE=all` now also requires `NUMERIC_INDEX_CONFIRMATION=REVIEWED_ALL_92` after editorial review. This is only a safety mechanism, not a Google quality guarantee.

## 2026-11-02 V3 — one indexed numeric answer per direction

The active policy now selects only **15 representative numeric answers**, one per conversion direction, using original competitor keyword evidence and not invented traffic forecasts. The other **77** numeric answers remain functional but are not part of the future production sitemap. Total eligible production URLs under the default policy: **79**. Automated review prevents two values in the same direction from being indexed in the curated mode. See [active V3 SEO rollout document](research/SEO-PILOT-V3-20261102.md) for all 15 examples and the 11 formerly selected values now excluded. The 26/66/90 figures in earlier dated reports describe the previous experiment, not the active release configuration.

## CSV batch workflow and Google SEO research

The real batch converter at `/batch-converter/` keeps source columns, labels and valid/invalid lines when exporting, adds namespaced result, source unit, target unit and row status fields, and exports ungrouped numeric results for reuse in Excel/Google Sheets. Uploaded CSV/TXT files and pasted rows stay inside the browser; no account or API is needed. Delimiters are comma, tab or semicolon, with optional manual selection; use either one selected pair for the whole batch **or** choose separate source/target unit columns for each row. Supported per-row labels include exact unit IDs and symbols such as `lb`, `kg`, `°C`, `°F`, `ms` and `s`; incompatible pairs produce explicit row errors. A runnable mixed-unit sample is built into the page. Arbitrary decimal-comma parsing is not currently supported; properly quoted CSV and TSV fields may contain embedded line breaks. Error rows retain their source values and line numbers.

See [the public competitor SERP and batch-workflow review](research/SEO-SERP-WORKFLOW-REVIEW-20261102.md). This is a **source-based public-page spot-check**, not a fixed-region Google US top-ten audit or verified search demand forecast. The 15 indexable numeric candidates / 77 suppressed numeric URLs and 79 production-sitemap candidates are **unchanged** by this feature release.

## CSV unit-label safety and keyword evidence (2026-11-02)

Mixed-row batches now reject ambiguous physical unit tokens instead of selecting the first internal ID. Specifically, `kn` overlaps the **knot** speed symbol and the legacy internal ID for **kilonewtons** (force). Write `knot` when the source is speed or the case-sensitive SI symbol `kN` for kilonewtons. An ambiguous or unknown unit generates a row-level error while other rows continue converting. The exported failed row retains the exact raw label; it is **not** silently rewritten as a different unit. Automated tests check every currently declared ID, symbol and name for silent collisions, plus a real Chromium mixed-CSV scenario.

The public [batch search and competitor evidence report](research/SEO-SERP-WORKFLOW-REVIEW-20261102.md) lists discoverable competitor tools but **does not** establish actual natural-ranking keywords, volume, KD, or organic visits for ExactUnit's CSV feature. The existing 600-keyword source export has no `batch`, `csv`, `spreadsheet` or `bulk` entries, so growth claims based on these sources would be unsupported. Default index policy stays **79 future production candidates**, including 15 distinct representative numeric answer pages; `*.pages.dev` preview remains `noindex`.

## Google structured data and numeric accuracy (2026-11-02)

The static `scripts/seo-content-audit.mjs` checks **all 157 generated HTML routes** for HTML/JSON-LD consistency. In the synthetic official-domain build, every index-candidate page must match canonical URL, WebPage name and description, Open Graph metadata, and actual visible breadcrumb hierarchy. The home page has a truthful WebSite schema, and the 40 dedicated/universal/batch tools have accurate free WebApplication markup. No user ratings or reviews are fabricated; **Google software-app rich-result eligibility is not claimed** because Google lists real review/rating data among its requirements.

Numeric HTML answers, copy text and SEO descriptions now use a meaningful `≈` for rounded results and `=` only when the display agrees with the calculated value; no invented claim of absolute measurement precision. The historical current policy remains **79 candidate index URLs** including 15 numeric values, while 77 additional value routes are available but excluded from indexing. For full scope, limitations and source links see [structured-data and mathematical-accuracy QA](research/GOOGLE-STRUCTURED-DATA-QA-20261102.md).

## Cloudflare release gate and preview-host protection (2026-11-02)

**Safe by default:** A plausible `SITE_URL` is not enough to permit public indexing. Only `SITE_URL`, an identical `SEO_PUBLIC_HOST`, and `SEO_INDEX_APPROVED=I_APPROVE_PUBLIC_INDEXING` together allow an indexable build. This is a human approval switch, **not** a credential or proof of domain ownership.

On Cloudflare Pages, `CF_PAGES_BRANCH` controls a further safety gate: branches other than `main` are forcibly noindexed even if variables are inherited. The two official Pages hostname-specific `_headers` rules continue to add `X-Robots-Tag: noindex` on generated previews. Configure a verified custom domain first; then enter approval variables in the **production** environment, not preview.

GitHub Actions continues testing synthetic `https://qa.example.test` with explicit test-only approval. This is not a deployed real domain. Unit tests check incomplete, invalid and mismatched approval, as well as non-main branch previews. Real indexing, DNS verification and GSC visibility cannot be demonstrated by local CI.

Official docs: https://developers.cloudflare.com/pages/configuration/headers/ ; https://developers.cloudflare.com/pages/configuration/build-configuration/ ; https://developers.cloudflare.com/pages/how-to/redirect-to-custom-domain/ ; https://developers.google.com/search/docs/crawling-indexing/block-indexing.

## Current SEO evidence and public deployment hygiene (2026-11-02)

- `scripts/seo-editorial-gate.mjs` reconciles all 92 numeric query records with the original 600-row **competitor** Semrush export and emits a 130-page review table. It distinguishes unverified generic-converter demand from numeric observations; no ExactUnit traffic claim.
- The numeric indexing policy remains **15 pilot / 77 noindex**; see `research/SEO-EDITORIAL-DECISIONS-V4-20261102.md`. Generic query Volume for **23** of 38 directions is not established by the approved numeric evidence.
- `scripts/segregate-qa-reports.mjs` requires 11 QA files, removes them from the publicly deployed `dist/` directory, and blocks accidental research CSV/internal audit JSON exposure. GitHub Actions archives `qa-reports/` instead.
- The public Cloudflare probe checks that internal audit exports return **404** and independently verifies the deployed commit SHA and preview noindex. A stale live deployment can temporarily show prior behavior; do not claim success until the live SHA matches the main branch.
