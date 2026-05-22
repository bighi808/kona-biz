/**
 * WhyPillars — "Why Plaintiff Growth"
 * Two-column header: text LEFT, territory-lock animation RIGHT.
 * Six pillars grid full width below.
 *
 * Animation: A 5×3 grid of territory cells cascades in. A pin drops onto
 * the center cell, which flares gold. Two exclusion rings radiate outward,
 * dimming adjacent territories. A padlock materialises over the claimed cell.
 * "EXCLUSIVELY MANAGED" label fades in. Everything resets and loops.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const pillars = [
  {
    num: "01",
    title: "PI Firms Only",
    body: "We work exclusively with personal injury firms. No family law. No criminal defense. No generalist clients. We know PI marketing the way your best attorney knows PI law — deeply, specifically, and without distraction.",
  },
  {
    num: "02",
    title: "One Client Per State",
    body: "When we take your state, your competitors cannot become our clients. Ever. We are fully invested in making you the dominant firm in every city you serve. That exclusivity is structural — not a promise, a policy.",
  },
  {
    num: "03",
    title: "Competitors Locked Out",
    body: "Once your state is claimed, the other PI firms in your market are watching from the sidelines. We build their competitor's authority network, their content, their ad campaigns. Not theirs.",
  },
  {
    num: "04",
    title: "Custom Built. Never Templates.",
    body: "Every site, every page, every content piece is built from scratch for your firm and your market. No shared frameworks. No recycled strategies. No other firm gets what you get.",
  },
  {
    num: "05",
    title: "No Media Markups",
    body: "Your ad spend goes 100% to the platforms. We never mark up media. Our fee covers strategy and management only — so every dollar you spend on ads actually buys ads.",
  },
  {
    num: "06",
    title: "The PI Attorney Network",
    body: "Plaintiff Growth clients join a private, cross-state community of non-competing PI attorneys. Shared strategy, market insights, and referral opportunities. Launching 2027 — Command tier clients get early access.",
  },
];

/* ─── SVG layout constants ─────────────────────────────────────────── */
const CW = 56, CH = 42, G = 8;           // cell width, height, gap
const GX = 40,  GY = 88;                 // grid origin
const CC = 2,   CR = 1;                  // center cell col / row (0-indexed)
const CX = GX + CC * (CW + G) + CW / 2; // 196 — center of claimed cell (x)
const CY = GY + CR * (CH + G) + CH / 2; // 159 — center of claimed cell (y)
const CTOP = GY + CR * (CH + G);         // 138 — top edge of claimed cell

