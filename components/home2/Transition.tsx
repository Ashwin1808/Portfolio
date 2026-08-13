"use client";

import { motion } from "framer-motion";

const progression = [
  "Design",
  "User flows",
  "Frontend",
  "Applications",
  "Containers",
  "Kubernetes",
  "Cloud",
  "Observability",
];

const concepts = [
  {
    n: "01",
    title: "System thinking",
    body: "UX forced me to think beyond individual screens. DevOps requires thinking beyond individual servers or containers. Same discipline, different scale.",
  },
  {
    n: "02",
    title: "Edge cases",
    body: "Good UX designs loading, empty, error, retry and success. Good operations designs failure, recovery, health, logs, alerts and rollback. The unhappy path is where both are proven.",
  },
  {
    n: "03",
    title: "Information architecture",
    body: "Structuring complexity is a skill, not a tool. It translates directly into infrastructure, services, dependencies, environments and deployments.",
  },
  {
    n: "04",
    title: "Simplifying complexity",
    body: "My job as a designer is to take something complicated and make it understandable. That is exactly how I approach engineering.",
  },
];

export function Transition() {
  return (
    <section className="dark-band border-t border-white/10 bg-dark">
      <div className="wrap py-24 sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[880px]"
        >
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-cyan">
            The transition
          </p>
          <h2 className="mt-8 text-[2rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white sm:text-[2.8rem] lg:text-[3.6rem]">
            UX taught me to understand complexity from the user&apos;s side.
            <span className="text-white/45"> DevOps is teaching me to understand it from the system&apos;s side.</span>
          </h2>
        </motion.div>

        {/* Progression */}
        <div className="mt-20 overflow-x-auto pb-2 no-scrollbar">
          <div className="relative flex min-w-max items-center gap-0">
            <div className="absolute left-0 right-0 top-[5px] h-px bg-white/10" aria-hidden="true" />
            <motion.div
              className="absolute left-0 top-[5px] h-px bg-cyan"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              aria-hidden="true"
            />
            {progression.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.5 }}
                className="flex items-center"
              >
                <span className="relative z-10 h-[11px] w-[11px] rounded-full border-2 border-dark bg-cyan" aria-hidden="true" />
                <span className="px-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 first:pl-4 last:pr-0">
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Concepts */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {concepts.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="bg-dark p-8 sm:p-10"
            >
              <p className="font-mono text-[11px] text-cyan">{c.n}</p>
              <h3 className="mt-3 text-[17px] font-semibold text-white">{c.title}</h3>
              <p className="mt-3 text-[13px] leading-[1.75] text-white/55">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
