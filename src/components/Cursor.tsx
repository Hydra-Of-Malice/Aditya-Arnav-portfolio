import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { useIsDesktop } from '../lib/hooks';

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
  const desktop = useIsDesktop();

  useEffect(() => {
    if (!desktop) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const ringInner = ring.querySelector<HTMLElement>('.cursor__inner')!;
    const cursors = [dot, ring];

    // Hidden until the pointer has actually moved: before that its position
    // is unknown and it used to sit in the top-left corner over the loader.
    gsap.set(cursors, { xPercent: -50, yPercent: -50, opacity: 0 });
    const movers = cursors.map((el, i) => {
      const d = i === 0 ? 0.4 : 0.75;
      return {
        x: gsap.quickTo(el, 'x', { duration: d, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: d, ease: 'power3' }),
      };
    });

    let visible = false;
    // The trigger currently driving the ring. Tracked rather than paired
    // enter/leave events, because a trigger that is removed or hidden while
    // hovered (a popup's close button, a dismissed card) never fires
    // mouseout and used to leave the ring stuck enlarged.
    let current: Element | null = null;

    const show = (x: number, y: number) => {
      if (visible) return;
      visible = true;
      // Jump straight to the pointer so the rings do not fly in from (0, 0).
      gsap.set(cursors, { x, y });
      movers.forEach((m) => (m.x(x, x), m.y(y, y)));
      gsap.to(ring, { opacity: 1, duration: 0.3 });
      gsap.to(dot, { opacity: current ? 0 : 1, duration: 0.3 });
    };
    const hide = () => {
      visible = false;
      gsap.to(cursors, { opacity: 0, duration: 0.3 });
    };

    const onMove = (e: MouseEvent) => {
      show(e.clientX, e.clientY);
      movers.forEach((m) => (m.x(e.clientX), m.y(e.clientY)));
    };

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
        gsap.to(dot, { opacity: visible ? 1 : 0, duration: 0.4 });
        gsap.to(ringInner, { width: 36, height: 36, borderRadius: '50%', duration: 0.5 });
      } else {
        gsap.to(dot, { opacity: visible ? 1 : 0, duration: 0.2 });
        gsap.to(ring, { scale: 1, duration: 0.4 });
      }
    };

    const setCurrent = (next: Element | null) => {
      if (next === current) return;
      if (current) leave(current);
      current = next;
      if (current) enter(current);
    };

    const onOver = (e: MouseEvent) => setCurrent((e.target as Element).closest?.('.cursor__trigger') ?? null);
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setCurrent(null);
    };
    const onLeaveWindow = () => {
      setCurrent(null);
      hide();
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.documentElement.addEventListener('mouseleave', onLeaveWindow);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      gsap.killTweensOf([dot, ring, ringInner]);
      gsap.set(cursors, { opacity: 0, scale: 1 });
      gsap.set(ringInner, { clearProps: 'width,height,borderRadius' });
    };
  }, [desktop]);

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
