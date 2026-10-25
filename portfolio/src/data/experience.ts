export interface Experience {
  company: string;
  title: string;
  start: string;
  end: string; // use 'Present' for a current role
  summary: string;
  responsibilities: string[];
}

export const experience: Experience[] = [
  {
    company: 'FlyingCursor',
    title: 'Full Stack Web Developer',
    start: 'April 2024',
    end: 'October 2026',
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
  { title: 'Website feedback system', detail: 'Like / dislike interactions, REST API endpoints and feedback logging.', tech: 'WP REST API · JavaScript' },
  { title: 'Multilingual functionality', detail: 'Language-specific pages, navigation and content.', tech: 'WordPress · Polylang' },
  { title: 'Drupal PDF-to-page', detail: 'Document content rebuilt as a Twig page, preserving links and tables.', tech: 'Drupal · Twig' },
  { title: 'Responsive carousels', detail: 'Card layouts, navigation arrows and mobile-friendly scrolling.', tech: 'Owl Carousel · Swiper' },
  { title: 'Form integration', detail: 'Contact forms and related form behaviour.', tech: 'Contact Form 7' },
  { title: 'Content architecture', detail: 'Custom Post Types, ACF fields and reusable page templates.', tech: 'WordPress · PHP' },
  { title: 'Website optimization', detail: 'Image optimization, layout improvements and mobile responsiveness.', tech: 'CSS · Frontend' },
];
