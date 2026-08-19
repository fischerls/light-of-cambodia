# Site structure and config

Static site, no build step. Deployed to Cloudflare Pages; `lightofcambodia.org` points at it.

## Pages

| File | What it is |
|---|---|
| `index.html` | Homepage. Hero, mission, verse, Our Work bands, stories carousel, values, give/pray, footer. |
| `our-story.html` | Founding story: Nareth's lighter, Sydney's butterflies. Video embed slot is a TODO comment near the top. |
| `our-work.html` | Partnership-not-dependency in practice: local leadership, Community Child Care Program, Battambang branch. |
| `our-impact.html` | Dated program numbers as stat tiles, then photo bands. Update whenever the Pursat team sends new numbers. |
| `our-team.html` | Cambodia ministry team, board, founders. Same card treatment for every group on purpose. |
| `financials.html` | FY2025 summary table, expense-share bars, public filings. Numbers change once a year after the 990-EZ is filed. |
| `prayer.html` | Prayer request / praise report form. |

Nav and footer are duplicated in each file (no templating). Change one, change all seven.

## Stories carousel (homepage)

Slides live in `index.html` under `#stories`. Each slide is a photo, a one-line hook, and a link to the real
Facebook post. Auto-advances every 5.5s, pauses on hover and focus, does not auto-advance when the visitor has
reduced motion turned on. Without JavaScript the slides stack vertically and all three stay readable.

Only add stories that have already been posted and cleared the Before-You-Post checklist.

## Prayer form

`prayer.html` posts to `functions/api/prayer.js` (a Cloudflare Pages Function) at `/api/prayer`.
Nothing is stored on the site and nothing is ever displayed publicly. Both sharing checkboxes are
opt-in and unchecked by default, and their answers are passed through in the email.

Spam handling: hidden honeypot field, plus a submit-too-fast timing check. Cloudflare Turnstile is
supported but off until keys are set.

**Required before the form can deliver mail** — Pages project → Settings → Variables and Secrets:

| Variable | Value |
|---|---|
| `WEB3FORMS_KEY` | Free access key from web3forms.com, created with `lightofcambodia.loc@gmail.com` so requests land in that inbox. |

Optional, to add Turnstile:

| Where | Value |
|---|---|
| Pages env var `TURNSTILE_SECRET` | Turnstile secret key |
| `app.js`, `TURNSTILE_SITEKEY` | matching Turnstile site key |

Set both or neither. A secret with no site key rejects every submission.

Until `WEB3FORMS_KEY` is set, the form answers with the "something went wrong, please email us" message
and the page still shows the direct mailto fallback, so nothing silently disappears.

## Still outstanding

- `Light of Cambodia Inc_Form990-Ez.pdf` from Jennifer. Drop it in `assets/docs/` and swap the commented-out
  download button on `financials.html` for the "available on request" line.
- Founding-story video for `our-story.html`.

## Local development

```
python3 -m http.server 8899          # pages only
npx wrangler pages dev . --port 8788 # pages + the /api/prayer function
```

For a local function test, put `WEB3FORMS_KEY=...` in `.dev.vars` (gitignored).
