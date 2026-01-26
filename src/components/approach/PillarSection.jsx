import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

// Color schemes using our defined theme colors
const colorSchemes = {
  market: {
    bg: 'bg-green',
    accent: 'bg-green',
    iconBg: 'bg-green',
  },
  financial: {
    bg: 'bg-blue',
    accent: 'bg-blue',
    iconBg: 'bg-blue',
  },
  growth: {
    bg: 'bg-coral',
    accent: 'bg-coral',
    iconBg: 'bg-coral',
  },
  digital: {
    bg: 'bg-purple',
    accent: 'bg-purple',
    iconBg: 'bg-purple',
  },
};

// Animated icons
const icons = {
  market: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 52V36a2 2 0 012-2h8a2 2 0 012 2v16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 52V24a2 2 0 012-2h8a2 2 0 012 2v28" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M40 52V12a2 2 0 012-2h8a2 2 0 012 2v40" />
      <circle cx="12" cy="28" r="3" strokeWidth={2} />
      <circle cx="30" cy="16" r="3" strokeWidth={2} />
      <circle cx="48" cy="8" r="3" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 26l14-9m4 0l14-7" strokeDasharray="4 4" />
    </svg>
  ),
  financial: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="32" cy="32" r="24" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M32 20v24M26 26c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6 2.7-6 6 2.7 6 6 6" />
      <path strokeLinecap="round" d="M20 32h-4M48 32h-4M32 12v4M32 48v4" strokeWidth={2} />
    </svg>
  ),
  growth: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 48l16-16 8 8 24-24" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M40 16h16v16" strokeWidth={2} />
      <circle cx="8" cy="48" r="4" fill="currentColor" />
      <circle cx="24" cy="32" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="32" cy="40" r="4" fill="currentColor" opacity="0.5" />
      <circle cx="56" cy="16" r="4" fill="currentColor" />
    </svg>
  ),
  digital: (
    <svg className="w-full h-full" fill="none" viewBox="0 0 64 64" stroke="currentColor" strokeWidth={1.5}>
      <rect x="8" y="12" width="48" height="32" rx="2" />
      <path strokeLinecap="round" d="M8 40h48" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M24 44v8M40 44v8M20 52h24" />
      <circle cx="32" cy="26" r="8" strokeDasharray="4 2" />
      <path strokeLinecap="round" d="M32 22v8M28 26h8" strokeWidth={2} />
    </svg>
  ),
};

export function PillarSection({ pillarKey, title, description, index, isReversed }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const colors = colorSchemes[pillarKey] || colorSchemes.market;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillarNumber = String(index + 1).padStart(2, '0');

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative min-h-[90vh] flex items-center py-24 md:py-32 px-6 md:px-12 overflow-hidden',
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      )}
    >
      {/* Large background number */}
      <div
        className={cn(
          'absolute font-black text-[16rem] md:text-[24rem] leading-none pointer-events-none select-none',
          'transition-all duration-1000 ease-out text-gray-100',
          isReversed ? 'right-0 md:right-20' : 'left-0 md:left-20',
          'top-1/2 -translate-y-1/2',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{ transitionDelay: '100ms' }}
      >
        {pillarNumber}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center',
            isReversed && 'lg:[&>*:first-child]:order-2'
          )}
        >
          {/* Content Side */}
          <div
            className={cn(
              'transition-all duration-700 ease-out',
              isVisible
                ? 'opacity-100 translate-x-0'
                : cn('opacity-0', isReversed ? 'translate-x-12' : '-translate-x-12')
            )}
          >
            {/* Step indicator */}
            <div className="flex items-center gap-4 mb-8">
              <div className={cn('w-16 h-1.5 rounded-full', colors.accent)} />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-text-muted">
                Pillar {pillarNumber}
              </span>
            </div>

            {/* Title */}
            <h2
              className={cn(
                'text-4xl md:text-5xl lg:text-6xl font-black text-text-dark mb-8',
                'leading-[1.05] tracking-tight'
              )}
            >
              {title}
            </h2>

            {/* Description */}
            <p className="text-xl md:text-2xl text-text-medium leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Animated line */}
            <div
              className={cn(
                'mt-12 h-1 rounded-full transition-all duration-1000 ease-out',
                colors.accent,
                isVisible ? 'w-32' : 'w-0'
              )}
              style={{ transitionDelay: '400ms' }}
            />
          </div>

          {/* Visual Side - Gradient Card with Icon */}
          <div
            className={cn(
              'relative transition-all duration-700 ease-out',
              isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-95'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            <div
              className={cn(
                'relative aspect-square max-w-lg mx-auto rounded-[2.5rem] p-16 md:p-20',
                colors.bg,
                'shadow-2xl shadow-black/10',
                'group cursor-pointer',
                'hover:scale-[1.03] hover:shadow-3xl transition-all duration-500 ease-out'
              )}
            >
              {/* Decorative floating elements */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-white/20 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-12 left-8 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-[2.5rem] bg-white/5" />

              {/* Icon */}
              <div className="relative z-10 w-full h-full text-white group-hover:scale-110 transition-transform duration-500 ease-out">
                {icons[pillarKey]}
              </div>

              {/* Corner accent shape */}
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/15 rounded-tl-[3rem]" />
              <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 rounded-br-[2rem]" />
            </div>

            {/* Floating tag */}
            <div
              className={cn(
                'absolute -bottom-3 left-8 md:bottom-8 md:-left-4 px-5 py-3 rounded-2xl',
                'bg-white shadow-xl border border-gray-100/50',
                'transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              )}
              style={{ transitionDelay: '500ms' }}
            >
              <span className="text-sm font-bold text-text-dark">
                {pillarKey === 'market' && '360° Analysis'}
                {pillarKey === 'financial' && 'Deep Audit'}
                {pillarKey === 'growth' && 'Scale Ready'}
                {pillarKey === 'digital' && 'Tech Stack'}
              </span>
            </div>

            {/* Second floating element */}
            <div
              className={cn(
                'absolute -top-2 right-8 md:top-8 md:-right-4 px-4 py-2 rounded-full',
                colors.bg, 'text-white',
                'transition-all duration-700 ease-out',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
              )}
              style={{ transitionDelay: '600ms' }}
            >
              <span className="text-xs font-bold uppercase tracking-wider">
                {pillarKey === 'market' && 'Strategic'}
                {pillarKey === 'financial' && 'Metrics'}
                {pillarKey === 'growth' && 'Scalable'}
                {pillarKey === 'digital' && 'Modern'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
