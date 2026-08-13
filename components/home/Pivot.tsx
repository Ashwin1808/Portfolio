"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const slices = [
  { h: 34, delta: -120, rot: -8 },
  { h: 22, delta: -56, rot: 6 },
  { h: 20, delta: 0, rot: 0 },
  { h: 24, delta: 58, rot: -5 },
  { h: 26, delta: 122, rot: 7 },
];

const layers = [
  { label: "Components", color: "border-violet/40", text: "text-violet", depth: -64 },
  { label: "Code", color: "border-cyan/40", text: "text-cyan", depth: -32 },
  { label: "Containers", color: "border-accent/40", text: "text-accent", depth: 0 },
  { label: "Services", color: "border-accent/40", text: "text-accent", depth: 32 },
  { label: "Infrastructure", color: "border-accent/50", text: "text-accent", depth: 64 },
];

function Slice({
  index,
  scrollYProgress,
  reduced,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const s = slices[index];
  const y = useTransform(scrollYProgress, [0, 1], [0, s.delta]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, s.rot]);
  const opacity = useTransform(scrollYProgress, [0.55, 0.8], [1, 0]);
  return (
    <motion.div
      style={{ height: s.h, y: reduced ? 0 : y, rotate: reduced ? 0 : rotate, opacity: reduced ? 1 : opacity }}
      className={cn(
        "border-b border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
        index === slices.length - 1 && "border-b-0",
      )}
    >
      <div className="flex h-full items-center justify-between px-5">
        <span className="h-2 w-16 rounded-full bg-white/25" aria-hidden="true" />
        <span className="h-2 w-8 rounded-full bg-white/10" aria-hidden="true" />
      </div>
    </motion.div>
  );
}

function Layer({
  index,
  scrollYProgress,
  reduced,
}: {
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const l = layers[index];
  const y = useTransform(scrollYProgress, [0.45, 1], [120, l.depth]);
  const opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  return (
    <motion.div
      style={{ y: reduced ? 0 : y, opacity: reduced ? 1 : opacity }}
      className={cn("absolute left-1/2 flex h-11 w-[320px] -translate-x-1/2 items-center justify-between rounded-md border bg-dark-surface/80 px-4 sm:w-[400px]", l.color)}
    >
      <span className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", l.text)}>{l.label}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-line-strong" aria-hidden="true" />
    </motion.div>
  );
}

/**
 * Scroll 04 — the pivot moment: an interface breaking apart
 * into components, code, containers, services and infrastructure.
 */
export function Pivot() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });

  return (
    <section className="dark-band relative overflow-hidden border-b border-line bg-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[640px] -translate-x-1/2 opacity-[0.05] blur-[100px]"
        style={{ background: "radial-gradient(circle, #cdf249 0%, transparent 70%)" }}
      />
      <div ref={ref} className="wrap py-28 sm:py-36">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-cyan">04 — The pivot</p>
          <h2 className="h-giant mt-6 text-white">
            Now I&apos;m building
            <br />
            what sits <em className="italic text-accent">underneath.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[460px] text-[13.5px] leading-[1.8] text-dark-muted">
            Scroll and watch the interface come apart — into components, code, containers,
            services and the infrastructure that keeps them running.
          </p>
        </div>

        {/* the breakdown */}
        <div className="relative mx-auto mt-20 h-[340px] w-full max-w-[560px]">
          {/* target layers — appear behind as the interface breaks */}
          {layers.map((l, i) => (
            <Layer key={l.label} index={i} scrollYProgress={scrollYProgress} reduced={!!reduced} />
          ))}

          {/* the interface — five slices that scatter */}
          <div className="absolute left-1/2 top-1/2 flex w-[220px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg border border-white/15 bg-white/5 backdrop-blur-sm sm:w-[260px]">
            {slices.map((s, i) => (
              <Slice key={i} index={i} scrollYProgress={scrollYProgress} reduced={!!reduced} />
            ))}
          </div>

          {/* caption that swaps with the breakdown */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
            <motion.p
              animate={reduced ? { opacity: 1 } : { opacity: [1, 0.4, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="font-mono text-[9.5px] uppercase tracking-[0.26em] text-dark-muted"
            >
              interface → components → containers → services → infrastructure
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}