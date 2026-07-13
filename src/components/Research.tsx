import React from 'react';
import Section from './Section';
import { portfolioData } from '../data';
import { FileText, Award } from 'lucide-react';

const Research: React.FC = () => {
  return (
    <Section id="research" title="04. Research & Patents">
      <div className="grid md:grid-cols-2 gap-8">
        {portfolioData.research.map((item, index) => (
          <div key={index} className="glass-panel p-8 rounded-lg flex flex-col h-full border-t-2 border-t-primary/50">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-primary" size={24} />
              <h3 className="text-lg font-bold text-textMain leading-tight">
                {item.title}
              </h3>
            </div>
            
            <p className="text-textMuted text-sm mb-6 flex-grow leading-relaxed">
              {item.description}
            </p>
            
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
              <span className="text-xs font-mono text-textMuted flex items-center gap-1">
                <Award size={14} />
                {item.status}
              </span>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Research;
