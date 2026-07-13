import React from 'react';
import Section from './Section';
import { portfolioData } from '../data';
import { Terminal } from 'lucide-react';

const About: React.FC = () => {
  const { personalInfo } = portfolioData;

  return (
    <Section id="about" title="01. About Me">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-textMuted leading-relaxed">
          <p>
            {personalInfo.aboutText}
          </p>
          <p>
            My engineering philosophy centers around building robust, scalable intelligence architectures. 
            I bridge the gap between complex machine learning models and production-ready applications, 
            ensuring high performance, reliability, and seamless user experiences.
          </p>
          <p>
            Whether it's deploying real-time transcription bots or architecting multi-agent consensus frameworks, 
            I thrive on turning cutting-edge AI research into tangible, impactful software.
          </p>
        </div>
        
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 rounded translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
          <div className="glass-panel p-8 rounded relative z-10 flex flex-col items-center justify-center min-h-[300px]">
            <Terminal size={48} className="text-primary mb-4" />
            <div className="font-mono text-center">
              <div className="text-textMain mb-2">System Status: <span className="text-green-400">Online</span></div>
              <div className="text-textMuted text-sm">Modules Loaded: AI/ML, Full-Stack, DevOps</div>
              <div className="text-textMuted text-sm mt-4">_ Ready for new challenges.</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
