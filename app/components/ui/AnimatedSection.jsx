'use client';

import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { cn } from '../../utils/cn';

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  threshold = 0.2,
  animation = 'fade-in-up',
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const animationStyles = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-scale': 'animate-fade-in-scale',
    'slide-in-right': 'animate-slide-in-right',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0',
        isVisible && animationStyles[animation],
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
