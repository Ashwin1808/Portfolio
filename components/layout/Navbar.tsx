"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Journey", href: "/process" },
  { label: "Now", href: "/engineering" },
  { label: "Resume", href: "/resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-sm">
      <nav aria-label="Main" className="wrap flex h-14 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-sm font-mono text-[13px] font-semibold tracking-[0.06em] text-ink transition-colors hover:text-accent"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
          </span>
          ASHWIN&nbsp;K
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                isActive(l.href) ? "text-ink" : "text-muted hover:text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
          <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
          >
            GitHub ↗
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
          >
            LinkedIn ↗
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
        <div id="mobile-menu" className="border-t border-line bg-paper lg:hidden">
          <div className="wrap flex flex-col pb-8 pt-2">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-line py-4 text-[16px] font-medium",
                  isActive(l.href) ? "text-ink" : "text-muted",
                )}
              >
                {l.label}
                <span className="font-mono text-[10.5px] text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
            <div className="mt-6 flex gap-6 font-mono text-[12px] uppercase tracking-[0.16em]">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                LinkedIn ↗
              </a>
              <a href={`mailto:${site.email}`} className="text-muted hover:text-ink">
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
