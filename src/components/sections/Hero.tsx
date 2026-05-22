/**
 * Hero — full viewport split layout. Video left, text right.
 * Parallax via GSAP ScrollTrigger on the video (clipped within left column).
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
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef  = useRef<HTMLVideoElement>(null);
  const loop = [...tickerItems, ...tickerItems];

  useGSAP(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    gsap.to(video, {
      y: () => -(window.innerHeight * 0.12),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden" style={{ background: "#080807" }}>

      {/* ── Left column: video ── */}
      <div className="absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden" style={{ width: "50%" }}>
        <video
          ref={videoRef}
          className="pointer-events-none object-cover"
          autoPlay muted loop playsInline preload="auto" aria-hidden="true"
          style={{ width: "82%", height: "82%", willChange: "transform" }}
        >
          <source src={`${import.meta.env.BASE_URL}Hero-Sq-1.mp4`} type="video/mp4" />
        </video>
        {/* Subtle right-edge fade into dark background */}
        <div className="absolute inset-y-0 right-0 w-32 pointer-events-none"
          style={{ background: "linear-gradient(to right, transparent, #080807)" }} />
      </div>

      {/* ── Right column: text ── */}
      <div
        className="absolute inset-y-0 right-0 flex flex-col justify-center"
        style={{ width: "50%", paddingLeft: "48px", paddingRight: "80px" }}
      >
        <p
          className="font-mono text-gold rise-up"
          style={{ fontSize: "10px", letterSpacing: "0.38em", textTransform: "uppercase", marginBottom: "20px" }}
        >
          Exclusive Personal Injury Law Firm Marketing
        </p>

        <h1
          className="display-font text-cream rise-up rise-up-delay-1"
          style={{
            fontSize: "clamp(52px, 6.5vw, 108px)",
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

        <div
          className="rise-up rise-up-delay-2"
          style={{ width: "48px", height: "1px", background: "hsl(var(--gold))", margin: "22px 0" }}
        />

        <p
          className="font-serif italic text-muted-foreground leading-relaxed rise-up rise-up-delay-2"
          style={{ fontSize: "clamp(15px, 1.6vw, 19px)", maxWidth: "400px", marginBottom: "36px" }}
        >
          We build full-stack digital authority exclusively for personal injury firms.
          Your competitors cannot be our clients.
        </p>

        <div className="flex flex-wrap items-center gap-4 rise-up rise-up-delay-3">
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
