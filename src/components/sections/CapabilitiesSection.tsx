"use client";

import { useState } from "react";
import { capabilities } from "@/data/capabilities";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function CapabilitiesSection() {
  const [active, setActive] = useState(capabilities[0].id);
  const current = capabilities.find((group) => group.id === active) ?? capabilities[0];

  return (
    <section id="capability" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="08"
          kicker="CAPABILITY"
          title={
            <>
              Four things,
              <span className="serif italic"> done </span>
              together
            </>
          }
          lead="No percentages. Nobody has ever hired someone because a bar was 90% full. Here is the work, grouped."
        />

        <div className="mt-14 grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* selector */}
          <div className="col-span-12 lg:col-span-4">
            <ul className="border-t border-line" role="tablist" aria-label="Capability groups">
              {capabilities.map((group) => {
                const isActive = group.id === active;
                return (
                  <li key={group.id} className="border-b border-line">
                    <button
                      type="button"
                      role="tab"
                      id={`tab-${group.id}`}
                      aria-selected={isActive}
                      aria-controls={`panel-${group.id}`}
                      onClick={() => setActive(group.id)}
                      onMouseEnter={() => setActive(group.id)}
                      data-cursor="VIEW"
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="label !text-[9px]">{group.code}</span>
                        <span
                          className={cn(
                            "text-[length:var(--text-h3)] tracking-[-0.02em] transition-colors",
                            isActive ? "text-ink" : "text-ink-3 group-hover:text-ink-2",
                          )}
                        >
                          {isActive ? <span className="serif italic">{group.label}</span> : group.label}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "h-px transition-all duration-500",
                          isActive ? "w-10 bg-signal" : "w-4 bg-line-2 group-hover:w-7",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* panel */}
          <div
            className="col-span-12 lg:col-span-8"
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
          >
            <p className="text-[length:var(--text-h3)] leading-snug tracking-[-0.02em] text-ink">
              {current.summary}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2.5">
              {current.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={i * 26}
                  className="flex items-baseline gap-3 border-b border-line pb-1.5"
                >
                  <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-signal/70" />
                  <span className="text-[1.02rem] text-ink-2">{item}</span>
                </Reveal>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <span className="label">TOOLING</span>
              <span className="mono text-[11px] text-ink-3">
                NEXT.JS · REACT · TYPESCRIPT · TAILWIND · VIEM / WAGMI · SOLIDITY (EXPERIMENTATION) ·
                FIGMA · GIT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
