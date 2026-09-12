import { useEffect, useMemo, useRef } from 'react';
import { gsap, ScrollTrigger, SplitText } from '../lib/gsap';
import { isDesktopDevice } from '../lib/device';
import { whatIDo } from '../site';

const LINE_FLAT = 'M3000 13.8409 L0 13.8409';
const LINE_UP = 'M3000 14C1815.75 31.7211 1159.33 30.9412 0 14';
const LINE_DOWN = 'M3000 14C1815.75 -3.72109 1159.33 -2.94119 0 14';

/** Hex-packed dot grid; each visible dot is followed by its invisible hit circle. */
function useDotGrid() {
  return useMemo(() => {
    const cols = 7;
    const rows = 9;
    const dx = 88;
    const dy = 78;
    const dots: { x: number; y: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const offset = r % 2 ? dx / 2 : 0;
        const x = 6.13 + c * dx + offset;
        if (x > 554) continue;
        dots.push({ x, y: 6.13 + r * dy });
      }
    }
    return dots;
  }, []);
}

export default function WhatIDo() {
  const root = useRef<HTMLElement>(null);
  const dots = useDotGrid();

  useEffect(() => {
    const section = root.current!;
    const ctx = gsap.context(() => {
      // Listeners registered inside a gsap.context() are NOT removed by
      // ctx.revert(), so they are bound to an abort signal that the context's
      // own cleanup fires. Without this they accumulate on every remount.
      const ac = new AbortController();
      const on = (el: EventTarget, type: string, fn: (e: MouseEvent) => void) =>
        el.addEventListener(type, fn as EventListener, { signal: ac.signal });
      /* Titles slide in from the right at three different speeds. */
      const titles = section.querySelectorAll<HTMLElement>('.wwd-title-js');
      gsap.set(titles[0], { xPercent: 120 });
      gsap.set(titles[1], { xPercent: 20 });
      gsap.set(titles[2], { xPercent: 60 });
      titles.forEach((t, i) => {
        gsap.to(t, {
          xPercent: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: i === 2 ? 0.6 : 0.3 },
        });
      });

      /* Typewriter paragraph. */
      const textBox = section.querySelector<HTMLElement>('.js-wwd-text')!;
      const inner = textBox.querySelector<HTMLElement>('.wwd__text-inner')!;
      const split = SplitText.create(inner, { type: 'lines, chars', linesClass: 'line' });
      gsap.fromTo(
        split.chars,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: 'steps(1)',
          stagger: 0.05,
          duration: 0.8,
          scrollTrigger: { trigger: textBox, start: 'top center', end: 'bottom+=200% center', scrub: 0.5 },
        },
      );

      /* Hairlines that ripple when hovered. */
      section.querySelectorAll<SVGSVGElement>('.js-svg-line').forEach((svg) => {
        const path = svg.querySelector('path')!;
        let scale = 1;
        const tl = gsap
          .timeline({
            paused: true,
            repeat: 4,
            onStart: () => {
              scale = 1;
              gsap.set(svg, { scaleY: scale });
            },
            onRepeat: () => {
              scale -= 0.2;
              gsap.to(svg, { scaleY: scale });
            },
            onComplete: () => gsap.to(svg, { scaleY: 1 }),
          })
          .set(path, { morphSVG: LINE_FLAT })
          .to(path, { morphSVG: LINE_UP, duration: 0.1, ease: 'none' })
          .to(path, { morphSVG: LINE_DOWN, duration: 0.1, ease: 'none' })
          .to(path, { morphSVG: LINE_FLAT, duration: 0.1, ease: 'none' });
        on(svg, 'mouseenter', () => tl.restart());
      });

      /* Dot grid with the quote tooltip. */
      const desktop = isDesktopDevice();
      const box = section.querySelector<HTMLElement>('.js-dots-box')!;
      const svg = section.querySelector<SVGSVGElement>('.js-dots-svg')!;
      const hint = section.querySelector<HTMLElement>('.js-dots-hint')!;
      const hintText = hint.querySelector<HTMLElement>('.js-wwd-hint-text')!;
      const tipTitle = hint.querySelector<HTMLElement>('.js-wwd-tooltip-title')!;
      const tipQuote = hint.querySelector<HTMLElement>('.js-wwd-tooltip-quote')!;
      const closeBtn = hint.querySelector<HTMLElement>('.js-tooltip-close-btn')!;
      const hits = svg.querySelectorAll<SVGCircleElement>('.js-dots-item');
      const quotes = whatIDo.quotes;
      const randomQuote = () => (tipQuote.textContent = quotes[Math.floor(Math.random() * quotes.length)]);

      if (desktop) {
        let xTo: ReturnType<typeof gsap.quickTo> | undefined;
        let yTo: ReturnType<typeof gsap.quickTo> | undefined;
        const follow = (e: MouseEvent) => {
          xTo?.(e.clientX);
          yTo?.(e.clientY);
        };
        on(box, 'mouseenter', (e) => {
          gsap.set(hint, { x: e.clientX, y: e.clientY });
          gsap.to(hint, { opacity: 1, scale: 1, duration: 0.3 });
          xTo = gsap.quickTo(hint, 'x', { duration: 0.6, ease: 'power3' });
          yTo = gsap.quickTo(hint, 'y', { duration: 0.6, ease: 'power3' });
          on(window, 'mousemove', follow);
        });
        on(box, 'mouseleave', () => {
          gsap.to(hint, { opacity: 0, scale: 0, duration: 0.3 });
          xTo?.tween.kill();
          yTo?.tween.kill();
          window.removeEventListener('mousemove', follow);
        });
        ScrollTrigger.create({
          trigger: box,
          start: 'top bottom',
          end: 'bottom center',
          onEnter: () => gsap.set(hint, { visibility: 'visible' }),
          onLeave: () => gsap.set(hint, { visibility: 'hidden' }),
          onEnterBack: () => gsap.set(hint, { visibility: 'visible' }),
          onLeaveBack: () => gsap.set(hint, { visibility: 'hidden' }),
        });

        const open = gsap
          .timeline({ paused: true, onStart: () => hint.classList.add('opened') })
          .to(hintText, { opacity: 0, duration: 0.3 })
          .to(tipTitle, { opacity: 1, duration: 0.3 })
          .to(hint, { width: '228px', height: '276px', duration: 0.5, ease: 'tooltip', transformOrigin: 'top left' }, 0)
          .to(tipQuote, { opacity: 1, duration: 0.2 }, '-=0.2');

        ScrollTrigger.create({
          trigger: svg,
          start: 'bottom-=10% bottom',
          end: 'bottom+=100% bottom',
          onEnter: () => svg.classList.add('hovered'),
          onLeaveBack: () => svg.classList.remove('hovered'),
        });

        hits.forEach((hit) => {
          const dot = hit.previousElementSibling as SVGCircleElement;
          on(hit, 'mouseenter', () => {
            gsap.set(hit, { zIndex: 100 });
            gsap.set(dot, { scale: 2, fill: '#00FB96', transformOrigin: 'center center' });
            randomQuote();
            open.restart();
          });
          on(hit, 'mouseleave', () => {
            gsap.set(dot, { scale: 1, fill: '#151515' });
            open.reverse();
            hint.classList.remove('opened');
          });
        });
      } else {
        const open = gsap
          .timeline({ paused: true, onStart: () => hint.classList.add('opened') })
          .to(hint, { opacity: 0, duration: 0.3 })
          .set(hintText, { opacity: 0 })
          .set(tipTitle, { opacity: 1 })
          .set(hint, { width: '228px', height: '276px' })
          .set(tipQuote, { opacity: 1 })
          .set(closeBtn, { opacity: 1 })
          .to(hint, { opacity: 1, duration: 0.3 }, '+=0.3');
        on(closeBtn, 'click', () => {
          open.reverse();
          setTimeout(() => hint.classList.remove('opened'), 600);
        });
        hits.forEach((hit) =>
          on(hit, 'click', () => {
            randomQuote();
            open.restart();
          }),
        );
      }
      return () => ac.abort();
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section className="wwd" id="services" ref={root}>
      <h2 className="wwd__title" aria-label={whatIDo.title.join(' ')}>
        <div className="title title--cursive wwd-title-js">{whatIDo.title[0]}</div>
        <div className="title wwd-title-js">{whatIDo.title[1]}</div>
        <div className="title wwd-title-js">{whatIDo.title[2]}</div>
      </h2>
      <div className="wwd__text text js-wwd-text">
        <span className="wwd__text-inner">{whatIDo.text}</span>
        <span className="wwd__text-cursor">|</span>
      </div>
      <div className="container wwd__container">
        <div className="wwd__services">
          {whatIDo.columns.map((col, i) => (
            <ul className="wwd__list" key={i}>
              {col.map((item) => (
                <li className="wwd__item" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="lines wwd__lines" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <svg className="js-svg-line" viewBox="0 0 3000 28" fill="none" preserveAspectRatio="none" key={i}>
              <path d={LINE_FLAT} stroke="#414141" strokeOpacity="0.53" strokeWidth="1.5" />
            </svg>
          ))}
        </div>
      </div>
      <div className="container">
        <h3 className="hidden">{whatIDo.approachTitle}</h3>
        <ul className="hidden">
          {whatIDo.quotes.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ul>
        <div className="wwd__dots js-dots-box" aria-hidden>
          <div className="wwd__hint js-dots-hint" aria-hidden>
            <button type="button" className="tooltip__button hidden-desktop js-tooltip-close-btn" aria-label="Close" />
            <div className="js-wwd-hint-text">
              <span className="hidden-desktop">Tap To </span>
              <span className="visible-desktop">hover</span> " <span className="wwd__hint-dot" /> "
            </div>
            <div className="tooltip__title js-wwd-tooltip-title">{whatIDo.approachTitle}</div>
            <div className="tooltip__quote js-wwd-tooltip-quote" />
          </div>
          <svg viewBox="0 0 554 635" fill="none" className="dots js-dots-svg" aria-hidden>
            {dots.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r="6.128" fill="#151515" />
                <circle cx={d.x} cy={d.y} r="36" fill="none" className="cursor__trigger js-dots-item" />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
