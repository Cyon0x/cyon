"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { identity, links, meta } from "@/data/site";
import { projects } from "@/data/projects";
import { ecosystemNodes } from "@/data/ecosystem";
import { metrics, redbellyCampaign } from "@/data/proof";
import { capabilities } from "@/data/capabilities";
import { TERMINAL_EVENT } from "@/components/chrome/SiteNav";
import { cn } from "@/lib/utils";

type Line = { text: string; tone?: "mute" | "signal" | "electric" | "ember" | "violet" };
type LinkLine = { label: string; href: string; tone?: Line["tone"] };
type Output = { key: string; lines: Line[]; links?: LinkLine[] };

const HELP: Output = {
  key: "help",
  lines: [
    { text: "available commands", tone: "mute" },
    { text: "  about        who this is" },
    { text: "  projects     what has shipped" },
    { text: "  builds       what is in progress" },
    { text: "  experience   where the time went" },
    { text: "  skills       what I actually do" },
    { text: "  proof        numbers, in public" },
    { text: "  bounty       the one that won" },
    { text: "  contact      how to reach me" },
    { text: "  github       source" },
    { text: "  x            the timeline" },
    { text: "  theme        flip the environment" },
    { text: "  clear        wipe the screen" },
  ],
};

function resolve(command: string): Output | "theme" | "clear" | null {
  const cmd = command.trim().toLowerCase();

  switch (cmd) {
    case "":
      return null;

    case "help":
      return HELP;

    case "about":
      return {
        key: "about",
        lines: [
          { text: `${identity.name} \u2014 ${identity.legalName}`, tone: "signal" },
          { text: "Web3 builder and growth operator. 4+ years.", tone: "mute" },
          { text: "I build products, grow ecosystems and ship things people can use." },
          { text: "DeFi \u00b7 infrastructure \u00b7 privacy \u00b7 gaming \u00b7 payments \u00b7 emerging L1s", tone: "mute" },
        ],
      };

    case "projects":
      return {
        key: "projects",
        lines: [
          { text: "loading builds...", tone: "mute" },
          ...projects.map((p) => ({
            text: `${p.index} / ${p.name.toUpperCase()} \u2014 ${p.chain}`,
            tone: p.layout === "compact" ? ("mute" as const) : ("electric" as const),
          })),
        ],
        links: projects.map((p) => ({ label: `open ${p.name}`, href: p.href })),
      };

    case "builds":
      return {
        key: "builds",
        lines: [
          { text: "current state", tone: "mute" },
          { text: "  FinFlow         \u25cf BUILDING     stablecoin payments on Arc" },
          { text: "  VAULT 01        \u25cf SHIPPING     500 Genesis tokens on Redbelly" },
          { text: "  Arc ecosystem   \u25cf EXPLORING    payment primitives" },
          { text: "  Web3 growth     \u25cf BUILDING     community, content, IRL" },
        ],
        links: [{ label: "open vault 01", href: "https://redbelly-nft-mint.vercel.app/" }],
      };

    case "experience":
      return {
        key: "experience",
        lines: [
          { text: "4+ years across ecosystems", tone: "mute" },
          ...ecosystemNodes.map((n) => ({
            text: `  ${n.name.padEnd(14, " ")} ${n.role}`,
            tone: "mute" as const,
          })),
        ],
      };

    case "skills":
    case "capability":
      return {
        key: "skills",
        lines: capabilities.flatMap((group) => [
          { text: `${group.label} \u2014 ${group.code}`, tone: "signal" as const },
          { text: `  ${group.items.join(" \u00b7 ")}`, tone: "mute" as const },
        ]),
      };

    case "proof":
      return {
        key: "proof",
        lines: [
          ...metrics.map((m) => ({
            text: `  ${m.display ? m.display(m.value) : m.value}  ${m.label}`,
            tone: "electric" as const,
          })),
          { text: "redbelly contribution \u00b7 10 week push", tone: "signal" },
          ...redbellyCampaign.rows.map((row) => ({
            text: `  ${redbellyCampaign.display(row.value, row.suffix)}  ${row.label}`,
            tone: "mute" as const,
          })),
        ],
      };

    case "bounty":
      return {
        key: "bounty",
        lines: [
          { text: "BOUNTY / 01 \u2014 REDBELLY DAO", tone: "signal" },
          { text: "designed \u2192 built \u2192 shipped \u2192 won", tone: "mute" },
          { text: "A DAO interface for the Redbelly ecosystem. Won a Redbelly bounty." },
        ],
        links: [
          { label: "view the winning build", href: "https://redbelly-dao.vercel.app/" },
          { label: "source on github", href: "https://github.com/Cyon0x/redbelly-dao" },
        ],
      };

    case "contact":
      return {
        key: "contact",
        lines: [
          { text: "open to product, growth, community and ecosystem work.", tone: "mute" },
          { text: `  email     ${links.email.handle}` },
          { text: `  x         ${links.x.handle}` },
          { text: `  telegram  ${links.telegram.handle}` },
          { text: `  discord   ${links.discord.handle}` },
        ],
        links: [
          { label: "email cyon", href: links.email.href },
          { label: "x / @Cyon0x", href: links.x.href },
          { label: "telegram", href: links.telegram.href },
        ],
      };

    case "github":
      return {
        key: "github",
        lines: [{ text: "github.com/Cyon0x", tone: "electric" }],
        links: [{ label: "open github", href: links.github.href }],
      };

    case "x":
    case "twitter":
      return {
        key: "x",
        lines: [{ text: "@Cyon0x", tone: "electric" }],
        links: [{ label: "open x", href: links.x.href }],
      };

    case "whoami":
      return {
        key: "whoami",
        lines: [
          { text: `cyon@workspace \u2014 ${identity.status}`, tone: "signal" },
          { text: meta.short, tone: "mute" },
        ],
      };

    case "theme":
      return "theme";

    case "clear":
      return "clear";

    default:
      return {
        key: `unknown-${cmd}`,
        lines: [
          { text: `cyon: command not found: ${cmd}`, tone: "ember" },
          { text: "type 'help' for the list", tone: "mute" },
        ],
      };
  }
}

