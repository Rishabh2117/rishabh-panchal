import { Portrait } from './Portrait';
import { Reveal } from './motion/Reveal';
import { ScrollText } from './motion/ScrollText';
import { SplitReveal } from './motion/SplitReveal';
import './About.css';

const aboutCopy =
  "My background in web development has taught me how digital experiences are structured, built, and delivered. I've worked with WordPress and Drupal across client websites, implementing responsive pages, custom functionality, reusable components, content systems, and integrations. I'm now expanding my perspective toward UI/UX and Product Design, with a focus on how thoughtful interfaces and clear interactions can make digital products more useful.";

const journey = [
  { step: 'Then', title: 'Building for the web', text: 'Client websites in WordPress and Drupal at FlyingCursor, November 2023 – October 2026: intern → IT Executive → Full Stack Developer.' },
  { step: 'Now', title: 'Freelancing & learning to design', text: 'Freelancing with FlyingCursor on Mann Talks and Ecofy, while strengthening UI/UX fundamentals: wireframing, prototyping and interaction.' },
  { step: 'Next', title: 'Design case studies', text: 'Figma projects and product-design work will be published here as they are completed.' },
];

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <Reveal>
          <span className="eyebrow mono">About</span>
        </Reveal>
        <div className="about__head">
          <SplitReveal
            id="about-title"
            className="about__title display"
            lines={['Developer by practice.', 'Designer in progress.']}
            accentLines={[1]}
          />
        </div>
        <div className="about__intro">
          <Reveal className="about__portrait">
            <Portrait />
          </Reveal>
          <ScrollText text={aboutCopy} className="about__copy" />
        </div>

        <ol className="journey">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.step} delay={i * 0.12} className="journey__item">
              <span className="journey__step mono">
                <i aria-hidden="true" />
                {j.step}
              </span>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
