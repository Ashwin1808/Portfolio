// ─────────────────────────────────────────────────────────────
// COMPANIES / CLIENTS — public-facing, sanitised wall.
// Only names appropriate for public use are listed.
// ─────────────────────────────────────────────────────────────

export interface CompanyGroup {
  group: string;
  items: {
    name: string;
    industry: string;
    projectType: string;
    confidential?: boolean;
  }[];
}

export const companyGroups: CompanyGroup[] = [
  {
    group: "Banking",
    items: [
      { name: "HDFC", industry: "Banking", projectType: "Card journeys · Visual IVR" },
      { name: "Axis Bank", industry: "Banking", projectType: "Card journeys · Visual IVR" },
      { name: "Aditya Birla", industry: "Financial Services", projectType: "Financial workflows · Visual IVR" },
      { name: "Bajaj Finserv", industry: "Financial Services", projectType: "Loan · EMI · payment journeys" },
      { name: "ICICI", industry: "Banking", projectType: "Financial workflows · Visual IVR" },
      { name: "Yes Bank", industry: "Banking", projectType: "Card journeys · Visual IVR" },
    ],
  },
  {
    group: "Insurance",
    items: [
      { name: "HDFC ERGO", industry: "Insurance", projectType: "Policy renewal · servicing · Visual IVR" },
      { name: "Star Health", industry: "Insurance", projectType: "Health insurance journeys" },
      { name: "Tata AIG", industry: "Insurance", projectType: "Vehicle insurance · claims" },
      { name: "UnitedHealthcare", industry: "Global Insurance", projectType: "Insurance workflows" },
    ],
  },
  {
    group: "Finance",
    items: [
      { name: "Muthoot Finance", industry: "Finance", projectType: "Document collection · loan flows" },
      { name: "Enterprise Financial Services", industry: "Finance", projectType: "UPI · payments · collections", confidential: true },
    ],
  },
  {
    group: "Product / Enterprise",
    items: [
      { name: "Ubona Technologies", industry: "CCaaS · Conversational Platform", projectType: "HALO Cloud · product design" },
      { name: "HALO Cloud", industry: "CCaaS Platform", projectType: "Product UI · enterprise tools" },
    ],
  },
];
