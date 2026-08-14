// ─────────────────────────────────────────────────────────────
// LANDING — hero, work, now, end.
// ─────────────────────────────────────────────────────────────

export interface Node {
  id: string;
  name: string;
  detail: string;
  angle: number; // degrees, radial layout
}

// The UX timeline — an editorial horizontal scroller.
export interface UXItem {
  id: string;
  name: string;
  sub: string;
  line: string;
}

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

// The DevOps system — center DEVOPS, eight orbiting nodes.
export const stackNodes: Node[] = [
  { id: "linux", name: "Linux", detail: "The foundation — files, processes, permissions.", angle: -112 },
  { id: "docker", name: "Docker", detail: "Containerizing applications.", angle: -67 },
  { id: "kubernetes", name: "Kubernetes", detail: "Orchestrating workloads.", angle: -22 },
  { id: "terraform", name: "Terraform", detail: "Infrastructure as code.", angle: 22 },
  { id: "aws", name: "AWS", detail: "Cloud infrastructure.", angle: 67 },
  { id: "ci-cd", name: "CI / CD", detail: "Automating build and deployment.", angle: 112 },
  { id: "prometheus", name: "Prometheus", detail: "Metrics and observability.", angle: 157 },
  { id: "grafana", name: "Grafana", detail: "Dashboards that make metrics visible.", angle: -157 },
];

// RideMatch pipeline — one thin line, one moving signal.
export interface PipelineStage {
  node: string;
  tool: string;
  detail: string;
  id: "code" | "github" | "cicd" | "docker" | "kubernetes" | "aws" | "monitoring";
}

export const rideMatchPipeline: PipelineStage[] = [
  { node: "Code", tool: "development", detail: "Application development.", id: "code" },
  { node: "GitHub", tool: "version control", detail: "Version control.", id: "github" },
  { node: "CI / CD", tool: "automation", detail: "Automated build and deployment.", id: "cicd" },
  { node: "Docker", tool: "containers", detail: "Containerization.", id: "docker" },
  { node: "Kubernetes", tool: "orchestration", detail: "Workload orchestration.", id: "kubernetes" },
  { node: "AWS", tool: "cloud", detail: "Cloud infrastructure.", id: "aws" },
  { node: "Monitoring", tool: "prom / grafana", detail: "Prometheus + Grafana.", id: "monitoring" },
];

// Pivot strip — quiet, typographic.
export const transitionStrip = [
  { id: "frame", label: "Frame" },
  { id: "component", label: "Component" },
  { id: "code", label: "Code" },
  { id: "container", label: "Container" },
  { id: "service", label: "Service" },
  { id: "infrastructure", label: "Infrastructure" },
];

// V12 — CLOUDLINE. Layers of a digital system, from human to observability.
export const systemLayers = [
  { name: "HUMAN", tint: "text-ink/80", depth: 220 },
  { name: "EXPERIENCE", tint: "text-violet/90", depth: -60 },
  { name: "APPLICATION", tint: "text-ink/60", depth: -340 },
  { name: "SERVICES", tint: "text-ink/60", depth: -620 },
  { name: "CONTAINER", tint: "text-ink/70", depth: -900 },
  { name: "ORCHESTRATION", tint: "text-ink/60", depth: -1180 },
  { name: "CLOUD", tint: "text-cyan/90", depth: -1460 },
  { name: "OBSERVABILITY", tint: "text-accent/90", depth: -1740 },
];

// Same mindset, different layer.
export const mindset = [
  { ux: "Understand people", devops: "Understand systems" },
  { ux: "Design journeys", devops: "Design for failure" },
  { ux: "Handle edge cases", devops: "Handle recovery" },
];