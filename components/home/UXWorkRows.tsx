"use client";

import { motion, useReducedMotion } from "framer-motion";
import { uxTimeline } from "@/data/journey";
import { SystemIcon } from "@/components/home/SystemIcon";

const iconFor: Record<string, string> = {
  "visual-ivr": "mic",
  banking: "banking",
  insurance: "insurance",
  fintech: "currency",
  enterprise: "enterprise",
  ai: "ai",
  ccaas: "headset",
  mobile: "mobile",
};

/**
 * Part 02 — Work. A brutalist ledger: eight rows, no cards,
 * no horizontal scroll. The record of what's been designed.
 */
export function UXWorkRows() {
  const reduced = useReducedMotion();

  return (
    <section id="work" className="relative overflow-hidden border-b border-line bg-paper">
      {/* ghost index */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-4 select-none font-serif text-[16rem] leading-none text-ink/[0.04] sm:text-[24rem] lg:right-12"
      >
        02
      </span>

      <div className="wrap relative pt-20 sm:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="h-giant text-ink lg:col-span-8">
            What I&apos;ve
            <br />
            <em className="italic text-violet">designed.</em>
          </h2>
          <p className="max-w-[360px] text-[13.5px] leading-[1.8] text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            Before building systems, I spent years designing the experiences
            people interact with.
          </p>
        </div>

        {/* the ledger */}
        <div className="mt-16">
          <div className="hidden grid-cols-12 gap-4 border-b border-line-strong pb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-faint sm:grid">
            <span className="col-span-1">No.</span>
            <span className="col-span-5">Experience</span>
            <span className="col-span-3">Domain</span>
            <span className="col-span-3">Note</span>
          </div>

          <div>
            {uxTimeline.map((item, i) => (
              <motion.div
                key={item.id}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.04 * i }}
                className="group grid grid-cols-12 items-center gap-2 border-b border-line py-5 transition-colors duration-300 hover:bg-accent/[0.05] sm:gap-4 sm:py-6"
              >
                <span className="col-span-2 font-serif text-[1.5rem] leading-none text-faint transition-colors duration-300 group-hover:text-accent sm:col-span-1 sm:text-[1.9rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 flex items-center justify-between gap-3 sm:col-span-5">
                  <span className="font-serif text-[1.5rem] leading-[1.05] tracking-[-0.01em] text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-[2.1rem]">
                    {item.name}
                  </span>
                </span>
                <span className="col-span-5 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:col-span-3 sm:block">
                  {item.sub}
                </span>
                <span className="col-span-4 hidden text-[12.5px] text-muted sm:col-span-3 sm:block">
                  {item.line}
                </span>
                <span className="col-span-2 hidden text-right text-faint transition-all duration-300 group-hover:-translate-y-1 group-hover:text-violet sm:col-span-1 sm:block">
                  <SystemIcon id={iconFor[item.id] ?? item.id} className="h-[20px] w-[20px]" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* the record */}
        <div className="mt-10 flex flex-col gap-2 border-t-2 border-ink/15 pt-5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            3+ years designing across banking · fintech · insurance · conversational UX ·
            enterprise products · AI-assisted workflows
          </span>
          <span className="text-muted">The record — 2023 → present</span>
        </div>
      </div>
    </section>
  );
}