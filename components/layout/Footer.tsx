"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Footer() {
  const pathname = usePathname();
  const dark = pathname.startsWith("/engineering");

  return (
    <footer
      className={cn(
        "no-print border-t",
        dark ? "border-white/10 bg-dark" : "border-ink/10 bg-paper",
      )}
    >
      <div className={cn("wrap py-14", dark ? "text-white" : "text-ink")}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-mono text-[15px] font-semibold tracking-[0.02em]">ASHWIN K</p>
            <p className={cn("mt-2 text-[13px]", dark ? "text-dark-muted" : "text-muted")}>
              UX/UI Designer → DevOps / Cloud Engineering
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex flex-col gap-2.5">
              <p className={cn("font-mono text-[10.5px] uppercase tracking-[0.18em]", dark ? "text-white/35" : "text-ink/35")}>
                Site
              </p>
              <Link href="/work" className={cn("text-[13px]", dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink")}>
                Work
              </Link>
              <Link href="/about" className={cn("text-[13px]", dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink")}>
                About
              </Link>
              <Link href="/engineering" className={cn("text-[13px]", dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink")}>
                Now — engineering
              </Link>
              <Link href="/resume" className={cn("text-[13px]", dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink")}>
                Resume
              </Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className={cn("font-mono text-[10.5px] uppercase tracking-[0.18em]", dark ? "text-white/35" : "text-ink/35")}>
                Elsewhere
              </p>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={cn("text-[13px]", dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink")}>
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={cn("text-[13px]", dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink")}>
                LinkedIn
              </a>
              <a href={`mailto:${site.email}`} className={cn("text-[13px]", dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink")}>
                Email
              </a>
            </div>
          </div>
        </div>
        <div className={cn("mt-12 flex flex-col gap-2 border-t pt-6 font-mono text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between", dark ? "border-white/10 text-white/35" : "border-ink/10 text-ink/35")}>
          <span>Designing experiences. Engineering systems.</span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}