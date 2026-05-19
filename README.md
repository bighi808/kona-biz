# kona-biz

Marketing site and supporting assets for **Kona.biz** — a personal injury law firm marketing agency. One firm per state. Based in Kona, Hawaii.

## Tech stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui** (slate base, custom Kona.biz tokens)
- **vite-react-ssg** for static site generation (every route → real HTML at build time)
- **react-helmet-async** for per-page `<head>` and JSON-LD structured data
- **react-hook-form** + **zod** for forms
- **lucide-react** for icons
- GitHub Actions → GitHub Pages

## Project structure

```
src/
  pages/             # Route components (Index, ServicesHub, ServicePage, etc.)
  components/
    layout/          # Layout, Navbar, Footer
    ui/              # shadcn/ui components
    SEOHead.tsx      # Per-page meta + JSON-LD schema
  data/
    services.ts      # 6 matrix services (typed)
    states.ts        # 50 states with market status (typed)
    marketStatus.ts  # Status enum + labels
  routes.tsx         # vite-react-ssg routes with getStaticPaths
  App.tsx            # Standard CSR router
  main.tsx           # CSR entry
  main.ssg.tsx       # SSG entry
  index.css          # Tailwind + Kona.biz palette tokens
scripts/
  generate-sitemap.js   # Generates public/sitemap.xml for all 365 routes
public/
  robots.txt            # STAGING: blocks all crawlers — swap at launch
  sitemap.xml           # Generated at build time
```

## SEO architecture

Data-driven matrix model: **6 services × 50 states = 300 unique landing pages**, plus 6 service hubs, 50 state hubs, and core pages = **~365 routes total**. Every URL is pre-rendered to static HTML by `vite-react-ssg` at build time.

URL patterns:

- `/` — homepage
- `/services` — services hub
- `/services/{service-slug}` — individual service page (e.g. `/services/personal-injury-seo`)
- `/services/{service-slug}/{state-slug}` — matrix page (e.g. `/services/personal-injury-seo/texas`)
- `/states` — states hub
- `/states/{state-slug}` — individual state page

Market status system: each state has one of four statuses — `available`, `claimed`, `managed`, `waitlist` — defined in `src/data/marketStatus.ts`. The page templates branch on status for CTA behavior.

## Development

```bash
npm install        # Install deps
npm run dev        # Vite dev server with HMR — http://localhost:8080
npm run build      # Standard CSR build
npm run build:ssg  # Static site generation (all 365 routes pre-rendered)
npm run build:production  # Sitemap + SSG build
npm run preview    # Preview the build locally
```

## Legacy files

The folder also contains the original single-file lander and supporting documents:

- `konabiz-lander.html` — the original pre-framework lander. Content will be ported into `src/pages/Index.tsx` and split into components over time.
- `draft-konabiz-packages-v3.html` — pricing/packages page draft (to be migrated into the framework)
- `draft-konabiz-site-architecture.html` — IA reference document
- `konabiz-pi-domination-report.docx` — the lead magnet promised by the lander
- `konabiz-marketing-arsenal.docx` — outbound sales playbook
- `hero-image1.jpg` — hero asset
- `*.mp4` — gitignored (host on CDN)
