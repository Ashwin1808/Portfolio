"use client";

import { transitionStrip } from "@/data/journey";

/**
 * The pivot — one statement, one sentence, one quiet strip.
 */
export function Transition() {
  return (
    <section id="transition" className="dark-band relative overflow-hidden border-b border-line bg-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[600px] -translate-x-1/2 opacity-[0.05] blur-[110px]"
        style={{ background: "radial-gradient(circle, #cdf249 0%, transparent 70%)" }}
      />
      <div className="wrap py-28 sm:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 className="h-giant text-white lg:col-span-7">
            Now I&apos;m building
            <br />
            what sits <em className="italic text-accent">underneath.</em>
          </h2>
          <p className="max-w-[380px] text-[13.5px] leading-[1.85] text-dark-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            My design work taught me to understand systems from the user&apos;s perspective.
            I&apos;m now learning to understand them from the engineering side.
          </p>
        </div>

        {/* quiet strip — the same object, moving down the stack */}
        <div className="mt-20 flex items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.26em] sm:gap-6" aria-hidden="true">
          {transitionStrip.map((s, i) => (
            <span key={s.id} className="flex items-center gap-4 sm:gap-6">
              <span className={i === 0 ? "text-violet" : i === transitionStrip.length - 1 ? "text-accent" : "text-white/55"}>
                {s.label}
              </span>
              {i < transitionStrip.length - 1 && <span className="text-white/20">→</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}