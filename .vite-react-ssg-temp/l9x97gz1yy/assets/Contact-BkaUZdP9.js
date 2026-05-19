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
function Contact() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Contact Kona.biz | Personal Injury Marketing",
        description: "Reach Kona.biz directly. Strategy call, audit request, or general questions.",
        canonicalPath: "/contact",
        breadcrumbs: [{ name: "Contact", path: "/contact" }]
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-[0.45em] uppercase text-gold mb-4", children: "Contact" }),
      /* @__PURE__ */ jsxs("h1", { className: "font-serif text-5xl md:text-6xl mb-8", children: [
        "Have a question ",
        /* @__PURE__ */ jsx("em", { className: "text-gold-light", children: "before you commit?" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-12", children: "TODO: Wire up contact form (Formspree or similar). Port the booking section from the existing lander." })
    ] })
  ] });
}
export {
  Contact as default
};
