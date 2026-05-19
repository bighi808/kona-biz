import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Layout>
      <SEOHead
        title="Not Found | Kona.biz"
        description="The page you're looking for doesn't exist."
        canonicalPath="/404"
        noIndex
      />
      <section className="section-padding text-center max-w-2xl mx-auto">
        <p className="display-font text-7xl text-gold mb-4">404</p>
        <h1 className="font-serif text-4xl mb-6">Page Not Found</h1>
        <p className="text-muted-foreground mb-12">The page you were looking for isn't here.</p>
        <Link to="/" className="text-[10px] tracking-[0.3em] uppercase text-gold border border-gold px-6 py-4 hover:bg-gold hover:text-background transition-colors no-underline">
          Back to Home
        </Link>
      </section>
    </Layout>
  );
}
