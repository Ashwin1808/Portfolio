"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * 01 — The front of the sheet. Warm paper, ink serif, one vermilion
 * mark. The human side of the work: who Ashwin is.
 */
export function HomeHero() {
  const reduced = useReducedMotion();

  const rise = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="hero" className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-cream text-carbon">
      {/* ruled paper */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-carbon/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, rgba(33,28,22,0.035) 0 1px, transparent 1px 88px)",
        }}
      />

      {/* the back of the sheet peeking through — bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 hidden w-[320px] border-l border-t border-cream/10 bg-sheet px-6 py-5 lg:block"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-cream/40">
            The other side
          </span>
          <span className="h-1 w-1 rounded-full bg-accent" />
        </div>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
          Linux · AWS · Docker · K8s · Terraform · CI/CD · Prometheus
        </p>
      </div>

      <div className="wrap relative w-full pb-24 pt-32 sm:pt-40">
        <div className="max-w-[900px]">
          <motion.div
            initial={reduced ? "show" : "hidden"}
            animate="show"
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          >
            <motion.p
              variants={rise}
              transition={{ duration: 0.7, ease }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]"
            >
              <span className="text-lacquer">UX/UI Designer</span>
              <span aria-hidden="true" className="text-carbon/40">→</span>
              <span className="text-carbon/70">DevOps / Cloud Engineer</span>
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.9, ease }}
              className="mt-12 font-serif text-[clamp(3.2rem,9vw,7.2rem)] leading-[0.95] tracking-[-0.02em]"
            >
              Designing
              <br />
              experiences.
              <br />
              <em className="italic text-lacquer">Building systems.</em>
            </motion.h1>

            <motion.div
              variants={rise}
              transition={{ duration: 0.8, ease }}
              className="mt-12 flex flex-wrap items-end gap-x-14 gap-y-8"
            >
              <p className="max-w-[420px] text-[15px] leading-[1.85] text-carbon-soft">
                I&apos;m Ashwin — a UX/UI Designer at {site.company}. I design the
                part people touch. I&apos;m learning to build what runs underneath.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  data-cursor="explore"
                  className="group inline-flex items-center gap-3 border-2 border-carbon bg-carbon px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-lacquer hover:bg-lacquer"
                >
                  View work
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span>
                </a>
                <a
                  href="/resume"
                  data-cursor="link"
                  className="group inline-flex items-center gap-3 border-2 border-carbon/20 px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-carbon transition-colors duration-300 hover:border-carbon"
                >
                  Resume
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* the sheet's edge — this page has two sides */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-24 flex items-center gap-4 border-t border-carbon/10 pt-5"
          aria-hidden="true"
        >
          <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-carbon/40">
            One sheet
          </span>
          <span className="h-px flex-1 bg-carbon/10" />
          <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-carbon/40">
            Two sides — scroll to turn it
          </span>
        </motion.div>
      </div>
    </section>
  );
}