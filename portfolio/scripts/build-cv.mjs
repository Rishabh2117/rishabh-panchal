// Prints cv/cv.html to public/docs/Rishabh-Panchal-CV.pdf using the locally installed Chrome.
// Usage: npm run cv
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, 'public', 'docs', 'Rishabh-Panchal-CV.pdf');
await mkdir(path.dirname(out), { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
});
const page = await browser.newPage();
await page.goto(pathToFileURL(path.join(root, 'cv', 'cv.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`✓ ${path.relative(root, out)}`);
