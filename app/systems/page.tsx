import type { Metadata } from "next";
import Link from "next/link";
import { systemComponents } from "@/data/process";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Systems, not screens: reusable components, their variants and states, plus error and edge-case design and microcopy.",
};

const edgeCases = [
  { state: "Loading", desc: "Skeleton or explicit progress — the system is never silent." },
  { state: "Empty", desc: "Named, explained emptiness with a clear next action." },
  { state: "Invalid input", desc: "Inline, immediate, actionable — no blame, no jargon." },
  { state: "Error", desc: "What happened, whose side it is on, what to do next." },
  { state: "Retry", desc: "Safe retry that never double-charges or duplicates." },
  { state: "Timeout", desc: "Never silent: the pending state is designed, not hoped for." },
  { state: "Session expiry", desc: "Resume from the last confirmed step, never from zero." },
  { state: "Unavailable", desc: "Explained unavailability with a human path." },
  { state: "Success", desc: "Explicit completion with reference and next steps." },
];

const microcopy = [
  {
    before: "The UPI ID entered does not exist or is not registered.",
    after: "We couldn't find that UPI ID. Check it and try again.",
    why: "States the action clearly and points to the fix, without blaming the user.",
    tone: "warn" as const,
  },
  {
    before: "Connectivity problems prevent verifying the UPI ID or completing the transaction.",
    after: "We're having connection trouble. Your payment hasn't gone through.",
    why: "Answers the real question — is my money safe? — before asking for anything.",
    tone: "danger" as const,
  },
  {
    before: "An error occurred while processing your request. Please try again later.",
    after: "Something went wrong on our side. Nothing was charged. Tap to retry.",
    why: "Owns the failure, states the money state, gives one obvious action.",
    tone: "warn" as const,
  },
];

function ComponentViz({ name }: { name: string }) {
  return (
    <div className="flex h-20 items-center justify-center border border-dashed border-ink/20 bg-paper">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        {name}
      </span>
    </div>
  );
}

export default function SystemsPage() {
  return (
    <div>
      <header className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-28">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
            03 — Systems
          </p>
          <h1 className="h-giant mt-7 max-w-[860px] text-ink">
            Systems, not screens.
          </h1>
          <p className="mt-7 max-w-[620px] text-[14.5px] leading-[1.8] text-muted">
            Reusable UI patterns with defined variants and states — this is how I keep enterprise
            products consistent and delivery fast. Plus the two disciplines most portfolios skip:
            edge-case design and microcopy.
          </p>
        </div>
      </header>

      {/* Component library */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-24">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="h-section text-ink">Component → Variants → States → Usage</h2>
            <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint sm:block">
              Design system
            </p>
          </div>
          <p className="mt-3 max-w-[600px] text-[14px] leading-[1.75] text-muted">
            Every component is defined by the states it can be in, because states are what
            engineers build and what users actually experience.
          </p>
          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {systemComponents.map((c) => (
              <div key={c.name} className="flex h-full flex-col bg-paper p-5">
                <ComponentViz name={c.name} />
                <p className="mt-4 text-[14px] font-semibold text-ink">{c.name}</p>
                <p className="mt-2 text-[12px] leading-[1.65] text-muted">
                  <span className="mono-label block text-faint">Variants</span>
                  {c.variants}
                </p>
                <p className="mt-2.5 text-[12px] leading-[1.65] text-muted">
                  <span className="mono-label block text-faint">States</span>
                  {c.states}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[640px] text-[13px] leading-[1.75] text-faint">
            Built across Visual IVR journeys, banking and insurance flows and dashboards. No
            invented statistics — the system grows from the products it ships in.
          </p>
        </div>
      </section>

      {/* Edge cases */}
      <section className="dark-band border-b border-white/10 bg-dark">
        <div className="wrap py-20 sm:py-24">
          <p className="eyebrow flex items-center gap-2.5">
            <span className="font-mono text-[11px] text-cyan">A</span>
            <span>Edge cases</span>
          </p>
          <h2 className="h-section mt-5 text-white">
            Good UX is what happens
            <br />
            when things go wrong.
          </h2>
          <p className="mt-4 max-w-[600px] text-[14px] leading-[1.8] text-dark-muted">
            Happy paths are easy. These are the states that decide whether users trust the
            product: loading, empty, error, retry, timeout, session expiry, unavailable.
          </p>
          <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {edgeCases.map((e, i) => (
              <div key={e.state} className="h-full bg-dark p-6">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-semibold text-white">{e.state}</p>
                  <span className="font-mono text-[10px] text-white/40">
                    state {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2.5 text-[12.5px] leading-[1.7] text-dark-muted">{e.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[620px] text-[13.5px] leading-[1.75] text-white/50">
            Happy path + loading + empty + error + retry + success + timeout + unavailable — this
            is how I design every journey. See them applied in the{" "}
            <Link href="/work/upi-payment" className="font-medium text-cyan hover:underline">
              UPI payment case study →
            </Link>
          </p>
        </div>
      </section>

      {/* Microcopy */}
      <section className="bg-paper">
        <div className="wrap py-20 sm:py-24">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="h-section text-ink">The words are part of the design</h2>
            <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint sm:block">
              Microcopy
            </p>
          </div>
          <p className="mt-3 max-w-[600px] text-[14px] leading-[1.75] text-muted">
            UX copy exploration — proposed directions for error and status messaging, labelled
            honestly as exploration rather than shipped copy.
          </p>
          <div className="mt-12 space-y-4">
            {microcopy.map((m, i) => (
              <div
                key={i}
                className={
                  i === 1
                    ? "border border-accent/30 bg-accent-soft p-6 sm:p-8"
                    : "border border-ink/10 bg-surface p-6 sm:p-8"
                }
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge tone={m.tone}>UX copy exploration</Badge>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                    Example {i + 1}
                  </span>
                </div>
                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="mono-label text-faint">Before</p>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted line-through decoration-danger/40">
                      {m.before}
                    </p>
                  </div>
                  <div>
                    <p className="mono-label text-ok">After</p>
                    <p className="mt-2 text-[13.5px] font-medium leading-relaxed text-ink">
                      {m.after}
                    </p>
                  </div>
                </div>
                <p className="mt-5 border-t border-ink/10 pt-4 text-[12.5px] leading-[1.7] text-muted">
                  <span className="font-semibold text-ink">Why:</span> {m.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
