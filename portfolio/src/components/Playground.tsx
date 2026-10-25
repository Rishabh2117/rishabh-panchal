import { Reveal } from './motion/Reveal';
import { SplitReveal } from './motion/SplitReveal';
import './Playground.css';

/** Animated wireframe used as an honest "work in progress" illustration. */
function Wireframe() {
  return (
    <div className="wire" aria-hidden="true">
      <div className="wire__nav">
        <i />
        <i />
        <i />
      </div>
      <div className="wire__hero">
        <i className="wire__h" />
        <i className="wire__p" />
        <i className="wire__btn" />
      </div>
      <div className="wire__cards">
        <i />
        <i />
        <i />
      </div>
      <span className="wire__cursor" />
    </div>
  );
}

export function Playground() {
  return (
    <section id="playground" className="section pg" aria-labelledby="pg-title">
      <div className="container">
        <header className="section-head">
          <Reveal>
            <span className="eyebrow mono">Next chapter</span>
          </Reveal>
          <SplitReveal id="pg-title" lines={['Design work', '& playground']} className="display" accentLines={[1]} />
        </header>

        <div className="pg__grid">
          <Reveal className="pg__card pg__card--design">
            <Wireframe />
            <div className="pg__text">
              <span className="mono pg__badge">Coming soon</span>
              <h3>Figma case studies</h3>
              <p>
                UI/UX and product-design projects are in progress. Each will be published with its problem, process
                and final screens — nothing here until it's real.
              </p>
            </div>
          </Reveal>

          <Reveal className="pg__card pg__card--lab" delay={0.12}>
            <div className="pg__empty" aria-hidden="true">
              <span>{'{ }'}</span>
            </div>
            <div className="pg__text">
              <span className="mono pg__badge pg__badge--muted">Empty for now</span>
              <h3>Playground</h3>
              <p>A space for creative-coding and interaction experiments. The first ones will appear here soon.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
