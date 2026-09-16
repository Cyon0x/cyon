"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

/** Adds the element to a viewport observer and reports the first entry. */
export function useInView<T extends Element>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {},
) {
  const { threshold = 0.18, rootMargin = "0px 0px -10% 0px", once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer here: reveal on the next frame rather than inside the
      // effect body, so nothing renders out of step with hydration.
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView] as const;
}

/**
 * Media queries as external stores. Subscriptions are cached per query so a
 * re-render never tears an existing listener down and rebuilds it.
 */
const mediaSubscribers = new Map<string, (onChange: () => void) => () => void>();

function subscribeMedia(query: string) {
  let subscribe = mediaSubscribers.get(query);
  if (!subscribe) {
    subscribe = (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    };
    mediaSubscribers.set(query, subscribe);
  }
  return subscribe;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeMedia(REDUCED_MOTION),
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export type Theme = "dark" | "light";

/** The theme lives on <html>, written before paint by the inline script. */
const THEME_EVENT = "cyon:theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeTheme(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark" as const);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      window.localStorage.setItem("cyon-theme", next);
    } catch {
      /* storage disabled — the theme still applies for this session */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return { theme, toggle };
}

/**
 * Pointer parallax. Writes a normalised offset (-1..1) into CSS custom
 * properties on the target element, throttled with requestAnimationFrame so the
 * main thread is never blocked.
 */
export function usePointerParallax<T extends HTMLElement>(
  enabled = true,
  property = "--px",
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia(REDUCED_MOTION).matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      node.style.setProperty(`${property}-x`, currentX.toFixed(4));
      node.style.setProperty(`${property}-y`, currentY.toFixed(4));
      if (Math.abs(targetX - currentX) > 0.0005 || Math.abs(targetY - currentY) > 0.0005) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const kick = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = (event.clientY / window.innerHeight) * 2 - 1;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, property]);

  return ref;
}

/** Tracks which section owns the viewport, for the left hand rail. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Copies text and reports success briefly. */
export function useCopy(resetAfter = 1800) {
  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const copy = useCallback(
    async (value: string, key?: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(key ?? value);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(null), resetAfter);
      } catch {
        setCopied(null);
      }
    },
    [resetAfter],
  );

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { copied, copy };
}

/** Live clock string for a fixed timezone, ticked on an interval. */
export function useZoneClock(timeZone: string): string {
  const [value, setValue] = useState("--:--");

  useEffect(() => {
    const read = () => {
      try {
        setValue(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone,
          }).format(new Date()),
        );
      } catch {
        setValue(new Date().toTimeString().slice(0, 5));
      }
    };

    const frame = window.requestAnimationFrame(read);
    const id = window.setInterval(read, 20_000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(id);
    };
  }, [timeZone]);

  return value;
}
