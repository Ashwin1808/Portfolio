"use client";

import { Orbit } from "@/components/home/Orbit";
import { SystemIcon } from "@/components/home/SystemIcon";
import { stackNodes, infraFlow } from "@/data/journey";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

const iconFor: Record<string, string> = {
  "user": "user",
  "cloudfront": "aws",
  "kubernetes": "kubernetes",
  "services": "container",
  "postgresql": "database",
  "monitoring": "monitoring",
};

/**
 * [03] THE STACK — DevOps as a visual system, not a list.
 * The orbital constellation around DEVOPS + the infrastructure flow:
 * an animated signal travelling from user to observability.
 */
export function Stack() {

  return (
    <section id="stack" className="relative overflow-hidden border-b border-line">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              03 — The stack
            </p>
            <h2 className="h-giant mt-6 text-ink">
              One system,
              <br />
              <em className="italic text-accent">visualized.</em>
            </h2>
          </div>
          <p className="max-w-[360px] text-[13.5px] leading-[1.8] text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            Not a list of tools — a topology. Hover a node to see what it does
            and why it exists.
          </p>
        </div>

        {/* the constellation */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-faint">The orbit</p>
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

        {/* the flow — a signal through the infrastructure */}
        <div className="mt-20 border-t border-line pt-12">
          <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-faint">
            The flow — data travelling through the system
          </p>
          <Flow />
        </div>
      </div>
    </section>
  );
}

function Flow() {
  const reduced = useReducedMotion();
  return (
    <div className="relative mt-8">
      <div
        aria-hidden="true"
        className="absolute left-[5%] right-[5%] top-[10px] hidden border-t border-dashed border-line-strong md:block"
      />
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute top-[6px] hidden h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_14px_rgba(205,242,73,0.8)] md:block"
          style={{ left: "5%" }}
          animate={{ left: ["5%", "95%", "5%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="no-scrollbar overflow-x-auto pb-2 md:pb-0">
        <div className="flex min-w-max items-start gap-7 md:min-w-0 md:justify-between md:gap-0">
          {infraFlow.map((f, i) => (
            <div key={f.node} className="group relative flex flex-col items-center gap-3 text-center" data-cursor="explore">
              <span className="flex h-10 w-10 items-center justify-center border border-line-strong bg-paper/60 text-muted transition-colors duration-300 group-hover:border-accent/60 group-hover:text-accent">
                <SystemIcon id={iconFor[f.node.toLowerCase()] ?? "container"} className="h-[18px] w-[18px]" />
              </span>
              <span>
                <span className={cn("block font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors", i >= 4 ? "text-cyan" : i === 2 ? "text-accent" : "text-ink/70 group-hover:text-ink")}>
                  {f.node}
                </span>
                <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.12em] text-faint">
                  {f.sub}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}