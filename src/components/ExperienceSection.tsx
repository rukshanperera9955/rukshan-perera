import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, Calendar, CheckCircle2 } from 'lucide-react';

const achievements = [
  'Designed and implemented scalable RESTful APIs using Node.js and Express.js, improving system performance through Redis caching integration',
  'Developed a real-time Baccarat Score Board System using Rust and TypeScript with WebSocket integration for live game data synchronization',
  'Successfully delivered multiple full-stack applications using Next.js and Firebase, optimizing data flow and security implementations',
  'Contributed to backend architecture improvements and PHP CMS enhancements across multiple client projects',
  'Created comprehensive technical documentation and developer guides for complex systems',
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">03. CAREER</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"
              >
                <Building2 className="w-8 h-8 text-primary" />
              </motion.div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-1">Full Stack Software Engineer</h3>
                <p className="text-primary font-semibold text-lg mb-2">ITONE PRIVATE LIMITED</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>August 2020 - Present</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg mb-4">Key Achievements</h4>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex gap-3 group"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
