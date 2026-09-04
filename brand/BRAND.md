# Light of Cambodia — Brand Guide

Machine-measured from the live site (https://light-of-cambodia.pages.dev/, 2026-07-24). Every value below traces to the deployed CSS/HTML, and matches the canonical names in `Light-of-Cambodia-Brand-Book.pdf`. Structured data: `brand.json`.

## Identity

Christ-centered nonprofit serving rural Pursat, Cambodia: children's ministry, family care, church and leadership partnerships. Tagline: **"A light over the rice fields of Pursat."** Anchor verse: Matthew 5:14. Bilingual identity — Khmer script (ពន្លឺនៃកម្ពុជា) appears before English in every section kicker and as a hero watermark.

## Logo

`assets/logo.png` (500×500 transparent PNG): cross and flame within a laurel of leaves. Rendered circular (border-radius 50%) at nav (100px), verse section (152px), footer (72px); also the favicon. **The logo is sacred**: never redraw, recolor, or use as an AI image reference. Composite the real file.

## Color

Green-and-flame system. Light pages are faintly green-tinted, dark sections are deep evergreen, warmth comes from flame and gold.

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| Bg | `#f7fbf8` | `oklch(0.985 0.006 150)` | page background |
| Surface | `#eff5f0` | `oklch(0.965 0.010 148)` | cards, panels |
| Ink | `#142a1a` | `oklch(0.26 0.04 152)` | primary text |
| Ink Soft | `#334937` | `oklch(0.38 0.04 150)` | secondary text |
| Evergreen | `#12361e` | `oklch(0.30 0.06 152)` | dark section bg |
| Evergreen Deep | `#092613` | `oklch(0.24 0.05 152)` | deepest bg, scrims |
| Leaf | `#367341` | `oklch(0.50 0.10 148)` | mid green accent |
| Flame | `#c74e33` | `oklch(0.58 0.16 34)` | primary CTA (Give Now); hover `#b53e23` |
| Marigold | `#e8af4f` | `oklch(0.79 0.13 78)` | gold buttons, highlights |
| Sunlight | `#fee5b3` | `oklch(0.93 0.07 85)` | glows, footer wordmark on dark |
| On-Dark | `#f7f2e3` | `oklch(0.96 0.02 90)` | text on Evergreen |
| On-Dark Soft | `#dad4bf` | `oklch(0.87 0.03 95)` | secondary text on Evergreen |

Rules: Flame is reserved for the primary give action. "Flame and marigold bring light and hope" against evergreen depth. Never introduce blues or purples.

## Typography

- **Display: Young Serif** (Google Fonts, single weight 400) — all headings, footer wordmark. Warm, bookish serif.
- **Body: Alegreya Sans** 400/500/700 + italic 400 — body copy, buttons, nav.
- **Khmer: Noto Serif Khmer** 400/600 — everything `lang="km"`. Khmer text is a first-class design element, not decoration.

## Voice & Tone

Warm, humble, faithful, relational, rooted. First-person plural, pastoral, plainspoken. Presence over programs: "walk alongside", "showing up, week after week", "local leaders carry the work", "Christ is already at work in the heart of the Cambodian people; we are grateful to walk alongside them." Avoid savior framing, urgency tactics, poverty spectacle, donor-hero language. Never describe our posture by negating a role ("partnership, not dependency", "we're partners, not rescuers", "relationship over rescue") — that phrasing still puts the US team at the center. Affirm what is already true in Cambodia instead. Scripture quoted directly, not paraphrased.

## Imagery

Warm documentary photography of real ministry moments: golden-hour rice fields, communal meals on woven mats, prayer, construction by local hands. Photos get 14px radius; hero gets evergreen scrim + golden glow. Center local people, never foreign visitors. 14 photos live in `assets/photos/`; hero/og:image is `photo-01.jpg`.

## Layout & Components

- 14px radius on cards/photos; pill buttons (999px): `.btn-flame` primary, `.btn-gold` secondary, `.btn-ghost` outline.
- Alternating full-width photo+copy bands, flipped each band.
- Dark Evergreen interludes (verse, values, footer) between light sections.
- Bilingual kickers: Khmer script then English label, every section.
- Scroll-reveal with `cubic-bezier(0.22, 1, 0.36, 1)`.

## Agent Prompt Guide

"Design in the Light of Cambodia brand: green-tinted white pages with deep evergreen (#12361e) dark sections, flame (#c74e33) primary CTAs, marigold (#e8af4f) gold accents, Young Serif headings, Alegreya Sans body, Noto Serif Khmer for Khmer script kickers placed before English labels, 14px radii, pill buttons, warm documentary photos of Pursat ministry with dignity-first framing. Composite the real logo file; never regenerate it."
