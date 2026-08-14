"use client";

import { useEffect, useState } from "react";
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

// ── the deep-space field ────────────────────────────────────────
// Deterministic (seeded) starfield so server and client render identically.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  left: number;
  top: number;
  size: number;
  op: number;
  twinkle?: boolean;
  dur: number;
  delay: number;
}

function makeStars(count: number, seed: number, bright: number): Star[] {
  const rnd = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const twinkle = i < bright;
    return {
      left: rnd() * 100,
      top: rnd() * 100,
      size: twinkle ? 1.5 + rnd() : 1 + rnd(),
      op: twinkle ? 0.35 + rnd() * 0.4 : 0.12 + rnd() * 0.3,
      twinkle,
      dur: 4 + rnd() * 7,
      delay: rnd() * 6,
    };
  });
}

const NEAR_STARS = makeStars(150, 1337, 12);
const FAR_STARS = makeStars(70, 7331, 0);

/**
 * CLOUDLINE — the fixed environment behind the page. A stack of thin
 * translucent planes at different depths: HUMAN at the top, OBSERVABILITY
 * at the bottom. The camera descends through them as the visitor scrolls.
 * Cursor movement tilts the camera, very subtly. The whole system floats
 * in deep space: a fine starfield with parallax, drifting nebula glows
 * and a heavy fog horizon.
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

  // star parallax — far field drifts less than the near field
  const starsNearY = useTransform(progress, (p) => (reduced ? 0 : p * 90));
  const starsFarY = useTransform(progress, (p) => (reduced ? 0 : p * 32));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden${stop ? " env-paused" : ""}`}
      style={{ perspective: 1400 }}
    >
      {/* ── deep space: nebula glows ── */}
      <div className="absolute inset-0">
        <div
          className="absolute left-[55%] top-[-18%] h-[62vh] w-[62vh] rounded-full blur-[110px]"
          style={{
            background: "radial-gradient(circle, rgba(182,171,224,0.10) 0%, transparent 65%)",
            animation: "drift-a 46s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute left-[-14%] top-[46%] h-[58vh] w-[58vh] rounded-full blur-[120px]"
          style={{
            background: "radial-gradient(circle, rgba(217,164,68,0.07) 0%, transparent 65%)",
            animation: "drift-b 58s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute left-[30%] top-[78%] h-[50vh] w-[50vh] rounded-full blur-[130px]"
          style={{
            background: "radial-gradient(circle, rgba(205,242,73,0.05) 0%, transparent 65%)",
            animation: "drift-a 64s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* ── deep space: the starfield ── */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: starsFarY,
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
        }}
      >
        {FAR_STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.op,
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{
          y: starsNearY,
          x: reduced ? 0 : mx,
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.55) 62%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.55) 62%, transparent 100%)",
        }}
      >
        {NEAR_STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.op,
              boxShadow: s.twinkle ? "0 0 4px rgba(255,255,255,0.7)" : undefined,
              animation: s.twinkle ? `star-twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` : undefined,
            }}
          />
        ))}
      </motion.div>

      {/* ── the layered system, descending ── */}
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
            progress={progress}
            reduced={reduced === true}
          />
        ))}
      </motion.div>

      {/* the fog horizon — the deep-space fog line where the system fades */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,12,0.97) 6%, rgba(13,13,12,0.55) 42%, rgba(13,13,12,0.08) 75%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[18vh]"
        style={{ background: "linear-gradient(to bottom, rgba(13,13,12,0.75) 0%, transparent 100%)" }}
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
  progress,
  reduced,
}: {
  label: string;
  tint: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
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
          className="absolute -top-[2px] h-[3px] w-[3px] rounded-full bg-white/40"
          style={{
            left: "2%",
            animation: "signal-travel 7s linear infinite",
            animationDelay: `${index * 0.7}s`,
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