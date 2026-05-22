import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { states } from "@/data/states";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    await fetch("https://formspree.io/f/YOUR_CONTACT_FORM_ID", {
      method: "POST", body: data,
      headers: { Accept: "application/json" },
    });
    setSubmitted(true);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex items-center justify-between transition-all duration-400"
        style={{
          background: scrolled ? "rgba(8,8,7,0.92)" : "rgba(8,8,7,0.69)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(232,226,212,0.08)" : "none",
        }}
      >
        <Link to="/" className="display-font text-2xl tracking-[0.12em] shimmering-gold no-underline">
          PLAINTIFF GROWTH
        </Link>


        {/* CTA button — gold by default, transparent on hover */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="text-[10px] tracking-[0.3em] uppercase font-mono cursor-pointer transition-all duration-200 px-5 py-2.5 border"
          style={{
            background: "hsl(var(--gold))",
            color: "#080807",
            borderColor: "hsl(var(--gold))",
            fontWeight: 600,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--gold))";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--gold))";
            (e.currentTarget as HTMLButtonElement).style.color = "#080807";
          }}
        >
          Free Consultation
        </button>
      </nav>

      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className="fixed inset-0 z-[60] transition-all duration-300"
        style={{
          background: "rgba(8,8,7,0.55)",
          backdropFilter: drawerOpen ? "blur(4px)" : "blur(0px)",
          WebkitBackdropFilter: drawerOpen ? "blur(4px)" : "blur(0px)",
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? "auto" : "none",
        }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col"
        style={{
          width: "min(480px, 100vw)",
          background: "#0e0d0b",
          borderLeft: "1px solid rgba(194,155,79,0.18)",
          transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1)",
          overflowY: "auto",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-start justify-between px-8 pt-8 pb-6" style={{ borderBottom: "1px solid rgba(232,226,212,0.07)" }}>
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-gold mb-2">
              Plaintiff Growth
            </p>
            <h2 className="display-font text-cream text-3xl tracking-wide">
              Free Consultation
            </h2>
            <p className="font-mono text-[11px] text-muted-foreground mt-2 leading-relaxed" style={{ maxWidth: "280px" }}>
              One state. One firm. Let's talk about yours.
            </p>
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-muted-foreground hover:text-cream transition-colors mt-1 flex-shrink-0"
            style={{ fontSize: "22px", lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="px-8 py-7 flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-20">
              <div style={{ fontSize: "40px", color: "hsl(var(--gold))" }}>✓</div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">Message Received</p>
              <p className="font-serif italic text-muted-foreground text-lg leading-relaxed">
                We'll be in touch within one business day to discuss your state.
              </p>
              <button
                onClick={() => { setSubmitted(false); setDrawerOpen(false); }}
                className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-cream transition-colors"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name" name="firstName" placeholder="Thomas" required />
                <Field label="Last Name" name="lastName" placeholder="Smith" required />
              </div>

              <Field label="Law Firm Name" name="firmName" placeholder="Smith & Associates" required />

              {/* State dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
                  Your State *
                </label>
                <select
                  name="state"
                  required
                  style={{
                    background: "rgba(232,226,212,0.04)",
                    border: "1px solid rgba(232,226,212,0.12)",
                    color: "hsl(var(--cream))",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    width: "100%",
                    outline: "none",
                    appearance: "none",
                  }}
                >
                  <option value="" style={{ background: "#0e0d0b" }}>Select your state…</option>
                  {states.map(s => (
                    <option key={s.slug} value={s.name} style={{ background: "#0e0d0b" }}>
                      {s.name}{s.status === "managed" ? " (Managed)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Phone" name="phone" type="tel" placeholder="+1 (808) 555-0100" />
                <Field label="Email" name="email" type="email" placeholder="you@firm.com" required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
                  What are you looking for?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your firm and your goals…"
                  style={{
                    background: "rgba(232,226,212,0.04)",
                    border: "1px solid rgba(232,226,212,0.12)",
                    color: "hsl(var(--cream))",
                    padding: "11px 14px",
                    fontSize: "13px",
                    fontFamily: "inherit",
                    resize: "vertical",
                    outline: "none",
                    width: "100%",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full font-mono text-[10px] tracking-[0.28em] uppercase py-4 mt-1 transition-all duration-200 cursor-pointer"
                style={{
                  background: "hsl(var(--gold))",
                  color: "#080807",
                  border: "1px solid hsl(var(--gold))",
                  fontWeight: 600,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--gold))";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--gold))";
                  (e.currentTarget as HTMLButtonElement).style.color = "#080807";
                }}
              >
                Request Consultation →
              </button>

              <p className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground text-center leading-relaxed" style={{ opacity: 0.6 }}>
                We accept one firm per state. If your state is open, we'll confirm availability on the call.
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

// Reusable field component
function Field({
  label, name, placeholder, type = "text", required = false,
}: {
  label: string; name: string; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
        {label}{required && " *"}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        style={{
          background: "rgba(232,226,212,0.04)",
          border: "1px solid rgba(232,226,212,0.12)",
          color: "hsl(var(--cream))",
          padding: "11px 14px",
          fontSize: "13px",
          fontFamily: "inherit",
          outline: "none",
          width: "100%",
        }}
      />
    </div>
  );
}
