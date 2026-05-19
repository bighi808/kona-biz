import { jsx, jsxs } from "react/jsx-runtime";
import { useParams, Link } from "react-router-dom";
import { L as Layout, S as SEOHead, s as services } from "../main.mjs";
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
function StatePage() {
  const { stateSlug } = useParams();
  const state = states.find((s) => s.slug === stateSlug);
  if (!state) return /* @__PURE__ */ jsx(NotFound, {});
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: state.metaTitle,
        description: state.metaDescription,
        canonicalPath: `/states/${state.slug}`,
        breadcrumbs: [
          { name: "States", path: "/states" },
          { name: state.name, path: `/states/${state.slug}` }
        ]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: [
        state.abbr,
        " · ",
        MARKET_STATUS_LABELS[state.status]
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-5xl md:text-6xl mb-8", children: [
        "PI Law Firm Marketing in ",
        /* @__PURE__ */ jsxs("em", { className: "text-gold-light", children: [
          state.name,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-serif italic text-xl text-muted-foreground mb-12 max-w-3xl", children: state.intro }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-border pt-12", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-6", children: [
          "Services for ",
          state.name
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-px bg-border border border-border", children: services.map((svc) => /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/services/${svc.slug}/${state.slug}`,
            className: "bg-card p-8 hover:bg-card/60 transition-colors no-underline flex justify-between items-center",
            children: [
              /* @__PURE__ */ jsx("span", { className: "font-serif text-xl text-cream", children: svc.name }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-gold", children: "›" })
            ]
          },
          svc.slug
        )) })
      ] })
    ] })
  ] });
}
export {
  StatePage as default
};
