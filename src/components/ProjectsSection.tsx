import { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useMobileDetect } from '@/hooks/use-mobile-detect';

const projects = [
  {
    title: 'RESTful API Design & Development',
    period: '2024 - 2025',
    description: 'Designed scalable RESTful APIs using Node.js and Express.js with Redis caching integration for improved performance and session management.',
    technologies: ['Node.js', 'Express.js', 'Redis', 'REST APIs', 'MySQL', 'Firebase'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Baccarat Score Board System',
    period: '2023 - 2025',
    description: 'Real-time gaming system with WebSocket integration for live game data synchronization. Built with Rust for high performance and asynchronous processing with Tokio.',
    technologies: ['Rust', 'TypeScript', 'Python', 'Tauri', 'Tokio', 'WebSockets', 'TCP'],
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Next.js Application Development',
    period: '2022 - 2023',
    description: 'Full-stack web applications with Firebase Realtime Database integration and custom REST APIs implementation for seamless data management.',
    technologies: ['Next.js', 'TypeScript', 'Firebase', 'REST APIs'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Backend Development',
    period: '2022 - 2023',
    description: 'RESTful APIs using Node.js and PHP CMS development for various client projects with focus on scalability and maintainability.',
    technologies: ['Node.js', 'PHP', 'REST APIs', 'MySQL'],
    gradient: 'from-green-500 to-emerald-600',
  },
];

// Memoized project card with simplified 3D effect for mobile
const ProjectCard = memo(({ 
  project, 
  index,
  shouldReduceMotion 
}: { 
  project: typeof projects[0]; 
  index: number;
  shouldReduceMotion: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: shouldReduceMotion ? 0.2 : 0.4, delay: index * 0.05 }}
    className="relative rounded-2xl overflow-hidden h-full group border border-border/50 hover:border-primary/30 transition-colors duration-300 bg-card"
  >
    <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
    
    <div className="p-6 md:p-8">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            {project.period}
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-mono bg-secondary/50 text-foreground rounded-md border border-border hover:border-primary/50 transition-colors"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
));

ProjectCard.displayName = 'ProjectCard';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { shouldReduceMotion, isMobile } = useMobileDetect();
  
  // Create autoplay plugin with useMemo to prevent recreation
  const autoplayPlugin = useMemo(() => 
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [autoplayPlugin]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="section-padding bg-card/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.3 : 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-mono text-sm mb-4 block">04. PORTFOLIO</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons - Desktop only */}
          {!isMobile && (
            <>
              <Button
                variant="glass"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full hidden md:flex"
                onClick={scrollPrev}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <Button
                variant="glass"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full hidden md:flex"
                onClick={scrollNext}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Carousel */}
          <div className="overflow-hidden mx-auto md:mx-8" ref={emblaRef}>
            <div className="flex gap-6">
              {projects.map((project, index) => (
                <div key={project.title} className="flex-[0_0_100%] md:flex-[0_0_50%] min-w-0">
                  <ProjectCard 
                    project={project} 
                    index={index} 
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Simplified Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`rounded-full transition-all duration-200 ${
                  index === selectedIndex 
                    ? 'w-8 h-2 bg-primary' 
                    : 'w-2 h-2 bg-muted-foreground/30 hover:bg-primary/50'
                }`}
                onClick={() => scrollTo(index)}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button variant="glass" size="icon" onClick={scrollPrev}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="icon" onClick={scrollNext}>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
