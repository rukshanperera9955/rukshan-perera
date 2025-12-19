import { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowDown, Download } from 'lucide-react';
import { Button } from './ui/button';
import TypewriterText from './TypewriterText';
import { useMobileDetect } from '@/hooks/use-mobile-detect';

// Memoized floating shape with GPU-accelerated animations
const FloatingShape = memo(({ 
  className, 
  delay = 0, 
  duration = 20,
  children,
  shouldReduceMotion 
}: { 
  className: string; 
  delay?: number; 
  duration?: number;
  children?: React.ReactNode;
  shouldReduceMotion: boolean;
}) => (
  <motion.div
    className={className}
    style={{ willChange: shouldReduceMotion ? 'auto' : 'transform, opacity' }}
    initial={{ opacity: 0 }}
    animate={shouldReduceMotion 
      ? { opacity: 0.3 }
      : { 
          opacity: 0.4, 
          y: [0, -20, 0],
          rotate: [0, 180]
        }
    }
    transition={shouldReduceMotion 
      ? { duration: 0.5 }
      : { 
          opacity: { delay, duration: 0.5 },
          y: { delay, duration: duration * 0.5, repeat: Infinity, ease: 'linear' },
          rotate: { delay, duration, repeat: Infinity, ease: 'linear' }
        }
    }
  >
    {children}
  </motion.div>
));

FloatingShape.displayName = 'FloatingShape';

// Memoized floating dot for performance
const FloatingDot = memo(({ 
  index, 
  shouldReduceMotion 
}: { 
  index: number; 
  shouldReduceMotion: boolean 
}) => {
  const style = useMemo(() => ({
    top: `${25 + (index * 8)}%`,
    left: `${15 + (index * 10)}%`,
    willChange: shouldReduceMotion ? 'auto' : 'transform, opacity',
  }), [index, shouldReduceMotion]);

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-primary/30"
      style={style}
      animate={shouldReduceMotion 
        ? { opacity: 0.3 }
        : {
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }
      }
      transition={shouldReduceMotion 
        ? { duration: 0 }
        : {
            duration: 4 + index * 0.5,
            delay: index * 0.4,
            repeat: Infinity,
            ease: 'easeInOut'
          }
      }
    />
  );
});

FloatingDot.displayName = 'FloatingDot';

const HeroSection = memo(() => {
  const { shouldReduceMotion, isMobile } = useMobileDetect();
  
  // Memoize animation variants
  const containerAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.3 : 0.6 }
  }), [shouldReduceMotion]);

  // Memoized dots count - reduce for mobile
  const dotsCount = isMobile ? 4 : 6;
  const dots = useMemo(() => Array.from({ length: dotsCount }, (_, i) => i), [dotsCount]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding">
      {/* Simplified geometric shapes for better performance */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          <FloatingShape 
            className="absolute top-1/4 left-[15%] w-24 h-24 border-2 border-primary/20 rounded-lg"
            delay={0}
            duration={25}
            shouldReduceMotion={shouldReduceMotion}
          />
          
          {!isMobile && (
            <FloatingShape 
              className="absolute bottom-1/4 right-[15%] w-20 h-20 border-2 border-accent/20 rounded-full"
              delay={0.3}
              duration={20}
              shouldReduceMotion={shouldReduceMotion}
            />
          )}
          
          {/* Simplified floating dots - reduced count on mobile */}
          {dots.map((i) => (
            <FloatingDot 
              key={i} 
              index={i} 
              shouldReduceMotion={shouldReduceMotion} 
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10">
        <motion.div
          initial={containerAnimation.initial}
          animate={containerAnimation.animate}
          transition={containerAnimation.transition}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: shouldReduceMotion ? 0.2 : 0.4 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium glass rounded-full text-primary border border-primary/30">
              Full Stack Developer
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: shouldReduceMotion ? 0.2 : 0.5 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text text-glow-strong">Rukshan Perera</span>
          </motion.h1>

          <motion.div
            className="text-lg md:text-xl text-muted-foreground mb-8 h-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TypewriterText
              texts={[
                'Building Scalable Web Applications',
                'React & Next.js Expert',
                'Node.js & Rust Developer',
                'Real-time Systems Architect',
              ]}
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button variant="glow" size="xl" asChild>
              <a href="#projects">
                View Projects
              </a>
            </Button>
            <Button variant="glowOutline" size="xl" asChild>
              <a href="#contact">
                Contact Me
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button variant="glass" size="icon" className="rounded-full" asChild>
              <a 
                href="https://www.linkedin.com/in/rukshan-perera-965956205/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="glass" size="icon" className="rounded-full" asChild>
              <a 
                href="https://github.com/rukshanevi12" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="glass" size="icon" className="rounded-full" asChild>
              <a href="/RukshanPerera.pdf" download aria-label="Download Resume">
                <Download className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
