"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * [07] TRANSMISSION — the edge of the universe. One glowing
 * communication interface, a signal travelling into the distance.
 */
export function Transmission() {
  const reduced = useReducedMotion();

  return (
    <section id="transmission" className="relative overflow-hidden border-b border-line">
      {/* the signal — a pulse travelling into the distance */}
      <div aria-hidden="true" className="absolute inset-x-0 top-24 hidden h-px md:block">
        <motion.span
          className="block h-1 w-1 rounded-full bg-accent shadow-[0_0_16px_rgba(205,242,73,1)]"
          animate={reduced ? {} : { left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: -1 }}
        />
      </div>

      <div className="wrap py-28 sm:py-40">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
            07 — Transmission
          </p>

          <motion.h2
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="h-giant mt-8 text-ink"
          >
            Transcript open.
            <em className="mt-2 block italic text-accent">Do you copy?</em>
          </motion.h2>

          <p className="mx-auto mt-10 max-w-[420px] text-[14px] leading-[1.9] text-muted">
            Have a problem worth solving? Let&apos;s build something
            interesting.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              data-cursor="explore"
              className="group inline-flex items-center gap-3 border-2 border-accent bg-accent px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper transition-colors hover:bg-paper hover:text-accent"
            >
              Start a conversation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-ink/25 px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
              <span>↗</span>
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border-2 border-ink/25 px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              GitHub
              <span>↗</span>
            </a>
          </div>

          {/* mission dossier — the resume, as an interface */}
          <div className="mx-auto mt-20 max-w-[480px] border-2 border-ink/12 bg-paper/40 p-7 text-left">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4 font-mono text-[9px] uppercase tracking-[0.24em] text-faint">
              <span>Mission dossier</span>
              <span className="text-accent">ASHWIN · AK-01</span>
            </div>
            <p className="mt-4 font-serif text-[1.5rem] leading-[1.1] text-ink">
              Product Designer × Cloud / DevOps Engineer
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/resume"
                className="group inline-flex flex-1 items-center justify-center gap-2 border-2 border-accent bg-accent px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-accent"
              >
                Open dossier
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
              </Link>
              <a
                href={site.resumePdf ?? "/resume"}
                className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-ink/25 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Download pdf
                <span>↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}