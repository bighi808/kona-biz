/**
 * WhyPillars — "Why Plaintiff Growth"
 * Editorial full-width row layout.
 *
 * Scroll reveal: clip-path wipe per row, rules draw, numbers scale-in.
 *
 * Hover — "inverted shift":
 *   • Number slides left + fades out
 *   • Title chases left into the number's vacated space + turns gold
 *   • Body drifts left to fill the title's old column
 *   • Left bar scales up, row bg deepens
 *   All reverse on mouseleave.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BG_HOVER = "rgba(24,24,19,1)";
const BG_REST  = "rgba(24,24,19,0)";

const pillars = [
  { num: "01", title: "Personal Injury Firms Only", body: "We work exclusively with personal injury firms. No family law. No criminal defense. No generalist clients. We know personal injury marketing the way your best attorney knows personal injury law — deeply, specifically, and without distraction." },
  { num: "02", title: "One Client Per State", body: "When we take your state, your competitors cannot become our clients. Ever. We are fully invested in making you the dominant firm in every city you serve. That exclusivity is structural — not a promise, a policy." },
  { num: "03", title: "Competitors Locked Out", body: "Once your state is claimed, the other personal injury firms in your market are watching from the sidelines. We build their competitor's authority network, their content, their ad campaigns. Not theirs." },
  { num: "04", title: "Custom Built. Never Templates.", body: "Every site, every page, every content piece is built from scratch for your firm and your market. No shared frameworks. No recycled strategies. No other firm gets what you get." },
  { num: "05", title: "No Media Markups", body: "Your ad spend goes 100% to the platforms. We never mark up media. Our fee covers strategy and management only — so every dollar you spend on ads actually buys ads." },
  { num: "06", title: "The Personal Injury Attorney Network", body: "Plaintiff Growth clients join a private, cross-state community of non-competing personal injury attorneys. Shared strategy, market insights, and referral opportunities. Launching 2027 — Command tier clients get early access." },
];

function ExclusivityLedgerAnimation() {
  const css = `
  .pg-exclusivity-ledger-wrap {
    width: min(100%, 520px);
    margin-inline: auto;
  }
  .pg-exclusivity-ledger {
    width: 100%;
    height: auto;
    display: block;
    background: transparent;
    transition: transform 0.45s ease, filter 0.45s ease;
  }
  .pg-exclusivity-ledger-wrap:hover .pg-exclusivity-ledger {
    transform: translateY(-2px);
    filter: drop-shadow(0 18px 32px rgba(0,0,0,0.28));
  }
  .pg-exclusivity-ledger-wrap:hover .pgel-hover-wash { opacity: 1; }
  .pg-exclusivity-ledger-wrap:hover .pgel-frame { stroke: rgba(236,186,108,0.42); }
  .pg-exclusivity-ledger-wrap:hover .pgel-status-word { fill: rgba(236,186,108,1); }
  .pg-exclusivity-ledger-wrap:hover .pgel-label { fill: rgba(236,186,108,0.94); }
  .pgel-bg { fill: #080907; }
  .pgel-gold { stroke: #ECBA6C; }
  .pgel-gold-fill { fill: #ECBA6C; }
  .pgel-mid-fill { fill: rgba(236,186,108,0.12); }
  .pgel-soft-line { stroke: rgba(236,186,108,0.16); }
  .pgel-mid-line { stroke: rgba(236,186,108,0.36); }
  .pgel-bright-line { stroke: rgba(236,186,108,0.82); }
  .pgel-line { fill: none; stroke-width: 1; vector-effect: non-scaling-stroke; }
  .pgel-thin { stroke-width: 0.75; }
  .pgel-frame {
    fill: none;
    stroke: rgba(236,186,108,0.24);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    animation: pgelFrameBreath 13s ease-in-out infinite;
    transition: stroke 0.45s ease;
  }
  .pgel-text {
    fill: rgba(236,186,108,0.58);
    font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    font-size: 8px;
    letter-spacing: 0.18em;
  }
  .pgel-label {
    fill: rgba(236,186,108,0.78);
    font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    transition: fill 0.45s ease;
  }
  .pgel-status-word {
    fill: rgba(236,186,108,0.88);
    font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-anchor: middle;
    dominant-baseline: middle;
    transition: fill 0.45s ease;
  }
  .pgel-small {
    fill: rgba(236,186,108,0.42);
    font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    font-size: 7px;
    letter-spacing: 0.16em;
  }
  .pgel-glow { filter: url(#pgelGlow); }
  .pgel-grid { opacity: 0.5; animation: pgelGridBreath 13s ease-in-out infinite; }
  .pgel-row-dim { opacity: 0.36; }
  .pgel-claimed-row { opacity: 0.28; animation: pgelClaimedRow 13s ease-in-out infinite; }
  .pgel-hover-wash {
    opacity: 0;
    fill: rgba(236,186,108,0.08);
    transition: opacity 0.45s ease;
    pointer-events: none;
  }
  .pgel-claim-static {
    fill: none;
    stroke: rgba(236,186,108,0.48);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
    animation: pgelClaimStatic 13s ease-in-out infinite;
  }
  .pgel-edge-glint {
    stroke: rgba(236,186,108,0.95);
    stroke-width: 1.25;
    vector-effect: non-scaling-stroke;
    stroke-linecap: round;
    opacity: 0;
    filter: url(#pgelGlow);
    animation: pgelEdgeGlint 13s ease-in-out infinite;
  }
  .pgel-edge-glint-1 { animation-delay: 0s; }
  .pgel-edge-glint-2 { animation-delay: 0.18s; }
  .pgel-edge-glint-3 { animation-delay: 0.36s; }
  .pgel-edge-glint-4 { animation-delay: 0.54s; }
  .pgel-scan {
    stroke-dasharray: 72 420;
    stroke-dashoffset: 0;
    opacity: 0;
    animation: pgelScan 13s ease-in-out infinite;
  }
  .pgel-verify-dot {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: pgelVerifyDot 13s ease-in-out infinite;
  }
  .pgel-status-box {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    animation: pgelStatusBox 13s ease-in-out infinite;
  }
  .pgel-status-text { opacity: 0; animation: pgelStatusText 13s ease-in-out infinite; }
  .pgel-gate { opacity: 0.28; animation: pgelGate 13s ease-in-out infinite; }
  .pgel-denied-line { stroke-dasharray: 90; stroke-dashoffset: 90; opacity: 0; }
  .pgel-denied-a { animation: pgelDeniedA 13s ease-in-out infinite; }
  .pgel-denied-b { animation: pgelDeniedB 13s ease-in-out infinite; }
  .pgel-denied-c { animation: pgelDeniedC 13s ease-in-out infinite; }
  .pgel-denied-node { opacity: 0.18; }
  .pgel-denied-node-a { animation: pgelDeniedNodeA 13s ease-in-out infinite; }
  .pgel-denied-node-b { animation: pgelDeniedNodeB 13s ease-in-out infinite; }
  .pgel-denied-node-c { animation: pgelDeniedNodeC 13s ease-in-out infinite; }
  .pgel-denied-text { opacity: 0; animation: pgelDeniedText 13s ease-in-out infinite; }
  .pgel-policy { opacity: 0.22; animation: pgelPolicy 13s ease-in-out infinite; }
  .pgel-policy-1 { animation-delay: 0.1s; }
  .pgel-policy-2 { animation-delay: 0.45s; }
  .pgel-policy-3 { animation-delay: 0.8s; }
  .pgel-policy-4 { animation-delay: 1.15s; }
  .pgel-seal-line {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    opacity: 0;
    animation: pgelSealLine 13s ease-in-out infinite;
  }
  .pgel-corner { opacity: 0.32; animation: pgelCorners 13s ease-in-out infinite; }
  @keyframes pgelFrameBreath {
    0%,100% { opacity: 0.28; }
    35%,72% { opacity: 0.64; }
  }
  @keyframes pgelGridBreath {
    0%,100% { opacity: 0.26; }
    36%     { opacity: 0.58; }
    74%     { opacity: 0.38; }
  }
  @keyframes pgelClaimedRow {
    0%,12%,100% { opacity: 0.1; }
    24%,78%     { opacity: 0.78; }
  }
  @keyframes pgelClaimStatic {
    0%,100%  { opacity: 0.18; }
    22%,78%  { opacity: 0.78; }
  }
  @keyframes pgelEdgeGlint {
    0%,18%,100% { opacity: 0; stroke-dasharray: 0 420; }
    28%         { opacity: 0.92; stroke-dasharray: 80 420; }
    46%         { opacity: 0.18; stroke-dasharray: 160 420; }
    72%         { opacity: 0; stroke-dasharray: 220 420; }
  }
  @keyframes pgelScan {
    0%,14% { opacity: 0; stroke-dashoffset: 0; }
    22%    { opacity: 0.88; }
    38%    { opacity: 0.18; stroke-dashoffset: -420; }
    100%   { opacity: 0; stroke-dashoffset: -420; }
  }
  @keyframes pgelVerifyDot {
    0%,18%,100% { opacity: 0; transform: scale(0.72); }
    27%         { opacity: 1; transform: scale(1.14); }
    70%         { opacity: 0.66; transform: scale(1); }
  }
  @keyframes pgelStatusBox {
    0%,24%,100% { opacity: 0; transform: scaleX(0.72); }
    34%,76%     { opacity: 1; transform: scaleX(1); }
  }
  @keyframes pgelStatusText {
    0%,30%,100% { opacity: 0; }
    39%,76%     { opacity: 1; }
  }
  @keyframes pgelGate {
    0%,100%  { opacity: 0.18; }
    34%,78%  { opacity: 0.7; }
    48%,60%  { opacity: 0.94; }
  }
  @keyframes pgelDeniedA {
    0%,39% { opacity: 0; stroke-dashoffset: 90; }
    48%    { opacity: 0.54; stroke-dashoffset: 26; }
    54%    { opacity: 0.06; stroke-dashoffset: 18; }
    100%   { opacity: 0; stroke-dashoffset: 90; }
  }
  @keyframes pgelDeniedB {
    0%,50% { opacity: 0; stroke-dashoffset: 90; }
    59%    { opacity: 0.48; stroke-dashoffset: 24; }
    65%    { opacity: 0.06; stroke-dashoffset: 18; }
    100%   { opacity: 0; stroke-dashoffset: 90; }
  }
  @keyframes pgelDeniedC {
    0%,58% { opacity: 0; stroke-dashoffset: 90; }
    67%    { opacity: 0.42; stroke-dashoffset: 28; }
    73%    { opacity: 0.05; stroke-dashoffset: 20; }
    100%   { opacity: 0; stroke-dashoffset: 90; }
  }
  @keyframes pgelDeniedNodeA {
    0%,41%,100% { opacity: 0.14; }
    49%         { opacity: 0.56; }
    55%         { opacity: 0.08; }
  }
  @keyframes pgelDeniedNodeB {
    0%,52%,100% { opacity: 0.12; }
    60%         { opacity: 0.5; }
    66%         { opacity: 0.07; }
  }
  @keyframes pgelDeniedNodeC {
    0%,61%,100% { opacity: 0.1; }
    68%         { opacity: 0.44; }
    74%         { opacity: 0.06; }
  }
  @keyframes pgelDeniedText {
    0%,47%,100% { opacity: 0; }
    54%,66%     { opacity: 0.66; }
  }
  @keyframes pgelPolicy {
    0%,100% { opacity: 0.18; transform: translateY(0); }
    38%     { opacity: 0.82; transform: translateY(-1px); }
    72%     { opacity: 0.36; transform: translateY(0); }
  }
  @keyframes pgelSealLine {
    0%,36% { opacity: 0; stroke-dashoffset: 240; }
    50%    { opacity: 0.8; stroke-dashoffset: 0; }
    76%    { opacity: 0.4; stroke-dashoffset: 0; }
    100%   { opacity: 0; stroke-dashoffset: -240; }
  }
  @keyframes pgelCorners {
    0%,100%  { opacity: 0.16; }
    28%,76%  { opacity: 0.42; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pg-exclusivity-ledger * { animation: none !important; }
    .pgel-claimed-row, .pgel-status-box, .pgel-status-text, .pgel-verify-dot { opacity: 1; }
    .pgel-claim-static, .pgel-seal-line { opacity: 0.7; }
  }
  `;

  return (
    <>
      <style>{css}</style>
      <div className="pg-exclusivity-ledger-wrap">
        <svg
          className="pg-exclusivity-ledger"
          viewBox="0 0 560 560"
          role="img"
          aria-label="Exclusive state model animation"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="pgelGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0.925  0 1 0 0 0.729  0 0 1 0 0.424  0 0 0 0.52 0"
                result="goldBlur"
              />
              <feMerge>
                <feMergeNode in="goldBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="pgelClaimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#ECBA6C" stopOpacity="0.02" />
              <stop offset="45%"  stopColor="#ECBA6C" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#ECBA6C" stopOpacity="0.04" />
            </linearGradient>
          </defs>

          <rect className="pgel-bg" width="560" height="560" />
          <rect className="pgel-frame" x="72" y="82" width="416" height="396" />

          <g className="pgel-corner">
            <path className="pgel-line pgel-mid-line" d="M72 116V82H106" />
            <path className="pgel-line pgel-mid-line" d="M454 82H488V116" />
            <path className="pgel-line pgel-mid-line" d="M72 444V478H106" />
            <path className="pgel-line pgel-mid-line" d="M454 478H488V444" />
          </g>

          <g>
            <text className="pgel-text" x="96" y="118">EXCLUSIVE STATE MODEL</text>
            <text className="pgel-small" x="112" y="146">MARKET</text>
            <text className="pgel-small" x="236" y="146">CLIENT TYPE</text>
            <text className="pgel-small" x="360" y="146">POLICY</text>
          </g>

          <g className="pgel-grid">
            <path className="pgel-line pgel-soft-line pgel-thin" d="M96 160H464" />
            <path className="pgel-line pgel-soft-line pgel-thin" d="M96 210H464" />
            <path className="pgel-line pgel-soft-line pgel-thin" d="M96 260H464" />
            <path className="pgel-line pgel-soft-line pgel-thin" d="M96 310H464" />
            <path className="pgel-line pgel-soft-line pgel-thin" d="M96 360H464" />
            <path className="pgel-line pgel-soft-line pgel-thin" d="M96 410H464" />
            <path className="pgel-line pgel-soft-line pgel-thin" d="M214 138V410" />
            <path className="pgel-line pgel-soft-line pgel-thin" d="M338 138V410" />
          </g>

          <g className="pgel-row-dim">
            <text className="pgel-small" x="112" y="191">STATE SLOT</text>
            <text className="pgel-small" x="236" y="191">PI FIRM</text>
            <path className="pgel-line pgel-soft-line" d="M360 187H432" />
            <text className="pgel-small" x="112" y="291">STATE SLOT</text>
            <text className="pgel-small" x="236" y="291">PI FIRM</text>
            <path className="pgel-line pgel-soft-line" d="M360 287H418" />
            <text className="pgel-small" x="112" y="341">STATE SLOT</text>
            <text className="pgel-small" x="236" y="341">PI FIRM</text>
            <path className="pgel-line pgel-soft-line" d="M360 337H426" />
          </g>

          <g>
            <rect className="pgel-claimed-row" x="96" y="211" width="368" height="48" fill="url(#pgelClaimGradient)" />
            <rect className="pgel-hover-wash pgel-glow" x="96" y="211" width="368" height="48" />
            <rect className="pgel-claim-static pgel-glow" x="96" y="211" width="368" height="48" />
            <path className="pgel-edge-glint pgel-edge-glint-1" d="M96 211H464" />
            <path className="pgel-edge-glint pgel-edge-glint-2" d="M464 211V259" />
            <path className="pgel-edge-glint pgel-edge-glint-3" d="M464 259H96" />
            <path className="pgel-edge-glint pgel-edge-glint-4" d="M96 259V211" />
            <text className="pgel-label" x="112" y="241">YOUR STATE</text>
            <text className="pgel-label" x="236" y="241">PI FIRM</text>
            <path className="pgel-line pgel-bright-line pgel-scan pgel-glow" d="M110 235H448" />
            <circle className="pgel-verify-dot pgel-gold-fill pgel-glow" cx="214" cy="235" r="4" />
            <g className="pgel-status-box">
              <rect className="pgel-mid-fill" x="348" y="222" width="106" height="26" />
              <rect className="pgel-line pgel-gold" x="348" y="222" width="106" height="26" />
            </g>
            <text className="pgel-status-word pgel-status-text" x="401" y="235">EXCLUSIVE</text>
          </g>

          <g className="pgel-gate">
            <path className="pgel-line pgel-bright-line pgel-glow" d="M488 162V408" />
            <text className="pgel-small" x="496" y="156">ACCESS GATE</text>
          </g>

          <g>
            <circle className="pgel-denied-node pgel-denied-node-a pgel-gold-fill" cx="528" cy="214" r="3.5" />
            <circle className="pgel-denied-node pgel-denied-node-b pgel-gold-fill" cx="528" cy="286" r="3.2" />
            <circle className="pgel-denied-node pgel-denied-node-c pgel-gold-fill" cx="528" cy="356" r="3" />
            <path className="pgel-line pgel-mid-line pgel-denied-line pgel-denied-a" d="M526 214H492" />
            <path className="pgel-line pgel-mid-line pgel-denied-line pgel-denied-b" d="M526 286H492" />
            <path className="pgel-line pgel-mid-line pgel-denied-line pgel-denied-c" d="M526 356H492" />
            <text className="pgel-small pgel-denied-text" x="496" y="433">COMPETITOR ACCESS DENIED</text>
          </g>

          <path className="pgel-line pgel-bright-line pgel-seal-line pgel-glow" d="M128 438H432" />

          <g>
            <g className="pgel-policy pgel-policy-1">
              <rect className="pgel-line pgel-mid-line" x="120" y="430" width="64" height="22" />
              <text className="pgel-small" x="135" y="445">PI ONLY</text>
            </g>
            <g className="pgel-policy pgel-policy-2">
              <rect className="pgel-line pgel-mid-line" x="196" y="430" width="74" height="22" />
              <text className="pgel-small" x="208" y="445">1 STATE</text>
            </g>
            <g className="pgel-policy pgel-policy-3">
              <rect className="pgel-line pgel-mid-line" x="282" y="430" width="74" height="22" />
              <text className="pgel-small" x="294" y="445">CUSTOM</text>
            </g>
            <g className="pgel-policy pgel-policy-4">
              <rect className="pgel-line pgel-mid-line" x="368" y="430" width="72" height="22" />
              <text className="pgel-small" x="378" y="445">NO MARKUP</text>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
}



export default function WhyPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);
  const rowsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const rulesRef   = useRef<(HTMLDivElement | null)[]>([]);
  const numsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const barsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const titlesRef  = useRef<(HTMLHeadingElement | null)[]>([]);
  const bodiesRef  = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(() => {
    const rows  = rowsRef.current.filter(Boolean)  as HTMLDivElement[];
    const rules = rulesRef.current.filter(Boolean) as HTMLDivElement[];
    const nums  = numsRef.current.filter(Boolean)  as HTMLDivElement[];
    const bars  = barsRef.current.filter(Boolean)  as HTMLDivElement[];
    if (!listRef.current || !rows.length) return;

    // Initialise GSAP-owned properties
    gsap.set(bars, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(nums, { opacity: 0, scale: 1, x: 0 });
    gsap.set(rows, { backgroundColor: BG_REST });
    gsap.set(titlesRef.current.filter(Boolean) as HTMLHeadingElement[], { transformOrigin: "left center" });

    // ── Scroll reveal ──────────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: { trigger: listRef.current, start: "top 72%" },
    });

    tl.fromTo(rules,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: "left center", duration: 2.0, stagger: 0.12, ease: "expo.out" },
      0
    );

    tl.fromTo(rows,
      { clipPath: "inset(100% 0 0 0)", y: 12 },
      { clipPath: "inset(0% 0 0 0)",   y: 0,  duration: 1.6, stagger: 0.18, ease: "power3.inOut" },
      0.1
    );

    tl.fromTo(nums,
      { opacity: 0, scale: 1.4 },
      { opacity: 0.13, scale: 1,       duration: 1.4, stagger: 0.18, ease: "power3.out" },
      0.15
    );

    // ── Inverted-shift hover ───────────────────────────────────────────────
    rows.forEach((row, i) => {
      const bar   = bars[i]              ?? null;
      const num   = nums[i]              ?? null;
      const title = titlesRef.current[i] ?? null;
      const body  = bodiesRef.current[i] ?? null;

      row.addEventListener("mouseenter", () => {
        // Row bg + bar
        gsap.to(row, { backgroundColor: BG_HOVER, duration: 1.0, ease: "power2.inOut", overwrite: "auto" });
        if (bar) gsap.to(bar, { scaleY: 1, duration: 1.0, ease: "power2.inOut", overwrite: "auto" });

        // Number exits left
        if (num) gsap.to(num, { x: -44, opacity: 0, duration: 0.55, ease: "power3.in", overwrite: "auto" });

        // Title chases left into the vacated space, brightens to gold
        if (title) gsap.to(title, { x: -92, scale: 1.12, color: "#CCA86F", duration: 0.65, ease: "power3.out", overwrite: "auto" });

        // Body drifts left to follow
        if (body) gsap.to(body, { x: -30, duration: 0.65, ease: "power3.out", overwrite: "auto" });
      });

      row.addEventListener("mouseleave", () => {
        // Row bg + bar reverse
        gsap.to(row, { backgroundColor: BG_REST, duration: 1.0, ease: "power2.inOut", overwrite: "auto" });
        if (bar) gsap.to(bar, { scaleY: 0, duration: 1.0, ease: "power2.inOut", overwrite: "auto" });

        // Number slides back in from the left
        if (num) gsap.to(num, { x: 0, opacity: 0.13, duration: 0.6, ease: "power3.out", overwrite: "auto" });

        // Title and body return to origin
        if (title) gsap.to(title, { x: 0, scale: 1, color: "#BB9354", duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
        if (body)  gsap.to(body,  { x: 0,                   duration: 0.65, ease: "power2.inOut", overwrite: "auto" });
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="border-t border-b border-border overflow-hidden" style={{ backgroundColor: "#080907" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28">

        {/* Two-column header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 lg:mb-20">
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
          <div className="hidden lg:block">
            <ExclusivityLedgerAnimation />
          </div>
        </div>

        {/* Editorial pillar rows */}
        <div ref={listRef}>

          <div
            ref={el => { rulesRef.current[0] = el; }}
            className="h-px"
            style={{ background: "rgba(187,147,84,0.22)" }}
          />

          {pillars.map((p, i) => (
            <div key={p.num}>
              <div
                ref={el => { rowsRef.current[i] = el; }}
                className="relative flex flex-col lg:grid lg:items-start gap-4 lg:gap-10 py-6 lg:py-11 cursor-default"
                style={{ gridTemplateColumns: "6rem 1fr 1.9fr" }}
              >
                {/* Left gold bar */}
                <div
                  ref={el => { barsRef.current[i] = el; }}
                  className="absolute left-0 top-0 w-px h-full bg-gold"
                  style={{ transformOrigin: "top center" }}
                />

                {/* Number — exits left on hover */}
                <div
                  ref={el => { numsRef.current[i] = el; }}
                  className="display-font leading-none select-none"
                  style={{
                    fontSize: "clamp(56px, 5.5vw, 88px)",
                    color: "hsl(var(--gold))",
                    paddingLeft: "2px",
                  }}
                >
                  {p.num}
                </div>

                {/* Title — chases left into number's space */}
                <div className="flex items-start pt-1 lg:pt-2">
                  <h3
                    ref={el => { titlesRef.current[i] = el; }}
                    className="font-serif leading-snug"
                    style={{ fontSize: "35px", color: "#BB9354" }}
                  >
                    {p.title}
                  </h3>
                </div>

                {/* Body — drifts left */}
                <div className="flex items-start pt-0 lg:pt-2 lg:pl-4">
                  <p
                    ref={el => { bodiesRef.current[i] = el; }}
                    className="font-serif leading-[1.9] text-muted-foreground"
                    style={{ fontSize: "23px", letterSpacing: "0.01em" }}
                  >
                    {p.body}
                  </p>
                </div>
              </div>

              <div
                ref={el => { rulesRef.current[i + 1] = el; }}
                className="h-px"
                style={{ background: "rgba(187,147,84,0.22)" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
