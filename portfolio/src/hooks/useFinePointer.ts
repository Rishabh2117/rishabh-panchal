import { useEffect, useState } from 'react';

const QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/** True on devices with a precise pointer (mouse/trackpad) and no reduced-motion preference. */
export function useFinePointer() {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return matches;
}
