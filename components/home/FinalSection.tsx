"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalSection() {
  const reduced = useReducedMotion();
  return (
    <section id="resume" className="relative flex min-h-[92svh] items-center overflow-hidden">
      <div className="wrap w-full py-28 text-center sm:py-36">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="font-serif text-[clamp(2.8rem,7vw,5.6rem)] leading-[1.0] tracking-[-0.015em] text-ink">
            Still designing.
            <br />
            <em className="italic text-accent">Still building.</em>
          </h2>

          <p className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]">
            <span className="text-violet">UX/UI Designer</span>
            <span aria-hidden="true" className="text-ink/40">→</span>
            <span className="text-accent">DevOps / Cloud Engineer</span>
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/resume"
              className="group inline-flex items-center gap-2.5 rounded-sm border border-accent bg-accent px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-transparent hover:text-accent"
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
                className="group inline-flex items-center gap-2.5 rounded-sm border border-line-strong px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                {l.label}
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-16 inline-flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink/30 transition-colors hover:text-accent"
          >
            Back to the surface
            <span aria-hidden="true">↑</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}