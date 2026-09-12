import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { isDesktopDevice } from '../lib/device';
import { scrollToHash } from '../lib/smoothScroll';
import { Arc, Plus, Tap } from './Icons';

type Props = {
  href?: string;
  text?: string;
  script?: string;
  inverse?: boolean;
  popup?: boolean;
  onNavigate?: () => void;
};

/**
 * "Got Project?" with the cursive "Let's talk" under it. On hover, four arcs
 * fan out on each side and a "START +" pill follows the pointer.
 */
export default function Cta({ href = '#contact', text = 'Got Project?', script = "Let's talk", inverse, popup, onNavigate }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktopDevice()) return;
    const cta = root.current!;
    const hint = cta.querySelector<HTMLElement>('.cta__hint');
    const left = cta.querySelectorAll<SVGElement>('.cta__arcs--left .cta__arc');
    const right = cta.querySelectorAll<SVGElement>('.cta__arcs--right .cta__arc');

    let xTo: ReturnType<typeof gsap.quickTo> | undefined;
    let yTo: ReturnType<typeof gsap.quickTo> | undefined;
    const follow = (e: MouseEvent) => {
      xTo?.(e.clientX);
      yTo?.(e.clientY);
    };

    const showHint = (x: number, y: number) => {
      if (!hint) return;
      gsap.set(hint, { x, y, visibility: 'visible' });
      gsap.to(hint, { opacity: 1, scale: 1, duration: 0.2 });
      xTo = gsap.quickTo(hint, 'x', { duration: 0.6, ease: 'power3' });
      yTo = gsap.quickTo(hint, 'y', { duration: 0.6, ease: 'power3' });
      window.addEventListener('mousemove', follow);
    };
    const hideHint = () => {
      if (!hint) return;
      gsap.to(hint, { opacity: 0, scale: 0, duration: 0.3 });
      xTo?.tween.kill();
      yTo?.tween.kill();
      window.removeEventListener('mousemove', follow);
    };

    const arcs = gsap.timeline({ paused: true });
    [left, right].forEach((set) =>
      set.forEach((arc, t) => {
        arcs.to(arc, { xPercent: -90 * (3 - t), opacity: 1 - 0.2 * t, duration: 0.4, ease: 'tooltip' }, 0.1 * t);
      }),
    );

    const st = hint
      ? ScrollTrigger.create({
          trigger: cta,
          start: 'top bottom',
          end: 'bottom top+=300px',
          onEnter: () => gsap.set(hint, { visibility: 'visible' }),
          onLeave: () => gsap.set(hint, { visibility: 'hidden' }),
          onEnterBack: () => gsap.set(hint, { visibility: 'visible' }),
          onLeaveBack: () => gsap.set(hint, { visibility: 'hidden' }),
        })
      : null;

    const onEnter = (e: MouseEvent) => {
      showHint(e.clientX, e.clientY);
      arcs.play();
    };
    const onLeave = () => {
      hideHint();
      arcs.reverse();
    };
    cta.addEventListener('mouseenter', onEnter);
    cta.addEventListener('mouseleave', onLeave);
    return () => {
      cta.removeEventListener('mouseenter', onEnter);
      cta.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousemove', follow);
      st?.kill();
      arcs.kill();
    };
  }, []);

  const click = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate?.();
    setTimeout(() => scrollToHash(href), onNavigate ? 1100 : 0);
  };

  return (
    <div className={`cta ${inverse ? 'cta--inverse' : ''} ${popup ? 'cta--popup' : ''}`} ref={root}>
      <div className="cta__content">
        <a href={href} className="cta__link" onClick={click}>
          <div className="cta__arcs cta__arcs--left" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <Arc className="cta__arc" key={i} style={{ color: '#fff' }} />
            ))}
          </div>
          <div className="cta__text">
            <span>{text}</span>
            {!popup && <span className="cta__script">{script}</span>}
          </div>
          <div className="cta__arcs cta__arcs--right" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <Arc className="cta__arc" key={i} style={{ color: '#fff' }} />
            ))}
          </div>
        </a>
        {!popup && (
          <div className="cta__hint" aria-hidden>
            <span className="text-small">
              <span className="hidden-desktop">
                <Tap /> Tap to{' '}
              </span>
              START " <Plus /> "
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
