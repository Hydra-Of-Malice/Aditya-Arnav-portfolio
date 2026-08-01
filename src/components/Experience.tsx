import { portfolioData } from '../data';
import Section from './Section';

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 / Experience"
      title="Where I've worked"
      intro="Three internships, all of them shipping to real users."
    >
      {/* A rail runs the height of the list; each entry hangs a node off it. */}
      <ol className="trail relative space-y-4 border-l border-line pl-6 md:pl-8">
        {portfolioData.experience.map((exp, i) => (
          <li key={exp.company} style={{ '--i': i } as React.CSSProperties} className="relative">
            <span
              aria-hidden
              className={`absolute -left-[1.9rem] top-6 h-2 w-2 rounded-full ring-4 ring-[var(--bg)] md:-left-[2.4rem] ${
                exp.tag ? 'bg-accent' : 'bg-line'
              }`}
            />

            <article className="card p-4 transition-colors hover:border-accent-line sm:p-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="text-base font-semibold">
                  {exp.company}
                  {exp.tag && <span className="badge badge-accent ml-2 align-middle">{exp.tag}</span>}
                </h3>
                <span className="meta shrink-0">{exp.period}</span>
              </div>

              <p className="mt-0.5 text-[0.875rem] text-accent">{exp.role}</p>

              <ul className="mt-3.5 space-y-2">
                {exp.descriptionPoints.map((point) => (
                  <li key={point} className="flex gap-2.5 text-[0.875rem] leading-relaxed">
                    <span aria-hidden className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-faint" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {exp.stack.map((tech) => (
                  <li key={tech} className="badge">
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Experience;
