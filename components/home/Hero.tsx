"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, -60]);
  const fade = useTransform(scrollY, [0, 380], [1, 0.25]);

  return (
    <section id="hero" className="relative overflow-hidden border-b border-line">
      {/* soft light behind the type — content is the subject */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-8%] top-[18%] h-[420px] w-[520px] rounded-full opacity-[0.05] blur-[120px]"
        style={{ background: "radial-gradient(circle, #cdf249 0%, transparent 70%)" }}
      />

      {/* scroll indicator — far left, vertical */}
      <div className="no-print absolute bottom-0 left-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex" aria-hidden="true">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-faint [writing-mode:vertical-rl]">
          Scroll to travel
        </span>
        <motion.span
          className="w-px flex-1 origin-top bg-line-strong"
          animate={reduced ? {} : { scaleY: [0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ y: reduced ? 0 : parallax, opacity: reduced ? 1 : fade }} className="wrap relative">
        <div className="flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-24 lg:min-h-[calc(100svh-4.5rem)]">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="max-w-[860px]"
          >
            <p className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.26em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              UX/UI Designer → DevOps / Cloud Engineer
            </p>

            <h1 className="h-hero mt-10 text-ink">
              Designing
              <br />
              experiences.
              <br />
              Building
              <br />
              <em className="font-serif italic text-accent">systems.</em>
            </h1>

            <p className="mt-8 max-w-[460px] text-[14px] leading-[1.8] text-muted">
              UX/UI Designer at Ubona Technologies, now extending my
              systems-thinking mindset into software, cloud and DevOps.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/work"
                className="group inline-flex items-center gap-2.5 rounded-md border border-accent bg-accent/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-paper"
              >
                View work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/resume"
                className="group inline-flex items-center gap-2.5 rounded-md border border-line-strong px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Resume
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}