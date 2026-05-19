# kona-biz

Marketing site and supporting assets for **Kona.biz** — a personal injury law firm marketing agency. One firm per state. Based in Kona, Hawaii.

## What's in here

### Landing page
- **`konabiz-lander.html`** — Single-file HTML/CSS/JS landing page. Hero video, exclusivity ticker, services grid, six-node methodology diagram, comparison table, 50-state availability map, free-report capture form, $497 audit upsell with 2-step form, FAQ accordion, 30-minute strategy-call booking widget, footer contact form.

### Future pages (drafts)
- **`draft-konabiz-packages-v3.html`** — Pricing / packages page. Per-page build pricing, four worked example builds (Solo / Regional / Foster Law / Dominant), three retainer tiers (Maintain $2,500 / Grow $5,000 / Command $8,500), video add-on tiers, Kona.biz Intelligence Brief newsletter.
- **`draft-konabiz-site-architecture.html`** — IA and sitemap for the full kona.biz site. 365 pages total: 6 matrix services × 50 state pages = 300 matrix pages, plus state hubs, service hubs, and core pages. Four-state market-status system (Available / Claimed / Exclusively Managed / On Waitlist).

### Deliverables
- **`konabiz-pi-domination-report.docx`** — The lead magnet promised by the lander's free-report form. Eight chapters covering search landscape, local SEO, GEO, paid ads, AI in practice, and the deployed system. Convert to PDF before wiring it up for auto-delivery.
- **`konabiz-marketing-arsenal.docx`** — Outbound playbook: value framework, Google + Meta ad copy, three Meta video scripts, cold email and LinkedIn templates, Day 4 / 10 / 21 follow-up sequence, five-section discovery-call pitch.

### Assets
- **`hero-image1.jpg`** — Static hero fallback (still referenced in the CSS as the original background).

## Excluded from this repo

Video files (`*.mp4`) are gitignored — GitHub blocks files over 100 MB and warns over 50 MB. The lander currently references `Bokeh_City.mp4` as the hero video. Either revert the hero to the static `hero-image1.jpg`, or host the videos on a CDN (Cloudflare R2, Bunny, Vimeo) and update the `<video>` source in the lander.

## Running locally

It's a static site. Open `konabiz-lander.html` directly in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000/konabiz-lander.html`.
