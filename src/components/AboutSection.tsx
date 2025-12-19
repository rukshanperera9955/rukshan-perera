import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Server, Smartphone, Zap } from 'lucide-react';
import { useMobileDetect } from '@/hooks/use-mobile-detect';

const highlights = [
  { icon: Code2, label: 'Frontend Expert', description: 'React, Next.js, TypeScript' },
  { icon: Server, label: 'Backend Specialist', description: 'Node.js, Rust, APIs' },
  { icon: Smartphone, label: 'Cross-Platform', description: 'React Native, Tauri' },
  { icon: Zap, label: 'Performance', description: 'Optimization & Scaling' },
];

// Memoized highlight card
const HighlightCard = memo(({ 
  item, 
  index, 
  isInView, 
  shouldReduceMotion 
}: { 
  item: typeof highlights[0]; 
  index: number; 
  isInView: boolean;
  shouldReduceMotion: boolean;
}) => {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 0.3, 
        delay: shouldReduceMotion ? 0 : 0.3 + index * 0.08 
      }}
      className="glass-hover rounded-xl p-6 text-center"
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-semibold mb-1">{item.label}</h3>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </motion.div>
  );
});

HighlightCard.displayName = 'HighlightCard';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { shouldReduceMotion } = useMobileDetect();

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">01. ABOUT ME</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Who I Am</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.1 }}
          >
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Full Stack Developer with <span className="text-primary font-semibold">3+ years of experience</span> building 
                scalable web applications and high-performance backend systems.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Currently working at <span className="text-foreground font-medium">ITONE Private Limited</span>, 
                I specialize in modern JavaScript/TypeScript ecosystems and systems programming. 
                My expertise spans from crafting beautiful user interfaces to architecting 
                robust backend solutions.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                I'm passionate about writing clean, efficient code and building products 
                that make a real impact. When I'm not coding, you'll find me exploring 
                new technologies and contributing to open-source projects.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <HighlightCard 
                key={item.label}
                item={item}
                index={index}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
