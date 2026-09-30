export type CapabilityGroup = {
  id: string;
  label: string;
  code: string;
  summary: string;
  items: string[];
};

export const capabilities: CapabilityGroup[] = [
  {
    id: "build",
    label: "BUILD",
    code: "CAP/01",
    summary: "Products with real wallets, real chains and real transaction states.",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Web3 frontend architecture",
      "Wallet connection flows",
      "EVM integration",
      "Smart contract interaction",
      "Solidity experimentation",
      "USDC / stablecoin payments",
      "Vercel",
      "GitHub",
      "AI-assisted development",
    ],
  },
  {
    id: "grow",
    label: "GROW",
    code: "CAP/02",
    summary: "Getting people in, keeping them, and turning activity into numbers.",
    items: [
      "Ecosystem growth",
      "Campaign execution",
      "User acquisition",
      "Community growth",
      "Ambassador programmes",
      "Retention and re-engagement",
    ],
  },
  {
    id: "create",
    label: "CREATE",
    code: "CAP/03",
    summary: "Making technical things legible without making them boring.",
    items: [
      "Product UX",
      "Visual storytelling",
      "Long-form threads",
      "Product explainers",
      "Technical writing",
      "Figma",
      "Content systems",
    ],
  },
  {
    id: "operate",
    label: "OPERATE",
    code: "CAP/04",
    summary: "The unglamorous work that keeps an ecosystem moving.",
    items: [
      "Research",
      "Product testing",
      "Documentation",
      "Community operations",
      "Moderation",
      "IRL activation",
      "Discord / Telegram / WhatsApp",
    ],
  },
];

/**
 * The tools and surfaces behind the work, stated once. No proficiency bars —
 * the builds and the repos are the evidence.
 */
export const stack: { group: string; items: string[] }[] = [
  { group: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind", "Figma"] },
  { group: "WEB3", items: ["EVM", "Wallet integrations", "Smart contracts", "USDC / payments"] },
  { group: "CHAINS", items: ["Arc", "Redbelly", "Circle USDC", "Plume", "Monad", "Union"] },
  { group: "SHIP", items: ["GitHub", "Vercel", "AI-assisted development"] },
];
