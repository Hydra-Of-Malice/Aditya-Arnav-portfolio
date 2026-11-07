import { useState, type FormEvent } from 'react';
import { person } from '../data';
import { openResume } from '../lib/resume';
import { Github, Leetcode, Linkedin } from './Icons';
import Section from './Section';

const socials = [
  { label: 'LinkedIn', href: person.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: person.github, Icon: Github },
  { label: 'LeetCode', href: person.leetcode, Icon: Leetcode },
];

const validEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);

/** There is no backend. Sending opens the visitor's mail app, filled in. */
export default function Contact() {
  const [v, setV] = useState({ name: '', company: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const invalid = { name: !v.name.trim(), email: !validEmail(v.email) };
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (invalid.name || invalid.email) {
      setShowErrors(true);
      return;
    }
    const from = v.company.trim() ? `${v.name} (${v.company})` : v.name;
    const subject = encodeURIComponent(`Message from ${from}`);
    const body = encodeURIComponent(
      [`Hi ${person.name.split(' ')[0]},`, '', v.message || '(no message yet)', '', from, `Reply to: ${v.email}`].join('\n'),
    );
    window.open(`mailto:${person.email}?subject=${subject}&body=${body}`, '_self');
    setSent(true);
  };

  return (
    <Section id="contact" title="Contact" intro="Working on LLMs, computer vision or backend systems? I would like to compare notes.">
      <div className="contact">
        <dl className="ledger ledger--contact">
          <div className="ledger__row">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </dd>
          </div>
          <div className="ledger__row">
            <dt>Based in</dt>
            <dd>{person.location}</dd>
          </div>
          <div className="ledger__row">
            <dt>Timezone</dt>
            <dd>{person.timezone}</dd>
          </div>
          <div className="ledger__row">
            <dt>Elsewhere</dt>
            <dd className="socials">
              {socials.map(({ label, href, Icon }) => (
                <a href={href} key={label} target="_blank" rel="noreferrer">
                  <Icon />
                  {label}
                </a>
              ))}
            </dd>
          </div>
          <div className="ledger__row">
            <dt>Résumé</dt>
            <dd>
              <button className="text-link" type="button" onClick={openResume}>
                Request a copy
              </button>
            </dd>
          </div>
        </dl>

        {sent ? (
          <div className="form__sent" role="status">
            <p className="form__sent-title">Your mail app should be open</p>
            <p>The message is filled in. Send it from there and I will reply.</p>
            <button className="text-link" type="button" onClick={() => setSent(false)}>
              Write another
            </button>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <div className="form__row">
              <div className="field">
                <label htmlFor="c-name">Name</label>
                <input
                  id="c-name"
                  autoComplete="name"
                  value={v.name}
                  onChange={set('name')}
                  aria-invalid={(showErrors && invalid.name) || undefined}
                />
              </div>
              <div className="field">
                <label htmlFor="c-company">Company (optional)</label>
                <input id="c-company" autoComplete="organization" value={v.company} onChange={set('company')} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input
                id="c-email"
                type="email"
                autoComplete="email"
                value={v.email}
                onChange={set('email')}
                aria-invalid={(showErrors && invalid.email) || undefined}
              />
            </div>
            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" rows={5} maxLength={1000} value={v.message} onChange={set('message')} />
            </div>
            <div className="form__foot">
              <button className="btn btn--primary" type="submit">
                Open in mail app
              </button>
              <p role="status">{showErrors && (invalid.name || invalid.email) ? 'Add your name and a valid email' : 'Nothing is sent from this page'}</p>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
