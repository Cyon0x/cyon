export type IrlStop = {
  code: string;
  ecosystem: string;
  place: string;
  year: string;
  role: string;
  tags: string[];
  note: string;
};

export const irlStops: IrlStop[] = [
  {
    code: "IRL / 001",
    ecosystem: "ARC",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "BUILDERS", "WEB3"],
    note:
      "A room of builders in Benin City talking about stablecoins, payments and what is actually worth building on Arc.",
  },
  {
    code: "IRL / 002",
    ecosystem: "PLUME",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "ONBOARDING"],
    note: "Onboarding people who had heard the word RWA and never seen one.",
  },
  {
    code: "IRL / 003",
    ecosystem: "UNION",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "BUILDERS", "INTEROP"],
    note: "Interoperability explained without a single diagram of a bridge.",
  },
  {
    code: "IRL / 004",
    ecosystem: "JUP",
    place: "BENIN CITY",
    year: "2025",
    role: "HOST",
    tags: ["COMMUNITY", "ONBOARDING"],
    note: "First wallets, first swaps, first questions.",
  },
  {
    code: "IRL / NEXT",
    ecosystem: "OPEN SLOT",
    place: "YOUR ECOSYSTEM",
    year: "\u2014",
    role: "HOST",
    tags: ["COMMUNITY", "IRL", "OPEN"],
    note:
      "If your ecosystem needs actual people in an actual room, this slot is the one I want to fill next.",
  },
];
