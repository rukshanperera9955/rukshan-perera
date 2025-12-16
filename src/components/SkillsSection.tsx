import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['Rust', 'Java', 'Python', 'C#'],
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Frontend',
    skills: ['Next.js', 'React.js', 'TypeScript', 'JavaScript'],
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'Redis', 'Java EE', 'PHP', 'Laravel'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Mobile & Desktop',
    skills: ['React Native', 'Tauri'],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Databases',
    skills: ['Firebase', 'MySQL', 'Redis'],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'API & Architecture',
    skills: ['RESTful APIs', 'WebSocket', 'Real-time Systems', 'Middleware'],
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Google Cloud', 'Git', 'GitHub'],
    color: 'from-blue-500 to-cyan-500',
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding bg-card/30" ref={ref}>
      <div className="container-custom">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-hover rounded-2xl p-6 relative overflow-hidden group"
            >
              <div 
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} 
              />
              
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`} />
                {category.title}
              </h3>
              
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
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 text-sm bg-secondary/50 text-foreground rounded-lg border border-border hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
