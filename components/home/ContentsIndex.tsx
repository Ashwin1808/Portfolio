"use client";

import Link from "next/link";

const rows = [
  { index: "01", title: "Work", sub: "What I've designed — enterprise UX, 2023 → now", href: "#work" },
  { index: "02", title: "Transition", sub: "From interfaces to infrastructure", href: "#transition" },
  { index: "03", title: "Currently building", sub: "DevOps / Cloud engineering system", href: "#devops" },
  { index: "04", title: "RideMatch", sub: "The one engineering project — live pipeline", href: "#ridematch" },
  { index: "05", title: "Contact", sub: "Still designing. Still building.", href: "#contact" },
];

/**
 * The contents page — a brutalist index. Scrolling the site is
 * reading an issue: 01 → 05.
 */
export function ContentsIndex() {
  return (
    <section className="border-b border-line bg-paper" aria-label="Contents">
      <div className="wrap py-10">
        <div className="flex items-center justify-between border-b-2 border-ink/15 pb-4">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
            Contents / The index
          </p>
          <p className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-faint">
            01 — 05
          </p>
        </div>

        <div>
          {rows.map((r) => (
            <Link
              key={r.index}
              href={r.href}
              className="group grid grid-cols-12 items-baseline gap-2 border-b border-line py-5 transition-colors hover:bg-accent/10 sm:gap-4"
            >
              <span className="col-span-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint transition-colors group-hover:text-accent sm:col-span-1">
                {r.index}
              </span>
              <span className="col-span-7 font-serif text-[1.4rem] leading-tight tracking-[-0.01em] text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:col-span-6 sm:text-[1.9rem]">
                {r.title}
              </span>
              <span className="col-span-3 hidden font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:col-span-4 sm:block">
                {r.sub}
              </span>
              <span className="col-span-3 text-right font-mono text-[14px] text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent sm:col-span-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}