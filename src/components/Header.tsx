import { useState } from 'react';
import { person } from '../data';
import { openResume } from '../lib/resume';
import { Close, Menu } from './Icons';

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Patents', href: '#patents' },
  { label: 'Posts', href: '#posts' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="wrap header__bar">
        <a className="logo" href="#top">
          {person.name}
        </a>

        <nav className={`nav ${open ? 'is-open' : ''}`} id="site-nav" aria-label="Primary">
          {links.map((l) => (
            <a href={l.href} key={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button className="btn btn--small btn--primary" type="button" onClick={openResume}>
            Request résumé
          </button>
          <button
            className="header__menu"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}
