import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import { services } from "@/data/services";

export default function Index() {
  return (
    <Layout>
      <SEOHead
        title="Kona.biz — Personal Injury Law Firm Marketing | One Firm Per State"
        description="Full-stack digital authority for personal injury law firms. One firm per state — exclusivity is structural. SEO, GEO, paid ads, AI agents, local presence."
        canonicalPath="/"
      />

      <Hero />
      <Ticker />

      {/* TEMP: services grid teaser — will be replaced by full ported sections in subsequent commits */}
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
