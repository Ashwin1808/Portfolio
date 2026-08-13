// ─────────────────────────────────────────────────────────────
// JOURNEY — the hero signature visual: UX → DevOps, stage by stage.
// ─────────────────────────────────────────────────────────────

export interface JourneyStage {
  index: string;
  label: string;
  sub: string;
  // Icons are rendered as inline SVG by stage.id
  id: "user" | "interface" | "application" | "container" | "orchestration" | "cloud" | "observability";
}

export const journeyStages: JourneyStage[] = [
  { index: "01", label: "User", sub: "Where every journey starts", id: "user" },
  { index: "02", label: "Interface", sub: "Designing what people touch", id: "interface" },
  { index: "03", label: "Application", sub: "Designing what runs", id: "application" },
  { index: "04", label: "Container", sub: "Reproducible environments", id: "container" },
  { index: "05", label: "Orchestration", sub: "Kubernetes — managing scale", id: "orchestration" },
  { index: "06", label: "Cloud", sub: "AWS infrastructure as code", id: "cloud" },
  { index: "07", label: "Observability", sub: "Knowing it is healthy", id: "observability" },
];

// ─────────────────────────────────────────────────────────────
// PIPELINE — the Currently Building section.
// ─────────────────────────────────────────────────────────────

export interface PipelineStage {
  node: string;
  tool: string;
  detail: string;
  id: "code" | "github" | "cicd" | "docker" | "kubernetes" | "aws" | "monitoring";
}

export const rideMatchPipeline: PipelineStage[] = [
  { node: "Code", tool: "VS Code", detail: "Where everything starts — versioned, reviewed, reproducible.", id: "code" },
  { node: "GitHub", tool: "Version Control", detail: "The source of truth for code and configuration.", id: "github" },
  { node: "CI / CD", tool: "GitHub Actions", detail: "Automated builds, tests and delivery — no laptop dependency.", id: "cicd" },
  { node: "Docker", tool: "Containerize", detail: "Packaging the application into reproducible containers.", id: "docker" },
  { node: "Kubernetes", tool: "Orchestrate", detail: "Orchestrating workloads and managing deployments.", id: "kubernetes" },
  { node: "AWS", tool: "Infrastructure", detail: "Cloud infrastructure — network, compute and identity.", id: "aws" },
  { node: "Monitoring", tool: "Prometheus / Grafana", detail: "Metrics, dashboards and alerts after the deploy.", id: "monitoring" },
];
