import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Button } from './ui/button';

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

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotateX((y - centerY) / 10);
    setRotateY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="glass rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-2xl hover:shadow-primary/10"
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
              className="px-3 py-1 text-xs font-mono bg-secondary/50 text-foreground rounded-md border border-border"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding bg-card/30" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">04. PORTFOLIO</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
