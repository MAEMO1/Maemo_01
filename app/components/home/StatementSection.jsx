'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap } from '../../lib/gsap';

export function StatementSection() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Line 1 - simple fade up
      gsap.fromTo(
        line1Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'cubic-bezier(.215,.61,.355,1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Line 2 - with delay
      gsap.fromTo(
        line2Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: 'cubic-bezier(.215,.61,.355,1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48 bg-white"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="space-y-6 md:space-y-8">
          {/* Line 1 */}
          <p
            ref={line1Ref}
            className="text-ink will-change-transform"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              opacity: 0,
            }}
          >
            {t('home.statement.line1')}
          </p>

          {/* Line 2 - coral accent */}
          <p
            ref={line2Ref}
            className="text-coral will-change-transform"
            style={{
              fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              opacity: 0,
            }}
          >
            {t('home.statement.line2')}
          </p>
        </div>
      </div>
    </section>
  );
}
