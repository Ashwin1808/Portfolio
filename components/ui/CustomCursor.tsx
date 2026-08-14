"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type CursorState = "default" | "view" | "explore" | "link";

export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });
  const timer = useRef<number | null>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    if (reduced || typeof window === "undefined") return;
    const evaluate = () => {
      // only replace the native cursor where the custom one actually renders
      setEnabled(window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024);
    };
    evaluate();
    window.addEventListener("resize", evaluate);
    return () => window.removeEventListener("resize", evaluate);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor");
      return;
    }
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!shownRef.current) {
        shownRef.current = true;
        setVisible(true);
      }
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), 1600);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const view = target.closest<HTMLElement>("[data-cursor='view']");
      const explore = target.closest<HTMLElement>("[data-cursor='explore']");
      const link = target.closest<HTMLElement>("a, button, [role='link']");
      setState(view ? "view" : explore ? "explore" : link ? "link" : "default");
    };

    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [reduced, enabled, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="no-print pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* trailing ring — expands on links, becomes a VIEW badge on projects */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="fixed left-0 top-0"
      >
        <motion.div
          animate={
            state === "view" || state === "explore"
              ? { width: 72, height: 72, opacity: 1, x: -36, y: -36 }
              : state === "link"
                ? { width: 40, height: 40, opacity: 1, x: -20, y: -20 }
                : { width: 28, height: 28, opacity: 0.35, x: -14, y: -14 }
          }
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          className="rounded-full border border-accent/70"
        >
          {state === "view" && (
            <span className="flex h-full w-full items-center justify-center font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
              View
            </span>
          )}
          {state === "explore" && (
            <span className="flex h-full w-full items-center justify-center font-mono text-[8.5px] uppercase tracking-[0.16em] text-accent">
              Explore
            </span>
          )}
          {state === "link" && (
            <span className="flex h-full w-full items-center justify-center text-[13px] text-accent">
              ↗
            </span>
          )}
        </motion.div>
      </motion.div>
      {/* core dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed left-0 top-0"
      >
        <motion.div
          animate={
            state === "view" || state === "explore"
              ? { width: 4, height: 4, x: -2, y: -2 }
              : { width: 5, height: 5, x: -2.5, y: -2.5 }
          }
          className="rounded-full bg-accent"
        />
      </motion.div>
    </motion.div>
  );
}
