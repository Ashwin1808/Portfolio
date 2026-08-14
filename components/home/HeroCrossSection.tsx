"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { systemLayers } from "@/data/journey";

/**
 * The hero cross-section — a tall stack of translucent sheets, sliced
 * through the system: HUMAN at the top, OBSERVABILITY at the bottom.
 * One thin spine runs down the right edge; a data packet travels it.
 * The cursor tilts the whole object, very subtly, like looking into
 * a physical system.
 */
export function HeroCrossSection() {
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 50, damping: 18 });
  const ry = useSpring(mx, { stiffness: 50, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - el.left) / el.width - 0.5) * 14);
    my.set(((e.clientY - el.top) / el.height - 0.5) * 10);
  };

  return (
    <div
      className="relative mx-auto hidden h-[600px] w-full max-w-[560px] select-none lg:block"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ perspective: 1400 }}
      aria-hidden="true"
    >
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 34, scale: 0.96, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          rotateX: reduced ? 0 : rx,
          rotateY: reduced ? 0 : ry,
          transform: "translateZ(0)",
        }}
      >
        {/* caption */}
        <div className="absolute left-[18%] top-0 flex items-center gap-3">
          <span className="h-px w-6 bg-ink/25" aria-hidden="true" />
          <span className="font-mono text-[8.5px] uppercase tracking-[0.3em] text-ink/30">
            System cross-section
          </span>
        </div>

        {/* the sheets */}
        {systemLayers.map((layer, i) => (
          <div
            key={layer.name}
            className="absolute left-[18%] right-[6%] h-[46px]"
            style={{ top: 64 + i * 62 }}
          >
            {/* sheet */}
            <div
              className="absolute inset-0 rounded-[2px]"
              style={{
                border: "1px solid rgba(236,231,219,0.12)",
                background: `linear-gradient(to bottom, rgba(236,231,219,${0.035 + (i / systemLayers.length) * 0.03}) 0%, rgba(236,231,219,0.008) 100%)`,
              }}
            />
            <div className="absolute inset-x-0 top-0 h-px bg-white/[0.08]" />

            {/* annotation */}
            <div className="absolute -left-0 top-1/2 flex -translate-x-[calc(100%+14px)] -translate-y-1/2 items-center gap-2">
              <span className={`h-1 w-1 rounded-full bg-current ${layer.tint}`} />
              <span className={`whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.26em] ${layer.tint}`}>
                {layer.name}
              </span>
            </div>

            {/* right node + depth code */}
            <span className="absolute right-[4%] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full border border-ink/25 bg-transparent" />
            <span className="absolute right-[10%] top-1/2 -translate-y-1/2 font-mono text-[7.5px] tracking-[0.14em] text-ink/20">
              0x{String(i + 1).padStart(3, "0")}
            </span>
          </div>
        ))}

        {/* spine — the data path down the right edge */}
        <div className="absolute bottom-4 right-[4%] top-16 w-px bg-ink/15">
          {!reduced && (
            <motion.span
              className="absolute -left-[2px] h-[5px] w-[5px] rounded-full bg-accent shadow-[0_0_8px_rgba(205,242,73,0.7)]"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
            />
          )}
        </div>

        {/* particles — a handful, barely there */}
        {!reduced &&
          [
            { left: "30%", top: "34%", size: 2, dur: 9, delay: 0 },
            { left: "70%", top: "52%", size: 2, dur: 12, delay: 1.4 },
            { left: "48%", top: "72%", size: 3, dur: 10, delay: 0.7 },
            { left: "82%", top: "28%", size: 2, dur: 11, delay: 2.2 },
            { left: "58%", top: "88%", size: 2, dur: 8, delay: 0.3 },
          ].map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: [0, -26, 0], opacity: [0, 0.45, 0] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
            />
          ))}

        {/* fog under the object */}
        <div
          className="absolute bottom-0 left-[10%] right-[2%] h-[90px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(236,231,219,0.05) 0%, transparent 100%)",
            filter: "blur(6px)",
          }}
        />

        {/* base hairline */}
        <div className="absolute bottom-2 left-[14%] right-[2%] h-px bg-ink/10" />
      </motion.div>
    </div>
  );
}