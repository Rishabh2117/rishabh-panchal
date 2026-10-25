import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { About } from '../components/About';
import { Capabilities } from '../components/Capabilities';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { Hero } from '../components/Hero';
import { Marquee } from '../components/motion/Marquee';
import { Playground } from '../components/Playground';
import { ProjectGrid } from '../components/ProjectGrid';
import { marqueeItems } from '../data/skills';
import { siteConfig } from '../data/siteConfig';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    document.title = siteConfig.title;
    const section = (location.state as { section?: string } | null)?.section;
    if (section) {
      // Wait for the page transition before scrolling to the requested section
      const t = setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 450);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <Marquee items={marqueeItems} />
      <ProjectGrid />
      <About />
      <Capabilities />
      <Experience />
      <Playground />
      <Marquee items={['Open to conversations', 'Development', 'UI/UX', 'Product design']} reverse />
      <Contact />
    </>
  );
}
