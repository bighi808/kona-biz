/**
 * Hero — full-viewport split layout.
 * Video fills the entire background; visual interest sits on the right half.
 * All content is left-anchored so it reads cleanly against the darker left side.
 *
 * Layering (back to front):
 *   1. Near-black instant background (paints before video loads)
 *   2. Hero-Video.mp4 — full viewport, object-cover
 *   3. Left-to-right gradient: opaque left (text legibility) → transparent right (video shows through)
 *   4. Subtle top/bottom vignette
 *   5. Content — left-aligned column
 */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-10 md:px-20 py-32">

      {/* 1. Instant dark background */}
      <div className="absolute inset-0" style={{ background: "#080807" }} />

      {/* 2. Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={`${import.meta.env.BASE_URL}Hero-Video.mp4`} type="video/mp4" />
      </video>

      {/* 3. Left-to-right gradient — text side dark, video side open */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(8,8,7,0.92) 0%, rgba(8,8,7,0.82) 35%, rgba(8,8,7,0.45) 60%, rgba(8,8,7,0.08) 100%)",
        }}
      />

      {/* 4. Top/bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,7,0.55) 0%, transparent 18%, transparent 80%, rgba(8,8,7,0.65) 100%)",
        }}
      />

      {/* 5. Content — left column, max ~half the viewport */}
      <div className="relative z-10 max-w-2xl">

        {/* Eyebrow */}
        <p
          className="font-mono text-gold mb-10 rise-up"
          style={{ fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase" }}
        >
          Personal Injury Law Firm Marketing
        </p>

        {/* Headline */}
        <h1
          className="display-font text-cream leading-[0.88] tracking-wider rise-up rise-up-delay-1"
          style={{
            fontSize: "clamp(64px, 9vw, 140px)",
            letterSpacing: "0.03em",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
          }}
        >
          <span className="block">One Firm.</span>
          <span className="block gold-shimmer">Per State.</span>
        </h1>

        {/* Thin gold rule */}
        <div
          className="rise-up rise-up-delay-2"
          style={{ width: "52px", height: "1px", background: "hsl(var(--gold))", margin: "28px 0" }}
        />

        {/* Sub-headline */}
        <p
          className="font-serif italic text-muted-foreground leading-relaxed rise-up rise-up-delay-2"
          style={{
            fontSize: "clamp(17px, 2vw, 22px)",
            maxWidth: "440px",
            textShadow: "0 2px 20px rgba(0,0,0,0.7)",
          }}
        >
          We build full-stack digital authority exclusively for personal injury firms.
          Your competitors cannot be our clients.
        </p>

        {/* Service pills */}
        <div className="flex flex-wrap gap-3 mt-10 mb-12 rise-up rise-up-delay-3">
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

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 rise-up rise-up-delay-4">
          <a
            href="#statemap"
            className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase bg-gold text-background px-8 py-4 font-semibold hover:bg-gold-light transition-colors no-underline"
          >
            Check Your State
          </a>
          <a
            href="#free-report"
            className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase border border-cream/25 text-cream/60 px-8 py-4 hover:border-cream/50 hover:text-cream/90 transition-colors no-underline"
          >
            Get the Free Report →
          </a>
        </div>
      </div>

      {/* Scroll indicator — bottom left */}
      <div className="absolute bottom-10 left-10 md:left-20 flex flex-col items-center gap-2 rise-up rise-up-delay-4 z-10">
        <div
          className="w-px h-12 scroll-pulse"
          style={{ background: "linear-gradient(to bottom, hsl(var(--gold)), transparent)" }}
        />
        <span className="text-[8px] tracking-[0.3em] text-muted-foreground uppercase [writing-mode:vertical-rl] mt-2">
          Scroll
        </span>
      </div>
    </section>
  );
}
