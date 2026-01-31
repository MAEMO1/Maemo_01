'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Force scroll to top on route change - iOS Safari compatible
    // Use multiple methods to ensure it works across all browsers

    // Method 1: Standard scrollTo
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Method 2: Set scrollTop directly (backup for iOS)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // For Safari

    // Method 3: Delayed scroll for iOS scroll restoration override
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);

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
      clearTimeout(scrollTimer);
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
