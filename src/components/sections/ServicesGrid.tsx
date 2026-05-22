/**
 * Services grid — "What We Do"
 *
 * Header: two-column — StackEngine SVG animation (left), section copy (right).
 * Below: 6 service cards, full-width 3-col grid.
 *
 * GSAP scroll reveal: stagger-from-center scale.
 * GSAP hover: card bg, watermark, shortname, title — 0.65s smooth.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { services } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const CARD_REST  = "#111009";
const CARD_HOVER = "#1e1c13";
const SHADOW_REST  = "0 0 0px 0px rgba(187,147,84,0), 0 0 0px rgba(187,147,84,0)";
const SHADOW_HOVER = "0 0 0px 1px rgba(187,147,84,0.55), 0 0 28px rgba(187,147,84,0.18)";

// ── Stack Engine SVG animation ─────────────────────────────────────────────
function StackEngineAnimation() {
  return (
    <div style={{ width: "100%", maxWidth: "480px" }}>
      <svg
        className="pg-stack-engine"
        viewBox="0 0 560 560"
        role="img"
        aria-labelledby="stackEngineTitle stackEngineDesc"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", display: "block", background: "transparent" }}
      >
        <title id="stackEngineTitle">Six Discipline Marketing System Animation</title>
        <desc id="stackEngineDesc">Six integrated marketing disciplines orbit a central law firm authority core, sending coordinated signals into one dominant system.</desc>
        <style>{`
          .pgse-gold        { stroke: #ECBA6C; }
          .pgse-gold-fill   { fill:   #ECBA6C; }
          .pgse-soft-line   { stroke: rgba(236,186,108,0.16); }
          .pgse-mid-line    { stroke: rgba(236,186,108,0.34); }
          .pgse-bright-line { stroke: rgba(236,186,108,0.82); }
          .pgse-line  { fill: none; stroke-width: 1; vector-effect: non-scaling-stroke; }
          .pgse-thin  { stroke-width: 0.75; }
          .pgse-ring  { fill: none; stroke-width: 1; vector-effect: non-scaling-stroke; }
          .pgse-label {
            fill: rgba(236,186,108,0.72);
            font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
            font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-anchor: middle;
          }
          .pgse-mini-label {
            fill: rgba(236,186,108,0.42);
            font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
            font-size: 7px; letter-spacing: 0.16em; text-anchor: middle;
          }
          .pgse-glow { filter: url(#pgseGlow); }
          .pgse-field {
            opacity: 0.42;
            animation: pgseFieldBreath 14s ease-in-out infinite;
          }
          .pgse-system-ring {
            stroke-dasharray: 18 14;
            transform-origin: 280px 280px;
            animation: pgseSystemRotate 36s linear infinite;
          }
          .pgse-core-ring {
            opacity: 0.48;
            transform-origin: 280px 280px;
            animation: pgseCoreRing 14s ease-in-out infinite;
          }
          .pgse-core-halo {
            transform-origin: 280px 280px;
            animation: pgseCoreHalo 14s ease-in-out infinite;
          }
          .pgse-core-dot {
            transform-origin: 280px 280px;
            animation: pgseCoreDot 14s ease-in-out infinite;
          }
          .pgse-channel-line {
            stroke-dasharray: 170;
            stroke-dashoffset: 170;
            opacity: 0.18;
            animation: pgseLineFeed 14s ease-in-out infinite;
          }
          .pgse-channel-node {
            transform-box: fill-box;
            transform-origin: center;
            opacity: 0.38;
            animation: pgseNodePulse 14s ease-in-out infinite;
          }
          .pgse-channel-label {
            opacity: 0.46;
            animation: pgseLabelPulse 14s ease-in-out infinite;
          }
          .pgse-channel-1, .pgse-line-1, .pgse-label-1 { animation-delay: 0s; }
          .pgse-channel-2, .pgse-line-2, .pgse-label-2 { animation-delay: 0.55s; }
          .pgse-channel-3, .pgse-line-3, .pgse-label-3 { animation-delay: 1.1s; }
          .pgse-channel-4, .pgse-line-4, .pgse-label-4 { animation-delay: 1.65s; }
          .pgse-channel-5, .pgse-line-5, .pgse-label-5 { animation-delay: 2.2s; }
          .pgse-channel-6, .pgse-line-6, .pgse-label-6 { animation-delay: 2.75s; }
          .pgse-orbit-pulse {
            transform-origin: 280px 280px;
            opacity: 0.42;
            animation: pgseOrbitPulse 14s linear infinite;
          }
          .pgse-orbit-pulse-two {
            transform-origin: 280px 280px;
            opacity: 0.28;
            animation: pgseOrbitPulseTwo 14s linear infinite;
          }
          .pgse-integration-ring {
            opacity: 0;
            transform-origin: 280px 280px;
            animation: pgseIntegrationRing 14s ease-in-out infinite;
          }
          .pgse-sweep {
            transform-origin: 280px 280px;
            opacity: 0.12;
            animation: pgseSweep 14s ease-in-out infinite;
          }
          @keyframes pgseFieldBreath {
            0%, 100% { opacity: 0.24; } 42% { opacity: 0.58; } 72% { opacity: 0.36; }
          }
          @keyframes pgseSystemRotate {
            from { transform: rotate(0deg); } to { transform: rotate(360deg); }
          }
          @keyframes pgseCoreRing {
            0%, 100% { opacity: 0.28; transform: scale(0.96); }
            34%       { opacity: 0.64; transform: scale(1.03); }
            68%       { opacity: 0.42; transform: scale(1);    }
          }
          @keyframes pgseCoreHalo {
            0%, 100% { opacity: 0.14; transform: scale(0.82); }
            38%      { opacity: 0.5;  transform: scale(1.1);  }
            72%      { opacity: 0.26; transform: scale(0.98); }
          }
          @keyframes pgseCoreDot {
            0%, 100% { opacity: 0.78; transform: scale(1);    }
            40%      { opacity: 1;    transform: scale(1.16); }
            72%      { opacity: 0.86; transform: scale(1.03); }
          }
          @keyframes pgseLineFeed {
            0%   { stroke-dashoffset: 170;  opacity: 0.08; }
            18%  { stroke-dashoffset: 0;    opacity: 0.7;  }
            44%  { stroke-dashoffset: 0;    opacity: 0.38; }
            74%  { stroke-dashoffset: -170; opacity: 0.08; }
            100% { stroke-dashoffset: -170; opacity: 0.08; }
          }
          @keyframes pgseNodePulse {
            0%, 100% { opacity: 0.28; transform: scale(1);    }
            16%      { opacity: 1;    transform: scale(1.13); }
            44%      { opacity: 0.54; transform: scale(1);    }
          }
          @keyframes pgseLabelPulse {
            0%, 100% { opacity: 0.34; } 16% { opacity: 0.92; } 44% { opacity: 0.48; }
          }
          @keyframes pgseOrbitPulse {
            from { transform: rotate(0deg); } to { transform: rotate(360deg); }
          }
          @keyframes pgseOrbitPulseTwo {
            from { transform: rotate(180deg); } to { transform: rotate(-180deg); }
          }
          @keyframes pgseIntegrationRing {
            0%, 38% { opacity: 0;    transform: scale(0.74); }
            52%     { opacity: 0.46; transform: scale(1);    }
            72%     { opacity: 0;    transform: scale(1.18); }
            100%    { opacity: 0;    transform: scale(1.18); }
          }
          @keyframes pgseSweep {
            0%, 100% { opacity: 0.08; transform: rotate(-24deg); }
            44%      { opacity: 0.2;  transform: rotate(18deg);  }
            74%      { opacity: 0.1;  transform: rotate(34deg);  }
          }
          @media (prefers-reduced-motion: reduce) {
            .pg-stack-engine * { animation: none !important; }
            .pgse-channel-line  { stroke-dashoffset: 0; opacity: 0.44; }
            .pgse-channel-node, .pgse-channel-label { opacity: 0.72; }
            .pgse-integration-ring { opacity: 0.26; transform: scale(1); }
          }
        `}</style>
        <defs>
          <filter id="pgseGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0 0 0 0.925  0 1 0 0 0.729  0 0 1 0 0.424  0 0 0 0.56 0"
              result="goldBlur" />
            <feMerge><feMergeNode in="goldBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="pgseCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ECBA6C" stopOpacity="0.9"  />
            <stop offset="56%"  stopColor="#ECBA6C" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ECBA6C" stopOpacity="0"    />
          </radialGradient>
          <linearGradient id="pgseSweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ECBA6C" stopOpacity="0"    />
            <stop offset="48%"  stopColor="#ECBA6C" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#ECBA6C" stopOpacity="0"    />
          </linearGradient>
        </defs>

        {/* Faint command field */}
        <g className="pgse-field">
          <circle className="pgse-ring pgse-soft-line" cx="280" cy="280" r="214" />
          <circle className="pgse-ring pgse-soft-line" cx="280" cy="280" r="166" />
          <circle className="pgse-ring pgse-soft-line" cx="280" cy="280" r="96"  />
          <path className="pgse-line pgse-soft-line pgse-thin" d="M92 280H468" />
          <path className="pgse-line pgse-soft-line pgse-thin" d="M280 92V468" />
          <path className="pgse-line pgse-soft-line pgse-thin" d="M139 139L421 421" />
          <path className="pgse-line pgse-soft-line pgse-thin" d="M421 139L139 421" />
        </g>

        {/* Slow rotating segmented system ring */}
        <circle className="pgse-ring pgse-soft-line pgse-system-ring" cx="280" cy="280" r="204" />

        {/* Subtle sweep */}
        <path className="pgse-sweep" d="M280 280L280 78A202 202 0 0 1 455 179Z" fill="url(#pgseSweepGradient)" />

        {/* Six integrated discipline paths */}
        <g>
          <path className="pgse-line pgse-mid-line pgse-channel-line pgse-line-1" d="M280 280L280 92"  />
          <path className="pgse-line pgse-mid-line pgse-channel-line pgse-line-2" d="M280 280L443 186" />
          <path className="pgse-line pgse-mid-line pgse-channel-line pgse-line-3" d="M280 280L443 374" />
          <path className="pgse-line pgse-mid-line pgse-channel-line pgse-line-4" d="M280 280L280 468" />
          <path className="pgse-line pgse-mid-line pgse-channel-line pgse-line-5" d="M280 280L117 374" />
          <path className="pgse-line pgse-mid-line pgse-channel-line pgse-line-6" d="M280 280L117 186" />
        </g>

        {/* Channel nodes and labels */}
        <g>
          {/* WEB */}
          <g className="pgse-channel-node pgse-channel-1">
            <circle className="pgse-ring pgse-mid-line" cx="280" cy="92" r="28" />
            <circle className="pgse-gold-fill pgse-glow"  cx="280" cy="92" r="4.5" />
          </g>
          <text className="pgse-label pgse-channel-label pgse-label-1" x="280" y="57">WEB</text>
          <text className="pgse-mini-label pgse-channel-label pgse-label-1" x="280" y="125">SITE</text>
          {/* SEO */}
          <g className="pgse-channel-node pgse-channel-2">
            <circle className="pgse-ring pgse-mid-line" cx="443" cy="186" r="28" />
            <circle className="pgse-gold-fill pgse-glow"  cx="443" cy="186" r="4.5" />
          </g>
          <text className="pgse-label pgse-channel-label pgse-label-2" x="478" y="176">SEO</text>
          <text className="pgse-mini-label pgse-channel-label pgse-label-2" x="478" y="195">RANK</text>
          {/* ADS */}
          <g className="pgse-channel-node pgse-channel-3">
            <circle className="pgse-ring pgse-mid-line" cx="443" cy="374" r="28" />
            <circle className="pgse-gold-fill pgse-glow"  cx="443" cy="374" r="4.5" />
          </g>
          <text className="pgse-label pgse-channel-label pgse-label-3" x="478" y="366">ADS</text>
          <text className="pgse-mini-label pgse-channel-label pgse-label-3" x="478" y="385">INTENT</text>
          {/* GBP */}
          <g className="pgse-channel-node pgse-channel-4">
            <circle className="pgse-ring pgse-mid-line" cx="280" cy="468" r="28" />
            <circle className="pgse-gold-fill pgse-glow"  cx="280" cy="468" r="4.5" />
          </g>
          <text className="pgse-label pgse-channel-label pgse-label-4" x="280" y="514">GBP</text>
          <text className="pgse-mini-label pgse-channel-label pgse-label-4" x="280" y="491">LOCAL</text>
          {/* CONTENT */}
          <g className="pgse-channel-node pgse-channel-5">
            <circle className="pgse-ring pgse-mid-line" cx="117" cy="374" r="28" />
            <circle className="pgse-gold-fill pgse-glow"  cx="117" cy="374" r="4.5" />
          </g>
          <text className="pgse-label pgse-channel-label pgse-label-5" x="82" y="366">CONTENT</text>
          <text className="pgse-mini-label pgse-channel-label pgse-label-5" x="82" y="385">TRUST</text>
          {/* AI */}
          <g className="pgse-channel-node pgse-channel-6">
            <circle className="pgse-ring pgse-mid-line" cx="117" cy="186" r="28" />
            <circle className="pgse-gold-fill pgse-glow"  cx="117" cy="186" r="4.5" />
          </g>
          <text className="pgse-label pgse-channel-label pgse-label-6" x="82" y="176">AI</text>
          <text className="pgse-mini-label pgse-channel-label pgse-label-6" x="82" y="195">OPS</text>
        </g>

        {/* Moving system pulses */}
        <g className="pgse-orbit-pulse">
          <circle className="pgse-gold-fill pgse-glow" cx="280" cy="76" r="2.8" />
        </g>
        <g className="pgse-orbit-pulse-two">
          <circle className="pgse-gold-fill pgse-glow" cx="280" cy="114" r="2.2" />
        </g>

        {/* Integration pulse ring */}
        <circle className="pgse-ring pgse-gold pgse-integration-ring pgse-glow" cx="280" cy="280" r="150" />

        {/* Central firm authority core */}
        <g>
          <circle className="pgse-core-halo"                   cx="280" cy="280" r="64" fill="url(#pgseCoreGradient)" />
          <circle className="pgse-ring pgse-soft-line pgse-core-ring" cx="280" cy="280" r="72" />
          <circle className="pgse-ring pgse-mid-line"           cx="280" cy="280" r="42" />
          <circle className="pgse-ring pgse-gold"               cx="280" cy="280" r="22" />
          <circle className="pgse-core-dot pgse-gold-fill pgse-glow" cx="280" cy="280" r="5.8" />
          <text className="pgse-mini-label" x="280" y="321">ONE FIRM</text>
        </g>
      </svg>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];
    if (!gridRef.current || !cards.length) return;

    gsap.set(cards, { backgroundColor: CARD_REST, boxShadow: SHADOW_REST });
    cards.forEach(card => {
      const wm = card.querySelector(".svc-watermark") as HTMLElement | null;
      if (wm) gsap.set(wm, { xPercent: -50, yPercent: -50, scale: 0.65, color: "transparent" });
    });

    gsap.fromTo(cards,
      { autoAlpha: 0, scale: 0.9, y: 36 },
      {
        autoAlpha: 1, scale: 1, y: 0,
        duration: 1.1,
        stagger: { each: 0.11, from: "center", grid: [2, 3] },
        ease: "expo.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
      }
    );

    cards.forEach(card => {
      const watermark = card.querySelector(".svc-watermark") as HTMLElement | null;
      const shortname = card.querySelector(".svc-shortname") as HTMLElement | null;
      const title     = card.querySelector(".svc-title")     as HTMLElement | null;

      card.addEventListener("pointerenter", (evt) => {
        if ((evt as PointerEvent).pointerType !== "mouse") return;
        gsap.to(card,      { backgroundColor: CARD_HOVER, boxShadow: SHADOW_HOVER, duration: 0.65, ease: "power2.out",   overwrite: "auto" });
        if (watermark) gsap.to(watermark, { scale: 1,    color: "rgba(187,147,84,0.09)", duration: 1.2,  ease: "power2.out",   overwrite: "auto" });
        if (shortname) gsap.to(shortname, { opacity: 1,  color: "#e8c97a",               duration: 0.65, ease: "power2.out",   overwrite: "auto" });
        if (title)     gsap.to(title,     { color: "#CCA86F",                             duration: 0.65, ease: "power2.out",   overwrite: "auto" });
      });

      card.addEventListener("pointerleave", (evt) => {
        if ((evt as PointerEvent).pointerType !== "mouse") return;
        gsap.to(card,      { backgroundColor: CARD_REST,  boxShadow: SHADOW_REST,  duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
        if (watermark) gsap.to(watermark, { scale: 0.65, color: "transparent",             duration: 1.2,  ease: "power2.inOut", overwrite: "auto" });
        if (shortname) gsap.to(shortname, { opacity: 0.7, color: "#BB9354",                duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
        if (title)     gsap.to(title,     { color: "#BB9354",                              duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="border-t border-b border-border" id="services" style={{ backgroundColor: "#0e0c03" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28">

        {/* Two-column header — animation left, copy right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 lg:mb-20">
          <div className="hidden lg:block">
            <StackEngineAnimation />
          </div>
          <div>
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
          </div>
        </div>

        {/* Six service cards — full width */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((svc, i) => {
            const cardDesc = SHORT_DESC[svc.slug] || svc.intro;
            return (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                ref={el => { cardsRef.current[i] = el as HTMLAnchorElement; }}
                className="relative p-11 overflow-hidden no-underline block"
                style={{ border: "1px solid rgba(187,147,84,0.18)" }}
              >
                <span
                  className="svc-watermark display-font absolute top-1/2 left-1/2 leading-none whitespace-nowrap pointer-events-none"
                  style={{ fontSize: "180px", letterSpacing: "0.08em" }}
                  aria-hidden
                >
                  {svc.shortName.toUpperCase()}
                </span>
                <span
                  className="svc-shortname relative z-10 display-font text-[11px] mb-5 block"
                  style={{ letterSpacing: "0.4em", color: "#BB9354", opacity: 0.7 }}
                >
                  {svc.shortName.toUpperCase()}
                </span>
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
