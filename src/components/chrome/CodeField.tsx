import { codeFragments, type CodeFragment } from "@/data/code";
import { cn } from "@/lib/utils";

const tones: Record<NonNullable<CodeFragment["tone"]>, string> = {
  signal: "text-signal",
  electric: "text-electric",
  ember: "text-ember",
  violet: "text-violet",
  mute: "text-ink-3",
};

const sizes: Record<NonNullable<CodeFragment["size"]>, string> = {
  xs: "text-[10px]",
  sm: "text-[11px]",
  md: "text-[13px]",
};

/**
 * The background code system. Deliberately sparse: a handful of fragments
 * placed by hand, most of them still. A few drift. None of them shout.
 */
export function CodeField({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {codeFragments.map((fragment, i) => (
        <span
          key={fragment.text}
          className={cn(
            "mono absolute select-none whitespace-nowrap opacity-[0.2]",
            tones[fragment.tone ?? "mute"],
            sizes[fragment.size ?? "xs"],
            fragment.className,
          )}
          style={
            i % 3 === 0
              ? { animation: `cyon-drift ${26 + i * 3}s ease-in-out ${i * 1.6}s infinite` }
              : undefined
          }
        >
          {fragment.text}
        </span>
      ))}
    </div>
  );
}
