import { useEffect, useState, type FormEvent } from 'react';
import { person } from '../data';
import { onResumeOpen } from '../lib/resume';
import Dialog from './Dialog';

const blank = { name: '', company: '', email: '' };

/** A résumé request. It opens a filled-in mail, since there is no backend. */
export default function ResumeDialog() {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState(blank);
  const [sent, setSent] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(
    () =>
      onResumeOpen(() => {
        setV(blank);
        setSent(false);
        setShowError(false);
        setOpen(true);
      }),
    [],
  );

  const ready = v.name.trim() && v.company.trim() && /^\S+@\S+\.\S+$/.test(v.email);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV((s) => ({ ...s, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!ready) {
      setShowError(true);
      return;
    }
    const subject = encodeURIComponent(`Résumé request from ${v.name} (${v.company})`);
    const body = encodeURIComponent(
      `Hi ${person.name.split(' ')[0]},\n\nI'm ${v.name} from ${v.company}. Could you send me your résumé?\n\nReply to: ${v.email}`,
    );
    window.open(`mailto:${person.email}?subject=${subject}&body=${body}`, '_self');
    setSent(true);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} label="Request résumé">
      <h2 className="dialog__title">Request résumé</h2>
      {sent ? (
        <p className="dialog__text" role="status">
          Your mail app should be open with the request filled in. Send it from there and I will reply with my résumé.
        </p>
      ) : (
        <form className="form" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="r-name">Name</label>
            <input id="r-name" autoComplete="name" value={v.name} onChange={set('name')} />
          </div>
          <div className="field">
            <label htmlFor="r-company">Company</label>
            <input id="r-company" autoComplete="organization" value={v.company} onChange={set('company')} />
          </div>
          <div className="field">
            <label htmlFor="r-email">Email</label>
            <input id="r-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} />
          </div>
          <div className="form__foot">
            <button className="btn btn--primary" type="submit">
              Open in mail app
            </button>
            <p role="status">{showError ? 'Add your name, company and a valid email' : 'Nothing is sent from this page'}</p>
          </div>
        </form>
      )}
    </Dialog>
  );
}
