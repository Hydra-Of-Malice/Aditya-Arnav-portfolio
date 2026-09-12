import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { isDesktopDevice } from '../lib/device';

/**
 * A green dot that tracks the pointer tightly and a white ring that lags
 * behind it in difference blend mode. Anything with `.cursor__trigger` grows
 * the ring; `.js-nav-cursor-hover` stretches it into a pill around the
 * element instead. Hover targets are discovered by delegation so sections
 * that mount later still work.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktopDevice()) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const ringInner = ring.querySelector<HTMLElement>('.cursor__inner')!;

    const cursors = [dot, ring];
    const movers = cursors.map((el, i) => {
      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 1, delay: 0.5 });
      const d = i === 0 ? 0.4 : 0.75;
      return {
        x: gsap.quickTo(el, 'x', { duration: d, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: d, ease: 'power3' }),
      };
    });

    const onMove = (e: MouseEvent) => movers.forEach((m) => (m.x(e.clientX), m.y(e.clientY)));

    const enter = (el: Element) => {
      if (el.classList.contains('js-nav-cursor-hover')) {
        gsap.to(dot, { opacity: 0, duration: 0.4 });
        gsap.to(ringInner, {
          width: el.clientWidth + 16,
          height: el.clientHeight + 4,
          borderRadius: '33px',
          duration: 0.5,
        });
      } else {
        gsap.to(dot, { opacity: 0, duration: 0.2 });
        gsap.to(ring, { scale: 1.5, duration: 0.4 });
      }
    };
    const leave = (el: Element) => {
      if (el.classList.contains('js-nav-cursor-hover')) {
        gsap.to(dot, { opacity: 1, duration: 0.4 });
        gsap.to(ringInner, { width: 36, height: 36, borderRadius: '50%', duration: 0.5 });
      } else {
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        gsap.to(ring, { scale: 1, duration: 0.4 });
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest?.('.cursor__trigger');
      const from = (e.relatedTarget as Element | null)?.closest?.('.cursor__trigger');
      if (t && t !== from) enter(t);
    };
    const onOut = (e: MouseEvent) => {
      const t = (e.target as Element).closest?.('.cursor__trigger');
      const to = (e.relatedTarget as Element | null)?.closest?.('.cursor__trigger');
      if (t && t !== to) leave(t);
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <>
      <div className="cursor cursor--1" ref={dotRef} aria-hidden>
        <div className="cursor__inner" />
      </div>
      <div className="cursor cursor--2" ref={ringRef} aria-hidden>
        <div className="cursor__inner" />
      </div>
    </>
  );
}
