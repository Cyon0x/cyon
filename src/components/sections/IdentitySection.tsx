import { identity, positions } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const sometimes = [
  "Building a product.",
  "Testing one until it breaks.",
  "Helping a community understand what they are actually holding.",
  "Writing the thread that makes it click.",
  "Getting the right people into the same room.",
];

const dossier = [
  { k: "NAME", v: identity.legalName },
  { k: "ALIAS", v: identity.handle },
  { k: "BASE", v: `${identity.timezoneCity}, ${identity.timezoneLabel}` },
  { k: "ACTIVE", v: `${identity.yearsInWeb3} YEARS` },
  { k: "STATUS", v: identity.status, accent: true },
];

export function IdentitySection() {
  return (
    <section id="identity" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell grid grid-cols-12 gap-y-12 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-6">
          <SectionHeading
            index="02"
            kicker="IDENTITY"
            title={
              <>
                What I
                <span className="serif italic"> actually </span>
                do
              </>
            }
          />

          <Reveal delay={80}>
            <div className="mt-9 space-y-5 text-ink-2">
              <p>
                I am a Web3 builder and ecosystem operator. Four years around DeFi,
                infrastructure, privacy, gaming, payments and ecosystems that were still figuring
                out what they wanted to be. I have worked as builder, contributor, ambassador,
                community and growth — usually more than one of those at the same time.
              </p>
              <p>
                I build the frontend myself: React, Next.js, TypeScript and Tailwind, wired to EVM
                chains, wallet connection flows and real transaction states. I am not trying to pass
                for a protocol engineer. What I am is someone who can take a product from an idea to
                a deployed interface, then explain it, grow a community around it, and put it in
                front of the people who will use it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="label mt-10 mb-3">SOMETIMES THAT MEANS</p>
            <ul className="border-t border-line">
              {sometimes.map((line, i) => (
                <li
                  key={line}
                  className="group flex items-baseline gap-4 border-b border-line py-3 transition-colors hover:bg-panel"
                >
                  <span className="label !text-[9px] shrink-0">0{i + 1}</span>
                  <span className="text-[0.98rem] text-ink-2 transition-colors group-hover:text-ink">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:pl-6">
          <Reveal delay={100}>
            <blockquote className="serif mt-2 text-[length:calc(var(--text-h2)*0.86)] italic leading-[1.1]">
              The point is that I like being close to the actual work. Close enough that when
              something is broken, I am the one who notices.
            </blockquote>
          </Reveal>

          <Reveal delay={180}>
            <dl className="panel mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {dossier.slice(0, 4).map((row, i) => (
                  <div
                    key={row.k}
                    className={`flex items-baseline justify-between gap-4 px-4 py-3.5 ${
                      i < 2 ? "border-b border-line" : ""
                    } ${i % 2 === 0 ? "sm:border-r sm:border-line" : ""} ${i === 2 ? "border-b border-line sm:border-b-0" : ""}`}
                  >
                    <dt className="label !text-[9px]">{row.k}</dt>
                    <dd className="mono text-[12px] text-ink-2">{row.v}</dd>
                  </div>
                ))}
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-line px-4 py-3.5">
                <dt className="label !text-[9px]">{dossier[4].k}</dt>
                <dd className="mono inline-flex items-center gap-2 text-[12px] text-signal">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal blink" />
                  {dossier[4].v}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-[52ch] text-[0.94rem] text-ink-3">
              Redbelly, Arc, Circle, Plume, Union, Monad, Swisstronik, Hyperbolic, XORA, ByRep,
              Aurory, MMT Finance and others. Different relationships, different jobs, one
              throughline: I get into the work.
            </p>
          </Reveal>
        </div>

        {/* The same work, in the words different teams use for it. */}
        <Reveal delay={80} className="col-span-12 mt-14">
          <div className="flex items-center gap-4 border-b border-line pb-4">
            <span className="label !text-ink">ALSO DESCRIBED AS</span>
            <span className="hair flex-1" />
            <span className="label hidden sm:inline">ONE PERSON, FOUR JOBS</span>
          </div>

          <ul className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {positions.map((position) => (
              <li
                key={position.label}
                className="group border-b border-line py-3.5"
                title={position.note}
              >
                <span className="flex items-baseline gap-3">
                  <span
                    aria-hidden
                    className="h-1 w-1 shrink-0 rounded-full bg-signal/70 transition-colors group-hover:bg-signal"
                  />
                  <span className="mono text-[11px] uppercase tracking-[0.14em] text-ink-2 transition-colors group-hover:text-ink">
                    {position.label}
                  </span>
                </span>
                <span className="mt-1.5 block pl-4 text-[0.88rem] text-ink-3">{position.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
