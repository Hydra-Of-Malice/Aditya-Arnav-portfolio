import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { gsap, SplitText } from '../lib/gsap';
import { waitForLoaderExitOnce } from '../lib/loader';
import { person, resumeCta } from '../site';
import { useInView, useReducedMotion } from '../lib/hooks';
import ResumeButton from './ResumeButton';
import SceneBoundary from './SceneBoundary';

// three.js is only pulled in once the loader is gone.
const HeroScene = lazy(() => import('./three/HeroScene'));

const CTA_HIDDEN_KEY = 'hero-cta-banner-hidden';

/**
 * Full-viewport black hero: the name as individually draggable letters over a
 * WebGL scene, three mono lines beneath, and a résumé card that slides in
 * from the bottom-right a couple of seconds after the loader.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, '0px');
  const reduced = useReducedMotion();
  const [sceneOn, setSceneOn] = useState(false);

  useEffect(() => {
    const about = root.current!;
    const scene = about.querySelector<HTMLElement>('.about__scene')!;
    const letters = about.querySelectorAll<HTMLElement>('.about-title-js .letter');
    const subtitle = about.querySelector<HTMLElement>('.about-subtitle-js')!;
    const mark = about.querySelector<HTMLElement>('.about__mark')!;
    const left = about.querySelector<HTMLElement>('.title-left-js')!;
    const right = about.querySelector<HTMLElement>('.title-right-js')!;

    let split: SplitText | undefined;
    let sortables: Sortable[] = [];
    let cancelled = false;

    gsap.set(scene, { scale: 0 });
    gsap.set(letters, { yPercent: 100 });
    gsap.set(mark, { autoAlpha: 0 });
    split = SplitText.create(subtitle, { type: 'lines', linesClass: 'line' });
    gsap.set(split.lines, { yPercent: 100, opacity: 0 });

    waitForLoaderExitOnce().then(() => {
      if (cancelled) return;
      setSceneOn(true);
      gsap.to(scene, { scale: 1, duration: 1, delay: 0.25 });
      gsap
        .timeline({ delay: 1.2 })
        .to(letters, { yPercent: 0, stagger: 0.1, duration: 0.97, ease: 'branding' })
        .to(split!.lines, { yPercent: 0, opacity: 1, stagger: 0.4, duration: 0.9, delay: 0.6, ease: 'branding' }, 0)
        .to(mark, { autoAlpha: 1, duration: 0.6 }, 2.3);

      // Letters can be dragged between the two words, as on the reference.
      if (window.innerWidth >= 1025) {
        const opts: Sortable.Options = {
          group: 'shared',
          animation: 150,
          direction: 'horizontal',
          ghostClass: 'letter-ghost',
          chosenClass: 'letter-chosen',
          dragClass: 'letter-drag',
          forceFallback: true,
        };
        sortables = [Sortable.create(left, opts), Sortable.create(right, opts)];
      }
    });

    return () => {
      cancelled = true;
      sortables.forEach((s) => s.destroy());
      split?.revert();
    };
  }, []);

  return (
    <section className="about js-about" id="top" ref={root}>
      <div className="container about__container">
        <div className="about__column about__headline">
          <div className="title__box">
            <h1 className="hidden">{person.name}</h1>
            <div className="about__title title about-title-js" aria-hidden>
              {person.heroWords.map((word, i) => (
                <div className={i === 0 ? 'title-left title-left-js' : 'title-right title-right-js'} key={word}>
                  {word.split('').map((ch, j) => (
                    <span className="letter" key={`${word}-${j}`}>
                      {ch}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="about__text">
            <div className="about__subtitle subtitle about-subtitle-js">
              {person.heroLines.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </div>
          </div>
          <div className="about__mark" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="about__column about__column-cta">
          <HeroCta />
        </div>

        <div className="about__scene" ref={sceneRef} aria-hidden>
          {sceneOn && !reduced && (
            <SceneBoundary>
              <Suspense fallback={null}>
                <HeroScene active={inView} />
              </Suspense>
            </SceneBoundary>
          )}
        </div>
      </div>
    </section>
  );
}

function HeroCta() {
  const card = useRef<HTMLDivElement>(null);
  const [hidden] = useState(() => {
    try {
      return sessionStorage.getItem(CTA_HIDDEN_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (hidden) return;
    const el = card.current!;
    const about = el.closest<HTMLElement>('.about')!;
    const title = el.querySelector('.cch__title');
    const button = el.querySelector('.capabilities-button-component');
    const close = el.querySelector('.cch__close-button');

    const ro = new ResizeObserver(([entry]) => {
      about.style.setProperty('--capabilities-cta-height', `${entry.borderBoxSize[0].blockSize}px`);
    });
    ro.observe(el);

    gsap.set(el, { autoAlpha: 0, yPercent: 100 });
    gsap.set(title, { yPercent: 50, opacity: 0 });
    gsap.set(button, { yPercent: 20, opacity: 0 });
    gsap.set(close, { scale: -1, opacity: 0 });

    let cancelled = false;
    waitForLoaderExitOnce().then(() => {
      if (cancelled) return;
      tl.current = gsap
        .timeline()
        .to(el, { autoAlpha: 1, delay: 2.6, duration: 0.6, yPercent: 0, ease: 'power2.in' })
        .to(title, { yPercent: 0, opacity: 1 }, '<+0.55')
        .to(button, { yPercent: 0, opacity: 1 }, '<+0.25')
        .to(close, { scale: 1, opacity: 1, duration: 0.8 }, '<');
    });

    return () => {
      cancelled = true;
      ro.disconnect();
      tl.current?.kill();
    };
  }, [hidden]);

  if (hidden) return null;

  const dismiss = () => {
    tl.current?.reverse();
    try {
      sessionStorage.setItem(CTA_HIDDEN_KEY, 'true');
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <div className="capabilities-cta-hero cch" ref={card}>
      <div className="cch__background" aria-hidden />
      <div className="cch__body">
        <h3 className="cch__title">{resumeCta.title}</h3>
        <ResumeButton label="GET YOUR COPY" />
        <button className="cch__close-button cursor__trigger" type="button" aria-label="Dismiss" onClick={dismiss} />
      </div>
    </div>
  );
}
