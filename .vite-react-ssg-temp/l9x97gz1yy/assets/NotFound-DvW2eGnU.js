import { jsxs, jsx } from "react/jsx-runtime";
import { L as Layout, S as SEOHead } from "../main.mjs";
import { Link } from "react-router-dom";
import "react-dom/client";
import "react-helmet-async";
import "react";
import "@tanstack/react-query";
import "@radix-ui/react-tooltip";
import "clsx";
import "tailwind-merge";
import "lucide-react";
function NotFound() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(
      SEOHead,
      {
        title: "Not Found | Kona.biz",
        description: "The page you're looking for doesn't exist.",
        canonicalPath: "/404",
        noIndex: true
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "section-padding text-center max-w-2xl mx-auto", children: [
      /* @__PURE__ */ jsx("p", { className: "display-font text-7xl text-gold mb-4", children: "404" }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-4xl mb-6", children: "Page Not Found" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-12", children: "The page you were looking for isn't here." }),
      /* @__PURE__ */ jsx(Link, { to: "/", className: "text-[10px] tracking-[0.3em] uppercase text-gold border border-gold px-6 py-4 hover:bg-gold hover:text-background transition-colors no-underline", children: "Back to Home" })
    ] })
  ] });
}
export {
  NotFound as default
};
