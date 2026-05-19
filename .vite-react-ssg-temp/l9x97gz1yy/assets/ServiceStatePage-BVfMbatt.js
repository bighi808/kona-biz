import { jsx, jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
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
function ServiceStatePage() {
  const { serviceSlug, stateSlug } = useParams();
  const service = services.find((s) => s.slug === serviceSlug);
  const state = states.find((s) => s.slug === stateSlug);
  if (!service || !state) return /* @__PURE__ */ jsx(NotFound, {});
  const pageTitle = `${state.name} ${service.name} | Kona.biz`;
  const metaDescription = `${service.name} for personal injury law firms in ${state.name}. ${MARKET_STATUS_LABELS[state.status]} market. ${service.intro}`;
  const canonicalPath = `/services/${service.slug}/${state.slug}`;
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: pageTitle,
        description: metaDescription,
        canonicalPath,
        faqs: service.faqs,
        breadcrumbs: [
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
          { name: state.name, path: canonicalPath }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: [
        service.shortName,
        " · ",
        state.abbr
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-4xl md:text-6xl mb-8 leading-tight", children: [
        service.name,
        " in ",
        /* @__PURE__ */ jsxs("em", { className: "text-gold-light", children: [
          state.name,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-serif italic text-xl text-muted-foreground mb-12 max-w-3xl", children: service.intro }),
      /* @__PURE__ */ jsx("div", { className: "prose-invert max-w-3xl text-muted-foreground leading-relaxed mb-16", children: service.body }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-8 mb-12", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-3", children: [
          "Market Status — ",
          state.name
        ] }),
        /* @__PURE__ */ jsx("p", { className: `font-serif text-2xl ${state.status === "managed" ? "text-gold-light" : state.status === "available" ? "text-emerald-400" : "text-cream"}`, children: MARKET_STATUS_LABELS[state.status] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-3", children: state.intro })
      ] })
    ] })
  ] });
}
export {
  ServiceStatePage as default
};
