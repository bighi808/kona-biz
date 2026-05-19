/**
 * Route definitions for vite-react-ssg static site generation.
 * Every URL gets a real HTML file at build time — no SPA blank-div for crawlers.
 *
 * Dev:  npm run dev          → vite (CSR via App.tsx with React.lazy code-splitting)
 * Prod: npm run build:ssg    → vite-react-ssg build (static HTML for all 365 routes)
 *
 * NOTE: All page components are EAGERLY imported here on purpose. vite-react-ssg's
 * collectAssets() doesn't handle React.lazy components and would throw
 * "TypeError: item.route.Component._payload._result.toString is not a function".
 * Client-side code splitting still happens via App.tsx, which uses React.lazy.
 * The SSG bundle gets a few extra kB but it's a build-time artifact, never shipped.
 */
import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { services } from "./data/services";
import { states } from "./data/states";

// Eager imports — see note above
import Index            from "./pages/Index";
import About            from "./pages/About";
import Contact          from "./pages/Contact";
import ServicesHub      from "./pages/ServicesHub";
import ServicePage      from "./pages/ServicePage";
import StatesHub        from "./pages/StatesHub";
import StatePage        from "./pages/StatePage";
import ServiceStatePage from "./pages/ServiceStatePage";
import Sitemap          from "./pages/Sitemap";
import PrivacyPolicy    from "./pages/PrivacyPolicy";
import TermsConditions  from "./pages/TermsConditions";
import NotFound         from "./pages/NotFound";

const SERVICE_SLUGS = services.map((s) => s.slug);
const STATE_SLUGS = states.map((s) => s.slug);

// Singleton QueryClient — retry off so SSG doesn't hang on failed fetches
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, staleTime: Infinity } },
});

function AppShell() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: AppShell,
    children: [
      { index: true, Component: Index },
      { path: "about",                Component: About },
      { path: "contact",              Component: Contact },
      { path: "sitemap",              Component: Sitemap },
      { path: "privacy-policy",       Component: PrivacyPolicy },
      { path: "terms-and-conditions", Component: TermsConditions },

      // ── Service hub + 6 service pages ─────────────────────────────────────
      { path: "services", Component: ServicesHub },
      {
        path: "services/:serviceSlug",
        Component: ServicePage,
        getStaticPaths: () => SERVICE_SLUGS.map((s) => `services/${s}`),
      },

      // ── 6 services × 50 states = 300 matrix pages ─────────────────────────
      {
        path: "services/:serviceSlug/:stateSlug",
        Component: ServiceStatePage,
        getStaticPaths: () =>
          SERVICE_SLUGS.flatMap((svc) =>
            STATE_SLUGS.map((st) => `services/${svc}/${st}`)
          ),
      },

      // ── State hub + 50 state pages ────────────────────────────────────────
      { path: "states", Component: StatesHub },
      {
        path: "states/:stateSlug",
        Component: StatePage,
        getStaticPaths: () => STATE_SLUGS.map((s) => `states/${s}`),
      },

      // ── 404 fallback ──────────────────────────────────────────────────────
      { path: "*", Component: NotFound },
    ],
  },
];
