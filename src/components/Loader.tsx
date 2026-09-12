import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { LOADER_BASE_MS, markLoaderComplete, markLoaderExited } from '../lib/loader';

let started = false;

/**
 * Black curtains with a white bar. The bar fills to 20%, creeps toward 90%
 * while the window loads, then snaps full and the curtains scale away.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started) return;
    started = true;

    const loader = root.current!;
    const curtains = loader.querySelectorAll('.js-loader-curtain');
    const line = loader.querySelector<HTMLElement>('.js-loader-line')!;
    const content = loader.querySelector<HTMLElement>('.js-loader-content')!;
    const text = loader.querySelector<HTMLElement>('.js-loader-text')!;

    const exit = gsap.timeline({ paused: true });
    exit
      .to(text, { opacity: 0, duration: 0.3 }, 0)
      .set(content, { backgroundColor: 'transparent' }, 0)
      .set(line, { opacity: 0 }, 0)
      .to(curtains, { scaleY: 0, duration: 1, ease: 'power1.inOut' }, 0.3)
      .call(markLoaderExited, undefined, 0)
      .set(loader, { zIndex: -1, opacity: 0 }, 1.5);

    let creep: gsap.core.Tween | null = null;
    let loaded = false;
    let firstStepDone = false;

    const fill = (to: number, duration: number, ease = 'power1.out') =>
      gsap.to(line, { scaleX: to, duration, ease, overwrite: 'auto', force3D: true });

    const finish = () =>
      fill(1, 1, 'power1.inOut').eventCallback('onComplete', () => {
        document.body.classList.remove('loading');
        markLoaderComplete();
        exit.play(0);
      });

    const proceed = () => {
      creep?.kill();
      creep = null;
      if (Number(gsap.getProperty(line, 'scaleX')) < 0.9) fill(0.9, 0.2).eventCallback('onComplete', finish);
      else finish();
    };

    const minimum = new Promise<void>((r) => setTimeout(r, LOADER_BASE_MS));
    const windowLoad = new Promise<void>((r) => {
      if (document.readyState === 'complete') r();
      else window.addEventListener('load', () => r(), { once: true });
    });
    Promise.all([minimum, windowLoad]).then(() => {
      loaded = true;
      if (firstStepDone) proceed();
    });

    gsap.set(line, { scaleX: 0, transformOrigin: 'left center', force3D: true });
    gsap.to(line, {
      scaleX: 0.2,
      duration: 1.2,
      ease: 'power1.out',
      force3D: true,
      onComplete: () => {
        firstStepDone = true;
        if (loaded) proceed();
        else creep = gsap.to(line, { scaleX: 0.9, duration: 24, ease: 'power1.out', force3D: true });
      },
    });
  }, []);

  return (
    <div className="loader js-loader" ref={root} aria-hidden>
      <div className="loader__content js-loader-content">
        <div className="loader__curtain loader__curtain--top js-loader-curtain" />
        <div className="loader__line js-loader-line" />
        <span className="loader__text text-small js-loader-text">Loading...</span>
        <div className="loader__curtain loader__curtain--bottom js-loader-curtain" />
      </div>
    </div>
  );
}
