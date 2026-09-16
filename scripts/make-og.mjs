/**
 * Renders public/og.png — the 1200x630 card used by Open Graph and Twitter.
 *
 *   npm run og
 *
 * scripts/og.html is served over localhost (so the self hosted woff2 files
 * load without file:// restrictions) and screenshotted with headless Chrome.
 * Re-run it whenever the card copy or the brand tokens change.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outFile = path.join(root, "public/og.png");
const page = "/scripts/og.html";

const WIDTH = 1200;
const HEIGHT = 630;
const TIMEOUT_MS = 45_000;

const CHROME_CANDIDATES = [
  path.join(
    homedir(),
    "Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-x64/chrome-headless-shell",
  ),
  path.join(
    homedir(),
    "Library/Caches/ms-playwright/chromium-1234/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  ),
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const chrome = process.env.CHROME_PATH ?? CHROME_CANDIDATES.find((c) => existsSync(c));
if (!chrome) {
  console.error("No Chrome found. Set CHROME_PATH to a Chrome or headless shell binary.");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  const target = path.join(root, path.normalize(decodeURIComponent(url.pathname)));

  if (!target.startsWith(root)) {
    res.writeHead(403).end("forbidden");
    return;
  }

  try {
    const body = await readFile(target);
    res.writeHead(200, {
      "content-type": TYPES[path.extname(target)] ?? "application/octet-stream",
      "content-length": body.length,
    });
    res.end(body);
  } catch {
    res.writeHead(404).end("not found");
  }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();

const child = spawn(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--user-data-dir=/tmp/cyon-og-chrome",
    `--window-size=${WIDTH},${HEIGHT}`,
    "--virtual-time-budget=6000",
    `--screenshot=${outFile}`,
    `http://127.0.0.1:${port}${page}`,
  ],
  { stdio: "ignore" },
);

let timedOut = false;
const watchdog = setTimeout(() => {
  timedOut = true;
  child.kill("SIGKILL");
}, TIMEOUT_MS);

const code = await new Promise((resolve) => child.on("exit", resolve));
clearTimeout(watchdog);
server.close();

if (timedOut || code !== 0 || !existsSync(outFile)) {
  console.error(`Render failed (exit ${code}${timedOut ? ", timed out" : ""}).`);
  process.exit(1);
}

const { size } = await stat(outFile);
const png = await readFile(outFile);
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);

if (width !== WIDTH || height !== HEIGHT) {
  console.error(`Wrote ${width}x${height}, expected ${WIDTH}x${HEIGHT}.`);
  process.exit(1);
}

console.log(`og.png — ${width}x${height}, ${(size / 1024).toFixed(0)} KB`);
