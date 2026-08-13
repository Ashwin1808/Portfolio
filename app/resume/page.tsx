import type { Metadata } from "next";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { designSkills, engineeringSkills } from "@/data/skills";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume — Ashwin K, UX/UI Designer transitioning into DevOps / Cloud Engineering.",
};

export default function ResumePage() {
  return (
    <div className="bg-paper">
      <div className="wrap py-12 sm:py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
              Resume
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink">
              {site.name} — {site.role}
            </h1>
          </div>
          <div className="no-print flex flex-wrap gap-3">
            <Button href="/resume" variant="outline">
              View Resume
            </Button>
            {site.resumePdf ? (
              <Button href={site.resumePdf} external>
                Download Resume (PDF)
              </Button>
            ) : (
              <PrintButton className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-white transition-colors hover:bg-accent-deep">
                Download Resume (PDF via print)
              </PrintButton>
            )}
          </div>
        </div>

        <div className="print-page mx-auto max-w-[860px] space-y-8 rounded-xl border border-line bg-surface p-8 sm:p-12">
          {/* Header */}
          <header className="border-b border-line pb-8">
            <p className="text-3xl font-semibold tracking-[-0.03em] text-ink">{site.name}</p>
            <p className="mt-1.5 text-[15px] font-medium text-ink-soft">
              UX/UI Designer · Transitioning into DevOps / Cloud Engineering
            </p>
            <p className="mt-2 text-[13px] text-muted">
              {site.email} · {site.github.replace("https://", "")} ·{" "}
              {site.linkedin.replace("https://", "")} · {site.location}
            </p>
          </header>

          {/* Summary */}
          <section>
            <h2 className="mono-label text-accent">Summary</h2>
            <p className="mt-3 text-[14px] leading-[1.8] text-ink-soft">
              Enterprise UX/UI designer with roughly three years of experience designing complex
              digital experiences — Visual IVR, conversational interfaces, financial services,
              insurance, dashboards and AI-assisted workflows. Currently expanding into frontend,
              cloud and DevOps engineering through hands-on production-style projects: AWS,
              Docker, Kubernetes, Helm, Terraform, CI/CD and monitoring.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="mono-label text-accent">Experience</h2>
            <div className="mt-4 space-y-5">
              {experience.map((e) => (
                <div key={e.role}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[15px] font-semibold text-ink">{e.role}</p>
                    <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-faint">
                      {e.period} — verify
                    </p>
                  </div>
                  <p className="text-[13.5px] font-medium text-accent">{e.company}</p>
                  <p className="mt-2 text-[13px] leading-[1.75] text-muted">{e.summary}</p>
                  <ul className="mt-3 space-y-1.5">
                    {e.items.map((i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-ink-soft">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/40" aria-hidden="true" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* DevOps */}
          <section>
            <h2 className="mono-label text-accent">DevOps / Cloud — Hands-on Projects</h2>
            <p className="mt-3 text-[13px] leading-[1.75] text-muted">
              Production-style project experience — not professional DevOps employment. RideMatch,
              a three-tier automotive platform, containerised, orchestrated, automated and
              monitored end to end.
            </p>
            <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {[
                "Docker & Docker Compose",
                "Kubernetes — Deployments, Services, probes",
                "Helm charting and releases",
                "GitHub Actions CI",
                "Jenkins deployment pipeline",
                "Terraform — VPC, EC2, IAM, security groups",
                "AWS — EC2, VPC, IAM, S3, CloudWatch",
                "Prometheus, Grafana, Alertmanager",
                "Linux, Bash, troubleshooting",
                "REST APIs, PostgreSQL, Node.js, React",
              ].map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section>
            <h2 className="mono-label text-accent">Core Skills</h2>
            <div className="mt-4 space-y-4">
              {[...designSkills, ...engineeringSkills].map((g) => (
                <div key={g.group}>
                  <p className="text-[13px] font-semibold text-ink">{g.group}</p>
                  <p className="mt-1 text-[12.5px] leading-[1.7] text-muted">{g.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="border-t border-line pt-5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
            No fabricated metrics — everything here is verifiable work
          </p>
        </div>
      </div>
    </div>
  );
}
