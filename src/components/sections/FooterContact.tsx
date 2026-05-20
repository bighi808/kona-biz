/**
 * Footer-contact form — "Have a question before you commit?"
 * Sits between the booking section and the global footer.
 * Ported from konabiz-lander.html lines 2734-2820.
 */
import { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/YOUR_CONTACT_FORM_ID";

export default function FooterContact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
    } catch {
      // capture client-side regardless
    }
    setSubmitted(true);
  };

  return (
    <section className="border-t border-border" id="contact">
      <div className="max-w-6xl mx-auto px-12 py-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div>
          <h3 className="font-serif text-3xl text-cream leading-tight mb-3">
            Have a question<br />
            before you <em className="text-gold-light not-italic font-normal italic">commit?</em>
          </h3>
          <p className="text-[14px] tracking-wide text-muted-foreground leading-loose max-w-sm">
            We are happy to answer questions before you request a report or audit.
            Send us a message and we will get back to you directly.
          </p>
        </div>

        <div>
          {submitted ? (
            <div className="text-[14px] tracking-wider uppercase text-gold py-5 leading-loose">
              Message received. We will be in touch shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <input type="text" name="name" placeholder="Your name" required autoComplete="off"
                     className="w-full bg-card border border-border text-cream font-mono text-[15px] px-4 py-3.5 outline-none focus:border-gold/50 transition-colors placeholder:text-muted-foreground placeholder:text-[11px]" />
              <input type="email" name="email" placeholder="Your email" required autoComplete="off"
                     className="w-full bg-card border border-border text-cream font-mono text-[15px] px-4 py-3.5 outline-none focus:border-gold/50 transition-colors placeholder:text-muted-foreground placeholder:text-[11px]" />
              <textarea name="message" placeholder="Your question..." required
                        className="w-full bg-card border border-border text-cream font-mono text-[15px] px-4 py-3.5 outline-none focus:border-gold/50 transition-colors resize-none h-24 placeholder:text-muted-foreground placeholder:text-[11px]" />
              <button type="submit" disabled={submitting}
                      className="self-start bg-transparent border border-gold/40 text-gold font-mono text-[9px] tracking-[0.3em] uppercase px-5 py-3.5 hover:bg-gold hover:text-background hover:border-gold transition-colors disabled:opacity-60">
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
