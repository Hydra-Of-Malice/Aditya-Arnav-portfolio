import { useEffect, useRef } from 'react';
import { gsap, SplitText } from '../lib/gsap';
import { isDesktopDevice } from '../lib/device';
import { scrollToHash } from '../lib/smoothScroll';
import { numbers } from '../site';
import { Star } from './Icons';

/**
 * "Track RECORD": counters in the cursive face beside their labels, four
 * columns of names, and the reference's elliptical "Let's kick off" button
 * whose two rings part on hover while four stars twinkle.
 */
export default function Numbers() {
  const root = useRef<HTMLElement>(null);

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
      const titles = section.querySelectorAll<HTMLElement>('.partners-title-js');
      const mq = window.matchMedia('(min-width: 768px)');
      if (mq.matches) {
        gsap.set(titles[0], { xPercent: 100 });
        gsap.set(titles[1], { xPercent: -50 });
        titles.forEach((t) =>
          gsap.to(t, {
            xPercent: 0,
            duration: 1,
            ease: 'latestCase',
            scrollTrigger: { trigger: t, start: 'top+=200% bottom', end: 'bottom+=300% center', toggleActions: 'play none none reverse' },
          }),
        );
      }

      section.querySelectorAll<HTMLElement>('.js-partnets-number').forEach((el) => {
        const item = el.querySelector<HTMLElement>('.number__item')!;
        const arc = el.querySelector<HTMLElement>('.number__arc')!;
        const chars = SplitText.create(item, { type: 'chars' });
        gsap.to(el, { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top+=80% bottom', end: 'bottom+=160% bottom', scrub: 0.3 } });
        gsap.fromTo(
          arc,
          { xPercent: -300 },
          { xPercent: 0, ease: 'steps(1)', delay: 0.2, duration: 1, scrollTrigger: { trigger: el, start: 'top+=100% bottom', end: 'bottom+=300% bottom', scrub: 0.3 } },
        );
        gsap.fromTo(
          chars.chars,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: 'steps(1)', stagger: 1, delay: 0.2, duration: 1, scrollTrigger: { trigger: el, start: 'top+=100% bottom', end: 'bottom+=300% bottom', scrub: 0.3 } },
        );
      });

      /* Elliptical button */
      const btn = section.querySelector<HTMLElement>('.js-partnets-btn')!;
      const top = btn.querySelector('.js-partnets-btn-top');
      const bottom = btn.querySelector('.js-partnets-btn-bottom');
      const link = btn.querySelector('.js-partnets-link');
      const stars = btn.querySelectorAll('.js-callbtn-star');
      const r = window.innerWidth < 1440 ? 22 : 30;
      gsap.set(top, { y: -16 });
      gsap.set(bottom, { y: 10 });
      if (desktop) {
        // One paused timeline played forwards and backwards: a latch here used
        // to swallow a leave that arrived inside its own 300ms window and left
        // the button stuck open.
        const open = gsap
          .timeline({ paused: true, onComplete: () => btn.classList.add('hovered'), onReverseComplete: () => btn.classList.remove('hovered') })
          .to(top, { y: -r, duration: 0.4 }, 0)
          .to(bottom, { y: r, duration: 0.4 }, 0)
          .to(link, { color: '#fff', duration: 0.3 }, 0);
        on(btn, 'mouseenter', () => open.play());
        on(btn, 'mouseleave', () => open.reverse());
      }
      gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          scrollTrigger: { trigger: btn, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
        })
        .fromTo(stars[0], { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.5 })
        .fromTo(stars[1], { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.5 })
        .fromTo(stars[2], { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.4 }, 0)
        .fromTo(stars[3], { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.3 });
      return () => ac.abort();
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="partners" ref={root}>
      <div className="container">
        <h3 className="partners__title" aria-label={numbers.title.join(' ')}>
          <span className="title-secondary partners-title-js">{numbers.title[0]}</span>
          <span className="title-secondary title-secondary--cursive partners-title-js">{numbers.title[1]}</span>
        </h3>
        <div className="partners__info">
          <ul className="numbers__list">
            {numbers.counters.map((c) => (
              <li className="subtitle numbers__list-item" key={c.label}>
                {c.label}
                <div className="numbers__counter js-partnets-number">
                  (<span className="number__item">{c.value}</span>
                  <span className="number__arc">)</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="partners__wrapper">
            {numbers.columns.map((col, i) => (
              <ul className="partners__list" key={i}>
                {col.map((n) => (
                  <li className="text-small" key={n}>
                    {n}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
      <svg className="partners__line" viewBox="0 0 3000 28" fill="none" preserveAspectRatio="none" aria-hidden>
        <path d="M3000 13.84L0 13.84" stroke="#414141" strokeOpacity="0.53" strokeWidth="1.5" />
      </svg>
      <div className="callBtn cursor__trigger js-partnets-btn">
        <div className="callBtn__shape callBtn__shape--top js-partnets-btn-top" />
        <a
          href="#contact"
          className="callBtn__link js-partnets-link"
          onClick={(e) => {
            e.preventDefault();
            scrollToHash('#contact');
          }}
        >
          {numbers.kickOff}
        </a>
        <div className="callBtn__shape callBtn__shape--bottom js-partnets-btn-bottom" />
        <div className="callBtn__star-box" aria-hidden>
          <Star className="callBtn__star js-callbtn-star" size={40} />
          <Star className="callBtn__star js-callbtn-star" size={21} />
          <Star className="callBtn__star js-callbtn-star" size={27} />
          <Star className="callBtn__star js-callbtn-star" size={16} />
        </div>
      </div>
    </section>
  );
}
