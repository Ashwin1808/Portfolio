import type { Metadata } from "next";
import {
  processSteps,
  thinkingPrinciples,
  figmaWorkflow,
  devCollab,
  workflowExamples,
} from "@/data/process";
import { Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FlowSteps } from "@/components/shared/FlowSteps";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How I design: understand, define, structure, wireframe, prototype, visual design, validate, handoff, iterate — and how I think about complex workflows.",
};

export default function ProcessPage() {
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="wrap py-16 sm:py-20">
          <Eyebrow index="02">Process</Eyebrow>
          <h1 className="h-display mt-5 max-w-[760px] text-ink">
            Understand the journey
            <br />
            before the screen.
          </h1>
          <p className="mt-5 max-w-[620px] text-[15px] leading-[1.75] text-muted">
            My process is practical: requirements, flows, structure, wireframes, prototypes,
            visual design, stakeholder feedback and developer handoff. I do not claim formal
            research methods I did not use — the loop is built on understanding requirements,
            mapping journeys and iterating with the people who know the domain.
          </p>
        </div>
      </header>

      {/* Process steps */}
      <section className="border-b border-line bg-paper">
        <div className="wrap py-20 sm:py-24">
          <SectionHeading eyebrow="How I Design" title="Nine steps, one loop" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i * 40, 200)}>
                <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
                  <p className="font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")} / 09
                  </p>
                  <h3 className="h-card mt-3 text-ink">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-[1.7] text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow thinking */}
      <section className="border-b border-line bg-surface">
        <div className="wrap py-20 sm:py-24">
          <SectionHeading
            eyebrow="Workflow Thinking"
            title="Making complex workflows feel simple"
            intro="The point is never the screen — it is the journey. These are the workflows behind my projects."
          />
          <div className="mt-12 space-y-10">
            {workflowExamples.map((w) => (
              <Reveal key={w.title}>
                <div>
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {w.title}
                  </p>
                  <FlowSteps
                    steps={w.steps.map((label) => ({ label }))}
                    title="Each step is a state — with validation, failure and recovery designed in."
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How I think */}
      <section className="border-b border-line bg-paper">
        <div className="wrap py-20 sm:py-24">
          <SectionHeading
            eyebrow="How I Think"
            title="Principles I actually work by"
            intro="Not motivational copy — the rules that shape decisions in every project."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {thinkingPrinciples.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 40, 200)}>
                <div className="flex h-full gap-4 rounded-xl border border-line bg-surface p-6">
                  <span className="mt-0.5 font-mono text-[11px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-muted">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Figma workflow */}
      <section className="border-b border-line bg-surface">
        <div className="wrap py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Tools — Figma"
                title="From idea to prototype"
                intro="Figma is my core design tool: user flows, wireframes, UI, components and clickable prototypes live in one file — which makes developer handoff a link, not a meeting."
              />
              <div className="mt-8">
                <Button href="/work" variant="outline">
                  See it applied in the work
                  <ArrowIcon />
                </Button>
              </div>
            </div>
            <Reveal>
              <ol className="relative space-y-0">
                {figmaWorkflow.map((f, i) => (
                  <li key={f.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-paper font-mono text-[10px] text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {i < figmaWorkflow.length - 1 && (
                        <span className="h-4 w-px bg-line" aria-hidden="true" />
                      )}
                    </div>
                    <div className="pb-5">
                      <p className="text-[14px] font-semibold text-ink">{f.step}</p>
                      <p className="mt-0.5 text-[12.5px] text-muted">{f.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Designing with engineers */}
      <section className="bg-paper">
        <div className="wrap py-20 sm:py-24">
          <SectionHeading
            eyebrow="Developer Collaboration"
            title="Designing with engineers"
            intro="I have spent years sitting next to frontend teams. Designs are speced as behaviour — states, validation, loading, errors — so implementation is a conversation, not an argument."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {devCollab.map((d, i) => (
              <Reveal key={d.title} delay={Math.min(i * 40, 160)}>
                <div
                  className={cn(
                    "flex h-full flex-col rounded-xl border p-5",
                    i === 0 ? "border-accent/40 bg-accent-soft" : "border-line bg-surface",
                  )}
                >
                  <p className="font-mono text-[10.5px] text-accent">0{i + 1}</p>
                  <h3 className="mt-2 text-[13.5px] font-semibold text-ink">{d.title}</h3>
                  <p className="mt-2 text-[12px] leading-[1.65] text-muted">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="max-w-[640px] text-[13.5px] leading-[1.75] text-muted">
              Where feasible, my designs translate directly into React experiences — which is why
              I also build. See the bridge between design and infrastructure in the{" "}
              <a href="/engineering" className="font-medium text-accent hover:text-accent-deep">
                engineering section →
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
