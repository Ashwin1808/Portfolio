"use client";

import { motion, useReducedMotion } from "framer-motion";
import { trajectory } from "@/data/journey";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * [01] ORIGIN — leaving one orbit, entering another.
 * The trajectory: each technology is a waypoint on a curved path.
 */
export function Origin() {
  const reduced = useReducedMotion();

  return (
    <section id="origin" className="relative overflow-hidden border-b border-line">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              01 — Origin
            </p>
            <h2 className="h-giant mt-6 text-ink">
              From designing
              <br />
              interfaces to
              <br />
              <em className="italic text-accent">engineering systems.</em>
            </h2>
          </div>
          <div className="max-w-[400px] lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <p className="text-[13.5px] leading-[1.9] text-muted">
              I started by designing digital experiences.
            </p>
            <p className="mt-4 text-[13.5px] leading-[1.9] text-muted">
              Somewhere along the way, I became obsessed with understanding what
              happens behind the interface.
            </p>
            <p className="mt-4 text-[13.5px] leading-[1.9] text-ink/80">
              Now I&apos;m exploring the systems that make those experiences possible.
            </p>
          </div>
        </div>

        {/* the trajectory */}
        <div className="relative mt-20" aria-hidden="true">
          <svg viewBox="0 0 1200 260" className="hidden w-full md:block" aria-hidden="true">
            <path
              d="M40 220 C 300 40, 600 40, 1160 200"
              fill="none"
              stroke="rgba(236,231,219,0.12)"
              strokeWidth="1"
            />
            <path
              d="M40 220 C 300 40, 600 40, 1160 200"
              fill="none"
              stroke="rgba(205,242,73,0.35)"
              strokeWidth="1"
              strokeDasharray="3 7"
            />
          </svg>

          {/* waypoints */}
          <div className="absolute inset-0 hidden md:block">
            {trajectory.map((t, i) => {
              const t0 = 40;
              const x = t0 + (i / (trajectory.length - 1)) * 1120;
              const curve = (i / (trajectory.length - 1)) * Math.PI;
              const y = 220 - Math.sin(curve) * 170;
              return (
                <motion.div
                  key={t.id}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.09 }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: x, top: y }}
                >
                  <span
                    className={`block h-[7px] w-[7px] rounded-full border-2 ${
                      i === trajectory.length - 1
                        ? "border-accent bg-accent shadow-[0_0_12px_rgba(205,242,73,0.8)]"
                        : i === 0
                          ? "border-violet bg-violet"
                          : "border-ink/40 bg-paper"
                    }`}
                  />
                  <span className="absolute left-[14px] top-[-7px] whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                    {t.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* mobile — vertical waypoints */}
          <div className="flex flex-col gap-0 md:hidden">
            {trajectory.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-4 border-t border-line py-3.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/80"
              >
                <span
                  className={`h-[7px] w-[7px] shrink-0 rounded-full border-2 ${
                    i === trajectory.length - 1
                      ? "border-accent bg-accent"
                      : i === 0
                        ? "border-violet bg-violet"
                        : "border-ink/40"
                  }`}
                />
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}