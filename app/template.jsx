'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getLenis } from './hooks/useLenis';

export default function Template({ children }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Scroll to top on route change - must use Lenis for smooth scroll compatibility
    // Mobile (especially iOS Safari) needs more aggressive reset

    const scrollToTop = () => {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      // Always also set native scroll as backup
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();

    // Mobile needs multiple attempts due to iOS scroll restoration
    const scrollTimer1 = setTimeout(scrollToTop, 10);
    const scrollTimer2 = setTimeout(scrollToTop, 50);
    const scrollTimer3 = setTimeout(scrollToTop, 150); // Extra delay for slow mobile

    // Reset animation state on route change
    hasAnimated.current = false;
    setIsVisible(false);

    // Small delay to ensure DOM is ready, then animate in
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
      hasAnimated.current = true;
    });

    return () => {
      cancelAnimationFrame(timer);
      clearTimeout(scrollTimer1);
      clearTimeout(scrollTimer2);
      clearTimeout(scrollTimer3);
    };
  }, [pathname]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
      }}
    >
      {children}
    </div>
  );
}
