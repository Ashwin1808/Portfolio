"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/data/site";

export function FinalStatement() {
  return (
    <section className="dark-band border-b border-line bg-dark">
      <div className="wrap flex flex-col items-center py-28 text-center sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="h-giant text-white">
            Still designing.
            <em className="mt-2 block italic text-accent">Still building.</em>
          </h2>
          <p className="mt-10 flex items-center justify-center gap-5 font-mono text-[10.5px] uppercase tracking-[0.22em]">
            <span className="text-white/75">UX / UI Designer</span>
            <span className="text-accent" aria-hidden="true">→</span>
            <span className="text-white/40">DevOps / Cloud Engineer</span>
          </p>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-md border border-line-strong px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2.5 rounded-md border border-accent bg-accent/10 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-dark"
            >
              Resume
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-md border border-line-strong px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2.5 rounded-md border border-line-strong px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent"
            >
              Email
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}