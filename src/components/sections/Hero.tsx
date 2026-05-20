/**
 * Hero — full-viewport intro with the 3D globe as backdrop.
 * Globe arcs radiate from Kona, Hawaii to every state served.
 *
 * Layering (back to front):
 *   1. instant near-black radial gradient (paints immediately — protects LCP)
 *   2. Globe canvas (mounts client-side, fades in; never blocks first paint)
 *   3. legibility gradient overlay (keeps the headline readable over the globe)
 *   4. content (eyebrow, headline, sub, pills)
 *   5. scroll indicator
 */
import Globe from "@/components/Globe";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-8 py-32 overflow-hidden">
      {/* 1. Instant background — deep warm-black radial, paints before JS */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, #14110c 0%, #0b0a07 55%, #050505 100%)",
        }}
      />

      {/* 2. Globe backdrop (client-only, fades in) */}
      <Globe />

      {/* 3. Legibility overlay — darker top/bottom, lets globe glow at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,7,0.72) 0%, rgba(8,8,7,0.35) 38%, rgba(8,8,7,0.45) 62%, rgba(8,8,7,0.86) 100%)",
        }}
      />

      {/* 4. Content */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <p
          className="font-serif italic text-xl md:text-2xl text-muted-foreground mb-12 rise-up"
          style={{ letterSpacing: "0.15em", textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
        >
          Your competitors are watching this page right now.
        </p>

        <h1
          className="display-font text-cream leading-[0.88] tracking-wider mb-0"
          style={{ fontSize: "clamp(72px, 14vw, 180px)", letterSpacing: "0.03em", textShadow: "0 4px 60px rgba(0,0,0,0.55)" }}
        >
          <span className="block">One Firm.</span>
          <span className="block gold-shimmer">Per State.</span>
        </h1>

        <p
          className="font-serif italic text-muted-foreground mt-8 mb-14 max-w-xl mx-auto leading-relaxed rise-up rise-up-delay-2"
          style={{ fontSize: "clamp(18px, 2.5vw, 26px)", textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
        >
          We build full-stack digital authority exclusively for personal injury firms.
          Your competitors cannot be our clients.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-16 rise-up rise-up-delay-3">
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/30 px-4 py-2 bg-background/30 backdrop-blur-sm">
            One Client Per State
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2 bg-background/30 backdrop-blur-sm">
            SEO + GEO
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2 bg-background/30 backdrop-blur-sm">
            Custom Web
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2 bg-background/30 backdrop-blur-sm">
            AI Consulting
          </span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2 bg-background/30 backdrop-blur-sm">
            Paid Ads
          </span>
        </div>
      </div>

      {/* 5. Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 rise-up rise-up-delay-4 z-10">
        <div className="w-px h-12 scroll-pulse" style={{ background: "linear-gradient(to bottom, hsl(var(--gold)), transparent)" }} />
        <span className="text-[8px] tracking-[0.3em] text-muted-foreground uppercase [writing-mode:vertical-rl] mt-2">
          Scroll
        </span>
      </div>
    </section>
  );
}
