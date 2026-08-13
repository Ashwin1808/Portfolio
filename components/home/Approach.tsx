"use client";

import { motion } from "framer-motion";

const principles = [
  {
    n: "01",
    title: "System thinking",
    body: "I look beyond individual screens or components to understand the bigger picture.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 3.5v6m0 5v6M3.5 12h6m5 0h6" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Designing for edge cases",
    body: "Great experiences handle the unexpected. The same mindset makes great systems.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3.5 21 19H3L12 3.5Z" />
        <path d="M12 10v4m0 3v.5" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Structuring complexity",
    body: "Whether it&apos;s a user flow or infrastructure, I believe in clarity through structure.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
        <path d="M12 11v10M4 7l8 4 8-4" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "Simplifying for humans",
    body: "Technology should empower people, not overwhelm them.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3v4m0 10v4M3 12h4m10 0h4" />
        <circle cx="12" cy="12" r="2" />
        <path d="m5.6 5.6 2.8 2.8m7.2 7.2 2.8 2.8m0-15.6-2.8 2.8m-7.2 7.2-2.8 2.8" />
      </svg>
    ),
  },
];

export function Approach() {
  return (
    <section className="dark-band border-b border-line bg-dark">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
                02 — My approach
              </p>
              <h2 className="h-giant mt-6 text-white">
                UX taught me to see
                <br />
                the whole journey.
                <span className="mt-2 block text-white/40">
                  DevOps is teaching me
                  <br />
                  to see the whole system.
                </span>
              </h2>
              <p className="mt-6 max-w-[360px] text-[13.5px] leading-[1.8] text-white/50">
                Both start with the same mindset.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {principles.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group flex items-start gap-6 py-7"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/12 text-white/40 transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
                    {p.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-white">
                        {p.title}
                      </h3>
                      <span className="font-mono text-[10px] text-white/25">{p.n}</span>
                    </div>
                    <p className="mt-1.5 max-w-[520px] text-[13px] leading-[1.75] text-white/55">
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12"
            >
              <p className="font-serif text-[2.2rem] italic text-white/80">Ashwin K</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
                Always learning. Always building.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
