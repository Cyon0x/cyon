import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  duration?: number;
  separator?: string;
  className?: string;
};

export function Marquee({ items, duration = 46, separator = "\u2014", className }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("marquee relative overflow-hidden", className)} aria-hidden>
      <div className="marquee-track" style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="label flex shrink-0 items-center whitespace-nowrap">
            <span className="px-5">{item}</span>
            <span className="text-ink-3/60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
