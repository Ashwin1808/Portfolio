"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { missions } from "@/data/journey";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * [02] MISSION CONTROL — the portfolio as a command center.
 * Three missions, each with status, telemetry and an OPEN action.
 */
export function MissionControl() {
  const reduced = useReducedMotion();

  return (
    <section id="missions" className="relative overflow-hidden border-b border-line">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 className="h-giant text-ink lg:col-span-7">
            Mission
            <br />
            <em className="italic text-accent">control.</em>
          </h2>
          <p className="max-w-[380px] text-[13.5px] leading-[1.8] text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            Select a mission. Each one opens its own briefing — the problem,
            the system, the infrastructure behind it.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {missions.map((m, i) => (
            <motion.article
              key={m.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              className="group relative flex flex-col border-2 border-ink/12 bg-paper/40 p-6 transition-colors duration-300 hover:border-accent/60 sm:p-7"
            >
              {/* corner brackets */}
              <span aria-hidden="true" className="absolute left-2 top-2 h-3 w-3 border-l border-t border-ink/30 transition-colors group-hover:border-accent" />
              <span aria-hidden="true" className="absolute right-2 top-2 h-3 w-3 border-r border-t border-ink/30 transition-colors group-hover:border-accent" />
              <span aria-hidden="true" className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-ink/30 transition-colors group-hover:border-accent" />
              <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-ink/30 transition-colors group-hover:border-accent" />

              <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
                <span>Mission {m.num}</span>
                <span className={cn("flex items-center gap-1.5", m.statusColor)}>
                  <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
                  {m.status}
                </span>
              </div>

              <h3 className="mt-6 font-serif text-[2.1rem] leading-[1.02] tracking-[-0.01em] text-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-[2.4rem]">
                {m.name}
              </h3>
              <p className="mt-4 flex-1 text-[13px] leading-[1.75] text-muted">{m.desc}</p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {m.tech.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="border border-line-strong px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-muted"
                  >
                    {t}
                  </span>
                ))}
                {m.tech.length > 6 && (
                  <span className="px-1 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.14em] text-faint">
                    +{m.tech.length - 6}
                  </span>
                )}
              </div>

              <Link
                href={m.href}
                data-cursor="explore"
                className="mt-8 inline-flex items-center justify-between border-t border-ink/12 pt-5 font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-ink transition-colors hover:text-accent"
              >
                Open mission
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}