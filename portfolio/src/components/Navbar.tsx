import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { useSectionNav } from '../hooks/useSectionNav';
import { Magnetic } from './motion/Magnetic';
import './Navbar.css';

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
];

function ResumeLink({ className }: { className: string }) {
  const { resume } = siteConfig.links;
  if (resume) {
    return (
      <a className={className} href={resume} target="_blank" rel="noreferrer">
        Resume <span aria-hidden="true">↗</span>
      </a>
    );
  }
  return (
    <span className={`${className} is-disabled`} title="Resume coming soon" aria-disabled="true">
      Resume <span className="nav__soon">soon</span>
    </span>
  );
}

export function Navbar() {
  const goTo = useSectionNav();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const select = (id: string) => {
    setOpen(false);
    goTo(id);
  };

  return (
    <>
      <motion.header
        className={`nav${scrolled ? ' nav--scrolled' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav__inner container">
          <Link to="/" className="nav__brand" aria-label={`${siteConfig.name} — home`} onClick={() => setOpen(false)}>
            <span className="nav__mark">{siteConfig.initials}</span>
            <span className="nav__name">{siteConfig.name}</span>
          </Link>

          <nav aria-label="Primary" className="nav__links">
            {navItems.map((item) => (
              <button key={item.id} className="nav__link" onClick={() => select(item.id)}>
                <span className="nav__link-text" data-text={item.label}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="nav__end">
            <div className="nav__resume-wrap">
              <Magnetic strength={0.25}>
                <ResumeLink className="nav__resume" />
              </Magnetic>
            </div>
            <button
              className={`nav__toggle${open ? ' is-open' : ''}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
        <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile" className="menu__links container">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className="menu__link display"
                  onClick={() => select(item.id)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mono">0{i + 1}</span>
                  {item.label}
                </motion.button>
              ))}
              <motion.div
                className="menu__foot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <ResumeLink className="menu__resume" />
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
