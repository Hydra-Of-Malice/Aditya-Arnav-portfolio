import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { isDesktopDevice } from '../lib/device';
import { useInView, useReducedMotion } from '../lib/hooks';
import { features, featuresCta } from '../site';
import ResumeButton from './ResumeButton';
import SceneBoundary from './SceneBoundary';

const FeatureScene = lazy(() => import('./three/FeatureScene'));

/**
 * Four rows. Hovering one paints a black pill behind it, swaps its label for
 * a cycling pair of words, and brings a 3D scene up beside the pointer with
 * the reference's skew-and-rotate reveal. On touch devices the section pins
 * and scrolling steps through the rows instead.
 */
export default function Features() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [showScene, setShowScene] = useState(false);
  // The canvas only renders frames while a row is hovered (or, on touch
  // devices, always). `warm` keeps it running briefly after mount so the
  // WebGL context and shaders are ready before the first hover.
  const [hovering, setHovering] = useState(false);
  const [warm, setWarm] = useState(true);
  const reduced = useReducedMotion();
  const sceneBox = useRef<HTMLDivElement>(null);
  const boxInView = useInView(sceneBox, '10%');

  useEffect(() => {
    const section = root.current!;
    const desktop = isDesktopDevice();
    const rows = Array.from(section.querySelectorAll<HTMLElement>('.feature'));
    const frames = Array.from(section.querySelectorAll<HTMLElement>('.feature-content-js'));
    const box = section.querySelector<HTMLElement>('.js-features-videos')!;
    const ctx = gsap.context(() => {
      // Listeners registered inside a gsap.context() are NOT removed by
      // ctx.revert(), so they are bound to an abort signal that the context's
      // own cleanup fires. Without this they accumulate on every remount.
      const ac = new AbortController();
      const on = (el: EventTarget, type: string, fn: (e: MouseEvent) => void) =>
        el.addEventListener(type, fn as EventListener, { signal: ac.signal });
      /* Word switcher — both columns, alternating, every second. Gated on
         visibility so it stops churning tweens when the section is off-screen. */
      const intervals: number[] = [];
      let onScreen = false;
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (onScreen = self.isActive),
      });
      rows.forEach((row, i) => {
        const [a, b] = Array.from(row.querySelectorAll<HTMLElement>('.feature__text--bottom .feature__number'));
        const [wa, wb] = features[i].words;
        let ia = 0;
        let ib = 0;
        const swap = (el: HTMLElement, list: string[], idx: number, dir: 'up' | 'down') =>
          gsap.to(el, {
            yPercent: dir === 'up' ? -100 : 100,
            opacity: 0,
            duration: 0.2,
            ease: 'power1.out',
            onComplete: () => {
              el.textContent = list[idx];
              gsap.set(el, { yPercent: dir === 'up' ? 100 : -100 });
              gsap.to(el, { yPercent: 0, opacity: 1, duration: 0.275, ease: 'power2.in' });
            },
          });
        gsap.set(a, { yPercent: 0, opacity: 1 });
        gsap.set(b, { yPercent: 100, opacity: 0 });
        swap(a, wa, ia, 'down');
        swap(b, wb, ib, 'down');
        intervals.push(
          window.setInterval(() => {
            if (!onScreen) return;
            if (ia === ib) {
              ib = (ib + 1) % wb.length;
              swap(b, wb, ib, 'up');
            } else {
              ia = (ia + 1) % wa.length;
              swap(a, wa, ia, 'up');
            }
          }, 1000),
        );
      });

      if (desktop) {
        gsap.set(box, { perspective: 800, rotationY: 9, skewY: -10, scale: 0.77, transformOrigin: '50% 50%', x: 100 });
        // Create the WebGL context now, while the box is still invisible.
        const warmUp = reduced ? 0 : window.setTimeout(() => setShowScene(true), 2500);
        const coolDown = reduced ? 0 : window.setTimeout(() => setWarm(false), 6000);
        let xTo: ReturnType<typeof gsap.quickTo> | undefined;
        let yTo: ReturnType<typeof gsap.quickTo> | undefined;
        let show: gsap.core.Timeline | null = null;
        let hide: gsap.core.Timeline | null = null;
        // Nothing to measure or tear down while the scene is already hidden,
        // which is the case for almost every pointer move on the page.
        let shown = false;
        const move = (e: MouseEvent) => {
          xTo?.(e.clientX);
          yTo?.(e.clientY);
        };
        const showBox = (x: number, y: number) => {
          // Under reduced motion the rows still highlight, but nothing flies in
          // beside the pointer.
          if (reduced) return;
          hide?.kill();
          shown = true;
          setHovering(true);
          gsap.set(box, { x, y });
          show = gsap
            .timeline()
            .to(box, { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' })
            .to(box, { skewY: 0, rotationY: 0, duration: 0.75, ease: 'power3.out' }, '<');
          xTo = gsap.quickTo(box, 'x', { duration: 0.6, ease: 'power3' });
          yTo = gsap.quickTo(box, 'y', { duration: 0.6, ease: 'power3' });
          on(window, 'mousemove', move);
        };
        const hideBox = () => {
          if (!shown) return;
          shown = false;
          show?.kill();
          setHovering(false);
          hide = gsap.timeline().to(box, { opacity: 0, skewY: -9, rotationY: 9, scale: 0.9, duration: 0.375, ease: 'power3' });
          xTo?.tween.kill();
          yTo?.tween.kill();
          window.removeEventListener('mousemove', move);
        };
        const outside = (e: MouseEvent) => {
          if (!shown) return;
          const inside = frames.some((f) => {
            const r = f.getBoundingClientRect();
            return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
          });
          if (!inside) hideBox();
        };
        if (!reduced) on(window, 'mousemove', outside);

        frames.forEach((frame, i) => {
          const top = frame.querySelector<HTMLElement>('.feature__text--top')!;
          const bottom = frame.querySelector<HTMLElement>('.feature__text--bottom')!;
          const bg = frame.querySelector<HTMLElement>('.feature__bg')!;
          gsap.set(bottom, { opacity: 0, yPercent: 200 });
          gsap.set(bg, { opacity: 0, scaleX: 0.5 });

          const enter = gsap
            .timeline({ paused: true })
            .to(top, { color: '#fff', duration: 0 })
            .to(bottom, { color: '#fff', opacity: 1, duration: 0 }, 0)
            .to(bg, { opacity: 1, duration: 0.375, ease: 'power2.out' }, 0)
            .to(bg, { scaleX: 1, duration: 0.75, ease: 'power2.out' }, 0)
            .to(top, { yPercent: -150, duration: 0.3, ease: 'branding' }, 0)
            .to(bottom, { yPercent: 0, duration: 0.75, ease: 'branding' }, 0);
          const leave = gsap
            .timeline({ paused: true })
            .to(bg, { scaleX: 0.5, duration: 0.375, ease: 'power1.in' })
            .to(bg, { opacity: 0, duration: 0.5, ease: 'power1.in' })
            .set(top, { yPercent: 0, color: '' })
            .set(bottom, { yPercent: 200, color: '' });

          ScrollTrigger.create({ trigger: frame, start: 'top bottom', end: 'bottom top', onLeave: hideBox, onLeaveBack: hideBox });

          on(frame, 'mouseenter', (e) => {
            setTimeout(() => {
              if (!frame.matches(':hover')) return;
              leave.kill();
              enter.play(0);
              setTimeout(() => {
                setActive(i);
                if (!reduced) setShowScene(true);
                showBox(e.clientX, e.clientY);
              }, 150);
            }, 200);
          });
          on(frame, 'mouseleave', () => {
            enter.kill();
            leave.kill();
            gsap.to(bg, {
              scaleX: 0.5,
              duration: 0.3,
              ease: 'power1.in',
              onComplete: () => {
                gsap.to(bg, { opacity: 0, duration: 0.1 });
                gsap.set(bottom, { color: '', opacity: 0, yPercent: 200 });
                gsap.set(top, { color: '', yPercent: 0 });
              },
            });
            hideBox();
          });
        });
        return () => {
          ac.abort();
          intervals.forEach(clearInterval);
          clearTimeout(warmUp);
          clearTimeout(coolDown);
        };
      }

      /* Mobile: pin and step. */
      setShowScene(true);
      setHovering(true);
      const steps = rows.length;
      const update = (idx: number) => {
        rows.forEach((r, i) => r.classList.toggle('is-active', i === idx));
        setActive(idx);
      };
      update(0);
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${0.75 * window.innerHeight * (steps - 1)}`,
        pin: true,
        onUpdate: (self) => update(Math.min(Math.floor(self.progress * (steps - 0.01)), steps - 1)),
        onLeave: () => update(steps - 1),
        onEnterBack: () => update(0),
      });
      return () => {
        ac.abort();
        intervals.forEach(clearInterval);
      };
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="features" ref={root}>
      <div className="features__container container">
        <div className="features__list">
          {features.map((f) => (
            <div className="feature" key={f.scene}>
              <div className="feature__frame feature-content-js">
                <div className="feature__bg" />
                <div className="feature__content">
                  <div className="feature__text feature__text--top">
                    <span className="feature__number">{f.index}</span>
                    <div className="feature__subtitle subtitle">{f.title}</div>
                  </div>
                  <div className="feature__text feature__text--bottom">
                    <span className="feature__number">{f.words[0][0]}</span>
                    <div className="feature__subtitle subtitle">{f.title}</div>
                    <span className="feature__number">{f.words[1][0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="features__videos js-features-videos" ref={sceneBox} aria-hidden>
        {showScene && !reduced && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <FeatureScene scene={features[active].scene} active={(hovering || warm) && boxInView} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      <div className="features-cta">
        <div className="features-cta__container">
          <div className="features-cta__body">
            <div className="features-cta__image-wrapper">
              <div className="features-cta__img" aria-hidden />
              <svg className="features-cta__icon" viewBox="0 0 40 40" fill="none" aria-hidden>
                <path d="M8 20h24M22 10l10 10-10 10" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="features-cta__title">{featuresCta.title}</h3>
              <ResumeButton label={featuresCta.button} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
