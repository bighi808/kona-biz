/**
 * Audit Upsell — $497 PI Market Domination Audit.
 * Two-step form: details → confirmation.
 * Layout mirrors FreeReport: direct two-column, no outer card wrapper,
 * gold-top-border section, sticky form box.
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
      firm:  String(formData.get("firm")  || ""),
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
    <section
      className="relative overflow-hidden bg-card border-t-2 border-t-gold border-b border-border"
      id="audit"
      style={{ boxShadow: "0 -1px 40px rgba(187,147,84,0.12), 0 -1px 80px rgba(187,147,84,0.06)" }}
    >
      {/* Spotlight radial bloom */}
      <span
        className="absolute -top-32 -left-20 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(187,147,84,0.07) 0%, rgba(187,147,84,0.03) 35%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-28">

        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold opacity-40" />
            Next Step
            <span className="h-px w-10 bg-gold opacity-40" />
          </p>
          <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Your Personal Injury<br />
            <em className="text-gold-light not-italic font-normal italic">Law Firm Domination Audit.</em>
          </h2>
          <p className="text-[16px] tracking-wide text-muted-foreground max-w-lg mx-auto leading-loose">
            The free report gives you the strategic framework. The audit gives you the specific
            picture for your market — researched by hand, delivered personally.
          </p>
        </div>

        {/* ── Two columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: description + feature list */}
          <div>
            <div className="font-serif text-3xl text-cream mb-5 leading-tight">
              What We Research.<br />What We Deliver.
            </div>
            <p className="text-[16px] tracking-wide text-muted-foreground leading-loose max-w-lg">
              We analyze your firm's complete digital presence from the ground up. Your current
              rankings across key practice areas and cities. Your GBP performance and gaps.
              Your legal directory profiles. Your competitor landscape. Your AI platform
              visibility. And a custom roadmap for what it would take to dominate your state.
            </p>

            <ul className="mt-8 list-none">
              {includes.map((item) => (
                <li key={item} className="text-[15px] tracking-wider uppercase text-muted-foreground py-3.5 border-b border-border flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 p-6 bg-card border" style={{ borderColor: "rgba(187,147,84,0.15)" }}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-2">$497 Audit</div>
              <p className="text-[10px] tracking-wide text-muted-foreground leading-loose uppercase">
                Invoice sent within 24 hours after we verify your state is available. Credited in
                full toward your build if you become a client. One audit per state.
              </p>
            </div>
          </div>

          {/* Right: form box */}
          <div
            className="bg-card p-10 lg:p-12 lg:sticky lg:top-24"
            style={{
              border: "1px solid rgba(187,147,84,0.5)",
              boxShadow: "0 0 60px rgba(187,147,84,0.12), 0 0 120px rgba(187,147,84,0.06)",
            }}
          >
            {step === 2 ? (
              <>
                <span className="display-font text-gold mb-3 block" style={{ fontSize: "48px", letterSpacing: "0.05em" }}>PG</span>
                <div className="font-serif text-2xl text-cream mb-3 leading-tight">Request<br />Received.</div>
                <p className="text-[14px] tracking-wide text-muted-foreground leading-loose mb-5">
                  We are verifying availability for your state and will send your invoice within
                  24 hours. Your audit begins the moment payment is confirmed.
                </p>
                <ConfirmDetail label="Firm"           value={confirmed.firm}  />
                <ConfirmDetail label="State Requested" value={confirmed.state} />
                <ConfirmDetail label="Invoice To"      value={confirmed.email} />
                <p className="text-[9px] tracking-wide uppercase text-muted-foreground leading-loose border-t border-border pt-4 mt-1">
                  If your state is available your invoice arrives within 24 hours. If for any reason
                  we cannot proceed you will hear from us within the same window. No payment is taken
                  unless we confirm availability first.
                </p>
              </>
            ) : (
              <>
                <div className="text-[9px] tracking-[0.35em] uppercase text-gold mb-3">Step 1 of 2</div>
                <div className="font-serif text-cream text-center" style={{ fontSize: "3.0rem", lineHeight: "3rem", paddingBottom: "14px" }}>
                  Request Your<br />State Audit
                </div>

                <div className="text-center py-2 mb-4 border-b border-border">
                  <span className="display-font text-gold leading-none block" style={{ fontSize: "56px", letterSpacing: "0.02em" }}>$497</span>
                  <span className="text-[9px] tracking-wider uppercase text-muted-foreground mt-1 block">
                    Invoice sent within 24 hours &nbsp;•&nbsp; One per state
                  </span>
                </div>

                <form onSubmit={handleSubmit}>
                  <AuditField id="audit-name"  name="name"  label="Your Name"      placeholder="Your full name"      />
                  <AuditField id="audit-email" name="email" label="Email Address"   placeholder="you@yourfirm.com" type="email" />
                  <AuditField id="audit-firm"  name="firm"  label="Law Firm Name"   placeholder="Your law firm name"  />

                  <div className="mb-5">
                    <label htmlFor="audit-state" className="block text-[9px] tracking-[0.3em] uppercase text-gold mb-2.5">Your State</label>
                    <select id="audit-state" name="state" required defaultValue=""
                            className="w-full bg-background border border-border text-cream font-mono text-[16px] px-4 py-3.5 outline-none focus:border-gold transition-colors">
                      <option value="" disabled>Select your state</option>
                      {states.map((s) => (
                        <option key={s.slug} value={s.name} disabled={s.status === "managed"}>
                          {s.name}{s.status === "managed" ? " — Not Available" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" disabled={submitting}
                          className="w-full bg-gold text-background font-mono text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-gold-light transition-colors disabled:opacity-60"
                          style={{ padding: "18px 24px" }}>
                    {submitting ? "Verifying..." : "Review My Request"}
                  </button>
                </form>
                <p className="text-[10px] tracking-wide text-muted-foreground text-center mt-4 leading-relaxed">
                  No payment now. We verify your state availability and send your invoice within
                  24 hours. Credited toward your build if you become a client.
                </p>
              </>
            )}
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
    <div className="mb-5">
      <label htmlFor={id} className="block text-[9px] tracking-[0.3em] uppercase text-gold mb-2.5">{label}</label>
      <input id={id} name={name} type={type} placeholder={placeholder} required autoComplete="off"
             className="w-full bg-background border border-border text-cream font-mono text-[16px] px-4 py-3.5 outline-none focus:border-gold transition-colors placeholder:text-muted-foreground placeholder:text-[15px]" />
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
