"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/data/site";

const nodes = ["USER", "UX", "REACT", "DOCKER", "KUBERNETES", "AWS"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

function Pipeline() {
  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div className="relative mx-auto w-[300px]">
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-ink/15" />
        <motion.div
          className="absolute left-[15px] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(37,99,235,0.15)]"
          animate={{ top: [12, 330, 12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="space-y-0">
          {nodes.map((n, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-4 py-[9px]"
            >
              <span
                className={
                  i === 0
                    ? "z-10 h-[10px] w-[10px] rounded-full border border-ink/60"
                    : i === nodes.length - 1
                      ? "z-10 h-[10px] w-[10px] rounded-full bg-ink"
                      : "z-10 h-[10px] w-[10px] rounded-full border border-ink/40"
                }
              />
              <span
                className={
                  i === nodes.length - 1
                    ? "font-mono text-[12px] font-semibold tracking-[0.14em] text-ink"
                    : "font-mono text-[12px] tracking-[0.14em] text-muted"
                }
              >
                {n}
              </span>
              <span className="ml-auto font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
                {["interface", "practice", "frontend", "containers", "orchestration", "cloud"][i]}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
            I started at the top
          </span>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-accent">
            working my way down
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="wrap grid min-h-[88vh] grid-cols-1 items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-0">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent"
          >
            UX/UI Designer → DevOps / Cloud Engineering
          </motion.p>

          <motion.h1 variants={item} className="h-hero mt-8 text-ink">
            Designing
            <br />
            experiences.
            <br />
            <span className="text-faint">Engineering</span>
            <br />
            <span className="text-faint">systems.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-9 max-w-[520px] text-[15.5px] leading-[1.8] text-muted">
            I&apos;m a UX/UI Designer at {site.company}, designing complex enterprise experiences
            across fintech, insurance, conversational interfaces, dashboards and AI-assisted
            workflows. I&apos;m now extending that thinking into frontend, cloud and DevOps
            engineering.
          </motion.p>

          <motion.p variants={item} className="mt-5 font-mono text-[11.5px] leading-relaxed text-faint">
            Currently: designing interfaces by day. Building infrastructure by night.
            <br />
            <span className="text-muted">Exploring:</span> Docker · Kubernetes · Terraform · AWS
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              href="/work"
              className="group flex items-center gap-2 text-[14px] font-medium text-ink transition-colors hover:text-accent"
            >
              Work
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/about" className="text-[14px] font-medium text-muted transition-colors hover:text-ink">
              About
            </Link>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[12.5px] text-muted transition-colors hover:text-ink">
              GitHub ↗
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[12.5px] text-muted transition-colors hover:text-ink">
              LinkedIn ↗
            </a>
          </motion.div>
        </motion.div>

        <div className="hidden lg:block">
          <Pipeline />
        </div>
      </div>
    </section>
  );
}
