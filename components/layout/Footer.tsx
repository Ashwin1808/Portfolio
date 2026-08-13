import Link from "next/link";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="no-print border-t border-line bg-paper">
      <div className="wrap py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="flex items-center gap-2 font-mono text-[14px] font-semibold tracking-[0.06em] text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              ASHWIN K
            </p>
            <p className="mt-2 text-[13px] text-muted">
              UX/UI Designer → DevOps / Cloud Engineering
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11px] uppercase tracking-[0.18em]">
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
              GitHub ↗
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">
              LinkedIn ↗
            </a>
            <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-ink">
              Email ↗
            </a>
            <Link href="/resume" className="text-muted transition-colors hover:text-ink">
              Resume ↗
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>Designing experiences. Engineering systems.</span>
          <span>© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
