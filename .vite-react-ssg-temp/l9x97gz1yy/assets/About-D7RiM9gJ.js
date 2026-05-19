import { jsxs, jsx } from "react/jsx-runtime";
import { L as Layout, S as SEOHead } from "../main.mjs";
import "react-dom/client";
import "react-helmet-async";
import "react";
import "@tanstack/react-query";
import "react-router-dom";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function About() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "About Kona.biz | Personal Injury Marketing Specialists",
        description: "Built from Kona, Hawaii. One PI firm per state. Zero media markups. Why we built it this way and who's behind it.",
        canonicalPath: "/about",
        breadcrumbs: [{ name: "About", path: "/about" }]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: "About" }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-5xl md:text-6xl mb-8", children: [
        "Built from Kona. ",
        /* @__PURE__ */ jsx("em", { className: "text-gold-light", children: "Built for one firm per state." })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-serif italic text-xl text-muted-foreground mb-8 leading-relaxed", children: "TODO: Port the founder / about copy from the existing lander or write fresh." })
    ] })
  ] });
}
export {
  About as default
};
