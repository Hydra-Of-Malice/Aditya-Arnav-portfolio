import { useCallback, useEffect, useRef, useState } from 'react';

export type Theme = 'dark' | 'light';

/** Reads/writes the `data-theme` attribute that drives every colour token. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) || 'dark',
  );

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private-mode browsers can refuse storage; the attribute still applies.
    }
    setThemeState(next);
  }, [theme]);

  return { theme, toggle };
}

/**
 * Marks an element with `data-revealed` the first time it scrolls into view,
 * which is what triggers the `.reveal` enter animation.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // `.reveal` starts at opacity 0, so without an observer the section would
    // never appear. Show it outright instead.
    if (!('IntersectionObserver' in window)) {
      el.dataset.revealed = '';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.revealed = '';
        observer.disconnect();
      },
      // Fire slightly before the element reaches the fold.
      { rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Live clock for a given IANA timezone, updated every half minute. */
export function useLocalTime(timeZone: string) {
  const format = useCallback(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
      }).format(new Date()),
    [timeZone],
  );

  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [format]);

  return time;
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}

/**
 * The id of the section currently under the top third of the viewport, which
 * is what the dock highlights.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  // Array identity changes every render at the call site; the contents don't.
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|');

    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line) current = id;
      }

      // The last section is usually too short to ever cross the line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      if (atBottom) current = sectionIds[sectionIds.length - 1];

      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key]);

  return active;
}

/** Steps through `items` on an interval — used by the hero's rotating role. */
export function useRotating<T>(items: readonly T[], intervalMs = 2600) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  return { item: items[index], index };
}
