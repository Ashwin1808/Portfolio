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
        dark ? "border-dark-line bg-dark" : "border-line bg-paper",
      )}
    >
      <div
        className={cn(
          "wrap flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div className="flex flex-col gap-1.5">
          <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", dark ? "text-dark-faint" : "text-faint")}>
            {site.footer.line}
          </p>
          <p className={cn("text-[15px] font-medium", dark ? "text-white" : "text-ink")}>
            {site.name} · {site.role}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px]">
          <Link href="/work" className={dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink"}>
            Work
          </Link>
          <Link href="/engineering" className={dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink"}>
            Engineering
          </Link>
          <Link href="/about" className={dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink"}>
            About
          </Link>
          <Link href="/resume" className={dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink"}>
            Resume
          </Link>
          <a href={`mailto:${site.email}`} className={dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink"}>
            Email
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink"}
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink"}
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className={cn("border-t", dark ? "border-dark-line" : "border-line")}>
        <div
          className={cn(
            "wrap flex flex-col gap-1 py-4 font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between",
            dark ? "text-dark-faint" : "text-faint",
          )}
        >
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designing experiences · Engineering systems</span>
        </div>
      </div>
    </footer>
  );
}
