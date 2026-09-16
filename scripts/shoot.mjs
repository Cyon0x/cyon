/**
 * Screenshot harness.
 *
 * Drives headless Chrome over the DevTools protocol with no extra
 * dependencies, so the site can be reviewed section by section while building.
 *
 *   node scripts/shoot.mjs <url> <outDir> [width] [height] [selector...]
 *
 * Env: CHROME_PATH overrides the browser, SHOOT_PRESCRIPT runs JS in the page
 * before capturing (used for the light environment, the open terminal, etc).
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";

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

const CHROME = process.env.CHROME_PATH ?? CHROME_CANDIDATES.find((c) => existsSync(c));

if (!CHROME) {
  console.error("No Chrome found. Set CHROME_PATH to a Chrome or headless shell binary.");
  process.exit(1);
}

/** The headless shell is always headless; the full browser needs the flag. */
const headlessFlags = CHROME.includes("chrome-headless-shell") ? [] : ["--headless=new"];

const [url, outDir, w = "1440", h = "900", ...selectors] = process.argv.slice(2);
const width = Number(w);
const height = Number(h);
const targets = selectors.length ? selectors : ["#top"];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const port = 9400 + Math.floor(Math.random() * 200);

const chrome = spawn(
  CHROME,
  [
    ...headlessFlags,
    `--remote-debugging-port=${port}`,
    "--disable-gpu",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--force-device-scale-factor=2",
    `--window-size=${width},${height}`,
    "--user-data-dir=/tmp/cyon-chrome",
    "about:blank",
  ],
  { stdio: "ignore" },
);

/** Never leave a browser (or this script) wedged. */
const watchdog = setTimeout(() => {
  chrome.kill("SIGKILL");
  console.error("chrome timed out");
  process.exit(1);
}, 90_000);

async function endpoint() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      const json = await res.json();
      return json.webSocketDebuggerUrl;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("chrome did not start");
}

const wsUrl = await endpoint();
const ws = new WebSocket(wsUrl);
await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));

let id = 0;
const pending = new Map();

ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) reject(new Error(JSON.stringify(msg.error)));
    else resolve(msg.result);
  }
});

const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    id += 1;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

// Attach to a fresh page target.
const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });

await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send(
  "Emulation.setDeviceMetricsOverride",
  { width, height, deviceScaleFactor: 2, mobile: width < 600 },
  sessionId,
);

await mkdir(outDir, { recursive: true });

await send("Page.navigate", { url }, sessionId);
await sleep(3500);

// Optional setup step (theme switch, opening the terminal, etc).
if (process.env.SHOOT_PRESCRIPT) {
  await send(
    "Runtime.evaluate",
    { expression: process.env.SHOOT_PRESCRIPT },
    sessionId,
  );
  await sleep(1200);
}

const shots = [];
for (const selector of targets) {
  const { result } = await send(
    "Runtime.evaluate",
    {
      expression: `(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return null;
        const y = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: y, behavior: 'instant' });
        return Math.round(y);
      })()`,
      returnByValue: true,
    },
    sessionId,
  );

  if (result.value === null) {
    console.log(`  ! ${selector} not found`);
    continue;
  }

  // Long enough for reveals and counters to finish, not just to start.
  await sleep(2000);
  const shot = await send("Page.captureScreenshot", { format: "png" }, sessionId);
  const name = `${String(shots.length + 1).padStart(2, "0")}-${selector.replace(/[^a-z0-9]+/gi, "-")}.png`;
  await writeFile(path.join(outDir, name), Buffer.from(shot.data, "base64"));
  shots.push(name);
  console.log(`  ✓ ${name}`);
}

// Report console errors, which is the point of doing this at all.
const { result: errors } = await send(
  "Runtime.evaluate",
  {
    expression: "JSON.stringify(window.__cyonErrors || [])",
    returnByValue: true,
  },
  sessionId,
);

console.log("shots:", shots.length, "errors:", errors.value);

ws.close();
chrome.kill();
clearTimeout(watchdog);
await sleep(300);
process.exit(0);
