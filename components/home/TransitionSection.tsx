"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

const STEPS = ["Interface", "Component", "Code", "Container", "System"];

/**
 * 03 — The bridge. From interfaces to infrastructure: the same
 * instinct, moving down the stack. Scroll, and the word in front of
 * you changes — interface, component, code, container, system.
 */
export function TransitionSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)));
    if (i !== step) setStep(i);
  });

  return (
    <section
      ref={ref}
      id="transition"
      className="relative h-[300vh] text-cream"
      style={{ background: "rgba(10,8,6,0.35)" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">
          04 — From interfaces to infrastructure
        </p>

        <h2 className="mt-8 font-serif text-[clamp(2.8rem,7.5vw,6.2rem)] leading-[1.0] tracking-[-0.02em]">
          From interfaces
          <br />
          <em className="bg-gradient-to-r from-accent via-cyan to-violet bg-clip-text italic text-transparent">
            to infrastructure.
          </em>
        </h2>

        {/* the descent — interface → component → code → container → system */}
        <div className="mt-16 flex max-w-[860px] flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-6">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-x-4 sm:gap-x-6">
              <motion.span
                animate={
                  i === step
                    ? { opacity: 1, scale: 1.15, color: "#cdf249" }
                    : i < step
                      ? { opacity: 0.45, scale: 1 }
                      : { opacity: 0.22, scale: 1 }
                }
                transition={{ duration: 0.4 }}
                className={cn("font-serif text-[clamp(1.1rem,2.4vw,1.7rem)] italic")}
              >
                {s}
              </motion.span>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className={cn("font-mono text-[13px] transition-colors duration-300", i < step ? "text-accent" : "text-cream/25")}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-[440px] text-[14px] leading-[1.85] text-cream/50">
          A designer who has always thought in systems — now learning to
          build the layer underneath the interface.
        </p>
      </div>
    </section>
  );
}