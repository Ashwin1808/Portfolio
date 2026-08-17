"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { mindset, rideMatchPipeline, stackNodes } from "@/data/journey";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * 04 — The build. Currently building DevOps / Cloud Engineering:
 * one connected technical system, the RideMatch pipeline, and the
 * same mindset written twice.
 */

/** The technical system — eight nodes on one thin line. */
function StackSystem() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="relative mt-16">
      {/* the line the stack sits on */}
      <div className="relative hidden items-center sm:flex">
        {stackNodes.map((n, i) => (
          <div key={n.id} className="contents">
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((cur) => (cur === i ? null : cur))}
              className="group flex shrink-0 flex-col items-center gap-2.5"
            >
              <span
                className={cn(
                  "h-[9px] w-[9px] rounded-full border transition-all duration-300",
                  active === i
                    ? "border-accent bg-accent shadow-[0_0_12px_rgba(205,242,73,0.8)]"
                    : "border-cream/30 bg-transparent group-hover:border-cream/60",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "font-mono text-[8.5px] uppercase tracking-[0.16em] transition-colors duration-300",
                  active === i ? "text-cream" : "text-cream/45 group-hover:text-cream/70",
                )}
              >
                {n.name}
              </span>
            </button>
            {i < stackNodes.length - 1 && (
              <span className="relative mx-2 h-px flex-1 bg-cream/12" aria-hidden="true">
                <span
                  className="absolute -top-[2.5px] h-[6px] w-[6px] rounded-full bg-lacquer shadow-[0_0_8px_rgba(194,64,47,0.8)]"
                  style={{ animation: "signal-x 14s linear infinite", animationDelay: `${-14 * (i / stackNodes.length)}s` }}
                />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* mobile — a simple grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:hidden">
        {stackNodes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setActive((cur) => (cur === i ? null : i))}
            className="flex items-center gap-2.5 text-left"
          >
            <span
              className={cn(
                "h-[7px] w-[7px] shrink-0 rounded-full border transition-all duration-300",
                active === i
                  ? "border-accent bg-accent shadow-[0_0_10px_rgba(205,242,73,0.7)]"
                  : "border-cream/30",
              )}
              aria-hidden="true"
            />
            <span className={cn("font-mono text-[9px] uppercase tracking-[0.16em]", active === i ? "text-cream" : "text-cream/50")}>
              {n.name}
            </span>
          </button>
        ))}
      </div>

      {/* the one line, per node */}
      <div className="mt-10 h-6" aria-live="polite">
        {active === null ? (
          <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-cream/35">
            hover a node
          </p>
        ) : (
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-4 font-mono text-[9.5px] uppercase tracking-[0.22em]"
          >
            <span className="text-accent">{stackNodes[active].name}</span>
            <span className="h-px w-8 bg-cream/20" aria-hidden="true" />
            <span className="text-cream/60">{stackNodes[active].detail}</span>
          </motion.p>
        )}
      </div>
    </div>
  );
}

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
    <div className="relative mt-16">
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
                  "font-mono text-[8.5px] uppercase tracking-[0.16em] transition-colors duration-300",
                  lit >= i ? "text-cream" : "text-cream/40",
                )}
              >
                {p.node}
              </span>
            </div>
            {i < rideMatchPipeline.length - 1 && (
              <span className="mx-2 h-px flex-1 bg-cream/12" aria-hidden="true" />
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

/** Same mindset, different layer — the same rows, both sides. */
function MindsetBlock() {
  return (
    <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-start">
      <div>
        <p className="flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-lacquer">
          <span className="h-px w-6 bg-lacquer/60" aria-hidden="true" />
          UX
        </p>
        <ul className="mt-6 space-y-4">
          {mindset.map((m, i) => (
            <li key={m.ux} className="flex items-baseline gap-4">
              <span className="w-6 font-mono text-[9px] tracking-[0.2em] text-lacquer/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] text-cream/85">{m.ux}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center md:pt-8" aria-hidden="true">
        <span className="font-mono text-[15px] text-cream/40">↓</span>
      </div>

      <div>
        <p className="flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.26em] text-accent">
          <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
          DevOps
        </p>
        <ul className="mt-6 space-y-4">
          {mindset.map((m, i) => (
            <li key={m.devops} className="flex items-baseline gap-4">
              <span className="w-6 font-mono text-[9px] tracking-[0.2em] text-accent/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] text-cream/85">{m.devops}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
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
        {/* ── currently building ── */}
        <div className="max-w-[860px]">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
            Currently building
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

        <StackSystem />

        {/* ── ride match ── */}
        <div className="mt-28 border-t border-cream/10 pt-16 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-accent">
                Current project
              </p>
              <h3 className="mt-5 font-serif text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.0] tracking-[-0.015em]">
                RideMatch
              </h3>
              <p className="mt-6 max-w-[420px] text-[14px] leading-[1.85] text-cream/55">
                A production-style automotive platform I&apos;m building to
                deepen my engineering and DevOps skills. From the first commit
                to monitoring — the signal below never stops.
              </p>
            </div>
            <div className="lg:col-span-7">
              <Pipeline />
            </div>
          </div>
        </div>

        {/* ── same mindset ── */}
        <div className="mt-28 border-t border-cream/10 pt-16 sm:mt-32 sm:pt-20">
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.015em]">
            Same mindset.
            <br />
            <em className="italic text-accent">Different layer.</em>
          </h2>
          <div className="mt-12">
            <MindsetBlock />
          </div>
          <p className="mt-14 max-w-[520px] text-[14px] leading-[1.85] text-cream/50">
            Different layer. Same instinct to simplify complexity.
          </p>
        </div>
      </div>
    </section>
  );
}