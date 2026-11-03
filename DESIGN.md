# ExactUnit visual design standard — V39

Updated: 2026-11-03 · Scope: 157 prerendered pages · Research references: Omni Calculator, Linear 2026 UI refresh, Raycast.

## Product, outcome and boundaries
- Product: fast, accurate, browser-local unit converter. Audience: primarily US English organic search visitors.
- User's primary task: enter a value, choose units, and read the exact result with no account or friction.
- Page modes: **Operate** (homepage, tool, result and batch pages), **Read** (methodology, privacy and terms), **Navigate** (categories and directories).
- Visual design must not bury the converter below a promotional hero. The actual working converter remains visible on the desktop homepage and appears directly after the concise opening on mobile.
- Do not copy third-party brand assets or layouts verbatim. Preserve 38 directional calculators, one universal, 92 validated numeric URLs, full metadata and local computation.
- No paid APIs, external font requests, image libraries or runtime animations that impair performance.

## References and applied lessons
- [Omni Calculator](https://www.omnicalculator.com/conversion): unit selector, instant input-to-output task, category grouping.
- [Linear — March 2026 interface refresh](https://linear.app/now/behind-the-latest-design-refresh): consistent headers and restrained navigation surfaces, strong foreground content.
- [Raycast](https://www.raycast.com/): clear promise, task-first interface hierarchy, and expressive but bounded interactions.

## Site-specific design tokens (src/assets/site.css, V39)
The definitive color tokens live in `site.css`; `refresh.css` and `polish.css` may override spacing, but must not override the brand palette. V39 replaces the former scattered bright-blue declarations with the approved ocean-teal system.

| Role | Hex | Use |
|---|---|---|
| canvas | `#F6F9FA` | quiet warm-white page background |
| surface | `#FFFFFF` | calculator, content and search surfaces |
| ink | `#152B38` | primary heading and body text |
| muted | `#506473` | secondary readable labels |
| primary | `#176B8A` | wordmark, links, action buttons and small accents |
| primary-hover | `#125874` | visible hover and active states |
| result-bg | `#E8F5F6` | answer region |
| result-ink | `#145D73` | high-contrast numeric answers |
| line | `#DBE6EA` | quiet borders and separators |
| focus | `#176B8A` | high-contrast keyboard focus |
| success | `#156044` | copy-success feedback (separate from primary brand color) |
| error | `#CC4B64` | invalid input and error messaging |

Accessible color ratios against the intended surfaces: white-on-primary ≈5.99:1 and result-ink-on-result-bg ≈6.62:1 (both above 4.5:1). All styles are native CSS; no runtime palette generator, theme JS or remote dependency.

## Components and hierarchy
1. Header: identifiable wordmark; concise navigation; distinct tool access action.
2. Homepage hero: conversion benefit headline (no invented performance claims), brief supporting copy, real functioning calculator with prominent result.
3. Beneath hero: factual verification signals (standards-defined factors, instant local work, privacy), no false reviews or invented traffic stats.
4. Frequent tools: 6 clearly named tool entry points, then 16 category tiles at four columns on desktop with responsive reduction.
5. Calculator fields: native labels, large tabular numbers, distinct input vs result, accessible swap control, precision and copying subordinate.
6. SEO result pages: fixed prerendered answer is readable even if JS fails; live converter and nearby values follow; exact URL and keyword mapping remain unchanged.
7. Utility cards: hover transforms only, no animated controls before user input. Respect reduced-motion.
8. Layout: desktop max 1200px, two-column hero and tool details; tablets stack the hero; mobile cards stack without horizontal scrolling.

## Technical safeguards
- Keep original `src/assets/site.css` as structural foundation, layer `src/assets/refresh.css` for visual decisions.
- Cloudflare `*.pages.dev` remains preview and nonindexable. Official custom domain is activated only by valid `SITE_URL`.
- Maintain tests for 37 tools, 92 numeric seeds, and SEO HTML. Full interactive visual QA on real mobile devices is an independent gate; GitHub tests do not prove pixel-level appearance.
- Add future UI improvements to `refresh.css` and update this file when changing tokens.

## V4.0 tool-first progressive disclosure (2026-11-02)
- Homepage mobile reading order: compact introductory heading → **working converter** → search/discovery and proof. Desktop retains the two-column task-and-discovery composition.
- Main calculator always shows the live numeric input, input/output units and instantly updated result. Copy expression and copy numeric value are the only two permanently visible actions; sharing, reset and printing live under a native accessible `details` control.
- Other-unit equivalents remain server-rendered and available in an expandable table. This reduces first-screen noise without deleting useful explanatory information.
- A distinct but restrained indigo panel grounds the result on a white working surface; no automatic motion or remote resources are required.
- Retain the brand's existing indexed routes and launch guard. Browser smoke verifies details disclosure and order. Real screenshot inspection is still a separate release gate.

## V5 screenshot-based fixes and evidence (2026-11-02)
- Source of evidence: eight real headless Chromium screenshots of **the locally generated static build** at 1440px desktop and 320px / 375px mobile; screenshots are uploaded to a 7-day GitHub Actions artifact `exactunit-visual-qa` and are not published in `dist/`.
- Observed issue at 320px: the numeric result wrapped *mid-number*. At widths of 360px or less, place the target-unit selector above a full-width output, keep numerical glyphs in their own non-wrapping element, and compact preset chips.
- Observed issue on desktop batch page: optional column/delimiter/mixed-unit configuration obscured the actual input textarea below the first screen. Collapse those controls by default, expose the sample input and adjacent Convert action early, and show correctly calculated example output on first load.
- Interaction consistency: conversion title follows swap/from/to changes; **both** copy variants use the visible decimal precision; reset restores the original pair.
- Browser checks should assert one-line numbers at 320/375px, accessible disclosures, batch input layout, and real sample conversion. Screenshot presence is not a human visual pass; live Cloudflare deployment and real-device testing remain separate gates.

### Final V5 layout review
- The desktop batch view now displays the sample input, actual results, and **Convert values** primary action together in a 1440×950 screenshot.
- The 375px mobile batch view moves source/target selection into one row, exposes the source textarea within the first phone frame, and retains native accessible CSV-options disclosure.
- Result values on the 320px homepage no longer split the numeric digits across two lines; the narrow target selector moves above the answer. Existing 375px layout stays two-column.
- A successful Chromium workflow is a build/functional/automated-layout gate, not a replacement for real-user/device testing or independent Cloudflare live deployment verification.

## V6 homepage first-view and live-deployment evidence (2026-11-02)
- The homepage has no redundant self-referencing 'Home' breadcrumb; category, tool, and numeric pages retain their meaningful breadcrumb path.
- The 320px mobile hero uses concise, accurate language (precise rather than falsely promising mathematically exact displayed decimals) and keeps the result plus the primary copy control within the recorded 870px local Chromium first screen.
- `scripts/live-preview-audit.mjs` checks the **public Cloudflare Pages preview** over HTTPS via GitHub Actions; a successful local build is never interpreted as proof of deployment. The report records HTTP status, noindex protection, supported feature versions and a validated non-secret commit marker when available.
- `research/BRAND-DOMAIN-REVIEW-20261102.md` documents already-active ExactUnit-name competitors. The developer label remains provisional pending actual owner brand/domain selection; do not imply trademark clearance.
- Before moving to a verified custom-domain launch, rerun domain/brand checks, the official-domain SEO release gate and actual production UX/SEO checks. The `pages.dev` preview remains noindex.

## V7 search-intent-first content refinement (2026-11-02)
- **All 38 directional converter landings:** put a genuine `1 source-unit = / ≈ target` answer immediately below the H1 introduction and before the active converter. The answer comes from the shared production conversion engine, not a hand-entered or inferred coefficient. The correct relation depends on whether the shown decimal formatting is exact or rounded.
- **All 92 numeric-result titles:** keep the user's exact numeric intent, but limit visible SERP-title answer rounding to at most 6 decimal places (rather than up to 9) to reduce awkward, overly long titles. H1, HTML description, and prerendered body remain clear, accurate and tied to the same source engine.
- Preserve the accessible working calculator above unrelated explanatory material. No extra thin-value URLs, FAQ schema, invented testimonials, self-described experts or paid APIs.
- A new unit test independently verifies all 38 quick answers, and SEO content audit requires server-rendered quick answers so crawlers can see them without JavaScript. Cloudflare preview remains fully noindex; official-domain user approval is unchanged.

## V8 conversion-intent and crawlable-navigation refinements (2026-11-02)
- All 38 directional converter Meta Descriptions now use the common calculator engine and `displayRelation()`, preventing a rounded number being published as an exact equality. This is informational accuracy, not a claim about search-ranking changes or verified generic keyword demand.
- All 92 numeric answer pages replace a redundant "related measurements" parent self-link with up to four semantically related **existing directional converter** links. Reverse directions are first where available; category navigation remains a fallback. None links to the 77 deliberately noindex numeric siblings.
- The static SEO audit independently asserts accurate server-rendered snippets and related conversion links on every numeric and directional page. Node tests enforce the same 38-direction snippets and related pair validity.
- The page count (157), 15/77 numeric indexing policy, and existing `pages.dev` noindex remain unchanged. Official domain selection is deferred.

## V9: numeric pilot competitor observations and rounding-impact utility (2026-11-02)
- Read-only public web checks for all 15 curated numerical queries are in `research/SEO-15-SERP-EVIDENCE-20261102.json` and the user-facing review `research/SEO-15-PILOT-SERP-REVIEW-V5-20261102.md`: 13 observed exact-value competitor pages and 2 generic converter pages mentioning the value. These are not fixed US Google SERP positions.
- The value-specific `roundTripPrecisionNote()` panel appears on curated candidate pages **only when** rounding a converted answer to at most 2 decimal places produces a nontrivial reverse-calculation difference. It calculates this against the same tested engine and disappears for genuinely unaffected values, rather than inventing page-filler prose.
- The full 157-route audit validates source-matched panel contents; all 92 numeric routes remain functional, but the 77 nonpilot routes stay noindex and do not get new indexable content. No new URLs, paid API or domain actions.


## V37 interactive visual system and motion evidence (2026-11-03)

- **Art direction:** retain ExactUnit's blue, slate, white and neutral surfaces; reduce blank first-screen space and give the calculator/result stronger visual priority. A review of real 1440×950 and device-framed 375/320px CI screenshot artifacts found the desktop left headline too low relative to the right-hand calculator; the desktop hero copy now aligns nearer the top. Mobile keeps the verified introduction → converter → discovery order, result and primary copy action above the mobile first-screen fold.
- **Working feedback:** the result numeral uses the native Web Animations API for one **190 ms**, transform/opacity-only cue when the visitor changes a value, unit or precision. The initial render is not animated/hidden, repeated edits cancel the previous cue, and invalid values remain honest errors. `prefers-reduced-motion: reduce` disables the JavaScript cue.
- **Homepage entrance:** removes the accidental `animation:none!important` overrides that previously blocked existing CSS animations. One-time 460–520 ms transforms start from **94% opacity** instead of hiding the hero or calculator until a script fires; animations run only under `prefers-reduced-motion: no-preference`.
- **Microinteractions:** active quick-value presets expose `aria-pressed` and selected styling; invalid input exposes `aria-invalid` and a distinct border, immediately clearing after correction. Calculator surface focus, buttons, category pictograms and the result accent improve scanability. No perpetual decorative animation, external assets or runtime subscription.
- **Performance:** CSS source comments remain available to maintainers but are excluded from the deployed `styles.css`. Keep the existing stringent combined gzip, CSS and JavaScript size gates; never raise the budget merely to add motion.
- **Verification:** V37 Chrome smoke includes visual state, one-shot finite motion, no accumulating animations, reduced-motion branch, input invalid/recovery, 320/375px overflow and first-screen calculator access. CI screenshots include homepage, tool, category, numerical result, and batch at desktop/mobile. Screenshot artifacts are for visual review, not published in `dist/`.
- **Release boundaries:** 157 routes, 38 directional tools, 92 numerical pages and conservative numerical URL policy unchanged; Cloudflare-generated `pages.dev` remains globally `noindex`. Domain setup, GSC and ads are excluded by owner request.

## V38 mobile-first action clarity (2026-11-03)

- **Task sequence changed in actual SSR markup:** display the live converted result, then the two copy buttons, and only then the precision selector. The same controls and exact calculation/rounding logic remain intact across homepage, 38 direction tools, 92 numeric pages and universal converter.
- **Standalone tool phone first screen:** mobile breadcrumbs, headline, description, source-backed one-unit quick answer, live tool label, input and result have tighter but readable rhythm. The 375px screenshot review shows the primary and number-only copy buttons in the initial 870px phone frame; browser smoke now rejects their loss below that frame. No keyword, formula or answer is removed from crawler-visible HTML.
- **Small-label readability:** converter's badge is shortened to "Private · Instant"; its computed mobile font is held at or above 11.5px and the input/status labels maintain contrast. The 320px homepage retains the calculator and its copy action above the fold.
- **Touch motion:** the swap button uses one user-triggered native 175ms transform/opacity cue, cancelling an in-progress cue when necessary; the calculation happens *before* visual feedback. The normal hover-only rotation is removed so tapping cannot leave the icon stuck rotated. Both successful copy variants use a legible colored state and distinct accessible announcement. All motion obeys `prefers-reduced-motion`.
- **Batch first action:** the batch page's mobile heading, form spacing and values textarea were compacted without hiding CSV settings or changing CSV import/export; a 375px first-screen Convert-button assertion was added.
- **Performance, SEO, cost and scope:** preserve the preexisting 32KB combined gzip static asset budget, 157 routes, strictly sourced SEO, source-defined conversion engine, sitewide preview `noindex`, no production-domain switch, no advertisements and no new dependencies or external API requests.
- **Evidence:** GitHub Actions real Chromium screenshots and focused `scripts/browser-smoke.mjs` tests; CI is the authority for 320px/375px regressions and no horizontal overflow. Manual screen review is distinct from a production-field user study.

## V39: approved ocean-teal + warm-white rollout (2026-11-03)

- **Scope:** recolored five existing stylesheet layers and inline favicon/meta/theme accents; all homepage, calculator, 38 directional, 16 category, 92 numeric and batch templates inherit the same palette. No restructuring, API, library, animation or copy changes.
- **Hierarchy:** white input card; ocean teal reserved for calls to action, semantic links and small branding; pale aqua converter result with dark teal digits; neutral white card directory with subtle teal icon backgrounds. The dark informational banner retains dark-ocean depth rather than the former saturated royal blue gradient.
- **Technical debt:** moved primary, canvas, border, focus and results design tokens into `src/assets/site.css` as the single source. Removed duplicate root palette declarations in `refresh.css` and `polish.css`. Legacy non-semantic blue literals were remapped to corresponding ocean/neutral shades. Successful-copy green and error red remain semantically distinct.
- **Verification:** `v39-color-system` browser-smoke assertions check actual computed primary/button/result colors and their WCAG AA normal-text contrast on homepage and a directional converter; earlier V38 mobile fold, reduced-motion, SEO and static resource budgets remain enforced.
- **Release gate:** preserve `pages.dev` preview `noindex,follow`, no production domain, no advertising, no Google Search Console and no index approval without owner decision.
