// Central site settings. Empty strings render as "coming soon" states instead of broken links.

export const siteConfig = {
  name: 'Rishabh Panchal',
  initials: 'RP',
  role: 'Full Stack Web Developer',
  direction: 'UI/UX & Product Design',
  title: 'Rishabh Panchal — Full Stack Web Developer',
  description:
    'Portfolio of Rishabh Panchal, a Full Stack Web Developer working with WordPress and Drupal, expanding into UI/UX and Product Design.',

  hero: {
    lines: ['Code meets', 'creative thinking.'],
    intro:
      "I'm Rishabh Panchal, a Full Stack Web Developer exploring the intersection of technology, interaction, and visual design. I build and maintain digital experiences and am expanding my practice into UI/UX and Product Design.",
  },

  links: {
    github: 'https://github.com/Rishabh2117/',
    linkedin: '', // TODO: add LinkedIn profile URL
    email: '', // TODO: add contact email
    resume: '', // TODO: add path to a PDF in /public, e.g. '/resume.pdf'
  },
} as const;
