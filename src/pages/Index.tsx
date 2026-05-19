import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { services } from "@/data/services";
import { ArrowUpRight } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <SEOHead
        title="Kona.biz — Personal Injury Law Firm Marketing | One Firm Per State"
        description="Full-stack digital authority for personal injury law firms. One firm per state — exclusivity is structural. SEO, GEO, paid ads, AI agents, local presence."
        canonicalPath="/"
      />

      {/* ─────────────────────────────────────────────────────────────────
        TEMP HOMEPAGE — placeholder during the framework migration.
        Real lander content lives in /konabiz-lander.html and will be
        ported into this page (and split into components) over time.
        ───────────────────────────────────────────────────────────────── */}
      <section className="section-padding text-center max-w-4xl mx-auto">
        <p className="font-serif italic text-xl md:text-2xl text-muted-foreground mb-12">
          Your competitors are watching this page right now.
        </p>

        <h1 className="display-font text-6xl md:text-8xl text-cream tracking-wider leading-none mb-12">
          One Firm.
          <br />
          <span className="text-gold-light">Per State.</span>
        </h1>

        <p className="font-serif italic text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          We build full-stack digital authority exclusively for personal injury firms. Your competitors cannot be our clients.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-20">
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/30 px-4 py-2">One Client Per State</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2">SEO + GEO</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2">Custom Web</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2">AI Consulting</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2">Paid Ads</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold border border-gold px-6 py-4 hover:bg-gold hover:text-background transition-colors"
          >
            See the Services <ArrowUpRight size={14} />
          </Link>
          <Link
            to="/states"
            className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-muted-foreground border border-border px-6 py-4 hover:text-cream hover:border-cream transition-colors"
          >
            Check Your State <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* Services grid teaser */}
      <section className="section-padding border-t border-border max-w-6xl mx-auto w-full">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">The Stack</p>
        <h2 className="font-serif text-4xl md:text-5xl mb-16">
          Six disciplines. <em className="text-gold-light">One system.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              to={`/services/${svc.slug}`}
              className="bg-card p-10 hover:bg-card/60 transition-colors block no-underline"
            >
              <p className="display-font text-[11px] tracking-[0.4em] text-gold mb-4 opacity-70">
                {svc.shortName}
              </p>
              <h3 className="font-serif text-2xl text-cream mb-3">{svc.name}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{svc.intro}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
