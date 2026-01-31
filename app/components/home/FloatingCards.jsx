'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap } from '../../lib/gsap';

const SERVICES = [
  { id: 'strategy', translationKey: 'home.services.strategy' },
  { id: 'marketing', translationKey: 'home.services.marketing' },
  { id: 'brand', translationKey: 'home.services.brand' },
  { id: 'digital', translationKey: 'home.services.digital' },
];

export function FloatingCards() {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const itemsRef = useRef([]);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'cubic-bezier(.215,.61,.355,1)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Service items - staggered reveal
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'cubic-bezier(.215,.61,.355,1)',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section headline */}
        <h2
          ref={headlineRef}
          className="text-ink mb-20 md:mb-32"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            opacity: 0,
          }}
        >
          {t('home.services.headline')}
        </h2>

        {/* Services list - minimal */}
        <div className="space-y-0">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="border-t border-gray-100 py-8 md:py-12 will-change-transform"
              style={{ opacity: 0 }}
            >
              <div className="flex items-baseline justify-between gap-8">
                <span
                  className="text-ink"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t(service.translationKey)}
                </span>
                <span className="text-stone text-sm hidden md:block">
                  0{index + 1}
                </span>
              </div>
            </div>
          ))}
          {/* Bottom border */}
          <div className="border-t border-gray-100" />
        </div>
      </div>
    </section>
  );
}
