# Rishabh Panchal — Portfolio

Personal portfolio built with React, TypeScript, Vite and Motion.
For the full write-up (what was built, decisions, and the to-do list) see **[HANDOVER.md](HANDOVER.md)**.

## Run it

Requires Node.js 18+ (built with Node 24).

```bash
npm install
npm run dev        # local dev server → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # serve the built dist/ → http://localhost:4173
npm run lint
```

## Edit content

All content lives in `src/data/`. You should not need to touch components to update text.

| File | What it controls |
| --- | --- |
| `siteConfig.ts` | Name, hero text, email / LinkedIn / resume links |
| `projects.ts` | Project cards and case-study pages |
| `experience.ts` | FlyingCursor role, responsibilities, technical highlights |
| `skills.ts` | Capabilities lists and the scrolling marquee |

### Add a project

1. Add screenshots to `public/projects/<slug>/`: `desktop.jpg` (1440×900) and optionally `mobile.jpg` (390×844 @2x).
   Or add the URL to `scripts/capture-screenshots.mjs` and run `npm run screenshots -- <slug>`.
2. Append an entry to `projects` in `src/data/projects.ts`. Its page appears automatically at `#/work/<slug>`.
3. Leave unknown fields out. The page shows tidy "to be added" placeholders instead.

### Add a case study

Fill in the `caseStudy` field of a project:

```ts
caseStudy: {
  context: 'What the problem was…',
  decisions: ['Why I chose X', 'How I handled Y'],
  outcome: 'What changed (no invented metrics).',
},
```

### Add a Figma / design project

Use `category: 'design'` and drop exported frames into `public/projects/<slug>/`.
The "Design work & playground" section (`src/components/Playground.tsx`) currently shows a "coming soon" state. Replace that card once real projects exist.

## Deploy

`npm run build` produces a static `dist/` folder. It uses relative paths and hash routing (`#/work/...`), so it works from any folder with no server config:

- **XAMPP:** copy `dist/` contents to `htdocs/<folder>/`
- **Netlify / Vercel:** build command `npm run build`, publish directory `dist`
- **GitHub Pages:** push `dist/` to a `gh-pages` branch
