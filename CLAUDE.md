# Light of Cambodia website

Static site for Light of Cambodia, a Christ-centered nonprofit in Pursat, Cambodia. Live at https://www.lightofcambodia.org. No build step: plain HTML, CSS, JS. Read `PAGES.md` before editing — it documents every page and config detail.

## How changes go live

- Never commit directly to `main`. `main` is production: every push to it auto-deploys to lightofcambodia.org via GitHub Actions.
- Always work on a new branch and open a pull request. Every branch push auto-deploys a preview at `https://<branch-name>.light-of-cambodia.pages.dev` (branch name lowercased, `/` and `_` become `-`).
- Share the preview link in the PR description so it can be checked before merging. Larry Fischer (repo owner) reviews and merges.

## Hard rules

1. **The logo is sacred.** Never edit, redraw, recolor, or regenerate `assets/logo.png` or any logo file. Use as-is.
2. **Brand tokens only.** Colors and fonts come from `brand/brand.json` (Evergreen `#12361e`, Flame `#c74e33`, Marigold `#e8af4f`, Sunlight `#fee5b3`; Young Serif + Alegreya Sans, Noto Serif Khmer for Khmer text). Do not introduce new colors or fonts.
3. **Nav and footer are duplicated in every HTML file** (no templating). If you change either, make the identical change in all seven pages: `index.html`, `our-story.html`, `how-we-work.html`, `our-impact.html`, `our-team.html`, `financials.html`, `prayer.html`.
4. **Do not touch `functions/`** (the prayer form backend) or the Zeffy donation form ID (`0152b182-8cbf-4714-b26a-99909867ee95`) without explicit instruction from Larry.
5. **Accessibility is non-negotiable (WCAG 2.2 AA).** Every image needs meaningful alt text. Keep heading order logical. Don't remove the skip link, focus styles, or carousel pause behavior. Text over photos needs the existing scrim/overlay treatment for contrast.
6. **Photos**: put new images in `assets/photos/`, resized to roughly the dimensions of existing photos in the same section (check neighbors), JPG, kebab-case filenames (`team-first-last.jpg`). Never upload originals over ~400KB.
7. **Bilingual kickers**: section kickers pair Khmer (`.kicker-km`) with English (`.kicker-en`). Keep both; if you can't translate the Khmer, leave the Khmer line unchanged and ask in the PR.
8. **Keep edits minimal.** Match the existing HTML/CSS style. Don't reformat files, rename classes, or restructure pages beyond what was asked.

## Content voice

Warm, plain, concrete. First person plural ("we"). Faith-forward but never preachy. Real names and real numbers from the Pursat team. When unsure about a fact (dates, numbers, names), leave a TODO comment and flag it in the PR rather than guessing.
