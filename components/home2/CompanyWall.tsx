"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { companyGroups } from "@/data/companies";
import { PhoneMock } from "@/components/home2/Sketches";

export function CompanyWall() {
  const [active, setActive] = useState<{ name: string; industry: string; projectType: string } | null>(null);

  return (
    <section className="border-t border-ink/10 bg-surface">
      <div className="wrap py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
                Across the work
              </p>
              <h2 className="h-giant mt-6 text-ink">
                Enterprise
                <br />
                in production.
              </h2>
              <p className="mt-6 max-w-[420px] text-[13.5px] leading-[1.75] text-muted">
                Banking, insurance and financial-services journeys designed through Ubona
                Technologies. Confidential clients stay anonymous — always.
              </p>
            </motion.div>

            <div className="mt-10 hidden min-h-[170px] lg:block">
              {active ? (
                <motion.div
                  key={active.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-[360px] rounded-lg border border-ink/12 bg-paper p-4"
                >
                  <p className="text-[14px] font-semibold text-ink">{active.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {active.industry}
                  </p>
                  <p className="mt-2 text-[12px] leading-[1.65] text-muted">{active.projectType}</p>
                </motion.div>
              ) : (
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
                  Hover a name →
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {companyGroups.map((g, gi) => (
              <motion.div
                key={g.group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: gi * 0.08 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                  {g.group}
                </p>
                <ul className="mt-4">
                  {g.items.map((c) => (
                    <li key={c.name} className="border-b border-ink/[0.07]">
                      <button
                        type="button"
                        onMouseEnter={() => setActive(c)}
                        onFocus={() => setActive(c)}
                        onMouseLeave={() => setActive(null)}
                        onBlur={() => setActive(null)}
                        className="group flex w-full items-center justify-between py-3 text-left"
                        aria-label={`${c.name} — ${c.projectType}`}
                      >
                        <span className="text-[15px] font-medium text-ink transition-colors duration-200 group-hover:text-accent">
                          {c.name}
                        </span>
                        <span
                          className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                          aria-hidden="true"
                        >
                          {c.confidential ? "sanitized" : "↗"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-ink/10 pt-10 lg:flex-row lg:justify-between">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">
            Sanitised — confidential client work shown as patterns, never as data
          </p>
          <div className="flex items-center gap-4">
            <PhoneMock label="anonymous, by design" seed={2} className="w-[110px] scale-[0.85] -my-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
