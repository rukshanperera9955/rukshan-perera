import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(190 95% 50%) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(260 80% 65%) 0%, transparent 70%)',
          bottom: '20%',
          right: '10%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        >
          {i % 3 === 0 ? (
            <div className="w-4 h-4 border border-primary/30 rotate-45" />
          ) : i % 3 === 1 ? (
            <div className="w-3 h-3 rounded-full border border-accent/30" />
          ) : (
            <div 
              className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-primary/20"
            />
          )}
        </motion.div>
      ))}

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
};

export default ParticleBackground;
