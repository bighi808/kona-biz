/**
 * Ticker — horizontal scrolling band between hero and Why section.
 * Ported from konabiz-lander.html lines 1589-1614.
 *
 * CSS-only animation: two duplicated arrays of items in a flex row that
 * translates -50% over 30s, creating a seamless infinite loop.
 */
const items = [
  "One Personal Injury Firm Per State",
  "SEO + GEO Optimization",
  "Custom Web Development",
  "AI Practice Consulting",
  "Paid Ads Management",
  "Google Business Profile",
  "Legal Directory Management",
  "Review Generation",
  "YouTube Lead Generation",
  "Custom AI Agents",
];

function Item({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase text-muted-foreground whitespace-nowrap">
      <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
      {text}
    </span>
  );
}

export default function Ticker() {
  // Duplicate the list so the -50% translate yields a seamless loop
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-t border-b border-border bg-card">
      <div className="flex animate-ticker py-5 gap-12 w-max">
        {loop.map((text, i) => (
          <Item key={i} text={text} />
        ))}
      </div>
    </div>
  );
}
