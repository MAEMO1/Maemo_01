'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';

// "Serious Capital" palette - institutional colors
const ACTIONS = [
  {
    id: 'analyze',
    translationKey: 'home.actionStack.analyze',
    color: '#064E3B', // Deep Forest
    direction: -1, // Enter from left
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
      </svg>
    ),
  },
  {
    id: 'strategize',
    translationKey: 'home.actionStack.strategize',
    color: '#1E3A8A', // Oxford Navy
    direction: 1, // Enter from right
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    id: 'transform',
    translationKey: 'home.actionStack.transform',
    color: '#9A3412', // Burnished Copper
    direction: -1, // Enter from left
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
  },
];

// Premium easing - like jeton.com
const PREMIUM_EASE = 'power3.out';

function ActionItem({ action, t, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="flex items-center justify-center gap-6 md:gap-8 will-change-transform"
      style={{ opacity: 0 }}
    >
      {/* Icon box - refined sizing like jeton.com */}
      <div
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg"
        style={{
          backgroundColor: action.color,
          boxShadow: `0 8px 32px ${action.color}40`,
        }}
      >
        <div className="text-white">{action.icon}</div>
      </div>
      {/* Large bold text - jeton.com style sizing */}
      <span
        className="font-semibold leading-none tracking-tight"
        style={{
          color: action.color,
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          letterSpacing: '-0.03em',
        }}
      >
        {t(action.translationKey)}
      </span>
    </div>
  );
}

export function ActionStack() {
  const containerRef = useRef(null);
  const pinContainerRef = useRef(null);
  const itemRefs = useRef([]);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint('md');

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        // DESKTOP: Scroll-pinned animation like jeton.com
        // Pin the section and animate items as user scrolls
        const items = itemRefs.current.filter(Boolean);
        const totalItems = items.length;

        // Create the pinned scroll animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * 2}`, // 2x viewport height for scroll distance
            pin: true,
            scrub: 0.8, // Smooth scrubbing
            anticipatePin: 1,
          },
        });

        // Animate each item with directional entrance
        items.forEach((item, index) => {
          const action = ACTIONS[index];
          const xOffset = action.direction * 120; // Horizontal offset based on direction
          const rotation = action.direction * 5; // Slight rotation

          // Each item gets its portion of the timeline
          const startProgress = index / totalItems;
          const endProgress = (index + 0.8) / totalItems;

          // Set initial state
          gsap.set(item, {
            opacity: 0,
            x: xOffset,
            y: 40,
            scale: 0.9,
            rotation: rotation,
          });

          // Animate in
          tl.to(item, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            ease: PREMIUM_EASE,
            duration: 0.3,
          }, startProgress);

          // Hold visible
          tl.to(item, {
            opacity: 1,
            duration: 0.2,
          }, endProgress - 0.2);
        });

        // Parallax effect on scroll after reveal
        items.forEach((item, index) => {
          gsap.to(item, {
            y: (index - 1) * -20, // Differential parallax
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

      } else {
        // MOBILE: Staggered scroll-reveal (no pinning)
        itemRefs.current.forEach((item, index) => {
          if (!item) return;

          const action = ACTIONS[index];
          const xOffset = action.direction * 60;

          gsap.fromTo(
            item,
            {
              opacity: 0,
              x: xOffset,
              y: 30,
              scale: 0.95,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: PREMIUM_EASE,
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isDesktop]);

  return (
    <section
      ref={containerRef}
      className="bg-white"
    >
      {/* Pinnable container */}
      <div
        ref={pinContainerRef}
        className="min-h-screen flex items-center justify-center py-20 md:py-0"
      >
        <div className="flex flex-col items-center gap-10 md:gap-14 lg:gap-16 px-6 md:px-12">
          {ACTIONS.map((action, index) => (
            <ActionItem
              key={action.id}
              action={action}
              t={t}
              innerRef={(el) => (itemRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
