import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";

export default function Contact() {
  return (
    <Layout>
      <SEOHead
        title="Contact Kona.biz | Personal Injury Marketing"
        description="Reach Kona.biz directly. Strategy call, audit request, or general questions."
        canonicalPath="/contact"
        breadcrumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <section className="section-padding max-w-3xl mx-auto">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-4">Contact</p>
        <h1 className="font-serif text-5xl md:text-6xl mb-8">Have a question <em className="text-gold-light">before you commit?</em></h1>
        <p className="text-muted-foreground mb-12">TODO: Wire up contact form (Formspree or similar). Port the booking section from the existing lander.</p>
      </section>
    </Layout>
  );
}
