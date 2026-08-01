import { portfolioData } from '../data';
import * as Icon from './Icons';
import Section from './Section';

export function Education() {
  return (
    <Section id="education" eyebrow="06 / Education" title="Where I studied">
      <ol className="trail space-y-3">
        {portfolioData.education.map((edu, i) => (
          <li key={edu.institution} style={{ '--i': i } as React.CSSProperties}>
            <article className="card flex gap-4 p-4 transition-colors hover:border-accent-line sm:p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-elev-hi text-dim">
                <Icon.Cap className="h-4.5 w-4.5" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-[0.9375rem] font-semibold">{edu.institution}</h3>
                  <span className="meta shrink-0">{edu.period}</span>
                </div>

                <p className="mt-0.5 text-[0.875rem] text-dim">{edu.degree}</p>

                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="badge badge-accent">{edu.gpa}</span>
                </p>

                {'note' in edu && edu.note && (
                  <p className="mt-3 text-[0.875rem] leading-relaxed">{edu.note}</p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Education;
