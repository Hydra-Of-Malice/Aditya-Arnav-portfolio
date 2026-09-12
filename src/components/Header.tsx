import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { waitForLoaderComplete, waitForLoaderExitOnce } from '../lib/loader';
import { scrollToHash } from '../lib/smoothScroll';
import { footer, nav, person } from '../site';
import ContactLinks from './ContactLinks';
import ResumeButton from './ResumeButton';

/**
 * Fixed header in difference blend mode, so it reads white over the black
 * hero and black over the white sections. Past 80px a white bar slides in
 * behind it. On phones the nav becomes a full-screen black menu.
 */
export default function Header() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

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

    const onScroll = () => header.classList.toggle('header-animation', window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('is-mob-menu-open', open);
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

        <ResumeButton label={person.resumeCta} className="header__cta" />

        <nav className="header__navigation nav js-mobile-menu" data-lenis-prevent>
          <div className="nav__container">
            <ul className="nav__list">
              <li className="nav__item nav-item-js">
                {nav.slice(0, 2).map((n) => (
                  <a
                    key={n.href}
                    className="nav__link cursor__trigger js-nav-cursor-hover"
                    href={n.href}
                    onClick={(e) => go(e, n.href)}
                  >
                    {n.label}
                  </a>
                ))}
              </li>
              {nav.slice(2).map((n) => (
                <li className="nav__item nav-item-js" key={n.href}>
                  <a
                    className={`nav__link cursor__trigger js-nav-cursor-hover ${n.contact ? 'nav__link--contact' : ''}`}
                    href={n.href}
                    onClick={(e) => go(e, n.href)}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="visible-mobile">
              <ContactLinks inverse short />
            </div>
            <div className="visible-mobile nav__bottom">
              <a className="text-small" href={footer.link.href} target="_blank" rel="noreferrer">
                {footer.link.label}
              </a>
            </div>
          </div>
        </nav>

        <button
          className="header__btn-mobile visible-mobile"
          id="btn-mobile"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="header__btn-line" />
          <span className="header__btn-line" />
          <span className="header__btn-line" />
        </button>
      </div>
    </header>
  );
}
