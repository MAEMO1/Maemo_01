'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/gsap';

let lenisInstance = null;

export function useLenis() {
  useEffect(() => {
    // Only create one instance
    if (lenisInstance) return;

    // Create Lenis instance for smooth scrolling
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker for smooth animation
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing for better scroll sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    };
  }, []);

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
