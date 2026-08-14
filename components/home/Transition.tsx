"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { transitionStrip } from "@/data/journey";

/**
 * The pivot — one statement, one sentence, one quiet strip.
 * Behind the type, concentric rings grow as you scroll past:
 * the feeling of traveling forward through the stack.
 */
export function Transition() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ringScale = useTransform(scrollYProgress, [0, 0.6], [0.4, 4.2]);
  const ringOpacity = useTransform(scrollYProgress, [0, 0.35], [0.5, 0]);
  const coreScale = useTransform(scrollYProgress, [0, 0.55], [0.15, 1.6]);

  return (
    <section id="transition" ref={ref} className="relative overflow-hidden border-b border-line">
      {/* wormhole — rings recede past you as you scroll */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              scale: reduced ? 1 : ringScale,
              opacity: reduced ? 0.25 : ringOpacity,
            }}
            className="absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
            transition={{ delay: 0 }}
          >
            <div className="h-full w-full rounded-full border border-white/[0.08] blur-[0.4px]" />
            <span className="sr-only">{i}</span>
          </motion.div>
        ))}
        <motion.div
          style={{ scale: reduced ? 1 : coreScale, opacity: reduced ? 0.6 : ringOpacity }}
          className="absolute left-0 top-0 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04]"
        />
      </div>

      <div className="wrap relative py-28 sm:py-36">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <h2 className="h-giant text-ink lg:col-span-8">
            From interfaces
            <br />
            to <em className="italic text-accent">infrastructure.</em>
          </h2>
          <p className="max-w-[360px] text-[13.5px] leading-[1.85] text-muted lg:col-span-3 lg:col-start-10 lg:justify-self-end">
            Now I&apos;m building what sits underneath — the same care for the
            whole, moved to the engineering side.
          </p>
        </div>

        {/* quiet strip — the same object, moving down the stack */}
        <div className="mt-20 flex items-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.26em] sm:gap-6" aria-hidden="true">
          {transitionStrip.map((s, i) => (
            <span key={s.id} className="flex items-center gap-4 sm:gap-6">
              <span className={i === 0 ? "text-violet" : i === transitionStrip.length - 1 ? "text-accent" : "text-ink/55"}>
                {s.label}
              </span>
              {i < transitionStrip.length - 1 && <span className="text-ink/20">→</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}