import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { waitForLoaderComplete, waitForLoaderExitOnce } from '../lib/loader';
import { scrollToHash } from '../lib/smoothScroll';
import { contact, nav, person } from '../site';
import ResumeButton from './ResumeButton';

/**
 * Fixed three-column bar: mark, section links, résumé button.
 *
 * Over the black hero it sits in difference blend, so it reads white there and
 * black over the white sections. Past 80px a white bar slides in behind it,
 * and it tucks away while scrolling down and returns on the way back up. The
 * link for the section in view carries a green dot. On phones the links
 * become a full-screen black menu.
 */
export default function Header() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const header = root.current!;
    let cancelled = false;

    waitForLoaderExitOnce().then(() => {
      if (cancelled) return;
      gsap.to(header, { opacity: 1, duration: 0, delay: 1 });
    });
    waitForLoaderComplete().then(() => {
      if (cancelled) return;
      const items = header.querySelectorAll('.nav-item-js, #logo, .header__cta');
      gsap.fromTo(items, { yPercent: -120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out', delay: 0.3 });
    });

    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      header.classList.toggle('header-animation', y > 80);

      // Small deltas are ignored so a trackpad's jitter doesn't flicker the bar.
      if (Math.abs(y - lastY) > 6) {
        const menuOpen = document.body.classList.contains('is-mob-menu-open');
        header.classList.toggle('header--tucked', y > lastY && y > 400 && !menuOpen);
        lastY = y;
      }

      // Sections mount after the loader and remount on a device switch, so
      // they are looked up each time rather than cached.
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { href } of nav) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= line) current = href;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-mob-menu-open', open);
    if (open) root.current!.classList.remove('header--tucked');
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // Let the menu start closing before the page moves.
    setTimeout(() => scrollToHash(href), open ? 350 : 0);
  };

  return (
    <header className="header header-inverse js-header" id="header" ref={root}>
      <div className="header__container">
        <a className="header__logo js-nav-link-mobile" href="#top" id="logo" onClick={(e) => go(e, '#top')}>
          <span className="logo">{person.logo}</span>
          <span className="logo__shape" aria-hidden />
        </a>

        <nav className="header__navigation nav js-mobile-menu" aria-label="Sections" data-lenis-prevent>
          <div className="nav__container">
            <ul className="nav__list">
              {nav.map((n, i) => (
                <li className="nav__item nav-item-js" key={n.href} style={{ '--i': i } as React.CSSProperties}>
                  <a
                    className="nav__link cursor__trigger js-nav-cursor-hover"
                    href={n.href}
                    aria-label={n.label}
                    aria-current={active === n.href ? 'location' : undefined}
                    onClick={(e) => go(e, n.href)}
                  >
                    <span className="nav__dot" aria-hidden />
                    <span className="nav__label">
                      <span className="nav__label-text">{n.label}</span>
                      <span className="nav__label-text" aria-hidden>
                        {n.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="nav__footer visible-mobile">
              <a className="nav__email" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <ul className="nav__socials">
                {contact.socials
                  .filter((s) => s.name !== 'mail')
                  .map((s) => (
                    <li key={s.name}>
                      <a href={s.href} target="_blank" rel="noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
              <ResumeButton label={person.resumeCta} light />
            </div>
          </div>
        </nav>

        <ResumeButton label={person.resumeCta} className="header__cta" />

        <button
          className="header__btn-mobile visible-mobile"
          id="btn-mobile"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="header__btn-line" />
          <span className="header__btn-line" />
        </button>
      </div>
    </header>
  );
}
