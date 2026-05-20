/**
 * The 6 matrix services. Each service × 50 states = 300 landing pages.
 * Slugs feed sitemap generation and SSG getStaticPaths.
 */
export interface Service {
  slug: string;
  name: string;
  shortName: string;             // For tickers and tight UI
  navLabel: string;
  metaTitle: string;             // For service hub page
  metaDescription: string;
  intro: string;
  body: string;
  whatYouGet: string[];
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "personal-injury-website-design",
    name: "PI Law Firm Website Design",
    shortName: "Web",
    navLabel: "Website Design",
    metaTitle: "Personal Injury Law Firm Website Design | Plaintiff Growth",
    metaDescription:
      "Custom-coded personal injury law firm websites with local matrix architecture and built-in backend. One firm per state. No templates.",
    intro:
      "Custom-coded authority sites with local matrix architecture, custom backend platform, and GEO optimization built in from day one.",
    body:
      "TODO: Long-form body content describing the website design service in depth. Pulled from the konabiz-pi-domination-report.docx chapters on website architecture.",
    whatYouGet: [
      "Custom design and front-end build — no shared templates",
      "Matrix architecture: a page for every city you serve and every case type you handle",
      "Custom backend: analytics, CMS, review system, rank tracker",
      "GEO optimization for ChatGPT, Perplexity, and Google AI Overviews",
      "Custom AI agents for intake and client communication",
    ],
    faqs: [
      {
        q: "How long does a custom build take?",
        a: "Typical builds run 8-12 weeks depending on scope. Solo practitioner sites with 5 practice areas and 5 cities land closer to 8 weeks; multi-location enterprise builds with 15 practice areas and 20 cities take the full 12.",
      },
    ],
  },
  {
    slug: "personal-injury-seo",
    name: "Personal Injury SEO",
    shortName: "SEO",
    navLabel: "SEO",
    metaTitle: "Personal Injury SEO | Plaintiff Growth",
    metaDescription:
      "Local authority networks, hub-and-spoke content, and press release link building for personal injury law firms. One firm per state.",
    intro:
      "The highest-searched legal marketing category. Hub-and-spoke content, local authority networks, press release link building, and rank tracking.",
    body: "TODO: Body content from the report's SEO chapter.",
    whatYouGet: [
      "Local authority network build-out",
      "Hub-and-spoke content strategy and execution",
      "Press release link building",
      "Rank tracking with weekly reporting",
      "Technical SEO baseline and ongoing monitoring",
    ],
    faqs: [],
  },
  {
    slug: "personal-injury-ppc",
    name: "Personal Injury PPC & Google Ads",
    shortName: "Ads",
    navLabel: "Paid Ads",
    metaTitle: "Personal Injury PPC & Google Ads Management | Plaintiff Growth",
    metaDescription:
      "Google Ads, LSA, and Meta campaigns for personal injury firms. Ad spend billed at cost — zero media markup.",
    intro:
      "Google Ads, LSA, Meta campaigns managed for case volume. Ad spend billed at cost. No media markup.",
    body: "TODO: Body content from the report's paid ads chapter.",
    whatYouGet: [
      "Google Ads campaign build and management",
      "Local Services Ads (LSA) setup and optimization",
      "Meta (Facebook + Instagram) campaign management",
      "High-intent targeting, state and city specific",
      "Zero markup on media — every dollar buys ads",
    ],
    faqs: [],
  },
  {
    slug: "google-business-profile-law-firms",
    name: "Google Business Profile Management",
    shortName: "GBP",
    navLabel: "Google Business",
    metaTitle: "Google Business Profile Management for Law Firms | Plaintiff Growth",
    metaDescription:
      "Setup, optimization, active management, and posting for your law firm Google Business Profile. One of the highest-ROI channels in PI marketing.",
    intro:
      "Setup, optimization, active management, and posting. The most underutilized tool in PI marketing — and one of the highest ROI.",
    body: "TODO: Body content from the report's GBP chapter.",
    whatYouGet: [
      "Profile setup and full optimization",
      "Active management and posting schedule",
      "Review generation system",
      "Q&A management",
      "Performance monitoring and monthly reporting",
    ],
    faqs: [],
  },
  {
    slug: "legal-content-marketing",
    name: "Legal Content Marketing",
    shortName: "Content",
    navLabel: "Content",
    metaTitle: "Legal Content Marketing for Personal Injury Firms | Plaintiff Growth",
    metaDescription:
      "PI-specific content strategy, ongoing production, GEO optimization for AI platforms, and press releases for link authority.",
    intro:
      "PI-specific content strategy, ongoing content production, GEO optimization for AI platforms, and press releases for link authority.",
    body: "TODO: Body content from the report's content chapter.",
    whatYouGet: [
      "Monthly content production calendar",
      "SEO + GEO optimized articles and resource pages",
      "Press release writing and distribution",
      "Topical authority building",
      "Editorial review by senior strategist",
    ],
    faqs: [],
  },
  {
    slug: "law-firm-ai-consulting",
    name: "Law Firm AI Consulting",
    shortName: "AI",
    navLabel: "AI",
    metaTitle: "Law Firm AI Consulting & Custom Agents | Plaintiff Growth",
    metaDescription:
      "Practice modernization consulting and custom AI agent development for intake, workflows, and client communication.",
    intro:
      "Practice modernization consulting and custom AI agent development for intake, workflows, and client communication. Lowest competition. Highest differentiation.",
    body: "TODO: Body content from the report's AI chapter.",
    whatYouGet: [
      "Strategic AI consulting for PI practices",
      "Custom AI agent development (intake, scheduling, follow-up)",
      "Internal workflow automation",
      "Client communication agents",
      "Quarterly strategic review",
    ],
    faqs: [],
  },
];
