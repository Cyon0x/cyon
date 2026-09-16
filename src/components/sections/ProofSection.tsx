import { metrics, redbellyCampaign } from "@/data/proof";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const offsets = ["lg:mt-0", "lg:mt-10", "lg:mt-4", "lg:mt-14"];

export function ProofSection() {
  return (
    <section id="proof" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="04"
          kicker="PROOF OF WORK"
          title={
            <>
              Numbers I can
              <span className="serif italic"> actually point at</span>
            </>
          }
          lead="Anyone can say they grow ecosystems. Here is what moved, and roughly how much."
        />

        {/* big numbers, deliberately not a card grid */}
        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 70} className={offsets[i % offsets.length]}>
              <div className="border-t border-line pt-6">
                <p className="text-[length:var(--text-display)] font-semibold leading-[0.9] tracking-[-0.04em]">
                  <Counter value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="label mt-4 !text-ink">{metric.label}</p>
                <p className="mt-3 max-w-[32ch] text-[0.9rem] text-ink-3">{metric.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* campaign readout */}
        <Reveal delay={120} className="mt-20">
          <div className="panel">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
              <span className="label !text-ink">{redbellyCampaign.title}</span>
              <span className="label">{redbellyCampaign.window}</span>
            </div>

            <ul className="px-5 py-5">
              {redbellyCampaign.rows.map((row, i) => (
                <li
                  key={row.label}
                  className="group grid grid-cols-12 items-center gap-x-4 border-b border-line py-3 last:border-b-0 sm:gap-x-6"
                >
                  <span className="label col-span-12 sm:col-span-4 lg:col-span-3">{row.label}</span>

                  <span className="col-span-12 flex items-center gap-3 sm:col-span-5 lg:col-span-6">
                    <span className="relative block h-[3px] w-full bg-line">
                      <Reveal
                        variant="line"
                        delay={i * 60 + 120}
                        className="absolute inset-y-0 left-0 bg-signal"
                        style={{ width: `${Math.max(row.weight * 100, 4)}%` }}
                      >
                        {null}
                      </Reveal>
                    </span>
                  </span>

                  <span className="mono col-span-12 text-right text-[13px] text-ink sm:col-span-3 lg:col-span-3">
                    {redbellyCampaign.display(row.value, row.suffix)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="border-t border-line px-5 py-3 text-[0.85rem] text-ink-3">
              Roughly ten weeks of content, community and shipping inside one ecosystem. Not a
              campaign I ran for someone else — work I did because I was already in there.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                k: "WHERE",
                v: "Redbelly, Arc, Plume, Union, Monad, XORA and others",
              },
              {
                k: "HOW",
                v: "Content, community, product, IRL, documentation",
              },
              {
                k: "STILL",
                v: "Doing all of it, mostly in public",
              },
            ].map((item) => (
              <div key={item.k} className="border-t border-line pt-4">
                <p className="label">{item.k}</p>
                <p className="mt-2 text-[0.95rem] text-ink-2">{item.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
