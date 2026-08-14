"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const telemetry = [
  { label: "SYSTEM ONLINE", tint: "text-accent", x: "-8%", y: "12%" },
  { label: "UX SYSTEMS", tint: "text-violet", x: "4%", y: "86%" },
  { label: "KUBERNETES", tint: "text-ink/50", x: "72%", y: "6%" },
  { label: "AWS", tint: "text-cyan", x: "88%", y: "34%" },
  { label: "TERRAFORM", tint: "text-ink/40", x: "78%", y: "68%" },
  { label: "DOCKER", tint: "text-ink/50", x: "12%", y: "42%" },
  { label: "CI / CD", tint: "text-ink/40", x: "42%", y: "4%" },
];

const nodes = [
  { name: "UX", angle: 18, dist: 0.62, tint: "text-violet" },
  { name: "CODE", angle: 108, dist: 0.78, tint: "text-ink/70" },
  { name: "CONTAINER", angle: 198, dist: 0.62, tint: "text-ink/70" },
  { name: "CLOUD", angle: 288, dist: 0.78, tint: "text-cyan" },
];

function deg(angle: number, dist: number, r: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: 50 + Math.cos(rad) * dist * r, y: 50 + Math.sin(rad) * dist * r };
}

/**
 * The orbital system — Ashwin's universe abstracted: rings, nodes,
 * data particles, faint grid. Slow rotation + cursor-reactive tilt.
 */
function OrbitVisual() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 60, damping: 18 });
  const ry = useSpring(mx, { stiffness: 60, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - el.left) / el.width - 0.5) * -12);
    my.set(((e.clientY - el.top) / el.height - 0.5) * 8);
  };

  return (
    <div
      className="relative aspect-square w-full max-w-[560px] cursor-pointer select-none"
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      style={{ perspective: 900 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformStyle: "preserve-3d" }}
      >
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* faint grid */}
          <g stroke="rgba(236,231,219,0.04)">
            <line x1="200" y1="20" x2="200" y2="380" />
            <line x1="20" y1="200" x2="380" y2="200" />
            <circle cx="200" cy="200" r="120" fill="none" strokeDasharray="2 6" />
          </g>

          {/* orbital rings */}
          {[0.5, 0.68, 0.86].map((r, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="200"
              rx={200 * r}
              ry={200 * r * 0.42}
              fill="none"
              stroke="rgba(236,231,219,0.14)"
              strokeWidth="0.8"
              transform={`rotate(${i * 22} 200 200)`}
            />
          ))}

          {/* ring hairlines to nodes */}
          {nodes.map((n) => {
            const p = deg(n.angle, n.dist, 172);
            return (
              <line
                key={n.name}
                x1="200"
                y1="200"
                x2={p.x * 4}
                y2={p.y * 4}
                stroke="rgba(205,242,73,0.25)"
                strokeDasharray="2 4"
              />
            );
          })}
        </svg>

        {/* center core */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-accent/40 bg-accent/[0.05] sm:h-32 sm:w-32">
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: "0 0 80px -20px rgba(205,242,73,0.45)" }} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-accent">Ash</span>
          </div>
          {/* orbiting particle */}
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(205,242,73,0.9)]"
            animate={reduced ? {} : { rotate: 360, x: 96, y: 84 }}
            style={{ rotate: 0 }}
            transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* nodes */}
        {nodes.map((n) => {
          const p = deg(n.angle, n.dist, 172);
          return (
            <div
              key={n.name}
              className={`absolute font-mono text-[8.5px] uppercase tracking-[0.22em] ${n.tint}`}
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <span className="mb-1 block h-1 w-1 rounded-full bg-current opacity-70" />
              {n.name}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export function HeroOrbit() {
  const reduced = useReducedMotion();
  return (
    <section id="orbit" className="relative overflow-hidden border-b border-line">
      <div className="wrap relative min-h-[calc(100svh-4rem)]">
        {/* telemetry around the scene */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
          {telemetry.map((t) => (
            <span
              key={t.label}
              className={`absolute font-mono text-[8.5px] uppercase tracking-[0.24em] ${t.tint}`}
              style={{ left: t.x, top: t.y }}
            >
              {t.label}
            </span>
          ))}
        </div>

        <div className="grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-0">
          {/* wordmark */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 }}
          >
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Product Designer → Cloud / DevOps Engineer
            </p>
            <h1 className="mt-8 font-serif text-[clamp(4.5rem,13vw,9.5rem)] leading-[0.9] tracking-[-0.02em] text-ink">
              ASHWIN
            </h1>
            <p className="mt-10 max-w-[420px] text-[15px] leading-[1.9] text-ink/70">
              I design experiences.
              <br />
              I build systems.
              <br />
              <span className="text-ink">I make technology feel human.</span>
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <a
                href="#missions"
                data-cursor="explore"
                className="group inline-flex items-center gap-3 border-2 border-accent bg-accent px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-paper transition-colors hover:bg-paper hover:text-accent"
              >
                Enter orbit
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#log"
                className="group inline-flex items-center gap-3 border-2 border-ink/25 px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:border-accent hover:text-accent"
              >
                View mission log
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </motion.div>

          {/* the orbital system */}
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.3 }}
            className="mx-auto w-full max-w-[560px] lg:justify-self-end"
          >
            <OrbitVisual />
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 left-0 right-0 hidden justify-center sm:flex"
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-faint">
            Scroll — you are travelling
          </span>
        </motion.div>
      </div>
    </section>
  );
}