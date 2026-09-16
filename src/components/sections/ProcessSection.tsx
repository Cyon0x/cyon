import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Find the problem",
    body: "Not the one in the pitch deck. The one that shows up when someone tries to actually use the thing.",
  },
  {
    n: "02",
    title: "Build the first version",
    body: "Small, ugly, working. A wallet connects, a transaction lands, a number changes.",
  },
  {
    n: "03",
    title: "Put it in front of people",
    body: "Real users, real rooms, real Telegram groups. Watch where they hesitate.",
  },
  {
    n: "04",
    title: "Learn what breaks",
    body: "It is almost never the part I was worried about. It is the copy, the empty state, the wait.",
  },
  {
    n: "05",
    title: "Ship again",
    body: "Then tell people about it properly. Shipping quietly is the most common way good work dies.",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="10"
          kicker="METHOD"
          title={
            <>
              How I
              <span className="serif italic"> work</span>
            </>
          }
          lead="Five steps, repeated until the thing is good. This is the honest version, not the agency version."
        />

        <ol className="mt-14 border-t border-line">
          {steps.map((step, i) => (
            <Reveal
              key={step.n}
              as="li"
              delay={i * 60}
              className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line py-7 transition-colors hover:bg-panel"
            >
              <span className="label col-span-2 !text-signal sm:col-span-1">{step.n}</span>
              <h3 className="col-span-10 text-[length:var(--text-h3)] tracking-[-0.02em] sm:col-span-4">
                {step.title}
              </h3>
              <p className="col-span-12 max-w-[60ch] text-ink-2 sm:col-span-7">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
