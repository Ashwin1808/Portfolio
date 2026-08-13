"use client";

import { motion } from "framer-motion";
import { companyGroups } from "@/data/companies";

export function CompanyContext() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="wrap py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent"
            >
              Industry context
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 max-w-[340px] text-[13.5px] leading-[1.8] text-muted"
            >
              Enterprise deployments across financial services, insurance, banking and
              conversational platforms. Confidential engagements are labelled honestly — no
              invented client names.
            </motion.p>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-t border-line">
              {companyGroups.map((g, gi) => (
                <motion.div
                  key={g.group}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: gi * 0.06 }}
                  className="grid gap-3 border-b border-line py-5 sm:grid-cols-[180px_1fr] sm:gap-8"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint pt-0.5">
                    {g.group}
                  </dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {g.items.map((item) => (
                      <span
                        key={item.name}
                        className="text-[15px] font-medium tracking-[0.01em] text-ink-soft transition-colors duration-200 hover:text-accent"
                      >
                        {item.name}
                        <span className="ml-3 text-[10px] text-faint/70">·</span>
                      </span>
                    ))}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