function TerritoryAnimation() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    /* ── Initial hidden state ── */
    gsap.set(".wpy-cell",         { opacity: 0 });
    gsap.set(".wpy-pin",          { y: -72, opacity: 0 });
    gsap.set(".wpy-ctr-glow",     { opacity: 0 });
    gsap.set(".wpy-ring-1",       { scale: 0.01, opacity: 0, transformOrigin: "center center" });
    gsap.set(".wpy-ring-2",       { scale: 0.01, opacity: 0, transformOrigin: "center center" });
    gsap.set(".wpy-lock",         { opacity: 0, scale: 0.25, transformOrigin: "center center" });
    gsap.set(".wpy-label",        { opacity: 0 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

    tl
      /* 1 ─ Grid cascades in left-to-right */
      .to(".wpy-cell", {
        opacity: 1, duration: 0.24,
        stagger: { amount: 0.52, from: "start" },
        ease: "power2.out",
      })

      /* 2 ─ Pin drops onto claimed cell */
      .to(".wpy-pin", {
        y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)",
      }, "+=0.3")

      /* 3 ─ Claimed cell flares gold */
      .to(".wpy-ctr-glow", { opacity: 1, duration: 0.32 }, "-=0.08")

      /* 4 ─ Surrounding cells dim */
      .to(".wpy-dim", { opacity: 0.16, duration: 0.55 }, "<")

      /* 5 ─ Ring 1 radiates */
      .set(".wpy-ring-1", { scale: 0.01, opacity: 0.7 })
      .to(".wpy-ring-1", {
        scale: 12, opacity: 0, duration: 1.3, ease: "power2.out",
        transformOrigin: "center center",
      })

      /* 6 ─ Ring 2 radiates (staggered) */
      .set(".wpy-ring-2",  { scale: 0.01, opacity: 0.45 }, "-=1.3")
      .to(".wpy-ring-2", {
        scale: 8.5, opacity: 0, duration: 1.0, ease: "power2.out",
        transformOrigin: "center center",
      }, "-=1.15")

      /* 7 ─ Lock snaps into place */
      .to(".wpy-lock", {
        opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)",
      }, "-=0.32")

      /* 8 ─ "EXCLUSIVELY MANAGED" fades in */
      .to(".wpy-label", { opacity: 1, duration: 0.4 })

      /* 9 ─ Hold */
      .to({}, { duration: 2.4 })

      /* 10 ─ Fade out (reverse stagger) */
      .to([".wpy-label", ".wpy-lock", ".wpy-pin", ".wpy-ctr-glow"], {
        opacity: 0, duration: 0.4, stagger: 0.07,
      })
      .to(".wpy-dim",  { opacity: 1, duration: 0.3 }, "<+0.1")
      .to(".wpy-cell", {
        opacity: 0, duration: 0.2,
        stagger: { amount: 0.3, from: "end" },
        ease: "power2.in",
      }, "-=0.15")

      /* 11 ─ Hard-reset positions for next loop */
      .set(".wpy-pin",    { y: -72 })
      .set(".wpy-lock",   { scale: 0.25 })
      .set(".wpy-ring-1", { scale: 0.01, opacity: 0 })
      .set(".wpy-ring-2", { scale: 0.01, opacity: 0 });

  }, { scope: wrapRef });

  /* Build 5×3 cell array */
  const cells = Array.from({ length: 5 * 3 }, (_, i) => {
    const c = i % 5, r = Math.floor(i / 5);
    return {
      key: `${c}-${r}`,
      x: GX + c * (CW + G),
      y: GY + r * (CH + G),
      isCenter: c === CC && r === CR,
    };
  });

  return (
    <div ref={wrapRef} className="flex items-center justify-center w-full select-none" style={{ minHeight: "295px" }}>
      <svg
        viewBox="0 0 392 295"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[440px]"
        aria-hidden="true"
      >

        {/* ── Territory cells ── */}
        {cells.map(({ key, x, y, isCenter }) => (
          <rect
            key={key} x={x} y={y} width={CW} height={CH} rx={3}
            fill={isCenter ? "rgba(22,21,16,0.95)" : "rgba(13,12,9,0.9)"}
            stroke={isCenter ? "rgba(194,155,79,0.22)" : "rgba(232,226,212,0.048)"}
            strokeWidth={isCenter ? 1.5 : 0.8}
            className={isCenter ? "wpy-cell" : "wpy-cell wpy-dim"}
          />
        ))}

        {/* ── Center cell gold glow overlay ── */}
        <rect
          className="wpy-ctr-glow"
          x={GX + CC * (CW + G)} y={GY + CR * (CH + G)}
          width={CW} height={CH} rx={3}
          fill="rgba(194,155,79,0.14)"
          stroke="rgba(236,186,108,0.9)" strokeWidth={1.5}
        />

        {/* ── Expansion rings (scale from their own centre) ── */}
        <circle className="wpy-ring-1" cx={CX} cy={CY} r={7}
          fill="none" stroke="rgba(194,155,79,0.65)" strokeWidth={1.5} />
        <circle className="wpy-ring-2" cx={CX} cy={CY} r={7}
          fill="none" stroke="rgba(194,155,79,0.38)" strokeWidth={1} />

        {/* ── Drop pin ── */}
        <g className="wpy-pin">
          {/* Shaft */}
          <line
            x1={CX} y1={CTOP}
            x2={CX} y2={CTOP - 16}
            stroke="rgba(236,186,108,0.88)" strokeWidth={1.5}
          />
          {/* Head outer ring */}
          <circle cx={CX} cy={CTOP - 24} r={7.5}
            fill="rgba(194,155,79,0.15)" stroke="rgba(236,186,108,0.92)" strokeWidth={1.5} />
          {/* Head inner dot */}
          <circle cx={CX} cy={CTOP - 24} r={3}
            fill="rgba(236,186,108,0.95)" />
        </g>

        {/* ── Padlock ── */}
        <g className="wpy-lock">
          {/* Shackle arc — U opening downward toward body */}
          <path
            d={`M ${CX - 7},${CY} A 7,9 0 0,0 ${CX + 7},${CY}`}
            fill="none" stroke="rgba(236,186,108,0.95)"
            strokeWidth={2} strokeLinecap="round"
          />
          {/* Body */}
          <rect
            x={CX - 10} y={CY} width={20} height={14} rx={2.5}
            fill="rgba(194,155,79,0.14)" stroke="rgba(236,186,108,0.95)" strokeWidth={1.5}
          />
          {/* Keyhole circle */}
          <circle cx={CX} cy={CY + 6} r={2.5} fill="rgba(236,186,108,0.92)" />
          {/* Keyhole slot */}
          <line
            x1={CX} y1={CY + 8.5}
            x2={CX} y2={CY + 11.5}
            stroke="rgba(236,186,108,0.92)" strokeWidth={2} strokeLinecap="round"
          />
        </g>

        {/* ── Status label ── */}
        <text
          className="wpy-label"
          x={CX} y={252}
          textAnchor="middle"
          fill="rgba(194,155,79,0.7)"
          style={{ fontFamily: "'DM Mono', monospace", fontSize: "8.5px", letterSpacing: "4px" }}
        >
          EXCLUSIVELY MANAGED
        </text>

      </svg>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────────────── */
export default function WhyPillars() {
  return (
    <section className="bg-card border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-12 py-28">

        {/* Two-column header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">

          {/* Left — text */}
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
              Why Plaintiff Growth
              <span className="h-px w-10 bg-gold opacity-40" />
            </p>
            <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
              Not an agency.<br />
              <em className="text-gold-light not-italic font-normal italic">A market weapon.</em>
            </h2>
            <p className="text-[16px] tracking-wide text-muted-foreground max-w-lg leading-loose">
              The model is different. The commitment is different. The results are different.
              Here is exactly how we work — and why no other agency can make the same offer.
            </p>
          </div>

          {/* Right — animation */}
          <TerritoryAnimation />

        </div>

        {/* Full-width pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="group relative bg-card p-10 overflow-hidden transition-colors duration-400 hover:bg-[#161613]"
            >
              <span className="absolute top-0 left-0 w-0.5 h-0 bg-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-full" />
              <div
                className="display-font text-[#282820] leading-none mb-5 inline-block origin-left
                           transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                           group-hover:text-gold group-hover:scale-[1.22]
                           group-hover:[text-shadow:0_0_40px_rgba(194,155,79,0.5),0_0_80px_rgba(194,155,79,0.2)]"
                style={{ fontSize: "56px" }}
              >
                {p.num}
              </div>
              <h3 className="font-serif text-2xl text-cream mb-3 transition-colors duration-400 group-hover:text-gold-light">
                {p.title}
              </h3>
              <p className="text-[15px] leading-loose tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-[#b8b0a4]">
                {p.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
