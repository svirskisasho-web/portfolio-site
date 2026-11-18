# Sasho Svirski: Portfolio

One-page portfolio site. React + TypeScript + Vite + Tailwind CSS, hosted on Cloudflare Pages, with a
Cloudflare Pages Function for the contact form (emails via Resend, spam protection via Cloudflare Turnstile).

- No tracking, no analytics, no cookies. Language and theme choices are kept in the visitor's own browser storage.
- Font (Inter) is served from this site itself, not from Google Fonts (GDPR-friendly).

---

## Run it on your computer

Requires Node.js (already installed).

```bash
npm install        # first time only
npm run dev        # opens a live preview at http://localhost:5173
```

The page refreshes automatically when you save a file. The contact form does **not** send in this mode
(there is no server). To test the form locally, see "Test the contact form locally" below.

---

## Edit texts

**All texts are in one file: [`src/i18n/translations.ts`](src/i18n/translations.ts).**

- The English texts are in the `en` block, the Dutch texts in the `nl` block.
- Change the text between the quotes, in both languages, and save.
- Keep the names before the colons (`title:`, `intro:` …) unchanged.
- If you forget a Dutch text, `npm run build` will show an error telling you which one is missing.
- Your public profile links (LinkedIn, GitHub, Twine) are at the bottom of the same file, under `links`.

The `meta` block at the top is the page title and description shown in Google. The same English
title/description is also in [`index.html`](index.html) (used by Google and link previews). Update both.

## Add or change a project

1. Make a screenshot, 1280 × 800 pixels (16:10), and save it as **WebP** in `public/projects/`,
   e.g. `public/projects/my-project.webp`. (Free converter: https://squoosh.app, choose WebP, quality ~80.)
2. In `src/i18n/translations.ts`, under `work.projects`, copy an existing project block (`{ id: ... }`)
   in **both** `en` and `nl`, and fill in:
   - `id`: a short unique name, e.g. `'bakery'`
   - `name`, `tag`, `summary`, `details` (bullet points)
   - `image`: `'/projects/my-project.webp'`
   - `alt`: a short description of the screenshot (for screen readers)
   - `live`: the website address; `code`: GitHub link, or `''` for none
3. **The first project in the list is shown as the large "Featured" card.** Change the order to change which one is featured.

## Change colours

Colours are defined once at the top of [`src/index.css`](src/index.css) (`--gold`, `--bg`, `--ink` …),
separately for light mode (`:root`) and dark mode (`[data-theme='dark']`).

## Consolidation animation (Remotion)

The looping animation at the top of "Finance case studies" is a Remotion composition played live
with `@remotion/player` (no video file):

- [`src/sections/consolidation/Consolidation.tsx`](src/sections/consolidation/Consolidation.tsx): the animation itself, the
  example figures and the timeline (frames at 30 fps). The made-up figures must add up; the comment at the top shows the sums.
- `ConsolidationPlayer.tsx`: the player. It picks a wide (desktop) or tall (phone) layout, and plays only while on screen.
- `ConsolidationFigure.tsx`: lazy-loads the player when the section comes near, adds the caption and pause button,
  and shows a still frame for visitors who prefer reduced motion.
- Texts are in `translations.ts` under `cases.anim`.

`remotion` and `@remotion/player` must stay on the **same exact version**. Remotion is free for individuals
and companies with up to 3 people; larger companies need a paid licence (see remotion.dev/license). Keep that in
mind before using it in a client's website.

---

## Contact form: how it works

```
Visitor fills in form ──► /api/contact (Cloudflare Pages Function, functions/api/contact.ts)
                              │ 1. checks fields + hidden "honeypot" field (catches bots)
                              │ 2. verifies Cloudflare Turnstile (spam check, no tracking cookies)
                              │ 3. Resend → full message to you (Reply-To = visitor)
                              └ 4. Resend → short confirmation to the visitor (their language)
```

Nothing is stored. Secret keys live **only** in Cloudflare's encrypted settings, never in the code or the repo.

### One-time setup

**1. Resend (email): free tier: 3,000 emails/month, 100/day**

1. Create an account at https://resend.com.
2. *API Keys* → create a key with "Sending access". Copy it (starts with `re_`).
3. **Until your domain is verified**, Resend only delivers to your own Resend account email, and the sender
   must be `Portfolio <onboarding@resend.dev>`. You will receive messages, but visitors will **not** get a
   confirmation yet (the site then just says "your message is on its way").
4. **After you buy your domain:** Resend → *Domains* → *Add domain* → it shows a few DNS records (TXT/MX).
   Add them in Cloudflare → your domain → *DNS*. When Resend shows "Verified", change `CONTACT_FROM_EMAIL`
   to e.g. `Sasho Svirski <hello@yourdomain.nl>`. From then on, visitors get their confirmation too.

**2. Cloudflare Turnstile (spam protection): free**

1. Cloudflare dashboard → *Turnstile* → *Add widget*. Hostnames: your `*.pages.dev` address (and later your domain).
   Mode: *Managed*.
2. You get a **Site Key** (public) and a **Secret Key** (private).

**3. Settings in Cloudflare Pages** → your project → *Settings* → *Variables and Secrets*:

| Name | Type | Value |
|---|---|---|
| `RESEND_API_KEY` | Secret | your Resend key |
| `CONTACT_TO_EMAIL` | Secret | the inbox that receives messages |
| `CONTACT_FROM_EMAIL` | Text | `Portfolio <onboarding@resend.dev>` (later: your own domain address) |
| `TURNSTILE_SECRET_KEY` | Secret | Turnstile secret key |
| `VITE_TURNSTILE_SITE_KEY` | Text (build variable) | Turnstile site key |

Redeploy after changing variables.

### Test the contact form locally

1. Copy `.dev.vars.example` to `.dev.vars` and fill in your real Resend key and inbox.
   (`.dev.vars` is ignored by git, so it never goes to GitHub.)
2. Run:

   ```bash
   npm run pages:dev
   ```

3. Open http://localhost:8788 and send a test message. Locally, Turnstile uses Cloudflare's test keys (always passes,
   shows a "testing only" notice).

