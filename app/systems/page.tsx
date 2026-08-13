import type { Metadata } from "next";
import Link from "next/link";
import { systemComponents } from "@/data/process";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Systems, not screens: reusable components, their variants and states, plus error and edge-case design and microcopy.",
};

function ComponentViz({ name }: { name: string }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-lg border border-dashed border-ink/15 bg-paper">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        {name}
      </span>
    </div>
  );
}

export default function SystemsPage() {
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="wrap py-16 sm:py-20">
          <Eyebrow index="03">Systems</Eyebrow>
          <h1 className="h-display mt-5 max-w-[760px] text-ink">
            Systems, not screens.
          </h1>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.75] text-muted">
            Reusable UI patterns with defined variants and states — this is how I keep enterprise
            products consistent and delivery fast. Plus the two disciplines most portfolios skip:
            edge-case design and microcopy.
          </p>
        </div>
      </header>

      {/* Component library */}
      <section className="border-b border-line bg-paper">
        <div className="wrap py-20 sm:py-24">
          <SectionHeading
            eyebrow="Design System"
            title="Component → Variants → States → Usage"
            intro="Every component is defined by the states it can be in, because states are what engineers build and what users actually experience."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {systemComponents.map((c, i) => (
              <Reveal key={c.name} delay={Math.min(i * 30, 200)}>
                <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-5">
                  <ComponentViz name={c.name} />
                  <p className="mt-4 text-[14.5px] font-semibold text-ink">{c.name}</p>
                  <p className="mt-2 text-[12px] leading-[1.65] text-muted">
                    <span className="mono-label block text-faint">Variants</span>
                    {c.variants}
                  </p>
                  <p className="mt-2.5 text-[12px] leading-[1.65] text-muted">
                    <span className="mono-label block text-faint">States</span>
                    {c.states}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <p className="max-w-[640px] text-[13px] leading-[1.75] text-faint">
              Built across Visual IVR journeys, banking and insurance flows and dashboards. No
              invented statistics — the system grows from the products it ships in.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Edge cases */}
      <section className="border-b border-line bg-ink text-white">
        <div className="wrap py-20 sm:py-24">
          <SectionHeading
            dark
            eyebrow="Edge Cases"
            index="A"
            title="Good UX is what happens when things go wrong."
            intro="Happy paths are easy. These are the states that decide whether users trust the product: loading, empty, error, retry, timeout, session expiry, unavailable."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { state: "Loading", desc: "Skeleton or explicit progress — the system is never silent." },
              { state: "Empty", desc: "Named, explained emptiness with a clear next action." },
              { state: "Invalid input", desc: "Inline, immediate, actionable — no blame, no jargon." },
              { state: "Error", desc: "What happened, whose side it is on, what to do next." },
              { state: "Retry", desc: "Safe retry that never double-charges or duplicates." },
              { state: "Timeout", desc: "Never silent: the pending state is designed, not hoped for." },
              { state: "Session expiry", desc: "Resume from the last confirmed step, never from zero." },
              { state: "Unavailable", desc: "Explained unavailability with a human path." },
              { state: "Success", desc: "Explicit completion with reference and next steps." },
            ].map((e, i) => (
              <Reveal key={e.state} delay={Math.min(i * 40, 200)}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[14.5px] font-semibold">{e.state}</p>
                    <span className="font-mono text-[10px] text-white/40">
                      state {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-[1.7] text-white/60">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="max-w-[620px] text-[13.5px] leading-[1.75] text-white/50">
              Happy path + loading + empty + error + retry + success + timeout + unavailable — this
              is how I design every journey. See them applied in the{" "}
              <Link href="/work/upi-payment" className="font-medium text-cyan hover:underline">
                UPI payment case study →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Microcopy */}
      <section className="bg-paper">
        <div className="wrap py-20 sm:py-24">
          <SectionHeading
            eyebrow="Microcopy"
            title="The words are part of the design"
            intro="UX copy exploration — proposed directions for error and status messaging, labelled honestly as exploration rather than shipped copy."
          />
          <div className="mt-12 space-y-5">
            {[
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
            ].map((m, i) => (
              <Reveal key={i} delay={Math.min(i * 60, 180)}>
                <div
                  className={cn(
                    "rounded-xl border p-6",
                    i === 1 ? "border-accent/30 bg-accent-soft" : "border-line bg-surface",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge tone={m.tone}>UX copy exploration</Badge>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                      Example {i + 1}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
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
                  <p className="mt-4 border-t border-line pt-3 text-[12.5px] leading-[1.7] text-muted">
                    <span className="font-semibold text-ink">Why:</span> {m.why}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
