// Remove anything you can't confidently demonstrate. No proficiency ratings by design.

export interface SkillGroup {
  label: string;
  items: string[];
}

export const developmentSkills: SkillGroup[] = [
  { label: 'CMS platforms', items: ['WordPress', 'Drupal'] },
  {
    label: 'WordPress',
    items: ['Theme development', 'Template files', 'Custom Gutenberg blocks', 'ACF', 'Custom Post Types', 'Custom functionality'],
  },
  { label: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Responsive layouts', 'Cross-browser UI'] },
  { label: 'Backend', items: ['PHP'] },
  { label: 'Drupal', items: ['Twig templates', 'Theme customization', 'Content implementation'] },
  {
    label: 'Components & integrations',
    items: ['Carousels', 'Accordions', 'Popups', 'Tabs', 'Sliders', 'Contact Form 7', 'Polylang', 'Razorpay embeds', 'Booking integrations'],
  },
  {
    label: 'Workflow',
    items: ['Local → staging → UAT → production', 'Plesk', 'Database backups', 'WP troubleshooting', 'Image optimization', 'Git / GitLab'],
  },
];

export const designSkills: SkillGroup[] = [
  {
    label: 'Developing practice',
    items: ['UI Design', 'UX Fundamentals', 'Wireframing', 'Prototyping', 'Interaction Design', 'Design Systems', 'Information Architecture'],
  },
];

export const marqueeItems = ['WordPress', 'Drupal', 'PHP', 'JavaScript', 'Twig', 'ACF', 'Gutenberg', 'jQuery', 'CSS3'];
