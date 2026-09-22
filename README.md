# Meloy Kickstart — Engineering Entrepreneurship @ Texas A&M

A cream-and-maroon React landing page styled after the 2026 Meloy Kickstart brand graphics. Built with Vite + React + TypeScript + TailwindCSS.

## Quick start

```bash
# From the project folder
npm install
npm run dev
```

- Dev server runs at http://localhost:5173
- Build for production:

```bash
npm run build
npm run preview
```

## Sections
- Hero: Framed poster with logo lockup, tagline, headline, CTAs, and wave graphic
- What We Offer: Offering cards + "Ready to start building?" banner
- Join: Discord CTA with perks list
- Events: Date-led agenda list
- Partner: For startups and companies — speak, hire, sponsor, or join the spring career fair. Form writes to a Google Sheet
- Footer: Maroon footer with contact and social links

## Theming
- Font: Poppins (all weights via Google Fonts)
- Colors in `tailwind.config.ts`: `cream`, `ink`, `maroon`, `rose` scales
- Fluid display sizes (`text-display-xl/lg/md`) use `clamp()` so headlines scale without breakpoints
- Shared classes in `src/styles/index.css`: `.display`, `.eyebrow`, `.rule`, `.lede`, `.btn-primary`, `.btn-secondary`, `.card`, `.field`, `.label`

## Customize
- Replace placeholder social links in `Footer.tsx`
- Events come from Luma. `npm run luma` refreshes `src/data/luma-events.json`; `npm run build` runs it too. `.github/workflows/luma-sync.yml` runs it every 2 hours and commits changes to `main`, which triggers a Vercel deploy. Run it by hand from the Actions tab to publish a new event now.
- Instagram posts come from Behold (see below)

## Accessibility & Motion
- Smooth scrolling enabled
- Subtle focus and hover effects
- If you need reduced motion, you can wrap framer-motion animations with prefers-reduced-motion checks as a next step

## Tests & CI

```bash
npm run typecheck   # tsc
npm test            # vitest (jsdom)
npm run test:watch
```

- `src/lib/events.test.ts`: Luma title cleanup and date formatting.
- `src/lib/instagram.test.ts`: Behold feed parsing (newest three, image choice).
- `src/App.test.tsx`: renders the page; checks nav, hero, events, Instagram cards, footer links, and the partner form's validation.
- `.github/workflows/ci.yml` runs typecheck, tests, and build on every push and pull request.
- GitHub secret `VITE_SHEETS_WEBHOOK_URL` and variables `VITE_DISCORD_INVITE`, `VITE_INSTAGRAM_FEED_URL` feed the CI build. They are not needed for tests.

## Tech
- React 18, Vite 5, TypeScript 5
- TailwindCSS 3
- framer-motion for micro-interactions

## Partner form → Google Sheet

The "Partner with us" form posts to a Google Apps Script web app, which appends a row to a Google Sheet. No database.

Live links (need club Drive access):
- Sheet: [landing-startup-fair-responses](https://docs.google.com/spreadsheets/d/1-RgvsSnnZsQ8O3b0JXCbuVbvR5EJMlkfV1kY_g_wUt8/edit) — tab "Submissions", in the Startup Career Fair Drive folder
- Apps Script: [Kickstart website partner form](https://script.google.com/home/projects/1vAsP-ZRWMRTSQP7x298A6hAYIgugQj5wS3q7-eH3UXo9itweMgfgB_iZ/edit) — owned by the officer who deployed it (Sep 2026: Aisha, aishasalimg@tamu.edu)
- The web app URL is the value of `VITE_SHEETS_WEBHOOK_URL`. It lives in `.env`, the GitHub secret, and Vercel. Not in this repo.

Setup from scratch (or to move it to another account):
1. Open `google-apps-script/Code.gs`. Put the Sheet ID in `SHEET_ID`.
2. Go to [script.google.com](https://script.google.com) → New project. Paste the file.
3. Run `formatSheet` once from the editor. It styles the sheet.
4. Deploy → New deployment → Web app. Execute as **Me**, access **Anyone**.
5. Copy the Web app URL into `VITE_SHEETS_WEBHOOK_URL` (see `.env.example`). Set the same value in GitHub (secret) and Vercel.
6. Open the URL in a browser. It should return `{"ok":true,...}`.

Columns written: Timestamp, Company, Contact Name, Contact Email, Website, Partner Types, Message, Source.

Notes:
- The endpoint is public. Anyone who finds the URL can append rows. Keep the URL out of git.
- After editing `Code.gs`, re-deploy as a new version (Deploy → Manage deployments → Edit → Version: New version) or the live URL keeps the old code.
- Officer hand-off: the script runs as the deployer's Google account. Before that person leaves, redeploy from the club account (`meloykickstart@gmail.com`) and update the URL in the three places above.

## Instagram → Behold

The "On Instagram" section shows the three newest posts from `@meloykickstart`. The posts come from a [Behold](https://behold.so) JSON feed. Behold keeps the Instagram token fresh and hosts the images.

Live links:
- Behold feed: [Kickstart website](https://app.behold.so/feeds/8lbzhK7erLeUCWeO27d8) — JSON at `https://feeds.behold.so/8lbzhK7erLeUCWeO27d8`
- Behold account: `aishasalimg@gmail.com` (Sep 2026). Move it to `meloykickstart@gmail.com` at hand-off (Behold → Account → Change email).

How it works:
- `scripts/fetch-instagram.mjs` snapshots the feed into `src/data/instagram-posts.json` before every build (`npm run instagram` to refresh by hand).
- The browser then fetches the live feed on load. If that fails, the snapshot shows.
- The Meloy Kickstart feed is the built-in default, so it refreshes in local, CI, and Vercel builds without extra configuration. `VITE_INSTAGRAM_FEED_URL` is only needed to override it if the club changes Behold feeds.

Notes:
- Instagram must stay a professional account (Business or Creator). Behold requires it.
- If Behold shows the source as "Disconnected" (password change, app removed in Instagram settings), log in as `@meloykickstart` and reconnect from Behold → Sources.
- Free plan: 1,200 feed views per month. Past that, the live fetch fails and the snapshot from the last deploy shows until the next push.
