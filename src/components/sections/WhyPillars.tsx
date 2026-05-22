/**
 * WhyPillars — "Why Plaintiff Growth"
 * Editorial full-width row layout. No card boxes.
 * GSAP ScrollTrigger: rows stagger up, rules draw left-to-right, numbers pulse gold.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { num: "01", title: "PI Firms Only", body: "We work exclusively with personal injury firms. No family law. No criminal defense. No generalist clients. We know PI marketing the way your best attorney knows PI law — deeply, specifically, and without distraction." },
  { num: "02", title: "One Client Per State", body: "When we take your state, your competitors cannot become our clients. Ever. We are fully invested in making you the dominant firm in every city you serve. That exclusivity is structural — not a promise, a policy." },
  { num: "03", title: "Competitors Locked Out", body: "Once your state is claimed, the other PI firms in your market are watching from the sidelines. We build their competitor's authority network, their content, their ad campaigns. Not theirs." },
  { num: "04", title: "Custom Built. Never Templates.", body: "Every site, every page, every content piece is built from scratch for your firm and your market. No shared frameworks. No recycled strategies. No other firm gets what you get." },
  { num: "05", title: "No Media Markups", body: "Your ad spend goes 100% to the platforms. We never mark up media. Our fee covers strategy and management only — so every dollar you spend on ads actually buys ads." },
  { num: "06", title: "The PI Attorney Network", body: "Plaintiff Growth clients join a private, cross-state community of non-competing PI attorneys. Shared strategy, market insights, and referral opportunities. Launching 2027 — Command tier clients get early access." },
];

function ClaimedMarketAnimation() {
  return (
    <div className="pg-claimed-node-wrap">
      <svg
        className="pg-claimed-node"
        viewBox="0 0 560 560"
        role="img"
        aria-labelledby="claimedNodeTitle claimedNodeDesc"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="claimedNodeTitle">Claimed Market Animation</title>
        <desc id="claimedNodeDesc">
          A single selected authority node is protected by an animated perimeter ring while outside competitor signals are denied entry.
        </desc>
        <defs>
          <filter id="pgGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur" type="matrix"
              values="1 0 0 0 0.925  0 1 0 0 0.729  0 0 1 0 0.424  0 0 0 0.55 0"
              result="goldBlur"
            />
            <feMerge>
              <feMergeNode in="goldBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="pgCoreGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ECBA6C" stopOpacity="0.95" />
            <stop offset="58%"  stopColor="#ECBA6C" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ECBA6C" stopOpacity="0"    />
          </radialGradient>
        </defs>
        <g className="pg-grid">
          <path className="pg-line pg-soft-line pg-thin" d="M120 280H440" />
          <path className="pg-line pg-soft-line pg-thin" d="M280 120V440" />
          <path className="pg-line pg-soft-line pg-thin" d="M155 155L405 405" />
          <path className="pg-line pg-soft-line pg-thin" d="M405 155L155 405" />
          <circle className="pg-ring pg-soft-line" cx="280" cy="280" r="196" />
          <circle className="pg-ring pg-soft-line" cx="280" cy="280" r="142" />
        </g>
        <g className="pg-corner-mark">
          <path className="pg-line pg-mid-line" d="M122 114H164" />
          <path className="pg-line pg-mid-line" d="M114 122V164" />
          <path className="pg-line pg-mid-line" d="M396 114H438" />
          <path className="pg-line pg-mid-line" d="M446 122V164" />
          <path className="pg-line pg-mid-line" d="M122 446H164" />
          <path className="pg-line pg-mid-line" d="M114 396V438" />
          <path className="pg-line pg-mid-line" d="M396 446H438" />
          <path className="pg-line pg-mid-line" d="M446 396V438" />
        </g>
        <g>
          <circle className="pg-exterior-node pg-exterior-node-a pg-faint-fill" cx="68"  cy="260" r="4.5" />
          <circle className="pg-exterior-node pg-exterior-node-b pg-faint-fill" cx="492" cy="210" r="4"   />
          <circle className="pg-exterior-node pg-exterior-node-c pg-faint-fill" cx="420" cy="500" r="3.8" />
          <path className="pg-line pg-mid-line pg-denied-line pg-denied-line-a" d="M74 260C120 258 151 262 177 274" />
          <path className="pg-line pg-mid-line pg-denied-line pg-denied-line-b" d="M486 214C444 227 414 241 383 262" />
          <path className="pg-line pg-mid-line pg-denied-line pg-denied-line-c" d="M416 494C390 456 372 421 352 382" />
        </g>
        <circle className="pg-ring pg-gold pg-barrier-flash" cx="280" cy="280" r="166" />
        <circle className="pg-ring pg-soft-line pg-outer-ring"    cx="280" cy="280" r="186" />
        <circle className="pg-ring pg-mid-line pg-inner-ring"     cx="280" cy="280" r="112" />
        <circle className="pg-ring pg-gold pg-protected-ring pg-glow" cx="280" cy="280" r="166" />
        <g>
          <path className="pg-line pg-mid-line pg-internal-line" d="M280 280L210 216" />
          <path className="pg-line pg-mid-line pg-internal-line" d="M280 280L356 226" />
          <path className="pg-line pg-mid-line pg-internal-line" d="M280 280L198 342" />
          <path className="pg-line pg-mid-line pg-internal-line" d="M280 280L366 356" />
          <circle className="pg-support-node pg-gold-fill" cx="210" cy="216" r="3.6" />
          <circle className="pg-support-node pg-gold-fill" cx="356" cy="226" r="3.6" />
          <circle className="pg-support-node pg-gold-fill" cx="198" cy="342" r="3.6" />
          <circle className="pg-support-node pg-gold-fill" cx="366" cy="356" r="3.6" />
        </g>
        <g className="pg-orbit-dot-a">
          <circle className="pg-gold-fill pg-glow" cx="280" cy="114" r="2.9" />
        </g>
        <g className="pg-orbit-dot-b">
          <circle className="pg-gold-fill pg-glow" cx="280" cy="168" r="2.4" />
        </g>
        <g>
          <circle className="pg-core-halo" cx="280" cy="280" r="54" fill="url(#pgCoreGradient)" />
          <circle className="pg-ring pg-mid-line"          cx="280" cy="280" r="34" />
          <circle className="pg-ring pg-gold"              cx="280" cy="280" r="18" />
          <circle className="pg-core pg-gold-fill pg-glow" cx="280" cy="280" r="5.5" />
        </g>
      </svg>
    </div>
  );
}

export default function WhyPillars() {
  const sectionRef  = useRef<HTMLElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);
  const rowsRef     = useRef<(HTMLDivElement | null)[]>([]);
  const rulesRef    = useRef<(HTMLDivElement | null)[]>([]);
  const numsRef     = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const rows  = rowsRef.current.filter(Boolean)  as HTMLDivElement[];
    const rules = rulesRef.current.filter(Boolean) as HTMLDivElement[];
    const nums  = numsRef.current.filter(Boolean)  as HTMLDivElement[];
    const list  = listRef.current;
    if (!list || !rows.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: list,
        start: "top 72%",
      },
    });

    // Rules draw in from left — staggered
    tl.fromTo(
      rules,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: "left center", duration: 1.4, stagger: 0.09, ease: "expo.out" },
      0
    );

    // Rows emerge upward — staggered
    tl.fromTo(
      rows,
      { opacity: 0, y: 52 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" },
      0.05
    );

    // Numbers pulse gold then settle back to faint — creates a "stamp" moment per row
    nums.forEach((num, i) => {
      tl.fromTo(
        num,
        { opacity: 0 },
        {
          keyframes: [
            { opacity: 0,    duration: 0   },
            { opacity: 0.75, duration: 0.18 },
            { opacity: 0.13, duration: 0.55 },
          ],
          ease: "none",
        },
        0.08 + i * 0.1
      );
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-card border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-8 md:px-12 py-28">

        {/* Two-column header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 lg:mb-28">
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
          <ClaimedMarketAnimation />
        </div>

        {/* ── Editorial pillar rows ── */}
        <div ref={listRef}>

          {/* Top rule */}
          <div
            ref={el => { rulesRef.current[0] = el; }}
            className="h-px"
            style={{ background: "rgba(194,155,79,0.22)", transformOrigin: "left center" }}
          />

          {pillars.map((p, i) => (
            <div key={p.num}>
              <div
                ref={el => { rowsRef.current[i] = el; }}
                className="group relative flex flex-col lg:grid lg:items-start gap-4 lg:gap-10 py-10 lg:py-12 cursor-default"
                style={{ gridTemplateColumns: "6rem 1fr 1.9fr" }}
              >
                {/* Hover: left gold bar */}
                <div
                  className="absolute left-0 top-0 w-px h-full bg-gold"
                  style={{
                    transform: "scaleY(0)",
                    transformOrigin: "top center",
                    transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={undefined}
                  ref={el => {
                    if (el) {
                      const row = rowsRef.current[i];
                      if (row) {
                        row.addEventListener("mouseenter", () => { el.style.transform = "scaleY(1)"; });
                        row.addEventListener("mouseleave", () => { el.style.transform = "scaleY(0)"; });
                      }
                    }
                  }}
                />

                {/* Number — faint display, pulses gold on scroll entry */}
                <div
                  ref={el => { numsRef.current[i] = el; }}
                  className="display-font leading-none select-none"
                  style={{
                    fontSize: "clamp(56px, 5.5vw, 88px)",
                    color: "hsl(var(--gold))",
                    opacity: 0.13,
                    transition: "opacity 0.4s ease, text-shadow 0.4s ease",
                    paddingLeft: "2px",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "0.38";
                    (e.currentTarget as HTMLDivElement).style.textShadow = "0 0 48px rgba(194,155,79,0.55)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.opacity = "0.13";
                    (e.currentTarget as HTMLDivElement).style.textShadow = "none";
                  }}
                >
                  {p.num}
                </div>

                {/* Title */}
                <div className="flex items-start pt-1 lg:pt-2">
                  <h3
                    className="font-serif text-cream leading-snug"
                    style={{
                      fontSize: "clamp(18px, 1.8vw, 26px)",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLHeadingElement).style.color = "hsl(var(--gold-light))"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLHeadingElement).style.color = ""; }}
                  >
                    {p.title}
                  </h3>
                </div>

                {/* Body */}
                <div className="flex items-start pt-0 lg:pt-2 lg:pl-4">
                  <p className="font-serif text-[15px] leading-[1.95] text-muted-foreground" style={{ letterSpacing: "0.01em" }}>
                    {p.body}
                  </p>
                </div>
              </div>

              {/* Rule between rows */}
              <div
                ref={el => { rulesRef.current[i + 1] = el; }}
                className="h-px"
                style={{ background: "rgba(194,155,79,0.22)", transformOrigin: "left center" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
