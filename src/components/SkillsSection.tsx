import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Server, Database, Smartphone, Cloud, Layers } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code2,
    skills: ['Rust', 'Java', 'Python', 'C#'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Frontend',
    icon: Layers,
    skills: ['Next.js', 'React.js', 'TypeScript', 'JavaScript'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'Redis', 'Java EE', 'PHP', 'Laravel'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Mobile & Desktop',
    icon: Smartphone,
    skills: ['React Native', 'Tauri'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Databases',
    icon: Database,
    skills: ['Firebase', 'MySQL', 'Redis'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: ['Google Cloud', 'Git', 'GitHub', 'RESTful APIs', 'WebSocket'],
    color: 'from-indigo-500 to-purple-500',
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">02. EXPERTISE</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            const isLarge = categoryIndex === 0 || categoryIndex === 2;
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative group ${isLarge ? 'md:row-span-1' : ''}`}
              >
                <div className="glass-hover rounded-2xl p-6 h-full relative overflow-hidden animate-pulse-border transition-all duration-500">
                  {/* Gradient background on hover */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Floating orb */}
                  <motion.div
                    className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${category.color} rounded-full opacity-10 blur-2xl`}
                    animate={{
                      scale: hoveredCategory === categoryIndex ? 1.3 : 1,
                      opacity: hoveredCategory === categoryIndex ? 0.2 : 0.1,
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-0.5 mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    {category.title}
                  </h3>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                        whileHover={{ 
                          scale: 1.08,
                          backgroundColor: 'hsl(var(--primary) / 0.15)'
                        }}
                        className="px-3 py-1.5 text-sm bg-secondary/50 text-foreground rounded-lg border border-border hover:border-primary/50 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
