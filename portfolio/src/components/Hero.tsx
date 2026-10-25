import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { siteConfig } from '../data/siteConfig';
import { useSectionNav } from '../hooks/useSectionNav';
import { CodeCard } from './CodeCard';
import { HeroField } from './HeroField';
import { Magnetic } from './motion/Magnetic';
import { SplitReveal } from './motion/SplitReveal';
import './Hero.css';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const goTo = useSectionNav();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="hero" aria-label="Introduction">
      <motion.div className="hero__bg" style={{ opacity: fade }} aria-hidden="true">
        <HeroField />
        <div className="hero__aurora" />
      </motion.div>

      <div className="container hero__inner">
        <motion.div className="hero__meta mono" {...fadeUp(0.1)}>
          <span className="eyebrow">{siteConfig.role}</span>
          <span className="hero__direction">
            Moving toward <b>{siteConfig.direction}</b>
          </span>
        </motion.div>

        <motion.div style={{ y: headingY, opacity: fade }}>
          <SplitReveal
            as="h1"
            immediate
            delay={0.2}
            className="hero__title display"
            lines={siteConfig.hero.lines}
            accentLines={[1]}
          />
        </motion.div>

        <div className="hero__bottom">
          <motion.div className="hero__intro" {...fadeUp(0.9)}>
            <p>{siteConfig.hero.intro}</p>
            <div className="hero__ctas">
              <Magnetic>
                <button className="btn btn--accent" onClick={() => goTo('work')}>
                  Explore work
                  <span className="btn__icon" aria-hidden="true">↓</span>
                </button>
              </Magnetic>
              <Magnetic>
                <button className="btn btn--ghost" onClick={() => goTo('contact')}>
                  Contact
                </button>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div className="hero__code" {...fadeUp(1)}>
            <CodeCard />
          </motion.div>
        </div>
      </div>

      <motion.div className="hero__scroll mono" style={{ opacity: fade }} aria-hidden="true">
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  );
}
