import { memo, useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Database, Smartphone, Cloud, Layers } from 'lucide-react';
import { useMobileDetect } from '@/hooks/use-mobile-detect';

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

// Memoized skill badge
const SkillBadge = memo(({ skill }: { skill: string }) => (
  <span className="px-3 py-1.5 text-sm bg-secondary/50 text-foreground rounded-lg border border-border hover:border-primary/50 transition-colors">
    {skill}
  </span>
));

SkillBadge.displayName = 'SkillBadge';

// Memoized skill category card
const SkillCategoryCard = memo(({ 
  category, 
  index, 
  isInView, 
  shouldReduceMotion 
}: { 
  category: typeof skillCategories[0]; 
  index: number; 
  isInView: boolean;
  shouldReduceMotion: boolean;
}) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 0.4, 
        delay: shouldReduceMotion ? 0 : index * 0.08 
      }}
      className="relative group"
    >
      <div className="glass-hover rounded-2xl p-6 h-full relative overflow-hidden transition-colors duration-300">
        {/* Static gradient background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />
        
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-0.5 mb-4`}>
          <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
            <Icon className="w-5 h-5 text-foreground" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg mb-4">{category.title}</h3>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

SkillCategoryCard.displayName = 'SkillCategoryCard';

const SkillsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { shouldReduceMotion } = useMobileDetect();

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Static background element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">02. EXPERTISE</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard 
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

export default SkillsSection;
