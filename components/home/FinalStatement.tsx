"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalStatement() {
  return (
    <section id="contact" className="relative overflow-hidden border-b border-line bg-paper">
      {/* ghost index */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 select-none font-serif text-[16rem] leading-none text-ink/[0.04] sm:text-[24rem]"
      >
        05
      </span>

      <div className="wrap relative flex flex-col items-center py-28 text-center sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="h-giant text-ink">
            Still designing.
            <em className="mt-2 block italic text-accent">Still building.</em>
          </h2>
          <p className="mt-10 flex items-center justify-center gap-5 font-mono text-[10.5px] uppercase tracking-[0.22em]">
            <span className="text-muted">UX / UI Designer</span>
            <span className="text-accent" aria-hidden="true">→</span>
            <span className="text-ink/50">DevOps / Cloud Engineer</span>
          </p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2.5 border-2 border-accent bg-accent px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-accent"
            >
              Resume
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 border-2 border-ink/25 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 border-2 border-ink/25 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2.5 border-2 border-ink/25 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Email
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-16 inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint transition-colors hover:text-accent"
          >
            Back to top
            <span aria-hidden="true">↑</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}