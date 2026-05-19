/**
 * Services grid — 6 disciplines, each card a link to the service page.
 * Ported from konabiz-lander.html lines 1658-1698.
 *
 * Visual signature: oversized watermark text (the shortName, e.g. "WEB")
 * expands and fades in on hover, behind the card content.
 */
import { Link } from "react-router-dom";
import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="bg-background border-t border-b border-border" id="services">
      <div className="max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          What We Do
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Full-stack domination.<br />
          <em className="text-gold-light not-italic font-normal italic">One firm. Every channel.</em>
        </h2>
        <p className="text-[13px] tracking-wide text-muted-foreground max-w-lg leading-loose">
          Six integrated disciplines. Every one managed exclusively for your firm in your state.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border mt-16">
          {services.map((svc) => {
            // Hardcoded short-card descriptions from the original lander
            // (tighter than the long-form ones in services.ts that feed the service pages)
            const cardDesc = SHORT_DESC[svc.slug] || svc.intro;
            return (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                className="group relative bg-card p-11 overflow-hidden no-underline block
                           transition-colors duration-400 hover:bg-[#161613]"
              >
                {/* Oversized watermark — scales + fades in on hover */}
                <span
                  className="display-font absolute top-1/2 left-1/2 leading-none whitespace-nowrap pointer-events-none
                             text-transparent
                             transition-all duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                             [transform:translate(-50%,-50%)_scale(0.6)]
                             group-hover:[transform:translate(-50%,-50%)_scale(1)]
                             group-hover:text-[rgba(194,155,79,0.08)]"
                  style={{ fontSize: "180px", letterSpacing: "0.08em" }}
                  aria-hidden
                >
                  {svc.shortName.toUpperCase()}
                </span>

                {/* Card content sits above watermark */}
                <span className="relative z-10 display-font text-[11px] tracking-[0.4em] text-gold opacity-70 mb-5 block
                                 transition-all duration-[550ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                 group-hover:opacity-100 group-hover:tracking-[1.2em] group-hover:text-[15px] group-hover:text-[#e8c97a]">
                  {svc.shortName.toUpperCase()}
                </span>

                <h4 className="relative z-10 font-serif text-2xl text-cream mb-3 leading-snug
                               transition-colors duration-400 group-hover:text-gold-light">
                  {svc.name}
                </h4>

                <p className="relative z-10 text-[11px] leading-loose tracking-wide text-muted-foreground
                              transition-colors duration-300 group-hover:text-[#b8b0a4]">
                  {cardDesc}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Tight homepage-card descriptions (long-form descriptions live in services.ts)
const SHORT_DESC: Record<string, string> = {
  "personal-injury-website-design":
    "Authority-grade sites with a page for every city you serve and every case type you handle. Custom backend included — analytics, CMS, review system, rank tracker.",
  "personal-injury-seo":
    "Local authority networks, hub-and-spoke content, press release link building — plus AI platform optimization for ChatGPT, Perplexity, and Google AI Overviews.",
  "personal-injury-ppc":
    "Google Ads, LSA, and Meta campaigns built for signed cases. High-intent targeting, state and city specific. Media billed at cost — no markups, ever.",
  "law-firm-ai-consulting":
    "Strategic consulting on AI in your practice plus custom agent development — intake automation, client communication, internal workflows.",
  "google-business-profile-law-firms":
    "Google Business Profile setup and active management, review generation, and complete profiles across Avvo, Justia, FindLaw, Martindale-Hubbell, and Lawyers.com.",
  "legal-content-marketing":
    "Ongoing SEO content, social creation and scheduling, YouTube lead generation, email and SMS nurture, and AI professional headshots — delivered monthly, branded to your firm.",
};
