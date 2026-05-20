/**
 * Hero — full viewport. Text left, video right.
 * Video has a subtle parallax: moves up at ~15% of scroll speed so it
 * feels almost fixed but has depth. Section overflow:hidden keeps it clipped.
 */
import { useEffect, useRef } from "react";

const tickerItems = [
  "One PI Firm Per State","SEO + GEO Optimization","Custom Web Development",
  "AI Practice Consulting","Paid Ads Management","Google Business Profile",
  "Legal Directory Management","Review Generation","YouTube Lead Generation","Custom AI Agents",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loop = [...tickerItems, ...tickerItems];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onScroll = () => {
      video.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden px-10 md:px-20">

      {/* 1. Instant dark background */}
      <div className="absolute inset-0" style={{ background: "#080807" }} />

      {/* 2. Background video — parallax via scroll-driven translateY */}
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover pointer-events-none"
        autoPlay muted loop playsInline preload="auto" aria-hidden="true"
        style={{
          top: "75px", right: 0, bottom: 0, left: 0,
          objectPosition: "center 62%",
          willChange: "transform",
        }}
      >
        <source src={`${import.meta.env.BASE_URL}Hero-Video.mp4`} type="video/mp4" />
      </video>

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

      {/* 6. Glassmorphism ticker — docked to bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
        style={{
          background: "rgba(8,8,7,0.35)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(232,226,212,0.09)",
        }}
      >
        <div className="flex animate-ticker py-4 gap-12 w-max">
          {loop.map((text, i) => (
            <span
              key={i}
              className="flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap"
            >
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
