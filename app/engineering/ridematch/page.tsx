import type { Metadata } from "next";
import { ridematch } from "@/data/engineering";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/engineering/ArchitectureDiagram";
import { PipelineDiagram } from "@/components/engineering/PipelineDiagram";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "RideMatch — DevOps Case Study",
  description:
    "RideMatch: an automotive platform that became a DevOps learning system — Docker, Kubernetes, Helm, Terraform, CI/CD and monitoring, built hands-on.",
};

const anchors = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "application", label: "Application" },
  { id: "architecture", label: "Architecture" },
  { id: "pipeline", label: "CI/CD" },
  { id: "kubernetes", label: "Kubernetes" },
  { id: "terraform", label: "Terraform" },
  { id: "monitoring", label: "Monitoring" },
  { id: "challenges", label: "Challenges" },
  { id: "lessons", label: "Lessons" },
];

function DocSection({
  id,
  title,
  children,
  intro,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  intro?: string;
}) {
  return (
    <section id={id} className="scroll-mt-32 border-t border-dark-line py-12 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <div>
          <h2 className="mono-label text-cyan">{title}</h2>
        </div>
        <div className="min-w-0 space-y-5">
          {intro && <p className="max-w-[700px] text-[14.5px] leading-[1.8] text-dark-muted">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

function Block({ title, children, accent }: { title: string; children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={cn("rounded-xl border p-6", accent ? "border-cyan/40 bg-cyan/[0.06]" : "border-dark-line bg-dark-surface")}>
      <p className="mono-label text-dark-faint">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-[13.5px] leading-[1.7] text-dark-muted">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function RideMatchPage() {
  return (
    <div className="dark-band bg-dark text-white">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-dark-line bg-dark">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan/[0.06] blur-3xl"
        />
        <div className="wrap relative py-16 sm:py-24">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="cyan">DevOps Case Study</Badge>
            <Badge tone="dark">Flagship</Badge>
          </div>
          <h1 className="h-display mt-6 max-w-[820px] text-white">{ridematch.title}</h1>
          <p className="mt-5 max-w-[680px] text-[15px] leading-[1.8] text-dark-muted">
            {ridematch.tagline}
          </p>
          <div className="mt-7 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="mono-label text-dark-faint">Status</p>
              <p className="mt-1.5 text-[13.5px] font-medium text-white">Implemented + in progress</p>
            </div>
            <div>
              <p className="mono-label text-dark-faint">Built with</p>
              <p className="mt-1.5 text-[13.5px] font-medium text-white">Docker · K8s · Helm · Terraform · AWS · CI/CD</p>
            </div>
            <div>
              <p className="mono-label text-dark-faint">Kind of project</p>
              <p className="mt-1.5 text-[13.5px] font-medium text-white">Production-style, self-built and operated</p>
            </div>
          </div>
        </div>
      </header>

      {/* Anchors */}
      <nav
        aria-label="RideMatch sections"
        className="sticky top-16 z-30 border-b border-dark-line bg-dark/95 backdrop-blur"
      >
        <div className="wrap flex gap-1 overflow-x-auto py-2.5 no-scrollbar">
          {anchors.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="whitespace-nowrap rounded-full border border-transparent px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dark-muted transition-colors hover:border-dark-line hover:text-white"
            >
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="wrap">
        <DocSection id="overview" title="01 · Overview">
          <p className="max-w-[700px] text-[15px] leading-[1.85] text-dark-muted">{ridematch.overview}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ridematch.story.map((s, i) => (
              <Reveal key={s.stage} delay={Math.min(i * 40, 160)}>
                <div className={cn("h-full rounded-xl border p-5", i === 0 ? "border-cyan/40 bg-cyan/[0.06]" : "border-dark-line bg-dark-surface")}>
                  <p className="font-mono text-[10.5px] text-cyan">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-[14px] font-semibold text-white">{s.stage}</p>
                  <p className="mt-1.5 text-[12px] leading-[1.65] text-dark-muted">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </DocSection>

        <DocSection
          id="problem"
          title="02 · Problem"
          intro="Why the project exists beyond the demo:"
        >
          <Block title="The original problem">
            <p className="text-[13.5px] leading-[1.75] text-dark-muted">
              A single laptop deployment is not a system. Running the app locally taught me
              nothing about how it would behave when built by CI, run as containers, scaled by an
              orchestrator and watched by monitoring. The problem was not the application — it was
              everything around it.
            </p>
          </Block>
        </DocSection>

        <DocSection
          id="solution"
          title="03 · Solution"
          intro="Turn the application into a deployable, reproducible system."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Block title="Reproducible builds" accent>
              <p className="text-[13px] leading-[1.75] text-dark-muted">
                Docker images built the same way every time — by CI, not by a laptop. Versioned
                artifacts in a registry.
              </p>
            </Block>
            <Block title="Reproducible deployments">
              <p className="text-[13px] leading-[1.75] text-dark-muted">
                Helm charts and Kubernetes manifests that recreate the stack from a commit —
                health-gated, rollback-able.
              </p>
            </Block>
            <Block title="Reproducible infrastructure">
              <p className="text-[13px] leading-[1.75] text-dark-muted">
                Terraform provisions the AWS network and compute as code — the environment is a
                reviewable artifact, not a console session.
              </p>
            </Block>
            <Block title="Observable operations">
              <p className="text-[13px] leading-[1.75] text-dark-muted">
                Prometheus, Grafana and Alertmanager answer the only question that matters after
                deployment: is it healthy?
              </p>
            </Block>
          </div>
        </DocSection>

        <DocSection id="application" title="04 · Application">
          <div className="grid gap-4 lg:grid-cols-2">
            <Block title="What the app does">
              <p className="text-[13.5px] leading-[1.75] text-dark-muted">{ridematch.application.body}</p>
            </Block>
            <Block title="Capabilities">
              <Bullets items={ridematch.capabilities} />
            </Block>
          </div>
        </DocSection>

        <DocSection
          id="architecture"
          title="05 · Architecture"
          intro="The full system — select components to see what they do."
        >
          <ArchitectureDiagram />
        </DocSection>

        <DocSection
          id="pipeline"
          title="06 · CI / CD Pipeline"
          intro="The delivery path — from a commit to a running, monitored workload."
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <PipelineDiagram />
            <div className="space-y-4">
              <Block title="CI — GitHub Actions" accent>
                <Bullets items={ridematch.ciCd.bullets.slice(0, 3)} />
              </Block>
              <Block title="CD — Jenkins → Helm → K8s">
                <Bullets items={ridematch.ciCd.bullets.slice(3)} />
              </Block>
            </div>
          </div>
        </DocSection>

        <DocSection
          id="kubernetes"
          title="07 · Kubernetes & Helm"
          intro="Orchestration that keeps the stack running and rolls updates safely."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Block title="Kubernetes">
              <Bullets items={ridematch.kubernetes.bullets.slice(0, 5)} />
            </Block>
            <Block title="Helm">
              <Bullets items={ridematch.kubernetes.bullets.slice(5)} />
            </Block>
          </div>
        </DocSection>

        <DocSection
          id="terraform"
          title="08 · Terraform & AWS"
          intro="The environment is code — provisioned, versioned and reviewable."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Block title="Infrastructure as code">
              <Bullets items={ridematch.terraform.bullets.slice(0, 4)} />
            </Block>
            <Block title="Configuration practice">
              <Bullets items={ridematch.terraform.bullets.slice(4)} />
            </Block>
          </div>
        </DocSection>

        <DocSection
          id="monitoring"
          title="09 · Monitoring"
          intro="Metrics → Prometheus → Grafana → Alerts."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Block title="The stack" accent>
              <Bullets items={ridematch.monitoring.bullets} />
            </Block>
            <Block title="The question it answers">
              <p className="text-[13.5px] leading-[1.75] text-dark-muted">
                {ridematch.monitoring.body}
              </p>
            </Block>
          </div>
        </DocSection>

        <DocSection
          id="challenges"
          title="10 · Challenges"
          intro="The failures that taught the most — each one debugged from evidence."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {ridematch.challenges.map((c, i) => (
              <Reveal key={c.title} delay={Math.min(i * 40, 160)}>
                <div className="h-full rounded-xl border border-dark-line bg-dark-surface p-6">
                  <p className="font-mono text-[10.5px] text-warn">Challenge {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-[14.5px] font-semibold text-white">{c.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-[1.75] text-dark-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </DocSection>

        <DocSection
          id="lessons"
          title="11 · Lessons Learned"
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Block title="From the build">
              <ul className="space-y-2.5">
                {ridematch.troubleshooting.map((t, i) => (
                  <li key={i} className="rounded-lg border border-dark-line bg-dark p-4">
                    <p className="text-[12.5px] font-semibold text-white">{t.problem}</p>
                    <p className="mt-1.5 font-mono text-[11px] text-cyan">evidence: {t.evidence}</p>
                    <p className="mt-1 text-[12px] text-dark-muted">root cause: {t.rootCause}</p>
                    <p className="mt-1 text-[12px] text-dark-muted">fix: {t.fix}</p>
                  </li>
                ))}
              </ul>
            </Block>
            <div className="space-y-4">
              <Block title="What I would repeat" accent>
                <ul className="space-y-2.5">
                  {ridematch.lessons.map((l) => (
                    <li key={l} className="flex items-start gap-3 text-[13px] leading-[1.7] text-dark-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ok" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </Block>
            </div>
          </div>
        </DocSection>
      </div>

      {/* Footer nav */}
      <div className="border-t border-dark-line bg-dark-surface">
        <div className="wrap flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mono-label text-dark-faint">Repository</p>
            <p className="mt-1.5 font-mono text-[13px] text-cyan">
              {site.githubUsername}/ridematch
            </p>
            <p className="mt-1 text-[11.5px] text-dark-faint">
              Link configured centrally in data/site.ts
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/engineering" variant="dark">
              ← Back to engineering
            </Button>
            <Button href="/work" variant="outline" className="text-white hover:bg-white/10">
              The UX half of the story
            </Button>
          </div>
        </div>
        <p className="border-t border-dark-line py-5 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-dark-faint">
          /engineering/ridematch · case study
        </p>
      </div>
    </div>
  );
}