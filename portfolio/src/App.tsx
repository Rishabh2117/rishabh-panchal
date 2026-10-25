import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Cursor } from './components/Cursor';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { ProjectDetail } from './pages/ProjectDetail';

const ease = [0.65, 0, 0.35, 1] as const;

/** Page wrapper with a curtain wipe between routes. */
function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
        {children}
      </motion.div>
      <motion.div
        className="curtain"
        aria-hidden="true"
        initial={{ scaleY: 1, transformOrigin: 'top' }}
        animate={{ scaleY: 0, transition: { duration: 0.6, ease, delay: 0.05 } }}
        exit={{ scaleY: 1, transformOrigin: 'bottom', transition: { duration: 0.4, ease } }}
      />
    </>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link" onClick={(e) => {
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}>
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <main id="main" tabIndex={-1}>
        {/* Start each new route at the top once the old page has left */}
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/work/:slug" element={<Page><ProjectDetail /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </MotionConfig>
  );
}
