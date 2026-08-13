"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { rideMatchArchitecture, rideMatchPipeline } from "@/data/journey";
import { site } from "@/data/site";
import { WebMock } from "@/components/home/Sketches";
import { cn } from "@/lib/utils";

function NodeGlyph({ id }: { id: string }) {
  const common = {
    className: "h-[15px] w-[15px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (id) {
    case "user":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c1.2-3.2 3.8-5 7-5s5.8 1.8 7 5" />
        </svg>
      );
    case "frontend":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8.5h6M9 12h4" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12" />
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M8 10V7m0 3H5m3 0h3m-3 3v-3m0 0h6a3 3 0 0 0 2.4-4.8A3.6 3.6 0 0 1 21 8.4c.6 1.9-1 2.6-3 2.6H8m3 3v-3M5 13h3v3H5z" />
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
        </svg>
      );
    case "monitoring":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
        </svg>
      );
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
    case "registry":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M8 10h8M8 14h5" />
        </svg>
      );
    case "prometheus":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 20V10m5.3 10V4m5.4 16v-8m5.3 8V8" />
        </svg>
      );
    case "grafana":
      return (
        <svg viewBox="0 0 24 24" {...common} aria-hidden="true">
          <path d="M4 19a8 8 0 0 1 16 0" />
          <path d="M4 19h16" />
        </svg>
      );
    default:
      return null;
  }
}

