"use client";

import { transitionStrip } from "@/data/journey";

/**
 * The pivot — the editorial turn. One statement, a vertical
 * descent list: components → code → container → service → infrastructure.
 */
export function Transition() {
  return (
    <section id="transition" className="relative overflow-hidden border-b border-line bg-paper">
      {/* ghost index */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-4 select-none font-serif text-[16rem] leading-none text-ink/[0.04] sm:text-[24rem] lg:left-12"
      >
        03
      </span>

      <div className="wrap relative py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="h-giant text-ink">
              From interfaces
              <br />
              to <em className="italic text-accent">infrastructure.</em>
            </h2>
            <p className="mt-8 max-w-[420px] text-[13.5px] leading-[1.85] text-muted">
              Now I&apos;m building what sits underneath — the same care for
              the whole, moved to the engineering side.
            </p>
          </div>

          {/* the descent — a vertical index, not a horizontal strip */}
          <div className="lg:col-span-4 lg:col-start-9" aria-hidden="true">
            {transitionStrip.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center justify-between border-t border-line-strong py-3.5 font-mono text-[11px] uppercase tracking-[0.22em]"
              >
                <span
                  className={
                    i === 0 ? "text-violet" : i === transitionStrip.length - 1 ? "text-accent" : "text-muted"
                  }
                >
                  {s.label}
                </span>
                {i < transitionStrip.length - 1 && <span className="text-faint">↓</span>}
              </div>
            ))}
            <div className="border-b border-line-strong" />
          </div>
        </div>
      </div>
    </section>
  );
}