import { useRef, useState, useEffect } from 'react';

// Jeton-style actions with colored icons
const ACTIONS = [
  {
    id: 'analyze',
    word: 'Analyze',
    color: '#22c55e', // Green
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
      </svg>
    ),
  },
  {
    id: 'strategize',
    word: 'Strategize',
    color: '#3b82f6', // Blue
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    id: 'transform',
    word: 'Transform',
    color: '#e85d4c', // Coral
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

// Jeton-style action item - large icon + word, same color
function ActionItem({ action, style }) {
  return (
    <div
      className="flex items-center gap-5"
      style={{
        ...style,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Colored rounded square icon */}
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: action.color }}
      >
        <div className="text-white">
          {action.icon}
        </div>
      </div>

      {/* Word in same color */}
      <span
        className="text-[clamp(3rem,12vw,7rem)] font-semibold leading-none tracking-tight"
        style={{ color: action.color }}
      >
        {action.word}
      </span>
    </div>
  );
}

// Hook for scroll progress within the section - with momentum/lerp effect
function useStackScrollProgress() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Lerp factor - lower = more momentum/smoothing (0.08 = smooth glide)
    const lerpFactor = 0.08;

    const calculateTargetProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollRange = sectionHeight - viewportHeight;
      const scrolled = Math.max(0, -rect.top);
      targetProgressRef.current = Math.max(0, Math.min(1, scrolled / scrollRange));
    };

    // Animation loop that runs continuously for smooth momentum
    const animate = () => {
      // Lerp current progress towards target
      const diff = targetProgressRef.current - currentProgressRef.current;

      // Only update if there's a meaningful difference
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * lerpFactor;

        if (prefersReducedMotion) {
          setProgress(targetProgressRef.current > 0.1 ? 1 : 0);
        } else {
          setProgress(currentProgressRef.current);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      calculateTargetProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateTargetProgress();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { containerRef, progress };
}

// Smooth easing function
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export function ActionStack() {
  const { containerRef, progress } = useStackScrollProgress();
  const itemCount = ACTIONS.length;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{
        height: '220vh',
        background: '#ffffff',
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-6 md:gap-10 px-6">
          {ACTIONS.map((action, index) => {
            // Each item slides up from below in sequence
            // Staggered start points for sequential reveal - spread across full scroll
            const itemStart = index * 0.25; // Start points: 0, 0.25, 0.5
            const itemEnd = itemStart + 0.45; // Each item takes 45% of scroll to fully arrive

            // Calculate item-specific progress
            let itemProgress = 0;
            if (progress >= itemStart) {
              itemProgress = Math.min(1, (progress - itemStart) / (itemEnd - itemStart));
            }

            // Apply smooth easing
            const easedProgress = easeOutQuart(itemProgress);

            // Items slide up from far below the viewport - Jeton style
            // Items are hidden until they start animating, then visible while sliding
            const opacity = itemProgress > 0 ? 1 : 0;
            const translateY = 400 * (1 - easedProgress); // Very large slide-up from bottom

            return (
              <ActionItem
                key={action.id}
                action={action}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
