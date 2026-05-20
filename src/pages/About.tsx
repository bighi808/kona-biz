import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";

export default function About() {
  return (
    <Layout>
      <SEOHead
        title="About Plaintiff Growth | Personal Injury Marketing Specialists"
        description="Built from Kona, Hawaii. One PI firm per state. Zero media markups. Why we built it this way and who's behind it."
        canonicalPath="/about"
        breadcrumbs={[{ name: "About", path: "/about" }]}
      />
      <section className="section-padding max-w-4xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">About</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-8">
          Built from Kona. <em className="text-gold-light">Built for one firm per state.</em>
        </h1>
        <p className="font-serif italic text-xl text-muted-foreground mb-8 leading-relaxed">
          TODO: Port the founder / about copy from the existing lander or write fresh.
        </p>
      </section>
    </Layout>
  );
}
