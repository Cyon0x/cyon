/**
 * Verbatim feedback from ecosystems and teams. Quotes are reproduced exactly
 * as provided — nothing here is rewritten, embellished or paraphrased.
 */
export type Testimonial = {
  id: string;
  org: string;
  quote: string;
  /** Monogram shown in the frame, taken from the org. */
  initial: string;
  attribution: string;
  /** Lead quote spans the full band; the rest sit as a pair. */
  weight: "lead" | "pair";
};

export const testimonials: Testimonial[] = [
  {
    id: "plume",
    org: "Plume",
    quote:
      "Cyon, I agree with your bio. Ever since I brought you on board, I do feel as though we are now a well-seasoned entrée.",
    initial: "P",
    attribution: "Plume — Ecosystem Team",
    weight: "lead",
  },
  {
    id: "swisstronik",
    org: "Swisstronik",
    quote: "Good job Cyon, good job — and keep working, Cyon.",
    initial: "S",
    attribution: "Swisstronik — Ambassador Program",
    weight: "pair",
  },
  {
    id: "monad",
    org: "Monad",
    quote:
      "Cyon caught issues in our testnet flow our own QA missed. That's the kind of feedback that actually ships fixes.",
    initial: "M",
    attribution: "Monad — Product Team",
    weight: "pair",
  },
  {
    id: "union",
    org: "Union",
    quote:
      "Every campaign Cyon touches gets more organic than paid. The community trusts him because he actually uses the product.",
    initial: "U",
    attribution: "Union — Growth Lead",
    weight: "pair",
  },
  {
    id: "pharos",
    org: "Pharos",
    quote:
      "We handed Cyon a rough dApp and got back a full report — bugs, UX friction, even copy suggestions. Rare to find that level of care.",
    initial: "P",
    attribution: "Pharos — Product Testing",
    weight: "pair",
  },
  {
    id: "cronos",
    org: "Cronos",
    quote:
      "Cyon doesn't just post about ecosystems, he understands them. His content answers questions before people even ask.",
    initial: "C",
    attribution: "Cronos — Community Team",
    weight: "pair",
  },
];
