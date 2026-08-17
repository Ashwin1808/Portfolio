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

/** The header — quiet. A signature on the left, four plain words on the right. */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  const activeFor = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const linkCls =
    "font-mono text-[11px] uppercase tracking-[0.18em] text-cream/75 transition-colors duration-200 hover:text-cream";

  return (
    <header
      className="no-print fixed inset-x-0 top-0 z-50"
      style={{
        background:
          "linear-gradient(to bottom, rgba(10,8,7,0.6) 0%, rgba(10,8,7,0.28) 55%, rgba(10,8,7,0) 100%)",
      }}
    >
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between lg:h-[72px]">
        <Link
          href="/"
          className="font-serif text-[19px] leading-none tracking-[0.01em] text-cream transition-colors hover:text-cream/80"
        >
          Ashwin&nbsp;K
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={onHome ? l.homeHref : l.href}
              aria-current={!onHome && activeFor(l.href) ? "page" : undefined}
              className={cn(linkCls, !onHome && activeFor(l.href) && "text-cream")}
            >
              {l.label}
            </Link>
          ))}
          <span className="h-3.5 w-px bg-cream/20" aria-hidden="true" />
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
          className="flex h-9 w-9 items-center justify-center text-cream lg:hidden"
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
        <div id="mobile-menu" className="lg:hidden" style={{ background: "rgba(10,8,7,0.96)" }}>
          <div className="wrap flex flex-col pb-8 pt-2">
            {links.map((l) => (
              <Link
                key={l.label}
                href={onHome ? l.homeHref : l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-cream/10 py-4 font-mono text-[14px] uppercase tracking-[0.2em] text-cream"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-6 flex items-center gap-6 font-mono text-[12px] uppercase tracking-[0.16em] text-cream/70">
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                GitHub ↗
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}