import type { Metadata } from "next";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { designSkills } from "@/data/skills";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ashwin K — UX/UI designer at Ubona Technologies, designing enterprise digital experiences and learning DevOps and cloud engineering.",
};

export default function AboutPage() {
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="wrap py-16 sm:py-20">
          <Eyebrow index="04">About</Eyebrow>
          <h1 className="h-display mt-5 max-w-[780px] text-ink">
            Who I am,
            <br />
            what I design,
            <br />
            where I&apos;m going.
          </h1>
        </div>
      </header>

      <section className="border-b border-line bg-paper">
        <div className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-6">
              <div>
                <p className="mono-label text-accent">01 · Who I am</p>
                <p className="mt-3 text-[15px] leading-[1.85] text-ink-soft">
                  I&apos;m {site.name}, a {site.uxRole} at {site.company} with roughly three years of
                  professional experience designing enterprise digital products. My work sits where
                  complex business problems meet real users: banking, insurance, fintech,
                  conversational interfaces and operations.
                </p>
              </div>
              <div>
                <p className="mono-label text-accent">02 · What I design</p>
                <p className="mt-3 text-[15px] leading-[1.85] text-ink-soft">
                  Systems and journeys, not screen collections: Visual IVR and conversational UX,
                  financial workflows, dashboards, AI-assisted experiences and design systems. I
                  think in states — loading, error, retry, success — because that is where trust is
                  built.
                </p>
              </div>
              <div>
                <p className="mono-label text-accent">03 · What I&apos;ve worked on</p>
                <p className="mt-3 text-[15px] leading-[1.85] text-ink-soft">
                  Enterprise deployments across financial services and insurance — card journeys,
                  renewals, payments, loans, document workflows, contact-center dashboards and
                  agent-assist tools. Much of it is confidential; this portfolio shows the patterns
                  without the client names.
                </p>
              </div>
              <div>
                <p className="mono-label text-accent">04 · What I&apos;m learning</p>
                <p className="mt-3 text-[15px] leading-[1.85] text-ink-soft">
                  Frontend engineering and DevOps: React and Next.js, Docker, Kubernetes, Helm,
                  Terraform, AWS, CI/CD and monitoring — through real, production-style projects I
                  build, break and debug myself.
                </p>
              </div>
              <div>
                <p className="mono-label text-accent">05 · Where I&apos;m going</p>
                <p className="mt-3 text-[15px] leading-[1.85] text-ink-soft">
                  A designer who understands the user-facing experience and increasingly the
                  engineering systems behind it. The direction is intentional: not abandoning
                  design, but carrying it deeper into the stack.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-5">
              <div className="card-light rounded-xl p-6">
                <p className="mono-label text-faint">Currently</p>
                <div className="mt-3">
                  <p className="text-[16px] font-semibold text-ink">{site.uxRole}</p>
                  <p className="text-[14px] text-muted">{site.company}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-faint">
                    {site.tenure} · verify before publishing
                  </p>
                </div>
                <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                  {experience[0].items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.65] text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {designSkills.map((g) => (
                <div key={g.group} className="card-light rounded-xl p-6">
                  <p className="mono-label text-faint">{g.group}</p>
                  <p className="mt-1 text-[11.5px] text-muted">{g.note}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <Badge key={s} tone="neutral">{s}</Badge>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3">
                <Button href="/resume">View resume</Button>
                <Button href="/contact" variant="outline">Contact</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
