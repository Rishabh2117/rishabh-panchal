# Portfolio Handover

What was built, how it was built, and what you still need to do.
Last updated: 25 October 2026.

---

## 1. Your to-do list

Work through these before sharing the site publicly. Most are one-line edits in `src/data/`.

### Must do

- [x] ~~Email, phone and LinkedIn~~ — in `src/data/siteConfig.ts` (email: `rishabhpanchalh@gmail.com`).
- [x] ~~Resume~~ — CV PDF is live at `public/docs/Rishabh-Panchal-CV.pdf` (nav "Resume" button). Edit `cv/cv.html` and run `npm run cv` to update it.
- [ ] **Degree certificate is public.** `public/docs/rishabh-panchal-bsc-it-degree.pdf` is linked from Education. It shows your full name, parents' names, the certificate serial number and barcode. Remove the link in `experience.ts` → `education.certificate` if you'd rather not publish those.
- [ ] **Pudding — Houses of Bandra** and **ASCI:** describe what you worked on. In `projects.ts` their `contribution` lists are empty, so the cards say "Contribution details to be added".
- [ ] **Confirm your freelance start date.** `src/data/experience.ts` → the "Freelance Web Developer" entry is set to `October 2026 – Present`. Change it if you started on a different date.
- [ ] **Visual Sadhan mobile screenshot (optional).** The desktop screenshot is in place. The site has a Cloudflare human check, so run `node scripts/capture-manual.mjs visual-sadhan https://visual-sadhan.juicyburger.in/`, tick the check in the Chrome window that opens, and keep the window open until it saves both images. Then change its `images` in `projects.ts` to `img('visual-sadhan')`.
- [ ] **Check permissions.** Confirm FlyingCursor and the clients are fine with their sites appearing in your portfolio.

- [ ] **Portrait check.** The About section uses `image/Thoughtful Professional Portrait.png`, an AI-retouched version of your photo that you supplied. Make sure it still looks exactly like you. You're also still looking down rather than at the camera; for a camera-facing version, see section 7.

### Should check

- [ ] **Ecofy URL** points to the UAT (staging) site, `uat.ecofy.co.in`, and the card is labelled "Staging (UAT) environment". Swap it for the live URL if there is one.
- [ ] **Review every contribution list** in `projects.ts`. They come from your notes document. Remove anything you didn't personally do.
- [ ] **Review the skills** in `skills.ts`. Remove anything you can't confidently discuss in an interview (for example Git/GitLab, Razorpay).
- [ ] **Technical highlights** (`experience.ts` → `technicalHighlights`) are shown without linking them to specific clients, as the brief required.

### When you deploy

- [ ] **Set absolute share-image URLs.** In `index.html`, change `og:image` from `./og-image.jpg` to the full URL, e.g. `https://yourdomain.com/og-image.jpg`. Social networks ignore relative image paths.
- [ ] Optionally add `<link rel="canonical" href="https://yourdomain.com/">` to `index.html`.

### Later

- [ ] **Figma case studies:** add them as projects with `category: 'design'` (see README → "Add a Figma / design project") and replace the "coming soon" card in `src/components/Playground.tsx`.
- [ ] **Playground:** add real experiments when you have them.

### Cleanup from this session

