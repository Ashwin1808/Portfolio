"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Node } from "@/data/journey";
import { SystemIcon } from "@/components/home/SystemIcon";
import { cn } from "@/lib/utils";

function degreesToPercent(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + Math.cos(rad) * 37, y: 50 + Math.sin(rad) * 37 };
}

/**
 * Shared radial constellation — center core, orbiting nodes,
 * thin connecting lines, hover reveals a one-line explanation
 * in the center. No cards, no borders around nodes.
 */
export function Orbit({
  center,
  centerSub,
  nodes,
  accent = "text-accent",
  glyphSize = "h-[15px] w-[15px]",
  className,
}: {
  center: string;
  centerSub?: string;
  nodes: Node[];
  accent?: string;
  glyphSize?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const node = active !== null ? nodes[active] : null;

  return (
    <div className={cn("relative", className)}>
      {/* radial system — desktop */}
      <div className="relative mx-auto hidden h-[560px] w-full max-w-[720px] md:block" aria-live="polite">
        <svg viewBox="0 0 720 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {nodes.map((n, i) => {
            const { x, y } = degreesToPercent(n.angle);
            const on = active === i;
            return (
              <line
                key={n.id}
                x1="360"
                y1="280"
                x2={(x / 100) * 720}
                y2={(y / 100) * 560}
                stroke={on ? "#cdf249" : "rgba(236,231,219,0.13)"}
                strokeWidth={on ? 1.2 : 0.8}
                strokeDasharray="3 5"
              />
            );
          })}
        </svg>

        {/* center core */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.span
            animate={{ boxShadow: reduced ? undefined : "0 0 70px -20px rgba(205,242,73,0.45)" }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse" }}
            className={cn(
              "flex h-[168px] w-[168px] flex-col items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/[0.06] px-5",
            )}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent">{center}</span>
            {centerSub && <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-faint">{centerSub}</span>}
            <AnimatePresence mode="wait">
              {node && (
                <motion.span
                  key={node.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[130px] text-[11px] leading-[1.6] text-muted"
                >
                  {node.detail}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </div>

        {/* orbiting nodes */}
        {nodes.map((n, i) => {
          const { x, y } = degreesToPercent(n.angle);
          const isActive = active === i;
          return (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive(isActive ? null : i)}
              aria-pressed={isActive}
              aria-label={`${n.name} — ${n.detail}`}
              data-cursor="explore"
              className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.span
                animate={isActive ? { scale: 1.25 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className={cn("transition-colors duration-300", accent, !isActive && "opacity-60 group-hover:opacity-100")}
              >
                <SystemIcon id={n.id} className={glyphSize} />
              </motion.span>
              <span
                className={cn(
                  "font-mono text-[9px] uppercase tracking-[0.16em] transition-colors duration-300",
                  isActive ? "text-ink" : "text-faint group-hover:text-ink",
                )}
              >
                {n.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* mobile — a vertical list, same interaction */}
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 md:hidden">
        {nodes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setActive(active === i ? null : i)}
            aria-pressed={active === i}
            className="group flex items-start gap-3 text-left"
          >
            <span className={cn("mt-0.5 transition-colors duration-300", active === i ? "text-accent" : "text-faint group-hover:text-ink")}>
              <SystemIcon id={n.id} className={glyphSize} />
            </span>
            <span>
              <span className={cn("block font-mono text-[10px] uppercase tracking-[0.16em] transition-colors", active === i ? "text-accent" : "text-ink")}>
                {n.name}
              </span>
              {active === i && (
                <span className="mt-1 block text-[11px] leading-[1.6] text-muted">{n.detail}</span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}