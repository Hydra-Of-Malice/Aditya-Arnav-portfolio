import { portfolioData } from '../data';
import Section from './Section';

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="05 / Stack"
      title="What I work with"
      intro="Roughly in order of how often I reach for it."
    >
      <dl className="trail space-y-5">
        {Object.entries(portfolioData.skills).map(([category, items], i) => (
          <div
            key={category}
            style={{ '--i': i } as React.CSSProperties}
            className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
          >
            <dt className="label pt-1">{category}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <li key={item} className="badge hover:border-accent-line hover:text-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export default Skills;
