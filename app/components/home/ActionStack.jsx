'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap } from '../../lib/gsap';

// Colors matching jeton.com style but with "Serious Capital" palette
const ACTIONS = [
  {
    id: 'analyze',
    translationKey: 'home.actionStack.analyze',
    color: '#064E3B', // Deep Forest
    icon: (
      <svg className="w-7 h-7 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
      </svg>
    ),
  },
  {
    id: 'strategize',
    translationKey: 'home.actionStack.strategize',
    color: '#1E3A8A', // Oxford Navy
    icon: (
      <svg className="w-7 h-7 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    id: 'transform',
    translationKey: 'home.actionStack.transform',
    color: '#9A3412', // Burnished Copper
    icon: (
      <svg className="w-7 h-7 md:w-9 md:h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
];

function ActionItem({ action, t, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="flex items-center justify-center gap-5 md:gap-6"
    >
      {/* Solid colored icon box - like jeton.com */}
      <div
        className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: action.color }}
      >
        <div className="text-white">{action.icon}</div>
      </div>
      {/* Large bold text */}
      <span
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight"
        style={{ color: action.color }}
      >
        {t(action.translationKey)}
      </span>
    </div>
  );
}

export function ActionStack() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Simple fade-in for each item when it enters viewport
      itemRefs.current.forEach((item) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-40 bg-white"
    >
      {/* Perfectly centered, no offsets */}
      <div className="flex flex-col items-center gap-8 md:gap-12 px-6">
        {ACTIONS.map((action, index) => (
          <ActionItem
            key={action.id}
            action={action}
            t={t}
            innerRef={(el) => (itemRefs.current[index] = el)}
          />
        ))}
      </div>
    </section>
  );
}
