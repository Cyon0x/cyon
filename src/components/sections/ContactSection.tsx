"use client";

import { useState } from "react";
import { identity, links } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCopy } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CheckIcon,
  CopyIcon,
  DiscordIcon,
  GitHubIcon,
  MailIcon,
  TelegramIcon,
  XIcon,
} from "@/components/ui/Icons";

type Intent = {
  id: string;
  label: string;
  reply: string;
  body: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
};

const email = (subject: string) =>
  `mailto:${links.email.handle}?subject=${encodeURIComponent(subject)}`;

const intents: Intent[] = [
  {
    id: "build",
    label: "BUILD SOMETHING",
    reply: "Let's talk product.",
    body: "If you have a product that needs building — frontend, wallet flows, EVM integration, payment logic — I would rather see the messy version than the pitch.",
    cta: { label: "EMAIL CYON", href: email("Let's build something") },
    secondary: { label: "or find me on Telegram", href: links.telegram.href },
  },
  {
    id: "grow",
    label: "GROW A COMMUNITY",
    reply: "Let's talk ecosystem.",
    body: "Onboarding, activation, retention, ambassador programmes, the boring work that makes a community feel alive after the launch week ends.",
    cta: { label: "MESSAGE ON TELEGRAM", href: links.telegram.href },
    secondary: { label: "or send an email", href: email("Community / ecosystem work") },
  },
  {
    id: "content",
    label: "CONTENT / CAMPAIGN",
    reply: "Let's talk campaigns.",
    body: "Threads, explainers, product writing, launch pushes. I write the way I build: specific, no filler, and aimed at someone who is new.",
    cta: { label: "EMAIL CYON", href: email("Content / campaign") },
    secondary: { label: "or DM on X", href: links.x.href },
  },
  {
    id: "devrel",
    label: "ECOSYSTEM / DEVREL",
    reply: "Let's talk trust.",
    body: "Documentation, onboarding paths, developer communication, testing the thing before you announce it. I care about whether people actually get through it.",
    cta: { label: "EMAIL CYON", href: email("Ecosystem / DevRel") },
    secondary: { label: "or message on Telegram", href: links.telegram.href },
  },
  {
    id: "hello",
    label: "JUST SAY HELLO",
    reply: "No agenda needed.",
    body: "Questions about something I have built, a chain you think I should look at, or a project you would want to talk about.",
    cta: { label: "DM ON X", href: links.x.href },
    secondary: { label: "or send an email", href: email("Hello") },
  },
];

