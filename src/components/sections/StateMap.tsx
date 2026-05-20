/**
 * State Map — 50-state availability grid.
 * Ported from konabiz-lander.html lines 1731-1745 + JS at 2283-2380.
 *
 * Uses src/data/states.ts as the source of truth for status. Cells link to
 * /states/{slug} for available states, /states/{slug} for managed (the page
 * itself renders the "exclusively managed" message).
 *
 * Includes cascade entrance animation: cells fade in sequentially when the
 * grid scrolls into view.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { states } from "@/data/states";
import { MARKET_STATUS_LABELS } from "@/data/marketStatus";

export default function StateMap() {
  const [visibleCount, setVisibleCount] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          // Cascade reveal: 18ms per cell
          states.forEach((_, i) => {
            setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), i * 18);
          });
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const available = states.filter((s) => s.status === "available").length;

  return (
    <section className="bg-background" id="statemap">
      <div className="max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          Market Availability
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          {available} states open.<br />
          <em className="text-gold-light not-italic font-normal italic">Claim yours now.</em>
        </h2>
        <p className="text-[16px] tracking-wide text-muted-foreground max-w-lg leading-loose">
          Every state below is either available or exclusively managed. Once a competitor
          in your state signs with us, that market is locked. Check your state — then scroll
          down to claim your free report.
        </p>

        <div
          ref={gridRef}
          data-reveal-skip
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-px bg-border border border-border mt-14"
        >
          {states.map((s, i) => {
            const visible = i < visibleCount;
            const isManaged = s.status === "managed";
            const isAvailable = s.status === "available";

            return (
              <Link
                key={s.slug}
                to={`/states/${s.slug}`}
                className={`
                  block p-3 no-underline relative cursor-pointer
                  transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  ${isManaged ? "bg-[rgba(194,155,79,0.04)] border-l-2 border-l-[rgba(194,155,79,0.4)]" : "bg-card hover:bg-[#1a1a16]"}
                  ${isAvailable ? "border-l-2 border-l-[rgba(74,124,89,0.4)] hover:border-l-[#6abf80]" : ""}
                `}
              >
                <span className="block text-[10px] tracking-wider uppercase text-cream mb-1">
                  {s.name}
                </span>
                <span className={`block text-[9px] tracking-[0.1em] uppercase
                  ${isManaged ? "text-gold" : ""}
                  ${isAvailable ? "text-[#6abf80]" : ""}
                `}>
                  {isManaged ? "Excl. Managed" : MARKET_STATUS_LABELS[s.status]}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-8 mt-6">
          <div className="flex items-center gap-2 text-[14px] tracking-wider uppercase text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-[#6abf80]" />
            Available — Open to New Clients
          </div>
          <div className="flex items-center gap-2 text-[14px] tracking-wider uppercase text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Exclusively Managed — Market Locked
          </div>
        </div>
      </div>
    </section>
  );
}
