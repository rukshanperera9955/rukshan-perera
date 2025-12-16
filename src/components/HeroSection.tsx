import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowDown, Download } from 'lucide-react';
import { Button } from './ui/button';
import TypewriterText from './TypewriterText';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden section-padding">
      {/* 3D Geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-lg"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-accent/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-16 h-16 border border-primary/30"
          animate={{ rotate: 180, y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'rotate(45deg)' }}
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
            <span className="px-4 py-2 text-sm font-medium glass rounded-full text-primary border border-primary/30">
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
              <a href="#" aria-label="Download Resume">
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
