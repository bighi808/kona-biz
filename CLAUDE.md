# CLAUDE.md — Kona.biz website

## STOP — read this before editing anything

This project has **moved off the old single-file HTML lander** onto a Vite + React +
TypeScript site. The live website is built from the React app under `src/`.

**Do NOT edit `konabiz-lander.html` or the `draft-*.html` files.** They are legacy
reference only — editing them does nothing to the live site. All real work happens
in the `src/` React code.

## Where everything lives
- **GitHub (source of truth):** https://github.com/bighi808/kona-biz  (private)
- **Live site:** https://bighi808.github.io/kona-biz/  (GitHub Pages — auto-deploys on push to `main`)
- **This folder:** a local mirror of the repo.

## How we edit and ship
We do **not** run a local dev server and we do **not** ask the user to run terminal
commands. The user works push-to-preview and switches models to save tokens.

1. Clone the repo fresh into /tmp using the user's GitHub token:
   `git clone https://x-access-token:TOKEN@github.com/bighi808/kona-biz.git /tmp/kona-biz`
2. Edit files in `/tmp/kona-biz`.
3. Commit with a clear message; push to `main`. **One focused commit per change** so
   history stays reviewable and any change is easy to revert.
4. GitHub Actions builds + deploys (~2 min). **Verify the build succeeded** via the
   Actions API (using the token) before telling the user it's done. If it failed,
   fetch the job log, find the real error, fix, re-push.
5. Sync changed files back to this workspace folder so local stays in step. The
   Windows mount **blocks in-place overwrites** of existing files — write to a temp
   filename then `shutil.move` over the target.

## Token
Pushing requires the user's GitHub PAT (fine-grained, scoped to this repo, with
Contents + Workflows read/write). It is **never** stored in the repo — ask the user
to paste it at the start of the session.

## Tech stack
Vite 5 · React 18 · TypeScript · Tailwind + shadcn/ui · **vite-react-ssg** (static
site generation — every route pre-renders to real HTML) · react-helmet-async (SEO +
JSON-LD) · gsap + @gsap/react (scroll animation) · three (hero globe). Deploy:
`.github/workflows/deploy.yml` → GitHub Pages.

## Structure
- `src/pages/` — route components. `Index.tsx` = homepage lander. `ServicePage`,
  `StatePage`, `ServiceStatePage` = the SEO matrix (6 services × 50 states = 300 pages).
- `src/components/sections/` — homepage sections: Hero, Ticker, WhyPillars,
  ServicesGrid, Methodology, ValueStats, Comparison, StateMap, FreeReport,
  AuditUpsell, FAQ, Booking, FooterContact.
- `src/components/Globe.tsx` — Three.js hero globe.
- `src/components/SEOHead.tsx` — per-page meta + schema.
- `src/data/` — `services.ts`, `states.ts`, `stateCoords.ts`, `marketStatus.ts`
  (source of truth; routes + sitemap derive from these).
- `src/hooks/useScrollReveal.ts` — GSAP scroll reveals.
- `scripts/generate-sitemap.js` — builds `public/sitemap.xml` (all ~365 routes).
- `public/geo/borders.json` — country + US-state outline data for the globe.
- `.claude/skills/` — vendored AI-Taste skills (gsap-interactions, data-globe).

## CI gotchas — DO NOT regress these (each was a hard-won fix)
- `deploy.yml` uses `npm install`, **not** `npm ci` — the Windows-generated
  lockfile omits the Linux Rollup binary, so `npm ci` fails on Linux CI.
- `vite.ssg.config.ts` sets `ssgOptions.entry = "src/main.ssg.tsx"`. Without it,
  vite-react-ssg reads index.html → main.tsx and the build dies with
  "createRoot is not a function".
- `src/routes.tsx` uses **eager imports** of page components, not `React.lazy`
  (vite-react-ssg's collectAssets can't introspect lazy components).
- `src/main.tsx` guards `createRoot` with `typeof document !== "undefined"` (SSG runs in Node).
- Anything touching `window`/`document`/WebGL must be client-only (inside
  `useEffect`/`useGSAP`). three.js loads via **dynamic `import()` inside useEffect**
  so it never enters the SSG/Node bundle.
- Editing files under `.github/workflows/` requires the PAT's **Workflows** permission.

## Current state / open items
- Homepage lander fully ported to React sections — live.
- **Hero globe is mid-redesign.** Options presented: A (split — text left, globe
  right), B (clean text-only hero, globe relocated to its own section), C (centered
  globe, executed better). Awaiting the user's pick. The live globe is a static
  Americas view (country + US-state outlines, Washington pulse ring) but reads poorly
  behind the centered headline — that's what we're fixing.
- Forms (free report, audit, footer contact) post to **Formspree placeholder URLs** —
  not wired to a real endpoint yet.
- Booking section is a "coming soon" calendar placeholder — no real scheduler.
- Inner pages (service/state/matrix) render but have stub/TODO body content.
- Hero uses a static dark background; `Bokeh_City.mp4` is gitignored (too big for Pages).

## Brand
Personal injury law firm marketing agency. Positioning: "one firm per state."
Based in Kona, Hawaii. Dark editorial palette: cream `#e8e2d4` + gold
`#c29b4f`/`#d4af6a` on near-black `#080807`. Fonts: Bebas Neue (display),
Cormorant Garamond (serif), DM Mono (body).
