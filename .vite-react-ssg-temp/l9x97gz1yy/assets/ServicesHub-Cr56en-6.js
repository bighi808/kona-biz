import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { L as Layout, S as SEOHead, s as services } from "../main.mjs";
import "react-dom/client";
import "react-helmet-async";
import "react";
import "@tanstack/react-query";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function ServicesHub() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Services — PI Law Firm Marketing | Kona.biz",
        description: "Six integrated services — custom web, SEO + GEO, paid ads, GBP management, content marketing, AI consulting. One firm per state.",
        canonicalPath: "/services",
        breadcrumbs: [{ name: "Services", path: "/services" }]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: "Services" }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-5xl md:text-6xl mb-8", children: [
        "Six disciplines. ",
        /* @__PURE__ */ jsx("em", { className: "text-gold-light", children: "Fifty states each." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mb-16 leading-relaxed", children: "Every service is offered exclusively — one PI firm per state. Click into any service for the deep-dive and to check state availability." }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-px bg-border border border-border", children: services.map((svc, i) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/services/${svc.slug}`,
          className: "bg-card p-10 md:p-12 flex flex-col md:flex-row gap-8 md:items-center hover:bg-card/70 transition-colors no-underline",
          children: [
            /* @__PURE__ */ jsx("div", { className: "md:w-24 flex-shrink-0", children: /* @__PURE__ */ jsx("p", { className: "display-font text-5xl text-muted-foreground", children: String(i + 1).padStart(2, "0") }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl text-cream mb-3", children: svc.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: svc.intro })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-[10px] tracking-[0.3em] uppercase text-gold whitespace-nowrap", children: "50 State Pages ›" })
          ]
        },
        svc.slug
      )) })
    ] })
  ] });
}
export {
  ServicesHub as default
};
