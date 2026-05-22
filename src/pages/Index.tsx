import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import Hero from "@/components/sections/Hero";
import WhyPillars from "@/components/sections/WhyPillars";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Methodology from "@/components/sections/Methodology";
import ValueStats from "@/components/sections/ValueStats";
import Comparison from "@/components/sections/Comparison";
import StateMap from "@/components/sections/StateMap";
import FreeReport from "@/components/sections/FreeReport";
import AuditUpsell from "@/components/sections/AuditUpsell";
import FAQ from "@/components/sections/FAQ";
import Booking from "@/components/sections/Booking";
import FooterContact from "@/components/sections/FooterContact";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Index() {
  const scope = useScrollReveal<HTMLDivElement>();

  return (
    <Layout>
      <SEOHead
        title="Plaintiff Growth — Personal Injury Law Firm Marketing | One Firm Per State"
        description="Full-stack digital authority for personal injury law firms. One firm per state — exclusivity is structural. SEO, GEO, paid ads, AI agents, local presence."
        canonicalPath="/"
      />

      <div ref={scope}>
        <Hero />
        <WhyPillars />
        <ServicesGrid />
        <Methodology />
        <Comparison />
        <StateMap />
        <FreeReport />
        <ValueStats />
        <AuditUpsell />
        <FAQ />
        <Booking />
        <FooterContact />
      </div>
    </Layout>
  );
}
