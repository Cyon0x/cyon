import type { Project } from "@/data/projects";
import { BrowserFrame } from "./BrowserFrame";
import {
  ProjectBuilt,
  ProjectIndex,
  ProjectLinks,
  ProjectNote,
  ProjectStatusLine,
  ProjectTitle,
} from "./ProjectMeta";
import { Reveal } from "@/components/ui/Reveal";

const sceneLabel = (index: string, name: string) => (
  <div className="mb-6 flex items-center gap-4">
    <span className="label whitespace-nowrap">SCENE {index}</span>
    <span className="hair flex-1" />
    <span className="label hidden sm:inline">{name}</span>
  </div>
);

/** Every project gets its own composition. No repeated card grid. */
export function ProjectScene({ project, priority = false }: { project: Project; priority?: boolean }) {
  switch (project.layout) {
    /* ---------------------------------------------------------------- */
    /* Wide — frame bleeds off the right edge, metadata reads underneath  */
    /* ---------------------------------------------------------------- */
    case "wide":
      return (
        <article className="mt-20 lg:mt-28">
          {sceneLabel(project.index, project.name)}
          <Reveal>
            <BrowserFrame project={project} priority={priority} className="lg:-mr-8 xl:-mr-16" />
          </Reveal>

          <div className="mt-9 grid grid-cols-12 gap-y-8 lg:gap-x-10">
            <Reveal className="col-span-12 lg:col-span-4">
              <ProjectIndex project={project} />
              <div className="mt-5">
                <ProjectTitle project={project} />
              </div>
              <div className="mt-5">
                <ProjectStatusLine project={project} />
              </div>
            </Reveal>

            <Reveal delay={60} className="col-span-12 lg:col-span-5">
              <p className="text-[length:var(--text-h3)] leading-snug tracking-[-0.02em]">
                {project.summary}
              </p>
              <p className="mt-4 text-ink-2">{project.detail}</p>
            </Reveal>

            <Reveal delay={110} className="col-span-12 flex flex-col gap-6 lg:col-span-3">
              <ProjectNote project={project} />
              <ProjectBuilt project={project} />
              <ProjectLinks project={project} />
            </Reveal>
          </div>
        </article>
      );

    /* ---------------------------------------------------------------- */
    /* Rail — sticky metadata column, frame on the right                  */
    /* ---------------------------------------------------------------- */
    case "rail":
      return (
        <article className="mt-20 lg:mt-28">
          {sceneLabel(project.index, project.name)}
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <Reveal className="col-span-12 self-start lg:col-span-4 lg:sticky lg:top-24">
              <ProjectIndex project={project} />
              <div className="mt-5">
                <ProjectTitle project={project} />
              </div>
              <p className="serif mt-7 text-[length:calc(var(--text-h3)*1.15)] italic leading-snug">
                {project.summary}
              </p>
              <p className="mt-5 text-ink-2">{project.detail}</p>
              <div className="mt-7">
                <ProjectNote project={project} />
              </div>
              <div className="mt-7">
                <ProjectStatusLine project={project} />
              </div>
              <div className="mt-4">
                <ProjectBuilt project={project} />
              </div>
              <div className="mt-7">
                <ProjectLinks project={project} />
              </div>
            </Reveal>

            <Reveal delay={80} className="col-span-12 lg:col-span-8">
              <BrowserFrame project={project} priority={priority} className="lg:-mr-8 xl:-mr-16" />
            </Reveal>
          </div>
        </article>
      );

    /* ---------------------------------------------------------------- */
    /* Offset — layered: metadata panel overlaps the corner of the frame  */
    /* ---------------------------------------------------------------- */
    case "offset":
      return (
        <article className="mt-20 lg:mt-28">
          {sceneLabel(project.index, project.name)}
          <div className="grid grid-cols-12">
            <Reveal className="col-span-12 lg:col-span-9 lg:col-start-4">
              <BrowserFrame project={project} priority={priority} className="lg:-mr-8 xl:-mr-16" />
            </Reveal>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-12 gap-y-8 lg:-mt-28 lg:gap-x-10">
            <Reveal className="col-span-12 lg:col-span-6 lg:col-start-1">
              <div className="panel panel-cut ticks bg-bg p-6 lg:p-7">
                <ProjectIndex project={project} />
                <div className="mt-5">
                  <ProjectTitle project={project} />
                </div>
                <p className="mt-6 text-[1.02rem]">{project.summary}</p>
                <p className="mt-4 text-ink-2">{project.detail}</p>
                <div className="mt-7">
                  <ProjectLinks project={project} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={80} className="col-span-12 flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:pt-6">
              <ProjectStatusLine project={project} />
              <ProjectNote project={project} />
              <ProjectBuilt project={project} />
            </Reveal>
          </div>
        </article>
      );

    /* ---------------------------------------------------------------- */
    /* Split — statement band on top, copy and frame below                */
    /* ---------------------------------------------------------------- */
    case "split":
    default:
      return (
        <article className="mt-20 lg:mt-28">
          {sceneLabel(project.index, project.name)}
          <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-line pb-6">
            <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
              <ProjectIndex project={project} />
              <ProjectTitle project={project} />
            </div>
            <ProjectStatusLine project={project} />
          </Reveal>

          <div className="mt-10 grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <Reveal className="col-span-12 lg:col-span-4">
              <p className="text-[length:var(--text-h3)] leading-snug tracking-[-0.02em]">
                {project.summary}
              </p>
              <p className="mt-4 text-ink-2">{project.detail}</p>
              <div className="mt-7">
                <ProjectNote project={project} />
              </div>
              <div className="mt-7">
                <ProjectBuilt project={project} />
              </div>
            </Reveal>

            <div className="col-span-12 lg:col-span-8">
              <Reveal delay={70}>
                <BrowserFrame project={project} priority={priority} />
              </Reveal>
              <Reveal delay={130} className="mt-7">
                <ProjectLinks project={project} />
              </Reveal>
            </div>
          </div>
        </article>
      );
  }
}

/** Two smaller builds, presented as a pair rather than full scenes. */
export function CompactProject({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="panel panel-cut flex h-full flex-col">
      <div className="border-b border-line px-5 py-3">
        <ProjectStatusLine project={project} />
      </div>

      <div className="p-5">
        <BrowserFrame project={project} />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[length:var(--text-h3)] tracking-[-0.02em]">{project.name}</h3>
          <span className="mono text-[10px] text-ink-3">{project.index} / 06</span>
        </div>
        <p className="label mt-3">{project.role} · {project.chain}</p>
        <p className="mt-4 text-[0.95rem] text-ink-2">{project.summary}</p>
        <p className="mt-3 text-[0.92rem] text-ink-3">{project.detail}</p>

        <div className="mt-6">
          <ProjectBuilt project={project} />
        </div>
        <div className="mt-auto pt-7">
          <ProjectLinks project={project} />
        </div>
      </div>
    </Reveal>
  );
}
