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
function PrivacyPolicy() {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsx(SEOHead, { title: "Privacy Policy | Kona.biz", description: "Kona.biz privacy policy.", canonicalPath: "/privacy-policy" }),
    /* @__PURE__ */ jsxs("section", { className: "section-padding max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-5xl mb-12", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground leading-relaxed", children: "TODO: Add privacy policy copy." })
    ] })
  ] });
}
export {
  PrivacyPolicy as default
};
