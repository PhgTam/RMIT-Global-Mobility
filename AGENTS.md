# RMIT Global Mobility website

## Architecture

Use the buildless HTML, CSS and JavaScript website in this directory. Home, Renewal and Contact share navigation, the English/Vietnamese language selector and the same design tokens. Repatriation is an unavailable service until its own brief and storyboard are provided.

Keep the five Renewal stories together in `renewal.html`, ordered by `SECTION_MAP.md`. Retain the permanent IDs. Keep the global section tracker and the Section 03 application-stage tracker independent.

## Visual references and assets

Reference originals live in `references/`, `artstyle/`, `characters/` and `color-palette/` in the supplied project. Keep them unchanged. Consult the storyboard for composition, shared style and palette for rendering, and the character sheets for identity. See `ASSET_MANIFEST.md` for exact mappings and ambiguous references.

Place new production art under `assets/` by section. Keep independently animated objects in separate assets or independently controlled layers. Keep important interface copy in HTML and both language variants in `translations.js`. Use the supplied logo artwork with original proportions.

## Implementation and verification

Use white, RMIT Blue `#000054`, RMIT Red `#E61E2A`, and the 75%, 50%, and 30% blue tints for interface and decorative environments. Keep red solid and reserve it for primary actions, current steps, and narrative cues. Use RMIT Yellow `#FAC800` sparingly in graphic details on white or blue. Keep yellow out of typography, primary backgrounds, and graphics placed on red. Preserve natural character colors and recognizable document details. Use blue-and-white completion symbols, readable labels, and visible keyboard focus.

Use the typography tokens in site.css. Load authorized Museo 700 for short headlines and Helvetica Neue LT Pro 55 Roman (400) and 75 Bold (700) for body copy and interface labels when webfont files are supplied. Declare local assets with font-display: swap and verify Vietnamese glyph coverage for each weight. Arial Regular and Bold are the current system fallback. Align desktop reading content on the 12-column grid with approximately 4% page margins. Use the complete supplied logo on white with clear space and minimum widths of 166px on desktop and 86px on small screens.

Keep the red Global Mobility label as separate HTML text outside the RMIT logo panel. Home and Contact share the layered campus artwork. Keep the facade, entrance, and base legible above the landscape layers. Keep service cards equal at wide viewports and stack them on narrow screens. Renewal is a link with a keyboard-operable expansion and a direct reduced-motion route. Repatriation is an informational card.

- Preserve native scrolling, reverse scrub, sticky sections, responsive layout, keyboard controls and reduced-motion alternatives.
- Keep envelope and organizer interactions separate from scroll position. Persist language centrally and preserve state during translation.
- Use named components and scoped section selectors. Test asset paths, both languages, and desktop and mobile interactions.
- Keep sample dates and documents clearly illustrative. Only connect Contact to approved sources and verified contact details.
- Update the section map and asset manifest when an implementation or reference changes.

Use a full-viewport centered reading axis for Renewal openings, the envelope/calendar, the issued-document scene, and the closing message. Keep the tracker out of that alignment calculation. Use white text on RMIT Red for the opening panels of Sections 01, 03 and 04. Keep artwork disclaimers outside the document artwork.

The local bilingual FAQ is backed by `faq.json`. Link each answer to the relevant guide section when available, distinguish illustrations from requirements, and route unsupported or case-specific questions to Global Mobility. Do not add unverified rules, direct contact details, or processing times. Keep external classification opt-in and constrained to FAQ IDs, with server-only credentials.


Keep the monitor email and envelope keyboard operable. Keep the office layers aligned in the shared SVG coordinate system and center the calendar on the viewport. Use the original receiving hands, connect sleeves to the bottom edge, and keep organizer controls in front. Keep the Section 03 trackers above the full-bleed artwork. Section 04 uses solid RMIT Red and ends after the single employee receiving scene.

Load site-reset.js before page scripts. On a browser reload, clear only the RMIT language and temporary renewal keys, then return to the top of English Home. Ordinary navigation preserves the current language and temporary renewal state.
