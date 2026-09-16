/**
 * Re-encodes the full resolution captures in raw-previews/ into the webp
 * previews used by the builds section.
 *
 *   npm run previews
 *
 * The captures are 2880x1800 (a 1440x900 viewport at 2x DPR), which is the
 * resolution the framed previews need on a retina screen. Encoding from the
 * PNGs rather than upscaling the old 1800px webp files is the whole point.
 * Requires `cwebp` (libwebp) on PATH.
 */
import { spawn } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "raw-previews");
const outDir = path.join(root, "public/projects");
const QUALITY = "82";
const MIN_WIDTH = 2400;

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited ${code}\n${stderr}`)),
    );
  });

const sources = (await readdir(srcDir)).filter((f) => f.endsWith(".png")).sort();

if (!sources.length) {
  console.error(`No PNG captures in ${srcDir}.`);
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

let bytes = 0;

for (const file of sources) {
  const from = path.join(srcDir, file);
  const to = path.join(outDir, `${path.basename(file, ".png")}.webp`);

  await run("cwebp", [
    "-q",
    QUALITY,
    "-m",
    "6",
    "-sharp_yuv",
    "-metadata",
    "none",
    from,
    "-o",
    to,
  ]);

  const { size } = await stat(to);
  bytes += size;
  console.log(`  ${path.basename(to).padEnd(22)} ${(size / 1024).toFixed(0)} KB`);
}

console.log(`${sources.length} previews written to public/projects (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
console.log(`Check the captures are at least ${MIN_WIDTH}px wide before encoding.`);
