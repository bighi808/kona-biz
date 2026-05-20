/**
 * useScrollReveal — GSAP scroll-triggered entrance animations.
 *
 * Targets elements by selector so individual sections don't need editing:
 *   - every <h2>            → fade up as it scrolls into view
 *   - every grid container  → stagger its direct children in
 *   - [data-reveal]         → opt-in single fade-up
 *   - [data-reveal-group]   → opt-in staggered children
 *
 * SSG-safe: all GSAP work runs inside useGSAP (client-only effect), and
 * ScrollTrigger is registered there — never at module load — so the
 * vite-react-ssg Node build never touches `window`.
 *
 * Respects prefers-reduced-motion: skips all animation if the user opted out.
 */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.registerPlugin(ScrollTrigger);

      const fadeUp = { y: 44, autoAlpha: 0 };

      // Headings — fade up individually
      gsap.utils.toArray<HTMLElement>("h2").forEach((el) => {
        gsap.from(el, {
          ...fadeUp,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });

      // Opt-in single reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          ...fadeUp,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      // Grids — stagger their direct children
      const groups = [
        ...gsap.utils.toArray<HTMLElement>("[class*='grid-cols']"),
        ...gsap.utils.toArray<HTMLElement>("[data-reveal-group]"),
      ];
      groups.forEach((grid) => {
        if (grid.hasAttribute("data-reveal-skip")) return;
        const kids = Array.from(grid.children) as HTMLElement[];
        if (kids.length < 2) return;
        gsap.from(kids, {
          ...fadeUp,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.07,
          scrollTrigger: { trigger: grid, start: "top 82%", toggleActions: "play none none none" },
        });
      });

      // Recalculate after fonts/images settle
      ScrollTrigger.refresh();
    },
    { scope }
  );

  return scope;
}
