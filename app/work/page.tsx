import type { Metadata } from "next";
import { ProjectGrid } from "@/components/work/ProjectGrid";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Enterprise UX/UI projects — Visual IVR, fintech, banking, insurance, dashboards and AI-assisted experiences. Confidential work is anonymised.",
};

export default function WorkPage() {
  return (
    <div>
      <header className="border-b border-line bg-surface">
        <div className="wrap py-16 sm:py-20">
          <Eyebrow index="01">Work</Eyebrow>
          <h1 className="h-display mt-5 max-w-[720px] text-ink">
            Complex workflows,
            <br />
            designed to feel simple.
          </h1>
          <p className="mt-5 max-w-[600px] text-[15px] leading-[1.75] text-muted">
            Visual IVR and conversational experiences, banking and insurance journeys, operational
            dashboards, AI-assisted tools and enterprise products. Projects marked confidential are
            anonymised by design — client names stay out of this portfolio.
          </p>
          <p className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.14em] text-faint">
            Filter by category — every project is a system, not a screen dump
          </p>
        </div>
      </header>
      <div className="wrap py-14 sm:py-16">
        <ProjectGrid />
      </div>
    </div>
  );
}
