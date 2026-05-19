import { Helmet } from "react-helmet-async";

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://kona.biz";
const SITE_NAME = "Kona.biz";

// Baseline ProfessionalService schema — emitted on every page
const FIRM_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Kona.biz Personal Injury Marketing",
  description:
    "Personal injury law firm marketing agency. One firm per state — exclusivity is structural. Custom websites, SEO, GEO, paid ads, AI agents, local presence, and content. Based in Kona, Hawaii.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kailua-Kona",
    addressRegion: "HI",
    addressCountry: "US",
  },
  knowsAbout: [
    "Personal Injury Marketing",
    "Law Firm SEO",
    "Generative Engine Optimization",
    "Law Firm Web Design",
    "Google Business Profile Management",
    "Legal Content Marketing",
    "Law Firm AI Consulting",
  ],
  serviceType: [
    "PI Law Firm Website Design",
    "Personal Injury SEO",
    "Personal Injury PPC",
    "Google Business Profile Management",
    "Legal Content Marketing",
    "Law Firm AI Consulting",
  ],
};

export interface Breadcrumb {
  name: string;
  path: string;
}

export interface FAQ {
  q: string;
  a: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  noIndex?: boolean;
  ogImage?: string;
  faqs?: FAQ[];
  breadcrumbs?: Breadcrumb[];
}

const buildFAQSchema = (faqs: FAQ[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
});

const buildBreadcrumbSchema = (breadcrumbs: Breadcrumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ...breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  ],
});

const SEOHead = ({
  title,
  description,
  canonicalPath,
  noIndex = false,
  ogImage,
  faqs,
  breadcrumbs,
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const image = ogImage || `${SITE_URL}/og-default.jpg`;

  return (
    <Helmet>
      {/* Core */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Agency schema — every page */}
      <script type="application/ld+json">{JSON.stringify(FIRM_SCHEMA)}</script>

      {/* FAQPage */}
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(buildFAQSchema(faqs))}</script>
      )}

      {/* BreadcrumbList */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(buildBreadcrumbSchema(breadcrumbs))}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
