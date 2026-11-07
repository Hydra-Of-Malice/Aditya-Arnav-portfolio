import { useState } from 'react';
import { moreProjects, projects, type Project } from '../data';
import Dialog from './Dialog';
import Section from './Section';
import Sources from './Sources';

/** Alternating widths, so the grid has a rhythm instead of six equal cards. */
const wide = [true, false, false, true, true, false];

function ProjectCard({ project, isWide, onOpen }: { project: Project; isWide: boolean; onOpen: () => void }) {
  return (
    <article className={`project ${isWide ? 'project--wide' : ''}`}>
      {project.image && (
        <div className="project__media">
          <img src={project.image.src} alt={project.image.alt} width={1200} height={750} loading="lazy" />
        </div>
      )}
      <p className="project__context">
        {project.context}, {project.year}
      </p>
      <h3>
        <button className="project__open" type="button" onClick={onOpen}>
          {project.name}
        </button>
      </h3>
      {project.result && <p className="project__result">{project.result}</p>}
      <p className="project__summary">{project.summary}</p>
      {project.proof && <p className="project__proof">{project.proof}</p>}
      <Sources items={project.sources} about={project.name} />
    </article>
  );
}

export default function Work() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [shown, setShown] = useState<Project | null>(null);

  const open = (p: Project) => {
    setShown(p);
    setSelected(p);
  };

  return (
    <Section
      id="work"
      title="Selected work"
      intro="Most of this started at a hackathon and kept going. Open a project for the detail."
    >
      <div className="projects">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} isWide={wide[i % wide.length]} onOpen={() => open(p)} />
        ))}
      </div>

      <h3 className="subhead">Also built</h3>
      <ul className="ledger">
        {moreProjects.map((p) => (
          <li className="ledger__row ledger__row--project" key={p.id}>
            <span className="ledger__name">{p.name}</span>
            <span className="ledger__text">
              {p.result && <span className="ledger__result">{p.result}. </span>}
              {p.summary}
            </span>
            <span className="ledger__end">
              {p.note ? <span className="ledger__note">{p.note}</span> : <Sources items={p.sources} about={p.name} />}
            </span>
          </li>
        ))}
      </ul>

      <Dialog open={selected !== null} onClose={() => setSelected(null)} label={shown?.name ?? 'Project'}>
        {shown && (
          <>
            <p className="project__context">
              {shown.context}, {shown.year}
            </p>
            <h2 className="dialog__title">{shown.name}</h2>
            {shown.result && <p className="project__result">{shown.result}</p>}
            {shown.team && <p className="dialog__team">{shown.team}</p>}
            {shown.details.map((d) => (
              <p className="dialog__text" key={d}>
                {d}
              </p>
            ))}
            <p className="dialog__stack">{shown.stack.join(', ')}</p>
            <Sources items={shown.sources} about={shown.name} />
          </>
        )}
      </Dialog>
    </Section>
  );
}