function Node({
  node,
  active,
  onClick,
  pulsing,
}: {
  node: { id: string; label: string; detail: string };
  active: boolean;
  onClick: () => void;
  pulsing: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${node.label} — ${node.detail}`}
      data-cursor="explore"
      className="group flex flex-col items-center gap-2.5 px-1 text-center"
    >
      <motion.span
        animate={
          pulsing
            ? { boxShadow: active ? "0 0 22px -4px rgba(205,242,73,0.8)" : "0 0 14px -6px rgba(205,242,73,0.5)" }
            : { boxShadow: active ? "0 0 22px -4px rgba(205,242,73,0.8)" : "none" }
        }
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "relative flex h-[52px] w-[52px] items-center justify-center rounded-full border transition-colors duration-300",
          active
            ? "border-accent bg-accent/10 text-accent"
            : "border-line-strong bg-surface text-muted group-hover:border-accent/60 group-hover:text-accent",
        )}
      >
        <NodeGlyph id={node.id} />
        {active && (
          <span className="absolute inset-[-5px] rounded-full border border-accent/30" aria-hidden="true" />
        )}
      </motion.span>
      <span
        className={cn(
          "font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors duration-300",
          active ? "text-accent" : "text-faint group-hover:text-muted",
        )}
      >
        {node.label}
      </span>
    </button>
  );
}

function Connector({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4 text-line-strong", className)} fill="none" aria-hidden="true">
      <path d="M4 12h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Scroll 06 — the flagship: RideMatch. The interface, the system
 * underneath it, and the pipeline that gets it there.
 */
export function RideMatch() {
  const reduced = useReducedMotion();
  const [archActive, setArchActive] = useState<number | null>(null);
  const [pipeActive, setPipeActive] = useState(3);
  const archRef = useRef<HTMLDivElement | null>(null);

  const archDetail = archActive !== null ? rideMatchArchitecture[archActive] : null;
  const pipeDetail = rideMatchPipeline[pipeActive];

  return (
    <section className="dark-band border-b border-line bg-dark">
      <div className="wrap py-24 sm:py-32">
        {/* heading */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">06 — Flagship project</p>
            <h2 className="h-giant mt-6 text-white">
              RideMatch — an automotive
              <br />
              platform, built like a{" "}
              <em className="italic text-accent">system.</em>
            </h2>
          </div>
          <div className="max-w-[380px] lg:col-span-5 lg:justify-self-end">
            <p className="text-[13.5px] leading-[1.8] text-dark-muted">
              A production-style project where the interface meets the infrastructure —
              designed, then containerised, orchestrated, provisioned as code and monitored.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/engineering/ridematch"
                className="group inline-flex items-center gap-2 rounded-md border border-accent bg-accent/10 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent transition-colors hover:bg-accent hover:text-dark"
              >
                Read the case study
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-md border border-line-strong px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white transition-colors hover:border-accent hover:text-accent"
              >
                GitHub
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* the interface — briefly */}
        <div className="mt-16">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-dark-faint">The interface — briefly</p>
          <div className="mt-4 flex justify-center">
            <WebMock t="dark" label="RideMatch — discovery · comparison · AI recommendations" className="w-full max-w-[520px]" />
          </div>
          <p className="mt-4 text-center font-mono text-[9.5px] uppercase tracking-[0.22em] text-dark-faint">
            Then the system underneath
          </p>
          <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-transparent via-dark-muted/60 to-transparent" aria-hidden="true" />
        </div>

        {/* the architecture — one system */}
        <div ref={archRef} className="mt-10">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-dark-faint">Architecture — touch a node</p>
          <div className="mt-6 flex flex-col items-center gap-5" aria-live="polite">
            {/* top tier — the product */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {rideMatchArchitecture.slice(0, 4).map((n, i) => (
                <div key={n.id} className="flex items-center gap-2 sm:gap-3">
                  <Node node={n} active={archActive === i} onClick={() => setArchActive(archActive === i ? null : i)} pulsing={!reduced} />
                  {i < 3 && <Connector />}
                </div>
              ))}
            </div>

            {/* the drop — from product to system */}
            <div className="flex flex-col items-center gap-1.5 py-1" aria-hidden="true">
              <span className="h-5 w-px bg-gradient-to-b from-line-strong to-accent/40" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-dark-faint">runs as</span>
              <span className="h-5 w-px bg-gradient-to-b from-accent/40 to-line-strong" />
            </div>

            {/* bottom tier — the system */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {rideMatchArchitecture.slice(4).map((n, i) => (
                <div key={n.id} className="flex items-center gap-2 sm:gap-3">
                  <Node node={n} active={archActive === 4 + i} onClick={() => setArchActive(archActive === 4 + i ? null : 4 + i)} pulsing={!reduced} />
                  {i < 3 && <Connector />}
                </div>
              ))}
            </div>

            <div className="mt-2 min-h-[44px] border-t border-dark-line pt-4 text-center">
              {archDetail ? (
                <p className="text-[12.5px] leading-[1.7] text-dark-muted">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{archDetail.label}</span>
                  {" — "}
                  {archDetail.detail}
                </p>
              ) : (
                <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-dark-faint">
                  Touch a node to see what it does
                </p>
              )}
            </div>
          </div>
        </div>

        {/* the pipeline — with a travelling light */}
        <div className="mt-16">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-dark-faint">
            Delivery pipeline — from commit to dashboard
          </p>
          <div className="relative mt-6">
            <div aria-hidden="true" className="absolute left-[5%] right-[5%] top-[26px] hidden border-t border-dashed border-accent/25 md:block" />
            {/* travelling light */}
            {!reduced && (
              <motion.span
                aria-hidden="true"
                className="absolute top-[21.5px] hidden h-[9px] w-[9px] rounded-full bg-accent md:block"
                style={{ left: "5%" }}
                animate={{ left: ["5%", "95%", "5%"] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <div className="no-scrollbar overflow-x-auto pb-3">
              <div className="flex min-w-max items-start gap-2 md:min-w-0 md:justify-between md:gap-0">
                {rideMatchPipeline.map((p, i) => (
                  <div key={p.node} className="flex flex-col items-center px-2 text-center" style={{ width: `${100 / rideMatchPipeline.length}%` }}>
                    <button
                      type="button"
                      onClick={() => setPipeActive(i)}
                      aria-pressed={pipeActive === i}
                      aria-label={`${p.node} — ${p.tool}`}
                      className="group flex flex-col items-center gap-3"
                    >
                      <span
                        className={cn(
                          "relative flex h-[40px] w-[40px] items-center justify-center rounded-full border transition-colors duration-300",
                          pipeActive === i
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-dark-line bg-dark-surface text-dark-muted group-hover:border-accent/60 group-hover:text-accent",
                        )}
                      >
                        <NodeGlyph id={p.id} />
                        {pipeActive === i && (
                          <span className="absolute inset-[-4px] rounded-full border border-accent/30" aria-hidden="true" />
                        )}
                      </span>
                      <span>
                        <span
                          className={cn(
                            "block font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
                            pipeActive === i ? "text-accent" : "text-white/70",
                          )}
                        >
                          {p.node}
                        </span>
                        <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-dark-faint">
                          {p.tool}
                        </span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 min-h-[52px] border-t border-dark-line pt-5" aria-live="polite">
              <p className="text-[12.5px] font-medium text-accent">{pipeDetail.node}</p>
              <p className="mt-1 text-[12.5px] leading-[1.7] text-dark-muted">{pipeDetail.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}