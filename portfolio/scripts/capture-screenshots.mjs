// Captures above-the-fold project screenshots from live sites using the locally installed Chrome.
// Usage: npm run screenshots            (all projects)
//        npm run screenshots -- ecofy   (one project by slug)
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Keep in sync with src/data/projects.ts.
// Visual Sadhan is behind a Cloudflare human check, so its screenshot must be added manually.
const targets = {
  'mann-talks': 'https://www.manntalks.org/',
  ecofy: 'https://uat.ecofy.co.in/',
  'vasan-eye-care': 'https://www.vasaneye.com/',
  khpt: 'https://www.khpt.org/',
  'mahindra-farm-equipment': 'https://www.mahindrafarmequipment.com/',
  pudding: 'https://housesofbandra.com/',
};

const variants = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, scale: 1 },
  { name: 'mobile', viewport: { width: 390, height: 844 }, scale: 2, mobile: true },
];

const only = process.argv[2];
const executablePath =
  process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const browser = await chromium.launch({ executablePath });

async function dismissCookieBanners(page) {
  const labels = /^(i accept|accept( all)?|allow( all)?|got it|ok|agree)$/i;
  for (const button of await page.getByRole('button').all()) {
    const text = (await button.innerText().catch(() => '')).trim();
    if (labels.test(text)) await button.click({ timeout: 2000 }).catch(() => {});
  }
}

async function shoot(slug, url) {
  const dir = path.join(root, 'public', 'projects', slug);
  await mkdir(dir, { recursive: true });

  for (const v of variants) {
    const context = await browser.newContext({
      viewport: v.viewport,
      deviceScaleFactor: v.scale,
      isMobile: !!v.mobile,
      hasTouch: !!v.mobile,
    });
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
      await page.waitForTimeout(4000); // let redirects, intro animations and sliders settle
      await dismissCookieBanners(page);
      // Snap any running transitions (e.g. carousels) to their end state
      await page.addStyleTag({
        content: '*,*::before,*::after{transition:none!important;animation:none!important}',
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(dir, `${v.name}.jpg`), type: 'jpeg', quality: 78 });
      console.log(`✓ ${slug}/${v.name}`);
    } catch (err) {
      console.warn(`✗ ${slug}/${v.name}: ${err.message}`);
    } finally {
      await context.close();
    }
  }
}

for (const [slug, url] of Object.entries(targets)) {
  if (only && only !== slug) continue;
  await shoot(slug, url);
}
await browser.close();
