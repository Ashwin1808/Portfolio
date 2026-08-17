"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

/** 05 — The close. Quiet: still designing, still building, four doors. */
export function EndSection() {
  const reduced = useReducedMotion();
  return (
    <section
      id="contact"
      className="relative overflow-hidden text-cream"
      style={{ background: "rgba(10,8,6,0.45)" }}
    >
      <div className="wrap relative flex min-h-[70svh] flex-col items-center justify-center py-28 text-center">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-center"
        >
          <h2 className="font-serif text-[clamp(2.8rem,7vw,5.6rem)] leading-[1.0] tracking-[-0.02em]">
            Still designing.
            <br />
            <em className="text-shimmer bg-gradient-to-r from-lacquer via-cyan to-accent bg-clip-text italic text-transparent">
              Still building.
            </em>
          </h2>

          <p className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]">
            <span className="text-lacquer">UX/UI Designer</span>
            <span aria-hidden="true" className="text-cream/40">→</span>
            <span className="text-cream/70">DevOps / Cloud Engineer</span>
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
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

          <p className="mt-16 font-serif text-[13px] italic text-cream/35">
            {site.name} — {site.footer.line}
          </p>
        </motion.div>
      </div>
    </section>
  );
}