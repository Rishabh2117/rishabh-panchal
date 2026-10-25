// All project content lives here. To add a project, append an object to `projects`.
// Screenshots go in /public/projects/<slug>/ (desktop.jpg 1440×900, mobile.jpg 390×844 @2x).
// Leave optional fields undefined rather than inventing details — the UI shows tidy placeholders.

export type ProjectCategory = 'client' | 'personal' | 'design';

export interface CaseStudy {
  context?: string;
  decisions?: string[];
  outcome?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** e.g. "Client work at FlyingCursor" */
  employer?: string;
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
  caseStudy?: CaseStudy;
}

const img = (slug: string) => ({
  desktop: `projects/${slug}/desktop.jpg`,
  mobile: `projects/${slug}/mobile.jpg`,
});

export const projects: Project[] = [
  {
    slug: 'mann-talks',
    title: 'Mann Talks',
    category: 'client',
    employer: 'FlyingCursor',
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
    category: 'client',
    employer: 'FlyingCursor',
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
    category: 'client',
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
    category: 'client',
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
    category: 'client',
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
    category: 'client',
    employer: 'FlyingCursor',
    sector: 'Web tool',
    platform: 'Web',
    summary:
      'An image utility tool. I made styling and typography updates, using an existing website as the design reference.',
    contribution: ['Styling updates', 'Typography refinement against an existing visual reference'],
    tech: ['HTML', 'CSS'],
    url: 'https://visual-sadhan.juicyburger.in/',
    urlNote: 'Preview environment',
    // Screenshot pending: the site is behind a human-verification check.
    accent: '#b03fd0',
  },
  {
    slug: 'pudding',
    title: 'Pudding — Houses of Bandra',
    category: 'client',
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
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
