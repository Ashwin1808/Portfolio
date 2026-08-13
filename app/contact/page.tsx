import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ashwin K — email, LinkedIn and GitHub.",
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
    note: "Preferred for work inquiries",
  },
  {
    label: "LinkedIn",
    value: site.linkedin.replace("https://", ""),
    href: site.linkedin,
    external: true,
    note: "Professional network",
  },
  {
    label: "GitHub",
    value: site.github.replace("https://", ""),
    href: site.github,
    external: true,
    note: "Code, projects, infrastructure",
  },
];

export default function ContactPage() {
  return (
    <div>
      <header className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-28">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
            05 — Contact
          </p>
          <h1 className="h-giant mt-7 max-w-[860px] text-ink">
            Let&apos;s build better
            <br />
            experiences.
          </h1>
          <p className="mt-7 max-w-[560px] text-[14.5px] leading-[1.8] text-muted">
            Open to conversations about product design, enterprise UX, and DevOps / cloud roles.
            Direct links — no fake contact form that silently drops your message.
          </p>
        </div>
      </header>

      <section className="border-b border-ink/10 bg-paper">
        <div className="wrap py-16 sm:py-20">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group grid gap-1 py-7 sm:grid-cols-[140px_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                  {c.label}
                </p>
                <p className="text-[15px] font-semibold break-all text-ink transition-colors group-hover:text-accent">
                  {c.value}
                </p>
                <p className="text-[12.5px] text-muted sm:text-right">
                  {c.note}{" "}
                  <span className="inline-block font-mono text-[11px] text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </p>
              </a>
            ))}
          </div>

          <div className="mt-14 max-w-[720px] border-l-2 border-accent pl-6">
            <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">
              Two halves, one person
            </p>
            <p className="mt-2 text-[13.5px] leading-[1.8] text-muted">
              If you are here from the design side — the engineering work lives at{" "}
              <Link href="/engineering" className="font-medium text-accent hover:text-accent-deep">
                /engineering
              </Link>
              . If you found the DevOps side first — the design story is at{" "}
              <Link href="/work" className="font-medium text-accent hover:text-accent-deep">
                /work
              </Link>
              . Both are the same way of thinking.
            </p>
          </div>

          <Link
            href="/resume"
            className="group mt-10 inline-flex items-center gap-2 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
          >
            View resume
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
