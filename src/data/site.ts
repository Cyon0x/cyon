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
  role: "WEB3 BUILDER",
  disciplines: ["PRODUCT", "GROWTH", "COMMUNITY", "ECOSYSTEMS"],
  yearsInWeb3: "4+",
  pfp: "/images/cyon-pfp.jpg",
} as const;

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
  { id: "contact", label: "CONTACT", index: "11" },
];

export const meta = {
  title: "Cyon — Web3 Builder: Products, Growth & Ecosystems",
  description:
    "Cyon (Eghosa Imasuen) is a Web3 builder and growth operator. 4+ years across DeFi, infrastructure, payments and emerging L1 ecosystems. Built FinFlow, VAULT 01, InfluenceFi and a bounty-winning Redbelly DAO interface.",
  short: "Builder and growth operator working across Web3 products, communities and ecosystems.",
  keywords: [
    "Cyon",
    "Cyon0x",
    "Eghosa Imasuen",
    "Web3 builder",
    "Web3 growth",
    "Redbelly",
    "Arc",
    "Circle USDC",
    "community builder",
    "stablecoin payments",
  ],
} as const;
