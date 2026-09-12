import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { isDesktopDevice } from '../lib/device';
import { caseCounts, cases, latestCase } from '../site';
import CaseArt from './CaseArt';
import CasePopup from './CasePopup';

type Clip = { top: string; right: string; bottom: string; left: string };
const corners: Record<string, Clip> = {
  'top right': { top: '0%', right: '0%', bottom: '100%', left: '100%' },
  'top left': { top: '0%', right: '100%', bottom: '100%', left: '0%' },
  'bottom left': { top: '100%', right: '100%', bottom: '0%', left: '0%' },
  'bottom right': { top: '100%', right: '0%', bottom: '0%', left: '100%' },
};
const full: Clip = { top: '0%', right: '0%', bottom: '0%', left: '0%' };
const enterFrom = ['top right', 'top left', 'bottom left', 'bottom right'];
const leaveTo = ['bottom left', 'bottom right', 'top right', 'top left'];
const vars = (c: Clip) => ({ '--clip-top': c.top, '--clip-right': c.right, '--clip-bottom': c.bottom, '--clip-left': c.left });

/**
 * "Fresh Drop" (the latest case, whose white cover panel slides across on
 * hover) followed by a staggered grid whose tiles are cut in from a corner
 * as they scroll into view and round their corners on hover. Every tile
 * opens a full-screen popup.
 */
/** Enter and Space must work on the tiles, which are divs so the CSS can drive them. */
function openOnKey(open: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    open();
  };
}

