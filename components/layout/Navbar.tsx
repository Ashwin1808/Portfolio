"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "/work", homeHref: "#work" },
  { label: "About", href: "/about", homeHref: "/about" },
  { label: "Resume", href: "/resume", homeHref: "/resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  const activeFor = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between lg:h-[72px]">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-sm font-mono text-[13px] font-semibold tracking-[0.06em] text-ink transition-colors hover:text-accent"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
          </span>
          ASHWIN&nbsp;K
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={onHome ? l.homeHref : l.href}
              aria-current={!onHome && activeFor(l.href) ? "page" : undefined}
              className={cn(
                "group relative font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                onHome ? "text-ink/60 hover:text-ink" : activeFor(l.href) ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {l.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -bottom-[3px] left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out",
                  !onHome && activeFor(l.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          ))}
          <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
          >
            GitHub<sup className="text-[9px] text-accent">↗</sup>
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
          >
            LinkedIn<sup className="text-[9px] text-accent">↗</sup>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent lg:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            ) : (
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper/95 backdrop-blur-sm lg:hidden">
          <div className="wrap flex flex-col pb-8 pt-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={onHome ? l.homeHref : l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line py-4 text-[16px] font-medium text-ink"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-6 font-mono text-[12px] uppercase tracking-[0.16em]">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}