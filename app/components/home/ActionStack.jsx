'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap, ScrollTrigger } from '../../lib/gsap';

// Horizontal offsets to create the staggered jeton.com style layout
const ACTIONS = [
  {
    id: 'analyze',
    translationKey: 'home.actionStack.analyze',
    color: '#22c55e',
    offset: 'translateX(15%)', // Offset right
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
      </svg>
    ),
  },
  {
    id: 'strategize',
    translationKey: 'home.actionStack.strategize',
    color: '#3b82f6',
    offset: 'translateX(0)', // Center
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    id: 'transform',
    translationKey: 'home.actionStack.transform',
    color: '#e85d4c',
    offset: 'translateX(-12%)', // Offset left
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

function ActionItem({ action, t, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="flex items-center gap-4 md:gap-6 action-item"
      style={{ transform: action.offset }}
    >
      <div
        className="w-14 h-14 md:w-20 md:h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: action.color }}
      >
        <div className="text-white">{action.icon}</div>
      </div>
      <span
        className="text-[clamp(3.5rem,15vw,10rem)] font-bold leading-none tracking-tight"
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

    // Only animate on desktop
    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        // Animate from below with fade
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.12,
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
      <div className="flex flex-col items-center gap-4 md:gap-8 px-6">
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
