import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { setBackgroundInert } from '../lib/inert';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';
import type { Case } from '../site';
import CaseArt from './CaseArt';
import Cta from './Cta';

type Props = {
  c: Case;
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen black sheet that slides up over the page. Left column holds
 * the write-up and tags, right column a gallery whose items are unveiled by
 * two curtains once the sheet has settled.
 */
export default function CasePopup({ c, open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const popup = root.current!;
    const curtains = popup.querySelectorAll('.js-popup-curtain');
    const close = popup.querySelector('.js-close-popup-btn');
    gsap.set(popup, { yPercent: 100 });
    gsap.set(curtains, { scaleY: 1 });
    gsap.set(close, { opacity: 0 });
    // Unmounted while still open (the page remounts its sections when the
    // layout flips between desktop and touch): hand the page back.
    return () => {
      if (!wasOpen.current) return;
      wasOpen.current = false;
      unlockScroll();
      setBackgroundInert(false);
      document.body.classList.remove('is-popup-open');
    };
  }, []);

  useEffect(() => {
    const popup = root.current!;
    const curtains = popup.querySelectorAll('.js-popup-curtain');
    const close = popup.querySelector<HTMLElement>('.js-close-popup-btn');
    const scroller = popup.querySelector<HTMLElement>('.js-popup-scroll-content');
    gsap.killTweensOf([popup, close, ...curtains]);

    if (open) {
      // Guarded so StrictMode's double-run does not stop Lenis / record the
      // scroll position twice.
      if (!wasOpen.current) {
        wasOpen.current = true;
        opener.current = document.activeElement as HTMLElement | null;
        lockScroll();
        setBackgroundInert(true);
      }
      document.body.classList.add('is-popup-open');
      popup.classList.add('active');
      if (scroller) scroller.scrollTop = 0;
      if (popup.scrollTop) popup.scrollTop = 0;
      // Move focus into the sheet, otherwise Tab continues through the page
      // behind it.
      const focusT = setTimeout(() => close?.focus({ preventScroll: true }), 60);
      gsap.to(popup, { yPercent: 0, duration: 1, ease: 'popup' });
      gsap.to(curtains, { delay: 1, scaleY: 0, duration: 1 });
      gsap.to(close, { opacity: 1, delay: 1.5, duration: 0.8 });
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', onKey);
      return () => {
        clearTimeout(focusT);
        document.removeEventListener('keydown', onKey);
      };
    }

    if (!wasOpen.current) return;
    wasOpen.current = false;
    unlockScroll();
    setBackgroundInert(false);
    opener.current?.focus?.({ preventScroll: true });
    gsap.to(close, { opacity: 0, duration: 0.3 });
    gsap.to(popup, { yPercent: 100, duration: 0.75, ease: 'popup' });
    gsap.to(curtains, { scaleY: 1, delay: 0.75, duration: 0.75 });
    const t = setTimeout(() => {
      document.body.classList.remove('is-popup-open');
      popup.classList.remove('active');
    }, 1100);
    return () => clearTimeout(t);
  }, [open, onClose]);

  return (
    <div
      className="popup js-popup"
      data-case={c.id}
      data-lenis-prevent
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${c.name} — case study`}
      aria-hidden={!open}
    >
      <div className="popup-scroll-container js-popup-scroll-container">
        <div className="popup__top">
          <button type="button" className="popup__close-btn js-close-popup-btn cursor__trigger" aria-label="Close" onClick={onClose} />
        </div>
        <div className="container popup__container">
          <div className="popup__header js-popup-header">
            <div className="popup__description">
              <div className="popup__title title-secondary">{c.name}</div>
              <div className="popup__text text">
                {c.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {c.links.length > 0 && (
                <div className="popup__links">
                  {c.links.map((l) => (
                    <a href={l.href} target="_blank" rel="noreferrer" className="cursor__trigger" key={l.href}>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="popup__tags">
              <ul className="tags__list">
                {c.tags.map((t) => (
                  <li className="tags__item text-small" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="popup__button js-popup-link">
            <Cta popup href="#contact" text="Let's talk" onNavigate={onClose} />
          </div>
          <div className="popup__images">
            <div className="popup-scroll-content js-popup-scroll-content">
              <ul className="gallery">
                {[1, 2, 3].map((v) => (
                  <li className="gallery__item" key={v}>
                    <div className="gallery__item--cover" aria-hidden>
                      <span className="js-popup-curtain" />
                      <span className="js-popup-curtain" />
                    </div>
                    <CaseArt c={c} variant={v} ratio="wide" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
