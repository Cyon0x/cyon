"use client";

import { useEffect, useState } from "react";
import { sections } from "@/data/sections";
import { useActiveSection } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const ids = sections.map((s) => s.id);

/** Fixed document outline. Says where you are without ever being in the way. */
export function SectionRail() {
  const active = useActiveSection(ids);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Section outline"
      className="pointer-events-none fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 pr-5 2xl:block"
    >
      <div className="relative flex flex-col items-end gap-3 pl-4">
        <span
          aria-hidden
          className="absolute right-0 top-0 w-px bg-line"
          style={{ height: "100%" }}
        />
        <span
          aria-hidden
          className="absolute right-0 w-px bg-signal transition-[height] duration-300"
          style={{ height: `${Math.max(progress * 100, 2)}%`, top: 0 }}
        />
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? "true" : undefined}
              className="pointer-events-auto group flex items-center gap-2.5 pr-3"
            >
              <span
                className={cn(
                  "label whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  isActive && "!text-ink opacity-100",
                )}
              >
                {section.label}
              </span>
              <span
                className={cn(
                  "label !text-[9px] transition-colors",
                  isActive ? "!text-signal" : "group-hover:!text-ink-2",
                )}
              >
                {section.index}
              </span>
              <span
                className={cn(
                  "h-px transition-all duration-300",
                  isActive ? "w-4 bg-signal" : "w-1.5 bg-line-2 group-hover:w-3",
                )}
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
