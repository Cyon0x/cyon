"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { irlLeadPhoto, irlStops, type IrlPhoto } from "@/data/irl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, ArrowDown } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

function StopPhoto({ photo, className, sizes }: { photo: IrlPhoto; className?: string; sizes: string }) {
  return (
    <span className={cn("relative block overflow-hidden border border-line bg-raise", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        quality={82}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
    </span>
  );
}

const FULL = "(max-width: 640px) 78vw, 380px";
const HALF = "(max-width: 640px) 39vw, 190px";

/**
 * A lone photo fills the card, a pair sits side by side, and three or more get
 * a lead frame with the rest paired underneath — so no column is ever left
 * empty next to a single photo.
 */
function StopPhotos({ photos }: { photos: IrlPhoto[] }) {
  if (photos.length === 0) return null;

  if (photos.length === 1) {
    return (
      <div className="mt-5">
        <StopPhoto photo={photos[0]} className="aspect-[4/3] w-full" sizes={FULL} />
      </div>
    );
  }

  const leading = photos.length === 2 ? null : photos[0];
  const paired = photos.length === 2 ? photos : photos.slice(1);

  return (
    <div className="mt-5 space-y-1.5">
      {leading && <StopPhoto photo={leading} className="aspect-[4/3] w-full" sizes={FULL} />}
      <div className={cn("grid gap-1.5", paired.length > 1 && "grid-cols-2")}>
        {paired.map((photo) => (
          <StopPhoto
            key={photo.src}
            photo={photo}
            className="aspect-[4/3]"
            sizes={paired.length > 1 ? HALF : FULL}
          />
        ))}
      </div>
    </div>
  );
}

export function IrlSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setProgress(max > 0 ? node.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("resize", onScroll);
    return () => window.removeEventListener("resize", onScroll);
  }, [onScroll]);

  const nudge = (direction: 1 | -1) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.min(node.clientWidth * 0.8, 460), behavior: "smooth" });
  };

  return (
    <section id="irl" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="09"
          kicker="IN PERSON"
          title={
            <>
              Some of this happens
              <span className="serif italic"> offline</span>
            </>
          }
          lead="Benin City, mostly. Rooms with real people, first wallets, first questions, and the kind of conversation a thread cannot have."
        />

        <Reveal delay={40}>
          <figure className="mt-10 border border-line">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-raise sm:aspect-[21/9]">
              <Image
                src={irlLeadPhoto.src}
                alt={irlLeadPhoto.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                quality={82}
                className="object-cover"
              />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t border-line px-4 py-3">
              <span className="label !text-[9px]">THE ROOM / BENIN CITY</span>
              <span className="label hidden !text-[9px] sm:inline">
                FIRST WALLETS, FIRST QUESTIONS
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 flex items-center justify-between gap-6 border-b border-line pb-4">
            <span className="label">ROUTE / 04 COMPLETED · 01 OPEN</span>
            <div className="flex items-center gap-3">
              <span className="label hidden sm:inline">DRAG OR SCROLL</span>
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Previous stops"
                className="flex h-8 w-8 items-center justify-center border border-line text-ink-3 transition-colors hover:border-line-2 hover:text-ink"
              >
                <ArrowRight width={14} height={14} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Next stops"
                className="flex h-8 w-8 items-center justify-center border border-line text-ink-3 transition-colors hover:border-line-2 hover:text-ink"
              >
                <ArrowRight width={14} height={14} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <ul
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-label="IRL route"
        className="no-scrollbar mt-0 flex snap-x snap-mandatory overflow-x-auto border-b border-line focus-visible:outline-offset-[-2px]"
      >
        {irlStops.map((stop, i) => {
          const open = stop.ecosystem === "OPEN SLOT";
          return (
            <li
              key={stop.code}
              className={cn(
                "group relative flex w-[82vw] shrink-0 snap-start flex-col border-r border-t border-line px-6 pb-8 pt-10 sm:w-[380px] lg:w-[420px]",
                i === 0 && "border-l",
                open && "bg-panel",
              )}
              style={{ borderTopColor: open ? "var(--signal)" : undefined }}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute -top-[5px] left-6 h-[9px] w-[9px] border",
                  open ? "border-signal bg-signal" : "border-line-2 bg-bg",
                )}
              />
              <span
                aria-hidden
                className="absolute -top-[1px] right-0 h-px w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: open ? "var(--signal)" : "var(--ink-3)" }}
              />

              <div className="flex items-baseline justify-between gap-4">
                <span className="label !text-[9px]">{stop.code}</span>
                <span className="label !text-[9px]">{stop.year}</span>
              </div>

              <StopPhotos photos={stop.photos} />

              <h3
                className={cn(
                  "mt-6 text-[length:var(--text-h3)] tracking-[-0.02em]",
                  open && "serif italic",
                )}
                style={open ? undefined : { color: "var(--ink)" }}
              >
                {open ? "Open slot" : stop.ecosystem}
              </h3>

              <p className="label mt-2 !text-ink-2">{stop.place}</p>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {stop.tags.map((tag) => (
                  <li
                    key={tag}
                    className="mono border border-line px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-ink-3"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-[46ch] text-[0.93rem] text-ink-2">{stop.note}</p>

              <div className="mt-auto flex items-center gap-3 pt-7">
                <span className="label !text-[9px]">{stop.role}</span>
                <span className="h-px flex-1 bg-line" />
                <span className="label !text-[9px]">
                  {String(i + 1).padStart(2, "0")}/{String(irlStops.length).padStart(2, "0")}
                </span>
              </div>
            </li>
          );
        })}
        <li className="flex w-[40vw] shrink-0 items-center justify-center border-t border-line px-8 sm:w-[160px]">
          <span className="label flex items-center gap-2 text-center">
            MORE SOON
            <ArrowDown width={13} height={13} className="-rotate-90" />
          </span>
        </li>
      </ul>

      <div className="shell">
        <div className="mt-5 flex items-center gap-5">
          <span className="relative block h-[2px] w-[180px] shrink-0 bg-line sm:w-[280px]">
            <span
              className="absolute inset-y-0 left-0 bg-signal transition-[width] duration-200"
              style={{ width: `${Math.max(progress * 100, 6)}%` }}
            />
          </span>
          <span className="label !text-[9px] whitespace-nowrap">ROUTE PROGRESS</span>
          <span className="label ml-auto hidden !text-[9px] whitespace-nowrap sm:block">
            {String(Math.round(progress * 100)).padStart(3, "0")}%
          </span>
        </div>
      </div>
    </section>
  );
}
