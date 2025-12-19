import { memo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Calendar, Download } from 'lucide-react';
import { Button } from './ui/button';
import rukshanImage from '@/assets/rukshan-perera.png';
import { useMobileDetect } from '@/hooks/use-mobile-detect';

const profileDetails = [
  { icon: Briefcase, label: 'Position', value: 'Full Stack Software Engineer' },
  { icon: MapPin, label: 'Location', value: 'Moratuwa, Sri Lanka' },
  { icon: GraduationCap, label: 'Education', value: 'BEng Software Engineering' },
  { icon: Calendar, label: 'Experience', value: '3+ Years' },
];

// Memoized profile detail card
const ProfileDetailCard = memo(({ 
  detail, 
  index, 
  isInView, 
  shouldReduceMotion 
}: { 
  detail: typeof profileDetails[0]; 
  index: number; 
  isInView: boolean;
  shouldReduceMotion: boolean;
}) => {
  const Icon = detail.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: shouldReduceMotion ? 0.2 : 0.3, 
        delay: shouldReduceMotion ? 0 : 0.4 + index * 0.08 
      }}
      className="bg-secondary/30 rounded-xl p-4 text-center border border-border/50 hover:border-primary/30 transition-colors"
    >
      <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
      <p className="text-xs text-muted-foreground mb-1">{detail.label}</p>
      <p className="text-sm font-medium">{detail.value}</p>
    </motion.div>
  );
});

ProfileDetailCard.displayName = 'ProfileDetailCard';

const ProfileSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { shouldReduceMotion } = useMobileDetect();

  return (
    <section id="profile" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">PROFILE</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Profile</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, delay: 0.1 }}
            className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden border-glow"
          >
            {/* Static decorative gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Profile Avatar with lazy loading */}
              <div className="relative">
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-1">
                  <div className="w-full h-full rounded-full bg-card overflow-hidden">
                    <img 
                      src={rukshanImage} 
                      alt="Rukshan Perera" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold mb-2"
                >
                  <span className="gradient-text text-glow-strong">Rukshan Perera</span>
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.25 }}
                  className="text-primary font-medium mb-4"
                >
                  Full Stack Developer | Systems Programmer
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.3 }}
                  className="text-muted-foreground leading-relaxed mb-4"
                >
                  Passionate about building high-performance web applications and real-time systems. 
                  Specializing in React, Next.js, Node.js, and Rust for scalable solutions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 0.3, delay: 0.35 }}
                >
                  <Button variant="glow" asChild>
                    <a href="/RukshanPerera.pdf" download className="inline-flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Resume
                    </a>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 relative z-10">
              {profileDetails.map((detail, index) => (
                <ProfileDetailCard 
                  key={detail.label}
                  detail={detail}
                  index={index}
                  isInView={isInView}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
