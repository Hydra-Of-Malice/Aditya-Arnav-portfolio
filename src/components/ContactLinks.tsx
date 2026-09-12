import { contact, person } from '../site';
import { ContactBracket, Github, Leetcode, Linkedin, Mail } from './Icons';
import ResumeButton from './ResumeButton';

const socialIcon = { linkedin: Linkedin, github: Github, leetcode: Leetcode, mail: Mail } as const;

type Props = {
  inverse?: boolean;
  short?: boolean;
  className?: string;
};

/** Address / email / socials block used by the footer, the mobile menu and the contact section. */
export default function ContactLinks({ inverse, short, className = '' }: Props) {
  return (
    <div
      className={`contact-links ${inverse ? 'contact-links--inverse' : ''} ${short ? 'contact-links--short' : ''} ${className}`}
    >
      <ContactBracket className="contact-links__icon js-footer-icon-top" />
      <div className="contact-links__wrapper">
        <div className="contact-links__text text-small contact-links__text--address">
          <span>based in:</span>
          <span>
            {contact.location.map((l) => (
              <span key={l}>
                {l}
                <br />
              </span>
            ))}
          </span>
        </div>
        <div className="contact-links__dot" />
        <div className="contact-links__text text-small">
          <span>timezone:</span>
          <span>{contact.timezone}</span>
        </div>
        <div className="contact-links__dot" />
        <div className="contact-links__text text-small">
          <span>email:</span>
          <a className="contact-link cursor__trigger" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
          <ResumeButton label={person.resumeCta} light={inverse} />
        </div>
        <div className="contact-links__dot" />
        <div className="contact-links__text text-small">
          <span>Social:</span>
          <ul className="socials">
            {contact.socials.map((s) => {
              const Icon = socialIcon[s.name as keyof typeof socialIcon];
              return (
                <li className="socials__item" key={s.name}>
                  <a
                    aria-label={s.label}
                    className="socials__link cursor__trigger"
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <ContactBracket className="contact-links__icon contact-links__icon-bottom js-footer-icon-bottom" />
    </div>
  );
}
