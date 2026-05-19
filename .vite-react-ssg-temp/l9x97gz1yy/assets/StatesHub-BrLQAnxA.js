import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { L as Layout, S as SEOHead } from "../main.mjs";
import { s as states } from "./states-D6kv8sXC.js";
import { M as MARKET_STATUS_LABELS } from "./marketStatus-kayalPzM.js";
import "react-dom/client";
import "react-helmet-async";
import "react";
import "@tanstack/react-query";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function StatesHub() {
  const available = states.filter((s) => s.status === "available").length;
  const managed = states.filter((s) => s.status === "managed").length;
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "State Availability — One PI Firm Per State | Kona.biz",
        description: "50 states. One Kona.biz client per market. Check your state's status — Available, Claimed, or Exclusively Managed.",
        canonicalPath: "/states",
        breadcrumbs: [{ name: "States", path: "/states" }]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: "Market Availability" }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-5xl md:text-6xl mb-8", children: [
        available,
        " states open. ",
        /* @__PURE__ */ jsxs("em", { className: "text-gold-light", children: [
          managed,
          " exclusively managed."
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-16 max-w-2xl leading-relaxed", children: "Every state is either available or exclusively managed. Once a competitor in your state signs with us, that market is locked." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border", children: states.map((state) => /* @__PURE__ */ jsxs(
        Link,
        {
          to: `/states/${state.slug}`,
          className: "bg-card p-4 hover:bg-card/60 transition-colors no-underline block",
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.06em] uppercase text-cream mb-1", children: state.name }),
            /* @__PURE__ */ jsx("p", { className: `text-[9px] tracking-[0.1em] uppercase ${state.status === "managed" ? "text-gold" : state.status === "available" ? "text-emerald-500" : "text-muted-foreground"}`, children: MARKET_STATUS_LABELS[state.status] })
          ]
        },
        state.slug
      )) })
    ] })
  ] });
}
export {
  StatesHub as default
};
