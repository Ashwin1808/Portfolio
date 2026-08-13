"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { stackMarquee } from "@/data/stack";

const pipeline: { node: string; detail: string }[] = [
  { node: "Code", detail: "Where everything starts — versioned, reviewed, reproducible." },
  { node: "GitHub", detail: "The source of truth for code and configuration." },
  { node: "CI/CD", detail: "Automated builds, tests and delivery — no laptop dependency." },
  { node: "Docker", detail: "Packaging the application into reproducible containers." },
  { node: "Kubernetes", detail: "Orchestrating workloads and managing deployments." },
  { node: "AWS", detail: "Cloud infrastructure — network, compute and identity." },
  { node: "Monitoring", detail: "Metrics, dashboards and alerts after the deploy." },
];

export function CurrentlyBuilding() {
  const [active, setActive] = useState(3);

  return (
    <section className="dark-band border-t border-white/10 bg-dark">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-cyan">
                Currently building
              </p>
              <h2 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[3.2rem]">
                RideMatch
              </h2>
              <p className="mt-5 max-w-[460px] text-[14px] leading-[1.8] text-white/55">
                A production-style automotive platform — discovery, comparison, authentication and
                AI-assisted recommendations — that I use to deepen my engineering and DevOps
                skills. Three tiers, containerised, orchestrated, automated, provisioned as code
                and monitored.
              </p>
              <Link
                href="/engineering/ridematch"
                className="group mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-white transition-colors hover:text-cyan"
              >
                Read the full case study
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>

            <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                Why it matters
              </p>
              <p className="mt-3 text-[13px] leading-[1.75] text-white/60">
                The focus is not just making the application work — it is making its build,
                deployment, infrastructure and monitoring reproducible. Application →
                containerisation → orchestration → automation → infrastructure → observability.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              Delivery pipeline — tap a node
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
              <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
                {pipeline.map((p, i) => (
                  <button
                    key={p.node}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={
                      active === i
                        ? "bg-dark p-4 text-left"
                        : "bg-dark p-4 text-left transition-colors hover:bg-white/[0.05]"
                    }
                  >
                    <span
                      className={
                        active === i
                          ? "font-mono text-[9px] text-cyan"
                          : "font-mono text-[9px] text-white/30"
                      }
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      className={
                        active === i
                          ? "mt-1 text-[12px] font-semibold text-white"
                          : "mt-1 text-[12px] font-medium text-white/55"
                      }
                    >
                      {p.node}
                    </p>
                  </button>
                ))}
              </div>
              <div className="min-h-[64px] border-t border-white/10 bg-dark p-5" aria-live="polite">
                <p className="text-[13px] font-medium text-cyan">{pipeline[active].node}</p>
                <p className="mt-1 text-[12px] leading-[1.65] text-white/55">
                  {pipeline[active].detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StackMarquee() {
  const doubled = [...stackMarquee, ...stackMarquee];
  return (
    <div
      className="dark-band overflow-hidden border-t border-white/10 bg-dark py-5"
      aria-label="Technologies: AWS, Linux, Docker, Kubernetes, Helm, Terraform, Jenkins, GitHub Actions, Prometheus, Grafana, Bash, PostgreSQL"
    >
      <div className="marquee-track flex w-max items-center gap-8">
        {doubled.map((s, i) => (
          <span key={`${s}-${i}`} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
            {s}
            <span className="text-cyan/60" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function FinalStatement() {
  return (
    <section className="dark-band border-t border-white/10 bg-dark">
      <div className="wrap flex flex-col items-center py-28 text-center sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-[4rem]">
            Still designing.
            <br />
            <span className="text-white/40">Still building.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-[480px] text-[13.5px] leading-[1.8] text-white/55">
            My background started with interfaces. My curiosity took me into systems. I&apos;m
            interested in the space where thoughtful design meets reliable engineering.
          </p>
          <p className="mt-10 flex items-center justify-center gap-4 font-mono text-[10.5px] uppercase tracking-[0.2em]">
            <span className="text-white/70">UX / Product Design</span>
            <span className="text-cyan" aria-hidden="true">✦</span>
            <span className="text-white/40">Engineering / DevOps</span>
          </p>
          <Link
            href="/engineering"
            className="group mt-12 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[13px] font-medium text-white transition-colors hover:border-cyan hover:text-cyan"
          >
            See the engineering side
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
