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
