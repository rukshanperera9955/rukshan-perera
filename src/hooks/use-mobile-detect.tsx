import { useState, useEffect, useMemo } from 'react';

// Custom hook to detect mobile devices and reduced motion preference
export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const isSmallScreen = window.innerWidth < 768;
      
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Memoize the result to prevent unnecessary re-renders
  return useMemo(() => ({
    isMobile,
    prefersReducedMotion,
    shouldReduceMotion: isMobile || prefersReducedMotion
  }), [isMobile, prefersReducedMotion]);
};

export default useMobileDetect;
