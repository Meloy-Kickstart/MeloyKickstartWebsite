# Meloy Kickstart — Engineering Entrepreneurship @ Texas A&M

A cream-and-maroon React landing page styled after the 2026 Meloy Kickstart brand graphics. Built with Vite + React + TypeScript + TailwindCSS.

## Quick start

```powershell
# From the project folder
npm install
npm run dev
```

- Dev server runs at http://localhost:5173
- Build for production:

```powershell
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
- Adjust events in `src/sections/Events.tsx`
- Hook up a real backend or Formspree for the forms if desired

## Accessibility & Motion
- Smooth scrolling enabled
- Subtle focus and hover effects
- If you need reduced motion, you can wrap framer-motion animations with prefers-reduced-motion checks as a next step

## Tech
- React 18, Vite 5, TypeScript 5
- TailwindCSS 3
- framer-motion for micro-interactions

## Partner form → Google Sheet

The "Partner with us" form posts to a Google Apps Script web app, which appends a row to a Google Sheet. No database.

Setup:
1. Create a Google Sheet.
2. Extensions → Apps Script. Paste `google-apps-script/Code.gs`.
3. Deploy → New deployment → Web app. Execute as **Me**, access **Anyone**.
4. Copy the Web app URL into `VITE_SHEETS_WEBHOOK_URL` (see `.env.example`). Set the same variable in Vercel.
5. Open the URL in a browser. It should return `{"ok":true,...}`.

Columns written: Timestamp, Company, Contact Name, Contact Email, Website, Partner Types, Message, Source.

Notes:
- The endpoint is public. Anyone who finds the URL can append rows. Keep the URL out of git.
- After editing `Code.gs`, re-deploy as a new version or the live URL keeps the old code.
