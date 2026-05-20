/**
 * Hero — fits in one viewport. Text left, video right.
 * Gradient: opaque left → transparent right so video shows through.
 */

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden px-10 md:px-20">

      {/* 1. Instant dark background */}
      <div className="absolute inset-0" style={{ background: "#080807" }} />

      {/* 2. Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay muted loop playsInline preload="auto" aria-hidden="true"
      >
        <source src={`${import.meta.env.BASE_URL}Hero-Video.mp4`} type="video/mp4" />
      </video>

      {/* 3. Left-to-right gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(8,8,7,0.93) 0%, rgba(8,8,7,0.84) 32%, rgba(8,8,7,0.42) 58%, rgba(8,8,7,0.06) 100%)",
        }}
      />

      {/* 4. Top/bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,7,0.5) 0%, transparent 15%, transparent 82%, rgba(8,8,7,0.6) 100%)",
        }}
      />

      {/* 5. Content */}
      <div className="relative z-10 max-w-2xl">

        <p
          className="font-mono text-gold rise-up"
          style={{ fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase", marginBottom: "20px" }}
        >
          Personal Injury Law Firm Marketing
        </p>

        <h1
          className="display-font text-cream rise-up rise-up-delay-1"
          style={{
            fontSize: "clamp(58px, 7.5vw, 118px)",
            lineHeight: 0.88,
            letterSpacing: "0.03em",
            textShadow: "0 4px 40px rgba(0,0,0,0.6)",
            marginBottom: 0,
          }}
        >
          <span className="block">One Firm.</span>
          <span className="block gold-shimmer">Per State.</span>
        </h1>

        {/* Gold rule */}
        <div
          className="rise-up rise-up-delay-2"
          style={{ width: "48px", height: "1px", background: "hsl(var(--gold))", margin: "22px 0" }}
        />

        <p
          className="font-serif italic text-muted-foreground leading-relaxed rise-up rise-up-delay-2"
          style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            maxWidth: "420px",
            textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            marginBottom: "36px",
          }}
        >
          We build full-stack digital authority exclusively for personal injury firms.
          Your competitors cannot be our clients.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 rise-up rise-up-delay-3">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-10 md:left-20 flex flex-col items-center gap-2 rise-up rise-up-delay-4 z-10">
        <div className="w-px h-10 scroll-pulse" style={{ background: "linear-gradient(to bottom, hsl(var(--gold)), transparent)" }} />
        <span className="text-[8px] tracking-[0.3em] text-muted-foreground uppercase [writing-mode:vertical-rl] mt-1">Scroll</span>
      </div>
    </section>
  );
}
