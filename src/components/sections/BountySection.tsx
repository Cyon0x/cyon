import { bounty } from "@/data/proof";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

const chain = ["DESIGN", "BUILD", "SHIP", "WIN"];

const receipt = [
  { k: "PROJECT", v: "Redbelly DAO" },
  { k: "TYPE", v: "Governance interface" },
  { k: "NETWORK", v: "Redbelly \u00b7 RBNT \u00b7 chain 151" },
  { k: "STACK", v: "Next.js \u00b7 TypeScript \u00b7 Web3 UI" },
  { k: "OUTCOME", v: "Bounty won", accent: true },
  { k: "RECOGNITION", v: "Posted by @RedbellyNetwork", accent: true },
];

export function BountySection() {
  return (
    <section id="bounty" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell grid grid-cols-12 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-7">
          <Reveal className="flex items-center gap-4">
            <span className="label label-ink">BOUNTY WON</span>
            <span className="hair flex-1" />
            <span className="label">{bounty.code}</span>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-8 text-[length:var(--text-display)] leading-[0.92] tracking-[-0.035em]">
              Redbelly DAO
            </h2>
            <p className="serif mt-1 text-[length:calc(var(--text-display)*0.72)] italic leading-[0.95] text-ink-2">
              governance interface
            </p>
          </Reveal>

          {/* the chain */}
          <Reveal delay={120}>
            <ol className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
              {chain.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className={
                      i === chain.length - 1
                        ? "mono border border-signal bg-signal px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-signal-ink"
                        : "mono border border-line px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ink-3"
                    }
                  >
                    {step}
                  </span>
                  {i < chain.length - 1 ? (
                    <span aria-hidden className="h-px w-5 bg-line-2 sm:w-8" />
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-9 max-w-[58ch] text-ink-2">{bounty.copy}</p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-8 flex flex-wrap gap-3">
              {bounty.links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={i === 0 ? "btn btn-solid" : "btn"}
                  data-cursor="OPEN"
                >
                  <span>
                    {link.label}
                    <ArrowUpRight width={13} height={13} />
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={250}>
            <p className="mt-7 text-[0.85rem] text-ink-3">
              No trophy graphic. Just a build that went out and came back with a receipt.
            </p>
          </Reveal>
        </div>

        {/* receipt panel */}
        <div className="col-span-12 lg:col-span-5 lg:pl-4">
          <Reveal delay={100}>
            <div className="panel panel-cut ticks">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="label">RECEIPT</span>
                <span className="label">2025 · VERIFIED</span>
              </div>
              <dl>
                {receipt.map((row) => (
                  <div
                    key={row.k}
                    className="flex items-baseline justify-between gap-6 border-b border-line px-5 py-3.5 last:border-b-0"
                  >
                    <dt className="label !text-[9px] shrink-0">{row.k}</dt>
                    <dd
                      className={`mono text-right text-[12px] ${
                        row.accent ? "text-signal" : "text-ink-2"
                      }`}
                    >
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-line px-5 py-4 text-[0.85rem] text-ink-3">
                Designed and built end to end: information architecture, interface, wallet
                connection, proposal and treasury surfaces.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
