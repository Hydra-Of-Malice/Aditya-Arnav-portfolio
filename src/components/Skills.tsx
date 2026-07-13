import React, { useState, useEffect, useRef } from 'react';
import Section from './Section';
import { portfolioData } from '../data';
import { Cpu } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Skills: React.FC = () => {
  const skillCategories = Object.entries(portfolioData.skills);
  
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger when 15% of the section is visible to ensure the user sees the start of the typing
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  
  const [lines, setLines] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const hasStartedRef = useRef(false);

  const logLines = [
    "$ init --profile=aditya-arnav --skills",
    "> Establishing systems context...",
    "> Parsing Languages... [OK] (Python, TypeScript, Go, C++...)",
    "> Verifying Backend microservices... [OK] (FastAPI, Spring, Express)",
    "> Connecting AI/ML neural weights... [OK] (LLMs, PyTorch, RAG, Whisper)",
    "> Initializing Docker containers & DB ports... [OK] (Postgres, Redis)",
    "> Synchronizing Cloud networks... [OK] (AWS S3/Lambda, Azure Foundry)",
    "> Loading DGCA Drone Pilot licence... [ACTIVE]",
    "[SUCCESS] Technical Arsenal synchronized successfully."
  ];

  useEffect(() => {
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setStarted(true);
      let currentLine = 0;
      
      const interval = setInterval(() => {
        if (currentLine < logLines.length) {
          const lineToAdd = logLines[currentLine];
          setLines((prev) => [...prev, lineToAdd]);
          currentLine++;
        } else {
          clearInterval(interval);
          setIsFinished(true);
        }
      }, 200); // 200ms per line for snappy load

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <Section id="skills" title="05. Technical Arsenal">
      <div ref={containerRef} className="space-y-12">
        {/* Terminal Simulator */}
        <div className="glass-panel rounded-lg overflow-hidden border border-white/10 font-mono text-sm max-w-3xl mx-auto shadow-2xl">
          {/* Header */}
          <div className="bg-surface/90 px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-textMuted text-xs select-none">guest@aditya-arnav: ~/skills</span>
            <div className="w-12" />
          </div>
          
          {/* Terminal Screen */}
          <div className="p-6 space-y-2 bg-black/60 min-h-[220px] flex flex-col justify-start">
            {lines.map((line, i) => {
              const isCommand = line.startsWith('$');
              const isSuccess = line.startsWith('[SUCCESS]');
              let colorClass = "text-textMuted";
              if (isCommand) colorClass = "text-primary font-bold";
              else if (isSuccess) colorClass = "text-green-400 font-bold";
              
              return (
                <div key={i} className={`${colorClass} text-xs sm:text-sm leading-relaxed`}>
                  {line}
                </div>
              );
            })}
            
            {/* Typing cursor */}
            {!isFinished && (
              <div className="flex items-center gap-1">
                <span className="text-primary font-bold">{started ? ">" : "$"}</span>
                <span className="w-2 h-4 bg-primary animate-pulse" />
              </div>
            )}
          </div>
        </div>

        {/* Skills Tag Grid - Fades and slides up once terminal script completes */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`grid md:grid-cols-2 gap-x-12 gap-y-10 ${
            isFinished ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {skillCategories.map(([category, skills], index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={16} className="text-primary" />
                <h3 className="text-lg font-bold text-textMain tracking-wide">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1.5 text-xs sm:text-sm bg-surface hover:bg-surfaceHover border border-white/5 hover:border-primary/50 text-textMuted hover:text-textMain rounded transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default Skills;
