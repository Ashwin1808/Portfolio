"use client";

import { useEffect, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";import { mindset, rideMatchPipeline } from "@/data/journey";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * 05 — RideMatch. One project. The application sits at the top of the
 * view; underneath it the deployment pipeline, and a signal travelling
 * through it: code → github → ci/cd → docker → kubernetes → aws → monitoring.
 */
function Pipeline() {
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(progress, 1, {
      duration: 16,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (v) => setStage(Math.floor(v * rideMatchPipeline.length)),
    });
    return () => controls.stop();
  }, [progress, reduced]);

  const signalTop = useTransform(progress, [0, 1], ["4%", "97%"]);

  return (
    <div className="relative mx-auto mt-14 max-w-[640px]">
      <div className="absolute left-[7px] top-0 h-full w-px bg-line-strong" aria-hidden="true" />

      {/* travelling signal */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute left-[3px] z-10 h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_12px_rgba(205,242,73,0.9)]"
          style={{ top: signalTop, translateX: "-50%", translateY: "-50%" }}
        />
      )}

      <div className="space-y-0">
        {rideMatchPipeline.map((p, i) => {
          const lit = stage >= i || reduced;
          return (
            <div key={p.id} className="relative flex items-center gap-5 py-[26px] sm:gap-8">
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-[1] h-[7px] w-[7px] rounded-full border transition-colors duration-500",
                  lit ? "border-accent bg-accent/30" : "border-ink/30 bg-transparent",
                )}
              />
              <div className="flex flex-1 flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-500",
                    lit ? "text-ink" : "text-ink/40",
                  )}
                >
                  {p.node}
                </span>
                <span
                  className={cn(
                    "font-mono text-[9.5px] uppercase tracking-[0.18em] transition-colors duration-500",
                    lit ? "text-accent/90" : "text-ink/25",
                  )}
                >
                  {p.tool}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RideMatchSection() {
  return (
    <section id="ridematch" className="relative overflow-hidden py-28 sm:py-36">
      <div className="wrap">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-cyan">
          Current project
        </p>
        <div className="mt-7 grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.015em] text-ink lg:col-span-6">
            RideMatch
          </h2>
          <p className="max-w-[430px] text-[14.5px] leading-[1.85] text-muted lg:col-span-6 lg:justify-self-end">
            A production-style automotive platform I&apos;m building to deepen my
            engineering and DevOps skills.
          </p>
        </div>
      </div>

      {/* the application above the pipeline */}
      <div className="wrap mt-16">
        <div className="mx-auto max-w-[640px] rounded-[3px] border border-line bg-white/[0.02] px-8 py-8 sm:px-12 sm:py-10">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-ink/50">Application</span>
            <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
          </div>
          <div className="mt-6 space-y-2.5">
            <div className="h-2 w-3/4 rounded-full bg-ink/15" />
            <div className="h-2 w-1/2 rounded-full bg-ink/8" />
            <div className="h-2 w-2/3 rounded-full bg-ink/12" />
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["ride · match · recommend"].map((t) => (
              <span key={t} className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/30">
                {t}
              </span>
            ))}
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">● live</span>
          </div>
        </div>
      </div>

      <Pipeline />
      <div className="wrap mt-6">
        <p className="mx-auto max-w-[640px] font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink/35">
          The deployment path — code to monitoring
        </p>
      </div>

      <div className="wrap mt-10">
        <p className="mx-auto max-w-[640px] text-[12px] tracking-[0.06em] text-ink/50">
          Building with:{" "}
          <span className="text-ink">AWS · Docker · Kubernetes · Terraform · CI/CD · Prometheus · Grafana</span>
        </p>
      </div>

      {/* same mindset, different layer */}
      <div className="wrap mt-28 border-t border-line pt-20 sm:pt-24">
        <h2 className="font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-ink">
          Same mindset.
          <br />
          <em className="italic text-accent">Different layer.</em>
        </h2>

        <div className="mt-14 grid max-w-[860px] gap-10 sm:grid-cols-[1fr_auto_1fr] sm:gap-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-violet">UX</p>
            <ul className="mt-6 space-y-4">
              {mindset.map((m) => (
                <li key={m.ux} className="flex items-baseline gap-3 text-[14.5px] text-muted">
                  <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                  {m.ux}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="hidden items-center justify-center sm:flex"
            aria-hidden="true"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong font-mono text-[12px] text-accent">
              ↓
            </span>
          </div>

          <div className="sm:pt-14">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent">DevOps</p>
            <ul className="mt-6 space-y-4">
              {mindset.map((m) => (
                <li key={m.devops} className="flex items-baseline gap-3 text-[14.5px] text-muted">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                  {m.devops}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 max-w-[520px] text-[13.5px] leading-[1.8] text-ink/50">
          Different layer. Same instinct to simplify complexity.
          <span className="mt-2 block font-mono text-[9.5px] uppercase tracking-[0.26em] text-ink/30">
            The design mindset carried into engineering
          </span>
        </p>
      </div>

      {/* quiet footer of the section */}
      <div className="wrap mt-20 flex flex-wrap items-center gap-6">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
        >
          RideMatch on GitHub
          <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
      </div>
    </section>
  );
}