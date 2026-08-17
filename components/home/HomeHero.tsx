"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const LAYERS = [
  { label: "design", top: "14%" },
  { label: "code", top: "38%" },
  { label: "system", top: "62%" },
  { label: "cloud", top: "86%" },
];

/**
 * The system object — four layers of a stack, joined by one thin
 * spine, a signal passing down through them. Small and quiet; the
 * typography stays the first thing the eye sees.
 */
function SystemObject() {
  return (
    <div className="relative h-[170px] w-[150px]" aria-hidden="true">
      {/* the spine */}
      <div className="absolute right-0 top-0 h-full w-px bg-cream/15" />
      {/* the layers */}
      {LAYERS.map((l) => (
        <div key={l.label} className="absolute right-0" style={{ top: l.top }}>
          <div className="flex items-center">
            <span className="pr-3 font-mono text-[8px] uppercase tracking-[0.26em] text-cream/45">
              {l.label}
            </span>
            <span className="h-px w-14 bg-cream/25" />
            <span className="ml-[-1px] h-[7px] w-[7px] rounded-full border border-cream/50 bg-[#0d0b09]" />
          </div>
        </div>
      ))}
      {/* the signal — passes down the stack */}
      <span
        className="absolute right-0 h-1.5 w-1.5 -translate-x-[2px] rounded-full bg-lacquer shadow-[0_0_10px_rgba(194,64,47,0.9)]"
        style={{ animation: "signal-y 7s linear infinite" }}
      />
    </div>
  );
}

/**
 * 01 — The opening. A role, a line, a short story, two doors.
 * Nothing else competing with the words.
 */
export function HomeHero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const rise = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden text-cream"
      style={{ background: "rgba(10,8,6,0.5)" }}
    >
      {/* the quiet system object — design → code → system → cloud */}
      <div className="pointer-events-none absolute right-[9%] top-1/2 hidden -translate-y-1/2 xl:block">
        <SystemObject />
      </div>

      <div className="wrap relative w-full pb-24 pt-32 sm:pt-36">
        <motion.div
          style={{ y: reduced ? 0 : contentY }}
          className="mx-auto flex max-w-[860px] flex-col items-center text-center"
        >
          <motion.div
            initial={reduced ? "show" : "hidden"}
            animate="show"
            transition={{ staggerChildren: 0.07, delayChildren: 0.02 }}
          >
            <motion.p
              variants={rise}
              transition={{ duration: 0.5, ease }}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]"
            >
              <span className="text-lacquer">UX/UI Designer</span>
              <span aria-hidden="true" className="text-cream/40">→</span>
              <span className="text-cream/70">DevOps / Cloud Engineer</span>
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.65, ease }}
              className="mt-8 font-serif text-[clamp(2.6rem,6.5vw,5.25rem)] leading-[0.95] tracking-[-0.02em]"
              style={{ textShadow: "0 0 90px rgba(205,242,73,0.12), 0 0 90px rgba(194,64,47,0.10)" }}
            >
              Designing experiences.
              <br />
              <em className="text-shimmer bg-gradient-to-r from-lacquer via-cyan to-accent bg-clip-text italic text-transparent">
                Building systems.
              </em>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.55, ease }}
              className="mx-auto mt-9 max-w-[600px] text-[15px] leading-[1.9] text-cream/60"
            >
              {site.designSupport} Now extending that systems-thinking mindset
              into software, cloud and DevOps.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.55, ease }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#work"
                data-cursor="explore"
                className="group inline-flex items-center gap-3 border-2 border-lacquer bg-lacquer px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#16110c] transition-colors duration-300 hover:bg-transparent hover:text-lacquer"
              >
                View work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/resume"
                data-cursor="link"
                className="group inline-flex items-center gap-3 border-2 border-cream/25 px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-cream"
              >
                Resume
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}