// ─────────────────────────────────────────────────────────────
// CENTRAL SITE CONFIGURATION — replace placeholders here once.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Ashwin K",
  initials: "AK",
  role: "UX/UI Designer · Transitioning into DevOps / Cloud Engineering",
  location: "India",

  // Identity copy
  designTagline: "Designing complex systems to feel simple.",
  designSupport:
    "I'm a UX/UI Designer at Ubona Technologies, designing enterprise digital experiences across banking, insurance, fintech, conversational interfaces, dashboards and AI-assisted workflows.",
  engineeringTagline:
    "From designing digital experiences to engineering the infrastructure behind them.",
  engineeringSupport:
    "UX/UI designer expanding into frontend, cloud and DevOps engineering — building production-style systems with AWS, Docker, Kubernetes, Terraform and CI/CD.",

  // ── Links (REPLACE these) ──────────────────────────────────
  email: "hello@your-email.com", // ← replace
  github: "https://github.com/Ashwin1808", // confirmed via git remote
  githubUsername: "Ashwin1808", // confirmed via git remote
  linkedin: "https://www.linkedin.com/in/ashwin-k-5b1600212/", // confirmed
  metadataBase: "https://your-domain.dev", // ← replace (no trailing slash)

  // Resume: drop a PDF at public/ashwin-resume.pdf and set the path
  // to enable the direct download button. Until then, "Download"
  // prints the /resume page to PDF from the browser.
  resumePdf: null as string | null, // e.g. "/ashwin-resume.pdf"

  // Company / role config — verify before publishing
  company: "Ubona Technologies",
  uxRole: "UX/UI Designer",
  tenure: "2023 — Present", // ← verify

  metadata: {
    title: "Ashwin K — UX/UI Designer → DevOps / Cloud Engineering",
    description:
      "UX/UI designer designing complex enterprise experiences — Visual IVR, fintech, insurance, dashboards and AI workflows — now extending into frontend, cloud and DevOps engineering.",
  },

  footer: {
    line: "Designing experiences. Engineering systems.",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Systems", href: "/systems" },
  { label: "Engineering", href: "/engineering" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;

export const socials = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "Email", href: `mailto:${site.email}` },
] as const;
