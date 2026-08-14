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
import { heroNodes } from "@/data/journey";
import { SystemIcon } from "@/components/home/SystemIcon";
import { cn } from "@/lib/utils";

/**
 * Hero signature — one connected system, no cards.
 * Seven nodes on a single line. Scroll activates the line,
 * a signal travels down it, and each node reveals one
 * short line on hover.
 */
export function HeroSystem() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [scrollStage, setScrollStage] = useState(-1);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "end 0.3"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const signalY = useTransform(scrollYProgress, [0, 1], [6, 94]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduced) return;
    setScrollStage(Math.min(heroNodes.length - 1, Math.floor(v * heroNodes.length)));
  });

  const n = heroNodes.length;

  return (
    <div className="relative" aria-label="One system: design flowing to observability">
      <div ref={ref} className="relative hidden h-[560px] w-[420px] md:block">
        {/* ambient field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(400px 300px at 30% 15%, #cdf249 0%, transparent 60%), radial-gradient(400px 320px at 80% 88%, #ff8a5c 0%, transparent 60%)",
          }}
        />

        {/* the line — draws as the section scrolls through view */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: reduced ? 1 : lineScale }}
          className="absolute left-[20px] top-[5%] bottom-[5%] w-px origin-top bg-gradient-to-b from-accent/0 via-accent/55 to-accent/0"
        />

        {/* the travelling signal */}
        {!reduced && (
          <motion.span
            aria-hidden="true"
            style={{ top: signalY }}
            className="absolute left-[15.5px] h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_14px_rgba(205,242,73,0.8)]"
          />
        )}

        {/* nodes — typographic, no boxes */}
        {heroNodes.map((node, i) => {
          const top = 6 + i * (88 / (n - 1));
          const isActive = active === i;
          const lit = reduced || i <= scrollStage;
          return (
            <motion.div
              key={node.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0"
              style={{ top: `${top}%` }}
            >
              {/* node dot on the line */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-[16px] top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full border transition-colors duration-300",
                  lit ? "border-accent/70 bg-accent/70" : "border-line-strong bg-[#100e0c]",
                )}
              />
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(isActive ? null : i)}
                aria-pressed={isActive}
                data-cursor="explore"
                className="group flex items-center gap-3.5 pl-10 text-left"
              >
                <motion.span
                  animate={isActive ? { scale: 1.2, rotate: isActive ? 3 : 0 } : { scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className={cn("transition-colors duration-300", lit ? "text-accent" : "text-faint group-hover:text-muted")}
                >
                  <SystemIcon id={node.id} className="h-[19px] w-[19px]" />
                </motion.span>
                <span className="flex flex-col">
                  <span
                    className={cn(
                      "font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300",
                      lit ? (isActive ? "text-ink" : "text-ink-soft") : "text-faint group-hover:text-muted",
                    )}
                  >
                    {node.name}
                  </span>
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="mt-1 font-mono text-[9px] tracking-[0.08em] text-muted"
                      >
                        {node.detail}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </motion.div>
          );
        })}

        <p className="absolute bottom-0 left-[20px] font-mono text-[9px] uppercase tracking-[0.28em] text-faint">
          DESIGN → OBSERVABILITY
        </p>
      </div>

      {/* mobile — compact chain, same story */}
      <div className="md:hidden">
        <ol className="space-y-0 border-l border-line pl-6">
          {heroNodes.map((node, i) => (
            <li key={node.id} className="relative pb-6 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[29px] top-1.5 h-[9px] w-[9px] rounded-full border border-accent/70 bg-accent/70"
              />
              <button
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                aria-pressed={active === i}
                className="group flex items-center gap-3 text-left"
              >
                <span className={cn("transition-colors", active === i ? "text-accent" : "text-faint")}>
                  <SystemIcon id={node.id} className="h-[17px] w-[17px]" />
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-soft">
                  {node.name}
                </span>
              </button>
              {active === i && (
                <p className="mt-1.5 font-mono text-[9px] tracking-[0.08em] text-muted">{node.detail}</p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}