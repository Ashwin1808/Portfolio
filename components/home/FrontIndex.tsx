"use client";

import { useState } from "react";
import { uxTimeline } from "@/data/journey";
import { cn } from "@/lib/utils";

/**
 * 02 — What I've done. A living index on the front of the sheet:
 * eight domains as one typographic list. Hovering a row brings it
 * forward — the detail slides in, the mark turns vermilion.
 * The list itself is the navigation: it reads in ten seconds.
 */
export function FrontIndex() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="work" className="grain relative overflow-hidden bg-cream text-carbon">
      <div className="wrap relative py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lacquer">
              What I&apos;ve done
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.015em]">
              The front of my work.
            </h2>
          </div>
          <p className="max-w-[380px] text-[14px] leading-[1.8] text-carbon-soft lg:col-span-5 lg:justify-self-end">
            Enterprise product design — conversational, financial and operational
            experiences for real businesses. Eight domains, one practice.
          </p>
        </div>

        {/* the index — one typographic list, not cards */}
        <div className="mt-16 border-t-2 border-carbon">
          {uxTimeline.map((item, i) => {
            const isActive = active === i;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((cur) => (cur === i ? null : cur))}
                className={cn("group relative border-b border-carbon/15 transition-colors duration-300", isActive && "bg-lacquer/[0.05]")}
              >
                <div className="flex items-baseline gap-5 py-6 sm:gap-10 sm:py-8">
                  <span
                    className={cn(
                      "w-8 shrink-0 font-mono text-[10.5px] tracking-[0.2em] transition-colors duration-300",
                      isActive ? "text-lacquer" : "text-carbon/35",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3
                    className={cn(
                      "flex-1 font-serif text-[clamp(1.7rem,4.6vw,3.2rem)] leading-[1.05] tracking-[-0.01em] transition-all duration-300",
                      isActive ? "translate-x-2 text-lacquer" : "text-carbon",
                    )}
                  >
                    {item.name}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "ml-3 inline-block h-[0.55em] w-[0.55em] rounded-full align-baseline bg-lacquer transition-transform duration-300",
                        isActive ? "scale-100" : "scale-0",
                      )}
                    />
                  </h3>

                  {/* the detail — slides out from the right of the row */}
                  <div
                    className={cn(
                      "hidden w-[280px] shrink-0 items-center justify-end gap-6 transition-all duration-500 sm:flex",
                      isActive ? "opacity-100" : "translate-x-4 opacity-0",
                    )}
                  >
                    <span className="text-right font-mono text-[9.5px] uppercase tracking-[0.18em] text-carbon/55">
                      {item.sub}
                    </span>
                    <span className="h-px w-8 shrink-0 bg-lacquer/60" aria-hidden="true" />
                  </div>
                </div>

                {/* mobile: the detail lives under the row */}
                {item.sub !== item.line && (
                  <div
                    className={cn(
                      "overflow-hidden pl-[52px] transition-all duration-500 sm:hidden",
                      isActive ? "max-h-24 pb-5" : "max-h-0",
                    )}
                  >
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-carbon/55">
                      {item.sub}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-[560px] text-[13px] leading-[1.8] text-carbon/50">
          The front of the sheet — what users actually see. The back of this
          same sheet is what keeps it running. Keep scrolling to turn it over.
        </p>
      </div>
    </section>
  );
}