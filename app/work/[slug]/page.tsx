import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { caseStudies, miniCaseStudies } from "@/data/case-studies";
import { CaseStudyShell } from "@/components/work/CaseStudyShell";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((p) => p.level >= 2)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Case study" };
  return {
    title: `Case study — ${project.title}`,
    description: project.blurb,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const cs = caseStudies[slug] ?? miniCaseStudies[slug];
  if (!project || !cs) notFound();
  return <CaseStudyShell slug={slug} />;
}
