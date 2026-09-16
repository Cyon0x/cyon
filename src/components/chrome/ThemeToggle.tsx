"use client";

import { useTheme } from "@/lib/hooks";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/** Two explicit states. Labelled, keyboard reachable, honest about which is on. */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={theme === "light"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} environment`}
      data-cursor="SWITCH"
      className={cn(
        "group relative flex h-8 items-center border border-line transition-colors hover:border-line-2",
        className,
      )}
    >
      <span className="sr-only">Colour environment</span>
      <span
        className={cn(
          "flex h-full items-center gap-1.5 px-2.5 transition-colors",
          theme === "dark" ? "bg-signal text-signal-ink" : "text-ink-3",
        )}
      >
        <MoonIcon width={13} height={13} />
        <span className="label hidden !text-[9px] !tracking-[0.16em] !text-inherit sm:inline">DARK</span>
      </span>
      <span
        className={cn(
          "flex h-full items-center gap-1.5 px-2.5 transition-colors",
          theme === "light" ? "bg-signal text-signal-ink" : "text-ink-3",
        )}
      >
        <SunIcon width={13} height={13} />
        <span className="label hidden !text-[9px] !tracking-[0.16em] !text-inherit sm:inline">LIGHT</span>
      </span>
    </button>
  );
}
