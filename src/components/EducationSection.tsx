import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, BookOpen, LucideIcon } from 'lucide-react';
import { useMobileDetect } from '@/hooks/use-mobile-detect';

interface EducationItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  institution: string;
  period: string;
  color: string;
}

const educationData: EducationItem[] = [
  {
    icon: GraduationCap,
    title: 'Bachelor of Engineering (BEng)',
    subtitle: 'Software Engineering',
    institution: 'Java Institute Sri Lanka',
    period: '2020 - 2024',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Award,
    title: 'Certificate',
    subtitle: 'Cyber Security And Networking',
    institution: 'NEXTGEN CAMPUS',
    period: 'Completed',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BookOpen,
    title: 'Advanced Level',
    subtitle: 'Science Stream',
    institution: 'Combine Maths (C), Physics (B), Chemistry (S)',
    period: 'Completed',
    color: 'from-orange-500 to-red-500',
  },
];

// Memoized education card
const EducationCard = memo(({ 
  item, 
  index, 
  isInView, 
  shouldReduceMotion 
}: { 
  item: EducationItem; 
  index: number; 
  isInView: boolean;
  shouldReduceMotion: boolean;
}) => {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 0.4, 
        delay: shouldReduceMotion ? 0 : index * 0.1 
      }}
      className="relative md:pl-20"
    >
      {/* Timeline dot - Desktop */}
      <div
        className={`hidden md:flex absolute left-0 w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} items-center justify-center shadow-lg`}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <div className="glass-hover rounded-2xl p-6 md:p-8">
        <div className="flex items-start gap-4">
          {/* Mobile icon */}
          <div className={`md:hidden w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <span className="text-sm text-primary font-medium">{item.period}</span>
            </div>
            <p className="text-lg text-foreground/90 mb-1">{item.subtitle}</p>
            <p className="text-muted-foreground">{item.institution}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

EducationCard.displayName = 'EducationCard';

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { shouldReduceMotion } = useMobileDetect();

  return (
    <section id="education" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">05. EDUCATION</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Academic Background</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

            <div className="space-y-8">
              {educationData.map((item, index) => (
                <EducationCard 
                  key={item.title}
                  item={item}
                  index={index}
                  isInView={isInView}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
