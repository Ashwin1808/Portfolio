// ─────────────────────────────────────────────────────────────
// PROJECT DIRECTORY — single source of truth for /work
// Level 3 → full case study at /work/[slug] (content in case-studies.ts)
// Level 2 → compact case study at /work/[slug]
// Level 1 → card only (no page)
// ─────────────────────────────────────────────────────────────

export type Category =
  | "visual-ivr"
  | "banking"
  | "fintech"
  | "insurance"
  | "dashboards"
  | "ai-genai"
  | "enterprise"
  | "product";

export type Visibility =
  | "public"
  | "case-study"
  | "confidential"
  | "internal"
  | "concept"
  | "prototype";

export interface Project {
  slug: string;
  title: string;
  /** Editorial wall title — used on the homepage Selected Work wall */
  wallTitle?: string;
  category: Category;
  industry: string;
  /** Real client name — only rendered when confidential is false */
  client: string | null;
  confidential: boolean;
  visibility: Visibility;
  level: 1 | 2 | 3;
  blurb: string;
  problem: string;
  role: string;
  platform: string[];
  focus: string[];
  tags: string[];
  flagship?: boolean;
}

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "visual-ivr", label: "Visual IVR" },
  { id: "fintech", label: "Fintech" },
  { id: "banking", label: "Banking" },
  { id: "insurance", label: "Insurance" },
  { id: "dashboards", label: "Dashboards" },
  { id: "ai-genai", label: "AI / GenAI" },
  { id: "enterprise", label: "Enterprise" },
  { id: "product", label: "Product Design" },
];

