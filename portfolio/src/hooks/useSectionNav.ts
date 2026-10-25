import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/** Scrolls to a home-page section, navigating home first when on another route. */
export function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (id: string) => {
      if (pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        navigate('/', { state: { section: id } });
      }
    },
    [navigate, pathname],
  );
}
