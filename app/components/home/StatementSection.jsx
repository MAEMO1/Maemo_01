'use client';

import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export function StatementSection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isDesktop = useBreakpoint('md');

  useLayoutEffect(() => {
    // Only run parallax on desktop for performance
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      // Parallax and fade-in effect for the text
      gsap.fromTo(
        textRef.current,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Subtle parallax on scroll
      gsap.to(textRef.current, {
        y: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

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
          className="block uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-semibold mb-6 sm:mb-8"
          style={{ color: '#94a3b8' }}
        >
          {t('home.statement.eyebrow') || 'The Insight'}
        </span>

        {/* Main Statement - Large, confident typography */}
        <h2
          className="font-semibold leading-[0.95] tracking-tight mb-8 sm:mb-10"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            color: '#0f172a',
          }}
        >
          {t('home.statement.title1')}
          <br />
          <span style={{ color: '#94a3b8' }}>
            {t('home.statement.title2')}
          </span>
        </h2>

        {/* Body text - Clean column */}
        <div className="max-w-2xl">
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
          className="mt-12 sm:mt-16 h-px w-16 sm:w-24"
          style={{ background: 'linear-gradient(90deg, #e85d4c, transparent)' }}
        />
      </div>
    </section>
  );
}
