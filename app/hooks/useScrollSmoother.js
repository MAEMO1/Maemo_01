'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger, ScrollSmoother } from '../lib/gsap';

let smootherInstance = null;

export function useScrollSmoother() {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Only create one instance
    if (smootherInstance) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      smootherInstance = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,              // Smoothness (higher = smoother, slower)
        effects: true,            // Enable data-speed and data-lag attributes
        smoothTouch: 0.1,         // Enable smooth scrolling on touch devices
        normalizeScroll: true,    // Prevents address bar show/hide on mobile
        ignoreMobileResize: true, // Prevents jumps on mobile address bar changes
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (smootherInstance) {
        smootherInstance.kill();
        smootherInstance = null;
      }
    };
  }, []);

  return { wrapperRef, contentRef, smoother: smootherInstance };
}

export function getScrollSmoother() {
  return smootherInstance;
}
