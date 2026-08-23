# Light of Cambodia website

This is the website for **Light of Cambodia**, a Christ-centered nonprofit in Pursat, Cambodia.

- **Live site:** https://www.lightofcambodia.org
- **Preview of the new pages:** https://staging.light-of-cambodia.pages.dev

## New here? Start with the guide

If you want to change something on the website, read **[HOW-TO-EDIT.md](HOW-TO-EDIT.md)**.
It is written in plain language and walks you through it step by step. You do not need to know
anything technical, and you cannot break the live site.

## What is in this folder

| File | What it is |
|---|---|
| `HOW-TO-EDIT.md` | **Read this first.** How to ask Claude for website changes. |
| `index.html` | The homepage |
| `our-story.html`, `our-work.html`, `mission-trips.html`, `our-team.html`, `financials.html`, `prayer.html` | The other six pages |
| `styles.css` | How the site looks (colors, spacing, type) |
| `app.js` | The small bits of behavior (menu, stories carousel, prayer form) |
| `assets/` | The logo and every photo |
| `brand/` | The brand book, colors, and fonts |
| `functions/` | The prayer-form backend. Do not change this. |
| `CLAUDE.md` | The rules Claude follows when it edits this site |
| `PAGES.md` | Technical notes on every page and setting |

## How a change goes live

1. Someone (usually Claude) makes the change on a **branch** — a private copy.
2. That branch automatically publishes a **preview link** so it can be looked at first.
3. A **pull request** is opened.
4. Once the preview looks right, the pull request is merged into `main`, and the live site updates
   by itself, usually within a minute.

Nothing reaches www.lightofcambodia.org until step 4. `main` is protected, so a change physically
cannot skip the preview.

## Who to ask

Larry Fischer — Internet Media Now — larry@internetmedianow.com
