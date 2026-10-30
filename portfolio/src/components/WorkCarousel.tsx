import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from 'motion/react';
import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { ProjectVisual } from './ProjectVisual';
import { Reveal } from './motion/Reveal';

const ease = [0.22, 1, 0.36, 1] as const;
/** Sticky offset below the floating navbar */
const STICKY_TOP = 84;
/** Scroll distance per project, as a fraction of the viewport height */
const STEP = 0.9;
/** Pinned stage height — capped so tall screens don't leave empty space under the cards */
const STAGE_HEIGHT = `min(calc(100vh - ${STICKY_TOP + 24}px), 780px)`;
/** Eases raw scroll into a gliding position for the rail line and preview */
const glide = { stiffness: 70, damping: 20, mass: 0.7 };

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const pad = (n: number) => String(n).padStart(2, '0');

const contentVariants: Variants = {
  enter: (dir: number) => ({ y: dir * 32, opacity: 0, filter: 'blur(4px)' }),
  center: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease, staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: (dir: number) => ({ y: dir * -32, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.4, ease } }),
};
const itemVariants: Variants = {
  enter: { y: 12, opacity: 0 },
  center: { y: 0, opacity: 1, transition: { duration: 0.7, ease } },
};

/** One preview frame, positioned continuously from the gliding scroll position (no snapping). */
function PreviewFrame({ project, index, pos, near }: { project: Project; index: number; pos: MotionValue<number>; near: boolean }) {
  const y = useTransform(pos, (v) => `${(index - v) * 112}%`);
  const scale = useTransform(pos, (v) => 1 - Math.min(Math.abs(index - v), 1) * 0.14);
  const opacity = useTransform(pos, (v) => {
    const d = Math.abs(index - v);
    return d <= 1 ? 1 - d * 0.7 : Math.max(0, 0.3 - (d - 1) * 0.3);
  });
  return (
    <motion.div className="wc__frame" style={{ y, scale, opacity }}>
      <ProjectVisual project={project} still eager={near} />
    </motion.div>
  );
}

/** Title, meta, summary, contribution and links for one project. */
function ProjectInfo({ project }: { project: Project }) {
  return (
    <>
      <motion.p className="wc__meta mono" variants={itemVariants}>
        {project.sector} · {project.platform}
      </motion.p>
      <motion.h3 className="wc__title display" variants={itemVariants}>
        {project.title}
      </motion.h3>
      {project.engagement && (
        <motion.span className="badge-live wc__badge" variants={itemVariants}>
          {project.engagement}
        </motion.span>
      )}
      <motion.p className="wc__summary" variants={itemVariants}>
        {project.summary}
      </motion.p>
      <motion.ul className="wc__tags" variants={itemVariants} aria-label="Contribution areas">
        {project.contribution.length > 0 ? (
          project.contribution.slice(0, 3).map((c) => (
            <li key={c} className="chip">
              {c}
            </li>
          ))
        ) : (
          <li className="placeholder-note">Contribution details to be added</li>
        )}
      </motion.ul>
      <motion.div className="wc__actions" variants={itemVariants}>
        <Link to={`/work/${project.slug}`} className="btn btn--accent" data-cursor="View">
          View project <span className="btn__icon" data-dir="right" aria-hidden="true"><span>→</span></span>
        </Link>
        {project.url && (
          <a className="wc__live" href={project.url} target="_blank" rel="noreferrer">
            Live site <span aria-hidden="true">↗</span>
          </a>
        )}
      </motion.div>
    </>
  );
}

/**
 * Scroll-driven vertical carousel: the stage pins below the navbar while the page scrolls
 * through one project per step — rail on the left, details in the middle, preview on the right.
 */
