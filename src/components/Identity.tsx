import { useEffect, useRef } from 'react';
import { Draggable, gsap, SplitText } from '../lib/gsap';
import { identity } from '../site';

/**
 * "My core identity": a title wiped in by six curtains, four words that
 * slide in from both sides, and a draggable strip of cards (work, education,
 * patents) that stands in for the reference's team slider.
 */
export default function Identity() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current!;
    const ctx = gsap.context(() => {
      /* Curtain-wiped title */
      const title = section.querySelector<HTMLElement>('.title-js')!;
      const curtains = title.nextElementSibling!.querySelectorAll('span');
      const st = { trigger: title, start: 'top-=5% bottom', end: 'bottom center', toggleActions: 'play none none reverse' };
      gsap.to(title, { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power1.inOut', delay: 0.3, scrollTrigger: st });
      curtains.forEach((c) => gsap.to(c, { scaleX: 0, duration: 1.2, ease: 'power1.inOut', delay: 0.3, scrollTrigger: st }));

      /* Words */
      const desc = section.querySelector<HTMLElement>('.team__description')!;
      section.querySelectorAll('.team-word-js').forEach((w) =>
        gsap.to(w, { x: 0, duration: 2, scrollTrigger: { trigger: desc, start: 'top bottom', end: 'bottom+=10% center', toggleActions: 'play none none reverse' } }),
      );

      /* Typed paragraph */
      const text = section.querySelector<HTMLElement>('.js-team-text')!;
      const split = SplitText.create(text, { type: 'lines, chars', linesClass: 'line' });
      const mobile = window.innerWidth < 768;
      gsap.fromTo(
        split.chars,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: 'steps(1)',
          stagger: 0.05,
          duration: 0.8,
          scrollTrigger: { trigger: text, start: mobile ? 'top bottom' : 'top center', end: mobile ? 'bottom center' : 'bottom+=200% center', scrub: 0.5 },
        },
      );

      /* Draggable strip */
      const slider = section.querySelector<HTMLElement>('.js-team-slider')!;
      const strip = section.querySelector<HTMLElement>('.js-team-dragable')!;
      gsap.set(slider, { xPercent: 70 });
      gsap.to(slider, { xPercent: 35, duration: 2, scrollTrigger: { trigger: slider, start: 'top bottom', end: 'bottom+=10% center', toggleActions: 'play none none reverse' } });
      const minX = slider.clientWidth - strip.scrollWidth - 0.35 * slider.clientWidth;
      Draggable.create(strip, { type: 'x', bounds: { minX, maxX: 0 }, inertia: true, edgeResistance: 0.75, minimumMovement: 0 });

      // Arrow keys move the same axis, so the strip is not pointer-only.
      const step = 180;
      strip.addEventListener('keydown', (e) => {
        const dir = e.key === 'ArrowRight' ? -1 : e.key === 'ArrowLeft' ? 1 : 0;
        if (!dir) return;
        e.preventDefault();
        const next = Math.max(minX, Math.min(0, (Number(gsap.getProperty(strip, 'x')) || 0) + dir * step));
        gsap.to(strip, { x: next, duration: 0.4, ease: 'power2.out' });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const [w1, w2, w3] = identity.title;

  return (
    <section className="team" ref={root}>
      <div className="container team__container">
        <div className="team__header">
          <div className="title__box">
            <h2 className="team__title title title-js" aria-label={identity.title.join(' ')}>
              <span>{w1}</span>
              <span className="title--combined">
                {w2.slice(0, 1)}
                <span className="title__o-slot">
                  <span className="title--hidden">o</span>
                  <span className="title__o" aria-hidden />
                </span>
                {w2.slice(2)}
              </span>
              <span>{w3}</span>
            </h2>
            <div className="curtains" aria-hidden>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="team__description subtitle">
            {identity.words.map((w) => (
              <span className="team__word team-word-js" key={w}>
                {w}
              </span>
            ))}
          </div>
        </div>
        <div className="team__wrapper">
          <div className="team__text">
            <p className="text js-team-text">{identity.text}</p>
          </div>
          <div className="team__slider">
            <div className="js-team-slider">
              {/* A focusable scroll region: tabindex + role + name is the
                  accessible pattern for a pannable strip. */}
              <div
                className="team__slider-wrapper js-team-dragable"
                tabIndex={0}
                role="group"
                aria-label="Experience, education and patents — drag or use the arrow keys"
              >
                {identity.slides.map((s, i) => (
                  <div className="team__slide" key={`${s.title}-${i}`}>
                    <span className="team__number text-small">[{i + 1}]</span>
                    <div className={`team__card team__card--${s.kind}`}>
                      <span className="team__card-kind">{s.kind === 'edu' ? 'education' : s.kind}</span>
                      <div>
                        <div className="team__card-title">{s.title}</div>
                        <div className="team__card-sub">{s.sub}</div>
                        <div className="team__card-meta">{s.meta}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
