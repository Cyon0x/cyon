export type CodeFragment = {
  text: string;
  tone?: "signal" | "electric" | "ember" | "violet" | "mute";
  size?: "xs" | "sm" | "md";
  className?: string;
};

/**
 * Background code layer. Sparse, deliberate, never a full-screen matrix.
 * Fragments are placed explicitly so the composition stays art-directed.
 */
export const codeFragments: CodeFragment[] = [
  { text: "const builder = \"cyon\";", tone: "signal", size: "sm", className: "left-[1%] top-[9%] hidden 2xl:block" },
  { text: "chain.connect(\"redbelly\");", tone: "electric", size: "xs", className: "left-[1%] top-[64%] hidden 2xl:block" },
  { text: "chain.connect(\"arc\");", tone: "electric", size: "xs", className: "left-[1%] top-[69%] hidden 2xl:block" },
  { text: "await contract.mint();", tone: "mute", size: "xs", className: "left-[1%] bottom-[6%] hidden 2xl:block" },
  { text: "chainId: 151", tone: "signal", size: "xs", className: "right-[1.5%] top-[19%] hidden sm:block" },
  { text: "USDC", tone: "mute", size: "md", className: "right-[1%] top-[44%] hidden 2xl:block" },
  { text: "contract.deploy();", tone: "mute", size: "xs", className: "right-[2%] top-[63%] hidden 2xl:block" },
  { text: "const community = grow();", tone: "ember", size: "xs", className: "right-[1.5%] bottom-[4%] hidden 2xl:block" },
  { text: "ERC721 // genesis", tone: "violet", size: "xs", className: "left-[52%] top-[12%] hidden xl:block" },
  { text: "product.ship();", tone: "signal", size: "xs", className: "left-[68%] bottom-[6%] hidden xl:block" },
  { text: "RBNT", tone: "mute", size: "md", className: "left-[1%] top-[38%] hidden 2xl:block" },
  { text: "wallet.connect();", tone: "electric", size: "xs", className: "right-[1.5%] top-[80%] hidden 2xl:block" },
];

export const ticker = [
  "REDBELLY",
  "ARC",
  "CIRCLE",
  "PLUME",
  "UNION",
  "MONAD",
  "TRUSTPASS",
  "FINFLOW",
  "VAULT 01",
  "INFLUENCEFI",
  "SWISSTRONIK",
  "HYPERBOLIC",
  "XORA",
];
