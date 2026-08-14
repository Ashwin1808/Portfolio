"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { systemLayers } from "@/data/journey";

const CAM_START = 560; // camera height at the top of the page
const CAM_TRAVEL = 2360; // how far the camera descends
const FOG_RANGE = 980; // a plane is visible when the camera is within this range

const camZAt = (p: number) => CAM_START - CAM_TRAVEL * p;

/**
 * CLOUDLINE — the fixed environment behind the page. A stack of thin
 * translucent planes at different depths: HUMAN at the top, OBSERVABILITY
 * at the bottom. The camera descends through them as the visitor scrolls.
 * Cursor movement tilts the camera, very subtly.
 */
export function LayersEnvironment() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = scrollYProgress;

  // camera
  const camZ = useTransform(progress, (p) => (reduced ? 0 : camZAt(p)));
  const camX = useTransform(progress, (p) => {
    if (reduced) return "56vw";
    const vw = 56 - Math.min(12, (p / 0.55) * 12);
    return `${vw}vw`;
  });
  const fade = useTransform(progress, (p) =>
    reduced ? 0 : Math.max(0, Math.min(0.97, ((p - 0.72) / 0.24) * 0.97)),
  );

  // cursor tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 40, damping: 20 });
  const ry = useSpring(mx, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    const onVis = () => setPaused(document.hidden);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced, mx, my]);

  const stop = reduced || paused;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ perspective: 1400 }}
    >
      <motion.div
        className="absolute left-0 top-0 h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          z: camZ,
          x: camX,
          rotateY: reduced ? 0 : ry,
          rotateX: reduced ? 0 : rx,
          scale: 1.06,
        }}
      >
        {systemLayers.map((layer, i) => (
          <LayerPlane
            key={layer.name}
            label={layer.name}
            tint={layer.tint}
            index={i}
            stop={stop}
            progress={progress}
            reduced={reduced === true}
          />
        ))}
      </motion.div>

      {/* cloud fog at the bottom of the stack */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{ background: "linear-gradient(to top, rgba(13,13,12,0.95) 8%, rgba(13,13,12,0.5) 45%, transparent 100%)" }}
      />
      {/* gentle top haze */}
      <div
        className="absolute inset-x-0 top-0 h-[20vh]"
        style={{ background: "linear-gradient(to bottom, rgba(13,13,12,0.7) 0%, transparent 100%)" }}
      />
      {/* the system fades at the end */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(13,13,12,1)", opacity: fade }}
      />
    </div>
  );
}

/**
 * One thin translucent plane in the stack — hairline edges, a faint
 * gradient fill, a tiny data signal and its annotation label.
 */
function LayerPlane({
  label,
  tint,
  index,
  stop,
  progress,
  reduced,
}: {
  label: string;
  tint: string;
  index: number;
  stop: boolean;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const dotRef = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.animationPlayState = stop ? "paused" : "running";
    }
  }, [stop]);

  const depth = systemLayers[index].depth;
  const opacity = useTransform(progress, (p) => {
    if (reduced) return 0.9;
    const dist = Math.abs(depth - camZAt(p));
    return Math.max(0, 1 - dist / FOG_RANGE) * 0.9;
  });
  const driftY = useTransform(progress, (p) => (reduced ? 0 : p * (depth / 40)));

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        z: depth * 0.9,
        opacity,
        y: driftY,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="h-[44vh] w-[78vw] max-w-[1000px] sm:w-[56vw]">
      {/* the plane itself */}
      <div
        className="absolute inset-0 rounded-[3px]"
        style={{
          border: "1px solid rgba(236,231,219,0.1)",
          background: "linear-gradient(to bottom, rgba(236,231,219,0.028) 0%, rgba(236,231,219,0.012) 60%, transparent 100%)",
        }}
      />
      {/* top edge light */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.07]" />

      {/* annotation */}
      <div className="absolute left-5 top-5 flex items-center gap-2.5 sm:left-7 sm:top-7">
        <span className={`h-1 w-1 rounded-full bg-current ${tint}`} />
        <span className={`font-mono text-[8.5px] uppercase tracking-[0.28em] sm:text-[9px] ${tint}`}>
          {label}
        </span>
      </div>

      {/* coordinate annotation */}
      <div className="absolute bottom-5 right-5 font-mono text-[8.5px] tracking-[0.2em] text-ink/25 sm:bottom-7 sm:right-7">
        L{String(index).padStart(2, "0")} · 0{index + 1}/0{systemLayers.length}
      </div>

      {/* data line with travelling signal */}
      <div className="absolute inset-x-8 bottom-[26%] h-px bg-white/[0.08]">
        <span
          ref={dotRef}
          className="absolute -top-[2px] h-[3px] w-[3px] rounded-full bg-white/40"
          style={{
            left: "2%",
            animation: "signal-travel 7s linear infinite",
            animationDelay: `${index * 0.7}s`,
            animationPlayState: stop ? "paused" : "running",
          }}
        />
      </div>

      {/* faint nodes */}
      <span className="absolute right-[18%] top-[20%] h-1 w-1 rounded-full bg-white/25" />
      <span className="absolute right-[30%] top-[62%] h-1 w-1 rounded-full bg-white/15" />
      <span className="absolute left-[24%] top-[72%] h-1 w-1 rounded-full bg-white/20" />
      </div>
    </motion.div>
  );
}