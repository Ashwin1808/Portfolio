"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stackNodes } from "@/data/journey";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const TAPE = [
  site.name,
  "UX/UI Designer",
  "DevOps / Cloud Engineer",
  "Designing experiences",
  "Building systems",
  ...stackNodes.map((n) => n.name),
  "One line",
  "The stack keeps moving",
];

/**
 * The screen edge — where the page turns off. A scan sweeps the
 * strip over and over while the news tape runs underneath, moving
 * like a feed that never stops.
 */
export function BottomTicker() {
  const reduced = useReducedMotion();

  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden border-t border-cream/10"
      style={{ background: "rgba(8,6,5,0.9)" }}
    >
      {/* the screen scan — a beam sweeping down the strip */}
      <div className="pointer-events-none absolute inset-0">
        {/* scanlines — the screen's own texture */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0 2px, rgba(236,230,218,0.03) 2px 4px)",
          }}
        />
        {/* the sweeping beam */}
        {!reduced && (
          <span
            className="absolute inset-x-0 h-16"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(205,242,73,0.10) 45%, rgba(205,242,73,0.28) 50%, rgba(205,242,73,0.10) 55%, transparent 100%)",
              animation: "scan-sweep 9s ease-in-out infinite",
            }}
          />
        )}
      </div>

      <div className="relative">
        {/* the readout — the status of the feed */}
        <div className="wrap flex items-center justify-between py-5">
          <p className="flex items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.3em] text-cream/45">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            live transmission
          </p>
          <p className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-cream/45">
            one loop — never stops
          </p>
        </div>

        {/* the news tape — moving like a feed */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="overflow-hidden border-y border-cream/10 py-3.5"
        >
          <div className="flex w-max" style={{ animation: reduced ? undefined : "marquee-x 30s linear infinite" }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {TAPE.map((t, i) => (
                  <span
                    key={`${copy}-${i}`}
                    className="mx-6 flex items-center gap-6 whitespace-nowrap font-serif text-[15px] italic tracking-[0.01em] text-cream/60"
                  >
                    {t}
                    <span
                      aria-hidden="true"
                      className={`font-mono text-[9px] not-italic tracking-[0.2em] ${
                        i % 2 === 0 ? "text-lacquer" : "text-accent"
                      }`}
                    >
                      ◆
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* the close — the quiet line under everything */}
        <div className="wrap py-5">
          <p className="flex flex-wrap items-center justify-between gap-2 font-mono text-[8px] uppercase tracking-[0.28em] text-cream/30">
            <span>{site.name} — UX/UI → DevOps / Cloud</span>
            <span>ashwin1808 · portfolio © 2026</span>
          </p>
        </div>
      </div>
    </section>
  );
}