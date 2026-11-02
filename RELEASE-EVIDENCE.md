# ExactUnit release evidence — updated 2026-11-02

## Completed local verification

- [x] `npm test`: 17 Node native tests passed (latest GitHub CI).
- [x] `npm run build`: 155 indexable static routes generated in synthetic production mode; preview mode has 0 indexable routes.
- [x] `node scripts/audit.mjs`: 138 representative routes plus the 156-page complete crawl verified, with zero structural link or numerical result errors; canonical/sitemap checked under synthetic production origin.
- [x] 37 core tool routes and 92 specific keyword pages match approved V2 lists.
- [x] Browser rendering screenshot inspected for 1440px desktop and 390px mobile; no measured horizontal overflow in static render.
- [x] No paid APIs, backend or database dependency.
- [x] 1,000-row on-device batch conversion implemented.
- [x] Accessibility statement published; result pages display compatible alternative units.
- [x] GitHub Actions run: https://github.com/garrison2025/Convert-Units/actions/runs/41365698714
- [!] Editorial blocker: normalized same-direction numeric text is structurally very similar (1,646/1,646 pairs >=0.95 token Jaccard after removing numeric tokens); no assertion of AdSense readiness.

## Pending external account/deployment verification

- [ ] Cloudflare Pages production deployment live and HTTP 200 endpoints checked.
- [ ] `SITE_URL` matches final domain; canonical and sitemap verified on live origin.
- [ ] GSC verification and indexing measurement.
- [ ] AdSense application, real publisher ID, any applicable user consent management.
- [ ] Full interactive browser exercise including keyboard/clipboard/download, edge values, mobile widths and live HTTP status checks. Read-only spot checks of 5 preview routes were accessible and returned noindex; this is not an exhaustive live-browser test.
- [ ] Real user mobile CWV/traffic performance and ad RPM.

Never treat static build checks or screenshot-based review as proof of live-site deployment or revenue.
