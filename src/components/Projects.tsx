import { portfolioData, type Project } from '../data';
import * as Icon from './Icons';
import Section from './Section';

// `satisfies` in data.ts keeps the narrow literal type, which drops the
// optional keys; widen once here so `liveLink` is visible.
const projects: Project[] = portfolioData.projects;

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 / Projects"
      title="Things I've built"
      intro="A selection — mostly AI systems with a backend underneath."
    >
      <ol className="trail grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => {
          const href = project.liveLink ?? project.githubLink;

          return (
            <li
              key={project.title}
              style={{ '--i': i } as React.CSSProperties}
              className={project.featured ? 'sm:col-span-2' : undefined}
            >
              <article className="card card-hover group relative flex h-full flex-col p-4 sm:p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-semibold">
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="hover:text-accent">
                        {/* Stretch the link across the card so the whole thing is clickable. */}
                        <span className="absolute inset-0" aria-hidden />
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <span className="meta shrink-0">{project.year}</span>
                </div>

                <p className="mt-1 text-[0.875rem] text-accent">{project.blurb}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed">{project.description}</p>

                {project.metric && (
                  <p className="mt-4 flex items-baseline gap-2">
                    <span className="text-lg font-semibold tracking-tight text-title">
                      {project.metric.value}
                    </span>
                    <span className="meta">{project.metric.label}</span>
                  </p>
                )}

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <li key={tech} className="badge">
                      {tech}
                    </li>
                  ))}
                </ul>

                {href && (
                  <p className="mt-4 flex items-center gap-1.5 pt-0.5 text-[0.8125rem] text-faint transition-colors group-hover:text-accent">
                    {project.liveLink ? 'Visit site' : 'View source'}
                    <Icon.ArrowUpRight className="h-3.5 w-3.5" />
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ol>

      <p className="mt-6">
        <a
          href={portfolioData.personalInfo.github}
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          <Icon.Github className="h-3.5 w-3.5" />
          More on GitHub
        </a>
      </p>
    </Section>
  );
}

export default Projects;
