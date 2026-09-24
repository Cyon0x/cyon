"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { identity } from "@/data/site";
import { usePointerParallax } from "@/lib/hooks";
import { cn, svgCoord } from "@/lib/utils";
import { PlusIcon } from "@/components/ui/Icons";

/** Fixed callouts. Hand-placed so the composition stays deliberate. */
const callouts = [
  { label: "ARC", side: "left", top: "13%", offset: "-7%" },
  { label: "REDBELLY", side: "left", top: "46%", offset: "-11%" },
  { label: "USDC", side: "left", top: "79%", offset: "-4%" },
  { label: "PLUME", side: "right", top: "16%", offset: "0%" },
  { label: "MONAD", side: "right", top: "49%", offset: "0%" },
  { label: "UNION", side: "right", top: "82%", offset: "0%" },
] as const;

/** Nodes riding the outer ring. Angles in degrees. */
const ringNodes = [12, 58, 104, 150, 196, 242, 288, 334];

const readout = [
  { k: "STATUS", v: "BUILDING" },
  { k: "FOCUS", v: "PRODUCT / GROWTH / ECOSYSTEMS" },
  { k: "BASE", v: `${identity.timezoneLabel} \u00b7 ${identity.timezoneCity.toUpperCase()}` },
  { k: "MODE", v: "SHIP" },
];

