"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Work", href: "#missions" },
  { label: "Lab", href: "#lab" },
  { label: "About", href: "#origin" },
  { label: "Contact", href: "#transmission" },
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
      {external && <sup className="text-[9px] text-accent">↗</sup>}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-[3px] left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out",
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
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setScrolled(v > 0.02));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["origin", "missions", "stack", "designlab", "lab", "log", "transmission"];
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

  const target = section?.replace("#", "") ?? "";
  const workActive =
    pathname === "/work" || target === "missions" || target === "stack" || target === "designlab";
  const labActive = target === "lab" || target === "log";
  const aboutActive = pathname === "/about" || target === "origin";
  const contactActive = pathname === "/contact" || target === "transmission";

  return (
    <header className="no-print sticky top-0 z-50">
      {/* scroll progress hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 z-10 h-[2px] origin-left bg-accent"
      />

      {/* soft scrim — appears only after you scroll */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: "linear-gradient(to bottom, rgba(20,18,15,0.92) 0%, rgba(20,18,15,0.5) 55%, transparent 100%)",
        }}
      />

      <nav
        aria-label="Main"
        className={cn(
          "wrap relative flex h-16 items-center justify-between transition-all duration-500 lg:h-[72px]",
          scrolled && "border-b border-line/60",
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-sm font-mono text-[13px] font-semibold tracking-[0.06em] text-ink transition-colors hover:text-accent"
        >
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent/60 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
          </span>
          ASHWIN&nbsp;K
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              active={
                l.href === "#missions"
                  ? workActive
                  : l.href === "#lab"
                    ? labActive
                    : l.href === "#origin"
                      ? aboutActive
                      : contactActive
              }
            />
          ))}
          <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
          <NavLink href={site.github} label="GitHub" external />
          <NavLink href={site.linkedin} label="LinkedIn" external />
          <span className="h-3.5 w-px bg-line-strong" aria-hidden="true" />
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
            {navLinks.map((l, i) => {
              const active =
                l.href === "#missions"
                  ? workActive
                  : l.href === "#lab"
                    ? labActive
                    : l.href === "#origin"
                      ? aboutActive
                      : contactActive;
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
