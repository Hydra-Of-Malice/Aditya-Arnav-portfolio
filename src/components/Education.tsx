import React from 'react';
import Section from './Section';
import { portfolioData } from '../data';
import { GraduationCap } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <Section id="education" title="06. Education">
      <div className="max-w-3xl">
        {portfolioData.education.map((edu, index) => (
          <div key={index} className="mb-8 last:mb-0 group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <div className="min-w-[140px] text-primary font-mono text-sm pt-1">
              {edu.period}
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-textMain flex items-center gap-2">
                <GraduationCap size={18} className="text-primary hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity" />
                {edu.degree}
              </h3>
              <div className="text-lg text-textMuted mt-1">{edu.institution}</div>
              <div className="text-sm font-mono text-primary/80 mt-2 bg-primary/10 inline-block px-2 py-0.5 rounded">
                {edu.gpa}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
