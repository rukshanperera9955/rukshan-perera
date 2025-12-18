import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowDown, Download } from 'lucide-react';
import { Button } from './ui/button';
import TypewriterText from './TypewriterText';

const FloatingShape = ({ 
  className, 
  delay = 0, 
  duration = 20,
  children 
}: { 
  className: string; 
  delay?: number; 
  duration?: number;
  children?: React.ReactNode;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: [0, -30, 0],
      rotate: [0, 360]
    }}
    transition={{ 
      opacity: { delay, duration: 0.5 },
      scale: { delay, duration: 0.5 },
      y: { delay, duration: duration * 0.5, repeat: Infinity, ease: 'easeInOut' },
      rotate: { delay, duration, repeat: Infinity, ease: 'linear' }
    }}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding">
      {/* Enhanced 3D Geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large rotating square */}
        <FloatingShape 
          className="absolute top-1/4 left-[15%] w-32 h-32 border-2 border-primary/30 rounded-lg animate-pulse-border"
          delay={0}
          duration={30}
        />
        
        {/* Rotating circle */}
        <FloatingShape 
          className="absolute bottom-1/4 right-[15%] w-24 h-24 border-2 border-accent/30 rounded-full"
          delay={0.5}
          duration={25}
        />
        
        {/* Diamond shape */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-primary/40"
          style={{ transform: 'rotate(45deg)' }}
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
            rotate: [45, 225, 45]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Small floating dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/40"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
        
        {/* Hexagon */}
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-20 h-20"
          animate={{ 
            rotate: [0, -360],
            y: [0, 20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>
        </motion.div>
        
        {/* Triangle */}
        <motion.div
          className="absolute top-[60%] right-[10%] w-16 h-16"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,10 90,90 10,90"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
              opacity="0.35"
            />
          </svg>
        </motion.div>
        
        {/* Cross shape */}
        <motion.div
          className="absolute top-[20%] right-[30%] w-12 h-12"
          animate={{ 
            rotate: [0, 180, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/40 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-primary/40 -translate-x-1/2" />
        </motion.div>
        
        {/* Concentric circles */}
        <motion.div
          className="absolute bottom-[20%] left-[10%]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-24 h-24 rounded-full border border-primary/20" />
          <div className="absolute top-2 left-2 w-20 h-20 rounded-full border border-accent/20" />
          <div className="absolute top-4 left-4 w-16 h-16 rounded-full border border-primary/30" />
        </motion.div>
        
        {/* Animated ring */}
        <motion.div
          className="absolute top-[40%] left-[5%] w-14 h-14 rounded-full border-2 border-dashed border-primary/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 text-sm font-medium glass rounded-full text-primary border border-primary/30 animate-pulse-border">
              Full Stack Developer
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text text-glow-strong shine-effect">Rukshan Perera</span>
          </motion.h1>

          <motion.div
            className="text-lg md:text-xl text-muted-foreground mb-8 h-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
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
            transition={{ delay: 0.9 }}
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
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
