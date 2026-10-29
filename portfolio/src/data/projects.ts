// All project content lives here. To add a project, append an object to `projects`.
// Screenshots go in /public/projects/<slug>/ (desktop.jpg 1440×900, mobile.jpg 390×844 @2x).
// Leave optional fields undefined rather than inventing details — the UI shows tidy placeholders.
// Design work uses the same shape: one preview image in images.desktop, tools in `tech`, the tool in `platform`.

/** What kind of work — the Work section's main tabs */
export type Discipline = 'development' | 'design';
/** Who it was for — the sub-tabs inside each discipline */
export type ProjectGroup = 'flyingcursor' | 'freelance' | 'personal';

export const disciplines: { id: Discipline; label: string }[] = [
  { id: 'development', label: 'Development' },
  { id: 'design', label: 'Design' },
];

export const groups: { id: ProjectGroup; label: string; eyebrow: string }[] = [
  { id: 'flyingcursor', label: 'FlyingCursor', eyebrow: 'Client work at FlyingCursor' },
  { id: 'freelance', label: 'Freelance', eyebrow: 'Freelance project' },
  { id: 'personal', label: 'Personal', eyebrow: 'Personal project' },
];

export interface Project {
  slug: string;
  title: string;
  discipline: Discipline;
  group: ProjectGroup;
  /** e.g. "Client work at FlyingCursor" */
  employer?: string;
  /** Extra working relationship, shown as a badge (e.g. "Now freelance") */
  engagement?: string;
  sector: string;
  platform: string;
  summary: string;
  /** What I personally did. Empty array → "Contribution details to be added". */
  contribution: string[];
  tech: string[];
  url?: string;
  extraUrls?: { label: string; url: string }[];
  /** Shown beside the link, e.g. when it points to a staging environment */
  urlNote?: string;
  images?: { desktop?: string; mobile?: string };
  /** Brand-ish tint used for hover glows and placeholders */
  accent: string;
}

const img = (slug: string) => ({
  desktop: `projects/${slug}/desktop.jpg`,
  mobile: `projects/${slug}/mobile.jpg`,
});

export const projects: Project[] = [
  {
    slug: 'mann-talks',
    title: 'Mann Talks',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    engagement: 'Now freelance',
    sector: 'Mental health',
    platform: 'WordPress',
    summary:
      'A bilingual mental-health platform. I worked on WordPress development across interactive features, multilingual content and booking.',
    contribution: [
      'Maintenance popup',
      'Mindfulness pages',
      'Feedback functionality',
      'Multilingual content (English / Hindi)',
      'Therapy booking integration',
    ],
    tech: ['WordPress', 'PHP', 'JavaScript', 'Multilingual'],
    url: 'https://www.manntalks.org/',
    images: img('mann-talks'),
    accent: '#3fae4f',
  },
  {
    slug: 'ecofy',
    title: 'Ecofy',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    engagement: 'Now freelance',
    sector: 'Green finance',
    platform: 'Drupal',
    summary:
      'Website for a green-finance NBFC. I worked on Drupal development, from responsive pages and banners to a blog importer.',
    contribution: [
      'Responsive pages',
      'Homepage banners',
      'Blog importer',
      'Media pages',
      'Frontend updates',
    ],
    tech: ['Drupal', 'Twig', 'PHP', 'CSS'],
    url: 'https://uat.ecofy.co.in/',
    urlNote: 'Staging (UAT) environment',
    images: img('ecofy'),
    accent: '#2de0b4',
  },
  {
    slug: 'vasan-eye-care',
    title: 'Vasan Eye Care',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    sector: 'Healthcare',
    platform: 'WordPress',
    summary:
      'Eye-care hospital network website. I built structured healthcare content pages and form integration in WordPress.',
    contribution: ['Eye-test pages', 'Speciality pages', 'Doctor information', 'Contact forms'],
    tech: ['WordPress', 'PHP', 'Contact Form 7'],
    url: 'https://www.vasaneye.com/',
    images: img('vasan-eye-care'),
    accent: '#f7861e',
  },
  {
    slug: 'khpt',
    title: 'KHPT',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    sector: 'Public health',
    platform: 'WordPress',
    summary:
      'Public-health organisation website. I implemented a page from an existing Canva design and handled related database and hosting tasks.',
    contribution: [
      'Page implementation from an existing Canva design',
      'WordPress website work',
      'Database and hosting tasks',
    ],
    tech: ['WordPress', 'PHP', 'HTML', 'CSS'],
    url: 'https://www.khpt.org/',
    images: img('khpt'),
    accent: '#1f9d8b',
  },
  {
    slug: 'mahindra-farm-equipment',
    title: 'Mahindra Farm Equipment',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    sector: 'Agriculture / Corporate',
    platform: 'WordPress',
    summary:
      'Content-heavy corporate website. I worked on CMS-managed sections for news, events and recognition.',
    contribution: ['Blogs', 'Events', 'Company news', 'CSR pages', 'Awards & recognition pages'],
    tech: ['WordPress', 'PHP'],
    url: 'https://www.mahindrafarmequipment.com/',
    images: img('mahindra-farm-equipment'),
    accent: '#e31837',
  },
  {
    slug: 'visual-sadhan',
    title: 'Visual Sadhan',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    sector: 'Web tool',
    platform: 'Web',
    summary:
      'An image utility tool. I made styling and typography updates, using an existing website as the design reference.',
    contribution: ['Styling updates', 'Typography refinement against an existing visual reference'],
    tech: ['HTML', 'CSS'],
    url: 'https://visual-sadhan.juicyburger.in/',
    // Behind a Cloudflare check — recapture with: node scripts/capture-manual.mjs visual-sadhan <url>
    images: { desktop: 'projects/visual-sadhan/desktop.jpg' },
    accent: '#b03fd0',
  },
  {
    slug: 'pudding',
    title: 'Pudding — Houses of Bandra',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    sector: 'Independent publishing',
    platform: 'Web',
    summary: 'Website for Pudding, an independent anthology about Bandra.',
    contribution: [],
    tech: [],
    url: 'https://housesofbandra.com/',
    extraUrls: [{ label: 'FlyingCursor preview', url: 'https://works.flyingcursor.com/pudding/' }],
    images: img('pudding'),
    accent: '#ffd23f',
  },
  {
    slug: 'asci',
    title: 'ASCI',
    discipline: 'development',
    group: 'flyingcursor',
    employer: 'FlyingCursor',
    sector: 'Advertising standards',
    platform: 'WordPress',
    summary: 'Website for the Advertising Standards Council of India, the self-regulatory body for advertising in India.',
    contribution: [],
    tech: ['WordPress'],
    url: 'https://www.ascionline.in/',
    images: img('asci'),
    accent: '#3b82f6',
  },
  {
    slug: 'time-centre',
    title: 'Time Centre',
    discipline: 'development',
    group: 'personal',
    sector: 'Retail / Watches',
    platform: 'HTML / CSS / JS',
    summary:
      'A multi-page website for a watch store, built from scratch in plain HTML, CSS and JavaScript with a responsive layout.',
    contribution: [
      'Home, About, Collections and Contact pages',
      'Product detail page',
      'Featured collection cards',
      'Responsive layout with mobile menu',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://rishabh2117.github.io/Time-Centre/index.html',
    images: img('time-centre'),
    accent: '#d32f2f',
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
