"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { rideMatchPipeline } from "@/data/journey";
import { devopsTechLine } from "@/data/stack";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

function PipelineIcon({ id }: { id: string }) {
  const common = {
    className: "h-[16px] w-[16px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "code":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M9 18.5c-3 1-3-2-4.5-2.5m13.5 4v-3.2c0-1-.3-1.7-.8-2.3 2.8-.3 5.8-1.4 5.8-6.3a4.9 4.9 0 0 0-1.3-3.4 4.6 4.6 0 0 0-.1-3.4s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C7.3 2.6 6.2 2.9 6.2 2.9a4.6 4.6 0 0 0-.1 3.4A4.9 4.9 0 0 0 4.8 9.7c0 4.9 3 6 5.8 6.3-.3.3-.6.8-.7 1.5-.6.3-2.1.7-3-.8" />
        </svg>
      );
    case "cicd":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="5" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <path d="M7.5 12h4l2-5h3m0 10h-5l-1-5" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M8 10V7m0 3H5m3 0h3m-3 3v-3m0 0h6a3 3 0 0 0 2.4-4.8A3.6 3.6 0 0 1 21 8.4c.6 1.9-1 2.6-3 2.6H8m3 3v-3M5 13h3v3H5z" strokeLinejoin="round" />
        </svg>
      );
    case "kubernetes":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
          <path d="M12 11v10M4 7l8 4 8-4" />
          <path d="M7 5.5 12 8.5l5-3" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.6 1.36A3.8 3.8 0 0 1 17 18H7Z" />
          <path d="m12 15 3-3m0 0-3-3m3 3H9" />
        </svg>
      );
    case "monitoring":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
          <circle cx="4" cy="6" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="9.3" cy="2" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="14.7" cy="8" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="20" cy="4" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export function DevOpsPipeline() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(3);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* horizontal dotted connector */}
      <div
        aria-hidden="true"
        className="absolute left-[8%] right-[8%] top-[44px] hidden border-t border-dashed border-accent/30 lg:block"
      />
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduced ? 1 : lineScale }}
        className="absolute left-[8%] top-[44px] hidden h-px origin-left bg-gradient-to-r from-accent/0 via-accent to-accent/0 lg:block"
      />

      <div className="no-scrollbar overflow-x-auto pb-3">
        <div className="flex min-w-max items-start gap-2 lg:min-w-0 lg:justify-between lg:gap-0">
          {rideMatchPipeline.map((p, i) => (
            <div key={p.node} className="flex flex-col items-center px-2 text-center" style={{ width: `${100 / 7}%` }}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                aria-label={`${p.node} — ${p.tool}`}
                className="group flex flex-col items-center gap-3"
              >
                <span
                  className={cn(
                    "relative flex h-[40px] w-[40px] items-center justify-center rounded-full border transition-colors duration-300",
                    active === i
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-line-strong bg-surface text-muted hover:border-accent/60 hover:text-accent",
                  )}
                >
                  <PipelineIcon id={p.id} />
                  {active === i && (
                    <span
                      className="absolute inset-[-4px] rounded-full border border-accent/30"
                      aria-hidden="true"
                    />
                  )}
                </span>
                <span>
                  <span
                    className={cn(
                      "block font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
                      active === i ? "text-accent" : "text-ink-soft",
                    )}
                  >
                    {p.node}
                  </span>
                  <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                    {p.tool}
                  </span>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* active stage detail */}
      <div
        className="mt-5 min-h-[56px] border-t border-line pt-5"
        aria-live="polite"
      >
        <p className="text-[13px] font-medium text-accent">{rideMatchPipeline[active].node}</p>
        <p className="mt-1 text-[12.5px] leading-[1.7] text-muted">
          {rideMatchPipeline[active].detail}
        </p>
      </div>
    </div>
  );
}

export function CurrentlyBuilding() {
  return (
    <section className="border-b border-line bg-surface">
      <div className="wrap py-20 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">03</p>
            <h2 className="h-giant mt-6 text-ink">
              Currently
              <br />
              building
            </h2>
            <p className="mt-6 max-w-[420px] text-[13.5px] leading-[1.8] text-muted">
              Hands-on projects to deepen my engineering and DevOps skills.
            </p>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View on GitHub
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
          </motion.div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-line bg-dark p-7"
            >
              <p className="font-serif text-[1.9rem] leading-tight text-white">RideMatch</p>
              <p className="mt-3 text-[13px] leading-[1.75] text-white/55">
                A production-style automotive platform I&apos;m using to deepen my engineering
                and DevOps skills — three tiers, containerised, orchestrated, automated,
                provisioned as code and monitored.
              </p>
              <Link
                href="/engineering/ridematch"
                className="group mt-5 inline-flex items-center gap-2 text-[12.5px] font-medium text-accent transition-colors hover:text-white"
              >
                Read the case study
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="mt-16">
          <DevOpsPipeline />
        </div>

        {/* tech line — tiny, no logos */}
        <p className="mt-12 border-t border-line pt-6 text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-faint">
          {devopsTechLine.join("  ·  ")}
        </p>
      </div>
    </section>
  );
}
