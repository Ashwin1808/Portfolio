"use client";

import { useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { systemLayers } from "@/data/journey";

/**
 * A tiny fixed depth readout, bottom-left. It tracks the visitor's
 * position through the system as they scroll — which layer they are
 * in, and how deep. Quiet mono annotation, nothing more.
 */
export function DepthReadout() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [label, setLabel] = useState("HUMAN");
  const [depth, setDepth] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced) return;
    const idx = Math.max(0, Math.min(systemLayers.length - 1, Math.floor(p * systemLayers.length)));
    setLabel(idx === systemLayers.length - 1 && p > 0.985 ? "SURFACE" : systemLayers[idx].name);
    setDepth(Math.round(p * 2360));
  });

  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed bottom-5 left-5 z-40 hidden items-center gap-3 sm:flex"
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent/50 opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      <span className="font-mono text-[8.5px] uppercase tracking-[0.26em] text-ink/30">
        Depth {String(depth).padStart(4, "0")} · Layer {label}
      </span>
    </div>
  );
}