import React from 'react';
import Section from './Section';
import { portfolioData } from '../data';
import { ExternalLink, Folder } from 'lucide-react';
import { Github } from './icons';

import TiltCard from './TiltCard';

const Projects: React.FC = () => {
  return (
    <Section id="projects" title="03. Selected Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.projects.map((project, index) => (
          <TiltCard key={index} className="h-full">
            <div 
              className="glass-panel p-6 rounded-lg flex flex-col h-full group hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <Folder size={40} className="text-primary opacity-80" />
                <div className="flex gap-4">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
                      <Github size={20} />
                    </a>
                  )}
                  <a href="#" className="text-textMuted hover:text-primary transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-textMain mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              
              <p className="text-textMuted text-sm mb-6 flex-grow leading-relaxed">
                {project.description}
              </p>
              
              <ul className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech, i) => (
                  <li key={i} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
