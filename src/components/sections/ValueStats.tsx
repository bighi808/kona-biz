/**
 * Value / Math — 4 stat cards with countup-on-hover animation.
 * Ported from konabiz-lander.html lines 1700-1729 (HTML) + 2178-2220 (JS).
 */
import { useRef, useState } from "react";

interface Stat {
  label: string;
  target: number;
  prefix: string;
  suffix: string;
  desc: string;
}

const stats: Stat[] = [
  {
    label: "Serious Injury Case",
    target: 33,
    prefix: "$",
    suffix: "K+",
    desc: "Minimum attorney fee at 33% contingency on a $100K settlement",
  },
  {
    label: "Catastrophic Case",
    target: 165,
    prefix: "$",
    suffix: "K+",
    desc: "Attorney fee on a $500K settlement. One case. One year of marketing covered.",
  },
  {
    label: "Consultation Rate",
    target: 7,
    prefix: "",
    suffix: "%",
    desc: "Of personal injury leads set appointments industry-wide. Ours are already searching for you by city and case type.",
  },
  {
    label: "Matrix Pages",
    target: 200,
    prefix: "",
    suffix: "+",
    desc: "Targeted pages in a full-market build. Every city. Every practice area. Every case type.",
  },
];

function StatCard({ stat }: { stat: Stat }) {
  const [display, setDisplay] = useState(stat.target);
  const frameRef = useRef<number>();

  const start = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    const startVal = Math.floor(stat.target * 0.1);
    const begin = performance.now();
    const duration = 600;
    const tick = (now: number) => {
      const progress = Math.min((now - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (stat.target - startVal) * eased);
      setDisplay(current);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setDisplay(stat.target);
  };

  return (
    <div
      onMouseEnter={start}
      onMouseLeave={stop}
      className="group relative bg-card p-10 overflow-hidden cursor-default transition-colors duration-400 hover:bg-[#1a1a16]"
    >
      <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-4">{stat.label}</div>
      <div className="display-font text-cream leading-none mb-2 transition-colors duration-400 group-hover:text-gold-light"
           style={{ fontSize: "64px", letterSpacing: "0.02em" }}>
        {stat.prefix}{display}{stat.suffix}
      </div>
      <div className="text-[11px] leading-relaxed tracking-wider uppercase text-muted-foreground transition-colors duration-400 group-hover:text-[#b8b0a4]">
        {stat.desc}
      </div>
    </div>
  );
}

export default function ValueStats() {
  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          The Math
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          What one case<br />
          <em className="text-gold-light not-italic font-normal italic">is worth to your firm.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mt-16">
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
