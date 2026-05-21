/**
 * Methodology — "The Stack" hub-and-spoke SVG diagram.
 *
 * Layout:
 *   TOP — two equal columns: intro text left, SVG diagram right
 *   BOTTOM — full-width centered: body copy + legend
 */
const nodes = [
  { id: "WEB",  num: "01", x: 260, y: 80  },
  { id: "SEO",  num: "02", x: 416, y: 170 },
  { id: "ADS",  num: "03", x: 416, y: 350 },
  { id: "AI",   num: "04", x: 260, y: 440 },
  { id: "GBP",  num: "05", x: 104, y: 350 },
  { id: "SOC",  num: "06", x: 104, y: 170 },
];

const legend = [
  { tag: "01", text: "Custom Web — the foundation every other channel points to" },
  { tag: "02", text: "SEO + GEO — authority on Google and AI search" },
  { tag: "03", text: "Paid Ads — high-intent traffic at media cost" },
  { tag: "04", text: "AI Agents — intake and ops inside your firm" },
  { tag: "05", text: "Local + Reputation — GBP, reviews, directories" },
  { tag: "06", text: "Content, Social, Video — continuous signal" },
];

export default function Methodology() {
  return (
    <section className="bg-card border-t border-b border-border" id="methodology">
      <div className="max-w-6xl mx-auto px-12 py-28">

        {/* ── TOP: two equal columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — intro text */}
          <div>
            <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
              The Stack
              <span className="h-px w-10 bg-gold opacity-40" />
            </p>
            <h2 className="font-serif text-cream leading-tight mb-6" style={{ fontSize: "clamp(32px, 4.5vw, 58px)" }}>
              Six disciplines.<br />
              <em className="text-gold-light not-italic font-normal italic">One system.</em>
            </h2>
            <p className="text-[16px] tracking-wide text-muted-foreground leading-loose">
              Most agencies sell these services in isolation. We run them as one integrated
              authority engine — each channel feeding the others, all of them pointing back to your firm.
            </p>
          </div>

          {/* Right — SVG diagram */}
          <div className="w-full max-w-[420px] aspect-square mx-auto">
            <svg viewBox="0 0 520 520" className="w-full h-full block" aria-hidden>
              <line x1="260" y1="204" x2="260" y2="122" className="method-spoke" />
              <line x1="309" y1="232" x2="380" y2="191" className="method-spoke" />
              <line x1="309" y1="288" x2="380" y2="329" className="method-spoke" />
              <line x1="260" y1="316" x2="260" y2="398" className="method-spoke" />
              <line x1="211" y1="288" x2="140" y2="329" className="method-spoke" />
              <line x1="211" y1="232" x2="140" y2="191" className="method-spoke" />

              <circle cx="260" cy="260" r="180" fill="none" stroke="rgba(194,155,79,0.07)" strokeWidth="0.8" strokeDasharray="1 4" />

              <g>
                <circle cx="260" cy="260" r="56" className="method-hub-pulse" />
                <circle cx="260" cy="260" r="56" fill="hsl(var(--card))" stroke="hsl(var(--gold))" strokeWidth="1.5" />
                <text x="260" y="254" textAnchor="middle" dominantBaseline="middle"
                      className="display-font" fill="hsl(var(--gold))" fontSize="13" letterSpacing="0.25em">AUTHORITY</text>
                <text x="260" y="276" textAnchor="middle" dominantBaseline="middle"
                      fill="hsl(var(--muted-foreground))" fontSize="8" letterSpacing="0.3em" fontFamily="DM Mono, monospace">
                  01 &mdash; 06
                </text>
              </g>

              {nodes.map((n) => (
                <g key={n.id} className="method-node">
                  <circle cx={n.x} cy={n.y} r="42" />
                  <text x={n.x} y={n.y - 6} textAnchor="middle" dominantBaseline="middle"
                        className="display-font" fontSize="12" letterSpacing="0.25em">
                    {n.id}
                  </text>
                  <text x={n.x} y={n.y + 12} textAnchor="middle" dominantBaseline="middle"
                        fill="hsl(var(--muted-foreground))" fontSize="8" letterSpacing="0.3em">
                    {n.num}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* ── BOTTOM: two columns — legend left, body copy right ── */}
        <div className="mt-20 pt-16 border-t border-border grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — numbered legend */}
          <div className="space-y-2">
            {legend.map((l) => (
              <div key={l.tag} className="flex items-baseline gap-4 py-1 text-[14px] leading-relaxed text-muted-foreground">
                <span className="display-font text-gold tracking-[0.25em] min-w-[44px] flex-shrink-0">{l.tag}</span>
                <span>{l.text}</span>
              </div>
            ))}
          </div>

          {/* Right — body copy */}
          <div>
            <h4 className="font-serif text-2xl text-cream leading-snug mb-6">
              The output is <em className="text-gold-light">compounding authority</em> — not a stack of disconnected line items.
            </h4>
            <p className="text-[16px] leading-loose text-muted-foreground mb-4">
              Your custom site sends signals to Google. The SEO and GEO work makes those
              signals authoritative. The paid ads pull in high-intent searchers your
              organic position then converts at a lower cost. Local presence reinforces
              every channel. AI agents handle intake so nothing leaks. Content keeps the
              engine fed.
            </p>
            <p className="text-[16px] leading-loose text-muted-foreground">
              Run any one of these alone and you get a marginal lift. Run all six pointed
              at the same goal in the same market and you build something competitors
              cannot reach into — a dominant position that defends itself.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
