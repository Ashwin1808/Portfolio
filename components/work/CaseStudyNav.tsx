import { caseStudies } from "@/data/case-studies";
import { getProject } from "@/data/projects";

export function CaseStudyNav({ slug }: { slug: string }) {
  const cs = caseStudies[slug];
  if (!cs) return null;

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "context", label: "Context" },
    { id: "journey", label: "Journey" },
    { id: "decisions", label: "UX Decisions" },
    { id: "interaction", label: "Interaction" },
    { id: "edge-cases", label: "Edge Cases" },
    { id: "screens", label: "Screens" },
    { id: "learnings", label: "Learnings" },
  ].filter((s) => {
    if (s.id === "screens" && cs.screens.length === 0) return false;
    if (s.id === "edge-cases" && cs.edgeCases.length === 0) return false;
    return true;
  });

  const project = getProject(slug);
  const next = cs.nextSlug ? getProject(cs.nextSlug) : null;

  return { sections, project, next };
}
