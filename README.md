# Cyon — workspace

The personal site for **Cyon** (Eghosa Imasuen): a Web3 builder working across
product, growth, community and ecosystems. One page, eleven sections, dark and
light environments, and a command terminal for people who would rather type.

Live: [cyon-workspace.vercel.app](https://cyon-workspace.vercel.app)

## Stack

- Next.js 16 (App Router) on React 19, built with webpack
- Tailwind v4, driven by CSS custom properties in `src/app/globals.css`
- Self hosted fonts (`next/font/local`): Geist, Instrument Serif, JetBrains Mono
- No runtime dependencies beyond React — motion, observers, the terminal and the
  screenshot harness are all hand rolled in `src/lib/hooks.ts`

## Commands

```bash
npm run dev      # dev server on :3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm run og       # regenerate public/og.png from scripts/og.html
```

## Content

Copy and data live in `src/data`, never in components:

| File | Owns |
| --- | --- |
| `site.ts` | Identity, links, nav, metadata, canonical URL |
| `sections.ts` | The document outline that drives the rail and terminal |
| `projects.ts` | Shipped projects and their case notes |
| `builds.ts` | What is being built right now |
| `proof.ts` | Receipts, numbers and outcomes |
| `capabilities.ts` | Disciplines and how they are practised |
| `ecosystem.ts` | Networks, chains and communities |
| `irl.ts` | Offline: events, IRL presence |
| `code.ts` | The terminal's command table and the hero ticker |

`src/data/sections.ts` is the source of truth for the page outline — adding a
section means adding it there and to `src/app/page.tsx`.

## Theming

Theme is written to `<html data-theme>` before paint by an inline script in
`src/app/layout.tsx`, so the environment never flashes. It is read and toggled
through `useTheme()` in `src/lib/hooks.ts`, which treats the DOM attribute as an
external store.

## Social card

`public/og.png` is generated, not drawn by hand:

```bash
npm run og
```

`scripts/make-og.mjs` serves `scripts/og.html` over localhost and screenshots it
at 1200x630 with headless Chrome. Edit the HTML to change the card copy, then
re-run. Override the browser with `CHROME_PATH=/path/to/chrome npm run og`.

## QA harness

`scripts/shoot.mjs` drives headless Chrome over the DevTools protocol to capture
the page section by section and report console errors:

```bash
node scripts/shoot.mjs http://localhost:3111 /private/tmp/qa 1440 900 "#top" "#proof" "#contact"
```

Arguments are `url`, `outDir`, `width`, `height`, then any number of section
selectors. `SHOOT_PRESCRIPT` runs JS in the page first, which is how the light
environment and the open terminal get captured.
