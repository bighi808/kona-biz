import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import WhyPillars from "@/components/sections/WhyPillars";

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
      <WhyPillars />

      {/* More sections coming in subsequent commits:
          Services grid, Value/Math, Methodology diagram, Comparison,
          State Map, Free Report, Audit Upsell, FAQ, Booking */}
    </Layout>
  );
}
