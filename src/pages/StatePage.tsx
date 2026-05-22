import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { states } from "@/data/states";
import { services } from "@/data/services";
import { MARKET_STATUS_LABELS } from "@/data/marketStatus";
import NotFound from "./NotFound";

export default function StatePage() {
  const { stateSlug } = useParams<{ stateSlug: string }>();
  const state = states.find((s) => s.slug === stateSlug);

  if (!state) return <NotFound />;

  return (
    <Layout>
      <SEOHead
        title={state.metaTitle}
        description={state.metaDescription}
        canonicalPath={`/states/${state.slug}`}
        breadcrumbs={[
          { name: "States", path: "/states" },
          { name: state.name, path: `/states/${state.slug}` },
        ]}
      />
      <section className="section-padding max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">{state.abbr} &middot; {MARKET_STATUS_LABELS[state.status]}</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-8">Personal Injury Law Firm Marketing in <em className="text-gold-light">{state.name}.</em></h1>
        <p className="font-serif italic text-xl text-muted-foreground mb-12 max-w-3xl">{state.intro}</p>

        <div className="border-t border-border pt-12">
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6">Services for {state.name}</p>
          <div className="grid gap-px bg-border border border-border">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}/${state.slug}`}
                className="bg-card p-8 hover:bg-card/60 transition-colors no-underline flex justify-between items-center"
              >
                <span className="font-serif text-xl text-cream">{svc.name}</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold">&rsaquo;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
