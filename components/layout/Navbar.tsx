"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Now", href: "/engineering" },
  { label: "Resume", href: "/resume" },
];

export function Navbar() {
  const pathname = usePathname();
  const dark = pathname.startsWith("/engineering");
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
    <header
      className={cn(
        "sticky top-0 z-50 no-print",
        dark ? "bg-dark" : "bg-paper/85 backdrop-blur-sm",
        open && (dark ? "bg-dark" : "bg-paper"),
      )}
    >
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between">
        <Link
          href="/"
          className={cn(
            "rounded-sm font-mono text-[14px] font-semibold tracking-[0.02em]",
            dark ? "text-white" : "text-ink",
          )}
        >
          ASHWIN&nbsp;K
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={cn(
                "text-[13px] font-medium transition-colors",
                isActive(l.href)
                  ? dark
                    ? "text-white"
                    : "text-ink"
                  : dark
                    ? "text-dark-muted hover:text-white"
                    : "text-muted hover:text-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
          <span className={cn("h-4 w-px", dark ? "bg-white/15" : "bg-ink/15")} aria-hidden="true" />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-mono text-[12px] transition-colors",
              dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink",
            )}
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "font-mono text-[12px] transition-colors",
              dark ? "text-dark-muted hover:text-white" : "text-muted hover:text-ink",
            )}
          >
            LinkedIn
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "flex h-10 w-10 items-center justify-center md:hidden",
            dark ? "text-white" : "text-ink",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className={cn("md:hidden", dark ? "bg-dark" : "bg-paper")}
        >
          <div className="wrap flex flex-col pb-8">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b py-4 text-[17px] font-medium",
                  dark
                    ? isActive(l.href)
                      ? "border-white/10 text-white"
                      : "border-white/10 text-dark-muted"
                    : isActive(l.href)
                      ? "border-ink/10 text-ink"
                      : "border-ink/10 text-muted",
                )}
              >
                {l.label}
                <span className={cn("font-mono text-[11px]", dark ? "text-white/30" : "text-ink/30")}>
                  0{i + 1}
                </span>
              </Link>
            ))}
            <div className="mt-6 flex gap-6 font-mono text-[13px]">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className={dark ? "text-dark-muted" : "text-muted"}>
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={dark ? "text-dark-muted" : "text-muted"}>
                LinkedIn ↗
              </a>
              <a href={`mailto:${site.email}`} className={dark ? "text-dark-muted" : "text-muted"}>
                Email
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
