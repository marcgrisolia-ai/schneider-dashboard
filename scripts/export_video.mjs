import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://127.0.0.1:4174/";
const durationSec = Number(process.argv[3] ?? 42);
const width = Number(process.argv[4] ?? 1920);
const height = Number(process.argv[5] ?? 1080);
const zoom = Number(process.argv[6] ?? 1.55);

const outputDir = path.resolve("renders");
fs.mkdirSync(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width, height },
  recordVideo: {
    dir: outputDir,
    size: { width, height },
  },
});

const page = await context.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.evaluate((z) => {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.body.style.zoom = String(z);
  document.body.style.transformOrigin = "top center";
  window.scrollTo(0, 0);
}, zoom);
await page.waitForTimeout(300);
await page.waitForTimeout(durationSec * 1000);

const video = page.video();
await context.close();
await browser.close();

if (!video) {
  throw new Error("No video was captured.");
}

const tempPath = await video.path();
const finalPath = path.join(outputDir, `dashboard_loop_${width}x${height}_z${zoom}.webm`);

if (fs.existsSync(finalPath)) {
  fs.rmSync(finalPath);
}

fs.renameSync(tempPath, finalPath);
console.log(`Video exported: ${finalPath}`);
