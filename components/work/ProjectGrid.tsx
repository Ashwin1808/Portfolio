"use client";

import { useState } from "react";
import { categories, projects, type Category } from "@/data/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function ProjectGrid({ limit }: { limit?: number }) {
  const [active, setActive] = useState<Category | "all">("all");

  const visible = projects
    .filter((p) => active === "all" || p.category === active)
    .slice(0, limit);

  return (
    <div>
      {!limit && (
        <div
          role="group"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap gap-2"
        >
          {categories.map((c) => {
            const selected = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-line-strong bg-surface text-muted hover:border-ink/40 hover:text-ink",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i * 60, 240)}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
