/**
 * Methodology — "The Stack"
 *
 * Pure editorial. No diagram — the StackEngine animation in ServicesGrid
 * already made the visual argument. This section delivers the intellectual
 * argument: why six integrated disciplines compound into something
 * competitors can't replicate.
 *
 * Layout:
 *   TOP  — full-width header: eyebrow + h2 + intro
 *   LINE — gold divider
 *   BODY — two columns: numbered sequence left, compounding authority right
 */

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
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28">

        {/* Full-width header */}
        <div className="max-w-2xl mb-16">
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

        {/* Divider */}
        <div className="h-px mb-16" style={{ background: "rgba(187,147,84,0.22)" }} />

        {/* Two columns — numbered sequence left, compounding authority right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — numbered sequence */}
          <div className="divide-y divide-border">
            {legend.map((l) => (
              <div
                key={l.tag}
                className="group flex items-center gap-6 py-5 px-3 -mx-3 cursor-default"
                style={{ transition: "background 0.2s ease, padding-left 0.2s ease" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(187,147,84,0.06)";
                  (e.currentTarget as HTMLDivElement).style.paddingLeft = "20px";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
                  (e.currentTarget as HTMLDivElement).style.paddingLeft = "12px";
                }}
              >
                <span
                  className="display-font flex-shrink-0"
                  style={{ fontSize: "clamp(28px, 3vw, 38px)", letterSpacing: "0.1em", color: "hsl(var(--gold))", opacity: 0.5, lineHeight: 1, transition: "opacity 0.2s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLSpanElement).style.opacity = "1"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.opacity = "0.5"; }}
                >
                  {l.tag}
                </span>
                <span className="text-[14px] leading-snug text-muted-foreground group-hover:text-cream transition-colors duration-200">
                  {l.text}
                </span>
              </div>
            ))}
          </div>

          {/* Right — compounding authority argument */}
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
