import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { designSkills } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ashwin K — UX/UI designer at Ubona Technologies, designing enterprise digital experiences and learning DevOps and cloud engineering.",
};

const sections = [
  {
    n: "01",
    label: "Who I am",
    body: "I'm a UX/UI Designer at Ubona Technologies, designing enterprise digital products across banking, insurance, fintech, conversational interfaces and operations. My work sits where complex business problems meet real users.",
  },
  {
    n: "02",
    label: "What I design",
    body: "Systems and journeys, not screen collections: Visual IVR and conversational UX, financial workflows, dashboards, AI-assisted experiences and design systems. I think in states — loading, error, retry, success — because that is where trust is built.",
  },
  {
    n: "03",
    label: "What I've worked on",
    body: "Enterprise deployments across financial services and insurance — card journeys, renewals, payments, loans, document workflows, contact-center dashboards and agent-assist tools. Much of it is confidential; this portfolio shows the patterns without the client names.",
  },
  {
    n: "04",
    label: "What I'm learning",
    body: "Frontend engineering and DevOps: React and Next.js, Docker, Kubernetes, Helm, Terraform, AWS, CI/CD and monitoring — through real, production-style projects I build, break and debug myself.",
  },
  {
    n: "05",
    label: "Where I'm going",
    body: "A designer who understands the user-facing experience and increasingly the engineering systems behind it. The direction is intentional: not abandoning design, but carrying it deeper into the stack.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <header className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-28">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
            04 — About
          </p>
          <h1 className="h-giant mt-7 max-w-[860px] text-ink">
            Who I am,
            <br />
            what I design,
            <br />
            where I&apos;m going.
          </h1>
          <p className="mt-7 max-w-[580px] text-[14.5px] leading-[1.8] text-muted">
            {site.footer.line} That sentence is the portfolio in one line — the rest of this page
            is the detail behind it.
          </p>
        </div>
      </header>

      <section className="border-b border-ink/10 bg-paper">
        <div className="wrap py-16 sm:py-20">
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {sections.map((s) => (
              <div key={s.n} className="grid gap-3 py-8 sm:grid-cols-[80px_1fr] sm:gap-8">
                <p className="font-mono text-[11px] text-accent">{s.n}</p>
                <div>
                  <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                    {s.label}
                  </h2>
                  <p className="mt-2.5 max-w-[640px] text-[14px] leading-[1.8] text-muted">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/10 bg-surface">
        <div className="wrap grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-faint">
              Currently
            </p>
            <div className="mt-5 border-t border-ink/10 pt-5">
              <p className="text-[18px] font-semibold tracking-[-0.01em] text-ink">
                {site.uxRole}
              </p>
              <p className="mt-1 text-[13.5px] text-muted">{site.company}</p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-faint">
                {site.tenure}
              </p>
            </div>
            <ul className="mt-6 space-y-3">
              {experience[0].items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13.5px] leading-[1.7] text-muted">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-faint">
              Skills
            </p>
            <div className="mt-5 border-t border-ink/10">
              {designSkills.map((g) => (
                <div key={g.group} className="grid gap-1.5 border-b border-ink/10 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <div>
                    <p className="text-[13.5px] font-semibold text-ink">{g.group}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-faint">{g.note}</p>
                  </div>
                  <p className="text-[12.5px] leading-[1.8] text-muted">
                    {g.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="wrap flex flex-wrap items-center gap-6 border-t border-ink/10 py-8">
          <Link
            href="/resume"
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-accent transition-colors hover:text-accent-deep"
          >
            View resume
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
          >
            Contact
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
