// ─────────────────────────────────────────────────────────────
// EXPERIENCE & JOURNEY — keep honest. Edit the period to match
// your actual tenure before publishing.
// ─────────────────────────────────────────────────────────────

import { site } from "./site";

export const experience = [
  {
    role: site.uxRole,
    company: site.company,
    period: site.tenure, // ← verify
    summary:
      "Enterprise UX/UI design across Visual IVR, conversational experiences, banking, insurance, fintech, dashboards and AI-assisted workflows.",
    items: [
      "Designed Visual IVR journeys that combine voice prompts with on-screen interfaces for self-service.",
      "Worked across financial-services and insurance journeys: credit card activation and onboarding, policy renewal, UPI payments, loans and document collection.",
      "Designed enterprise dashboards — omni-channel operations, campaign management and agent-assist workspaces.",
      "Designed AI-assisted experiences: agent suggestions and GenAI 'Ask Me' conversations.",
      "Built and maintained reusable component and state libraries for consistent, fast delivery.",
      "Collaborated closely with frontend engineers on implementation feasibility, responsive behaviour and API-driven states.",
    ],
  },
];

export const engineeringJourney = [
  { step: "UX/UI Design", note: "Professional experience designing enterprise digital products." },
  { step: "Application Development", note: "Built real applications to understand what design ships into." },
  { step: "Docker", note: "Containerised applications; learned images, networks, volumes and compose." },
  { step: "Kubernetes", note: "Deployments, services, health probes, rolling updates and troubleshooting." },
  { step: "Helm", note: "Packaged and templated deployments into reproducible charts." },
  { step: "Terraform", note: "Provisioned AWS infrastructure as code — VPC, EC2, security groups, IAM." },
  { step: "AWS", note: "EC2, VPC, IAM, S3, load balancing, CloudWatch and EKS concepts." },
  { step: "CI/CD", note: "GitHub Actions and Jenkins pipelines that build, test and deploy." },
  { step: "Observability", note: "Prometheus, Grafana and Alertmanager — metrics, dashboards, alerts." },
];

export const devopsPrinciples = [
  {
    title: "Understand the system before automating it",
    body: "Automation that encodes a misunderstanding just fails faster. Learn the flow first, then script it.",
  },
  {
    title: "Automate repetitive work",
    body: "If a task happens twice in the same way, it is a script waiting to be written.",
  },
  {
    title: "Make infrastructure reproducible",
    body: "The same code must produce the same environment — that is what makes environments boring, which is good.",
  },
  {
    title: "Treat configuration as code",
    body: "Versioned, reviewable and testable configuration beats documentation that drifts.",
  },
  {
    title: "Monitor what you deploy",
    body: "Shipping without visibility is guessing. Metrics, logs and alerts come with the deploy.",
  },
  {
    title: "Debug from evidence, not assumptions",
    body: "Read the logs, describe the pod, check the state — then form a hypothesis. Never fix blind.",
  },
  {
    title: "Keep it simple before making it complex",
    body: "Complexity is earned, not chosen. A simpler system is one that is more likely to stay up.",
  },
];

export const uxDevopsOverlap = {
  ux: [
    "User empathy",
    "Information architecture",
    "System thinking",
    "Visual communication",
    "Attention to detail",
    "Simplifying complexity",
    "Collaboration",
    "Asking why",
    "Designing for edge cases",
  ],
  devops: [
    "System thinking",
    "Architecture",
    "Observability",
    "Automation",
    "Troubleshooting",
    "Communication",
    "Reliability",
  ],
  shared: [
    "System thinking",
    "Communication",
    "Attention to detail",
    "Designing for edge cases",
    "Simplifying complexity",
  ],
};

