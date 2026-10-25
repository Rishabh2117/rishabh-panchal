import { motion, useSpring } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useFinePointer } from '../../hooks/useFinePointer';

const spring = { stiffness: 220, damping: 16, mass: 0.4 };

/** Pulls its child toward the pointer while hovered. No-op on touch / reduced motion. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enabled = useFinePointer();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMove = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} style={{ x, y, display: 'inline-block' }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
