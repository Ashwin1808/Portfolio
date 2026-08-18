"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const DUST = [
  { left: "12%", delay: 0, dur: 12, size: 3 },
  { left: "42%", delay: 2.8, dur: 15, size: 2 },
  { left: "66%", delay: 1.2, dur: 10, size: 2 },
  { left: "86%", delay: 5.5, dur: 14, size: 3 },
];

/** The stack, riding the ∞ — the full devops line, one loop. */
const TOOLS = ["linux", "docker", "k8s", "terraform", "aws", "ci/cd", "prometheus", "grafana"];

/** The figure-eight in 440×220 box coordinates — used by offset-path. */
const INFINITY_PATH =
  "M 220 110 C 220 159.26 179.6 198 129.8 198 C 79.99 198 39.6 159.26 39.6 110 C 39.6 60.74 79.99 22 129.8 22 C 179.6 22 220 60.74 220 110 C 220 159.26 260.4 198 310.2 198 C 360 198 400.4 159.26 400.4 110 C 400.4 60.74 360 22 310.2 22 C 260.4 22 220 60.74 220 110 Z";

/** The same figure-eight in 800×400 — drawn by the SVG. */
const INFINITY_SVG =
  "M 400 200 C 400 289.56 326.56 360 236 360 C 145.44 360 72 289.56 72 200 C 72 110.44 145.44 40 236 40 C 326.56 40 400 110.44 400 200 C 400 289.56 473.44 360 564 360 C 654.56 360 728 289.56 728 200 C 728 110.44 654.56 40 564 40 C 473.44 40 400 110.44 400 200 Z";

/**
 * The devops ∞ — one continuous figure-eight, the stack flowing
 * around it without end. Tools stay upright, evenly spaced.
 */
function InfinityLoop() {
  const dur = 18;
  return (
    <div className="relative mx-auto h-[190px] w-[380px] max-w-full shrink-0" aria-hidden="true">
      {/* the path, drawn */}
      <svg viewBox="0 0 800 400" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
        <path d={INFINITY_SVG} stroke="rgba(205,242,73,0.08)" strokeWidth="10" style={{ filter: "blur(18px)" }} />
        <path d={INFINITY_SVG} stroke="rgba(236,230,218,0.25)" strokeWidth="2.5" />
        <path d={INFINITY_SVG} stroke="rgba(236,230,218,0.35)" strokeWidth="1" />
      </svg>

      {/* the pinch — the crossing of the loop */}
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(205,242,73,0.9)]" />

      {/* the tools — flowing around the loop, upright, evenly spaced */}
      {TOOLS.map((tool, i) => (
        <span
          key={tool}
          className="absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cream/30 bg-[#0d0b09]/90 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-cream/80 backdrop-blur-sm"
          style={{
            offsetPath: `path("${INFINITY_PATH}")`,
            offsetRotate: "0deg",
            offsetAnchor: "center",
            animation: `chip-flow ${dur}s linear infinite`,
            animationDelay: `${-dur * (i / TOOLS.length)}s`,
            willChange: "offset-distance",
          }}
        >
          <span
            className={`h-1 w-1 rounded-full ${
              i % 2 === 0
                ? "bg-accent shadow-[0_0_6px_rgba(205,242,73,0.8)]"
                : "bg-lacquer shadow-[0_0_6px_rgba(194,64,47,0.8)]"
            }`}
          />
          {tool}
        </span>
      ))}
    </div>
  );
}

/**
 * 01 — The opening, in space. The name behind everything, the ∞
 * carrying the stack below. The words stay the first thing you read.
 */
