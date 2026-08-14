"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { uxTimeline } from "@/data/journey";
import { SystemIcon } from "@/components/home/SystemIcon";
import { cn } from "@/lib/utils";

const iconFor: Record<string, string> = {
  "visual-ivr": "mic",
  banking: "banking",
  insurance: "insurance",
  fintech: "currency",
  enterprise: "enterprise",
  ai: "ai",
  ccaas: "headset",
  mobile: "mobile",
};

/**
 * Part 02 — Work. An editorial horizontal timeline of experience.
 * One thin line, large numbers, the active item brightens as the
 * scroll reaches it, inactive items recede. Not a carousel.
 */
export function UXTimeline() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const first = track.querySelector<HTMLElement>("[data-step]");
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).gap || "0");
      stepRef.current = first.offsetWidth + gap;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || !stepRef.current) return;
    const idx = Math.round(track.scrollLeft / stepRef.current);
    setActive(Math.max(0, Math.min(uxTimeline.length - 1, idx)));
  }, []);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 0.9", "end 0.1"] });
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section className="overflow-hidden border-b border-line bg-surface">
      <div className="wrap pt-24 sm:pt-32">
        {/* heading — asymmetric: title far left, note low right */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="h-giant text-ink lg:col-span-7">
            What I&apos;ve
            <br />
            <em className="italic text-violet">designed.</em>
          </h2>
          <motion.p
            style={{ opacity: reduced ? 1 : introOpacity }}
            className="max-w-[360px] text-[13.5px] leading-[1.8] text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end"
          >
            Complex enterprise experiences, where users, business logic and technology meet —
            designed across services, screens and conversations.
            <span className="mt-3 hidden font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint lg:block">
              Scroll — 01 → 08
            </span>
          </motion.p>
        </div>
      </div>

      {/* the timeline */}
      <div className="relative mt-14">
        {/* one thin line, fixed; each item carries its own node */}
        <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-[40px] hidden h-px bg-line md:block" />

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-scrollbar snap-x snap-mandatory overflow-x-auto scroll-px-10"
          role="list"
          aria-label="Areas of UX experience"
        >
          <div className="flex w-max items-stretch gap-10 px-10 pt-10 sm:gap-16">
            {uxTimeline.map((item, i) => {
              const isActive = active === i;
              return (
                <article
                  key={item.id}
                  data-step
                  role="listitem"
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative w-[68vw] snap-start sm:w-[38vw] lg:w-[26vw]",
                    "flex flex-col justify-between border-t pt-6 transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-35 hover:opacity-70",
                  )}
                >
                  {/* node on the line */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -top-[4.5px] left-0 h-[9px] w-[9px] rounded-full border transition-all duration-500",
                      isActive
                        ? "border-accent bg-accent shadow-[0_0_14px_rgba(205,242,73,0.7)]"
                        : "border-line-strong bg-surface group-hover:border-accent/60",
                    )}
                  />

                  <div>
                    <div className="flex items-baseline justify-between">
                      <span
                        className={cn(
                          "font-serif text-[2.6rem] leading-none tracking-[-0.01em] sm:text-[3.2rem]",
                          isActive ? "text-ink" : "text-faint",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("transition-colors duration-300", isActive ? "text-accent" : "text-faint")}>
                        <SystemIcon id={iconFor[item.id] ?? item.id} className="h-[22px] w-[22px]" />
                      </span>
                    </div>
                    <h3
                      className={cn(
                        "mt-8 font-serif text-[1.7rem] leading-[1.06] tracking-[-0.01em] transition-colors duration-300 sm:text-[2.1rem]",
                        isActive ? "text-ink" : "text-muted",
                      )}
                    >
                      {item.name}
                    </h3>
                    <p className="mt-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-faint">
                      {item.sub}
                    </p>
                  </div>
                  <p className="mt-10 text-[12.5px] leading-[1.7] text-muted">{item.line}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* one small line beneath */}
      <div className="wrap border-t border-line py-7">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
          3+ years designing digital experiences across banking · fintech · insurance ·
          conversational UX · enterprise products · AI-assisted workflows
        </p>
      </div>
    </section>
  );
}