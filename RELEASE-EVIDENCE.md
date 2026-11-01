# ExactUnit release evidence — 2026-11-01

## Completed local verification

- [x] `npm test`: 10 Node native suites passed.
- [x] `npm run build`: 154 indexable static routes generated.
- [x] `node scripts/audit.mjs`: 138 representative routes verified; sitemap and canonical presence checked.
- [x] 37 core tool routes and 92 specific keyword pages match approved V2 lists.
- [x] Browser rendering screenshot inspected for 1440px desktop and 390px mobile; no measured horizontal overflow in static render.
- [x] No paid APIs, backend or database dependency.

## Pending external account/deployment verification

- [ ] Cloudflare Pages production deployment live and HTTP 200 endpoints checked.
- [ ] `SITE_URL` matches final domain; canonical and sitemap verified on live origin.
- [ ] GSC verification and indexing measurement.
- [ ] AdSense application, real publisher ID, any applicable user consent management.
- [ ] Full interactive browser exercise on live deployed site; local preview browser HTTP routes blocked by the execution environment administrator.
- [ ] Real user mobile CWV/traffic performance and ad RPM.

Never treat static build checks or screenshot-based review as proof of live-site deployment or revenue.