- [ ] Delete the stray folder **`C:\c\`**. A Git Bash path-conversion mistake during testing created it, and it only contains QA screenshots. Safe to delete.
- [ ] Delete `folder/portfolio Websites.docx` whenever you like. Everything in it is now in `src/data/projects.ts` (except ASG Eye Hospital, removed at your request).
- [ ] A local preview server may still be running on port 4173. Close it from Task Manager (node.exe) or just restart.

---

## 2. What was built

A single-page portfolio with one case-study page per project.

### Home page sections

| Section | What it shows |
| --- | --- |
| **Navbar** | RP wordmark, Work / About / Capabilities / Contact, Resume button, scroll progress bar. Hides when you scroll down and reappears when you scroll up. Full-screen menu on mobile. |
| **Hero** | "Code meets creative thinking." headline revealed word by word, intro text, Explore work / Contact buttons, and a code card that types out an `about.js` object. Behind it, an **interactive dot field** (canvas) ripples in a slow wave; the dots scatter away from your cursor and spring back, tinted code-blue → design-amber with a purple glow. A soft drifting colour wash sits underneath. |
| **Marquee** | Scrolling strip of technologies. |
| **Selected Work** | Labelled *"Selected client work at FlyingCursor · 2024 – present"*. Two views: **Gallery** (asymmetric grid of browser-framed screenshots with 3D tilt and glow on hover) and **Index** (typographic list with a floating screenshot preview that follows the cursor). Mann Talks and Ecofy carry a pulsing **"Freelance via FlyingCursor"** badge. |
| **About** | "Developer by practice. / Designer in progress." The About paragraph brightens word by word as you scroll, with your **portrait** beside it (blue-toned; a circular lens follows the cursor to reveal the natural-colour photo, tap to toggle on phones, with a rotating "Developer × Designer" badge), followed by a **Then → Now → Next** journey (Now = freelancing on Mann Talks and Ecofy, plus learning design). |
| **Capabilities** | Two panels: **Development** (professional experience) and **Design** (dashed outline, "in progress"). No skill bars or percentages. |
| **Experience** | Freelance Full Stack Developer (Oct 2026 – Present) and FlyingCursor (Nov 2023 – Oct 2026) with a **role progression**: Jr. Full Stack Developer (Intern) → IT Executive → Full Stack Developer. Then 7 technical highlights and an **Education** block (B.Sc. IT, University of Mumbai, CGPI 8.14, link to the degree certificate; Udemy certification; languages). Previously: two entries: **Freelance Web Developer, FlyingCursor (October 2026 – Present, "Ongoing" badge)** for Mann Talks and Ecofy, and **Full Stack Web Developer, FlyingCursor (April 2024 – October 2026)**. A timeline line fills as you scroll, plus a timeline line that fills as you scroll, the responsibilities list, and 7 "Under the hood" technical-highlight cards with a cursor-following border glow. |
| **Design work & playground** | Honest empty states: an animated wireframe for upcoming Figma case studies and a "Playground — empty for now" card. |
| **Contact** | Large "Let's make something meaningful." headline, email button with copy-to-clipboard, plus LinkedIn, GitHub and a tap-to-call phone number. No fake contact form. |
| **Footer** | Large name wordmark, links, dynamic year, back-to-top. |

### Project pages (`#/work/<slug>`)

Back link, heading, a role / platform / sector / links strip, a desktop screenshot in a browser frame with a phone mockup that drifts on scroll, Overview, **My contribution** and Technologies. (The Context / Implementation decisions / Outcome sections were removed at your request.) Freelance projects show an "ongoing" badge under the heading. At the bottom, a full-width "Next project" link that wipes in on hover.

### Projects included (8)

| # | Project | Platform | Screenshot |
| --- | --- | --- | --- |
| 1 | Mann Talks *(freelance, ongoing)* | WordPress | ✅ desktop + mobile |
| 2 | Ecofy *(freelance, ongoing)* | Drupal | ✅ (from the UAT site) |
| 3 | Vasan Eye Care | WordPress | ✅ |
| 4 | KHPT | WordPress | ✅ |
| 5 | Mahindra Farm Equipment | WordPress | ✅ |
| 6 | Visual Sadhan | Web | ✅ desktop (captured after a manual Cloudflare check) |
| 7 | Pudding — Houses of Bandra | Web | ✅ |
| 8 | ASCI (ascionline.in) | WordPress | ✅ |

- **ASG Eye Hospital** was removed at your request.
- **Houses of Bandra** and **Pudding** turned out to be the same site, so they're merged into one project with both links: `housesofbandra.com` and the FlyingCursor preview.
- Screenshots are **above-the-fold only** (no full-page captures), as you requested.

### Animations and interactions

All of these respect **"Reduce motion"** in the operating system. With it on, content simply fades in. Cursor effects only run on mouse/trackpad devices.

