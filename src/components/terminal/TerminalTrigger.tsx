"use client";

import { openTerminal } from "@/components/chrome/SiteNav";
import { TerminalIcon } from "@/components/ui/Icons";

export function TerminalTrigger({
  label = "OPEN TERMINAL",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={openTerminal}
      className={className ?? "btn"}
      data-cursor="RUN"
      aria-haspopup="dialog"
    >
      <span>
        <TerminalIcon width={13} height={13} />
        {label}
        <span className="label !text-[9px] opacity-60">⌘K</span>
      </span>
    </button>
  );
}
