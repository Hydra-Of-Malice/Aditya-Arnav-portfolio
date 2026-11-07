import { patents } from '../data';
import Section from './Section';
import Sources from './Sources';

export default function Patents() {
  return (
    <Section id="patents" title="Patent filings" intro="Four filings across AI orchestration, audit, crowd flow and vehicle security">
      <ol className="ledger">
        {patents.map((p) => (
          <li className="ledger__row ledger__row--patent" key={p.title}>
            <div className="ledger__meta">
              <span className="ledger__status">{p.status}</span>
              {p.reference && <span>{p.reference}</span>}
            </div>
            <div>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              {p.people && <p className="ledger__people">{p.people}</p>}
            </div>
            <span className="ledger__end">
              <Sources items={p.sources} about={p.title} />
            </span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
