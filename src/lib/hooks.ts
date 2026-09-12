import { useEffect, useState } from 'react';
import { DESKTOP_QUERY, isDesktopDevice, prefersReducedMotion, REDUCED_MOTION_QUERY } from './device';

/** Subscribe to a media query and re-render when it flips. */
function useMediaQuery(query: string, initial: () => boolean) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/**
 * Whether the hover-driven UI should run. Re-evaluated when the query flips, so
 * a resize or a tablet rotation across the boundary re-initialises the page
 * rather than leaving desktop behaviour on a touch layout.
 */
export const useIsDesktop = () => useMediaQuery(DESKTOP_QUERY, isDesktopDevice);

/** Whether the visitor has asked for reduced motion. */
export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION_QUERY, prefersReducedMotion);

/**
 * Resolves once the webfonts have settled, so SplitText measures real line
 * boxes instead of the fallback face. Races a timeout in case font loading
 * never settles — the page must never be held back by it.
 */
export function useFontsReady(timeoutMs = 2000) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };
    const t = setTimeout(finish, timeoutMs);
    if (document.fonts) document.fonts.ready.then(finish).catch(finish);
    else finish();
    return () => clearTimeout(t);
  }, [timeoutMs]);
  return ready;
}

/**
 * True while `ref` is on screen (plus `margin`). The WebGL canvases use this
 * to stop rendering when scrolled away.
 */
export function useInView<T extends Element>(ref: React.RefObject<T | null>, margin = '20%') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return inView;
}