export function ContactSection() {
  const [active, setActive] = useState(intents[0].id);
  const { copied, copy } = useCopy();
  const current = intents.find((intent) => intent.id === active) ?? intents[0];

  const rows = [
    { key: "x", label: links.x.label, value: links.x.handle, href: links.x.href, Icon: XIcon },
    {
      key: "email",
      label: links.email.label,
      value: links.email.handle,
      href: links.email.href,
      Icon: MailIcon,
    },
    {
      key: "github",
      label: links.github.label,
      value: links.github.handle,
      href: links.github.href,
      Icon: GitHubIcon,
    },
    {
      key: "telegram",
      label: links.telegram.label,
      value: links.telegram.handle,
      href: links.telegram.href,
      Icon: TelegramIcon,
    },
    {
      key: "discord",
      label: links.discord.label,
      value: links.discord.handle,
      href: null,
      Icon: DiscordIcon,
    },
  ] as const;

  return (
    <section id="contact" className="relative z-10 border-b border-line py-[clamp(4.5rem,11vh,9rem)]">
      <div className="shell">
        <SectionHeading
          index="11"
          kicker="CONTACT"
          title={
            <>
              Got something
              <span className="serif italic"> to build?</span>
            </>
          }
          lead="If you have a product, an ecosystem, a community or a strange idea that needs someone willing to get into the work — pick the closest door."
        />

        <div className="mt-14 grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* doors */}
          <div className="col-span-12 lg:col-span-5">
            <ul className="border-t border-line">
              {intents.map((intent) => {
                const on = intent.id === active;
                return (
                  <li key={intent.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setActive(intent.id)}
                      onMouseEnter={() => setActive(intent.id)}
                      aria-pressed={on}
                      data-cursor="SELECT"
                      className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={cn(
                            "h-[7px] w-[7px] shrink-0 border transition-colors",
                            on ? "border-signal bg-signal" : "border-line-2",
                          )}
                        />
                        <span
                          className={cn(
                            "mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                            on ? "text-signal" : "text-ink-3 group-hover:text-ink-2",
                          )}
                        >
                          {intent.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        width={13}
                        height={13}
                        className={cn(
                          "shrink-0 transition-all",
                          on ? "text-signal opacity-100" : "text-ink-3 opacity-0 group-hover:opacity-60",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* dispatch */}
          <div className="col-span-12 lg:col-span-7">
            <div className="panel panel-cut ticks relative overflow-hidden p-6 lg:p-8">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(65% 80% at 100% 0%, color-mix(in srgb, var(--signal) 11%, transparent), transparent 72%)",
                }}
              />

              <div key={current.id} className="swap-in relative">
                <span className="label">{current.label}</span>
                <p className="serif mt-5 text-[length:calc(var(--text-h2)*0.9)] italic leading-[1.05]">
                  {current.reply}
                </p>
                <p className="mt-5 max-w-[52ch] text-ink-2">{current.body}</p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={current.cta.href}
                    target={current.cta.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="btn btn-solid"
                    data-cursor="CONNECT"
                  >
                    <span>
                      {current.cta.label}
                      <ArrowUpRight width={13} height={13} />
                    </span>
                  </a>
                  <a
                    href={current.secondary.href}
                    target={current.secondary.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="label link-draw !text-ink-2 transition-colors hover:!text-ink"
                  >
                    {current.secondary.label}
                  </a>
                </div>
              </div>

              <div className="mt-10 border-t border-line pt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="label">DIRECT</span>
                  <span className="label !text-signal">{identity.status}</span>
                </div>

                <ul className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  {rows.map(({ key, label, value, href, Icon }) => (
                    <li key={key} className="border-b border-line">
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          data-cursor="CONNECT"
                          className="group flex items-center gap-3 py-3"
                        >
                          <Icon width={14} height={14} className="shrink-0 text-ink-3 transition-colors group-hover:text-signal" />
                          <span className="label !text-[9px] w-16 shrink-0">{label}</span>
                          <span className="mono truncate text-[11px] text-ink-2 transition-colors group-hover:text-ink">
                            {value}
                          </span>
                          <ArrowUpRight
                            width={12}
                            height={12}
                            className="ml-auto shrink-0 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100"
                          />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => copy(value, key)}
                          data-cursor="COPY"
                          className="group flex w-full items-center gap-3 py-3 text-left"
                        >
                          <Icon width={14} height={14} className="shrink-0 text-ink-3 transition-colors group-hover:text-signal" />
                          <span className="label !text-[9px] w-16 shrink-0">{label}</span>
                          <span className="mono truncate text-[11px] text-ink-2 transition-colors group-hover:text-ink">
                            {value}
                          </span>
                          <span className="ml-auto flex shrink-0 items-center gap-1.5 text-ink-3 transition-colors group-hover:text-signal">
                            {copied === key ? (
                              <>
                                <CheckIcon width={12} height={12} />
                                <span className="label !text-[9px] !text-signal">COPIED</span>
                              </>
                            ) : (
                              <>
                                <CopyIcon width={12} height={12} />
                                <span className="label !text-[9px]">COPY</span>
                              </>
                            )}
                          </span>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-[0.82rem] text-ink-3">
                  Discord has no public handle link, so the handle copies to your clipboard instead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
