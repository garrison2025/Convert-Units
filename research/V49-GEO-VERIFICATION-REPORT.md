# V49 — GEO real utility and provenance upgrade (2026-11-03)

## Scope
- Adds one clearly labeled, pre-rendered verification section on **all 38 converter direction pages**: worked value computed by the shared engine; direct calculation rule; source/target to common base-unit factor chain (or temperature offset / reciprocal fuel derivation); category-specific applicability warning; URL to the appropriate NIST, BIPM or IEC primary reference.
- Adds **16 distinct category decision guides**, focused on choosing the correct tool and ruling out wrong unit types. Replaces the repeated generic category CTA; does not create new SEO routes.
- Rebuilds the optional `llms.txt` from the actual 38-pair and 16-category registries. It cannot drift from the tools list; does not imply Google special ranking treatment.
- Researches genuine independent directory options in `research/V49-THIRD-PARTY-CITATION-OUTREACH.md`, separates candidate submissions from earned public backlinks, and excludes directories whose written rules reject this product.
- Keeps the production 156 URL inventory and all 92 numeric pages untouched. No new CSS, JS, runtime network call, paid API, or new back-end.

## Verification
- `tests/geo-verification.test.mjs` cross-checks each page-specific answer, conversion rule, evidence URL, and caveat; checks all 16 category decisions and full dynamic `llms.txt` inventory.
- The existing static SEO HTML gate compares emitted verification sections and category decisions against their source-module HTML.
- The actual Cloudflare main build must pass full GitHub Actions test/Chrome/performance/SEO/release CI before merge.

## Search and attribution caveats
These changes improve answer traceability and user value. They do not prove that a generative engine cited this website, that all 156 URLs were indexed by Google, or that any external website linked to it. Third-party inclusion requires a real editor's approval and public page verification.
