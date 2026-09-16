import { contact, person } from '../site';
import ResumeButton from './ResumeButton';

type Props = {
  className?: string;
};

/** Where, when and how to reach me — the column beside the contact form. */
export default function ContactLinks({ className = '' }: Props) {
  return (
    <dl className={`contact-links ${className}`}>
      <div className="contact-links__row">
        <dt className="contact-links__label">Based in</dt>
        <dd className="contact-links__value">{contact.location.join(' ')}</dd>
      </div>
      <div className="contact-links__row">
        <dt className="contact-links__label">Timezone</dt>
        <dd className="contact-links__value">{contact.timezone}</dd>
      </div>
      <div className="contact-links__row">
        <dt className="contact-links__label">Email</dt>
        <dd className="contact-links__value">
          <a className="contact-link cursor__trigger" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </dd>
      </div>
      <div className="contact-links__row">
        <dt className="contact-links__label">Elsewhere</dt>
        <dd className="contact-links__value contact-links__socials">
          {contact.socials
            .filter((s) => s.name !== 'mail')
            .map((s) => (
              <a className="contact-link cursor__trigger" href={s.href} target="_blank" rel="noreferrer" key={s.name}>
                {s.label}
              </a>
            ))}
        </dd>
      </div>
      <ResumeButton label={person.resumeCta} className="contact-links__cta" />
    </dl>
  );
}
