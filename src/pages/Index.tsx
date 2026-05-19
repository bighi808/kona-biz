import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import WhyPillars from "@/components/sections/WhyPillars";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Methodology from "@/components/sections/Methodology";
import ValueStats from "@/components/sections/ValueStats";
import Comparison from "@/components/sections/Comparison";
import StateMap from "@/components/sections/StateMap";
import FreeReport from "@/components/sections/FreeReport";
import AuditUpsell from "@/components/sections/AuditUpsell";

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
      <ServicesGrid />
      <Methodology />
      <ValueStats />
      <Comparison />
      <StateMap />
      <FreeReport />
      <AuditUpsell />

      {/* Remaining: FAQ, Booking */}
    </Layout>
  );
}
