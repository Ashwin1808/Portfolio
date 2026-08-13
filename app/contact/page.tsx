import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ashwin K — email, LinkedIn and GitHub.",
};

export default function ContactPage() {
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="wrap py-16 sm:py-20">
          <Eyebrow index="05">Contact</Eyebrow>
          <h1 className="h-display mt-5 max-w-[760px] text-ink">
            Let&apos;s build better experiences.
          </h1>
          <p className="mt-5 max-w-[560px] text-[15px] leading-[1.75] text-muted">
            Open to conversations about product design, enterprise UX, and DevOps / cloud roles.
            Direct links — no fake contact form that silently drops your message.
          </p>
        </div>
      </header>

      <section className="bg-paper">
        <div className="wrap py-16 sm:py-20">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                label: "Email",
                value: site.email,
                href: `mailto:${site.email}`,
                external: false,
                note: "Prefered for work inquiries",
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
            ].map((c, i) => (
              <Reveal key={c.label} delay={Math.min(i * 60, 180)}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="card-light flex h-full flex-col rounded-xl p-6 transition-all hover:-translate-y-0.5 hover:border-ink/25"
                >
                  <p className="mono-label text-accent">{c.label}</p>
                  <p className="mt-3 break-all text-[15px] font-semibold text-ink">{c.value}</p>
                  <p className="mt-2 text-[12.5px] text-muted">{c.note}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
                    Open {c.label} ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="card-light max-w-[720px] rounded-xl border-l-4 border-l-accent p-6">
              <p className="text-[14.5px] font-semibold text-ink">Two halves, one person</p>
              <p className="mt-2 text-[13.5px] leading-[1.75] text-muted">
                If you are here from the design side — the engineering work lives at{" "}
                <a href="/engineering" className="font-medium text-accent hover:text-accent-deep">
                  /engineering
                </a>
                . If you found the DevOps side first — the design story is at{" "}
                <Link href="/work" className="font-medium text-accent hover:text-accent-deep">
                  /work
                </Link>
                . Both are the same way of thinking.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-10">
            <Button href="/resume" variant="outline">
              View resume
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
