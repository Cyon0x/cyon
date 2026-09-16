"use client";

import { useEffect, useState } from "react";
import { identity, nav } from "@/data/site";
import { Mark } from "@/components/ui/Mark";
import { ThemeToggle } from "./ThemeToggle";
import { CloseIcon, MenuIcon, TerminalIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export const TERMINAL_EVENT = "cyon:terminal";

export function openTerminal() {
  window.dispatchEvent(new CustomEvent(TERMINAL_EVENT));
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          lifted ? "border-b border-line bg-bg/78 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav className="shell flex h-[68px] items-center justify-between gap-6" aria-label="Primary">
          <a href="#top" className="group flex items-center gap-3" data-cursor="TOP">
            <Mark className="text-ink transition-transform duration-500 group-hover:rotate-[8deg]" />
            <span className="mono text-[15px] font-semibold tracking-[0.22em]">CYON</span>
            <span className="label hidden !text-[9px] sm:inline">{identity.legalName}</span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex items-baseline gap-1.5"
                  data-cursor="GO"
                >
                  <span className="label !text-[9px] transition-colors group-hover:text-signal">
                    {item.index}
                  </span>
                  <span className="label !text-ink-2 transition-colors group-hover:!text-ink">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-2 xl:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-signal blink" />
              </span>
              <span className="label !text-signal">{identity.status}</span>
            </span>

            <button
              type="button"
              onClick={openTerminal}
              data-cursor="RUN"
              className="hidden h-8 items-center gap-2 border border-line px-2.5 text-ink-3 transition-colors hover:border-line-2 hover:text-ink sm:flex"
              aria-label="Open command terminal"
            >
              <TerminalIcon width={13} height={13} />
              <span className="label !text-[9px]">⌘K</span>
            </button>

            <ThemeToggle />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center border border-line text-ink-2 transition-colors hover:text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-bg pt-[68px] lg:hidden"
        >
          <div className="shell py-8">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.id} className="border-b border-line">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="label">{item.index}</span>
                    <span className="text-[length:var(--text-h3)] font-medium tracking-tight">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-signal blink" />
              <span className="label !text-signal">{identity.status}</span>
              <span className="label">{identity.timezoneLabel}</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
