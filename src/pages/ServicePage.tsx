import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { services } from "@/data/services";
import { states } from "@/data/states";
import { MARKET_STATUS_LABELS } from "@/data/marketStatus";
import NotFound from "./NotFound";

export default function ServicePage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = services.find((s) => s.slug === serviceSlug);

  if (!service) return <NotFound />;

  return (
    <Layout>
      <SEOHead
        title={service.metaTitle}
        description={service.metaDescription}
        canonicalPath={`/services/${service.slug}`}
        faqs={service.faqs}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      />
      <section className="section-padding max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">{service.shortName}</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">{service.name}</h1>
        <p className="font-serif italic text-xl text-muted-foreground mb-12 max-w-3xl">{service.intro}</p>

        <div className="prose-invert max-w-3xl text-muted-foreground leading-relaxed mb-16">{service.body}</div>

        {service.whatYouGet.length > 0 && (
          <div className="border-t border-border pt-12 mb-16">
            <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6">What You Get</p>
            <ul className="space-y-3 text-muted-foreground">
              {service.whatYouGet.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-gold flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="border-t border-border pt-12">
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6">State Availability</p>
          <h2 className="font-serif text-3xl mb-8">{service.name} in <em className="text-gold-light">your state.</em></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-border border border-border">
            {states.map((state) => (
              <Link
                key={state.slug}
                to={`/services/${service.slug}/${state.slug}`}
                className="bg-card p-4 hover:bg-card/60 transition-colors no-underline block"
              >
                <p className="text-[10px] tracking-[0.06em] uppercase text-cream mb-1">{state.name}</p>
                <p className={`text-[9px] tracking-[0.1em] uppercase ${state.status === "managed" ? "text-gold" : state.status === "available" ? "text-emerald-500" : "text-muted-foreground"}`}>
                  {MARKET_STATUS_LABELS[state.status]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
