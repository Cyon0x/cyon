import { identity, links } from "@/data/site";
import { sections } from "@/data/sections";
import { Mark } from "@/components/ui/Mark";
import { LocalClock } from "@/components/ui/LocalClock";
import {
  ArrowUpRight,
  GitHubIcon,
  MailIcon,
  TelegramIcon,
  XIcon,
} from "@/components/ui/Icons";

const socials = [
  { key: "x", href: links.x.href, handle: links.x.handle, Icon: XIcon },
  { key: "github", href: links.github.href, handle: links.github.handle, Icon: GitHubIcon },
  { key: "email", href: links.email.href, handle: links.email.handle, Icon: MailIcon },
  { key: "telegram", href: links.telegram.href, handle: links.telegram.handle, Icon: TelegramIcon },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10">
      <div className="shell pt-[clamp(3.5rem,8vh,6rem)]">
        <div className="grid grid-cols-12 gap-y-12 border-b border-line pb-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-5">
            <a href="#top" className="group inline-flex items-center gap-3">
              <Mark className="text-ink" />
              <span className="mono text-[15px] font-semibold tracking-[0.22em]">CYON</span>
            </a>
            <p className="serif mt-7 text-[length:var(--text-h2)] italic leading-[1.02]">
              still building.
            </p>
            <p className="label mt-4">WEB3 / PRODUCT / GROWTH / COMMUNITY</p>
            <p className="mt-6 max-w-[42ch] text-[0.92rem] text-ink-3">
              Open to product, growth and ecosystem work. Interested in anything involving
              stablecoins, payments and people who are new to all of this.
            </p>
          </div>

          <nav aria-label="Sections" className="col-span-6 lg:col-span-4">
            <p className="label mb-4">OUTLINE</p>
            <ul className="grid grid-cols-2 gap-x-6">
              {sections.slice(1).map((section) => (
                <li key={section.id} className="border-b border-line">
                  <a
                    href={`#${section.id}`}
                    className="group flex items-baseline gap-2.5 py-2"
                    data-cursor="GO"
                  >
                    <span className="label !text-[9px] transition-colors group-hover:!text-signal">
                      {section.index}
                    </span>
                    <span className="label !text-ink-2 transition-colors group-hover:!text-ink">
                      {section.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 lg:col-span-3">
            <p className="label mb-4">ELSEWHERE</p>
            <ul>
              {socials.map(({ key, href, handle, Icon }) => (
                <li key={key} className="border-b border-line">
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    data-cursor="FOLLOW"
                    className="group flex items-center gap-3 py-2.5"
                  >
                    <Icon width={13} height={13} className="shrink-0 text-ink-3 transition-colors group-hover:text-signal" />
                    <span className="mono truncate text-[11px] text-ink-2 transition-colors group-hover:text-ink">
                      {handle}
                    </span>
                    <ArrowUpRight
                      width={11}
                      height={11}
                      className="ml-auto shrink-0 text-ink-3 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="label flex items-center gap-2 !text-signal">
                <span className="h-1.5 w-1.5 rounded-full bg-signal blink" />
                ONLINE
              </span>
              <LocalClock className="label" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5">
          <span className="label">© {new Date().getFullYear()} CYON · {identity.legalName.toUpperCase()}</span>
          <span className="label">DISCORD · {links.discord.handle}</span>
          <span className="label">BUILT WITH CURIOSITY + CODE</span>
        </div>
      </div>

      {/* final screen */}
      <div className="relative select-none overflow-hidden pt-2" aria-hidden>
        <span
          className="block whitespace-nowrap text-center leading-[0.74]"
          style={{
            fontSize: "clamp(4.5rem, 21vw, 19rem)",
            fontWeight: 700,
            letterSpacing: "-0.055em",
            color: "transparent",
            WebkitTextStroke: "1px var(--line-2)",
            transform: "translateY(12%)",
          }}
        >
          CYON
        </span>
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
          style={{ background: "linear-gradient(180deg, transparent, var(--bg))" }}
        />
      </div>
    </footer>
  );
}
