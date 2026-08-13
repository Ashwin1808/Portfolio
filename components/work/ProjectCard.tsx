import Link from "next/link";
import { categoryLabel, type Project } from "@/data/projects";
import { Tag } from "@/components/ui/Badge";
import { ArrowIcon } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function ConfidentialNote({ confidential }: { confidential: boolean }) {
  if (!confidential) return null;
  return (
    <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
      Confidential — client anonymised
    </p>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const hasPage = project.level >= 2;
  const inner = (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-all duration-200",
        hasPage && "hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_10px_30px_-18px_rgba(23,23,28,0.35)]",
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-accent">
          {categoryLabel(project.category)}
        </p>
        <ConfidentialNote confidential={project.confidential} />
      </div>

      <h3 className="h-card text-ink">{project.title}</h3>
      <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.65] text-muted">{project.blurb}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
          <span>{project.platform.join(" · ")}</span>
        </div>
        {hasPage && (
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors group-hover:text-accent">
            View case study
            <ArrowIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </article>
  );

  if (!hasPage) {
    return <div className="h-full">{inner}</div>;
  }
  return (
    <Link href={`/work/${project.slug}`} className="block h-full rounded-xl">
      {inner}
    </Link>
  );
}
