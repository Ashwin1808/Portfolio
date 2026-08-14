// ─────────────────────────────────────────────────────────────
// LANDING — the four-part homepage: hero, experience, now, end.
// ─────────────────────────────────────────────────────────────

export interface Node {
  id: string;
  name: string;
  detail: string;
  angle: number; // degrees, radial layouts
}

// Hero signature: one connected system, USER → OBSERVABILITY.
export const heroNodes: Node[] = [
  { id: "user", name: "User", detail: "Where every journey starts", angle: 0 },
  { id: "design", name: "Design", detail: "Interfaces, flows, intent", angle: 0 },
  { id: "code", name: "Code", detail: "Translating design into logic", angle: 0 },
  { id: "container", name: "Container", detail: "Reproducible application environments", angle: 0 },
  { id: "kubernetes", name: "Kubernetes", detail: "Orchestrating application workloads", angle: 0 },
  { id: "cloud", name: "Cloud", detail: "Infrastructure as code on AWS", angle: 0 },
  { id: "observability", name: "Observability", detail: "Knowing the system is healthy", angle: 0 },
];

// Experience constellation — what I've designed, ten seconds.
export const uxDomains: Node[] = [
  { id: "visual-ivr", name: "Visual IVR", detail: "Conversational UX", angle: 0 },
  { id: "fintech", name: "Fintech", detail: "Credit cards · UPI · Loans", angle: 60 },
  { id: "insurance", name: "Insurance", detail: "Renewal · Claims · Policy journeys", angle: 120 },
  { id: "enterprise", name: "Enterprise", detail: "Dashboards · Campaigns · Operations", angle: 180 },
  { id: "ai", name: "AI", detail: "Agent Assist · GenAI · Smart Suggestions", angle: 240 },
  { id: "ccaas", name: "CCaaS", detail: "HALO Cloud · Conversational products", angle: 300 },
];

// DevOps constellation — what I'm building now.
export const stackNodes: Node[] = [
  { id: "linux", name: "Linux", detail: "The foundation — files, processes, permissions.", angle: -112 },
  { id: "docker", name: "Docker", detail: "Reproducible application environments.", angle: -67 },
  { id: "kubernetes", name: "Kubernetes", detail: "Container orchestration.", angle: -22 },
  { id: "terraform", name: "Terraform", detail: "Infrastructure as code.", angle: 22 },
  { id: "aws", name: "AWS", detail: "Cloud: compute, network, identity.", angle: 67 },
  { id: "ci-cd", name: "CI / CD", detail: "Automated builds and delivery.", angle: 112 },
  { id: "prometheus", name: "Prometheus", detail: "System and application metrics.", angle: 157 },
  { id: "grafana", name: "Grafana", detail: "Dashboards that make metrics visible.", angle: -157 },
];

// RideMatch delivery pipeline — one thin line, one moving signal.
export interface PipelineStage {
  node: string;
  tool: string;
  detail: string;
  id: "code" | "github" | "cicd" | "docker" | "kubernetes" | "aws" | "monitoring";
}

export const rideMatchPipeline: PipelineStage[] = [
  { node: "Code", tool: "VS Code", detail: "Where everything starts — versioned, reviewed.", id: "code" },
  { node: "GitHub", tool: "Version Control", detail: "The source of truth for code and config.", id: "github" },
  { node: "CI / CD", tool: "Actions", detail: "Automated builds and tests, every change.", id: "cicd" },
  { node: "Docker", tool: "Containerize", detail: "Reproducible application environments.", id: "docker" },
  { node: "Kubernetes", tool: "Orchestrate", detail: "Container orchestration.", id: "kubernetes" },
  { node: "AWS", tool: "Infrastructure", detail: "Cloud infrastructure as code.", id: "aws" },
  { node: "Monitoring", tool: "Prom / Grafana", detail: "System and application metrics.", id: "monitoring" },
];

// Transition strip — tiny, typographic.
export const transitionStrip = [
  { id: "ui", label: "UI" },
  { id: "code", label: "Code" },
  { id: "container", label: "Container" },
  { id: "system", label: "System" },
];

// The mindset — UX on the left, DevOps on the right, same shape.
export const mindset = [
  { ux: "Understand the user", devops: "Understand the system" },
  { ux: "Design the journey", devops: "Automate the workflow" },
  { ux: "Handle edge cases", devops: "Handle failure" },
  { ux: "Simplify complexity", devops: "Simplify operations" },
];

export interface JourneyStage {
  index: string;
  label: string;
  sub: string;
  id: "user" | "interface" | "code" | "container" | "kubernetes" | "cloud" | "observability";
}

export const journeyStages: JourneyStage[] = [
  { index: "01", label: "User", sub: "Where every journey starts", id: "user" },
  { index: "02", label: "Interface", sub: "Designing what people touch", id: "interface" },
  { index: "03", label: "Code", sub: "Designing what runs", id: "code" },
  { index: "04", label: "Container", sub: "Reproducible environments", id: "container" },
  { index: "05", label: "Kubernetes", sub: "Managing scale and failure", id: "kubernetes" },
  { index: "06", label: "Cloud", sub: "AWS infrastructure as code", id: "cloud" },
  { index: "07", label: "Observability", sub: "Knowing it is healthy", id: "observability" },
];
