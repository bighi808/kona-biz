import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { states } from "@/data/states";

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [drawerOpen,  setDrawerOpen]  = useState(false);
  const [modalOpen,   setModalOpen]   = useState(false);
  const [submitted,   setSubmitted]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer or modal is open
  useEffect(() => {
    document.body.style.overflow = (drawerOpen || modalOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen, modalOpen]);

  const closeAll = () => { setDrawerOpen(false); setModalOpen(false); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await fetch("https://formspree.io/f/YOUR_CONTACT_FORM_ID", {
      method: "POST", body: data,
      headers: { Accept: "application/json" },
    });
    setSubmitted(true);
  };

  const navLinks = [
    { to: "/",        label: "Home"     },
    { to: "/about",   label: "About"    },
    { to: "/services",label: "Services" },
    { to: "/states",  label: "States"   },
    { to: "/contact", label: "Contact"  },
  ];

  return (
    <>
      {/* ── Nav bar ──────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex items-center justify-between transition-all duration-400"
        style={{
          background:       scrolled ? "rgba(8,8,7,0.78)" : "rgba(8,8,7,0.69)",
          backdropFilter:   scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom:     scrolled ? "1px solid rgba(232,226,212,0.08)" : "none",
        }}
      >
        <Link to="/" className="shimmering-gold no-underline tracking-[0.12em]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 4.5vw, 2.0rem)" }}>
          PLAINTIFF GROWTH
        </Link>

        <div className="flex items-center gap-4">
          {/* Free Consultation → opens centered modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="hidden md:block text-[10px] tracking-[0.3em] uppercase font-mono cursor-pointer px-5 py-2.5 border"
            style={{
              background:   "transparent",
              color:        "hsl(var(--gold))",
              borderColor:  "hsl(var(--gold))",
              fontWeight:   600,
            }}
          >
            Free Consultation
          </button>

          {/* Hamburger → opens nav drawer */}
          <button
            onClick={() => setDrawerOpen(v => !v)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", lineHeight: 0 }}
          >
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"
                 style={{ transition: "opacity 0.2s" }}>
              {drawerOpen ? (
                // × when open
                <>
                  <line x1="2" y1="2"  x2="22" y2="16" stroke="hsl(var(--gold))" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="22" y1="2" x2="2"  y2="16" stroke="hsl(var(--gold))" strokeWidth="1.5" strokeLinecap="round" />
                </>
              ) : (
                // ☰ at rest
                <>
                  <line x1="0" y1="1"  x2="24" y2="1"  stroke="hsl(var(--gold))" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="0" y1="9"  x2="24" y2="9"  stroke="hsl(var(--gold))" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="0" y1="17" x2="24" y2="17" stroke="hsl(var(--gold))" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Shared backdrop ──────────────────────────────────────────── */}
      <div
        onClick={closeAll}
        className="fixed inset-0 z-[60] transition-all duration-300"
        style={{
          background:           "rgba(8,8,7,0.60)",
          backdropFilter:       (drawerOpen || modalOpen) ? "blur(4px)" : "blur(0px)",
          WebkitBackdropFilter: (drawerOpen || modalOpen) ? "blur(4px)" : "blur(0px)",
          opacity:              (drawerOpen || modalOpen) ? 1 : 0,
          pointerEvents:        (drawerOpen || modalOpen) ? "auto" : "none",
        }}
      />

      {/* ── Navigation drawer ────────────────────────────────────────── */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[70] flex flex-col"
        style={{
          width:      "min(360px, 100vw)",
          background: "#0e0d0b",
          borderLeft: "1px solid rgba(187,147,84,0.18)",
          transform:  drawerOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.38s cubic-bezier(0.16,1,0.3,1)",
          overflowY:  "auto",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6"
             style={{ borderBottom: "1px solid rgba(232,226,212,0.07)" }}>
          <p className="shimmering-gold tracking-[0.1em]"
             style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem" }}>
            Plaintiff Growth
          </p>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close menu"
                  style={{ background: "none", border: "none", cursor: "pointer",
                           fontSize: "22px", lineHeight: 1, color: "rgba(232,226,212,0.5)" }}>
            ×
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-8 py-10 gap-1 flex-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to} to={to}
              onClick={() => setDrawerOpen(false)}
              className="font-serif text-cream no-underline py-4 flex items-center justify-between group"
              style={{
                fontSize:     "clamp(28px, 5vw, 36px)",
                borderBottom: "1px solid rgba(232,226,212,0.06)",
                letterSpacing: "0.02em",
              }}
            >
              <span className="group-hover:text-gold transition-colors duration-200">{label}</span>
              <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-base">→</span>
            </Link>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="px-8 pb-10 pt-4" style={{ borderTop: "1px solid rgba(232,226,212,0.07)" }}>
          <p className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground mb-5 leading-relaxed">
            One personal injury firm per state.<br />Check if yours is still available.
          </p>
          <button
            onClick={() => { setDrawerOpen(false); setModalOpen(true); }}
            className="w-full font-mono text-[10px] tracking-[0.3em] uppercase py-4 transition-colors duration-200"
            style={{
              background:  "hsl(var(--gold))",
              color:       "#080807",
              border:      "1px solid hsl(var(--gold))",
              fontWeight:  600,
              cursor:      "pointer",
            }}
          >
            Free Consultation →
          </button>
        </div>
      </div>

      {/* ── Centered consultation modal ──────────────────────────────── */}
      <div
        className="fixed inset-0 z-[80] flex items-center justify-center px-4"
        style={{
          pointerEvents: modalOpen ? "auto" : "none",
        }}
      >
        <div
          style={{
            width:      "min(560px, 100%)",
            background: "#0e0d0b",
            border:     "1px solid rgba(187,147,84,0.32)",
            boxShadow:  "0 0 80px rgba(187,147,84,0.14), 0 32px 64px rgba(0,0,0,0.5)",
            maxHeight:  "90vh",
            overflowY:  "auto",
            opacity:    modalOpen ? 1 : 0,
            transform:  modalOpen ? "scale(1) translateY(0)" : "scale(0.96) translateY(12px)",
            transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-start justify-between px-8 pt-8 pb-5"
               style={{ borderBottom: "1px solid rgba(232,226,212,0.07)" }}>
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-gold mb-2">
                Plaintiff Growth
              </p>
              <h2 className="font-serif text-cream leading-tight"
                  style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>
                Free Consultation
              </h2>
              <p className="font-mono text-[11px] text-muted-foreground mt-2 leading-relaxed">
                One state. One firm. Let's talk about yours.
              </p>
            </div>
            <button onClick={() => { setModalOpen(false); setSubmitted(false); }}
                    aria-label="Close"
                    style={{ background: "none", border: "none", cursor: "pointer",
                             fontSize: "24px", lineHeight: 1, color: "rgba(232,226,212,0.45)",
                             flexShrink: 0, marginTop: "2px" }}>
              ×
            </button>
          </div>

          {/* Modal form */}
          <div className="px-8 py-7">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-14">
                <div style={{ fontSize: "40px", color: "hsl(var(--gold))" }}>✓</div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">Message Received</p>
                <p className="font-serif italic text-muted-foreground text-lg leading-relaxed">
                  We'll be in touch within one business day to discuss your state.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setModalOpen(false); }}
                  className="mt-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-cream transition-colors"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" name="firstName" placeholder="Thomas"       required />
                  <Field label="Last Name"  name="lastName"  placeholder="Smith"        required />
                </div>
                <Field label="Law Firm Name" name="firmName" placeholder="Smith & Associates" required />

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
                    Your State *
                  </label>
                  <select name="state" required style={{
                    background: "rgba(232,226,212,0.04)", border: "1px solid rgba(232,226,212,0.12)",
                    color: "hsl(var(--cream))", padding: "11px 14px", fontSize: "13px",
                    fontFamily: "inherit", width: "100%", outline: "none", appearance: "none",
                  }}>
                    <option value="" style={{ background: "#0e0d0b" }}>Select your state…</option>
                    {states.map(s => (
                      <option key={s.slug} value={s.name} style={{ background: "#0e0d0b" }}>
                        {s.name}{s.status === "managed" ? " (Managed)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="Phone" name="phone" type="tel"   placeholder="+1 (808) 555-0100" />
                  <Field label="Email" name="email" type="email" placeholder="you@firm.com" required />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
                    What are you looking for?
                  </label>
                  <textarea name="message" rows={3} placeholder="Tell us about your firm and your goals…"
                            style={{
                              background: "rgba(232,226,212,0.04)", border: "1px solid rgba(232,226,212,0.12)",
                              color: "hsl(var(--cream))", padding: "11px 14px", fontSize: "13px",
                              fontFamily: "inherit", resize: "vertical", outline: "none", width: "100%",
                            }} />
                </div>

                <button type="submit"
                        className="w-full font-mono text-[10px] tracking-[0.28em] uppercase py-4 transition-colors duration-200 cursor-pointer"
                        style={{ background: "hsl(var(--gold))", color: "#080807",
                                 border: "1px solid hsl(var(--gold))", fontWeight: 600 }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--gold))";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.background = "hsl(var(--gold))";
                          (e.currentTarget as HTMLButtonElement).style.color = "#080807";
                        }}>
                  Request Consultation →
                </button>

                <p className="font-mono text-[9px] tracking-[0.15em] text-muted-foreground text-center leading-relaxed"
                   style={{ opacity: 0.6 }}>
                  We accept one firm per state. If your state is open, we'll confirm availability on the call.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Field({ label, name, placeholder, type = "text", required = false }: {
  label: string; name: string; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] tracking-[0.28em] uppercase text-muted-foreground">
        {label}{required && " *"}
      </label>
      <input type={type} name={name} placeholder={placeholder} required={required}
             style={{
               background: "rgba(232,226,212,0.04)", border: "1px solid rgba(232,226,212,0.12)",
               color: "hsl(var(--cream))", padding: "11px 14px", fontSize: "13px",
               fontFamily: "inherit", outline: "none", width: "100%",
             }} />
    </div>
  );
}
