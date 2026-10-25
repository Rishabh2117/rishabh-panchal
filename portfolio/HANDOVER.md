# Portfolio Handover

What was built, how it was built, and what you still need to do.
Last updated: 25 October 2026.

---

## 1. Your to-do list

Work through these before sharing the site publicly. Most are one-line edits in `src/data/`.

### Must do

- [ ] **Add your email.** `src/data/siteConfig.ts` → `links.email`. Until then the Contact section shows "Email address coming soon".
- [ ] **Add your LinkedIn URL.** `siteConfig.ts` → `links.linkedin`.
- [ ] **Add your resume.** Put the PDF in `public/` (for example `public/resume.pdf`) and set `links.resume: 'resume.pdf'`. The nav shows "Resume · soon" until you do.
- [ ] **Pudding — Houses of Bandra:** describe what you worked on. `projects.ts` → `contribution` and `tech` are empty, so the card says "Contribution details to be added".
- [ ] **Visual Sadhan screenshot.** The site is behind a Cloudflare human check, so it couldn't be captured automatically. Take a 1440×900 screenshot yourself and save it as `public/projects/visual-sadhan/desktop.jpg`, plus `mobile.jpg` if you want the phone mockup. Then add `images: img('visual-sadhan')` to its entry in `projects.ts`.
- [ ] **Check permissions.** Confirm FlyingCursor and the clients are fine with their sites appearing in your portfolio.

### Should check

- [ ] **Ecofy URL** points to the UAT (staging) site, `uat.ecofy.co.in`, and the card is labelled "Staging (UAT) environment". Swap it for the live URL if there is one.
- [ ] **Visual Sadhan URL** points to `visual-sadhan.juicyburger.in`, labelled "Preview environment". Swap it if there's a final domain.
- [ ] **Review every contribution list** in `projects.ts`. They come from your notes document. Remove anything you didn't personally do.
- [ ] **Review the skills** in `skills.ts`. Remove anything you can't confidently discuss in an interview (for example Git/GitLab, Razorpay).
- [ ] **Technical highlights** (`experience.ts` → `technicalHighlights`) are shown without linking them to specific clients, as the brief required. If you want to link one to a client, write it up as that project's `caseStudy`.

### When you deploy

- [ ] **Set absolute share-image URLs.** In `index.html`, change `og:image` from `./og-image.jpg` to the full URL, e.g. `https://yourdomain.com/og-image.jpg`. Social networks ignore relative image paths.
- [ ] Optionally add `<link rel="canonical" href="https://yourdomain.com/">` to `index.html`.

### Later

- [ ] **Figma case studies:** add them as projects with `category: 'design'` (see README → "Add a Figma / design project") and replace the "coming soon" card in `src/components/Playground.tsx`.
- [ ] **Case studies:** fill in `caseStudy` (context, decisions, outcome) for your strongest 2–3 projects. Don't invent metrics.
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
| **Hero** | "Code meets creative thinking." headline revealed word by word, intro text, Explore work / Contact buttons, and a code card that types out an `about.js` object. Pointer spotlight and a faint background grid. |
| **Marquee** | Scrolling strip of technologies. |
| **Selected Work** | Labelled *"Selected client work at FlyingCursor · 2024 – 2026"*. Two views: **Gallery** (asymmetric grid of browser-framed screenshots with 3D tilt and glow on hover) and **Index** (typographic list with a floating screenshot preview that follows the cursor). |
| **About** | "Developer by practice. / Designer in progress." The About paragraph brightens word by word as you scroll, followed by a **Then → Now → Next** journey. |
| **Capabilities** | Two panels: **Development** (professional experience) and **Design** (dashed outline, "in progress"). No skill bars or percentages. |
| **Experience** | FlyingCursor, **April 2024 – October 2026**, with a timeline line that fills as you scroll, the responsibilities list, and 9 "Under the hood" technical-highlight cards with a cursor-following border glow. |
| **Design work & playground** | Honest empty states: an animated wireframe for upcoming Figma case studies and a "Playground — empty for now" card. |
| **Contact** | Large "Let's make something meaningful." headline, email button with copy-to-clipboard (once an email is set), GitHub and LinkedIn links. No fake contact form. |
| **Footer** | Large name wordmark, links, dynamic year, back-to-top. |

### Project pages (`#/work/<slug>`)

Back link, heading, a role / platform / sector / links strip, a desktop screenshot in a browser frame with a phone mockup that drifts on scroll, Overview, **My contribution**, Technologies, then Context / Implementation decisions / Outcome, which show "to be added" placeholders until you fill them in. At the bottom, a full-width "Next project" link that wipes in on hover.

### Projects included (7)

| # | Project | Platform | Screenshot |
| --- | --- | --- | --- |
| 1 | Mann Talks | WordPress | ✅ desktop + mobile |
| 2 | Ecofy | Drupal | ✅ (from the UAT site) |
| 3 | Vasan Eye Care | WordPress | ✅ |
| 4 | KHPT | WordPress | ✅ |
| 5 | Mahindra Farm Equipment | WordPress | ✅ |
| 6 | Visual Sadhan | Web | ❌ placeholder (Cloudflare check) |
| 7 | Pudding — Houses of Bandra | Web | ✅ |

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
- Lime curtain wipe between pages
- Circular reveal for the mobile menu
- Scroll progress bar; navbar that hides on scroll-down
- Infinite marquees, which pause on hover

Deliberately left out, per the brief: no intro loading screen, no scroll hijacking, and no heavy continuous canvas or WebGL loops.

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
| **playwright-core** | 1.55 (dev only) | Uses your installed Chrome to capture project screenshots (`npm run screenshots`). Not shipped to the site. |

Production bundle: about **139 KB JS + 7 KB CSS** (gzipped). Screenshots total about 1.8 MB, lazy-loaded.

### Design system

- **Colors:** near-black `#0d0d0c`, off-white `#f2f0e9`, electric lime accent `#d4ff3a`
- **Type:** oversized uppercase display headings, fluid sizes via `clamp()`
- **Layout:** 1440px max width, 12-column art-directed project grid that collapses to one column under 900px

All tokens are in `src/styles/tokens.css`. Change `--accent` there to re-theme the whole site.

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
    │   ├── Navbar, Hero, CodeCard, ProjectGrid, ProjectCard, ProjectVisual
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
- FlyingCursor is shown as a **past** role (ended October 2026).

Keep to these when you add content. They make the portfolio more credible, not less.
