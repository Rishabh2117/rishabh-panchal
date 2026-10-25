// Central site settings. Empty strings render as "coming soon" states instead of broken links.

export const siteConfig = {
  name: 'Rishabh Panchal',
  initials: 'RP',
  role: 'Full Stack Developer',
  direction: 'UI/UX & Product Design',
  title: 'Rishabh Panchal — Full Stack Developer',
  description:
    'Portfolio of Rishabh Panchal, a Full Stack Developer working with WordPress and Drupal, expanding into UI/UX and Product Design.',

  hero: {
    lines: ['Code meets', 'creative thinking.'],
    intro:
      "I'm Rishabh Panchal, a Full Stack Developer exploring the intersection of technology, interaction, and visual design. I build and maintain digital experiences and am expanding my practice into UI/UX and Product Design.",
  },

  links: {
    github: 'https://github.com/Rishabh2117/',
    linkedin: 'https://www.linkedin.com/in/rishabh-panchal-a66029230/',
    instagram: 'https://www.instagram.com/the_rishfit/',
    email: 'rishabhpanchalh@gmail.com',
    phone: '+91 98208 84288', // shown as written; the tel: link strips spaces
    resume: 'docs/Rishabh-Panchal-CV.pdf',
  },
} as const;
