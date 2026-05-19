import { jsx, jsxs } from "react/jsx-runtime";
import { useParams, Link } from "react-router-dom";
import { s as services, L as Layout, S as SEOHead } from "../main.mjs";
import { s as states } from "./states-D6kv8sXC.js";
import { M as MARKET_STATUS_LABELS } from "./marketStatus-kayalPzM.js";
import NotFound from "./NotFound-DvW2eGnU.js";
import "react-dom/client";
import "react-helmet-async";
import "react";
import "@tanstack/react-query";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function ServicePage() {
  const { serviceSlug } = useParams();
  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) return /* @__PURE__ */ jsx(NotFound, {});
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: service.metaTitle,
        description: service.metaDescription,
        canonicalPath: `/services/${service.slug}`,
        faqs: service.faqs,
        breadcrumbs: [
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: service.shortName }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-5xl md:text-6xl mb-8 leading-tight", children: service.name }),
      /* @__PURE__ */ jsx("p", { className: "font-serif italic text-xl text-muted-foreground mb-12 max-w-3xl", children: service.intro }),
      /* @__PURE__ */ jsx("div", { className: "prose-invert max-w-3xl text-muted-foreground leading-relaxed mb-16", children: service.body }),
      service.whatYouGet.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-12 mb-16", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-6", children: "What You Get" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-3 text-muted-foreground", children: service.whatYouGet.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gold flex-shrink-0", children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx("span", { children: item })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-12", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-6", children: "State Availability" }),
        /* @__PURE__ */ jsxs("h2", { className: "font-serif text-3xl mb-8", children: [
          service.name,
          " in ",
          /* @__PURE__ */ jsx("em", { className: "text-gold-light", children: "your state." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-px bg-border border border-border", children: states.map((state) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/services/${service.slug}/${state.slug}`,
            className: "bg-card p-4 hover:bg-card/60 transition-colors no-underline block",
            children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.06em] uppercase text-cream mb-1", children: state.name }),
              /* @__PURE__ */ jsx("p", { className: `text-[9px] tracking-[0.1em] uppercase ${state.status === "managed" ? "text-gold" : state.status === "available" ? "text-emerald-500" : "text-muted-foreground"}`, children: MARKET_STATUS_LABELS[state.status] })
            ]
          },
          state.slug
        )) })
      ] })
    ] })
  ] });
}
export {
  ServicePage as default
};
