import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import { Mail, MapPin } from 'lucide-react';
import { Github, Linkedin } from './icons';
import Cube3D from './Cube3D';

const Hero: React.FC = () => {
  const { personalInfo } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Background Matrix/Grid effect placeholder */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex-grow"
        >
          <motion.div variants={itemVariants} className="text-primary font-mono mb-4 text-sm md:text-base">
            &gt; Initialization sequence complete. Welcome, I am
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-textMain mb-4 tracking-tight">
            {personalInfo.name}.
          </motion.h1>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-textMuted mb-6 tracking-tight">
            I build intelligent systems.
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-textMuted max-w-2xl mb-10 leading-relaxed">
            {personalInfo.title} currently studying {personalInfo.subtitle}. 
            I specialize in orchestrating multi-agent systems, real-time AI pipelines, 
            and scalable microservices.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center mb-12">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-textMuted hover:text-primary transition-colors">
              <Mail size={20} />
              <span className="font-mono text-sm">Email</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-textMuted hover:text-primary transition-colors">
              <Github size={20} />
              <span className="font-mono text-sm">GitHub</span>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-textMuted hover:text-primary transition-colors">
              <Linkedin size={20} />
              <span className="font-mono text-sm">LinkedIn</span>
            </a>
            <div className="flex items-center gap-2 text-textMuted">
              <MapPin size={20} />
              <span className="font-mono text-sm">{personalInfo.location}</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <a href="#about" className="inline-block px-8 py-4 border border-primary text-primary font-mono rounded hover:bg-primary/10 transition-colors">
              Explore Architecture
            </a>
          </motion.div>
        </motion.div>

        {/* Right 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:flex justify-center items-center w-1/3"
        >
          <Cube3D />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
