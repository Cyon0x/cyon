import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M12 4v15" />
      <path d="M6 13l6 6 6-6" />
    </svg>
  );
}

export function TerminalIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1" />
      <path d="M7 9l3 3-3 3" />
      <path d="M13 15h4" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.8 21h-5.9l-4.2-5.5L6.8 21H3.77l7.06-8.07L2.6 3h6.05l3.8 5.02L17.53 3zm-1.06 16.2h1.67L7.6 4.72H5.8l10.67 14.48z" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="1" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M21.7 4.3 18.6 19c-.2 1-.9 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.25.25-.45.45-.9.45l.32-4.6 8.4-7.6c.36-.32-.08-.5-.56-.18L6.9 13.1 2.6 11.8c-.9-.3-.94-.9.2-1.35L20.2 3.6c.8-.3 1.5.2 1.5.7z" />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden focusable="false" {...props}>
      <path d="M19.3 5.4A16 16 0 0 0 15.4 4l-.3.6a12 12 0 0 1 3.4 1.6 11.4 11.4 0 0 0-9-.3l-.4.3A12 12 0 0 1 8.9 4.6L8.6 4a16 16 0 0 0-3.9 1.4C2.3 9 1.6 12.5 1.9 16a16 16 0 0 0 4.7 2.4l.6-.9a10 10 0 0 1-1.7-.8l.4-.3a11.6 11.6 0 0 0 10.2 0l.4.3c-.5.3-1.1.6-1.7.8l.6.9A16 16 0 0 0 22.1 16c.4-4-.7-7.5-2.8-10.6zM8.7 14c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9zm6.6 0c-.9 0-1.7-.9-1.7-1.9s.7-1.9 1.7-1.9 1.7.9 1.7 1.9-.7 1.9-1.7 1.9z" />
    </svg>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <svg {...base} width="14" height="14" {...props}>
      <rect x="9" y="9" width="11" height="11" rx="1" />
      <path d="M15 9V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} width="14" height="14" {...props}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} width="14" height="14" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} width="16" height="16" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} width="18" height="18" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

export function NodeIcon(props: IconProps) {
  return (
    <svg {...base} width="14" height="14" {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="4" cy="5" r="2" />
      <circle cx="20" cy="6" r="2" />
      <circle cx="5" cy="19" r="2" />
      <path d="M9.8 10.6 5.6 6.6M14.2 10.8l3.9-3.4M10.2 13.9 6.6 17.4" />
    </svg>
  );
}

export const socialIcons = {
  x: XIcon,
  github: GitHubIcon,
  email: MailIcon,
  telegram: TelegramIcon,
  discord: DiscordIcon,
} as const;
