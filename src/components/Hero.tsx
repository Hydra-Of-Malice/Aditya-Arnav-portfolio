import { hero, projects, trace } from '../data';
import { openResume } from '../lib/resume';
import { ArrowRight } from './Icons';
import Sources from './Sources';

const minutes = projects.find((p) => p.id === 'minutes')!;

/** The page's one bright element: a real trace from the Minutes demo. */
function Trace() {
  const flagged = trace.work.filter((w) => w.flagged).length;

  return (
    <figure className="trace">
      <header className="trace__head">
        <span className="trace__name">{trace.project}</span>
        <span className="trace__where">{trace.workspace}</span>
      </header>

      <div className="trace__block">
        <p className="trace__label">Decisions that changed</p>
        <ul className="trace__changes">
          {trace.changes.map((c) => (
            <li key={c.to}>
              <s>{c.from}</s>
              <ArrowRight />
              <span>{c.to}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="trace__block">
        <p className="trace__label">
          Work that depended on them
          <span>
            {flagged} of {trace.work.length} flagged
          </span>
        </p>
        <ul className="trace__work">
          {trace.work.map((w) => (
            <li className={w.flagged ? 'is-flagged' : ''} key={w.title}>
              <span className="trace__title">{w.title}</span>
              <span className="trace__owner">{w.owner}</span>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="trace__foot">
        <p>{trace.caption}</p>
        <Sources items={minutes.sources} about="Minutes" />
      </figcaption>
    </figure>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <h1>{hero.headline}</h1>
          <p>{hero.text}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#work">
              See the work
            </a>
            <button className="btn btn--secondary" type="button" onClick={openResume}>
              Request résumé
            </button>
          </div>
        </div>
        <Trace />
      </div>
    </section>
  );
}
