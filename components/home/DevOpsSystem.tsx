"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { stackNodes, rideMatchPipeline, mindset } from "@/data/journey";
import { Orbit } from "@/components/home/Orbit";
import { cn } from "@/lib/utils";

function Pipeline() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute left-[5%] right-[5%] top-[7px] hidden border-t border-dashed border-accent/25 md:block" />
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute top-[3px] hidden h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_14px_rgba(205,242,73,0.8)] md:block"
          style={{ left: "5%" }}
          animate={{ left: ["5%", "95%", "5%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="no-scrollbar overflow-x-auto pb-2 md:pb-0">
        <div className="flex min-w-max items-start gap-6 md:min-w-0 md:justify-between md:gap-0">
          {rideMatchPipeline.map((p, i) => (
            <button
              key={p.node}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={active === i}
              aria-label={`${p.node} — ${p.detail}`}
              data-cursor="explore"
              className="group flex flex-col items-center gap-3"
            >
              <motion.span
                animate={active === i ? { scale: 1.35 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className={cn(
                  "h-[15px] w-[15px] rounded-full border transition-colors duration-300",
                  active === i
                    ? "border-accent bg-accent shadow-[0_0_12px_rgba(205,242,73,0.7)]"
                    : "border-line-strong bg-dark-surface group-hover:border-accent/60",
                )}
                aria-hidden="true"
              />
              <span className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
                    active === i ? "text-accent" : "text-white/70",
                  )}
                >
                  {p.node}
                </span>
                <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-dark-faint">
                  {p.tool}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex min-h-[40px] items-baseline gap-3 border-t border-dark-line pt-5" aria-live="polite">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{rideMatchPipeline[active].node}</span>
        <span className="text-[12.5px] text-dark-muted">{rideMatchPipeline[active].detail}</span>
      </div>
    </div>
  );
}

/**
 * Part 03 — Now. Currently building: the DevOps system,
 * the RideMatch proof, and why the shift is natural.
 */
export function DevOpsSystem() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-faint">Currently building</p>
            <h2 className="h-giant mt-6 text-ink">
              DevOps /
              <br />
              <em className="italic text-accent">Cloud Engineering.</em>
            </h2>
          </div>
          <p className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-5 lg:justify-self-end">
            I&apos;m currently building hands-on projects with Linux, Docker, Kubernetes,
            Terraform, AWS, CI/CD and observability.
          </p>
        </div>

        {/* one connected system */}
        <div className="mt-16 rounded-lg border border-line bg-paper p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-faint">The system</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-faint">hover a node</p>
          </div>
          <Orbit
            center="DEVOPS"
            nodes={stackNodes}
            accent="text-accent"
            glyphSize="h-[17px] w-[17px]"
            className="mt-2"
          />
        </div>

        {/* RideMatch — the proof */}
        <div className="mt-20 border-t border-line pt-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint">Current project</p>
              <h3 className="mt-4 font-serif text-[2.6rem] leading-[1.02] tracking-[-0.01em] text-ink sm:text-[3.4rem]">
                RideMatch
              </h3>
              <p className="mt-4 max-w-[440px] text-[13.5px] leading-[1.8] text-muted">
                A production-style automotive platform I&apos;m using to deepen my engineering
                and DevOps skills.
              </p>
            </div>
            <Link
              href="/engineering/ridematch"
              className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent transition-colors hover:text-ink"
            >
              Case study
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="mt-12">
            <Pipeline />
          </div>
        </div>

        {/* same mindset, different layer */}
        <div className="mt-20 border-t border-line pt-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <h2 className="h-giant text-ink lg:col-span-6">
              Same mindset.
              <br />
              <em className="italic text-accent">Different layer.</em>
            </h2>
            <p className="max-w-[340px] text-[13.5px] leading-[1.85] text-muted lg:col-span-5 lg:justify-self-end">
              UX and operating systems ask the same thing: understand the whole, anticipate
              what can break, and make the next action obvious.
            </p>
          </div>

          <div className="mt-14 grid gap-x-12 sm:grid-cols-[1fr_44px_1fr]">
            <div className="space-y-0">
              <p className="pb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-violet">UX</p>
              {mindset.map((m) => (
                <p key={m.ux} className="border-t border-line py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85">
                  {m.ux}
                </p>
              ))}
            </div>
            <div className="hidden items-center sm:flex" aria-hidden="true">
              <span className="w-full border-t border-line-strong" />
            </div>
            <div className="space-y-0">
              <p className="pb-3 font-mono text-[9px] uppercase tracking-[0.24em] text-accent">DevOps</p>
              {mindset.map((m) => (
                <p key={m.devops} className="border-t border-line py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85">
                  {m.devops}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}