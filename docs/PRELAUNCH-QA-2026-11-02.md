# ExactUnit — prelaunch release gate, 2026-11-02

## Current decision: TECHNICAL QA PASS / SEO CONTENT & ADSENSE NOT SIGNED OFF

Repository: https://github.com/garrison2025/Convert-Units

### Verified by GitHub Actions
- Workflow: https://github.com/garrison2025/Convert-Units/actions/runs/41365326665
- Node test suites: 16 passed, 0 failed on commit af170de.
- Static preview: 156 generated HTML routes including 404; zero indexable routes.
- Synthetic production origin: 155 indexable routes; canonical/OG/sitemap consistency passed.
- All internal anchors and their target routes, orphan-page detection, local assets and 92 prerendered numeric answers: zero errors in release audit.
- Existing deep audit: zero errors, 74 editorial/content similarity warnings.

### Major unsolved editorial risk
- Normalized-token overlap is >=95% for **1646 of 1646** same-direction numerical-page comparisons.
- This is a deliberately sensitive diagnostic, **not** a claim that Google has issued 1646 duplicate-content penalties or that every page violates policy.
- Actual query-specific answer, working calculator, printable/reference features and practical usefulness should be reviewed against Google's people-first content and scaled-content guidance before marking the complete 92-page corpus AdSense-ready.
- Do not create filler text, copy another converter, or add animations merely to reduce this similarity metric.
- No automatic deletion or noindex of the approved 92 SEO seeds has been performed; that would materially change the V2 plan.

### AdSense / launch blockers
1. Bind the real custom domain and set SITE_URL to that HTTPS origin. The Cloudflare pages.dev preview currently uses noindex and an empty sitemap by design.
2. Verify actual deployed HTTP responses across more pages, including error status, mobile interaction, clipboard/download and font/asset loading. Local CI cannot certify Lighthouse or browser input flows.
3. Review privacy disclosures and applicable Google consent management before loading a real AdSense script. The currently installed configuration does not auto-enable advertising; no fabricated publisher ID is used.
4. Editorial review of formula/data provenance, 92 similar numeric pages and the website's unique utility beyond instant answers.
5. Create/adapt AdSense and GSC accounts and verify the final domain as the account owner.

### Re-run evidence
- npm run check
- SITE_URL=https://qa.example.test npm run build

After either command, examine dist/quality-report.json and dist/release-audit-report.json. The second command tests synthetic canonical behavior **only** and is not a production deployment.

### Standards
- https://support.google.com/adsense/answer/12176698
- https://support.google.com/adsense/answer/81904
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

## Scope preservation
No backend, DB, cron, paid API, automatic advertising, or additional animations were introduced.
