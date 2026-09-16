import { currentBuilds, type BuildStatus } from "@/data/builds";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

const statusTone: Record<BuildStatus, string> = {
  BUILDING: "text-signal",
  SHIPPING: "text-electric",
  EXPLORING: "text-violet",
  RESEARCHING: "text-ember",
};

const dotTone: Record<BuildStatus, string> = {
  BUILDING: "bg-signal",
  SHIPPING: "bg-electric",
  EXPLORING: "bg-violet",
  RESEARCHING: "bg-ember",
};

export function CurrentBuildsSection() {
  return (
    <section id="current" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="07"
          kicker="STATUS BOARD"
          title={
            <>
              Currently
              <span className="serif italic"> building</span>
            </>
          }
          lead="A live board, not a highlight reel. This is where the time is going right now."
        />

        <ul className="mt-14 border-t border-line">
          {currentBuilds.map((build, i) => {
            const Row = build.href ? "a" : "div";
            return (
              <Reveal
                key={build.name}
                as="li"
                delay={i * 60}
                className="border-b border-line"
              >
                <Row
                  {...(build.href
                    ? { href: build.href, target: "_blank", rel: "noreferrer" }
                    : {})}
                  data-cursor={build.href ? "OPEN" : undefined}
                  className="group grid grid-cols-12 items-center gap-x-6 gap-y-3 py-7"
                >
                  <span className="col-span-12 flex items-center gap-3 sm:col-span-3">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className={`absolute inset-0 rounded-full ${dotTone[build.status]} blink`} />
                    </span>
                    <span className={`label ${statusTone[build.status]}`}>{build.status}</span>
                  </span>

                  <span className="col-span-12 flex items-baseline gap-3 sm:col-span-3">
                    <span className="text-[length:var(--text-h3)] tracking-[-0.02em] transition-colors group-hover:text-signal">
                      {build.name}
                    </span>
                    {build.href ? (
                      <ArrowUpRight
                        width={14}
                        height={14}
                        className="shrink-0 text-ink-3 transition-colors group-hover:text-signal"
                      />
                    ) : null}
                  </span>

                  <span className="col-span-12 text-ink-2 sm:col-span-4">{build.summary}</span>

                  <span className="label col-span-12 sm:col-span-2 sm:text-right">{build.meta}</span>
                </Row>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={120}>
          <p className="mt-6 text-[0.9rem] text-ink-3">
            If you want to know what changed this week, ask me directly. The board moves faster than
            the website does.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
