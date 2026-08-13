"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { transitionStages } from "@/data/journey";
import { cn } from "@/lib/utils";

function StageGlyph({ id, className }: { id: string; className?: string }) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "design":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="m14.5 5.5 4 4L7 21H3v-4L14.5 5.5Zm3-3 1.5 1.5a2 2 0 0 1 0 2.8l-1 1-4-4 1-1a2 2 0 0 1 2.5 0Z" />
        </svg>
      );
    case "code":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />
        </svg>
      );
    case "container":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
          <path d="M12 11v10M4 7l8 4 8-4" />
        </svg>
      );
    case "orchestration":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <circle cx="12" cy="12" r="2.2" />
          <circle cx="5" cy="6" r="1.8" />
          <circle cx="19" cy="6" r="1.8" />
          <circle cx="5" cy="18" r="1.8" />
          <circle cx="19" cy="18" r="1.8" />
          <path d="m6.6 7 3.7 3.6M17.4 7l-3.7 3.6m-7.1 6.8 3.7-3.6m10.8 3.6-3.7-3.6" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.6 1.36A3.8 3.8 0 0 1 17 18H7Z" />
        </svg>
      );
    case "observability":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
        </svg>
      );
    default:
      return null;
  }
}

const stageColor: Record<string, string> = {
  design: "#b3a8e6",
  code: "#ff8a5c",
  container: "#cdf249",
  orchestration: "#cdf249",
  cloud: "#ff8a5c",
  observability: "#cdf249",
};

/**
 * Scroll 02 — the signature interaction: one object transforms
 * DESIGN → CODE → CONTAINER → ORCHESTRATION → CLOUD → OBSERVABILITY
 * as the visitor scrolls.
 */
export function Transition() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [stageIndex, setStageIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.35"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    const next = Math.min(
      transitionStages.length - 1,
      Math.max(0, Math.floor(v * transitionStages.length)),
    );
    setStageIndex(next);
  });

  const stage = transitionStages[stageIndex];

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-violet">02 — The transition</p>
            <h2 className="h-giant mt-6 text-ink">
              From interfaces
              <br />
              to infrastructure.
            </h2>
          </div>
          <p className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-5 lg:justify-self-end">
            The same object — the same discipline — moves down the stack. Keep scrolling:
            the object below is not an animation, it is the scroll itself.
          </p>
        </div>

        {/* the transforming core */}
        <div ref={ref} className="relative mt-20">
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                borderColor: stageColor[stage.id],
                color: stageColor[stage.id],
                boxShadow: `0 0 60px -18px ${stageColor[stage.id]}`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex h-36 w-[220px] flex-col items-center justify-center gap-3 rounded-xl border bg-paper/60 backdrop-blur-sm sm:h-40 sm:w-[280px]"
            >
              <span aria-hidden="true">
                <StageGlyph id={stage.id} className="h-8 w-8" />
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-[11px] uppercase tracking-[0.28em]"
                >
                  {stage.label}
                </motion.span>
              </AnimatePresence>
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] opacity-50">
                {stage.note}
              </span>
            </motion.div>

            {/* line + nodes — activates with the same scroll */}
            <div className="relative mt-14 w-full max-w-[640px]">
              <div aria-hidden="true" className="absolute left-0 right-0 top-[5px] h-px bg-line" />
              <motion.div
                aria-hidden="true"
                style={{ scaleX: reduced ? 1 : lineScale }}
                className="absolute left-0 right-0 top-[5px] h-px origin-left bg-accent"
              />
              <div className="flex justify-between">
                {transitionStages.map((s, i) => {
                  const on = reduced || stageIndex >= i;
                  return (
                    <span key={s.id} className="flex flex-col items-center gap-3 p-1">
                      <span
                        className={cn(
                          "h-[11px] w-[11px] rounded-full border transition-colors duration-300",
                          on ? "border-accent bg-accent/60" : "border-line-strong bg-surface",
                        )}
                        style={{ boxShadow: on ? `0 0 12px ${stageColor[s.id]}55` : undefined }}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-[0.14em] transition-colors duration-300",
                          i === stageIndex ? "text-accent" : on ? "text-muted" : "text-faint",
                        )}
                      >
                        {s.label}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}