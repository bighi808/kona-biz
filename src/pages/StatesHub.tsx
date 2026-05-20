import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { states } from "@/data/states";
import { MARKET_STATUS_LABELS } from "@/data/marketStatus";

export default function StatesHub() {
  const available = states.filter((s) => s.status === "available").length;
  const managed = states.filter((s) => s.status === "managed").length;

  return (
    <Layout>
      <SEOHead
        title="State Availability — One PI Firm Per State | Plaintiff Growth"
        description="50 states. One Plaintiff Growth client per market. Check your state's status — Available, Claimed, or Exclusively Managed."
        canonicalPath="/states"
        breadcrumbs={[{ name: "States", path: "/states" }]}
      />
      <section className="section-padding max-w-6xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">Market Availability</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-8">
          {available} states open. <em className="text-gold-light">{managed} exclusively managed.</em>
        </h1>
        <p className="text-muted-foreground mb-16 max-w-2xl leading-relaxed">
          Every state is either available or exclusively managed. Once a competitor in your state signs with us, that market is locked.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border">
          {states.map((state) => (
            <Link
              key={state.slug}
              to={`/states/${state.slug}`}
              className="bg-card p-4 hover:bg-card/60 transition-colors no-underline block"
            >
              <p className="text-[10px] tracking-[0.06em] uppercase text-cream mb-1">{state.name}</p>
              <p className={`text-[9px] tracking-[0.1em] uppercase ${state.status === "managed" ? "text-gold" : state.status === "available" ? "text-emerald-500" : "text-muted-foreground"}`}>
                {MARKET_STATUS_LABELS[state.status]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
