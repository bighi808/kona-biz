/**
 * Free Report — lead-capture form for the PI Market Domination Report.
 * Ported from konabiz-lander.html lines 1747-1856.
 *
 * NOTE: Form action is a Formspree placeholder URL. Swap the action
 * URL with your real Formspree endpoint once you have one.
 */
import { useState } from "react";
import { states } from "@/data/states";

const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORM_ID";

const features = [
  "Why most PI websites are digital brochures, not market weapons",
  "The local SEO game most PI firms are playing wrong",
  "GEO — the AI search frontier almost no PI firm has touched",
  "Paid ads — when they work and when they waste money",
  "AI in your practice — the operational edge your competitors are missing",
  "What a fully deployed market domination system looks like",
];

export default function FreeReport() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
      // Scroll down to audit upsell after success
      setTimeout(() => {
        document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-card border-t-2 border-t-gold border-b border-border"
      id="claim"
      style={{ boxShadow: "0 -1px 40px rgba(194,155,79,0.12), 0 -1px 80px rgba(194,155,79,0.06)" }}
    >
      {/* Spotlight radial bloom */}
      <span
        className="absolute -top-32 -right-20 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(194,155,79,0.07) 0%, rgba(194,155,79,0.03) 35%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          Free Report
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-3" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Get the PI Market<br />
          <em className="text-gold-light not-italic font-normal italic">Domination Report.</em>
        </h2>
        <p className="font-serif italic text-muted-foreground max-w-2xl mt-1 mb-0"
           style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
          What It Takes to Dominate Google and AI Search as a Personal Injury Firm
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mt-16">
          {/* Left: copy + features */}
          <div>
            <p className="text-[16px] tracking-wide text-muted-foreground leading-loose max-w-lg">
              A strategic briefing on exactly what it takes to win on Google and AI search as a
              personal injury firm in 2026. What the leading firms are doing. Where the gaps are.
              And what it would take to close them in your market.
            </p>

            <ul className="mt-8 list-none">
              {features.map((f) => (
                <li key={f} className="text-[15px] tracking-wider uppercase text-muted-foreground py-3.5 border-b border-border flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-card border" style={{ borderColor: "rgba(194,155,79,0.15)" }}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">Inside This Report</div>
              <p className="text-[10px] tracking-wide text-muted-foreground leading-loose uppercase">
                The strategic framework the leading PI firms are using to dominate Google and AI search
                right now — and the gaps most of their competitors have not closed yet. Read it before
                your market is claimed.
              </p>
            </div>
          </div>

          {/* Right: form box */}
          <div className="bg-card p-10 lg:p-12 lg:sticky lg:top-24"
               style={{
                 border: "1px solid rgba(194,155,79,0.5)",
                 boxShadow: "0 0 60px rgba(194,155,79,0.12), 0 0 120px rgba(194,155,79,0.06)",
               }}>
            {submitted ? (
              <div className="text-center py-10">
                <span className="display-font text-gold tracking-wider block mb-4" style={{ fontSize: "56px" }}>PG</span>
                <div className="font-serif text-2xl text-cream mb-3">Report on its way.</div>
                <p className="text-[10px] tracking-wider uppercase text-muted-foreground leading-loose">
                  Check your inbox. Your state is still available — for now.
                  If you are ready for the next step, scroll down.
                </p>
              </div>
            ) : (
              <>
                <div className="font-serif text-2xl text-cream mb-2 leading-tight">Claim Your<br />Free Report</div>
                <p className="text-[15px] tracking-wider uppercase text-muted-foreground mb-8 leading-relaxed">
                  Enter your details below. Select your state. We will send the report immediately.
                </p>

                <form onSubmit={handleSubmit}>
                  <FormField id="lead-name" name="name" label="Your Name" placeholder="Your full name" />
                  <FormField id="lead-email" name="email" type="email" label="Email Address" placeholder="you@yourfirm.com" />

                  <div className="mb-5">
                    <label htmlFor="lead-state" className="block text-[9px] tracking-[0.3em] uppercase text-gold mb-2.5">
                      Your State
                    </label>
                    <select id="lead-state" name="state" required defaultValue=""
                            className="w-full bg-background border border-border text-cream font-mono text-[16px] px-4 py-3.5 outline-none focus:border-gold transition-colors">
                      <option value="" disabled>Select your state</option>
                      {states.map((s) => (
                        <option key={s.slug} value={s.name} disabled={s.status === "managed"}>
                          {s.name}{s.status === "managed" ? " — Exclusively Managed" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gold text-background font-mono text-[10px] tracking-[0.3em] uppercase font-medium py-4.5 mt-2 hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-wait"
                    style={{ padding: "18px 24px" }}
                  >
                    {submitting ? "Sending..." : "Send My Free Report"}
                  </button>
                  <p className="text-[10px] tracking-wide text-muted-foreground text-center mt-4 leading-relaxed">
                    No spam. No automated pitches. Your information is never shared. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ id, name, label, placeholder, type = "text" }: {
  id: string; name: string; label: string; placeholder: string; type?: string;
}) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-[9px] tracking-[0.3em] uppercase text-gold mb-2.5">{label}</label>
      <input id={id} name={name} type={type} placeholder={placeholder} required autoComplete="off"
             className="w-full bg-background border border-border text-cream font-mono text-[16px] px-4 py-3.5 outline-none focus:border-gold transition-colors placeholder:text-muted-foreground placeholder:text-[15px]" />
    </div>
  );
}
