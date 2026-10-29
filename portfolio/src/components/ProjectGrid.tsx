import { motion } from 'motion/react';
import { useState, type CSSProperties } from 'react';
import { disciplines, groups, projects, type Discipline, type ProjectGroup } from '../data/projects';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { PinnedCarousel, StackedList } from './WorkCarousel';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './ProjectGrid.css';

// Development reads as code blue, design as design amber
const tones: Record<Discipline, string> = { development: 'var(--accent)', design: 'var(--accent-2)' };

const notes: Partial<Record<ProjectGroup, string>> = {
  flyingcursor:
    'Client sites I worked on as a developer at FlyingCursor. Each entry describes my contribution, not ownership of the whole project.',
};

const count = (discipline: Discipline, group?: ProjectGroup) =>
  projects.filter((p) => p.discipline === discipline && (!group || p.group === group)).length;

export function ProjectGrid() {
  const pinned = useMediaQuery('(min-width: 861px) and (min-height: 620px)');

  // Tabs only appear once they have projects — adding a design project reveals "Design"
  const shownDisciplines = disciplines.filter((d) => count(d.id) > 0);
  const [discipline, setDiscipline] = useState<Discipline>(shownDisciplines[0]?.id ?? 'development');
  const shownGroups = groups.filter((g) => count(discipline, g.id) > 0);
  const [picked, setPicked] = useState<ProjectGroup>(shownGroups[0]?.id ?? 'flyingcursor');
  const group = shownGroups.some((g) => g.id === picked) ? picked : shownGroups[0]?.id;

  const items = projects.filter((p) => p.discipline === discipline && p.group === group);
  const note = group && notes[group];

  const toolbar = (
    <div className="wtabs">
      <div className="wtabs__row">
        <div className="wtabs__main" role="group" aria-label="Discipline">
          {shownDisciplines.map((d) => (
            <button
              key={d.id}
              className="wtabs__main-btn"
              aria-pressed={d.id === discipline}
              style={{ '--tone': tones[d.id] } as CSSProperties}
              onClick={() => setDiscipline(d.id)}
            >
              {d.id === discipline && (
                <motion.span layoutId="wtabs-main" className="wtabs__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
              )}
              <span>{d.label}</span>
            </button>
          ))}
        </div>
        <div className="wtabs__groups" role="group" aria-label="Who it was for">
          {shownGroups.map((g) => (
            <button key={g.id} className="wtabs__group" aria-pressed={g.id === group} onClick={() => setPicked(g.id)}>
              {g.label}
              <sup className="mono">{count(discipline, g.id)}</sup>
              {g.id === group && (
                <motion.span layoutId="wtabs-group" className="wtabs__underline" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
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
      style={{ '--tone': tones[discipline] } as CSSProperties}
    >
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow mono">Selected work · 2023 – present</span>
          </Reveal>
          <div className="section-head__row">
            <SplitReveal id="work-title" lines={['Selected', 'work']} className="display" accentLines={[1]} />
            <Reveal delay={0.1}>
              <p>Grouped by discipline and who it was for. Scroll through each project, or jump to one from the list.</p>
            </Reveal>
          </div>
        </header>

        {items.length > 0 &&
          (pinned ? <PinnedCarousel items={items} toolbar={toolbar} /> : <StackedList items={items} toolbar={toolbar} />)}
      </div>
    </section>
  );
}
