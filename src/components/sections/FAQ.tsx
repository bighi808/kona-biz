/**
 * FAQ — 8 expandable Q&A items.
 * Ported from konabiz-lander.html lines 2615-2733 + accordion JS.
 *
 * One item open at a time. Smooth max-height transition + rotating + toggle.
 * Gold left-border slides in when item is open.
 */
import { useState } from "react";

interface Item {
  q: string;
  a: React.ReactNode;
}

const items: Item[] = [
  {
    q: "What happens if a competitor in my state signs with you before I do?",
    a: (
      <>
        <p>
          The state is theirs. Permanently. We do not move firms once a state is claimed, we do not
          run "sub-region" workarounds, and we do not let one firm slow-walk the engagement while
          a competitor waits in line.
        </p>
        <p>
          This is the trade-off of the model. It is also why <em>moving on the audit before someone
          else does</em> is the only meaningful step on this page. Once your state is claimed, the
          strategic conversation with us is over — regardless of what you would have paid.
        </p>
      </>
    ),
  },
  {
    q: "Why exclusivity? Doesn't that cap your business?",
    a: (
      <>
        <p>Yes. That is the point.</p>
        <p>
          A PI marketing agency that signs every firm in your city has every incentive to keep all
          of you running on the same playbook — so none of you dominate, all of you keep paying,
          and the agency revenue compounds. We rejected that model because it is structurally
          hostile to the firm paying the invoice.
        </p>
        <p>
          Capped engagement counts mean the work goes deep instead of wide. It means we are tied
          to your outcome instead of insulated from it.
        </p>
      </>
    ),
  },
  {
    q: "What does this actually cost?",
    a: (
      <>
        <p>
          The market domination audit is <em>$497</em>, credited in full toward your build if you
          become a client. That number is on this page because it is the only fixed number we publish.
        </p>
        <p>
          Engagement pricing depends on your market size, your existing digital footprint, the case
          types you focus on, and the ad budget you are prepared to deploy. We quote it after the
          audit — because quoting it before the audit would mean quoting it blind.
        </p>
        <p>
          What we will tell you up front: zero markup on media, no surprise line items, no annual
          price escalations baked into the contract.
        </p>
      </>
    ),
  },
  {
    q: "How long is the commitment?",
    a: (
      <>
        <p>
          Twelve months minimum. PI marketing is not a 90-day sprint. Building organic authority,
          training intake systems, producing matrix content, and earning Google's trust in a
          competitive market takes time — and shortening the runway is the fastest way to waste
          the spend.
        </p>
        <p>
          What you do not get locked into: media markup escalators, hidden auto-renewals, or
          termination fees designed to punish a clean exit. After year one, the engagement renews
          on a quarterly basis.
        </p>
      </>
    ),
  },
  {
    q: "I already have a marketing agency. What does the transition look like?",
    a: (
      <>
        <p>
          We handle it. Discovery starts before your current agency is notified. We audit what they
          have built, identify what is worth preserving and what was holding you back, and produce
          a transition map that protects your existing rankings, ad accounts, and review history.
        </p>
        <p>
          Most firms switch in 30–45 days with zero ranking drop and no campaign interruption.
          We have done this enough times that it does not feel like a switch — it feels like an upgrade.
        </p>
      </>
    ),
  },
  {
    q: "How are you different from the lead-generation companies?",
    a: (
      <>
        <p>
          Lead-gen companies sell the same leads to multiple firms. You get the lead. The two PI
          firms across town also got it. The case goes to whoever calls first or pitches hardest.
          Your conversion rate plateaus and the lead-gen company sells you more leads to compensate.
        </p>
        <p>
          We do the opposite. We build <em>your</em> authority so the prospects search for your
          firm by name and case type. Those calls do not need to be sold against anyone — because
          nobody else is fielding the same call.
        </p>
      </>
    ),
  },
  {
    q: "Your team is based in Hawaii. Does geography matter for my market?",
    a: (
      <>
        <p>
          For PI marketing in 2026, no. Every relevant tool, dataset, and platform is remote-native.
          We monitor your Google rankings, GBP performance, and ad accounts from the same screen
          your team would, and we are in your time zone for any client communication that needs it.
        </p>
        <p>
          What being based in Kona <em>does</em> mean: a small senior team, deliberate engagement
          count, and a working pace that prioritizes the work over the optics.
        </p>
      </>
    ),
  },
  {
    q: "What happens if results do not come?",
    a: (
      <>
        <p>
          The audit gives us both a defensible baseline before any work begins — current rankings,
          current GBP performance, current intake rate, current ad efficiency. Everything we do is
          measured against that baseline.
        </p>
        <p>
          If the system is underperforming the projection at the six-month checkpoint, we restructure
          the engagement at our cost. If it is underperforming at twelve months, you walk — and we
          have failed at our only job. We do not insulate ourselves from that outcome, because the
          exclusivity model means we cannot.
        </p>
      </>
    ),
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="bg-card border-t border-b border-border" id="faq">
      <div className="max-w-6xl mx-auto px-12 py-28">
        <p className="text-[10px] tracking-[0.45em] uppercase text-gold mb-6 flex items-center gap-4">
          Common Questions
          <span className="h-px w-10 bg-gold opacity-40" />
        </p>
        <h2 className="font-serif text-cream leading-tight mb-5" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
          Answers, before<br />
          <em className="text-gold-light not-italic font-normal italic">you ask them.</em>
        </h2>
        <p className="text-[16px] tracking-wide text-muted-foreground max-w-lg leading-loose">
          The questions every PI firm owner asks before signing. No marketing-speak.
          Direct answers to direct questions.
        </p>

        <div className="mt-14 border-t border-border">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className="relative border-b border-border">
                {/* Gold left-border sweep */}
                <span className={`absolute top-0 left-0 w-0.5 bg-gold transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "h-full" : "h-0"}`} />

                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className={`w-full text-left px-7 py-7 font-serif flex justify-between items-center gap-6 transition-colors duration-300 hover:bg-[rgba(187,147,84,0.02)] ${
                    open ? "text-gold-light" : "text-cream hover:text-gold-light"
                  }`}
                  style={{ fontSize: "clamp(18px, 1.6vw, 22px)" }}
                >
                  <span>{item.q}</span>
                  <span className={`display-font text-2xl text-gold flex-shrink-0 inline-block transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ maxHeight: open ? "1000px" : "0px" }}
                >
                  <div className="px-7 pb-8 max-w-3xl text-[16px] leading-loose tracking-wide text-muted-foreground [&_em]:not-italic [&_em]:text-cream [&_p+p]:mt-3.5">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
