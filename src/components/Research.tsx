import { portfolioData } from '../data';
import * as Icon from './Icons';
import Section from './Section';

export function Research() {
  return (
    <Section
      id="research"
      eyebrow="04 / Patents"
      title="Filed & published"
      intro="Two patents through the VIT IPR cell."
    >
      <ol className="trail grid gap-4 sm:grid-cols-2">
        {portfolioData.research.map((item, i) => (
          <li key={item.title} style={{ '--i': i } as React.CSSProperties}>
            <article className="card flex h-full flex-col p-4 transition-colors hover:border-accent-line sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent-line bg-accent-soft text-accent">
                  <Icon.Award className="h-4 w-4" />
                </span>
                <span className="badge">{item.status}</span>
              </div>

              <h3 className="mt-3.5 text-[0.9375rem] font-semibold leading-snug">{item.title}</h3>
              <p className="mt-1 text-[0.8125rem] text-accent">{item.role}</p>
              <p className="mt-3 text-[0.875rem] leading-relaxed">{item.description}</p>
              <p className="meta mt-auto pt-4">{item.reference}</p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Research;
