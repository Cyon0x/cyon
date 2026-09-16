export type ProjectLayout = "wide" | "rail" | "offset" | "split" | "compact";

export type Project = {
  id: string;
  index: string;
  name: string;
  role: string;
  chain: string;
  year: string;
  status: "LIVE" | "PUBLIC BUILD";
  /** One line. Sits next to the preview. */
  summary: string;
  /** The paragraph. Written like a person, not a brochure. */
  detail: string;
  /** What is actually inside the build. */
  built: string[];
  /** A detail pulled from the real product, used as a small technical note. */
  note?: string;
  preview: string;
  alt: string;
  href: string;
  repo?: string;
  accent: string;
  layout: ProjectLayout;
};

export const projects: Project[] = [
  {
    id: "finflow",
    index: "01",
    name: "FinFlow",
    role: "Founder / Builder",
    chain: "ARC · CIRCLE USDC",
    year: "2025",
    status: "LIVE",
    summary: "Stablecoin payments for the way money actually moves in Africa.",
    detail:
      "FinFlow takes USDC on Arc and builds the unglamorous, useful parts of payments around it: links you can send, invoices that generate themselves, batch payouts, payroll runs, escrow with real release conditions, live NGN / KES / GHS rates and a history that adds up. The line I wrote for it was \u201cStripe for crypto payments in Africa\u201d. The point being that a freelancer in Benin City should not need to understand gas to get paid by a client in Berlin.",
    built: [
      "USDC payment links",
      "Invoices + PDF export",
      "Batch payouts",
      "Payroll runs",
      "Escrow contracts",
      "Recurring payments",
      "Time-locked payments",
      "Team wallets",
      "Off-ramp path",
      "Wallet connection",
      "Payment history",
      "Circle USDC on Arc",
    ],
    note: "Payment links, invoices, payouts and escrow all run against Arc, with live NGN, KES and GHS rates on the dashboard.",
    preview: "/projects/finflow.webp",
    alt: "FinFlow dashboard showing USDC balance, received and pending invoice panels, escrow state and quick actions.",
    href: "https://finflow-ebon-iota.vercel.app/",
    repo: "https://github.com/Cyon0x/finflow",
    accent: "var(--electric)",
    layout: "wide",
  },
  {
    id: "vault01",
    index: "02",
    name: "VAULT 01",
    role: "Design + Build",
    chain: "REDBELLY MAINNET · 151",
    year: "2025",
    status: "LIVE",
    summary: "A mint page for 500 Genesis tokens, 50 of them backed by physical watches.",
    detail:
      "VAULT 01 explores the seam between physical collectibles and onchain ownership. I built the mint interface around Redbelly Mainnet: chain validation, wallet connection, quantity control, a live total, real gas estimation and the transaction states people actually see when something stalls. It is EVM-compatible architecture doing a very simple job \u2014 letting someone own something without having to trust a spreadsheet.",
    built: [
      "EVM-compatible mint flow",
      "Wallet connection",
      "Chain validation \u00b7 chain ID 151",
      "Quantity + live total",
      "Gas estimation",
      "Transaction states",
      "Collection metadata",
      "Responsive Web3 frontend",
    ],
    note: "Genesis drop: 500 tokens, 50 connected to limited-edition mechanical watches. Priced in RBNT with gas paid on top.",
    preview: "/projects/vault01.webp",
    alt: "VAULT 01 Genesis Collection mint page on Redbelly Mainnet showing supply, price in RBNT and a connect wallet flow.",
    href: "https://redbelly-nft-mint.vercel.app/",
    repo: "https://github.com/Cyon0x/redbelly-nft-mint",
    accent: "var(--ember)",
    layout: "rail",
  },
  {
    id: "influencefi",
    index: "03",
    name: "InfluenceFi",
    role: "Founder / Builder",
    chain: "ARC · CIRCLE USDC",
    year: "2025",
    status: "LIVE",
    summary: "Brands hire creators. Creators get paid the moment the work is approved.",
    detail:
      "InfluenceFi holds USDC in escrow on Arc the second a brand hires a creator. Funds release when the work is approved, or automatically after 48 hours so nobody is stuck waiting on a slow approver in another time zone. Creator discovery, campaign collaboration, reputation and an onchain agreement underneath. The fee is 1% and that is the whole fee.",
    built: [
      "Creator discovery",
      "Brand + creator profiles",
      "Campaign collaboration",
      "Onchain agreements",
      "USDC escrow",
      "48h auto-release",
      "Reputation",
      "1% platform fee",
    ],
    note: "Escrow releases on approval, with a 48 hour automatic fallback so creators are never held hostage by an inactive approver.",
    preview: "/projects/influencefi.webp",
    alt: "InfluenceFi landing page describing onchain creator hiring with USDC escrow, plus live testnet stats.",
    href: "https://influence-orpin.vercel.app/",
    repo: "https://github.com/Cyon0x/influence",
    accent: "var(--ember)",
    layout: "offset",
  },
  {
    id: "redbelly-dao",
    index: "04",
    name: "Redbelly DAO",
    role: "Design + Build",
    chain: "REDBELLY · RBNT",
    year: "2025",
    status: "LIVE",
    summary: "A governance interface for a compliant L1 \u2014 and the build that won a bounty.",
    detail:
      "Redbelly is a compliant Layer 1 built for real world assets, and its community needed a place to actually govern it. I designed and built a DAO interface where the state of the network is visible before you are asked to vote: treasury, active proposals, open tasks, contributors. Three doors in \u2014 developers, DAO, institutional \u2014 and no dead ends. It won a Redbelly bounty, and the official Redbelly Network account posted it.",
    built: [
      "DAO interface",
      "Proposal interaction",
      "Network pulse readouts",
      "Wallet integration",
      "Voting flow",
      "Treasury + contributor surface",
      "Responsive Web3 UI",
    ],
    note: "The interface leads with treasury, active proposals, open tasks and contributor count \u2014 the numbers a voter needs before reading a proposal.",
    preview: "/projects/redbelly-dao.webp",
    alt: "Redbelly DAO interface showing governance hero copy and a network pulse panel with treasury and proposal counts.",
    href: "https://redbelly-dao.vercel.app/",
    repo: "https://github.com/Cyon0x/redbelly-dao",
    accent: "var(--signal)",
    layout: "split",
  },
  {
    id: "trustpass",
    index: "05",
    name: "TrustPass",
    role: "Build",
    chain: "REDBELLY TESTNET · 153",
    year: "2026",
    status: "LIVE",
    summary: "A Sybil-resistant ERC-20 that only verified humans can mint.",
    detail:
      "Most Sybil resistance is a whitelist wearing a costume. TPASS does not keep a list at all. It reads Redbelly's native onchain identity infrastructure and gates the mint on verification state, so eligibility is a chain read rather than a spreadsheet someone has to maintain. Small, deliberate, and honest about what it can prove.",
    built: [
      "ERC-20",
      "Onchain KYC gate",
      "No centralized whitelist",
      "Sub-8k gas eligibility check",
      "Test coverage",
      "Redbelly Testnet \u00b7 chain ID 153",
    ],
    note: "Eligibility resolves from Redbelly's identity layer at call time \u2014 there is no maintainer to bribe or forget to update.",
    preview: "/projects/trustpass.webp",
    alt: "TrustPass landing page explaining a Sybil-resistant ERC-20 gated by Redbelly onchain KYC.",
    href: "https://trustpass-tpass.vercel.app/",
    repo: "https://github.com/Cyon0x/trustpass",
    accent: "var(--signal)",
    layout: "compact",
  },
  {
    id: "redbelly-kyc-guide",
    index: "06",
    name: "KYC & Wallet Activation",
    role: "Research + Write",
    chain: "REDBELLY",
    year: "2026",
    status: "LIVE",
    summary: "The onboarding document I kept having to paste into DMs.",
    detail:
      "KYC and wallet activation is where most newcomers to Redbelly stall, and the answers were scattered across docs, community channels and screenshots. I turned it into one linear path \u2014 verify, then activate \u2014 with every claim labelled by source so a reader can tell what is official and what is community-reported. This is the guide I use when I bring people in.",
    built: [
      "Two-phase flow",
      "Source-labelled claims",
      "Newcomer-first copy",
      "Five recurring questions answered",
      "Plain language",
    ],
    note: "Every statement is tagged as official or community-reported, because onboarding fails when people cannot tell the difference.",
    preview: "/projects/redbelly-kyc.webp",
    alt: "Redbelly KYC and Wallet Activation guide landing page with a two phase verification path.",
    href: "https://redbelly-kyc-guide.vercel.app/",
    repo: "https://github.com/Cyon0x/redbelly-kyc-guide",
    accent: "var(--violet)",
    layout: "compact",
  },
];

export const featuredProjects = projects.filter((p) => p.layout !== "compact");
export const supportingProjects = projects.filter((p) => p.layout === "compact");
