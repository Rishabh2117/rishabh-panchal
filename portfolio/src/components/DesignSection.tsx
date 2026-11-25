import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Project, ProjectGroup } from '../data/projects';
import { projects } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ProjectVisual } from './ProjectVisual';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './DesignSection.css';

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');
const STICKY_TOP = 84;
const STAGE_HEIGHT = `min(calc(100vh - ${STICKY_TOP + 24}px), 780px)`;
const STEP = 0.9;
const glide = { stiffness: 70, damping: 20, mass: 0.7 };
const DWELL = 0.5;
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

function DesignVisual({ project }: { project: Project }) {
  if (!project.images?.desktop) {
    return (
      <div className="dv dv--placeholder" style={{ '--pv-accent': project.accent } as React.CSSProperties}>
        <span className="mono">{project.title}</span>
      </div>
    );
  }
  return (
    <div className="dv" style={{ '--pv-accent': project.accent } as React.CSSProperties}>
      <img
        src={asset(project.images.desktop)}
        alt={project.title}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

function DesignProjectInfo({ project }: { project: Project }) {
  return (
    <>
      <p className="wd__meta mono">{project.sector} · {project.platform}</p>
      <h3 className="wd__title display">{project.title}</h3>
      {project.engagement && (
        <span className="badge-live wd__badge">{project.engagement}</span>
      )}
      <p className="wd__summary">{project.summary}</p>
      <ul className="wd__tags" aria-label="Contribution areas">
        {project.contribution.length > 0
          ? project.contribution.slice(0, 3).map((c) => (
              <li key={c} className="chip">{c}</li>
            ))
          : <li className="placeholder-note">Contribution details to be added</li>
        }
      </ul>
      <div className="wd__actions">
        <Link to={`/work/${project.slug}`} className="btn btn--accent" data-cursor="View">
          View project <span className="btn__icon" data-dir="right" aria-hidden="true"><span>→</span></span>
        </Link>
        {project.url && (
          <a className="wd__live" href={project.url} target="_blank" rel="noreferrer">
            Live site <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </>
  );
}

/** Desktop: scroll drives panels horizontally across the stage. */
function HorizontalCarousel({ items }: { items: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWRef = useRef(0);
  const [stageW, setStageW] = useState(0);
  const n = items.length;
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, glide);
  const [active, setActive] = useState(0);
  const x = useMotionValue(0);
  const itemsKey = items.map((p) => p.slug).join();

  // Measure stage width synchronously before first paint, then keep in sync on resize
  useLayoutEffect(() => {
    if (stageRef.current) {
      stageWRef.current = stageRef.current.offsetWidth;
      setStageW(stageRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const obs = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      stageWRef.current = w;
      setStageW(w);
      x.set(-smooth.get() * (n - 1) * w);
    });
    if (stageRef.current) obs.observe(stageRef.current);
    return () => obs.disconnect();
  }, [n, smooth, x]);

  // Translate scroll progress → panel x position
  useMotionValueEvent(smooth, 'change', (v) => {
    x.set(-v * (n - 1) * stageWRef.current);
  });

  const scrubberWidth = useMotionValue('0%');
  useMotionValueEvent(smooth, 'change', (v) => {
    scrubberWidth.set(`${v * 100}%`);
  });

  const metrics = useCallback(() => {
    const el = trackRef.current;
    if (!el) return null;
    return {
      start: el.getBoundingClientRect().top + window.scrollY - STICKY_TOP,
      step: window.innerHeight * STEP,
    };
  }, []);

  const sync = useCallback(() => {
    const m = metrics();
    if (!m) return;
    const offset = DWELL * m.step;
    const travel = Math.max((n - 1) * m.step, 1);
    const p = Math.min(Math.max((window.scrollY - m.start - offset) / travel, 0), 1);
    progress.set(p);
    setActive(Math.round(p * (n - 1)));
  }, [metrics, n, progress]);

  useMotionValueEvent(scrollY, 'change', sync);

  useLayoutEffect(() => {
    const m = metrics();
    if (m && window.scrollY > m.start + 1) window.scrollTo({ top: m.start, behavior: 'instant' });
    setActive(0);
    progress.set(0);
    smooth.jump(0);
    x.set(0);
    scrubberWidth.set('0%');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey]);

  const go = (i: number) => {
    const m = metrics();
    if (m) window.scrollTo({ top: m.start + (DWELL + i) * m.step, behavior: 'smooth' });
  };

  return (
    <div
      ref={trackRef}
      className="wh"
      style={{
        '--wh-top': `${STICKY_TOP}px`,
        '--wh-stage': STAGE_HEIGHT,
        height: `calc(${STAGE_HEIGHT} + ${(n - 1 + 2 * DWELL) * STEP * 100}vh)`,
      } as React.CSSProperties}
    >
      <div className="wh__stage" ref={stageRef}>
        <div className="wh__viewport">
          <motion.div
            className="wh__track"
            style={{ x, width: stageW > 0 ? n * stageW : undefined }}
          >
            {items.map((project, i) => (
              <div
                key={project.slug}
                className="wh__panel"
                style={{ width: stageW > 0 ? stageW : undefined }}
              >
                <Link
                  to={`/work/${project.slug}`}
                  className={`wh__panel-image${project.group === 'ui-design' ? ' wh__panel-image--frame' : ''}`}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {project.group === 'ui-design'
                    ? <ProjectVisual project={project} still />
                    : <DesignVisual project={project} />
                  }
                </Link>
                <motion.div
                  className="wh__panel-info"
                  animate={{
                    opacity: i === active ? 1 : 0.2,
                    x: i === active ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, ease }}
                >
                  <DesignProjectInfo project={project} />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="wh__footer">
          <span className="wh__count mono">
            <b>{pad(active + 1)}</b> / {pad(n)}
          </span>
          <div
            className="wh__scrubber"
            role="progressbar"
            aria-valuenow={active + 1}
            aria-valuemax={n}
          >
            <motion.div className="wh__scrubber-fill" style={{ width: scrubberWidth }} />
          </div>
          <div className="wh__footer-nav">
            <button
              className="wh__arrow"
              aria-label="Previous project"
              disabled={active === 0}
              onClick={() => go(active - 1)}
            >←</button>
            <button
              className="wh__arrow"
              aria-label="Next project"
              disabled={active === n - 1}
              onClick={() => go(active + 1)}
            >→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Tablet: alternating image-left / image-right editorial layout. */
function StackedEditorial({ items }: { items: Project[] }) {
  return (
    <div className="we">
      {items.map((project, i) => (
        <Reveal key={project.slug}>
          <article className={`we__item${i % 2 === 1 ? ' we__item--flip' : ''}`}>
            <Link to={`/work/${project.slug}`} className="we__visual" tabIndex={-1} aria-hidden="true">
              {project.group === 'ui-design'
                ? <ProjectVisual project={project} />
                : <DesignVisual project={project} />
              }
            </Link>
            <div className="we__info">
              <DesignProjectInfo project={project} />
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}


const designTabs: { id: ProjectGroup; label: string }[] = [
  { id: 'product-design', label: 'Product Design' },
  { id: 'ui-design', label: 'UI / UX Design' },
];

export function DesignSection() {
  const pinned = useMediaQuery('(min-width: 861px) and (min-height: 620px)');
  const mobile = useMediaQuery('(max-width: 640px)');
  const [picked, setPicked] = useState<ProjectGroup>('product-design');

  const allDesign = projects.filter((p) => p.discipline === 'design');
  const items = allDesign.filter((p) => p.group === picked);
  if (allDesign.length === 0) return null;

  return (
    <section
      id="design"
      className="section design-work"
      aria-labelledby="design-title"
      style={{ '--tone': 'var(--accent-2)' } as React.CSSProperties}
    >
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow mono">Design work · {allDesign.length} project{allDesign.length !== 1 ? 's' : ''}</span>
          </Reveal>
          <div className="section-head__row">
            <SplitReveal id="design-title" lines={['Design', 'work']} className="display" accentLines={[1]} />
            <Reveal delay={0.1}>
              <p>Product design, visual concepts and UI craft.</p>
            </Reveal>
          </div>
        </header>

        <Reveal>
          <div className="wd__tabs" role="group" aria-label="Design category">
            {designTabs.map((t) => (
              <button
                key={t.id}
                className="wd__tab"
                aria-pressed={picked === t.id}
                onClick={() => setPicked(t.id)}
              >
                {t.label}
                {picked === t.id && (
                  <motion.span
                    layoutId="wd-tab"
                    className="wd__tab-line"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {items.length > 0 && (
          (pinned || mobile)
            ? <HorizontalCarousel items={items} />
            : <StackedEditorial items={items} />
        )}
      </div>
    </section>
  );
}
