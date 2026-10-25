import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { experience, technicalHighlights } from '../data/experience';
import { useFinePointer } from '../hooks/useFinePointer';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './Experience.css';

/** Card with a border spotlight that tracks the pointer. */
function SpotlightCard({ children }: { children: React.ReactNode }) {
  const fine = useFinePointer();
  const onMove = (e: React.PointerEvent<HTMLLIElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <li className="spot" onPointerMove={onMove}>
      {children}
    </li>
  );
}

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 0.8', 'end 0.6'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="section exp" aria-labelledby="exp-title">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow mono">Experience</span>
          </Reveal>
          <SplitReveal id="exp-title" lines={['Where I', 'built it']} className="display" accentLines={[1]} />
        </header>

        <div className="exp__timeline" ref={lineRef}>
          <div className="exp__rail" aria-hidden="true">
            <motion.div className="exp__rail-fill" style={{ scaleY }} />
          </div>

          {experience.map((job) => (
            <article key={job.company} className="exp__job">
              <Reveal className="exp__side">
                <span className="exp__dot" aria-hidden="true" />
                <p className="mono exp__dates">
                  {job.start} — {job.end}
                </p>
                <h3 className="exp__company">{job.company}</h3>
                <p className="exp__title">{job.title}</p>
              </Reveal>

              <div className="exp__body">
                <Reveal>
                  <p className="exp__summary">{job.summary}</p>
                </Reveal>
                <ul className="exp__list">
                  {job.responsibilities.map((r, i) => (
                    <Reveal as="li" key={r} delay={i * 0.05} y={20}>
                      <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                      {r}
                    </Reveal>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="hl">
          <Reveal>
            <h3 className="hl__title">
              Under the hood <span className="mono">· Technical highlights</span>
            </h3>
            <p className="hl__intro">
              Implementation work from my time at FlyingCursor — candidates for future in-depth technical case studies.
            </p>
          </Reveal>
          <ul className="hl__grid">
            {technicalHighlights.map((h, i) => (
              <SpotlightCard key={h.title}>
                <Reveal y={24} delay={(i % 3) * 0.08} className="spot__inner">
                  <span className="mono spot__num">{String(i + 1).padStart(2, '0')}</span>
                  <h4>{h.title}</h4>
                  <p>{h.detail}</p>
                  <span className="mono spot__tech">{h.tech}</span>
                </Reveal>
              </SpotlightCard>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
