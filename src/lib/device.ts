/**
 * "Desktop" here means a fine pointer that can hover, which is what decides
 * between the hover-driven UI (cursor, floating scene, tooltips) and the
 * tap-driven fallbacks. Set once on <html> as `is-desktop` / `is-mobile`.
 */
export const DESKTOP_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 1025px)';

export function isDesktopDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia(DESKTOP_QUERY).matches;
}

export function addDeviceClassToBody(): boolean {
  const desktop = isDesktopDevice();
  const root = document.documentElement;
  root.classList.toggle('is-desktop', desktop);
  root.classList.toggle('is-mobile', !desktop);
  return desktop;
}

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * When this is true the page drops every decorative animation: the three WebGL
 * scenes and the footer canvas never start, smooth scrolling is handed back to
 * the browser, CSS loops are neutralised and GSAP entrances resolve instantly.
 */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;
