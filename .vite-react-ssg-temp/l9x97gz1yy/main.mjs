import { jsx, jsxs } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import * as React from "react";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ArrowUpRight } from "lucide-react";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
      className
    ),
    ...props
  }
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
function Navbar() {
  return /* @__PURE__ */ jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex items-center justify-between bg-background/60 backdrop-blur-md border-b border-border/50", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "display-font text-2xl tracking-[0.12em] text-gold no-underline",
        children: "KONA.BIZ"
      }
    ),
    /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-[10px] tracking-[0.25em] uppercase text-muted-foreground", children: "Personal Injury Law Firm Marketing" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/states",
        className: "text-[10px] tracking-[0.3em] uppercase text-gold border border-gold/40 px-4 py-2 hover:bg-gold hover:text-background transition-colors no-underline",
        children: "Check Your State"
      }
    )
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border px-6 md:px-12 py-12 max-w-7xl mx-auto w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("p", { className: "display-font text-2xl tracking-[0.1em] text-muted-foreground", children: "KONA.BIZ" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[10px] tracking-[0.15em] uppercase text-muted-foreground mt-3 leading-relaxed", children: [
        "Personal Injury Marketing Specialists",
        /* @__PURE__ */ jsx("br", {}),
        "One Client Per State  •  Kona, Hawaii",
        /* @__PURE__ */ jsx("br", {}),
        "© 2026 Kona.biz. All rights reserved."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-gold transition-colors", children: "About" }),
      /* @__PURE__ */ jsx(Link, { to: "/services", className: "hover:text-gold transition-colors", children: "Services" }),
      /* @__PURE__ */ jsx(Link, { to: "/states", className: "hover:text-gold transition-colors", children: "States" }),
      /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-gold transition-colors", children: "Contact" }),
      /* @__PURE__ */ jsx(Link, { to: "/sitemap", className: "hover:text-gold transition-colors", children: "Sitemap" }),
      /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "hover:text-gold transition-colors", children: "Privacy" }),
      /* @__PURE__ */ jsx(Link, { to: "/terms-and-conditions", className: "hover:text-gold transition-colors", children: "Terms" })
    ] })
  ] }) });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background text-foreground flex flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1 pt-[72px] md:pt-[88px]", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const SITE_URL = "https://kona.biz";
