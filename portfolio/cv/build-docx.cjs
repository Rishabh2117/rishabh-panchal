// Builds the Word CV (same content as cv/cv.html).
// One-time setup: npm i -D docx@9.5.1   Then: node cv/build-docx.cjs ../image/Rishabh-Panchal-CV-Updated.docx
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType, TabStopType,
  LevelFormat, BorderStyle,
} = require('docx');

const OUT = process.argv[2];
const BLUE = '3D6FD9';
const AMBER = 'B9781F';
const INK = '14161F';
const MUTED = '4F5466';
const FONT = 'Calibri';
// A4 with 0.7" side margins → content width in DXA
const PAGE_W = 11906;
const MARGIN = 1008;
const RIGHT_TAB = PAGE_W - MARGIN * 2;

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size ?? 20, color: o.color ?? INK, bold: o.bold, italics: o.italics });
const link = (text, url) =>
  new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: FONT, size: 19, color: BLUE, underline: {} })] });
const sep = () => run('  |  ', { size: 19, color: 'A0A4B4' });

const heading = (text) =>
  new Paragraph({
    spacing: { before: 200, after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'D9DCE6', space: 3 } },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 20, bold: true, color: BLUE, characterSpacing: 40 })],
  });

// Left text + right-aligned dates on one line
const lineWithDates = (left, dates, o = {}) =>
  new Paragraph({
    spacing: { before: o.before ?? 140, after: o.after ?? 40 },
    tabStops: [{ type: TabStopType.RIGHT, position: RIGHT_TAB }],
    keepNext: true,
    children: [...left, new TextRun({ text: `\t${dates}`, font: FONT, size: 18, color: MUTED })],
  });

const bullet = (children) =>
  new Paragraph({ numbering: { reference: 'bullets', level: 0 }, spacing: { after: 40 }, children });

const para = (children, o = {}) => new Paragraph({ spacing: { after: o.after ?? 60 }, children });

const skill = (label, items) => para([run(`${label}: `, { bold: true, size: 19 }), run(items, { size: 19, color: MUTED })], { after: 50 });

