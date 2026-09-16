export type BuildStatus = "BUILDING" | "EXPLORING" | "SHIPPING" | "RESEARCHING";

export type CurrentBuild = {
  name: string;
  status: BuildStatus;
  summary: string;
  meta: string;
  href?: string;
};

export const currentBuilds: CurrentBuild[] = [
  {
    name: "FinFlow",
    status: "BUILDING",
    summary: "Stablecoin payment infrastructure for African freelancers, startups, DAOs and businesses.",
    meta: "USDC \u00b7 ARC \u00b7 CIRCLE",
    href: "https://finflow-ebon-iota.vercel.app/",
  },
  {
    name: "VAULT 01",
    status: "SHIPPING",
    summary: "Tokenised physical collectibles on Redbelly. Genesis drop of 500, 50 watch-backed.",
    meta: "RBNT \u00b7 MAINNET \u00b7 151",
    href: "https://redbelly-nft-mint.vercel.app/",
  },
  {
    name: "Arc ecosystem",
    status: "EXPLORING",
    summary: "More payment primitives around stablecoins \u2014 escrow, payouts and money that settles instantly.",
    meta: "PAYMENTS \u00b7 INFRA",
  },
  {
    name: "Web3 growth",
    status: "BUILDING",
    summary: "Community, content and ecosystem work for teams who need someone close to the actual work.",
    meta: "COMMUNITY \u00b7 CONTENT \u00b7 IRL",
  },
];
