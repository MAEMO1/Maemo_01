'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    // Reset animation state on route change
    hasAnimated.current = false;
    setIsVisible(false);

    // Small delay to ensure DOM is ready, then animate in
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
      hasAnimated.current = true;
    });

    return () => cancelAnimationFrame(timer);
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
