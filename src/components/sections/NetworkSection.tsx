"use client";

import { useMemo, useState } from "react";
import { categories, ecosystemNodes, type CategoryId, type EcosystemNode } from "@/data/ecosystem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "@/components/ui/Icons";

const W = 720;
const H = 640;
const CX = W / 2;
const CY = H / 2;
const R_INNER = 132;
const R_OUTER = 244;

type Placed = EcosystemNode & { x: number; y: number; angle: number };

function place(nodes: EcosystemNode[]): Placed[] {
  const inner = nodes.filter((n) => n.ring === "inner");
  const outer = nodes.filter((n) => n.ring === "outer");

  const at = (list: EcosystemNode[], radius: number, offset: number): Placed[] =>
    list.map((node, i) => {
      const angle = -90 + offset + (i * 360) / list.length;
      const rad = (angle * Math.PI) / 180;
      return {
        ...node,
        angle,
        x: CX + Math.cos(rad) * radius,
        y: CY + Math.sin(rad) * radius,
      };
    });

  return [...at(inner, R_INNER, 14), ...at(outer, R_OUTER, 6)];
}

export function NetworkSection() {
  const placed = useMemo(() => place(ecosystemNodes), []);
  const [selected, setSelected] = useState<string>("redbelly");
  const [filter, setFilter] = useState<CategoryId | null>(null);
  const compact = useMediaQuery("(max-width: 1023px)");

  const node = ecosystemNodes.find((n) => n.id === selected) ?? ecosystemNodes[0];
  const activeCategory = categories.find((c) => c.id === filter) ?? null;

  const matches = (n: EcosystemNode) => !filter || n.categories.includes(filter);

  return (
    <section id="network" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="03"
          kicker="ECOSYSTEM GRAPH"
          title={
            <>
              The map, not the
              <span className="serif italic"> logo wall</span>
            </>
          }
          lead="Thirteen ecosystems, and a different job in most of them. Pick a node or filter by what the work actually was."
        />

        {/* Category rail */}
        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <span className="label mr-2">FILTER</span>
            {categories.map((category) => {
              const on = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFilter(on ? null : category.id)}
                  aria-pressed={on}
                  data-cursor="FILTER"
                  className={cn(
                    "mono border px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] transition-colors",
                    on
                      ? "border-signal bg-signal text-signal-ink"
                      : "border-line text-ink-3 hover:border-line-2 hover:text-ink",
                  )}
                >
                  {category.label}
                </button>
              );
            })}
            {filter ? (
              <button
                type="button"
                onClick={() => setFilter(null)}
                className="label ml-1 transition-colors hover:!text-ink"
              >
                CLEAR
              </button>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-12 gap-y-10 lg:gap-x-10">
          {/* ---------------------------------------------------------------- */}
          {/* Graph                                                             */}
          {/* ---------------------------------------------------------------- */}
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="panel ticks relative">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="label">GRAPH / V1</span>
                <span className="label">
                  {filter ? `${placed.filter(matches).length} MATCHING` : `${placed.length} NODES`}
                </span>
              </div>

              <div className="relative aspect-[720/640] w-full px-2 py-3 sm:px-4">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="h-full w-full overflow-visible"
                  aria-hidden
                  role="presentation"
                >
                  {/* rings */}
                  <g fill="none" stroke="var(--line)" strokeWidth="1">
                    <circle cx={CX} cy={CY} r={R_INNER} strokeDasharray="3 5" />
                    <circle cx={CX} cy={CY} r={R_OUTER} />
                    <line x1={CX - R_OUTER} y1={CY} x2={CX + R_OUTER} y2={CY} opacity="0.5" />
                    <line x1={CX} y1={CY - R_OUTER} x2={CX} y2={CY + R_OUTER} opacity="0.5" />
                  </g>

                  {/* decorative rotating dashes */}
                  <g
                    fill="none"
                    stroke="var(--line-2)"
                    strokeWidth="1.2"
                    className="spin-slow"
                    style={{ transformOrigin: `${CX}px ${CY}px` }}
                  >
                    <circle cx={CX} cy={CY} r={R_OUTER + 16} strokeDasharray="2 10" />
                  </g>
                  <g
                    fill="none"
                    stroke="var(--signal)"
                    strokeWidth="1.2"
                    opacity="0.5"
                    className="spin-mid"
                    style={{ transformOrigin: `${CX}px ${CY}px` }}
                  >
                    <circle cx={CX} cy={CY} r={R_INNER - 22} strokeDasharray="14 160" />
                  </g>

                  {/* spokes */}
                  <g>
                    {placed.map((p) => {
                      const on = p.id === selected;
                      const dim = !matches(p);
                      return (
                        <line
                          key={`spoke-${p.id}`}
                          x1={CX}
                          y1={CY}
                          x2={p.x}
                          y2={p.y}
                          stroke={on ? "var(--signal)" : "var(--line-2)"}
                          strokeWidth="1"
                          strokeDasharray={on ? "4 4" : undefined}
                          opacity={dim ? 0.16 : on ? 1 : 0.42}
                        />
                      );
                    })}
                  </g>

                  {/* nodes */}
                  <g>
                    {placed.map((p) => {
                      const on = p.id === selected;
                      const dim = !matches(p);
                      const dx = p.x - CX;
                      const anchor = dx > 40 ? "start" : dx < -40 ? "end" : "middle";
                      const labelX = anchor === "start" ? p.x + 12 : anchor === "end" ? p.x - 12 : p.x;
                      const labelY =
                        anchor === "middle" ? (p.y < CY ? p.y - 16 : p.y + 22) : p.y + 4;

                      return (
                        <g key={p.id} opacity={dim ? 0.22 : 1}>
                          {on ? (
                            <circle
                              cx={p.x}
                              cy={p.y}
                              r={13}
                              fill="none"
                              stroke="var(--signal)"
                              strokeWidth="1"
                              opacity="0.65"
                            />
                          ) : null}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={p.ring === "inner" ? 5 : 4}
                            fill={on ? "var(--signal)" : "var(--signal-ink)"}
                            stroke={on ? "var(--signal)" : "var(--ink-3)"}
                            strokeWidth="1"
                            opacity={on ? 1 : 0.8}
                          />
                          {!compact || p.ring === "inner" ? (
                            <text
                              x={labelX}
                              y={labelY}
                              textAnchor={anchor}
                              className="mono"
                              fontSize={compact ? 19 : 11}
                              letterSpacing="1.6"
                              fill={on ? "var(--signal)" : "var(--ink-2)"}
                              opacity={on ? 1 : 0.85}
                            >
                              {p.name}
                            </text>
                          ) : null}
                          {/* invisible hit target */}
                          <circle
                            cx={p.x}
                            cy={p.y}
                            r={26}
                            fill="transparent"
                            style={{ cursor: "pointer" }}
                            onPointerEnter={() => setSelected(p.id)}
                            onClick={() => setSelected(p.id)}
                          />
                          <title>{`${p.name} — ${p.role}`}</title>
                        </g>
                      );
                    })}
                  </g>

                  {/* centre */}
                  <g>
                    <rect
                      x={CX - 34}
                      y={CY - 15}
                      width="68"
                      height="30"
                      fill="var(--bg)"
                      stroke="var(--line-2)"
                      strokeWidth="1"
                    />
                    <text
                      x={CX}
                      y={CY + 4}
                      textAnchor="middle"
                      className="mono"
                      fontSize="12"
                      letterSpacing="3"
                      fill="var(--ink)"
                    >
                      CYON
                    </text>
                    <text
                      x={CX}
                      y={CY + 30}
                      textAnchor="middle"
                      className="mono"
                      fontSize="8"
                      letterSpacing="1.6"
                      fill="var(--signal)"
                    >
                      {node.name}
                    </text>
                  </g>
                </svg>
              </div>

              <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
                <span className="label">INNER RING / PRIMARY WORK</span>
                <span className="label hidden sm:inline">OUTER RING / ECOSYSTEM</span>
              </div>
            </div>
          </Reveal>

          {/* ---------------------------------------------------------------- */}
          {/* Readout                                                           */}
          {/* ---------------------------------------------------------------- */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={60} className="lg:sticky lg:top-24">
              <div className="panel panel-cut flex h-full min-h-[320px] flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="label">{activeCategory ? "FILTER" : "SELECTED NODE"}</span>
                  <span className="mono text-[10px] text-ink-3">
                    {String(
                      ecosystemNodes.findIndex((n) => n.id === (activeCategory ? node.id : selected)) + 1,
                    ).padStart(2, "0")}
                    /{String(ecosystemNodes.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-5 text-[length:var(--text-h2)] leading-[0.95] tracking-[-0.03em]">
                  {activeCategory ? activeCategory.label : node.name}
                </h3>

                <p className="label mt-3 !text-signal">
                  {activeCategory ? "CAPABILITY AREA" : node.role}
                </p>

                <p className="mt-5 text-[0.97rem] text-ink-2">
                  {activeCategory ? activeCategory.note : node.summary}
                </p>

                {!activeCategory ? (
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {node.facts.map((fact) => (
                      <li key={fact} className="flex items-baseline gap-3">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal/70" />
                        <span className="text-[0.92rem] text-ink-2">{fact}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {placed
                      .filter(matches)
                      .map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => setSelected(p.id)}
                            className="label !text-ink-2 transition-colors hover:!text-signal"
                          >
                            {p.name}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}

                {node.links?.length ? (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {node.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="label inline-flex items-center gap-1.5 !text-ink transition-colors hover:!text-signal"
                      >
                        {link.label}
                        <ArrowUpRight width={12} height={12} />
                      </a>
                    ))}
                  </div>
                ) : null}

                <div className="mt-auto flex flex-wrap gap-1.5 pt-7">
                  {node.categories.map((c) => (
                    <span
                      key={c}
                      className="mono border border-line px-2 py-1 text-[9.5px] uppercase tracking-[0.14em] text-ink-3"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Accessible, keyboard operable index that mirrors the graph. */}
            <Reveal delay={100}>
              <p className="label mt-8 mb-3">INDEX</p>
              <ul className="grid grid-cols-2 gap-x-4 border-t border-line sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {ecosystemNodes.map((n) => {
                  const on = n.id === selected;
                  const dim = !matches(n);
                  return (
                    <li key={n.id} className="border-b border-line">
                      <button
                        type="button"
                        onClick={() => setSelected(n.id)}
                        aria-pressed={on}
                        data-cursor="VIEW"
                        className={cn(
                          "flex w-full items-center gap-2 py-2.5 text-left transition-colors",
                          dim ? "opacity-35" : "opacity-100",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1 w-1 shrink-0 rounded-full",
                            on ? "bg-signal" : "bg-ink-3",
                          )}
                        />
                        <span
                          className={cn(
                            "mono text-[10px] uppercase tracking-[0.14em]",
                            on ? "text-signal" : "text-ink-3 hover:text-ink",
                          )}
                        >
                          {n.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
