/**
 * Audit Upsell — $497 PI Market Domination Audit.
 * Two-step form: details → confirmation.
 * Ported from konabiz-lander.html lines 1858-1991.
 */
import { useState } from "react";
import { states } from "@/data/states";

const FORMSPREE_URL = "https://formspree.io/f/YOUR_AUDIT_FORM_ID";

const includes = [
  "Google ranking audit",
  "GBP score and gaps",
  "Competitor landscape",
  "Legal directory check",
  "GEO visibility assessment",
  "Custom state roadmap",
  "Delivered in 5 business days",
  "One per state",
];

export default function AuditUpsell() {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState({ firm: "", state: "", email: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    setConfirmed({
      firm: String(formData.get("firm") || ""),
      state: String(formData.get("state") || ""),
      email: String(formData.get("email") || ""),
    });

    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
    } catch {
      // Show confirmation anyway — lead is captured client-side
    }
    setStep(2);
    setSubmitting(false);
  };

  return (
    <section className="bg-background border-t border-border" id="audit">
      <div className="max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          Next Step
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Your PI Market<br />
          <em className="text-gold-light not-italic font-normal italic">Domination Audit.</em>
        </h2>
        <p className="text-[16px] tracking-wide text-muted-foreground max-w-lg leading-loose">
          The free report gives you the strategic framework. The audit gives you the specific
          picture for your market — researched by hand, delivered personally.
        </p>

        <div className="relative bg-card mt-16 p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center overflow-hidden"
             style={{ border: "1px solid rgba(194,155,79,0.25)" }}>
          {/* Decorative $497 watermark */}
          <span className="display-font absolute right-[-20px] top-1/2 -translate-y-1/2 leading-none pointer-events-none whitespace-nowrap hidden lg:block"
                style={{ fontSize: "200px", color: "rgba(194,155,79,0.04)", letterSpacing: "-0.05em" }}
                aria-hidden>
            $497
          </span>

          {/* Left: description + includes list */}
          <div className="relative z-10">
            <div className="font-serif text-3xl text-cream mb-4 leading-tight">
              What We Research.<br />What We Deliver.
            </div>
            <p className="text-[16px] tracking-wide text-muted-foreground leading-loose max-w-lg mb-7">
              We analyze your firm's complete digital presence from the ground up. Your current
              rankings across key practice areas and cities. Your GBP performance and gaps.
              Your legal directory profiles. Your competitor landscape. Your AI platform
              visibility. And a custom roadmap for what it would take to dominate your state.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none">
              {includes.map((item) => (
                <li key={item} className="text-[14px] tracking-wider uppercase text-muted-foreground flex items-center gap-2">
                  <span className="w-0.5 h-0.5 rounded-full bg-gold" style={{width: "3px", height: "3px"}} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: 2-step form */}
          <div className="relative z-10 w-full lg:w-[340px]">
            <div className="bg-card p-8" style={{ border: "1px solid rgba(194,155,79,0.2)", backgroundColor: "hsl(var(--background))" }}>
              {step === 1 ? (
                <>
                  <div className="text-[9px] tracking-[0.35em] uppercase text-gold mb-2">Step 1 of 2</div>
                  <div className="font-serif text-xl text-cream mb-6 leading-tight">Request Your<br />State Audit</div>

                  <div className="text-center py-4 mb-5 border-b border-border">
                    <span className="display-font text-gold leading-none block" style={{ fontSize: "56px", letterSpacing: "0.02em" }}>$497</span>
                    <span className="text-[9px] tracking-wider uppercase text-muted-foreground mt-1 block">
                      Invoice sent within 24 hours &nbsp;•&nbsp; One per state
                    </span>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <AuditField id="audit-name" name="name" label="Your Name" placeholder="Your full name" />
                    <AuditField id="audit-email" name="email" type="email" label="Email Address" placeholder="you@yourfirm.com" />
                    <AuditField id="audit-firm" name="firm" label="Law Firm Name" placeholder="Your law firm name" />

                    <div className="mb-3.5">
                      <label htmlFor="audit-state" className="block text-[9px] tracking-[0.3em] uppercase text-gold mb-2">Your State</label>
                      <select id="audit-state" name="state" required defaultValue=""
                              className="w-full bg-background border border-border text-cream font-mono text-[15px] px-3.5 py-3 outline-none focus:border-gold transition-colors">
                        <option value="" disabled>Select your state</option>
                        {states.map((s) => (
                          <option key={s.slug} value={s.name} disabled={s.status === "managed"}>
                            {s.name}{s.status === "managed" ? " — Not Available" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button type="submit" disabled={submitting}
                            className="w-full bg-gold text-background font-mono text-[10px] tracking-[0.3em] uppercase font-medium py-4 mt-1 hover:bg-gold-light transition-colors disabled:opacity-60">
                      {submitting ? "Verifying..." : "Review My Request"}
                    </button>
                  </form>
                  <p className="text-[9px] tracking-wide uppercase text-muted-foreground mt-3 text-center leading-relaxed">
                    No payment now. We verify your state availability and send your invoice within 24 hours.
                    Credited toward your build if you become a client.
                  </p>
                </>
              ) : (
                <>
                  <span className="display-font text-gold mb-3 block" style={{ fontSize: "48px", letterSpacing: "0.05em" }}>PG</span>
                  <div className="font-serif text-xl text-cream mb-3 leading-tight">Request<br />Received.</div>
                  <p className="text-[14px] tracking-wide text-muted-foreground leading-loose mb-5">
                    We are verifying availability for your state and will send your invoice within
                    24 hours. Your audit begins the moment payment is confirmed.
                  </p>

                  <ConfirmDetail label="Firm" value={confirmed.firm} />
                  <ConfirmDetail label="State Requested" value={confirmed.state} />
                  <ConfirmDetail label="Invoice To" value={confirmed.email} />

                  <p className="text-[9px] tracking-wide uppercase text-muted-foreground leading-loose border-t border-border pt-4 mt-1">
                    If your state is available your invoice arrives within 24 hours. If for any reason
                    we cannot proceed you will hear from us within the same window. No payment is taken
                    unless we confirm availability first.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuditField({ id, name, label, placeholder, type = "text" }: {
  id: string; name: string; label: string; placeholder: string; type?: string;
}) {
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className="block text-[9px] tracking-[0.3em] uppercase text-gold mb-2">{label}</label>
      <input id={id} name={name} type={type} placeholder={placeholder} required autoComplete="off"
             className="w-full bg-background border border-border text-cream font-mono text-[15px] px-3.5 py-3 outline-none focus:border-gold transition-colors placeholder:text-muted-foreground placeholder:text-[11px]" />
    </div>
  );
}

function ConfirmDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background border border-border p-4 mb-3">
      <div className="text-[8px] tracking-[0.3em] uppercase text-gold mb-1">{label}</div>
      <div className="text-[15px] tracking-wider text-cream">{value}</div>
    </div>
  );
}
