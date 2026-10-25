import { motion } from 'motion/react';
import { designSkills, developmentSkills, type SkillGroup } from '../data/skills';
import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './Capabilities.css';

function Groups({ groups, variant }: { groups: SkillGroup[]; variant: 'dev' | 'design' }) {
  return (
    <dl className="cap__groups">
      {groups.map((g) => (
        <div key={g.label} className="cap__group">
          <dt className="mono">{g.label}</dt>
          <dd>
            <motion.ul
              className="cap__chips"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ staggerChildren: 0.04 }}
            >
              {g.items.map((item) => (
                <motion.li
                  key={item}
                  className={`cap__chip cap__chip--${variant}`}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="section cap" aria-labelledby="cap-title">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow mono">Capabilities</span>
          </Reveal>
          <div className="section-head__row">
            <SplitReveal id="cap-title" lines={["What I", "work with"]} className="display" accentLines={[1]} />
            <Reveal delay={0.1}>
              <p>
                Established development skills from professional work, kept separate from the design practice I'm
                actively building. No skill bars — just what I use.
              </p>
            </Reveal>
          </div>
        </header>

        <div className="cap__panels">
          <Reveal className="cap__panel">
            <div className="cap__panel-head">
              <h3>Development</h3>
              <span className="cap__status mono">
                <i aria-hidden="true" /> Professional experience
              </span>
            </div>
            <Groups groups={developmentSkills} variant="dev" />
          </Reveal>

          <Reveal className="cap__panel cap__panel--design" delay={0.15}>
            <div className="cap__panel-head">
              <h3>Design</h3>
              <span className="cap__status cap__status--progress mono">
                <i aria-hidden="true" /> In progress
              </span>
            </div>
            <Groups groups={designSkills} variant="design" />
            <p className="cap__note">
              These are areas I'm studying and practising. Case studies demonstrating them will be added as they're
              completed.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
