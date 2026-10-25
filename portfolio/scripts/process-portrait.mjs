// Local, non-generative portrait processing: crop + global tone/colour adjustments only.
// No pixels are moved, warped or synthesised, so facial features stay exactly as photographed.
// Usage: node scripts/process-portrait.mjs <src> public/about <x> <y> <w> <h> [faceX] [faceY] [rightFade]
// x y w h: crop in source pixels. faceX/faceY: face centre as a fraction of the crop.
// rightFade: 1 to darken the far-right edge extra (e.g. a bright window), default 0.
// Current photo: node scripts/process-portrait.mjs "../image/Thoughtful Professional Portrait.png" public/about 0 0 1082 1454 0.48 0.22
import { chromium } from 'playwright-core';
import fs from 'node:fs';

const [src, outDir, x, y, w, h, fx = 0.5, fy = 0.42, rightFade = 0] = process.argv.slice(2);
// fx/fy: face centre as a fraction of the crop, used to centre the background darkening
const crop = { x: +x, y: +y, w: +w, h: +h, fx: +fx, fy: +fy, rightFade: +rightFade };
const mime = /\.png$/i.test(src) ? 'image/png' : 'image/jpeg';
const dataUrl = `data:${mime};base64,` + fs.readFileSync(src).toString('base64');

const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const page = await browser.newPage();
const result = await page.evaluate(
  async ({ dataUrl, crop }) => {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    const OUT_W = 800;
    const OUT_H = Math.round((OUT_W * crop.h) / crop.w);

    const make = () => {
      const c = document.createElement('canvas');
      c.width = OUT_W;
      c.height = OUT_H;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      return [c, ctx];
    };

    // Vignette mask: 1 at centre (face) → 0 at edges; used to darken the background only
    const vignette = (px, py) => {
      const dx = (px / OUT_W - crop.fx) / 0.55;
      const dy = Math.max(0, py / OUT_H - crop.fy) / 1.4 + Math.min(0, py / OUT_H - crop.fy) / 0.55;
      const d = Math.sqrt(dx * dx + dy * dy);
      const radial = Math.min(1, Math.max(0, 1 - (d - 0.38) / 0.5));
      // Extra fade on the far right edge (bright window in the source photo)
      const right = Math.min(1, Math.max(0, (1 - px / OUT_W) / 0.16));
      return crop.rightFade ? radial * (0.25 + 0.75 * right) : radial;
    };

    // ---- 1. Natural colour version: gentle contrast, slight warmth correction, background darkened
    const [c1, x1] = make();
    x1.drawImage(img, crop.x, crop.y, crop.w, crop.h, 0, 0, OUT_W, OUT_H);
    const d1 = x1.getImageData(0, 0, OUT_W, OUT_H);
    const p = d1.data;
    for (let i = 0; i < p.length; i += 4) {
      const n = i / 4;
      const v = vignette(n % OUT_W, Math.floor(n / OUT_W));
      for (let k = 0; k < 3; k++) {
        let c = p[i + k] / 255;
        c = (c - 0.5) * 1.08 + 0.5; // +8% contrast
        c = Math.pow(Math.max(0, c), 1.03);
        p[i + k] = Math.max(0, Math.min(255, c * 255));
      }
      p[i + 2] = Math.min(255, p[i + 2] * 1.02); // neutralise the yellow cast slightly
      p[i] *= 0.98;
      const dark = 0.12 + 0.88 * v; // background fades toward the page colour
      p[i] *= dark;
      p[i + 1] *= dark;
      p[i + 2] *= dark;
    }
    x1.putImageData(d1, 0, 0);
    const color = c1.toDataURL('image/jpeg', 0.88);

    // ---- 2. Duotone in site colours: shadows navy-black, mids editor blue, highlights warm amber-white
    const [c2, x2] = make();
    x2.drawImage(c1, 0, 0);
    const d2 = x2.getImageData(0, 0, OUT_W, OUT_H);
    const q = d2.data;
    const stops = [
      [0, [14, 15, 20]],
      [0.5, [72, 90, 138]],
      [0.8, [168, 178, 212]],
      [1, [242, 222, 186]],
    ];
    const ramp = (t) => {
      for (let s = 1; s < stops.length; s++) {
        if (t <= stops[s][0]) {
          const [t0, a] = stops[s - 1];
          const [t1, b] = stops[s];
          const k = (t - t0) / (t1 - t0);
          return a.map((av, j) => av + (b[j] - av) * k);
        }
      }
      return stops[stops.length - 1][1];
    };
    for (let i = 0; i < q.length; i += 4) {
      const l = (0.299 * q[i] + 0.587 * q[i + 1] + 0.114 * q[i + 2]) / 255;
      const [r, g, b] = ramp(Math.min(1, l * 1.15));
      q[i] = r;
      q[i + 1] = g;
      q[i + 2] = b;
    }
    x2.putImageData(d2, 0, 0);
    const duo = c2.toDataURL('image/jpeg', 0.88);
    return { color, duo, size: [OUT_W, OUT_H] };
  },
  { dataUrl, crop },
);
fs.writeFileSync(`${outDir}/portrait.jpg`, Buffer.from(result.color.split(',')[1], 'base64'));
fs.writeFileSync(`${outDir}/portrait-duotone.jpg`, Buffer.from(result.duo.split(',')[1], 'base64'));
console.log('saved', result.size.join('×'));
await browser.close();
