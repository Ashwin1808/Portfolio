import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { VisualIVRTeaser } from "@/components/home/VisualIVRTeaser";
import { BridgeSection } from "@/components/home/BridgeSection";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: site.metadata.title,
  description: site.metadata.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Selected work */}
      <section className="border-b border-line bg-paper">
        <div className="wrap py-20 sm:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index="01"
              eyebrow="Selected Work"
              title="Enterprise work, designed as systems"
              intro="Financial workflows, conversational interfaces, dashboards and AI-assisted experiences — built with journeys, states and edge cases in mind."
            />
            <div className="shrink-0">
              <Button href="/work" variant="outline">
                All work
                <ArrowIcon />
              </Button>
            </div>
          </div>
          <div className="mt-12">
            <ProjectGrid limit={6} />
          </div>
        </div>
      </section>

      <VisualIVRTeaser />

      {/* Design process teaser */}
      <section className="border-b border-line bg-paper">
        <div className="wrap py-20 sm:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              index="02"
              eyebrow="How I Design"
              title="Process, not luck"
              intro="Understanding before screens. Structure before polish. States and failure paths designed as first-class citizens."
            />
            <div className="shrink-0">
              <Button href="/process" variant="outline">
                The full process
                <ArrowIcon />
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ["Understand", "Requirements, constraints, goals."],
              ["Define", "The problem in one sentence."],
              ["Structure", "Screens, states and connections."],
              ["Wireframe", "Flow before visual."],
              ["Prototype", "Clickable behaviour, both paths."],
              ["Visual Design", "Hierarchy, type, spacing, components."],
              ["Validate", "Stakeholder feedback, walkthroughs."],
              ["Handoff", "States and components, implementation-ready."],
              ["Iterate", "Design is maintained, not finished."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={Math.min(i * 40, 200)}>
                <Link
                  href="/process"
                  className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-ink/25"
                >
                  <p className="font-mono text-[10.5px] text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-[14.5px] font-semibold text-ink">{title}</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BridgeSection />

      {/* About teaser */}
      <section className="border-b border-line bg-paper">
        <div className="wrap py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <SectionHeading
                index="03"
                eyebrow="About"
                title="I don't just design screens. I design systems, journeys and interactions."
              />
            </div>
            <div className="space-y-5">
              <Reveal>
                <p className="text-[15px] leading-[1.8] text-ink-soft">
                  I&apos;m {site.name}, a {site.uxRole} at {site.company}. For the past few years I&apos;ve
                  designed enterprise digital experiences — Visual IVR, conversational journeys,
                  banking and insurance flows, operational dashboards and AI-assisted tools — where
                  the hardest work is making genuinely complicated workflows feel simple.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p className="text-[15px] leading-[1.8] text-muted">
                  I&apos;m also learning how the systems behind those experiences are built, deployed
                  and operated — frontend, containers, orchestration, infrastructure as code and
                  observability. The transition is intentional: a designer who understands the
                  user-facing experience and increasingly the engineering systems behind it.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button href="/about" variant="outline">
                    More about me
                  </Button>
                  <Button href="/engineering" variant="ghost">
                    Engineering journey →
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-ink text-white">
        <div className="wrap flex flex-col items-start gap-8 py-20 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
                Contact
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-section mt-4 text-white">Let&apos;s build better experiences.</h2>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <div className="flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`} variant="dark" size="lg">
                Email me
              </Button>
              <Button href={site.github} external variant="ghost" size="lg" className="text-white hover:bg-white/10">
                GitHub
              </Button>
              <Button href={site.linkedin} external variant="ghost" size="lg" className="text-white hover:bg-white/10">
                LinkedIn
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
