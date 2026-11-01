# ExactUnit design system (adapted from Website-Starter-Standard)

- Product: precision conversion tools; English US market; SEO, direct references and repeat visits.
- Primary task: user inputs a number, selects compatible units, instantly sees an accurate answer.
- Mode: **Operate** for calculators, **Read** for standards and legal pages.
- Visual direction: calm technical editorial; dark petrol hero, warm white/light grey surfaces, cool green primary, minimal iconography; no external font, faux testimonials, decorative images or marketing traps.
- Behavior: result and input visible in the first screen on desktop and mobile; batch CSV is a separate task-first workspace.
- No forced animations. Only simple hover transforms/opacity; respects `prefers-reduced-motion`.

## Color tokens

| Token | Value |
|---|---|
| canvas | `#f6f8f8` |
| surface | `#ffffff` |
| ink | `#142633` |
| primary | `#087d72` |
| muted | `#667781` |
| border | `#dce6e6` |
| hero | `#123039` |
| focus | `#f0af42` |

## Typography and spacing

System font stack ensures no external downloads; type scale is responsive using `clamp` for the most important headings. Content width 1180px; 40px horizontal margins desktop, 28px total mobile. Repeated grid cards in 3-column desktop / 2-column tablet / single-column mobile. Shared button, field, result, card, and chip components live in `src/assets/site.css`.

## Accessibility

Keyboard operable native selects, descriptive labels, navigation skip link, live regions for calculation/error, 3px focus ring, reduced motion support, semantic header/nav/main/footer. Mobile value inputs use decimal numeric keyboard. Contrast targets are built into the palette and should still be retested on actual production device layouts.