export function HomeHero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 50, damping: 16 });
  const ry = useSpring(mx, { stiffness: 50, damping: 16 });

  const onMove = (e: React.MouseEvent) => {
    const el = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - el.left) / el.width - 0.5) * -10);
    my.set(((e.clientY - el.top) / el.height - 0.5) * 7);
  };

  const rise = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      id="hero"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden text-cream"
      style={{ background: "rgba(10,8,6,0.55)" }}
    >
      {/* nebula glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[15%] bottom-[-30%] h-[70vh] w-[70vh] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(194,64,47,0.16) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] top-[-25%] h-[55vh] w-[55vh] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(205,242,73,0.08) 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[28%] top-[55%] h-[46vh] w-[46vh] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(182,171,224,0.09) 0%, transparent 65%)" }}
      />

      {/* a ringed planet, drifting on the right */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[6%] top-[14%] hidden lg:block">
        <motion.div
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="relative h-40 w-40"
        >
          <div className="absolute inset-0 rounded-full border border-cream/15" />
          <div
            className="absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/25"
            style={{ boxShadow: "0 0 40px rgba(236,230,218,0.08), inset 0 0 30px rgba(194,64,47,0.10)" }}
          />
          <div className="absolute inset-x-[-18%] top-1/2 h-px -translate-y-1/2 rotate-[-16deg] bg-cream/25" />
          <div className="absolute inset-x-[-18%] top-1/2 h-px -translate-y-1/2 rotate-[14deg] bg-cream/10" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lacquer shadow-[0_0_12px_rgba(194,64,47,0.9)]" />
        </motion.div>
      </div>

      {/* a shooting star, once in a while */}
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-[18%] h-px w-44 bg-gradient-to-r from-transparent via-cream/90 to-transparent"
          animate={{ x: ["-30vw", "130vw"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.9, times: [0, 0.12, 0.8, 1], repeat: Infinity, repeatDelay: 7, ease: "easeOut" }}
        />
      )}

      {/* dust in the light — vermilion motes drifting across the page */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {DUST.map((d, i) => (
            <motion.span
              key={i}
              className="absolute bottom-[-4%] rounded-full bg-lacquer/45"
              style={{
                left: d.left,
                width: d.size,
                height: d.size,
                boxShadow: "0 0 12px rgba(194,64,47,0.35)",
              }}
              animate={{ y: ["0vh", "-108vh"], x: [0, i % 2 === 0 ? 26 : -26], opacity: [0, 0.8, 0] }}
              transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </div>
      )}

      {/* the name — behind everything, a background overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[6%] z-0 text-center"
        style={{ perspective: 900 }}
      >
        <motion.p
          className="text-stroke select-none font-serif text-[clamp(8rem,24vw,21rem)] leading-[0.85] tracking-[-0.03em] text-cream/[0.09]"
          style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformStyle: "preserve-3d" }}
        >
          ASHWIN
        </motion.p>
      </div>

      {/* centered manifesto — the words in front of the name */}
      <div className="wrap relative z-10 w-full pb-16 pt-32 sm:pt-36">
        <motion.div
          style={{ y: reduced ? 0 : contentY }}
          className="mx-auto flex max-w-[860px] flex-col items-center text-center"
        >
          <motion.div
            initial={reduced ? "show" : "hidden"}
            animate="show"
            transition={{ staggerChildren: 0.06, delayChildren: 0.02 }}
          >
            <motion.p
              variants={rise}
              transition={{ duration: 0.5, ease }}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.26em]"
            >
              <span className="text-lacquer">UX/UI Designer</span>
              <span aria-hidden="true" className="text-cream/40">→</span>
              <span className="text-cream/70">DevOps / Cloud Engineer</span>
            </motion.p>

            <motion.h1
              variants={rise}
              transition={{ duration: 0.65, ease }}
              className="mt-8 font-serif text-[clamp(2.6rem,6.5vw,5.25rem)] leading-[0.95] tracking-[-0.02em]"
              style={{ textShadow: "0 0 90px rgba(205,242,73,0.12), 0 0 90px rgba(194,64,47,0.10)" }}
            >
              Designing experiences.
              <br />
              <em className="text-shimmer bg-gradient-to-r from-lacquer via-cyan to-accent bg-clip-text italic text-transparent">
                Building systems.
              </em>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.55, ease }}
              className="mx-auto mt-9 max-w-[600px] text-[15px] leading-[1.9] text-cream/60"
            >
              {site.designSupport} Now extending that systems-thinking mindset
              into software, cloud and DevOps.
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.55, ease }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#work"
                data-cursor="explore"
                className="group inline-flex items-center gap-3 border-2 border-lacquer bg-lacquer px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#16110c] transition-colors duration-300 hover:bg-transparent hover:text-lacquer"
              >
                View work
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/resume"
                data-cursor="link"
                className="group inline-flex items-center gap-3 border-2 border-cream/25 px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-cream"
              >
                Resume
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </a>
            </motion.div>

            {/* the devops ∞ — one loop, the stack keeps moving */}
            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease }}
              className="mt-12"
              aria-hidden="true"
            >
              <div className="flex origin-center scale-[0.78] items-center justify-center sm:scale-[0.9] lg:scale-100">
                {reduced ? null : <InfinityLoop />}
              </div>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-cream/10" />
                <span className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-cream/40">
                  Development
                </span>
                <span aria-hidden="true" className="font-mono text-[10px] text-cream/60">→</span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-cream/40">
                  Operations
                </span>
                <span aria-hidden="true" className="font-serif text-[14px] italic text-accent">∞</span>
                <span className="h-px w-10 bg-cream/10" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}