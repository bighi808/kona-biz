/**
 * Hero — full viewport, single column.
 * Background: hero-image1.jpg (fixed, cover).
 * Content: centered text block on a semi-transparent dark backdrop.
 */
const tickerItems = [
  "One PI Firm Per State","SEO + GEO Optimization","Custom Web Development",
  "AI Practice Consulting","Paid Ads Management","Google Business Profile",
  "Legal Directory Management","Review Generation","YouTube Lead Generation","Custom AI Agents",
];

export default function Hero() {
  const loop = [...tickerItems, ...tickerItems];

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL}hero-image1.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Centered text block */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-10"
        style={{
          background: "rgba(8,8,7,0.52)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          padding: "56px 72px",
          maxWidth: "780px",
          width: "90%",
        }}
      >
        <div className="rise-up" style={{ marginBottom: "20px" }}>
          <p className="font-mono text-gold" style={{ fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase", marginBottom: "6px" }}>
            Exclusive
          </p>
          <p className="font-mono text-muted-foreground" style={{ fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase" }}>
            Personal Injury Law Firm Marketing
          </p>
        </div>

        <h1
          className="display-font text-cream rise-up rise-up-delay-1"
          style={{
            fontSize: "clamp(58px, 8vw, 118px)",
            lineHeight: 0.88,
            letterSpacing: "0.03em",
            marginBottom: 0,
          }}
        >
          <span className="block" style={{
            background: "linear-gradient(90deg, #FFFFFF 0%, #E8E1D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>One Firm.</span>
          <span className="block" style={{
            background: "linear-gradient(to left, #DCA251 0%, #FFF9D8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>Per State.</span>
        </h1>

        <div className="rise-up rise-up-delay-2" style={{ width: "48px", height: "1px", background: "hsl(var(--gold))", margin: "24px auto" }} />

        <p
          className="font-serif italic text-muted-foreground leading-relaxed rise-up rise-up-delay-2"
          style={{ fontSize: "clamp(15px, 1.6vw, 19px)", marginBottom: "36px" }}
        >
          We build full-stack digital authority exclusively for personal injury firms.
          Your competitors cannot be our clients.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 rise-up rise-up-delay-3">
          <a href="#statemap" className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase bg-gold text-background px-8 py-4 font-semibold hover:bg-gold-light transition-colors no-underline">
            Check Your State
          </a>
          <a href="#free-report" className="inline-block font-mono text-[10px] tracking-[0.22em] uppercase border border-cream/25 text-cream/60 px-8 py-4 hover:border-cream/50 hover:text-cream/90 transition-colors no-underline">
            Get the Free Report →
          </a>
        </div>
      </div>

      {/* Glassmorphism ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
        style={{
          background: "rgba(8,8,7,0.45)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(232,226,212,0.09)",
        }}
      >
        <div className="flex animate-ticker py-4 gap-12 w-max">
          {loop.map((text, i) => (
            <span key={i} className="flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
