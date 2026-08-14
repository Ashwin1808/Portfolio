"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const SECTORS = [
  { at: 0, label: "Launch — interface layer" },
  { at: 0.26, label: "UX — orbital timeline" },
  { at: 0.47, label: "Transition — descent" },
  { at: 0.66, label: "Cloud — devops system" },
  { at: 0.9, label: "Contact — return to base" },
];

/**
 * A quiet flight readout, bottom-left, tied to scroll.
 * Tells the visitor they're moving through the site, not reading it.
 */
export function SectorReadout() {
  const { scrollYProgress } = useScroll();
  const [read, setRead] = useState({ sector: SECTORS[0].label, alt: 0 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let label = SECTORS[0].label;
    for (const s of SECTORS) if (v >= s.at) label = s.label;
    setRead({ sector: label, alt: Math.round(v * 42000) });
  });

  return (
    <div className="no-print pointer-events-none fixed bottom-6 left-6 z-20 hidden font-mono text-[9px] uppercase tracking-[0.24em] lg:block">
      <p className="text-faint">{read.sector}</p>
      <p className="mt-1.5 text-accent/80">Alt {read.alt.toLocaleString("en-US")} km</p>
      <p className="mt-1.5 text-faint/70">Scroll to travel</p>
    </div>
  );
}