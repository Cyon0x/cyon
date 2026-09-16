"use client";

import { useEffect, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";

type CounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const format = (n: number, suffix: string) =>
  `${Math.round(n).toLocaleString("en-US")}${suffix}`;

/** Counts up once, when it first enters the viewport. Nothing else. */
export function Counter({ value, suffix = "", duration = 1400, className }: CounterProps) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      setProgress(easeOut(elapsed));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, duration, reduced]);

  // The final value is derived, so nothing has to be written to state to land it.
  const shown = !inView ? 0 : reduced ? value : value * progress;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{format(value, suffix)}</span>
      <span aria-hidden className="tnum">
        {format(shown, suffix)}
      </span>
    </span>
  );
}
