"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number;
  tw: number;
  color: string;
};

const COLORS = ["#ece7db", "#d6d0bf", "#b3a8e6", "#cdf249", "#ff8a5c"];

/**
 * The deep-space layer — fixed behind everything on the homepage.
 * A parallax starfield tied to scroll (you move through space),
 * slow time-drift so it breathes at rest, a rare shooting star,
 * and warm nebula washes. Palette stays warm — no blue.
 */
export function SpaceCanvas() {
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
    let stars: Star[] = [];
    const meteor = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      age: 0,
      next: 90,
    };

    const seed = () => {
      const count = Math.min(230, Math.max(90, Math.floor((w * h) / 6500)));
      stars = Array.from({ length: count }, () => {
        const depth = 0.12 + Math.pow(Math.random(), 1.4) * 0.88;
        let color = Math.random() > 0.5 ? COLORS[0] : COLORS[1];
        const roll = Math.random();
        if (roll > 0.94) color = COLORS[2];
        else if (roll > 0.89) color = COLORS[3];
        else if (roll > 0.86) color = COLORS[4];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth > 0.75 ? 0.5 + Math.random() * 1.1 : 0.3 + Math.random() * 0.7,
          depth,
          tw: Math.random() * Math.PI * 2,
          color,
        };
      });
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      const drift = reduced ? 0 : t / 1000;

      for (const s of stars) {
        const yy = (s.y + scroll * s.depth * 0.55) % h;
        const xx = (s.x + drift * s.depth * 9) % w;
        const tw = 0.55 + 0.45 * Math.sin(t * (0.0011 + s.depth * 0.002) + s.tw);
        ctx.globalAlpha = Math.max(0.15, tw) * (0.45 + s.depth * 0.55);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(xx, yy, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.depth > 0.82) {
          ctx.globalAlpha *= 0.22;
          ctx.beginPath();
          ctx.arc(xx, yy, s.r * 3.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!reduced) {
        if (meteor.next > 0) {
          meteor.next -= 1;
        } else if (meteor.age < meteor.life) {
          const grad = ctx.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x - meteor.vx * 7,
            meteor.y - meteor.vy * 7,
          );
          grad.addColorStop(0, "rgba(236,231,219,0.95)");
          grad.addColorStop(1, "rgba(236,231,219,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - meteor.vx * 7, meteor.y - meteor.vy * 7);
          ctx.stroke();
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.age += 1;
          if (meteor.age >= meteor.life) meteor.next = 420 + Math.random() * 480;
        } else {
          const fromX = w * 0.12 + Math.random() * w * 0.72;
          const fromY = h * 0.04 + Math.random() * h * 0.28;
          const angle = Math.PI * (0.98 + Math.random() * 0.2);
          const speed = 4.5 + Math.random() * 3;
          meteor.x = fromX;
          meteor.y = fromY;
          meteor.vx = Math.cos(angle) * speed;
          meteor.vy = Math.sin(angle) * speed;
          meteor.age = 0;
          meteor.life = 55 + Math.random() * 35;
        }
      }

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
        style={{ background: "radial-gradient(circle, rgba(179,168,230,0.16) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-30%] left-[-16%] h-[65vh] w-[50vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,138,92,0.11) 0%, transparent 70%)" }}
      />
      <div
        className="absolute left-[35%] top-[42%] h-[40vh] w-[34vw] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(205,242,73,0.05) 0%, transparent 70%)" }}
      />

      {/* vignette — space darkens at the edges */}
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