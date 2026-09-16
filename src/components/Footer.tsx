import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/device';
import { contact, footer } from '../site';

/** A cheap 2D canvas of drifting light, standing in for the footer video. */
function FooterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    // Reduced motion gets a single painted frame instead of a running loop.
    const still = prefersReducedMotion();
    let raf = 0;
    let t = 0;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth / 3));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight / 3));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const blobs = [
      { c: '#00fb96', r: 0.5, s: 0.6 },
      { c: '#ffffff', r: 0.35, s: -0.4 },
      { c: '#8a8a8a', r: 0.6, s: 0.25 },
    ];
    const draw = () => {
      t += 0.004;
      const { width: w, height: h } = canvas;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      blobs.forEach((b, i) => {
        const x = w * (0.5 + 0.4 * Math.cos(t * b.s * 2 + i));
        const y = h * (0.5 + 0.4 * Math.sin(t * b.s * 3 + i * 2));
        const r = Math.max(w, h) * b.r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, b.c);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.globalAlpha = 0.55;
        ctx.fillRect(0, 0, w, h);
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (!still) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} aria-hidden />;
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const ctx = gsap.context(() => {
      const title = el.querySelector<HTMLElement>('.title-js')!;
      const curtains = title.nextElementSibling!.querySelectorAll('span');
      const st = { trigger: title, start: 'top-=5% bottom', end: 'bottom center', toggleActions: 'play none none reverse' };
      gsap.to(title, { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power1.inOut', delay: 0.3, scrollTrigger: st });
      curtains.forEach((c) => gsap.to(c, { scaleX: 0, duration: 1.2, ease: 'power1.inOut', delay: 0.3, scrollTrigger: st }));
    }, el);
    return () => ctx.revert();
  }, []);

  const year = String(new Date().getFullYear()).slice(-2);

  return (
    <footer className="footer" ref={root}>
      <div className="title__box">
        <h2 className="title footer__title title-js" aria-label={footer.title.join(' ')}>
          <span>{footer.title[0]}</span>
          <span>{footer.title[1]}</span>
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
      <div className="footer__bar container">
        <div className="footer__meta">
          <span className="footer__numbers">
            {footer.years}
            {year}
          </span>
          <span className="footer__copyright">{footer.copyright}</span>
        </div>
        <ul className="footer__links">
          {contact.socials.map((s) => (
            <li key={s.name}>
              <a className="footer__link cursor__trigger" href={s.href} target={s.name === 'mail' ? undefined : '_blank'} rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a className="footer__link cursor__trigger" href={footer.link.href} target="_blank" rel="noreferrer">
              Source code
            </a>
          </li>
        </ul>
      </div>
      <div className="footer__media">
        <FooterCanvas />
      </div>
    </footer>
  );
}
