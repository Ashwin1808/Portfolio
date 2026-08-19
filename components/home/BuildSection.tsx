"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { mindset, rideMatchPipeline } from "@/data/journey";
import { cn } from "@/lib/utils";

/** The RideMatch pipeline — one signal, seven stages. */
function Pipeline() {
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(progress, 1, {
      duration: 9,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (v) => setStage(Math.floor(v * rideMatchPipeline.length)),
    });
    return () => controls.stop();
  }, [progress, reduced]);

  const dotLeft = useTransform(progress, (v) => `${v * 100}%`);

  const lit = reduced ? rideMatchPipeline.length : stage;

  return (
    <div className="relative mt-14">
      {/* the rail */}
      <div className="relative hidden items-center sm:flex">
        {rideMatchPipeline.map((p, i) => (
          <div key={p.id} className="contents">
            <div className="flex shrink-0 flex-col items-center gap-2.5">
              <span
                className={cn(
                  "h-[9px] w-[9px] rounded-full border transition-all duration-300",
                  lit >= i
                    ? "border-accent bg-accent shadow-[0_0_12px_rgba(205,242,73,0.8)]"
                    : "border-cream/25",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-[15px] leading-tight transition-colors duration-300",
                  lit >= i ? "text-cream" : "text-cream/40",
                )}
                style={{ fontFamily: "var(--font-serif)", letterSpacing: "-0.01em" }}
              >
                {p.node}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-cream/40">
                {p.tool}
              </span>
            </div>
            {i < rideMatchPipeline.length - 1 && (
              <span className="mx-3 h-px flex-1 bg-cream/12" aria-hidden="true" />
            )}
          </div>
        ))}

        {/* the signal */}
        {!reduced && (
          <motion.span
            className="absolute top-[4px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-lacquer shadow-[0_0_12px_rgba(194,64,47,0.9)]"
            style={{ left: dotLeft }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* mobile — a simple rail */}
      <div className="relative h-10 sm:hidden">
        <div className="absolute inset-x-0 top-[3px] h-px bg-cream/12" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between">
          {rideMatchPipeline.map((p, i) => (
            <span
              key={p.id}
              className={cn(
                "h-[7px] w-[7px] rounded-full border transition-all duration-300",
                lit >= i ? "border-accent bg-accent" : "border-cream/25",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* the passing stage */}
      <div className="mt-8 h-6" aria-live="polite">
        <p className="flex items-center gap-4 font-mono text-[9.5px] uppercase tracking-[0.22em]">
          <span className="text-accent">{rideMatchPipeline[Math.max(0, Math.min(lit, rideMatchPipeline.length - 1))].node}</span>
          <span className="h-px w-8 bg-cream/20" aria-hidden="true" />
          <span className="text-cream/60">
            {rideMatchPipeline[Math.max(0, Math.min(lit, rideMatchPipeline.length - 1))].tool}
          </span>
        </p>
      </div>
    </div>
  );
}

/** Same row, two sides of the sheet — front: design, back: system. */
function MindsetBlock() {
  return (
    <div>
      <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-cream/40">
        Same row — the front and the back of the sheet
      </p>
      <ul className="mt-8">
        {mindset.map((row) => (
          <li
            key={row.ux}
            className="grid grid-cols-1 gap-x-10 border-t border-cream/10 py-7 sm:grid-cols-2"
          >
            <div className="pr-4 sm:pr-10">
              <p className="font-serif text-[clamp(1.15rem,2.2vw,1.45rem)] leading-snug tracking-[-0.01em] text-cream/85">
                {row.ux}
              </p>
              <p className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.2em] text-cream/35">
                {row.uxNote}
              </p>
            </div>
            <div className="mt-6 sm:mt-0 sm:border-l sm:border-cream/10 sm:pl-10">
              <p className="font-serif text-[clamp(1.15rem,2.2vw,1.45rem)] leading-snug tracking-[-0.01em] italic text-cream/60">
                {row.devops}
              </p>
              <p className="mt-2 font-mono text-[8.5px] uppercase tracking-[0.2em] text-cream/35">
                {row.opsNote}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The quiet close of the mindset — one instinct, two layers. */
function MindsetStack() {
  return (
    <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-cream/10 pt-6 font-mono text-[9px] uppercase tracking-[0.24em] text-cream/40">
      <span>Design side</span>
      <span aria-hidden="true" className="text-cream/20">↔</span>
      <span>System side</span>
      <span aria-hidden="true" className="text-cream/20">·</span>
      <span className="text-accent">Same instinct</span>
      <span aria-hidden="true" className="text-cream/20">·</span>
      <span>Simplify complexity</span>
    </p>
  );
}

export function BuildSection() {
  return (
    <section
      id="building"
      className="grain relative overflow-hidden text-cream"
      style={{ background: "rgba(10,8,6,0.45)" }}
    >
      <div className="wrap relative py-24 sm:py-32">
        {/* ── currently building — the stack and the project, one section ── */}
        <div className="max-w-[860px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            05 — Currently building
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.0] tracking-[-0.02em]">
            DevOps / Cloud
            <br />
            <em className="bg-gradient-to-r from-accent via-cyan to-violet bg-clip-text italic text-transparent">
              Engineering.
            </em>
          </h2>
          <p className="mt-8 max-w-[520px] text-[14px] leading-[1.85] text-cream/55">
            I&apos;m currently building hands-on projects with Linux, Docker,
            Kubernetes, Terraform, AWS, CI/CD and observability. Learning the
            layer underneath the interface — one system at a time.
          </p>
        </div>

        <div className="mt-16 border-t border-cream/10 pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-cream/40">
              The path — code to monitoring
            </p>
            <p className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-cream/30">
              RideMatch · one system, built end to end
            </p>
          </div>
          <div className="mt-9">
            <Pipeline />
          </div>
        </div>

        {/* ── same mindset ── */}
        <div className="mt-28 border-t border-cream/10 pt-16 sm:mt-32 sm:pt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">
            06 — Same mindset
          </p>
          <h2 className="mt-6 font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.015em]">
            Same mindset.
            <br />
            <em className="italic text-accent">Different layer.</em>
          </h2>
          <div className="mt-12">
            <MindsetBlock />
            <MindsetStack />
          </div>
        </div>
      </div>
    </section>
  );
}