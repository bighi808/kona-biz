import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { L as Layout, S as SEOHead, s as services } from "../main.mjs";
import { s as states } from "./states-D6kv8sXC.js";
import "react-dom/client";
import "react-helmet-async";
import "react";
import "@tanstack/react-query";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function Sitemap() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Sitemap | Kona.biz",
        description: "Browse every page on Kona.biz.",
        canonicalPath: "/sitemap"
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: "Sitemap" }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-5xl mb-12", children: "All Pages" }),
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-cream mb-4 border-b border-border pb-2", children: "Core" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-gold no-underline", children: "Home" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "hover:text-gold no-underline", children: "About" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/services", className: "hover:text-gold no-underline", children: "Services" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/states", className: "hover:text-gold no-underline", children: "States" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "hover:text-gold no-underline", children: "Contact" }) })
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-cream mb-4 mt-10 border-b border-border pb-2", children: "Services" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-muted-foreground", children: services.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/services/${s.slug}`, className: "hover:text-gold no-underline", children: s.name }) }, s.slug)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-cream mb-4 border-b border-border pb-2", children: "States" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-1 text-sm text-muted-foreground columns-2", children: states.map((s) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: `/states/${s.slug}`, className: "hover:text-gold no-underline", children: s.name }) }, s.slug)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Sitemap as default
};
