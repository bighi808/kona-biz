import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";

// Eagerly load homepage — first page most visitors hit
import Index from "./pages/Index";

// Lazy-load other routes — each becomes its own chunk
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesHub />} />
            <Route path="/services/:serviceSlug" element={<ServicePage />} />
            <Route path="/services/:serviceSlug/:stateSlug" element={<ServiceStatePage />} />
            <Route path="/states" element={<StatesHub />} />
            <Route path="/states/:stateSlug" element={<StatePage />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