export function PinnedCarousel({ items, toolbar }: { items: Project[]; toolbar: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [rawActive, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, glide);
  const { scrollY } = useScroll();
  const n = items.length;
  // Clamp for the render right after switching to a shorter group, before scroll re-syncs
  const active = Math.min(rawActive, n - 1);
  const pos = useTransform(smooth, (v) => v * (n - 1));
  const itemsKey = items.map((p) => p.slug).join();

  // Page scroll position where the stage pins, and the distance per project
  const metrics = useCallback(() => {
    const el = trackRef.current;
    if (!el) return null;
    return { start: el.getBoundingClientRect().top + window.scrollY - STICKY_TOP, step: window.innerHeight * STEP };
  }, []);

  const sync = useCallback(() => {
    const m = metrics();
    if (!m) return;
    const travel = Math.max((n - 1) * m.step, 1);
    const p = Math.min(Math.max((window.scrollY - m.start) / travel, 0), 1);
    progress.set(p);
    const next = Math.round(p * (n - 1));
    setActive((prev) => {
      if (next !== prev) setDir(next > prev ? 1 : -1);
      return next;
    });
  }, [metrics, n, progress]);

  useMotionValueEvent(scrollY, 'change', sync);

  // New tab: restart at its first project instead of landing mid-track
  useLayoutEffect(() => {
    const m = metrics();
    if (m && window.scrollY > m.start + 1) window.scrollTo({ top: m.start, behavior: 'instant' });
    setDir(1);
    sync();
    smooth.jump(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey]);

  const go = (i: number) => {
    const m = metrics();
    if (m) window.scrollTo({ top: m.start + i * m.step, behavior: 'smooth' });
  };

  const current = items[active];

  return (
    <div
      ref={trackRef}
      className="wc"
      style={{
        '--wc-top': `${STICKY_TOP}px`,
        '--wc-stage': STAGE_HEIGHT,
        height: `calc(${STAGE_HEIGHT} + ${(n - 1) * STEP * 100}vh)`,
      } as React.CSSProperties}
    >
      <div className="wc__stage">
        {toolbar}

        <div className="wc__body">
          <nav className="wc__rail" aria-label="Projects in this group">
            <span className="wc__count mono" aria-live="polite">
              <b>{pad(active + 1)}</b> / {pad(n)}
            </span>
            <ol className="wc__list">
              <motion.span className="wc__line" style={{ scaleY: smooth }} aria-hidden="true" />
              {items.map((p, i) => (
                <li key={p.slug}>
                  <button
                    className={`wc__rail-item${i === active ? ' is-active' : ''}`}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => go(i)}
                  >
                    <span className="mono">{pad(i + 1)}</span>
                    <span className="wc__rail-title">{p.title}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="wc__arrows">
              <button aria-label="Previous project" disabled={active === 0} onClick={() => go(active - 1)}>
                ↑
              </button>
              <button aria-label="Next project" disabled={active === n - 1} onClick={() => go(active + 1)}>
                ↓
              </button>
            </div>
          </nav>

          <div className="wc__content-wrap">
            <AnimatePresence mode="popLayout" custom={dir} initial={false}>
              <motion.div
                key={current.slug}
                className="wc__content"
                custom={dir}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <ProjectInfo project={current} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="wc__preview" aria-hidden="true">
            {items.map((p, i) => (
              <PreviewFrame key={p.slug} project={p} index={i} pos={pos} near={Math.abs(i - active) <= 1} />
            ))}
            <AnimatePresence>
              {current.images?.mobile && (
                <motion.div
                  key={current.slug}
                  className="wc__phone"
                  initial={{ opacity: 0, y: 40, rotate: 4 }}
                  animate={{ opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease, delay: 0.15 } }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
                >
                  <img src={asset(current.images.mobile)} alt="" loading="lazy" decoding="async" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small screens: the same content as a simple stacked list — pinning is cramped on a phone. */
export function StackedList({ items, toolbar }: { items: Project[]; toolbar: ReactNode }) {
  return (
    <div className="wl">
      {toolbar}
      <ol className="wl__items">
        {items.map((p, i) => (
          <li key={p.slug}>
            <Reveal>
              <article className="wl__item">
                <Link to={`/work/${p.slug}`} className="wl__visual" tabIndex={-1} aria-hidden="true">
                  <ProjectVisual project={p} />
                </Link>
                <span className="wl__num mono">
                  {pad(i + 1)} / {pad(items.length)}
                </span>
                <ProjectInfo project={p} />
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
