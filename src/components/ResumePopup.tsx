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

  const ready = fields.every((f) => (values[f.name] || '').trim().length > 0) && /^\S+@\S+\.\S+$/.test(values.email || '');

  useEffect(
    () =>
      onResumePopupOpen(() => {
        // Remember what opened us so focus can go back there on close.
        opener.current = document.activeElement as HTMLElement | null;
        setOpen(true);
      }),
    [],
  );

  useEffect(() => {
    const popup = root.current!;
    const content = popup.querySelector<HTMLElement>('.popup-capabilities__content')!;
    const first = popup.querySelector<HTMLInputElement>('.form-contact__input');
    if (open) {
      lockScroll();
      setBackgroundInert(true);
      document.body.classList.add('is-popup-open');
      popup.classList.add('open');
      gsap
        .timeline({ defaults: { duration: 0.2 } })
        .to(popup, { autoAlpha: 1 })
        .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5, ease: 'power3.out' }, '<+0.25');
      setTimeout(() => first?.focus(), 100);
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
    if (popup.classList.contains('open')) {
      unlockScroll();
      setBackgroundInert(false);
      // Reset so the form is usable again next time it is opened.
      setTimeout(() => {
        setDone(false);
        setValues({});
      }, 400);
      popup.classList.remove('open');
      document.body.classList.remove('is-popup-open');
      gsap.to(popup, { autoAlpha: 0 });
      first?.blur();
      opener.current?.focus?.();
    }
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
      className={`popup-capabilities ${done ? '--success' : ''}`}
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
