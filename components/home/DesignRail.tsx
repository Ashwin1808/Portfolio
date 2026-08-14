"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { uxTimeline } from "@/data/journey";

const icons: Record<string, React.ReactNode> = {
  "visual-ivr": <path d="M4 10a8 8 0 0 1 16 0M8 10a4 4 0 0 1 8 0M12 10v6M9 18h6" />,
  banking: <path d="M4 8l8-4 8 4M5 10v6M9.5 10v6M14.5 10v6M19 10v6M4 16h16M4 19h16" />,
  insurance: <path d="M12 4l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7zM9 12l2 2 4-4" />,
  fintech: <path d="M4 6h16v12H4zM4 10h16M8 14h4" />,
  enterprise: <path d="M4 5h16M4 5v14h16V5M8 9h8M8 13h8M8 17h5" />,
  ai: <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
  ccaas: <path d="M4 5h16v10H9l-5 4V5zM8 8h8M8 11h5" />,
  mobile: <path d="M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM11 18h2" />,
};

/**
 * 02 — What I've designed. An editorial horizontal rail: large numbers,
 * small glyphs, serif names. Each item lives on its own scroll progress,
 * so it scales and brightens as it passes the centre of the view.
 */
export function DesignRail() {
  const reduced = useReducedMotion();
  return (
    <section id="work" className="relative overflow-hidden py-28 sm:py-36">
      <div className="wrap">
        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-violet">
          What I&apos;ve designed
        </p>
        <h2 className="mt-7 max-w-[820px] font-serif text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] tracking-[-0.015em] text-ink">
          Before building systems, I designed the experiences people actually use.
        </h2>
        <p className="mt-6 max-w-[560px] text-[14.5px] leading-[1.85] text-muted">
          Years of enterprise product design across banking, fintech, insurance,
          conversational UX, enterprise tools and AI-assisted workflows.
        </p>
      </div>

      <div className="no-scrollbar mt-16 overflow-x-auto" data-cursor="explore">
        <div className="mx-auto flex w-max items-stretch gap-0 px-[max(1.25rem,calc((100vw-1240px)/2+2rem))]">
          {uxTimeline.map((item, i) => (
            <RailItem key={item.id} index={i} item={item} reduced={reduced === true} />
          ))}

          {/* tail — the summary */}
          <div className="flex w-[300px] shrink-0 items-center border-l border-line pl-10 pr-8 sm:w-[420px]">
            <p className="text-[13.5px] leading-[1.8] text-muted">
              Designing across banking, fintech, insurance, Visual IVR, enterprise
              products, CCaaS and AI-assisted workflows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RailItem({
  index,
  item,
  reduced,
}: {
  index: number;
  item: { id: string; name: string; sub: string };
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 15%"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1.04, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.6, 1], [0.35, 1, 1, 0.35]);
  const numTint = useTransform(scrollYProgress, [0, 0.5, 1], ["rgba(236,231,219,0.22)", "rgba(205,242,73,0.9)", "rgba(236,231,219,0.22)"]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -14 : 14, index % 2 === 0 ? 14 : -14]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { scale, opacity, x }}
      className="flex w-[320px] shrink-0 flex-col justify-between border-l border-line px-8 py-2 sm:w-[400px] sm:px-12"
    >
      <div>
        <div className="flex items-center justify-between">
          <motion.span
            style={reduced ? undefined : { color: numTint }}
            className="font-mono text-[11px] tracking-[0.2em]"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-ink/35"
            aria-hidden="true"
          >
            {icons[item.id] ?? icons.mobile}
          </svg>
        </div>
        <h3 className="mt-16 font-serif text-[2rem] leading-[1.05] tracking-[-0.01em] text-ink sm:mt-20 sm:text-[2.6rem]">
          {item.name}
        </h3>
      </div>
      <p className="mt-10 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/50">
        {item.sub}
      </p>
    </motion.div>
  );
}