import { useEffect, useRef, useState, type FormEvent } from 'react';
import { gsap } from '../lib/gsap';
import { onResumePopupOpen } from '../lib/popup';
import { setBackgroundInert } from '../lib/inert';
import { lockScroll, unlockScroll } from '../lib/smoothScroll';
import { person } from '../site';

type Field = { id: string; name: string; label: string; type: 'text' | 'email' };

const fields: Field[] = [
  { id: 'name', name: 'name', label: `*Hello ${person.name.split(' ')[0]}, my name is...`, type: 'text' },
  { id: 'company-name', name: 'company', label: '*My company name is...', type: 'text' },
  { id: 'capabilities-email', name: 'email', label: '*My Email:', type: 'email' },
];

/**
 * The reference's "Capabilities Deck" popup, repurposed as a résumé request.
 * Submitting opens a pre-filled mail to the portfolio owner and shows the
 * success state; there's no backend.
 */
export default function ResumePopup() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  const ready = fields.every((f) => (values[f.name] || '').trim().length > 0) && /^\S+@\S+\.\S+$/.test(values.email || '');

  useEffect(
    () =>
      onResumePopupOpen(() => {
        // Remember what opened us so focus can go back there on close.
        opener.current = document.activeElement as HTMLElement | null;
        // Start from a blank form every time, including after a success.
        setDone(false);
        setValues({});
        setOpen(true);
      }),
    [],
  );

  useEffect(() => {
    const popup = root.current!;
    const content = popup.querySelector<HTMLElement>('.popup-capabilities__content')!;
    const first = popup.querySelector<HTMLInputElement>('.form-contact__input');
    gsap.killTweensOf([popup, content]);
    if (open) {
      wasOpen.current = true;
      lockScroll();
      setBackgroundInert(true);
      document.body.classList.add('is-popup-open');
      const intro = gsap
        .timeline({ defaults: { duration: 0.2 } })
        .to(popup, { autoAlpha: 1 })
        // Opacity only on the card: with autoAlpha it sat at visibility:
        // hidden for the first quarter second, and the input could not take
        // focus, so focus never moved into the dialog.
        .fromTo(content, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power3.out' }, 0.25)
        .call(() => first?.focus({ preventScroll: true }), undefined, 0.2);
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      document.addEventListener('keydown', onKey);
      return () => {
        intro.kill();
        document.removeEventListener('keydown', onKey);
      };
    }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    unlockScroll();
    setBackgroundInert(false);
    document.body.classList.remove('is-popup-open');
    gsap.to(popup, { autoAlpha: 0 });
    (document.activeElement as HTMLElement | null)?.blur?.();
    opener.current?.focus?.({ preventScroll: true });
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    const subject = encodeURIComponent(`Résumé request from ${values.name} (${values.company})`);
    const body = encodeURIComponent(
      `Hi ${person.name.split(' ')[0]},\n\nI'm ${values.name} from ${values.company}. Could you send me your résumé?\n\nReply to: ${values.email}`,
    );
    window.open(`mailto:${person.email}?subject=${subject}&body=${body}`, '_self');
    setDone(true);
  };

  return (
    <div
      // `open` must be part of the rendered className: adding it imperatively
      // meant the re-render on submit (for `--success`) wiped it, leaving the
      // dialog visible but unclickable and the page locked behind it.
      className={`popup-capabilities ${open ? 'open' : ''} ${done ? '--success' : ''}`}
      ref={root}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label="Request my résumé"
      aria-hidden={!open}
    >
      <div
        className="popup-capabilities__body"
        role="presentation"
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <div className="popup-capabilities__content">
          <button
            className="popup-capabilities__close cursor__trigger"
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
          />

          <div className="js-block-form">
            <h2 className="popup-capabilities__title" aria-label="Résumé deck">
              <span className="popup-capabilities__title-normal">Résumé</span>
              <span className="popup-capabilities__title-italic">Deck</span>
            </h2>
            <form className="form form-contact capabilities-form-js" onSubmit={submit} noValidate>
              {fields.map((f) => {
                const v = values[f.name] || '';
                return (
                  <div className={`form-contact__item js-form-item ${v.trim() ? 'active' : ''}`} key={f.id}>
                    <label className="form-contact__label js-form-item-label" htmlFor={f.id}>
                      {f.label}
                    </label>
                    <input
                      autoComplete="off"
                      className="form-contact__input js-form-item-input"
                      id={f.id}
                      name={f.name}
                      required
                      type={f.type}
                      value={v}
                      onChange={(e) => setValues((s) => ({ ...s, [f.name]: e.target.value }))}
                    />
                  </div>
                );
              })}
              <div className="form-contact__footer">
                <button className={`form-contact__btn js-form-contact-cta ${ready ? 'is-form-ready' : ''}`} type="submit">
                  <span className="btn-title">Submit</span>
                </button>
              </div>
            </form>
            <div className="success-message-block">
              <div className="success-message-block__body">
                <h2 className="success-message-block__title">Great!</h2>
                <p className="success-message-block__description">
                  Your mail app should be open with the request ready — send it and my résumé will
                  come straight back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
