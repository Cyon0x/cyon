/**
 * Ecosystem graph.
 *
 * Roles reflect what is documented in the brief. Nothing here claims employment.
 * If any relationship needs different wording, this file is the only place to edit.
 */

export type CategoryId =
  | "BUILD"
  | "CONTENT"
  | "COMMUNITY"
  | "GROWTH"
  | "AMBASSADOR"
  | "IRL"
  | "PRODUCT";

export type EcosystemNode = {
  id: string;
  name: string;
  /** Where the node sits in the composition. */
  ring: "inner" | "outer";
  role: string;
  categories: CategoryId[];
  summary: string;
  facts: string[];
  /** Optional outbound links that are real. */
  links?: { label: string; href: string }[];
};

export const categories: { id: CategoryId; label: string; note: string }[] = [
  { id: "BUILD", label: "BUILD", note: "Frontend, EVM integration, contract interaction" },
  { id: "PRODUCT", label: "PRODUCT", note: "Shipped products with real users and real chains" },
  { id: "GROWTH", label: "GROWTH", note: "Acquisition, campaigns, measurable movement" },
  { id: "COMMUNITY", label: "COMMUNITY", note: "Onboarding, moderation, keeping people around" },
  { id: "CONTENT", label: "CONTENT", note: "Threads, explainers, technical communication" },
  { id: "AMBASSADOR", label: "AMBASSADOR", note: "Programme and representative work" },
  { id: "IRL", label: "IRL", note: "Rooms with actual people in them" },
];

export const ecosystemNodes: EcosystemNode[] = [
  {
    id: "redbelly",
    name: "REDBELLY",
    ring: "inner",
    role: "CONTRIBUTOR · BUILDER",
    categories: ["BUILD", "PRODUCT", "CONTENT", "COMMUNITY"],
    summary:
      "The ecosystem I have shipped the most inside. A compliant L1 built for real world assets, and a community that needed tooling.",
    facts: [
      "Redbelly DAO interface \u2014 won a Redbelly bounty",
      "VAULT 01 Genesis mint page on Redbelly Mainnet",
      "KYC and Wallet Activation guide",
      "TrustPass \u2014 identity-gated ERC-20 on Redbelly Testnet",
      "Ongoing content, community and DAO contribution",
    ],
  },
  {
    id: "arc",
    name: "ARC",
    ring: "inner",
    role: "BUILDER",
    categories: ["BUILD", "PRODUCT", "COMMUNITY", "IRL"],
    summary:
      "Two of my products run on Arc. Stablecoin-native infrastructure made the payment ideas worth building.",
    facts: [
      "FinFlow \u2014 USDC payment links, invoices, payouts, escrow",
      "InfluenceFi \u2014 creator escrow with 48h auto-release",
      "ARC builders IRL, Benin City",
    ],
  },
  {
    id: "circle",
    name: "CIRCLE",
    ring: "inner",
    role: "BUILDER",
    categories: ["BUILD", "PRODUCT"],
    summary: "Circle USDC is the settlement layer underneath FinFlow and InfluenceFi.",
    facts: [
      "USDC as the unit of account in FinFlow",
      "Escrow and payout flows built on Circle USDC",
      "Live NGN, KES and GHS conversion surfaced in the dashboard",
    ],
  },
  {
    id: "plume",
    name: "PLUME",
    ring: "inner",
    role: "COMMUNITY",
    categories: ["COMMUNITY", "IRL", "CONTENT", "AMBASSADOR"],
    summary: "Community and onboarding work around a network built for real world assets.",
    facts: ["Community onboarding", "Content", "IRL activation"],
  },
  {
    id: "monad",
    name: "MONAD",
    ring: "inner",
    role: "COMMUNITY · GROWTH",
    categories: ["COMMUNITY", "GROWTH", "CONTENT"],
    summary: "Community and growth work while the ecosystem was still mostly a promise.",
    facts: ["Community", "Growth", "Content"],
  },
  {
    id: "union",
    name: "UNION",
    ring: "inner",
    role: "COMMUNITY",
    categories: ["COMMUNITY", "IRL", "AMBASSADOR"],
    summary: "Interoperability is a hard sell in a room. It is a much easier sell in person.",
    facts: ["Community", "IRL activation", "Hosted an IRL around the ecosystem"],
  },
  {
    id: "xora",
    name: "XORA",
    ring: "outer",
    role: "COMMUNITY · GROWTH",
    categories: ["COMMUNITY", "GROWTH", "AMBASSADOR"],
    summary: "Onboarding work that turned into a number I can point at.",
    facts: ["1,000+ members onboarded", "Onboarding flow + support", "Growth"],
  },
  {
    id: "swisstronik",
    name: "SWISSTRONIK",
    ring: "outer",
    role: "ECOSYSTEM",
    categories: ["COMMUNITY", "CONTENT", "AMBASSADOR"],
    summary: "Privacy infrastructure. Worked within the ecosystem across community and content.",
    facts: ["Community", "Content", "Ecosystem participation"],
  },
  {
    id: "hyperbolic",
    name: "HYPERBOLIC",
    ring: "outer",
    role: "ECOSYSTEM",
    categories: ["COMMUNITY", "CONTENT", "AMBASSADOR"],
    summary: "Decentralised compute. Worked within the ecosystem across community and content.",
    facts: ["Community", "Content", "Ecosystem participation"],
  },
  {
    id: "aurory",
    name: "AURORY",
    ring: "outer",
    role: "ECOSYSTEM",
    categories: ["COMMUNITY", "CONTENT"],
    summary: "Gaming was where I learned that onboarding is a product problem, not a marketing one.",
    facts: ["Gaming ecosystem", "Community", "Content"],
  },
  {
    id: "mmt-finance",
    name: "MMT FINANCE",
    ring: "outer",
    role: "ECOSYSTEM",
    categories: ["CONTENT", "COMMUNITY"],
    summary: "DeFi. Worked within the ecosystem across content and community.",
    facts: ["DeFi", "Content", "Community"],
  },
  {
    id: "byrep",
    name: "BYREP",
    ring: "outer",
    role: "ECOSYSTEM",
    categories: ["COMMUNITY", "GROWTH"],
    summary: "Worked within the ecosystem across community and growth.",
    facts: ["Community", "Growth", "Ecosystem participation"],
  },
  {
    id: "jup",
    name: "JUP",
    ring: "outer",
    role: "IRL",
    categories: ["IRL", "COMMUNITY"],
    summary: "Hosted an IRL for the community. Explained the ecosystem to people in a room.",
    facts: ["Hosted an IRL", "Community", "Onboarding"],
  },
];

export const ecosystemIndex: Record<string, EcosystemNode> = Object.fromEntries(
  ecosystemNodes.map((n) => [n.id, n]),
);
