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
 * 04 — The back of the sheet. Currently building, the ledger of the
 * stack, the RideMatch fold-out, and the same mindset seen from the
 * front and the back of the same sheet.
 */

/** The engineering ledger — eight rows, like the ledger lines on the back of fine paper. */
function Ledger() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="mt-14 border-t border-cream/15">
      {stackNodes.map((n, i) => {
        const lit = active === n.id;
        return (
          <div
            key={n.id}
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive((cur) => (cur === n.id ? null : cur))}
            className={cn(
              "group relative border-b border-cream/15 transition-colors duration-300",
              lit && "bg-accent/[0.04]",
            )}
          >
            <div className="flex items-baseline gap-5 py-5 sm:gap-8 sm:py-6">
              <span
                className={cn(
                  "w-8 shrink-0 font-mono text-[10px] tracking-[0.2em] transition-colors duration-300",
                  lit ? "text-accent" : "text-cream/30",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-mono text-[13px] uppercase tracking-[0.22em] transition-all duration-300 sm:text-[15px]",
                  lit ? "translate-x-1.5 text-accent" : "text-cream/85",
                )}
              >
                {n.name}
              </span>
              <div className="hidden flex-1 items-center gap-6 sm:flex">
                <span className="h-px flex-1 transition-colors duration-300" aria-hidden="true">
                  <span
                    className={cn("block h-px w-full bg-cream/15 transition-colors duration-500", lit && "bg-accent/50")}
                  />
                </span>
                <motion.span
                  initial={false}
                  animate={{ opacity: lit ? 1 : 0.4, x: lit ? 0 : 8 }}
                  transition={{ duration: 0.4, ease }}
                  className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream/45"
                >
                  {n.detail}
                </motion.span>
              </div>
              <span
                className={cn(
                  "ml-auto block h-[5px] w-[5px] shrink-0 rounded-full border transition-all duration-300 sm:ml-0",
                  lit ? "border-accent bg-accent shadow-[0_0_8px_rgba(205,242,73,0.6)]" : "border-cream/25 bg-transparent",
                )}
                aria-hidden="true"
              />
            </div>
            {/* mobile detail */}
            <div
              className={cn(
                "overflow-hidden pl-[52px] transition-all duration-500 sm:hidden",
                lit ? "max-h-16 pb-4" : "max-h-0",
              )}
            >
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-cream/45">{n.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The RideMatch fold-out — the architecture as a printed spine with a travelling signal. */
function RideMatchFold() {
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const [stage, setStage] = useState(-1);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(progress, 1, {
      duration: 18,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (v) => setStage(Math.floor(v * rideMatchPipeline.length)),
    });
    return () => controls.stop();
  }, [progress, reduced]);

  const signalTop = useTransform(progress, [0, 1], ["6%", "94%"]);

  return (
    <div className="relative mt-14 grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-accent">
          Current project
        </p>
        <h3 className="mt-5 font-serif text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.02] tracking-[-0.015em] text-cream">
          RideMatch
        </h3>
        <p className="mt-5 max-w-[400px] text-[14px] leading-[1.85] text-cream/55">
          A production-style automotive platform I&apos;m building to deepen my
          engineering and DevOps skills.
        </p>
        <p className="mt-8 font-mono text-[9.5px] uppercase tracking-[0.2em] text-cream/40">
          Building with:{" "}
          <span className="text-accent">AWS · Docker · Kubernetes · Terraform · CI/CD · Prometheus · Grafana</span>
        </p>
      </div>

      <div className="lg:col-span-7">
        <p className="font-mono text-[9px] uppercase tracking-[0.26em] text-cream/30">
          The fold-out — application to monitoring
        </p>
        <div className="relative mt-6 max-w-[560px]">
          <div className="absolute left-[5px] top-0 h-full w-px bg-cream/15" aria-hidden="true" />
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="absolute left-[1px] z-10 h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_10px_rgba(205,242,73,0.8)]"
              style={{ top: signalTop, translateX: "-50%", translateY: "-50%" }}
            />
          )}
          <div>
            {rideMatchPipeline.map((p, i) => {
              const lit = staged(stage, i, reduced === true);
              return (
                <div key={p.id} className="relative flex items-center gap-6 py-[21px]">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative z-[1] h-[6px] w-[6px] rounded-full border transition-colors duration-500",
                      lit ? "border-accent bg-accent/25" : "border-cream/25 bg-transparent",
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[12px] uppercase tracking-[0.24em] transition-colors duration-500",
                      lit ? "text-cream" : "text-cream/35",
                    )}
                  >
                    {p.node}
                  </span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.14em] text-cream/30">
                    {p.tool}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/** A node lights when the signal has passed it (or always, with reduced motion). */
function staged(stage: number, i: number, reduced: boolean) {
  return reduced || stage >= i;
}

export function BuildSection() {
  return (
    <section id="building" className="sheet-grid relative overflow-hidden bg-sheet text-cream">
      <div className="wrap relative py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
              Currently building
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.015em]">
              The back of
              <br />
              the sheet — <em className="italic text-accent">DevOps / Cloud Engineering.</em>
            </h2>
          </div>
          <p className="max-w-[400px] text-[14px] leading-[1.85] text-cream/55 lg:col-span-4 lg:justify-self-end">
            I&apos;m building hands-on projects with Linux, AWS, Docker, Kubernetes,
            Terraform, CI/CD and observability.
          </p>
        </div>

        <Ledger />

        {/* RideMatch — the flagship on the back of the sheet */}
        <div className="mt-24 border-t border-cream/15 pt-16 sm:pt-20">
          <RideMatchFold />
        </div>

        {/* same mindset, different layer — one row, two sides */}
        <div className="mt-24 border-t border-cream/15 pt-16 sm:mt-32 sm:pt-20">
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.03] tracking-[-0.015em]">
            Same mindset.
            <br />
            <em className="italic text-accent">Different layer.</em>
          </h2>

          <div className="mt-14 grid max-w-[880px] gap-6">
            {/* the front side of the row */}
            <div className="grain relative overflow-hidden bg-cream px-7 py-8 text-carbon sm:px-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-lacquer">
                  The front — UX
                </p>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-carbon/35">
                  what people feel
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {mindset.map((m) => (
                  <li key={m.ux} className="flex items-baseline gap-4 text-[15px]">
                    <span className="h-1 w-1 rounded-full bg-lacquer" aria-hidden="true" />
                    {m.ux}
                  </li>
                ))}
              </ul>
            </div>

            {/* the crease between the two sides */}
            <div className="flex items-center gap-4 px-2" aria-hidden="true">
              <span className="h-px flex-1 bg-cream/15" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-cream/30">
                the same row, turned over
              </span>
              <span className="h-px flex-1 bg-cream/15" />
            </div>

            {/* the back side of the row */}
            <div className="relative overflow-hidden border border-accent/25 bg-sheet-soft px-7 py-8 text-cream sm:px-10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-accent">
                  The back — DevOps
                </p>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-cream/35">
                  what runs underneath
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {mindset.map((m) => (
                  <li key={m.devops} className="flex items-baseline gap-4 text-[15px]">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    {m.devops}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-12 max-w-[520px] text-[14px] leading-[1.85] text-cream/50">
            A designer who understands systems — becoming an engineer who
            understands people. Same instinct: simplify the complexity.
          </p>
        </div>
      </div>
    </section>
  );
}