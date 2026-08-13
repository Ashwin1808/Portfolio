import { devopsPrinciples, uxDevopsOverlap, engineeringNotes } from "@/data/experience";
import { ridematch } from "@/data/engineering";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { site as siteConfig } from "@/data/site";

export function PrinciplesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {devopsPrinciples.map((p, i) => (
        <Reveal key={p.title} delay={Math.min(i * 40, 200)}>
          <div className="h-full rounded-xl border border-dark-line bg-dark-surface p-6">
            <p className="font-mono text-[10.5px] text-cyan">
              {String(i + 1).padStart(2, "0")} / 07
            </p>
            <h3 className="mt-3 text-[14.5px] font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-[12.5px] leading-[1.7] text-dark-muted">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function OverlapDiagram() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr]">
      <Reveal>
        <div className="h-full rounded-xl border border-dark-line bg-dark-surface p-6">
          <p className="mono-label text-dark-muted">UX taught me</p>
          <ul className="mt-4 space-y-2.5">
            {uxDevopsOverlap.ux.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-[13px] text-dark-muted">
                <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={100} className="flex items-stretch">
        <div className="mx-auto flex w-full max-w-[220px] flex-col justify-center gap-2 rounded-xl border border-cyan/40 bg-cyan/[0.07] p-6 text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-cyan">
            Overlap
          </p>
          <ul className="mt-2 space-y-2">
            {uxDevopsOverlap.shared.map((s) => (
              <li key={s} className="text-[12px] font-medium text-white">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={160}>
        <div className="h-full rounded-xl border border-dark-line bg-dark-surface p-6">
          <p className="mono-label text-dark-muted">Engineering requires</p>
          <ul className="mt-4 space-y-2.5">
            {uxDevopsOverlap.devops.map((s) => (
              <li key={s} className="flex items-center gap-2.5 text-[13px] text-dark-muted">
                <span className="h-1 w-1 rounded-full bg-cyan/50" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

export function NotesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {engineeringNotes.map((n, i) => (
        <Reveal key={n.slug} delay={Math.min(i * 40, 160)}>
          <article className="flex h-full flex-col rounded-xl border border-dark-line bg-dark-surface p-6 transition-colors hover:border-cyan/30">
            <div className="flex items-center justify-between">
              <Badge tone="dark">Draft</Badge>
              <span className="font-mono text-[10px] text-dark-faint">notes / {n.slug}</span>
            </div>
            <h3 className="mt-4 text-[14px] font-semibold leading-snug text-white">{n.title}</h3>
            <p className="mt-2 flex-1 text-[12px] leading-[1.65] text-dark-muted">{n.summary}</p>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dark-faint">
              Coming soon
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function RepoGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ridematch.repos.map((r, i) => (
        <Reveal key={r.name} delay={Math.min(i * 40, 160)}>
          <article className="flex h-full flex-col rounded-xl border border-dark-line bg-dark-surface p-6 transition-colors hover:border-cyan/30">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[13px] font-semibold text-cyan">{r.name}</p>
              <span className="h-3 w-3 rounded-full border border-dark-line" aria-hidden="true" />
            </div>
            <p className="mt-3 flex-1 text-[12.5px] leading-[1.7] text-dark-muted">
              {r.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <span key={t} className="rounded-md border border-dark-line bg-dark-elevated px-2 py-0.5 font-mono text-[10px] text-dark-muted">
                  {t}
                </span>
              ))}
            </div>
            <a
              href={`${siteConfig.github}/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white transition-colors hover:text-cyan"
            >
              View on GitHub ↗
            </a>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
