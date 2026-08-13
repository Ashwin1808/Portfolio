"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M0 1.15C0 .51.52 0 1.17 0h13.66C15.48 0 16 .51 16 1.15v13.7c0 .64-.52 1.15-1.17 1.15H1.17C.52 16 0 15.49 0 14.85V1.15ZM4.74 13.34V6.16H2.3v7.18h2.44ZM3.52 5.2c.85 0 1.38-.56 1.38-1.27-.02-.72-.53-1.27-1.36-1.27S2.16 3.21 2.14 3.93c0 .71.53 1.27 1.38 1.27Zm7.6 8.14v-4.01c0-2.15-1.15-3.15-2.68-3.15-1.24 0-1.79.68-2.1 1.16V6.16H4.2c.03.77 0 7.18 0 7.18h2.44V9.44c0-.22.02-.44.08-.6.18-.44.58-.9 1.26-.9.89 0 1.25.68 1.25 1.67v3.73h2.89Z" />
    </svg>
  );
}

function Logo({ dark }: { dark: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 rounded-md",
        dark ? "text-white" : "text-ink",
      )}
      aria-label={`${site.name} — home`}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg font-mono text-[12px] font-semibold",
          dark ? "bg-cyan text-[#04161c]" : "bg-ink text-white",
        )}
      >
        AK
      </span>
      <span className="hidden text-[15px] font-semibold tracking-[-0.02em] sm:block">
        {site.name}
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const dark = pathname.startsWith("/engineering");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 no-print",
        dark
          ? cn("bg-dark", solid && "border-b border-dark-line")
          : cn("bg-paper", solid && "border-b border-line"),
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "wrap flex h-16 items-center justify-between gap-4 transition-colors",
          dark ? "text-white" : "text-ink",
        )}
      >
        <Logo dark={dark} />

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
                  active
                    ? dark
                      ? "text-white"
                      : "text-ink"
                    : dark
                      ? "text-dark-muted hover:text-white"
                      : "text-muted hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (configure the URL in data/site.ts)"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
              dark ? "text-dark-muted hover:bg-white/5 hover:text-white" : "text-muted hover:bg-ink/5 hover:text-ink",
            )}
          >
            <GithubIcon />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (configure the URL in data/site.ts)"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
              dark ? "text-dark-muted hover:bg-white/5 hover:text-white" : "text-muted hover:bg-ink/5 hover:text-ink",
            )}
          >
            <LinkedinIcon />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-md lg:hidden",
            dark ? "text-white hover:bg-white/5" : "text-ink hover:bg-ink/5",
          )}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden",
            dark ? "border-t border-dark-line bg-dark" : "border-t border-line bg-paper",
          )}
        >
          <div className="wrap flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto py-4">
            {nav.map((item, i) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b py-3.5 text-[15px] font-medium",
                    i === nav.length - 1 && "border-b-0",
                    dark
                      ? active
                        ? "border-dark-line text-white"
                        : "border-dark-line text-dark-muted"
                      : active
                        ? "border-line text-ink"
                        : "border-line text-muted",
                  )}
                >
                  {item.label}
                  <span className={cn("font-mono text-[11px]", dark ? "text-dark-faint" : "text-faint")}>
                    0{i + 1}
                  </span>
                </Link>
              );
            })}
            <div className="flex gap-3 pt-5">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium",
                  dark ? "border-dark-line text-white" : "border-line-strong text-ink",
                )}
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium",
                  dark ? "border-dark-line text-white" : "border-line-strong text-ink",
                )}
              >
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
