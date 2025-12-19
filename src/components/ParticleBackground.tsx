import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useMobileDetect } from '@/hooks/use-mobile-detect';

// Memoized floating shape component for performance
const FloatingShape = memo(({ 
  index, 
  shouldReduceMotion 
}: { 
  index: number; 
  shouldReduceMotion: boolean 
}) => {
  // Use useMemo for random positions to avoid recalculation on each render
  const style = useMemo(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    willChange: shouldReduceMotion ? 'auto' : 'transform, opacity',
  }), [shouldReduceMotion]);

  const animation = shouldReduceMotion 
    ? { opacity: 0.2 }
    : {
        y: [0, -20, 0],
        x: [0, Math.random() * 15 - 7.5, 0],
        rotate: [0, 180],
        opacity: [0.1, 0.25, 0.1],
      };

  const transition = shouldReduceMotion 
    ? { duration: 0 }
    : {
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        ease: 'linear' as const,
        delay: Math.random() * 3,
      };

  const shapeType = index % 3;

  return (
    <motion.div
      className="absolute"
      style={style}
      animate={animation}
      transition={transition}
    >
      {shapeType === 0 ? (
        <div className="w-3 h-3 border border-primary/25 rotate-45" />
      ) : shapeType === 1 ? (
        <div className="w-2.5 h-2.5 rounded-full border border-accent/25" />
      ) : (
        <div 
          className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-primary/15"
        />
      )}
    </motion.div>
  );
});

FloatingShape.displayName = 'FloatingShape';

// Memoized gradient orb component
const GradientOrb = memo(({ 
  size,
  position,
  color,
  animation,
  transition,
  shouldReduceMotion
}: {
  size: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  color: string;
  animation: { x?: number[]; y?: number[]; scale?: number[]; opacity?: number[] };
  transition: { duration: number; repeat: number; ease: 'easeInOut' | 'linear' };
  shouldReduceMotion: boolean;
}) => {
  const style = useMemo(() => ({
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    ...position,
    willChange: shouldReduceMotion ? 'auto' : 'transform, opacity',
  }), [color, position, shouldReduceMotion]);

  return (
    <motion.div
      className={`absolute ${size} rounded-full blur-3xl`}
      style={style}
      animate={shouldReduceMotion ? { opacity: 0.15 } : animation}
      transition={shouldReduceMotion ? { duration: 0 } : transition}
    />
  );
});

GradientOrb.displayName = 'GradientOrb';

const ParticleBackground = memo(() => {
  const { shouldReduceMotion, isMobile } = useMobileDetect();
  
  // Reduce number of shapes on mobile
  const shapeCount = isMobile ? 5 : 10;
  
  // Memoize shapes array
  const shapes = useMemo(() => 
    Array.from({ length: shapeCount }, (_, i) => i), 
    [shapeCount]
  );

  // Don't render heavy animations on mobile with reduced motion
  if (shouldReduceMotion && isMobile) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, hsl(270 90% 65%) 0%, transparent 70%)',
            top: '20%',
            left: '20%',
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient orbs with GPU-accelerated transforms */}
      <GradientOrb
        size="w-[500px] h-[500px] opacity-20"
        position={{ top: '10%', left: '10%' }}
        color="hsl(270 90% 65%)"
        animation={{
          x: [0, 60, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        shouldReduceMotion={shouldReduceMotion}
      />
      
      {!isMobile && (
        <GradientOrb
          size="w-[400px] h-[400px] opacity-15"
          position={{ bottom: '20%', right: '10%' }}
          color="hsl(290 85% 60%)"
          animation={{
            x: [0, -50, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          shouldReduceMotion={shouldReduceMotion}
        />
      )}
      
      {!isMobile && (
        <GradientOrb
          size="w-[300px] h-[300px] opacity-10"
          position={{ top: '50%', left: '50%' }}
          color="hsl(250 90% 70%)"
          animation={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          shouldReduceMotion={shouldReduceMotion}
        />
      )}

      {/* Floating geometric shapes - reduced on mobile */}
      {shapes.map((i) => (
        <FloatingShape 
          key={i} 
          index={i} 
          shouldReduceMotion={shouldReduceMotion} 
        />
      ))}

      {/* Grid pattern - static for performance */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
});

ParticleBackground.displayName = 'ParticleBackground';

export default ParticleBackground;