const TONES: Record<NonNullable<Line["tone"]>, string> = {
  mute: "text-ink-3",
  signal: "text-signal",
  electric: "text-electric",
  ember: "text-ember",
  violet: "text-violet",
};

export function CommandTerminal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [log, setLog] = useState<Output[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (event.key === "Escape") setOpen(false);
    };
    const onEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(TERMINAL_EVENT, onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(TERMINAL_EVENT, onEvent);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [log, open]);

  const run = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;
      setHistory((prev) => [command, ...prev].slice(0, 40));
      setCursor(-1);
      setValue("");

      const result = resolve(command);
      if (result === null) return;
      if (result === "clear") {
        setLog([]);
        return;
      }
      if (result === "theme") {
        const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        document.documentElement.style.colorScheme = next;
        try {
          window.localStorage.setItem("cyon-theme", next);
        } catch {
          /* ignore */
        }
        setLog((prev) => [
          ...prev,
          { key: `theme-${prev.length}`, lines: [{ text: `environment \u2192 ${next}`, tone: "signal" }] },
        ]);
        return;
      }
      setLog((prev) => [...prev, result].slice(-14));
    },
    [],
  );

  const hints = useMemo(
    () => ["about", "projects", "proof", "bounty", "experience", "contact"],
    [],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-3 pt-[12vh] sm:pt-[16vh]">
      <button
        type="button"
        aria-label="Close terminal"
        onClick={close}
        className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cyon command terminal"
        className="panel ticks relative w-full max-w-[760px] shadow-[var(--shadow)]"
        style={{ background: "color-mix(in srgb, var(--panel) 94%, transparent)" }}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2 w-2 border border-line-2" />
              <span className="h-2 w-2 border border-line-2" />
              <span className="h-2 w-2 border border-line-2" />
            </span>
            <span className="label !text-ink-2">CYON@WORKSPACE</span>
          </div>
          <button
            type="button"
            onClick={close}
            className="label transition-colors hover:!text-ink"
          >
            ESC
          </button>
        </div>

        <div
          ref={scrollRef}
          className="mono max-h-[46vh] overflow-y-auto px-4 py-4 text-[12px] leading-relaxed sm:text-[12.5px]"
        >
          <p className="text-ink-3">
            Cyon workspace shell. Type <span className="text-signal">help</span> to start.
          </p>

          {log.map((entry) => (
            <div key={entry.key} className="mt-4">
              <p className="text-ink-3">
                <span className="text-signal">cyon@workspace</span>:<span className="text-electric">~</span>${" "}
                {entry.key.replace(/^unknown-/, "")}
              </p>
              {entry.lines.map((line, i) => (
                <p key={i} className={cn("whitespace-pre-wrap", TONES[line.tone ?? "mute"] ?? "text-ink-2")}>
                  {line.text}
                </p>
              ))}
              {entry.links?.length ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {entry.links.map((link) => (
                    <a
                      key={link.href + link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-line px-2 py-1 text-[11px] text-ink-2 transition-colors hover:border-signal hover:text-signal"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            run(value);
          }}
          className="flex items-center gap-3 border-t border-line px-4 py-3"
        >
          <span className="mono shrink-0 text-[12.5px] text-ink-3">
            <span className="text-signal">cyon@workspace</span>:<span className="text-electric">~</span>$
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                const next = Math.min(cursor + 1, history.length - 1);
                if (next >= 0) {
                  setCursor(next);
                  setValue(history[next]);
                }
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                const next = cursor - 1;
                if (next < 0) {
                  setCursor(-1);
                  setValue("");
                } else {
                  setCursor(next);
                  setValue(history[next]);
                }
              }
              if (event.key === "Tab") {
                const match = hints.find((h) => h.startsWith(value.toLowerCase()));
                if (match) {
                  event.preventDefault();
                  setValue(match);
                }
              }
            }}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
            className="mono w-full bg-transparent text-[12.5px] text-ink outline-none placeholder:text-ink-3"
            placeholder="type a command"
          />
        </form>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line px-4 py-2.5">
          {hints.map((hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => run(hint)}
              className="label !text-[9px] transition-colors hover:!text-signal"
            >
              {hint}
            </button>
          ))}
          <span className="label !text-[9px] ml-auto hidden sm:inline">↑↓ history · TAB complete</span>
        </div>
      </div>
    </div>
  );
}
