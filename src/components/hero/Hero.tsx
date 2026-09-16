import { identity, links } from "@/data/site";
import { ticker } from "@/data/code";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { TerminalTrigger } from "@/components/terminal/TerminalTrigger";
import { ArrowDown, ArrowRight } from "@/components/ui/Icons";
import { HeroOrbit } from "./HeroOrbit";

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col pt-[68px]">
      <div className="shell relative z-10 flex flex-1 flex-col justify-center gap-8 py-[clamp(2rem,6vh,4.5rem)]">
        {/* eyebrow band */}
        <Reveal className="flex items-center gap-4 border-b border-line pb-3">
          <span className="label !text-ink">{identity.name}</span>
          <span className="label hidden sm:inline">{identity.legalName}</span>
          <span className="hair flex-1" />
          <span className="label">SYS / 01 — WORKSPACE</span>
        </Reveal>

        <div className="grid grid-cols-12 items-center gap-y-14 lg:gap-x-8">
          {/* ---------------------------------------------------------------- */}
          {/* Copy                                                              */}
          {/* ---------------------------------------------------------------- */}
          <div className="order-1 col-span-12 lg:col-span-7">
            <Reveal>
              <p className="label !text-[10px] !text-ink-2">
                WEB3 BUILDER / GROWTH / COMMUNITY / PRODUCT
              </p>
            </Reveal>

            <h1 className="mt-4">
              <Reveal delay={60}>
                <span className="block text-[length:calc(var(--text-mega)*0.62)] font-semibold uppercase leading-[0.94] tracking-[-0.035em]">
                  Build the
                </span>
                <span className="block text-[length:calc(var(--text-mega)*0.62)] font-semibold uppercase leading-[0.94] tracking-[-0.035em]">
                  product.
                </span>
              </Reveal>

              <Reveal delay={130}>
                <span className="serif mt-1 block pl-[5%] text-[length:calc(var(--text-mega)*0.9)] italic leading-[0.9] text-ink lg:pl-[9%]">
                  grow the
                </span>
                <span className="serif block pl-[5%] text-[length:calc(var(--text-mega)*0.9)] italic leading-[0.9] text-ink lg:pl-[9%]">
                  ecosystem.
                </span>
              </Reveal>

              <Reveal delay={200}>
                <span className="mt-4 flex items-center gap-5">
                  <span className="text-[length:calc(var(--text-mega)*0.62)] font-semibold uppercase leading-[0.94] tracking-[-0.035em]">
                    Ship{" "}
                    <span className="relative text-signal">
                      both.
                      <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-signal/30" />
                    </span>
                  </span>
                  <span className="hair hidden flex-1 sm:block" />
                </span>
              </Reveal>
            </h1>

            <Reveal delay={280}>
              <p className="mt-7 max-w-[56ch] text-ink-2">
                I build products, grow ecosystems and ship things people can actually use. 4+ years
                across DeFi, infrastructure, privacy, gaming and payments — usually in ecosystems
                where the documentation is still being written. I work between the technical side
                and the human side, which mostly means being close to the actual work.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#builds" className="btn btn-solid" data-cursor="OPEN">
                  <span>
                    SEE THE BUILDS
                    <ArrowRight width={14} height={14} />
                  </span>
                </a>
                <TerminalTrigger label="OPEN TERMINAL" className="btn btn-ghost" />
                <a
                  href={links.x.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost"
                  data-cursor="FOLLOW"
                >
                  <span>@CYON0X</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Identity stage                                                    */}
          {/* ---------------------------------------------------------------- */}
          <div className="order-2 col-span-12 lg:col-span-5">
            <HeroOrbit />
          </div>
        </div>
      </div>

      {/* bottom band */}
      <div className="relative z-10 mt-auto border-y border-line bg-bg/60 backdrop-blur-sm">
        <div className="flex items-stretch">
          <div className="hidden items-center gap-2.5 border-r border-line px-5 md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-signal blink" />
            <span className="label whitespace-nowrap">LIVE TICKER</span>
          </div>
          <Marquee items={ticker} className="flex-1 py-3.5" duration={54} />
          <a
            href="#identity"
            className="group hidden items-center gap-2 border-l border-line px-5 lg:flex"
            data-cursor="SCROLL"
          >
            <span className="label transition-colors group-hover:!text-ink">SCROLL</span>
            <ArrowDown
              width={14}
              height={14}
              className="text-ink-3 transition-colors group-hover:text-signal"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
