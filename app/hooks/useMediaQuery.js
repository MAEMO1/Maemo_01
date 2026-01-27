'use client';

import { useState, useEffect } from 'react';

// Tailwind default breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * SSR-safe media query hook with resize listener
 * @param {string} query - Media query string (e.g., '(min-width: 768px)')
 * @returns {boolean} - Whether the media query matches
 */
export function useMediaQuery(query) {
  // Default to false for SSR - mobile-first approach
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create listener
    const handler = (event) => setMatches(event.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Legacy support
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, [query]);

  return matches;
}

/**
 * Convenience hook for Tailwind breakpoints
 * @param {'sm' | 'md' | 'lg' | 'xl' | '2xl'} breakpoint
 * @returns {boolean}
 */
export function useBreakpoint(breakpoint) {
  const px = BREAKPOINTS[breakpoint] || BREAKPOINTS.md;
  const query = `(min-width: ${px}px)`;
  return useMediaQuery(query);
}

/**
 * Hook that returns current breakpoint info
 * @returns {{ isMobile: boolean, isTablet: boolean, isDesktop: boolean, isLargeDesktop: boolean }}
 */
export function useResponsive() {
  const isSm = useBreakpoint('sm');
  const isMd = useBreakpoint('md');
  const isLg = useBreakpoint('lg');
  const isXl = useBreakpoint('xl');

  return {
    isMobile: !isSm,           // < 640px
    isTablet: isSm && !isLg,   // 640px - 1023px
    isDesktop: isLg,           // >= 1024px
    isLargeDesktop: isXl,      // >= 1280px
    // Raw breakpoint matches
    sm: isSm,
    md: isMd,
    lg: isLg,
    xl: isXl,
  };
}
