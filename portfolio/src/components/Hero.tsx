import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { siteConfig } from '../data/siteConfig';
import { useFinePointer } from '../hooks/useFinePointer';
import { useSectionNav } from '../hooks/useSectionNav';
import { CodeCard } from './CodeCard';
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
  const fine = useFinePointer();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const headingY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Soft spotlight following the pointer
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(212,255,58,0.07), transparent 60%)`;
  const onMove = (e: React.PointerEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section ref={ref} className="hero" aria-label="Introduction" onPointerMove={onMove}>
      <motion.div className="hero__spotlight" style={{ background: spotlight }} aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />

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
