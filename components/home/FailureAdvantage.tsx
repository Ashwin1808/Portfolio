"use client";

import { motion, useReducedMotion } from "framer-motion";
import { uxFailureStates, devopsFailureStates } from "@/data/journey";
import { cn } from "@/lib/utils";

/**
 * Scroll 08 — what UX taught me about systems.
 * LOADING / EMPTY / ERROR / RETRY / SUCCESS →
 * FAILURE / HEALTH / LOGS / ALERTS / RECOVERY / ROLLBACK
 */
export function FailureAdvantage() {
  const reduced = useReducedMotion();

  return (
    <section className="border-b border-line bg-paper">
      <div className="wrap py-24 sm:py-32">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-violet">08 — The advantage</p>
          <h2 className="h-giant mt-6 text-ink">
            UX taught me to
            <br />
            design for <em className="italic text-violet">failure.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[480px] text-[13.5px] leading-[1.8] text-muted">
            Every interface I shipped had to answer: what happens when it goes wrong?
            The same question drives operations. Same discipline, different stack.
          </p>
        </div>

        {/* states — UX on top, DevOps below */}
        <div className="mx-auto mt-16 max-w-[760px]">
          {/* UX states */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {uxFailureStates.map((s, i) => (
              <span
                key={s.id}
                className="rounded-full border border-violet/30 bg-violet/[0.08] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-violet"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {s.label}
              </span>
            ))}
          </motion.div>

          {/* the join */}
          <div className="my-9 flex flex-col items-center gap-3" aria-hidden="true">
            <motion.span
              animate={reduced ? {} : { scaleY: [1, 1.35, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block h-9 w-px origin-center bg-gradient-to-b from-violet/60 via-line-strong to-accent/60"
            />
            <span className="font-mono text-[8.5px] uppercase tracking-[0.26em] text-faint">
              same discipline, deeper stack
            </span>
          </div>

          {/* DevOps states */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-2.5"
          >
            {devopsFailureStates.map((s) => (
              <span
                key={s.id}
                className={cn(
                  "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em]",
                  s.id === "failure" || s.id === "rollback"
                    ? "border-cyan/40 bg-cyan/[0.08] text-cyan"
                    : "border-accent/30 bg-accent/[0.07] text-accent",
                )}
              >
                {s.label}
              </span>
            ))}
          </motion.div>

          <p className="mx-auto mt-12 max-w-[440px] text-center text-[13.5px] leading-[1.85] text-muted">
            The mindset is surprisingly similar: understand the system, anticipate what can
            go wrong, and make the next action clear.
          </p>
        </div>
      </div>
    </section>
  );
}