import { approach, results, stats } from '../data';
import Section from './Section';
import Sources from './Sources';

export default function Results() {
  return (
    <>
      <section className="approach" aria-label="How I work">
        <div className="wrap approach__grid">
          <p className="approach__lead">{approach.lead}</p>
          <ul className="approach__points">
            {approach.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <Section id="results" title="Results">
        <dl className="stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <ol className="ledger">
          {results.map((r) => (
            <li className="ledger__row ledger__row--result" key={r.event}>
              <span className="ledger__date">{r.date}</span>
              <span className="ledger__name">{r.placing}</span>
              <span className="ledger__text">
                {r.event}, with {r.project}
              </span>
              <span className="ledger__end">
                <Sources items={r.sources} about={`${r.placing}, ${r.event}`} />
              </span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
