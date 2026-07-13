import React from 'react';
import { portfolioData } from '../data';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './icons';

const Footer: React.FC = () => {
  const { personalInfo } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-12 border-t border-white/5 bg-surface/30 mt-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl flex flex-col items-center text-center">
        
        <h2 className="text-3xl font-bold text-textMain mb-6">Let's Build Something</h2>
        <p className="text-textMuted max-w-xl mb-10">
          I'm currently open to new opportunities, collaborations, and conversations about AI architecture. 
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <a 
          href={`mailto:${personalInfo.email}`} 
          className="px-8 py-4 bg-primary text-background font-bold rounded hover:bg-primary/90 transition-colors mb-16 inline-block"
        >
          Say Hello
        </a>
        
        <div className="flex gap-6 mb-8">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
            <Github size={24} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
            <Linkedin size={24} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="text-textMuted hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
            <Mail size={24} />
          </a>
        </div>
        
        <div className="font-mono text-sm text-textMuted flex flex-col items-center gap-2">
          <p>Designed & Built by {personalInfo.name}</p>
          <p className="text-xs opacity-60">System Version 1.0.0</p>
        </div>
      </div>
      
      <button 
        onClick={scrollToTop}
        className="absolute bottom-12 right-6 md:right-12 p-3 bg-surface border border-white/10 text-textMuted hover:text-primary hover:border-primary/50 rounded transition-all group"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};

export default Footer;
