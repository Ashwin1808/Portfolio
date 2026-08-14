// ─────────────────────────────────────────────────────────────
// LANDING — the four-beat homepage: hero, work, now, end.
// ─────────────────────────────────────────────────────────────

export interface Node {
  id: string;
  name: string;
  detail: string;
  angle: number; // degrees, radial layout
}

// Hero signature: one connected system, DESIGN → OBSERVABILITY.
export const heroNodes: Node[] = [
  { id: "design", name: "Design", detail: "Interfaces, flows, intent", angle: 0 },
  { id: "code", name: "Code", detail: "Translating design into logic", angle: 0 },
  { id: "container", name: "Container", detail: "Reproducible application environments", angle: 0 },
  { id: "kubernetes", name: "Kubernetes", detail: "Orchestrating application workloads", angle: 0 },
  { id: "cloud", name: "Cloud", detail: "Infrastructure as code on AWS", angle: 0 },
  { id: "observability", name: "Observability", detail: "Knowing the system is healthy", angle: 0 },
];

// The UX timeline — an editorial horizontal scroller.
export interface UXItem {
  id: string;
  name: string;
  sub: string;
  line: string;
}

export const uxTimeline: UXItem[] = [
  { id: "visual-ivr", name: "Visual IVR", sub: "Conversational UX", line: "Voice + visual journeys" },
  { id: "banking", name: "Banking", sub: "Credit Cards", line: "UPI · Loans · Financial journeys" },
  { id: "insurance", name: "Insurance", sub: "Policy Renewal", line: "Claims · Servicing · Vehicle / Health" },
  { id: "fintech", name: "Fintech", sub: "Payments", line: "Collections · Offers · Onboarding" },
  { id: "enterprise", name: "Enterprise", sub: "Dashboards", line: "Campaigns · Analytics · Operations" },
  { id: "ai", name: "AI + GenAI", sub: "Agent Assist", line: "Smart Suggestions · AI Workflows" },
  { id: "ccaas", name: "CCaaS", sub: "HALO Cloud", line: "Conversational · Agent Experiences" },
  { id: "mobile", name: "Mobile Product", sub: "Flows", line: "Interactions · Prototypes · Design Systems" },
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
  { id: "ui", label: "UI" },
  { id: "code", label: "Code" },
  { id: "container", label: "Container" },
  { id: "system", label: "System" },
];

// Same mindset, different layer.
export const mindset = [
  { ux: "Understand complexity", devops: "Understand systems" },
  { ux: "Design for edge cases", devops: "Design for failure" },
  { ux: "Simplify the experience", devops: "Simplify operations" },
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