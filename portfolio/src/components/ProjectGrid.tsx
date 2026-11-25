import { motion } from 'motion/react';
import { useState, type CSSProperties } from 'react';
import { groups, projects, type ProjectGroup } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileScrollCarousel, PinnedCarousel, StackedList } from './WorkCarousel';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './ProjectGrid.css';

const notes: Partial<Record<ProjectGroup, string>> = {
  flyingcursor:
    'Client sites I worked on as a developer at FlyingCursor. Each entry describes my contribution, not ownership of the whole project.',
};

const devCount = (group: ProjectGroup) =>
  projects.filter((p) => p.discipline === 'development' && p.group === group).length;

export function ProjectGrid() {
  const pinned = useMediaQuery('(min-width: 861px) and (min-height: 620px)');
  const mobile = useMediaQuery('(max-width: 640px)');

  const shownGroups = groups.filter((g) => devCount(g.id) > 0);
  const [picked, setPicked] = useState<ProjectGroup>(shownGroups[0]?.id ?? 'flyingcursor');
  const group = shownGroups.some((g) => g.id === picked) ? picked : shownGroups[0]?.id;

  const items = projects.filter((p) => p.discipline === 'development' && p.group === group);
  const note = group && notes[group];

  const toolbar = (
    <div className="wtabs">
      <div className="wtabs__row">
        <div className="wtabs__groups" role="group" aria-label="Who it was for">
          {shownGroups.map((g) => (
            <button
              key={g.id}
              className="wtabs__group"
              aria-pressed={g.id === group}
              onClick={() => setPicked(g.id)}
            >
              {g.label}
              <sup className="mono">{devCount(g.id)}</sup>
              {g.id === group && (
                <motion.span
                  layoutId="wtabs-group"
                  className="wtabs__underline"
                  transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {note && <p className="wtabs__note">{note}</p>}
    </div>
  );

  return (
    <section
      id="work"
      className="section work"
      aria-labelledby="work-title"
      style={{ '--tone': 'var(--accent)' } as CSSProperties}
    >
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow mono">Code & builds · 2023 – present</span>
          </Reveal>
          <div className="section-head__row">
            <SplitReveal id="work-title" lines={['Development', 'work']} className="display" accentLines={[1]} />
            <Reveal delay={0.1}>
              <p>Development work, grouped by who it was for. Scroll through each project or jump from the list.</p>
            </Reveal>
          </div>
        </header>

        {items.length > 0 &&
          (pinned
            ? <PinnedCarousel items={items} toolbar={toolbar} />
            : mobile
            ? <MobileScrollCarousel items={items} toolbar={toolbar} />
            : <StackedList items={items} toolbar={toolbar} />
          )}
      </div>
    </section>
  );
}
