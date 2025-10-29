# Meloy Kickstart — Engineering Entrepreneurship @ Texas A&M

A dark, futuristic React website with animated gradients, particles, glassmorphism, and neon accents (electric maroon + violet). Built with Vite + React + TypeScript + TailwindCSS.

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
- Hero: Headline, subtext, CTAs (Join the Club / Bring Your Startup) with particle background
- About: Cards for Learn Startup Skills, Find Co-Founders, Build Real Ventures
- Startup Career Fair: Description + elegant contact form (mailto-based)
- Events: Futuristic glowing cards with upcoming meetings
- Join: Simple email capture using mailto fallback
- Footer: Minimal glowing footer with Texas A&M mention, email, socials

## Theming
- Fonts: Space Grotesk (body), Orbitron (futuristic headings)
- Colors in `tailwind.config.ts`: electric maroon + violet accents
- Global styles in `src/styles/index.css` include neon/glass helpers

## Customize
- Replace placeholder social links in `Footer.tsx`
- Replace TAMU logo placeholder with an official asset if permitted by trademark guidelines
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
- react-tsparticles for background particles

## Supabase integration

The "Partner with Us" form (Career Fair section) saves submissions to Supabase.

Setup:
- Create a `.env` file (see `.env.example`) and set:
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`
- In your Supabase SQL editor, run `supabase/schema.sql` to create the `startup_contacts` table and insert-only RLS policy.

Data captured:
- company (required)
- contact_name (optional)
- contact_email (required)
- website (optional)
- hiring_types (array: Internship, Full-time, Contract)
- message (optional)
- source_section (e.g. "career_fair")

Security: RLS allows anonymous inserts only; there is no public select/update/delete access. Never put the service role key in client apps.

## Optional: Enable RAG for better answers

Build a small, local vector index of `TAMUStartup.txt` so the chatbot can answer more confidently from your content.

1) Create embeddings (one-time; requires `GEMINI_API_KEY`):

```powershell
$env:GEMINI_API_KEY = "<your_api_key>"
npm run rag:build
```

This generates `rag/tamu-embeddings.json`.

2) Commit the file so it's available in production:

```powershell
git add rag/tamu-embeddings.json; git commit -m "Add TAMU RAG embeddings"
```

3) Deploy to Vercel. The `vercel.json` includes the `rag/**` files in the Serverless Function bundle and ensures a Node runtime (not Edge).

Environment variables in Vercel:

- `GEMINI_API_KEY`: Google AI Studio API key

Notes:

- The API will fall back gracefully if the embeddings file is missing.
- For time-sensitive questions (dates, “latest”), the API can also use Google Search.
