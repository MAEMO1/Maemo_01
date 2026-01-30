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

// Premium easing - jeton.com style cubic-bezier
const PREMIUM_EASE = 'cubic-bezier(.215,.61,.355,1)';

function ActionItem({ action, t, innerRef }) {
  return (
    <div
      ref={innerRef}
      className="flex items-center justify-center gap-5 sm:gap-6 md:gap-8 will-change-transform group"
      style={{ opacity: 0, transformStyle: 'preserve-3d' }}
    >
      {/* Icon box - refined sizing with depth shadow like jeton.com */}
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl md:rounded-3xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-active:scale-95"
        style={{
          backgroundColor: action.color,
          boxShadow: `
            0 4px 6px ${action.color}20,
            0 12px 24px ${action.color}30,
            0 24px 48px ${action.color}20
          `,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="text-white">{action.icon}</div>
      </div>
      {/* Large bold text - jeton.com style sizing with touch feedback */}
      <span
        className="font-semibold leading-none tracking-tight transition-transform duration-300 group-active:scale-[0.98]"
        style={{
          color: action.color,
          fontSize: 'clamp(2.5rem, 10vw, 7rem)',
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
        // MOBILE: Jeton.com level 3D cascade reveal
        const items = itemRefs.current.filter(Boolean);

        items.forEach((item, index) => {
          const action = ACTIONS[index];
          const xOffset = action.direction * 80;
          const rotationY = action.direction * 12;
          const staggerDelay = index * 0.12;

          // Set initial 3D state
          gsap.set(item, {
            opacity: 0,
            x: xOffset,
            y: 50,
            scale: 0.85,
            rotationY: rotationY,
            rotationX: 8,
            transformPerspective: 1000,
            transformOrigin: action.direction < 0 ? 'right center' : 'left center',
          });

          // Dramatic 3D entrance
          gsap.to(item, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1.2,
            delay: staggerDelay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          });

          // Subtle parallax on scroll
          gsap.to(item, {
            y: (index - 1) * -10,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
            },
          });
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
