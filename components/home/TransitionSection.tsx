"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * 03 — The transition. The top strip is a piece of UI (a frame with
 * content). It splits apart into the layers beneath the interface —
 * down to infrastructure.
 */
const steps = [
  { label: "FRAME", tint: "border-violet/40", text: "text-violet", body: "the interface" },
  { label: "COMPONENT", tint: "border-violet/30", text: "text-violet/70", body: "what people touch" },
  { label: "CODE", tint: "border-ink/20", text: "text-ink", body: "docker build -t app ." },
  { label: "CONTAINER", tint: "border-ink/20", text: "text-ink/80", body: "cgroup · namespace" },
  { label: "SERVICE", tint: "border-accent/30", text: "text-accent", body: "port 8080 · health" },
  { label: "INFRASTRUCTURE", tint: "border-cyan/40", text: "text-cyan", body: "aws · vpc · cluster" },
] as const;

export function TransitionSection() {
  const reduced = useReducedMotion();
  return (
    <section id="transition" className="relative overflow-hidden py-28 sm:py-36">
      <div className="wrap">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/40">
          The transition
        </p>
        <h2 className="mt-7 font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.015em] text-ink">
          From interfaces
          <br />
          <em className="italic text-cyan">to infrastructure.</em>
        </h2>
        <p className="mt-6 max-w-[520px] text-[14.5px] leading-[1.85] text-muted">
          The same systems-thinking mindset, now from the engineering side.
        </p>
      </div>

      <div className="wrap mt-20">
        <div className="mx-auto max-w-[760px]">
          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.14 }}
              className="group"
            >
              <div className="flex items-center gap-6 py-6 sm:gap-10">
                <span className={`w-6 shrink-0 text-center font-mono text-[9px] tracking-[0.2em] ${s.text}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`flex-1 border-y border-line py-6 ${s.tint}`}>
                  {i === 0 ? (
                    /* the frame — a small piece of UI */
                    <div className="flex flex-wrap items-end justify-between gap-6">
                      <div>
                        <p className={`font-mono text-[10px] uppercase tracking-[0.26em] ${s.text}`}>
                          {s.label}
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="h-1.5 w-48 rounded-full bg-ink/25" />
                          <div className="h-1.5 w-32 rounded-full bg-ink/12" />
                          <div className="h-1.5 w-40 rounded-full bg-ink/8" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-ink/30" />
                        <span className="h-1 w-1 rounded-full bg-ink/20" />
                        <span className="h-1 w-1 rounded-full bg-ink/10" />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <p className={`font-mono text-[10px] uppercase tracking-[0.26em] ${s.text}`}>
                        {s.label}
                      </p>
                      <p className="font-mono text-[10px] tracking-[0.08em] text-ink/40">
                        <span className="mr-2 text-accent" aria-hidden="true">→</span>
                        {s.body}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="wrap mt-16">
        <p className="max-w-[420px] text-[13px] leading-[1.8] text-ink/40">
          The interface is a thin skin. Underneath it lives the system this
          portfolio descends through.
        </p>
      </div>
    </section>
  );
}