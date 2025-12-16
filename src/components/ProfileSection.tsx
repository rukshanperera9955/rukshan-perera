import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Briefcase, GraduationCap, Calendar } from 'lucide-react';

const ProfileSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const profileDetails = [
    { icon: Briefcase, label: 'Position', value: 'Full Stack Software Engineer' },
    { icon: MapPin, label: 'Location', value: 'Moratuwa, Sri Lanka' },
    { icon: GraduationCap, label: 'Education', value: 'BEng Software Engineering' },
    { icon: Calendar, label: 'Experience', value: '3+ Years' },
  ];

  return (
    <section id="profile" className="section-padding" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm mb-4 block">PROFILE</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">My Profile</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden border-glow"
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              {/* Profile Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3, type: 'spring' }}
                className="relative"
              >
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-primary via-accent to-primary p-1 shine-effect">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
                    <span className="text-5xl md:text-6xl font-bold gradient-text">RP</span>
                  </div>
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-30 blur-xl animate-pulse-glow" />
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold mb-2"
                >
                  <span className="gradient-text text-glow-strong">Rukshan Perera</span>
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-primary font-medium mb-4"
                >
                  Full Stack Developer | Systems Programmer
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="text-muted-foreground leading-relaxed"
                >
                  Passionate about building high-performance web applications and real-time systems. 
                  Specializing in React, Next.js, Node.js, and Rust for scalable solutions.
                </motion.p>
              </div>
            </div>

            {/* Profile Details Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 relative z-10"
            >
              {profileDetails.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-secondary/30 rounded-xl p-4 text-center border border-border/50 hover:border-primary/30 transition-all"
                >
                  <detail.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">{detail.label}</p>
                  <p className="text-sm font-medium">{detail.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
