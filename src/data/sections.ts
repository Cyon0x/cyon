export type SectionRef = { id: string; index: string; label: string };

/** The full document outline. Drives the rail, the terminal and deep links. */
export const sections: SectionRef[] = [
  { id: "top", index: "01", label: "WORKSPACE" },
  { id: "identity", index: "02", label: "IDENTITY" },
  { id: "network", index: "03", label: "NETWORK" },
  { id: "proof", index: "04", label: "PROOF OF WORK" },
  { id: "builds", index: "05", label: "BUILDS" },
  { id: "bounty", index: "06", label: "BOUNTY WON" },
  { id: "current", index: "07", label: "BUILDING NOW" },
  { id: "capability", index: "08", label: "CAPABILITY" },
  { id: "irl", index: "09", label: "IRL" },
  { id: "process", index: "10", label: "HOW I WORK" },
  { id: "contact", index: "11", label: "CONTACT" },
];
