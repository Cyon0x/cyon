import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
};

export function SectionHeading({ index, kicker, title, lead, className }: SectionHeadingProps) {
  return (
    <header className={cn("relative", className)}>
      <Reveal className="flex items-center gap-4">
        <span className="label label-ink">{index}</span>
        <span className="hair flex-1" />
        <span className="label">{kicker}</span>
      </Reveal>

      <Reveal delay={60}>
        <h2 className="mt-7 max-w-[22ch] text-[length:var(--text-display)] leading-[0.95]">{title}</h2>
      </Reveal>

      {lead ? (
        <Reveal delay={120}>
          <div className="mt-6 max-w-[64ch] text-ink-2">{lead}</div>
        </Reveal>
      ) : null}
    </header>
  );
}