- Word-by-word masked headline reveals
- Fade-and-lift reveals on scroll
- Custom cursor that grows over links and becomes a "View" / "Next" disc over projects
- Magnetic buttons that pull toward the pointer
- 3D tilt and accent glow on project cards; parallax inside the screenshots
- Index view with a floating preview that follows the cursor
- Animated pill for the Gallery / Index toggle
- Scroll-linked text highlighting (About) and a timeline line that fills as you scroll (Experience)
- Spotlight borders on the technical-highlight cards
- **Interactive hero dot field** (canvas; pauses when scrolled away, static frame with reduced motion)
- Slowly shifting **gradient text** on accent headlines, gradient buttons and logo mark
- Pulsing "ongoing" badges for freelance work
- Gradient curtain wipe between pages
- Circular reveal for the mobile menu
- Scroll progress bar; navbar that hides on scroll-down
- Infinite marquees, which pause on hover

Deliberately left out, per the brief: no intro loading screen, no scroll hijacking, and no WebGL. The one canvas (the hero dots) only runs while the hero is on screen.

---

## 3. What it was built with

| Tool | Version | Why |
| --- | --- | --- |
| **React** | 19 | UI components |
| **TypeScript** | 5.8 | Type-safe data files, so a typo in `projects.ts` shows up as a build error |
| **Vite** | 6 | Dev server and production build |
| **Motion** (formerly Framer Motion) | 12 | All JS-driven animation: reveals, springs, scroll-linked effects, page transitions |
| **React Router** | 7 | Hash routing (`#/work/slug`), so the build works from any folder without server rewrites |
| **Plain CSS** | — | Design tokens in `src/styles/tokens.css`, one CSS file per component. No Tailwind. |
| **Google Fonts** | — | *Bricolage Grotesque* (display), *Instrument Sans* (body), *JetBrains Mono* (labels) |
| **playwright-core** | 1.55 (dev only) | Uses your installed Chrome to capture project screenshots (`npm run screenshots`; `scripts/capture-manual.mjs` for sites with a human check). Not shipped to the site. |

Production bundle: about **140 KB JS + 8 KB CSS** (gzipped). Screenshots total about 2 MB, lazy-loaded.

### Design system

- **Colors ("Night Editor" palette):** a two-tone system that mirrors *coder + designer*. **Editor blue `#7aa2f7`** marks code (dev skills, code card, highlights, playground), **warm amber `#e0af68`** marks design (Design panel, Figma card, "UI/UX & Product Design"), and **soft purple `#bb9af7`** is where they blend (headline gradients, buttons, hero dots). Background is a cool near-black `#0e0f14`. Kept soft on purpose; earlier lime, neon and peach versions were rejected.
- **Type:** oversized uppercase display headings, fluid sizes via `clamp()`
- **Layout:** 1440px max width, 12-column art-directed project grid that collapses to one column under 900px

All tokens are in `src/styles/tokens.css`. Change `--accent` (code), `--accent-2` (design) and `--accent-3` (blend) there to re-theme the whole site; the hero dot colours are in `src/components/HeroField.tsx` (`BLUE`, `AMBER`, `PURPLE`).

---

## 4. File map

```text
portfolio/
├── index.html                  ← page title, description, social-share tags, fonts
├── public/
│   ├── favicon.svg
│   ├── og-image.jpg            ← share image (generated from the hero)
│   └── projects/<slug>/        ← desktop.jpg, mobile.jpg
├── scripts/
│   └── capture-screenshots.mjs ← npm run screenshots
└── src/
    ├── data/                   ← ★ edit content here
    │   ├── siteConfig.ts
    │   ├── projects.ts
    │   ├── experience.ts
    │   └── skills.ts
    ├── components/
    │   ├── motion/             ← SplitReveal, Reveal, Magnetic, Marquee, ScrollText
    │   ├── Navbar, Hero, HeroField, CodeCard, ProjectGrid, ProjectCard, ProjectVisual
    │   ├── About, Capabilities, Experience, Playground, Contact, Footer
    │   └── Cursor
    ├── hooks/                  ← useFinePointer, useSectionNav
    ├── pages/                  ← Home, ProjectDetail, NotFound
    ├── styles/                 ← tokens.css, base.css
    ├── App.tsx                 ← routes and page transitions
    └── main.tsx
```

