"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

const DUST = [
  { left: "18%", delay: 0, dur: 11, size: 3 },
  { left: "47%", delay: 3.2, dur: 14, size: 2 },
  { left: "74%", delay: 1.4, dur: 9, size: 2 },
  { left: "88%", delay: 5.5, dur: 13, size: 3 },
];

const LOOP_LEFT = ["linux", "docker", "k8s", "terraform", "ansible", "vault"];
const LOOP_RIGHT = ["aws", "ci/cd", "prometheus", "grafana", "kafka", "istio"];

/** Six even stations on the ring. */
const SPOTS: Array<{ l: string; t: string }> = [
  { l: "50%", t: "0%" },
  { l: "75%", t: "6.7%" },
  { l: "25%", t: "6.7%" },
  { l: "50%", t: "100%" },
  { l: "75%", t: "93.3%" },
  { l: "25%", t: "93.3%" },
];

/**
 * One ring of the ∞ — tools ride the orbit, staying upright; an accent orb
 * laps them on the inner path.
 */
function OrbitLoop({ labels, dur, orbDur }: { labels: string[]; dur: number; orbDur: number }) {
  return (
    <div className="relative h-[190px] w-[190px] shrink-0" aria-hidden="true">
      {/* the ring — thick, so the stack feels like cast metal */}
      <div className="absolute inset-0 rounded-full border-2 border-cream/20" />
      <div className="absolute inset-[5%] rounded-full border border-cream/10" />
      {/* inner dashed path, drifting the other way */}
      <motion.div
        className="absolute inset-[14%] rounded-full border border-dashed border-cream/15"
        animate={{ rotate: -360 }}
        transition={{ duration: dur * 0.7, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="absolute inset-[16%] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(205,242,73,0.06) 0%, transparent 70%)" }}
      />
      {/* the tools — always upright */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
      >
        {labels.map((label, i) => (
          <motion.div
            key={label}
            className="absolute"
            style={{ left: SPOTS[i].l, top: SPOTS[i].t, x: "-50%", y: "-50%" }}
            animate={{ rotate: -360 }}
            transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-cream/30 bg-[#0d0b09]/90 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-cream/80 backdrop-blur-sm">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  i % 2 === 0
                    ? "bg-accent shadow-[0_0_8px_rgba(205,242,73,0.9)]"
                    : "bg-lacquer shadow-[0_0_8px_rgba(194,64,47,0.9)]"
                }`}
              />
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
      {/* the accent orb — laps the ring, flickers as it passes */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: orbDur, repeat: Infinity, ease: "linear" }}
      >
        <motion.span
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lacquer shadow-[0_0_14px_rgba(194,64,47,1)]"
          animate={{ opacity: [1, 0.55, 1] }}
          transition={{ duration: orbDur / 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

/**
 * 01 — The front of the sheet, in space. A name in the light, the DevOps
 * loop (∞) carrying the stack along the bottom edge, a ringed planet,
 * shooting star, ember dust. Nothing behind the words.
 */
export function HomeHero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const rise = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden text-cream"
      style={{ background: "rgba(12,9,7,0.78)" }}
    >
      {/* ruled paper — the front of the sheet, in dark ink */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cream/10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, rgba(236,230,218,0.04) 0 1px, transparent 1px 88px)",
        }}
      />

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
      <div aria-hidden="true" className="pointer-events-none absolute right-[7%] top-[13%] hidden lg:block">
        <motion.div
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="relative h-44 w-44"
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
          className="pointer-events-none absolute top-[16%] h-px w-44 bg-gradient-to-r from-transparent via-cream/90 to-transparent"
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

      {/* centered manifesto — clean, nothing behind the words */}
      <div className="wrap relative w-full pb-16 pt-28 sm:pt-36">
        <motion.div style={{ y: reduced ? 0 : contentY }} className="mx-auto flex max-w-[900px] flex-col items-center text-center">
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
              className="mt-8 font-serif text-[clamp(3.6rem,11vw,9.25rem)] leading-[0.9] tracking-[-0.02em]"
              style={{ textShadow: "0 0 90px rgba(205,242,73,0.14), 0 0 90px rgba(194,64,47,0.12)" }}
            >
              Ashwin{" "}
              <em className="text-shimmer bg-gradient-to-r from-lacquer via-cyan to-accent bg-clip-text italic text-transparent">
                K.
              </em>
            </motion.h1>

            <motion.p
              variants={rise}
              transition={{ duration: 0.55, ease }}
              className="mt-6 font-serif text-[clamp(1.1rem,2.4vw,1.55rem)] italic tracking-[-0.01em] text-cream/75"
            >
              Designing experiences.{" "}
              <span className="text-shimmer bg-gradient-to-r from-lacquer via-cyan to-accent bg-clip-text italic text-transparent">
                Building systems.
              </span>
            </motion.p>

            <motion.div
              variants={rise}
              transition={{ duration: 0.55, ease }}
              className="mt-8 flex flex-col items-center gap-8"
            >
              <p className="max-w-[476px] text-[15px] leading-[1.85] text-cream/55">
                I&apos;m a UX/UI Designer at {site.company}. I design the part
                people touch. I&apos;m learning to build what runs underneath.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#work"
                  data-cursor="explore"
                  className="group inline-flex items-center gap-3 border-2 border-lacquer bg-lacquer px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#16110c] transition-colors duration-300 hover:bg-transparent hover:text-lacquer"
                >
                  View work
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↓</span>
                </a>
                <a
                  href="/resume"
                  data-cursor="link"
                  className="group inline-flex items-center gap-3 border-2 border-cream/25 px-6 py-3 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-cream transition-colors duration-300 hover:border-cream"
                >
                  Resume
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </div>
            </motion.div>

            {/* the devops loop — the stack keeps moving, below the words */}
            <motion.div
              variants={rise}
              transition={{ duration: 0.6, ease }}
              className="mt-14"
              aria-hidden="true"
            >
              <div className="flex items-center justify-center gap-2">
                {reduced ? null : (
                  <>
                    <OrbitLoop labels={LOOP_LEFT} dur={16} orbDur={5} />
                    <OrbitLoop labels={LOOP_RIGHT} dur={21} orbDur={6.5} />
                  </>
                )}
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-cream/10" />
                <span className="font-mono text-[8.5px] uppercase tracking-[0.28em] text-cream/40">
                  The devops loop — the stack keeps moving
                </span>
                <span className="h-px w-10 bg-cream/10" />
              </div>
            </motion.div>
          </motion.div>

          {/* the sheet's edge — the route of the page */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-14 flex w-full flex-col gap-4 border-t border-cream/10 pt-5"
            aria-hidden="true"
          >
            <div className="hidden items-center gap-3 font-mono text-[8.5px] uppercase tracking-[0.26em] text-cream/40 sm:flex">
              <span>01 The front</span>
              <span className="h-px w-6 bg-cream/15" />
              <span>02 The work</span>
              <span className="h-px w-6 bg-cream/15" />
              <span className="text-lacquer">03 The flip</span>
              <span className="h-px w-6 bg-cream/15" />
              <span>04 The back</span>
              <span className="h-px w-6 bg-cream/15" />
              <span>05 The close</span>
              <span className="ml-2 h-1 w-1 rounded-full bg-lacquer" />
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-cream/40">
                One sheet
              </span>
              <span className="h-px w-24 bg-cream/10" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-cream/40">
                Two sides — scroll to turn it
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}