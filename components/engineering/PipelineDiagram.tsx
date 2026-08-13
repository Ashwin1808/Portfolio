"use client";

import { useState } from "react";
import { ridematch } from "@/data/engineering";
import { cn } from "@/lib/utils";

export function PipelineDiagram() {
  const [active, setActive] = useState<number>(2);
  const steps = ridematch.pipeline;

  return (
    <div>
      <div className="rounded-2xl border border-dark-line bg-dark-surface p-5 sm:p-6">
        <ol className="space-y-0">
          {steps.map((step, i) => {
            const selected = active === i;
            return (
              <li key={step.id} className="flex items-stretch gap-4">
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={selected}
                    aria-label={`Pipeline step: ${step.title}`}
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border font-mono text-[11px] transition-colors",
                      selected
                        ? "border-cyan bg-cyan text-[#1a1008]"
                        : "border-dark-line bg-dark-elevated text-dark-muted hover:border-cyan/40",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                  {i < steps.length - 1 && (
                    <span
                      className={cn(
                        "w-px flex-1",
                        i < active ? "bg-cyan/50" : "bg-dark-line",
                      )}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-5">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "w-full rounded-lg border px-4 py-3 text-left transition-colors",
                      selected
                        ? "border-cyan/50 bg-cyan/[0.07]"
                        : "border-transparent hover:bg-white/[0.03]",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "text-[14px] font-semibold",
                          selected ? "text-white" : "text-dark-muted",
                        )}
                      >
                        {step.title}
                      </span>
                      <span className="hidden font-mono text-[9.5px] uppercase tracking-[0.1em] text-dark-faint sm:inline">
                        {step.status}
                      </span>
                    </span>
                    {selected && (
                      <span className="mt-1.5 block text-[12.5px] leading-[1.65] text-dark-muted">
                        {step.detail}
                      </span>
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-dark-faint">
        Tap any step for what happens there
      </p>
    </div>
  );
}
