"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { journeyStages } from "@/data/journey";
import { cn } from "@/lib/utils";

function StageIcon({ id }: { id: string }) {
  const common = {
    className: "h-[18px] w-[18px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
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
    case "application":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 6h16M7 6v4m3-4v4" />
          <rect x="4" y="10" width="16" height="10" rx="1.5" />
          <path d="M7 14h2m-2 3h4" />
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

export function JourneyVisual() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* connecting rail — draws as the section scrolls through view */}
      <motion.div
        aria-hidden="true"
        style={{ scaleY: reduced ? 1 : lineScale }}
        className="absolute left-[26px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent/0 via-accent/60 to-accent/0"
      />

      <div className="relative flex flex-col">
        {journeyStages.map((stage, i) => (
          <motion.div
            key={stage.label}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 26, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.55 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative flex items-center gap-4 py-2 pl-[52px]",
              i % 2 === 1 ? "sm:translate-x-7" : "sm:translate-x-0",
            )}
          >
            {/* node on the rail — glows when the line has reached it */}
            <motion.span
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.85 + i * 0.13 }}
              className="absolute left-[21px] h-[11px] w-[11px] rounded-full border border-accent/70 bg-paper"
              aria-hidden="true"
            >
              <span className="absolute inset-[3px] rounded-full bg-accent/80" />
            </motion.span>

            <span
              className="absolute left-0 top-1/2 w-4 -translate-y-1/2 font-mono text-[9px] tracking-[0.12em] text-faint"
              aria-hidden="true"
            >
              {stage.index}
            </span>

            <div className="group flex h-[54px] w-[196px] items-center gap-3.5 rounded-md border border-line bg-surface px-4 transition-colors duration-300 hover:border-accent/50">
              <span className="text-faint transition-colors duration-300 group-hover:text-accent" aria-hidden="true">
                <StageIcon id={stage.id} />
              </span>
              <div>
                <p className="text-[12.5px] font-medium tracking-[0.02em] text-ink">{stage.label}</p>
                <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint">
                  {stage.sub}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}