const doc = new Document({
  creator: 'Rishabh Panchal',
  title: 'Rishabh Panchal — CV',
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: '•',
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 340, hanging: 220 } }, run: { color: BLUE } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 720, bottom: 640, left: MARGIN, right: MARGIN } },
      },
      children: [
        new Paragraph({ spacing: { after: 40 }, children: [run('RISHABH PANCHAL', { size: 48, bold: true })] }),
        para(
          [run('Full Stack Developer', { size: 23, bold: true, color: BLUE }), run('  ·  moving toward UI/UX & Product Design', { size: 22, color: AMBER })],
          { after: 80 },
        ),
        new Paragraph({
          spacing: { after: 40 },
          children: [
            run('Mumbai, India', { size: 19, color: MUTED }), sep(),
            run('+91 98208 84288', { size: 19, color: MUTED }), sep(),
            link('rishabhpanchalh@gmail.com', 'mailto:rishabhpanchalh@gmail.com'),
          ],
        }),
        new Paragraph({
          spacing: { after: 60 },
          children: [
            link('linkedin.com/in/rishabh-panchal-a66029230', 'https://www.linkedin.com/in/rishabh-panchal-a66029230/'), sep(),
            link('github.com/Rishabh2117', 'https://github.com/Rishabh2117/'),
          ],
        }),

        heading('Profile'),
        para([
          run(
            'Full Stack Developer with three years at FlyingCursor (Nov 2023 – Oct 2026), growing from intern to Full Stack Developer while building, customising and maintaining client websites in WordPress and Drupal: custom themes, Gutenberg blocks and ACF content systems, interactive JavaScript components, multilingual pages, and form and booking integrations. Now freelancing on Mann Talks and Ecofy while expanding into UI/UX and Product Design.',
            { color: MUTED },
          ),
        ]),

        heading('Experience'),
        lineWithDates([run('Freelance Full Stack Developer', { bold: true, size: 22 }), run('  ·  FlyingCursor', { color: MUTED })], 'Oct 2026 – Present', { before: 60 }),
        bullet([run('Mann Talks', { bold: true }), run(': ongoing WordPress development and maintenance.')]),
        bullet([run('Ecofy', { bold: true }), run(': ongoing Drupal development and maintenance.')]),

        lineWithDates([run('FlyingCursor', { bold: true, size: 22 }), run('  ·  Mumbai', { color: MUTED })], 'Nov 2023 – Oct 2026', { before: 200 }),
        lineWithDates([run('Full Stack Developer', { bold: true, size: 19, color: BLUE })], 'Apr 2025 – Oct 2026', { before: 20, after: 0 }),
        lineWithDates([run('IT Executive', { size: 19, color: MUTED })], 'Apr 2024 – Mar 2025', { before: 0, after: 0 }),
        lineWithDates([run('Jr. Full Stack Developer (Intern)', { size: 19, color: MUTED })], 'Nov 2023 – Mar 2024', { before: 0, after: 80 }),
        bullet([run('Developed, customised and maintained client websites in '), run('WordPress', { bold: true }), run(' and '), run('Drupal', { bold: true }), run(' using PHP, HTML, CSS, JavaScript and jQuery.')]),
        bullet([run('Customised WordPress themes and templates; built reusable '), run('Gutenberg blocks', { bold: true }), run(' with '), run('ACF', { bold: true }), run(' fields, conditional visibility and Custom Post Types for backend-managed content.')]),
        bullet([run('Implemented Drupal themes and '), run('Twig', { bold: true }), run('-based pages, including homepage banners, media pages and a blog importer.')]),
        bullet([run('Built interactive components: card-stack sliders, responsive carousels, scroll-based header visibility, fade-in animations, popups and floating-button logic.')]),
        bullet([run('Extended '), run('Elementor', { bold: true }), run(' layouts with custom CSS and JavaScript where native options were limited.')]),
        bullet([run('Delivered multilingual (English / Hindi) pages, a maintenance-popup system, Contact Form 7 forms and therapy-booking integration.')]),
        bullet([run('Debugged front-end issues (image rendering, opacity and shadow overrides, animation timing) and ensured consistent responsive, cross-device behaviour.')]),
        bullet([run('Ran content and UI QA with SEO-friendly structure, and coordinated releases across development, staging, UAT and production with designers, editors and internal teams.')]),
        para(
          [run('Clients: ', { bold: true, size: 19 }), run('Mann Talks, Ecofy, ASCI, Vasan Eye Care, KHPT, Mahindra Farm Equipment, Pudding (Houses of Bandra), Visual Sadhan, Men of Platinum, IRTE, Morde.', { size: 19, color: MUTED })],
          { after: 40 },
        ),

        heading('Skills'),
        skill('CMS', 'WordPress (themes, Gutenberg, ACF, Custom Post Types, Elementor), Drupal (Twig)'),
        skill('Frontend', 'HTML5, CSS3, JavaScript, jQuery, responsive layouts, cross-browser UI'),
        skill('Backend', 'PHP, custom functionality, template files'),
        skill('Integrations', 'Contact Form 7, Polylang, Razorpay embeds, booking integrations'),
        skill('Workflow', 'Git / GitLab, Plesk, staging → UAT → production, SEO fundamentals, QA'),
        para([run('Design (developing): ', { bold: true, size: 19, color: AMBER }), run('UI design, UX fundamentals, wireframing, prototyping, interaction design', { size: 19, color: MUTED })]),

        heading('Education & Certification'),
        lineWithDates([run('B.Sc. Information Technology', { bold: true })], 'April 2024', { before: 40 }),
        para([run('University of Mumbai — Nirmala Memorial Foundation College of Commerce & Science', { color: MUTED, size: 19 })], { after: 20 }),
        para([run('CGPI 8.14 / 10', { bold: true, size: 19, color: BLUE })], { after: 80 }),

        para([run('The Complete 2024 Web Development Bootcamp', { size: 19 }), run(' — Udemy', { size: 19, color: MUTED })]),

        heading('Languages & Interests'),
        para([run('Languages: ', { bold: true, size: 19 }), run('English, Hindi, Gujarati, Sanskrit', { size: 19, color: MUTED })], { after: 40 }),
        para([run('Interests: ', { bold: true, size: 19 }), run('Swimming, music, martial arts, cooking, continuous learning', { size: 19, color: MUTED })]),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log('saved', OUT);
});
