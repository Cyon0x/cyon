import { featuredProjects, supportingProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectScene, CompactProject } from "./ProjectScene";

export function BuildsSection() {
  return (
    <section id="builds" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="05"
          kicker="PROOF, NOT PROMISES"
          title={
            <>
              See what I have
              <span className="serif italic"> built</span>
            </>
          }
          lead="Six things that are live right now. Every preview below is a real screenshot of the deployed product, and every link opens it."
        />

        <Reveal delay={60}>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-line py-3">
            <li className="label !text-ink">LIVE PRODUCTS · 06</li>
            <li className="label">CHAINS · ARC / REDBELLY / RBNT</li>
            <li className="label hidden sm:block">STACK · NEXT.JS · TYPESCRIPT · EVM</li>
          </ul>
        </Reveal>

        {featuredProjects.map((project, i) => (
          <ProjectScene key={project.id} project={project} priority={i === 0} />
        ))}

        <div className="mt-20 lg:mt-28">
          <Reveal className="flex items-center gap-4">
            <span className="label whitespace-nowrap">SMALLER BUILDS</span>
            <span className="hair flex-1" />
            <span className="label hidden sm:inline">SAME STANDARD</span>
          </Reveal>

          <Reveal delay={60}>
            <p className="mt-6 max-w-[62ch] text-ink-2">
              Two more that exist because something annoyed me. One is a token that cannot be
              farmed by bots. The other is the onboarding guide I kept having to write out by hand.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
            {supportingProjects.map((project) => (
              <CompactProject key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