export function HeroOrbit() {
  const parallaxRef = usePointerParallax<HTMLDivElement>(true, "--hx");
  const stageRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const node = stageRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - cx, event.clientY - cy);
    const threshold = rect.width * 0.66;
    setNear((prev) => {
      const next = distance < threshold;
      return prev === next ? prev : next;
    });
  }, []);

  return (
    <div
      ref={parallaxRef}
      className="orbit-stage relative mx-auto w-full max-w-[520px]"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setNear(false)}
    >
      <div className="relative aspect-square w-full">
        {/* ---------------------------------------------------------------- */}
        {/* Layer 1 — slow: fixed ecosystem callouts                          */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="absolute inset-0 hidden transition-opacity duration-500 lg:block"
          style={{
            transform:
              "translate3d(calc(var(--hx-x) * 7px), calc(var(--hx-y) * 7px), 0)",
          }}
          aria-hidden
        >
          {callouts.map((callout) => (
            <div
              key={callout.label}
              className={cn(
                "absolute flex items-center gap-2",
                callout.side === "left" ? "flex-row" : "flex-row-reverse",
              )}
              style={{
                top: callout.top,
                ...(callout.side === "left"
                  ? { left: callout.offset }
                  : { right: callout.offset }),
              }}
            >
              <span className="label !text-[9px] whitespace-nowrap !text-ink-2">
                {callout.label}
              </span>
              <span
                className={callout.side === "left" ? "h-px w-5 bg-line-2 sm:w-8" : "h-px w-4 bg-line-2"}
              />
              <span className="h-1 w-1 rounded-full bg-signal/70" />
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Layer 2 — mid: rings, nodes, portrait                             */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="absolute inset-0"
          style={{
            transform:
              "translate3d(calc(var(--hx-x) * -14px), calc(var(--hx-y) * -14px), 0)",
          }}
        >
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden
          >
            <g stroke="var(--line-2)" strokeWidth="0.45">
              <circle cx="100" cy="100" r="63" strokeDasharray="1 4" className="spin-slow" style={{ transformOrigin: "100px 100px" }} />
              <circle cx="100" cy="100" r="78" strokeDasharray="8 6" className="spin-rev" style={{ transformOrigin: "100px 100px" }} />
            </g>

            <g stroke="var(--line)" strokeWidth="0.45">
              <line x1="100" y1="22" x2="100" y2="178" />
              <line x1="22" y1="100" x2="178" y2="100" />
            </g>

            {ringNodes.map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x = svgCoord(100 + Math.cos(rad) * 78);
              const y = svgCoord(100 + Math.sin(rad) * 78);
              const inner = svgCoord(100 + Math.cos(rad) * 63);
              const innerY = svgCoord(100 + Math.sin(rad) * 63);
              return (
                <g key={angle}>
                  <line
                    x1={inner}
                    y1={innerY}
                    x2={x}
                    y2={y}
                    stroke="var(--line-2)"
                    strokeWidth="0.45"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="1.6"
                    fill={i % 3 === 0 ? "var(--signal)" : "var(--ink-3)"}
                  />
                </g>
              );
            })}

            {/* One packet tracing the outer ring. */}
            <g className="spin-mid" style={{ transformOrigin: "100px 100px" }}>
              <circle cx="100" cy="22" r="2.1" fill="var(--electric)" />
              <circle cx="100" cy="22" r="5" stroke="var(--electric)" strokeWidth="0.4" opacity="0.5" />
            </g>
            <g className="spin-rev" style={{ transformOrigin: "100px 100px" }}>
              <circle cx="100" cy="178" r="1.6" fill="var(--ember)" />
            </g>
          </svg>

          {/* Portrait */}
          <div className="absolute left-1/2 top-1/2 w-[54%] -translate-x-1/2 -translate-y-1/2">
            <div
              ref={stageRef}
              data-cursor="VIEW"
              className="group relative aspect-square"
            >
              {/* offset frame layers */}
              <span
                className="absolute inset-0 border border-line-2 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2"
                aria-hidden
              />
              <span
                className="absolute inset-0 border border-signal/40 transition-transform duration-500"
                style={{ transform: "translate(9px, 9px)" }}
                aria-hidden
              />

              <div
                className={cn(
                  "relative h-full w-full overflow-hidden bg-raise transition-transform duration-500",
                  near ? "scale-[1.015]" : "scale-100",
                )}
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 78%, 78% 100%, 0 100%)",
                }}
              >
                <Image
                  src={identity.pfp}
                  alt="Portrait of Cyon, Web3 builder and growth operator."
                  fill
                  priority
                  sizes="(max-width: 1024px) 70vw, 280px"
                  quality={92}
                  className="object-cover transition-transform duration-700"
                  style={{ transform: near ? "scale(1.05)" : "scale(1.01)" }}
                />
                {/* scan + tint */}
                <span
                  className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
                  }}
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 45%, color-mix(in srgb, var(--bg) 78%, transparent) 100%)",
                  }}
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-40"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in srgb, var(--electric) 40%, transparent), transparent)",
                    animation: "cyon-scan 7s ease-in-out infinite",
                  }}
                  aria-hidden
                />
              </div>

              {/* corner tag */}
              <span className="absolute -left-3 -top-3 flex h-6 w-6 items-center justify-center border border-line-2 bg-bg text-signal">
                <PlusIcon width={11} height={11} />
              </span>

              {/* readout pinned to the portrait */}
              <div
                className={cn(
                  "absolute -bottom-6 -left-3 hidden flex-col gap-1 border border-line bg-bg/92 px-3 py-2 backdrop-blur-sm transition-all duration-400 lg:flex",
                  near
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0",
                )}
                aria-hidden={!near}
              >
                <span className="label !text-[9px] !text-signal">
                  CYON — {identity.status}
                </span>
                {readout.slice(0, 3).map((row) => (
                  <span key={row.k} className="mono text-[9.5px] leading-snug text-ink-3">
                    <span className="text-ink-3/70">{row.k}:</span>{" "}
                    <span className="text-ink-2">{row.v}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Layer 3 — fast: foreground fragments                              */}
        {/* ---------------------------------------------------------------- */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            transform:
              "translate3d(calc(var(--hx-x) * 24px), calc(var(--hx-y) * 24px), 0)",
          }}
          aria-hidden
        >
          <span className="mono absolute -right-2 top-2 text-[10px] text-electric/70">
            usdc.transfer();
          </span>
          <span className="mono absolute -left-6 bottom-10 text-[10px] text-signal/70">
            product.ship();
          </span>
        </div>
      </div>

      {/* Mobile readout — always visible, no hover on touch. */}
      <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 lg:hidden">
        <span className="label !text-[9px] col-span-2 !text-signal">
          CYON — {identity.status}
        </span>
        {readout.map((row) => (
          <span
            key={row.k}
            className={`mono text-[10px] leading-snug text-ink-3 ${
              row.k === "FOCUS" ? "col-span-2" : ""
            }`}
          >
            {row.k}: <span className="text-ink-2">{row.v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
