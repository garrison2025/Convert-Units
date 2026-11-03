# Convert-Units V33 | Existing-page on-page SEO implementation | 2026-11-03

## Scope and provenance

This is a production-code improvement, not another keyword discovery proposal.
Evidence uses the **existing** user-supplied US Semrush 600-row V2 sample, specifically the 92 already curated and reconciled numerical seed pages documented in `research/SEO-38-DIRECTION-PRIORITY-V32-20261103.md`. No new keyword subscriptions, scraped keywords, or artificial US keyword metrics are introduced.

## Completed code changes

1. `src/source-backed-examples.mjs`: generates a small accessible worked-answer table using the existing conversion engine and the original 92 numeric seed inputs. It selects at most five **distinct** numeric inputs per existing direction, ordered by the historical competitor estimated visits recorded for those approved seed keywords. These numbers guide which illustrative examples appear; **the resulting website does not display competitor SEO metrics**. Rounding uses the actual `displayRelation` function, not a fabricated equals sign.
2. `scripts/build.mjs`: includes the answer component inside the **existing** directional tool page. The inventory remains 38 directions; exactly 15 of them have V2-backed numeric seed examples, and the 23 other tools get no unsourced example component.
3. `src/search-intent.mjs`: adds two specific, hand-verified explanatory Q&A blocks to existing directions:
   - `/convert/kw-to-hp/`: distinguishes mechanical horsepower (exact source factor 745.6998715822702 W per hp) from other hp definitions;
   - `/convert/kn-to-lbf/`: makes clear that the target is pound-force (lbf), **not** pounds of mass (lb).
   The questions reflect the available original dataset (`convert kw hp`, `kn to pounds converter`) without claiming universal generic-term volume.
4. `scripts/seo-content-audit.mjs`: verifies source-backed examples exactly match the regenerated page output, and forbids unsupported numerical example leakage to the other 23 tools.
5. `tests/source-backed-examples.test.mjs`: validates the 38-page / 15-evidenced-direction / 92-seed inventory, the five-example cap, unit conversions for the sourced 240 kg and 126 lb queries, source-data isolation, and both unit-standard clarifications.

## Source-backed worked examples (checked via the actual repository engine and new code)

- `/convert/kg-to-lbs/`: **240 kg ≈ 529.109429244 lb** (source query `240 kg to lbs`).
- `/convert/kw-to-hp/`: **1 kW ≈ 1.3410221 hp**, expressly **mechanical** horsepower.
- `/convert/kn-to-lbf/`: **1 kN ≈ 224.8089431 lbf**, expressly a **force** unit.
- `/convert/lbs-to-kg/`: the existing `126 pounds in kg` numeric input appears in the worked examples, with output computed by the shared exact unit engine.

## Scope guards / what remains unchanged

- 38 existing dedicated converters, 92 existing numerical pages, 16 categories, 157 overall static HTML routes.
- **No** new landing pages, new directory structure, mass-generated thin FAQs, paid APIs, dependencies, background jobs, or new maintenance burden.
- No changes to `src/seo-launch-policy.mjs`, `src/seo-numeric-publication.mjs`, `src/data/numeric-seo-policy.json`, sitemap emission, `robots.txt`, or the domain configuration.
- The temporary Cloudflare `*.pages.dev` preview is still **configured** as entirely `noindex`; all production indexing still requires explicit host-specific release gates. The future 15 numeric SEO conditional candidates and 77 noindex pages are unchanged.

## Verification and limitations

- Source-level runtime checks evaluated the actual GitHub engine, `sourceBackedExamples`, and `intentAnswers` with current 38 direction mappings and 92 original seed records. They confirmed **15 directions rendered examples**, capped at five rows, and the two new manual unit-standard answers rendered without missing links.
- A new Node test suite and an existing static SEO audit rule were committed. The repository's GitHub Actions workflow `.github/workflows/ci.yml` is configured to run `npm run check` on pushes to `main`. **A completed CI success was not independently available during this update; do not treat the source-level check as equivalent to the full CI suite.**
- Live Cloudflare preview page fetch was unavailable in the available HTTP checking tool. **Do not claim the updated build is already visible or deployed** until the preview build SHA and rendered page can be independently checked.
- Semrush historical values describe **competitor keyword estimates**, not our site's organic clicks, current rankings, or forecast revenue.

## Suggested next verification

When GitHub Actions and Cloudflare deployment show the V33 commit SHA, open `/convert/kg-to-lbs/` and confirm the worked table with 240 kg; open `/convert/kw-to-hp/` and `/convert/kn-to-lbf/` for the two targeted FAQs. Finally inspect the preview HTML response for `noindex`/X-Robots-Tag and confirm sitemap continues to omit public URL locations.
