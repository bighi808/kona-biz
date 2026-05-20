/**
 * Booking — 30-minute strategy call section.
 * Currently a "Coming Soon" placeholder for the live scheduler.
 * Wire up to Calendly or similar when you're ready.
 * Ported from konabiz-lander.html booking section.
 */
export default function Booking() {
  return (
    <section className="bg-background border-t border-border" id="booking">
      <div className="max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          Strategy Call
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Schedule Your<br />
          <em className="text-gold-light not-italic font-normal italic">30-Minute Strategy Call.</em>
        </h2>
        <p className="text-[16px] tracking-wide text-muted-foreground max-w-xl leading-loose">
          No pitch. No pressure. A direct conversation about your market, your current position,
          and whether Kona.biz is the right fit for your firm.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 mt-16 items-start">
          {/* Left: calendar widget placeholder */}
          <div className="bg-card border border-border p-10">
            <div className="flex items-center justify-between mb-6">
              <button type="button" disabled
                      className="text-gold text-xl px-2 opacity-30 cursor-not-allowed">‹</button>
              <span className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                Calendar Loading
              </span>
              <button type="button" disabled
                      className="text-gold text-xl px-2 opacity-30 cursor-not-allowed">›</button>
            </div>

            <div className="text-[10px] tracking-[0.3em] uppercase text-gold mb-3">Available Times</div>
            <div className="text-[14px] tracking-wider text-muted-foreground leading-loose mb-8 italic">
              Select a date above to see available times.
            </div>

            <button type="button" disabled
                    className="w-full bg-gold/10 text-gold/40 font-mono text-[10px] tracking-[0.3em] uppercase font-medium py-4 cursor-not-allowed border border-gold/20">
              Confirm This Time
            </button>

            <div className="mt-10 pt-8 border-t border-border text-center">
              <div className="display-font text-gold text-[15px] tracking-[0.3em] mb-3">Online Booking Coming Soon</div>
              <p className="text-[14px] tracking-wide text-muted-foreground leading-loose">
                Live scheduling will be available shortly. In the meantime, use the contact form
                below and we will schedule your call directly.
              </p>
            </div>
          </div>

          {/* Right: call details */}
          <div>
            <h4 className="font-serif text-2xl text-cream mb-4 leading-snug">
              A direct conversation about<br />
              <em className="text-gold-light not-italic font-normal italic">your market and your position.</em>
            </h4>
            <p className="text-[16px] tracking-wide text-muted-foreground leading-loose mb-3">
              This is not a sales call. It is a 30-minute strategic conversation about where your
              firm stands in your state, what the competitive landscape looks like, and what it
              would take to own it.
            </p>
            <p className="text-[16px] tracking-wide text-muted-foreground leading-loose mb-8">
              If there is a fit, we will tell you. If there is not, we will tell you that too.
            </p>

            <div className="border-t border-border pt-6 space-y-5">
              <BookingDetail label="Duration" value="30 minutes" />
              <BookingDetail label="Format" value="Video or phone, your preference" />
              <BookingDetail label="Who" value="Direct with the Kona.biz strategist, not a sales rep" />
              <BookingDetail label="Cost" value="No charge. No obligation." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] tracking-[0.3em] uppercase text-gold mb-1">{label}</div>
      <div className="text-[16px] tracking-wide text-cream">{value}</div>
    </div>
  );
}
