import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import { certifications, education, experience, languages } from '../data/experience';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './Experience.css';


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
            <article key={`${job.company}-${job.title}`} className="exp__job">
              <Reveal className="exp__side">
                <span className={`exp__dot${job.end === 'Present' ? ' exp__dot--live' : ''}`} aria-hidden="true" />
                <p className="mono exp__dates">
                  {job.start} — {job.end}
                  {job.end === 'Present' && <span className="badge-live">Ongoing</span>}
                </p>
                <h3 className="exp__company">{job.company}</h3>
                <p className="exp__title">{job.title}</p>
                {job.progression && (
                  <ol className="exp__steps" aria-label="Role progression">
                    {job.progression.map((step) => (
                      <li key={`${step.title}-${step.start}`}>
                        <span className="exp__step-title">{step.title}</span>
                        <span className="mono exp__step-dates">
                          {step.start} – {step.end}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
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

<div className="edu" id="education">
          <Reveal>
            <h3 className="hl__title">
              Education <span className="mono">· Degree & certifications</span>
            </h3>
          </Reveal>
          <div className="edu__grid">
            <Reveal className="edu__degree">
              <span className="mono edu__label">{education.completed}</span>
              <h4>{education.degree}</h4>
              <p>
                {education.school}
                <br />
                {education.university}
              </p>
              <div className="edu__foot">
                <span className="chip">{education.result}</span>
                <a
                  className="edu__cert"
                  href={`${import.meta.env.BASE_URL}${education.certificate}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View degree certificate <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (PDF, opens in a new tab)</span>
                </a>
              </div>
            </Reveal>
            <Reveal className="edu__side" delay={0.1}>
              <div>
                <span className="mono edu__label">Certifications</span>
                <ul>
                  {certifications.map((c) => (
                    <li key={c.name}>
                      {c.name} <span className="edu__muted">— {c.issuer}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="mono edu__label">Languages</span>
                <p>{languages.join(' · ')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
