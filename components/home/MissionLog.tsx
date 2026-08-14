"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

/**
 * [06] MISSION LOG — GitHub activity as telemetry. Fetches public
 * repositories live; falls back to a quiet offline state.
 */
export function MissionLog() {
  const [repos, setRepos] = useState<Repo[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${site.githubUsername}/repos?sort=updated&per_page=8`, {
      signal: controller.signal,
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Repo[]) => setRepos(data))
      .catch(() => setRepos([]));
    return () => controller.abort();
  }, []);

  return (
    <section id="log" className="relative overflow-hidden border-b border-line">
      <div className="wrap py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              06 — Mission log
            </p>
            <h2 className="h-giant mt-6 text-ink">
              GitHub,
              <br />
              <em className="italic text-accent">live telemetry.</em>
            </h2>
          </div>
          <div className="max-w-[360px] lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <p className="text-[13.5px] leading-[1.85] text-muted">
              Public repositories, straight from the source — no gallery, no
              clone. The record of what&apos;s being built right now.
            </p>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] text-accent transition-colors hover:text-ink"
            >
              {site.github.replace("https://", "")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </a>
          </div>
        </div>

        {/* telemetry rows */}
        <div className="mt-16 border-t border-line-strong">
          {repos === null && (
            <div className="flex items-center gap-3 border-b border-line py-6 font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
              Acquiring telemetry…
            </div>
          )}

          {repos !== null && repos.length === 0 && (
            <div className="flex flex-col gap-6 border-b border-line py-6 md:flex-row md:items-center md:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
                Telemetry offline — the mission log lives on GitHub
              </p>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-accent hover:text-ink">
                Open GitHub ↗
              </a>
            </div>
          )}

          {repos?.map((r, i) => (
            <a
              key={r.name}
              href={`https://github.com/${site.githubUsername}/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-12 items-baseline gap-3 border-b border-line py-5 transition-colors hover:bg-accent/[0.04] sm:gap-4"
            >
              <span className="col-span-2 font-serif text-[1.2rem] leading-none text-faint transition-colors group-hover:text-accent sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="col-span-10 font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-ink transition-transform duration-300 group-hover:translate-x-1 sm:col-span-4">
                {r.name.replace(/-/g, " ")}
              </span>
              <span className="col-span-6 hidden overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-muted md:col-span-4 md:block">
                {r.description ?? "—"}
              </span>
              <span className="col-span-4 hidden font-mono text-[9.5px] uppercase tracking-[0.16em] md:col-span-2 md:block">
                {r.language ?? "—"}
              </span>
              <span className="col-span-2 hidden text-right font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint md:block">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}