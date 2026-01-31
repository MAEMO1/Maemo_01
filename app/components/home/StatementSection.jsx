'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';

// Premium easing - jeton.com style cubic-bezier
const PREMIUM_EASE = 'cubic-bezier(.215,.61,.355,1)';

export function StatementSection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const accentRef = useRef(null);
  const isDesktop = useBreakpoint('md');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current].filter(Boolean);

      if (isDesktop) {
        // Desktop: Scroll-scrub reveal like ActionStack
        lines.forEach((line, index) => {
          const direction = index === 0 ? -1 : 1;
          const xOffset = direction * 100;

          gsap.fromTo(
            line,
            {
              opacity: 0,
              x: xOffset,
              y: 30,
              scale: 0.92,
              rotationY: direction * 8,
              transformPerspective: 1200,
              transformOrigin: direction < 0 ? 'right center' : 'left center',
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 1.4,
              ease: PREMIUM_EASE,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
                end: 'top 30%',
                scrub: 0.6,
              },
            }
          );
        });

        // Accent bar reveal
        if (accentRef.current) {
          gsap.fromTo(
            accentRef.current,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 1,
              ease: PREMIUM_EASE,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 50%',
                toggleActions: 'play none none none',
              },
            }
          );
        }

        // Subtle parallax on continued scroll - starts AFTER reveal is complete
        // Using a separate fromTo to avoid conflicting with the reveal animation
        lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            { yPercent: 0 },
            {
              yPercent: -8, // Subtle effect, percentage-based for consistency
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 30%', // Starts after reveal ends (reveal ends at 'top 30%')
                end: 'bottom top',
                scrub: 0.8,
              },
            }
          );
        });

      } else {
        // Mobile: 3D cascade reveal matching ActionStack mobile
        lines.forEach((line, index) => {
          const direction = index === 0 ? -1 : 1;
          const xOffset = direction * 60;

          gsap.fromTo(
            line,
            {
              opacity: 0,
              x: xOffset,
              y: 40,
              scale: 0.88,
              rotationY: direction * 10,
              rotationX: 6,
              transformPerspective: 1000,
              transformOrigin: direction < 0 ? 'right center' : 'left center',
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              rotationX: 0,
              duration: 1.2,
              delay: index * 0.15,
              ease: PREMIUM_EASE,
              scrollTrigger: {
                trigger: line,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        });

        // Accent bar
        if (accentRef.current) {
          gsap.fromTo(
            accentRef.current,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.8,
              delay: 0.3,
              ease: PREMIUM_EASE,
              scrollTrigger: {
                trigger: accentRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, isDesktop]);

  return (
    <section
      ref={containerRef}
      className="relative pt-28 sm:pt-36 md:pt-44 lg:pt-56 pb-36 sm:pb-44 md:pb-56 lg:pb-72 overflow-hidden"
      style={{ background: '#fafafa' }}
    >
      {/* Subtle gradient transition from white */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          {/* Line 1 - Bold statement */}
          <div
            ref={line1Ref}
            className="will-change-transform"
            style={{ opacity: 0, transformStyle: 'preserve-3d' }}
          >
            <span
              className="block font-semibold leading-[0.95] tracking-tight"
              style={{
                fontSize: 'clamp(2.25rem, 8vw, 5.5rem)',
                color: '#0f172a',
                letterSpacing: '-0.03em',
              }}
            >
              {t('home.statement.line1')}
            </span>
          </div>

          {/* Accent bar between lines */}
          <div
            ref={accentRef}
            className="my-6 sm:my-8 md:my-10 will-change-transform"
            style={{
              width: '80px',
              height: '4px',
              background: '#e85d4c',
              borderRadius: '4px',
              transformOrigin: 'center',
              opacity: 0,
            }}
          />

          {/* Line 2 - Colored accent */}
          <div
            ref={line2Ref}
            className="will-change-transform"
            style={{ opacity: 0, transformStyle: 'preserve-3d' }}
          >
            <span
              className="block font-semibold leading-[0.95] tracking-tight"
              style={{
                fontSize: 'clamp(2.25rem, 8vw, 5.5rem)',
                color: '#e85d4c',
                letterSpacing: '-0.03em',
              }}
            >
              {t('home.statement.line2')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
