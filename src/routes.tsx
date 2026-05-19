/**
 * Route definitions for vite-react-ssg static site generation.
 * Every URL gets a real HTML file at build time — no SPA blank-div for crawlers.
 *
 * Dev:  npm run dev          → vite (CSR, fast HMR)
 * Prod: npm run build:ssg    → vite-react-ssg build (static HTML for all 365 routes)
 */
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { services } from "./data/services";
import { states } from "./data/states";

// Eagerly load homepage
import Index from "./pages/Index";

const About             = lazy(() => import("./pages/About"));
const Contact           = lazy(() => import("./pages/Contact"));
const ServicesHub       = lazy(() => import("./pages/ServicesHub"));
const ServicePage       = lazy(() => import("./pages/ServicePage"));
const StatesHub         = lazy(() => import("./pages/StatesHub"));
const StatePage         = lazy(() => import("./pages/StatePage"));
const ServiceStatePage  = lazy(() => import("./pages/ServiceStatePage"));
const Sitemap           = lazy(() => import("./pages/Sitemap"));
const PrivacyPolicy     = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions   = lazy(() => import("./pages/TermsConditions"));
const NotFound          = lazy(() => import("./pages/NotFound"));

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
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
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
