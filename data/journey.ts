// ─────────────────────────────────────────────────────────────
// THE CONTENT — the work (UX experience), the build (DevOps),
// the pipeline, and the same mindset on both sides.
// ─────────────────────────────────────────────────────────────

export interface Node {
  id: string;
  name: string;
  detail: string;
}

export interface UXItem {
  id: string;
  name: string;
  sub: string;
  line: string;
}

// The front of the sheet — the index of design experience.
export const uxTimeline: UXItem[] = [
  { id: "visual-ivr", name: "Visual IVR", sub: "Conversational UX", line: "Voice + visual journeys" },
  { id: "banking", name: "Banking", sub: "Cards · UPI · Loans", line: "Credit and UPI financial journeys" },
  { id: "insurance", name: "Insurance", sub: "Renewal · Claims · Servicing", line: "Vehicle and health cover, end to end" },
  { id: "fintech", name: "Fintech", sub: "Payments · Collections · Onboarding", line: "Money moving without friction" },
  { id: "enterprise", name: "Enterprise", sub: "Dashboards · Campaigns · Operations", line: "Tools people live in all day" },
  { id: "ai", name: "AI + GenAI", sub: "Agent Assist · Smart Suggestions", line: "AI-assisted workflows" },
  { id: "ccaas", name: "CCaaS", sub: "HALO Cloud · Conversational Products", line: "Conversational and agent experiences" },
  { id: "mobile", name: "Mobile", sub: "Flows · Interaction · Prototyping", line: "Design systems for small screens" },
];

// The back of the sheet — the engineering ledger.
export const stackNodes: Node[] = [
  { id: "linux", name: "Linux", detail: "The foundation — files, processes, permissions." },
  { id: "docker", name: "Docker", detail: "Containerizing applications." },
  { id: "kubernetes", name: "Kubernetes", detail: "Orchestrating workloads." },
  { id: "terraform", name: "Terraform", detail: "Infrastructure as code." },
  { id: "aws", name: "AWS", detail: "Cloud infrastructure." },
  { id: "ci-cd", name: "CI / CD", detail: "Automated delivery." },
  { id: "prometheus", name: "Prometheus", detail: "Metrics and observability." },
  { id: "grafana", name: "Grafana", detail: "Dashboards that make metrics visible." },
];

// RideMatch architecture — the pipeline, application to monitoring.
export interface PipelineStage {
  node: string;
  tool: string;
  id: "code" | "github" | "cicd" | "docker" | "kubernetes" | "aws" | "monitoring";
}

export const rideMatchPipeline: PipelineStage[] = [
  { node: "Code", tool: "react · next.js", id: "code" },
  { node: "GitHub", tool: "version control", id: "github" },
  { node: "CI/CD", tool: "automated delivery", id: "cicd" },
  { node: "Docker", tool: "containers", id: "docker" },
  { node: "Kubernetes", tool: "orchestration", id: "kubernetes" },
  { node: "AWS", tool: "cloud infrastructure", id: "aws" },
  { node: "Monitoring", tool: "prometheus · grafana", id: "monitoring" },
];

// The same row, seen from the front of the sheet (design)
// and the back of the sheet (system).
export const mindset = [
  { ux: "Understand people", devops: "Understand systems", uxNote: "research · empathy · context", opsNote: "uptime · health · observability" },
  { ux: "Design journeys", devops: "Design workflows", uxNote: "flows · states · delight", opsNote: "pipelines · stages · retries" },
  { ux: "Handle edge cases", devops: "Handle failure", uxNote: "empty states · errors · 404s", opsNote: "chaos drills · rollbacks · fallbacks" },
  { ux: "Simplify complexity", devops: "Simplify operations", uxNote: "cut clutter · one clear path", opsNote: "reduce toil · automate" },
];