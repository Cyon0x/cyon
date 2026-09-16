"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor: a dot that expands into a label. Mounted only for fine pointers and
 * only when motion is welcome. Everything runs on one rAF loop writing
 * transforms — no React state, no layout reads.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    document.body.classList.add("has-cursor");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const loop = () => {
      dotX += (targetX - dotX) * 0.42;
      dotY += (targetY - dotY) * 0.42;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      scale += (targetScale - scale) * 0.16;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;

      frame = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        visible = true;
        dotX = ringX = targetX;
        dotY = ringY = targetY;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest?.("[data-cursor]");
      if (target) {
        const text = target.getAttribute("data-cursor") ?? "";
        label.textContent = text;
        targetScale = 2.6;
        ring.dataset.active = "true";
      } else {
        const interactive = (event.target as HTMLElement | null)?.closest?.(
          "a, button, input, [role='button']",
        );
        label.textContent = "";
        targetScale = interactive ? 1.7 : 1;
        ring.dataset.active = interactive ? "true" : "false";
      }
    };

    const onDown = () => (targetScale = Math.max(targetScale * 0.7, 0.6));
    const onUp = () => (targetScale = label.textContent ? 2.6 : 1);
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden xl:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-signal opacity-0"
      />
      <div
        ref={ringRef}
        data-active="false"
        className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-line-2 opacity-0 transition-colors data-[active=true]:border-signal/60"
      >
        <span
          ref={labelRef}
          className="mono text-[8px] font-semibold uppercase tracking-[0.18em] text-signal"
        />
      </div>
    </div>
  );
}
