import { useEffect } from 'react';

/**
 * Tracks where the pointer enters and leaves each `.btn`, so the hover fill (see Hero.css)
 * grows from the entry point and shrinks back toward the exit point.
 */
export function useButtonFill() {
  useEffect(() => {
    const place = (e: PointerEvent) => {
      if (!(e.target instanceof HTMLElement) || !e.target.classList.contains('btn')) return;
      const r = e.target.getBoundingClientRect();
      e.target.style.setProperty('--fill-x', `${e.clientX - r.left}px`);
      e.target.style.setProperty('--fill-y', `${e.clientY - r.top}px`);
    };
    // pointerenter/leave don't bubble, but they do pass through the document's capture phase.
    document.addEventListener('pointerenter', place, true);
    document.addEventListener('pointerleave', place, true);
    return () => {
      document.removeEventListener('pointerenter', place, true);
      document.removeEventListener('pointerleave', place, true);
    };
  }, []);
}
