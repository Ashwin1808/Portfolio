import { engineeringJourney, learningLabs, troubleshootingScenarios } from "@/data/experience";
import { ridematch } from "@/data/engineering";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function JourneyTimeline() {
  return (
    <div>
      <div className="relative space-y-0">
        {engineeringJourney.map((j, i) => (
          <Reveal key={j.step} delay={Math.min(i * 30, 150)}>
            <div className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 font-mono text-[10px] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {i < engineeringJourney.length - 1 && (
                  <span className="w-px flex-1 bg-dark-line" aria-hidden="true" />
                )}
              </div>
              <div className="pb-6">
                <p className="text-[14.5px] font-semibold text-white">{j.step}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-dark-muted">{j.note}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function LearningLabs() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {learningLabs.map((l, i) => (
        <Reveal key={l.title} delay={Math.min(i * 40, 160)}>
          <div className="h-full rounded-xl border border-dark-line bg-dark-surface p-6">
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-cyan">
                Lab {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="text-[14.5px] font-semibold text-white">{l.title}</h3>
            </div>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="mono-label text-dark-faint">Problem</dt>
                <dd className="mt-1 text-[12.5px] leading-relaxed text-dark-muted">{l.problem}</dd>
              </div>
              <div>
                <dt className="mono-label text-dark-faint">What I learned</dt>
                <dd className="mt-1 text-[12.5px] leading-relaxed text-dark-muted">{l.learned}</dd>
              </div>
              <div>
                <dt className="mono-label text-cyan">How I solved it</dt>
                <dd className="mt-1 text-[12.5px] leading-relaxed text-dark-muted">{l.solution}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function TroubleshootingGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {troubleshootingScenarios.map((t, i) => (
        <Reveal key={t.title} delay={Math.min(i * 40, 160)}>
          <article className="h-full rounded-xl border border-dark-line bg-dark-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-[15px] font-semibold text-white">{t.title}</h3>
              <Badge tone="cyan">{t.tag}</Badge>
            </div>
            <p className="mt-4 mono-label text-dark-faint">Symptoms</p>
            <ul className="mt-2 space-y-1.5">
              {t.symptoms.map((s) => (
                <li key={s} className="flex items-start gap-2 text-[12.5px] text-dark-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warn" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 mono-label text-dark-faint">Investigation</p>
            <ul className="mt-2 space-y-1.5">
              {t.investigation.map((s) => (
                <li key={s} className="flex items-start gap-2 font-mono text-[11.5px] text-cyan">
                  <span className="mt-0.5" aria-hidden="true">$</span>
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-4 mono-label text-ok">Resolution</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-dark-muted">{t.resolution}</p>
            <p className="mt-3 border-t border-dark-line pt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dark-faint">
              Learning scenario — not a production incident
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function RideMatchStory() {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {ridematch.story.map((s, i) => (
          <div key={s.stage} className="flex items-center">
            <div
              className={cn(
                "rounded-lg border px-3.5 py-2.5",
                i === 0
                  ? "border-cyan/50 bg-cyan/10"
                  : "border-dark-line bg-dark-surface",
              )}
            >
              <p className={cn("text-[12.5px] font-semibold", i === 0 ? "text-cyan" : "text-white")}>
                {s.stage}
              </p>
              <p className="mt-0.5 max-w-[200px] text-[10.5px] leading-snug text-dark-muted">
                {s.note}
              </p>
            </div>
            {i < ridematch.story.length - 1 && (
              <svg viewBox="0 0 24 24" className="mx-1 h-4 w-4 shrink-0 text-dark-faint" fill="none" aria-hidden="true">
                <path d="M4 12h14m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 overflow-x-auto no-scrollbar">
        <div className="flex min-w-max flex-wrap gap-4">
          {ridematch.capabilities.map((c) => (
            <span
              key={c}
              className="rounded-lg border border-dark-line bg-dark-surface px-3.5 py-2 text-[12px] text-dark-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
