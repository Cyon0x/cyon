import type { Metadata, Viewport } from "next";
import { fontClassNames } from "@/lib/fonts";
import { SITE_URL, meta } from "@/data/site";
import { GridBackdrop } from "@/components/chrome/GridBackdrop";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SectionRail } from "@/components/chrome/SectionRail";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { CommandTerminal } from "@/components/terminal/CommandTerminal";
import "./globals.css";

/** Runs before paint so the chosen environment never flashes. */
const themeScript = [
  "(function(){try{",
  "var stored=localStorage.getItem('cyon-theme');",
  "var t=stored||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');",
  "document.documentElement.dataset.theme=t;",
  "document.documentElement.style.colorScheme=t;",
  "}catch(e){document.documentElement.dataset.theme='dark';}})();",
].join("");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: meta.title,
    template: "%s · Cyon",
  },
  description: meta.description,
  keywords: [...meta.keywords],
  authors: [{ name: "Cyon (Eghosa Imasuen)", url: SITE_URL }],
  creator: "Cyon",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: meta.title,
    description: meta.description,
    siteName: "Cyon",
    locale: "en_GB",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Cyon — Web3 builder, growth and ecosystems.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Cyon0x",
    creator: "@Cyon0x",
    title: meta.title,
    description: meta.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }],
    shortcut: ["/icon.svg"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080a" },
    { media: "(prefers-color-scheme: light)", color: "#f1efe9" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={fontClassNames}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative min-h-screen bg-bg text-ink">
        <a
          href="#builds"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:border focus:border-signal focus:bg-bg focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to the work
        </a>

        <GridBackdrop />
        <SiteNav />
        <SectionRail />

        <main id="content" className="relative z-10">
          {children}
        </main>

        <SiteFooter />
        <CustomCursor />
        <CommandTerminal />
      </body>
    </html>
  );
}
