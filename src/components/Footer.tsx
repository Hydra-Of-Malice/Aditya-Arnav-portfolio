import { GITHUB, person } from '../data';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__bar">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <a className="src" href={`${GITHUB}/Aditya-Arnav-portfolio`} target="_blank" rel="noreferrer" aria-label="Source code of this site">
          [repo]
        </a>
      </div>
    </footer>
  );
}
