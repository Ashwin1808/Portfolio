"use client";

import { motion, useReducedMotion } from "framer-motion";
import { labItems } from "@/data/journey";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * [05] THE LAB — experiments floating in space, not cards on a grid.
 * Objects drift on hover; they're stops on the journey, not a gallery.
 */
export function LabPlayground() {
  const reduced = useReducedMotion();

  return (
    <section id="lab" className="relative overflow-hidden border-b border-line">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="h-giant text-ink lg:col-span-7">
            The
            <br />
            <em className="italic text-accent">lab.</em>
          </h2>
          <p className="max-w-[360px] text-[13.5px] leading-[1.8] text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            Small experiments — interfaces, code and infrastructure — where
            curiosity is the only requirement.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {labItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              whileHover={reduced ? {} : { y: -8, rotate: i % 3 === 0 ? -0.8 : 0.8 }}
              data-cursor="explore"
              className="group relative border border-ink/15 bg-ink/[0.02] p-7 transition-colors duration-300 hover:border-accent/50"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 font-mono text-[9px] uppercase tracking-[0.24em] text-faint transition-colors group-hover:text-accent"
              >
                {item.num}
              </span>
              <span
                aria-hidden="true"
                className="mb-8 block h-1 w-8 bg-ink/25 transition-colors duration-300 group-hover:bg-accent"
              />
              <h3 className="font-serif text-[1.6rem] leading-[1.05] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent">
                {item.name}
              </h3>
              <p className="mt-3 text-[12.5px] leading-[1.7] text-muted">{item.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}