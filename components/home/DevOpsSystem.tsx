"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { stackNodes, rideMatchPipeline, mindset } from "@/data/journey";
import { Orbit } from "@/components/home/Orbit";
import { cn } from "@/lib/utils";

// color signal per pipeline stage — lavender: delivery, lime: containers,
// orange: cloud + observability
const stageColor: Record<string, { text: string; dot: string }> = {
  code: { text: "text-violet", dot: "border-violet bg-violet" },
  github: { text: "text-violet", dot: "border-violet bg-violet" },
  cicd: { text: "text-violet", dot: "border-violet bg-violet" },
  docker: { text: "text-accent", dot: "border-accent bg-accent" },
  kubernetes: { text: "text-accent", dot: "border-accent bg-accent" },
  aws: { text: "text-cyan", dot: "border-cyan bg-cyan" },
  monitoring: { text: "text-cyan", dot: "border-cyan bg-cyan" },
};

function Pipeline() {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(0, 1, {
      duration: 14,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (v) => setPos(v),
    });
    return () => controls.stop();
  }, [reduced]);

  const seq = Math.round(pos * (rideMatchPipeline.length - 1));
  const active = hover ?? seq;

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute left-[5%] right-[5%] top-[7px] hidden border-t border-dashed border-line-strong md:block" />
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute top-[3px] hidden h-[9px] w-[9px] rounded-full bg-ink shadow-[0_0_14px_rgba(236,231,219,0.6)] md:block"
          style={{ left: "5%" }}
          animate={{ left: ["5%", "95%", "5%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="no-scrollbar overflow-x-auto pb-2 md:pb-0">
        <div className="flex min-w-max items-start gap-6 md:min-w-0 md:justify-between md:gap-0">
          {rideMatchPipeline.map((p, i) => {
            const on = active === i;
            const passed = i < seq;
            const c = stageColor[p.id] ?? stageColor.code;
            return (
              <button
                key={p.node}
                type="button"
                onClick={() => setHover(hover === i ? null : i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                aria-pressed={on}
                aria-label={`${p.node} — ${p.detail}`}
                data-cursor="explore"
                className="group flex flex-col items-center gap-3"
              >
                <motion.span
                  animate={on ? { scale: 1.35 } : { scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className={cn(
                    "h-[15px] w-[15px] rounded-full border transition-colors duration-300",
                    on
                      ? c.dot + " shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                      : "border-line-strong bg-[#100e0c] group-hover:border-ink",
                  )}
                  aria-hidden="true"
                />
                <span className="flex flex-col items-center text-center">
                  <span
                    className={cn(
                      "font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
                      on ? c.text : passed ? "text-muted" : "text-white/70 group-hover:text-ink",
                    )}
                  >
                    {p.node}
                  </span>
                  <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                    {p.tool}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex min-h-[40px] items-baseline gap-3 border-t border-line pt-5" aria-live="polite">
        <span className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", stageColor[rideMatchPipeline[active].id]?.text ?? "text-accent")}>
          {rideMatchPipeline[active].node}
        </span>
        <span className="text-[12.5px] text-muted">{rideMatchPipeline[active].detail}</span>
      </div>
    </div>
  );
}

/**
 * The dive — the app floating above, and the camera travelling
 * underneath it: application → container → orchestration → cloud → observability.
 */
function DescentLayer({
  scrollYProgress,
  layer,
  reduced,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  layer: { label: string; sub: string; tint: string; y: number };
  reduced: boolean;
}) {
  const drift = useTransform(scrollYProgress, [0, 1], [layer.y * 16, layer.y * -16]);
  return (
    <motion.div
      style={{ y: reduced ? 0 : drift }}
      className="relative flex items-center gap-5 pl-9"
    >
      <span
        aria-hidden="true"
        className={cn("absolute left-0 h-[5px] w-[5px] rounded-full", layer.tint.replace("text-", "bg-"))}
      />
      <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
        <span className={cn("font-mono text-[11px] uppercase tracking-[0.2em]", layer.tint)}>
          {layer.label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
          {layer.sub}
        </span>
      </span>
    </motion.div>
  );
}

/**
 * The dive — the app floating above, and the camera travelling
 * underneath it: application → container → orchestration → cloud → observability.
 */
function DescentStack() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const layers = [
    { label: "Application", sub: "ridematch · api", tint: "text-violet", y: 0 },
    { label: "Container", sub: "docker image", tint: "text-accent", y: 1 },
    { label: "Orchestration", sub: "kubernetes · pods", tint: "text-accent", y: 2 },
    { label: "Cloud", sub: "aws · vpc", tint: "text-cyan", y: 3 },
    { label: "Observability", sub: "prometheus · grafana", tint: "text-cyan", y: 4 },
  ];

  return (
    <div ref={ref} className="relative flex min-h-[380px] flex-col justify-between py-2">
      {/* the hairline the layers travel along */}
      <div aria-hidden="true" className="absolute bottom-[8%] left-[9px] top-[8%] w-px bg-line-strong" />
      {layers.map((l) => (
        <DescentLayer key={l.label} scrollYProgress={scrollYProgress} layer={l} reduced={reduced === true} />
      ))}
    </div>
  );
}

/**
 * Part 03 — Now. Currently building: the DevOps system,
 * the RideMatch proof, and why the shift is natural.
 */
export function DevOpsSystem() {
  return (
    <section id="devops" className="border-b border-line">
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
            I&apos;m currently building hands-on projects with Linux, Docker,
            Kubernetes, Terraform, AWS, CI/CD and observability.
          </p>
        </div>

        {/* one connected system — floating in the environment, no plate */}
        <div className="mt-10">
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
                A production-style automotive platform I&apos;m building to deepen
                my engineering and DevOps skills.
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

          {/* the application above — the camera travels underneath it */}
          <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.24em] text-faint">
                Travelling underneath — the deployment path
              </p>
              <DescentStack />
            </div>
            <div className="lg:col-span-7">
              <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.24em] text-faint">
                The pipeline — a signal moving through infrastructure
              </p>
              <Pipeline />
            </div>
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