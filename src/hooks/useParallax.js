import { useEffect, useState } from 'react';

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.scrollY * speed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}
