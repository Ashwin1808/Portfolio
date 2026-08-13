import type { Metadata } from "next";
import { site } from "@/data/site";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArchitectureDiagram } from "@/components/engineering/ArchitectureDiagram";
import { PipelineDiagram } from "@/components/engineering/PipelineDiagram";
import { StackGroups } from "@/components/engineering/StackGroups";
import {
  JourneyTimeline,
  LearningLabs,
  TroubleshootingGrid,
  RideMatchStory,
} from "@/components/engineering/EngineeringSections";
import {
  PrinciplesGrid,
  OverlapDiagram,
  NotesGrid,
  RepoGrid,
} from "@/components/engineering/EngineeringBlocks";
import { ridematch } from "@/data/engineering";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Engineering — DevOps / Cloud",
  description:
    "DevOps and Cloud engineering journey — AWS, Docker, Kubernetes, Helm, Terraform, CI/CD and monitoring, built through production-style projects like RideMatch.",
};

const anchors = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#stack", label: "Stack" },
  { href: "#debug", label: "Debugging" },
  { href: "#contact", label: "Contact" },
];

function DarkSection({
  id,
  eyebrow,
  index,
  title,
  intro,
  children,
  tone = "dark",
}: {
  id: string;
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children: React.ReactNode;
  tone?: "dark" | "elevated";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-b border-dark-line ${tone === "elevated" ? "bg-dark-surface" : "bg-dark"}`}
    >
      <div className="wrap py-20 sm:py-28">
        <div className="max-w-[720px]">
          <Reveal>
            <p className="eyebrow flex items-center gap-2.5">
              {index && <span className="text-cyan">{index}</span>}
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-section mt-5 text-white">{title}</h2>
          </Reveal>
          {intro && (
            <Reveal delay={120}>
              <p className="prose-sm-copy mt-5">{intro}</p>
            </Reveal>
          )}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default function EngineeringPage() {
  const flow = ["GitHub", "CI/CD", "Docker", "Registry", "Jenkins", "Kubernetes", "Monitoring"];

  return (
    <div className="dark-band bg-dark text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dark-line bg-dark">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-[-15%] h-[560px] w-[560px] rounded-full bg-cyan/[0.07] blur-3xl"
        />
        <div className="wrap relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                DevOps / Cloud Engineering
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="h-display mt-6 text-white">
                Designing experiences taught me to think about users.
                <span className="mt-2 block text-cyan">
                  DevOps taught me to think about systems.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-[540px] text-[15.5px] leading-[1.75] text-dark-muted">
                {site.engineeringSupport}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="#projects" variant="cyan" size="lg">
                  Explore My Work
                </Button>
                <Button href={site.github} external variant="dark" size="lg">
                  View GitHub
                </Button>
                <Button href="/resume" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                  Download Resume
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mx-auto max-w-[400px] rounded-2xl border border-dark-line bg-dark-surface p-6">
              <p className="mono-label flex items-center justify-between text-dark-muted">
                Delivery pipeline
                <span className="text-cyan">live</span>
              </p>
              <div className="mt-5 flex flex-col items-stretch gap-0">
                {flow.map((f, i) => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-dark-line bg-dark-elevated font-mono text-[10px] text-cyan">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={
                        i === 3 || i === 5
                          ? "flex-1 rounded-md border border-cyan/40 bg-cyan/10 px-3 py-2 text-[12px] font-semibold text-cyan"
                          : "flex-1 rounded-md border border-dark-line bg-white/[0.03] px-3 py-2 text-[12px] text-dark-muted"
                      }
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 border-t border-dark-line pt-4 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-dark-faint">
                Git push → container → cluster → metrics
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Anchors */}
      <nav
        aria-label="Engineering sections"
        className="sticky top-16 z-30 hidden border-b border-dark-line bg-dark/95 backdrop-blur lg:block"
      >
        <div className="wrap flex gap-1 py-2.5">
          {anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="rounded-full border border-transparent px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dark-muted transition-colors hover:border-dark-line hover:text-white"
            >
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      {/* About / transition */}
      <DarkSection
        id="about"
        eyebrow="From Pixels to Infrastructure"
        index="01"
        title="The transition is the feature"
        intro={
          <>
            I started my professional career in UX/UI design, working on enterprise applications
            and digital experiences at Ubona. Working closely with developers and product teams
            made me increasingly interested in what happens beyond the interface — how applications
            are built, deployed and operated.
          </>
        }
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-5">
            <Reveal>
              <p className="text-[14.5px] leading-[1.8] text-dark-muted">
                That curiosity became a structured learning path: build the application, containerise
                it, orchestrate it, automate its delivery, provision its infrastructure as code and
                watch it with metrics, dashboards and alerts.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-xl border border-dark-line bg-dark-surface p-5">
                <p className="mono-label text-dark-muted">How I work</p>
                <p className="mt-2 text-[13px] leading-[1.75] text-dark-muted">
                  Hands-on project experience — production-style systems built, broken and debugged
                  by me. Not claimed as professional DevOps employment: this is deliberate, earned
                  practice.
                </p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <div className="flex flex-wrap gap-2">
                {["AWS", "Docker", "Kubernetes", "Helm", "Terraform", "GitHub Actions", "Jenkins", "Prometheus", "Grafana"].map((t) => (
                  <Badge key={t} tone="dark">{t}</Badge>
                ))}
              </div>
            </Reveal>
          </div>
          <JourneyTimeline />
        </div>
      </DarkSection>

      {/* RideMatch */}
      <DarkSection
        id="projects"
        eyebrow="Flagship Project"
        index="02"
        title="RideMatch — Production-Style Automotive Platform"
        intro={
          <>
            {ridematch.overview}
          </>
        }
        tone="elevated"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="space-y-5">
            <RideMatchStory />
            <Reveal delay={100}>
              <p className="text-[13.5px] leading-[1.75] text-dark-muted">
                The story is the progression: application → containerisation → orchestration →
                automation → infrastructure → observability. Every stage was built, broken and
                debugged hands-on.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex flex-wrap gap-3">
                <Button href="/engineering/ridematch" variant="cyan">
                  Full RideMatch case study
                  <ArrowIcon />
                </Button>
                <Button href="#architecture" variant="dark">
                  See the architecture
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="rounded-2xl border border-dark-line bg-dark p-6">
              <p className="mono-label text-dark-muted">Application</p>
              <p className="mt-3 text-[14px] leading-[1.75] text-dark-muted">{ridematch.application.body}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {ridematch.application.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[12px] text-dark-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </DarkSection>

      {/* Architecture */}
      <DarkSection
        id="architecture"
        eyebrow="Architecture"
        index="03"
        title="How the pieces connect"
        intro="Select any component to see what it does. The story is clear only when the system is."
      >
        <ArchitectureDiagram />
        <Reveal className="mt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dark-faint">
            Honest status markers — implemented / in-progress / planned. No fake infrastructure.
          </p>
        </Reveal>
      </DarkSection>

      {/* Pipeline */}
      <DarkSection
        id="pipeline"
        eyebrow="Delivery Pipeline"
        index="04"
        title="From git push to running workload"
        intro="Each step is clickable — this is how a commit becomes a running, monitored release."
        tone="elevated"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <PipelineDiagram />
          <div className="space-y-5">
            <Reveal>
              <div className="rounded-xl border border-dark-line bg-dark-surface p-6">
                <p className="mono-label text-dark-muted">Why this shape</p>
                <p className="mt-2.5 text-[13px] leading-[1.75] text-dark-muted">
                  CI builds and validates; the registry stores versioned artifacts; the CD path
                  deploys through Helm to Kubernetes with health-gated rollouts; and monitoring
                  confirms the result. Every stage is reproducible from a commit.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-xl border border-dark-line bg-dark-surface p-6">
                <p className="mono-label text-cyan">Lessons from the pipeline</p>
                <ul className="mt-3 space-y-2.5">
                  {ridematch.lessons.map((l) => (
                    <li key={l} className="flex items-start gap-2.5 text-[12.5px] leading-[1.65] text-dark-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ok" aria-hidden="true" />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </DarkSection>

      {/* Stack */}
      <DarkSection
        id="stack"
        eyebrow="DevOps Stack"
        index="05"
        title="Grouped, not logo-grazed"
        intro="No meaningless icon walls or percentage bars — grouped honestly by where I use each tool."
      >
        <StackGroups />
      </DarkSection>

      {/* Learning lab */}
      <DarkSection
        id="labs"
        eyebrow="Learning Lab"
        index="06"
        title="Things I build to understand"
        intro="Instead of pretending everything is production experience, here is the practice that made it real — problems, what each taught me, and how I solved it."
        tone="elevated"
      >
        <LearningLabs />
      </DarkSection>

      {/* Troubleshooting */}
      <DarkSection
        id="debug"
        eyebrow="Troubleshooting"
        index="07"
        title="Things break. I debug them."
        intro="Debugging from evidence, not assumptions. These are learning scenarios from my own systems — each one made the next incident faster to solve."
      >
        <TroubleshootingGrid />
      </DarkSection>

      {/* Principles */}
      <DarkSection
        id="principles"
        eyebrow="How I Think"
        index="08"
        title="How I approach infrastructure"
        intro="Principles that shape every system I build — practical, not motivational."
        tone="elevated"
      >
        <PrinciplesGrid />
      </DarkSection>

      {/* UX → DevOps advantage */}
      <DarkSection
        id="ux-advantage"
        eyebrow="The Overlap"
        index="09"
        title="Why UX makes me a better engineer"
        intro="The overlap is real and practical: system thinking, communication, attention to detail, designing for edge cases. The transition is intentional, not random."
      >
        <OverlapDiagram />
      </DarkSection>

      {/* Notes */}
      <DarkSection
        id="notes"
        eyebrow="Engineering Notes"
        index="10"
        title="Notes that will become articles"
        intro="Writing what I learn is how I know I understand it. Placeholders for upcoming notes — no fabricated content."
        tone="elevated"
      >
        <NotesGrid />
      </DarkSection>

      {/* Repos */}
      <DarkSection
        id="repos"
        eyebrow="GitHub"
        index="11"
        title="Repositories"
        intro="The work lives on GitHub. Repository links are configured centrally in data/engineering.ts."
      >
        <RepoGrid />
      </DarkSection>

      {/* Resume + contact */}
      <section id="contact" className="scroll-mt-24 border-b border-dark-line bg-dark">
        <div className="wrap flex flex-col gap-8 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                Contact
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-section mt-4 text-white">Let&apos;s build something reliable.</h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <div className="flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`} variant="cyan" size="lg">
                Email me
              </Button>
              <Button href="/resume" variant="dark" size="lg">
                View resume
              </Button>
              <Button href={site.github} external variant="ghost" size="lg" className="text-white hover:bg-white/10">
                GitHub
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Back to design */}
      <section className="bg-dark-surface">
        <div className="wrap flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Back to the design side</p>
            <p className="mt-2 text-[14.5px] leading-[1.7] text-dark-muted">
              The same thinking — systems, states, edge cases — started in UX. See the other half.
            </p>
          </div>
          <Button href="/" variant="outline" className="text-white hover:bg-white/10">
            ← The UX/UI portfolio
          </Button>
        </div>
      </section>
    </div>
  );
}