import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { contactForm, person } from '../site';
import ContactLinks from './ContactLinks';

/**
 * The reference's "Let's Talk" page, folded into the home page as a section.
 * Submitting opens a pre-filled mail; there is no backend.
 */
export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [v, setV] = useState({ name: '', company: '', site: '', message: '', email: '', phone: '' });
  const [done, setDone] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const ready = v.name.trim() && v.company.trim() && /^\S+@\S+\.\S+$/.test(v.email);

  useEffect(() => {
    const el = root.current!;
    const st = ScrollTrigger.create({ trigger: el, start: 'top 70%', once: true, onEnter: () => el.classList.add('--animate') });
    return () => st.kill();
  }, []);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  const invalid = {
    name: !v.name.trim(),
    company: !v.company.trim(),
    email: !/^\S+@\S+\.\S+$/.test(v.email),
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!ready) {
      setShowErrors(true);
      const first = (['name', 'company', 'email'] as const).find((k) => invalid[k]);
      if (first) root.current?.querySelector<HTMLElement>(`#c-${first === 'company' ? 'company' : first}`)?.focus();
      return;
    }
    const subject = encodeURIComponent(`Project enquiry from ${v.name} (${v.company})`);
    const body = encodeURIComponent(
      [
        `Hi ${person.name.split(' ')[0]},`,
        '',
        v.message || '(no brief yet)',
        '',
        `— ${v.name}, ${v.company}${v.site ? ` (https://${v.site})` : ''}`,
        `Email: ${v.email}${v.phone ? `\nPhone: ${v.phone}` : ''}`,
      ].join('\n'),
    );
    window.open(`mailto:${person.email}?subject=${subject}&body=${body}`, '_self');
    setDone(true);
  };

  const item = (key: keyof typeof v, id: string, label: string, type = 'text') => {
    const bad = showErrors && invalid[key as keyof typeof invalid];
    return (
      <div className={`form-contact__item js-form-item ${v[key].trim() ? 'active' : ''} ${bad ? 'error' : ''}`}>
        <label className="form-contact__label js-form-item-label" htmlFor={id}>
          {label}
        </label>
        <input
          autoComplete="off"
          className="form-contact__input js-form-item-input"
          id={id}
          type={type}
          value={v[key]}
          onChange={set(key)}
          required
          aria-invalid={bad || undefined}
        />
      </div>
    );
  };

  return (
    <div className="block-form" id="contact" ref={root}>
      <div className="block-form__inner">
        <div className="block-form__head">
          <h2 className="block-form__title" aria-label={contactForm.title.join(' ')}>
            <span className="title-secondary">{contactForm.title[0]}</span>
            <span className="title-secondary--cursive">{contactForm.title[1]}</span>
          </h2>
        </div>
        <div className="block-form__content--right">
          <ContactLinks />
        </div>
        <div className={`block-form__content-wrapper js-block-form ${done ? '--success' : ''}`}>
          <form className="block-form__content form-contact js-form-contact" onSubmit={submit} noValidate>
            <div className="form-contact__inner">
              <fieldset className="form-contact__group">
                {item('name', 'c-name', `*Hello ${person.name.split(' ')[0]}, my name is...`)}
                <div
                  className={`form-contact__item form-contact__item--company js-form-item ${v.company.trim() ? 'active' : ''} ${showErrors && invalid.company ? 'error' : ''}`}
                >
                  <label className="form-contact__label js-form-item-label" htmlFor="c-company">
                    *My company name is...
                  </label>
                  <input autoComplete="off" className="form-contact__input js-form-item-input" id="c-company" type="text" value={v.company} onChange={set('company')} />
                  {/* The optional site sits under the company name in the small
                      mono face, so it reads as a footnote rather than a second
                      headline field. */}
                  <div className="company-wrap">
                    <label className="company-label" htmlFor="c-site">
                      Current site https://
                    </label>
                    <input autoComplete="off" className="company-input" id="c-site" type="text" value={v.site} onChange={set('site')} />
                  </div>
                </div>
              </fieldset>
              <fieldset className="form-contact__group">
                <div className={`form-contact__item js-form-item ${v.message.trim() ? 'active' : ''}`}>
                  <label className="form-contact__label js-form-item-label" htmlFor="c-message">
                    Now, a little about my project...
                  </label>
                  <textarea className="js-form-item-input" id="c-message" maxLength={1000} value={v.message} onChange={set('message')} />
                </div>
              </fieldset>
              <fieldset className="form-contact__group">
                <div
                  className={`form-contact__item js-form-item ${v.email.trim() || v.phone.trim() ? 'active' : ''} ${showErrors && invalid.email ? 'error' : ''}`}
                >
                  <div className="form-contact__label">*you can contact me...</div>
                  <div className="form-contact__columns">
                    <div className="form-contact__column">
                      <label className="form-contact__column-label text-small" htmlFor="c-email">
                        My Email:
                      </label>
                      <input autoComplete="off" className="form-contact__input" id="c-email" type="email" value={v.email} onChange={set('email')} />
                    </div>
                    <div className="form-contact__column">
                      <label className="form-contact__column-label text-small" htmlFor="c-phone">
                        My Phone:
                      </label>
                      <input autoComplete="off" className="form-contact__input" id="c-phone" type="tel" placeholder="(000) 000 0000" value={v.phone} onChange={set('phone')} />
                    </div>
                  </div>
                </div>
                <p className="form-contact__note" role="status">
                  {showErrors && !ready
                    ? 'Please add your name, your company and a valid email address.'
                    : 'Submitting opens your mail client with everything pre-filled.'}
                </p>
              </fieldset>
            </div>
            <div className="form-contact__footer">
              <button className={`form-contact__btn js-form-contact-cta ${ready ? 'is-form-ready' : ''}`} type="submit">
                <span className="btn-title">Submit</span>
              </button>
            </div>
          </form>
          <div className="block-form__success">
            <div className="block-form__success-title title">{contactForm.success[0]}</div>
            <div className="block-form__success-subtitle subtitle">{contactForm.success[1]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
