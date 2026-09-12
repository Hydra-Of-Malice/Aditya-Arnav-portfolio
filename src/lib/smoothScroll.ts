import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { isDesktopDevice, prefersReducedMotion } from './device';

let instance: Lenis | null = null;

/**
 * Lenis drives the scroll on desktop and hands its position to ScrollTrigger
 * every frame. Touch devices keep native scrolling, as the reference does, and
 * so does anyone who asked for reduced motion — eased scrolling is itself
 * motion the browser did not ask for. Returns a teardown.
 */
export function startSmoothScroll(): () => void {
  if (!isDesktopDevice() || prefersReducedMotion() || instance) return () => {};

  const lenis = new Lenis({ lerp: 0.05 });
  instance = lenis;
  lenis.on('scroll', ScrollTrigger.update);

  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    instance = null;
  };
}

/** Freeze the page behind a modal (Lenis on desktop, body lock on mobile). */
export function lockScroll() {
  if (instance) {
    instance.stop();
    return;
  }
  const y = window.scrollY;
  document.body.dataset.scrollY = String(y);
  document.body.classList.add('no-scroll');
  document.body.style.top = `-${y}px`;
}

export function unlockScroll() {
  if (instance) {
    instance.start();
    return;
  }
  const y = Number(document.body.dataset.scrollY || 0);
  document.body.classList.remove('no-scroll');
  document.body.style.top = '';
  window.scrollTo(0, y);
}

/** Scroll to a hash target, through Lenis when it's running. */
export function scrollToHash(hash: string) {
  const el = document.querySelector<HTMLElement>(hash);
  if (!el) return;
  // Measured, not parsed: the token is `4rem` on mobile and parseInt() read
  // that as 4px, dropping every jump target under the header.
  const header = document.querySelector<HTMLElement>('.header');
  const offset = header ? -header.getBoundingClientRect().height : 0;
  if (instance) instance.scrollTo(el, { offset, duration: 1.4 });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
}
