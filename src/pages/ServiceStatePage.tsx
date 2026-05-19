import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { services } from "@/data/services";
import { states } from "@/data/states";
import { MARKET_STATUS_LABELS } from "@/data/marketStatus";
import NotFound from "./NotFound";

/**
 * Matrix page template — 6 services × 50 states = 300 pages.
 * Composes service + state data into a unique landing page per intersection.
 */
export default function ServiceStatePage() {
  const { serviceSlug, stateSlug } = useParams<{ serviceSlug: string; stateSlug: string }>();

  const service = services.find((s) => s.slug === serviceSlug);
  const state = states.find((s) => s.slug === stateSlug);

  if (!service || !state) return <NotFound />;

  const pageTitle = `${state.name} ${service.name} | Kona.biz`;
  const metaDescription = `${service.name} for personal injury law firms in ${state.name}. ${MARKET_STATUS_LABELS[state.status]} market. ${service.intro}`;
  const canonicalPath = `/services/${service.slug}/${state.slug}`;

  return (
    <Layout>
      <SEOHead
        title={pageTitle}
        description={metaDescription}
        canonicalPath={canonicalPath}
        faqs={service.faqs}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
          { name: state.name, path: canonicalPath },
        ]}
      />
      <section className="section-padding max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">
          {service.shortName} &middot; {state.abbr}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
          {service.name} in <em className="text-gold-light">{state.name}.</em>
        </h1>
        <p className="font-serif italic text-xl text-muted-foreground mb-12 max-w-3xl">{service.intro}</p>

        <div className="prose-invert max-w-3xl text-muted-foreground leading-relaxed mb-16">{service.body}</div>

        <div className="border-t border-border pt-8 mb-12">
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-3">Market Status &mdash; {state.name}</p>
          <p className={`font-serif text-2xl ${state.status === "managed" ? "text-gold-light" : state.status === "available" ? "text-emerald-400" : "text-cream"}`}>
            {MARKET_STATUS_LABELS[state.status]}
          </p>
          <p className="text-sm text-muted-foreground mt-3">{state.intro}</p>
        </div>
      </section>
    </Layout>
  );
}
