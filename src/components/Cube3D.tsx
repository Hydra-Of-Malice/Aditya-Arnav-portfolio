import React from 'react';

export const Cube3D: React.FC = () => {
  const faces = [
    { transform: 'translateZ(100px)', text: 'FastAPI', bg: 'bg-primary/10 border-primary/40' },
    { transform: 'rotateY(180deg) translateZ(100px)', text: 'PyTorch', bg: 'bg-primary/20 border-primary/50' },
    { transform: 'rotateY(90deg) translateZ(100px)', text: 'React', bg: 'bg-primary/15 border-primary/40' },
    { transform: 'rotateY(-90deg) translateZ(100px)', text: 'GoLang', bg: 'bg-primary/25 border-primary/50' },
    { transform: 'rotateX(90deg) translateZ(100px)', text: 'LLMs', bg: 'bg-primary/10 border-primary/45' },
    { transform: 'rotateX(-90deg) translateZ(100px)', text: 'Docker', bg: 'bg-primary/20 border-primary/55' },
  ];

  return (
    <div className="relative w-64 h-64 flex items-center justify-center select-none" style={{ perspective: '1000px' }}>
      <div 
        className="w-48 h-48 relative animate-spin-3d" 
        style={{ transformStyle: 'preserve-3d' }}
      >
        {faces.map((face, index) => (
          <div
            key={index}
            style={{ 
              transform: face.transform,
              transformStyle: 'preserve-3d',
              position: 'absolute'
            }}
            className={`inset-0 border-2 backdrop-blur-md rounded-xl flex flex-col items-center justify-center text-primary font-mono font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.15)] ${face.bg}`}
          >
            {/* Subtle inner grid lines to look like an AI system wireframe */}
            <div className="absolute inset-2 border border-primary/10 border-dashed rounded-lg pointer-events-none" />
            <span style={{ transform: 'translateZ(10px)' }}>
              {face.text}
            </span>
          </div>
        ))}
      </div>
      
      {/* Dynamic glow behind the cube */}
      <div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl -z-10 animate-pulse" />
    </div>
  );
};

export default Cube3D;
