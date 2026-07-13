import React from 'react';
import Section from './Section';
import { portfolioData } from '../data';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="02. Experience">
      <div className="relative border-l border-white/10 ml-4 md:ml-6">
        {portfolioData.experience.map((exp, index) => (
          <div key={index} className="mb-12 relative pl-8 md:pl-12">
            <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-background" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
              <h3 className="text-xl font-bold text-textMain">
                {exp.role} <span className="text-primary">@ {exp.company}</span>
              </h3>
              <span className="font-mono text-sm text-textMuted flex items-center gap-2">
                <Briefcase size={14} />
                {exp.period}
              </span>
            </div>
            
            <ul className="mt-4 space-y-3 text-textMuted">
              {exp.descriptionPoints.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary mt-1.5">▹</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
