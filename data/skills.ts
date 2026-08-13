// ─────────────────────────────────────────────────────────────
// SKILLS — honest groupings. No percentages, no fake ratings.
// ─────────────────────────────────────────────────────────────

export interface SkillGroup {
  group: string;
  note: string;
  items: string[];
}

export const designSkills: SkillGroup[] = [
  {
    group: "Design Practice",
    note: "Core professional practice.",
    items: [
      "UX/UI Design",
      "Conversational UX",
      "Visual IVR",
      "Journey Mapping",
      "Wireframing & Prototyping",
      "Information Architecture",
      "Interaction Design",
      "Design Systems",
      "Microcopy / UX Writing",
      "Mobile-first Design",
    ],
  },
  {
    group: "Tools",
    note: "Primary working tools.",
    items: ["Figma", "Figma prototyping", "Miro / flow mapping", "Adobe Photoshop", "Notion"],
  },
];

export const engineeringSkills: SkillGroup[] = [
  {
    group: "Cloud",
    note: "Hands-on through production-style projects.",
    items: [
      "AWS — EC2, VPC, IAM, S3",
      "Security Groups",
      "Load Balancing",
      "CloudWatch",
      "EKS concepts",
    ],
  },
  {
    group: "DevOps",
    note: "Hands-on through production-style projects.",
    items: [
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "Helm",
      "Terraform",
      "GitHub Actions",
      "Jenkins",
    ],
  },
  {
    group: "Monitoring",
    note: "Applied on my own stacks.",
    items: ["Prometheus", "Grafana", "Alertmanager"],
  },
  {
    group: "Linux & Scripting",
    note: "Daily working knowledge.",
    items: ["Linux", "Bash", "SSH", "systemctl", "journalctl", "cron", "Network troubleshooting", "Log analysis"],
  },
  {
    group: "Development",
    note: "Confident building and debugging.",
    items: ["JavaScript / TypeScript", "React", "Next.js", "Node.js", "Python", "SQL", "MongoDB", "PostgreSQL"],
  },
];
