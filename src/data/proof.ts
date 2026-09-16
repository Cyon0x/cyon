export type Metric = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  note: string;
  /** Formats the number the way the label implies. */
  display?: (n: number) => string;
};

const plain = (n: number) => Math.round(n).toLocaleString("en-US");

export const metrics: Metric[] = [
  {
    value: 4,
    suffix: "+",
    label: "YEARS IN WEB3",
    note: "DeFi, infrastructure, privacy, gaming, payments, emerging L1s.",
    display: (n) => `${n}+`,
  },
  {
    value: 7600,
    suffix: "+",
    label: "X FOLLOWERS",
    note: "Grown by explaining ecosystems in public, not by farming engagement.",
    display: (n) => `${plain(n)}+`,
  },
  {
    value: 25,
    suffix: "+",
    label: "ECOSYSTEM PROGRAMMES",
    note: "Ambassador, contributor, growth and community roles across ecosystems.",
    display: (n) => `${n}+`,
  },
  {
    value: 1000,
    suffix: "+",
    label: "MEMBERS ONBOARDED",
    note: "Community members brought through XORA onboarding.",
    display: (n) => `${plain(n)}+`,
  },
];

export type CampaignRow = {
  value: number;
  suffix: string;
  label: string;
  /** Relative weight for the bar, 0-1. */
  weight: number;
};

export const redbellyCampaign = {
  title: "REDBELLY CONTRIBUTION",
  window: "A 10 WEEK PUSH",
  rows: [
    { value: 100000, suffix: "", label: "IMPRESSIONS", weight: 1 },
    { value: 10000, suffix: "+", label: "LIKES", weight: 0.42 },
    { value: 5000, suffix: "+", label: "REPOSTS", weight: 0.26 },
    { value: 10000, suffix: "+", label: "VIDEO VIEWS", weight: 0.34 },
    { value: 100, suffix: "+", label: "REPLIES", weight: 0.12 },
    { value: 3, suffix: "+", label: "ARTICLES AT 15K+ IMPRESSIONS", weight: 0.18 },
    { value: 3000, suffix: "+", label: "NET NEW FOLLOWERS", weight: 0.3 },
  ] as CampaignRow[],
  display: (n: number, suffix: string) =>
    `${n >= 1000 ? `${n / 1000}K` : n}${suffix}`,
};

export const bounty = {
  code: "BOUNTY / 01",
  kicker: "DESIGN \u2192 BUILD \u2192 SHIP \u2192 WIN",
  title: "Redbelly DAO",
  subtitle: "GOVERNANCE INTERFACE",
  copy:
    "I designed and built a DAO interface for the Redbelly ecosystem. It won a Redbelly bounty, and the official Redbelly Network account posted it.",
  links: [
    { label: "VIEW THE WINNING BUILD", href: "https://redbelly-dao.vercel.app/" },
    { label: "SOURCE ON GITHUB", href: "https://github.com/Cyon0x/redbelly-dao" },
    { label: "REDBELLY NETWORK ON X", href: "https://x.com/RedbellyNetwork" },
  ],
};
