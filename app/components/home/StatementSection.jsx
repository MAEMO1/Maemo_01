'use client';

import { useRef, useLayoutEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export function StatementSection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax and fade-in effect for the text
      gsap.fromTo(
        textRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Subtle parallax on scroll
      gsap.to(textRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: '#f8fafc' }}
    >
      <div ref={textRef} className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <span
          className="block uppercase tracking-[0.2em] text-xs font-semibold mb-8"
          style={{ color: '#94a3b8' }}
        >
          {t('home.statement.eyebrow') || 'The Insight'}
        </span>

        {/* Main Statement - Large, confident typography */}
        <h2
          className="font-semibold leading-[0.95] tracking-tight mb-10"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
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
            className="text-lg md:text-xl leading-relaxed"
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
          className="mt-16 h-px w-24"
          style={{ background: 'linear-gradient(90deg, #e85d4c, transparent)' }}
        />
      </div>
    </section>
  );
}
