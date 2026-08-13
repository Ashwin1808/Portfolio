import type { Metadata } from "next";
import Link from "next/link";
import {
  processSteps,
  thinkingPrinciples,
  figmaWorkflow,
  devCollab,
  workflowExamples,
} from "@/data/process";
import { FlowSteps } from "@/components/shared/FlowSteps";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How I design: understand, define, structure, wireframe, prototype, visual design, validate, handoff, iterate — and how I think about complex workflows.",
};

export default function ProcessPage() {
  return (
    <div>
      <header className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-28">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
            02 — Process
          </p>
          <h1 className="h-giant mt-7 max-w-[860px] text-ink">
            Understand the journey
            <br />
            before the screen.
          </h1>
          <p className="mt-7 max-w-[620px] text-[14.5px] leading-[1.8] text-muted">
            My process is practical: requirements, flows, structure, wireframes, prototypes,
            visual design, stakeholder feedback and developer handoff. I do not claim formal
            research methods I did not use — the loop is built on understanding requirements,
            mapping journeys and iterating with the people who know the domain.
          </p>
        </div>
      </header>

      {/* Process steps */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-24">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="h-section text-ink">How I design</h2>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
              Nine steps, one loop
            </p>
          </div>
          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((s, i) => (
              <div key={s.title} className="flex h-full flex-col bg-paper p-6 sm:p-7">
                <p className="font-mono text-[10.5px] text-accent">
                  {String(i + 1).padStart(2, "0")} / 09
                </p>
                <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow thinking */}
      <section className="border-b border-ink/10 bg-surface">
        <div className="wrap py-20 sm:py-24">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="h-section text-ink">Making complex workflows feel simple</h2>
            <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint sm:block">
              Workflow thinking
            </p>
          </div>
          <p className="mt-3 max-w-[600px] text-[14px] leading-[1.75] text-muted">
            The point is never the screen — it is the journey. These are the workflows behind my
            projects.
          </p>
          <div className="mt-12 space-y-12">
            {workflowExamples.map((w) => (
              <div key={w.title}>
                <p className="mb-4 border-l-2 border-accent pl-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                  {w.title}
                </p>
                <FlowSteps steps={w.steps.map((label) => ({ label }))} title="" />
                <p className="mt-2 text-[12px] text-faint">
                  Each step is a state — with validation, failure and recovery designed in.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I think */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-24">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="h-section text-ink">Principles I actually work by</h2>
            <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint sm:block">
              How I think
            </p>
          </div>
          <p className="mt-3 max-w-[600px] text-[14px] leading-[1.75] text-muted">
            Not motivational copy — the rules that shape decisions in every project.
          </p>
          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {thinkingPrinciples.map((p, i) => (
              <div key={p.title} className="grid gap-2 py-6 sm:grid-cols-[80px_220px_1fr] sm:gap-8">
                <p className="font-mono text-[11px] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[14.5px] font-semibold text-ink">{p.title}</h3>
                <p className="max-w-[620px] text-[13.5px] leading-[1.75] text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Figma workflow */}
      <section className="border-b border-ink/10 bg-surface">
        <div className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
              Tools — Figma
            </p>
            <h2 className="h-section mt-5 text-ink">From idea to prototype</h2>
            <p className="mt-4 max-w-[560px] text-[14px] leading-[1.8] text-muted">
              Figma is my core design tool: user flows, wireframes, UI, components and clickable
              prototypes live in one file — which makes developer handoff a link, not a meeting.
            </p>
            <Link
              href="/work"
              className="group mt-8 inline-flex items-center gap-2 text-[13.5px] font-medium text-accent transition-colors hover:text-accent-deep"
            >
              See it applied in the work
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <ol className="border-t border-ink/10">
            {figmaWorkflow.map((f, i) => (
              <li key={f.step} className="grid gap-1 border-b border-ink/10 py-5 sm:grid-cols-[56px_1fr] sm:gap-6">
                <p className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{f.step}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{f.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Designing with engineers */}
      <section className="bg-paper">
        <div className="wrap py-20 sm:py-24">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="h-section text-ink">Designing with engineers</h2>
            <p className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint sm:block">
              Developer collaboration
            </p>
          </div>
          <p className="mt-3 max-w-[600px] text-[14px] leading-[1.75] text-muted">
            I have spent years sitting next to frontend teams. Designs are speced as behaviour —
            states, validation, loading, errors — so implementation is a conversation, not an
            argument.
          </p>
          <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {devCollab.map((d, i) => (
              <div
                key={d.title}
                className={cn(
                  "flex h-full flex-col p-6",
                  i === 0 ? "bg-accent-soft" : "bg-surface",
                )}
              >
                <p className="font-mono text-[10.5px] text-accent">0{i + 1}</p>
                <h3 className="mt-2 text-[13.5px] font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-[12px] leading-[1.65] text-muted">{d.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-[640px] text-[13.5px] leading-[1.75] text-muted">
            Where feasible, my designs translate directly into React experiences — which is why I
            also build. See the bridge between design and infrastructure in the{" "}
            <Link href="/engineering" className="font-medium text-accent hover:text-accent-deep">
              engineering section →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
