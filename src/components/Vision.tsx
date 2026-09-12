import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap, SplitText } from '../lib/gsap';
import { useInView, useReducedMotion } from '../lib/hooks';
import { vision } from '../site';
import SceneBoundary from './SceneBoundary';

const VisionScene = lazy(() => import('./three/VisionScene'));

/**
 * Black "Core Vision" section: the cursive title and the big paragraph are
 * revealed character by character as you scroll, the three columns drift
 * up, and the email is typed out at the end.
 */
export default function Vision() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const inView = useInView(bg, '10%');
  const reduced = useReducedMotion();
  const [sceneOn, setSceneOn] = useState(false);

  useEffect(() => {
    if (inView) setSceneOn(true);
  }, [inView]);

  useEffect(() => {
    const section = root.current!;
    const ctx = gsap.context(() => {
      const title = section.querySelector<HTMLElement>('.js-aims-title')!;
      const subtitle = section.querySelector<HTMLElement>('.js-aims-subtitle')!;
      const small = section.querySelector<HTMLElement>('.js-aims-small-subtitle')!;
      const texts = section.querySelectorAll<HTMLElement>('.js-aims-text');
      const email = section.querySelector<HTMLElement>('.js-aims-email')!;

      const t = SplitText.create(title, { type: 'lines, words, chars', linesClass: 'line' });
      gsap.set(t.chars, { yPercent: 100 });
      gsap.to(t.chars, {
        yPercent: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: { trigger: title, start: 'top+=15% bottom', end: 'bottom center', scrub: 0.3 },
      });

      const mobile = window.innerWidth < 768;
      const s = SplitText.create(subtitle, { type: 'lines, words, chars', linesClass: 'line' });
      gsap.fromTo(
        s.chars,
        { yPercent: 100, autoAlpha: 1 },
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 0.8,
          scrollTrigger: {
            trigger: subtitle,
            start: mobile ? 'top bottom' : 'top+=15% bottom',
            end: mobile ? 'center center' : 'bottom center',
            scrub: 0.2,
          },
        },
      );

      const sm = SplitText.create(small, { type: 'lines', linesClass: 'line' });
      gsap.set(sm.lines, { yPercent: 100, opacity: 0 });
      gsap.to(sm.lines, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.5,
        duration: 1,
        scrollTrigger: { trigger: small, start: 'top+=15% bottom', end: 'bottom center', scrub: 0.3 },
      });

      gsap.set(texts, { opacity: 0, yPercent: 50 });
      gsap.to(texts, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.5,
        duration: 0.6,
        ease: 'latestCase',
        scrollTrigger: { trigger: texts[0], start: 'top-=50% bottom', end: 'bottom+=10% center', scrub: 0.4 },
      });

      const e = SplitText.create(email, { type: 'lines, chars', charsClass: 'char', linesClass: 'line' });
      gsap.fromTo(
        e.chars,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: 'steps(1)',
          stagger: 0.1,
          duration: 1,
          scrollTrigger: { trigger: email, start: 'top+=50% bottom', end: 'bottom+=400% bottom', scrub: 0.2 },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="aims" id="agency" ref={root}>
      <div className="aims__bg" ref={bg} aria-hidden>
        {sceneOn && !reduced && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <VisionScene active={inView} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
      <div className="aims__container container">
        <h2 className="aims__title title title--cursive js-aims-title">{vision.title}</h2>
        <div className="aims__subtitle title-secondary js-aims-subtitle">{vision.subtitle}</div>
        <div className="aims__small-title subtitle js-aims-small-subtitle">{vision.smallTitle}</div>
        <div className="aims__description">
          {vision.paragraphs.map((p) => (
            <div className="aims__item js-aims-text" key={p}>
              <p className="aims__text text">{p}</p>
            </div>
          ))}
        </div>
        <div className="aims__loader" aria-hidden>
          <svg viewBox="0 0 200 200">
            <circle className="ring" cx="100" cy="100" r="88" />
            <circle className="ring" cx="100" cy="100" r="66" />
            <circle className="ring" cx="100" cy="100" r="44" />
          </svg>
        </div>
        <p className="aims__text text-small">{vision.tagline}</p>
        <a className="aims__email cursor__trigger js-aims-email" href={`mailto:${vision.email}`}>
          {vision.email}
        </a>
      </div>
    </section>
  );
}
