import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Magnetic } from '../components/motion/Magnetic';
import { Reveal } from '../components/motion/Reveal';
import { SplitReveal } from '../components/motion/SplitReveal';
import { ProjectVisual } from '../components/ProjectVisual';
import { getProject, groups, projects } from '../data/projects';
import { siteConfig } from '../data/siteConfig';
import { NotFound } from './NotFound';
import './ProjectDetail.css';

const Pending = ({ children = 'To be added' }: { children?: string }) => (
  <p className="placeholder-note">{children}</p>
);

export function ProjectDetail() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%']);

  useEffect(() => {
    if (project) document.title = `${project.title} — ${siteConfig.name}`;
  }, [project]);

  if (!project) return <NotFound />;

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pd" style={{ '--pd-accent': project.accent } as React.CSSProperties}>
      <div className="container">
        <header className="pd__head">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Link to="/" state={{ section: 'work' }} className="pd__back mono">
              <span aria-hidden="true">←</span> All work
            </Link>
          </motion.div>

          <motion.p
            className="eyebrow mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {groups.find((g) => g.id === project.group)?.eyebrow} · {project.sector}
          </motion.p>
          {project.engagement && (
            <motion.span
              className="badge-live mono"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
            >
              <i aria-hidden="true" /> {project.engagement}
            </motion.span>
          )}

          <SplitReveal as="h1" immediate delay={0.25} className="pd__title display" lines={[project.title]} />

          <motion.dl
            className="pd__meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <dt className="mono">My role</dt>
              <dd>
                {project.discipline === 'design' ? 'Designer' : 'Developer'}
                {project.employer ? ` at ${project.employer}` : ''}
              </dd>
            </div>
            <div>
              <dt className="mono">Platform</dt>
              <dd>{project.platform}</dd>
            </div>
            <div>
              <dt className="mono">Sector</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt className="mono">Links</dt>
              <dd className="pd__links">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Visit website ↗
                  </a>
                ) : (
                  <span className="is-disabled">Link to be added</span>
                )}
                {project.extraUrls?.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                ))}
                {project.urlNote && <small>{project.urlNote}</small>}
              </dd>
            </div>
          </motion.dl>
        </header>

        <motion.div
          ref={heroRef}
          className="pd__visuals"
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProjectVisual project={project} eager />
          {project.images?.mobile && (
            <motion.div className="pd__phone" style={{ y: phoneY }}>
              <img
                src={`${import.meta.env.BASE_URL}${project.images.mobile}`}
                alt={`${project.title} on a mobile screen`}
                width={390}
                height={844}
                loading="lazy"
              />
            </motion.div>
          )}
        </motion.div>

        <div className="pd__body">
          <Reveal className="pd__block">
            <h2 className="mono">Overview</h2>
            <p className="pd__lead">{project.summary}</p>
          </Reveal>

          <Reveal className="pd__block">
            <h2 className="mono">My contribution</h2>
            {project.contribution.length ? (
              <ul className="pd__list">
                {project.contribution.map((c, i) => (
                  <li key={c}>
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending>Contribution details to be added</Pending>
            )}
          </Reveal>

          <Reveal className="pd__block">
            <h2 className="mono">Technologies</h2>
            {project.tech.length ? (
              <ul className="pd__chips">
                {project.tech.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending />
            )}
          </Reveal>
        </div>
      </div>

      <Link to={`/work/${next.slug}`} className="pd__next" data-cursor="Next">
        <div className="container">
          <span className="mono">Next project</span>
          <Magnetic strength={0.08}>
            <span className="pd__next-title display">{next.title}</span>
          </Magnetic>
        </div>
      </Link>
    </article>
  );
}
