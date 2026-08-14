"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="hero" className="relative flex min-h-[88svh] items-center overflow-hidden">
      <div className="wrap w-full pb-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            className="relative lg:col-span-8"
            initial={reduced ? "show" : "hidden"}
            animate="show"
            transition={{ staggerChildren: 0.09, delayChildren: 0.15 }}
          >
            <motion.p
              variants={rise}
              transition={{ duration: 0.8, ease }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]"
            >
              <span className="text-violet">UX/UI Designer</span>
              <span aria-hidden="true" className="text-ink/40">→</span>
              <span className="text-accent">DevOps / Cloud Engineer</span>
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.9, ease }}
              className="mt-10 font-serif text-[clamp(3rem,8vw,6.4rem)] leading-[0.97] tracking-[-0.015em] text-ink"
            >
              Designing
              <br />
              experiences.
              <br />
              <em className="italic text-accent">Building systems.</em>
            </motion.h1>

            <motion.div
              variants={rise}
              transition={{ duration: 0.8, ease }}
              className="mt-10 max-w-[520px] space-y-4 text-[14.5px] leading-[1.85] text-muted"
            >
              <p>
                UX/UI Designer at Ubona Technologies, designing complex digital
                experiences across fintech, insurance, Visual IVR, enterprise
                products and AI-assisted workflows.
              </p>
              <p className="text-ink-soft">
                Now extending that systems-thinking mindset into software, cloud
                and DevOps.
              </p>
            </motion.div>

            <motion.div
              variants={rise}
              transition={{ duration: 0.8, ease }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <a
                href="#work"
                data-cursor="explore"
                className="group inline-flex items-center gap-3 rounded-sm border border-accent bg-accent px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:border-accent hover:bg-transparent hover:text-accent"
              >
                View work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/resume"
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-sm border border-line-strong px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Resume
                <span className="text-ink/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="hidden self-end pb-2 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/30 lg:col-span-4 lg:block lg:text-right"
            aria-hidden="true"
          >
            Scroll to descend through the system
          </motion.p>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-0 right-0 flex justify-center"
        aria-hidden="true"
      >
        <span className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/35">
          Descend
          <span className="flex h-8 w-px overflow-hidden bg-line-strong">
            <motion.span
              className="w-px bg-accent"
              animate={reduced ? {} : { y: [-16, 18] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </span>
      </motion.div>
    </section>
  );
}