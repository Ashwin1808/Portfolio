// ─────────────────────────────────────────────────────────────
// JOURNEY — hero signature visual: UX → DevOps, stage by stage.
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// TRANSITION — scroll 02: interfaces → infrastructure.
// The same object transforms DESIGN → CODE → CONTAINER →
// ORCHESTRATION → CLOUD → OBSERVABILITY as you scroll.
// ─────────────────────────────────────────────────────────────

export interface TransitionStage {
  id: string;
  label: string;
  note: string;
  side: "ux" | "devops";
}

export const transitionStages: TransitionStage[] = [
  { id: "design", label: "Design", note: "Interfaces, flows, intent", side: "ux" },
  { id: "code", label: "Code", note: "Translating design to logic", side: "devops" },
  { id: "container", label: "Container", note: "Packaging what runs", side: "devops" },
  { id: "orchestration", label: "Orchestration", note: "Scale, scheduling, resilience", side: "devops" },
  { id: "cloud", label: "Cloud", note: "Infrastructure as code", side: "devops" },
  { id: "observability", label: "Observability", note: "Knowing it is healthy", side: "devops" },
];

// ─────────────────────────────────────────────────────────────
// STACK — scroll 05: the engineering stack as a system.
// ─────────────────────────────────────────────────────────────

export interface StackNode {
  id: string;
  name: string;
  detail: string;
  angle: number; // degrees on the radial layout
}

export const stackNodes: StackNode[] = [
  { id: "linux", name: "Linux", detail: "The foundation — files, processes, permissions.", angle: -112 },
  { id: "docker", name: "Docker", detail: "Reproducible environments for every service.", angle: -67 },
  { id: "kubernetes", name: "Kubernetes", detail: "Orchestration: scale, scheduling, self-healing.", angle: -22 },
  { id: "terraform", name: "Terraform", detail: "Infrastructure as code — declarative, reviewable.", angle: 22 },
  { id: "aws", name: "AWS", detail: "Cloud: compute, network, identity, storage.", angle: 67 },
  { id: "ci-cd", name: "CI / CD", detail: "Automated builds and delivery, every change.", angle: 112 },
  { id: "prometheus", name: "Prometheus", detail: "Metrics that tell you what is happening.", angle: 157 },
  { id: "grafana", name: "Grafana", detail: "Dashboards that make metrics visible.", angle: -157 },
];

// ─────────────────────────────────────────────────────────────
// RIDEMATCH — scroll 06: architecture + delivery pipeline.
// ─────────────────────────────────────────────────────────────

export interface ArchNode {
  id: string;
  label: string;
  detail: string;
}

export const rideMatchArchitecture: ArchNode[] = [
  { id: "user", label: "User", detail: "The rider and the driver — where the journey starts." },
  { id: "frontend", label: "Frontend", detail: "Interface — the thing I used to design." },
  { id: "api", label: "API", detail: "Business logic — rides, matching, pricing." },
  { id: "database", label: "Database", detail: "The system of record for every request." },
  { id: "docker", label: "Docker", detail: "Each service packaged as a container." },
  { id: "kubernetes", label: "Kubernetes", detail: "Runs the cluster — scaling and recovery." },
  { id: "aws", label: "AWS", detail: "Cloud: compute, network, identity." },
  { id: "monitoring", label: "Monitoring", detail: "Prometheus + Grafana — health, metrics, alerts." },
];

export interface PipelineStage {
  node: string;
  tool: string;
  detail: string;
  id: "code" | "github" | "cicd" | "docker" | "registry" | "kubernetes" | "aws" | "prometheus" | "grafana";
}

export const rideMatchPipeline: PipelineStage[] = [
  { node: "Code", tool: "VS Code", detail: "Where everything starts — versioned, reviewed, reproducible.", id: "code" },
  { node: "GitHub", tool: "Version Control", detail: "The source of truth for code and configuration.", id: "github" },
  { node: "CI / CD", tool: "GitHub Actions", detail: "Automated builds, tests and delivery — no laptop dependency.", id: "cicd" },
  { node: "Docker", tool: "Containerize", detail: "Packaging the application into reproducible containers.", id: "docker" },
  { node: "Registry", tool: "Image Registry", detail: "Where built images are stored and versioned.", id: "registry" },
  { node: "Kubernetes", tool: "Orchestrate", detail: "Orchestrating workloads and managing deployments.", id: "kubernetes" },
  { node: "AWS", tool: "Infrastructure", detail: "Cloud infrastructure — network, compute and identity.", id: "aws" },
  { node: "Prometheus", tool: "Metrics", detail: "Collecting metrics from the running system.", id: "prometheus" },
  { node: "Grafana", tool: "Visualize", detail: "Dashboards, alerts and insight after deploy.", id: "grafana" },
];

// ─────────────────────────────────────────────────────────────
// LEARNING — scroll 07: short statements, no cards.
// ─────────────────────────────────────────────────────────────

export interface LearningItem {
  id: string;
  term: string;
  line: string;
}

export const learningItems: LearningItem[] = [
  { id: "linux", term: "Linux", line: "Mastering the shell, systemd, permissions and process management — the operating system as the first interface." },
  { id: "docker", term: "Docker", line: "Packaging applications so they run identically on a laptop and in a cluster." },
  { id: "kubernetes", term: "Kubernetes", line: "Orchestration at scale — deployments, services, probes, self-healing." },
  { id: "terraform", term: "Terraform", line: "Describing infrastructure as reviewable, versioned code." },
  { id: "cicd", term: "CI / CD", line: "Automating the path from commit to running container." },
  { id: "monitoring", term: "Monitoring", line: "Prometheus and Grafana — making system health visible." },
];

// ─────────────────────────────────────────────────────────────
// FAILURE — scroll 08: what UX taught me about systems.
// ─────────────────────────────────────────────────────────────

export interface FailureState {
  id: string;
  label: string;
}

export const uxFailureStates: FailureState[] = [
  { id: "loading", label: "Loading" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
  { id: "retry", label: "Retry" },
  { id: "success", label: "Success" },
];

export const devopsFailureStates: FailureState[] = [
  { id: "failure", label: "Failure" },
  { id: "health", label: "Health" },
  { id: "logs", label: "Logs" },
  { id: "alerts", label: "Alerts" },
  { id: "recovery", label: "Recovery" },
  { id: "rollback", label: "Rollback" },
];
