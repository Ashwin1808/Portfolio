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

const TRAVEL = 12; // world units the camera moves across the page

/**
 * A continuous architectural environment, not a starfield.
 * Thin-line structures — UI fragments, containers, rings, topology
 * fragments, cloud arcs, metric traces — float at different depths.
 * Scrolling moves the camera forward through them; objects approach,
 * grow, pass the viewer and loop back. Warm palette only.
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

    const pick = (kinds: Kind[], s: [number, number], label?: string) => {
      const r = Math.random();
      const tint: Tint = r > 0.86 ? "lavender" : r > 0.72 ? "lime" : r > 0.62 ? "orange" : "ivory";
      return {
        kind: kinds[Math.floor(Math.random() * kinds.length)],
        x: 0.04 + Math.random() * 0.92,
        y: 0.08 + Math.random() * 0.84,
        z: Math.random() * TRAVEL,
        s: s[0] + Math.random() * (s[1] - s[0]),
        drift: Math.random() * Math.PI * 2,
        tint,
        label,
        pts: undefined as [number, number][] | undefined,
      };
    };

    const seed = () => {
      objects = [];
      for (let i = 0; i < 9; i++) objects.push(pick(["panel"], [90, 190], "ui fragment"));
      for (let i = 0; i < 7; i++) objects.push(pick(["box"], [44, 84], "container"));
      for (let i = 0; i < 5; i++) objects.push(pick(["ring"], [60, 120]));
      for (let i = 0; i < 7; i++) objects.push(pick(["net"], [70, 130], "topology"));
      for (let i = 0; i < 4; i++) objects.push(pick(["arc"], [110, 200], "region"));
      for (let i = 0; i < 5; i++) objects.push(pick(["spark"], [70, 110], "metric"));

      const labels = [
        "login", "journey", "onboarding", "payments", "renewal",
        "pod", "worker", "etcd", "ingress", "registry",
        "peer 01", "api · db", "cache", "queue",
        "vpc", "region a", "az-2", "slo", "p99", "traces",
        "deploy", "release", "scaling",
      ];
      let li = 0;
      for (const o of objects) {
        if (li < labels.length) {
          o.label = labels[li];
          li++;
        } else {
          o.label = labels[Math.floor(Math.random() * labels.length)];
        }
      }

      // sparks need points; nets need points
      for (const o of objects) {
        if (o.kind === "spark") {
          const n = 5 + Math.floor(Math.random() * 4);
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

      if (mobile) objects = objects.slice(0, Math.floor(objects.length * 0.55));
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

    const drawObj = (o: Obj, t: number) => {
      // travelling camera — objects approach and pass the viewer
      const camZ = mobile ? scrollProgress() * TRAVEL * 0.7 : scrollProgress() * TRAVEL;
      const rel = ((o.z - camZ) % TRAVEL + TRAVEL) % TRAVEL;
      const k = 1 - rel / TRAVEL;
      if (k <= 0.03 || k >= 0.995) return;
      const k2 = k * k;
      const scale = 0.3 + k2 * 1.15;
      const alpha = 0.04 + k * 0.5;
      const cx = ((o.x + (1 - k) * 0.05) * w + Math.sin(t * 0.00025 + o.drift) * 4);
      const cy = o.y * h - (1 - k) * h * 0.02;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.lineWidth = 1;

      const s = o.s * Math.min(1.4, w / 1100 + 0.55);

      if (o.kind === "panel") {
        stroke(o.tint, 0.75, 1);
        const pw = s * 1.25;
        const ph = s * 0.62;
        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, 5);
        ctx.stroke();
        fill(o.tint, 0.025);
        ctx.fill();
        const lines = 3 + Math.floor(Math.random() * 2);
        stroke(o.tint, 0.35);
        for (let i = 0; i < lines; i++) {
          const ly = -ph / 2 + 10 + i * 9;
          const lw = pw * 0.55 - i * 5;
          ctx.beginPath();
          ctx.moveTo(-pw / 2 + 9 + (i % 2) * 4, ly);
          ctx.lineTo(-pw / 2 + 9 + lw, ly);
          ctx.stroke();
        }
        stroke(o.tint, 0.28);

        ctx.beginPath();
        ctx.arc(pw / 2 - 8, -ph / 2 + 10, 2.5, 0, Math.PI * 2);
        ctx.stroke();
      } else if (o.kind === "box") {
        stroke(o.tint, 0.7, 1);
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
        stroke(o.tint, 0.4);
        ctx.beginPath();
        ctx.arc(0, 0, b * 0.14, 0, Math.PI * 2);
        ctx.stroke();
      } else if (o.kind === "ring") {
        stroke(o.tint, 0.6, 1);
        ctx.beginPath();
        ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        ctx.stroke();
        stroke(o.tint, 0.35);
        ctx.beginPath();
        ctx.arc(0, 0, s / 3.1, 0, Math.PI * 2);
        ctx.stroke();
        stroke(o.tint, 0.22);
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
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (o.kind === "arc") {
        stroke(o.tint, 0.55, 1);
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(0, 0, s * (0.32 + i * 0.16), 0.12 * Math.PI, 0.88 * Math.PI);
          ctx.stroke();
        }
        fill(o.tint, 0.8);
        ctx.beginPath();
        ctx.arc(Math.cos(0.5 * Math.PI) * s * 0.8, Math.sin(0.5 * Math.PI) * s * 0.8, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (o.kind === "spark") {
        const pts = o.pts ?? [];
        stroke(o.tint, 0.5, 1);
        ctx.beginPath();
        const bw = s * 1.5;
        const bh = s * 0.42;
        ctx.moveTo(-bw / 2, 0);
        ctx.lineTo(bw / 2, 0);
        ctx.stroke();
        stroke(o.tint, 0.8, 1.1);
        ctx.beginPath();
        pts.forEach(([px], i) => {
          const x = -bw / 2 + ((i + 0.5) / pts.length) * bw;
          const y = -bh * (px as number) + bh * 0.4;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
        fill(o.tint, 1);
        const last = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(-bw / 2 + ((pts.length - 0.5) / pts.length) * bw, -bh * (last[1] as number) + bh * 0.4, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (o.label && scale > 0.72) {
        stroke(o.tint, 0.55, 1);
        ctx.font = "500 8px 'JetBrains Mono', monospace";
        ctx.textBaseline = "top";
        ctx.fillText(o.label, s * 0.62 + 6, -s * 0.3);
      }

      ctx.restore();
    };

    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return window.scrollY / max;
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

      {/* warm nebula washes — no blue */}
      <div
        className="absolute -top-[25%] right-[-12%] h-[75vh] w-[55vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(179,168,230,0.13) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-30%] left-[-16%] h-[65vh] w-[50vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,138,92,0.09) 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-[35%] top-[42%] h-[40vh] w-[34vw] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(205,242,73,0.04) 0%, transparent 70%)" }}
      />

      {/* vignette — the environment darkens at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 40%, transparent 45%, rgba(10,9,8,0.5) 100%)",
        }}
      />
    </div>
  );
}