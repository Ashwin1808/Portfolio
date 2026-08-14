import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ashwin K — UX/UI designer at Ubona Technologies, designing enterprise digital experiences and learning DevOps and cloud engineering.",
};

export default function AboutPage() {
  return (
    <div>
      <header className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-28">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">About</p>
          <h1 className="h-giant mt-7 max-w-[860px] text-ink">
            Designing experiences.
            <br />
            <em className="italic text-accent">Building systems.</em>
          </h1>
          <p className="mt-7 max-w-[580px] text-[14.5px] leading-[1.8] text-muted">
            UX/UI Designer at {site.company}, designing complex digital experiences across
            fintech, insurance, Visual IVR, enterprise products and AI-assisted workflows.
            Now extending that systems-thinking mindset into software, cloud and DevOps.
          </p>
        </div>
      </header>

      <section className="border-b border-ink/10 bg-surface">
        <div className="wrap py-16 sm:py-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-faint">
                Currently
              </p>
              <div className="mt-5 border-t border-ink/10 pt-5">
                <p className="text-[18px] font-semibold tracking-[-0.01em] text-ink">
                  {site.uxRole}
                </p>
                <p className="mt-1 text-[13.5px] text-muted">{site.company}</p>
                <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                  {site.tenure}
                </p>
              </div>
              <p className="mt-5 max-w-[520px] text-[13.5px] leading-[1.8] text-muted">
                Daily: design systems, conversational UX, editorial interfaces, motion.
                Learning: Linux, Docker, Kubernetes, Terraform, AWS, CI/CD, observability —
                through production-style projects I build, break and debug myself.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-faint">
                Now
              </p>
              <div className="mt-5 border-t border-ink/10">
                <div className="grid gap-1.5 border-b border-ink/10 py-5">
                  <p className="text-[13.5px] font-semibold text-ink">Design</p>
                  <p className="text-[12.5px] leading-[1.8] text-muted">
                    Visual IVR · Banking · Insurance · Fintech · Enterprise · AI + GenAI · CCaaS · Mobile
                  </p>
                </div>
                <div className="grid gap-1.5 border-b border-ink/10 py-5">
                  <p className="text-[13.5px] font-semibold text-ink">DevOps / Cloud</p>
                  <p className="text-[12.5px] leading-[1.8] text-muted">
                    Linux · Docker · Kubernetes · Terraform · AWS · CI/CD · Prometheus · Grafana
                  </p>
                </div>
                <div className="grid gap-1.5 py-5">
                  <p className="text-[13.5px] font-semibold text-ink">Current project</p>
                  <p className="text-[12.5px] leading-[1.8] text-muted">
                    RideMatch — a production-style automotive platform built to deepen engineering and DevOps skills.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-ink/10 pt-8">
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-accent transition-colors hover:text-accent-deep"
            >
              Resume
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
            >
              Email ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}