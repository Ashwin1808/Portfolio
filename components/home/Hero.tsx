"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroSystem } from "@/components/home/HeroSystem";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 600], [0, -60]);
  const fade = useTransform(scrollY, [0, 380], [1, 0.25]);

  return (
    <section id="hero" className="relative overflow-hidden border-b border-line bg-paper">
      {/* faint ambient warmth — restrained */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[-10%] h-[560px] w-[560px] rounded-full opacity-[0.06] blur-[120px]"
        style={{ background: "radial-gradient(circle, #cdf249 0%, #ff8a5c 55%, transparent 75%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12%] top-[45%] h-[420px] w-[420px] rounded-full opacity-[0.05] blur-[110px]"
        style={{ background: "radial-gradient(circle, #b3a8e6 0%, transparent 70%)" }}
      />

      {/* scroll indicator — far left, vertical */}
      <div className="no-print absolute bottom-0 left-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex" aria-hidden="true">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-faint [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <motion.span
          className="w-px flex-1 origin-top bg-line-strong"
          animate={reduced ? {} : { scaleY: [0, 1, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ y: reduced ? 0 : parallax, opacity: reduced ? 1 : fade }} className="wrap relative">
        <div className="grid min-h-[calc(100svh-3.5rem)] items-center gap-14 py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-6 lg:py-0">
          {/* LEFT — typography */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <p className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.26em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              UX/UI Designer → DevOps / Cloud Engineering
            </p>

            <h1 className="h-hero mt-8 text-ink">
              Designing
              <br />
              experiences.
              <br />
              Building
              <br />
              <em className="font-serif italic text-accent">systems.</em>
            </h1>

            <p className="mt-8 max-w-[420px] text-[14px] leading-[1.8] text-muted">
              UX/UI Designer at Ubona Technologies, designing complex digital experiences
              across fintech, insurance, Visual IVR, enterprise products and AI-assisted
              workflows. Now I&apos;m extending that systems-thinking mindset into software,
              cloud and DevOps.
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

          {/* RIGHT — signature system */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, x: 34 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.35 }}
            className="mx-auto lg:mx-0 lg:justify-self-end"
          >
            <HeroSystem />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}