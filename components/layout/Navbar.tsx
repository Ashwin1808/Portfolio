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

/**
 * The sheet's edge running along the top of the page.
 * mix-blend-difference: the header reads dark on the cream front
 * and cream on the dark back — no state tracking needed.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  const activeFor = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkCls =
    "font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-opacity duration-200 hover:opacity-60";

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50 mix-blend-difference">
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between lg:h-[72px]">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-mono text-[13px] font-semibold tracking-[0.06em] text-white"
        >
          <span className="inline-block h-[9px] w-[9px] bg-white transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
          ASHWIN&nbsp;K
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={onHome ? l.homeHref : l.href}
              aria-current={!onHome && activeFor(l.href) ? "page" : undefined}
              className={cn(linkCls, !onHome && activeFor(l.href) && "opacity-100 underline decoration-1 underline-offset-4")}
            >
              {l.label}
            </Link>
          ))}
          <span className="h-3.5 w-px bg-white/40" aria-hidden="true" />
          <a href={site.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
            GitHub<sup className="text-[9px]">↗</sup>
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
            LinkedIn<sup className="text-[9px]">↗</sup>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 items-center justify-center text-white lg:hidden"
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
        <div id="mobile-menu" className="border-t border-white/10 bg-sheet lg:hidden">
          <div className="wrap flex flex-col pb-8 pt-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={onHome ? l.homeHref : l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/10 py-4 font-mono text-[14px] uppercase tracking-[0.2em] text-cream"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-6 font-mono text-[12px] uppercase tracking-[0.16em] text-cream/70">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}