import { alsoDid, education, experience } from '../data';
import Section from './Section';
import Sources from './Sources';

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="ledger">
        {experience.map((e) => (
          <li className="ledger__row ledger__row--role" key={`${e.company}-${e.role}`}>
            <div className="ledger__meta">
              <span>{e.period}</span>
              {e.place && <span>{e.place}</span>}
            </div>
            <div>
              <h3>
                {e.role}
                <span>{e.company}</span>
              </h3>
              <ul className="ledger__points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="experience__more">
        <div>
          <h3 className="subhead">Education</h3>
          <ul className="ledger">
            {education.map((e) => (
              <li className="ledger__row ledger__row--school" key={e.school}>
                <span className="ledger__date">{e.period}</span>
                <span className="ledger__text">
                  <span className="ledger__name">{e.school}</span>
                  {e.detail}
                </span>
                <span className="ledger__end ledger__date">{e.score}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="subhead">Beyond the code</h3>
          <ul className="ledger">
            {alsoDid.map((a) => (
              <li className="ledger__row ledger__row--also" key={a.text}>
                <span className="ledger__text">{a.text}</span>
                <span className="ledger__end">
                  <Sources items={a.sources} about={a.text} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
