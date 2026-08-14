"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="hero" className="relative overflow-hidden border-b border-line">
      {/* ghost index — the brutalist numeral */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-4 select-none font-serif text-[16rem] leading-none text-ink/[0.045] sm:text-[24rem] lg:right-12"
      >
        01
      </span>

      <div className="wrap relative py-24 sm:py-32">
        {/* meta strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line-strong pb-4 font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint">
          <span>Portfolio — {new Date().getFullYear()}</span>
          <span className="hidden md:block">UX / UI → DevOps / Cloud</span>
          <span className="text-accent">Open to work</span>
        </div>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="mt-16 max-w-[900px] lg:mt-20"
        >
          <h1 className="h-hero text-ink">
            Designing
            <br />
            experiences.
            <br />
            Building
            <br />
            <em className="font-serif italic text-accent">systems.</em>
          </h1>
        </motion.div>

        {/* asymmetric meta columns */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="max-w-[460px] text-[14px] leading-[1.85] text-muted lg:col-span-6"
          >
            UX/UI Designer at Ubona Technologies, now extending my systems-thinking
            mindset into software, cloud and DevOps.
          </motion.p>

          <motion.dl
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
            className="grid grid-cols-2 gap-x-8 gap-y-5 lg:col-span-5 lg:col-start-8"
          >
            <div className="border-l-2 border-accent pl-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">Role</dt>
              <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                UX/UI Designer
              </dd>
            </div>
            <div className="border-l-2 border-violet pl-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">Now</dt>
              <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                DevOps / Cloud
              </dd>
            </div>
            <div className="border-l-2 border-cyan pl-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">Status</dt>
              <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                Building in public
              </dd>
            </div>
            <div className="border-l-2 border-ink/25 pl-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">Location</dt>
              <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                India — Remote
              </dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.55 }}
          className="mt-14 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 border-2 border-accent bg-accent px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-accent"
          >
            View work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/resume"
            className="group inline-flex items-center gap-3 border-2 border-ink/25 px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Resume
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}