const SITE_NAME = "Kona.biz";
const FIRM_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Kona.biz Personal Injury Marketing",
  description: "Personal injury law firm marketing agency. One firm per state — exclusivity is structural. Custom websites, SEO, GEO, paid ads, AI agents, local presence, and content. Based in Kona, Hawaii.",
  url: SITE_URL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kailua-Kona",
    addressRegion: "HI",
    addressCountry: "US"
  },
  knowsAbout: [
    "Personal Injury Marketing",
    "Law Firm SEO",
    "Generative Engine Optimization",
    "Law Firm Web Design",
    "Google Business Profile Management",
    "Legal Content Marketing",
    "Law Firm AI Consulting"
  ],
  serviceType: [
    "PI Law Firm Website Design",
    "Personal Injury SEO",
    "Personal Injury PPC",
    "Google Business Profile Management",
    "Legal Content Marketing",
    "Law Firm AI Consulting"
  ]
};
const buildFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a }
  }))
});
const buildBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    ...breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`
    }))
  ]
});
const SEOHead = ({
  title,
  description,
  canonicalPath,
  noIndex = false,
  ogImage,
  faqs,
  breadcrumbs
}) => {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const image = ogImage || `${SITE_URL}/og-default.jpg`;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    noIndex && /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: title }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "1200" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "630" }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_US" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: title }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image }),
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(FIRM_SCHEMA) }),
    faqs && faqs.length > 0 && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(buildFAQSchema(faqs)) }),
    breadcrumbs && breadcrumbs.length > 0 && /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) })
  ] });
};
const services = [
  {
    slug: "personal-injury-website-design",
    name: "PI Law Firm Website Design",
    shortName: "Web",
    navLabel: "Website Design",
    metaTitle: "Personal Injury Law Firm Website Design | Kona.biz",
    metaDescription: "Custom-coded personal injury law firm websites with local matrix architecture and built-in backend. One firm per state. No templates.",
    intro: "Custom-coded authority sites with local matrix architecture, custom backend platform, and GEO optimization built in from day one.",
    body: "TODO: Long-form body content describing the website design service in depth. Pulled from the konabiz-pi-domination-report.docx chapters on website architecture.",
    whatYouGet: [
      "Custom design and front-end build — no shared templates",
      "Matrix architecture: a page for every city you serve and every case type you handle",
      "Custom backend: analytics, CMS, review system, rank tracker",
      "GEO optimization for ChatGPT, Perplexity, and Google AI Overviews",
      "Custom AI agents for intake and client communication"
    ],
    faqs: [
      {
        q: "How long does a custom build take?",
        a: "Typical builds run 8-12 weeks depending on scope. Solo practitioner sites with 5 practice areas and 5 cities land closer to 8 weeks; multi-location enterprise builds with 15 practice areas and 20 cities take the full 12."
      }
    ]
  },
  {
    slug: "personal-injury-seo",
    name: "Personal Injury SEO",
    shortName: "SEO",
    navLabel: "SEO",
    metaTitle: "Personal Injury SEO | Kona.biz",
    metaDescription: "Local authority networks, hub-and-spoke content, and press release link building for personal injury law firms. One firm per state.",
    intro: "The highest-searched legal marketing category. Hub-and-spoke content, local authority networks, press release link building, and rank tracking.",
    body: "TODO: Body content from the report's SEO chapter.",
    whatYouGet: [
      "Local authority network build-out",
      "Hub-and-spoke content strategy and execution",
      "Press release link building",
      "Rank tracking with weekly reporting",
      "Technical SEO baseline and ongoing monitoring"
    ],
    faqs: []
  },
  {
    slug: "personal-injury-ppc",
    name: "Personal Injury PPC & Google Ads",
    shortName: "Ads",
    navLabel: "Paid Ads",
    metaTitle: "Personal Injury PPC & Google Ads Management | Kona.biz",
    metaDescription: "Google Ads, LSA, and Meta campaigns for personal injury firms. Ad spend billed at cost — zero media markup.",
    intro: "Google Ads, LSA, Meta campaigns managed for case volume. Ad spend billed at cost. No media markup.",
    body: "TODO: Body content from the report's paid ads chapter.",
    whatYouGet: [
      "Google Ads campaign build and management",
      "Local Services Ads (LSA) setup and optimization",
      "Meta (Facebook + Instagram) campaign management",
      "High-intent targeting, state and city specific",
      "Zero markup on media — every dollar buys ads"
    ],
    faqs: []
  },
  {
    slug: "google-business-profile-law-firms",
    name: "Google Business Profile Management",
    shortName: "GBP",
    navLabel: "Google Business",
    metaTitle: "Google Business Profile Management for Law Firms | Kona.biz",
    metaDescription: "Setup, optimization, active management, and posting for your law firm Google Business Profile. One of the highest-ROI channels in PI marketing.",
    intro: "Setup, optimization, active management, and posting. The most underutilized tool in PI marketing — and one of the highest ROI.",
    body: "TODO: Body content from the report's GBP chapter.",
    whatYouGet: [
      "Profile setup and full optimization",
      "Active management and posting schedule",
      "Review generation system",
      "Q&A management",
      "Performance monitoring and monthly reporting"
    ],
    faqs: []
  },
  {
    slug: "legal-content-marketing",
    name: "Legal Content Marketing",
    shortName: "Content",
    navLabel: "Content",
    metaTitle: "Legal Content Marketing for Personal Injury Firms | Kona.biz",
    metaDescription: "PI-specific content strategy, ongoing production, GEO optimization for AI platforms, and press releases for link authority.",
    intro: "PI-specific content strategy, ongoing content production, GEO optimization for AI platforms, and press releases for link authority.",
    body: "TODO: Body content from the report's content chapter.",
    whatYouGet: [
      "Monthly content production calendar",
      "SEO + GEO optimized articles and resource pages",
      "Press release writing and distribution",
      "Topical authority building",
      "Editorial review by senior strategist"
    ],
    faqs: []
  },
  {
    slug: "law-firm-ai-consulting",
    name: "Law Firm AI Consulting",
    shortName: "AI",
    navLabel: "AI",
    metaTitle: "Law Firm AI Consulting & Custom Agents | Kona.biz",
    metaDescription: "Practice modernization consulting and custom AI agent development for intake, workflows, and client communication.",
    intro: "Practice modernization consulting and custom AI agent development for intake, workflows, and client communication. Lowest competition. Highest differentiation.",
    body: "TODO: Body content from the report's AI chapter.",
    whatYouGet: [
      "Strategic AI consulting for PI practices",
      "Custom AI agent development (intake, scheduling, follow-up)",
      "Internal workflow automation",
      "Client communication agents",
      "Quarterly strategic review"
    ],
    faqs: []
  }
];
function Index() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Kona.biz — Personal Injury Law Firm Marketing | One Firm Per State",
        description: "Full-stack digital authority for personal injury law firms. One firm per state — exclusivity is structural. SEO, GEO, paid ads, AI agents, local presence.",
        canonicalPath: "/"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding text-center max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "font-serif italic text-xl md:text-2xl text-muted-foreground mb-12", children: "Your competitors are watching this page right now." }),
      /* @__PURE__ */ jsxs("h1", { className: "display-font text-6xl md:text-8xl text-cream tracking-wider leading-none mb-12", children: [
        "One Firm.",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-gold-light", children: "Per State." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-serif italic text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed", children: "We build full-stack digital authority exclusively for personal injury firms. Your competitors cannot be our clients." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-3 mb-20", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/30 px-4 py-2", children: "One Client Per State" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2", children: "SEO + GEO" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2", children: "Custom Web" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2", children: "AI Consulting" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.25em] uppercase text-muted-foreground border border-border px-4 py-2", children: "Paid Ads" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-6", children: [
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/services",
            className: "inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-gold border border-gold px-6 py-4 hover:bg-gold hover:text-background transition-colors",
            children: [
              "See the Services ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 14 })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/states",
            className: "inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-muted-foreground border border-border px-6 py-4 hover:text-cream hover:border-cream transition-colors",
            children: [
              "Check Your State ",
              /* @__PURE__ */ jsx(ArrowUpRight, { size: 14 })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "section-padding border-t border-border max-w-6xl mx-auto w-full", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: "The Stack" }),
      /* @__PURE__ */ jsxs("h2", { className: "font-serif text-4xl md:text-5xl mb-16", children: [
        "Six disciplines. ",
        /* @__PURE__ */ jsx("em", { className: "text-gold-light", children: "One system." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border", children: services.map((svc) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/services/${svc.slug}`,
          className: "bg-card p-10 hover:bg-card/60 transition-colors block no-underline",
          children: [
            /* @__PURE__ */ jsx("p", { className: "display-font text-[11px] tracking-[0.4em] text-gold mb-4 opacity-70", children: svc.shortName }),
            /* @__PURE__ */ jsx("h3", { className: "font-serif text-2xl text-cream mb-3", children: svc.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs leading-relaxed text-muted-foreground", children: svc.intro })
          ]
        },
        svc.slug
      )) })
    ] })
  ] });
}
const About = lazy(() => import("./assets/About-D7RiM9gJ.js"));
const Contact = lazy(() => import("./assets/Contact-BkaUZdP9.js"));
const ServicesHub = lazy(() => import("./assets/ServicesHub-Cr56en-6.js"));
const ServicePage = lazy(() => import("./assets/ServicePage-DRDuUvkH.js"));
const StatesHub = lazy(() => import("./assets/StatesHub-BrLQAnxA.js"));
const StatePage = lazy(() => import("./assets/StatePage-muvtMkFU.js"));
const ServiceStatePage = lazy(() => import("./assets/ServiceStatePage-BVfMbatt.js"));
const Sitemap = lazy(() => import("./assets/Sitemap-Bi5mRS4P.js"));
const PrivacyPolicy = lazy(() => import("./assets/PrivacyPolicy-BDtmu2XL.js"));
const TermsConditions = lazy(() => import("./assets/TermsConditions-CQeT0qa5.js"));
const NotFound = lazy(() => import("./assets/NotFound-DvW2eGnU.js"));
const queryClient = new QueryClient();
const App = () => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(BrowserRouter, { basename: "/kona-biz/", children: /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsxs(Routes, { children: [
  /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Index, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/about", element: /* @__PURE__ */ jsx(About, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/contact", element: /* @__PURE__ */ jsx(Contact, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/services", element: /* @__PURE__ */ jsx(ServicesHub, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/services/:serviceSlug", element: /* @__PURE__ */ jsx(ServicePage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/services/:serviceSlug/:stateSlug", element: /* @__PURE__ */ jsx(ServiceStatePage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/states", element: /* @__PURE__ */ jsx(StatesHub, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/states/:stateSlug", element: /* @__PURE__ */ jsx(StatePage, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/sitemap", element: /* @__PURE__ */ jsx(Sitemap, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "/terms-and-conditions", element: /* @__PURE__ */ jsx(TermsConditions, {}) }),
  /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
] }) }) }) }) });
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(App, {}) })
);
export {
  Layout as L,
  SEOHead as S,
  services as s
};
