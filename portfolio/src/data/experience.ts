export interface Experience {
  company: string;
  title: string;
  start: string;
  end: string; // use 'Present' for a current role
  summary: string;
  responsibilities: string[];
  /** Role history within the company, most recent first */
  progression?: { title: string; start: string; end: string }[];
}

export const experience: Experience[] = [
  {
    company: 'FlyingCursor',
    title: 'Freelance Full Stack Developer',
    start: 'October 2026',
    end: 'Present',
    summary:
      'Continuing to work with FlyingCursor on a freelance basis, supporting two client websites I worked on as an employee.',
    responsibilities: [
      'Mann Talks — ongoing WordPress development and maintenance.',
      'Ecofy — ongoing Drupal development and maintenance.',
    ],
  },
  {
    company: 'FlyingCursor',
    title: 'Full Stack Developer',
    start: 'November 2023',
    end: 'October 2026',
    progression: [
      { title: 'Full Stack Developer', start: 'Apr 2025', end: 'Oct 2026' },
      { title: 'IT Executive', start: 'Apr 2024', end: 'Mar 2025' },
      { title: 'Jr. Full Stack Developer (Intern)', start: 'Nov 2023', end: 'Mar 2024' },
    ],
    summary:
      'Worked on the development, customization, and maintenance of client websites using WordPress and Drupal.',
    responsibilities: [
      'Developed and customized pages using PHP, HTML, CSS, JavaScript, and jQuery.',
      'Customized WordPress themes, templates, and reusable Gutenberg blocks.',
      'Integrated Advanced Custom Fields (ACF) for backend-managed content.',
      'Implemented responsive layouts and interactive frontend components.',
      'Worked on Drupal themes and Twig-based page implementation.',
      'Worked on multilingual pages, navigation, and content.',
      'Integrated contact forms, booking functionality, and interactive features.',
      'Troubleshot existing functionality and coordinated changes across development, staging, UAT, and production.',
    ],
  },
];

// Candidate technical case studies — not yet attributed to specific client projects.
export const technicalHighlights = [
  { title: 'Custom Gutenberg blocks', detail: 'Reusable blocks with ACF fields and conditional visibility.', tech: 'PHP · WordPress · ACF' },
  { title: 'Maintenance popup system', detail: 'Backend settings, image preview, display conditions and time-based behaviour.', tech: 'PHP · JavaScript' },
  { title: 'Multilingual functionality', detail: 'Language-specific pages, navigation and content.', tech: 'WordPress · Polylang' },
  { title: 'Responsive carousels', detail: 'Card layouts, navigation arrows and mobile-friendly scrolling.', tech: 'Owl Carousel · Swiper' },
  { title: 'Form integration', detail: 'Contact forms and related form behaviour.', tech: 'Contact Form 7' },
  { title: 'Content architecture', detail: 'Custom Post Types, ACF fields and reusable page templates.', tech: 'WordPress · PHP' },
  { title: 'Website optimization', detail: 'Image optimization, layout improvements and mobile responsiveness.', tech: 'CSS · Frontend' },
];

export const education = {
  degree: 'Bachelor of Science (Information Technology)',
  school: 'Nirmala Memorial Foundation College of Commerce & Science',
  university: 'University of Mumbai',
  completed: 'April 2024',
  result: 'CGPI 8.14 / 10',
  certificate: 'docs/rishabh-panchal-bsc-it-degree.pdf',
};

export const certifications = [{ name: 'The Complete 2024 Web Development Bootcamp', issuer: 'Udemy' }];

export const languages = ['English', 'Hindi', 'Gujarati', 'Sanskrit'];
