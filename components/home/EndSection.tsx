"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * 05 — The sheet closes. The back side, quietly: still designing,
 * still building, and four ways to reach Ashwin.
 */
export function EndSection() {
  const reduced = useReducedMotion();
  return (
    <section id="contact" className="relative overflow-hidden bg-sheet text-cream">
      <div className="sheet-grid-fine absolute inset-0" aria-hidden="true" />
      <div className="wrap relative flex min-h-[88svh] flex-col items-center justify-center py-28 text-center">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-center"
        >
          <p className="font-mono text-[9.5px] uppercase tracking-[0.3em] text-accent">
            The sheet closes
          </p>

          <h2 className="mt-8 font-serif text-[clamp(2.8rem,7vw,5.6rem)] leading-[1.0] tracking-[-0.02em]">
            Still designing.
            <br />
            <em className="italic text-accent">Still building.</em>
          </h2>

          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]">
            <span className="text-lacquer">UX/UI Designer</span>
            <span aria-hidden="true" className="text-cream/40">→</span>
            <span className="text-accent">DevOps / Cloud Engineer</span>
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/resume"
              className="group inline-flex items-center gap-2.5 border border-accent bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-sheet transition-colors duration-300 hover:bg-transparent hover:text-accent"
            >
              Resume
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            {[
              { label: "GitHub", href: site.github },
              { label: "LinkedIn", href: site.linkedin },
              { label: "Email", href: `mailto:${site.email}` },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 border border-cream/20 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                {l.label}
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            ))}
          </div>

          <p className="mt-20 max-w-[420px] font-mono text-[8.5px] uppercase leading-[2] tracking-[0.28em] text-cream/30">
            The front of the sheet is what people touch.
            <br />
            The back is what keeps it running.
            <br />
            <span className="text-cream/50">— one sheet, two sides.</span>
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-12 inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.26em] text-cream/30 transition-colors hover:text-accent"
          >
            Back to the front
            <span aria-hidden="true">↑</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}