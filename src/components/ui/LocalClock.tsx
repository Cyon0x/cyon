"use client";

import { identity } from "@/data/site";
import { useZoneClock } from "@/lib/hooks";

export function LocalClock({ className }: { className?: string }) {
  const time = useZoneClock(identity.timezone);

  return (
    <span className={className}>
      {identity.timezoneLabel} <span className="tnum text-ink-2">{time}</span>
    </span>
  );
}
