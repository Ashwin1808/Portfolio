"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { stackNodes } from "@/data/journey";
import { cn } from "@/lib/utils";

function NodeGlyph({ id }: { id: string }) {
  const common = {
    className: "h-[16px] w-[16px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "linux":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 17c0 1.7 3.6 3 8 3s8-1.3 8-3" />
          <path d="M6 17V9a6 6 0 0 1 12 0v8" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M8 10V7m0 3H5m3 0h3m-3 3v-3m0 0h6a3 3 0 0 0 2.4-4.8A3.6 3.6 0 0 1 21 8.4c.6 1.9-1 2.6-3 2.6H8m3 3v-3M5 13h3v3H5z" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
          <path d="M12 11v10M4 7l8 4 8-4" />
          <path d="M7 5.5 12 8.5l5-3" />
        </svg>
      );
    case "terraform":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M12 3 20 8v8l-8 5-8-5V8l8-5Z" />
          <path d="M12 8v8" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.6 1.36A3.8 3.8 0 0 1 17 18H7Z" />
        </svg>
      );
    case "ci-cd":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="5" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <path d="M7.5 12h4l2-5h3m0 10h-5l-1-5" />
        </svg>
      );
    case "prometheus":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
        </svg>
      );
    case "grafana":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 19a8 8 0 0 1 16 0" />
          <path d="M4 19h16" />
        </svg>
      );
    default:
      return null;
  }
}

function degreesToPercent(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: 50 + Math.cos(rad) * 38, y: 50 + Math.sin(rad) * 38 };
}

/**
 * Scroll 05 — the engineering stack as one interactive system.
 * Hover or tap a node to read a single line about it.
 */
export function EngineeringStack() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);

  const node = active !== null ? stackNodes[active] : null;

  return (
    <section className="border-b border-line bg-paper">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">05 — Engineering stack</p>
            <h2 className="h-giant mt-6 text-ink">
              The stack, treated
              <br />
              like a <em className="italic text-accent">system.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-5 lg:justify-self-end">
            Everything is connected. Touch a node — every one of these is something I&apos;m
            actually running, not a logo wall.
          </p>
        </div>

        {/* radial system — desktop */}
        <div
          ref={ref}
          className="relative mx-auto mt-20 hidden h-[560px] w-full max-w-[720px] md:block"
          aria-live="polite"
        >
          {/* connecting lines */}
          <svg viewBox="0 0 720 560" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {stackNodes.map((n) => {
              const { x, y } = degreesToPercent(n.angle);
              const activeNode = active !== null && stackNodes[active].id === n.id;
              return (
                <line
                  key={n.id}
                  x1="360"
                  y1="280"
                  x2={(x / 100) * 720}
                  y2={(y / 100) * 560}
                  stroke={activeNode ? "#cdf249" : "rgba(236,231,219,0.14)"}
                  strokeWidth={activeNode ? 1.2 : 0.8}
                  strokeDasharray="3 5"
                />
              );
            })}
          </svg>

          {/* center core */}
          <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center">
            <motion.span
              animate={{ boxShadow: reduced ? undefined : "0 0 70px -20px rgba(205,242,73,0.5)" }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              className="rounded-full border border-accent/40 bg-accent/[0.07] px-6 py-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent">Engineering stack</span>
            </motion.span>
            <AnimatePresence>
              {node && (
                <motion.p
                  key={node.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-[240px] text-[12.5px] leading-[1.7] text-muted"
                >
                  {node.detail}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* nodes */}
          {stackNodes.map((n, i) => {
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
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <motion.span
                  animate={
                    isActive
                      ? { scale: 1.12, boxShadow: "0 0 26px -6px rgba(205,242,73,0.7)" }
                      : { scale: 1, boxShadow: "none" }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "flex h-[76px] w-[76px] flex-col items-center justify-center gap-1.5 rounded-full border transition-colors duration-300",
                    isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line-strong bg-surface text-muted group-hover:border-accent/60 group-hover:text-accent",
                  )}
                >
                  <NodeGlyph id={n.id} />
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.12em]">{n.name}</span>
                </motion.span>
              </button>
            );
          })}
        </div>

        {/* mobile — vertical list, same interaction */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:hidden">
          {stackNodes.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive(active === i ? null : i)}
              aria-pressed={active === i}
              className={cn(
                "flex items-center gap-3 rounded-md border px-4 py-3.5 text-left transition-colors",
                active === i
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-line bg-surface text-muted",
              )}
            >
              <NodeGlyph id={n.id} />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em]">{n.name}</span>
            </button>
          ))}
        </div>

        {/* single-line answer — mobile fallback */}
        <div className="mt-6 min-h-[48px] border-t border-line pt-5 md:hidden" aria-live="polite">
          {node ? (
            <p className="text-[12.5px] leading-[1.7] text-muted">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{node.name}</span>
              <br />
              {node.detail}
            </p>
          ) : (
            <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">Touch a node</p>
          )}
        </div>
      </div>
    </section>
  );
}