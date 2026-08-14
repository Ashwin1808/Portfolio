"use client";

import { useState } from "react";
import { stackNodes } from "@/data/journey";
import { cn } from "@/lib/utils";

const pos: Record<string, [number, number]> = {
  linux: [8, 20],
  docker: [22, 48],
  kubernetes: [38, 74],
  terraform: [62, 76],
  aws: [78, 50],
  "ci-cd": [88, 22],
  prometheus: [72, 8],
  grafana: [10, 76],
};

const CX = 50;
const CY = 44;

/**
 * 04 — Currently building. The DevOps / Cloud direction, drawn as an
 * infrastructure composition: DEVOPS at the centre, the eight tools as
 * technical labels around it, thin connectors, tiny signals.
 */
export function BuildingSection() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = stackNodes.find((n) => n.id === active);

  return (
    <section id="building" className="relative overflow-hidden py-28 sm:py-36">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/40">
              Currently building
            </p>
            <h2 className="mt-7 font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.015em] text-ink">
              DevOps /
              <br />
              <em className="italic text-accent">Cloud Engineering.</em>
            </h2>
          </div>
          <p className="max-w-[420px] text-[14.5px] leading-[1.85] text-muted lg:col-span-4 lg:justify-self-end">
            I&apos;m currently building hands-on projects with Linux, Docker,
            Kubernetes, Terraform, AWS, CI/CD and observability.
          </p>
        </div>
      </div>

      {/* the composition — desktop */}
      <div className="wrap mt-16 hidden md:block" data-cursor="explore">
        <div className="relative h-[560px]">
          {/* connectors */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {stackNodes.map((n) => {
              const [x, y] = pos[n.id];
              const lit = active === n.id;
              return (
                <line
                  key={n.id}
                  x1={CX}
                  y1={CY}
                  x2={x}
                  y2={y}
                  stroke={lit ? "rgba(205,242,73,0.4)" : "rgba(236,231,219,0.08)"}
                  strokeWidth="0.09"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: "stroke 0.4s ease" }}
                />
              );
            })}
          </svg>

          {/* centre */}
          <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="font-serif text-[3.2rem] italic leading-none tracking-[-0.01em] text-ink">
              DevOps
            </p>
            <p className="mt-3 font-mono text-[8.5px] uppercase tracking-[0.34em] text-ink/35">
              System
            </p>
            <div className="mt-6 h-4">
              {activeNode ? (
                <p className="whitespace-nowrap font-mono text-[10px] tracking-[0.14em] text-accent">
                  {activeNode.name} — {activeNode.detail}
                </p>
              ) : (
                <p className="whitespace-nowrap font-mono text-[10px] tracking-[0.14em] text-ink/30">
                  hover a node
                </p>
              )}
            </div>
          </div>

          {/* labels */}
          {stackNodes.map((n) => {
            const [x, y] = pos[n.id];
            const lit = active === n.id;
            return (
              <button
                key={n.id}
                type="button"
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive((cur) => (cur === n.id ? null : cur))}
                className={cn(
                  "group absolute -translate-x-1/2 -translate-y-1/2 text-left font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300",
                  lit ? "text-accent" : "text-ink/45 hover:text-ink/80",
                )}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span
                  className={cn(
                    "mb-1.5 block h-1 w-1 rounded-full transition-colors duration-300",
                    lit ? "bg-accent shadow-[0_0_8px_rgba(205,242,73,0.8)]" : "bg-current opacity-50",
                  )}
                  aria-hidden="true"
                />
                {n.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* the composition — mobile: a quiet grid */}
      <div className="wrap mt-12 md:hidden">
        <div className="grid grid-cols-2 gap-x-6 gap-y-5">
          {stackNodes.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setActive((cur) => (cur === n.id ? null : n.id))}
              className="flex items-baseline gap-2.5 text-left"
            >
              <span className="h-1 w-1 translate-y-[-1px] rounded-full bg-ink/40" aria-hidden="true" />
              <span className={cn("font-mono text-[10.5px] uppercase tracking-[0.2em]", active === n.id ? "text-accent" : "text-ink/60")}>
                {n.name}
              </span>
            </button>
          ))}
        </div>
        <p className="mt-6 h-4 font-mono text-[10px] tracking-[0.14em]">
          {activeNode ? (
            <span className="text-accent">{activeNode.name} — {activeNode.detail}</span>
          ) : (
            <span className="text-ink/30">tap a node</span>
          )}
        </p>
      </div>
    </section>
  );
}