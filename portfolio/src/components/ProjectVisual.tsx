import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import type { Project } from '../data/projects';
import './ProjectVisual.css';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/** Browser-framed screenshot with inner parallax, or a typographic placeholder when no image exists. */
export function ProjectVisual({ project, eager = false }: { project: Project; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const host = project.url ? new URL(project.url).host.replace(/^www\./, '') : project.title;

  return (
    <div ref={ref} className="pv" style={{ '--pv-accent': project.accent } as React.CSSProperties}>
      <div className="pv__bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>{host}</em>
      </div>
      <div className="pv__screen">
        {project.images?.desktop ? (
          <motion.img
            src={asset(project.images.desktop)}
            alt={`Screenshot of the ${project.title} website homepage`}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            width={1440}
            height={900}
            style={{ y, scale: 1.14 }}
          />
        ) : (
          <div className="pv__placeholder">
            <span className="pv__placeholder-title">{project.title}</span>
            <span className="mono">Screenshot to be added</span>
          </div>
        )}
      </div>
    </div>
  );
}
