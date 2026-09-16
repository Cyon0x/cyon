import { cn } from "@/lib/utils";

/**
 * Cyon mark: a cut square with an orbiting node. Built from the same
 * primitives as the rest of the site — sharp corners, one accent.
 */
export function Mark({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
    >
      <path
        d="M3 3h18v13l-5 5H3V3z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        opacity="0.55"
      />
      <circle cx="12" cy="10.5" r="2.6" fill="var(--signal)" />
      <path d="M3 16.2h13.2" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
    </svg>
  );
}
