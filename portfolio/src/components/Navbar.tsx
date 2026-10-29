import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { useActiveSection } from '../hooks/useActiveSection';
import { useSectionNav } from '../hooks/useSectionNav';
import { Magnetic } from './motion/Magnetic';
import './Navbar.css';

// Tone tints the sliding pill: code blue, design amber, blend purple
const navItems = [
  { id: 'work', label: 'Work', tone: 'var(--accent)' },
  { id: 'about', label: 'About', tone: 'var(--accent-2)' },
  { id: 'capabilities', label: 'Capabilities', tone: 'var(--accent-3)' },
  { id: 'contact', label: 'Contact', tone: 'var(--accent)' },
];
const sectionIds = navItems.map((item) => item.id);

const ease = [0.22, 1, 0.36, 1] as const;
const pillSpring = { type: 'spring', stiffness: 420, damping: 36, mass: 0.8 } as const;

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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const active = useActiveSection(sectionIds);
  const [hovered, setHovered] = useState<string | null>(null);
  const target = hovered ?? active;
  const linksRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pill, setPill] = useState({ x: 0, width: 0, tone: navItems[0].tone, shown: false, snap: true });

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  // Slide the pill to the hovered link, falling back to the section in view.
  // It snaps into place when appearing, so it never sweeps in from the left edge.
  useLayoutEffect(() => {
    const measure = () => {
      const el = target ? linkRefs.current[target] : null;
      const item = navItems.find((i) => i.id === target);
      setPill((prev) =>
        el && item
          ? { x: el.offsetLeft, width: el.offsetWidth, tone: item.tone, shown: true, snap: !prev.shown }
          : { ...prev, shown: false },
      );
    };
    measure();
    const resize = new ResizeObserver(measure);
    if (linksRef.current) resize.observe(linksRef.current);
    return () => resize.disconnect();
  }, [target]);

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
        className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <div className="nav__bar">
          <Link to="/" className="nav__brand" aria-label={`${siteConfig.name} — home`} onClick={() => setOpen(false)}>
            <span className="nav__mark">{siteConfig.initials}</span>
            <span className="nav__name">{siteConfig.name}</span>
          </Link>

          <nav ref={linksRef} aria-label="Primary" className="nav__links" onPointerLeave={() => setHovered(null)}>
            <motion.span
              className="nav__pill"
              aria-hidden="true"
              style={{ '--tone': pill.tone } as CSSProperties}
              initial={false}
              animate={{ x: pill.x, width: pill.width, opacity: pill.shown ? 1 : 0, scale: pill.shown ? 1 : 0.9 }}
              transition={{
                x: pill.snap ? { duration: 0 } : pillSpring,
                width: pill.snap ? { duration: 0 } : pillSpring,
                opacity: { duration: 0.25 },
                scale: { duration: 0.4, ease },
              }}
            />
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                className={`nav__link${item.id === target ? ' is-lit' : ''}`}
                aria-current={item.id === active ? 'true' : undefined}
                onPointerEnter={() => setHovered(item.id)}
                onFocus={() => setHovered(item.id)}
                onBlur={() => setHovered(null)}
                onClick={() => select(item.id)}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {item.label}
              </motion.button>
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

          <motion.div className="nav__progress" style={{ scaleX: progress }} aria-hidden="true" />
        </div>
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
                  className={`menu__link display${item.id === active ? ' is-active' : ''}`}
                  style={{ '--tone': item.tone } as CSSProperties}
                  onClick={() => select(item.id)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease }}
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
