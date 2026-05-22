/**
 * Hero — full viewport, single column.
 * Background image slowly zooms in and fades to black on scroll.
 * GSAP ScrollTrigger scales the image layer and fades a dark overlay.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tickerItems = [
  "One PI Firm Per State","SEO + GEO Optimization","Custom Web Development",
  "AI Practice Consulting","Paid Ads Management","Google Business Profile",
  "Legal Directory Management","Review Generation","YouTube Lead Generation","Custom AI Agents",
];

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const loop = [...tickerItems, ...tickerItems];

  useGSAP(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    const overlay = overlayRef.current;
    if (!section || !img || !overlay) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
        invalidateOnRefresh: true,
      },
    });

    tl.to(img,     { scale: 1.14, ease: "none" }, 0)
      .to(overlay,  { opacity: 1,  ease: "none" }, 0);

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background image (scale target) ── */}
      <div
        ref={imgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}hero-image1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          transformOrigin: "center center",
        }}
      />

      {/* ── Fade-to-black overlay (opacity target) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: "#080807", opacity: 0 }}
      />

      {/* ── Centered text block ── */}
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
          style={{ fontSize: "clamp(58px, 8vw, 118px)", lineHeight: 0.88, letterSpacing: "0.03em", marginBottom: 0 }}
        >
          <span className="block" style={{
            background: "linear-gradient(90deg, #FFFFFF 0%, #E8E1D4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>One Firm.</span>
          <span className="block" style={{
            background: "linear-gradient(to left, #DCA251 0%, #FFF9D8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
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

      {/* ── Glassmorphism ticker ── */}
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
