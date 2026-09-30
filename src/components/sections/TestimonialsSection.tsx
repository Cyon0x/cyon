import { testimonials, type Testimonial } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Deliberately uneven, so six quotes do not read as a card grid. */
const spans = ["lg:col-span-4", "lg:col-span-8", "lg:col-span-8", "lg:col-span-4", "lg:col-span-12"];

function Quote({
  item,
  index,
  lead = false,
  className,
}: {
  item: Testimonial;
  index: number;
  lead?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      as="figure"
      delay={index * 60}
      className={cn(
        "panel panel-cut m-0 flex h-full flex-col",
        lead ? "lg:col-span-12" : "col-span-12",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
        <span className="label !text-[9px] !text-ink">{item.org}</span>
        <span className="label !text-[9px]">{lead ? "LEAD FEEDBACK" : "FEEDBACK"}</span>
      </div>

      <blockquote className="flex flex-1 flex-col px-5 py-6">
        <p
          className={cn(
            "serif italic text-ink",
            lead
              ? "text-[length:calc(var(--text-h3)*1.2)] leading-[1.25]"
              : "text-[1.02rem] leading-[1.45]",
          )}
        >
          &ldquo;{item.quote}&rdquo;
        </p>

        <figcaption className="mt-auto flex items-center gap-3 pt-7">
          <span
            aria-hidden
            className="mono flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-raise text-[13px] text-signal"
          >
            {item.initial}
          </span>
          <span className="label !text-[9px] !text-ink-2">{item.attribution}</span>
        </figcaption>
      </blockquote>
    </Reveal>
  );
}

export function TestimonialsSection() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="voices" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="10"
          kicker="TESTIMONY"
          title={
            <>
              What people
              <span className="serif italic"> say.</span>
            </>
          }
          lead="Feedback from ecosystems and teams I have worked with as an ambassador, tester and community contributor."
        />

        <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-5">
          <Quote item={lead} index={0} lead />

          {rest.map((item, i) => (
            <Quote
              key={item.id}
              item={item}
              index={i + 1}
              className={cn("col-span-12", spans[i % spans.length])}
            />
          ))}
        </div>

        <Reveal delay={80}>
          <p className="label mt-6 !text-[9px]">REPRODUCED AS PROVIDED · NO EDITS</p>
        </Reveal>
      </div>
    </section>
  );
}
