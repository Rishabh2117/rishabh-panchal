import { motion, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useFinePointer } from '../hooks/useFinePointer';
import { ProjectVisual } from './ProjectVisual';
import './ProjectCard.css';

const spring = { stiffness: 160, damping: 18 };

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const fine = useFinePointer();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 7);
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      className="pcard"
      style={{ '--pc-accent': project.accent } as React.CSSProperties}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/work/${project.slug}`}
        className="pcard__link"
        data-cursor="View"
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <motion.div className="pcard__visual" style={{ rotateX, rotateY, transformPerspective: 1200 }}>
          <ProjectVisual project={project} />
        </motion.div>

        <div className="pcard__info">
          <span className="pcard__num mono">{String(index + 1).padStart(2, '0')}</span>
          <div className="pcard__text">
            <h3 className="pcard__title">
              {project.title}
              <span className="pcard__arrow" aria-hidden="true">↗</span>
            </h3>
            <p className="pcard__meta">
              {project.sector} · {project.platform}
            </p>
          </div>
        </div>
        <ul className="pcard__tags" aria-label="Contribution areas">
          {project.contribution.length > 0 ? (
            project.contribution.slice(0, 3).map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))
          ) : (
            <li className="placeholder-note">Contribution details to be added</li>
          )}
        </ul>
      </Link>
    </motion.article>
  );
}
