// ─────────────────────────────────────────────────────────────
// DESIGN PROCESS & THINKING — no fabricated research claims.
// ─────────────────────────────────────────────────────────────

export const processSteps = [
  {
    title: "Understand",
    body: "Requirements, constraints, business goals and the real user of the flow. Ask why before what.",
  },
  {
    title: "Define",
    body: "The problem in one sentence, the outcome we are designing for, and what success looks like.",
  },
  {
    title: "Structure",
    body: "Information architecture: what screens and states exist, how they connect, what each one must communicate.",
  },
  {
    title: "Wireframe",
    body: "Low-fidelity layouts that prove the flow before any visual decision is made.",
  },
  {
    title: "Prototype",
    body: "Clickable flows that behave like the product — including failure paths, not just the happy path.",
  },
  {
    title: "Visual Design",
    body: "Hierarchy, typography, spacing, colour and components applied to the proven structure.",
  },
  {
    title: "Validate",
    body: "Stakeholder feedback, walkthroughs and flow critiques with the teams who know the domain.",
  },
  {
    title: "Handoff",
    body: "Specified states, responsive behaviour and reusable components — designed with implementation in mind.",
  },
  {
    title: "Iterate",
    body: "Revisit the flow as the product, data or constraints change. Design is never finished; it is maintained.",
  },
];

export const thinkingPrinciples = [
  {
    title: "Understand the journey before designing the screen",
    body: "A beautiful screen inside a broken flow is still a broken product.",
  },
  {
    title: "Reduce cognitive load",
    body: "One task per screen, few options, clear next action. The user should never have to think about the interface.",
  },
  {
    title: "Make the next action obvious",
    body: "If a user has to look for what to do next, the design has failed the test.",
  },
  {
    title: "Design the unhappy path",
    body: "Errors, timeouts, empty states and failures are where trust is actually won or lost.",
  },
  {
    title: "Use progressive disclosure",
    body: "Show what is needed now; let detail live one tap deeper.",
  },
  {
    title: "Build reusable patterns",
    body: "Components with defined states make products consistent and delivery fast.",
  },
  {
    title: "Keep complex information understandable",
    body: "Hierarchy, grouping and plain language turn dense domains into readable interfaces.",
  },
  {
    title: "Design with implementation in mind",
    body: "Feasibility, API-driven data and responsive behaviour are design constraints, not afterthoughts.",
  },
  {
    title: "Do not overdesign",
    body: "Every extra element must earn its place. Restraint is a feature.",
  },
];

export const figmaWorkflow = [
  { step: "Requirements", note: "Inputs and constraints before pixels." },
  { step: "User Flow", note: "The journey as states and decisions." },
  { step: "Wireframes", note: "Structure and hierarchy, low fidelity." },
  { step: "UI Design", note: "Visual system applied to proven flows." },
  { step: "Components", note: "Reusable primitives with defined states." },
  { step: "Prototype", note: "Clickable behaviour, happy and unhappy paths." },
  { step: "Developer Handoff", note: "Specs, states and responsive rules." },
];

export const devCollab = [
  {
    title: "Component behaviour",
    body: "Every component is defined with its states and transitions, so engineers implement behaviour, not just looks.",
  },
  {
    title: "Responsive states",
    body: "Layouts are specified at breakpoints — mobile is a design target, not a shrink of desktop.",
  },
  {
    title: "API-driven data",
    body: "Screens are designed against real data shapes — loading, empty and error states included.",
  },
  {
    title: "Validation and errors",
    body: "Field-level validation, server errors and retries are part of the design, not surprises.",
  },
  {
    title: "Implementation feasibility",
    body: "I design with the frontend in mind — what is easy to build well, and what would be fragile.",
  },
];

export const systemComponents = [
  { name: "Buttons", variants: "Primary · Secondary · Ghost · Destructive", states: "Default · Hover · Focus · Disabled · Loading" },
  { name: "Cards", variants: "Summary · Policy · Loan · KPI · Suggestion", states: "Default · Selected · Expanded" },
  { name: "Inputs", variants: "Text · OTP · PIN · Search · Amount", states: "Default · Focus · Valid · Error · Disabled" },
  { name: "Dropdowns", variants: "Select · Filter · Channel picker", states: "Closed · Open · Empty · Loading" },
  { name: "Bottom sheets", variants: "Actions · Options · Confirmation", states: "Closed · Open · Dragging" },
  { name: "Navigation", variants: "Top bar · Tabs · Stepper · Sidebar", states: "Active · Completed · Disabled" },
  { name: "Status components", variants: "Channel · Agent · Campaign · Payment", states: "Active · Paused · Failed · Completed" },
  { name: "Error states", variants: "Field · Blocking · Partial · Timeout", states: "Visible · Recoverable · Locked" },
  { name: "Success states", variants: "Task · Payment · Renewal · Activation", states: "In-line · Full-screen · With reference" },
  { name: "Progress", variants: "Steps · Spinner · Skeleton · Timer", states: "Idle · Running · Done" },
  { name: "Banners", variants: "Info · Warning · Success · Error", states: "Dismissible · Persistent" },
  { name: "Modals", variants: "Confirm · Detail · Drill-down", states: "Closed · Open · Loading" },
  { name: "OTP components", variants: "Masked · Visible · Resend", states: "Idle · Validating · Expired · Locked" },
  { name: "Payment components", variants: "UPI · Card · Net-banking · Summary", states: "Pending · Success · Failed · Retry" },
  { name: "Policy cards", variants: "Renewal · Active · Expired", states: "Default · Selected · Actionable" },
  { name: "Loan cards", variants: "Status · EMI · Pre-closure quote", states: "Default · Expanded" },
  { name: "Agent widgets", variants: "Transcript · Suggestion · Customer context", states: "Offered · Accepted · Dismissed · Missed" },
];

export const workflowExamples = [
  {
    title: "Loan",
    steps: ["Customer information", "Eligibility", "Offer", "Decision", "Action"],
  },
  {
    title: "Insurance",
    steps: ["Policy", "Renewal", "Payment", "Confirmation"],
  },
  {
    title: "Credit Card",
    steps: ["Offer", "Selection", "Verification", "Activation", "Completion"],
  },
  {
    title: "UPI",
    steps: ["Input", "Validation", "Transaction", "Success / Failure"],
  },
];
