/**
 * Services grid — 6 disciplines, each card a link to the service page.
 *
 * Layout: gap-3 grid, each card has its own 1px gold-tinted border.
 * GSAP scroll reveal: stagger-from-center scale.
 * GSAP hover: lighter bg, gold edge glow (box-shadow), watermark reveal,
 *             shortname + title color — all 0.65s, no layout-shifting animations.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

// Card bg: dark rest → lighter warm on hover (same hue family, alpha-only would require rgba)
const CARD_REST  = "#111009";
const CARD_HOVER = "#1e1c13";

// Box-shadow: no glow at rest → gold edge glow on hover
const SHADOW_REST  = "0 0 0px 0px rgba(187,147,84,0), 0 0 0px rgba(187,147,84,0)";
const SHADOW_HOVER = "0 0 0px 1px rgba(187,147,84,0.55), 0 0 28px rgba(187,147,84,0.18)";

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];
    if (!gridRef.current || !cards.length) return;

    // Init: GSAP owns bg, shadow, watermark
    gsap.set(cards, { backgroundColor: CARD_REST, boxShadow: SHADOW_REST });
    cards.forEach(card => {
      const wm = card.querySelector(".svc-watermark") as HTMLElement | null;
      if (wm) gsap.set(wm, { xPercent: -50, yPercent: -50, scale: 0.65, color: "transparent" });
    });

    // Scroll reveal — fromTo + autoAlpha so cards are never permanently hidden
    gsap.fromTo(cards,
      { autoAlpha: 0, scale: 0.9, y: 36 },
      {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        duration: 1.1,
        stagger: { each: 0.11, from: "center", grid: [2, 3] },
        ease: "expo.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
      }
    );

    // Hover — 0.65s, no letterSpacing/fontSize (causes layout jank)
    cards.forEach(card => {
      const watermark = card.querySelector(".svc-watermark") as HTMLElement | null;
      const shortname = card.querySelector(".svc-shortname") as HTMLElement | null;
      const title     = card.querySelector(".svc-title")     as HTMLElement | null;

      card.addEventListener("mouseenter", () => {
        gsap.to(card, { backgroundColor: CARD_HOVER, boxShadow: SHADOW_HOVER, duration: 0.65, ease: "power2.out", overwrite: "auto" });
        if (watermark) gsap.to(watermark, { scale: 1,    color: "rgba(187,147,84,0.09)", duration: 1.2, ease: "power2.out", overwrite: "auto" });
        if (shortname) gsap.to(shortname, { opacity: 1,  color: "#e8c97a",               duration: 0.65, ease: "power2.out", overwrite: "auto" });
        if (title)     gsap.to(title,     { color: "#CCA86F",                             duration: 0.65, ease: "power2.out", overwrite: "auto" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, { backgroundColor: CARD_REST, boxShadow: SHADOW_REST, duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
        if (watermark) gsap.to(watermark, { scale: 0.65, color: "transparent",             duration: 1.2, ease: "power2.inOut", overwrite: "auto" });
        if (shortname) gsap.to(shortname, { opacity: 0.7, color: "#BB9354",                duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
        if (title)     gsap.to(title,     { color: "#BB9354",                              duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-background border-t border-b border-border" id="services">
      <div className="max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          What We Do
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Full-stack domination.<br />
          <em className="text-gold-light not-italic font-normal italic">One firm. Every channel.</em>
        </h2>
        <p className="text-[16px] tracking-wide text-muted-foreground max-w-lg leading-loose">
          Six integrated disciplines. Every one managed exclusively for your firm in your state.
        </p>

        {/* gap-3 spacing + each card has its own border (no shared bg trick) */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-16">
          {services.map((svc, i) => {
            const cardDesc = SHORT_DESC[svc.slug] || svc.intro;
            return (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                ref={el => { cardsRef.current[i] = el as HTMLAnchorElement; }}
                className="relative p-11 overflow-hidden no-underline block"
                style={{
                  border: "1px solid rgba(187,147,84,0.18)",
                }}
              >
                {/* Watermark — GSAP owns xPercent/yPercent/scale/color */}
                <span
                  className="svc-watermark display-font absolute top-1/2 left-1/2 leading-none whitespace-nowrap pointer-events-none"
                  style={{ fontSize: "180px", letterSpacing: "0.08em" }}
                  aria-hidden
                >
                  {svc.shortName.toUpperCase()}
                </span>

                {/* Short label */}
                <span
                  className="svc-shortname relative z-10 display-font text-[11px] mb-5 block"
                  style={{ letterSpacing: "0.4em", color: "#BB9354", opacity: 0.7 }}
                >
                  {svc.shortName.toUpperCase()}
                </span>

                {/* Title */}
                <h4
                  className="svc-title relative z-10 font-serif text-[2rem] mb-3 leading-snug"
                  style={{ color: "#BB9354" }}
                >
                  {svc.name}
                </h4>

                <p className="relative z-10 text-[14px] leading-loose tracking-wide text-muted-foreground">
                  {cardDesc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Tight homepage-card descriptions (long-form descriptions live in services.ts)
const SHORT_DESC: Record<string, string> = {
  "personal-injury-website-design":
    "Authority-grade sites with a page for every city you serve and every case type you handle. Custom backend included — analytics, CMS, review system, rank tracker.",
  "personal-injury-seo":
    "Local authority networks, hub-and-spoke content, press release link building — plus AI platform optimization for ChatGPT, Perplexity, and Google AI Overviews.",
  "personal-injury-ppc":
    "Google Ads, LSA, and Meta campaigns built for signed cases. High-intent targeting, state and city specific. Media billed at cost — no markups, ever.",
  "law-firm-ai-consulting":
    "Strategic consulting on AI in your practice plus custom agent development — intake automation, client communication, internal workflows.",
  "google-business-profile-law-firms":
    "Google Business Profile setup and active management, review generation, and complete profiles across Avvo, Justia, FindLaw, Martindale-Hubbell, and Lawyers.com.",
  "legal-content-marketing":
    "Ongoing SEO content, social creation and scheduling, YouTube lead generation, email and SMS nurture, and AI professional headshots — delivered monthly, branded to your firm.",
};
