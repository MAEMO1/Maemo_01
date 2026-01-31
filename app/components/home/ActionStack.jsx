'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { gsap } from '../../lib/gsap';

const STEPS = [
  { id: 'analyze', translationKey: 'home.actionStack.analyze' },
  { id: 'strategize', translationKey: 'home.actionStack.strategize' },
  { id: 'transform', translationKey: 'home.actionStack.transform' },
];

export function ActionStack() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'cubic-bezier(.215,.61,.355,1)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
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
        {/* Steps - large typography only */}
        <div className="space-y-16 md:space-y-24">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (itemsRef.current[index] = el)}
              className="flex items-baseline gap-6 md:gap-12 will-change-transform"
              style={{ opacity: 0 }}
            >
              {/* Number */}
              <span
                className="text-coral font-medium"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  letterSpacing: '-0.01em',
                }}
              >
                0{index + 1}
              </span>
              
              {/* Step name - massive */}
              <h3
                className="text-ink"
                style={{
                  fontSize: 'clamp(2.5rem, 10vw, 7rem)',
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {t(step.translationKey)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
