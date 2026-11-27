# Storyboard and production asset map

The paths in the reference column are relative to the supplied project. Animated HTML layers are identified by their section and class names in the source.

| Story and reference | Production asset or layer |
|---|---|
| `shared-ui/navigation-bar.png` and `renewal-section-tracker.png` | Supplied 2048 × 721 transparent RMIT lockup in `assets/shared/rmit-lockup.png`, shared HTML navigation, and fixed section tracker |
| `homepage/01-campus-landing.png` | `assets/homepage/{clouds,campus-building,trees,landscape,vegetation}.svg`, plus independent sky and interface; the 2026-11-26 refinement uses the layers documented below |
| `section-01/01-office-email.png.png` | `assets/section-01/office/`, previously drawn layered scene |
| `section-01/02-envelope.png.png` | `assets/section-01/envelope/`, independent sender, flap, pocket and back |
| `section-01/03-calendar.png.png` | `assets/section-01/calendar/`, localized month heading, weekday grid and highlight label |
| `section-02/01-folder-open-reference.png.png`, `09-folder-closed.png.png` | `assets/section-02/folder-cover.svg` and `folder-fastener.svg`, with independently controlled HTML back, side and seven tabs |
| `section-02/02-passport.png.png`, `04-passport-photo.png.png`, `05-health-check-report.png.png` and `06-residential-address-reference.png.png` | Passport, photo, health and address previews in `story.js`, styled in `site.css`, using the recurring employee portrait where appropriate |
| `section-02/03-current-trc-reference.jpg.png` and `08-family-documents-reference.png.png` | The first reference depicts an application form and the second depicts a TRC. The issued-card illustration follows the form factor of `section-04/05-renewed-trc.png.png`. Family documents use a descriptive sample sheet. |
| Police check, no dedicated reference | Optional sample preview with generic document lines and no records, seal or signature |
| `section-02/10-folder-handover.png.png` | `assets/section-02/{left,right}-handover.svg` |
| `section-03/04–07` storyboards | `assets/section-03/`, integrated prior vector scenes with new Vietnamese variants for the status illustrations |
| `section-04/01–04` storyboards | Three independent HTML paper illustrations in `renewal.html`, with generic headings and illustrative rules |
| `section-04/05–07` storyboards | Separate HTML Temporary Residence Card and Work Permit, with reusable portrait illustration |
| `section-04/08-employee-holding-documents.png` | `assets/section-04/employee-receiving.png`, built-in ImageGen alpha cutout from the employee reference and storyboard. Cards remain independent. |
| `section-05/01-rmit-logo-composition.png.png` | Supplied red symbol isolated from the reference for the campus. The Closing logo animates clipped parts of the supplied complete navigation lockup. |
| `section-05/02-employee-staff-goodbye.png.png` | `assets/section-05/corridor.svg`, plus separate employee and staff alpha cutouts from one built-in ImageGen sheet, animated with clipped wrist layers |
| `contact/01-contact-page-layout.png` and `02-chatbox-layout.png` | Shared campus SVGs, independent HTML contact copy, and native dialog chat interface |

The new campus and corridor are redraws. Their details and the character cutout poses are approximations of the storyboard. The high-resolution transparent lockup supplied on November 26 replaces the earlier navigation crop in the header and Closing scene.

## Image generation briefs

- Closing cutouts. Two isolated waist-to-thigh flat 2D characters on transparent alpha, matching the reference employee and Global Mobility staff in clothing, face and hair, with a restrained wave and ample space between the cutouts.
- Receiving cutout. Match the same employee in a waist-up pose with a smile and both hands positioned to receive separately animated cards. Keep the hands empty, full silhouette in frame and the background transparent.

The surrounding environments and objects were authored as SVG and HTML layers.



## Homepage and branding refinement

- The supplied RMIT PNG is copied byte-for-byte to `assets/shared/rmit-lockup.png`. Its red symbol and black wordmark retain their original proportions and colors. Closing animates clipped layers of this same lockup.
- `assets/homepage/campus-architecture.png` is an independent transparent raster asset produced with built-in ImageGen from the supplied `IMG_7762 1.png` reference. It reproduces the angular roof, glass fins, red panel tower and entrance canopy in a flat architectural style.
- `assets/homepage/campus-trees.svg`, `campus-ground.svg` and `campus-plants.svg` are new, separate landscape layers. Sky and clouds stay separate from the building.
- Home and Contact use the refreshed campus composition. Only Home animates the building entrance.

The brand audit revised the campus cutout and decorative SVG palettes, kept the supplied logo intact throughout the Closing reveal, and preserved character layers and official document cues. See [DESIGN_AUDIT.md](DESIGN_AUDIT.md) for the scope, browser checks, and asset limitations.

The interaction upgrade lowers the campus ground and grass layers and moves the tree groups away from the facade. The building uses the existing architectural cutout at its original aspect ratio. The service picker adds `assets/homepage/service-renewal.svg` and `assets/homepage/service-repatriation.svg`, two decorative, site-authored vector illustrations.

The visual correction pass adds `campus-midground.svg` and redraws the cloud paths. It uses crops of the original handover artwork, the original clipboard composition, and the supplied three forms, TRC, Work Permit and final holding pose. The reviewing-staff illustration and farewell office background were rebuilt with ImageGen against the supplied storyboards and integrated as separate scene artwork. The original submission art remains intact beneath an animated checkmark reveal.

Section 03 uses the user-supplied transparent summitted.png directly in the Submitted scene. The original storyboard remains in the asset inventory.
