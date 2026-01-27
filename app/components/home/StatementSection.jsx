'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';

export function StatementSection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const accentRef = useRef(null);
  const isDesktop = useBreakpoint('md');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Premium easing for all animations
      const premiumEase = 'power3.out';

      if (isDesktop) {
        // Desktop: Premium parallax and fade-in effect
        gsap.fromTo(
          textRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: premiumEase,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 45%',
              scrub: 0.8,
            },
          }
        );

        // Subtle parallax on scroll - differential for depth
        gsap.to(textRef.current, {
          y: -60,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Accent line reveal
        gsap.fromTo(
          accentRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1,
            ease: premiumEase,
            scrollTrigger: {
              trigger: accentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        // Mobile: Staggered scroll-reveal animations with premium easing
        const elements = [eyebrowRef.current, headingRef.current, bodyRef.current, accentRef.current];
        const delays = [0, 0.1, 0.2, 0.3];

        elements.forEach((el, index) => {
          if (!el) return;

          gsap.fromTo(
            el,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: delays[index],
              ease: premiumEase,
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
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
      className="relative pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-20 sm:pb-24 md:pb-32 lg:pb-40 overflow-hidden"
      style={{ background: '#f8fafc' }}
    >
      {/* Gradient overlay for smooth transition from ActionStack */}
      <div
        className="absolute inset-x-0 top-0 h-32 sm:h-40 md:h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%)',
        }}
        aria-hidden="true"
      />
      <div ref={textRef} className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Eyebrow */}
        <span
          ref={eyebrowRef}
          className="block uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-semibold mb-6 sm:mb-8 will-change-transform"
          style={{ color: '#94a3b8', opacity: isDesktop ? undefined : 0 }}
        >
          {t('home.statement.eyebrow') || 'The Insight'}
        </span>

        {/* Main Statement - Large, confident typography */}
        <h2
          ref={headingRef}
          className="font-semibold leading-[0.95] tracking-tight mb-8 sm:mb-10 will-change-transform"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            color: '#0f172a',
            opacity: isDesktop ? undefined : 0,
          }}
        >
          {t('home.statement.title1')}
          <br />
          <span style={{ color: '#94a3b8' }}>
            {t('home.statement.title2')}
          </span>
        </h2>

        {/* Body text - Clean column */}
        <div ref={bodyRef} className="max-w-2xl will-change-transform" style={{ opacity: isDesktop ? undefined : 0 }}>
          <p
            className="text-base sm:text-lg md:text-xl leading-relaxed"
            style={{ color: '#64748b' }}
          >
            <strong className="font-semibold" style={{ color: '#0f172a' }}>maemo</strong>{' '}
            {t('home.statement.description').split('—').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <>
                    —
                    <span
                      className="font-semibold border-b-2 pb-0.5"
                      style={{ color: '#0f172a', borderColor: '#e85d4c' }}
                    >
                    </span>
                  </>
                )}
              </span>
            ))}
          </p>
        </div>

        {/* Subtle accent line */}
        <div
          ref={accentRef}
          className="mt-12 sm:mt-16 h-px w-16 sm:w-24 will-change-transform"
          style={{ background: 'linear-gradient(90deg, #e85d4c, transparent)', opacity: isDesktop ? undefined : 0 }}
        />
      </div>
    </section>
  );
}