export default function Cases() {
  const root = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  // The popup stays mounted through its exit animation, then unmounts. Keeping
  // all nine in the DOM cost ~1,100 nodes — a third of the page — for markup
  // nobody had opened yet.
  const [mountedId, setMountedId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (openId) {
      setMountedId(openId);
      return;
    }
    if (!mountedId) return;
    const t = setTimeout(() => setMountedId(null), 1600);
    return () => clearTimeout(t);
  }, [openId, mountedId]);

  const mountedCase = [latestCase, ...cases].find((c) => c.id === mountedId);

  useEffect(() => {
    const section = root.current!;
    const desktop = isDesktopDevice();
    const ctx = gsap.context(() => {
      // Listeners registered inside a gsap.context() are NOT removed by
      // ctx.revert(), so they are bound to an abort signal that the context's
      // own cleanup fires. Without this they accumulate on every remount.
      const ac = new AbortController();
      const on = (el: EventTarget, type: string, fn: (e: MouseEvent) => void) =>
        el.addEventListener(type, fn as EventListener, { signal: ac.signal });
      /* Latest case */
      const latest = section.querySelector<HTMLElement>('.js-latest-case')!;
      const latestBg = section.querySelector<HTMLElement>('.js-latest-case-bg')!;
      const titles = Array.from(section.querySelectorAll<HTMLElement>('.title-secondary-js'));
      if (desktop) {
        titles.forEach((t, i) => {
          gsap.set(t, { xPercent: i % 2 === 0 ? -60 : 42 });
          gsap.to(t, {
            xPercent: 0,
            duration: 2,
            scrollTrigger: { trigger: t, start: 'clamp(top bottom)', end: 'bottom+=10% center', toggleActions: 'play none none reverse' },
          });
        });
        const slide = gsap.timeline({ paused: true });
        titles.forEach((t, i) => slide.to(t, { x: () => -1 * (t.offsetLeft - (i % 2 ? 150 : 50)), duration: 1, ease: 'latestCase' }, 0));
        on(window, 'resize', () => slide.invalidate());
        on(latestBg, 'mouseenter', () => {
          latest.classList.add('hovered');
          slide.restart();
        });
        on(latestBg, 'mouseleave', () => {
          latest.classList.remove('hovered');
          slide.reverse();
        });
      }

      /* Grid tiles */
      const narrow = window.innerWidth < 1366;
      section.querySelectorAll<HTMLElement>('.js-subcase').forEach((item, r) => {
        const name = item.querySelector<HTMLElement>('.js-case-name')!;
        const asset = item.querySelector<HTMLElement>('.js-case-asset')!;
        const from = corners[enterFrom[r % 4]];
        const to = corners[leaveTo[r % 4]];
        let visible = false;

        const tween = (v: gsap.TweenVars) =>
          gsap.to(asset, {
            ...v,
            duration: 1,
            overwrite: 'auto',
            onStart: () => (asset.style.willChange = narrow ? 'opacity' : 'clip-path'),
            onComplete: () => {
              asset.style.willChange = '';
              if (!visible && !narrow) gsap.set(asset, { visibility: 'hidden' });
            },
          });
        const show = () => {
          visible = true;
          if (narrow) {
            tween({ opacity: 1 });
            gsap.to(name, { opacity: 1, duration: 1 });
          } else {
            gsap.set(asset, { visibility: 'visible' });
            tween(vars(full));
            gsap.to(name, { yPercent: 0, opacity: 1, duration: 1 });
          }
        };
        const hide = (corner: Clip) => {
          visible = false;
          if (narrow) {
            tween({ opacity: 0 });
            gsap.to(name, { opacity: 0, duration: 1 });
          } else {
            tween(vars(corner));
            gsap.to(name, { yPercent: 300, opacity: 0, duration: 1 });
          }
        };

        asset.classList.add('cases__asset--clip');
        if (narrow) {
          gsap.set(asset, { opacity: 0 });
          gsap.set(name, { opacity: 0 });
        } else {
          gsap.set(asset, { ...vars(from), visibility: 'hidden' });
          gsap.set(name, { yPercent: 300, opacity: 0 });
        }
        ScrollTrigger.create({
          trigger: item,
          start: 'clamp(top+=20% bottom)',
          end: 'clamp(bottom+=100% top)',
          onEnter: show,
          onEnterBack: show,
          onLeave: () => hide(to),
          onLeaveBack: () => hide(from),
        });
        on(item, 'mouseenter', () => gsap.to(asset, { '--clip-radius': '30px', duration: 1, ease: 'power1.inOut', overwrite: 'auto' }));
        on(item, 'mouseleave', () => gsap.to(asset, { '--clip-radius': '0px', duration: 1, ease: 'power1.inOut', overwrite: 'auto' }));
      });
      return () => ac.abort();
    }, section);
    return () => ctx.revert();
  }, []);

  const alignClass = (a?: string) => (a ? `cases__item--align-${a}` : '');

  return (
    <>
      <section className="cases" id="projects" ref={root}>
        <div className="container">
          <div
            className="cases__latest js-cases-item js-latest-case"
            role="button"
            tabIndex={0}
            aria-label={`Open case study: ${latestCase.name}`}
            onClick={() => setOpenId(latestCase.id)}
            onKeyDown={openOnKey(() => setOpenId(latestCase.id))}
          >
            <div className="latest__container">
              <div className="latest__panel">
                <div className="cases__title" aria-hidden>
                  <span className="title-secondary title-secondary--cursive title-secondary-js">Fresh</span>{' '}
                  <span className="title-secondary title-secondary-js">Drop</span>
                </div>
              </div>
              <div className="latest__panel latest__panel--cover">
                <div className="latest__bg cursor__trigger js-latest-case-bg">
                  <CaseArt c={latestCase} ratio="wide" />
                </div>
                {/* The cover panel repeats the title so it can slide across the
                    artwork; the accessibility tree only needs it once. */}
                <div className="cases__title" aria-hidden>
                  <span className="title-secondary title-secondary--cursive title-secondary-js">Fresh</span>{' '}
                  <span className="title-secondary title-secondary-js">Drop</span>
                </div>
              </div>
            </div>
            <div className="cases__description">
              <span className="cases__name text-small">{latestCase.name}</span>
            </div>
          </div>

          <div className="cases__header">
            <h3 className="title-secondary">Selected Cases</h3>
            <ul className="stack__list">
              {caseCounts.map((c) => (
                <li className="text-small" key={c.category}>
                  {c.category} ({c.count})
                </li>
              ))}
            </ul>
          </div>

          <div className="cases__list js-cases-list">
            {cases.map((c, i) => (
              <div className={`cases__item ${alignClass(c.align)} ${i === 6 ? 'cases__item--center-column' : ''}`} key={c.id}>
                <div
                  className={`cases__subitem cases__subitem--${c.size} js-cases-item js-subcase cursor__trigger`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open case study: ${c.name}`}
                  onClick={() => setOpenId(c.id)}
                  onKeyDown={openOnKey(() => setOpenId(c.id))}
                >
                  <div className="cases__asset js-case-asset">
                    <CaseArt c={c} />
                  </div>
                  <div className="cases__description">
                    <span className="cases__name text-small js-case-name">{c.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {mountedCase && <CasePopup c={mountedCase} open={openId === mountedCase.id} onClose={close} key={mountedCase.id} />}
    </>
  );
}
