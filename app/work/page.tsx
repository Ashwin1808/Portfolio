import type { Metadata } from "next";
import { ProjectGrid } from "@/components/work/ProjectGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Enterprise UX/UI projects — Visual IVR, fintech, banking, insurance, dashboards and AI-assisted experiences. Confidential work is anonymised.",
};

export default function WorkPage() {
  return (
    <div>
      <header className="border-b border-ink/10 bg-paper">
        <div className="wrap py-20 sm:py-28">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-accent">
            01 — Work
          </p>
          <h1 className="h-giant mt-7 max-w-[780px] text-ink">
            Complex workflows,
            <br />
            designed to feel simple.
          </h1>
          <p className="mt-6 max-w-[560px] text-[14.5px] leading-[1.75] text-muted">
            Visual IVR and conversational experiences, banking and insurance journeys, operational
            dashboards, AI-assisted tools and enterprise products. Confidential work stays
            anonymised by design.
          </p>
        </div>
      </header>
      <div className="wrap py-16">
        <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
          Filter by category
        </p>
        <ProjectGrid />
      </div>
    </div>
  );
}
