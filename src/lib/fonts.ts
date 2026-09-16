import localFont from "next/font/local";

/** Editorial display face. Used for the human, oversized moments. */
export const displayFont = localFont({
  src: [
    {
      path: "../../public/fonts/instrument-serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

/** Body and UI face. */
export const sansFont = localFont({
  src: [
    {
      path: "../../public/fonts/geist-variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Helvetica Neue", "Arial", "sans-serif"],
});

/** Technical layer: labels, metadata, code, terminal. */
export const monoFont = localFont({
  src: [
    {
      path: "../../public/fonts/jetbrains-mono-variable.woff2",
      weight: "100 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/jetbrains-mono-italic-variable.woff2",
      weight: "100 800",
      style: "italic",
    },
  ],
  variable: "--font-jetbrains",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const fontClassNames = `${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`;
