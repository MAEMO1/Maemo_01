'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook for detecting when an element enters the viewport
 * Uses IntersectionObserver for performant scroll-triggered animations
 * Works great on mobile without the overhead of GSAP ScrollTrigger
 *
 * @param {Object} options
 * @param {number} options.threshold - Percentage of element visible to trigger (0-1)
 * @param {string} options.rootMargin - Margin around root (e.g., '-100px')
 * @param {boolean} options.triggerOnce - Only trigger once (default: true)
 * @returns {{ ref: React.RefObject, isInView: boolean }}
 */
export function useInView({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

/**
 * Hook for staggered animations of multiple elements
 * @param {number} count - Number of elements
 * @param {Object} options - IntersectionObserver options
 * @returns {{ containerRef: React.RefObject, isInView: boolean, getDelay: (index: number) => string }}
 */
export function useStaggeredInView(count, { threshold = 0.1, rootMargin = '-50px', staggerDelay = 100 } = {}) {
  const { ref: containerRef, isInView } = useInView({ threshold, rootMargin });

  const getDelay = (index) => `${index * staggerDelay}ms`;

  return { containerRef, isInView, getDelay };
}

/**
 * Hook for individual element animations with custom delays
 * @param {number} index - Element index for stagger calculation
 * @param {number} baseDelay - Base delay in ms
 * @param {Object} options - IntersectionObserver options
 */
export function useStaggeredItem(index, baseDelay = 100, options = {}) {
  const { ref, isInView } = useInView(options);
  const delay = index * baseDelay;

  return { ref, isInView, delay, style: { transitionDelay: `${delay}ms` } };
}
