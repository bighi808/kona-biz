import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { services } from "@/data/services";

export default function ServicesHub() {
  return (
    <Layout>
      <SEOHead
        title="Services — PI Law Firm Marketing | Kona.biz"
        description="Six integrated services — custom web, SEO + GEO, paid ads, GBP management, content marketing, AI consulting. One firm per state."
        canonicalPath="/services"
        breadcrumbs={[{ name: "Services", path: "/services" }]}
      />
      <section className="section-padding max-w-6xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">Services</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-8">
          Six disciplines. <em className="text-gold-light">Fifty states each.</em>
        </h1>
        <p className="text-muted-foreground max-w-2xl mb-16 leading-relaxed">
          Every service is offered exclusively — one PI firm per state. Click into any service for the deep-dive and to check state availability.
        </p>

        <div className="grid gap-px bg-border border border-border">
          {services.map((svc, i) => (
            <Link
              key={svc.slug}
              to={`/services/${svc.slug}`}
              className="bg-card p-10 md:p-12 flex flex-col md:flex-row gap-8 md:items-center hover:bg-card/70 transition-colors no-underline"
            >
              <div className="md:w-24 flex-shrink-0">
                <p className="display-font text-5xl text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-3xl text-cream mb-3">{svc.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{svc.intro}</p>
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold whitespace-nowrap">
                50 State Pages &rsaquo;
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
