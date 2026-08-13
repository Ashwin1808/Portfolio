import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, miniCaseStudies, type CaseStudy } from "@/data/case-studies";
import { categoryLabel, getProject } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { FlowSteps } from "@/components/shared/FlowSteps";
import { ScreenCard } from "@/components/work/ScreenCard";
import { StickyNav } from "@/components/work/StickyNav";

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-line py-12 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div>
          <Eyebrow index={eyebrow}>{title}</Eyebrow>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card-light rounded-lg p-5">{children}</div>;
}

export function CaseStudyShell({ slug }: { slug: string }) {
  const cs: CaseStudy | undefined = caseStudies[slug] ?? miniCaseStudies[slug];
  if (!cs) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const next = cs.nextSlug ? getProject(cs.nextSlug) : null;

  const hasInteractions = (cs.interactions?.length ?? 0) > 0;
  const hasLearnings = (cs.learnings?.length ?? 0) > 0;

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "context", label: "Context" },
    { id: "journey", label: "Journey" },
    { id: "decisions", label: "UX Decisions" },
    { id: "interaction", label: "Interaction" },
    { id: "edge-cases", label: "Edge Cases" },
    { id: "screens", label: "Screens" },
    { id: "learnings", label: "Learnings" },
  ].filter((s) => {
    if (s.id === "screens" && cs.screens.length === 0) return false;
    if (s.id === "edge-cases" && cs.edgeCases.length === 0) return false;
    if (s.id === "interaction" && !hasInteractions) return false;
    if (s.id === "learnings" && !hasLearnings) return false;
    return true;
  });

  return (
    <article>
      {/* Header */}
      <header className="border-b border-line bg-paper">
        <div className="wrap py-14 sm:py-20">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <Badge tone="accent">{categoryLabel(project.category)}</Badge>
            {project.confidential && <Badge tone="neutral">Confidential</Badge>}
            {project.flagship && <Badge tone="ok">Flagship</Badge>}
          </div>
          <h1 className="h-display max-w-[760px] text-ink">{project.title}</h1>
          <p className="mt-5 max-w-[640px] text-[15.5px] leading-[1.75] text-muted">
            {project.blurb}
          </p>
          <div className="mt-7 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="mono-label text-faint">Client</p>
              <p className="mt-1.5 text-[14px] font-medium text-ink">{cs.clientDisplay}</p>
            </div>
            <div>
              <p className="mono-label text-faint">Role</p>
              <p className="mt-1.5 text-[14px] font-medium text-ink">{project.role}</p>
            </div>
            <div>
              <p className="mono-label text-faint">Platform</p>
              <p className="mt-1.5 text-[14px] font-medium text-ink">{project.platform.join(" · ")}</p>
            </div>
          </div>
          {project.confidential && (
            <p className="mt-6 rounded-lg border border-warn/30 bg-warn/5 px-4 py-3 text-[12.5px] leading-relaxed text-ink-soft">
              <span className="font-semibold text-warn">Confidentiality:</span>{" "}
              {cs.confidentialityNote}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Badge key={t} tone="neutral">{t}</Badge>
            ))}
          </div>
        </div>
      </header>

      <StickyNav items={navItems} />

      <div className="wrap">
        <Section id="overview" eyebrow="01" title="Overview">
          <p className="max-w-[680px] text-[15px] leading-[1.8] text-ink-soft">{cs.overview}</p>
        </Section>

        <Section id="context" eyebrow="02" title="Context">
          <p className="max-w-[680px] text-[15px] leading-[1.8] text-ink-soft">{cs.context}</p>
        </Section>

        <Section id="journey" eyebrow="03" title="User Journey">
          <div>
            <p className="mb-6 max-w-[680px] text-[14px] leading-[1.75] text-muted">
              {cs.journeyTitle}
            </p>
            <FlowSteps steps={cs.journey} />
          </div>
        </Section>

        <Section id="decisions" eyebrow="04" title="UX Decisions">
          <div className="grid gap-4 sm:grid-cols-2">
            {cs.decisions.map((d, i) => (
              <Card key={i}>
                <p className="flex items-start gap-3 text-[14.5px] font-semibold text-ink">
                  <span className="mt-0.5 font-mono text-[11px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {d.title}
                </p>
                <p className="mt-2.5 text-[13.5px] leading-[1.7] text-muted">{d.body}</p>
              </Card>
            ))}
          </div>
        </Section>

        {hasInteractions && (
          <Section id="interaction" eyebrow="05" title="Interaction Design">
            <p className="mb-6 max-w-[680px] text-[14px] leading-[1.75] text-muted">
              States, transitions and behaviour — not just the happy path.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(cs.interactions ?? []).map((it, i) => (
                <Card key={i}>
                  <p className="text-[14px] font-semibold text-ink">{it.title}</p>
                  <p className="mt-2 text-[13px] leading-[1.7] text-muted">{it.body}</p>
                </Card>
              ))}
            </div>
          </Section>
        )}

        <Section id="edge-cases" eyebrow="06" title="Edge Cases">
          <p className="mb-6 max-w-[680px] text-[14px] leading-[1.75] text-muted">
            Good UX is what happens when things go wrong. Each case: the problem, the user-facing
            message and the recovery action.
          </p>
          <div className="grid gap-4 lg:grid-cols-2">
            {cs.edgeCases.map((e, i) => (
              <Card key={i}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[14px] font-semibold text-ink">{e.state}</p>
                  <Badge tone="warn">Edge case</Badge>
                </div>
                <p className="mt-2 text-[13px] leading-[1.7] text-muted">{e.problem}</p>
                <div className="mt-3 rounded-lg border border-line bg-paper px-3.5 py-2.5">
                  <p className="font-mono text-[12px] text-ink-soft">&ldquo;{e.copy}&rdquo;</p>
                </div>
                <p className="mt-3 text-[12.5px] leading-[1.65] text-muted">
                  <span className="font-semibold text-ok">Recovery:</span> {e.recovery}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        {cs.microcopy && cs.microcopy.length > 0 && (
          <Section id="microcopy" eyebrow="06b" title="Microcopy">
            <p className="mb-6 max-w-[680px] text-[14px] leading-[1.75] text-muted">
              UX copy exploration — before / after / why. These are proposed directions, not
              necessarily shipped copy.
            </p>
            <div className="space-y-4">
              {cs.microcopy.map((m, i) => (
                <Card key={i}>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div>
                      <p className="mono-label text-faint">Before</p>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted line-through decoration-danger/40">
                        {m.before}
                      </p>
                    </div>
                    <div>
                      <p className="mono-label text-ok">After</p>
                      <p className="mt-2 text-[13.5px] font-medium leading-relaxed text-ink">
                        {m.after}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 border-t border-line pt-3 text-[12.5px] leading-[1.7] text-muted">
                    <span className="font-semibold text-ink">Why:</span> {m.why}
                  </p>
                </Card>
              ))}
            </div>
          </Section>
        )}

        {cs.screens.length > 0 && (
          <Section id="screens" eyebrow="07" title="Final Experience">
            <div className="grid gap-8 md:grid-cols-2">
              {cs.screens.map((s, i) => (
                <ScreenCard key={i} screen={s} priority={i === 0} />
              ))}
            </div>
            {cs.prototypeUrl && (
              <div className="mt-8 rounded-xl border border-accent/25 bg-accent-soft p-5">
                <p className="text-[14px] font-semibold text-ink">Prototype</p>
                <p className="mt-1 text-[13px] text-muted">
                  A clickable prototype is available for this project.
                </p>
                <Button href={cs.prototypeUrl} external className="mt-3" size="sm">
                  Open prototype
                </Button>
              </div>
            )}
          </Section>
        )}

        {hasLearnings && (
          <Section id="learnings" eyebrow="08" title="Learnings">
            <ul className="max-w-[680px] space-y-3">
              {(cs.learnings ?? []).map((l, i) => (
                <li key={i} className="flex items-start gap-3 text-[14.5px] leading-[1.7] text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>

      {/* Footer nav */}
      <div className="border-t border-line bg-surface">
        <div className="wrap flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mono-label text-faint">Next case study</p>
            {next ? (
              <p className="mt-1 text-[15px] font-semibold text-ink">{next.title}</p>
            ) : (
              <p className="mt-1 text-[15px] font-semibold text-ink">Back to all work</p>
            )}
          </div>
          <div className="flex gap-3">
            <Button href="/work" variant="outline" size="md">
              All work
            </Button>
            {next && (
              <Button href={`/work/${next.slug}`} size="md">
                Next case study
                <ArrowIcon />
              </Button>
            )}
          </div>
        </div>
        <div className="border-t border-line py-6">
          <p className="wrap font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            <Link href="/work" className="hover:text-ink">← /work</Link> · case study · {project.slug}
          </p>
        </div>
      </div>
    </article>
  );
}