---

## 5. How it was verified

- `npm run lint` → 0 problems
- `npm run build` (TypeScript and Vite) → passes
- Rendered in real Chrome at **1440, 1024, 768, 390 and 320 px** on the home page and project pages:
  - no horizontal overflow at any width
  - no console or runtime errors
- Interaction test: nav scroll links, Gallery/Index toggle, Index hover preview, card → project page (opens at the top with the correct page title), "All work" back to the Work section, mobile menu → section
- Mobile and overflow bugs found during testing were fixed (long chips overflowing cards, toggle label invisible, Resume button not hiding on mobile, display text 2px too wide at 320px)

**Not verified:** Safari/Firefox and real phones (only Chrome emulation), and a screen-reader pass (semantic headings, labels, skip link and focus styles are in place, but untested with NVDA/VoiceOver). Worth a quick check on your own phone before you share the link.

---

## 6. Honesty rules the site follows (from your brief)

- Client work is clearly labelled as done **while employed at FlyingCursor**, with "My contribution" wording, never as sole ownership.
- KHPT says the page was built *from an existing Canva design*, not that you designed it.
- Visual Sadhan says *styling and typography updates*, not a redesign.
- No invented metrics, testimonials, dates or GitHub stats. The GitHub link goes to your profile only.
- Design skills are shown separately as **"in progress"**.
- Full-time employment at FlyingCursor is shown as a **past** role (ended October 2026); the ongoing relationship is shown separately as **freelance**.

Keep to these when you add content. They make the portfolio more credible, not less.

---

## 7. Your portrait

Files: `public/about/portrait.jpg` (natural colour) and `public/about/portrait-duotone.jpg` (site colours), both 800×1075 (the full, uncropped photo).

Source: `image/Thoughtful Professional Portrait.png` (supplied by you). It was processed by `scripts/process-portrait.mjs`, which only **crops and adjusts colour/brightness**. The script never moves or redraws pixels; any retouching in the source image came from the tool you used before.

**To replace it with a better photo:**

1. Face the camera, eyes to the lens, chin level. Ask someone else to take it, or use a timer; avoid mirror selfies.
2. Stand about 1 m in front of a **plain wall** (white, grey or dark), with soft light from a window **in front of** you, not behind.
3. Frame head and shoulders, shot at eye level. A plain shirt works well (your blue shirt is good).
4. Save it in `image/`, then run (adjust the crop numbers to the new photo: x y width height in pixels, then the face centre as fractions):

```bash
node scripts/process-portrait.mjs "../image/new-photo.jpg" public/about 100 200 600 750 0.5 0.4
```

Or just send the photo to Claude and ask for it to be processed.

---

## 8. CV

- **Live file:** `public/docs/Rishabh-Panchal-CV.pdf` (A4, one page), linked from the navbar's **Resume** button.
- **Source:** `cv/cv.html`. Edit the text there, then run `npm run cv` to regenerate the PDF with Chrome.
- **Word version:** `image/Rishabh-Panchal-CV-Updated.docx` (one page in Word, same content). It is generated by `cv/build-docx.cjs`; if you edit the CV text, update both files.
- **What changed from your old CV** (`image/Rishabh-Panchal-CV.docx`):
  - Title and dates now follow your confirmed progression (Intern Nov 2023 → IT Executive Apr 2024 → Full Stack Developer Apr 2025 – Oct 2026), plus the freelance role.
  - Education corrected from the degree certificate: **CGPI 8.14** (old CV said GPA 7.0) and **April 2024** (old CV said 2023); full college name.
  - Email fixed to `rishabhpanchalh@gmail.com`; GitHub link set to `github.com/Rishabh2117` (the old CV linked to `github.com/rishabhpanchal`).
  - Bullets merge your old CV with the portfolio. Dropped: "WordPress REST API" (you removed the related highlight) and **ASG Eye Hospital**, **Platinum Days of Love** and **Mahindra USA** from the client list. Add them back in `cv/cv.html` if you want them.
  - The CV has no portfolio URL yet. Add it to the header once the site has a domain.
