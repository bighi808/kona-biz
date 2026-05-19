/**
 * Why Kona.biz — 6 numbered pillars in a grid.
 * Ported from konabiz-lander.html lines 1616-1656.
 */
const pillars = [
  {
    num: "01",
    title: "PI Firms Only",
    body: "We work exclusively with personal injury firms. No family law. No criminal defense. No generalist clients. We know PI marketing the way your best attorney knows PI law — deeply, specifically, and without distraction.",
  },
  {
    num: "02",
    title: "One Client Per State",
    body: "When we take your state, your competitors cannot become our clients. Ever. We are fully invested in making you the dominant firm in every city you serve. That exclusivity is structural — not a promise, a policy.",
  },
  {
    num: "03",
    title: "Competitors Locked Out",
    body: "Once your state is claimed, the other PI firms in your market are watching from the sidelines. We build their competitor's authority network, their content, their ad campaigns. Not theirs.",
  },
  {
    num: "04",
    title: "Custom Built. Never Templates.",
    body: "Every site, every page, every content piece is built from scratch for your firm and your market. No shared frameworks. No recycled strategies. No other firm gets what you get.",
  },
  {
    num: "05",
    title: "No Media Markups",
    body: "Your ad spend goes 100% to the platforms. We never mark up media. Our fee covers strategy and management only — so every dollar you spend on ads actually buys ads.",
  },
  {
    num: "06",
    title: "The PI Attorney Network",
    body: "Kona.biz clients join a private, cross-state community of non-competing PI attorneys. Shared strategy, market insights, and referral opportunities. Launching 2027 — Command tier clients get early access.",
  },
];

export default function WhyPillars() {
  return (
    <section className="bg-card border-t border-b border-border">
      <div className="max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          Why Kona.biz
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Not an agency.<br />
          <em className="text-gold-light not-italic font-normal italic">A market weapon.</em>
        </h2>
        <p className="text-[13px] tracking-wide text-muted-foreground max-w-lg leading-loose">
          The model is different. The commitment is different. The results are different.
          Here is exactly how we work — and why no other agency can make the same offer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border mt-16">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="group relative bg-card p-10 overflow-hidden transition-colors duration-400 hover:bg-[#161613]"
            >
              {/* Gold left-border sweep on hover */}
              <span className="absolute top-0 left-0 w-0.5 h-0 bg-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:h-full" />

              <div
                className="display-font text-[#282820] leading-none mb-5 inline-block origin-left
                           transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                           group-hover:text-gold group-hover:scale-[1.22]
                           group-hover:[text-shadow:0_0_40px_rgba(194,155,79,0.5),0_0_80px_rgba(194,155,79,0.2)]"
                style={{ fontSize: "56px" }}
              >
                {p.num}
              </div>

              <h3 className="font-serif text-2xl text-cream mb-3 transition-colors duration-400 group-hover:text-gold-light">
                {p.title}
              </h3>
              <p className="text-xs leading-loose tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-[#b8b0a4]">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
