import { useState, useEffect, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Lazy load below-the-fold sections for better initial load
const ProfileSection = lazy(() => import('@/components/ProfileSection'));
const AboutSection = lazy(() => import('@/components/AboutSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const EducationSection = lazy(() => import('@/components/EducationSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

// Simple loading fallback
const SectionLoader = memo(() => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
));

SectionLoader.displayName = 'SectionLoader';

const LoadingScreen = memo(() => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
  >
    <div className="text-center">
      <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full mx-auto mb-4 animate-spin" />
      <p className="text-lg font-medium gradient-text">Loading...</p>
    </div>
  </motion.div>
));

LoadingScreen.displayName = 'LoadingScreen';

const Index = memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="relative min-h-screen overflow-x-hidden">
        <ParticleBackground />
        <Navigation />
        
        <main>
          <HeroSection />
          <Suspense fallback={<SectionLoader />}>
            <ProfileSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <EducationSection />
            <ContactSection />
          </Suspense>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
});

Index.displayName = 'Index';

export default Index;
