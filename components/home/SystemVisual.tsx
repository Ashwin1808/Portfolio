"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { journeyStages } from "@/data/journey";
import { cn } from "@/lib/utils";

function PlaneIcon({ id }: { id: string }) {
  const common = {
    className: "h-[13px] w-[13px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "user":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" />
        </svg>
      );
    case "interface":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M9 7h6M9 10.5h6M9 14h3" />
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
    case "kubernetes":
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

function SystemPlane({
  stage,
  index,
  total,
  scrollYProgress,
  reduced,
}: {
  stage: (typeof journeyStages)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const drift = useTransform(scrollYProgress, [0, 1], [(index - 3) * 10, (index - 3) * -10]);
  const depth = total - 1 - index; // 0 = user, 6 = observability
  const top = 12 + depth * 11.5; // deeper = higher on the axis
  const width = 226 + (total - depth) * 14;
  const isLast = depth === total - 1;
  return (
    <motion.div style={{ y: reduced ? 0 : drift }} className="absolute inset-0">
      <div
        className={cn(
          "absolute flex items-center justify-between gap-3 rounded-md border px-4 backdrop-blur-[2px] transition-colors duration-300 hover:border-accent/60",
          isLast ? "border-accent/40 bg-accent/[0.07]" : "border-line bg-paper/40 hover:border-accent/40",
        )}
        style={{ top: `${top}%`, height: 44, width }}
      >
        <span className="flex items-center gap-2.5">
          <span className={cn("font-mono text-[9px] tracking-[0.12em]", isLast ? "text-accent" : "text-faint")}>
            {stage.index}
          </span>
          <span className={cn("text-[inherit]", isLast ? "text-accent" : "text-muted")} aria-hidden="true">
            <PlaneIcon id={stage.id} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink">{stage.label}</span>
        </span>
        <span className="hidden h-1 w-1 rounded-full bg-line-strong sm:block" aria-hidden="true" />
      </div>
      {/* node on the axis */}
      <span
        aria-hidden="true"
        className="absolute left-[47px] h-[9px] w-[9px] rounded-full border border-accent/70 bg-paper"
        style={{ top: `calc(${top}% + 17px)` }}
      >
        <span className="absolute inset-[2.5px] rounded-full bg-accent" />
      </span>
    </motion.div>
  );
}

/**
 * Signature hero visual — the same object, seen at system depth.
 * Translucent planes receding to OBSERVABILITY, a single glowing
 * axis running through them. Scroll-linked depth, no 3D lib.
 */
export function SystemVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.3"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const n = journeyStages.length;

  return (
    <div className="relative" aria-label="From user to observability — seven system layers">
      <div ref={ref} className="relative hidden h-[540px] w-[430px] md:block">
        {/* ambient field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            background:
              "radial-gradient(420px 300px at 30% 18%, #cdf249 0%, transparent 60%), radial-gradient(420px 300px at 78% 85%, #ff8a5c 0%, transparent 60%)",
          }}
        />

        {/* the axis — draws as the section scrolls through view */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : lineScale }}
          className="absolute left-[52px] top-[30px] bottom-[30px] w-px origin-top bg-gradient-to-b from-accent/0 via-accent/55 to-accent/0"
        />

        {/* receding planes, USER nearest → OBSERVABILITY deepest */}
        {journeyStages.map((stage, i) => (
          <SystemPlane
            key={stage.id}
            stage={stage}
            index={i}
            total={n}
            scrollYProgress={scrollYProgress}
            reduced={!!reduced}
          />
        ))}

        {/* field line at the base */}
        <div aria-hidden="true" className="absolute bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
        <p className="absolute bottom-0 left-[52px] font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
          one object · seven layers
        </p>
      </div>

      {/* mobile: a single line, no depth */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 md:hidden" aria-label="System layers">
        {journeyStages.map((s, i) => (
          <span
            key={s.id}
            className="flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.18em]"
          >
            <span className={i === n - 1 ? "text-accent" : "text-muted"}>{s.label}</span>
            {i < n - 1 && <span className="text-faint">→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}