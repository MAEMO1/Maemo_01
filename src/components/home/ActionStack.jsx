import { useRef, useState, useEffect } from 'react';

// Action items matching Jeton's Add/Send/Exchange style
const ACTIONS = [
  {
    id: 'analyze',
    word: 'Analyze',
    icon: 'chart',
    color: '#0d9488', // teal
  },
  {
    id: 'strategize',
    word: 'Strategize',
    icon: 'lightbulb',
    color: '#1e3a5f', // navy
  },
  {
    id: 'transform',
    word: 'Transform',
    icon: 'bolt',
    color: '#475569', // slate
  },
];

// Icon SVG paths
const ICONS = {
  chart: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  ),
  lightbulb: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
  ),
  bolt: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  ),
};

// Single action item component
function ActionItem({ action, style }) {
  return (
    <div
      className="flex items-center gap-6 md:gap-8 transition-all duration-500"
      style={style}
    >
      {/* Large rounded icon */}
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
        style={{ backgroundColor: action.color }}
      >
        <svg
          className="w-7 h-7 md:w-8 md:h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {ICONS[action.icon]}
        </svg>
      </div>

      {/* Large word */}
      <span
        className="text-[clamp(2.5rem,10vw,5.5rem)] font-semibold leading-none tracking-tight"
        style={{ color: action.color }}
      >
        {action.word}
      </span>
    </div>
  );
}

// Hook for scroll progress within the section
function useStackScrollProgress() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const calculateProgress = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollRange = sectionHeight - viewportHeight;
      const scrolled = Math.max(0, -rect.top);
      const newProgress = Math.max(0, Math.min(1, scrolled / scrollRange));

      if (prefersReducedMotion) {
        setProgress(newProgress > 0.1 ? 1 : 0);
      } else {
        setProgress(newProgress);
      }
    };

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { containerRef, progress };
}

export function ActionStack() {
  const { containerRef, progress } = useStackScrollProgress();
  const itemCount = ACTIONS.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: '250vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {ACTIONS.map((action, index) => {
            // Each item appears at a specific scroll threshold
            const itemThreshold = index / itemCount;

            // Calculate opacity and transform based on progress
            let opacity = 0;
            let translateY = 60;
            let scale = 0.9;

            if (progress > itemThreshold) {
              // How far into this item's reveal phase are we
              const itemProgress = Math.min(1, (progress - itemThreshold) / (1 / itemCount) * 2);
              opacity = Math.min(1, itemProgress * 2);
              translateY = 60 * (1 - itemProgress);
              scale = 0.9 + (0.1 * itemProgress);
            }

            return (
              <ActionItem
                key={action.id}
                action={action}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
