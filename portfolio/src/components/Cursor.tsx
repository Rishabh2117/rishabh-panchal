import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useFinePointer } from '../hooks/useFinePointer';
import './Cursor.css';

/**
 * Custom cursor for mouse users. Elements can set `data-cursor="Label"` to turn the
 * cursor into a labelled disc (e.g. "View" over project previews).
 */
export function Cursor() {
  const enabled = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [label, setLabel] = useState<string | null>(null);
  const [interactive, setInteractive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as Element;
      const labelled = target.closest<HTMLElement>('[data-cursor]');
      setLabel(labelled?.dataset.cursor ?? null);
      setInteractive(!!target.closest('a, button, [role="button"], input, label'));
    };
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    document.addEventListener('pointerleave', leave);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const state = label ? 'label' : interactive ? 'hover' : 'idle';

  return (
    <div className={`cursor cursor--${state}`} style={{ opacity: visible ? 1 : 0 }} aria-hidden="true">
      <motion.div className="cursor__dot" style={{ x, y }} />
      <motion.div className="cursor__ring" style={{ x: ringX, y: ringY }}>
        <span className="cursor__label">{label}</span>
      </motion.div>
    </div>
  );
}
