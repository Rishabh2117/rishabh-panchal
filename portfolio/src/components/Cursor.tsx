import { motion, useMotionValue } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useFinePointer } from '../hooks/useFinePointer';
import './Cursor.css';

type CursorState = 'idle' | 'hover' | 'label' | 'input';

/**
 * Custom "coordinates" cursor for mouse users: a crosshair with faint ruler guides and a
 * live x / y readout. Over links the readout names the element and its size; elements can
 * set `data-cursor="Label"` to turn the readout into a filled label chip (e.g. "View").
 */
export function Cursor() {
  const enabled = useFinePointer();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const readX = useMotionValue(-100);
  const readY = useMotionValue(-100);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<CursorState>('idle');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');

    let kind: CursorState = 'idle';
    let target: HTMLElement | null = null;

    // The readout changes on every move, so it is written straight to the DOM
    // instead of going through React state.
    const render = (px: number, py: number) => {
      const readout = readoutRef.current;
      if (!readout) return;
      let text: string;
      if (kind === 'label' && target) {
        text = `${target.dataset.cursor} ↗`;
      } else if (kind === 'hover' && target) {
        const r = target.getBoundingClientRect();
        text = `<${target.tagName.toLowerCase()}> ${Math.round(r.width)}×${Math.round(r.height)}`;
      } else {
        text = `x ${Math.round(px)}  y ${Math.round(py)}`;
      }
      if (readout.textContent !== text) readout.textContent = text;

      // Flip the readout to the other side near the right and bottom edges.
      const w = readout.offsetWidth;
      readX.set(px + 16 + w > window.innerWidth - 8 ? px - 16 - w : px + 16);
      readY.set(py + 40 > window.innerHeight ? py - 30 : py + 16);
    };

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      render(e.clientX, e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = e.target as Element;
      const field = el.closest<HTMLElement>('input, textarea, select');
      const labelled = el.closest<HTMLElement>('[data-cursor]');
      const interactive = el.closest<HTMLElement>('a, button, [role="button"], label');
      if (field) [kind, target] = ['input', field];
      else if (labelled) [kind, target] = ['label', labelled];
      else if (interactive) [kind, target] = ['hover', interactive];
      else [kind, target] = ['idle', null];
      setState(kind);
      render(e.clientX, e.clientY);
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
  }, [enabled, x, y, readX, readY]);

  if (!enabled) return null;

  return (
    <div
      className={`cursor cursor--${state}`}
      style={{ opacity: visible && state !== 'input' ? 1 : 0 }}
      aria-hidden="true"
    >
      <motion.div className="cursor__guide cursor__guide--x" style={{ y }} />
      <motion.div className="cursor__guide cursor__guide--y" style={{ x }} />
      <motion.div className="cursor__cross" style={{ x, y }} />
      <motion.span ref={readoutRef} className="cursor__readout" style={{ x: readX, y: readY }} />
    </div>
  );
}