export const learningLabs = [
  {
    title: "Linux troubleshooting",
    problem: "A service stopped responding on a remote server.",
    learned: "Checked systemctl status, journalctl logs, process state and port binding.",
    solution: "Restarted the service, fixed the misconfigured environment variable, verified with curl.",
  },
  {
    title: "Docker networking",
    problem: "Two containers could not reach each other by name.",
    learned: "Bridge networks, container DNS, exposed ports and compose service names.",
    solution: "Placed both services on the same compose network and referenced the service name.",
  },
  {
    title: "Kubernetes troubleshooting",
    problem: "A pod stayed in CrashLoopBackOff after a config change.",
    learned: "Reading kubectl logs and describe, tracing env var injection into the container command.",
    solution: "Fixed the config value, rolled out a new revision, watched the rollout complete.",
  },
  {
    title: "Terraform infrastructure",
    problem: "A plan failed on a VPC resource that already existed.",
    learned: "State vs real infrastructure, import workflows, and why state must be protected.",
    solution: "Imported the existing resource and re-planned with a clean diff.",
  },
  {
    title: "CI/CD pipelines",
    problem: "A build failed only after Docker was introduced.",
    learned: "Build context, layer caching and why the CI environment differs from the laptop.",
    solution: "Fixed the Dockerfile context and added explicit caching steps to the pipeline.",
  },
  {
    title: "Monitoring",
    problem: "No idea if a deployed service was healthy after hours.",
    learned: "Exposing metrics endpoints, scraping with Prometheus, alerting with Alertmanager.",
    solution: "Added health checks, a Grafana dashboard and an alert on sustained failure.",
  },
];

export const troubleshootingScenarios = [
  {
    title: "Pod stuck in CrashLoopBackOff",
    symptoms: ["Container restarts repeatedly", "Pod never reaches Ready"],
    investigation: ["kubectl logs — read the application error", "kubectl describe pod — check events and reason", "Verify env vars and container command", "Check the application's own logs"],
    resolution:
      "Found the misconfigured environment variable, fixed the config, redeployed and watched the rollout.",
    tag: "Kubernetes",
  },
  {
    title: "ImagePullBackOff",
    symptoms: ["Pod cannot start — image pull fails", "Events show ErrImagePull / ImagePullBackOff"],
    investigation: ["kubectl describe pod — read the exact pull error", "Check the image name and tag", "Verify registry credentials and access"],
    resolution:
      "Corrected the image tag and added the missing registry credential to the pull secret.",
    tag: "Kubernetes",
  },
  {
    title: "Service not reaching Pod",
    symptoms: ["DNS resolves but connections time out", "No endpoints for the Service"],
    investigation: ["Service selector vs Pod labels", "kubectl get endpoints", "Port vs targetPort mapping", "Network policy in the way?"],
    resolution: "Matched the selector to the pod labels and corrected the targetPort.",
    tag: "Kubernetes",
  },
  {
    title: "Terraform plan failure",
    symptoms: ["terraform plan errors on an existing resource", "Drift between state and reality"],
    investigation: ["terraform validate for syntax", "terraform plan for the exact error", "Provider config and variables", "State file vs live resources"],
    resolution: "Imported the drifted resource into state and re-planned to a clean diff.",
    tag: "Terraform",
  },
];

export const engineeringNotes = [
  {
    slug: "what-happens-when-a-container-starts",
    title: "What actually happens when a Docker container starts?",
    summary: "Namespaces, cgroups and the runtime path — placeholder.",
    status: "draft" as const,
  },
  {
    slug: "kubernetes-service-vs-deployment",
    title: "Kubernetes Service vs Deployment, explained through RideMatch",
    summary: "When to scale, when to expose, and how the two work together.",
    status: "draft" as const,
  },
  {
    slug: "terraform-vpc-explained",
    title: "Terraform VPC explained in plain words",
    summary: "CIDRs, subnets, route tables and the internet gateway as I learned them.",
    status: "draft" as const,
  },
  {
    slug: "debugging-crashloopbackoff",
    title: "Debugging CrashLoopBackOff without panic",
    summary: "A repeatable investigation order that starts with evidence.",
    status: "draft" as const,
  },
  {
    slug: "github-actions-ci",
    title: "A CI pipeline that actually catches problems",
    summary: "Steps, caches and the failures that made the pipeline better.",
    status: "draft" as const,
  },
  {
    slug: "prometheus-vs-grafana",
    title: "Prometheus vs Grafana — and why you need both",
    summary: "Metrics collection and visualisation are different jobs.",
    status: "draft" as const,
  },
];
