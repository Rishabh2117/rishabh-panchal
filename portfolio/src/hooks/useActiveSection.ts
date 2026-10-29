import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Id of the home-page section crossing the middle of the viewport, or null (off home / between sections). */
export function useActiveSection(ids: string[]) {
  const { pathname } = useLocation();
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(',');

  useEffect(() => {
    setActive(null);
    if (pathname !== '/') return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    // Route exits are animated, so sections can mount after this runs — attach as they appear.
    const observed = new Set<Element>();
    const attach = () => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      });
      if (observed.size === ids.length) mutations.disconnect();
    };
    const mutations = new MutationObserver(attach);
    mutations.observe(document.body, { childList: true, subtree: true });
    attach();

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, key]);

  return active;
}