export const projects: Project[] = [
  {
    slug: "visual-ivr",
    title: "Designing Visual IVR Experiences",
    wallTitle: "Conversational\nexperiences",
    category: "visual-ivr",
    industry: "Conversational Platforms",
    client: null,
    confidential: false,
    visibility: "case-study",
    level: 3,
    flagship: true,
    blurb:
      "Voice + visual UI + conversational interaction. How audio guidance and an on-screen interface combine to turn long IVR menus into fast self-service journeys.",
    problem:
      "Traditional IVR forces callers through long, sequential audio menus. Retention drops, effort rises and containment suffers.",
    role: "UX/UI Designer — journey, conversation and screen design across client deployments at Ubona.",
    platform: ["Mobile", "Voice + Visual UI", "Web"],
    focus: ["Conversational UX", "Journey Design", "Interaction States"],
    tags: ["Visual IVR", "Conversational UX", "Mobile UX", "Self-Service"],
  },
  {
    slug: "insurance-renewal",
    title: "Insurance Policy Renewal",
    wallTitle: "Making insurance\neasier to act on",
    category: "insurance",
    industry: "Insurance",
    client: "HDFC ERGO",
    confidential: true,
    visibility: "confidential",
    level: 3,
    flagship: true,
    blurb:
      "A voice + visual self-service journey for policy renewal — policy details, benefits, payment and confirmation without waiting for an agent.",
    problem:
      "Renewal inquiries dominate contact-centre volume. Customers wanted to renew instantly; the business wanted call deflection without hurting trust.",
    role: "UX/UI Designer — flow design, screens, prototype, component states, developer collaboration.",
    platform: ["Mobile", "Voice + Visual UI"],
    focus: ["Conversational UX", "Payment Flows", "Trust Design"],
    tags: ["Visual IVR", "Insurance", "Renewal", "Payment"],
  },
  {
    slug: "credit-card-onboarding",
    title: "Pre-Approved Credit Card Onboarding",
    wallTitle: "From offer\nto activation",
    category: "banking",
    industry: "Banking",
    client: "Major Indian Private Bank",
    confidential: true,
    visibility: "confidential",
    level: 3,
    flagship: true,
    blurb:
      "Presenting a pre-approved card offer inside a call, collecting consent, completing verification and activating the card — end to end.",
    problem:
      "Pre-approved offers were delivered over voice-only calls with long disclosures and no visual confirmation, hurting conversion and trust.",
    role: "UX/UI Designer — offer presentation, consent flow, verification states, PIN and activation journey.",
    platform: ["Mobile", "Voice + Visual UI"],
    focus: ["Conversational UX", "Compliance UX", "Security Flows"],
    tags: ["Visual IVR", "Banking", "Credit Card", "KYC"],
  },
  {
    slug: "upi-payment",
    title: "UPI Payment Journey",
    category: "fintech",
    industry: "Financial Services",
    client: "Financial Services Client",
    confidential: true,
    visibility: "confidential",
    level: 3,
    flagship: true,
    blurb:
      "UPI ID entry, validation, transaction status, confirmation, failure and retry — designed for clarity and calm under real payment anxiety.",
    problem:
      "UPI transactions are asynchronous and fail in many quiet ways. Users needed confidence about what happened, especially around double payment.",
    role: "UX/UI Designer — payment states, validation, error and recovery design.",
    platform: ["Mobile", "Web", "Voice + Visual UI"],
    focus: ["Payment UX", "Error States", "Microcopy"],
    tags: ["UPI", "Payments", "Fintech", "Error States"],
  },
  {
    slug: "omni-channel-dashboard",
    title: "Omni-Channel Contact Center Dashboard",
    wallTitle: "Designing\nfor operations",
    category: "dashboards",
    industry: "Enterprise Contact Center",
    client: null,
    confidential: true,
    visibility: "confidential",
    level: 3,
    flagship: true,
    blurb:
      "One operational view across calls, chats, WhatsApp and campaigns — KPIs, channel performance, filters and drill-downs for supervisors.",
    problem:
      "Operations teams juggled separate channel reports. Decisions about staffing and campaigns were slow and scattered.",
    role: "UX/UI Designer — information architecture, data hierarchy, dashboard and component library.",
    platform: ["Web Dashboard"],
    focus: ["Information Architecture", "Data UX", "Operational UX"],
    tags: ["Dashboard", "Analytics", "Enterprise", "Data UX"],
  },
  {
    slug: "agent-assist",
    title: "AI Agent Assist Dashboard",
    wallTitle: "AI that assists,\nnot interrupts",
    category: "ai-genai",
    industry: "Enterprise Contact Center",
    client: null,
    confidential: true,
    visibility: "confidential",
    level: 3,
    flagship: true,
    blurb:
      "A live agent workspace: transcript, customer context and AI suggestions designed as human + AI collaboration — suggest, never decide.",
    problem:
      "Agents juggled systems while talking to customers. AI could help, but suggestions are only useful when they arrive in context and can be trusted.",
    role: "UX/UI Designer — suggestion interaction model, transcript UI, agent controls and feedback loops.",
    platform: ["Web Agent Desktop"],
    focus: ["Human + AI Interaction", "Contextual UI", "Operational UX"],
    tags: ["AI", "Agent Assist", "Dashboard", "Live Transcript"],
  },
  {
    slug: "ai-ask-me",
    title: "GenAI 'Ask Me' Experience",
    category: "ai-genai",
    industry: "Enterprise SaaS",
    client: null,
    confidential: true,
    visibility: "confidential",
    level: 3,
    flagship: true,
    blurb:
      "A grounded conversational assistant for operational questions — suggestion chips, cited sources, graceful refusals and honest limits.",
    problem:
      "Users wanted instant answers to repetitive questions. A bare chatbot hallucinates, overpromises and erodes trust in a financial-services context.",
    role: "UX/UI Designer — conversational UI, suggestion design, source attribution, feedback and failure states.",
    platform: ["Web", "Mobile"],
    focus: ["Conversational UX", "Trust Design", "Generative AI UX"],
    tags: ["GenAI", "Ask Me", "Conversational UX", "Trust"],
  },
  {
    slug: "loan-journey",
    title: "Loan Status & EMI Journey",
    category: "fintech",
    industry: "Financial Services",
    client: "Financial Services Client",
    confidential: true,
    visibility: "confidential",
    level: 3,
    blurb:
      "Loan status, EMI details, pre-closure quotes and repayment — financial workflows where clarity and security come before delight.",
    problem:
      "Customers called to check loan status, EMI schedules and pre-closure options — simple questions that required agent time.",
    role: "UX/UI Designer — secure verification, financial data display, pre-closure and payment flows.",
    platform: ["Mobile", "Voice + Visual UI"],
    focus: ["Financial UX", "Security Flows", "Workflow Design"],
    tags: ["Loans", "EMI", "Fintech", "Visual IVR"],
  },
  {
    slug: "campaign-manager",
    title: "Campaign Manager",
    category: "dashboards",
    industry: "Enterprise Contact Center",
    client: null,
    confidential: true,
    visibility: "confidential",
    level: 2,
    blurb:
      "Creating, scheduling and monitoring outbound campaigns — segments, status, metrics and collections in one workflow.",
    problem:
      "Campaign setup lived across spreadsheets and tools; status and performance were unclear mid-flight.",
    role: "UX/UI Designer — campaign creation flow, status model and metrics views.",
    platform: ["Web Dashboard"],
    focus: ["Workflow Design", "Data UX"],
    tags: ["Campaigns", "Dashboard", "Collections"],
  },
  {
    slug: "document-upload",
    title: "Document Upload & Validation",
    category: "enterprise",
    industry: "Financial Services",
    client: "Muthoot Finance",
    confidential: true,
    visibility: "confidential",
    level: 2,
    blurb:
      "Upload, validation, error, retry and success states for customer document collection in a loan workflow.",
    problem:
      "Document collection over the phone or portal produced unclear failures and endless resubmissions.",
    role: "UX/UI Designer — upload states, validation messaging and retry design.",
    platform: ["Mobile", "Web"],
    focus: ["Error States", "Forms", "Microcopy"],
    tags: ["Documents", "Validation", "Error States"],
  },
  {
    slug: "vehicle-insurance",
    title: "Vehicle Insurance Self-Service",
    category: "insurance",
    industry: "Insurance",
    client: "Insurance Client",
    confidential: true,
    visibility: "confidential",
    level: 2,
    blurb:
      "Renewal, vehicle details, claim intimation and policy servicing — insurance journeys designed for clarity under urgency.",
    problem:
      "Vehicle insurance interactions happen in moments of stress; users needed fast, unambiguous paths for renewal and claims.",
    role: "UX/UI Designer — journey design and service screens.",
    platform: ["Mobile", "Voice + Visual UI"],
    focus: ["Journey Design", "Service UX"],
    tags: ["Vehicle Insurance", "Claims", "Visual IVR"],
  },
  {
    slug: "halo-cloud",
    title: "HALO Cloud — CCaaS Platform",
    category: "product",
    industry: "Product / SaaS",
    client: "Ubona Technologies",
    confidential: true,
    visibility: "internal",
    level: 2,
    blurb:
      "Product design across the cloud contact-center platform — enterprise workflow interfaces, internal tools and the product experience itself.",
    problem:
      "A capable platform with inconsistent, engineering-first surfaces needed a coherent product experience.",
    role: "UX/UI Designer — product UI, interface patterns and internal tools.",
    platform: ["Web Product"],
    focus: ["Product Design", "Design Systems", "Enterprise UX"],
    tags: ["CCaaS", "SaaS", "Product Design"],
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const categoryLabel = (c: Category) =>
  categories.find((x) => x.id === c)?.label ?? c;
