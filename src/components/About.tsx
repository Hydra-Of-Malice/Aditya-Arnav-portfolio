import { about, stack } from '../data';
import Section from './Section';

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="about">
        <div className="about__text">
          {about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div>
          <p className="about__lead">{stack.intro}</p>
          <dl className="ledger ledger--stack">
            {stack.groups.map((g) => (
              <div className="ledger__row" key={g.label}>
                <dt>{g.label}</dt>
                <dd>{g.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
