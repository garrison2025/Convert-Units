# V48 — Adjustable source rounding sensitivity for exact-value answers

- All existing 92 numeric pages contain distinct, source-calculated lower and upper conversions from V47. V48 makes the rounding step adjustable: users can choose e.g. 0.1 lb or 1 lb for 149 lb and compare how the possible whole-kg answer changes.
- The initial answer, source-rounded interval, and full comparison table remain static SSR HTML. The new select is hidden unless browser JavaScript initializes successfully, preserving accessible no-JS usefulness and crawler-readable content.
- Numerical updates use the existing, offline conversion engine. Celsius/Fahrenheit offset is preserved. No paid APIs, new route, tracking script, or external dependency.
- The increment selector explicitly makes a conditional what-if; displayed decimal digits and instruments do not establish precision.
- Tests verify all 92 generated selectors, source/target unit consistency, per-page source bounds, and headless Chrome interactions for 149 lb and 37.9 Celsius. Current 156 official indexable URLs and 92 original keyword routes are unchanged.
- This creates a genuinely useful feature, not an SEO scoring claim. Google Search Console coverage/canonical data are still necessary to make consolidation decisions.