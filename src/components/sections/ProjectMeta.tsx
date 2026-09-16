import type { Project } from "@/data/projects";
import { ArrowUpRight, GitHubIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function ProjectIndex({ project, className }: { project: Project; className?: string }) {
  return (
    <span className={cn("flex items-baseline gap-3", className)}>
      <span
        className="text-[length:var(--text-h2)] font-semibold leading-none tracking-[-0.04em]"
        style={{ color: project.accent }}
      >
        {project.index}
      </span>
      <span className="label">/ 06</span>
    </span>
  );
}

export function ProjectTitle({ project }: { project: Project }) {
  return (
    <div>
      <h3 className="text-[length:var(--text-h2)] leading-[0.95] tracking-[-0.035em]">
        {project.name}
      </h3>
      <p className="label mt-3 !text-ink-2">
        {project.role} · {project.chain}
      </p>
    </div>
  );
}

export function ProjectBuilt({ project, className }: { project: Project; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-3 gap-y-1.5", className)}>
      {project.built.map((item) => (
        <li
          key={item}
          className="mono border border-line px-2 py-1 text-[9.5px] uppercase tracking-[0.12em] text-ink-3 transition-colors hover:border-line-2 hover:text-ink-2"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectNote({ project }: { project: Project }) {
  if (!project.note) return null;
  return (
    <p className="mono border-l border-signal/50 pl-4 text-[11px] leading-relaxed text-ink-3">
      {project.note}
    </p>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="btn btn-solid"
        data-cursor="OPEN"
      >
        <span>
          VISIT LIVE
          <ArrowUpRight width={13} height={13} />
        </span>
      </a>
      {project.repo ? (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost"
          data-cursor="CODE"
        >
          <span>
            <GitHubIcon width={13} height={13} />
            SOURCE
          </span>
        </a>
      ) : null}
    </div>
  );
}

export function ProjectStatusLine({ project }: { project: Project }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-signal blink" />
      <span className="label !text-ink-2">{project.status}</span>
      <span className="label">{project.year}</span>
    </div>
  );
}
