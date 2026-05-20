import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { services } from "@/data/services";
import { states } from "@/data/states";

export default function Sitemap() {
  return (
    <Layout>
      <SEOHead
        title="Sitemap | Plaintiff Growth"
        description="Browse every page on Plaintiff Growth."
        canonicalPath="/sitemap"
      />
      <section className="section-padding max-w-5xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">Sitemap</p>
        <h1 className="font-serif text-5xl mb-12">All Pages</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-xl text-cream mb-4 border-b border-border pb-2">Core</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-gold no-underline">Home</Link></li>
              <li><Link to="/about" className="hover:text-gold no-underline">About</Link></li>
              <li><Link to="/services" className="hover:text-gold no-underline">Services</Link></li>
              <li><Link to="/states" className="hover:text-gold no-underline">States</Link></li>
              <li><Link to="/contact" className="hover:text-gold no-underline">Contact</Link></li>
            </ul>

            <h2 className="font-serif text-xl text-cream mb-4 mt-10 border-b border-border pb-2">Services</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-gold no-underline">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-cream mb-4 border-b border-border pb-2">States</h2>
            <ul className="space-y-1 text-sm text-muted-foreground columns-2">
              {states.map((s) => (
                <li key={s.slug}><Link to={`/states/${s.slug}`} className="hover:text-gold no-underline">{s.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
