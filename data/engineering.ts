// ─────────────────────────────────────────────────────────────
// RIDEMATCH + DEVOPS PORTFOLIO CONTENT
// Status values are honest: implemented / in-progress / planned.
// ─────────────────────────────────────────────────────────────

export type Status = "implemented" | "in-progress" | "planned";

export const ridematch = {
  slug: "ridematch",
  title: "RideMatch — Production-Style Automotive Platform",
  tagline:
    "An automotive discovery and recommendation platform — and the DevOps learning system built around it.",
  overview:
    "RideMatch started as an application project and became a DevOps learning platform. The focus shifted from making the application work to making its build, deployment, infrastructure and monitoring reproducible: a three-tier application, containerised, orchestrated, automated, provisioned as code and observed.",
  story: [
    { stage: "Application", note: "Three-tier platform: frontend, backend API, PostgreSQL." },
    { stage: "Containerization", note: "Docker images for every service; compose for local runs." },
    { stage: "Orchestration", note: "Kubernetes deployments, services, health probes, rolling updates." },
    { stage: "Automation", note: "CI with GitHub Actions; deployment path through Jenkins and Helm." },
    { stage: "Infrastructure", note: "Terraform provisioning AWS — VPC, subnets, EC2, security groups, IAM." },
    { stage: "Observability", note: "Prometheus metrics, Grafana dashboards, Alertmanager alerts." },
  ],
  capabilities: [
    "Three-tier application architecture",
    "Vehicle discovery, filtering and details",
    "Vehicle comparison",
    "Favorites",
    "Authentication",
    "AI-assisted comparison and recommendations",
    "Pagination and dynamic data",
    "REST API with PostgreSQL",
  ],
  application: {
    heading: "The application",
    body: "RideMatch is an automotive discovery platform with three tiers. The frontend is a React/Next.js experience; the backend is a Node.js REST API; PostgreSQL holds vehicle data, users, favorites and comparison history. Filtering, comparison, authentication and AI-assisted recommendations make it a real application rather than a demo.",
    bullets: [
      "Frontend: React / Next.js",
      "Backend: Node.js REST API",
      "Database: PostgreSQL",
      "AI-assisted vehicle comparison and recommendations",
      "Auth, favorites and pagination",
    ],
  },
  docker: {
    heading: "Docker & Compose",
    body: "Every tier ships as a Docker image. Docker Compose ties the full stack together locally — one command starts the database, API and frontend. Images are built from multi-stage Dockerfiles so the runtime image stays small and free of build tooling.",
    bullets: [
      "Multi-stage Dockerfiles for frontend and backend",
      "Docker Compose for the full local stack",
      "Named volumes for PostgreSQL persistence",
      "Environment configuration through compose",
    ],
  },
  ciCd: {
    heading: "CI / CD",
    body: "GitHub Actions runs the CI: checkout, dependency install, tests, build and Docker image build, then push to a container registry. From there a Jenkins job takes the image and deploys it through Helm to Kubernetes — the build is reproducible from a commit, not from a laptop.",
    bullets: [
      "GitHub Actions: test, build, Docker build, push",
      "Jenkins: deployment pipeline from the registry",
      "Helm chart with versioned releases",
      "Rolling deployment with health-gated updates",
    ],
  },
  kubernetes: {
    heading: "Kubernetes & Helm",
    body: "RideMatch runs on Kubernetes: Deployments manage replicas with health probes, Services expose the API and frontend, ConfigMaps and Secrets separate configuration from code. Helm packages the whole thing into a chart with values per environment, making a release a versioned artifact.",
    bullets: [
      "Deployments with readiness and liveness probes",
      "Services and endpoints for internal routing",
      "ConfigMaps and Secrets for configuration",
      "Rolling updates with rollout status verification",
      "Helm chart with per-environment values",
      "Namespaces to separate environments",
    ],
  },
  terraform: {
    heading: "Terraform & AWS",
    body: "Infrastructure is provisioned as code with Terraform: a VPC with public and private subnet concepts, route tables, an internet gateway, security groups scoped to the minimum, IAM for least privilege and EC2 compute. Variables, outputs and modules keep the configuration organised, and remote state keeps it safe.",
    bullets: [
      "VPC, subnets, route tables, internet gateway",
      "Security groups — explicit, minimal rules",
      "IAM roles and policies",
      "EC2 compute for the stack",
      "Terraform variables, outputs and modules",
      "Remote state concepts",
    ],
  },
  monitoring: {
    heading: "Monitoring",
    body: "Prometheus scrapes application and system metrics; Grafana visualises them on dashboards; Alertmanager routes alerts. The question the stack answers: is RideMatch healthy right now — and did anything change in the last hour?",
    bullets: [
      "Prometheus — metrics collection",
      "Grafana — dashboards and graphs",
      "Alertmanager — alert routing",
      "Health and resource dashboards for the running stack",
    ],
  },
  challenges: [
    {
      title: "Making the Docker build reproducible",
      body: "The first builds worked on a laptop and failed in CI. The fix was a corrected build context and explicit caching — the pipeline now builds the same image every time.",
    },
    {
      title: "A pod that would not stay up",
      body: "CrashLoopBackOff after a config change. Reading the logs and the describe output traced it to a misconfigured environment variable — fixed and rolled out cleanly.",
    },
    {
      title: "State vs reality in Terraform",
      body: "A plan failed on a resource that already existed. Learning about state, import and protected state files turned a confusing failure into a repeatable workflow.",
    },
    {
      title: "No visibility after hours",
      body: "A service could break with nobody watching. Standing up Prometheus, Grafana and alerts gave the stack a heartbeat — and a page when it stops.",
    },
  ],
  troubleshooting: [
    {
      problem: "Container restarts in a loop",
      evidence: "kubectl logs + kubectl describe pod",
      rootCause: "Wrong environment variable in the config",
      fix: "Correct the config value, roll a new revision, verify rollout status",
    },
    {
      problem: "Service resolves but connections fail",
      evidence: "kubectl get endpoints + selector comparison",
      rootCause: "Service selector did not match pod labels",
      fix: "Align the selector and targetPort, verify endpoints populate",
    },
    {
      problem: "Terraform plan refuses an existing resource",
      evidence: "terraform plan + state inspection",
      rootCause: "State drifted from the real environment",
      fix: "Import the resource into state, re-plan to a clean diff",
    },
    {
      problem: "Build passes locally, fails in CI",
      evidence: "Pipeline logs + image build context",
      rootCause: "Laptop build context differed from the CI environment",
      fix: "Fix the Dockerfile context, add layer caching to the pipeline",
    },
  ],
  lessons: [
    "Reproducibility beats cleverness — if the build cannot be repeated, it cannot be trusted.",
    "Logs and describe output before assumptions. Every incident I solved was solved from evidence.",
    "State management is infrastructure — Terraform state deserves the same care as source code.",
    "Monitoring is the difference between deploying and hoping.",
    "My design background made the debugging workflow natural: map the journey, find the state, fix the transition.",
  ],
  architecture: {
    heading: "System architecture",
    groups: [
      {
        name: "Application",
        items: [
          { id: "user", label: "User", detail: "Browses, filters, compares and favorites vehicles through the frontend.", status: "implemented" as Status },
          { id: "frontend", label: "Frontend (React / Next.js)", detail: "Renders vehicle discovery, comparison, recommendations and authentication.", status: "implemented" as Status },
          { id: "backend", label: "Backend API (Node.js)", detail: "Serves vehicle data, handles auth, favorites, comparison and recommendation logic.", status: "implemented" as Status },
          { id: "db", label: "PostgreSQL", detail: "Stores vehicles, users, favorites and comparison history.", status: "implemented" as Status },
        ],
      },
      {
        name: "Delivery",
        items: [
          { id: "github", label: "GitHub", detail: "Source of truth for code and configuration.", status: "implemented" as Status },
          { id: "actions", label: "GitHub Actions", detail: "CI: checkout, install, test, build, Docker build, push to registry.", status: "implemented" as Status },
          { id: "registry", label: "Container Registry", detail: "Stores versioned Docker images for every service.", status: "implemented" as Status },
          { id: "jenkins", label: "Jenkins", detail: "Deployment pipeline: pulls the image, releases through Helm.", status: "implemented" as Status },
          { id: "helm", label: "Helm", detail: "Templates and versions the Kubernetes release.", status: "implemented" as Status },
          { id: "k8s", label: "Kubernetes", detail: "Orchestrates containers, manages replicas, rolling updates, service discovery and workload health.", status: "implemented" as Status },
          { id: "prometheus", label: "Prometheus", detail: "Collects infrastructure and application metrics.", status: "implemented" as Status },
          { id: "grafana", label: "Grafana + Alertmanager", detail: "Visualises metrics and routes alerts when something is wrong.", status: "implemented" as Status },
        ],
      },
      {
        name: "Infrastructure",
        items: [
          { id: "terraform", label: "Terraform", detail: "Defines and provisions infrastructure as code — repeatable environments.", status: "implemented" as Status },
          { id: "vpc", label: "VPC / Subnets / IGW", detail: "Network isolation, public/private subnet concepts, route tables and internet gateway.", status: "implemented" as Status },
          { id: "sg", label: "Security Groups / IAM", detail: "Minimal, explicit network rules and least-privilege identity.", status: "implemented" as Status },
          { id: "ec2", label: "EC2 + CloudWatch", detail: "Compute for the stack, with metrics and logs observable.", status: "implemented" as Status },
          { id: "eks", label: "EKS", detail: "Managed Kubernetes — the target for orchestrating the full stack.", status: "in-progress" as Status },
        ],
      },
    ],
  },
  pipeline: [
    { id: "git-push", title: "Git Push", detail: "A commit to the repository triggers the pipeline.", status: "implemented" as Status },
    { id: "github", title: "GitHub", detail: "Hosts the code and coordinates the CI workflow.", status: "implemented" as Status },
    { id: "actions", title: "GitHub Actions", detail: "CI steps: checkout, install dependencies, test, build, Docker build.", status: "implemented" as Status },
    { id: "registry", title: "Container Registry", detail: "The built image is tagged and pushed for deployment.", status: "implemented" as Status },
    { id: "jenkins", title: "Jenkins", detail: "Picks up the image and runs the deployment pipeline.", status: "implemented" as Status },
    { id: "helm", title: "Helm", detail: "Renders the chart with environment values and releases a revision.", status: "implemented" as Status },
    { id: "k8s", title: "Kubernetes", detail: "Rolling deployment with health-gated rollout.", status: "implemented" as Status },
    { id: "monitor", title: "Prometheus", detail: "Scrapes metrics from the running workloads.", status: "implemented" as Status },
    { id: "grafana", title: "Grafana", detail: "Dashboards show health; Alertmanager routes alerts.", status: "implemented" as Status },
  ],
  repos: [
    {
      name: "ridematch",
      description: "Automotive discovery and recommendation platform — full three-tier application with Docker, Kubernetes, Helm, CI/CD and Terraform.",
      tags: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Kubernetes"],
    },
    {
      name: "terraform-aws-infrastructure",
      description: "Terraform configuration for the AWS infrastructure — VPC, subnets, route tables, security groups, IAM and EC2.",
      tags: ["Terraform", "AWS", "VPC", "IAM", "EC2"],
    },
    {
      name: "kubernetes-manifests",
      description: "Kubernetes resources for RideMatch — deployments, services, configmaps, secrets and health probes.",
      tags: ["Kubernetes", "Deployments", "Services", "Probes"],
    },
    {
      name: "helm-charts",
      description: "Helm charts packaging the RideMatch stack with per-environment values.",
      tags: ["Helm", "Charts", "Values", "Releases"],
    },
    {
      name: "ci-cd-pipelines",
      description: "GitHub Actions workflows and Jenkins pipelines used to build, test and deploy.",
      tags: ["GitHub Actions", "Jenkins", "CI/CD", "Docker"],
    },
    {
      name: "linux-automation",
      description: "Bash scripts for Linux administration, log analysis and automation tasks.",
      tags: ["Bash", "Linux", "Automation"],
    },
  ],
  statusLegend: [
    { status: "implemented" as Status, label: "Implemented" },
    { status: "in-progress" as Status, label: "In progress" },
    { status: "planned" as Status, label: "Planned" },
  ],
};
