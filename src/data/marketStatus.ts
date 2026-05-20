/**
 * The four-state market status system for Plaintiff Growth state pages.
 * Drives badge styling, CTA branching, and waitlist behavior.
 */
export type MarketStatus = "available" | "claimed" | "managed" | "waitlist";

export const MARKET_STATUS_LABELS: Record<MarketStatus, string> = {
  available: "Available",
  claimed:   "Exclusively Taken",
  managed:   "Exclusively Managed",
  waitlist:  "On Waitlist",
};

export const MARKET_STATUS_DESCRIPTIONS: Record<MarketStatus, string> = {
  available:
    "Open Market. Full service page live and indexed. CTA active. Prospect can claim this state by becoming a client.",
  claimed:
    "Exclusively Taken. Page stays live for SEO equity. Content shifts to 'this market is exclusively managed'. Waitlist CTA captures the lead.",
  managed:
    "Active Plaintiff Growth Client. Signals active presence without advertising the client. No CTA. Builds credibility by showing existing managed markets.",
  waitlist:
    "Interest Captured. Prospects who submitted a waitlist form for a Claimed market. Automatically notified if the market opens.",
};
