"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
];

function NavLink({
  href,
  label,
  active,
  onClick,
  external,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  external?: boolean;
}) {
  const cls =
    "group relative font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink";
  const content = (
    <>
      {label}
      {external && <sup className="text-[8px] text-accent">↗</sup>}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-[5px] left-0 h-[2px] w-full bg-accent transition-transform duration-300 ease-out",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined} className={cls}>
      {content}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["work", "transition", "devops", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const pageActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const workActive = pageActive("/work") || (pathname === "/" && section === "work");
  const aboutActive = pageActive("/about");
  const resumeActive = pageActive("/resume");

  return (
    <header className="no-print sticky top-0 z-50 border-b-2 border-ink/15 bg-paper">
      {/* reading progress — the frame's signal line */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-accent"
      />

      <nav aria-label="Main" className="wrap relative flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-sm font-mono text-[14px] font-bold tracking-[0.08em] text-ink transition-colors hover:text-accent"
        >
          <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
          ASHWIN&nbsp;K
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              active={
                l.href === "/work" ? workActive : l.href === "/about" ? aboutActive : resumeActive
              }
            />
          ))}
          <span className="h-4 w-px bg-ink/20" aria-hidden="true" />
          <NavLink href={site.github} label="GitHub" external />
          <NavLink href={site.linkedin} label="LinkedIn" external />
          <span className="h-4 w-px bg-ink/20" aria-hidden="true" />
          <div className="flex items-center gap-2" title="Open to work">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
              Open to work
            </span>
          </div>
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
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            ) : (
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper lg:hidden">
          <div className="wrap flex flex-col pb-8 pt-2">
            {navLinks.map((l, i) => {
              const active =
                l.href === "/work" ? workActive : l.href === "/about" ? aboutActive : resumeActive;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-line py-4 text-[16px] font-medium",
                    active ? "text-ink" : "text-muted",
                  )}
                >
                  {l.label}
                  <span className="font-mono text-[10.5px] text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}
            <div className="mt-6 flex items-center gap-6 font-mono text-[12px] uppercase tracking-[0.16em]">
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
            <div className="mt-8 flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Open to work
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}