export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://cyon-workspace.vercel.app";

export const identity = {
  name: "Cyon",
  legalName: "Eghosa Imasuen",
  handle: "Cyon0x",
  timezone: "Africa/Lagos",
  timezoneLabel: "GMT+1",
  timezoneCity: "Lagos",
  status: "OPEN TO BUILD",
  role: "WEB3 BUILDER + ECOSYSTEM OPERATOR",
  /** Strengths, in the order they are usually asked for. */
  disciplines: ["FRONTEND", "PRODUCT", "GROWTH", "COMMUNITY", "CONTENT", "IRL"],
  statement:
    "I build Web3 products, grow communities and help ecosystems turn ideas into things people actually use.",
  yearsInWeb3: "4+",
  pfp: "/images/cyon-pfp.jpg",
} as const;

/**
 * The same person, described the way different teams describe the role.
 * Used once, as a positioning band, so nothing here is repeated down the page.
 */
export const positions: { label: string; note: string }[] = [
  { label: "Web3 Builder", note: "Products, prototypes and interfaces that ship" },
  { label: "Frontend Developer", note: "React, Next.js, TypeScript, Tailwind" },
  { label: "Web2 + Web3 Product Builder", note: "Product thinking with wallet-native execution" },
  { label: "Ecosystem / Ambassador", note: "Programme work across 25+ ecosystems" },
  { label: "Community Growth Operator", note: "Onboarding, activation, retention" },
  { label: "Developer Relations / Ecosystem Growth", note: "Docs, dev feedback, onboarding paths" },
  { label: "Content & Community Creator", note: "Threads, explainers, campaign assets" },
  { label: "IRL Community / Event Operator", note: "Rooms hosted, planned and organised" },
  { label: "Product + Growth Operator", note: "Close enough to the work to fix it" },
];

/** Engagement types, not job titles. Sits in the contact block as a conversion band. */
export const availability: { group: string; items: string[] }[] = [
  { group: "BUILD", items: ["Frontend / Web3 frontend", "Web3 product building"] },
  {
    group: "GROW",
    items: ["Ecosystem growth", "Ambassador programmes", "Community growth", "Developer relations"],
  },
  {
    group: "REACH",
    items: ["Content / social campaigns", "IRL activations", "Product + growth roles"],
  },
];

export const links = {
  x: { label: "X", handle: "@Cyon0x", href: "https://x.com/Cyon0x" },
  github: { label: "GitHub", handle: "Cyon0x", href: "https://github.com/Cyon0x" },
  email: { label: "Email", handle: "cyon0x1@gmail.com", href: "mailto:cyon0x1@gmail.com" },
  telegram: { label: "Telegram", handle: "cyon0x1", href: "https://t.me/cyon0x1" },
  discord: { label: "Discord", handle: "cyon0x", href: null },
} as const;

export type NavItem = { id: string; label: string; index: string };

export const nav: NavItem[] = [
  { id: "identity", label: "IDENTITY", index: "02" },
  { id: "network", label: "NETWORK", index: "03" },
  { id: "proof", label: "PROOF", index: "04" },
  { id: "builds", label: "BUILDS", index: "05" },
  { id: "capability", label: "CAPABILITY", index: "08" },
  { id: "contact", label: "CONTACT", index: "12" },
];

export const meta = {
  title: "Cyon — Web3 Builder + Ecosystem Operator",
  description:
    "Cyon (Eghosa Imasuen) is a Web3 builder and ecosystem operator working across frontend, product, growth, community, content and IRL. 4+ years across DeFi, infrastructure, payments and emerging L1 ecosystems. Built FinFlow, VAULT 01, InfluenceFi and a bounty-winning Redbelly DAO interface.",
  short:
    "Web3 builder and ecosystem operator. I build products, grow communities and help ecosystems turn ideas into things people actually use.",
  keywords: [
    "Cyon",
    "Cyon0x",
    "Eghosa Imasuen",
    "Web3 builder",
    "Web3 frontend developer",
    "ecosystem operator",
    "Web3 growth",
    "Redbelly",
    "Arc",
    "Circle USDC",
    "community builder",
    "stablecoin payments",
  ],
} as const;