---

## Deploy (Cloudflare Pages via GitHub)

**One time:**

1. Create an empty repository on GitHub under `svirskisasho-web` (e.g. `portfolio-site`), no README.
2. Push this folder to it:

   ```bash
   git remote add origin https://github.com/svirskisasho-web/portfolio-site.git
   git push -u origin main
   ```

3. Cloudflare dashboard → *Workers & Pages* → *Create* → *Pages* → *Connect to Git* → choose the repo.
   - Framework preset: **Vite** (or none)
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add the variables from the table above, plus `NODE_VERSION` = `22` (Text), then *Save and Deploy*. The site appears at `https://<project>.pages.dev`.

**Every update after that:** commit and push to `main`. Cloudflare rebuilds and publishes automatically
(about a minute). Other branches get their own preview URL.

### Connect your domain (after you buy it)

1. Cloudflare Pages → your project → *Custom domains* → *Set up a custom domain* → enter it.
   If the domain's DNS is on Cloudflare, it's connected automatically; otherwise Cloudflare shows the records to add.
2. Add the domain to the Turnstile widget's hostnames.
3. Verify the domain in Resend (see above) and update `CONTACT_FROM_EMAIL`.
4. In `index.html`, make the social preview image absolute and add the page URL, e.g.:

   ```html
   <meta property="og:url" content="https://yourdomain.nl/" />
   <meta property="og:image" content="https://yourdomain.nl/og-image.png" />
   <link rel="canonical" href="https://yourdomain.nl/" />
   ```

---

## Project structure

```
src/
  i18n/translations.ts   ← ALL texts (EN + NL) and profile links
  i18n/LangContext.tsx   language switch logic
  sections/              one file per page section (Hero, Services, ExcelDemo, Work, …)
  components/            shared building blocks (Section layout, icons, scroll reveal)
  index.css              colours, fonts, animations
functions/api/contact.ts  contact form backend (Cloudflare Pages Function)
public/                   images, favicon, social preview image, security headers (_headers)
```

## Checks

```bash
npm run build      # type-checks everything and builds the site into dist/
```

Last Lighthouse run (mobile): Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100.
