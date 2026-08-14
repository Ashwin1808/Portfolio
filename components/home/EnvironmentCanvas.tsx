"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Kind = "panel" | "box" | "ring" | "net" | "arc" | "spark";

type Obj = {
  kind: Kind;
  x: number; // fraction of width
  y: number; // fraction of height
  z: number; // world depth, 0..TRAVEL
  s: number; // base size in px
  drift: number; // float phase
  tint: Tint;
  label?: string;
  pts?: [number, number][]; // nets + sparks
};

type Tint = "ivory" | "lavender" | "lime" | "orange";

const TINTS: Record<Tint, [number, number, number]> = {
  ivory: [236, 231, 219],
  lavender: [179, 168, 230],
  lime: [205, 242, 73],
  orange: [255, 138, 92],
};

const TRAVEL = 18; // world units — slower, calmer passage

/**
 * A quiet architectural backdrop. A handful of faint structures float
 * at different depths; scrolling moves the camera forward through them.
 * Deliberately sparse and low-contrast — the content is the subject,
 * the environment is the depth behind it.
 */
export function EnvironmentCanvas() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let objects: Obj[] = [];
    let mobile = false;

    const tintFor = () => {
      const r = Math.random();
      if (r > 0.88) return "lavender" as Tint;
      if (r > 0.76) return "lime" as Tint;
      if (r > 0.68) return "orange" as Tint;
      return "ivory" as Tint;
    };

    const seed = () => {
      objects = [];
      const make = (kinds: Kind[], s: [number, number]) => ({
        kind: kinds[Math.floor(Math.random() * kinds.length)],
        x: 0.04 + Math.random() * 0.92,
        y: 0.1 + Math.random() * 0.8,
        z: Math.random() * TRAVEL,
        s: s[0] + Math.random() * (s[1] - s[0]),
        drift: Math.random() * Math.PI * 2,
        tint: tintFor(),
        label: undefined as string | undefined,
        pts: undefined as [number, number][] | undefined,
      });
      for (let i = 0; i < 5; i++) objects.push(make(["panel"], [90, 150]));
      for (let i = 0; i < 4; i++) objects.push(make(["box"], [42, 68]));
      for (let i = 0; i < 3; i++) objects.push(make(["ring"], [60, 110]));
      for (let i = 0; i < 3; i++) objects.push(make(["net"], [70, 120]));
      for (let i = 0; i < 2; i++) objects.push(make(["arc"], [110, 180]));
      for (let i = 0; i < 2; i++) objects.push(make(["spark"], [70, 100]));

      const labels = [
        "registration", "journey", "onboarding", "payments",
        "pod", "etcd", "ingress", "registry",
        "peer 01", "api · db",
        "vpc", "region a",
        "slo", "p99",
      ];
      let li = 0;
      for (const o of objects) {
        if (li < labels.length) {
          o.label = labels[li];
          li++;
        }
      }

      for (const o of objects) {
        if (o.kind === "spark") {
          const n = 5 + Math.floor(Math.random() * 3);
          o.pts = Array.from({ length: n }, (_, i) => [
            (i / (n - 1)) * 1.6 - 0.3,
            0.15 + Math.random() * 0.7,
          ]);
        }
        if (o.kind === "net") {
          o.pts = Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => [
            -0.5 + Math.random(),
            -0.4 + Math.random() * 0.8,
          ]);
        }
      }

      if (mobile) objects = objects.slice(0, 8);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      mobile = w < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const stroke = (tint: Tint, alpha: number, width = 1) => {
      const [r, g, b] = TINTS[tint];
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = width;
    };
    const fill = (tint: Tint, alpha: number) => {
      const [r, g, b] = TINTS[tint];
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
    };

    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return window.scrollY / max;
    };

    const drawObj = (o: Obj, t: number) => {
      const camZ = scrollProgress() * TRAVEL;
      const rel = ((o.z - camZ) % TRAVEL + TRAVEL) % TRAVEL;
      const k = 1 - rel / TRAVEL;
      if (k <= 0.05 || k >= 0.995) return;
      const k2 = k * k;
      const scale = 0.34 + k2 * 0.7;
      const alpha = 0.028 + k * 0.26;
      const cx = (o.x + (1 - k) * 0.03) * w + Math.sin(t * 0.0002 + o.drift) * 3;
      const cy = o.y * h - (1 - k) * h * 0.015;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.globalAlpha = Math.min(0.5, alpha);
      ctx.lineWidth = 1;

      const s = o.s * Math.min(1.25, w / 1100 + 0.55);

      if (o.kind === "panel") {
        stroke(o.tint, 0.75);
        const pw = s * 1.25;
        const ph = s * 0.62;
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 5);
        ctx.stroke();
        fill(o.tint, 0.03);
        ctx.fill();
        stroke(o.tint, 0.35);
        for (let i = 0; i < 3; i++) {
          const ly = -ph / 2 + 11 + i * 9;
          const lw = pw * 0.55 - i * 5;
          ctx.beginPath();
          ctx.moveTo(-pw / 2 + 10 + (i % 2) * 4, ly);
          ctx.lineTo(-pw / 2 + 10 + lw, ly);
          ctx.stroke();
        }
        stroke(o.tint, 0.3);
        ctx.beginPath();
        ctx.arc(pw / 2 - 9, -ph / 2 + 11, 2.2, 0, Math.PI * 2);
        ctx.stroke();
      } else if (o.kind === "box") {
        stroke(o.tint, 0.7);
        const b = s;
        const off = b * 0.32;
        ctx.beginPath();
        ctx.rect(-b / 2, -b / 2, b, b);
        ctx.moveTo(b / 2, -b / 2);
        ctx.lineTo(b / 2 + off, -b / 2 - off);
        ctx.lineTo(b / 2 + off, b / 2 - off);
        ctx.lineTo(b / 2, b / 2);
        ctx.moveTo(-b / 2, b / 2);
        ctx.lineTo(-b / 2 + off, b / 2 - off);
        ctx.lineTo(b / 2 + off, b / 2 - off);
        ctx.stroke();
        stroke(o.tint, 0.35);
        ctx.beginPath();
        ctx.arc(0, 0, b * 0.14, 0, Math.PI * 2);
        ctx.stroke();
      } else if (o.kind === "ring") {
        stroke(o.tint, 0.6);
        ctx.beginPath();
        ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        ctx.stroke();
        stroke(o.tint, 0.32);
        ctx.beginPath();
        ctx.arc(0, 0, s / 3.1, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s / 2, 0);
        ctx.lineTo(s / 2, 0);
        ctx.moveTo(0, -s / 2);
        ctx.lineTo(0, s / 2);
        ctx.stroke();
      } else if (o.kind === "net") {
        const pts = (o.pts ?? []).map(([px, py]) => [px * s, py * s] as const);
        if (pts.length < 2) return;
        stroke(o.tint, 0.45, 0.8);
        for (let i = 0; i < pts.length; i++) {
          const [ax, ay] = pts[i];
          const [bx, by] = pts[(i + 1) % pts.length];
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
        fill(o.tint, 0.9);
        for (const [px, py] of pts) {
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (o.kind === "arc") {
        stroke(o.tint, 0.5);
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(0, 0, s * (0.32 + i * 0.16), 0.12 * Math.PI, 0.88 * Math.PI);
          ctx.stroke();
        }
        fill(o.tint, 0.8);
        ctx.beginPath();
        ctx.arc(Math.cos(0.5 * Math.PI) * s * 0.8, Math.sin(0.5 * Math.PI) * s * 0.8, 1.8, 0, Math.PI * 2);
        ctx.fill();
      } else if (o.kind === "spark") {
        const pts = o.pts ?? [];
        stroke(o.tint, 0.45);
        const bw = s * 1.5;
        const bh = s * 0.42;
        ctx.beginPath();
        ctx.moveTo(-bw / 2, 0);
        ctx.lineTo(bw / 2, 0);
        ctx.stroke();
        stroke(o.tint, 0.7, 1.1);
        ctx.beginPath();
        pts.forEach(([px], i) => {
          const x = -bw / 2 + ((i + 0.5) / pts.length) * bw;
          const y = -bh * (px as number) + bh * 0.4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }

      // labels appear only for the closest few structures, faint
      if (o.label && scale > 0.92) {
        stroke(o.tint, 0.5);
        ctx.font = "500 8px 'JetBrains Mono', monospace";
        ctx.textBaseline = "top";
        ctx.fillText(o.label, s * 0.62 + 6, -s * 0.3);
      }

      ctx.restore();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const sorted = [...objects].sort((a, b) => a.z - b.z);
      for (const o of sorted) drawObj(o, t);
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: "#0a0908" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* warm nebula washes — barely there */}
      <div
        className="absolute -top-[25%] right-[-12%] h-[75vh] w-[55vw] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(179,168,230,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-30%] left-[-16%] h-[65vh] w-[50vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(255,138,92,0.07) 0%, transparent 70%)" }}
      />

      {/* dark bands at top and bottom — content zones stay readable */}
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(10,9,8,0.85), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, rgba(10,9,8,0.85), transparent)" }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(10,9,8,0.5) 100%)",
        }}
      />
    </div>
  );
}