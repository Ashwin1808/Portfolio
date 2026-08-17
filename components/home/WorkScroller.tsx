"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { uxTimeline } from "@/data/journey";
import { cn } from "@/lib/utils";

const GLYPHS = ["◍", "◉", "◭", "◆", "▣", "✦", "◒", "◐"];

/**
 * 02 — WHAT I'VE DESIGNED. The work as one long horizontal line:
 * eight domains, editorial and kinetic. Scroll and the page glides
 * sideways; the domain in front of you grows large and bright, the
 * rest fall quiet behind it.
 */
export function WorkScroller() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [travel, setTravel] = useState(0);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (v) => -v * travel);

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setTravel(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(uxTimeline.length - 1, Math.max(0, Math.floor(v * uxTimeline.length)));
    if (i !== active) setActive(i);
  });

  const total = uxTimeline.length;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="grain relative h-[400vh] text-cream"
      style={{ background: "rgba(10,8,6,0.35)" }}
    >
      <div className="sticky top-0 z-20 flex h-screen flex-col overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24"
          style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.55) 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
          style={{ background: "linear-gradient(to top, rgba(10,8,6,0.7) 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        <motion.div
          ref={trackRef}
          style={{ x: reduced ? 0 : x }}
          className="flex h-full w-max items-center will-change-transform"
        >
          {/* the title — the line the work hangs from */}
          <div className="relative flex h-full w-[86vw] shrink-0 flex-col justify-center px-6 sm:w-[58vw] sm:px-12 lg:w-[38vw]">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-lacquer">
              What I&apos;ve designed
            </p>
            <h2 className="mt-6 font-serif text-[clamp(2.6rem,6vw,4.8rem)] leading-[0.98] tracking-[-0.02em]">
              Eight domains,
              <br />
              <em className="italic text-cream/80">one line.</em>
            </h2>
            <p className="mt-8 max-w-[400px] leading-[1.85] text-cream/50">
              I&apos;ve spent the last few years designing complex digital
              experiences across banking, fintech, insurance, conversational
              UX, enterprise products and AI. Keep scrolling — the work
              slides sideways.
            </p>
            <div className="mt-12 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.26em] text-cream/40" aria-hidden="true">
              <span className="text-lacquer">↓</span>
              scroll — the line moves
            </div>
          </div>

          {/* the eight domains */}
          {uxTimeline.map((item, i) => {
            const lit = i === active;
            return (
              <div
                key={item.id}
                className="relative flex h-full w-[84vw] shrink-0 flex-col justify-center px-6 sm:w-[52vw] sm:px-12 lg:w-[36vw]"
              >
                <motion.div
                  animate={
                    lit
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0.3, scale: 0.94, y: 10 }
                  }
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <p className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.26em]">
                    <span className={lit ? "text-lacquer" : "text-cream/40"}>
                      {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className={cn("text-[13px]", lit ? "text-accent" : "text-cream/30")}>
                      {GLYPHS[i % GLYPHS.length]}
                    </span>
                  </p>

                  <h3
                    className={cn(
                      "mt-7 font-serif leading-[0.98] tracking-[-0.02em] transition-[font-size] duration-500",
                      lit
                        ? "text-[clamp(2.8rem,6.5vw,5rem)] text-cream"
                        : "text-[clamp(2rem,4.5vw,3.2rem)] text-cream/70",
                    )}
                  >
                    {item.name}
                  </h3>

                  <p className={cn("mt-5 font-mono text-[10.5px] uppercase leading-[1.9] tracking-[0.2em] transition-colors duration-500", lit ? "text-cream/60" : "text-cream/30")}>
                    {item.sub}
                  </p>

                  <div className={cn("mt-8 flex items-baseline gap-5 overflow-hidden transition-all duration-500", lit ? "max-h-20 opacity-100" : "max-h-0 opacity-0")}>
                    <span className="h-px w-10 shrink-0 bg-lacquer/70" aria-hidden="true" />
                    <p className="text-[14px] leading-[1.8] text-cream/55">{item.line}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* the line — where the work sits, and how far along it you are */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 px-6 pb-6 sm:px-12">
          <div className="mx-auto flex h-6 max-w-[1100px] items-center gap-5">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-cream/45">
              {String(active + 1).padStart(2, "0")}
              <span className="text-cream/20"> / {String(total).padStart(2, "0")}</span>
            </span>
            <div className="relative h-px flex-1 overflow-hidden bg-cream/15" aria-hidden="true">
              <motion.div
                className="absolute inset-y-0 left-0 w-full bg-lacquer"
                style={{ scaleX: scrollYProgress, originX: 0 }}
              />
            </div>
            <span className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-cream/45">
              {uxTimeline[active].name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}