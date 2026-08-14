"use client";

import { motion, useReducedMotion } from "framer-motion";
import { transitionStrip, mindset } from "@/data/journey";
import { cn } from "@/lib/utils";

/**
 * The pivot — one visual moment between experience and now.
 * From interfaces to infrastructure, then the mindset aligned.
 */
export function Transition() {
  const reduced = useReducedMotion();

  return (
    <section className="dark-band relative overflow-hidden border-b border-line bg-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[640px] -translate-x-1/2 opacity-[0.05] blur-[100px]"
        style={{ background: "radial-gradient(circle, #cdf249 0%, transparent 70%)" }}
      />
      <div className="wrap py-24 sm:py-32">
        <div className="mx-auto max-w-[820px] text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-cyan">The pivot</p>
          <h2 className="h-giant mt-6 text-white">
            From <em className="italic text-violet">interfaces</em>
            <br />
            to <em className="italic text-accent">infrastructure.</em>
          </h2>
        </div>

        {/* tiny transformation strip — UI → CODE → CONTAINER → SYSTEM */}
        <div className="mx-auto mt-16 flex max-w-[560px] items-center justify-center gap-3 sm:gap-4" aria-hidden="true">
          {transitionStrip.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 sm:gap-4">
              <motion.span
                initial={reduced ? { opacity: 1 } : { opacity: 0.4 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25 }}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.24em]",
                  i === 0 ? "text-violet" : i === transitionStrip.length - 1 ? "text-accent" : "text-white/60",
                )}
              >
                {s.label}
              </motion.span>
              {i < transitionStrip.length - 1 && <span className="text-white/25">→</span>}
            </div>
          ))}
        </div>

        {/* the mindset — UX and DevOps, aligned */}
        <div className="mx-auto mt-20 max-w-[680px]">
          <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-violet">UX</p>
              {mindset.map((m) => (
                <p key={m.ux} className="border-b border-dark-line py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  {m.ux}
                </p>
              ))}
            </div>
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-accent">DevOps</p>
              {mindset.map((m) => (
                <p key={m.devops} className="border-b border-dark-line py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  {m.devops}
                </p>
              ))}
            </div>
          </div>
          <p className="mt-10 text-center font-serif text-[1.5rem] italic text-white">
            Different layers. <span className="text-accent">Same mindset.</span>
          </p>
        </div>
      </div>
    </section>
  );
}