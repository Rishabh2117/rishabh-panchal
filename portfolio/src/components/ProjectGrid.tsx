import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useFinePointer } from '../hooks/useFinePointer';
import { ProjectCard } from './ProjectCard';
import { SplitReveal } from './motion/SplitReveal';
import { Reveal } from './motion/Reveal';
import './ProjectGrid.css';

type View = 'grid' | 'index';

/** Index view: a typographic list with a floating preview that follows the pointer. */
function ProjectIndex() {
  const fine = useFinePointer();
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28 });
  const current = active !== null ? projects[active] : null;

  return (
    <div
      className="pindex"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ol>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              to={`/work/${p.slug}`}
              className="pindex__row"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
            >
              <span className="mono pindex__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="pindex__title">{p.title}</span>
              <span className="pindex__sector">{p.sector}</span>
              <span className="pindex__platform mono">{p.platform}</span>
            </Link>
          </li>
        ))}
      </ol>

      {fine && (
        <motion.div className="pindex__preview" style={{ x, y }} aria-hidden="true">
          <AnimatePresence mode="popLayout">
            {current && (
              <motion.div
                key={current.slug}
                className="pindex__frame"
                style={{ background: current.accent }}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.images?.desktop ? (
                  <img src={`${import.meta.env.BASE_URL}${current.images.desktop}`} alt="" />
                ) : (
                  <span className="display">{current.title}</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export function ProjectGrid() {
  const [view, setView] = useState<View>('grid');

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow mono">Selected client work at FlyingCursor · 2024 – 2026</span>
          </Reveal>
          <div className="section-head__row">
            <SplitReveal id="work-title" lines={["Selected", "work"]} className="display" accentLines={[1]} />
            <div className="work__aside">
              <Reveal delay={0.1}>
                <p>
                  Client websites I worked on as a developer at FlyingCursor. Each card describes my contribution —
                  not ownership of the whole project.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="toggle" role="group" aria-label="Project layout">
                  {(['grid', 'index'] as const).map((v) => (
                    <button key={v} aria-pressed={view === v} onClick={() => setView(v)} className="toggle__btn mono">
                      {view === v && <motion.span layoutId="toggle-pill" className="toggle__pill" />}
                      <span>{v === 'grid' ? 'Gallery' : 'Index'}</span>
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'grid' ? (
              <div className="work__grid">
                {projects.map((p, i) => (
                  <div key={p.slug} className={`work__cell work__cell--${i % 4}`}>
                    <ProjectCard project={p} index={i} />
                  </div>
                ))}
              </div>
            ) : (
              <ProjectIndex />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
