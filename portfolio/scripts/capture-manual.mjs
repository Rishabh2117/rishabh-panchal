// Opens a visible Chrome window so you can complete a human check (e.g. Cloudflare),
// then captures the screenshots automatically once the page is usable.
// Usage: node scripts/capture-manual.mjs <slug> <url> [readySelector]
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [slug, url, readyText = 'Quick check'] = process.argv.slice(2);
if (!slug || !url) {
  console.error('Usage: node scripts/capture-manual.mjs <slug> <url>');
  process.exit(1);
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.join(root, 'public', 'projects', slug);
await mkdir(dir, { recursive: true });

const browser = await chromium.launch({
  headless: false,
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded' });

console.log('Complete the human check in the Chrome window. Waiting up to 3 minutes…');
// Ready once the check dialog text is no longer visible
await page.waitForFunction((t) => !document.body.innerText.includes(t), readyText, { timeout: 180000, polling: 1000 });
await page.waitForTimeout(2500);
await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
await page.screenshot({ path: path.join(dir, 'desktop.jpg'), type: 'jpeg', quality: 78 });
console.log(`✓ ${slug}/desktop`);

// Same session (check already passed) at phone size
await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: 'networkidle' }).catch(() => {});
await page.waitForTimeout(2500);
const stillChecking = await page.evaluate((t) => document.body.innerText.includes(t), readyText);
if (stillChecking) {
  console.log('Mobile view asked for the check again — skipped mobile.jpg (desktop is saved).');
} else {
  // Re-render at 2x for a crisp phone mockup
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, storageState: await context.storageState() });
  const mp = await mobile.newPage();
  await mp.goto(url, { waitUntil: 'networkidle' }).catch(() => {});
  await mp.waitForTimeout(2500);
  const blocked = await mp.evaluate((t) => document.body.innerText.includes(t), readyText);
  await (blocked ? page : mp).screenshot({ path: path.join(dir, 'mobile.jpg'), type: 'jpeg', quality: 78 });
  console.log(`✓ ${slug}/mobile`);
}
await browser.close();
