/**
 * Comparison — "Plaintiff Growth versus the standard personal injury agency."
 * 6 structural differences in a side-by-side 2-column table.
 * Ported from konabiz-lander.html lines 2378-2459.
 */
interface Row {
  label: string;
  them: string;
  us: string;
}

const rows: Row[] = [
  {
    label: "Exclusivity",
    them: "Will sign your three closest competitors next quarter. Your retainer funds the agency that funds their growth.",
    us:   "One personal injury firm per state. Once your state is claimed, every other personal injury firm in your market is structurally locked out — forever.",
  },
  {
    label: "Specialization",
    them: "Mixed roster — personal injury, family, criminal, dental, plumbing. Your strategist learned your industry on the job. Often on your account.",
    us:   "Personal injury law only. We know your case types, fee structures, and intake funnel as fluently as your best paralegal.",
  },
  {
    label: "Media Spend",
    them: "10–20% management markup baked into every ad dollar. On a $20K/mo Google Ads budget, that is $24K–$48K a year that never reached a single searcher.",
    us:   "Zero markup. Ever. Your media budget flows directly to Google, Meta, and LSA at platform cost. Our fee covers strategy and management only.",
  },
  {
    label: "Build",
    them: "Template site with cosmetic theming. The same WordPress framework powering forty other personal injury firms across the country — including the one across town.",
    us:   "Custom from the ground up. No two Plaintiff Growth client sites share structure. Every page, every city, every case type built for your market specifically.",
  },
  {
    label: "Tech Stack",
    them: "WordPress + a dozen plugins, third-party rank tracker, third-party review tool, separate CRM. Five logins. None of them talk to each other.",
    us:   "Purpose-built platform: analytics, CMS, review generation, rank tracking, and AI agents in one system. One login. Everything connected.",
  },
  {
    label: "Reporting",
    them: 'Vanity-metric dashboards. "Impressions up 40%." "Clicks up 18%." Nothing tied to a signed case or a settlement fee.',
    us:   "Signed-case attribution. We measure the metric your firm measures: cases booked, cases signed, fees earned. The rest is noise.",
  },
];

export default function Comparison() {
  return (
    <section className="bg-background border-t border-b border-border" id="compare">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          The Difference
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Plaintiff Growth versus<br />
          <em className="text-gold-light not-italic font-normal italic">the standard personal injury agency.</em>
        </h2>
        <p className="text-[16px] tracking-wide text-muted-foreground max-w-lg leading-loose">
          Six structural differences — not feature differences. The way the engagement is built,
          the way the money flows, the way exclusivity is enforced. Read it once and ask your
          current agency the same questions.
        </p>

        {/* ── Desktop: side-by-side grid ── */}
        <div className="hidden md:grid grid-cols-2 gap-px bg-border border border-border mt-16">
          {/* Header row */}
          <div className="p-8 bg-card">
            <div className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
              The Standard Personal Injury Agency
            </div>
            <div className="font-serif text-2xl text-cream leading-tight">What most firms pay for</div>
          </div>
          <div className="p-8 bg-card relative border-t-2 border-t-gold">
            <div className="text-[9px] tracking-[0.4em] uppercase text-gold mb-3">Plaintiff Growth</div>
            <div className="font-serif text-2xl text-cream leading-tight">
              What we built <em className="text-gold-light not-italic font-normal italic">instead.</em>
            </div>
          </div>
          {/* Rows */}
          {rows.flatMap((row) => [
            <div key={`them-${row.label}`} className="p-8 bg-card transition-colors duration-300 hover:bg-[#131310]">
              <div className="text-[9px] tracking-[0.35em] uppercase text-gold mb-2">{row.label}</div>
              <p className="text-[15px] leading-[1.85] tracking-wide text-muted-foreground">
                <span className="display-font text-[11px] tracking-[0.25em] text-[#6b5e4e] mr-2">&times;</span>
                {row.them}
              </p>
            </div>,
            <div key={`us-${row.label}`} className="p-8 bg-card transition-colors duration-300 hover:bg-[#1a1a16]">
              <div className="text-[9px] tracking-[0.35em] uppercase text-gold mb-2">{row.label}</div>
              <p className="text-[15px] leading-[1.85] tracking-wide text-cream">
                <span className="display-font text-[11px] tracking-[0.25em] text-gold mr-2">•</span>
                {row.us}
              </p>
            </div>,
          ])}
        </div>

        {/* ── Mobile: stacked category cards ── */}
        <div className="md:hidden mt-12 flex flex-col gap-px border border-border bg-border">
          {rows.map((row) => (
            <div key={row.label} className="bg-card">
              <div className="px-6 py-3 border-b border-border">
                <span className="text-[9px] tracking-[0.35em] uppercase text-gold">{row.label}</span>
              </div>
              <div className="px-6 py-5 border-b border-border/50">
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-2">The Standard Agency</p>
                <p className="text-[14px] leading-[1.8] tracking-wide text-muted-foreground">
                  <span className="display-font text-[11px] tracking-[0.25em] text-[#6b5e4e] mr-2">&times;</span>
                  {row.them}
                </p>
              </div>
              <div className="px-6 py-5 border-l-2 border-l-gold">
                <p className="text-[9px] tracking-[0.3em] uppercase text-gold mb-2">Plaintiff Growth</p>
                <p className="text-[14px] leading-[1.8] tracking-wide text-cream">
                  <span className="display-font text-[11px] tracking-[0.25em] text-gold mr-2">•</span>
                  {row.us}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
