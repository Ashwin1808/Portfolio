"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorState = "default" | "view" | "explore" | "link" | "open";

/**
 * The cursor is a follower, never a replacement: the native pointer
 * stays visible at all times, and this ring + dot glides over it.
 * No timers, no hiding — the mouse can never disappear.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 420, damping: 34, mass: 0.55 });

  useEffect(() => {
    const evaluate = () => {
      setFine(window.matchMedia("(pointer: fine)").matches);
    };
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, []);

  useEffect(() => {
    if (!fine || reduced) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const view = target.closest<HTMLElement>("[data-cursor='view']");
      const explore = target.closest<HTMLElement>("[data-cursor='explore']");
      const open = target.closest<HTMLElement>("[data-cursor='open']");
      const link = target.closest<HTMLElement>("a, button, [role='link']");
      setState(view ? "view" : explore ? "explore" : open ? "open" : link ? "link" : "default");
    };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;

  const big = state === "view" || state === "explore" || state === "open";

  return (
    <motion.div
      aria-hidden="true"
      className="no-print pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={
          big
            ? { width: 72, height: 72, x: -36, y: -36, opacity: 0.95 }
            : state === "link"
              ? { width: 40, height: 40, x: -20, y: -20, opacity: 0.9 }
              : { width: 30, height: 30, x: -15, y: -15, opacity: 0.55 }
        }
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="rounded-full border border-accent shadow-[0_0_18px_rgba(205,242,73,0.35)]"
      >
        {big && (
          <span className="flex h-full w-full items-center justify-center font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
            {state === "explore" ? "Explore" : state === "open" ? "Open" : "View"}
          </span>
        )}
        {state === "link" && (
          <span className="flex h-full w-full items-center justify-center text-[13px] text-accent">
            ↗
          </span>
        )}
      </motion.div>
      {/* core dot */}
      <motion.div
        animate={big ? { width: 4, height: 4, x: -2, y: -2 } : { width: 5, height: 5, x: -2.5, y: -2.5 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className="rounded-full bg-accent"
      />
    </motion.div>
  );
}