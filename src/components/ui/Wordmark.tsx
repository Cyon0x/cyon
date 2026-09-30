import { identity } from "@/data/site";
import { cn } from "@/lib/utils";
import { Mark } from "./Mark";

/**
 * The name, as a mark rather than a caption.
 *
 * Heavy grotesk for the handle, a high contrast serif for the legal name, and
 * one signal slash holding the two together — the same pairing the section
 * headings use, so the masthead reads as part of the page instead of a label
 * stuck on top of it.
 */
export function Wordmark({
  size = "nav",
  className,
  legalClassName,
  id,
}: {
  size?: "nav" | "hero";
  className?: string;
  legalClassName?: string;
  id?: string;
}) {
  const hero = size === "hero";

  return (
    <span id={id} className={cn("flex items-center", hero ? "gap-4" : "gap-2.5", className)}>
      <Mark size={hero ? 42 : 23} className="text-ink" />
      <span className={cn("flex items-baseline", hero ? "gap-3" : "gap-2")}>
        <span
          className={cn(
            "font-bold uppercase leading-none text-ink",
            hero
              ? "text-[length:clamp(1.7rem,3.4vw,2.9rem)] tracking-[-0.03em]"
              : "text-[19px] tracking-[-0.025em]",
          )}
        >
          {identity.name}
        </span>
        <span
          aria-hidden
          className={cn(
            "serif italic leading-none text-signal",
            hero
              ? "text-[length:clamp(1.1rem,2vw,1.7rem)]"
              : "hidden text-[15px] sm:inline",
          )}
        >
          /
        </span>
        <span
          className={cn(
            "serif italic leading-none text-signal",
            hero
              ? "text-[length:clamp(0.95rem,1.6vw,1.45rem)]"
              : "hidden text-[13px] sm:inline",
            legalClassName,
          )}
        >
          {identity.legalName}
        </span>
      </span>
    </span>
  );
}
