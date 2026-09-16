import Image from "next/image";
import type { Project } from "@/data/projects";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  project: Project;
  className?: string;
  priority?: boolean;
};

/**
 * The preview is the product. A real screenshot of the deployed build, framed
 * as a browser window. Hover tilts it, nudges the zoom and reveals the CTA.
 */
export function BrowserFrame({ project, className, priority = false }: BrowserFrameProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      data-cursor="OPEN"
      aria-label={`${project.name} — open the live product`}
      className={cn("group relative block", className)}
    >
      {/* accent glow, only on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(70% 60% at 50% 100%, color-mix(in srgb, ${project.accent} 16%, transparent), transparent 70%)`,
        }}
      />

      <span
        className="relative block border border-line bg-panel transition-transform duration-500 will-change-transform group-hover:-translate-y-1"
        style={{ boxShadow: "0 30px 60px -50px rgba(0,0,0,0.9)" }}
      >
        {/* chrome */}
        <span className="flex items-center gap-3 border-b border-line px-3 py-2.5">
          <span className="flex shrink-0 items-center gap-1.5" aria-hidden>
            <span className="h-[7px] w-[7px] rounded-full border border-line-2" />
            <span className="h-[7px] w-[7px] rounded-full border border-line-2" />
            <span className="h-[7px] w-[7px] rounded-full border border-line-2 transition-colors duration-500 group-hover:border-signal group-hover:bg-signal" />
          </span>
          <span className="mono truncate text-[10px] text-ink-3">
            {project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </span>
          <span className="label ml-auto hidden shrink-0 sm:inline">
            CYON BUILD {project.index}
          </span>
        </span>

        {/* product */}
        <span className="relative block aspect-[16/10] w-full overflow-hidden bg-raise">
          <Image
            src={project.preview}
            alt={project.alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 1100px"
            quality={82}
            className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
          />

          {/* reveal strip on hover */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between gap-4 px-4 py-3 transition-transform duration-500 group-hover:translate-y-0"
            style={{ background: "color-mix(in srgb, var(--bg) 88%, transparent)" }}
          >
            <span className="label !text-ink">OPEN {project.name}</span>
            <span className="label !text-signal">LIVE PRODUCT ↗</span>
          </span>
        </span>
      </span>

      {/* corner registration mark */}
      <span
        aria-hidden
        className="absolute -right-2 -top-2 hidden h-5 w-5 items-center justify-center border border-line-2 bg-bg text-ink-3 transition-colors group-hover:border-signal group-hover:text-signal sm:flex"
      >
        <ArrowUpRight width={11} height={11} />
      </span>
    </a>
  );
}
