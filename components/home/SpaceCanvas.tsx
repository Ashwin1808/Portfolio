"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number; // 0.15 (far) .. 1 (near)
  tw: number;
  color: string;
};

const COLORS = ["#ece7db", "#d6d0bf"];

const PLANETS = [
  { x: 0.78, y: 0.18, r: 180, ringA: 1.5, tilt: -0.35, tint: [179, 168, 230] as const, alpha: 0.16 },
  { x: 0.16, y: 0.72, r: 120, ringA: 1.6, tilt: 0.4, tint: [255, 138, 92] as const, alpha: 0.11 },
];

/**
 * The space layer. Pure cosmos — nothing technical in the background.
 * Tiny twinkling stars on four depth layers stream past as you scroll
 * (near ones faster — that's the travel feel), two faint ringed
 * planets drift by, a rare shooting star crosses. Content sits in a
 * readable corridor: a soft scrim keeps the left column dark.
 */
export function SpaceCanvas() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nebulaRef = useRef<HTMLDivElement | null>(null);
  const nebulaRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let mobile = false;
    const meteor = { x: 0, y: 0, vx: 0, vy: 0, life: 0, age: 0, next: 140 };
    let scroll = 0;

    const seed = () => {
      const count = mobile ? 110 : Math.min(210, Math.max(140, Math.floor((w * h) / 7000)));
      stars = Array.from({ length: count }, () => {
        const depth = 0.15 + Math.pow(Math.random(), 1.5) * 0.85;
        const roll = Math.random();
        let color = roll > 0.5 ? COLORS[0] : COLORS[1];
        if (roll > 0.96) color = "#b3a8e6";
        else if (roll > 0.93) color = "#cdf249";
        else if (roll > 0.91) color = "#ff8a5c";
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth > 0.75 ? 0.5 + Math.random() * 0.7 : 0.3 + Math.random() * 0.45,
          depth,
          tw: Math.random() * Math.PI * 2,
          color,
        };
      });
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

    const readScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? window.scrollY / max : 0;
    };

    const drawPlanet = (
      cx: number,
      cy: number,
      r: number,
      ringA: number,
      tilt: number,
      tint: readonly [number, number, number],
      alpha: number,
      zoom: number,
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.globalAlpha = alpha;

      // the ring — an ellipse passing behind and in front of the sphere
      const ringW = r * ringA;
      const ringH = r * ringA * 0.38;
      ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},0.5)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, ringW, ringH, tilt, 0, Math.PI);
      ctx.stroke();
      ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},0.28)`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.ellipse(0, 0, ringW * 0.82, ringH * 0.82, tilt, 0, Math.PI);
      ctx.stroke();

      // the sphere — softly lit disc
      ctx.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},0.16)`;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();

      // front half of the ring passes over the sphere
      ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},0.5)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, ringW, ringH, tilt, Math.PI, Math.PI * 2);
      ctx.stroke();

      // crescent light
      ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},0.35)`;
      ctx.beginPath();
      ctx.arc(r * 0.45, -r * 0.3, r * 0.55, -0.6, 1.1);
      ctx.stroke();

      ctx.restore();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const drift = reduced ? 0 : t / 1000;

      // planets — fly by slowly as the camera travels
      if (!mobile) {
        const zoom = 1 + readScroll() * 0.5;
        drawPlanet(
          w * 0.78 + Math.sin(drift * 0.02) * 10,
          h * 0.16 + Math.cos(drift * 0.014) * 8,
          Math.min(w, 1440) * 0.12,
          PLANETS[0].ringA,
          PLANETS[0].tilt,
          PLANETS[0].tint,
          PLANETS[0].alpha,
          zoom,
        );
        drawPlanet(
          w * 0.15 + Math.cos(drift * 0.016) * 8,
          h * 0.72 + Math.sin(drift * 0.02) * 10,
          Math.min(w, 1440) * 0.08,
          PLANETS[1].ringA,
          PLANETS[1].tilt,
          PLANETS[1].tint,
          PLANETS[1].alpha,
          zoom,
        );
      }

      // stars — four depth layers, near ones stream faster on scroll
      for (const s of stars) {
        const speed = 0.2 + s.depth * 0.7;
        const yy = (s.y + scroll * speed * h) % h;
        const xx = (s.x + drift * s.depth * 3 + (scroll * speed * h) * 0.12) % w;
        const tw = 0.5 + 0.5 * Math.sin(t * (0.0011 + s.depth * 0.002) + s.tw);
        ctx.globalAlpha = Math.max(0.08, tw) * (0.22 + s.depth * 0.42);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(xx, yy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // shooting star — rare, quick, quiet
      if (!reduced) {
        if (meteor.next > 0) {
          meteor.next -= 1;
        } else if (meteor.age < meteor.life) {
          const grad = ctx.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x - meteor.vx * 6,
            meteor.y - meteor.vy * 6,
          );
          grad.addColorStop(0, "rgba(236,231,219,0.8)");
          grad.addColorStop(1, "rgba(236,231,219,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - meteor.vx * 6, meteor.y - meteor.vy * 6);
          ctx.stroke();
          meteor.x += meteor.vx;
          meteor.y += meteor.vy;
          meteor.age += 1;
          if (meteor.age >= meteor.life) meteor.next = 520 + Math.random() * 620;
        } else {
          meteor.x = w * 0.2 + Math.random() * w * 0.6;
          meteor.y = h * 0.05 + Math.random() * h * 0.25;
          const angle = Math.PI * (1.0 + Math.random() * 0.16);
          const speed = 4 + Math.random() * 2.5;
          meteor.vx = Math.cos(angle) * speed;
          meteor.vy = Math.sin(angle) * speed;
          meteor.age = 0;
          meteor.life = 50 + Math.random() * 35;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onScroll = () => {
      scroll = readScroll();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (reduced) {
      draw(0);
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ background: "#0a0908" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* nebula washes — they drift with the page */}
      <div
        ref={nebulaRef}
        className="absolute -top-[25%] right-[-10%] h-[70vh] w-[50vw] rounded-full blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(179,168,230,0.11) 0%, transparent 70%)" }}
      />
      <div
        ref={nebulaRef2}
        className="absolute bottom-[-30%] left-[-14%] h-[60vh] w-[46vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(255,138,92,0.08) 0%, transparent 70%)" }}
      />

      {/* readability corridor — text column stays dark */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.18) 42%, transparent 75%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(to bottom, rgba(10,9,8,0.9), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, rgba(10,9,8,0.9), transparent)" }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 130% 100% at 50% 40%, transparent 50%, rgba(10,9,8,0.55) 100%)",
        }}
      />
    </div>
  );
}