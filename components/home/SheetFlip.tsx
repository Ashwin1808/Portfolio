"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * 03 — THE FLIP. The signature interaction. The sheet turns over in
 * front of you: the crease sweeps down the screen, and the word
 * INTERFACES shows its mirrored backside — ECAFRETNI — the back of
 * the printed word — before the whole sheet resolves onto its back:
 * INFRASTRUCTURE.
 */
export function SheetFlip() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // the back sheet unrolls from the top edge, down across the screen
  const reveal = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
  );
  const creaseY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // reduced motion: a plain cross-fade instead of the cloth fold
  const backFade = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const frontFade = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);

  // the word across the fold
  const frontWord = useTransform(scrollYProgress, [0, 0.6], [1, 0.28]);
  const mirrorShown = useTransform(scrollYProgress, [0.1, 0.5, 0.85], [0, 1, 1]);

  // resolution — the sheet has fully turned
  const resolvedOpacity = useTransform(scrollYProgress, [0.88, 0.97], [0, 1]);
  const resolvedY = useTransform(scrollYProgress, [0.88, 0.97], [30, 0]);

  return (
    <section ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── the front of the sheet ── */}
        <div className="grain absolute inset-0 bg-cream text-carbon">
          <div className="absolute left-8 top-24 font-mono text-[9px] uppercase tracking-[0.3em] text-carbon/45 sm:left-12">
            The front — what people touch
          </div>
          <div className="absolute bottom-24 right-8 font-mono text-[9px] uppercase tracking-[0.3em] text-carbon/45 sm:right-12">
            Interface
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h2
              style={
                reduced
                  ? { opacity: frontFade }
                  : { opacity: frontWord }
              }
              className="px-6 text-center font-serif text-[clamp(3rem,10vw,9rem)] leading-none tracking-[-0.02em]"
            >
              Interfaces
              <em className="mt-2 block text-[0.5em] italic text-lacquer">what people touch</em>
            </motion.h2>
          </div>
        </div>

        {/* ── the back of the sheet, unrolling over the front ── */}
        <motion.div
          className="sheet-grid absolute inset-0 bg-sheet text-cream"
          style={
            reduced
              ? { opacity: backFade }
              : { clipPath: reveal, WebkitClipPath: reveal }
          }
        >
          <div className="absolute left-8 top-24 font-mono text-[9px] uppercase tracking-[0.3em] text-cream/45 sm:left-12">
            The back — what runs underneath
          </div>
          <div className="absolute bottom-24 right-8 font-mono text-[9px] uppercase tracking-[0.3em] text-accent sm:right-12">
            Infrastructure
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {/* the word seen through the paper — mirrored */}
            <motion.h2
              style={
                reduced
                  ? { opacity: 0 }
                  : { opacity: mirrorShown, transform: "scaleX(-1)", filter: "blur(0.5px)" }
              }
              className="px-6 text-center font-serif text-[clamp(3rem,10vw,9rem)] leading-none tracking-[-0.02em] select-none text-cream/70"
              aria-hidden="true"
            >
              Interfaces
            </motion.h2>

            {/* the resolved statement — the sheet has fully turned */}
            <motion.div
              style={
                reduced
                  ? { opacity: backFade }
                  : { opacity: resolvedOpacity, y: resolvedY }
              }
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.3em] text-accent">
                From interface — to infrastructure.
              </p>
              <h2 className="font-serif text-[clamp(2.6rem,8vw,6.4rem)] leading-[1.01] tracking-[-0.02em] text-cream">
                From
                <br />
                interfaces
                <br />
                <em className="italic text-accent">to infrastructure.</em>
              </h2>
              <p className="mt-8 max-w-[420px] text-[14px] leading-[1.8] text-cream/50">
                The same systems-thinking mindset, now from the other side.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* the crease — the edge of the fold sweeping down */}
        {!reduced && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 z-10"
            style={{ top: creaseY }}
          >
            <div className="h-px w-full bg-carbon/60 shadow-[0_0_24px_rgba(236,230,218,0.5)]" />
          </motion.div>
        )}
      </div>
    </section>
  );
}